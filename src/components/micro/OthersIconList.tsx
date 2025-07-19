"use client";

import { useState } from "react";
import { Icon } from "./Icon";

export interface OtherSkill {
  name: string;
  icon: string;
}

export interface OthersIconListProps {
  others?: OtherSkill[];
}

export function OthersIconList({ others }: OthersIconListProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  if (!others || others.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 pt-4 border-t border-[#d0d7de] dark:border-[#30363d]">
      <h4 className="font-mono text-sm font-medium text-[#656d76] dark:text-[#8b949e] mb-3">
        Others
      </h4>
      <div className="flex flex-wrap gap-2">
        {others.map((other, index) => (
          <div
            key={index}
            className="relative group"
            data-testid="other-icon-container"
            onMouseEnter={() => setHoveredIcon(other.name)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="w-11 h-11 text-center content-center rounded-full border-2 border-[#d0d7de] dark:border-[#30363d] p-2 bg-[#f6f8fa] dark:bg-[#21262d] hover:border-[#0969da] dark:hover:border-[#58a6ff] transition-colors duration-200">
              <Icon
                name={other.icon}
                alt={`${other.name} icon`}
                size={24}
              />
            </div>
            
            {hoveredIcon === other.name && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#24292f] dark:bg-[#f0f6fc] text-[#f0f6fc] dark:text-[#24292f] text-xs rounded shadow-lg z-10 whitespace-nowrap">
                {other.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#24292f] dark:border-t-[#f0f6fc]"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 