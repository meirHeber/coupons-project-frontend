import React from 'react'
import { FaStore } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { ICompany } from '../../models/ICompany'
import { ActionType } from '../../redux/action-type';
import GenericCompanyCategoryCard from '../company-and-category-card/GenericCompanyCategoryCard'


export interface IProps {
    company: ICompany;
}

function CompanyCard(props: IProps) {
    
    const dispatch = useDispatch();


    function deleteIt(id: number) {
        console.log("delete it from function. id: " + id);
    }

    return (
        <GenericCompanyCategoryCard
            key={props.company.id}
            htmlBody={<div>
                <p><b>name: </b>{props.company.name}</p>
                <p><b>address: </b>{props.company.address}</p>
                <p><b>phone number: </b>{props.company.phoneNumber}</p>

            </div>}
            icon={<FaStore/>}
            onDeleteClick={() => dispatch({ type: ActionType.SelectedCompanyForDelete, payload: props.company.id })}
            onEditClick={() => dispatch({ type: ActionType.SelectedCompanyForUpdate, payload: props.company.id })}
        />)
}

export default CompanyCard