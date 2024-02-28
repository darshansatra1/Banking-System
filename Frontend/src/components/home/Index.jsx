import React, { useEffect, useState } from "react";
import Hero from "./components/home/Hero";
import Footer from "./components/layout/Footer";
import { ScrollToTopBtn } from "./components/home/ScrollToTopBtn";

export const Index = () => {
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
      <Hero />
      <Footer />
      <ScrollToTopBtn startAnimation={startAnimation} />
    </>
  );
};
