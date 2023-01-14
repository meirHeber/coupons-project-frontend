import { AiTwotoneDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

import { useSelector } from 'react-redux';
import { UsersType } from '../../enums/UsersType';
import { ICompanyOrCategoryCard } from '../../models/ICompanyOrCategoryCard';
import { AppState } from '../../redux/app-state';
import './GenericCompanyCategoryCard.css'


function GenericCompanyCategoryCard(props: ICompanyOrCategoryCard) {

  const userType:string = useSelector((state: AppState) => state.userType)

  return (
    <div className='GenericCompanyCategoryCard'>
      {props.htmlBody}
      <div className='company-or-category-icon'>{props.icon}</div>
      
      {userType == UsersType.admin &&<div>
     
        <hr/>
        {/* <Button  onButtenClicked={props.onDeleteClick} buttenText={'delete'} /> */}
        <AiTwotoneDelete className='icon delete-editcompany-or-category-icon' onClick={()=>props.onDeleteClick()} /> 
       
        <MdEdit  className='icon delete-editcompany-or-category-icon' onClick={()=>props.onEditClick()}  />
        {/* <Button onButtenClicked={props.onEditClick} buttenText={'edit'} /> */}
      </div>}
    </div>
  )
}

export default GenericCompanyCategoryCard