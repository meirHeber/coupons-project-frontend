import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ICoupon } from '../../../models/ICoupon'
import { AppState } from '../../../redux/app-state';
import Button from '../../buttons/generic-button/Button';
import './CouponsContainer.css';
import SearchButton from '../../searchButton/SearchButton';
import CouponCard from '../coupon-card/CouponCard';
import MakePurchaseModal from '../../modals/make-purchase-modal/MakePurchaseModal';
import catchFunction from '../../../utils/catchFuncion';
import { UsersType } from '../../../enums/UsersType';


function CouponsContainer() {

    let [searchValueObject, setSearchValueObject]: any = useState(null);

    ///useSelectors====================================================================================================
    const [coupons, setCoupons] = useState<ICoupon[]>([]);
    const userType = useSelector((state: AppState) => state.userType);
    const searchBy = useSelector((state: AppState) => state.searchCouponsBy);
    const sortBy = useSelector((state: AppState) => state.sortCouponsBy);
    const couponForDelete = useSelector((state: AppState) => state.couponForDelete);
    const couponIdForBuy:ICoupon = useSelector((state: AppState) => state.couponForBuy);
    const couponForEdit = useSelector((state: AppState) => state.couponForUpdate);

    window.onerror = function(e:any){
        if(e.includes("NotFoundError:")){
            document.location.reload()
            return true;
        }
       
    }



    ///pageParameters====================================================================================================
    let [pageNumber, setPageNumber] = useState<number>(0);
    const quantityPerPage: number = 14;
    let onNextPageClicked = () => {
            pageNumber++;
            setPageNumber(pageNumber);
    }
    let onPreviousPageClicked = () => {
        if (pageNumber == 0) {
            return;
        }
        pageNumber--;
        setPageNumber(pageNumber);
    }

    ///searchParameters====================================================================================================
    let [searchValue, setSearchValue] = useState("");
    let [searchType, setSearchBy] = useState("text");
    const plachHolderForSearch = `search a ${searchBy} ...`;


    ///useEffecs=============================================================================================================
    useEffect(() => {
        if (searchValueObject != null) {
            searchValueObject.target.value = "";
            setSearchValue("");
        }
        if (searchBy == "amount" || searchBy == "price") {
            setSearchBy("number");
        }
        else {
            if (searchType != "text") {
                setSearchBy("text");
            }
        }
    }, [searchBy]);

    useEffect(() => {
        setPageNumber(0);
    }, [sortBy])
    

    useEffect(() => {
        getCouponsByPages();        
    }, [pageNumber, searchValue, sortBy, userType, couponIdForBuy, couponForDelete, couponForEdit]);

    ///getCoupons===========================================================================================================
    

    const getCouponsByPages = async () => {
        try {
            let response;
            if (userType == UsersType.company) {
                response = await axios.get(`http://localhost:8080/coupons/paginationAndFilterBySortForCompany`, { params: { searchBy, searchValue, pageNumber, quantityPerPage, sortBy } });
            }
            else {
                response = await axios.get(`http://localhost:8080/coupons/paginationAndFilterBySort`, { params: { searchBy, searchValue, pageNumber, quantityPerPage, sortBy } });
            }
            setCoupons(response.data) ;
            // dispatch({ type: ActionType.GetCouponsByPages, payload: serverRespons })
        }
        catch (error: any) {
            catchFunction(error);
        }
    }

    function onSearchChanged(event: any) {
        setSearchValue(event.target.value);
        setSearchValueObject(event);
    }

    ///component==============================================================================================================
    return (
        <div className='couponsContainer'>
            <MakePurchaseModal />
            <SearchButton searchType={searchType} plachHolderForSearch={plachHolderForSearch} onSearchChanged={onSearchChanged} />
            {coupons[0] != null && coupons.map(
                coupon => (
                    <CouponCard key={coupon.id} coupon={coupon} />
                ))}
            <div className='div-down-cards'>
                {coupons[0] == null && <p>No matching results</p>}
                {pageNumber != 0 && <Button className='page-transition-button' onButtenClicked={onPreviousPageClicked} buttenText='<Previous' />}
                {coupons[0] != null && "page " + (pageNumber + 1)}
                {coupons[quantityPerPage - 1] != null && <Button className='page-transition-button' onButtenClicked={onNextPageClicked} buttenText='next>' />}
            </div>
        </div>
    )
}

export default CouponsContainer;