"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Order {
  _id: string
  id: number
  totalOrderPrice: number
  user: {
    _id: string
    name: string
  }
}

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/orders/")
        const data = await res.json()
        setOrders(data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  if (loading) return <>
    <div>
      <div className="flex justify-center items-center h-[90vh]">
        <div className="w-12 h-12 border-4 border-black border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>

    </div>
  </>
  if (!orders.length) return  <>
    <div>
      <div className="flex justify-center items-center h-[90vh]">
        <p className="text-center font-bold text-2xl text-red-700 font-serif">No orders found.</p>
      </div>

    </div>
  </>

  return (
    <div className="p-6">
       <h2 className='text-2xl text-center my-5 font-bold font-serif'>All Orders</h2>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order._id} className="p-4 border rounded shadow-sm hover:shadow-md transition">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>User:</strong> {order.user.name}</p>
            <p><strong>Total:</strong> {order.totalOrderPrice} EGP</p>
            <Link
              href={`/orders/${order.user._id}`}
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              View User Orders
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
