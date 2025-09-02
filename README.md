# Whittico's Collision - Premium Auto Body Repair Website

A modern, premium landing site for Whittico's Collision featuring cinematic animations, glassmorphism effects, and conversion-optimized design.

## Features

- **Premium Design**: Modern 2025 aesthetic with cinematic motion and glassmorphism effects
- **Performance Optimized**: Built for LCP < 2.5s and CLS < 0.1 with lazy loading
- **Accessibility First**: Full prefers-reduced-motion support and keyboard navigation
- **Motion Library**: Framer Motion with GSAP for premium animations
- **Responsive**: Mobile-first design with Tailwind CSS
- **3D Effects**: Subtle 3D hover effects and parallax scrolling

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom motion utilities
- **Animations**: Framer Motion + GSAP
- **TypeScript**: Full type safety
- **Icons**: Lucide React
- **Fonts**: Inter + Playfair Display

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind
│   ├── layout.tsx          # Root layout with fonts
│   └── page.tsx            # Main landing page
├── components/
│   ├── motion/             # Reusable motion components
│   │   ├── InViewWrapper.tsx
│   │   └── StaggerContainer.tsx
│   ├── Header.tsx          # Sticky header with glassmorphism
│   ├── Hero.tsx            # Cinematic hero section
│   ├── ContinuityCards.tsx # 3D hover cards
│   └── PartnerAdvantages.tsx # Comparison section
├── lib/
│   └── motion-config.ts    # Central motion configuration
└── public/
    └── (assets)            # Images and videos
```

## Motion System

The site uses a centralized motion configuration system:

- **Durations**: 280-420ms for most elements, 600-800ms for hero
- **Easing**: Smooth ease-out and springy expo curves
- **Accessibility**: Automatic prefers-reduced-motion support
- **Performance**: GPU-accelerated transforms and opacity only

## Sections Completed

✅ Project Setup & Configuration
✅ Motion Configuration System  
✅ Sticky Header with Glassmorphism
✅ Cinematic Hero Section with Particle Effects
✅ Continuity Cards with 3D Hover Effects
✅ Partner Advantages Comparison Section
✅ 60+ Years of Expertise Section with Timeline
✅ Interactive Contact Forms with Validation
✅ Footer with Social Links & Photo Strip
✅ Accessibility Support (prefers-reduced-motion)
✅ Mobile-Responsive Design
✅ TypeScript Integration

## Coming Soon

- Family Team Profiles with Modal Bios
- Certifications Band with Sparkle Effects
- Big CTA Band with Gradient Animation
- Performance Optimization & Lazy Loading
- Real Video Integration
- SEO Optimization

## Performance Goals

- **LCP**: < 2.5s on mobile
- **CLS**: < 0.1
- **FID**: < 100ms
- **Accessibility**: WCAG 2.1 AA compliant

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile: iOS 14+, Android 10+

## License

© 2024 Whittico's Collision. All rights reserved.
