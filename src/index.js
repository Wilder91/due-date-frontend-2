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
function fetchProjects() {
  return fetch(PROJECTS_URL)
  .then(response => response.json())
  .then(data => renderProjects(data));
}


function postProject(project_data) {
    fetch(PROJECTS_URL, {
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
        renderProjects(obj_project)
      })
  }

  function renderProjects(project) {
    let h2 = document.createElement('h2')
    h2.innerText = project.name

    let h3 = document.createElement('h3')
    h3.innerText = project.kind

  
    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, h3)
    
  }
function displayText() {
    projectsContainer.innerHTML = "Hello"
}