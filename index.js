import {menuArray} from "./data.js"

const mainDiv = document.getElementById('main-div')
const shoppingCartDiv = document.getElementById('shopping-cart');
const modal = document.getElementById('modal')
const modalCloseButton = document.getElementById('modal-close-btn');
const payBtn = document.getElementById('pay-btn')
const payForm = document.getElementById('checkout-form');



let shoppingArray = []
let price = 0;

const itemHtml = menuArray.map(item => {
    mainDiv.innerHTML += `<div class="menu-div"> 
            <div class="item-emoji">${item.emoji}</div>
            <div class="item-desc">
                <h1>${item.name}</h1>
                <p>${item.ingredients}</p>
                <span>$${item.price}</span>
            </div>
                <button class="buy-btn" data-buy="${item.name}">+</Button>
    </div>`
})

document.addEventListener('click', (e) => {
    if(e.target.dataset.buy){
        addToCart(e.target.dataset.buy)
    }
    if(e.target.dataset.remove){
        removeFromCart(e.target.dataset.remove)
    }
     renderShoppingCart()  
});


function addToCart(menuItem){
    const selectedItem = menuArray.find(item => item.name == menuItem)
    if (shoppingArray.includes(selectedItem)){
        selectedItem.quantity++
    }
    else {
            shoppingArray.push(selectedItem)
            selectedItem.quantity = 1
    }
    price += selectedItem.price
}

function removeFromCart(itemToRemove) {
    shoppingArray = shoppingArray.map(item => {
        if (item.name === itemToRemove) {
            item.quantity--;
            price -= item.price
            if (item.quantity === 0) {
                return null; // filtered out in the next step
            }
        }
        return item;
    });
    shoppingArray = shoppingArray.filter(item => item !== null);

    renderShoppingCart();
}


function renderShoppingCart() {
    shoppingCartDiv.innerHTML = '';
    shoppingArray.forEach(item =>{
        const cartItemDiv = document.createElement('div')
        cartItemDiv.classList.add("cart-item")
        cartItemDiv.innerHTML = `
        <div class='cart-item-desc'>
            <h2>${item.name} x ${item.quantity}</h2>
                 <button class="remove-btn" data-remove="${item.name}">remove</button>
        </div>
        <div class=>$${item.price * item.quantity}</div>
        `
        shoppingCartDiv.appendChild(cartItemDiv)
    })
    
    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.classList.add('total-price');
    
    if (shoppingArray.length){
    totalPriceDiv.textContent = `Total Price: $${price}`;
    shoppingCartDiv.appendChild(totalPriceDiv);
    
      const checkoutButton = document.createElement('button');
        checkoutButton.textContent = 'Complete Order';
        checkoutButton.classList.add('checkout-btn');
        checkoutButton.addEventListener('click', handleCheckout);
        shoppingCartDiv.appendChild(checkoutButton);
    }
    else{
        totalPriceDiv.innerHTML = ''
    }   
}

function handleCheckout(){
  modal.style.display = 'inline'
  const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => button.classList.add('disabled-btn'));
}

modalCloseButton.addEventListener('click', () => {
    modal.style.display = 'none';
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => button.classList.remove('disabled-btn'));
});

payForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    modal.innerHTML = `
        <div class="delivery-div">
            <img class="delivery-img" src="/delivery.gif">
            <h2>Your delivery is on the way!</h2>
        </div>
    `;
});


