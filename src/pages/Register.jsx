import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { FaUser, FaLock, FaPlane, FaEnvelope, FaUserPlus } from "react-icons/fa"
import { motion } from "framer-motion"

function Register(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    
    const getRegister = (e)=>{
        e.preventDefault()
        
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill in all fields")
            return
        }
        
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }
        
        if (password.length < 6) {
            alert("Password must be at least 6 characters long")
            return
        }
        
        setLoading(true)
        
        axios.post("http://localhost:1000/user/create",{
            "name": name,
            "email": email,
            "password": password,
        }).then(()=>{
            alert("Account created successfully!")
            navigate("/login")
            setLoading(false)
        }).catch((error)=> {
            alert(error.response?.data?.message || "Registration failed. Please try again.")
            setLoading(false)
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
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
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 mb-4 shadow-lg"
                    >
                        <FaUserPlus className="text-white text-2xl" />
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                        Create Account
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Join us and start your journey
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={getRegister}>
                    <div className="space-y-5">
                        {/* Name Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                value={name}
                                onChange={(event)=> setName(event.target.value)}
                                type="text"
                                required
                                className="appearance-none relative block w-full pl-12 pr-4 py-3.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="Full name"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                value={email}
                                onChange={(event)=> setEmail(event.target.value)}
                                type="email"
                                required
                                className="appearance-none relative block w-full pl-12 pr-4 py-3.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="Email address"
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
                                placeholder="Password (min. 6 characters)"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-500 transition-colors text-sm"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                value={confirmPassword}
                                onChange={(event)=> setConfirmPassword(event.target.value)}
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                className="appearance-none relative block w-full pl-12 pr-12 py-3.5 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                placeholder="Confirm password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-500 transition-colors text-sm"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-gray-700 font-medium mb-1">Password requirements:</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                            <li className={`flex items-center gap-2 ${password.length >= 6 ? 'text-blue-600' : ''}`}>
                                <span className={password.length >= 6 ? 'text-blue-500' : ''}>
                                    {password.length >= 6 ? '✓' : '○'}
                                </span>
                                At least 6 characters
                            </li>
                            <li className={`flex items-center gap-2 ${password === confirmPassword && confirmPassword ? 'text-blue-600' : ''}`}>
                                <span className={password === confirmPassword && confirmPassword ? 'text-blue-500' : ''}>
                                    {password === confirmPassword && confirmPassword ? '✓' : '○'}
                                </span>
                                Passwords match
                            </li>
                        </ul>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer mt-1"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                            I agree to the{" "}
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                Terms and Conditions
                            </a>
                        </label>
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
                                Creating account...
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <FaUserPlus className="mr-2 h-4 w-4" />
                                Create Account
                            </span>
                        )}
                    </motion.button>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                                Sign in here
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

export default Register