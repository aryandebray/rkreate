import { motion } from "framer-motion";
import { Shield, Truck, Award, Clock, Users, HeartHandshake } from "lucide-react";
const WhyChooseUs = () => {
  const reasons = [{
    icon: Shield,
    title: "Quality Assured",
    description: "We maintain the highest standards of quality in all our products."
  }, {
    icon: Truck,
    title: "Timely Delivery",
    description: "Reliable and punctual delivery service to meet your business needs."
  }, {
    icon: Award,
    title: "Premium Selection",
    description: "Carefully selected premium products from trusted sources."
  }, {
    icon: Clock,
    title: "Fresh Supply",
    description: "Regular fresh supply to ensure the best quality for your customers."
  }, {
    icon: Users,
    title: "Customer Support",
    description: "Dedicated support team to assist you with any queries."
  }, {
    icon: HeartHandshake,
    title: "Long-term Partnership",
    description: "We believe in building lasting relationships with our clients."
  }];
  return <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Why Choose Us</h1>
          <p className="max-w-2xl mx-auto text-purple-950 font-semibold text-xl">Our mission- &quot;Responsibly sourced &amp; supply best quality foods.&quot;</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return <motion.div key={reason.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-emerald-300 hover:bg-emerald-200">
                <div className="bg-rkgreen/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-rkpurple h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </motion.div>;
        })}
        </div>

        {/* Trust Indicators */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} viewport={{
        once: true
      }} className="mt-20 rounded-xl shadow-lg p-8 text-center bg-emerald-950 hover:bg-emerald-800">
          <h2 className="text-2xl font-bold mb-8">Trusted by Businesses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{
            label: "Years of Experience",
            value: "10+"
          }, {
            label: "Happy Clients",
            value: "500+"
          }, {
            label: "Products",
            value: "20+"
          }, {
            label: "Cities Served",
            value: "15+"
          }].map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            scale: 0.5
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} viewport={{
            once: true
          }}>
                <div className="text-3xl font-bold text-rkpurple mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>)}
          </div>
        </motion.div>
      </div>
    </div>;
};
export default WhyChooseUs;