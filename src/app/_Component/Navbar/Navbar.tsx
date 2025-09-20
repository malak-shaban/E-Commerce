"use client"
import { CartContext } from '@/context/cartContext';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link';
import { useContext, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const context = useContext(CartContext)
  if (!context) throw new Error("Not Exist")
  const { numOfCart } = context
  const { data: session } = useSession()

  const [isOpen, setIsOpen] = useState(false)

  function logout() {
    signOut({ callbackUrl: "/login" })
  }

  return (
    <nav className='text-black bg-gray-100 font-serif'>
      <div className="container w-full lg:w-[80%] mx-auto p-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="logo mr-3">
            <Image src="/freshcart-logo.svg" alt="Logo" width={100} height={100} loading="eager" priority />
          </div>

          <ul className="hidden md:flex gap-4">
            <li><Link href={"/"}>Home</Link></li>

            {session && (
              <li className="relative">
                <Link href={"/cart"}>Cart</Link>
                {numOfCart > 0 && (
                  <span className='absolute -top-3 -end-3 flex justify-center items-center rounded-full size-5 bg-gray-200 text-green-700 text-sm'>
                    {numOfCart}
                  </span>
                )}
              </li>
            )}

            <li><Link href={"/products"}>Products</Link></li>
            <li><Link href={"/categories"}>Categories</Link></li>
            <li><Link href={"/brands"}>Brands</Link></li>

            {session && (
              <li><Link href={"/wishlist"}>Wishlist</Link></li>
            )}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!session ? (
            <>

              <ul className="flex gap-2">
                <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-facebook"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-tiktok"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-linkedin"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-youtube"></i></Link></li>
              </ul>

              <div className="flex gap-2">
                <Link className='mx-2 font-bold' href={"/login"}>Login</Link>
                <Link className='mx-2 font-bold' href={"/register"}>Register</Link>
              </div>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className='font-bold font-serif'>Account</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href={"/changeMyPassword"} className='font-bold font-serif'>
                      Change Password
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <span className='font-bold font-serif cursor-pointer'>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className='font-bold font-serif'>Admin</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/orders" className='font-bold font-serif'>Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/users"} className='font-bold font-serif'>Users</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-200 p-4 space-y-3">
          <ul className="flex flex-col gap-2">
            <li><Link href={"/"} onClick={() => setIsOpen(false)}>Home</Link></li>

            {session && (
              <li className="relative">
                <Link href={"/cart"} onClick={() => setIsOpen(false)}>Cart</Link>
                {numOfCart > 0 && (
                  <span className='absolute -top-3 -end-3 flex justify-center items-center rounded-full size-5 bg-gray-200 text-green-700 text-sm'>
                    {numOfCart}
                  </span>
                )}
              </li>
            )}

            <li><Link href={"/products"} onClick={() => setIsOpen(false)}>Products</Link></li>
            <li><Link href={"/categories"} onClick={() => setIsOpen(false)}>Categories</Link></li>
            <li><Link href={"/brands"} onClick={() => setIsOpen(false)}>Brands</Link></li>

            {session && (
              <li><Link href={"/wishlist"} onClick={() => setIsOpen(false)}>Wishlist</Link></li>
            )}
          </ul>

          {!session ? (
            <div className="mt-4">
              <div className="flex gap-2 mb-3">
                <Link className='font-bold' href={"/login"}>Login</Link>
                <Link className='font-bold' href={"/register"}>Register</Link>
              </div>
              <ul className="flex gap-3">
                <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-facebook"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-tiktok"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-linkedin"></i></Link></li>
                <li><Link href="#"><i className="fa-brands fa-youtube"></i></Link></li>
              </ul>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              <div>
                <p className='font-bold mb-2'>Account</p>
                <Link href={"/changeMyPassword"} className='font-bold block' onClick={() => setIsOpen(false)}>Change Password</Link>
                <span className='font-bold cursor-pointer block' onClick={logout}>SignOut</span>
              </div>

              <div className="mt-3">
                <p className='font-bold mb-2'>Admin</p>
                <Link href="/orders" className='font-bold block' onClick={() => setIsOpen(false)}>Orders</Link>
                <Link href="/users" className='font-bold block' onClick={() => setIsOpen(false)}>Users</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
