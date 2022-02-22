import React from "react";
import { cardExpValidation, cardNumberValidation, cvvValidation, textValidation } from "../../jsFolder/AccountValidation";
import { OTHERCARDS } from "../../jsFolder/Cardicon";
import OrderComplete from "../OrderComplete";
import InputBase from "./InputBase";
import '../../style/card.css'

const INIT_CARD = {
    card: '',
    cardHolder: '',
    exp: '',
    cvv: '',
    // securityCode: '',
}

class CardInfo extends React.Component {
    constructor(){
        super();
        this.state = {
            cardData: INIT_CARD,
            maxLength: OTHERCARDS.length,
            error: {},
            cardType: null,
            orderComplete: false,
        }
    }

    findDebitCardType = (cardNumber) => {
        const regexPattern = {
            MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
            VISA: /^4[0-9]{2,}$/, 
            AMEX: /^3[47][0-9]{5,}$/,
            DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
        }
        for (const card in regexPattern){
            if(cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
        }
        return '';
    }

    handleValidation = (type, value) => {

        let errorText;

        switch(type){
            case 'card':
                errorText = cardNumberValidation(value);
                this.setState((prevState) => ({
                    cardType: this.findDebitCardType(value),
                    error: {
                        ...prevState.error, 
                        cardError: errorText,
                    },
                })) 
                break;
            case 'cardHolder':
                errorText = textValidation(value);
                this.setState((prevState) => ({ error: {...prevState.error, cardHolderError: errorText }}))
                break;
            case 'exp':
                errorText = cardExpValidation(value);
                this.setState((prevState) => ({ error: {...prevState.error, expError: errorText }}))               
                break;
            case 'cvv':
                errorText = cvvValidation(3, value);
                this.setState((prevState) => ({ error: {...prevState.error, cvvError: errorText }}))                
                break;
            default:
                break;
        }
    }

    handleBlur = ({ target: {name, value}}) => this.handleValidation(name, value)

    handleInputData = ({ target: {name, value}}) => {
        if (name === 'card') {
            let mask = value.split(' ').join('')
            if (mask.length) {
                mask = mask.match( new RegExp('.{1,4}', 'g')).join(' ');
                this.setState((prevState) => ({
                    cardData: {
                        ...prevState.cardData,
                        [name]: mask,
                    },
                })); 
            } else {
                this.setState((prevState) => ({
                    cardData: {
                        ...prevState.cardData,
                        [name]: value,
                    }
                }))
            }
        } else {
            this.setState((prevState) => ({
                cardData: {
                    ...prevState.cardData,
                    [name]: value,
                }
            }));
        }

    }

    checkErrorBeforeSave = () => {
        const {cardData} = this.state;
        let errorValue = {};
        let isError = false;
        Object.keys(cardData).forEach((val) => {
            if (!cardData[val].length){
                errorValue = {...errorValue, [`${val}Error`]: 'Required'}
                isError = true;
            } else {
                this.setState({ orderComplete: true })
            }
            console.log(val)
        })
        this.setState({ error: errorValue, })
        return isError;
    }

    handleAddCard = (e) => {
        e.preventDefault();
        const errorCheck = this.checkErrorBeforeSave();
        if (errorCheck){
            this.setState({
                cardData: INIT_CARD,
                cardType: '',
            })
        }
    }

    render(){
        const {cardData, maxLength, error, cardType, orderComplete} = this.state;
        const {cart, subTotal, toHome} = this.props;
        
        const inputData = [
            { label: 'Card Number', name: 'card', type: 'text', error: 'cardError'},
            { label: 'CardHolder\'s Name', name: 'cardHolder', type: 'text', error: 'cardHolderError'},
            { label: 'Exp Date (MM/YY)', name: 'exp', type: 'text', error: 'expError'},
            { label: 'Security Code', name: 'cvv', type: 'text', error: 'cvvError'},
        ]
        return (
            <div className="container my-card-form">  
            {  !orderComplete ?
              <div className="card-form-container">
                <h1>Credit Card info</h1>
                <div className="flex-group">
                    <form className="form-group" onSubmit={this.handleAddCard}>
                        {inputData.length ? inputData.map((item) => (
                            <InputBase
                            placeholder={item.label}
                            type={item.type}
                            value={cardData && cardData[item.name]}
                            onChange={this.handleInputData}
                            autoComplete="off"
                            maxLength={maxLength}
                            name={item.name}
                            onBlur={this.handleBlur}
                            error={error}
                            isCard={item.name === 'card'}
                            cardType={cardType}   
                            errorM={
                                (error
                                && error[item.error]
                                && error[item.error].length > 1)
                                ? error[item.error]
                                : null
                            }  
                        />
                        )) : null }
                        <div className="submit-btn ">
                        <InputBase 
                            type="submit" 
                            value="Submit Payment"
                            />
                        </div>
                    </form>
                    <div className="summary">
                        {
                            cart.map((item) => (
                                <div>
                                    <img className="cart-img" src={item.img} alt="" />
                                    <span>{item.name}  </span>
                                    <span>${item.price} x {item.count}</span>
                                </div>
                            ))
                        }
                        <span>Subtotal: ${subTotal}</span>
                    </div>

                </div>
            </div> : <OrderComplete toHome={toHome}/>
        }
        </div>
        )
    }
}

export default CardInfo;