// public/scripts.js

document.addEventListener('DOMContentLoaded', () => {
  const newModal = document.getElementById('new-digimon-modal');
  const updateModal = document.getElementById('update-digimon-modal');
  const newBtn = document.getElementById('new-digimon-btn');
  const closeBtns = document.querySelectorAll('.close');
  const updateButtons = document.querySelectorAll('.update-btn');
  const updateForm = document.getElementById('update-form');

  // Open new digimon modal
  newBtn.onclick = () => {
      newModal.style.display = 'block';
  };

  // Open update digimon modal
  updateButtons.forEach(button => {
      button.onclick = () => {
          const id = button.getAttribute('data-id');
          const name = button.getAttribute('data-name');
          const type = button.getAttribute('data-type');

          updateForm.action = `/update/${id}`;
          document.getElementById('update-name').value = name;
          document.getElementById('update-type').value = type;

          updateModal.style.display = 'block';
      };
  });

  // Close modals
  closeBtns.forEach(button => {
      button.onclick = () => {
          button.closest('.modal').style.display = 'none';
      };
  });

  // Close modal if user clicks outside of it
  window.onclick = (event) => {
      if (event.target == newModal || event.target == updateModal) {
          event.target.style.display = 'none';
      }
  };
});
