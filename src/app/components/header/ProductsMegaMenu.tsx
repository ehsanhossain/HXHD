"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProductsMegaMenuProps {
  onClose: () => void;
}

export function ProductsMegaMenu({ onClose }: ProductsMegaMenuProps) {
  return (
    <div 
      className="absolute top-full left-0 w-full bg-white border-t border-slate-200 shadow-xl z-50 py-10 animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-12 gap-8">
        
        {/* Column 1: Call to Action Header */}
        <div className="col-span-12 md:col-span-3">
          <Link 
            href="/products"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[#D61118] font-bold text-lg hover:underline hover:text-[#b00d13] transition-colors"
          >
            Find Your Product <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Column 2 & 3: Product Categories */}
        <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-x-8 gap-y-4">
            {[
              "Waterproof Emulsions",
              "Acrylic & Styrene",
              "VAE Emulsions",
              "Adhesives & Bonding",
              "Asphalt Emulsions",
              "Functional Additives",
              "Sealants & Systems",
              "Specialty Modifiers",
              "Industrial Coatings",
              "Infrastructure Solutions"
            ].map((category, idx) => (
              <Link 
                key={idx} 
                href="/products"
                onClick={onClose}
                className="text-slate-600 hover:text-[#D61118] font-medium transition-colors text-sm"
              >
                {category}
              </Link>
            ))}
        </div>

        {/* Column 4: Featured Image + View All */}
        <div className="col-span-12 md:col-span-3 flex flex-col items-start gap-4">
          <div className="w-full aspect-[4/3] bg-slate-100 overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcGFpbnQlMjBidWNrZXQlMjBjb2F0aW5nfGVufDF8fHx8MTc2ODM2MjU5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Featured Product" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 mix-blend-multiply"
            />
          </div>
          <Link 
            href="/products"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[#D61118] font-bold text-sm hover:underline uppercase tracking-wide"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}