import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

export default function App() {
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const projets = [
    { id: 1, title: "Projet 1", description: "Bla bla bla bla", imgSrc: "https://www.pexels.com/fr-fr/photo/patisser-fait-maison-artisanal-photo-de-nourriture-4659442" },
    { id: 2, title: "Projet 2", description: "Une description rapide du projet 2", imgSrc: "https://source.unsplash.com/random/400x300?sig=2" },
    { id: 3, title: "Projet 3", description: "Une description rapide du projet 3", imgSrc: "https://source.unsplash.com/random/400x300?sig=3" },
    { id: 4, title: "Projet 4", description: "Une description rapide du projet 4", imgSrc: "https://source.unsplash.com/random/400x300?sig=4" }
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_q1p0ojl", "template_f273cac", e.target, "RFzI6MSf6Q7bT79ka")
      .then(
        () => {
          setStatus("success");
          e.target.reset();
          setTimeout(() => setStatus(null), 5000); // Efface le message après 5s
        },
        () => {
          setStatus("error");
          setTimeout(() => setStatus(null), 5000);
        }
      );
  };

  return (
    <div>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between">
          <span className="font-bold text-lg text-black">Heritiana.design</span>
          <ul className="flex space-x-6 text-sm font-medium">
            <li><a href="#projects" className="hover:text-blue-500">Projets</a></li>
            <li><a href="#about" className="hover:text-blue-500">À propos</a></li>
            <li><a href="#contact" className="hover:text-blue-500">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main className="pt-24 px-4 max-w-4xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-4"
          >
            Bonjour, je suis Heritiana 👋
          </motion.h1>
          <p className="text-gray-600">Développeur créatif, passionné par le design minimal et l'interaction fluide.</p>
        </section>

        {/* Projets */}
        <section id="projects" className="mb-20">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Mes Projets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projets.map((projet) => (
  <motion.div
    key={projet.id}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.03, rotate: 0.5 }}
    transition={{ duration: 0.5 }}
    className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
  >
    <img
      src={projet.imgSrc}
      alt={projet.title}
      className="object-cover w-full h-60 group-hover:scale-105 transition-transform duration-500"
    />

    {/* Overlay interactif */}
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <a
        href="#"
        className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Voir le projet
      </a>
    </div>

    {/* Infos projet */}
    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
      <h3 className="font-bold text-lg">{projet.title}</h3>
      <p className="text-sm">{projet.description}</p>
      {/* Tags techs fictifs */}
      <div className="flex gap-2 mt-2 text-xs">
        <span className="bg-white/20 px-2 py-1 rounded">React</span>
        <span className="bg-white/20 px-2 py-1 rounded">Tailwind</span>
      </div>
    </div>
  </motion.div>
))}

          </div>
        </section>

        {/* À propos */}
        <section id="about" className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">À propos</h2>
          <p className="text-gray-700 leading-relaxed">
            Je suis développeur frontend avec une approche créative et centrée sur l'expérience utilisateur.
            Mon objectif est de transformer des idées en interfaces élégantes et efficaces.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="mb-20">
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Contact</h2>

          {/* Message de confirmation */}
          {status === "success" && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
              ✅ Message envoyé avec succès !
            </div>
          )}
          {status === "error" && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
              ❌ Une erreur est survenue, veuillez réessayer.
            </div>
          )}

          <form onSubmit={sendEmail} className="max-w-lg mx-auto grid gap-6">
            <input
              type="text"
              name="user_name"
              placeholder="Nom"
              className="border border-gray-300 rounded-lg px-4 py-3"
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg px-4 py-3"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Objet"
              className="border border-gray-300 rounded-lg px-4 py-3"
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              className="border border-gray-300 rounded-lg px-4 py-3 resize-none h-32"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
            >
              Envoyer
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
