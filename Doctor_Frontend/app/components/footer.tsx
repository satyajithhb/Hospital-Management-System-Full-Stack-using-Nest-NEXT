import React from 'react';

export default function Footer() {
  return (<>
    <footer className="flex justify-center items-center px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
      <p className="text-sm">
        © {new Date().getFullYear()} Doctor Portal. All rights reserved.
      </p>
    </footer>
    </>
  );
}
