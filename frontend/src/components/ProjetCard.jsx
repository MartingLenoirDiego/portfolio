import { Link } from "react-router-dom";

function ProjectCard({ title, description, image, link }) {
  return (
    <div className="col-md-6 mb-4">
      <div
        className="card h-100 shadow"
        style={{
          backgroundColor: "var(--slate-grey)",
          color: "var(--parchment)",
        }}
      >
        <img
          src={image}
          className="card-img-top"
          alt={title}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>

          <p className="card-text flex-grow-1">
            {description}
          </p>

          <Link to={link} className="btn btn-primary mt-auto" target="_blank">
            View Project
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
