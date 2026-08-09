"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, Globe, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductsMegaMenu } from './header/ProductsMegaMenu';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200" onMouseLeave={() => setActiveDropdown(null)}>
      {/* Top Utility Bar */}
      <div className="bg-[#D61118] text-white text-xs py-2 px-4">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-medium tracking-wide text-center md:text-left">
            Visiting from a different region? View local portfolio: 
            <span className="ml-2 cursor-pointer hover:underline text-white/90 hover:text-white">China</span> | 
            <span className="mx-1 cursor-pointer hover:underline text-white/90 hover:text-white">Bangladesh</span> | 
            <span className="mx-1 cursor-pointer hover:underline text-white/90 hover:text-white">ASEAN</span>
          </p>
          
          <div className="flex items-center gap-6 font-medium">
            <nav className="hidden md:flex gap-4">
              <a href="#" className="hover:text-white/80 transition-colors">Find TDS</a>
              <a href="#" className="hover:text-white/80 transition-colors">Find SDS</a>
              <Link href="/contact" className="hover:text-white/80 transition-colors">Contact</Link>
              <a href="#" className="hover:text-white/80 transition-colors">Distributor Inquiry</a>
            </nav>
            <div className="flex items-center gap-1 cursor-pointer hover:text-slate-100">
              <Globe className="w-3 h-3" />
              <span className="font-bold">EN</span>
              <span className="opacity-50">|</span>
              <span className="hover:text-white/80">中文</span>
              <span className="opacity-50">|</span>
              <span className="hover:text-white/80">বাংলা</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white py-4 px-4 relative">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="HXHD Logo" width={160} height={48} className="h-12 w-auto" priority />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-slate-800 uppercase tracking-tight h-full">
            {['Products', 'Applications', 'Services', 'Brands', 'Industries', 'Knowledge', 'Support'].map((item) => (
              <div 
                key={item}
                className="h-full flex items-center relative"
                onMouseEnter={() => setActiveDropdown(item)}
              >
                <Link 
                  href={item === 'Products' ? '/products' : '#'}
                  className={`group flex items-center gap-1 hover:text-[#D61118] transition-colors py-4 ${activeDropdown === item ? 'text-[#D61118]' : ''}`}
                >
                  {item}
                  {(item === 'Products' || item === 'Applications' || item === 'Industries') && (
                    <ChevronDown className={`w-3 h-3 text-slate-400 group-hover:text-[#D61118] transition-transform ${activeDropdown === item ? 'rotate-180' : ''}`} />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/products"
              className="p-2 text-slate-600 hover:text-[#D61118] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <a href="#" className="px-5 py-2.5 bg-[#D61118] text-white text-sm font-semibold hover:bg-[#b00d13] transition-colors rounded-none">
              Request Sample
            </a>
            <a href="#" className="px-5 py-2.5 border-2 border-[#D61118] text-[#D61118] text-sm font-semibold hover:bg-[#D61118] hover:text-white transition-colors rounded-none">
              Technical Team
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mega Menu Overlay */}
      {activeDropdown === 'Products' && (
        <ProductsMegaMenu 
          onClose={() => setActiveDropdown(null)}
        />
      )}

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-xl py-4 px-4 flex flex-col gap-4 z-40">
          {['Products', 'Applications', 'Services', 'Brands', 'Industries', 'Knowledge', 'Support'].map((item) => (
            <Link key={item} href={item === 'Products' ? '/products' : '#'} className="text-slate-800 font-medium py-2 border-b border-slate-50 last:border-0" onClick={() => setIsMobileMenuOpen(false)}>
              {item}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-2">
            <a href="#" className="w-full text-center px-5 py-3 bg-slate-900 text-white font-semibold rounded-sm">
              Request Sample
            </a>
            <a href="#" className="w-full text-center px-5 py-3 border border-slate-300 text-slate-700 font-semibold rounded-sm">
              Talk to Technical Team
            </a>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3 text-sm text-slate-600">
            <a href="#">Find TDS</a>
            <a href="#">Find SDS</a>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <a href="#">Distributor Inquiry</a>
          </div>
        </div>
      )}
    </header>
  );
}