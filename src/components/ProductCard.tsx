import type { Products } from "../api/getProducts";

interface ProductCardProps {
  product: Products;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col justify-evenly items-center p-3 md:p-4 w-full h-70 border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-25 h-25 md:w-50 md:h-50"
      />
      <div className="flex flex-col w-full border-t-1">
        <h3 className="pt-1 self-start text-xs md:text-sm text-center">{product.title}</h3>
        <span className="self-end text-xs md:text-base">{`$${product.price}`}</span>
      </div>
    </div>
  );
};

export default ProductCard;
