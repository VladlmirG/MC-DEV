import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";

export default async function HomePage() {
  const wixClient = await wixClientServer();
  const cats = await wixClient.collections.queryCollections().find();

    // Transform Collection[] to Category[]
    const categories = cats.items.map((collection) => ({
      _id: collection._id || '',
      slug: collection.slug || '',
      name: collection.name || '',
      media: collection.media?.mainMedia?.image?.url || 'cat.png',
    })) as CategoryList[];

  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">BEST SELLERS</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.BEST_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          CATEGORIAS
        </h1>
        <Suspense fallback={<Skeleton />}>
        <CategoryList categories={categories} />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">RECIÉN LLEGADOS</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.NEW_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
    </div>
  );
}

