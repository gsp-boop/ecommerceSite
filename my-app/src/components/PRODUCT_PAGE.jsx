import React from "react";
import "../style/gallery.css";
import Cart from "./Cart";
import { PRODUCTS_URL, HEADERS } from "../utils/data";
import CODING_PRODUCTS from "../utils/CommerceAPI";

const GALLERY_API = new CODING_PRODUCTS;
class PRODUCT_PAGE extends React.Component {
  state = {
    gallery: [],
    loading: false,
    error: false,
    cart: [],
    showCart: false,
    showNav: false,
  };

  async componentDidMount() {
    this.setState({loading: true })

    GALLERY_API.fetchProducts().then((res) => {
      console.log(res.resp.ok)
      if (res && res.resp.ok){
        this.setState({
          gallery: res.gallery,
          loading: false,
        });
      } else {
        this.setState({ loading: false })
      }
    }, (err) => {
      console.log(err);
      this.setState({
        loading: false,
        error: true,
      })
     })
  }

  addToCart = (item) => {
    const findingRepeat = (arr) => {
      return arr.some((elem) => elem.name === item.name);
    };

    if (this.state.cart.length > 0) {
      if (findingRepeat(this.state.cart)) {
        const index = this.state.cart.findIndex(
          (elem) => elem.name === item.name
        );
        let newArr = [...this.state.cart];
        newArr[index] = {
          ...newArr[index],
          count: this.state.cart[index].count + 1,
        };
        this.setState({ cart: newArr });
      } else {
        this.setState((state) => ({
          cart: [...state.cart, item],
        }));
      }
    } else {
      this.setState((state) => ({
        cart: [...state.cart, item],
      }));
    }
  };

  removeOne = (item) => {
    const findingRepeat = (arr) => {
      return arr.some((elem) => elem.name === item.name);
    };
    if (findingRepeat(this.state.cart)) {
      const index = this.state.cart.findIndex(
        (elem) => elem.name === item.name
      );
      let newArr = [...this.state.cart];
      if (newArr[index].count > 1) {
        newArr[index] = {
          ...newArr[index],
          count: this.state.cart[index].count - 1,
        };
        this.setState({ cart: newArr });
      } else {
        newArr[index] = { ...newArr[index], count: 1 };
        this.setState({ cart: newArr });
      }
    } else {
      this.setState((state) => ({
        cart: [...state.cart, item],
      }));
    }
  };

  removeFromCart = (item) => {
    const index = this.state.cart.findIndex((elem) => elem.name === item.name);
    let newArr = [...this.state.cart];
    newArr.splice(index, 1);
    this.setState({ cart: newArr });
  };

  goToCart = () => {
    this.setState({ showCart: true });
  };

  toGallery = () => {
    this.setState({ showCart: false });
  };

  showNav = () => {
    this.setState({ showNav: !this.state.showNav });
  };

  render() {
    const { cart, showCart, gallery, loading, error } = this.state;
    const { toHome } = this.props;
    const cartcount = cart.reduce((prev, curr) => {
      return prev + curr.count;
    }, 0);

    return (
      <div>
        <nav className="container-fluid p-3 bg-light">
          <div className="d-flex justify-content-between">
            <div className="navbar-brand">
              <span className="h2">Code Commerce</span>
            </div>
            <ul className="navbar-nav justify-content-around my-navbar">
              <li className="nav-item ml-1">
                <button className="btn btn-primary" onClick={this.toGallery}>
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={this.goToCart}>
                  Cart
                </button>
              </li>
              <li className="nav-item">
                <button onClick={this.props.toHome} className="btn btn-primary">Sign Out</button>
              </li>
              <li className="nav-item cart-count">
                <span>{cartcount}</span>
              </li>
            </ul>
          </div>
        </nav>

        <div className={!showCart ? "gallery-container mt-5 mb-5 container" : "hide"}>

          { !loading ? 
          gallery.map((item, i) => (
            <div className="gallery-item" key={item.id}>
              <div className="">
                <div className="img-container">
                  <img src={item.img} alt="" />
                </div>
                <div className="d-flex justify-content-between mt-3 mb-3">
                  <p className="h5">{item.name}</p>
                  <p className="text-secondary h5">{item.price}$</p>
                </div>
                <button 
                  className="btn btn-success btn-md my-btn"
                  onClick={() =>
                    this.addToCart({
                      price: item.raw_price,
                      name: item.name,
                      count: item.count,
                      img: item.img,
                    })
                  }
                >
                  Add to cart
                </button>
              </div>
            </div>
          )):
          <p>Loading...</p>
          }
        </div>
        {showCart ? (
          <Cart
            toHome={toHome}
            cart={cart}
            addInCart={this.addToCart}
            removeOne={this.removeOne}
            removeItem={this.removeFromCart}
          />
        ) : null}
        {error && <p>Error Loading</p>}
      </div>
    );
  }
}
export default PRODUCT_PAGE;
