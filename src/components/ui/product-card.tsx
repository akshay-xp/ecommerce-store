"use client"

import Image from "next/image"
import { MouseEventHandler } from "react"
import { Expand, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"

import Currency from "@/components/ui/currency"
import IconButton from "@/components/ui/icon-button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import PreviewModal from "@/components/preview-modal"
import useCart from "@/hooks/use-cart"
import { Product } from "@/types"

interface ProductCard {
  data: Product
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const cart = useCart()
  const router = useRouter()

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === event.currentTarget) {
      router.push(`/product/${data?.id}`)
    }
  }

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    cart.addItem(data)
  }

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer space-y-4 rounded-xl border bg-white p-3"
    >
      {/* Image & actions */}
      <div className="relative aspect-square rounded-xl bg-gray-100">
        <Image
          src={data.images?.[0]?.url}
          alt=""
          fill
          className="aspect-square rounded-md object-cover"
        />
        <div className="absolute bottom-5 w-full px-6 opacity-0 transition group-hover:opacity-100">
          <div className="flex justify-center gap-x-6">
            <Dialog>
              <DialogTrigger asChild onSelect={(e) => e.preventDefault()}>
                <IconButton
                  icon={<Expand size={20} className="text-gray-600" />}
                />
              </DialogTrigger>
              <PreviewModal product={data} />
            </Dialog>
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="text-lg font-semibold">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  )
}

export default ProductCard
