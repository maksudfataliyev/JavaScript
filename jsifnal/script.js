document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'ec52a8bfb74449c38c40844c72908920';
    const newsContainer = document.getElementById('news-container');
    const loader = document.getElementById('loader');
    const categorySelector = document.getElementById('category');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageNumberDisplay = document.getElementById('pageNumber');

    let currentPage = 1;
    let totalPages = 1;
    let isLoading = false;

    function showApiError(message) {
        newsContainer.innerHTML = `
            <div class="api-error">
                <h3>⚠️ API временно недоступна ⚠️</h3>
                <p>${message || 'Невозможно загрузить новости. Пожалуйста, попробуйте позже.'}</p>
                <p>В качестве временного решения вы можете:</p>
                <ul>
                    <li>Проверить интернет-соединение</li>
                    <li>Обновить страницу</li>
                    <li>Попробовать другой браузер</li>
                </ul>
            </div>
        `;
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function handleImageError(img) {
        img.onerror = null;
        img.src = 'https://via.placeholder.com/400x200?text=No+Image';
        img.alt = 'Image not available';
    }

    async function fetchNews(category, page) {
        if (isLoading) return;
        
        isLoading = true;
        loader.classList.remove('hidden');
        newsContainer.innerHTML = '';

        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&apiKey=${apiKey}`);
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();

            if (data.status === "error") {
                if (data.code === "apiKeyDisabled") {
                    throw new Error("Ваш API ключ отключен. Пожалуйста, используйте другой ключ.");
                } else {
                    throw new Error(data.message || "Произошла ошибка при загрузке новостей");
                }
            }

            if (data.articles && data.articles.length > 0) {
                totalPages = Math.ceil(data.totalResults / 20);
                
                data.articles.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item';
                    
                    const imageUrl = article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image';
                    const formattedDate = formatDate(article.publishedAt);
                    
                    newsItem.innerHTML = `
                        <img src="${imageUrl}" alt="${article.title}">
                        <div class="news-content">
                            <span class="date-badge">${formattedDate}</span>
                            <h3>${article.title}</h3>
                            <p>${article.description || 'Описание отсутствует'}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-size: 12px; color: #777;">${article.source.name}</span>
                                <a href="${article.url}" target="_blank">Читать</a>
                            </div>
                        </div>
                    `;
                    
                    const img = newsItem.querySelector('img');
                    img.onerror = () => handleImageError(img);
                    
                    newsContainer.appendChild(newsItem);
                });
            } else {
                showApiError("Новости по данной категории не найдены. Попробуйте выбрать другую.");
            }
        } catch (error) {
            console.error('API Error:', error);
            showApiError(error.message);
        } finally {
            isLoading = false;
            loader.classList.add('hidden');
            pageNumberDisplay.textContent = currentPage;
            updatePaginationButtons();
        }
    }

    function updatePaginationButtons() {
        prevPageButton.disabled = currentPage <= 1;
        nextPageButton.disabled = currentPage >= totalPages;
        if (totalPages <= 1) {
            document.getElementById('pagination').style.display = 'none';
        } else {
            document.getElementById('pagination').style.display = 'flex';
        }
    }

    categorySelector.addEventListener('change', () => {
        currentPage = 1;
        fetchNews(categorySelector.value, currentPage);
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchNews(categorySelector.value, currentPage);
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            fetchNews(categorySelector.value, currentPage);
        }
    });

    try {
        fetchNews(categorySelector.value, currentPage);
    } catch (error) {
        showApiError("Не удалось загрузить новости. Пожалуйста, проверьте соединение.");
    }
});
