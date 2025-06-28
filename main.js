var typed = new Typed(".text", {
    strings: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
typespeed: 100,
backspeed: 100,
backdelay: 1000,
loop: true

});
const openBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('aboutModal');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', () => {
  modal.style.display = 'flex'; // Show modal
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none'; // Hide modal
});

window.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});