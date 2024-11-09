// Função para buscar informações a partir do CEP
document.getElementById("search-button").addEventListener("click", function() {
    // Obtendo o valor do input de CEP
    const cep = document.getElementById("cep-input").value;

    // Validando se o valor inserido é um CEP válido (apenas números e 8 dígitos)
    if (cep.length === 8 && /^[0-9]+$/.test(cep)) {
        // URL da API ViaCEP com o CEP inserido
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        // Fazendo a requisição à API ViaCEP
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar o CEP.");
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    alert("CEP não encontrado.");
                } else {
                    // Atualizar os elementos da página com as informações do endereço
                    document.getElementById("endereco-logradouro").innerText = `Logradouro: ${data.logradouro}`;
                    document.getElementById("endereco-bairro").innerText = `Bairro: ${data.bairro}`;
                    document.getElementById("endereco-cidade").innerText = `Cidade: ${data.localidade} - ${data.uf}`;

                    // Exibir o modal
                    const resultadoModal = new bootstrap.Modal(document.getElementById('resultadoModal'));
                    resultadoModal.show();
                }
            })
            .catch(error => {
                console.error("Erro:", error);
                alert("Erro ao buscar o CEP. Verifique e tente novamente.");
            });
    } else {
        alert("Por favor, insira um CEP válido com 8 dígitos.");
    }
});

// Função para conversão de moeda
document.getElementById("converter-moeda").addEventListener("click", function() {
    const valorBRL = document.getElementById("valor-brl").value;
    const moedaDestino = "BRL"; // Para simplificação, começamos com BRL

    if (valorBRL) {
        // Buscar a moeda do país conforme o destino
        const cidade = document.getElementById("endereco-cidade").innerText;
        const apiKey = "fca_live_3fHiejc3YcIQGf6EDRv2SoKMY0O85A6lBb3u98YB"; // Substitua pela sua chave da API
        const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${moedaDestino}&base_currency=BRL`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao obter taxa de câmbio.");
                }
                return response.json();
            })
            .then(data => {
                if (data && data.data && data.data[moedaDestino]) {
                    const taxa = data.data[moedaDestino];
                    const valorConvertido = (valorBRL * taxa).toFixed(2);
                    document.getElementById("resultado-conversao").innerText = `Valor convertido: ${valorConvertido} ${moedaDestino}`;
                } else {
                    throw new Error("Erro ao processar a taxa de câmbio.");
                }
            })
            .catch(error => {
                console.error("Erro ao converter moeda:", error);
                alert("Erro ao converter moeda. Tente novamente mais tarde.");
            });
    } else {
        alert("Por favor, insira um valor para converter.");
    }
});
