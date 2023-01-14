import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../../redux/action-type';
import Button from '../../buttons/generic-button/Button';
import '../generic-modal/GenericModal.css'
import { AppState } from '../../../redux/app-state';
import InputLabel from '../../generic-utils-components/input-label/InputLabel';
import TextInput from '../../generic-utils-components/input-card/Text-input';
import './AddCouponModal.css'
import GenericModal from '../generic-modal/GenericModal';
import { UsersType } from '../../../enums/UsersType';
import catchFunction from '../../../utils/catchFuncion';
import { ICategory } from '../../../models/ICategory';
import { ErrorTypes } from '../../../enums/ErrorTypes';
import { ICompany } from '../../../models/ICompany';
import { ICoupon } from '../../../models/ICoupon';
import GetCategories from '../../../utils/get-functions/GetCategories';
import GetCompanies from '../../../utils/get-functions/GetCompanies';



function AddCouponModal() {

  const dispatch = useDispatch();
  let [categories, setCategories] = useState<ICategory[]>([]);
  let [companies, setCompanies] = useState<ICompany[]>([]);



  async function get() {
      setCategories(await GetCategories())
      setCompanies(await GetCompanies())
  }

  useEffect(() => {
    get()
  }, [])

  const isModalOpen: boolean = useSelector((state: AppState) => state.openAddCouponModal)
  const userType: string = useSelector((state: AppState) => state.userType);
  const couponForEdit: ICoupon = useSelector((state: AppState) => state.couponForUpdate);

  const [company, setCompany] = useState<number>(null);
  const [category, setCategory] = useState<number>(null);
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [amount, setAmount] = useState<number>(null);
  const [price, setPrice] = useState<number>(null);

  const onCompanyIdChanged = () => {
    let selectBox: any = document.getElementById("companySelectBox");
    setCompany(+selectBox.options[selectBox.selectedIndex].value);
  }
  const onCategoryIdChanged = () => {
    let selectBox: any = document.getElementById("categorySelectBox");
    setCategory(+selectBox.options[selectBox.selectedIndex].value);
  }

  const onSave = async () => {
    try {
      addCouponValidations();
      if (couponForEdit == null) {
        if (userType == UsersType.admin) {
          await axios.post("http://localhost:8080/coupons",
            { company, category, title, description, startDate, endDate, amount, price, image });
        }
        if (userType == UsersType.company) {
          await axios.post("http://localhost:8080/coupons",
            { category, title, description, startDate, endDate, amount, price, image });
        }
      }
      else {
        let id = couponForEdit.id;
        if (userType == UsersType.admin) {
          await axios.put("http://localhost:8080/coupons",
            { id, company, category, title, description, startDate, endDate, amount, price, image });
        }
        if (userType == UsersType.company) {
          await axios.put("http://localhost:8080/coupons",
            { id, category, title, description, startDate, endDate, amount, price, image });
        }
        dispatch({ type: ActionType.SelectedCouponForUpdate, payload: null })
      }
      closeModal();
    }
    catch (error: any) {
      catchFunction(error);
    };
  }

  function closeModal() {
    dispatch({ type: ActionType.OpenAddCouponModal, payload: false })
  }

  function addCouponValidations() {
    if (!endDate || !startDate || !amount || !price || !company || !category || !title || !description) {
      throw new Error(ErrorTypes.MISSING_DATA);
    }
    if (amount <= 0) {
      throw new Error("Coupon's amount must be more than 0.");
    }
    if (price <= 0) {
      throw new Error("Coupon's price must be more than 0.");
    }
    if (Date.now() > Date.parse(endDate)) {
      throw new Error("The dates you've entered are wrong ");
    }
    if (description.length > 100 || description.length < 2) {
      throw new Error("Description must be between 2 and 100 letters and numbers");
    }
    if (title.length > 50 || title.length < 2) {
      throw new Error("Tile must be between 2 and 50 letters and numbers");
    }
  }


  ///===========================================================

  return (
    <GenericModal
      isOpen={isModalOpen}
      onAfterOpen={undefined}
      onRequestClose={undefined}
      closeModal={closeModal}
      insideHteml={
        <div className='add-coupon-modal-inside'>
          <h1 className='text-over-input'>Add coupon</h1>

          {userType == UsersType.admin && <div className='input-and-label-div'>
            <InputLabel labelText={'enter coupon company:'} className={''} />
            <select className='text-input' id="companySelectBox" onChange={onCompanyIdChanged}>
              <option value="" disabled selected>Choose company</option>
              {companies.map(company => (<option key={company.id} defaultValue={undefined} value={company.id}>{company.name}</option>))}
            </select>
          </div>}

          <div className='input-and-label-div'>
            <InputLabel labelText={'enter coupon category:'} className={''} />
            <select className='text-input' id="categorySelectBox" onChange={onCategoryIdChanged}>
              <option value="" disabled selected>Choose category</option>
              {categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
            </select>        </div>
          <div className='input-and-label-div'>
            <InputLabel labelText={'enter coupon title:'} className={''} />
            <TextInput inputType='text' onInputChanged={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)} placeholder={'title . . .'} />
          </div>

          <div className='input-and-label-div'>
            <InputLabel labelText={'enter coupon description:'} className={''} />
            <TextInput inputType='text' onInputChanged={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)} placeholder={'description . . .'} />
          </div>

          <div className='input-and-label-div'>
            <InputLabel labelText={'enter coupon start date:'} className={''} />
            <TextInput inputType='date' onInputChanged={(event: ChangeEvent<HTMLInputElement>) => setStartDate(event.target.value)} placeholder={'startDate . . .'} />
          </div>
          <div className='input-and-label-div'>
            <InputLabel labelText={'enter coupon end date:'} className={''} />
            <TextInput inputType='date' onInputChanged={(event: ChangeEvent<HTMLInputElement>) => setEndDate(event.target.value)} placeholder={'endDate . . .'} />
          </div>
          <div className='input-and-label-div'>
            <InputLabel labelText={'enter amount items:'} className={''} />
            <TextInput inputType='number' onInputChanged={(event: ChangeEvent<HTMLInputElement>) => setAmount(+event.target.value)} placeholder={'amount . . .'} />
          </div>
          <div className='input-and-label-div'>
            <InputLabel labelText={'enter coupon price:'} className={''} />
            <TextInput inputType='number' onInputChanged={(event: ChangeEvent<HTMLInputElement>) => setPrice(+event.target.value)} placeholder={'price . . .'} />
          </div>
          <div className='input-and-label-div'>
            <InputLabel labelText={'enter coupon image:'} className={''} />
            <TextInput inputType='url' onInputChanged={(event: ChangeEvent<HTMLInputElement>) => setImage(event.target.value)} placeholder={'image url . . .'} />
          </div>
          <br />
          <Button onButtenClicked={onSave} buttenText={'Add'} />
        </div>
      }
    />
  )
}

export default AddCouponModal;

