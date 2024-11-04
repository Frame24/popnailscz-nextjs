import React from 'react';

interface StudioFeature {
  id: number;
  Icon: string;
  Title: string;
  Description: string;
}

type StudioSectionProps = {
  studioInfos: {
    data: {
      id: number;
      attributes: {
        Title: string;
        Description: string;
        Features: StudioFeature[];
      };
    }[];
  };
};

const StudioSection: React.FC<StudioSectionProps> = ({ studioInfos }) => {
  return (
    <div className="studio-section max-w-4xl mx-auto p-4 bg-white rounded-md shadow-lg">
      {studioInfos.data.map((studio) => (
        <div key={studio.id} className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">{studio.attributes.Title}</h2>
          <p className="text-lg text-center mb-6">{studio.attributes.Description}</p>
          <div className="features-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
            {studio.attributes.Features.map((feature) => (
              <div key={feature.id} className="feature-item flex items-start space-x-4">
                <img src={feature.Icon} alt={feature.Title} className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.Title}</h3>
                  <p>{feature.Description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudioSection;
