import { useState, type FormEvent } from "react";
import useSalesStore from "@store/useSalesStore";
import type { CreateProductInput } from "@api/productsApi";

interface CreateProductFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

type FormErrors = {
  title?: string;
  price?: string;
};

export default function CreateProductForm({
  onSuccess,
  onCancel,
}: CreateProductFormProps) {
  const { createProduct, loading } = useSalesStore();

  const [formData, setFormData] = useState<CreateProductInput>({
    title: "",
    price: 0,
    description: "",
    stock: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateProductInput, string>> = {};

    if (!formData.title || formData.title.trim() === "") {
      newErrors.title = "Title is required";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newProduct = await createProduct(formData);
      console.log("Product created successfully:", newProduct);

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
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("Failed to create product. Please try again.");
    }
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
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
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">Create New Product</h2>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Title <span className="text-red-500">*</span>
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
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Price <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.price ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="0.00"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-500">{errors.price}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product description"
        />
      </div>

      {/* Stock */}
      <div>
        <label
          htmlFor="stock"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Stock
        </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium cursor-pointer hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
