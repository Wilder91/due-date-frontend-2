const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const PROJECTS_URL = `${BASE_URL}/projects`
const MILESTONES_URL= `${BASE_URL}/milestones`

const addProjectForm = document.querySelector(".project-form")
const inputFields = document.querySelectorAll(".input-text")
const mainContainer = document.querySelector("main")


fetchProjects()

function hideProjectForm(){
  addProjectForm.style.display= 'none'
}

function fetchProjects() {
  fetch(PROJECTS_URL)
  .then(response => response.json())
  .then(projects => renderProjects(projects));
}

function fetchMilestones(){
  fetch(MILESTONES_URL)
  .then(response => response.json())
  .then(milestones => displayMilestones(milestones))
}
function renderProjects(projects){
  mainContainer.innerHTML = ""
  
  projects.forEach(project => {
     mainContainer.innerHTML += 
     
     `<div class="card"> 
      <button onclick="fetchMilestones(${project.id})"> ${project.name} </button> 
      <h2>${project.kind}</h2>
      <h3>${project.due_date}</h3>
      <btn>
      </div>
      `
    
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
    fetchProjects()
  })

  function deleteProject(event){
    let project = 
    fetch(CART_PLANTS_URL + "/" + cartPlant, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            id: cartPlant,
        }),
    })
    .then(res => res.json())
    .then(res => {
        loggedIn = res
        renderLoggedInUser()
    })
}

function mileStoneForm(){

}

function displayMilestones(milestones){
  {
    hideProjectForm()
    mileStoneForm()
    mainContainer.innerHTML = " "
    
    milestones.forEach(milestone => {
       mainContainer.innerHTML += `<div class="card">
        
        <h1> ${milestone.name} </h1>
        <h2>${milestone.description}</h2>
        <h3>${milestone.lead_time}</h3>
        <btn>
      </div>`
      
    })
  }
}

