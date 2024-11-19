document.addEventListener('DOMContentLoaded', function () {
    const checklistItems = document.querySelectorAll('.checklist-item');
    const totalPriceElement = document.getElementById('totalPricePasseio');
    const convertedPriceElement = document.getElementById('convertedPrice');
    let totalPrice = 0;

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

    function convertCurrency(amount, fromCurrency, toCurrency) {
      const apiKey = 'YOUR_API_KEY'; // Substitua pela sua chave de API
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
  });