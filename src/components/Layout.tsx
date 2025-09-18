import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Scale, Upload, Search, FileText, GitCompare, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const Layout = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: Upload },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Summarize', path: '/summarize', icon: FileText },
    { name: 'Compare', path: '/compare', icon: GitCompare },
    { name: 'Timeline', path: '/timeline', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-card shadow-soft border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg">
                <Scale className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">LegalAI Assistant</h1>
                <p className="text-xs text-muted-foreground">Document Analysis & Research</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-card shadow-soft border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center space-x-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors',
                      isActive
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-accent'
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;