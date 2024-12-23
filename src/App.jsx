import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useStockData } from './hooks/useStockData';
import { Menu } from 'lucide-react';

function App() {
  const { data: stockData, loading, error } = useStockData();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  React.useEffect(() => {
    if (stockData.length > 0 && !selectedIndex) {
      setSelectedIndex(stockData[0].index_name);
    }
  }, [stockData, selectedIndex]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const selectedData = stockData.find((data) => data.index_name === selectedIndex);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="md:hidden bg-white border-b border-gray-200 p-4">
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="flex items-center gap-2 text-gray-700"
        >
          <Menu className="w-6 h-6" />
          <span className="font-semibold">Market Indices</span>
        </button>
      </div>

      
      <Sidebar
        indices={stockData}
        selectedIndex={selectedIndex}
        onSelectIndex={(index) => {
          setSelectedIndex(index);
          setSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 overflow-x-hidden">
        {selectedData && <Dashboard data={selectedData} />}
      </main>
    </div>
  );
}

export default App;