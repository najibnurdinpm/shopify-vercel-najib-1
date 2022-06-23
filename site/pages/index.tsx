import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import useSearch from '@framework/product/use-search'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 100 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  // const { q, sort } = router.query

  // console.log('🚀 ~ file: index.tsx ~ line 34 ~ data', data)

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
  categories,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <section className="bg-[#60a5fa] w-[100] py-[100px] relative">
        <div className="">
          <div className="container max-w-[1440px] mx-auto">
            <div className="grid grid-cols-2 gap-4 ">
              <div className="flex">
                <div className="flex flex-col">
                  <div className="">
                    <div className="font-[600] text-[80px] text-[#1F427F]">
                      Fashion Makes Your Glamour
                    </div>
                    <button className="text-white h-[50px] bg-[#1F427F] py-2 px-8 rounded-full">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0">
                <img src="/wanita-muslim.png" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" py-[50px] ">
        <div className="container max-w-[1440px] mx-auto">
          <div className="text-[40px] text-[#3b3737] font-[600] mb-4">
            Best Seller Brand
          </div>
          <div className="grid grid-cols-4 gap-4">
            {categories.map((item, index) => {
              console.log(item)
              if (index < 9) {
                return item.slug !== 'frontpage' ? (
                  <>
                    <a href={`/search/${item.slug}`}>
                      <div className="w-[300px] py-[50px] bg-[#39f50f] rounded-md hover:relative bottom-2">
                        <div className="flex">
                          <div className="mx-auto ">
                            <div className=" text-[40px] font-[800] text-[#3b3737] text-bold">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </>
                ) : (
                  ''
                )
              }
            })}
          </div>
        </div>
      </section>
      <section className="bg-[#60a5fa] w-[100] py-[20px]">
        <div className="container max-w-[1440px] mx-auto">
          <div className="text-[40px] text-[#3b3737] font-[600] mb-4">
            Best Seller Product
          </div>
          <div>
            <Marquee variant="secondary">
              {products.slice(0, 3).map((product: any, i: number) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="slim"
                />
              ))}
            </Marquee>
          </div>
        </div>
      </section>
      {/* </Grid> */}

      <Hero
        headline=" Dessert dragée halvah croissant."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
      />

      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}

Home.Layout = Layout
