document.addEventListener("DOMContentLoaded", () => {

  // Minimum dates
  const today = new Date().toISOString().split("T")[0];
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  if (checkinInput && checkoutInput) {
    checkinInput.setAttribute("min", today);
    checkoutInput.setAttribute("min", today);
  }

  // Selected room object
  let selectedRoom = { type: "Double Room", price: 60 };

  // Update checkout min when checkin changes
  checkinInput?.addEventListener("change", () => {
    const checkinDate = new Date(checkinInput.value);
    checkinDate.setDate(checkinDate.getDate() + 1);
    checkoutInput.setAttribute("min", checkinDate.toISOString().split("T")[0]);
    calculateTotal();
  });
  checkoutInput?.addEventListener("change", calculateTotal);

  // Scroll to booking section
  window.scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  // Booking modal logic
  function openBookingModal(roomType, price) {
    selectedRoom = { type: roomType, price };
    const modal = document.getElementById("bookingModal");
    if (!modal) return;

    const roomDisplay = document.getElementById("roomTypeDisplay");
    if (roomDisplay) roomDisplay.textContent = roomType;

    calculateTotal();
    modal.classList.add("active");
  }

  document.getElementById("modalCloseBtn")?.addEventListener("click", () => {
    document.getElementById("bookingModal")?.classList.remove("active");
  });

  // Booking form submit
  document.getElementById("bookingForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const roomType = document.getElementById("roomType")?.value;
    const prices = { double: 60, twin: 55, triple: 84, quadruple: 100 };
    const roomNames = { double: "Double Room", twin: "Twin Room", triple: "Triple Room", quadruple: "Quadruple Room" };

    if (roomType) openBookingModal(roomNames[roomType], prices[roomType]);
  });

  // Calculate total price
  function calculateTotal() {
    if (!checkinInput || !checkoutInput) return;
    const checkin = new Date(checkinInput.value);
    const checkout = new Date(checkoutInput.value);
    if (checkout > checkin) {
      const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
      const total = nights * selectedRoom.price;
      document.getElementById("summaryNights")?.textContent = nights;
      document.getElementById("summaryTotal")?.textContent = "€" + total;
    }
  }

  // Booking details form submit
  document.getElementById("bookingDetailsForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your booking request! We will contact you shortly.");
    document.getElementById("bookingModal")?.classList.remove("active");
  });

  // Optional Book Now button
  const bookBtn = document.getElementById("bookBtn");
  bookBtn?.addEventListener("click", () => {
    alert("Thank you! Scroll down to book your stay.");
  });

});
