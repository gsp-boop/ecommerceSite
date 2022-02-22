import React from "react";
import { addressCheck, nameCheck, phoneNumberCheck, textValidation, zipCheck } from "../../jsFolder/AccountValidation";
import CardInfo from "../CreditCardComps/CardInfo";
import ShippingInputs from "./ShippngInputs";
import '../../style/shippingAddress.css'

const INIT_ADDRESS = {
            fullName: '',
            zip: '',
            address: '',
            phoneNumber: '',
            city: '',
}

class Shipping extends React.Component {
    constructor(props){
        super(props);
        this.sub = this.props.subTotal;
        this.state = {
            shippingData: INIT_ADDRESS,
            toCardInfo: false,
            maxLength: 14,
            error: {},
        }
        
    }

    handleValidation = (type, value) => {
      let errorText;

      switch(type) {
        case 'address':
          errorText = addressCheck(value);
          this.setState((prevState) => ({ error: {...prevState.error, addressError: errorText}}));
        break;
        case 'city':
          errorText = textValidation(value);
          this.setState((prevState) => ({ error: {...prevState.error, cityError: errorText}}));
          break;
        case 'zip':
          errorText = zipCheck(value);
          this.setState((prevState) => ({ error: {...prevState.error, zipError: errorText}}));
          break;
        case 'fullName':
          errorText = nameCheck(value);
          this.setState((prevState) => ({ error: {...prevState.error, fullNameError: errorText}}))
          break;
        
        case 'phoneNumber':
          errorText = phoneNumberCheck(value);
          this.setState((prevState) => ({ error: {...prevState.error, phoneNumberError: errorText}}))
          break;
        
      }
    }

    handleBlur = ({target: {name,value}}) => this.handleValidation(name, value)


    handleInputs = ({target: {name, value}}) => {
      console.log(name)
      if(name === 'phoneNumber'){
        let cleaned = ('' + value).replace(/\D/g, '');
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if(match){
        match = '(' + match[1] + ') ' + match[2] + '-' + match[3];
        setTimeout(() => {
          this.setState((prevState) => ({
            shippingData : {
              ...prevState.shippingData,
              [name]: match,
            }
          }))
        },100)

      } else {
        this.setState((prevState) => ({
          shippingData: {
            ...prevState.shippingData,
            [name]: value,
          }
        }))
      }
      }
      this.setState((prevState) => ({
        shippingData: {
          ...prevState.shippingData,
          [name]: value,
        }
      }))
    }

    checkForErrors = () => {
      const {shippingData} = this.state;
      let errorValue = {};
      let isError = false;
      Object.keys(shippingData).forEach((val) => {
        if(!shippingData[val].length){
          errorValue= { ...errorValue, [`${val}Error`]: 'Required'};
          isError = true;
          console.log(val)
        } 
      })
      this.setState({ error: errorValue })
      return isError
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const errorCheck = this.checkForErrors();
      console.log(errorCheck)
      if(errorCheck){
        this.setState({
          shippingData: INIT_ADDRESS,
        })
      } else if( !errorCheck ){
          this.setState({
            toCardInfo: true, 
        })
      }

    }


  render() {
    const { toCardInfo, maxLength } = this.state;
    const { cart, subTotal } = this.props;

    const shippingInputs = [
      {label: 'Name', name: 'fullName', type: 'text', error: 'fullNameError'},
      {label: 'City', name: 'city', type: 'text', error: 'cityError'},
      {label: 'State', name: 'state', type: 'text', error: ''},
      {label: 'Street Address', name: 'address', type: 'text', error: 'addressError'},
      {label: 'Zip Code', name: 'zip', type: 'text', error: 'zipError'},
      {label: 'Phone Number', name: 'phoneNumber', type: 'text', error: 'phoneNumberError'},
    ];

    const {toHome} = this.props;
    const {shippingData, error} = this.state;

    return (
      <div>
        {toCardInfo? <CardInfo toHome={toHome} subTotal={subTotal} cart={cart} /> :
        <div className="form-control my-form">
          <p className="h2 text-center mt-3 mb-3">Shipping Adress</p>
          <form className="shipping-form">
            {
              shippingInputs.length ? 
              shippingInputs.map((item) => (
                <ShippingInputs
                  name={item.name}
                  value={shippingData && shippingData[item.name]}
                  placeholder={item.label}
                  type={item.type}
                  onChange={this.handleInputs}
                  autoComplete="off"
                  maxLength={item.name === 'phoneNumber' ? maxLength : null}
                  onBlur={this.handleBlur}
                  error={error}
                  isStates={item.name === 'state'}
                  errorM={
                    (error
                      && error[item.error]
                      && error[item.error].length > 1)
                      ? error[item.error]
                      : null
                  }
                />
              )) : null
            }
            <input className="btn btn-secondary" onClick={this.handleSubmit} type='submit' value='submit' />
          </form>
        </div>
        }
      </div>
    );
  }
}
export default Shipping;
