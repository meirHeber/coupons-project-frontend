import { getValue } from '@testing-library/user-event/dist/utils';
import React from 'react';
import { useDispatch } from 'react-redux';
import { CouponParametersForSearch } from '../../../enums/CouponParamters';
import { ActionType } from '../../../redux/action-type';
import './../GenericDropdown.css'


function SearchCouponBy() {

    const dispatch = useDispatch();


    function onSelected(event: any) {
        dispatch({ type: ActionType.ChangedCouponParameterFoerSearch, payload: event.target.innerText });
        let element = document.getElementsByClassName("selected-search-button");
        
        if (element.length > 0){
            element[0].className = "button";
        }
        event.target.className="selected-search-button";
    }
    function removingIrrelevantParameters(parameter:any){
        return true;
    }
    return (
        <div className="dropdown">
            <button className="dropbtn">Search By</button>
            <div className="dropdown-content">
                {Object.values(CouponParametersForSearch).filter((parameter)=> isNaN(Number(parameter))).filter((parameter)=>removingIrrelevantParameters(parameter)).map((parameter, index) =>(<p className='button' key={index} onClick={onSelected}>{parameter}</p>))}
            </div>
        </div>)

}
export default SearchCouponBy;

// export enum CouponParametersForSearch  {
//     company = "company name",
//     category = "category name",
//     // id,
//     title = "title",
//     description = "description",
//     //startDate,
//     // endDateBefore = "end date before",
//     amount = "amount",
//     maxPrice = "price up to",
//    minPrice = "price from",
//    price = ""
// }
