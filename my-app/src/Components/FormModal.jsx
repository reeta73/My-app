import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { X, Package, Tag, Save, AlertCircle } from "lucide-react";
import InputField from "./InputField";

export default function FormModal({ setShow, edit }) {
  const { addProduct, updateProduct } = useContext(ProductContext);

  const [form, setForm] = useState(
    edit ? { ...edit } : { name: "", price: "" },
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleSave = async () => {
    const name = form.name.trim();
    const price = Number(form.price);
    let errors = {};

    if (!name) errors.name = "Name is required";
    if (!price || price <= 0) errors.price = "Invalid price";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError("Please fix the errors below");
      return;
    }

    setLoading(true);
    setError("");
    setFormErrors({});

    const productData = { ...form, name, price };
    let result;

    if (edit) {
      result = await updateProduct(productData);
    } else {
      result = await addProduct(productData);
    }

    setLoading(false);

    if (result.success) {
      setShow(false);
    } else {
      setError(result.message || "Failed to save product");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600/10 rounded-2xl">
              <Package className="text-indigo-500" size={24} />
            </div>
            <h2 className="text-2xl font-black text-white">
              {edit ? "Edit Product" : "New Product"}
            </h2>
          </div>
          <button
            onClick={() => setShow(false)}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-10 space-y-8">
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="space-y-6">
            <InputField
              label="Product Name"
              icon={Package}
              placeholder="e.g. Premium Laptop"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={formErrors.name}
            />

            <InputField
              label="Price (₹)"
              icon={Tag}
              type="number"
              placeholder="0.00"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              error={formErrors.price}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-slate-900/50 border-t border-slate-800 flex gap-4 justify-end">
          <button
            onClick={() => setShow(false)}
            className="px-6 py-3 rounded-2xl text-slate-500 font-bold hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary flex items-center gap-2 px-10"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={18} />
                <span>{edit ? "Update" : "Save Product"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
