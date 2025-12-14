import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideNave from "./SideNave";
import ClipLoader from "react-spinners/ClipLoader";
import { FaDollarSign, FaUsers, FaArrowTrendUp, FaUserCheck, FaPlane, FaChartBar, FaArrowRight } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import 'aos/dist/aos.css';
import AOS from 'aos';

function Dashboard() {
  const [totalData, setTotalData] = useState({ total: 0, passengers: 0 });
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const fetchTotalData = async () => {
    setLoading(true)
    try {
      const passengerResponse = await axios.get("http://localhost:1000/passanger/total");
      const passengers = passengerResponse.data.passanger;

      const priceResponse = await axios.get("http://localhost:1000/bookings/totalPrice");
      const totalPrice = priceResponse.data.totalPrice;

      setTotalData({ total: totalPrice, passengers });
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchTotalData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SideNave onCollapseChange={setCollapsed} /> 
      {
        loading == true ? (
          <div className={`flex flex-col items-center justify-center pt-20 ${collapsed ? 'sm:ml-[100px]' : 'sm:ml-[20%]'}`}>
            <ClipLoader 
              color="#0ea5e9" 
              loading={loading} 
              size={50}
              className="mb-4"
            />
            <p className="text-gray-600 text-lg font-medium">Loading dashboard data...</p>
          </div>
        ) : (
          <div className={`pt-8 px-4 sm:px-6 lg:px-8 ${collapsed ? 'sm:ml-[100px]' : 'sm:ml-[20%]'}`}>
            {/* Header Section */}
            <div className="mb-6" data-aos="fade-up">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Dashboard Overview</h1>
              <p className="text-sm sm:text-base text-gray-600">Welcome back! Here's your airline statistics</p>
            </div>
            
            {/* Statistics Cards Grid - Smaller and compact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" data-aos="fade-up">
              {/* Total Price Card */}
              <div 
                className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <FaDollarSign className="text-white text-xl" />
                    </div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full group-hover:text-white group-hover:bg-blue-600 transition-colors duration-300">
                      Revenue
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1 group-hover:text-white transition-colors duration-300">
                    Total Price
                  </h4>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                    ${totalData.total?.toLocaleString() || '0'}
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-500 group-hover:text-blue-100 transition-colors duration-300">
                    <FaArrowTrendUp className="mr-1" />
                    <span>Total booking revenue</span>
                  </div>
                </div>
              </div>

              {/* Total Passengers Card */}
              <div 
                className="group relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <FaUsers className="text-white text-xl" />
                    </div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full group-hover:text-white group-hover:bg-indigo-600 transition-colors duration-300">
                      Passengers
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-1 group-hover:text-white transition-colors duration-300">
                    Total Passengers
                  </h4>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                    {totalData.passengers?.toLocaleString() || '0'}
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-500 group-hover:text-purple-100 transition-colors duration-300">
                    <FaUserCheck className="mr-1" />
                    <span>Registered passengers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="mb-6" data-aos="fade-up">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Navigation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Flights Card */}
                <div
                  onClick={() => navigate("/flight")}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 cursor-pointer"
                  data-aos="slide-right"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-blue-100 group-hover:bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <FaPlane className="text-blue-600 group-hover:text-blue-600 text-xl transition-colors duration-300" />
                      </div>
                      <FaArrowRight className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-base font-bold text-gray-800 group-hover:text-white transition-colors duration-300 mb-1">
                      Flights
                    </h3>
                    <p className="text-xs text-gray-600 group-hover:text-blue-100 transition-colors duration-300">
                      View all flight bookings
                    </p>
                  </div>
                </div>

                {/* Reports Card */}
                <div
                  onClick={() => navigate("/report")}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 cursor-pointer"
                  data-aos="slide-up"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-emerald-100 group-hover:bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <FaFileAlt className="text-emerald-600 group-hover:text-emerald-600 text-xl transition-colors duration-300" />
                      </div>
                      <FaArrowRight className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-base font-bold text-gray-800 group-hover:text-white transition-colors duration-300 mb-1">
                      Reports
                    </h3>
                    <p className="text-xs text-gray-600 group-hover:text-emerald-100 transition-colors duration-300">
                      Manage customer reports
                    </p>
                  </div>
                </div>

                {/* Statistics Card */}
                <div
                  onClick={() => navigate("/static")}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 cursor-pointer"
                  data-aos="slide-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-purple-100 group-hover:bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <FaChartBar className="text-purple-600 group-hover:text-purple-600 text-xl transition-colors duration-300" />
                      </div>
                      <FaArrowRight className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-base font-bold text-gray-800 group-hover:text-white transition-colors duration-300 mb-1">
                      Statistics
                    </h3>
                    <p className="text-xs text-gray-600 group-hover:text-purple-100 transition-colors duration-300">
                      View detailed analytics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Dashboard;
