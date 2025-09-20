export interface WishlistProduct {
  _id: string
  id?: string 
  title: string
  description: string
  price: number
  priceAfterDiscount?: number
  imageCover: string
  images: string[]
  quantity: number
  sold: number | null
  ratingsAverage: number
  ratingsQuantity: number
  category: {
    _id: string
    name: string
    slug: string
    image: string
  }
  brand: {
    _id: string
    name: string
    slug: string
    image: string
  }
  createdAt: string
  updatedAt: string
}

export interface WishlistResponse {
  status: string
  count: number
  data: WishlistProduct[]
}