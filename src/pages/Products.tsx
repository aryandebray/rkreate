
import { motion } from "framer-motion";

const Products = () => {
  const products = [
    {
      name: "Basa Fillet",
      description: "Premium quality Basa fillets, perfectly cleaned and prepared.",
      image: "/lovable-uploads/b71f10e7-0ca1-4b64-b282-fe8f68e28280.png",
      details: ["Fresh and clean", "Carefully processed", "Premium quality"],
    },
    {
      name: "Fresh Prawns",
      description: "Succulent and fresh prawns sourced from the finest locations.",
      image: "/lovable-uploads/76c421e0-713b-4182-9f3f-5d1d6bab568d.png",
      details: ["Fresh catch", "Carefully sorted", "Premium size"],
    },
    {
      name: "Mutton",
      description: "High-quality mutton, perfect for various cuisines.",
      image: "https://placehold.co/400x300",
      details: ["Fresh cut", "Premium quality", "Carefully selected"],
    },
    {
      name: "Fish Fry",
      description: "Ready-to-fry fish preparations with perfect seasoning.",
      image: "https://placehold.co/400x300",
      details: ["Pre-seasoned", "Easy to cook", "Traditional recipe"],
    },
    {
      name: "Fish Cheese Balls",
      description: "Delicious fish cheese balls, perfect as appetizers.",
      image: "https://placehold.co/400x300",
      details: ["Ready to fry", "Perfect blend", "Premium ingredients"],
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our range of premium seafood and meat products, carefully
            selected and processed to meet the highest quality standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <ul className="space-y-2">
                  {product.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-rkpurple rounded-full mr-2" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
