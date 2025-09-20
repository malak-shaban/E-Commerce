// "use client";
// import getLoggedUserCart from "@/CarActions/getUserCart.action";
// import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";

// type WishlistContextType = {
//   numOfWishlist: number;
//   setnumOfWishlist: Dispatch<SetStateAction<number>>;
// };

// export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// type WishlistContextProviderProps = {
//   children: ReactNode;
// };

// export default function WishlistContextProvider({ children }: WishlistContextProviderProps) {
//   const [numOfWishlist, setnumOfWishlist] = useState<number>(0);

//   async function getWishlist() {
//     try {
//       const res = await getLoggedUserCart();
//       if (res.status === "success") {
//         let sum = 0;
//         res.data.products.forEach((product: { count: number }) => {
//           sum += product.count;
//         });
//         setnumOfWishlist(sum);
//       }
//     } catch {
//       console.log("not login");
//     }
//   }

//   useEffect(() => {
//     getCart();
//   }, []);

//   return (
//     <CartContext.Provider value={{ numOfCart, setnumOfCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }
