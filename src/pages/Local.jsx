import kismayo from "../Images/Kismayo.jpg";
import borama from "../Images/Boorama.jpg";
import cabudwaq from "../Images/cabudwaq.jpg";
import hargeisa from "../Images/Hargeisa.jpg";
import kgs from "../Images/kgs.jpg";
import mog from "../Images/Mogadishu.jpg";

import { Link } from "react-router-dom"
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from "react";

function Local() {

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
    }, []);

    return (
        <div>


            <div className="px-4 md:px-0 sm:mb-0 mb-10">
                {/* First Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-[550px_260px_260px] gap-10 justify-center mt-10">
                    <div className="relative overflow-hidden rounded-3xl group" data-aos="slide-right">
                        <img className="w-full h-[300px]" src={kismayo} />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center z-10">

                            <Link to="/bookin">
                                <button className="bg-white text-black px-8 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Book Now
                                </button>
                            </Link>

                        </div>
                        <div className="absolute left-4 bottom-2 text-white text-xl font-bold z-20">
                            kismayo
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl group" data-aos="slide-left">
                        <img className="w-full h-[300px]" src={borama} />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center z-10">
                            <Link to="/bookin">
                                <button className="bg-white text-black px-8 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                        <div className="absolute left-4 bottom-2 text-white text-xl font-bold z-20">
                            Boorama
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl group" data-aos="fade-up">
                        <img className="w-full h-[300px]" src={cabudwaq} />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center z-10">

                            <Link to="/bookin">
                                <button className="bg-white text-black px-8 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                        <div className="absolute left-4 bottom-2 text-white text-xl font-bold z-20">
                            Cabudwaq
                        </div>
                    </div>
                </div>

                {/* Second Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-[260px_260px_550px] gap-10 justify-center mt-10" data-aos="slide-left">
                    <div className="relative overflow-hidden rounded-3xl group">
                        <img className="w-full h-[300px]" src={hargeisa} />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center z-10">
                            <Link to="/bookin">
                                <button className="bg-white text-black px-8 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                        <div className="absolute left-4 bottom-2 text-white text-xl font-bold z-20">
                            Hargeisa
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl group" data-aos="fade-up">
                        <img className="w-full h-[300px]" src={kgs} />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center z-10">

                            <Link to="/bookin">
                                <button className="bg-white text-black px-8 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                        <div className="absolute left-4 bottom-2 text-white text-xl font-bold z-20">
                            Konfur Galbed
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-3xl group" data-aos="slide-right">
                        <img className="w-full h-[300px]" src={mog} />
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center z-10">
                            <Link to="/bookin">
                                <button className="bg-white text-black px-8 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                        <div className="absolute left-4 bottom-2 text-white text-xl font-bold z-20">
                            Mogadishu
                        </div>
                    </div>
                </div>

            </div>
            
        </div>
    );
}

export default Local;
