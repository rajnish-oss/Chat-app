import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import {animate, motion} from 'motion/react'

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#050C1A] text-white min-h-screen w-full font-sans">
      {/* Navbar */}
      <nav id="nav" className="flex justify-between items-center px-6 md:px-16 py-6 bg-[#0B0C14] shadow-md shadow-blue-300 w-full top-0">
        <h1 className="text-2xl md:text-3xl font-bold text-[#8EC5FF]">
          AI Chat App
        </h1>
        <ul className="hidden md:flex gap-6 text-white text-lg">
          <li>
            <a href="#features" className="hover:text-[#8EC5FF]">
              Features
            </a>
          </li>
          <li>
            <a href="#why-us" className="hover:text-[#8EC5FF]">
              Why Us
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-[#8EC5FF]">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col md:flex-row md:h-[60vh] bg-gradient-to-b justify-between to-blue-300 to-blue-900 shadow-2xl  md:px-16 p-8">
          <div className="flex flex-col justify-center w-fit">
            <h2 className="text-4xl md:text-6xl  font-bold mb-4 text-[#8EC5FF]">
              Talk Smart. Stay Connected.
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-6">
              Our AI-powered chat app brings intelligent, personalized
              conversations to your fingertips — with secure, real-time
              communication and unforgettable AI personas.
            </p>
            <button
              onClick={() => navigate("/createUser")}
              className="mt-2 h-10 w-40 align-middle self-start rounded bg-[#8EC5FF] text-[#050C1A] font-semibold hover:bg-white hover:text-[#050C1A] transition"
            >
              Get Started
            </button>
         </div>   
            <div className="self-center">
              <img src="./public/hero.png" alt="hero" />
            </div>
        
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 md:px-20 bg-[#0B0C14]">
        <motion.div viewport={{ once: true }}className="text-3xl font-semibold mb-12 text-center text-[#8EC5FF]">
          Features
        </motion.div>
        <div className="grid md:grid-cols-3 gap-10 text-white">
          <motion.div viewport={{ once: true }}initial={{opacity:0,x:0,y:30}} whileInView={{opacity:1,x:0,y:0}} transition={{duration:0.4,ease:'easeInOut'}}  className="bg-gradient-to-bl from-blue-600 to-blue-900 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h4 className=" text-[#050C1A] text-xl font-bold mb-2">AI Personas</h4>
            <p>
              Talk to unique AI bots tailored to your needs, tone, and
              preferences.
            </p>
          </motion.div>
          <motion.div viewport={{ once: true }}initial={{opacity:0,x:0,y:30}} whileInView={{opacity:1,x:0,y:0}} transition={{duration:0.4,ease:'easeInOut'}} className="bg-gradient-to-bl from-blue-600 to-blue-900 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h4 className=" text-[#050C1A] text-xl font-bold mb-2">Real-Time Chat</h4>
            <p>
              Lightning-fast WebSocket-powered messaging with live typing and
              delivery status.
            </p>
          </motion.div>
          <motion.div viewport={{ once: true }}initial={{opacity:0,x:0,y:30}} whileInView={{opacity:1,x:0,y:0}} transition={{duration:0.4,ease:'easeInOut'}} className="bg-gradient-to-bl from-blue-600 to-blue-900 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h4 className="text-xl text-[#050C1A] font-bold mb-2">Smart Memory</h4>
            <p>
              AI remembers past messages and adapts replies to context — not
              just your last input.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-20 px-6 md:px-20 text-center shadow-2xl shadow-blue-400 w-[90vw rounded-2xl m-2 mb-10">
         <motion.div viewport={{ once: true }}initial={{opacity:0,scale:1.1}} whileInView={{opacity:1,scale:1}} transition={{duration:1,ease:"easeInOut"}}  className="">
        <h3 className="text-3xl font-semibold mb-6 text-[#8EC5FF]">
          What Makes Us Different?
        </h3>
        <p className="max-w-3xl mx-auto text-gray-300 text-lg mb-6">
          Unlike other chat apps, we combine real-time communication with
          intelligent AI companions that learn, adapt, and support your goals.
          It's not just messaging—it's a smarter experience.
        </p>
        <ul className="text-left max-w-xl mx-auto text-gray-400 space-y-4">
          <li><FaRegCheckCircle className="inline-block text-blue-400 text-2xl mr-2" /> AI personas per chat (custom tone, memory, tasks)</li>
          <li><FaRegCheckCircle className="inline-block text-blue-400 text-2xl mr-2" /> End-to-end encryption for all messages</li>
          <li><FaRegCheckCircle className="inline-block text-blue-400 text-2xl mr-2" /> Integrated media sharing & voice commands</li>
          <li><FaRegCheckCircle className="inline-block text-blue-400 text-2xl mr-2" /> Designed for users who want productivity + fun</li>
        </ul>
        </motion.div >
      </section>
      
      

      {/* Contact Section */}
      <motion.div
      viewport={{ once: true }}
      initial={{opacity:0,scale:0.7}} whileInView={{opacity:1,scale:1}} transition={{duration:1,ease:"easeInOut"}}
        id="contact"
        className="py-16 px-6 md:px-20 text-center"
      >
        <h3 className="text-3xl font-semibold text-[#8EC5FF] mb-4 ">
          Let's Connect
        </h3>
        <p className="text-gray-300 mb-4">
          Got questions or feedback? We’d love to hear from you.
        </p>
        <a
          href="mailto:support@aichatapp.com"
          className="text-[#8EC5FF] underline hover:text-white transition"
        >
          support@aichatapp.com
        </a>
      </motion.div>

      {/* Footer */}
      <footer className="bg-[#050C1A] py-6 text-center border-t border-blue-400 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} AI Chat App. Built for the future of
        communication.
      </footer>
    </div>
  );
};

export default LandingPage;
