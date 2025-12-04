 
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('nav ul');
        const hamburgerLines = document.querySelectorAll('.hamburger span');
        let menuOpen = false;

        hamburger.addEventListener('click', () => {
            menuOpen = !menuOpen;
            
            if (menuOpen) {
                navMenu.classList.add('active');
                hamburgerLines[0].style.transform = 'translateY(6px) rotate(45deg)';
                hamburgerLines[1].style.transform = 'scaleX(0)';
                hamburgerLines[2].style.transform = 'translateY(-6px) rotate(-45deg)';
            } else {
                navMenu.classList.remove('active');
                hamburgerLines[0].style.transform = '';
                hamburgerLines[1].style.transform = '';
                hamburgerLines[2].style.transform = '';
            }
        });

        const API_BASE = 'https://www.thecocktaildb.com/api/json/v1/1';
        const searchInput = document.querySelector('#searchInput');
        const searchBtn = document.querySelector('#searchBtn');
        const randomBtn = document.querySelector('#randomBtn');
        const results = document.querySelector('#results');
        const modalOverlay = document.querySelector('#modalOverlay');
        const alertContainer = document.querySelector('#alertContainer');

        async function searchCocktails(term) {
            try {
                showLoading();
                const response = await fetch(`${API_BASE}/search.php?s=${term}`);
                const data = await response.json();
                
                if (data.drinks) {
                    displayResults(data.drinks);
                } else {
                    showAlert('No se encontraron cócteles con ese nombre', 'warning');
                    results.innerHTML = '';
                }
            } catch (error) {
                showAlert('Error de conexión. Por favor, intenta de nuevo.', 'danger');
                results.innerHTML = '';
            }
        }

        async function getRandomCocktail() {
            try {
                showLoading();
                const response = await fetch(`${API_BASE}/random.php`);
                const data = await response.json();
                displayResults(data.drinks);
            } catch (error) {
                showAlert('Error de conexión. Por favor, intenta de nuevo.', 'danger');
            }
        }

        function displayResults(drinks) {
            results.innerHTML = '';
            
            drinks.forEach((drink, index) => {
                const card = document.createElement('div');
                card.className = 'cocktail-card';
                card.style.animationDelay = `${index * 0.1}s`;
                
                card.innerHTML = `
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                    <div class="card-content">
                        <h3>${drink.strDrink}</h3>
                        <p class="category">${drink.strCategory}</p>
                        <button class="btn-custom btn-search">Ver más</button>
                    </div>
                `;
                
                card.addEventListener('click', () => showModal(drink));
                results.append(card);
            });
        }

        function showModal(drink) {
            const ingredients = [];
            for (let i = 1; i <= 15; i++) {
                const ingredient = drink[`strIngredient${i}`];
                const measure = drink[`strMeasure${i}`];
                if (ingredient) {
                    ingredients.push(`${measure || ''} ${ingredient}`.trim());
                }
            }

            const modalContent = document.querySelector('#modalContent');
            modalContent.innerHTML = `
                <div class="modal-header">
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <h2>${drink.strDrink}</h2>
                    <div class="modal-info">
                        <span class="info-badge">${drink.strCategory}</span>
                        <span class="info-badge">${drink.strAlcoholic}</span>
                        <span class="info-badge">${drink.strGlass}</span>
                    </div>
                    <h3>Instrucciones:</h3>
                    <p>${drink.strInstructions}</p>
                    <div class="ingredients">
                        <h3>Ingredientes:</h3>
                        ${ingredients.map(ing => `<div class="ingredient-item">• ${ing}</div>`).join('')}
                    </div>
                </div>
            `;

            modalOverlay.classList.add('active');

            const closeBtn = modalContent.querySelector('.modal-close');
            closeBtn.addEventListener('click', closeModal);
        }

        function closeModal() {
            modalOverlay.classList.remove('active');
        }

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        function showAlert(message, type) {
            alertContainer.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            setTimeout(() => alertContainer.innerHTML = '', 4000);
        }

        function showLoading() {
            results.innerHTML = '<div style="text-align: center; padding: 3rem; font-size: 1.5rem;">Cargando...</div>';
        }

        searchBtn.addEventListener('click', () => {
            const term = searchInput.value.trim();
            if (term) {
                searchCocktails(term);
            } else {
                showAlert('Por favor, ingresa un nombre de cóctel', 'warning');
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });

        randomBtn.addEventListener('click', getRandomCocktail);

        //getRandomCocktail(API_BASE);

                const toggle = document.getElementById("theme-toggle");

        toggle.addEventListener("change", () => {
          if (toggle.checked) {
            document.documentElement.style.setProperty("--darker", "#e0e0e0e0");
            document.documentElement.style.setProperty("--dark", "#1a1a2e");
            document.documentElement.style.setProperty("--light", "#e0e0e0");
            document.documentElement.style.setProperty("--background-light", "#0a0a0a");
            document.documentElement.style.setProperty("--font-light", "#f5f5f5");
            document.documentElement.style.setProperty("--secondary", "#4ecdc4");
            document.documentElement.style.setProperty("--footer-color", "#f0f0f0");
            document.documentElement.style.setProperty("--footer-bg", "#0a0a0aff");
            document.body.style.backgroundColor = "#0a0a0a";
          } else {
            document.documentElement.style.setProperty("--darker", "#0a0a0aff");
            document.documentElement.style.setProperty("--dark", "#2b2a2aff");
            document.documentElement.style.setProperty("--light", "#1a1a2e");
            document.documentElement.style.setProperty("--background-light", "#d0e8f2");
            document.documentElement.style.setProperty("--font-light", "#070707");
            document.documentElement.style.setProperty("--footer-color", "#000000ff");
            document.documentElement.style.setProperty("--footer-bg", "#f0f0f0f0");
            document.body.style.backgroundColor = "#e8f4f8";
          }
        });