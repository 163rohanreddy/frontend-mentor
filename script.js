const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const errorMessageElement = document.getElementById("error-message-id");
const successMessageContainerElement = document.getElementById("success-message-container-id");
const signUpContainerElement = document.getElementById("sign-up-container-id");
const emailInputElement = document.getElementById("email-input-id");
const subscribedEmailValueElement = document.getElementById("subscribed-email-value-id");

function init() {
    errorMessageElement.style.display = "none";
    successMessageContainerElement.style.display = "none";
}

function onEmailInput(oEvent) {
    console.log(oEvent);
    const sEmailEntered = oEvent.target.value;
    if (emailRegex.test(sEmailEntered)) {
        oEvent.target.classList.remove("error-input");
        errorMessageElement.style.display = "none";
    } else {
        oEvent.target.classList.add("error-input");
        errorMessageElement.style.display = "block";
    }
}

function onSubscribeClick(oEvent) {
    oEvent.preventDefault();
    const sEmailValue = document.getElementById("email-input-id").value;
    if (emailRegex.test(sEmailValue)) {
        emailInputElement.classList.remove("error-input");
        errorMessageElement.style.display = "none";
        successMessageContainerElement.style.display = "flex";
        signUpContainerElement.style.display = "none";
        subscribedEmailValueElement.innerText = sEmailValue;
    } else {
        emailInputElement.classList.add("error-input");
        errorMessageElement.style.display = "block";
    }
}

function onDismissButtonClick() {
    successMessageContainerElement.style.display = "none";
    signUpContainerElement.style.display = "flex";
    emailInputElement.value = "";
}

init();