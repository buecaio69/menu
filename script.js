const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

// abri o modal
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex"
})

// fechar o modal
cartModal.addEventListener("click", function(event) {
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event) {
    // console.log(event.target)

    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)

    }
})

//add no carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)
    
    if(existingItem){
        existingItem.quantity += 1;
    }else{
        cart.push({
            name, 
            price,
            quantity: 1,
        })
    }

    updateCartModal()
}

// att carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-medium">${item.name}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>

                <button class="remove-from-cart-btn" data-name="${item.name}">
                    Remover
                </button>
            
        </div>
        `

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}

cartItemsContainer.addEventListener("click", function (event) {
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestauranteOpen();
    if(!isOpen){
        Toastify({
            text: "Restaurante fechado no momento!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "#ef4444",
            },
        }).showToast();

        return;
    }

    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    const cartItems = cart.map((item) => {
        return (
            `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |` 
        )
    }).join("")

    const message = encodeURIComponent(cartItems)
    const phone = "11942935104"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value} CEP: ${addressInput.value} Bairro: ${addressInput.value} Cidade: ${addressInput.value}`, "_blank")

    cart = [];
    updateCartModal();
})

//horario de funcionamento Restaurante
function checkRestauranteOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 9 && hora < 14;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestauranteOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}

// CEP
const cepInput = document.getElementById('cep');

// Adicionando um evento de escuta para o campo de entrada do CEP
cepInput.addEventListener('change', () => {
    // Obtendo o valor do CEP digitado pelo usuário
    const cep = cepInput.value;

    // Verificando se o CEP tem o formato válido (opcional)
    const cepRegex = /^[0-9]{8}$/;
    if (!cepRegex.test(cep)) {
        alert('CEP inválido! O CEP deve conter apenas números e ter 8 dígitos.');
        return;
    }

    // Enviando uma solicitação para a API ViaCEP para obter os detalhes do endereço
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            // Preenchendo os campos de endereço com os dados recebidos da API
            document.getElementById('address').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
        })
        .catch(error => {
            console.error('Ocorreu um erro ao buscar os dados do endereço:', error);
            alert('Ocorreu um erro ao buscar os dados do endereço. Por favor, tente novamente.');
        });
});