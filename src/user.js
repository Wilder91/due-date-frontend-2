class User {

    static all = []
    static usersContainer = document.getElementById("user-container")
    constructor({id, name, email, password}){
        this.id = id; 
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static renderForm(){
        User.userForm.innerHTML += User.newMethod()
    }

    static newMethod() {
        return `
        <form id="user-form">
            Name: <input type ="text" id="name">
            <br></br>
            Days Before Due Date: <input type="number" id="days_until">
            <br></br>
            Description: <input type="text id="description">
            <br></br>
            <input type="submit" id="Add user">


        </form>
        `;
    }
}