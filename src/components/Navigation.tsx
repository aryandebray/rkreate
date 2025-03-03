
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const links = [{
    to: "/",
    text: "Home"
  }, {
    to: "/products",
    text: "Products"
  }, {
    to: "/why-choose-us",
    text: "Why Choose Us"
  }, {
    to: "/contact",
    text: "Contact"
  }];
  
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20 rounded-none">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              alt="RKreate Logo" 
              className="h-12 w-auto" 
              src="/lovable-uploads/82f2bf84-2c9e-4ac4-b636-42f806250ab7.png" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map(link => <Link key={link.to} to={link.to} className="text-gray-600 hover:text-rkpurple transition-colors duration-200 font-medium">
                {link.text}
              </Link>)}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-600 hover:text-rkpurple">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {links.map(link => <Link key={link.to} to={link.to} className="text-gray-600 hover:text-rkpurple transition-colors duration-200 font-medium" onClick={() => setIsOpen(false)}>
                  {link.text}
                </Link>)}
            </div>
          </div>
        </div>}
    </nav>;
};

export default Navigation;
