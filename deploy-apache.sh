#!/bin/bash

# Portfolio Static Deployment Script for Ubuntu Apache Server
# Usage: ./deploy-apache.sh

set -e

echo "🚀 Starting portfolio static deployment for Apache..."

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

# Install Node.js
print_status "Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
    print_status "Node.js installed successfully"
else
    print_status "Node.js is already installed"
fi

# Install Apache
print_status "Installing Apache..."
sudo apt install -y apache2

# Enable required Apache modules
print_status "Enabling Apache modules..."
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod expires
sudo a2enmod deflate

# Configure firewall
print_status "Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Create deployment directory
DEPLOY_DIR="/home/$USER/portfolio"
print_status "Creating deployment directory: $DEPLOY_DIR"
mkdir -p $DEPLOY_DIR

# Copy project files
print_status "Copying project files..."
cp -r . $DEPLOY_DIR/
cd $DEPLOY_DIR

# Install dependencies
print_status "Installing Node.js dependencies..."
npm install

# Build the project
print_status "Building static files..."
npm run build

# Create Apache web directory
print_status "Setting up Apache web directory..."
sudo mkdir -p /var/www/portfolio

# Copy built files to Apache directory
print_status "Copying built files to Apache directory..."
sudo cp -r out/* /var/www/portfolio/

# Set proper permissions
print_status "Setting proper permissions..."
sudo chown -R www-data:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio

# Update Apache configuration with correct domain
print_status "Updating Apache configuration..."
read -p "Enter your domain name (or press Enter for localhost): " DOMAIN_NAME
DOMAIN_NAME=${DOMAIN_NAME:-localhost}

# Update apache.conf with domain name
sed -i "s/your-domain.com/$DOMAIN_NAME/g" apache.conf

# Copy Apache configuration
print_status "Configuring Apache virtual host..."
sudo cp apache.conf /etc/apache2/sites-available/portfolio.conf
sudo a2ensite portfolio.conf

# Disable default site
sudo a2dissite 000-default.conf

# Test Apache configuration
print_status "Testing Apache configuration..."
sudo apache2ctl configtest

# Restart Apache
print_status "Restarting Apache..."
sudo systemctl restart apache2

# Wait for Apache to be ready
print_status "Waiting for Apache to be ready..."
sleep 5

# Check if Apache is running
if sudo systemctl is-active --quiet apache2; then
    print_status "✅ Deployment successful!"
    print_status "Your portfolio is now running at:"
    echo "   HTTP:  http://$DOMAIN_NAME"
    echo ""
    print_status "Useful commands:"
    echo "   View Apache logs: sudo tail -f /var/log/apache2/portfolio_error.log"
    echo "   Restart Apache: sudo systemctl restart apache2"
    echo "   Check Apache status: sudo systemctl status apache2"
    echo "   Update deployment: git pull && npm run build && sudo cp -r out/* /var/www/portfolio/"
else
    print_error "❌ Deployment failed! Check Apache logs with: sudo journalctl -u apache2"
    exit 1
fi

# Create update script
cat > update.sh << 'EOF'
#!/bin/bash
cd /home/$USER/portfolio
git pull
npm install
npm run build
sudo cp -r out/* /var/www/portfolio/
sudo chown -R www-data:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio
echo "Portfolio updated successfully!"
EOF

chmod +x update.sh

print_status "Update script created: ./update.sh"

# Create systemd service for auto-start (optional)
print_status "Creating systemd service for auto-start..."
sudo tee /etc/systemd/system/portfolio-update.service > /dev/null << EOF
[Unit]
Description=Portfolio Update Service
After=network.target

[Service]
Type=oneshot
User=$USER
WorkingDirectory=$DEPLOY_DIR
ExecStart=/bin/bash -c 'git pull && npm run build && sudo cp -r out/* /var/www/portfolio/ && sudo chown -R www-data:www-data /var/www/portfolio && sudo chmod -R 755 /var/www/portfolio'

[Install]
WantedBy=multi-user.target
EOF

print_status "🎉 Static deployment completed successfully!"
print_warning "Remember to:"
echo "   1. Update your domain DNS to point to this server"
echo "   2. Configure SSL certificate with Let's Encrypt if needed"
echo "   3. Set up regular backups"
echo "   4. Monitor Apache logs for any issues"

print_status "To update your portfolio in the future, run: ./update.sh" 