import productsData from "./data/products.json";
import { ProductCard } from "./components/ProductCard";
import { AccordionStep } from "./components/AccordionStep";
import { PlanCard } from "./components/PlanCard";
import { ReviewPanel } from "./components/ReviewPanel";
import { GLOBAL_LAYOUT } from "./lib/constants";
import type { PlanItem } from "./types/product";

export function App() {
  return (
    <main
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
          <div className="lg:col-span-8">
            {productsData.categories.map((category, index) => (
              <AccordionStep
                key={category.id}
                stepNumber={category.stepNumber}
                title={category.title}
                categoryId={category.id}
                iconName={category.iconName}
                nextStepTitle={productsData.categories[index + 1]?.title}
              >
                {(category.products || []).map((product, productIndex) => {
                  const isPlan =
                    category.id === "plan" ||
                    category.id === "monitoring" ||
                    (product as any).category === "plan";

                  return isPlan ? (
                    <PlanCard key={product.id} plan={product as unknown as PlanItem} />
                  ) : (
                    <ProductCard
                      key={product.id}
                      product={product as any}
                      imagePriority={category.stepNumber === 1 && productIndex < 2}
                    />
                  );
                })}
              </AccordionStep>
            ))}
          </div>

          <div className="lg:col-span-4">
            <ReviewPanel />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;