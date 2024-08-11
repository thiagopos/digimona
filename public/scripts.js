document.addEventListener('DOMContentLoaded', () => {
  const newModal = document.getElementById('new-digimon-modal');
  const updateModal = document.getElementById('update-digimon-modal');
  const newBtn = document.getElementById('new-digimon-btn');
  const closeBtns = document.querySelectorAll('.close');
  const updateButtons = document.querySelectorAll('.update-btn');
  const updateForm = document.getElementById('update-form');

  const namePattern = /^[A-Za-zÀ-ÿÇç]{1}[A-Za-zÀ-ÿÇç]{3,19}$/;
  const typePattern = /^[A-Za-zÀ-ÿÇç]{1}[A-Za-zÀ-ÿÇç]{3,14}$/;

  function validateInput(input, pattern, minLength, maxLength) {
      const value = input.value.trim();
      if (!pattern.test(value) || value.length < minLength || value.length > maxLength) {
          input.setCustomValidity("Valor inválido. Verifique as regras.");
      } else {
          input.setCustomValidity("");
      }
  }

  const newNameInput = document.getElementById('name');
  const newTypeInput = document.getElementById('type');
  const updateNameInput = document.getElementById('update-name');
  const updateTypeInput = document.getElementById('update-type');

  // Validação para criação
  newNameInput.addEventListener('input', function () {
      validateInput(newNameInput, namePattern, 4, 20);
  });

  newTypeInput.addEventListener('input', function () {
      validateInput(newTypeInput, typePattern, 4, 15);
  });

  // Validação para atualização
  updateNameInput.addEventListener('input', function () {
      validateInput(updateNameInput, namePattern, 4, 20);
  });

  updateTypeInput.addEventListener('input', function () {
      validateInput(updateTypeInput, typePattern, 4, 15);
  });

  // Abrir modal de novo Digimon
  newBtn.onclick = () => {
      newModal.style.display = 'block';
  };

  // Abrir modal de atualização de Digimon
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

  // Fechar modais
  closeBtns.forEach(button => {
      button.onclick = () => {
          button.closest('.modal').style.display = 'none';
      };
  });

  // Fechar modal se o usuário clicar fora dele
  window.onclick = (event) => {
      if (event.target == newModal || event.target == updateModal) {
          event.target.style.display = 'none';
      }
  };
});
