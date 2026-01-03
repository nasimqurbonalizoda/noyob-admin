// src/pages/Categories.tsx
import { useState } from 'react';
import { 
  Folders, 
  Plus, 
  Edit2, 
  Trash2,
  Package,     
  Home,        
  Sparkles,     
  Heart,         
  ShoppingBag,   
  Baby,          
  Wrench,       
  GraduationCap, 
  Upload
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { 
  useAddCategoryMutation, 
  useDeleteCategoryMutation, 
  useGetCategoriesQuery, 
  useUpdateCategoryMutation 
} from '../../store/categoryApi/categoryApi';

const Categories = () => {
  // @ts-ignore
  const { data, isLoading, error } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = data?.data || [];

  const resetForm = () => {
    setCategoryName('');
    setCategoryImage(null);
    setImagePreview(null);
    setEditingCategory(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCategoryImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      toast.error('Category name is required');
      return;
    }
    if (!categoryImage && !editingCategory) {
      toast.error('Category image is required');
      return;
    }

    const formData = new FormData();
    formData.append('CategoryName', categoryName.trim());
    if (categoryImage) {
      formData.append('CategoryImage', categoryImage);
    }
    if (editingCategory) {
      formData.append('Id', editingCategory.id.toString());
    }

    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory.id, formData }).unwrap();
        toast.success('Category updated successfully!');
      } else {
        await addCategory(formData).unwrap();
        toast.success('Category added successfully!');
      }
      setIsModalOpen(false);
      resetForm();
    } catch (err: any) {
      toast.error(err?.data?.errors?.[0] || 'Error saving category');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await deleteCategory(id).unwrap();
      toast.success('Category deleted successfully!');
    } catch (err: any) {
      toast.error(err?.data?.errors?.[0] || 'Error deleting category');
    }
  };

  const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('авто') || lowerName.includes('auto')) return <Package className="w-16 h-16" />;
    if (lowerName.includes('дом') || lowerName.includes('home')) return <Home className="w-16 h-16" />;
    if (lowerName.includes('красот') || lowerName.includes('beauty')) return <Sparkles className="w-16 h-16" />;
    if (lowerName.includes('техник') && lowerName.includes('красот')) return <Heart className="w-16 h-16" />;
    if (lowerName.includes('сумк') || lowerName.includes('bag')) return <ShoppingBag className="w-16 h-16" />;
    if (lowerName.includes('детск') || lowerName.includes('baby') || lowerName.includes('child')) return <Baby className="w-16 h-16" />;
    if (lowerName.includes('строит') || lowerName.includes('repair')) return <Wrench className="w-16 h-16" />;
    if (lowerName.includes('образов') || lowerName.includes('education')) return <GraduationCap className="w-16 h-16" />;
    return <Folders className="w-16 h-16" />;
  };

  if (isLoading) return <div className="p-10 text-center text-gray-500">Loading categories...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error loading categories</div>;

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Folders className="w-8 h-8 text-blue-600" />
          Categories
        </h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {categories.map((cat: any) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 group relative text-center flex flex-col items-center"
          >
            <div className="flex justify-center mb-6 text-blue-600">
              {getCategoryIcon(cat.categoryName)}
            </div>

            <h3 className="font-bold text-gray-800 text-lg mb-2">{cat.categoryName}</h3>

            <p className="text-sm text-gray-500">
              {cat.subCategories?.length || 0} sub-categories
            </p>

            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditingCategory(cat);
                  setCategoryName(cat.categoryName);
                  setImagePreview(null);
                  setIsModalOpen(true);
                }}
                className="bg-white p-2 rounded-lg shadow hover:bg-blue-50"
              >
                <Edit2 className="w-4 h-4 text-blue-600" />
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="bg-white p-2 rounded-lg shadow hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-4 text-gray-500"
        >
          <Plus className="w-20 h-20" />
          <span className="text-xl font-medium">Add New Category</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>

            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Category name"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
              autoFocus
            />

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image {editingCategory ? '(optional)' : '(required)'}
              </label>
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="px-6 py-3 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                {editingCategory ? 'Save Changes' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;