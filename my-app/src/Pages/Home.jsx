import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/AuthContext";
import FormModal from "../Components/FormModal";
import Swal from "sweetalert2";

export default function Home() {

  const { products, deleteProduct } = useContext(ProductContext);
  const { currentUser } = useContext(AuthContext); 

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null);

  const isAdmin = currentUser?.role === "admin"; 

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>

        
        {isAdmin && (
          <button
            onClick={() => {
              setEdit(null);
              setShow(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg shadow"
          >
            + Add
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <p className="text-gray-400">No products yet</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-5 rounded-xl shadow-lg hover:scale-[1.02] transition"
            >
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-gray-300 mt-2">₹ {p.price}</p>

            
              {isAdmin && (
                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => {
                      setEdit(p);
                      setShow(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>
              )}

            </div>
          ))}

        </div>
      )}

      
      {show && isAdmin && (
        <FormModal setShow={setShow} edit={edit} />
      )}

    </div>
  );
}