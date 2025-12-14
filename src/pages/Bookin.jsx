import React, { useState, useEffect } from 'react';
import MainBookin from './MainBookin';
import Header1 from '../Components/Header1';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from 'react-hot-toast';
import { FaPlane, FaCalendarAlt, FaUser, FaEnvelope, FaMapMarkerAlt, FaUsers, FaTag } from "react-icons/fa";

const Bookin = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [price, setPrice] = useState('Price not available');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('Economy');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [getData, setgetData] = useState([]);

  const [loadin, setLoadin] = useState(false)
  const [errors, setErrors] = useState({});

  const isLogin = localStorage.getItem("user");

  // Auto-fill user data if logged in
  useEffect(() => {
    if (isLogin) {
      try {
        const userData = JSON.parse(isLogin);
        if (userData.name) setName(userData.name);
        if (userData.email) setEmail(userData.email);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [isLogin]);

  const prices = {
    // Mogadishu Safarada
    "Mogadishu-Kismayo": 89,
    "Mogadishu-Kgs": 46,
    "Mogadishu-Boorama": 90,
    "Mogadishu-Cabudwaq": 89,
    "Mogadishu-Hargeysa": 98,
    "Boorama-Mogadishu": 397,
    "Boorama-Hargeysa": 76,
    "Boorama-Kgs": 92,
    "Boorama-Cabudwaq": 90,
    "Boorama-Kismayo": 76,
    "Cabudwaq-Mogadishu": 90,
    "Cabudwaq-Hargeysa": 100,
    "Cabudwaq-Kgs": 110,
    "Cabudwaq-Kismayo": 90,
    "Hargeysa-Mogadishu": 120,
    "Hargeysa-Kismayo": 250,
    "Hargeysa-Kgs": 89,
    "Hargeysa-Cabudwaq": 345,
    "Hargeysa-Boorama": 678,
    "Kgs-Mogadishu": 46,
    "Kgs-Hargeysa": 67,
    "Kgs-Cabudwaq": 76,
    "Kgs-Boorama": 90,
    "Kismayo-Mogadishu": 76,
    "Kismayo-Hargeysa": 100,
    "Kismayo-Boorama": 120,
    "Kismayo-Cabudwaq": 100,
    "Kismayo-Kgs": 110,
    // Safarada Caalamiga ah
    "Istanbul-Mogadishu": 256,
    "Mogadishu-Istanbul": 256,
    "London-Mogadishu": 1500,
    "Mogadishu-London": 1500,
    "Kuala Lumpur-Mogadishu": 2333,
    "Mogadishu-Kuala Lumpur": 2333,
    "Doha-Mogadishu": 2323,
    "Mogadishu-Doha": 2323,
    "New York-Mogadishu": 6575,
    "Mogadishu-New York": 6575,
    "Paris-Mogadishu": 6863,
    "Mogadishu-Paris": 6863,
    "Malaysia-Mogadishu": 588,
    "Mogadishu-Malaysia": 588,
    "London-Singapore": 393,
    "Singapore-London": 393,
    "Istanbul-Singapore": 339.99,
    "Singapore-Istanbul": 339.99,
    "Kuala Lumpur-Singapore": 839,
    "Singapore-Kuala Lumpur": 839,
    "Doha-Singapore": 4748,
    "Singapore-Doha": 4748,
    "New York-Singapore": 3829,
    "Singapore-New York": 3829,
    "Paris-Singapore": 683,
    "Singapore-Paris": 683,
    "Malaysia-Singapore": 629,
    "Singapore-Malaysia": 629,
    "Istanbul-London": 383.99,
    "London-Istanbul": 383.99,
    "Kuala Lumpur-London": 4949,
    "London-Kuala Lumpur": 4949,
    "Doha-London": 3378,
    "London-Doha": 3378,
    "New York-London": 3088,
    "London-New York": 3088,
    "Paris-London": 6383,
    "London-Paris": 6383,
    "Doha-Kuala Lumpur": 350,
    "Kuala Lumpur-Doha": 350,
    "New York-Kuala Lumpur": 580,
    "Kuala Lumpur-New York": 580,
    "Paris-Kuala Lumpur": 490,
    "Kuala Lumpur-Paris": 490,
    "Malaysia-Kuala Lumpur": 900,
    "Kuala Lumpur-Malaysia": 900,
    "Paris-New York": 799,
    "New York-Paris": 799,
    "Malaysia-New York": 6543,
    "New York-Malaysia": 6543,
  };

  // Calculate and update price whenever fromCity, toCity, passengers, or flightClass change
  useEffect(() => {
    if (fromCity && toCity) {
      const route = `${fromCity.trim()}-${toCity.trim()}`;
      const basePrice = prices[route] !== undefined ? prices[route] : 'Price not available';

      if (basePrice !== 'Price not available') {
        let calculatedPrice = basePrice * passengers;
        
        // Modify the price based on flight class
        if (flightClass === 'Economy') {
          calculatedPrice += 50;
        } else if (flightClass === 'Business') {
          calculatedPrice *= 1.5; // 50% increase for Business class
        } else if (flightClass === 'First') {
          calculatedPrice *= 2; // Double the price for First class
        }

        setPrice(calculatedPrice.toFixed(2));
      } else {
        setPrice('Price not available');
      }
    } else {
      setPrice('Price not available');
    }
  }, [fromCity, toCity, passengers, flightClass]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!fromCity) {
      newErrors.fromCity = "Please select departure city";
    }

    if (!toCity) {
      newErrors.toCity = "Please select destination city";
    } else if (fromCity === toCity) {
      newErrors.toCity = "Departure and destination cannot be the same";
    }

    if (!departureDate) {
      newErrors.departureDate = "Departure date is required";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const depDate = new Date(departureDate);
      if (depDate < today) {
        newErrors.departureDate = "Departure date cannot be in the past";
      }
    }

    if (!returnDate) {
      newErrors.returnDate = "Return date is required";
    } else if (departureDate && new Date(returnDate) < new Date(departureDate)) {
      newErrors.returnDate = "Return date must be after departure date";
    }

    if (passengers < 1 || passengers > 10) {
      newErrors.passengers = "Passengers must be between 1 and 10";
    }

    if (price === 'Price not available') {
      newErrors.price = "Please select a valid route";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = (e) => {
    e.preventDefault();
    
    if (!isLogin) {
      toast.error("Please login first", { position: "top-center" });
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill in all fields correctly", { position: "top-center" });
      return;
    }

    setLoadin(true);
    
    const bookingData = {
      "from": fromCity,
      "to": toCity,
      "departure": departureDate,
      "return": returnDate,
      "passanger": parseInt(passengers),
      "price": parseFloat(price),
      "class": flightClass,
      "name": name,
      "email": email
    };

    axios.post("http://localhost:1000/create", bookingData)
      .then((response) => {
        setgetData(response.data);
        setLoadin(false);
        toast.success("Booking has been successful!", {
          position: "top-center",
          duration: 3000
        });
        
        // Reset form after successful booking
        setTimeout(() => {
          setFromCity('');
          setToCity('');
          setDepartureDate('');
          setReturnDate('');
          setPassengers(1);
          setFlightClass('Economy');
          setPrice('Price not available');
          setErrors({});
        }, 2000);
      })
      .catch((error) => {
        setLoadin(false);
        const errorMessage = error.response?.data?.message || "Booking failed. Please try again.";
        toast.error(errorMessage, {
          position: "top-center",
          duration: 3000
        });
        console.error("Booking error:", error);
      });
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  const minReturnDate = departureDate || today;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
      <Header1 />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 sm:mt-0 mt-20 sm:mb-0 mb-20">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-5xl p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg">
                <FaPlane className="text-white text-xl" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Search Flights</h2>
            </div>
            <p className="text-sm text-gray-600 ml-12">Get the latest on our SomAirline response</p>
          </div>

          <form onSubmit={handleBooking}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Name */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaUser className="text-sky-500" />
                  Name:
                </label>
                <input
                  type="text"
                  className={`p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({...errors, name: ''});
                  }}
                  placeholder="Enter your name"
                  required
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaEnvelope className="text-sky-500" />
                  Email:
                </label>
                <input
                  type="email"
                  className={`p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* From City */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-sky-500" />
                  From:
                </label>
                <div className="relative">
                  <select
                    className={`p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none bg-white ${errors.fromCity ? 'border-red-500' : 'border-gray-300'}`}
                    value={fromCity}
                    onChange={(e) => {
                      setFromCity(e.target.value);
                      if (errors.fromCity) setErrors({...errors, fromCity: ''});
                    }}
                    required
                  >
                    <option value="">Select a city</option>
                    <option value="Mogadishu">Mogadishu</option>
                    <option value="London">London</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Kuala Lumpur">Kuala Lumpur</option>
                    <option value="Istanbul">Istanbul</option>
                    <option value="Doha">Doha</option>
                    <option value="New York">New York</option>
                    <option value="Paris">Paris</option>
                    <option value="Kismayo">Kismayo</option>
                    <option value="Boorama">Boorama</option>
                    <option value="Cabudwaq">Cabudwaq</option>
                    <option value="Kgs">Kgs</option>
                    <option value="Hargeysa">Hargeysa</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.fromCity && <p className="text-red-500 text-xs mt-1">{errors.fromCity}</p>}
              </div>

              {/* To City */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-500" />
                  To:
                </label>
                <div className="relative">
                  <select
                    className={`p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none bg-white ${errors.toCity ? 'border-red-500' : 'border-gray-300'}`}
                    value={toCity}
                    onChange={(e) => {
                      setToCity(e.target.value);
                      if (errors.toCity) setErrors({...errors, toCity: ''});
                    }}
                    required
                  >
                    <option value="">Select a city</option>
                    <option value="Mogadishu">Mogadishu</option>
                    <option value="London">London</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Kuala Lumpur">Kuala Lumpur</option>
                    <option value="Istanbul">Istanbul</option>
                    <option value="Doha">Doha</option>
                    <option value="New York">New York</option>
                    <option value="Paris">Paris</option>
                    <option value="Kismayo">Kismayo</option>
                    <option value="Boorama">Boorama</option>
                    <option value="Cabudwaq">Cabudwaq</option>
                    <option value="Kgs">Kgs</option>
                    <option value="Hargeysa">Hargeysa</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.toCity && <p className="text-red-500 text-xs mt-1">{errors.toCity}</p>}
              </div>

              {/* Departure Date */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaCalendarAlt className="text-sky-500" />
                  Departure:
                </label>
                <input
                  type="date"
                  className={`p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.departureDate ? 'border-red-500' : 'border-gray-300'}`}
                  value={departureDate}
                  min={today}
                  onChange={(e) => {
                    setDepartureDate(e.target.value);
                    if (errors.departureDate) setErrors({...errors, departureDate: ''});
                  }}
                  required
                />
                {errors.departureDate && <p className="text-red-500 text-xs mt-1">{errors.departureDate}</p>}
              </div>

              {/* Return Date */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  Return:
                </label>
                <input
                  type="date"
                  className={`p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.returnDate ? 'border-red-500' : 'border-gray-300'}`}
                  value={returnDate}
                  min={minReturnDate}
                  onChange={(e) => {
                    setReturnDate(e.target.value);
                    if (errors.returnDate) setErrors({...errors, returnDate: ''});
                  }}
                  required
                />
                {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
              </div>

              {/* Passengers */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaUsers className="text-sky-500" />
                  Passengers:
                </label>
                <input
                  type="number"
                  className={`p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.passengers ? 'border-red-500' : 'border-gray-300'}`}
                  min="1"
                  max="10"
                  value={passengers}
                  onChange={(e) => {
                    const val = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
                    setPassengers(val);
                    if (errors.passengers) setErrors({...errors, passengers: ''});
                  }}
                  required
                />
                {errors.passengers && <p className="text-red-500 text-xs mt-1">{errors.passengers}</p>}
              </div>

              {/* Flight Class */}
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaTag className="text-sky-500" />
                  Class:
                </label>
                <div className="relative">
                  <select
                    className="p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none bg-white"
                    value={flightClass}
                    onChange={(e) => setFlightClass(e.target.value)}
                    required
                  >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Price and Book Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-gray-600 mb-1">Total Price:</p>
                <p className={`text-2xl font-bold ${price === 'Price not available' ? 'text-gray-400' : 'text-blue-600'}`}>
                  {price === 'Price not available' ? 'Price not available' : `$${parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </p>
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>
              
              <button
                type="submit"
                disabled={loadin || price === 'Price not available'}
                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loadin ? (
                  <>
                    <ClipLoader color="#ffffff" size={20} />
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <FaPlane className="mr-1" />
                    Book now
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Toaster />
      <MainBookin />
    </div>
  );
};

export default Bookin;
