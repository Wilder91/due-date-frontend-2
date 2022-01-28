const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const PROJECTS_URL = `${BASE_URL}/projects`


const addProjectForm = document.querySelector(".project-form-container")
const inputFields = document.querySelector(".input-text")
let projectsContainer = document.querySelector("container.projects-container")

document.addEventListener('DOMContentLoaded', function () {
   
    fetchProjects();
    postProject();
    renderProjects();
});

function postProject(project_data) {
    fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": project_data.name.value,
          "kind": project_data.image.value,
          "date": project_data.image.value,
  
        })
      })
      .then(res => res.json())
      .then((obj_project) => {
        renderprojects(obj_project)
      })
  }

function displayText() {
    projectsContainer.innerHTML = "Hello"
}