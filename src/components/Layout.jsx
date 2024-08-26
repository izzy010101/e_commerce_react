import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children, container }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans antialiased">
      <Navigation />
      <main
        className={`flex-grow ${container ? 'container py-12 p-4 sm:p-16' : ''} mx-auto `}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
