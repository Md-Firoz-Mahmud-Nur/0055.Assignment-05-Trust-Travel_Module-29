const availableSeatsElement = document.getElementById("available-seats");
const totalSeatsSelectElement = document.getElementById("total-seats-selected");
const seatsDetailsElement = document.getElementById("seats-details");
const totalElement = document.getElementById("total");
const grandTotalElement = document.getElementById("grand-total");
const couponElement = document.getElementById("coupon");
const couponBtnElement = document.getElementById("coupon-btn");
const nameElement = document.getElementById("name");
const phoneElement = document.getElementById("phone");
const emailElement = document.getElementById("email");
const nextBtnElement = document.getElementById("next-btn");
const couponHideElement = document.getElementById("for-hide");
const seatElements = document.getElementsByClassName("seat");

// default Data
let availableSeats = 40;
let seatsSelected = 0;
let total = 0;
let grandTotal = total;
let isCouponUsed = false;

// default Setup
function defaultSetup() {
  availableSeats = 40;
  seatsSelected = 0;
  total = 0;
  grandTotal = total;
  isCouponUsed = false;

  availableSeatsElement.innerText = availableSeats;
  totalSeatsSelectElement.innerText = seatsSelected;
  totalElement.innerText = total;
  grandTotalElement.innerText = grandTotal;

  couponBtnElement.setAttribute("disabled", "");
  couponHideElement.classList.remove("hidden");
}
defaultSetup();

function check() {
  const phoneNumber = phoneElement.value;

  if (phoneNumber && !isNaN(phoneNumber) && total > 0) {
    nextBtnElement.removeAttribute("disabled", "");
  } else {
    nextBtnElement.setAttribute("disabled", "");
  }
}

// Bus Seat Selection
for (const seatElement of seatElements) {
  seatElement.addEventListener("click", function (event) {
    if (seatsSelected < 4) {
      seatsSelected++;
      availableSeats--;
      event.target.classList.remove("bg-gray-200", "hover:bg-green-700");
      event.target.classList.add("bg-green-500", "text-white");
      availableSeatsElement.innerText = availableSeats;
      totalSeatsSelectElement.innerText = seatsSelected;
      const currentSeat = event.target.innerText;
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `<td>${currentSeat}</td><td>Economy</td><td>550</td>`;
      seatsDetailsElement.appendChild(tableRow);
      total = seatsSelected * 550;
      grandTotal = total;
      totalElement.innerText = total;
      grandTotalElement.innerText = grandTotal;
      isCouponUsed = false;
      check();
      event.target.classList.add("cursor-not-allowed");
      event.target.classList.remove("cursor-pointer");
      event.target.setAttribute("disabled", "");
      if (seatsSelected >= 4) {
        couponBtnElement.removeAttribute("disabled", "");
      }
    } else {
      alert("Maximum number of seats 4");
    }
  });
}

// Coupon Add
couponBtnElement.addEventListener("click", function (event) {
  const providedCoupon = couponElement.value;

  if (providedCoupon === "NEW15" && !isCouponUsed) {
    isCouponUsed = true;
    grandTotal -= grandTotal * 0.15;
    grandTotalElement.innerText = grandTotal;
    couponHideElement.classList.add("hidden");
    document.getElementById("discount-row").innerHTML = `<th>Discount</th>
    <th></th>
    <th>BDT ${total * 0.15}</th>
    `;
  }

  if (providedCoupon === "Couple 20" && !isCouponUsed) {
    isCouponUsed = true;
    grandTotal -= grandTotal * 0.2;
    grandTotalElement.innerText = grandTotal;
    couponHideElement.classList.add("hidden");
    document.getElementById("discount-row").innerHTML = `<th>Discount</th>
    <th></th>
    <th>BDT ${total * 0.2}</th>
    `;
  }
  if (!(providedCoupon === "Couple 20") && !(providedCoupon === "NEW15")) {
    alert("Invalid Coupon Code! Please Provide A Valid Coupon Code");
  }
  couponElement.value = "";
  couponBtnElement.removeAttribute("disabled", "");
});

// Name Input Element
nameElement.addEventListener("keyup", function (event) {
  check();
});

// Phone Input Element
phoneElement.addEventListener("keyup", function (event) {
  check();
});

nextBtnElement.addEventListener("click", function () {
  couponElement.value = "";
  nameElement.value = "";
  phoneElement.value = "";
  emailElement.value = "";
  defaultSetup();

  seatsDetailsElement.innerHTML = ``;
  document.getElementById("discount-row").innerHTML = ``;

  for (const seatEle of seatElements) {
    seatEle.removeAttribute("disabled", "");
    seatEle.classList.remove(
      "cursor-not-allowed",
      "bg-green-500",
      "text-white"
    );
    seatEle.classList.remove();
    seatEle.classList.add("cursor-pointer", "bg-gray-200");
    nextBtnElement.setAttribute("disabled", "");
  }
});
