# Mabdev IT Solutions - Website

Official website for Mabdev IT Solutions, built with Jekyll and optimized for GitHub Pages.

## Features

- Dark mode design with Linear-inspired aesthetic
- Bilingual support (English & Portuguese)
- Responsive design for all devices
- Smooth scroll animations
- Formspree contact form integration
- SEO optimized

## Quick Start

### Prerequisites

- Ruby 2.7+ installed
- Bundler gem (`gem install bundler`)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/vmabellini/mabdev-site.git
   cd mabdev-site
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run local server**
   ```bash
   bundle exec jekyll serve
   ```

4. **View the site**
   Open [http://localhost:4000](http://localhost:4000) in your browser.

## Configuration

### Site Settings

Edit `_config.yml` to update:
- Site title and description
- Author information
- Social links
- Base URL (if not using root domain)

### Content

All content is stored in YAML files for easy editing:

- `_data/en.yml` - English content
- `_data/pt.yml` - Portuguese content

### Contact Form (Formspree)

1. Create a free account at [Formspree](https://formspree.io)
2. Create a new form and copy the form ID
3. Replace `YOUR_FORM_ID` in both `index.html` and `pt/index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Adding Your Photo

Replace the placeholder in the About section:

1. Add your photo to `assets/images/` (recommended: `profile.jpg`)
2. Update the About section in both index files to use an `<img>` tag

## Deployment to GitHub Pages

This site uses **GitHub Actions** for deployment (see `.github/workflows/deploy.yml`).

### Setup

1. Push this code to GitHub
2. Go to repository **Settings > Pages**
3. Under "Build and deployment", select **Source: GitHub Actions**
4. Push to `main` branch - the site will deploy automatically

### Custom Domain (mabdev.com)

1. In your repository, go to Settings > Pages
2. Add your custom domain: `mabdev.com`
3. Create a `CNAME` file in the root with your domain:
   ```
   mabdev.com
   ```
4. Configure DNS at your domain registrar:
   - For apex domain (`mabdev.com`):
     ```
     A     @     185.199.108.153
     A     @     185.199.109.153
     A     @     185.199.110.153
     A     @     185.199.111.153
     ```
   - For www subdomain:
     ```
     CNAME www   vmabellini.github.io
     ```

5. Enable "Enforce HTTPS" in GitHub Pages settings

## Project Structure

```
mabdev-site/
├── _config.yml          # Jekyll configuration
├── _data/
│   ├── en.yml           # English content
│   └── pt.yml           # Portuguese content
├── _includes/           # Reusable components
├── _layouts/
│   └── default.html     # Main layout
├── assets/
│   ├── css/
│   │   └── main.css     # Styles
│   ├── js/
│   │   └── main.js      # JavaScript
│   └── images/
│       ├── logo.svg     # Logo
│       └── favicon.svg  # Favicon
├── brand/
│   └── BRAND_GUIDELINES.md  # Brand documentation
├── pt/
│   └── index.html       # Portuguese homepage
├── index.html           # English homepage
├── Gemfile              # Ruby dependencies
└── README.md            # This file
```

## Customization

### Colors

Brand colors are defined as CSS variables in `assets/css/main.css`:

```css
:root {
  --color-charcoal: #2D2D2D;
  --color-off-black: #1A1A1A;
  --color-amber: #F59E0B;
  /* ... */
}
```

### Typography

The site uses:
- **Inter** - Primary font for UI and content
- **JetBrains Mono** - Code snippets and technical content

Loaded via Google Fonts in the layout.

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

All rights reserved. This website and its content are proprietary to Mabdev IT Solutions.

---

Built with Jekyll | Designed following [Mabdev Brand Guidelines](brand/BRAND_GUIDELINES.md)
