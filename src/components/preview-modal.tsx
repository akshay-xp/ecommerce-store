"use client"

import Gallery from "@/components/gallery"
import Info from "@/components/info"
import { DialogContent } from "@/components/ui/dialog"
import { Product } from "@/types"

interface PreviewModal {
  product: Product
}

const PreviewModal: React.FC<PreviewModal> = ({ product }) => {
  if (!product) {
    return null
  }

  return (
    <DialogContent>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={product.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={product} />
        </div>
      </div>
    </DialogContent>
  )
}

export default PreviewModal
