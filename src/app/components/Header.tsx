'use client';

import Link from 'next/link';
import CartIcon from './CartIcon';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Product } from '../../types/product'; // Importando o tipo Product
import SearchBar from './SearchBar'; // Novo componente que vamos criar

interface HeaderProps {
  products: Product[]; // Adicionamos a prop de produtos
}

export default function Header({ products }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // Estado para controle da busca mobile
  const pathname = usePathname();

  // Fechar menus quando navegar
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Efeito de scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <SearchBar  />
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
              <li className="ml-4">
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
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}