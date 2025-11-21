'use client';

import { tactikaXThemeConfig } from '../theme.config';

export function TactikaXFooter() {
  const { name, footer, contact, social } = tactikaXThemeConfig;

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <h3>{name}</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: 20 }}>
              {footer.description}
            </p>
            <div className="social-links">
              {social.facebook && (
                <a href={social.facebook}>
                  <i className="fab fa-facebook-f"></i>
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram}>
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {social.whatsapp && (
                <a href={social.whatsapp}>
                  <i className="fab fa-whatsapp"></i>
                </a>
              )}
              {social.tiktok && (
                <a href={social.tiktok}>
                  <i className="fab fa-tiktok"></i>
                </a>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h3>Categorías</h3>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Defensa Personal
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Equipamiento Táctico
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Vestimenta
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Outdoor & Camping
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Accesorios
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div className="footer-section">
            <h3>Información</h3>
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Políticas de Venta
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-chevron-right"></i> Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3>Contacto</h3>
            <ul>
              <li>
                <a href={`tel:${contact.phone}`}>
                  <i className="fas fa-phone"></i> {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>
                  <i className="fas fa-envelope"></i> {contact.email}
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-map-marker-alt"></i> {contact.address}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${contact.whatsapp}`}>
                  <i className="fab fa-whatsapp"></i> WhatsApp 24/7
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
