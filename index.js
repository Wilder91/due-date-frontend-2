const HOME_URL = "http://localhost:3000"
const USERS_URL = `${HOME_URL}/users`

const signUpForm = document.querySelector(".signup-form")
const signUpFields = document.querySelectorAll(".signup-text")

const inputFields = document.querySelectorAll(".project-text")
const mainContainer = document.querySelector("main")

const returnButton = document.querySelector(".return-button")
const logOutButton = document.querySelector(".logOut-button")






checkForUser();


function checkForUser() {
  if (localStorage.email) { 
    signUpForm.style.display = "none"
    fetchUsers();
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
  logOutButton.style.display="none";
}



function fetchUsers() {
  fetch(USERS_URL)
  .then(response => response.json())
  .then(users => displayUser(users));
}




function projectFormDisappear() {
  projectForm.style.display = 'none'
}

function projectFormAppear() {
  projectForm.style.display = 'block'
}














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
      fetchUsers();
})

function editProject(id) {


}








function displayUser(users) {
  users.forEach(user=> {
    signUpForm.style.display = "none"
    if (localStorage.email == user.email) {  
      localStorage.user_id = user.id
      fetchProjects()
    }
  })
}
