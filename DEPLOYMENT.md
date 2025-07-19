# Static Deployment Guide for Ubuntu Apache Server

This guide will help you deploy your portfolio as static files on an Ubuntu server with Apache.

## 🚀 Quick Deployment

### Option 1: Automated Deployment (Recommended)

1. **Upload your project to Ubuntu server:**
   ```bash
   # From your local machine
   scp -r . user@your-server-ip:/home/user/portfolio
   ```

2. **SSH into your server:**
   ```bash
   ssh user@your-server-ip
   ```

3. **Run the automated deployment script:**
   ```bash
   cd /home/user/portfolio
   chmod +x deploy-apache.sh
   ./deploy-apache.sh
   ```

### Option 2: Manual Deployment

1. **Install Node.js on Ubuntu:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

2. **Install Apache:**
   ```bash
   sudo apt update
   sudo apt install -y apache2
   ```

3. **Enable required Apache modules:**
   ```bash
   sudo a2enmod rewrite
   sudo a2enmod headers
   sudo a2enmod expires
   sudo a2enmod deflate
   ```

4. **Build the project:**
   ```bash
   npm install
   npm run build
   ```

5. **Deploy to Apache:**
   ```bash
   sudo mkdir -p /var/www/portfolio
   sudo cp -r out/* /var/www/portfolio/
   sudo chown -R www-data:www-data /var/www/portfolio
   sudo chmod -R 755 /var/www/portfolio
   ```

6. **Configure Apache virtual host:**
   ```bash
   # Edit the apache.conf file with your domain
   sudo cp apache.conf /etc/apache2/sites-available/portfolio.conf
   sudo a2ensite portfolio.conf
   sudo a2dissite 000-default.conf
   sudo systemctl restart apache2
   ```

## 🔧 Configuration Files

### Apache Configuration (`apache.conf`)

The `apache.conf` file includes:
- **Gzip compression** for better performance
- **Static file caching** (1 year for assets)
- **Security headers** (X-Frame-Options, X-XSS-Protection, etc.)
- **Client-side routing support** for Next.js
- **Error page handling**

### Next.js Configuration (`next.config.ts`)

Configured for static export:
- `output: 'export'` - Generates static files
- `trailingSlash: true` - Adds trailing slashes for compatibility
- `images: { unoptimized: true }` - Required for static export
- `eslint: { ignoreDuringBuilds: true }` - Skips linting during build

## 📁 File Structure After Build

```
out/
├── index.html          # Main page
├── 404.html           # Error page
├── favicon.ico        # Favicon
├── assets/            # Static assets
├── _next/             # Next.js static files
└── [other static files]
```

## 🔄 Updating Your Portfolio

### Using the Update Script

The deployment creates an `update.sh` script:

```bash
cd /home/user/portfolio
./update.sh
```

### Manual Update

```bash
cd /home/user/portfolio
git pull
npm install
npm run build
sudo cp -r out/* /var/www/portfolio/
sudo chown -R www-data:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio
```

## 🌐 Domain Configuration

1. **Update DNS records** to point your domain to your server IP
2. **Edit apache.conf** and replace `your-domain.com` with your actual domain
3. **Restart Apache:**
   ```bash
   sudo systemctl restart apache2
   ```

## 🔒 SSL Certificate Setup

### Using Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache

# Get SSL certificate
sudo certbot --apache -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Self-Signed Certificate (Testing)

```bash
sudo mkdir -p /etc/ssl/private
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/apache-selfsigned.key \
    -out /etc/ssl/certs/apache-selfsigned.crt
```

## 📊 Monitoring and Logs

### View Apache Logs

```bash
# Error logs
sudo tail -f /var/log/apache2/portfolio_error.log

# Access logs
sudo tail -f /var/log/apache2/portfolio_access.log

# General Apache logs
sudo tail -f /var/log/apache2/error.log
sudo tail -f /var/log/apache2/access.log
```

### Check Apache Status

```bash
sudo systemctl status apache2
sudo apache2ctl configtest
```

## 🛠️ Troubleshooting

### Common Issues

1. **Permission Denied:**
   ```bash
   sudo chown -R www-data:www-data /var/www/portfolio
   sudo chmod -R 755 /var/www/portfolio
   ```

2. **Apache Configuration Error:**
   ```bash
   sudo apache2ctl configtest
   sudo systemctl restart apache2
   ```

3. **Port Already in Use:**
   ```bash
   sudo lsof -i :80
   sudo systemctl stop apache2
   sudo systemctl start apache2
   ```

4. **Build Errors:**
   ```bash
   # Clear cache and rebuild
   rm -rf .next out node_modules
   npm install
   npm run build
   ```

### Performance Optimization

1. **Enable Apache caching:**
   ```bash
   sudo a2enmod cache
   sudo a2enmod cache_disk
   ```

2. **Enable compression:**
   ```bash
   sudo a2enmod deflate
   ```

3. **Monitor performance:**
   ```bash
   # Check Apache performance
   apache2ctl -S
   apache2ctl -M
   ```

## 🔧 Maintenance

### Regular Tasks

1. **Update system packages:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Backup your deployment:**
   ```bash
   tar -czf portfolio-backup-$(date +%Y%m%d).tar.gz /var/www/portfolio
   ```

3. **Monitor disk space:**
   ```bash
   df -h
   du -sh /var/www/portfolio
   ```

4. **Check for security updates:**
   ```bash
   sudo unattended-upgrades --dry-run --debug
   ```

## 📱 Testing

### Local Testing

Before deploying, test locally:

```bash
# Build the project
npm run build

# Serve static files locally
npx serve out
```

### Server Testing

After deployment:

```bash
# Test HTTP response
curl -I http://your-domain.com

# Test static files
curl -I http://your-domain.com/favicon.ico

# Check for errors
sudo tail -f /var/log/apache2/error.log
```

## 🎯 Success Checklist

- [ ] Static build completes without errors
- [ ] Files copied to `/var/www/portfolio/`
- [ ] Apache virtual host configured
- [ ] Permissions set correctly
- [ ] Apache restarted successfully
- [ ] Domain resolves to server
- [ ] SSL certificate installed (if using domain)
- [ ] Portfolio loads correctly
- [ ] All links and images work
- [ ] Mobile responsiveness tested

## 📞 Support

If you encounter issues:

1. Check Apache error logs
2. Verify file permissions
3. Test Apache configuration
4. Ensure all modules are enabled
5. Check firewall settings

Your portfolio should now be live and accessible via your domain or server IP! 