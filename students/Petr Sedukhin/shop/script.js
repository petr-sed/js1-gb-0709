const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Microphone', 'Camera']
const prices = [1000, 200, 20, 10, 25, 10, 40]
const imgs = ['notebook.jpg', 'display.jpg', 'keyboard.jpg', 'mouse.jpg', 'phones.jpg', 'microphone.jpg', 'camera.jpg']
const ids = [45, 56, 67, 78, 89, 90, 101]
const products = createDTO ()
let cart = []

renderProds(products)

function createProduct (index) {
    return {
        id: ids [index],
        name: items [index],
        price: prices [index],
        img: imgs [index]
    }  
}

function createDTO () {
    let arr = []
    for (let i = 0; i < ids.length; i++) {
        arr.push (createProduct(i))
    }
    return arr
}

function renderProds() {
    htmlString = ''
    products.forEach(el => {
        htmlString += 
        `<div class = 'product-item'>
            <img src="img/${el.img}">
            <h2>${el.name}</h2>
            <p>price: ${el.price}</p>
            <button class="buy-btn" data-id = "${el.id}">Добавить в корзину</button>
        </div>`
    })
    document.querySelector('.products').innerHTML = htmlString
}

function renderCart() {
    htmlString = ''
    cart.forEach(el => {
        htmlString += 
        `<div class = 'product-item-cart'>
            <div class = "left-block">   
                <img src="img/${el.img}" >
                <h2>${el.name}</h2>
                <p>price: ${el.price}</p>
            </div>    
            <div class = "right-block">
                <button class="add-btn" data-id = "${el.id}">+</button>
                <p>${el.qty}</p>
                <button class="rem-btn" data-id = "${el.id}">-</button>
                <p>${el.ttlprc()}</p>
            </div>
        </div>`
    })
    if (cart.length > 0){
        htmlString +=  `<div class="total-sum">
                        Total sum:  ${calcSum ()} 
                    </div>`
    } 
    document.querySelector('.cart-block').innerHTML = htmlString  
}

function calcSum () {
    let sum = 0
    cart.forEach(el => {
        sum += el.ttlprc()
    })
    return sum
}

function searcheProduct (index) {
    return prod = products.find(el => {
        if(el.id == index)return el
    })
}

function searcheProductInCart(index) {
    return prod = cart.find(el => {
        if(el.id == index)return el
        else return false
    })
}

function createProdForCart(prod) {
    return {
        id: prod.id,
        name: prod.name,
        price: prod.price,
        img: prod.img,
        qty: 1,
        ttlprc: function(){
            return(+this.price*+this.qty)
        }
    } 
}

function addProductToCart (index){
    let prod = searcheProduct(index)
    let finder = searcheProductInCart(prod.id)
    if (finder!=undefined){
        finder.qty ++
    }else{
        cart.push(createProdForCart(prod))
    }
    renderCart()
}

function removeProductFromCart (index){
    let finder = searcheProductInCart(index)
    if (finder.qty > 1){
        finder.qty --
    }else{
        cart.splice(cart.indexOf(finder), 1)
    }
    renderCart()
}

//всплытие и захват событий
document.querySelector('.btn-cart').addEventListener ('click', function () {
    document.querySelector ('.cart-block').classList.toggle ('invisible')})
    
document.querySelector ('.products').addEventListener ('click', function (e) {
    if (e.target.classList.contains ('buy-btn')) {
        addProductToCart (+e.target.dataset ['id'])
    }
})

document.querySelector ('.cart-block').addEventListener ('click', function (e) {
    if (e.target.classList.contains ('add-btn')) {
        addProductToCart (+e.target.dataset ['id'])
    }
    if (e.target.classList.contains ('rem-btn')) {
        removeProductFromCart (+e.target.dataset ['id'])
    }
})
