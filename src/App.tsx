import productsData from './data/products.json';
import { AccordionStep } from './components/AccordionStep';
import { ProductCard } from './components/ProductCard';
import { ReviewPanel } from './components/ReviewPanel';
import { Camera, ShieldCheck, Radio , ShieldAlert } from 'lucide-react';

export default function App() {
  const stepIcons = [
    <Camera className="w-5 h-5 text-indigo-600" />,
    <ShieldCheck className="w-5 h-5 text-indigo-600" />,
    <Radio className="w-5 h-5 text-indigo-600" />,
    <ShieldAlert className="w-5 h-5 text-indigo-600" />,
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FC] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Step Accordion (8 Columns on Desktop) */}
          <div className="lg:col-span-8">
            {productsData.categories.map((category, index) => (
              <AccordionStep
                key={category.id}
                stepNumber={category.stepNumber}
                title={category.title}
                categoryId={category.id}
                icon={stepIcons[index]}
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

          {/* Right Side: Live Review Panel (4 Columns on Desktop) */}
          <div className="lg:col-span-4">
            <ReviewPanel />
          </div>

        </div>
      </div>
    </div>
  );
}