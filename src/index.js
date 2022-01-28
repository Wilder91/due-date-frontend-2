const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const PROJECTS_URL = `${BASE_URL}/projects`
const MILESTONES_URL= `${BASE_URL}/milestones`

const addForm = document.querySelector(".form")
const inputFields = document.querySelectorAll(".input-text")
const mainContainer = document.querySelector("main")

fetchProjects()



function fetchProjects() {
  fetch(PROJECTS_URL)
  .then(response => response.json())
  .then(projects => renderProjects(projects));
}

function checkLogin() {
  
}

function fetchMilestones(){
  fetch(MILESTONES_URL)
  .then(response => response.json())
  .then(milestones => displayMilestones(milestones));
}
function renderProjects(projects){
     projects.forEach(project => {
     mainContainer.innerHTML += 
     `<div class="project-card"> 
      <button onclick="fetchMilestones(${project.id})"> ${project.name} </button> 
      <h2>${project.kind}</h2>
      <h3>${project.due_date}</h3>
      <button linkto="deleteProject()"> Delete</button>
      <btn>
      </div>
      `
    
  })
}

addForm.addEventListener('submit', function(e){
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
    fetchProjects()
})



function mileStoneForm(){
    addForm.innerHTML = " "
    mainContainer.innerHTML += `<div class="project-card">
        <h1> ${milestone.name} </h1>
        <h2>${milestone.description}</h2>
        <h3>${milestone.lead_time}</h3>
        <btn>
      </div>`

}

function displayMilestones(milestones){
  {
    mainContainer.innerHTML = " "  
    milestones.forEach(milestone => {  
       mainContainer.innerHTML += `<div class="project-card">
        
        <h1> ${milestone.name} </h1>
        <h2>${milestone.description}</h2>
        <h3>${milestone.lead_time}</h3>
        <button onclick="location.reload()"> Return to Project List</button>
        <btn>
      </div>`
    })
  }
}

