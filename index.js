const sizeContainers = document.querySelectorAll('.size-btn-qty');
// Get the initial price element
const initialPriceElement = document.querySelector('.price');
// Get the quantity input elements
const quantityInputs = document.querySelectorAll('.qty');
const initPrice = parseFloat(initialPriceElement.textContent);

// Store the selected size prices
const selectedSizesPrices = Array.from(sizeContainers).map(() => 0);

// Update the price based on the selected sizes and quantities
function updatePrice() {
  let totalPrice = 0;
  selectedSizesPrices.forEach((sizePrice, index) => {
    const quantity = parseInt(quantityInputs[index].value);
    const price = sizePrice * quantity;
    totalPrice += price;
  });
  initialPriceElement.textContent = totalPrice.toFixed(2);
}

// Add click event listener to each size button container
sizeContainers.forEach((container, index) => {
  const sizeButton = container.querySelector('.lead-btn');
  const sizePriceElement = container.querySelector('.size-price');
  const sizePrice = parseFloat(sizePriceElement.textContent);

  sizeButton.addEventListener('click', () => {
    sizeButton.classList.toggle('active-size');
    selectedSizesPrices[index] = sizeButton.classList.contains('active-size') ? sizePrice : 0;

    updatePrice();
  });
});

// Add input event listener to the quantity input elements
quantityInputs.forEach((input) => {
  input.addEventListener('input', () => {
    updatePrice();
  });
});

// Reset the price to the initial price when all size buttons are deselected
sizeContainers.forEach((container) => {
  container.addEventListener('click', () => {
    const activeSizes = document.querySelectorAll('.size-btn-qty .lead-btn.active-size');
    if (activeSizes.length === 0) {
      initialPriceElement.textContent = initPrice.toFixed(2);
    }
  });
});

const colorButtons = document.querySelectorAll('.colored');
colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const inputQty = button.parentNode.querySelector('input[name="quantity"]');
    if (inputQty) {
      const maxColorSelection = parseInt(inputQty.value);
      const selectedColorButtons = button.parentNode.querySelectorAll('.colored.active-color');

      if (selectedColorButtons.length < maxColorSelection || button.classList.contains('active-color')) {
        // Toggle the active color state
        button.classList.toggle('active-color');
      } else {
        // Deselect one of the previously selected colors
        selectedColorButtons[0].classList.remove('active-color');
        button.classList.add('active-color');
      }
    }
  });
});

// Create an empty array to store the selected choices
const selectedChoices = [];

// Event listener for the submit button
const submitButton = document.getElementById('submit-btn');
submitButton.addEventListener('click', () => {
  const selectedSizes = [];

  sizeContainers.forEach((container, index) => {
    const sizeButton = container.querySelector('.lead-btn');
    const sizeName = sizeButton.dataset.size;

    if (sizeButton.classList.contains('active-size')) {
      const quantity = parseInt(quantityInputs[index].value);
      const colorButtons = container.querySelectorAll('.colored.active-color');
      const colors = Array.from(colorButtons, (button) => button.dataset.color);
      selectedSizes.push({ sizeName, quantity, colors });
    }
  });

  selectedChoices.push(selectedSizes);
  console.log(selectedChoices); // console selected
  const selectedChoicesJSON = JSON.stringify(selectedChoices); // convert choices to json.
  console.log('Json', selectedChoicesJSON); // see json results

  const selectedChoicesContainer = document.getElementById('selected-choices-container');

  function displaySelectedChoices() {
    selectedChoicesContainer.innerHTML = ''; // Clear the container

    selectedChoices.forEach((selectedSizes) => {
      let html = '';

      selectedSizes.forEach((selectedSize) => {
        const { sizeName, quantity, colors } = selectedSize;

        html += `
        <div class="selected-size">Size: ${sizeName}</div>
        <div class="selected-quantity">Quantity: ${quantity}</div>
        <div class="selected-colors">Colors: ${colors.join(', ')}</div>
        <br>
      `;
      });

      const container = `<div class="selected-choice">${html}</div>`;
      selectedChoicesContainer.insertAdjacentHTML('beforeend', container);
    });
  }
  // Call the displaySelectedChoices function to initially display the selected choices
  displaySelectedChoices();
});
