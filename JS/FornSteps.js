let progressBar = document.getElementById("progressBar");
const lastActiveStep = parseInt(localStorage.getItem("activeStep")) || 1;
let currentStep = lastActiveStep;
// let currentStep = 10;
let totalStep = 10;

const allOptions = document.querySelectorAll(".questionOption");

allOptions.forEach((option) => {
  option.addEventListener("mouseenter", () => {
    option.classList.add("active");
  });
  console.log("hello");
  option.addEventListener("mouseleave", () => {
    option.classList.remove("active");
  });
});

let steps = {};

// Loop through and store each step element, and hide the ones not active
for (let i = 1; i <= totalStep; i++) {
  let element = document.getElementById(`step-${i}`);

  if (!element) continue; // in case some steps are missing in HTML

  // Show only the current step
  element.style.display = i === currentStep ? "flex" : "none";
  if (i === currentStep && currentStep === 3) {
    let title = element.querySelector("h2");
    let previousAns = localStorage.getItem("step2");
    switch (previousAns) {
      case "A":
        title.innerText = `"Hey there, City Strider, what's your name?"`;
        break;
      case "B":
        title.innerText = `"Hey there, City Dweller, what's your name?"`;
        break;
      case "C":
        title.innerText = `"Hey there, Cozy Commuter, what's your name?"`;
        break;
      case "D":
        title.innerText = `"Hey there, Rustic Voyager, what's your name?"`;
        break;
      default:
        title.innerText = `"Hey there, New Parent, what's your name?" `;
        break;
    }
  }
  if (i === currentStep && currentStep === 4) {
    let title = element.querySelector("h2");
    let previousAns = localStorage.getItem("step3")
      ? JSON.parse(localStorage.getItem("step3"))
      : "";
    title.innerText = `"Thanks, ${previousAns.firstName}, what do you consider most when making a purchase?"`;
  }
  if (i === currentStep && currentStep === 5) {
    let title = element.querySelector("h2");
    let previousAns = localStorage.getItem("step4");
    switch (previousAns) {
      case "A":
        title.innerText = `You can always get the trendiest fashions at WCK, and the be first to find out about new products launches from top brands when you sign up for our emails`;
        break;
      case "B":
        title.innerText = `You can SAVE every day with our Lowest price Guarantee, and never miss a deal when you sign up for emails!`;
        break;
      default:
        title.innerText = `"Learn about everything you need for baby when you sign up for our emails!"`;
        break;
    }
  }

  steps[`step_${i}`] = element;
}

const radioA = document.getElementById("a");
const radioB = document.getElementById("b");
const radioC = document.getElementById("c");
const radioD = document.getElementById("d");
const extraInputDiv = document.getElementById("bExtraInput");
const extra2InputDiv = document.getElementById("extra2InputDiv");

// Listen for changes
radioB.addEventListener("change", function () {
  if (radioB.checked) {
    let element = document.getElementById(`step-${currentStep}`);
    const option = element.querySelector("#optionB");
    option.style.backgroundColor = "#e9e9e9";
    option.style.height = "auto";
    extraInputDiv.style.display = "block";
  }
});

radioA.addEventListener("change", function () {
  if (radioA.checked) {
    let element = document.getElementById(`step-${currentStep}`);
    const option = element.querySelector("#optionB");
    option.style.backgroundColor = "white";
    option.style.height = "104px";
    extraInputDiv.style.display = "none";
  }
});

radioD.addEventListener("change", function () {
  if (radioD.checked) {
    let element = document.getElementById(`step-${currentStep}`);
    const option = element.querySelector("#optionB");
    option.style.backgroundColor = "#e9e9e9";
    option.style.height = "auto";
    extra2InputDiv.style.display = "block";
  }
});

radioC.addEventListener("change", function () {
  if (radioC.checked) {
    let element = document.getElementById(`step-${currentStep}`);
    const option = element.querySelector("#optionB");
    option.style.backgroundColor = "white";
    option.style.height = "104px";
    extra2InputDiv.style.display = "none";
  }
});

// Update the progress bar width
progressBar.style.width = `${(currentStep * 100) / totalStep}%`;

// Function to change the step
function changeStep(stepNumber) {
  if (stepNumber < 1 || stepNumber > totalStep) return;

  // Hide current step
  if (steps[`step_${currentStep}`]) {
    steps[`step_${currentStep}`].style.display = "none";
  }

  // Show new step
  if (steps[`step_${stepNumber}`]) {
    steps[`step_${stepNumber}`].style.display = "flex";
  }

  // Update currentStep and progress
  currentStep = stepNumber;
  localStorage.setItem("activeStep", stepNumber);
  progressBar.style.width = `${(currentStep * 100) / totalStep}%`;
}

function step1Ans(ans) {
  localStorage.setItem("step1", ans);
  changeStep(2);
}

function step2Ans(ans) {
  localStorage.setItem("step2", ans);
  changeStep(3);
}

function step3Ans() {
  let userDetail = {
    firstName: "",
    lastName: "",
  };
  const currentEliment = steps["step_3"];

  const inputFields = currentEliment.querySelectorAll("input");
  const firstName = inputFields[0].value.trim();
  const lastName = inputFields[1].value.trim();

  if (!firstName || !lastName) {
    alert("Please fill out both First Name and Last Name");
    return;
  }
  userDetail.firstName = firstName;
  userDetail.lastName = lastName;

  localStorage.setItem("step3", JSON.stringify(userDetail));
  changeStep(4);
}

function step4Ans(ans) {
  localStorage.setItem("step4", ans);
  changeStep(5);
}

function step5Ans(ans) {
  const currentEliment = steps["step_5"];

  if (!ans) {
    const inputFields = currentEliment.querySelector("input");
    const email = inputFields.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      alert("Please fill out your Email");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Oops! That doesn't look like a valid email");
      return;
    }

    localStorage.setItem("step5", email);
  } else {
    localStorage.setItem("step5", "skip");
  }

  changeStep(6);
}

function step6Ans(ans) {
  localStorage.setItem("step4", ans);
  changeStep(7);
}

function step7Ans() {
  if (radioA.checked || radioB.checked) {
    if (radioA.checked) {
      localStorage.setItem("step7", "A");
      changeStep(8);
    } else {
      localStorage.setItem("step7", "B");
      changeStep(8);
      // let userDetail = {
      //   firstName: "",
      //   lastName: "",
      // };

      // const currentEliment = steps["step_5"];
      // const inputFields = currentEliment.querySelectorAll('input[type="text"]');
      // const firstName = inputFields[0].value.trim();
      // const lastName = inputFields[1].value.trim();

      // if (!firstName || !lastName) {
      //   alert("Please fill out both First Name and Last Name");
      //   return;
      // }
      // userDetail.firstName = firstName;
      // userDetail.lastName = lastName;

      // localStorage.setItem("step7Detail", JSON.stringify(userDetail));
    }
    changeStep(8);
  } else {
    alert("please select one option!");
    return;
  }
}

function step8Ans(ans) {
  localStorage.setItem("step2", ans);
  changeStep(9);
}

function step9Ans(ans) {
  const currentEliment = steps["step_9"];

  if (!ans) {
    const inputField = currentEliment.querySelector("input[type='date']");
    const selectedDate = inputField.value.trim();

    if (!selectedDate) {
      alert("Please select a date 💫");
      return;
    }

    // Save to localStorage
    localStorage.setItem("step9", selectedDate);
  } else {
    localStorage.setItem("step9", "skip");
  }

  changeStep(10);
}
