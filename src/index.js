const HOME_URL = "http://localhost:3000"
const USERS_URL = `${HOME_URL}/users`
const PROJECTS_URL = `${HOME_URL}/projects`
const MILESTONES_URL= `${HOME_URL}/milestones`

const signUpForm = document.querySelector(".signup-form")
const signUpFields = document.querySelectorAll(".signup-text")
const projectForm = document.querySelector(".project-form")
const inputFields = document.querySelectorAll(".input-text")
const mainContainer = document.querySelector("main")
const milestoneFields = document.querySelectorAll(".milestone-text")
const milestoneForm = document.querySelector(".milestone-form")
const returnButton = document.querySelector(".return-button")

fetchProjects();


function fetchProjects() {
  fetch(PROJECTS_URL)
  .then(response => response.json())
  .then(projects => displayProjects(projects));
}



function fetchMilestones(id){
  
  fetch(HOME_URL + "/" + "projects" + "/" + id + "/" + "milestones")
  .then(response => response.json())
  .then(milestones => displayMilestones(milestones, id));
  
}

function projectFormDisappear() {
  projectForm.style.display = 'none'
}


function displayProjects(projects){
  milestoneForm.style.display = 'none'
     projects.forEach(project => {
     mainContainer.innerHTML += 
     `<div class="project-card"> 
      <button onclick="fetchMilestones(${project.id})"> ${project.name} </button> 
      <h2>${project.kind}</h2>
      <h3>${project.due_date}</h3>
      <button onclick="deleteProject(${project.id})"> Delete</button>
      <btn>
      <br></br>
      </div>
      `
  
  })
  
}

function deleteProject(projectId){
  console.log(projectId)
  
  fetch(PROJECTS_URL + "/" + projectId, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({
      })
  })
  location.reload()
}
returnButton.addEventListener('click', function(e) {
  e.preventDefault()
  console.log("helo")
  location.reload()
})



projectForm.addEventListener('submit', function(e){
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
  location.reload()    
})

milestoneForm.addEventListener('submit', function(e){
  e.preventDefault()
  let id = localStorage.project_id
    fetch(PROJECTS_URL + "/" + id + "/" + "milestones", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: milestoneFields[0].value,
          description: milestoneFields[1].value,
          lead_time: milestoneFields[2].value,
          project_id : localStorage.project_id
        })
      })  
     location.reload()
})

/*signUpForm.addEventListener('submit', function(e){
  e.preventDefault()
    fetch(USERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: signUpFields[0].value,
          email: signUpFields[1].value,
          password: signUpFields[2].value,
        })
      })
      validateUser();  
})*/




function displayMilestones(milestones, id){
  { console.log(id)
    localStorage.project_id = id
    milestoneForm.style.display ="block";
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
  milestoneForm.style.display ="block";
  projectFormDisappear();
  
}