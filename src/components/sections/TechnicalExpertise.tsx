"use client";

import { motion } from "framer-motion";
import {
  categoryStaggerVariants,
  categorySlideInVariants,
  skillStaggerVariants,
  skillFadeVariants,
  proficiencyScaleVariants,
  proficiencyFillVariants,
  sectionVariants
} from "@/lib/animation-variants";
// Default skill categories with individual skills
const defaultCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React", proficiency: 90 },
      { name: "TypeScript", proficiency: 90 },
      { name: "Next.js", proficiency: 75 },
      { name: "Tailwind CSS", proficiency: 75 }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", proficiency: 90 },
      { name: "PostgreSQL", proficiency: 75 },
      { name: "GraphQL", proficiency: 60 },
      { name: "Express.js", proficiency: 75 }
    ]
  },
  {
    title: "Mobile Development",
    skills: [
      { name: "React Native", proficiency: 75 },
      { name: "Expo", proficiency: 60 },
      { name: "iOS Development", proficiency: 60 }
    ]
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", proficiency: 75 },
      { name: "AWS", proficiency: 75 },
      { name: "Redis", proficiency: 60 },
      { name: "Kubernetes", proficiency: 60 }
    ]
  }
];

export interface Skill {
  name: string;
  proficiency: number;
}

export interface SkillCategory {
  title: string;
  skills?: Skill[];
}

export interface TechnicalExpertiseProps {
  categories?: SkillCategory[];
}

export function TechnicalExpertise({ categories = defaultCategories }: TechnicalExpertiseProps) {
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
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          data-testid="categories-grid"
          variants={categoryStaggerVariants}
        >
          {categories.map((category, index) => (
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
                  variants={skillStaggerVariants}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div key={skillIndex} variants={skillFadeVariants}>
                      <div 
                        className="font-sans text-sm font-medium text-[#24292f] dark:text-[#f0f6fc]"
                        data-testid="skill-name"
                      >
                        {skill.name}
                      </div>
                      <motion.div
                        className="mt-1 relative h-2 bg-[#e1e4e8] dark:bg-[#30363d] rounded-full"
                        data-testid="proficiency-bar"
                        variants={proficiencyScaleVariants}
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
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
} 