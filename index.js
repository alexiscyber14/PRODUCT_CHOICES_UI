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