const billInput = document.querySelector("#bill-input");
const billContainer = document.querySelector(".bill-input");
const buttons = document.querySelectorAll(".btn");
const customTip = document.querySelector("#custom-tip");
const peopleInput = document.querySelector("#number-people-input");
const peopleContainer = document.querySelector(".people-input");
const peopleError = document.querySelector(".wrong");

const tipAmount = document.querySelector("#tip-amount");
const total = document.querySelector("#total");
const reset = document.querySelector("#reset-button");

let bill;
let peopleNum;
let tipAmountValue;
let totalValue;

// tip controler options
let tipValue = 0;
const tips = Array.from(buttons);

tips.forEach((value, i, arr) => {
	value.addEventListener("click", (event) => {
		event.preventDefault();
		removeActive(arr);
		customTip.value = "";
		value.classList.add("active");
		tipValue = Number.parseFloat(value.textContent) / 100;
		showBill();
	})
});

const removeActive = (arr) => {
	arr.find((element) => 
		element.classList.contains("active")
	)?.classList.remove("active");
};

customTip.addEventListener("focus", () => {
	removeActive(tips);
	customTip.value = "";
})

customTip.addEventListener("blur", () => {
	tipValue = parseFloat(customTip.value) / 100;
	showBill();
});

//inputs border
billInput.addEventListener("focus", () => {
	billContainer.classList.add("input-active");
});

peopleInput.addEventListener("focus", () => {
	peopleContainer.classList.add("input-active");
});

billInput.addEventListener("blur", () => {
	bill = billInput.value;

	const classExist = billContainer.classList.contains("input-active");

	classExist && billContainer.classList.remove("input-active");

	showBill();
});

peopleInput.addEventListener("blur", () => {
	peopleNum = peopleInput.value;

	if (peopleNum <= 0) {
		peopleContainer.classList.add("input-wrong");
		peopleError.style.visibility = 'visible';
	} else {
		peopleError.style.visibility = 'hidden';
		peopleContainer.classList.remove("input-wrong");
		const classExist = peopleContainer.classList.contains("input-active");
		classExist && peopleContainer.classList.remove("input-active");
	}

	showBill();
});

customTip.addEventListener("focus", () => {
	customTip.classList.add("input-active");
});

customTip.addEventListener("blur", () => {
	const value = customTip.classList.contains("input-active");

	value && customTip.classList.remove("input-active");
});

//show bill
const showBill = () => {
	if (bill && peopleNum && tipValue > 0) {
		tipAmountValue = ((bill * tipValue) / peopleNum);
		totalValue = (bill / peopleNum + parseFloat(tipAmountValue));
		
		tipAmount.innerHTML = tipAmountValue.toLocaleString('en', {style: 'currency', currency: 'USD'});

		total.innerHTML = totalValue.toLocaleString('en', {style: 'currency', currency: 'USD'});
	}
}

// reset button
reset.addEventListener("click", () => {
	bill = 0;
	peopleNum = 0;
	tipValue = 0;
	tipAmountValue = 0;
	totalValue = 0;
	removeActive(tips);
	billInput.value = "";
	customTip.value = "";
	peopleInput.value = "";
	peopleError.style.visibility = 'hidden';
	peopleContainer.classList.remove("input-wrong");
	const classExist = peopleContainer.classList.contains("input-active");
	classExist && peopleContainer.classList.remove("input-active");
	tipAmount.innerHTML = "$0.00";
	total.innerHTML = "$0.00";
})