//Variables for task to loop at the home page

var typed = new Typed (".input",{
    strings:['Create task','Track task progress', 'Prioritize tasks','Collaborate effectively'],
    typSpeed:200,
    backSpeed:200,
    loop:true
})
    
// const wrapper = document.querySelector('.wrapper');
// const loginLink = document.querySelector('.login-link');
// const registerLink = document.querySelector('.register-link');
// const btnPopup = document.querySelector('.register-link');


// registerLink.addEventListener('click', () =>{
//     wrapper.classList.add('active');
// });

// loginLink.addEventListener('click', () => {
//     wrapper.classListlist.remove('active')
// })

// btnPopup.addEventListener('cick', ()=>{
//     wrapper.classList.add('active-popup')
// })

// Variables
const loginForm = document.getElementById("loginForm");
const registrationForm = document.getElementById("registrationForm");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");

// Functions
function showLoginForm() {
  loginForm.style.display = "block";
  registrationForm.style.display = "none";
}

function showRegistrationForm() {
  loginForm.style.display = "none";
  registrationForm.style.display = "block";
}

// Events
loginLink.addEventListener("click", showLoginForm);
registerLink.addEventListener("click", showRegistrationForm);

// Initialize
showLoginForm();