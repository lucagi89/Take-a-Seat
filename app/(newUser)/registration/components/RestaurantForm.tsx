
// Restaurant Form Component
export default function RestaurantForm() {
  return (
    <form className="mt-5">
      <h2>Restaurant Registration</h2>
      <div className="mb-4">
        <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">Restaurant Name</label>
        <input
          id="restaurantName"
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );

}
