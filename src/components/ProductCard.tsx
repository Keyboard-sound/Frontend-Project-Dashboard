import type { Products } from "../api/getProducts";

interface ProductCardProps {
  product: Products;
}

const ProductCard = ({ product }: ProductCardProps) => {
  console.log("from product Card", product);

  return (
    <div className="flex flex-col justify-evenly items-center p-3 md:p-4 w-full h-auto border border-gray-200 rounded-lg shadow-md">
      <div>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-25 h-25 md:w-50 md:h-50"
        />
      </div>
      {/* divieded line */}
      <div className="w-full h-[1px] my-1 bg-gray-200 shadow-sm" />
      <div className="flex flex-col w-full">
        <h3 className="w-full self-start py-1 text-xs md:text-sm truncate">
          {product.title}
        </h3>
        <div className="flex flex-row justify-between w-full">
          {/* will add later */}
          <span>stock</span>
          <span className="self-end py-1 text-xs md:text-base">{`$${product.price}`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
