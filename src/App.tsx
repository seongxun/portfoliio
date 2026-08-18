/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import TrustSandbox from "./components/TrustSandbox";
import Awards from "./components/Awards";
import Education from "./components/Education";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen font-sans bg-slate-50 overflow-x-hidden antialiased">
      {/* Premium Navigation */}
      <Navbar />

      {/* Hero Header with Live Finexo Dashboard Widget */}
      <Hero />

      {/* About Bento-Grid with copy-to-clip controls */}
      <About />

      {/* Current work experience and responsibilities */}
      <Experience />

      {/* Filterable Skills & Tech Stacks Pane */}
      <Skills />

      {/* Projects Timeline with MSA Architectures & JMeter Sliders */}
      <Projects />

      {/* Live System Trust & Database Locking Sandbox */}
      <TrustSandbox />

      {/* Honors, Activities & Kakao API Timeout Callback Loop Sim */}
      <Awards />

      {/* Academic Qualifications & Certification Badges */}
      <Education />

      {/* Modern, Brand-Aligned Deep Footer */}
      <Footer />
    </div>
  );
}
