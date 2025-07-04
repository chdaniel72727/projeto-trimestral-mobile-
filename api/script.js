document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');

    // Função para pesquisar na Wikipedia
    async function searchWikipedia() {
        const searchTerm = searchInput.value.trim();
        
        if (!searchTerm) {
            alert('Por favor, digite um termo para pesquisar');
            return;
        }

        try {
            // Adiciona "História do Brasil" ao termo de pesquisa para melhor relevância
            const fullSearchTerm = `${searchTerm} História do Brasil`;
            const encodedSearchTerm = encodeURIComponent(fullSearchTerm);
            
            const response = await fetch(
                `https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodedSearchTerm}&format=json&origin=*`
            );
            
            const data = await response.json();
            
            displayResults(data.query.search);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            resultsContainer.innerHTML = '<p>Ocorreu um erro ao buscar os resultados. Tente novamente mais tarde.</p>';
        }
    }

    // Função para exibir os resultados
    function displayResults(results) {
        resultsContainer.innerHTML = '';
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>Nenhum resultado encontrado. Tente outro termo de pesquisa.</p>';
            return;
        }
        
        results.forEach(result => {
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            
            resultCard.innerHTML = `
                <h2>${result.title}</h2>
                <p>${result.snippet.replace(/<span class="searchmatch">|<\/span>/g, '')}...</p>
                <a href="https://pt.wikipedia.org/?curid=${result.pageid}" target="_blank">Ler mais</a>
            `;
            
            resultsContainer.appendChild(resultCard);
        });
    }

    // Event listeners
    searchButton.addEventListener('click', searchWikipedia);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchWikipedia();
        }
    });
});