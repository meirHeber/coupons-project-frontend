import { MdCategory } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { ICategory } from '../../models/ICategory';
import { ActionType } from '../../redux/action-type';
import GenericCompanyCategoryCard from '../company-and-category-card/GenericCompanyCategoryCard'

export interface IProps {
    category: ICategory;
}

function CategoryCard(props: IProps) {
    const dispatch = useDispatch();

    return (
        <GenericCompanyCategoryCard
            key={props.category.id}
            htmlBody={<div>
                <p><b>name: </b>{props.category.name}</p>
            </div>}
            icon={<MdCategory />}
            onDeleteClick={() => dispatch({ type: ActionType.SelectedCategoryForDelete, payload: props.category.id })}
            onEditClick={() => dispatch({ type: ActionType.SelectedCategoryForUpdate, payload: props.category.id })}
        />)
}

export default CategoryCard