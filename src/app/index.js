import debounce from 'lodash.debounce';
import { Report } from 'notiflix/build/notiflix-report-aio';
//import { setImages } from './setImages';
//import { closeQuickView, openQuickView } from './viewCard';

const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.header__menu-btn');
const searchbox = document.querySelector('[data-input]');

// Sets the nav and menuBtn.
// Add click event listener to the menu. Toggle the active and active state of the menu.
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  nav.classList.toggle('active');
});

// search
searchbox.addEventListener(
  'input',
  debounce(() => {
    const value = searchbox.value.trim();
    searchCoffee(value);
  }),
  300
);

const createCoffeeCard = ({
  name,
  cupSize,
  description,
  recipe: { ingredients, instructions },
}) => /* html */ ` <li class="services__item card">
              <div class="card-image">
                <img
                  src="https://images.unsplash.com/photo-1561882468-9110e03e0f78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                  alt="food"
                />
              </div>
              <div class="card-text">
                 <p class="text" class="card-meal-type">cupSize: ${cupSize}</p>
                <h2 class="card-title title">${name}</h2>
                 <p class="text" class="card-body">
                 ${description}
                </p>
              </div>
              <div class="card-price">${randomNumber(10)}$</div>
              <button
                type="button"
                class="btn services__btn-view"
                data-quick-view
              >
                Quick view
              </button>
            </li>
            <!-- hidden block -->
            <li class="services__item services__item-view is-hidden" id="quickview-01">
              <button type="button" class="btn services__btn-close" data-close>
                Close 1
              </button>
               <p class="text-title title recipe">Recipe</p>
               <div class="text-ingredients"><p class="text-title title">Ingredients:
               ${getIngredients(ingredients)}
              </div>
               <div class="text"><p class="text-title title">Instructions:
              ${getInstructions(instructions)}
               </div>
            </li>`;

const generateMarkup = arr =>
  arr?.reduce((markup, item) => markup + createCoffeeCard(item), '');

const insertMarkup = arr => (coffeeList.innerHTML = generateMarkup(arr));

const randomNumber = max => {
  return Math.floor(Math.random() * max + 1);
};

const coffeeList = document.querySelector('[data-coffee]');
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'e9932c3c72msh221f1c6b7e0eb68p147cecjsnf661410b5799',
    'X-RapidAPI-Host': 'the-coffee-api.p.rapidapi.com',
  },
};

const searchCoffee = query => {
  return fetch(
    `https://the-coffee-api.p.rapidapi.com/drinks/${query}?keys=description%2ChasAlcohol%2CcupSize%2Crecipe`,
    options
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      insertMarkup(data);

      // open-hidden coffee-card

      const quickViewButtons = document.querySelectorAll('[data-quick-view]');
      const closeButtons = document.querySelectorAll('[data-close]');
      const fullwidthCards = document.querySelectorAll('.fullwidth');

      let toggle; // Quick view <button>.
      let toggleParent; // <li>.
      let fullwidth; // Fullwidth card to be "injected".

      const openQuickView = (toggle, toggleParent, fullwidth) => {
        toggle.setAttribute('aria-expanded', 'true');
        toggleParent.classList.toggle('is-selected');
        fullwidth.classList.toggle('is-hidden');
        // Make fullwidth card keyboard focusable.
        fullwidth.setAttribute('tabIndex', '0');
      };

      const closeQuickView = (toggle, toggleParent, fullwidth) => {
        toggle.setAttribute('aria-expanded', 'false');
        toggleParent.classList.toggle('is-selected');
        fullwidth.classList.toggle('is-hidden');
        fullwidth.removeAttribute('tabIndex');
      };

      quickViewButtons.forEach(quickView => {
        // Add appropriate ARIA attributes for "toggle" behaviour.
        fullwidth = quickView.parentElement.nextElementSibling;
        quickView.setAttribute('aria-expanded', 'false');
        quickView.setAttribute('aria-controls', fullwidth.id);

        quickView.addEventListener('click', e => {
          toggle = e.target;
          toggleParent = toggle.parentElement;
          fullwidth = toggleParent.nextElementSibling;

          // Open (or close) fullwidth card.
          if (toggle.getAttribute('aria-expanded') === 'false') {
            // Do we have another fullwidth card already open? If so, close it.
            fullwidthCards.forEach(fullwidthOpen => {
              if (!fullwidthOpen.classList.contains('is-hidden')) {
                toggleParentOpen = fullwidthOpen.previousElementSibling;
                toggleOpen =
                  toggleParentOpen.querySelector('[data-quick-view]');

                closeQuickView(toggleOpen, toggleParentOpen, fullwidthOpen);
              }
            });

            openQuickView(toggle, toggleParent, fullwidth);
          } else {
            closeQuickView(toggle, toggleParent, fullwidth);
          }
        });
      });

      closeButtons.forEach(close => {
        close.addEventListener('click', e => {
          fullwidth = e.target.parentElement;
          toggleParent = e.target.parentElement.previousElementSibling;
          toggle = toggleParent.querySelector('[data-quick-view]');

          closeQuickView(toggle, toggleParent, fullwidth);
          toggle.focus(); // Return keyboard focus to "toggle" button.
        });
      });
    })
    .catch(err => console.error(err));
};

function onError(err) {
  Report.failure(
    '🥺 Ooops...',
    'Articles not found... Please, search another article.',
    'Okay'
  );
}

//searchCoffee('latte');

const getIngredients = arr =>
  arr
    .map(item => {
      let ing = '';
      for (const key of Object.keys(item)) {
        ing += `<p class="text ingredients">${key}: ${item[key]};</p>`;
      }
      return ing;
    })
    .join(' ');

const getInstructions = arr =>
  arr.map((item, idx) => `<p class="text">${idx + 1}. ${item}</p>`).join(' ');
