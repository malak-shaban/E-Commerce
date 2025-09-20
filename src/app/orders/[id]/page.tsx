"use client"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Product {
    title: string
    imageCover: string
}

interface CartItem {
    count: number
    price: number
    product: Product
}

interface Order {
    _id: string
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    createdAt: string
    cartItems: CartItem[]
}

export default function OrdersPage({ params }: { params: { id: string } }) {
    const { id } = params
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
                const data = await res.json()
                setOrders(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [id])

    if (loading) return <>
        <div>
            <div className="flex justify-center items-center h-[90vh]">
                <div className="w-12 h-12 border-4 border-black border-t-transparent border-solid rounded-full animate-spin"></div>
            </div>
        </div>
    </>
    if (!orders.length) return <>
        <div>
            <div className="flex justify-center items-center h-[90vh]">
                <p className="text-center font-bold text-2xl text-red-700 font-serif">No orders found for this user.</p>
            </div>

        </div>
    </>

    return (
        <div className="p-6">
            <h2 className='text-2xl text-center my-5 font-bold font-serif'>User Orders</h2>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Payment</th>
                            <th className="px-6 py-3">Delivery</th>
                            <th className="px-6 py-3">Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{order._id.slice(-6)}</td>
                                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{order.totalOrderPrice} EGP</td>
                                <td className="px-6 py-4">
                                    {order.paymentMethodType}{" "}
                                    <span className={`ml-2 px-2 py-1 text-xs rounded ${order.isPaid ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                                        {order.isPaid ? "Paid" : "Unpaid"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded ${order.isDelivered ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                                        {order.isDelivered ? "Delivered" : "In Progress"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    {order.cartItems.map((item, idx) => (
                                        <Image
                                            width={500}
                                            height={500}
                                            key={idx}
                                            src={item.product.imageCover}
                                            alt={item.product.title}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
