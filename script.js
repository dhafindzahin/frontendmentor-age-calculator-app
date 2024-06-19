const yearField = document.getElementById("year-field");
const monthField = document.getElementById("month-field");
const dayField = document.getElementById("day-field");
const yearInput = yearField.querySelector("input");
const monthInput = monthField.querySelector("input");
const dayInput = dayField.querySelector("input");
const yearSpan = yearField.querySelector("span");
const monthSpan = monthField.querySelector("span");
const daySpan = dayField.querySelector("span");
const yearResult = document.getElementById("year-result");
const monthResult = document.getElementById("month-result");
const dayResult = document.getElementById("day-result");
const btnCalculate = document.getElementById("btn-calculate");

yearInput.max = Number(new Date().getFullYear());

function setLastDay() {
	dayInput.max = new Date(yearInput.value, monthInput.value, 0).getDate();
}

yearInput.addEventListener("blur", setLastDay);
monthInput.addEventListener("blur", setLastDay);

btnCalculate.addEventListener("click", () => {
	if (!yearInput.checkValidity()) {
		yearField.classList.add("invalid");
		if (yearInput.validity.rangeOverflow) {
			yearSpan.innerText = "Must be in the past";
		}
		if (yearInput.validity.valueMissing) {
			yearSpan.innerText = "This field is required";
		}
	} else {
		yearField.classList.remove("invalid");
	}

	if (!monthInput.checkValidity()) {
		monthField.classList.add("invalid");
		if (monthInput.validity.rangeOverflow || monthInput.validity.rangeUnderflow) {
			monthSpan.innerText = "Must be a valid month";
		}
		if (monthInput.validity.valueMissing) {
			monthSpan.innerText = "This field is required";
		}
	} else {
		monthField.classList.remove("invalid");
	}

	if (!dayInput.checkValidity()) {
		dayField.classList.add("invalid");
		if (dayInput.validity.rangeOverflow || dayInput.validity.rangeUnderflow) {
			daySpan.innerText = "Must be a valid day";
			yearField.classList.add("invalid");
			monthField.classList.add("invalid");
		}
		if (dayInput.validity.valueMissing) {
			daySpan.innerText = "This field is required";
		}
	} else {
		dayField.classList.remove("invalid");
	}
});
