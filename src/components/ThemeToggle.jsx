import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="ms-3 d-flex align-items-center">
      <button
        onClick={toggleTheme}
        className="bg-transparent border-0"
        aria-label="Toggle theme"
        style={{ cursor: 'pointer' }}
      >
        {theme === 'light' ? (
          <i className="bi bi-moon-fill fs-5" style={{ color: 'var(--text-primary)' }}></i>
        ) : (
          <i className="bi bi-brightness-high-fill fs-5" style={{ color: 'var(--text-primary)' }}></i>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;