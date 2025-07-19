"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  categoryStaggerVariants,
  categorySlideInVariants,
  staggerVariants,
  fadeVariants,
  scaleVariants,
  sectionVariants
} from "@/lib";
import { type SkillCategory } from "@/content";
import { Icon, OthersIconList, Button } from "@/components/micro";

export interface TechnicalExpertiseProps {
  categories?: SkillCategory[];
}

export function TechnicalExpertise({ categories }: TechnicalExpertiseProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const categoryCount = categories?.length || 0;
  
  const initialCategories = categories?.slice(0, 4) || [];
  const shouldShowMoreButton = categoryCount > 4;

  return (
    <motion.section
      aria-label="Technical Expertise"
      className="py-20 bg-[#ffffff] dark:bg-[#0d1117]"
      data-testid="technical-expertise-section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div 
        className="max-w-6xl mx-auto px-4"
        data-testid="technical-expertise-container"
      >
        <h2 className="font-mono text-[2rem] md:text-[2.5rem] font-semibold text-[#24292f] dark:text-[#f0f6fc]">
          Technical Expertise
        </h2>
        
        {!showAllCategories ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12"
            data-testid="categories-grid"
            variants={categoryStaggerVariants}
          >
            {initialCategories?.map((category, index) => (
              <motion.div
                key={index}
                data-testid="category-card"
                className="bg-[#f6f8fa] dark:bg-[#21262d] border border-muted/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                variants={categorySlideInVariants}
                whileHover="hover"
              >
                <h3 className="font-mono text-xl font-semibold text-[#24292f] dark:text-[#f0f6fc]">
                  {category.title}
                </h3>
                {category.skills && category.skills.length > 0 && (
                  <motion.div
                    className="mt-4 space-y-3"
                    data-testid="skills-list"
                    variants={staggerVariants}
                  >
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div 
                        key={skillIndex} 
                        variants={fadeVariants}
                        className="group relative flex items-start gap-3"
                        data-testid="skill-item"
                      >
                        {skill.icon && (
                          <Icon 
                            name={skill.icon} 
                            alt={`${skill.name} icon`} 
                            size={32} 
                            className="flex-shrink-0 mt-0.5"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div 
                            className="font-sans text-sm font-medium text-[#24292f] dark:text-[#f0f6fc] cursor-pointer"
                            data-testid="skill-name"
                            title={skill.years ? `${skill.years} years of experience` : undefined}
                          >
                            {skill.name}
                            {skill.years && (
                              <span className="ml-2 text-xs text-[#656d76] dark:text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                ({skill.years} years)
                              </span>
                            )}
                          </div>
                          <motion.div
                            className="mt-1 relative h-2 bg-[#e1e4e8] dark:bg-[#30363d] rounded-full"
                            data-testid="proficiency-bar"
                            variants={scaleVariants}
                          >
                          <motion.div
                            className="absolute top-0 left-0 h-full bg-[#0969da] dark:bg-[#58a6ff] rounded-full"
                            data-testid="proficiency-fill"
                            data-skill-name={skill.name}
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.2,
                              ease: "easeOut",
                              delay: 0.8
                            }}
                          />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                <OthersIconList others={category.others} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12"
            data-testid="categories-grid"
            variants={categoryStaggerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories?.map((category, index) => (
              <motion.div
                key={index}
                data-testid="category-card"
                className="bg-[#f6f8fa] dark:bg-[#21262d] border border-muted/20 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                variants={categorySlideInVariants}
                whileHover="hover"
              >
                <h3 className="font-mono text-xl font-semibold text-[#24292f] dark:text-[#f0f6fc]">
                  {category.title}
                </h3>
                {category.skills && category.skills.length > 0 && (
                  <motion.div
                    className="mt-4 space-y-3"
                    data-testid="skills-list"
                    variants={staggerVariants}
                  >
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div 
                        key={skillIndex} 
                        variants={fadeVariants}
                        className="group relative flex items-start gap-3"
                        data-testid="skill-item"
                      >
                        {skill.icon && (
                          <Icon 
                            name={skill.icon} 
                            alt={`${skill.name} icon`} 
                            size={32} 
                            className="flex-shrink-0 mt-0.5"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div 
                            className="font-sans text-sm font-medium text-[#24292f] dark:text-[#f0f6fc] cursor-pointer"
                            data-testid="skill-name"
                            title={skill.years ? `${skill.years} years of experience` : undefined}
                          >
                            {skill.name}
                            {skill.years && (
                              <span className="ml-2 text-xs text-[#656d76] dark:text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                ({skill.years} years)
                              </span>
                            )}
                          </div>
                          <motion.div
                            className="mt-1 relative h-2 bg-[#e1e4e8] dark:bg-[#30363d] rounded-full"
                            data-testid="proficiency-bar"
                            variants={scaleVariants}
                          >
                          <motion.div
                            className="absolute top-0 left-0 h-full bg-[#0969da] dark:bg-[#58a6ff] rounded-full"
                            data-testid="proficiency-fill"
                            data-skill-name={skill.name}
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.2,
                              ease: "easeOut",
                              delay: 0.8
                            }}
                          />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                <OthersIconList others={category.others} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {shouldShowMoreButton && !showAllCategories && (
          <motion.div
            className="flex justify-end mt-8"
            data-testid="more-button-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              variant="link"
              onClick={() => setShowAllCategories(true)}
              data-testid="more-categories-button"
            >
              more...
            </Button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
} 