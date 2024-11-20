document.addEventListener('DOMContentLoaded', () => {
    // Recupera o valor do número de visitas armazenado no localStorage
    let visitCount = localStorage.getItem('visitCount');

    // Se não houver um valor salvo, inicializa com 0
    if (!visitCount) {
        visitCount = 0;
    }

    // Incrementa o número de visitas
    visitCount++;

    // Atualiza o localStorage com o novo valor
    localStorage.setItem('visitCount', visitCount);

    // Mostra a mensagem na página
    const visitCountElement = document.getElementById('visitCount');
    visitCountElement.textContent = `Você já visitou esta página ${visitCount} vez(es).`;
});
