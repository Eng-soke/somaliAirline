
import { useState, useEffect } from "react"
import axios from "axios"
import ClipLoader from "react-spinners/ClipLoader"
import SideNave from "./SideNave"
import { FaEnvelope, FaUser, FaFileAlt, FaExclamationCircle } from "react-icons/fa";
import 'aos/dist/aos.css';
import AOS from 'aos';

function Report() {

    const [getReport, setGetReport] = useState([])
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const getAllReports = () => {
        setLoading(true)
        axios.get("https://somaliairlinebackend.onrender.com/report/get").then((response) => {
            setGetReport(response.data)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }
    useEffect(() => {
        getAllReports()
    }, [])

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
                        <p className="text-gray-600 text-lg font-medium">Loading reports...</p>
                    </div>
                ) : (
                    <div className={`pt-8 px-4 sm:px-6 lg:px-8 ${collapsed ? 'sm:ml-[100px]' : 'sm:ml-[20%]'}`}>
                        {/* Header Section - Smaller */}
                        <div className="mb-6" data-aos="fade-up">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Customer Reports</h1>
                            <p className="text-sm sm:text-base text-gray-600">View and manage all customer feedback and messages</p>
                        </div>

                        {/* Reports Grid - Better Responsive */}
                        {getReport.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16" data-aos="fade-up">
                                <FaExclamationCircle className="text-gray-400 text-5xl mb-3" />
                                <p className="text-gray-500">No reports available</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6 mb-8">
                                {
                                    getReport.map((report, index) => {
                                        return (
                                            <div 
                                                key={index}
                                                className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                                                data-aos="slide-up"
                                                data-aos-delay={index * 100}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="relative p-4 sm:p-5">
                                                    {/* Header with icon - Compact */}
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                                                            <FaFileAlt className="text-white text-lg" />
                                                        </div>
                                                        <span className="inline-block px-2 py-1 text-xs font-semibold text-emerald-600 bg-emerald-100 rounded-full group-hover:text-white group-hover:bg-emerald-600 transition-colors duration-300 whitespace-nowrap">
                                                            Report #{index + 1}
                                                        </span>
                                                    </div>

                                                    {/* Name and Email - Better Layout */}
                                                    <div className="space-y-2 mb-3">
                                                        <div className="group/item">
                                                            <div className="flex items-center mb-1 text-xs text-gray-600 group-hover:text-white transition-colors duration-300">
                                                                <FaUser className="mr-1.5 text-xs" />
                                                                <span className="font-semibold">Name</span>
                                                            </div>
                                                            <div className="bg-gray-50 group-hover:bg-emerald-600/20 border border-gray-200 group-hover:border-emerald-400 rounded-lg p-2 transition-all duration-300">
                                                                <p className="text-gray-800 group-hover:text-white font-medium text-sm truncate" title={report.name}>{report.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className="group/item">
                                                            <div className="flex items-center mb-1 text-xs text-gray-600 group-hover:text-white transition-colors duration-300">
                                                                <FaEnvelope className="mr-1.5 text-xs" />
                                                                <span className="font-semibold">Email</span>
                                                            </div>
                                                            <div className="bg-gray-50 group-hover:bg-emerald-600/20 border border-gray-200 group-hover:border-emerald-400 rounded-lg p-2 transition-all duration-300">
                                                                <p className="text-gray-800 group-hover:text-white font-medium text-xs truncate" title={report.email}>{report.email}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Report Message - Compact */}
                                                    <div className="mt-3">
                                                        <div className="flex items-center mb-1.5 text-xs text-gray-600 group-hover:text-white transition-colors duration-300">
                                                            <FaFileAlt className="mr-1.5 text-xs" />
                                                            <span className="font-semibold">Message</span>
                                                        </div>
                                                        <div className="bg-gray-50 group-hover:bg-emerald-600/20 border border-gray-200 group-hover:border-emerald-400 rounded-lg p-3 min-h-[80px] max-h-[180px] overflow-y-auto transition-all duration-300">
                                                            <p className="text-gray-700 group-hover:text-white text-xs sm:text-sm leading-relaxed">{report.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}
export default Report