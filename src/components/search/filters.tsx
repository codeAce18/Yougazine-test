import { CategoryFilter } from './category-filter';
import { BrandFilter } from './brand-filter';
import SelectedFilters from './selected-filters';
import { DietaryFilter } from './dietary-filter';

export const ShopFilters: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <div className="space-y-10">
      <CategoryFilter lang={lang} />
    </div>
  );
};
