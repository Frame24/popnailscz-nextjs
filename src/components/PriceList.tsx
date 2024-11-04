import React from 'react';

type PriceListProps = {
  priceList: {
    data: {
      id: number;
      attributes: {
        ServiceName: string;
        Price: string;
        Description?: string;
      };
    }[];
  };
};

const PriceList: React.FC<PriceListProps> = ({ priceList }) => {
  return (
    <div className="price-list max-w-4xl mx-auto p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Наши услуги</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2 text-left">Услуга</th>
            <th className="px-4 py-2 text-right">Цена</th>
          </tr>
        </thead>
        <tbody>
          {priceList.data.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{item.attributes.ServiceName}</td>
              <td className="px-4 py-2 text-right">{item.attributes.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceList;
