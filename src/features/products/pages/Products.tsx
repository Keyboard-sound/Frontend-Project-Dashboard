import ProductList from "../components/ProductList";
import ProductToolBar from "../components/ProductToolBar";

export default function ProductsPage() {
  return (
    <div className="relative w-full h-screen rounded-lg bg-white overflow-auto">
      <div className="hidden lg:block sticky top-0 z-10 w-full pt-4 pb-3 bg-white shadow-sm">
        <ProductToolBar />
      </div>
      {/* card list */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
