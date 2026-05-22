export default function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center h-48 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      <p className="text-gray-500 font-medium animate-pulse">Loading data...</p>
    </div>
  );
}
