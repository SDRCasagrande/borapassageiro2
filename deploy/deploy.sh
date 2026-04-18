#!/bin/bash
# deploy.sh — Deploy Bora Passageiro to Hostinger VPS
# Usage: ./deploy/deploy.sh
# Prerequisites: SSH access to the VPS

VPS_IP="76.13.165.250"
VPS_USER="root"
REMOTE_PATH="/var/www/borapassageiro"
NGINX_CONF="/etc/nginx/sites-available/borapassageiro"

echo "🚀 Bora Passageiro — Deploy Script"
echo "═══════════════════════════════════"

# Step 1: Build
echo ""
echo "📦 Building production bundle..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi
echo "✅ Build complete!"

# Step 2: Upload dist
echo ""
echo "📤 Uploading to VPS ($VPS_IP)..."
ssh $VPS_USER@$VPS_IP "mkdir -p $REMOTE_PATH"
scp -r dist/* $VPS_USER@$VPS_IP:$REMOTE_PATH/dist/
scp deploy/nginx.conf $VPS_USER@$VPS_IP:$NGINX_CONF
echo "✅ Files uploaded!"

# Step 3: Configure Nginx
echo ""
echo "⚙️  Configuring Nginx..."
ssh $VPS_USER@$VPS_IP << 'EOF'
    # Enable site
    ln -sf /etc/nginx/sites-available/borapassageiro /etc/nginx/sites-enabled/
    
    # Test config
    nginx -t
    if [ $? -eq 0 ]; then
        systemctl reload nginx
        echo "✅ Nginx reloaded!"
    else
        echo "❌ Nginx config error!"
        exit 1
    fi
EOF

echo ""
echo "🎉 Deploy complete!"
echo "═══════════════════════════════════"
echo "📱 Passageiro: https://passageiro.borapassageiroxinguara.com.br"
echo "🚗 Motorista:  https://motorista.borapassageiroxinguara.com.br"
echo "🔧 Admin:      https://admin.borapassageiroxinguara.com.br"
