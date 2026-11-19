// Two silent views of a signal passing through sine and cubic soft-clipping curves.
(() => {
  const field = document.querySelector(".signal-field");
  const button = document.querySelector(".motion-control");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const suppressed = matchMedia("print, (forced-colors: active)");
  const pointer = { x: 0, y: 0 };
  const plots = Array.from(field.querySelectorAll("canvas"), canvas => ({
    canvas, ctx: canvas.getContext("2d"), mask: document.createElement("canvas"),
    inGutter: canvas.classList.contains("wave-bank")
  }));
  if (plots.some(plot => !plot.ctx)) return;

  const tau = Math.PI * 2;
  const steps = 200;
  const circle = Array.from({ length: steps + 1 }, (_, i) => {
    const a = tau * i / steps;
    return [Math.cos(2 * a), Math.sin(2 * a), Math.cos(3 * a), Math.sin(3 * a)];
  });
  const points = new Float32Array((steps + 1) * 2);
  // These are the SIN and TANH3 transfer functions used in waveProcessor.
  function shape(input, drive, mix) {
    const x = input * drive;
    return (1 - mix) * Math.sin(x) + mix * Math.tanh(x * x * x);
  }

  let time = 0, tiltX = 0, tiltY = 0;
  let lastFrame = null, request = 0, layoutDirty = true, maskDirty = true;
  let textBoxes = [], obstacles = [], figures = [], gutter = 0, heroBottom = 0;
  let paused = false;
  let reduceMotion, hidePlots;
  try { paused = localStorage.getItem("sasha-signals-paused") === "true"; } catch { /* Optional storage. */ }

  // Store document coordinates once. Scrolling the fixed canvases needs no new text measurements.
  function measure() {
    gutter = document.querySelector("main").getBoundingClientRect().left;
    heroBottom = document.querySelector(".profile").getBoundingClientRect().bottom + scrollY;
    const range = document.createRange();
    const selector = ".page-nav a, h1, h2, h3, p, address, figcaption, dt, dd, summary, .when, .page-foot a, .page-foot button";
    textBoxes = [];
    obstacles = [];
    figures = [];
    for (const el of document.querySelectorAll(selector)) {
      if (el.closest("details:not([open]) dl")) continue;
      range.selectNodeContents(el);
      const rect = range.getBoundingClientRect();
      if (rect.width && rect.height) {
        textBoxes.push([rect.left, rect.top + scrollY, rect.right, rect.bottom + scrollY]);
        // Inline links and wrapped lines leave usable space beside the shorter lines.
        for (const line of range.getClientRects()) {
          if (line.width && line.height) {
            obstacles.push([line.left, line.top + scrollY, line.right, line.bottom + scrollY]);
          }
        }
      }
    }
    for (const image of document.querySelectorAll("main img")) {
      const rect = image.getBoundingClientRect();
      obstacles.push([rect.left, rect.top + scrollY, rect.right, rect.bottom + scrollY]);
      const figure = image.closest("figure");
      if (figure) figures.push([rect.left, rect.top + scrollY, rect.right, figure.getBoundingClientRect().bottom + scrollY]);
    }
    const density = Math.min(devicePixelRatio || 1, 2);
    for (const plot of plots) {
      const { canvas, ctx, mask } = plot;
      plot.box = canvas.getBoundingClientRect();
      const { width, height } = plot.box;
      if (!width || !height) continue;
      canvas.width = Math.max(1, Math.round(width * density));
      canvas.height = Math.max(1, Math.round(height * density));
      ctx.setTransform(density, 0, 0, density, 0, 0);
      ctx.lineCap = ctx.lineJoin = "round";
      plot.ink = getComputedStyle(canvas).color;
      mask.width = Math.max(1, Math.ceil(width / 4));
      mask.height = Math.max(1, Math.ceil(height / 4));
      if (!plot.inGutter) {
        // Include a little off-screen space for the ribbon to pass an edge-to-edge image.
        const span = Math.min(width, innerWidth - plot.box.left + 18);
        const cols = Math.ceil(span / 8) + 1, rows = Math.ceil(height / 8) + 1;
        plot.flow = { cols, rows, dx: span / (cols - 1), dy: height / (rows - 1),
          horizontal: new Float32Array(cols * rows), vertical: new Float32Array(rows),
          cumulative: new Float32Array(Math.max(cols, rows)) };
      }
    }
    maskDirty = true;
  }

  // Redistribute coordinates along one axis in proportion to the available drawing space.
  // The cumulative sum stays strictly increasing, so strands keep their winding order.
  function redistribute(weights, start, count, spacing, cumulative) {
    cumulative[0] = 0;
    for (let i = 1; i < count; i++) {
      cumulative[i] = cumulative[i - 1] + .5 * (weights[start + i - 1] + weights[start + i]);
    }
    const mean = cumulative[count - 1] / (count - 1);
    let cell = 0;
    for (let i = 0; i < count; i++) {
      const target = i * mean;
      while (cell < count - 2 && cumulative[cell + 1] < target) cell++;
      const fraction = (target - cumulative[cell]) / (cumulative[cell + 1] - cumulative[cell]);
      weights[start + i] = (cell + fraction - i) * spacing;
    }
    return mean;
  }

  function falloff(distance, reach) {
    const t = Math.min(1, Math.max(0, distance / reach));
    return 1 - t * t * (3 - 2 * t);
  }

  function updateFlow({ box, flow }, top) {
    const { cols, rows, dx, dy, horizontal, vertical, cumulative } = flow;
    horizontal.fill(1);
    const reachX = Math.min(42, box.width * .12), reachY = Math.min(76, box.width * .18);
    for (const [left, upper, right, lower] of obstacles) {
      const x0 = left - box.left - 8, x1 = right - box.left + 8;
      const y0 = upper - top - 4, y1 = lower - top + 4;
      const firstRow = Math.max(0, Math.ceil((y0 - reachY) / dy));
      const lastRow = Math.min(rows - 1, Math.floor((y1 + reachY) / dy));
      const firstCol = Math.max(0, Math.ceil((x0 - reachX) / dx));
      const lastCol = Math.min(cols - 1, Math.floor((x1 + reachX) / dx));
      if (firstCol > lastCol) continue;
      for (let row = firstRow; row <= lastRow; row++) {
        const y = row * dy;
        const strength = .88 * falloff(Math.max(y0 - y, y - y1), reachY);
        for (let col = firstCol; col <= lastCol; col++) {
          const x = col * dx, i = row * cols + col;
          const room = 1 - strength * falloff(Math.max(x0 - x, x - x1), reachX);
          horizontal[i] = Math.min(horizontal[i], room);
        }
      }
    }
    let freeSpace = 0;
    for (let row = 0; row < rows; row++) {
      const free = redistribute(horizontal, row * cols, cols, dx, cumulative);
      vertical[row] = .62 + .38 * free;
      freeSpace += free;
    }
    redistribute(vertical, 0, rows, dy, cumulative);
    // A strand bends over several lines of type. Average in both directions so it
    // follows the contour of a paragraph instead of forming a kink at every line end.
    const carry = Math.exp(-dy / Math.min(32, box.width * .075));
    for (let i = cols; i < horizontal.length; i++) {
      horizontal[i] += carry * (horizontal[i - cols] - horizontal[i]);
    }
    for (let i = horizontal.length - cols - 1; i >= 0; i--) {
      horizontal[i] += carry * (horizontal[i + cols] - horizontal[i]);
    }
    // When the project image divides the drawing area, take the outside lane
    // through its caption. A narrow gap on the left would split the loop in two.
    const span = (cols - 1) * dx;
    for (const [left, upper, right, lower] of figures) {
      const pocket = left - box.left;
      if (pocket <= 0 || pocket >= span * .48 || right - left <= span * .38) continue;
      const clearance = Math.min(span, right - box.left + 8);
      const approach = Math.min(108, box.width * .26);
      for (let row = 0; row < rows; row++) {
        const docY = top + row * dy;
        const steer = falloff(Math.max(upper - docY, docY - lower), approach);
        if (!steer) continue;
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col, side = clearance * (1 - col / (cols - 1));
          horizontal[i] += steer * Math.max(0, side - horizontal[i]);
        }
      }
    }
    flow.ink = .60 + .40 * freeSpace / rows;
  }

  function updateMask(plot, progress) {
    const { mask, box, inGutter } = plot;
    const ctx = mask.getContext("2d");
    ctx.clearRect(0, 0, mask.width, mask.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, mask.width, mask.height);
    const top = box.top + scrollY;
    // A paused or reduced-motion ribbon holds its pose. The clearance under text
    // still follows the page, including when the visitor scrolls to another section.
    if (!inGutter && (plot.flow.ink === undefined || (!paused && !reduceMotion))) updateFlow(plot, top);
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.filter = inGutter ? "blur(3px)" : "blur(1.25px)";
    ctx.fillStyle = inGutter ? "rgba(0,0,0,.94)" : "#000";
    ctx.beginPath();
    const padX = inGutter ? 12 : 14, padY = inGutter ? 10 : 11;
    const maskX = mask.width / box.width, maskY = mask.height / box.height;
    for (const [x0, y0, x1, y1] of inGutter ? textBoxes : obstacles) {
      if (x1 < box.left - 32 || x0 > box.right + 32 || y1 < top - 32 || y0 > top + box.height + 32) continue;
      if (!inGutter) {
        const left = Math.floor((x0 - box.left) * maskX) - 1, upper = Math.floor((y0 - top) * maskY) - 1;
        ctx.clearRect(left, upper, Math.ceil((x1 - box.left) * maskX) + 1 - left, Math.ceil((y1 - top) * maskY) + 1 - upper);
      }
      ctx.rect((x0 - box.left - padX) / 4, (y0 - top - padY) / 4, (x1 - x0 + 2 * padX) / 4, (y1 - y0 + 2 * padY) / 4);
    }
    ctx.fill();
    ctx.restore();
    if (inGutter) {
      // As the reader leaves the introduction, confine the second trace to the page margin.
      const end = gutter + (1 - progress) * Math.min(90, gutter * .7);
      const start = end - Math.min(100, 26 + gutter * .55);
      const fade = ctx.createLinearGradient((start - box.left) / 4, 0, (end - box.left) / 4, 0);
      fade.addColorStop(0, "#fff");
      fade.addColorStop(1, "transparent");
      ctx.save();
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, mask.width, mask.height);
      ctx.restore();
    }
  }

  // Project successive phase offsets into a single folded ribbon.
  function phasePortrait(ctx, width, height, drive, mix, flow) {
    const { cols, rows, dx, dy, horizontal, vertical } = flow;
    const yaw = -.46 + .27 * Math.sin(.19 * time) + tiltX * .32;
    const tilt = .76 + .18 * Math.cos(.16 * time) + tiltY * .17;
    const cosYaw = Math.cos(yaw), sinYaw = Math.sin(yaw);
    const cosTilt = Math.cos(tilt), sinTilt = Math.sin(tilt);
    const scale = width * .5;
    const strands = width < 340 ? 24 : 37;
    const mainStrand = Math.floor(strands * .66);

    for (let row = 0; row < strands; row++) {
      const v = row / (strands - 1) - .5;
      const phase = time * .25 + .86 + v * 1.76;
      const cp = Math.cos(phase), sp = Math.sin(phase);
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const [c2, s2, c3, s3] = circle[i];
        const wave = shape(s3 * cp + c3 * sp, drive, mix);
        const radius = .62 + .29 * wave + v * .11;
        const x = radius * (c2 * cosYaw - s2 * sinYaw);
        const y = radius * (c2 * sinYaw + s2 * cosYaw);
        const z = .45 * (c3 * cp - s3 * sp) + v * .17;
        let px = .5 * width + scale * x;
        let py = .5 * height + scale * (y * cosTilt - z * sinTilt);
        // Interpolate the cached deformation. The pen follows exactly the same path as the strand.
        let gy = Math.min(rows - 1, Math.max(0, py / dy));
        let iy = Math.min(rows - 2, Math.floor(gy));
        py += vertical[iy] + (gy - iy) * (vertical[iy + 1] - vertical[iy]);
        const gx = px / dx;
        if (gx > 0 && gx < cols - 1) {
          gy = Math.min(rows - 1, Math.max(0, py / dy));
          iy = Math.min(rows - 2, Math.floor(gy));
          const ix = Math.floor(gx), index = iy * cols + ix, fx = gx - ix;
          const above = horizontal[index] + fx * (horizontal[index + 1] - horizontal[index]);
          const below = horizontal[index + cols] + fx * (horizontal[index + cols + 1] - horizontal[index + cols]);
          px += above + (gy - iy) * (below - above);
        }
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        if (row === mainStrand) {
          points[2 * i] = px;
          points[2 * i + 1] = py;
        }
      }
      ctx.globalAlpha = flow.ink * (.22 + .28 * (1 - Math.abs(v + .14)));
      ctx.lineWidth = row === 0 || row === strands - 1 ? 1.15 : .78;
      ctx.stroke();
    }

    // A moving pen makes the winding order visible where the ribbon crosses itself.
    const head = (time * 21 + 36) % steps;
    const first = Math.floor(head);
    ctx.beginPath();
    for (let j = -12; j <= 0; j++) {
      const i = (first + j + steps) % steps;
      if (j === -12) ctx.moveTo(points[2 * i], points[2 * i + 1]);
      else ctx.lineTo(points[2 * i], points[2 * i + 1]);
    }
    const f = head - first;
    const x = points[2 * first] + f * (points[2 * (first + 1)] - points[2 * first]);
    const y = points[2 * first + 1] + f * (points[2 * (first + 1) + 1] - points[2 * first + 1]);
    ctx.lineTo(x, y);
    ctx.globalAlpha = .85 * flow.ink;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, width < 340 ? 1.7 : 2.15, 0, tau);
    ctx.fill();
  }

  // The other view stacks time-domain slices of the same waveshaper.
  function waveformBank(ctx, width, height, drive, mix) {
    const rows = width < 300 ? 23 : 38;
    const samples = 120;
    const scan = .5 + .44 * Math.sin(time * .37);
    for (let row = 0; row < rows; row++) {
      const depth = row / (rows - 1);
      const phase = depth * 4.5 - time * .42;
      const emphasis = Math.exp(-Math.pow((depth - scan) * 15, 2));
      ctx.beginPath();
      for (let i = 0; i <= samples; i++) {
        const u = i / samples;
        const a = u * tau;
        const signal = .83 * Math.sin(1.45 * a + phase) + .17 * Math.sin(2.9 * a - phase);
        const amplitude = shape(signal, drive, mix) * Math.sin(Math.PI * u);
        const x = width * (.02 + u * .84 + (1 - depth) * .12);
        const y = height * (.17 + depth * .61 - u * .09 - amplitude * (.21 + tiltY * .025));
        if (!i) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.globalAlpha = .24 + depth * .17 + emphasis * .35;
      ctx.lineWidth = .76 + emphasis * .62;
      ctx.stroke();
    }
  }

  function draw(stamp) {
    request = 0;
    if (document.hidden || hidePlots) return;
    const moving = !paused && !reduceMotion;
    if (moving && lastFrame !== null && stamp - lastFrame < 32 && !layoutDirty && !maskDirty) {
      schedule();
      return;
    }
    const delta = lastFrame === null ? 0 : Math.min((stamp - lastFrame) / 1000, .08);
    lastFrame = stamp;
    if (moving) {
      time += delta;
      const ease = 1 - Math.exp(-delta * 3);
      tiltX += (pointer.x - tiltX) * ease;
      tiltY += (pointer.y - tiltY) * ease;
    }
    if (layoutDirty) measure();
    const drive = 1.42 + .42 * Math.sin(time * .29) + .24 * tiltX;
    const mix = .48 + .3 * Math.sin(time * .18);
    const scrollFraction = Math.max(0, Math.min(1, scrollY / Math.max(1, heroBottom)));
    const progress = scrollFraction * scrollFraction * (3 - 2 * scrollFraction);
    for (const plot of plots) {
      const { ctx, box, ink, mask } = plot;
      if (!box.width || !box.height) continue;
      if (maskDirty) updateMask(plot, progress);
      ctx.clearRect(0, 0, box.width, box.height);
      ctx.strokeStyle = ctx.fillStyle = ink;
      if (plot.inGutter) waveformBank(ctx, box.width, box.height, drive, mix);
      else phasePortrait(ctx, box.width, box.height, drive, mix, plot.flow);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(mask, 0, 0, box.width, box.height);
      ctx.globalCompositeOperation = "source-over";
    }
    layoutDirty = maskDirty = false;
    if (moving) schedule();
  }

  function schedule() {
    if (!request && !document.hidden && !hidePlots) request = requestAnimationFrame(draw);
  }
  function refreshLayout() {
    layoutDirty = true;
    schedule();
  }
  function refreshMotion() {
    reduceMotion = reduced.matches;
    hidePlots = suppressed.matches;
    button.hidden = reduceMotion || hidePlots;
    button.textContent = paused ? button.dataset.play : button.dataset.pause;
    lastFrame = null;
    refreshLayout();
  }
  button.addEventListener("click", () => {
    paused = !paused;
    try { localStorage.setItem("sasha-signals-paused", String(paused)); } catch { /* Still applies to the page. */ }
    refreshMotion();
  });
  window.addEventListener("pointermove", event => {
    if (event.pointerType === "touch") return;
    pointer.x = 2 * event.clientX / innerWidth - 1;
    pointer.y = 2 * event.clientY / innerHeight - 1;
  }, { passive: true });
  document.addEventListener("pointerleave", () => { pointer.x = pointer.y = 0; });
  window.addEventListener("scroll", () => { maskDirty = true; schedule(); }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    cancelAnimationFrame(request);
    request = 0;
    lastFrame = null;
    schedule();
  });
  new ResizeObserver(refreshLayout).observe(document.body);
  document.addEventListener("toggle", refreshLayout, true);
  window.addEventListener("resize", refreshLayout);
  document.fonts.ready.then(refreshLayout);
  new MutationObserver(refreshLayout).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", refreshLayout);
  reduced.addEventListener("change", refreshMotion);
  suppressed.addEventListener("change", refreshMotion);
  refreshMotion();
})();
