const MILESTONES_URL= `${HOME_URL}/milestones`

const milestoneFields = document.querySelectorAll(".milestone-text")
const milestoneForm = document.querySelector(".milestone-form")
const projectsButton = document.querySelector(".projects-button")


class Milestone {
  static all = []
  static projectCard = document.querySelectorAll(".project-card")
    constructor(milestone){
        this.id = milestone.id
        this.milestone_name = milestone.milestone_name;
        this.description = milestone.description; 
        this.due_date = milestone.due_date;
        this.project_id = milestone.project_id;
        Milestone.all.push(this)
    }

    static display_card(milestone) {
     
      console.log("once")
      let card = document.createElement("project-card")
      console.log(milestone)
      
      card.innerHTML += 
      `
      <div class="project-card" id="${milestone.id}">
      <div class="innertext">
      <p>Click to View milestone's Milestones</p> 
      <h1> ${milestone.milestone_name} <h1> 
      <br></br>
      <h2> ${milestone.description} </h2>
      <h3> ${milestone.due_date}</h3>
      <button onclick="deleteMilestone(${milestone.id})"> Delete</button>
      <br></br>
      </div>
      `
      mainContainer.appendChild(card)
        
    }

}

function showMilestones(id){
  localStorage.project_id = id
  

  if (Milestone.all.length === 0) {
    
    fetchMilestones(id)
  } else { 
    
    displayMilestones(Milestone.all)
  }
}

function fetchMilestones(){
  fetch(`${USERS_URL}/${localStorage.user_id}/milestones`)
    .then(response => response.json())
    .then(milestones => createMilestones(milestones))
  }


function createMilestones(milestones) {
  Milestone.all = []
  sort = milestones.sort((a, b) => (a.id > b.id) ? 1 : -1)
  projectForm.style.display="none";
  milestoneForm.style.display ="block";
  milestoneForm.reset();
  mainContainer.innerHTML = " "  
    milestones.forEach(milestone => {
      m = new Milestone(milestone)
    displayMilestones(milestones);
    })
  }


milestoneForm.addEventListener('submit',  (e) => {
    
    e.preventDefault();
    fetch(PROJECTS_URL + "/" + localStorage.project_id + "/milestones", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
        },
        body: JSON.stringify({
          milestone_name: milestoneFields[0].value,
          description: milestoneFields[1].value,
          due_date: milestoneFields[2].value,
          project_id: localStorage.project_id
        })
      }).then((response) => {
        console.log(response)
        fetchMilestones()
      })
      
  })

  function deleteMilestone(id){ 
    milestone_id = id
    fetch(PROJECTS_URL + "/" + localStorage.project_id + "/milestones/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
        })
        
    }).then((response) => {
      console.log(response)
      fetchMilestones(milestone_id);
    })
    
  }

  function displayMilestones(){
  
     projectForm.style.display="none";
      milestoneForm.style.display ="block";
      milestoneForm.reset();
      mainContainer.innerHTML = " "  
      
      sorted = Milestone.all.filter(m => m.project_id == localStorage.project_id)
      sorted.forEach(milestone => {
        Milestone.display_card(milestone);
      })
  }


 
  
