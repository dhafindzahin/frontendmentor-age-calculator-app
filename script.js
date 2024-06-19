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
function daysInMonth(year, month) {
	return new Date(year, month + 1, 0).getDate();
}

function dateDifference(startDate, endDate) {
	let start = new Date(startDate);
	let end = new Date(endDate);

	let years = end.getFullYear() - start.getFullYear();
	let months = end.getMonth() - start.getMonth();
	let days = end.getDate() - start.getDate();

	if (days < 0) {
		months -= 1;
		const prevMonth = (end.getMonth() - 1 + 12) % 12;
		const prevMonthYear = end.getMonth() === 0 ? end.getFullYear() - 1 : end.getFullYear();
		days += daysInMonth(prevMonthYear, prevMonth);
	}
	if (months < 0) {
		years -= 1;
		months += 12;
	}

	return {
		years: years,
		months: months,
		days: days,
	};
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

	if (yearInput.checkValidity() && monthInput.checkValidity() && dayInput.checkValidity()) {
		const startDate = `${yearInput.value}-${monthInput.value}-${dayInput.value}`;
		const endDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
		console.log(startDate, endDate);

		const diff = dateDifference(startDate, endDate);
		yearResult.innerText = diff.years;
		monthResult.innerText = diff.months;
		dayResult.innerText = diff.days;
	}
});
