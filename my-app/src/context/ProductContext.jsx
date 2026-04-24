import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const data = localStorage.getItem("products");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);
  useEffect(() => {
    const limitedProducts = products.slice(-20);
    localStorage.setItem("products", JSON.stringify(limitedProducts));
  }, [products]);

  const addProduct = (product) => {
    const smallProduct = {
      id: Date.now(),
      name: product.name,
      price: Number(product.price),
    };
    setProducts((prev) => [...prev, smallProduct]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
