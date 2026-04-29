import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import FormModal from "../Components/FormModal";
import Swal from "sweetalert2";
import axiosInstance from "../api/axios";
import { Plus, Package, Edit, Trash2, Users } from "lucide-react";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const { products, deleteProduct, loading: loadingProducts } = useContext(ProductContext);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(null);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    if (isAdmin) {
      const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
          const res = await axiosInstance.get("/users");
          if (res.data.success) {
            setUsers(res.data.users);
          }
        } catch (err) {
          console.error("Failed to fetch users:", err);
        } finally {
          setLoadingUsers(false);
        }
      };
      fetchUsers();
    }
  }, [isAdmin]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#1e293b",
      background: "#0f172a",
      color: "#f8fafc",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">Dashboard</h1>
            <p className="text-slate-400 mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Logged in as <span className="text-indigo-400 font-bold capitalize">{currentUser?.role}</span>
            </p>
          </div>
          <div className="flex gap-4">
            {isAdmin && (
              <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-3">
                <Users size={20} className="text-slate-500" />
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold leading-none">Registered Users</p>
                  <p className="text-lg font-bold text-white">{loadingUsers ? "..." : users.length}</p>
                </div>
              </div>
            )}
            {isAdmin && (
              <button
                onClick={() => {
                  setEdit(null);
                  setShow(true);
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </header>

        {loadingProducts ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 modern-card">
            <Package size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400">Your database is empty.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <div key={p._id} className="modern-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-indigo-500/10 rounded-xl">
                      <Package className="text-indigo-400" size={24} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      ID: {p._id.slice(-6)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {p.name}
                  </h2>
                  <p className="text-3xl font-black text-indigo-400 mt-2">₹{p.price}</p>
                </div>
                
                {isAdmin && (
                  <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700/50">
                    <button
                      onClick={() => {
                        setEdit(p);
                        setShow(true);
                      }}
                      className="flex-1 btn-secondary flex items-center justify-center gap-2 text-sm"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="p-2.5 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {show && <FormModal setShow={setShow} edit={edit} />}
      </div>
    </div>
  );
};

export default Home;
