const burgerButton = document.querySelector(".burger-button");
const crossButton = document.querySelector(".cross-button");
const headerHeadline = document.querySelector(".header__headline");
const formElement = document.querySelector(".form");
const inputElements = formElement.querySelectorAll(
  ".form__input, .form__input-checkbox"
);
const headerOffsetTop = headerHeadline.offsetTop;

burgerButton.addEventListener("click", () => {
  document.firstElementChild.classList.add("is-lock");
});

crossButton.addEventListener("click", () => {
  document.firstElementChild.classList.remove("is-lock");
});

window.addEventListener("scroll", () => {
  if (window.scrollY > headerOffsetTop) {
    headerHeadline.style.position = "fixed";
    headerHeadline.style.top = "0";
    headerHeadline.style.left = "0";
    headerHeadline.style.width = "100%";
    headerHeadline.classList.add("scrolled");
  } else {
    headerHeadline.style.position = "static";
    headerHeadline.classList.remove("scrolled");
  }
});

const showErrorMessage = (element, message) => {
  const errorMessage = element.nextElementSibling;
  if (!errorMessage || !errorMessage.classList.contains("error-message")) {
    const errorSpan = document.createElement("span");
    errorSpan.textContent = message;
    errorSpan.classList.add("error-message");
    element.parentNode.insertBefore(errorSpan, element.nextSibling);
  }
};

const removeErrorMessage = (element) => {
  const errorMessage = element.nextElementSibling;
  if (errorMessage && errorMessage.classList.contains("error-message")) {
    errorMessage.remove();
  }
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateField = (element) => {
  let isValid = true;

  if (element.type === "text" || element.type === "email") {
    if (element.value.trim() === "") {
      showErrorMessage(element, "Field is required *");
      isValid = false;
    } else {
      removeErrorMessage(element);
    }
  } else if (element.type === "checkbox") {
    if (!element.checked) {
      showErrorMessage(element, "*");
      isValid = false;
    } else {
      removeErrorMessage(element);
    }
  }

  if (isValid) {
    element.classList.remove("invalid");
  } else {
    element.classList.add("invalid");
  }

  return isValid;
};

inputElements.forEach((inputElement) => {
  if (inputElement.type === "text" || inputElement.type === "email") {
    inputElement.addEventListener("input", () => validateField(inputElement));
  } else if (inputElement.type === "checkbox") {
    inputElement.addEventListener("change", () => validateField(inputElement));
  }

  validateField(inputElement);
});
