// components/Colors.tsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useGetColorsQuery,
  useAddColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} from '../../store/colorApi/colorApi';
import { Search, Filter, Plus, Edit2, Trash2, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

interface Color {
  id: number;
  colorName: string;
}

const Colors = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [editingColor, setEditingColor] = useState<Color | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Гирифтани рангҳо
  const {
    data: colorsData,
    isLoading,
    isError,
    refetch,
  } = useGetColorsQuery({
    pageNumber,
    pageSize,
    colorName: searchQuery,
  });

  // Илова кардани ранг
  const [addColor, { isLoading: isAdding }] = useAddColorMutation();

  // Навсозии ранг
  const [updateColor, { isLoading: isUpdating }] = useUpdateColorMutation();

  // Нест кардани ранг
  const [deleteColor, { isLoading: isDeleting }] = useDeleteColorMutation();

  const handleAddColor = async () => {
    if (!newColorName.trim()) {
      toast.warning('Please enter color name');
      return;
    }
    
    try {
      await addColor(newColorName).unwrap();
      toast.success('Color added successfully!');
      setNewColorName('');
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to add color');
      console.error('Error adding color:', err);
    }
  };

  const handleUpdateColor = async () => {
    if (!editingColor || !editingColor.colorName.trim()) {
      toast.warning('Please enter color name');
      return;
    }
    
    try {
      await updateColor({
        id: editingColor.id,
        colorName: editingColor.colorName,
      }).unwrap();
      toast.success('Color updated successfully!');
      setEditingColor(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update color');
      console.error('Error updating color:', err);
    }
  };

  const handleDeleteColor = async (id: number, colorName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${colorName}"?`)) {
      return;
    }
    
    try {
      await deleteColor(id).unwrap();
      toast.success('Color deleted successfully!');
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to delete color');
      console.error('Error deleting color:', err);
    }
  };

  const handleSearch = () => {
    refetch();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    refetch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (editingColor) {
        handleUpdateColor();
      } else {
        handleAddColor();
      }
    }
  };

  // CSS-и якранг барои тамоми саҳифа
  const pageStyles = {
    primary: '#2563eb',
    primaryLight: '#60a5fa',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading colors...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error loading colors</h3>
          <p className="text-red-600 mb-4">Please check your connection and try again</p>
          <button
            onClick={() => refetch()}
            style={{ backgroundColor: pageStyles.primary }}
            className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
      {/* Mobile Search and Filter Bar */}
      <div className="lg:hidden mb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search colors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        {showMobileFilters && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Search
              </button>
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Search Bar */}
      <div className="hidden lg:block mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search colors by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Search
          </button>
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Add Color Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Add New Color</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Name
              </label>
              <input
                type="text"
                placeholder="e.g., navy blue, #FF5733"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
            </div>
            <button
              onClick={handleAddColor}
              disabled={isAdding || !newColorName.trim()}
              style={{ backgroundColor: pageStyles.primary }}
              className="w-full px-4 py-3 text-white rounded-lg hover:opacity-90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAdding ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding Color...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Color
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 md:p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Statistics</h3>
            <RefreshCw 
              onClick={() => refetch()}
              className="w-4 h-4 cursor-pointer opacity-80 hover:opacity-100" 
            />
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-blue-100 text-sm">Total Colors</p>
              <p className="text-2xl md:text-3xl font-bold">
                {colorsData?.totalRecord || 0}
              </p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Current Page</p>
              <p className="text-lg font-medium">
                Page {pageNumber} of {colorsData?.totalPage || 1}
              </p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Showing</p>
              <p className="text-lg font-medium">
                {colorsData?.data.length || 0} colors
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Color Section - Full Width */}
      {editingColor && (
        <div className="mt-4 md:mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-yellow-600" />
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Edit Color</h2>
            </div>
            <button
              onClick={() => setEditingColor(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={editingColor.colorName}
                onChange={(e) =>
                  setEditingColor({ ...editingColor, colorName: e.target.value })
                }
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm md:text-base"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleUpdateColor}
                disabled={isUpdating || !editingColor.colorName.trim()}
                style={{ backgroundColor: pageStyles.warning }}
                className="flex-1 sm:flex-none px-6 py-3 text-white rounded-lg hover:opacity-90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Updating...
                  </>
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Colors List */}
      <div className="mt-4 md:mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Colors List</h2>
              <p className="text-sm text-gray-600 mt-1">
                {colorsData?.totalRecord || 0} total colors • Page {pageNumber}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => refetch()}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="lg:hidden">
          {colorsData?.data.map((color: Color) => (
            <div key={color.id} className="border-b border-gray-200 p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full border border-gray-300 shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: color.colorName.startsWith('#')
                        ? color.colorName
                        : color.colorName,
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">#{color.id}</p>
                    <p className="text-sm text-gray-600 truncate max-w-[150px]">{color.colorName}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setEditingColor({
                      id: color.id,
                      colorName: color.colorName,
                    })
                  }
                  className="flex-1 px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteColor(color.id, color.colorName)}
                  disabled={isDeleting}
                  className="flex-1 px-3 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {colorsData?.data.map((color: Color) => (
                <tr key={color.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      #{color.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                        style={{
                          backgroundColor: color.colorName.startsWith('#')
                            ? color.colorName
                            : color.colorName,
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{color.colorName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setEditingColor({
                            id: color.id,
                            colorName: color.colorName,
                          })
                        }
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium flex items-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteColor(color.id, color.colorName)}
                        disabled={isDeleting}
                        className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {colorsData?.data.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="text-gray-300 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No colors found</h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              {searchQuery ? 'No colors match your search. Try a different term.' : 'Get started by adding your first color!'}
            </p>
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {colorsData && colorsData.totalPage > 1 && (
          <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing {colorsData.data.length} of {colorsData.totalRecord} colors
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-2">
                <button
                  onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                  disabled={pageNumber === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium">
                    {pageNumber}
                  </span>
                  <span className="text-gray-600 text-sm">of {colorsData.totalPage}</span>
                </div>
                
                <button
                  onClick={() => setPageNumber(prev => prev < colorsData.totalPage ? prev + 1 : prev)}
                  disabled={pageNumber >= colorsData.totalPage}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Colors;