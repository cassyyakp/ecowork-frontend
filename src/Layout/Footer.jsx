const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Espaces verts", href: "/espaces" },
  { label: "À propos", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function LeafIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 8C8 10 5.9 16.17 3.82 19.34L5.71 21l1-1.29C7.92 19.94 9.27 20 10 20c5 0 10-3 10-10 0-1-.17-2-.17-2S19 6 17 8z" />
    </svg>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 text-green-800 group w-fit">
            <span className="text-green-600 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300">
              <LeafIcon />
            </span>
            <span className="text-xl font-semibold tracking-wide">Greenspace</span>
          </a>

          {/* Nav */}
          <nav>
            <ul className="flex flex-wrap gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-stone-500 hover:text-green-700 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full pb-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-200 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-stone-400">
            © {year} Greenspace. Tous droits réservés.
          </p>
          <p className="text-xs text-stone-300 italic">
            Des espaces verts pour tous.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;