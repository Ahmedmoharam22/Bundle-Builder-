import productsData from './data/products.json';
import { ProductCard } from './components/ProductCard';
import { GLOBAL_LAYOUT } from './lib/constants';
import { lazy, Suspense } from "react";
import type { PlanItem } from './types/product';

const AccordionStep = lazy(() =>
  import("./components/AccordionStep").then((m) => ({
    default: m.AccordionStep,
  }))
);

const ReviewPanel = lazy(() =>
  import("./components/ReviewPanel").then((m) => ({
    default: m.ReviewPanel,
  }))
);

const PlanCard = lazy(() => import("./components/PlanCard"));

export default function App() {
  return (
    <div
      style={{
        paddingTop: GLOBAL_LAYOUT.PADDING_TOP,
        paddingLeft: GLOBAL_LAYOUT.PADDING_X,
        paddingRight: GLOBAL_LAYOUT.PADDING_X,
      }}
      className="min-h-screen bg-[#F8F9FC] font-sans"
    >
      <div
        style={{ maxWidth: GLOBAL_LAYOUT.MAX_WIDTH }}
        className="mx-auto"
      >
        <div
          style={{ gap: GLOBAL_LAYOUT.GAP }}
          className="grid grid-cols-1 lg:grid-cols-12 items-start"
        >
          {/* Each column has its own Suspense — they render independently */}
          <div className="lg:col-span-8">
            <Suspense fallback={null}>
              {productsData.categories.map((category, index) => (
                <AccordionStep
                  key={category.id}
                  stepNumber={category.stepNumber}
                  title={category.title}
                  categoryId={category.id}
                  iconName={category.iconName}
                  nextStepTitle={productsData.categories[index + 1]?.title}
                >
                  {(category.products || []).map((product) => {
                    const isPlan =
                      category.id === "plan" ||
                      category.id === "monitoring" ||
                      (product as any).category === "plan";

                    return isPlan ? (
                      <PlanCard key={product.id} plan={product as unknown as PlanItem} />
                    ) : (
                      <ProductCard key={product.id} product={product as any} />
                    );
                  })}
                </AccordionStep>
              ))}
            </Suspense>
          </div>

          <div className="lg:col-span-4">
            <Suspense fallback={null}>
              <ReviewPanel />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}