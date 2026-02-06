/* ---------- PRODUCTS ---------- */
const products = Array.from({length:120}, (_,i)=>({
  id:i+1,
  name:`Sports Product ${i+1}`,
  sport:["Cricket","Football","Gym","Running"][i%4],
  price:500 + (i%10)*300,
  image:`images/p${(i%4)+1}.png`,
  qty:1
}));

localStorage.setItem("products", JSON.stringify(products));

/* ---------- RENDER GRID ---------- */
function renderProducts(list){
  const box = document.getElementById("products");
  if(!box) return;

  box.innerHTML = list.map(p=>`
    <div class="product-card" onclick="openProduct(${p.id})">
      <img src="${p.image}">
      <h5>${p.name}</h5>
      <div class="price">₹${p.price}</div>
    </div>
  `).join("");
}

/* ---------- FILTERS ---------- */
function filterSport(s){
  renderProducts(products.filter(p=>p.sport===s));
}

function filterPrice(max){
  renderProducts(products.filter(p=>p.price<=max));
}

/* ---------- PRODUCT PAGE ---------- */
function openProduct(id){
  localStorage.setItem("currentProduct", id);
  location.href="product.html";
}

function loadProduct(){
  const id = localStorage.getItem("currentProduct");
  if(!id) return;

  const p = products.find(x=>x.id==id);
  document.getElementById("title").innerText = p.name;
  document.getElementById("price").innerText = "₹"+p.price;
  document.getElementById("img").src = p.image;
}

/* ---------- CART ---------- */
let cart = JSON.parse(localStorage.getItem("cart"))||[];

function addToCart(){
  const id = localStorage.getItem("currentProduct");
  const p = products.find(x=>x.id==id);
  cart.push(p);
  localStorage.setItem("cart",JSON.stringify(cart));
  alert("Added to cart");
}

renderProducts(products);
