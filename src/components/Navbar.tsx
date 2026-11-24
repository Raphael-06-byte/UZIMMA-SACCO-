import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeView: 'landing' | 'portal';
  onOpenPortal: () => void;
  onReturnPublic: () => void;
  onOpenRegister: () => void;
}

const PUBLIC_LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'Calculator', href: '#calculator' },
  { label: 'Resources', href: '#resources' },
  { label: 'Branches', href: '#branches' },
];

export function Navbar({
  activeView,
  onOpenPortal,
  onReturnPublic,
  onOpenRegister,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (activeView !== 'landing') {
      onReturnPublic();
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            if (activeView === 'portal') {
              e.preventDefault();
              onReturnPublic();
            }
          }}
          className="font-display text-xl font-bold tracking-tight text-emerald-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 rounded"
        >
          Uzima SACCO
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {PUBLIC_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className="hover:text-emerald-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {activeView === 'landing' ? (
            <button
              type="button"
              onClick={onOpenPortal}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            >
              Member Portal
            </button>
          ) : (
            <button
              type="button"
              onClick={onReturnPublic}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-emerald-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            >
              Public Website
            </button>
          )}

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {PUBLIC_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-900 rounded-lg"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenRegister();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors cursor-pointer"
            >
              Become a Member
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                if (activeView === 'landing') {
                  onOpenPortal();
                } else {
                  onReturnPublic();
                }
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
            >
              {activeView === 'landing' ? 'Member Portal Login' : 'Return to Public Website'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
