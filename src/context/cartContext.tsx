"use client";
import getLoggedUserCart from "@/CarActions/getUserCart.action";
import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";

type CartContextType = {
  numOfCart: number;
  setnumOfCart: Dispatch<SetStateAction<number>>;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartContextProviderProps = {
  children: ReactNode;
};

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numOfCart, setnumOfCart] = useState<number>(0);

  async function getCart() {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        setnumOfCart(sum);
      }
    } catch {
      console.log("not login");
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ numOfCart, setnumOfCart }}>
      {children}
    </CartContext.Provider>
  );
}
