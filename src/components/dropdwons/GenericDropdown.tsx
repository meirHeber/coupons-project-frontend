import React from 'react'
import { EnumType } from 'typescript'
import { IDropdown } from '../../models/IDropdown';
import './GenericDropdown.css'

function GenericDropdown(props: IDropdown) {
    return (
        <div className="dropdown">
            <button className="dropbtn">{props.textOnButton}</button>
            <div className="dropdown-content">
                {(Object.keys(props.parameters)).filter((parameter)=> isNaN(Number(parameter))).map((parameter, index) =>(<p key={index} onClick={props.onClick()}>{parameter}</p>))}
            </div>
        </div>)
}

export default GenericDropdown