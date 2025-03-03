
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First store in database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([formData]);

      if (dbError) {
        console.error("Database error:", dbError);
      }

      // Then trigger notifications
      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (emailError) {
        console.error("Email error:", emailError);
      }

      // Save to file as backup
      const { error: fileError } = await supabase.functions.invoke('save-contact-to-file', {
        body: { ...formData, created_at: new Date().toISOString() }
      });

      if (fileError) {
        console.error("File error:", fileError);
      }

      toast({
        title: "Thank you for your message!",
        description: "We will get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      console.error("Error processing submission:", error);
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-gray-600">
              Have questions about our products? We'd love to hear from you.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <motion.div whileHover={{
                  scale: 1.05
                }} className="flex items-center space-x-4">
                    <div className="bg-rkgreen/10 p-3 rounded-full">
                      <MapPin className="text-rkpurple h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <a 
                        href="https://maps.app.goo.gl/MbbQWTpykx6iwSM5A" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-rkpurple transition-colors"
                      >
                        83D/1A, Chetla Road, Kolkata - 700027
                      </a>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{
                  scale: 1.05
                }} className="flex items-center space-x-4">
                    <div className="bg-rkgreen/10 p-3 rounded-full">
                      <Phone className="text-rkpurple h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+91 9830908820</p>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{
                  scale: 1.05
                }} className="flex items-center space-x-4">
                    <div className="bg-rkgreen/10 p-3 rounded-full">
                      <Mail className="text-rkpurple h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">info@rkreate.net</p>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{
                  scale: 1.05
                }} className="flex items-center space-x-4">
                    <div className="bg-rkgreen/10 p-3 rounded-full">
                      <MessageSquare className="text-rkpurple h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">Mon - Fri: 9am - 5pm</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rkgreen focus:border-transparent outline-none transition-shadow" required />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rkgreen focus:border-transparent outline-none transition-shadow" required />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rkgreen focus:border-transparent outline-none transition-shadow" required />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rkgreen focus:border-transparent outline-none transition-shadow resize-none" required />
                </div>

                <motion.button 
                  whileHover={{scale: 1.02}} 
                  whileTap={{scale: 0.98}} 
                  type="submit" 
                  className="w-full bg-rkpurple text-white py-3 px-6 rounded-lg hover:bg-rkpurple-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
};

export default Contact;
