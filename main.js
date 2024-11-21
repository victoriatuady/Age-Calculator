const labels = document.querySelectorAll(".label");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const button = document.getElementById("button");
const resultDiv = document.querySelectorAll(".age div");
const results = document.querySelectorAll("#result");
const inputs = document.querySelectorAll("input");
const errorMessages = document.querySelectorAll(".error-text");

//Function to validate date
function isValidateDate(day, month, year) {
  if (month < 1 || month > 12) {
    return false;
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  if (year > currentYear) {
    return false;
  }

  //Check day range based on month
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) {
    months[1] = 29;
  }

  if (day < 1 || day > months[month - 1]) {
    return false;
  }
  return true;
}
//Function to validate leap year
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

// Function to Calculate age
function calculateAge(day, month, year) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  //Difference in milliseconds
  const milliseconds = today - birthDate;

  //Convert milliseconds to Days
  const totalDays = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

  //Get total years in days( 365.25 for leap years)
  const years = Math.floor(totalDays / 365.25);

  //Remaining days after years
  const daysAfterYears = totalDays % 365.25;

  //Remaining months from days (30.44 for average month length)
  const months = Math.floor(daysAfterYears / 30.44);
  // Remaining days
  const remainingDays = Math.floor(daysAfterYears % 30.44);

  return {
    years,
    months,
    remainingDays,
  };
}

//Validate input and calculate
const errMessages = {
  day: "Must be a valid date",
  month: "Must be a valid month",
  year: "Must be in the past",
};

button.addEventListener("click", () => {
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const inputValue = parseInt(input.value);
    const errorMessage = errorMessages[i];
    const label = labels[i];
    // const result = results[i];

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    //Check for empty fields
    if (!inputValue) {
      label.style.color = "#ff5757";
      input.style.border = "0.4px solid #ff5757";
      errorMessage.textContent = "This field is required";

      setTimeout(() => {
        label.style.color = "#716f6f";
        input.style.border = "0.4px solid #dbdbdb";
        errorMessage.textContent = "";
      }, 2000);
    } else if (!isValidateDate(day, month, year)) {
      //validate date
      label.style.color = "#ff5757";
      input.style.border = "0.4px solid #ff5757";
      errorMessage.textContent = errMessages[input.name];

      setTimeout(() => {
        label.style.color = "#716f6f";
        input.style.border = "0.4px solid #dbdbdb";
        errorMessage.textContent = "";
      }, 2000);
    } else {
      // Calculate age
      const age = calculateAge(day, month, year);
      resultDiv.forEach((div) => {
        div.style.display = "none";
      });
      results[0].innerHTML = age.years;
      results[1].innerHTML = age.months;
      results[2].innerHTML = age.remainingDays;
    }
  }
});
