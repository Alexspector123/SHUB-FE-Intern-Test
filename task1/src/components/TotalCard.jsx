import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Calculator } from 'lucide-react';
import Detail from '@/components/Detail';
import { formatCurrency } from '@/util/formatCost';

const TotalCard = ({ detailData, totalData }) => {
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filterStartTime, setFilterStartTime] = useState('');
  const [filterEndTime, setFilterEndTime] = useState('');

  const filteredData = useMemo(() => {
    if (
      !filterStartDate &&
      !filterEndDate &&
      !filterStartTime &&
      !filterEndTime
    ) {
      return detailData.filter((item) => item.Date !== '');
    }

    return detailData.filter((item) => {
      if (item.Date === '') return false;

      const itemDate = new Date(item.Date);
      const startDate = filterStartDate ? new Date(filterStartDate) : null;
      const endDate = filterEndDate ? new Date(filterEndDate) : null;

      if (startDate && itemDate < startDate) return false;
      if (endDate && itemDate > endDate) return false;

      if ((filterStartTime || filterEndTime) && item.Time) {
        const itemTime = item.Time.toString();

        const normalizeTime = (timeStr) => {
          if (!timeStr) return null;
          const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
          if (timeMatch) {
            const hours = timeMatch[1].padStart(2, '0');
            const minutes = timeMatch[2];
            return `${hours}:${minutes}`;
          }
          return null;
        };

        const normalizedItemTime = normalizeTime(itemTime);
        if (!normalizedItemTime) return true;

        if (filterStartTime) {
          const startTime = normalizeTime(filterStartTime);
          if (startTime && normalizedItemTime < startTime) return false;
        }

        if (filterEndTime) {
          const endTime = normalizeTime(filterEndTime);
          if (endTime && normalizedItemTime > endTime) return false;
        }
      }

      return true;
    });
  }, [
    detailData,
    filterStartDate,
    filterEndDate,
    filterStartTime,
    filterEndTime,
  ]);

  const calculatedTotalCost = useMemo(() => {
    return filteredData.reduce((sum, item) => sum + (item.TotalCost || 0), 0);
  }, [filteredData]);

  const calculatedTotalQuantity = useMemo(() => {
    return filteredData
      .reduce((sum, item) => sum + (item.Quantity || 0), 0)
      .toFixed(3);
  }, [filteredData]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Station Info
            </h3>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Chain:</span>{' '}
              {totalData.chain || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Station:</span>{' '}
              {totalData.station || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Report Type:</span>{' '}
              {totalData.type || 'N/A'}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Original Period
            </h3>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">From:</span>{' '}
              {totalData.startDate || 'N/A'}
            </div>
            <div>
              <span className="font-medium">To:</span>{' '}
              {totalData.endDate || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Total Cost:</span>{' '}
              {formatCurrency(totalData.totalCost)}
            </div>
            <div>
              <span className="font-medium">Total Count:</span>{' '}
              {totalData.totalLitter}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-6 h-6 text-purple-500" />
            <h3 className="text-lg font-semibold">Calculated Totals</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Filtered Records:</span>{' '}
              {filteredData.length}
            </div>
            <div>
              <span className="font-medium">Total Cost:</span>{' '}
              {formatCurrency(calculatedTotalCost)}
            </div>
            <div>
              <span className="font-medium">Total Quantity:</span>{' '}
              {calculatedTotalQuantity}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Filter by Date and Time Range
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Date Range
            </h4>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Time Range
            </h4>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={filterStartTime}
                  onChange={(e) => setFilterStartTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={filterEndTime}
                  onChange={(e) => setFilterEndTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <Button
            onClick={() => {
              setFilterStartDate('');
              setFilterEndDate('');
              setFilterStartTime('');
              setFilterEndTime('');
            }}
            variant="outline"
            className="px-6 py-2"
          >
            Clear All Filters
          </Button>

          <Button
            onClick={() => {
              setFilterStartDate('');
              setFilterEndDate('');
            }}
            variant="outline"
            className="px-4 py-2 text-sm"
          >
            Clear Dates
          </Button>

          <Button
            onClick={() => {
              setFilterStartTime('');
              setFilterEndTime('');
            }}
            variant="outline"
            className="px-4 py-2 text-sm"
          >
            Clear Times
          </Button>
        </div>

        {(filterStartDate ||
          filterEndDate ||
          filterStartTime ||
          filterEndTime) && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 font-medium mb-2">
              Active Filters - Showing {filteredData.length} records:
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {filterStartDate && (
                <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded">
                  From: {filterStartDate}
                </span>
              )}
              {filterEndDate && (
                <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded">
                  To: {filterEndDate}
                </span>
              )}
              {filterStartTime && (
                <span className="px-2 py-1 bg-green-200 text-green-800 rounded">
                  After: {filterStartTime}
                </span>
              )}
              {filterEndTime && (
                <span className="px-2 py-1 bg-green-200 text-green-800 rounded">
                  Before: {filterEndTime}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            Transaction Details
            <span className="text-sm font-normal text-gray-500">
              ({filteredData.length} records)
            </span>
          </h3>
        </div>
        <Detail data={filteredData} />
      </div>
    </>
  );
};

export default TotalCard;
