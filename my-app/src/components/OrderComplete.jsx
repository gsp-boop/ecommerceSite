import React from "react";

class OrderComplete extends React.Component {

    backToHome = () => {
      return this.props.toHome()
    }
    render(){
        return (
            <div>
                <p className="h1 text-center mt-3">
                     Order Complete!
                </p>
                <div className="d-flex justity justify-content-center mt-4">
                    <button className="btn btn-success" onClick={this.backToHome}>Place new order</button>
                </div>
            </div>
        )
    }
}

export default OrderComplete;