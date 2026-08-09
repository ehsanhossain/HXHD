import { ProductSearchHeader } from '../components/products/ProductSearchHeader';
import { ProductFilterSidebar } from '../components/products/ProductFilterSidebar';
import { ProductGrid } from '../components/products/ProductGrid';
import { Pagination } from '../components/products/Pagination';
import { ProductNewsletter } from '../components/products/ProductNewsletter';

export default function ProductsPage() {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-white text-slate-500 text-xs py-2 px-6">
        <div className="max-w-screen-2xl mx-auto">
          <span className="hover:underline cursor-pointer">Home</span> / <span className="font-bold text-slate-800">Products</span>
        </div>
      </div>
      <ProductSearchHeader />
      <div className="max-w-screen-2xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
           <ProductFilterSidebar />
           <div className="flex-1 w-full">
             <ProductGrid />
             <Pagination />
           </div>
        </div>
      </div>
      
      <ProductNewsletter />
    </div>
  );
}
