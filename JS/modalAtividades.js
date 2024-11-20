document.addEventListener('DOMContentLoaded', function () {
  // Variável para armazenar a chave da API
  const apiKey = 'fca_live_3fHiejc3YcIQGf6EDRv2SoKMY0O85A6lBb3u98YB';

  // Função para inicializar o checklist e cálculo de diferentes modais
  function initializeChecklist(modalId, checklistClass, totalId, convertedId) {
      console.log(`Inicializando checklist para o modal: ${modalId}`);

      const modalElement = document.getElementById(modalId);
      if (!modalElement) {
          console.error(`Modal não encontrado: ${modalId}`);
          return;
      }

      const checklistItems = modalElement.querySelectorAll(`.${checklistClass}`);
      const totalPriceElement = document.getElementById(totalId);
      const convertedPriceElement = document.getElementById(convertedId);

      if (!checklistItems.length) {
          console.warn(`Nenhum item de checklist encontrado para o modal: ${modalId}`);
      }
      if (!totalPriceElement || !convertedPriceElement) {
          console.error(`Elementos de preço não encontrados para o modal: ${modalId}`);
          return;
      }

      let totalPrice = 0;

      // Função para atualizar o total e converter o valor
      function updateTotalAndConvert() {
          totalPrice = 0;
          checklistItems.forEach(item => {
              const price = parseInt(item.getAttribute('data-price'));
              if (item.checked) {
                  totalPrice += price;
              }
          });
          totalPriceElement.textContent = `$${totalPrice}`;
          convertCurrency(totalPrice, 'USD', 'BRL', convertedPriceElement);
      }

      // Adiciona eventos para cada item de checklist
      checklistItems.forEach(item => {
          item.addEventListener('change', updateTotalAndConvert);
      });

      // Função para converter a moeda
      function convertCurrency(amount, fromCurrency, toCurrency, convertedElement) {
          if (amount === 0) {
              convertedElement.textContent = `R$ 0.00`;
              return;
          }

          const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${fromCurrency}`;

          console.log(`Fazendo a requisição para a API de conversão: ${url}`);
          fetch(url)
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`Erro na resposta da API: ${response.status}`);
                  }
                  return response.json();
              })
              .then(data => {
                  if (data && data.data && data.data[toCurrency]) {
                      const rate = data.data[toCurrency];
                      const convertedAmount = (amount * rate).toFixed(2);
                      convertedElement.textContent = `R$ ${convertedAmount}`;
                  } else {
                      throw new Error('Dados de conversão não encontrados na resposta da API');
                  }
              })
              .catch(error => {
                  console.error('Erro ao converter moeda:', error);
                  convertedElement.textContent = 'Erro ao converter moeda';
              });
      }
  }

  // Inicializar o checklist de cada modal
  document.addEventListener('show.bs.modal', function (event) {
      const modalId = event.target.id;
      if (modalId === 'modalPasseioArLivre') {
          initializeChecklist('modalPasseioArLivre', 'checklist-item', 'totalPricePasseio', 'convertedPricePasseio');
      } else if (modalId === 'modalGastronomia') {
          initializeChecklist('modalGastronomia', 'checklist-item', 'totalPriceGastronomia', 'convertedPriceGastronomia');
      } else if (modalId === 'modalEventosShows') {
          initializeChecklist('modalEventosShows', 'checklist-item', 'totalPriceEventosShows', 'convertedPriceEventosShows');
      } else if (modalId === 'modalMuseusHistoria') {
          initializeChecklist('modalMuseusHistoria', 'checklist-item', 'totalPriceMuseusHistoria', 'convertedPriceMuseusHistoria');
      }
  });
});
