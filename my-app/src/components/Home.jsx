import React from "react";
import '../style/Home.css'
import CreateAcct from "./CreateAcct";
import PRODUCT_PAGE from "./PRODUCT_PAGE";

class Home extends React.Component {
  state = {
    userName: "appleguy@gmail.com",
    password: "Pizza123!",
    toGallery: false,
    toCreateAcct: false,
    signIn: true,
    email: "",
    pass: "",
  };


  inputCaptcher = (e) => {
    const val = e.target.value;
    const type = e.target.type;

    type === "password"
      ? this.setState({
          pass: val,
        })
      : this.setState({
          email: val,
        });
  };

  signIn = (e) => {
    e.preventDefault();
    const { password, userName, email, pass } = this.state;

    password === pass && userName === email
      ? this.setState({ toGallery: true, signIn: false })
      : this.setState({ toGallery: false, signIn: true });
  };

  createAcct = () => {
    this.setState({ toCreateAcct: true, signIn: false });
  };

  toHome = () => this.setState({toGallery: false, signIn: true})

  render() {
    const { toGallery, toCreateAcct, signIn } = this.state;
 
    return (
      <div>
    { !toCreateAcct && signIn ?
      
      <div className="center-content container-sm">
        <h1 className="text-center">Code Commerce</h1>
        <form style={{width: '500px', margin: '0 auto', paddingTop: "100px"}}>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-labell" id="email" name="email">Email</label>
          <div className="col-sm-10">
              <input className="form-control" onChange={this.inputCaptcher} type="email" name="email" />
            </div>
          </div>

        <div className="row mb-3">
            <label className="col-sm-2 col-form-label" htmlFor="password">Password</label>
          <div className="col-sm-10">
            <input className="form-control" onChange={this.inputCaptcher} type="password" />
          </div>
        </div>

      <div className="btn-container d-flex justify-content-sm-evenly">
          <button className="btn btn-primary" onClick={this.signIn}>Sign-in</button>
          <button className="btn btn-secondary" onClick={this.createAcct}>Create Account</button>
      </div>
        </form>
      </div>

        :
        null 
    }
        {toCreateAcct ? <CreateAcct toHome={this.toHome}/> : null}
        {toGallery ? <PRODUCT_PAGE toHome={this.toHome} /> : null}
      </div>
    );
  }
}
export default Home;
