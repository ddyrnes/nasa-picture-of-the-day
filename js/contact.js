import { inputValidate, emailValidate } from "./modules/validate.js";
const form = document.querySelector("#form");

function validate(event) {
  const name = event.target.name;
  const subject = event.target.subject;
  const email = event.target.email;
  const address = event.target.address;
  const nameError = document.querySelector("#name-error");
  const subjectError = document.querySelector("#subject-error");
  const emailError = document.querySelector("#email-error");
  const addressError = document.querySelector("#address-error");
  const success = document.querySelector(".form-success");

  success.innerHTML = "";
  event.preventDefault();

  if (inputValidate(name.value, 1)) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }
  if (inputValidate(subject.value, 10)) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }
  if (emailValidate(email.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
  if (inputValidate(address.value, 25)) {
    addressError.style.display = "none";
  } else {
    addressError.style.display = "block";
  }
  if (
    inputValidate(name.value, 0) &&
    inputValidate(subject.value, 10) &&
    emailValidate(email.value) &&
    inputValidate(address.value, 25)
  ) {
    success.innerHTML = `
    <div class="success-box">
    <div>Thank you!</div>
    <div>Your submission has been sent.</div>
    </div>`;
  }
}
form.addEventListener("submit", validate);
