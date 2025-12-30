import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjetCard.jsx";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = import.meta.env.VITE_URL;
function HomePage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setProjects(response.data.projects))
      .catch(error => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="container py-5" style={{ minHeight: "100vh" }}>

      {/* ===== HERO ===== */}
      <section className="text-center mb-5 rounded shadow"
        style={{
          backgroundColor: "var(--bone)",
          color: "var(--shadow-grey)",
        }}>
        <h1 className="display-4 fw-bold mb-3">
          Hi, I’m Diego 👋
        </h1>
        <p className="lead mx-auto" style={{ maxWidth: "700px" }}>
          Python & Java Developer focused on <strong>Building app</strong>,{" "}
          <strong>Data</strong> and <strong>Automation</strong>.
        </p>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="mb-5">
        <h2 className="text-center mb-4">🚀 Featured Projects</h2>

        <div className="row">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={BASE_URL + "/" + project.image_url}
              link={project.link}
            />
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        className="text-center p-5 rounded shadow"
        style={{
          backgroundColor: "var(--bone)",
          color: "var(--shadow-grey)",
        }}
      >
        <h2 className="mb-3">Let’s work together 🤝</h2>
        <p className="mb-4">
          Interested in a collaboration, a project, or just talking tech?
        </p>
        <Link to="/about" className="btn btn-dark btn-lg">
          Get in touch
        </Link>
      </section>

    </div>
  );
}

export default HomePage;
