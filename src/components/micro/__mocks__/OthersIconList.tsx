import React from 'react';

export interface OtherSkill {
  name: string;
  icon: string;
}

export interface OthersIconListProps {
  others?: OtherSkill[];
}

export function OthersIconList({ others }: OthersIconListProps) {
  if (!others || others.length === 0) {
    return null;
  }

  return (
    <div data-testid="others-icon-list">
      <h4>Others</h4>
      <div>
        {others.map((other, index) => (
          <div key={index} data-testid={`other-icon-${index}`}>
            {other.name}
          </div>
        ))}
      </div>
    </div>
  );
} 