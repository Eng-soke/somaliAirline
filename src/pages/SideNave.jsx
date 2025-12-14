import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaPlane, FaChartBar, FaFileAlt, FaSignOutAlt, FaBars, FaUser } from "react-icons/fa";
import sokeProfile from "../Images/sokeProfile.jpg";

const SideNave = ({ onCollapseChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getAdmin = localStorage.getItem("admin");
  const protectRouter = () => {
    if (!getAdmin) {
      navigate("/admin");
    }
  };

  useEffect(() => {
    protectRouter();
  }, [navigate]);

  const handleCollapse = () => {
    const newCollapseState = !collapsed;
    setCollapsed(newCollapseState);
    onCollapseChange(newCollapseState);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`${
        collapsed ? 'w-[70px]' : 'sm:w-[18%]'
      } sm:fixed bg-gradient-to-b from-sky-500 to-blue-600 sm:h-screen text-white p-4 sm:p-6 transition-all duration-300 shadow-lg`}
    >
      <div className="mb-8 flex justify-between items-center">
        <div className="flex-col items-center">
          {!collapsed && (
            <>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={sokeProfile}
                  alt="User Profile"
                  className="rounded-full w-12 h-12 object-cover border-2 border-white shadow-md"
                />
               
              </div>
            </>
          )}
        </div>

        <div
          onClick={handleCollapse}
          className="cursor-pointer  py-2 px-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <FaBars className="text-2xl mr-10" />
        </div>
      </div>

      <ul className={`space-y-2 ${collapsed ? 'flex flex-col items-center' : ''}`}>
        <Link to="/dash">
          <li className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
            isActive("/dash") ? 'bg-blue-700 shadow-md' : 'hover:bg-blue-700/50'
          }`}>
            <FaHome className={`text-xl ${collapsed ? 'mx-auto' : ''}`} />
            {!collapsed && <span className="text-base font-medium">Dashboard</span>}
          </li>
        </Link>

        <Link to="/flight">
          <li className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
            isActive("/flight") ? 'bg-blue-700 shadow-md' : 'hover:bg-blue-700/50'
          }`}>
            <FaPlane className={`text-xl ${collapsed ? 'mx-auto' : ''}`} />
            {!collapsed && <span className="text-base font-medium">Flights</span>}
          </li>
        </Link>

        <Link to="/static">
          <li className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
            isActive("/static") ? 'bg-blue-700 shadow-md' : 'hover:bg-blue-700/50'
          }`}>
            <FaChartBar className={`text-xl ${collapsed ? 'mx-auto' : ''}`} />
            {!collapsed && <span className="text-base font-medium">Statistics</span>}
          </li>
        </Link>

        <Link to="/report">
          <li className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
            isActive("/report") ? 'bg-blue-700 shadow-md' : 'hover:bg-blue-700/50'
          }`}>
            <FaFileAlt className={`text-xl ${collapsed ? 'mx-auto' : ''}`} />
            {!collapsed && <span className="text-base font-medium">Reports</span>}
          </li>
        </Link>

        <div className="pt-4 border-t border-blue-400/30">
          <Link to="/admin">
            <li
              onClick={logout}
              className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-red-600/50"
            >
              <FaSignOutAlt className={`text-xl ${collapsed ? 'mx-auto' : ''}`} />
              {!collapsed && <span className="text-base font-medium">Logout</span>}
            </li>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default SideNave;
