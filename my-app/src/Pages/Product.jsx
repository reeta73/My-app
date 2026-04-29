import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { ShoppingBag, Hash, Tag } from "lucide-react";

const Product = () => {
  const { products, loading } = useContext(ProductContext);

  return (
    <div className="min-h-screen bg-slate-950 p-6 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
              <ShoppingBag className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">Public Catalog</h1>
          </div>
          <p className="text-slate-400 text-lg">Browse our complete collection of premium products.</p>
        </header>

        <div className="grid gap-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 modern-card">
              <ShoppingBag size={48} className="mx-auto text-slate-700 mb-4" />
              <p className="text-slate-500">The catalog is currently empty.</p>
            </div>
          ) : (
            products.map((p) => (
              <div
                key={p._id}
                className="modern-card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-700">
                    <Tag className="text-slate-500" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{p.name}</h2>
                    <div className="flex items-center gap-3">
                      <p className="text-xl font-black text-indigo-400">₹{p.price}</p>
                      <span className="text-slate-700">•</span>
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1 uppercase">
                        <Hash size={12} /> {p._id.slice(-6)}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 font-bold transition-all text-sm">
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;