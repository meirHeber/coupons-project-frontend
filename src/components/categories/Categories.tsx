 import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ICategory } from '../../models/ICategory';
import { AppState } from '../../redux/app-state';
import genericGetCategories from '../../utils/get-functions/GetCategories';
import CategoryCard from './CategoryCard';

function Categories() {
  const isModalOpen: boolean = useSelector((state: AppState) => state.openAddCategoryModal)
  const categoryForDelete: number = useSelector((state: AppState) => state.categoryIdForDelete)

  let [categories, setCategories] = useState<ICategory[]>([]);

  async function getCategories() {
    setCategories(await genericGetCategories())
  }
  useEffect(() => {
    getCategories()
  }, [isModalOpen, categoryForDelete])

  return (
    <div>
      {categories.map(category => <CategoryCard key={category.id} category={category} />)}
    </div>
  )
}

export default Categories