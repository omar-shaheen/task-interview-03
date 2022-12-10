let userInput = document.querySelector("#username");
let emailInput = document.querySelector("#email");
let passInput = document.querySelector("#password");
let confirmPassInput = document.querySelector("#confirmPass");

function userValidate() {
  let rgxUser = /^(?=.*^[a-z])(?=.*\d)(?=.*[a-z]$).{5,15}$/g;
  let userTest = rgxUser.test(userInput.value);

  if (!userTest) {
    document.querySelector(".err_user").innerHTML = "Username Not Valid";
  } else {
    document.querySelector(".err_user").innerHTML = "";
  }
}
userInput.addEventListener("input", userValidate);

function validateEmail() {
  let rgxEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let emailTest = rgxEmail.test(emailInput.value);

  if (!emailTest) {
    document.querySelector(".err_email").innerHTML = "Email Not Valid";
  } else {
    document.querySelector(".err_email").innerHTML = "";
  }
}
emailInput.addEventListener("input", validateEmail);

function validatePass() {
  let rgxPass = /^(?=.*[a-z])([a-z]){8,}$/;
  let passTest = rgxPass.test(passInput.value);
  if (!passTest) {
    document.querySelector(".err_pass").innerHTML =
      "password must be at least 8 characters";
  } else {
    document.querySelector(".err_pass").innerHTML = "";
  }
}
passInput.addEventListener("input", validatePass);

function confirmPass() {
  if (confirmPassInput.value !== passInput.value) {
    document.querySelector(".err_confpass").innerHTML =
      "password not confirmed";
  } else {
    document.querySelector(".err_confpass").innerHTML = "";
  }
}
confirmPassInput.addEventListener("input", confirmPass);

let submitform = document.getElementById("submitform");
submitform.addEventListener("submit", formSubmit);
function formSubmit(e) {
  e.preventDefault();

  const formData = new FormData(submitform);
  console.log([...formData]);
  fetch(`https://goldblv.com/api/hiring/tasks/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}
