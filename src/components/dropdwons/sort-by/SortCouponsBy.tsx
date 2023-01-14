import { useDispatch, useSelector } from 'react-redux';
import { CouponParametersForSearch } from '../../../enums/CouponParamters';
import { ActionType } from '../../../redux/action-type';
import './../GenericDropdown.css'


function SortCouponBy() {

    const dispatch = useDispatch();

    function onSelected(event: any) {
        dispatch({ type: ActionType.ChangedCouponParameterFoerSort, payload: event.target.innerText });
        let element = document.getElementsByClassName("selected-sort-button");

        if (element.length > 0) {
            element[0].className = "button";
        }
        event.target.className = "selected-sort-button";
    }

    function removingIrrelevantParameters(parameter:string){
        if(parameter != "company" && parameter != "category" && parameter != "minPrice" && parameter != "maxPrice"){
            return true;
        }
        return false;
    }
    return (
        <div className="dropdown">
            <button className="dropbtn">Sort By</button>
            <div className="dropdown-content">
                {(Object.keys(CouponParametersForSearch)).filter((parameter) => isNaN(Number(parameter))).filter((parameter)=>removingIrrelevantParameters(parameter)).map((parameter, index) => (<p className='button' key={index} onClick={onSelected}>{parameter}</p>))}
            </div>
        </div>
    )



}
export default SortCouponBy