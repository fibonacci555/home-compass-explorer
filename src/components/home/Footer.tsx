
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Home Compass Explorer</h2>
          <p className="max-w-md mx-auto mb-8">
            Your trusted companion in finding the perfect home anywhere in the world.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map(social => (
              <a key={social} href="#" className="hover:text-blue-400 transition-colors">
                {social}
              </a>
            ))}
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Home Compass Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
