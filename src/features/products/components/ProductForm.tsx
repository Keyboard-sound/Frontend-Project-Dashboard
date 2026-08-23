import { useEffect, useState } from "react";
import useSalesStore from "@store/useSalesStore";
import { ProductInputSchema, type ProductInput } from "../product.schema";
import type { FormEvent } from "react";
import type { Product } from "@api/productsApi";

type Mode = "create" | "edit";

interface ProductFormProps {
  mode: Mode;
  initialData?: Partial<Product>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

type FormErrors = {
  title?: string;
  price?: string;
  stock?: string;
};

export function ProductForm({
  mode,
  initialData,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const {
    createProduct,
    createProductsLoading,
    editProductsLoading,
    editProduct,
  } = useSalesStore();

  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    price: 0,
    description: "",
    stock: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      title: formData.title?.trim(),
      price: Number(formData.price),
      Description: formData.description?.trim(),
      stock: Number(formData.stock),
    };

    const result = ProductInputSchema.safeParse(formattedData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        newErrors[issue.path[0] as string] = issue.message;
      }

      setErrors(newErrors);
      return result.data;
    }

    if (mode === "edit") {
      await handleEditSubmit(result.data);
    } else {
      await handleCreateSubmit(result.data);
    }

    setFormData({
      title: "",
      price: 0,
      description: "",
      stock: 0,
    });
    setErrors({});

    if (onSuccess) {
      onSuccess();
    }
  };

  const handleEditSubmit = async (data: ProductInput) => {
    if (!initialData?.id) {
      console.error("Missing product id for edit");
      return;
    }
    try {
      await editProduct(initialData.id, data);
    } catch (error) {
      console.error("Failed to edit product:", error);
      alert("Edit product failed, Please try again");
    }
  };

  const handleCreateSubmit = async (data: ProductInput) => {
    try {
      await createProduct(data);
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("Failed to create product");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    // need this condition because name could be something else not just "title" and "price"
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-start h-full space-y-2 px-4 pt-8 pb-10"
    >
      <h2 className="text-lg font-semibold">{`${mode === "create" ? "Create New Product Form" : "Edit Product Form"}`}</h2>
      {/* Title */}
      <div className="min-h-22">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter product title"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      {/* Price */}
      <div className="min-h-22">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price <span className="text-red-500">*</span>
        </label>
        <input
          id="price"
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.price ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="0"
        />
        {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
      </div>

      {/* Description */}
      <div className="min-h-22">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter product description"
        />
      </div>

      {/* Stock */}
      <div className="min-h-22">
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700"
        >
          Stock <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.price ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="0"
        />
        {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
      </div>

      {/* Buttons */}
      <div className="inline-flex mt-auto gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={createProductsLoading}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium cursor-pointer hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={
            mode === "create" ? createProductsLoading : editProductsLoading
          }
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {mode === "create"
            ? createProductsLoading
              ? "Adding Product..."
              : "Add Product"
            : editProductsLoading
              ? "Saving..."
              : "Save"}
        </button>
      </div>
    </form>
  );
}
