import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { FaUserShield, FaLock, FaPlane, FaShieldAlt } from "react-icons/fa"
import { motion } from "framer-motion"

function AdminLogin(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (event)=>{
        event.preventDefault()
        setLoading(true)
        
        axios.post("http://localhost:1000/admin/login",{
            "username": username,
            "password": password
        }).then((response)=>{
            if(response.data.error){
                alert("Incorrect username or password")
                setLoading(false)
            }
            else{
                alert("Login Success")
                localStorage.setItem("admin", JSON.stringify(response.data))
                navigate("/dash")
                setLoading(false)
            }
        }).catch((error) => {
            alert("Login failed. Please try again.")
            setLoading(false)
        })
    }

    useEffect(()=>{
        // Check if admin is already logged in
        const admin = localStorage.getItem("admin")
        if(admin){
            navigate("/dash")
        }
    }, [navigate])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Security Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative max-w-md w-full space-y-8 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 border border-white/20"
            >
                {/* Header */}
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 mb-4 shadow-lg"
                    >
                        <FaUserShield className="text-white text-2xl" />
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                        Admin Portal
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base flex items-center justify-center gap-2">
                        <FaShieldAlt className="text-blue-500" />
                        Secure access to admin dashboard
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        {/* Username Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaUserShield className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                value={username}
                                onChange={(event)=> setUsername(event.target.value)}
                                type="text"
                                required
                                className="appearance-none relative block w-full pl-12 pr-4 py-3.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="Admin username"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                value={password}
                                onChange={(event)=> setPassword(event.target.value)}
                                type={showPassword ? "text" : "password"}
                                required
                                className="appearance-none relative block w-full pl-12 pr-12 py-3.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="Admin password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-500 transition-colors text-sm"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <FaShieldAlt className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-700">
                            This is a secure admin area. Unauthorized access is prohibited.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Authenticating...
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <FaUserShield className="mr-2 h-4 w-4" />
                                Sign in to Admin
                            </span>
                        )}
                    </motion.button>

                    {/* Back to Home */}
                    <div className="text-center">
                        <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                            <FaPlane className="h-3 w-3" />
                            Back to Home
                        </Link>
                    </div>

                    {/* Admin Registration Link (if needed) */}
                    <div className="text-center border-t pt-4">
                        <p className="text-xs text-gray-500">
                            Need admin access?{" "}
                            <Link to="/adminregist" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                Contact administrator
                            </Link>
                        </p>
                    </div>
                </form>
            </motion.div>

            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    )
}

export default AdminLogin