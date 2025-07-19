#!/bin/bash

# Portfolio Deployment Script for Ubuntu Server
# Usage: ./deploy.sh

set -e

echo "🚀 Starting portfolio deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Update system packages
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
print_status "Installing required packages..."
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Install Docker
print_status "Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo usermod -aG docker $USER
    print_status "Docker installed successfully"
else
    print_status "Docker is already installed"
fi

# Install Docker Compose
print_status "Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    print_status "Docker Compose installed successfully"
else
    print_status "Docker Compose is already installed"
fi

# Install Nginx (if not using Docker)
print_status "Installing Nginx..."
sudo apt install -y nginx

# Configure firewall
print_status "Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Create SSL directory
print_status "Creating SSL directory..."
sudo mkdir -p /etc/nginx/ssl

# Generate self-signed SSL certificate (for testing)
print_status "Generating self-signed SSL certificate..."
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/key.pem \
    -out /etc/nginx/ssl/cert.pem \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Create deployment directory
DEPLOY_DIR="/home/$USER/portfolio"
print_status "Creating deployment directory: $DEPLOY_DIR"
mkdir -p $DEPLOY_DIR

# Copy project files
print_status "Copying project files..."
cp -r . $DEPLOY_DIR/
cd $DEPLOY_DIR

# Update nginx configuration with correct domain
print_status "Updating Nginx configuration..."
read -p "Enter your domain name (or press Enter for localhost): " DOMAIN_NAME
DOMAIN_NAME=${DOMAIN_NAME:-localhost}

# Update nginx.conf with domain name
sed -i "s/your-domain.com/$DOMAIN_NAME/g" nginx.conf

# Build and start containers
print_status "Building and starting containers..."
docker-compose up -d --build

# Wait for containers to be ready
print_status "Waiting for containers to be ready..."
sleep 30

# Check if containers are running
if docker-compose ps | grep -q "Up"; then
    print_status "✅ Deployment successful!"
    print_status "Your portfolio is now running at:"
    echo "   HTTP:  http://$DOMAIN_NAME"
    echo "   HTTPS: https://$DOMAIN_NAME"
    echo ""
    print_status "Useful commands:"
    echo "   View logs: docker-compose logs -f"
    echo "   Stop services: docker-compose down"
    echo "   Restart services: docker-compose restart"
    echo "   Update deployment: git pull && docker-compose up -d --build"
else
    print_error "❌ Deployment failed! Check logs with: docker-compose logs"
    exit 1
fi

# Create update script
cat > update.sh << 'EOF'
#!/bin/bash
cd /home/$USER/portfolio
git pull
docker-compose down
docker-compose up -d --build
echo "Portfolio updated successfully!"
EOF

chmod +x update.sh

print_status "Update script created: ./update.sh"

# Create systemd service for auto-start
print_status "Creating systemd service for auto-start..."
sudo tee /etc/systemd/system/portfolio.service > /dev/null << EOF
[Unit]
Description=Portfolio Docker Compose
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$DEPLOY_DIR
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable portfolio.service
print_status "Systemd service enabled for auto-start"

print_status "🎉 Deployment completed successfully!"
print_warning "Remember to:"
echo "   1. Replace the self-signed SSL certificate with a real one (Let's Encrypt)"
echo "   2. Update your domain DNS to point to this server"
echo "   3. Configure your firewall rules as needed"
echo "   4. Set up regular backups" 