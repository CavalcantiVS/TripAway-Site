document.addEventListener('DOMContentLoaded', function() {
    const nationalitySelect = document.getElementById('registerNationality');
  
    // URL da API externa ou caminho do arquivo JSON local
    fetch('https://restcountries.com/v3.1/all') // Você pode usar um arquivo JSON local se preferir
      .then(response => response.json())
      .then(data => {
        // Ordenar os países pelo nome
        const countries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        
        // Limpar as opções anteriores
        nationalitySelect.innerHTML = '<option value="">Selecione seu país</option>';
  
        // Adicionar os países como opções no select
        countries.forEach(country => {
          const option = document.createElement('option');
          option.value = country.cca2; // Código do país (como 'BR', 'US', etc.)
          option.textContent = country.name.common;
          nationalitySelect.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar a lista de países:', error);
        nationalitySelect.innerHTML = '<option value="">Erro ao carregar países</option>';
      });
  });
  