
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rkgreen/10 to-transparent" />
        
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-rkpurple font-medium">Welcome to RKreate</span>
              <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
                Premium Food Products <br />
                <span className="text-rkpurple">For Your Business</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Supplying restaurants and cafes with the finest quality Basa, Prawns, 
                Mutton, and other premium food products. Experience excellence in every delivery.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-rkpurple text-white px-6 py-3 rounded-lg hover:bg-rkpurple-dark transition-colors duration-200"
              >
                <span>Explore Our Products</span>
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Animated Wave Background */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <div className="absolute inset-0 bg-wave animate-wave opacity-10" />
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Our Premium Products
            </motion.h2>
            <p className="text-gray-600">
              Discover our range of high-quality food products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Basa Fillet",
                image: "https://placehold.co/400x300",
                description: "Premium quality Basa fillets",
              },
              {
                title: "Fresh Prawns",
                image: "https://placehold.co/400x300",
                description: "Succulent and fresh prawns",
              },
              {
                title: "Fish Cheese Balls",
                image: "https://placehold.co/400x300",
                description: "Ready-to-fry delicacies",
              },
            ].map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
