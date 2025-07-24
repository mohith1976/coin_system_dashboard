import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed left-0 top-0">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="text-gray-300 hover:text-white block">🏠 Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/pool-management" className="text-gray-300 hover:text-white block">💰 Pool Management</Link>
        </li>
        <li className="mb-4">
          <Link to="/settings" className="text-gray-300 hover:text-white block">⚙️ Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
