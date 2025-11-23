interface FooterProps {
  language: 'es' | 'en';
}

export function Footer({ language }: FooterProps) {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
        <p>
          &copy; 2025 Barmentech.{' '}
          {language === 'es' ? 'Todos los derechos reservados' : 'All rights reserved'}.
        </p>
      </div>
    </footer>
  );
}
