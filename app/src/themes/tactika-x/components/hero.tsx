'use client';

import { tactikaXThemeConfig } from '../theme.config';

interface HeroProps {
  onCategoryClick?: (category: string) => void;
}

export function TactikaXHero({}: HeroProps) {
  const { hero } = tactikaXThemeConfig;

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="hero-badge">{hero.badge}</span>
          <h2 dangerouslySetInnerHTML={{ __html: hero.title }} />
          <p>{hero.subtitle}</p>
          <div className="hero-buttons">
            <a href={hero.ctaPrimary.href} className="btn btn-primary">
              <i className={hero.ctaPrimary.icon}></i> {hero.ctaPrimary.text}
            </a>
            <a
              href={hero.ctaSecondary.href}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={hero.ctaSecondary.icon}></i> {hero.ctaSecondary.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
