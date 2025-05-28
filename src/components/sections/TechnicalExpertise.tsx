// Default skill categories
const defaultCategories = [
  {
    title: "Frontend Development"
  },
  {
    title: "Backend Development"
  },
  {
    title: "Mobile Development"
  },
  {
    title: "DevOps & Tools"
  }
];

export interface SkillCategory {
  title: string;
}

export interface TechnicalExpertiseProps {
  categories?: SkillCategory[];
}

export function TechnicalExpertise({ categories = defaultCategories }: TechnicalExpertiseProps) {
  return (
    <section 
      className="py-20 bg-[#ffffff] dark:bg-[#0d1117]"
      aria-label="Technical Expertise"
    >
      <div 
        className="max-w-6xl mx-auto px-4"
        data-testid="technical-expertise-container"
      >
        <h2 className="font-mono text-[2rem] md:text-[2.5rem] font-semibold text-[#24292f] dark:text-[#f0f6fc]">
          Technical Expertise
        </h2>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          data-testid="categories-grid"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              data-testid="category-card"
              className="bg-[#f6f8fa] dark:bg-[#21262d] border border-muted/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-mono text-xl font-semibold text-[#24292f] dark:text-[#f0f6fc]">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 