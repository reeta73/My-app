import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";


const Product = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Product List
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center">
            No products available
          </p>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center bg-gray-50 border p-3 rounded"
              >
                <div>
                  <p className="font-medium text-gray-800">{p.name}</p>
                  <p className="text-sm text-gray-500">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default Product;