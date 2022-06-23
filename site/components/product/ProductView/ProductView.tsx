import cn from 'clsx'
import Image from 'next/image'
import s from './ProductView.module.css'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'
import usePrice from '@framework/product/use-price'
import { WishlistButton } from '@components/wishlist'
import { ProductSlider, ProductCard } from '@components/product'
import { Container, Text } from '@components/ui'
import { SEO } from '@components/common'
import ProductSidebar from '../ProductSidebar'
import ProductTag from '../ProductTag'
interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  return (
    <>
      <Container className="max-w-[1440px] w-full mx-auto mt-[50px]" clean>
        <div className="">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-200">
              <div className="">
                <ProductSlider key={product.id}>
                  {product.images.map((image, i) => (
                    <div key={image.url} className={s.imageContainer}>
                      <Image
                        className={s.img}
                        src={image.url!}
                        alt={image.alt || 'Product Image'}
                        width={700}
                        height={400}
                        priority={i === 0}
                        quality="85"
                      />
                    </div>
                  ))}
                </ProductSlider>
              </div>
            </div>
            <div className="col-span-1 bg-[#6091f1]">
              <ProductSidebar
                key={product.id}
                product={product}
                className={s.sidebar}
              />
            </div>
          </div>
        </div>

        <hr className="mt-7 border-accent-2" />
        <section className="py-12 px-6 mb-10">
          <Text variant="sectionHeading">Related Products</Text>
          <div className={s.relatedProductsGrid}>
            {relatedProducts.map((p) => (
              <div
                key={p.path}
                className="animated fadeIn bg-accent-0 border border-accent-2"
              >
                <ProductCard
                  noNameTag
                  product={p}
                  key={p.path}
                  variant="simple"
                  className="animated fadeIn"
                  imgProps={{
                    width: 300,
                    height: 300,
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </Container>
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
