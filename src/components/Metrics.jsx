import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Metrics = ({ ID }) => {
  const [data, setData] = useState([]);
  const umaxUrl = 'https://umaxxnew-1-d6861606.deta.app';

  const getMetricByCampaign = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get(`${umaxUrl}/metric-by-campaign-id?campaign_id=${ID}&tenantId=${localStorage.getItem('tenantId')}`, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`,
        },
      });
      setData(response.data.Data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getMetricByCampaign();
  }, []);

  return (
    <div className=''>
      {ID === 0 ? (
        <h1>Pilih Campaign</h1>
      ) : 
        data.map((item) => (
          <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-gray-800 font-semibold mb-2">Amount Spent</h3>
              <p className="text-gray-600">{item.amountspent}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-gray-800 font-semibold mb-2">Reach</h3>
              <p className="text-gray-600">{item.reach}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-gray-800 font-semibold mb-2">Impressions</h3>
              <p className="text-gray-600">{item.impressions}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-gray-800 font-semibold mb-2">Frequency</h3>
              <p className="text-gray-600">{item.frequency}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-gray-800 font-semibold mb-2">Reach Amount Spent Ratio</h3>
              <p className="text-gray-600">{item.rar}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-gray-800 font-semibold mb-2">Cost Per Click</h3>
              <p className="text-gray-600">{item.cpc}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-gray-800 font-semibold mb-2">Click Through Rate</h3>
              <p className="text-gray-600">{item.ctr}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-gray-800 font-semibold mb-2">Outbound Click Landing Page</h3>
              <p className="text-gray-600">{item.oclp}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-gray-800 font-semibold mb-2">Cost Per Result</h3>
              <p className="text-gray-600">{item.cpr}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-gray-800 font-semibold mb-2">Add To Cart</h3>
              <p className="text-gray-600">{item.atc}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-gray-800 font-semibold mb-2">Return on Ad Spend</h3>
              <p className="text-gray-600">{item.roas}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-gray-800 font-semibold mb-2">Real ROAS</h3>
              <p className="text-gray-600">{item.realroas}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Metrics;
