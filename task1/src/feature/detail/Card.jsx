import React, { useState } from 'react';
import readExcel from '@/util/readExcel';
import DropZone from '../../components/Dropzone';
import { Button } from '@/components/ui/button';
import { FileText, RefreshCw } from 'lucide-react';
import TotalCard from '../../components/TotalCard';

const Card = () => {
  const [totalData, setTotalData] = useState({
    chain: '',
    station: '',
    type: '',
    startDate: '',
    endDate: '',
    totalCost: 0.0,
    totalLitter: 0.0,
  });

  const [detailData, setDetailData] = useState([]);

  const handleFileSelect = async (file) => {
    try {
      const data = await readExcel(file);
      const newDetailData = [];

      data.forEach((row) => {
        row.forEach((cell, index) => {
          if (cell === 'Chuỗi') {
            setTotalData((prev) => ({ ...prev, chain: row[index + 1] }));
          }
          if (cell === 'Trạm') {
            setTotalData((prev) => ({ ...prev, station: row[index + 1] }));
          }
          if (cell === 'Loại báo cáo') {
            setTotalData((prev) => ({ ...prev, type: row[index + 1] }));
          }
          if (cell === 'Từ ngày') {
            setTotalData((prev) => ({ ...prev, startDate: row[index + 1] }));
          }
          if (cell === 'Đến ngày') {
            setTotalData((prev) => ({ ...prev, endDate: row[index + 1] }));
          }
          if (cell === 'Tổng tiền') {
            setTotalData((prev) => ({
              ...prev,
              totalCost:
                parseFloat(String(row[index + 1]).replace(/,/g, '')) || 0.0,
            }));
          }
          if (cell === 'Tổng lít') {
            setTotalData((prev) => ({
              ...prev,
              totalLitter:
                parseFloat(String(row[index + 1]).replace(/,/g, '')) || 0.0,
            }));
          }
        });

        if (typeof row[0] === 'number') {
          const newRow = {
            Date: row[1] || '',
            Time: row[2] || '',
            Station: row[3] || '',
            Pillar: row[4] || '',
            Type: row[5] || '',
            Quantity: parseFloat(row[6]) || 0,
            Cost: parseFloat(row[7]) || 0,
            TotalCost: parseFloat(row[8]) || 0,
            PaymentStatus: row[9] || '',
            CustomerID: row[10] || '',
            CustomerName: row[11] || '',
            CustomerType: row[12] || '',
            PaymentDate: row[13] || '',
            Staff: row[14] || '',
            LicensePlate: row[15] || '',
            BillStatus: row[16] || '',
          };
          newDetailData.push(newRow);
        }
      });
      setDetailData(newDetailData);
    } catch (error) {
      console.error('Error reading Excel file:', error);
      alert('Error reading Excel file. Please check the file format.');
    }
  };

  const handleResetSelect = () => {
    setTotalData({
      chain: '',
      station: '',
      type: '',
      startDate: '',
      endDate: '',
      totalCost: 0.0,
      totalLitter: 0.0,
    });
    setDetailData([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Petroleum Revenue
          </h1>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
              <div className="flex-1 w-full">
                <DropZone onFileSelect={handleFileSelect} />
              </div>
              <Button onClick={handleResetSelect} className={'cursor-pointer'}>
                <RefreshCw className="w-4 h-4" />
                Reset
              </Button>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <p className="text-sm font-semibold">Upload File here</p>
            </div>
          </div>
        </div>

        {detailData.length !== 0 && (
          <TotalCard detailData={detailData} totalData={totalData} />
        )}

        {detailData === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">
              Upload an Excel file to get started with your data analysis
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
