import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

  return (
    <Link href={`/product/${product.slug}`}>
      <a className={rootClassName} aria-label={product.name}>
        {variant === 'slim' && (
          <>
            {product?.images && (
              <>
                <div className="mr-4">
                  <div className="bg-white h-[500px]">
                    <Image
                      quality="85"
                      src={product.images[0]?.url || placeholderImg}
                      alt={product.name || 'Product Image'}
                      height={320}
                      width={320}
                      layout="fixed"
                      {...imgProps}
                    />
                    <div className="text-center font-[800] text-[#1F427F]">
                      {product.name}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {variant === 'simple' && (
          <>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )}
            {!noNameTag && (
              <div className={s.header}>
                {/* <h3 className={s.name}>
                  <span>{product.name}</span>
                </h3>
                <div className={s.price}>
                  {`${price} ${product.price?.currencyCode}`}
                </div> */}
              </div>
            )}
            <div className={s.imageContainer}>
              <div className="flex flex-row mt-2">
                <div className="mx-auto">
                  <div className="bg-[#b1ccfa] px-2 py-2">
                    <div className="">
                      <img
                        src={product.images[0]?.url || placeholderImg}
                        alt=""
                      />
                    </div>
                    <div className="text-[20px] text-[#616161]">
                      {product.name.split('|')[1].length > 20
                        ? product.name.split('|')[1].slice(0, 20).concat('...')
                        : product.name.split('|')[1]}
                    </div>
                    <div className="font-[800]">{price}</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={s.imageContainer}>
              {product?.images && (
                <div>
                  <Image
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.images[0]?.url || placeholderImg}
                    height={540}
                    width={540}
                    quality="85"
                    layout="responsive"
                    {...imgProps}
                  />
                </div>
              )}
            </div> */}
          </>
        )}

        {variant === 'default' && (
          <>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0] as any}
              />
            )}
            <ProductTag
              // name={product.name}
              name={s.imageContainer}
              price={`${price} ${product.price?.currencyCode}`}
            />
            <div className={s.imageContainer}>
              {product?.images && (
                <div>
                  <Image
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.images[0]?.url || placeholderImg}
                    height={540}
                    width={540}
                    quality="85"
                    layout="responsive"
                    {...imgProps}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
