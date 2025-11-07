export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          CSS Test Page
        </h1>
        <p className="text-gray-700 mb-4">
          Jika anda nampak styling yang betul (blue heading, white background, shadow),
          bermakna Tailwind CSS berfungsi dengan baik.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-red-500 h-20 rounded"></div>
          <div className="bg-green-500 h-20 rounded"></div>
          <div className="bg-blue-500 h-20 rounded"></div>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Jika kotak warna di atas nampak betul, CSS OK!
        </p>
      </div>
    </div>
  );
}
