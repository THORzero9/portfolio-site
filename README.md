# Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring a 3D Nothing Phone interface and smooth animations.

## Features

- 🎨 Modern UI with Inter and JetBrains Mono fonts
- 📱 3D Nothing Phone interface with scroll-based interactions
- 🌙 Dark/Light theme support
- ⚡ Optimized performance with Next.js 15
- 🎭 Smooth animations with Framer Motion
- 📱 Responsive design for all devices
- 🔒 Security headers and HTTPS support

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter, JetBrains Mono
- **Deployment**: Docker, Nginx

## Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Ubuntu Server Deployment

### Prerequisites

- Ubuntu 20.04+ server
- SSH access to the server
- Domain name (optional, for production)

### Quick Deployment

1. **Upload your project to the server**
   ```bash
   # From your local machine
   scp -r . user@your-server-ip:/home/user/portfolio
   ```

2. **SSH into your server**
   ```bash
   ssh user@your-server-ip
   ```

3. **Run the deployment script**
   ```bash
   cd /home/user/portfolio
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Manual Deployment

If you prefer manual deployment:

1. **Install Docker and Docker Compose**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Docker
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt update
   sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
   sudo usermod -aG docker $USER
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. **Configure firewall**
   ```bash
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw --force enable
   ```

3. **Set up SSL certificates**
   ```bash
   # For Let's Encrypt (recommended for production)
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   
   # Or generate self-signed certificate for testing
   sudo mkdir -p /etc/nginx/ssl
   sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
       -keyout /etc/nginx/ssl/key.pem \
       -out /etc/nginx/ssl/cert.pem \
       -subj "/C=US/ST=State/L=City/O=Organization/CN=your-domain.com"
   ```

4. **Update configuration files**
   - Edit `nginx.conf` and replace `your-domain.com` with your actual domain
   - Update SSL certificate paths if using Let's Encrypt

5. **Deploy with Docker Compose**
   ```bash
   docker-compose up -d --build
   ```

### SSL Certificate Setup (Let's Encrypt)

For production with a real domain:

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain SSL certificate**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **Update nginx configuration**
   ```bash
   # Update the SSL certificate paths in nginx.conf
   sudo sed -i 's|/etc/nginx/ssl/cert.pem|/etc/letsencrypt/live/your-domain.com/fullchain.pem|g' nginx.conf
   sudo sed -i 's|/etc/nginx/ssl/key.pem|/etc/letsencrypt/live/your-domain.com/privkey.pem|g' nginx.conf
   ```

4. **Restart services**
   ```bash
   docker-compose restart
   ```

### Management Commands

```bash
# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Update deployment
git pull
docker-compose up -d --build

# Check container status
docker-compose ps

# Access container shell
docker-compose exec portfolio sh
```

### Auto-start on Boot

The deployment script creates a systemd service for auto-start:

```bash
# Enable auto-start
sudo systemctl enable portfolio.service

# Start service
sudo systemctl start portfolio.service

# Check status
sudo systemctl status portfolio.service
```

### Backup and Maintenance

1. **Regular backups**
   ```bash
   # Backup configuration
   tar -czf portfolio-backup-$(date +%Y%m%d).tar.gz /home/user/portfolio
   ```

2. **Update system packages**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

3. **Monitor logs**
   ```bash
   # Application logs
   docker-compose logs -f portfolio
   
   # Nginx logs
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

## Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Performance Optimization

The application includes several optimizations:

- **Image optimization** with Next.js Image component
- **Code splitting** and lazy loading
- **Gzip compression** via Nginx
- **Static file caching** for better performance
- **Rate limiting** to prevent abuse

## Security Features

- **HTTPS enforcement** with HSTS headers
- **Security headers** (X-Frame-Options, X-XSS-Protection, etc.)
- **Rate limiting** on API endpoints
- **Content Security Policy** headers
- **Docker containerization** for isolation

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   sudo lsof -i :3000
   sudo kill -9 <PID>
   ```

2. **Docker permission issues**
   ```bash
   sudo usermod -aG docker $USER
   # Log out and log back in
   ```

3. **SSL certificate issues**
   ```bash
   sudo certbot renew --dry-run
   ```

4. **Nginx configuration errors**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Log Locations

- **Application logs**: `docker-compose logs portfolio`
- **Nginx logs**: `/var/log/nginx/`
- **System logs**: `journalctl -u portfolio.service`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For deployment issues or questions:
1. Check the troubleshooting section
2. Review the logs
3. Create an issue in the repository
