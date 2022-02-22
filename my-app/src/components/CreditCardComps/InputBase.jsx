import React from "react";
import { CARD, CARDICON } from "../../jsFolder/Cardicon";
import '../../style/card.css'
const InputBase = ({ errorM, error, cardType, isCard, ...props }) => (
  <label className="card-label">
    <input className="form-control" {...props} />
    {errorM && <div className="input-error text-danger">{errorM}</div>}
    {(!error || !error.cardError) && isCard && CARD.includes(cardType) && (
        <img 
            className="card-img"
            src={CARDICON[cardType]} 
            alt="card" />
    )}
  </label>
);
export default InputBase;
