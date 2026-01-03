import { useState } from "react";
import { Modal } from "antd";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetColorsQuery,
  useGetProductsQuery,
  useEditProductMutation,
} from "../../store/productApi/productApi";
import { useGetBrandsQuery } from "../../store/brandApi/brandApi";
// import { useGetSubcategoriesQuery } from "../../store/subCategoryApi/subCategoryApi"; // add subcategories

type ProductItem = {
  id: number;
  productName: string;
  image: string;
  quantity: number;
  categoryName: string;
  price: number;
  hasDiscount: boolean;
  discountPrice: number;

  // add these fields
  brandId?: number;
  colorId?: number;
  subCategoryId?: number;
  description?: string;
  weight?: string;
  size?: string;
  code?: string;
};


function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: productsData } = useGetProductsQuery();
  const { data: colorsData } = useGetColorsQuery();
  const { data: brandsData } = useGetBrandsQuery();
  // const { data: subcategoriesData } = useGetSubcategoriesQuery();

  const [deleteProduct] = useDeleteProductMutation();
  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();

  const items: ProductItem[] = productsData?.data.products ?? [];
  const colors = colorsData?.data ?? [];
  const brands = brandsData?.data.brand ?? [];
  // const subcategories = subcategoriesData?.data ?? [];

  const [form, setForm] = useState({
    brandId: "",
    colorId: "",
    subCategoryId: "",
    productName: "",
    description: "",
    quantity: "",
    weight: "",
    size: "",
    code: "",
    price: "",
    hasDiscount: false,
    discountPrice: "",
  });

  const [images, setImages] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "hasDiscount" ? value === "true" : value,
    }));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const openModalForEdit = (product: ProductItem) => {
    setEditingId(product.id);
    setForm({
      brandId: String(product.brandId ?? ""),
      colorId: String(product.colorId ?? ""),
      subCategoryId: String(product.subCategoryId ?? ""),
      productName: product.productName,
      description: product.description ?? "",
      quantity: String(product.quantity),
      weight: product.weight ?? "",
      size: product.size ?? "",
      code: product.code ?? "",
      price: String(product.price),
      hasDiscount: product.hasDiscount,
      discountPrice: String(product.discountPrice ?? ""),
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async () => {
    const formData = new FormData();

    images.forEach((f) => formData.append("Images", f));
    formData.append("BrandId", form.brandId);
    formData.append("ColorId", form.colorId);
    formData.append("SubCategoryId", form.subCategoryId);
    formData.append("ProductName", form.productName);
    formData.append("Description", form.description);
    formData.append("Quantity", form.quantity);
    formData.append("Code", form.code);
    formData.append("Price", form.price);
    formData.append("HasDiscount", String(form.hasDiscount));

    if (form.weight) formData.append("Weight", form.weight);
    if (form.size) formData.append("Size", form.size);
    if (form.hasDiscount && form.discountPrice) {
      formData.append("DiscountPrice", form.discountPrice);
    }

    try {
      if (editingId) {
        // edit product
        await editProduct({ id: editingId, formData }).unwrap();
      } else {
        // add product
        await addProduct(formData).unwrap();
      }
      setIsModalOpen(false);
      setEditingId(null);
      setImages([]);
      setForm({
        brandId: "",
        colorId: "",
        subCategoryId: "",
        productName: "",
        description: "",
        quantity: "",
        weight: "",
        size: "",
        code: "",
        price: "",
        hasDiscount: false,
        discountPrice: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-medium">Products</h1>

        <button
          onClick={() => {
            setEditingId(null);
            setForm({
              brandId: "",
              colorId: "",
              subCategoryId: "",
              productName: "",
              description: "",
              quantity: "",
              weight: "",
              size: "",
              code: "",
              price: "",
              hasDiscount: false,
              discountPrice: "",
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add product
        </button>
      </div>

      <Modal
        title={editingId ? "Edit Product" : "Add Product"}
        open={isModalOpen}
        onOk={handleSaveProduct}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-3">
          <input type="file" multiple onChange={handleFiles} />

          <select name="brandId" value={form.brandId} onChange={handleChange}>
            <option value="">Select brand</option>
            {brands.map((b: any) => (
              <option key={b.id} value={b.id}>
                {b.brandName}
              </option>
            ))}
          </select>

          <select name="colorId" value={form.colorId} onChange={handleChange}>
            <option value="">Select color</option>
            {colors.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.colorName}
              </option>
            ))}
          </select>

          {/* <select
            name="subCategoryId"
            value={form.subCategoryId}
            onChange={handleChange}
          >
            <option value="">Select subcategory</option>
            {subcategories.map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.subCategoryName}
              </option>
            ))}
          </select> */}

          <input
            name="productName"
            placeholder="Product name"
            value={form.productName}
            onChange={handleChange}
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <select name="hasDiscount" value={String(form.hasDiscount)} onChange={handleChange}>
            <option value="false">No discount</option>
            <option value="true">Has discount</option>
          </select>

          {form.hasDiscount && (
            <input
              name="discountPrice"
              type="number"
              placeholder="Discount price"
              value={form.discountPrice}
              onChange={handleChange}
            />
          )}
        </div>
      </Modal>

      <table className="w-full text-sm">
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td className="flex items-center gap-2">
                <img
                  src={`https://store-api.softclub.tj/images/${p.image}`}
                  className="w-10 h-10"
                />
                {p.productName}
              </td>
              <td>{p.quantity}</td>
              <td>{p.categoryName}</td>
              <td>
                {p.hasDiscount ? (
                  <>
                    <span className="line-through mr-2">${p.price}</span>
                    <span className="text-red-600">${p.discountPrice}</span>
                  </>
                ) : (
                  `$${p.price}`
                )}
              </td>
              <td className="flex gap-2">
                <button onClick={() => openModalForEdit(p)}>✏️</button>
                <button onClick={() => handleDelete(p.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
