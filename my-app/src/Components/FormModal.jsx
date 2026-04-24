import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";

export default function FormModal({ setShow, edit }) {
  const { addProduct, updateProduct } = useContext(ProductContext);

  const [form, setForm] = useState({ name: "", price: "" });

  useEffect(() => {
    if (edit) setForm(edit);
  }, [edit]);

  const handleSave = () => {
    if (edit) updateProduct(form);
    else addProduct(form);

    setShow(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {edit ? "Edit Product" : "Add Product"}
        </h2>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700"
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className=" w-full mb-4 p-2 rounded bg-gray-800 border border-gray-700"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShow(false)}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
