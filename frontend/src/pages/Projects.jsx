import { useState, useEffect } from 'react'

function Projects() {
  const [showForm, setShowForm] = useState(false)

  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('Planning')
  const [projects, setProjects] = useState(() => {
  const savedProjects = localStorage.getItem('relayiq-projects')
  return savedProjects ? JSON.parse(savedProjects) : []
})
useEffect(() => {
  localStorage.setItem('relayiq-projects', JSON.stringify(projects))
}, [projects])

  function handleCreateProject(e) {
  e.preventDefault()

  if (!projectName.trim()) {
    alert('Please enter a project name')
    return
  }

  const newProject = {
    id: Date.now(),
    name: projectName,
    description: description,
    status: status
  }

  setProjects([...projects, newProject])

  setProjectName('')
  setDescription('')
  setStatus('Planning')
  setShowForm(false)
}
function handleDeleteProject(id) {
  const updatedProjects = projects.filter(
    (project) => project.id !== id
  )

  setProjects(updatedProjects)
}

  return (
    <section className="page-content">

      <div className="projects-header">
        <div className="page-heading">
          <h1>Projects</h1>
          <p>Manage and organize your workspace projects.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowForm(!showForm)}
        >
          New Project
        </button>
      </div>

      {showForm && (
        <form className="project-form" onSubmit={handleCreateProject}>

          <h3>Create a new project</h3>

          <div className="form-group">
            <label>Project Name</label>
            <input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Describe your project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>

            <button type="submit" className="primary-btn">
                  Create Project
            </button>
          </div>

        </form>

        
      )}
      {projects.length > 0 && (
  <div className="project-list">
    <h3>All Projects</h3>

    {projects.map((project) => (
      <div className="project-row" key={project.id}>
  <div>
    <h4>{project.name}</h4>
    <p>{project.description}</p>
  </div>

  <div>
    <span>{project.status}</span>
    <button onClick={() => handleDeleteProject(project.id)}>
      Delete
    </button>
  </div>
</div>
    ))}
  </div>
)}

      {!showForm && projects.length === 0 &&  (
        <div className="empty-state">
          <h3>No projects yet</h3>
          <p>Your projects will appear here once you create them.</p>
        </div>
      )}

    </section>
  )
}

export default Projects
