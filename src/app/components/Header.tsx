'use client';

import Link from 'next/link';
import CartIcon from './CartIcon';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import { Product } from '../../types/product';
import SearchBar from './SearchBar';
import { useAuthContext } from '../providers/AuthProvider';

interface HeaderProps {
  products: Product[];
}

export default function Header({ products }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userMenuTimeout, setUserMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const { user, logout } = useAuthContext();

  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUserMenuOpen = () => {
    if (userMenuTimeout) {
      clearTimeout(userMenuTimeout);
      setUserMenuTimeout(null);
    }
    setIsUserMenuOpen(true);
  };

  const handleUserMenuClose = () => {
    const timeout = setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 300);
    setUserMenuTimeout(timeout);
  };

  return (
    <header className={`fixed w-full z-50 transition-all ${scrolled ? 'bg-blue-700 shadow-lg' : 'bg-blue-600'} text-white`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center">
            <span className="hidden sm:inline">E-Commerce</span>
            <span className="sm:hidden">EC</span>
          </Link>

          {/* Barra de Busca (Desktop) */}
          <div className="hidden md:flex flex-1 mx-6 max-w-xl">
            <SearchBar />
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6 items-center">
              <li>
                <Link 
                  href="/" 
                  className={`hover:text-blue-200 transition-colors ${pathname === '/' ? 'font-bold border-b-2 border-white' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`hover:text-blue-200 transition-colors ${pathname === '/about' ? 'font-bold border-b-2 border-white' : ''}`}
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className={`hover:text-blue-200 transition-colors ${pathname === '/products' ? 'font-bold border-b-2 border-white' : ''}`}
                >
                  Produtos
                </Link>
              </li>
              
              {/* Área de Autenticação Desktop */}
              {user ? (
                <li 
                  className="relative"
                  onMouseEnter={handleUserMenuOpen}
                  onMouseLeave={handleUserMenuClose}
                >
                  <button 
                    className="flex items-center space-x-1 hover:text-blue-200"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>{user.email}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-1"
                      onMouseEnter={handleUserMenuOpen}
                      onMouseLeave={handleUserMenuClose}
                    >
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 hover:bg-blue-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUserMenuOpen(false);
                        }}
                      >
                        Meu Perfil
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50"
                      >
                        Sair
                      </button>
                    </div>
                  )}
                </li>
              ) : (
                <li>
                  <Link 
                    href="/auth" 
                    className="flex items-center space-x-1 hover:text-blue-200"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Entrar</span>
                  </Link>
                </li>
              )}
              
              <li>
                <CartIcon />
              </li>
            </ul>
          </nav>

          {/* Botões Mobile */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 focus:outline-none"
              aria-label="Buscar"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
            <CartIcon />
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 focus:outline-none"
              aria-label="Menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Barra de Busca Mobile */}
        {searchOpen && (
          <div className="md:hidden py-3">
            <SearchBar mobile />
          </div>
        )}

        {/* Menu Mobile */}
        {isOpen && (
          <nav className="md:hidden pb-4">
            <ul className="flex flex-col space-y-3">
              <li>
                <Link 
                  href="/" 
                  className={`block py-2 ${pathname === '/' ? 'font-bold bg-blue-500 rounded px-3' : 'hover:bg-blue-500 hover:rounded px-3'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`block py-2 ${pathname === '/about' ? 'font-bold bg-blue-500 rounded px-3' : 'hover:bg-blue-500 hover:rounded px-3'}`}
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className={`block py-2 ${pathname === '/products' ? 'font-bold bg-blue-500 rounded px-3' : 'hover:bg-blue-500 hover:rounded px-3'}`}
                >
                  Produtos
                </Link>
              </li>
              
              {/* Área de Autenticação Mobile */}
              {user ? (
                <>
                  <li>
                    <Link 
                      href="/profile" 
                      className={`block py-2 ${pathname === '/profile' ? 'font-bold bg-blue-500 rounded px-3' : 'hover:bg-blue-500 hover:rounded px-3'}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Meu Perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        logout();
                      }}
                      className="w-full text-left py-2 hover:bg-blue-500 hover:rounded px-3"
                    >
                      Sair
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    href="/auth" 
                    className={`block py-2 ${pathname === '/auth' ? 'font-bold bg-blue-500 rounded px-3' : 'hover:bg-blue-500 hover:rounded px-3'}`}
                  >
                    Entrar / Registrar
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}