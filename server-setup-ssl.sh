#!/usr/bin/env bash
# Run this ONCE via your VPS console (KVM/VNC) or any root session.
# It sets up passwordless sudo for the sasha user (deploy-only commands)
# and gets the SSL certificate.
set -euo pipefail

# Allow sasha to restart the portfolio service and run certbot without a password
cat > /etc/sudoers.d/sasha-deploy << 'EOF'
sasha ALL=(ALL) NOPASSWD: /bin/systemctl restart portfolio, /bin/systemctl start portfolio, /bin/systemctl stop portfolio, /bin/systemctl status portfolio, /usr/bin/certbot
EOF
chmod 440 /etc/sudoers.d/sasha-deploy

echo "Sudoers configured."

# Get SSL certificate
certbot --nginx \
  -d sashasalzanoweir.com \
  -d www.sashasalzanoweir.com \
  --non-interactive \
  --agree-tos \
  -m a.salzanoweir@humanity.link \
  --redirect

echo "SSL certificate obtained. Site is live at https://sashasalzanoweir.com"
