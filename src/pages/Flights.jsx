import Dashboard from "./SideNave"
import axios from "axios"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import SideNave from "./SideNave";
import { FaPlane, FaUser, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaUsers, FaSuitcase } from "react-icons/fa";
import 'aos/dist/aos.css';
import AOS from 'aos';

function Flights() {
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false)
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    const getAdmin = localStorage.getItem("admin");
    const protectRouter = () => {
        if (!getAdmin) {
            navigate("/login");
        }
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const handleFlight = () => {
        setLoading(true)
        axios.get("http://localhost:1000/results")
            .then((response) => {
                setFlights(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    };

    useEffect(() => {
        handleFlight();
        protectRouter();
    }, []); // Add empty dependency array to run only on mount

    // Format date function - converts ISO string to readable date
    const formatDate = (dateString) => {
        if (!dateString || dateString === 'N/A') return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        } catch (error) {
            return dateString;
        }
    };

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
                        <p className="text-gray-600 text-lg font-medium">Loading flights data...</p>
                    </div>
                ) : (
                    <div className={`pt-8 px-3 sm:px-4 md:px-6 lg:px-8 ml-0 ${collapsed ? 'sm:ml-[100px]' : 'sm:ml-[20%]'}`}>
                        {/* Header Section */}
                        <div className="mb-8" data-aos="fade-up">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Flight Bookings</h1>
                            <p className="text-gray-600">View all customer flight reservations</p>
                        </div>

                        {/* Flights Table */}
                        {flights.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-lg" data-aos="fade-up">
                                <FaPlane className="text-gray-400 text-6xl mb-4" />
                                <p className="text-gray-500 text-lg">No flights booked yet</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden" data-aos="fade-up">
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full min-w-[800px] sm:min-w-full">
                                        <thead className="bg-gradient-to-r from-blue-500 to-sky-600 text-white sticky top-0 z-10">
                                            <tr>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold text-xs sm:text-sm whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <FaUser className="mr-1.5 text-xs sm:text-sm" />
                                                        <span className="hidden sm:inline">Name</span>
                                                        <span className="sm:hidden">N</span>
                                                    </div>
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold text-xs sm:text-sm whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <FaEnvelope className="mr-1.5 text-xs sm:text-sm" />
                                                        <span className="hidden sm:inline">Email</span>
                                                        <span className="sm:hidden">E</span>
                                                    </div>
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold text-xs sm:text-sm whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <FaMapMarkerAlt className="mr-1.5 text-xs sm:text-sm" />
                                                        <span className="hidden sm:inline">From</span>
                                                        <span className="sm:hidden">F</span>
                                                    </div>
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold text-xs sm:text-sm whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <FaMapMarkerAlt className="mr-1.5 text-xs sm:text-sm" />
                                                        <span className="hidden sm:inline">To</span>
                                                        <span className="sm:hidden">T</span>
                                                    </div>
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold text-xs sm:text-sm whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <FaCalendarAlt className="mr-1.5 text-xs sm:text-sm" />
                                                        <span className="hidden md:inline">Departure</span>
                                                        <span className="hidden sm:inline md:hidden">Dep.</span>
                                                        <span className="sm:hidden">D</span>
                                                    </div>
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold text-xs sm:text-sm whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <FaCalendarAlt className="mr-1.5 text-xs sm:text-sm" />
                                                        <span className="hidden md:inline">Return</span>
                                                        <span className="hidden sm:inline md:hidden">Ret.</span>
                                                        <span className="sm:hidden">R</span>
                                                    </div>
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-center font-semibold text-xs sm:text-sm whitespace-nowrap">
                                                    <div className="flex items-center justify-center">
                                                        <FaUsers className="mr-1.5 text-xs sm:text-sm" />
                                                        <span className="hidden sm:inline">Pass.</span>
                                                        <span className="sm:hidden">P</span>
                                                    </div>
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold text-xs sm:text-sm whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <FaDollarSign className="mr-1.5 text-xs sm:text-sm" />
                                                        <span className="hidden sm:inline">Price</span>
                                                        <span className="sm:hidden">$</span>
                                                    </div>
                                                </th>
                                                <th className="px-3 sm:px-4 py-3 text-left font-semibold text-xs sm:text-sm whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <FaSuitcase className="mr-1.5 text-xs sm:text-sm" />
                                                        <span className="hidden sm:inline">Class</span>
                                                        <span className="sm:hidden">C</span>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {flights.map((flight, index) => (
                                                <tr 
                                                    key={index}
                                                    className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                                                >
                                                    <td className="px-3 sm:px-4 py-3 text-gray-800 font-medium text-xs sm:text-sm whitespace-nowrap" title={flight.name}>
                                                        {flight.name}
                                                    </td>
                                                    <td className="px-3 sm:px-4 py-3 text-gray-600 text-xs whitespace-nowrap truncate max-w-[120px] sm:max-w-none" title={flight.email}>
                                                        {flight.email}
                                                    </td>
                                                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium whitespace-nowrap">
                                                            {flight.from}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">
                                                            {flight.to}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 sm:px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                                                        {formatDate(flight.departure)}
                                                    </td>
                                                    <td className="px-3 sm:px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                                                        {formatDate(flight.return)}
                                                    </td>
                                                    <td className="px-3 sm:px-4 py-3 text-center whitespace-nowrap">
                                                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                                            {flight.passanger}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                                                        <span className="text-green-600 font-bold text-xs sm:text-sm whitespace-nowrap">
                                                            ${flight.price}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                                                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium whitespace-nowrap">
                                                            {flight.class}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
}

export default Flights;
