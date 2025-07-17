import React from 'react';
import { type SkillCategory } from '@/content';

export interface TechnicalExpertiseProps {
  categories?: SkillCategory[];
}

export function TechnicalExpertise({ categories }: TechnicalExpertiseProps) {
  const defaultCategories: SkillCategory[] = [
    {
      title: "Frontend",
      skills: [
        { name: "React", proficiency: 90, years: 5 },
        { name: "TypeScript", proficiency: 85, years: 4 }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", proficiency: 90, years: 5 },
        { name: "Python", proficiency: 75, years: 3 }
      ]
    }
  ];

  const displayCategories = categories || defaultCategories;

  return (
    <section data-testid="technical-expertise-section" aria-label="Technical Expertise">
      <div data-testid="technical-expertise-container">
        <h2>Technical Expertise</h2>
        <div data-testid="categories-grid">
          {displayCategories.map((category, index) => (
            <div key={index} data-testid="category-card">
              <h3>{category.title}</h3>
              {category.skills && category.skills.length > 0 && (
                <div data-testid="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} data-testid="skill-item">
                      <div 
                        data-testid="skill-name"
                        title={skill.years ? `${skill.years} years of experience` : undefined}
                      >
                        {skill.name}
                        {skill.years && (
                          <span>({skill.years} years)</span>
                        )}
                      </div>
                      <div data-testid="proficiency-bar">
                        <div 
                          data-testid="proficiency-fill"
                          data-skill-name={skill.name}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 