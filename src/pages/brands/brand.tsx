import { useState } from 'react';
import { Tag, Plus, Edit2, Search, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {  useAddBrandMutation, useGetBrandsQuery, useUpdateBrandMutation,
  useDeleteBrandMutation} from '../../store/brandApi/brandApi';

const Brand = () => {
  const [search, setSearch] = useState("")
  // @ts-ignore
  const { data, isLoading, error } = useGetBrandsQuery();
  const [addBrand] = useAddBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  const [deleteBrand, { isLoading: isDeleting }] = useDeleteBrandMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [editingBrand, setEditingBrand] = useState<{ id: number; name: string } | null>(null);

  const brands = data?.data || [];

  const handleAddBrand = async () => {
    if (!newBrandName.trim()) {
      toast.error('Brand name cannot be empty');
      return;
    }
    try {
      await addBrand(newBrandName.trim()).unwrap();
      toast.success('Brand successfully added!');
      setNewBrandName('');
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.errors?.[0] || 'Error adding brand');
    }
  };

  const handleUpdateBrand = async () => {
    if (!editingBrand || !editingBrand.name.trim()) {
      toast.error('Brand name cannot be empty');
      return;
    }
    try {
      await updateBrand({
        id: editingBrand.id,
        brandName: editingBrand.name.trim(),
      }).unwrap();
      toast.success('Brand updated successfully!');
      setEditingBrand(null);
    } catch (err: any) {
      toast.error(err?.data?.errors?.[0] || 'Error updating brand');
    }
  };

  const handleDeleteBrand = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) {
      return;
    }
    try {
      await deleteBrand(id).unwrap();
      toast.success('Brand deleted successfully!');
    } catch (err: any) {
      toast.error(err?.data?.errors?.[0] || 'Error deleting brand');
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center text-gray-500">Loading brands...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">Error loading brands</div>;
  }

  return (
    <div className="p-6 lg:p-10">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <Tag className="w-8 h-8 text-blue-600" />
          Brands
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl flex items-center gap-2 transition shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Brand
        </button>
      </div>

      <div className="mb-8 max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            value={search} onChange={(el) => setSearch(el.target.value)}
            placeholder="Search brands..."
            className="w-full pl-12 pr-5 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {brands
          .filter((el: any) => el.brandName.toLowerCase().includes(search.toLowerCase()))
          .map((brand: any) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100 group relative"
            >
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                  <Tag className="w-10 h-10 text-blue-600" />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-3">{brand.brandName}</h3>

              <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditingBrand({ id: brand.id, name: brand.brandName })}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteBrand(brand.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                  disabled={isDeleting}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-3 text-gray-500"
        >
          <Plus className="w-12 h-12" />
          <span className="font-medium">Add New Brand</span>
        </button>
      </div>

      {data && data.totalPage > 1 && (
        <div className="mt-10 flex justify-center items-center gap-2">
          <span className="text-sm text-gray-600">
            Page {data.pageNumber} of {data.totalPage} ({data.totalRecord} brands)
          </span>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Brand</h2>
            <input
              type="text"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              placeholder="Brand name"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setNewBrandName('');
                }}
                className="px-6 py-3 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBrand}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                Add Brand
              </button>
            </div>
          </div>
        </div>
      )}
      {editingBrand && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Brand</h2>
            <input
              type="text"
              value={editingBrand.name}
              onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setEditingBrand(null)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateBrand}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brand;