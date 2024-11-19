document.addEventListener('DOMContentLoaded', function () {
    // Variável para armazenar a chave da API
    const apiKey = 'fca_live_3fHiejc3YcIQGf6EDRv2SoKMY0O85A6lBb3u98YB'; // Chave da FreeCurrencyAPI
  
    // Função para inicializar o checklist e cálculo
    function initializeChecklist() {
      const checklistItems = document.querySelectorAll('.checklist-item');
      const totalPriceElement = document.getElementById('totalPricePasseio');
      const convertedPriceElement = document.getElementById('convertedPrice');
      let totalPrice = 0;
  
      // Adiciona eventos para cada item de checklist
      checklistItems.forEach(item => {
        item.addEventListener('change', function () {
          const price = parseInt(this.getAttribute('data-price'));
          if (this.checked) {
            totalPrice += price;
          } else {
            totalPrice -= price;
          }
          totalPriceElement.textContent = `$${totalPrice}`;
          convertCurrency(totalPrice, 'USD', 'BRL');
        });
      });
  
      // Função para converter a moeda
      function convertCurrency(amount, fromCurrency, toCurrency) {
        const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${fromCurrency}`;
  
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const rate = data.data[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            convertedPriceElement.textContent = `R$ ${convertedAmount}`;
          })
          .catch(error => {
            console.error('Erro ao converter moeda:', error);
            convertedPriceElement.textContent = 'Erro ao converter moeda';
          });
      }
    }
  
    // Expondo a função initializeChecklist globalmente para ser usada no modalLoader
    window.initializeChecklist = initializeChecklist;
  });
