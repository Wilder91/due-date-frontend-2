
const projectForm = document.querySelector(".project-form")
const PROJECTS_URL = `${HOME_URL}/projects`
const projectFields = document.querySelectorAll(".project-text")
const userMilestones = document.querySelector(".milestones-button")
const projectCard = document.querySelector(".project-card")

projectForm.style.display ="none";

class Project {
    all = []
    constructor(name, kind, due_date, user_id) {
        this.name = name;
        this.kind = kind;
        this.due_date = due_date;
        this.user_id = user_id;
    }
    
    render() {
      console.log("Hello " + this.project_name)
    }

    get_outta_here() {
      return `${this.project_name} bettere get outtta here`
    }

    display_card() {
      
      
    }
  
};

function fetchProjects() {
    fetch(`${USERS_URL}/${localStorage.user_id}/projects`)
    .then(response => response.json())
    .then(projects => displayProjects(projects));
  }

  function displayProjects(projects){
    console.log("hello!")
    projectForm.reset();
    localStorage.removeItem('project_id');
    milestoneForm.style.display="none"
    projectForm.style.display = "block"
    userMilestones.style.display="block"
    mainContainer.innerHTML=" "
         
       projects.forEach(project => {
         card = document.createElement("project-card")
       card.innerHTML += 
       `
       <div class="project-card" id="${project.name}-card">
       <div class="innertext">
        <p>Click to View Project's Milestones</p> 
        <button onclick="fetchMilestones(${project.id})"> ${project.name} </button> 
        <br></br>
        <h2>${project.kind}</h2>
        <h3>${project.due_date}</h3>
        <button onclick="deleteProject(${project.id})"> Delete</button>
        
        <br></br>
        
        </div>
        `
        mainContainer.appendChild(card)
    })
  }

  function deleteProject(projectId){
    fetch(PROJECTS_URL + "/" + projectId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
        })
    }).then((response) => {
      console.log(response)
      fetchProjects();
    })
  }

  projectForm.addEventListener('submit', function(e){
      e.preventDefault();
    project = new Project(projectFields[0].value, projectFields[1].value, projectFields[2].value, localStorage.user_id)
    addProject(project);
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
    fetchProjects();
  })
}
