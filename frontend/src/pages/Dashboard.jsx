import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [poolData, setPoolData] = useState(null);

  useEffect(() => {
    const fetchPoolData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/pool", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPoolData(res.data);
      } catch (error) {
        console.error("Error fetching pool data:", error);
      }
    };

    fetchPoolData();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {poolData ? (
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Pool System Stats</h2>
            <p><strong>Total Coins:</strong> {poolData.totalCoins}</p>
            <p><strong>Daily Limit:</strong> {poolData.dailyLimit || "Not Set"}</p>
            <p><strong>Weekly Limit:</strong> {poolData.weeklyLimit || "Not Set"}</p>
            <p><strong>Is Generating:</strong> {poolData.isGenerating ? "✅ Active" : "❌ Stopped"}</p>
            <p><strong>Is Frozen:</strong> {poolData.isFrozen ? "❄️ Frozen" : "🟢 Active"}</p>
          </div>
        ) : (
          <p>Loading pool data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
