import { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [loginInput, setLoginInput] = useState("");

  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;
  const BASE_URL = import.meta.env.VITE_URL;

  const isLoggedIn = !!token;

  // Récupérer les projets
  const fetchProjects = () => {
    axios.get(API_URL)
      .then(res => setProjects(res.data.projects))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (isLoggedIn) fetchProjects();
  }, [isLoggedIn]);

  // Login simple avec message d'erreur
  const handleLogin = () => {
    if (loginInput === TOKEN) {
      setToken(loginInput);
      localStorage.setItem("adminToken", loginInput);
      setLoginInput("");
    } else {
      alert("Token invalide !");
    }
  };

  // Déconnexion
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
  };

  // Ajouter ou mettre à jour un projet
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    if (image) formData.append("file", image);

    const url = editId ? `${API_URL}/${editId}` : `${API_URL}/${projects.length + 1}`;

    axios.put(url, formData, { headers: { access_token: token } })
      .then(() => {
        setTitle(""); setDescription(""); setLink(""); setImage(null); setEditId(null);
        fetchProjects();
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          alert(err.response.data.detail || "Token invalide !");
          handleLogout();
        } else {
          console.error(err);
        }
      });
  };

  // Supprimer un projet
  const handleDelete = (id) => {
    if (!token) return;

    axios.delete(`${API_URL}/${id}`, { headers: { access_token: token } })
      .then(() => fetchProjects())
      .catch(err => {
        if (err.response && err.response.status === 401) {
          alert(err.response.data.detail || "Token invalide !");
          handleLogout();
        } else {
          console.error(err);
        }
      });
  };

  // Préparer la modification d’un projet
  const handleEdit = (project) => {
    setEditId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setLink(project.link);
  };

  // ===== Affichage =====
  if (!isLoggedIn) {
    return (
      <div className="container py-5">
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin token"
          className="form-control mb-3"
          value={loginInput}
          onChange={e => setLoginInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin - Projects</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </div>

      {/* Formulaire Ajouter / Modifier */}
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Title"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder="Description"
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Link"
            className="form-control"
            value={link}
            onChange={e => setLink(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input type="file" onChange={e => setImage(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary">
          {editId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* Liste des projets */}
      <div className="row">
        {projects.map(project => (
          <div key={project.id} className="col-md-6 mb-3">
            <div className="card shadow-sm">
              <img
                src={project.image_url ? `${BASE_URL}/${project.image_url}` : ""}
                className="card-img-top"
                alt={project.title}
              />
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-success me-2">View</a>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(project)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(project.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
