import React from "react";
import Gallery from "../components/Gallery"
import { nameRgx, passwordCheck } from "../jsFolder/AccountValidation";
import "../style/createAcct.css"
class CreateAcct extends React.Component {
  constructor() {
    super();
    this.state = {
      inputFlag: false,
      showPass: false,
      password: "",
      passCheck: false,
      passmatch: false,
      passMsg: "",
      submit: true,
      fname: "",
      lastName: "",
      zip: "",
      nextPage: false,
    };
  }

  handleBtn = (e) => {
    const { submit, passCheck, inputFlag, fname, lastName, zip } = this.state;
    e.target.value.length > 4 &&
    !passCheck &&
    !inputFlag &&
    (fname.length > 1) & (lastName.length > 1)
      ? this.setState({ submit: false })
      : this.setState({ submit: true });
  };

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });

    if (name === "fname" || name === "lastName") {
      nameRgx(value)
        ? this.setState({ inputFlag: false, fname: value })
        : this.setState({ inputFlag: true });
    } else if (name === "password") {
      passwordCheck(value)
        ? this.setState({ passCheck: false, password: value })
        : this.setState({ passCheck: true });
    }
  };

  passMatch = (e) => {
    const notMatch = "Does not match";
    const { password } = this.state;
    password === e.target.value
      ? this.setState({ passMsg: "" })
      : this.setState({ passMsg: notMatch });
  };

  showPass = () => {
    const { showPass } = this.state;
    !showPass
      ? this.setState({ showPass: true })
      : this.setState({ showPass: false });
  };

  nextPage = () => {
    this.setState({ nextPage: true });
  };

  render() {
    const { inputFlag, showPass, passCheck, passMsg, submit, nextPage } =
      this.state;
    return (
      <div>
         { !nextPage ?
        <div className={nextPage ? "hide" : "createAcct"}>
          <h1>Welcome To Code Commerce!</h1>
          <p>Please Create Account</p>
          <div className="formContainer">
            <form>
              <div className="inputContainer">
                <label name="fname">First Name</label>
                <input
                  name="fname"
                  onChange={this.handleChange}
                  className={inputFlag ? "inputFlag" : null}
                  type="text"
                />
              </div>
              <div className="inputContainer">
                <label name="lastName">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  onChange={this.handleChange}
                  className={inputFlag ? "inputFlag" : null}
                />
              </div>
              <div className="inputContainer">
                <label>Password</label>
                <input
                  className={passCheck ? "inputFlag" : null}
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={this.handleChange}
                />
                <div className="showPass" style={{ display: "flex" }}>
                  <input type="checkbox" onClick={this.showPass} />
                  <label>Show Password</label>
                </div>
              </div>
              <div className="inputContainer">
                <label>Re-type Password</label>
                <input
                  type={showPass ? "text" : "password"}
                  onChange={this.passMatch}
                />
                <div>{passMsg}</div>
              </div>
              <div className="inputContainer">
                <label>Zipcode</label>
                <input
                  name="zip"
                  onChange={this.handleBtn}
                  maxLength="5"
                  type="text"
                />
              </div>
            </form>
            <button onClick={this.nextPage} disabled={submit}>
              Create Account
            </button>
          </div>
        </div> :

        <Gallery/>
        
        }
      </div>
    );
  }
}
export default CreateAcct;