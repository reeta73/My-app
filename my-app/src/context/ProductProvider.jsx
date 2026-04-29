import { useEffect, useState, useContext, useCallback } from "react";
import { ProductContext } from "./ProductContext";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../api/axios";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const fetchProducts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get("/products");
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (productData) => {
    try {
      const res = await axiosInstance.post("/products", productData);
      if (res.data.success) {
        setProducts((prev) => [...prev, res.data.product]);
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to add product" };
    }
  };

  const updateProduct = async (productData) => {
    try {
      const res = await axiosInstance.put(`/products/${productData._id}`, productData);
      if (res.data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === res.data.product._id ? res.data.product : p))
        );
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to update product" };
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axiosInstance.delete(`/products/${id}`);
      if (res.data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to delete product" };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts: fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
