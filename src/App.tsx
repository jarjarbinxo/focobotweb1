import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Box,
  ExternalLink,
  Rocket,
  Zap,
  Layers,
  Shield,
  Quote,
  ArrowRight,
  Hexagon,
  Framer,
  Hash,
  SquarePen,
  Camera,
  PieChart,
  CreditCard,
} from "lucide-react";

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const revealVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.5, 0, 0, 1] },
    },
  };

  return (
    <div className="font-sans app-gradient text-text-dark min-h-screen overflow-x-hidden selection:bg-accent-warm/30 selection:text-text-dark leading-relaxed">
      {/* Header */}
      <header
        className={`fixed top-0 w-full px-8 md:px-16 py-6 flex justify-between items-center z-50 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-glass-bg backdrop-blur-[40px] border-b border-glass-border shadow-sm"
            : ""
        }`}
      >
        <div className="text-2xl font-bold flex items-center gap-2 tracking-tight">
          <Hexagon className="w-6 h-6" /> LuminaAI
        </div>
        <nav className="hidden md:flex gap-8 bg-glass-bg px-6 py-2 rounded-full backdrop-blur-md border border-glass-border shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <a
            href="#solutions"
            className="text-[0.95rem] font-medium text-text-muted hover:text-text-dark transition-colors"
          >
            Solutions
          </a>
          <a
            href="#studio"
            className="text-[0.95rem] font-medium text-text-muted hover:text-text-dark transition-colors"
          >
            AI Studio
          </a>
          <a
            href="#pricing"
            className="text-[0.95rem] font-medium text-text-muted hover:text-text-dark transition-colors"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="text-[0.95rem] font-medium text-text-muted hover:text-text-dark transition-colors"
          >
            Contact
          </a>
        </nav>
        <button className="bg-btn-dark text-white px-6 py-3 rounded-full font-medium text-[0.95rem] flex items-center gap-2 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_15px_25px_rgba(0,0,0,0.15)] transition-all shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
          Try AI Now <ExternalLink className="w-4 h-4 ml-1" />
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-8 overflow-hidden">
        {/* Orbs */}
        <div className="absolute rounded-full blur-[80px] opacity-60 w-[60vw] h-[30vw] bg-[#feb47b] -bottom-[10%] -left-[10%] z-0 pointer-events-none"></div>
        <div className="absolute rounded-full blur-[80px] opacity-60 w-[50vw] h-[40vw] bg-[#ff7e5f] -bottom-[20%] -right-[10%] z-0 pointer-events-none"></div>

        <motion.div
          className="relative z-10 max-w-[800px] -mt-[5vh]"
          initial="hidden"
          animate="visible"
          variants={revealVariants}
        >
          <h1 className="text-4xl sm:text-6xl md:text-[5rem] font-semibold leading-[1.1] tracking-tight mb-6 text-text-dark">
            Intelligence That <br />
            Flows With You
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-[600px] mx-auto mb-10">
            Build, automate, and scale with AI designed to think naturally. As
            smooth and adaptive as the world around you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button className="bg-btn-dark text-white px-8 py-4 rounded-full font-medium text-[1.05rem] flex items-center gap-2 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_15px_25px_rgba(0,0,0,0.15)] transition-all shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
              <Rocket className="w-5 h-5 mr-1" /> Start Building with AI
            </button>
            <a
              href="#capabilities"
              className="font-medium text-text-muted hover:text-text-dark transition-colors"
            >
              Explore Capabilities
            </a>
          </div>
        </motion.div>
      </section>

      {/* Credibility Logos */}
      <motion.section
        className="py-16 px-8 text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={revealVariants}
      >
        <p className="text-[0.9rem] font-medium text-text-muted mb-8">
          Trusted by innovators at
        </p>
        <div className="flex justify-center items-center flex-wrap gap-12">
          {[
            { name: "Figma", icon: Framer },
            { name: "slack", icon: Hash },
            { name: "Notion", icon: SquarePen },
            { name: "loom", icon: Camera },
            { name: "miro", icon: PieChart },
            { name: "stripe", icon: CreditCard },
          ].map((company) => (
            <div
              key={company.name}
              className="text-2xl font-semibold text-text-muted flex items-center gap-2 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-105 hover:text-text-dark transition-all cursor-pointer"
            >
              <company.icon className="w-6 h-6" /> {company.name}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Value Proposition */}
      <motion.section
        className="py-32 px-8 max-w-6xl mx-auto"
        id="solutions"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={revealVariants}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-4 text-text-dark font-semibold">
            Why Choose LuminaAI?
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">
            The tools you need to amplify your productivity and scale
            effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Lightning Fast",
              description:
                "Experience real-time AI processing that doesn't keep you waiting. Our advanced infrastructure ensures ultra-low latency generation.",
              icon: Zap,
            },
            {
              title: "Seamless Integration",
              description:
                "Plug our APIs directly into your existing workflow. Compatible with everything from Slack and Notion to your custom-built enterprise apps.",
              icon: Layers,
            },
            {
              title: "Enterprise Security",
              description:
                "Your data stays yours. With SOC2 compliance and end-to-end encryption, you can trust us with your most sensitive operations.",
              icon: Shield,
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="glass-card p-8 md:p-12 hover:-translate-y-2 transition-all duration-400 relative overflow-hidden group"
            >
              <div className="h-16 w-16 bg-bg-light rounded-2xl flex items-center justify-center text-accent-warm mb-6 text-2xl group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-[1.5rem] text-text-dark mb-4 tracking-tight font-semibold">
                {feature.title}
              </h3>
              <p className="text-text-muted text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="glass-card my-8 mx-auto max-w-[1300px] py-24 px-8 md:px-16"
        id="studio"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={revealVariants}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-4 text-text-dark font-semibold">
            Loved by Visionaries
          </h2>
          <p className="text-text-muted text-lg">
            See how modern teams are transforming their workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote:
                "\"LuminaAI completely changed how we handle customer data. The intuitive flow and adaptive models saved us over 40 hours a week.\"",
              name: "Sarah Jenkins",
              role: "CTO at TechFlow",
              initial: "S",
            },
            {
              quote:
                "\"The sleekest interface I've used for AI implementation. It feels less like a tool and more like an extension of my own team.\"",
              name: "Marcus Chen",
              role: "Lead Designer, Orbit",
              initial: "M",
            },
            {
              quote:
                "\"Scaling our operations was a nightmare until we found this platform. It truly is intelligence that flows naturally with your needs.\"",
              name: "Elena Rostova",
              role: "VP of Operations, Velocity",
              initial: "E",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white/40 border border-white/30 p-10 rounded-[24px] relative"
            >
              <Quote
                className="absolute top-8 right-8 text-black/5 w-12 h-12"
                fill="currentColor"
              />
              <p className="text-[1.1rem] italic mb-8 text-text-dark leading-relaxed relative z-10">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-[50px] h-[50px] rounded-full bg-accent-glow flex items-center justify-center text-accent-warm font-bold text-lg">
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="text-[1rem] font-semibold text-text-dark m-0 mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-[0.85rem] text-text-muted m-0">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Form */}
      <motion.section
        className="py-32 px-8 relative"
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={revealVariants}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-4 text-text-dark font-semibold">
            Ready to transform your work?
          </h2>
          <p className="text-text-muted text-lg">
            Join the waitlist or get in touch with our enterprise team.
          </p>
        </div>

        <div className="max-w-[600px] mx-auto glass-card p-8 md:p-16 relative overflow-hidden">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for reaching out! We will be in touch shortly.");
            }}
            className="flex flex-col gap-6 relative z-10"
          >
            <div>
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full p-4 bg-bg-light border border-transparent rounded-[12px] font-sans text-base text-text-dark outline-none transition-all focus:bg-white focus:border-accent-warm focus:shadow-[0_0_0_4px_var(--color-accent-glow)]"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Work Email Address"
                required
                className="w-full p-4 bg-bg-light border border-transparent rounded-[12px] font-sans text-base text-text-dark outline-none transition-all focus:bg-white focus:border-accent-warm focus:shadow-[0_0_0_4px_var(--color-accent-glow)]"
              />
            </div>
            <div>
              <textarea
                placeholder="Tell us about what you want to build..."
                required
                className="w-full p-4 bg-bg-light border border-transparent rounded-[12px] font-sans text-base text-text-dark outline-none transition-all focus:bg-white focus:border-accent-warm focus:shadow-[0_0_0_4px_var(--color-accent-glow)] min-h-[120px] resize-y"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-btn-dark text-white p-4 rounded-full font-medium text-[1.1rem] flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_15px_25px_rgba(0,0,0,0.15)] transition-all mt-4"
            >
              Request Access <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </form>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="glass-card border-x-0 border-b-0 rounded-none text-center p-12 text-text-muted">
        <p>
          &copy; 2026 LuminaAI Inc. All rights reserved. Designed with precision.
        </p>
      </footer>
    </div>
  );
}
