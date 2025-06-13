import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;
  const toggleSidebar = () => setIsOpen(!isOpen);

  const linkStyle = (active: boolean) => ({
    fontWeight: active ? 'bold' : 'normal',
    color: 'white',
    display: 'block',
    padding: '6px 0',
    cursor: 'pointer',
    textDecoration: 'none',
  });

  return (
    <>
      <button
        className="mobile-menu-button"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
        style={{
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: 1001,
          background: '#1e40af',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          fontSize: '18px',
          cursor: 'pointer',
          borderRadius: 4,
          display: 'none', // esconder por padrão, mostrar via media query no css
        }}
      >
        ☰
      </button>

      <nav
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{
          backgroundColor: '#1e40af',
          padding: '20px',
          height: '100vh',
          color: 'white',
          width: '220px',
          position: 'fixed',
          top: 0,
          left: isOpen ? 0 : '-250px', // esconder lateralmente se fechado
          transition: 'left 0.3s ease',
          overflowY: 'auto',
          zIndex: 1000,
        }}
      >
        <h2 style={{ margin: '40px 0 20px' }}>AeroMesh</h2>

        <Link href="/" style={linkStyle(isActive('/'))}>
          Home
        </Link>

        <Link href="/example1" style={linkStyle(isActive('/example1'))}>
          Exemplo 1
        </Link>

        <div className="nested-links" style={{ marginTop: '20px' }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Aninhados</div>

          <Link href="/nested/nested1" style={linkStyle(isActive('/nested/nested1'))}>
            Nested 1
          </Link>

          <Link href="/nested/nested2" style={linkStyle(isActive('/nested/nested2'))}>
            Nested 2
          </Link>
        </div>
      </nav>

      {/* Overlay para fechar sidebar quando clicado fora (mobile) */}
      {isOpen && (
        <div
          className="overlay"
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 900,
          }}
        ></div>
      )}

      <style jsx>{`
        /* Mostrar botão somente em telas pequenas */
        @media (max-width: 768px) {
          button.mobile-menu-button {
            display: block !important;
          }
          nav.sidebar {
            width: 220px;
            left: -250px; /* fechado por padrão no mobile */
          }
          nav.sidebar.open {
            left: 0;
          }
        }

        /* Em telas grandes sidebar sempre visível e botão oculto */
        @media (min-width: 769px) {
          button.mobile-menu-button {
            display: none !important;
          }
          nav.sidebar {
            left: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
