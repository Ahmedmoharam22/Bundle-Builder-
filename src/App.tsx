import productsData from './data/products.json';
import { AccordionStep } from './components/AccordionStep';
import { ProductCard } from './components/ProductCard';
import { ReviewPanel } from './components/ReviewPanel';
import { GLOBAL_LAYOUT } from './lib/constants';
import { StepIcon } from './components/StepIcon';

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
          {/* Left Side: Step Accordion */}
          <div className="lg:col-span-8">
            {productsData.categories.map((category, index) => (
              <AccordionStep
                key={category.id}
                stepNumber={category.stepNumber}
                title={category.title}
                categoryId={category.id}
                icon={<StepIcon name={category.iconName} />}
                nextStepTitle={
                  productsData.categories[index + 1]?.title
                }
              >
                {category.products.map((product) => (
                  <ProductCard key={product.id} product={product as any} />
                ))}
              </AccordionStep>
            ))}
          </div>

          {/* Right Side: Live Review Panel */}
          <div className="lg:col-span-4">
            <ReviewPanel />
          </div>

        </div>
      </div>
    </div>
  );
}