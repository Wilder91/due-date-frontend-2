const projectForm = document.querySelector(".project-form")
const PROJECTS_URL = `${HOME_URL}/projects`
projectForm.style.display ="none";

class Project {
    
    constructor(name, kind, due_date) {
        this.name = name;
        this.kind = kind; 
        this.due_date = due_date;

        this.element = document.querySelector('main')
    }
    
}

function fetchProjects() {
    fetch(`${USERS_URL}/${localStorage.user_id}/projects`)
    .then(response => response.json())
    .then(projects => displayProjects(projects));
  }

  function displayProjects(projects){
    milestoneForm.style.display="none"
    projectForm.style.display = "block"
    logOutButton.style.display="block"
    
    mainContainer.innerHTML=" "
       
       p = projects.sort((a, b) => Date.parse(a.due_date) - Date.parse(b.due_date)); 
       p.forEach(project => {
       mainContainer.innerHTML += 
  
       `<div class="project-card">
       <div class="innertext">
        <p>Click to View Project's Milestones</p> 
        <button onclick="fetchMilestones(${project.id})"> ${project.name} </button> 
        <br></br>
        <h2>${project.kind}</h2>
        <h3>${project.due_date}</h3>
        <button onclick="editProject(${project.id})">Edit<button onclick="deleteProject(${project.id})"> Delete</button>
        
        <br></br>
        
        </div>
        `
     
  
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
    })
    fetchProjects();
  }

  projectForm.addEventListener('submit', function(e){
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
    fetchProjects(localStorage.user_id);    
})
