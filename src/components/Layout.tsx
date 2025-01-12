import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">Library of Ruina Blog</h1>
      </header>
      <main>{children}</main>
      <footer className="mt-4">
        <p className="text-center text-gray-500">© 2023 Library of Ruina Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;