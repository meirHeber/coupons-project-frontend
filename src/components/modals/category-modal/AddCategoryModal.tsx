import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../../redux/action-type';
import { AppState } from '../../../redux/app-state';
import catchFunction from '../../../utils/catchFuncion';
import deleteCategoryOrCompanyValidations from '../../../utils/validatons-utils/DeleteCategoryOrCompanyValidations';
import Button from '../../buttons/generic-button/Button';
import TextInput from '../../generic-utils-components/input-card/Text-input';
import InputLabel from '../../generic-utils-components/input-label/InputLabel';
import GenericModal from '../generic-modal/GenericModal'

function AddCategoryModal() {

    const isModalOpen:boolean = useSelector((state: AppState) => state.openAddCategoryModal);
    const categoryIdForUpdate:number = useSelector((state: AppState) => state.categoryIdForUpdate);
    const userType:string = useSelector((state: AppState)=>state.userType);

    const dispatch = useDispatch();

    const [name, setName] = useState<string>("");

    function closeModal() {
        dispatch({ type: ActionType.OpenAddCategoryModal, payload: false })
    }
    const onSave = async () => {
        AddCategoryValidations();
        try {
            if (!categoryIdForUpdate) {
                await axios.post("http://localhost:8080/categories",
                    { name });
            }
            else {
                let id = categoryIdForUpdate;
                await axios.put("http://localhost:8080/categories",
                    { id, name });
            }
            closeModal()
        }
        catch (error: any) {
            catchFunction(error);
        };
    }

    function AddCategoryValidations(){
        deleteCategoryOrCompanyValidations(userType);
        if(name.length > 10 || name.length <2){
            throw new Error("The first or last name entered is invalid. Enter a name with between 2 and 10 letters");
        }
    }

  return (
    <GenericModal 
    isOpen={isModalOpen} 
    onAfterOpen={undefined} 
    onRequestClose={undefined} 
    closeModal={closeModal} 
    insideHteml={
        <div>
        {!categoryIdForUpdate && <h1 className='text-over-input'>Add category</h1>}
        {categoryIdForUpdate && <h1 className='text-over-input'>Edit category</h1>}

        <InputLabel labelText={'enter company name:'} className={''} />
        <TextInput inputType='text' onInputChanged={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)} placeholder={'name . . .'} />
        <Button onButtenClicked={onSave} buttenText={'save'} />
    </div>
    }
    />
  )
}

export default AddCategoryModal