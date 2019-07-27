window.onload = function() {
  const mobileMenuIcon = document.querySelector('.mobile-menu');
  const mobileMenuList = document.getElementById('mobileMenuList');
  const mobileHeader = document.querySelector('.page-header');

  mobileMenuIcon.addEventListener('click', function() {
    mobileMenuList.classList.toggle('mobile-navigation');
    mobileHeader.classList.toggle('page-header-margin-bottom');
  });
};

let ShoppingCart = () => {
  let products = JSON.parse(localStorage.getItem('Shopping_Cart'));
  return (
    <div>
      <a className="nav-link shopping-cart" href="checkout.html">
        <img
          src="img/shopping_cart_24px_black.png"
          alt="Shopping cart"
          width="100%"
          height="100%"
        />
        <div className="shoppind-cart-counter-box">
          <span className="shoppind-cart-counter">{products.length}</span>
        </div>
      </a>
    </div>
  );
};

const reactRoot = document.getElementById('reactRoot');

const Header = () => {
  return (
    <header className="page-header">
      <div className="page-container">
        <div className="header-content">
          <div className="mobile-menu animated rotateIn">
            <ul className="mobile-menu-burger">
              <li className="burger-item" />
              <li className="burger-item" />
              <li className="burger-item" />
            </ul>
          </div>
          <nav className="desktop-hidden mobile-hidden" id="mobileMenuList">
            <a className="mobile-nav-link" href="#">
              Models
            </a>
            <a className="mobile-nav-link" href="#">
              consulting
            </a>
            <a className="mobile-nav-link" href="#">
              about
            </a>
            <a className="mobile-nav-link" href="#">
              blog
            </a>
          </nav>
          <a href="#" className="project-main-link">
            <div className="project-name-box">
              <img
                src="img/logo_header.png"
                alt="Logo"
                width="40px"
                height="40px"
              />
              <span className="project-name mobile-hidden">PROJECT NAME</span>
            </div>
          </a>
          <nav className="navigation mobile-hidden">
            <a className="nav-link" href="#">
              Models
            </a>
            <a className="nav-link" href="#">
              consulting
            </a>
            <a className="nav-link" href="#">
              about
            </a>
            <a className="nav-link" href="#">
              blog
            </a>
            <ShoppingCart />
          </nav>
        </div>
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="page-container">
        <div className="footer-flex-parent">
          <a href="#" className="project-main-link">
            <div className="footer-logo-box">
              <div className="footer-logo" />
              <span>PROJECT NAME</span>
            </div>
          </a>
          <div className="footer-navigation-box">
            <nav className="footer-nav-box">
              <a className="footer-nav-link" href="#">
                MODELES
              </a>
              <a className="footer-nav-link" href="#">
                CONSULTING
              </a>
              <a className="footer-nav-link" href="#">
                ABOUT
              </a>
              <a className="footer-nav-link" href="#">
                BLOG
              </a>
              <a className="footer-nav-link" href="#">
                LEGAL
              </a>
            </nav>
            <div className="footer-contacts">
              <div className="footer-adress">
                <div className="place-icon-box">
                  <img
                    src="img/place_24px.png"
                    alt="Place"
                    width="100%"
                    height="100%"
                  />
                </div>
                <p>P.O. Box XXXX, Fairfield, CT 06815</p>
              </div>
              <div className="footer-telephone">
                <div className="telephone-icon-box">
                  <img
                    src="img/phone_24px.png"
                    alt="Telephone"
                    width="100%"
                    height="100%"
                  />
                </div>
                <p>(203) xxx-5555</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PageContent = () => {
  return (
    <section className="main-box">
      <div className="page-container">
        <div className="head-and-search-flex-parent">
          <div className="main-heading-box">
            <h2 className="page-heading">Articles</h2>
          </div>
          <div className="search-box">
            <form method="GET" action="" className="search-form">
              <input
                type="search"
                placeholder="Search"
                name="Search"
                className="blog-search"
                id="blogSearch"
              />
              <button type="submit" className="search-button">
                <img
                  src="img/search_24px.png"
                  alt="search"
                  width="24px"
                  height="24px"
                />
              </button>
            </form>
          </div>
        </div>
        <CheckoutItemsList />
        <div className="pay-btn-box">
          <button className="pay-btn">pay now</button>
        </div>
      </div>
    </section>
  );
};

class CheckoutItemsList extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    const shopCartProducts = JSON.parse(localStorage.getItem('Shopping_Cart'));
    console.log(shopCartProducts);
    fetch('store_jsons/cart.json')
      .then(response => response.json())
      .then(goods => {
        const filteredProducts = goods.filter(item => {
          if (shopCartProducts.includes(item.id)) return true;
        });
        this.setState({ products: filteredProducts });
        return filteredProducts;
      });
  }

  handleClick(id) {
    console.log('click', id);
    const p1 = this.state.products.filter(item => item.id !== id);
    this.setState({ products: p1 });
  }

  getProducts() {
    return this.state.products.map(item => {
      return (
        <CheckoutItem
          key={item.id}
          product={item}
          onClick={this.handleClick.bind(this)}
        />
      );
    });
  }

  render() {
    return <ul className="blog-articles-list">{this.getProducts()}</ul>;
  }
}

const CheckoutItem = props => {
  const item = props.product;
  const onClick = props.onClick;
  const handleRemove = e => {
    e.preventDefault();
    onClick(item.id);
  };
  return (
    <li className="blog-articles-item">
      <a href="#" className="blog-articles-link">
        <div className="store-item-heading-box">
          <button onClick={handleRemove} className="remove-btn">
            remove
          </button>
        </div>
        <div className="store-item-main-content no-top-border">
          <div className="store-item-img-box">
            <img className="store-item-img" src={item.image} alt="" />
          </div>
          <p className="store-goods-name">{item.name}</p>
        </div>
        <div className="store-item-price-box">
          <h3 className="store-item-price">price</h3>
        </div>
      </a>
    </li>
  );
};

const App = () => {
  return (
    <div className="react-wrapper">
      <Header />
      <PageContent />
      <Footer />
    </div>
  );
};

ReactDOM.render(<App />, reactRoot);
