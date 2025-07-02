import React from 'react'

const Button = ({
    ButtonStyle, TextStyle, Text = "Button", Click
}) => {
    return (
        <div className={ButtonStyle} style={{ cursor: "pointer", minWidth: "70px", minHeight: "30px", display: "flex", justifyContent: "center", alignItems: 'center' }} onClick={Click} >
            <span className={TextStyle} style={{ backgroundColor: 'transparent' }} >{Text}</span>
        </div>
    )
}

export default Button