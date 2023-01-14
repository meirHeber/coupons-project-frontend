import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ErrorTypes } from '../../../enums/ErrorTypes';
import { ActionType } from '../../../redux/action-type';
import { AppState } from '../../../redux/app-state';
import catchFunction from '../../../utils/catchFuncion';
import deleteCategoryOrCompanyValidations from '../../../utils/validatons-utils/DeleteCategoryOrCompanyValidations';
import Button from '../../buttons/generic-button/Button';
import TextInput from '../../generic-utils-components/input-card/Text-input';
import InputLabel from '../../generic-utils-components/input-label/InputLabel';
import GenericModal from '../generic-modal/GenericModal'
import './AddCompanyModal.css'

function AddCompanyModal() {

    const isModalOpen:boolean = useSelector((state: AppState) => state.openAddCompanyModal)
    const companyIdForUpdate:number = useSelector((state: AppState) => state.companyIdForUpdate);
    const userType:string = useSelector((state: AppState) => state.userType);

    const dispatch = useDispatch();

    const [name, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    function closeModal() {
        dispatch({ type: ActionType.OpenAddCompnyModal, payload: false })
    }

    const onSave = async () => {
        try {
            addCompanyValidations();
            if (companyIdForUpdate == null) {               
                await axios.post("http://localhost:8080/companies",
                    { name, phoneNumber, address });
            }
            else {
                let id = companyIdForUpdate;
                await axios.put("http://localhost:8080/companies",
                    { id, name, phoneNumber, address });
            }
            closeModal()
        }
        catch (error: any) {
            catchFunction(error);
        };


        function addCompanyValidations() {
            deleteCategoryOrCompanyValidations(userType);
            if(!name || !phoneNumber || !address){
                throw new Error(ErrorTypes.MISSING_DATA);
            }
            if(name.length >10 || name.length <2){
                throw new Error("The name entered is invalid. Enter a name with between 2 and 10 letters");
            }
            if(address.length > 15 || address.length <5){
                throw new Error("The address entered is invalid. Enter a address with between 5 and 15 letters");
            }
            if(isNaN(+phoneNumber) || phoneNumber.length != 10){  
                throw new Error("Phone number is InValid, Please enter a valid phone number");
            }
        }
    }



    return (
        <GenericModal
            isOpen={isModalOpen}
            onAfterOpen={undefined}
            onRequestClose={undefined}
            closeModal={closeModal}
            insideHteml={

                <div className='add-company-modal-inside'>
                    {!companyIdForUpdate && <h1 className='text-over-input'>Add company</h1>}
                    {companyIdForUpdate && <h1 className='text-over-input'>Edit company</h1>}


                    <InputLabel labelText={'enter company name:'} className={''} />
                    <TextInput inputType='text' onInputChanged={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)} placeholder={'name . . .'} />
                    <InputLabel labelText={'enter company phone number:'} className={''} />
                    <TextInput inputType='text' onInputChanged={(event: ChangeEvent<HTMLInputElement>) => setPhoneNumber(event.target.value)} placeholder={'phone number . . .'} />
                    <InputLabel labelText={'enter company address:'} className={''} />
                    <TextInput inputType='text' onInputChanged={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)} placeholder={'address . . .'} />
                    <Button onButtenClicked={onSave} buttenText={'save'} />

                </div>



            } />
    )
}

export default AddCompanyModal

