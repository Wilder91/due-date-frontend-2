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
const logOutButton = document.querySelector(".logOut-button")

milestoneForm.style.display ="none";
projectForm.style.display ="none";



checkForUser();


function checkForUser() {
  if (localStorage.email) { 
    fetchUsers();
    fetchProjects();
  } else {
    displayLogin();
  }
}

function logOut() {
  localStorage.clear();
  location.reload();
}

function displayLogin() {
  localStorage.clear()
  signUpForm.style.display="block";
}

function fetchProjects() {
  fetch(USERS_URL + "/" + localStorage.user_id + "/" + "projects")
  .then(response => response.json())
  .then(projects => displayProjects(projects));
}

function fetchUsers() {
  fetch(USERS_URL)
  .then(response => response.json())
  .then(users => displayUsers(users));
}



function fetchMilestones(id){
  fetch(HOME_URL + "/" + "projects" + "/" + id + "/" + "milestones")
  .then(response => response.json())
  .then(milestones => displayMilestones(milestones, id));

}

function projectFormDisappear() {
  projectForm.style.display = 'none'
}

function projectFormAppear() {
  projectForm.style.display = 'block'
}

function displayProjects(projects){
  signUpForm.style.display = "none"
  milestoneForm.style.display = 'none'
  mainContainer.innerHTML = ""
  projectForm.style.display = "block"
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

function fetchUser(users){
  console.log(projectId)
  
  fetch(USERS_URL + "/" + "id", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      
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



function deleteMilestone(id){
  
  
  fetch(MILESTONES_URL + "/" + id, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({
      })
  })
  fetchMilestones()
}



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
          user: localStorage.email,
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
          project_id : localStorage.project_id, 
          user_email: localStorage.email,
        })
      })  
    fetchMilestones(localStorage.project_id);
})

signUpForm.addEventListener('submit', function(e){
  localStorage.name = signUpFields[0].value
  localStorage.email = signUpFields[1].value
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
        })
      })
      projectFormAppear()
      fetchUsers()
      
})








function displayMilestones(milestones, id){
  { 
    localStorage.project_id = id
    console.log( `the project id is ${id}`)
    milestoneForm.style.display ="block";
    mainContainer.innerHTML = " "  
    milestones.forEach(milestone => {  
       mainContainer.innerHTML += `<div class="project-card">
        
        <h1> ${milestone.name} </h1>
        <h2>${milestone.description}</h2>
        <h3>${milestone.due_date}</h3>
        <button onclick="deleteMilestone(${milestone.id})">Delete</button>
        
        <btn>
      </div>`
    })
   
  }
  milestoneForm.style.display ="block";
  projectFormDisappear();
  
}

function displayUsers(users) {
  users.forEach(user=> {
    if (localStorage.email == user.email) {  
      localStorage.user_id = user.id
      
      fetchProjects(user.id)
    }
    
  })
}