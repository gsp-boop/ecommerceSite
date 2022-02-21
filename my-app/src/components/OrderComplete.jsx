import React from "react";

class OrderComplete extends React.Component {

    backToHome = () => {
      return this.props.toHome()
    }
    render(){
        return (
            <div>
                Order Complete!
                <button onClick={this.backToHome}>Place new order</button>
            </div>
        )
    }
}

export default OrderComplete;