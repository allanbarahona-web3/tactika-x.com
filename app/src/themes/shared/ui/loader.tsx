'use client';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function Loader({ size = 'md', text }: LoaderProps) {
  const sizeClass = size === 'sm' ? 'loader-sm' : size === 'lg' ? 'loader-lg' : '';

  return (
    <div className="loader-container">
      <div className={`loader ${sizeClass}`.trim()}></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}
