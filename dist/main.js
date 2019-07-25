!(function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function(t) {
              return e[t];
            }.bind(null, o),
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 0));
})([
  function(e, t, n) {
    'use strict';
    n.r(t);
    n(1);
    console.log("This is a project's main page.");
  },
  function(e, t) {},
]);

const spinner = document.getElementById('Spinner');
const store = document.getElementById('reactRoot');

function runSpinner() {
  return spinner.classList.remove('loaded');
}

function stopSpinner() {
  return spinner.classList.add('loaded');
}

let pageIsLoad = false;
let currentPage;

const createStoreItems = function(arr) {
  let items = '';
  arr.forEach(item => {
    items =
      items +
      `<li class="blog-articles-item" id=${item.id}>
        <a href="#" class="blog-articles-link">
          <div class="store-item-heading-box">
            <h3 class="store-item-heading">${item.status}</h3>
          </div>
          <div class="store-item-main-content">
            <div class="store-item-img-box">
              <img class="store-item-img" src=${item.image} alt="">
            </div>
            <p class="store-goods-name">${item.name}</p>
          </div>
          <div class="store-item-price-box">
            <h3 class="store-item-price">${item.price}</h3>
          </div>
        </a>
      </li>`;
  });
  return items;
};

const renderStoreItems = function(products) {
  return store.insertAdjacentHTML('beforeend', createStoreItems(products));
};

const handler = e => {
  e.preventDefault();
  console.log(e.currentTarget.id);
  let shopCartArray = [];
  let shopCartString = localStorage.getItem("Shopping_Cart");
  if (shopCartString) {
    shopCartArray = JSON.parse(shopCartString);
  }
  shopCartArray.push(e.currentTarget.id);
  localStorage.setItem("Shopping_Cart", JSON.stringify(shopCartArray));
};

const loadProducts = pageNumber => {
  pageIsLoad = true;
  runSpinner();
  setTimeout(() => {
    fetch(`store_jsons/goods_${pageNumber}_part.json`)
      .then(response => response.json())
      .then(goods => {
        renderStoreItems(goods);
        const items = document.querySelectorAll('.blog-articles-item');
        items.forEach(item => {
          item.removeEventListener('click', handler);
          item.addEventListener('click', handler);
        });
        stopSpinner();
        pageIsLoad = false;
        currentPage = pageNumber;
      });
  }, 1000);
};

window.onload = () => {
  loadProducts(1);
};

window.onscroll = () => {
  if (pageIsLoad) {
    return;
  }
  const browserHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0,
  );
  const currentScroll = document.documentElement.scrollTop;
  const maxScrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );
  const difference = maxScrollHeight - currentScroll - browserHeight;
  if (difference < 200) {
    loadProducts(currentPage + 1);
  }
};

let ShoppingCart = () => {
  let products = JSON.parse(localStorage.getItem("Shopping_Cart"));
  return (
    <div>
      <a className="nav-link shopping-cart" href="checkout.html">
        <img src="img/shopping_cart_24px_black.png" alt="Shopping cart" width="100%" height="100%" />
        <div className="shoppind-cart-counter-box">
          <span className="shoppind-cart-counter">{products.length}</span>
        </div>
      </a>
    </div>
  )
}


ReactDOM.render(
  <ShoppingCart />,
  document.getElementById('shopping_cart_root')
);
