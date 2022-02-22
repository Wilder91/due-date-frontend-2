const MILESTONES_URL= `${HOME_URL}/milestones`

const milestoneFields = document.querySelectorAll(".milestone-text")
const milestoneForm = document.querySelector(".milestone-form")


class Milestone {
    constructor(name, description, due_date, project_id ){
        this.name = name;
        this.description = description; 
        this.due_date = due_date;
        this.project_id = project_id;
    }
}




function fetchMilestones(id){
  fetch(`${HOME_URL}/projects/${id}/milestones`)
  .then(response => response.json())
  .then(milestones => displayMilestones(milestones));
  localStorage.project_id = id
}

function fetchUserMilestones(id){
  fetch(`${HOME_URL}/users/${id}/milestones`)
  .then(response => response.json())
  .then(milestones => displayUserMilestones(milestones));
}

milestoneForm.addEventListener('submit', function(e){
    e.preventDefault();
    m = new Milestone(milestoneFields[0].value, milestoneFields[1].value, milestoneFields[2].value, localStorage.project_id)
    fetch(HOME_URL + "/milestones", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
        },
        body: JSON.stringify(m)
      }).then((response) => {
        fetchMilestones(localStorage.project_id);
      })
      
  })

 
    
    

    function handleErrors(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
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
        
    }).then((response) => {
      fetchMilestones(localStorage.project_id);
    })
    
  }

  function displayMilestones(milestones){
    { projectForm.style.display="none";
      milestoneForm.reset();
      milestoneForm.style.display ="block";
      mainContainer.innerHTML = " "  
      milestones.forEach(milestone => {  
       {
         mainContainer.innerHTML += 
         
         `<div class="project-card">
          <h1> ${milestone.name} </h1>
          <h2>${milestone.description}</h2>
          <h3>${milestone.due_date}</h3>
          <button onclick="deleteMilestone(${milestone.id})">Delete</button>
          <btn>
          </div>`
        }
      })
     
    }
    milestoneForm.style.display ="block";
  }

  function displayUserMilestones(milestones) {
    { projectForm.style.display="none";
      milestoneForm.style.display="none";
     
     console.log(milestones)
      mainContainer.innerHTML = " "
      milestones.forEach(milestone => {  
     
       mainContainer.innerHTML += 
       
       `<div class="project-card">
        <h1> ${milestone.name} </h1>
        <h2>${milestone.description}</h2>
        <h3>${milestone.due_date}</h3>
        <button onclick="fetchProjects(id)">Return to Projects</button>
        <btn>
        </div>`
      
    })
   
  }
 
}
