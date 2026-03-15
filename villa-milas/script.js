// Update checkout min date when checkin changes
document.getElementById('checkin').addEventListener('change', () => {
    const checkinDate = new Date(document.getElementById('checkin').value);
    checkinDate.setDate(checkinDate.getDate() + 1);
    const minCheckout = checkinDate.toISOString().split('T')[0];
    document.getElementById('checkout').setAttribute('min', minCheckout);
    calculateTotal();
});

// Scroll to booking section
function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// Booking modal logic
let selectRoom = { type: 'Double Room', price: 60 };

function bookRoom(roomType, price) {
    selectRoom = { type: roomType, price: price };
    const modal = document.getElementById('bookingModal');
    document.getElementById('roomTypeDisplay').textContent = roomType;
    document.getElementById('summaryPrice').textContent = '€' + price;

    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;

    if (checkin) document.getElementById('summaryCheckin').textContent = checkin;
    if (checkout) document.getElementById('summaryCheckout').textContent = checkout;

    let guestText = adults + ' Adult' + (adults > 1 ? 's' : '');
    if (children > 0) {
        guestText += ', ' + children + ' Child' + (children > 1 ? 'ren' : '');
    }
    document.getElementById('summaryGuests').textContent = guestText;

    calculateTotal();
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('bookingModal').classList.remove('active');
}

// Booking form submit
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const roomType = document.getElementById('roomType').value;
    const prices = { double: 60, twin: 55, triple: 84, quadruple: 100 };
    const roomNames = { double: 'Double Room', twin: 'Twin Room', triple: 'Triple Room', quadruple: 'Quadruple Room' };
    bookRoom(roomNames[roomType], prices[roomType]);
});

// Calculate total price based on nights and room price
function calculateTotal() {
    const checkin = new Date(document.getElementById('checkin').value);
    const checkout = new Date(document.getElementById('checkout').value);

    if (checkin && checkout && checkout > checkin) {
        const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
        const total = nights * selectedRoom.price;

        document.getElementById('summaryNights').textContent = nights;
        document.getElementById('summaryTotal').textContent = '€' + total;
    }
}

document.getElementById('checkin').addEventListener('change', calculateTotal);
document.getElementById('checkout').addEventListener('change', calculateTotal);

// Booking details form submit
document.getElementById('bookingDetailsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your booking request! We will contact you shortly to confirm your reservation.');
    closeModal();
});
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkin').setAttribute('min', today);
    document.getElementById('checkout').setAttribute('min', today);
});
document.addEventListener("DOMContentLoaded", function () {

  const bookBtn = document.getElementById("bookBtn");

  if (bookBtn) {
    bookBtn.addEventListener("click", function () {
      alert("Booked!");
    });

