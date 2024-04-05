import React, { useEffect, useState } from "react";
import {Navbar} from "../../components/Navbar";
import homePhoto from "../../assets/imgs/bg-intro-desktop.png";
import { ScrollToTopBtn } from "../../components/ScrollToTopBtn";
import Footer from "../../components/Footer";


const HomePage = ()=>{

    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        const handleScroll = (_event) => {
        if (window.scrollY > window.innerHeight && !startAnimation) {
            setStartAnimation(true);
        }

        if (window.scrollY < window.innerHeight && startAnimation) {
            setStartAnimation(false);
        }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [startAnimation]);

    return (
        <>

            <section className="background-radial-gradient mb-40">
                <Navbar/>
                <div className="px-6 py-12 text-center md:px-12 lg:text-left">
                    <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <div className="mt-12 lg:mt-0">
                                <h1 className="mt-0 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-[hsl(218,81%,95%)]">
                                    Enhance <br/><span className="text-[hsl(218,81%,75%)]">your banking experience</span>
                                </h1>

                                <p className="text-slate-100 !font-sans text-sm md:text-base lg:text-lg leading-5 my-5 drop-shadow">
                                    Bring your finances into the online world!
                                    With your SBS account,you've got everything
                                    you need in one convenient spot.
                                </p>

                                <a className="mb-2 inline-block rounded bg-neutral-50 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] md:mr-2 md:mb-0"
                                data-te-ripple-init data-te-ripple-color="light" href="/register"
                                role="button">Register</a>
                                <a className="mb-2 inline-block rounded bg-green-500 px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] md:mr-2 md:mb-0"
                                data-te-ripple-init data-te-ripple-color="light" href="/login" role="button">Login</a>

                            </div>
                            <div className="mb-12 lg:mb-0">
                                <img src={homePhoto}
                                    className="w-full" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <ScrollToTopBtn startAnimation={startAnimation} />
        </>
    )
}
export default HomePage;