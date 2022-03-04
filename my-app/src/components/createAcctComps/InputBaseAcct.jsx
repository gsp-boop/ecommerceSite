import React from "react";

const InputBaseAcct = ({label,...props}) => (
    <>
        <label htmlFor="">{label}</label>
        <input {...props} />

    </>
)

export default InputBaseAcct