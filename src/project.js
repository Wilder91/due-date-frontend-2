
const projectForm = document.querySelector(".project-form")
const PROJECTS_URL = `${HOME_URL}/projects`
const projectFields = document.querySelectorAll(".project-text")
const userMilestones = document.querySelector(".milestones-button")
const projectCard = document.querySelectorAll(".project-card")

projectForm.style.display ="none";

class Project {
  static projectCard = document.querySelector(".project-card")
    
    static all = []
    constructor(project) {
        this.id = project.id
        this.project_name = project.project_name;
        this.kind = project.kind;
        this.due_date = project.due_date;
        this.user_id = project.user_id;
        this.milestones = project.milestones;
        Project.all.push(this)
    }

    static display_card(project) {
      let card = document.createElement("project-card")
      
      card.innerHTML += 
      `
      <div class="project-card" id="${project.id}-card">
      <div class="innertext">
      <p>Click to View Project's Milestones</p> 
      <button onclick="showMilestones(${project.id})"> ${project.project_name} </button> 
      <br></br>
      <h2>${project.kind}</h2>
      <h3>${project.due_date}</h3>
      
      <button onclick="deleteProject(${project.id})"> Delete</button>
      <br></br>
      </div>
      `
      mainContainer.appendChild(card)
      
    }
  
};

function fetchProjects() {
    fetch(`${USERS_URL}/${localStorage.user_id}/projects`)
    .then(response => response.json())
    .then(projects => createProjects(projects))
  }

function fetchProjectsDelete(){
  fetch(`${USERS_URL}/${localStorage.user_id}/projects`)
    .then(response => response.json())
    .then(projects => displayProjects(projects))

}

  function user_page_style() {
    milestoneForm.style.display="none"
    projectForm.style.display = "block"
    
  }

  function createProjects(projects) {
    projectForm.reset();
    localStorage.removeItem('project_id');
    user_page_style();
    
    if (Project.all.length === 0){  
    projects.forEach(project => {
      p = new Project(project)
      Project.display_card(p);
    })}
    else { 
    p = new Project(projects[projects.length - 1])
    Project.display_card(p) }
  }

  function displayProjects(projects){
    projectForm.reset();
    localStorage.removeItem('project_id');
    user_page_style();
    
    mainContainer.innerHTML=" "
    projects = Project.all 
    projects.forEach(project => {
      Project.display_card(project);
 })
    

       
  }

  function deleteProject(projectId){
    let proj = Project.all.filter(x => {
      return x.id == projectId;
    })
    Project.all.pop(proj)
    
    fetch(PROJECTS_URL + "/" + projectId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
        })
    })
    .then((response) => {
      console.log(response)
      fetchProjectsDelete();
    })
  }

  projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    fetch(PROJECTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      
      body: JSON.stringify({
        project_name: projectFields[0].value,
        kind: projectFields[1].value,
        due_date: projectFields[2].value,
        user_id: localStorage.user_id
      })
    }).then((response) => {
      console.log(response)
      fetchProjects();
    })
    
})


function addProject(project) {
  
  fetch(PROJECTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    
    body: JSON.stringify(project)
  }).then((response) => {
    console.log(response)
    
   
  })
}


function editProject(project){
  fetch(PROJECTS_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(project)
  }).then((response) => {
    console.log(response)
    fetchProjects();
  })
}



