
export default function RecipeLoader() {
  return (
    <div className="animate-pulse p-4 max-w-2xl mx-auto">
      <div className="w-full h-56 bg-gray-200 rounded-xl mb-6"></div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="h-4 bg-gray-200 rounded-full w-20"></div>
            <div className="h-4 bg-gray-200 rounded-full w-24"></div>
          </div>
        </div>

        <div className="flex gap-6 text-sm">
          <div className="h-4 bg-gray-200 rounded w-28"></div>
          <div className="h-4 bg-gray-200 rounded w-28"></div>
        </div>

        <div className="bg-gray-100 rounded-xl p-4">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2"><div className="h-3 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div></div>
            <div className="space-y-2"><div className="h-3 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div></div>
            <div className="space-y-2"><div className="h-3 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div></div>
            <div className="space-y-2"><div className="h-3 bg-gray-200 rounded"></div><div className="h-4 bg-gray-200 rounded"></div></div>
          </div>
        </div>

        <div>
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>

        <div>
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="space-y-4">
            <div className="flex gap-4"><div className="w-7 h-7 bg-gray-200 rounded-full"></div><div className="flex-1 space-y-1"><div className="h-4 bg-gray-200 rounded w-full"></div><div className="h-4 bg-gray-200 rounded w-1/2"></div></div></div>
            <div className="flex gap-4"><div className="w-7 h-7 bg-gray-200 rounded-full"></div><div className="flex-1 space-y-1"><div className="h-4 bg-gray-200 rounded w-full"></div><div className="h-4 bg-gray-200 rounded w-1/2"></div></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};