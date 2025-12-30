import diegoImage from "../assets/diego.jpg";
function AboutPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center py-5" style={{ minHeight: "100vh" }}>
      <div className="col-lg-10 col-xl-8">

        {/* ===== ABOUT CARD ===== */}
        <div className="card shadow-lg mb-5" style={{ backgroundColor: "var(--slate-grey)", color: "var(--parchment)" }}>
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center text-center text-md-start">

              {/* Image */}
              <div className="col-md-4 mb-4 mb-md-0">
                <img
                  src={diegoImage}
                  alt="Diego"
                  className="img-fluid rounded-circle shadow"
                />
              </div>

              {/* Texte */}
              <div className="col-md-8">
                <h1 className="mb-3">💫 About Me</h1>

                <p className="lead">
                  👋 Hey, I’m Diego, 25 years old, a Python and Java developer with a passion for data, AI, and automation.
                </p>

                <p>
                  💡 I love turning raw data into clear, useful insights through smart scripts, predictive models, and dashboards.
                </p>

                <p>
                  🚀 Currently working on projects mixing machine learning, APIs, and data pipelines.
                </p>
                <p>
                  ⚡ I also enjoy creating end-to-end applications, from backend to frontend, integrating everything into fully functional products.
                </p>
                <p>
                  🌌 I’m also passionate about space exploration and everything cosmic, it inspires me to think big and code creatively.
                </p>
                <p>
                  🌱 Always curious, constantly learning.
                </p>

                <p>
                  🎮 Outside of coding: gaming, warhammer, and music exploration.
                </p>

                <h5 className="mt-4">🧩 Favorite Stack</h5>
                <p className="mb-4">
                  Python • Pandas • FastAPI • Docker • PostgreSQL
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== CONTACT SECTION ===== */}
        <div className="shadow-lg" style={{ backgroundColor: "var(--bone)", color: "var(--shadow-grey)" }}>
          <div className="card-body p-4 p-md-5 text-center">
            <h2 className="mb-3">📬 Contact</h2>
            <p className="mb-4">
              Interested in a collaboration, a project, or just a tech discussion?
            </p>

            {/* Infos de contact */}
            <p>📧 Email: dmarting@hotmail.be</p>
            <p>📞 Phone: +32 472 11 78 83</p>

            {/* Liens externes */}
            <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-3">
              <a href="https://github.com/MartingLenoirDiego" target="_blank" rel="noreferrer" className="btn btn-dark">
                💻 GitHub
              </a>
              <a href="https://www.linkedin.com/in/diego-marting-lenoir-95179b244/" target="_blank" rel="noreferrer" className="btn btn-dark">
                🔗 LinkedIn
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutPage;
