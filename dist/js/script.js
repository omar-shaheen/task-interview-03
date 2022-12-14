// Get variables
let userInput = document.querySelector("#username");
let emailInput = document.querySelector("#email");
let passInput = document.querySelector("#password");
let password_confirmation = document.querySelector("#confirmPass");

// function to vaildate username
function userValidate() {
  // Regex validation for username
  let rgxUser = /^(?=.*^[a-z])(?=.*\d)(?=.*[a-z]$).{5,15}$/g;
  let userTest = rgxUser.test(userInput.value);

  if (!userTest) {
    document.querySelector(".err_user").innerHTML = "Username Not Valid";
  } else {
    document.querySelector(".err_user").innerHTML = "";
  }
}
if (userInput) {
  userInput.addEventListener("input", userValidate);
}

// function to vaildate email
function validateEmail() {
  // Regex validation for email
  let rgxEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let emailTest = rgxEmail.test(emailInput.value);

  if (!emailTest) {
    document.querySelector(".err_email").innerHTML = "Email Not Valid";
  } else {
    document.querySelector(".err_email").innerHTML = "";
  }
}
if (emailInput) {
  emailInput.addEventListener("input", validateEmail);
}

// function to vaildate password
function validatePass() {
  // Regex validation for password
  let rgxPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  let passTest = rgxPass.test(passInput.value);
  if (!passTest) {
    document.querySelector(".err_pass").innerHTML =
      "at least 1 uppercase, 1 lowercase, 1 number, 1 symbol and minimum 8 characters.";
  } else {
    document.querySelector(".err_pass").innerHTML = "";
  }
}
if (emailInput) {
  passInput.addEventListener("input", validatePass);
}

// function to vaildate password confirmation
function confirmPass() {
  if (password_confirmation.value !== passInput.value) {
    document.querySelector(".err_confpass").innerHTML =
      "password not confirmed";
  } else {
    document.querySelector(".err_confpass").innerHTML = "";
  }
}
if (password_confirmation) {
  password_confirmation.addEventListener("input", confirmPass);
}

let submitform = document.getElementById("submitform");

// function to submit form
function formSubmit(e) {
  e.preventDefault();

  const formData = new FormData(submitform);
  // console.log([...formData]);

  // fetch by using method POST
  fetch(`https://goldblv.com/api/hiring/tasks/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  })
    .then((response) => {
      response.json();
      console.log(response);
      if (response.status == 201) {
        localStorage.setItem("email", emailInput.value);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registered Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(function () {
          location = "/success.html";
        }, 2500);
      }
    })
    .catch((err) => console.log(err));
}
if (submitform) {
  submitform.addEventListener("submit", formSubmit);
}

// print email after registration
let userEmail = document.getElementById("userEmail");
if (userEmail) {
  userEmail.innerHTML = localStorage.getItem("email");
}
