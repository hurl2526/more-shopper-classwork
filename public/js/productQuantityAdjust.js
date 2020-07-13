let priceQuantity = () => {
  document.getElementById('quantity').value = quantity;
  document.getElementById('priceValue').value = priceValue.toFixed(2);
  document.getElementById('total').innerHTML = quantity;
};

let priceValue = parseFloat(document.getElementById('priceValue').value);
let quantity = parseInt(document.getElementById('quantity').value);
let priceHidden = parseFloat(document.getElementById('priceHidden').value);

document.getElementById('plus').addEventListener('click', (event) => {
  event.preventDefault();

  priceValue += priceHidden;
  quantity += 1;
  priceQuantity();
});

document.getElementById('minus').addEventListener('click', (event) => {
  event.preventDefault();

  if (quantity > 1) {
    priceValue -= priceHidden;
    quantity -= 1;
  } else {
    quantity = 1;
    priceValue = priceHidden;
  }
  priceQuantity();
});
