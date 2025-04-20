import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cake,
  Coffee,
  Cookie,
  UtensilsCrossed,
} from "lucide-react";

function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-purple-400/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Fresh baked goods"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-5xl font-bold text-black drop-shadow-lg md:text-7xl">
            Pandey Bakery
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 md:text-2xl">
            Eat sleep repeat.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-100 transition-colors">
              Order Online
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Our Menu
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-20 px-4 md:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="font-serif text-4xl font-bold text-blue-700">
              Our Specialties
            </h2>
            <p className="mt-2 text-purple-600">
              A delightful collection of treats
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[{ title: "Bread", description: "Crusty outside, soft inside", icon: <Cookie className="h-10 w-10 text-purple-500" />, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
              { title: "Pastries", description: "Flaky, buttery, and exquisite", icon: <Cake className="h-10 w-10 text-purple-500" />, image: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
              { title: "Cakes", description: "Personalized for every celebration", icon: <UtensilsCrossed className="h-10 w-10 text-purple-500" />, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
              { title: "Coffee", description: "Freshly brewed with love", icon: <Coffee className="h-10 w-10 text-purple-500" />, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" },
            ].map((item, index) => (
              <div key={index} className="group overflow-hidden rounded-xl bg-white shadow-md transition-transform hover:-translate-y-2">
                <img src={item.image} alt={item.title} className="h-48 w-full object-cover group-hover:scale-105 transition-transform" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-purple-100 p-2 rounded-full">
                      {item.icon}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-blue-700">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-purple-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-4 md:px-8">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-serif text-4xl font-bold text-blue-700">
              Our Story
            </h2>
            <p className="mt-6 text-purple-600 leading-relaxed">
              Born from a love for baking and creativity, Sweet Dreams Bakery combines traditional techniques with modern flavors, using only the finest ingredients.
            </p>
            <p className="mt-4 text-purple-600 leading-relaxed">
              Experience the perfect blend of passion, flavor, and craftsmanship in every bite.
            </p>
            <button className="mt-8 px-6 py-3 bg-blue-700 text-white rounded-full font-medium hover:bg-blue-800 transition-colors">
              Learn More About Us
            </button>
          </div>
          <div>
            <img
              src="https://img.freepik.com/free-photo/portrait-man-working-as-baker_23-2151230009.jpg?semt=ais_hybrid&w=740"
              alt="Bakery Team"
              className="rounded-xl shadow-lg object-cover w-full h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-serif text-4xl font-bold text-blue-700 mb-10">
            Customer Love
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{ name: "Saransh", quote: "Absolutely divine croissants! Transported me straight to Paris.", image: "https://img.freepik.com/premium-photo/face-young-handsome-indian-man_251136-20626.jpg?semt=ais_hybrid&w=740" },
              { name: "Manav", quote: "The sourdough here is unmatched. I never go anywhere else.", image: "https://www.shutterstock.com/image-photo/studio-portrait-smile-indian-student-260nw-2453208639.jpg" },
              { name: "Riya", quote: "The birthday cake was not just beautiful, but so delicious!", image: "https://thumbs.dreamstime.com/b/face-young-happy-indian-businesswoman-smiling-face-young-happy-indian-businesswoman-smiling-isolated-against-white-128979240.jpg" },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-xl bg-blue-50 p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="h-16 w-16 rounded-full object-cover border-2 border-purple-300" />
                  <div>
                    <p className="font-semibold text-blue-700">{testimonial.name}</p>
                    <div className="text-yellow-500">★★★★★</div>
                  </div>
                </div>
                <p className="italic text-purple-700">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-400 py-20 px-4 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-serif text-4xl font-bold text-white">
            Ready to Manage Your Bakery?
          </h2>
          <p className="mt-4 text-white/90">
            Update inventory, manage orders, and keep your bakery thriving.
          </p>
          <Link to="/service">
            <button className="mt-8 px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-100 transition-colors flex items-center mx-auto">
              Go to Service Page <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 py-10 px-4 md:px-8">
        <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-8 text-white">
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Sweet Dreams Bakery</h3>
            <p>123 Flour Street, Bakerytown, BT 12345</p>
            <p>Phone: (555) 123-4567</p>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Hours</h3>
            <p>Mon - Fri: 7am - 7pm</p>
            <p>Saturday: 8am - 8pm</p>
            <p>Sunday: 8am - 5pm</p>
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-purple-300">Facebook</a>
              <a href="#" className="hover:text-purple-300">Instagram</a>
              <a href="#" className="hover:text-purple-300">Twitter</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-white/70">
          © 2025 Sweet Dreams Bakery. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
