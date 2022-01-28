const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const PROJECTS_URL = `${BASE_URL}/projects`


const addProjectForm = document.querySelector(".project-form")
const inputFields = document.querySelectorAll(".input-text")
const mainContainer = document.querySelector("main")



document.addEventListener('DOMContentLoaded', function () {
    fetchProjects();
    
});
function fetchProjects() {
  return fetch(PROJECTS_URL)
  .then(response => response.json())
  .then(projects => renderProjects(projects));

  
}
function renderProjects(projects){
  mainContainer.innerHTML = ""
  
  projects.forEach(project => {
     mainContainer.innerHTML += `<div class="card">
      
      <h1> ${project.name} </h1>
      <h2>${project.kind}</h2>
      <h3>${project.due_date}</h3>
    </div>`
    
  })
}

addProjectForm.addEventListener('submit', function(e){
  
  e.preventDefault()
    fetch(PROJECTS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: inputFields[0].value,
          kind: inputFields[1].value,
          date: inputFields[2].value,
        })
      })
     renderProjects()
  })

