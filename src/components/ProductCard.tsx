import type { Products } from "../api/getProducts";

interface ProductCardProps {
  product: Products;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col justify-evenly items-center rounded-lg p-1 w-60 h-70 mx-auto">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-50 h-50 rounded-sm"
      />
      <div className="flex flex-row justify-between">
        <span className="text-xs text-center overflow-hidden">
          {product.title}
        </span>
        <span>{`$${product.price}`}</span>
      </div>
    </div>
  );
};

export default ProductCard;
