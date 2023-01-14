import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ICompany } from '../../models/ICompany';
import { AppState } from '../../redux/app-state';
import genericGetCompanies from '../../utils/get-functions/GetCompanies';
import CompanyCard from './CompanyCard';

function Companies() {

  const openAddCompanyModal = useSelector((state: AppState) => state.openAddCompanyModal);
  const companyForDelete = useSelector((state: AppState) => state.companyIdForDelete);
  const [companies, setCompanies] = useState<ICompany[]>([]);

  async function getCompanies() {
    setCompanies(await genericGetCompanies())
  }

  useEffect(() => {
    getCompanies()
  }, [openAddCompanyModal, companyForDelete])

  return (
    <div>
      {companies.map(company => (<CompanyCard key={company.id} company={company} />))}
    </div>
  )
}

export default Companies