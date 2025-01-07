import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestRoles from './LatestRoles';
import Footer from './shared/Footer';
import useGetAllRoles from '@/hooks/useGetAllRoles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllRoles();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.character === 'recruiter') {
      navigate("/admin/projects");
    }
  }, [user, navigate]);

  return (
    <motion.div
      className="bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fixed navbar */}
      <Navbar />

      {/* Main content with padding to avoid overlap */}
      <div className="pt-16 bg-gradient-to-br from-[#000000] via-[#111111] to-[#222222]">
        <HeroSection />
        <CategoryCarousel />
        <LatestRoles />
        <Footer />
      </div>
      
    </motion.div>
  );
};

export default Home;
