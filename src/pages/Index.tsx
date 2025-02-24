import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img src="/lovable-uploads/a129250c-6c16-4908-95e1-35b33017b32b.png" alt="Background pattern" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8
            }}>
              {/* Logo */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <img 
                  src="/lovable-uploads/3c02501b-3f0e-493f-9506-3c983e7f2605.png" 
                  alt="RKreate Logo" 
                  className="h-20 mb-6"
                />
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
                Premium Food Products <br />
                <span className="text-rkpurple">For Your Business</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Supplying restaurants and cafes with the finest quality Basa, Prawns, 
                Mutton, and other premium food products. Experience excellence in every delivery.
              </p>
              <Link to="/products" className="inline-flex items-center space-x-2 bg-rkpurple text-white px-6 py-3 rounded-lg hover:bg-rkpurple-dark transition-colors duration-200">
                <span>Explore Our Products</span>
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 opacity-10">
          <img src="/lovable-uploads/a129250c-6c16-4908-95e1-35b33017b32b.png" alt="Background pattern" className="w-full h-full object-cover rotate-180" />
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }} className="text-3xl font-bold mb-4">
              Our Premium Products
            </motion.h2>
            <p className="text-gray-600">
              Discover our range of high-quality food products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            title: "Basa Fillet",
            image: "/lovable-uploads/b71f10e7-0ca1-4b64-b282-fe8f68e28280.png",
            description: "Premium quality Basa fillets"
          }, {
            title: "Fresh Prawns",
            image: "/lovable-uploads/76c421e0-713b-4182-9f3f-5d1d6bab568d.png",
            description: "Succulent and fresh prawns"
          }, {
            title: "Fish Cheese Balls",
            image: "/lovable-uploads/c445705d-908d-4fe2-83d0-39bc4282502c.png",
            description: "Crispy outside, creamy cheese inside"
          }].map((product, index) => <motion.div key={product.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: index * 0.2
          }} viewport={{
            once: true
          }} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Connect With Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Connect With Us</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Have questions about our products or services? We'd love to hear from you. 
              Reach out to us for personalized assistance.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center space-x-2 bg-rkpurple text-white px-6 py-3 rounded-lg hover:bg-rkpurple-dark transition-colors duration-200"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Get in Touch</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>;
};

export default Index;
