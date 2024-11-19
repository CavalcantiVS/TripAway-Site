document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar o modal dinamicamente
    function loadModal(modalName) {
      fetch(`../modals/${modalName}.html`)
        .then(response => response.text())
        .then(data => {
          document.getElementById('modalContainer').innerHTML = data;
  
          // Use setTimeout para garantir que o modal seja inicializado após ser adicionado ao DOM
          setTimeout(() => {
            const modalElement = document.getElementById(modalName);
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
  
            // Após o modal ser carregado, inicialize o checklist e o cálculo de conversão
            if (typeof initializeChecklist === 'function') {
              initializeChecklist();
            }
          }, 100);
        })
        .catch(error => console.error('Erro ao carregar o modal:', error));
    }
  
    // Adiciona evento a todos os botões que abrem modais
    document.querySelectorAll('[data-modal]').forEach(button => {
      button.addEventListener('click', function () {
        const modalName = this.getAttribute('data-modal');
        loadModal(modalName);
      });
    });
  });
  