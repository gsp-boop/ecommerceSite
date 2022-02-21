import React from "react";
import { CARD, CARDICON } from "../../jsFolder/Cardicon";

const InputBase = ({ errorM, error, cardType, isCard, ...props }) => (
  <label>
    <input {...props} />
    {errorM && <div className="input-error">{errorM}</div>}
    {(!error || !error.cardError) && isCard && CARD.includes(cardType) && (
        <img 
            src={CARDICON[cardType]} 
            alt="card" />
    )}
  </label>
);
export default InputBase;
