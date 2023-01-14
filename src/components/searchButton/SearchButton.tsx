import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import ISearchButton from '../../models/ISearchButton';
import './SearchButton.css'

function SearchButton(props: ISearchButton) {
  return (
    <div className="search-box">
    <button className="btn-search"><BiSearchAlt /></button>
    <input type={props.searchType} className="input-search"  placeholder={props.plachHolderForSearch} onChange={props.onSearchChanged}></input><br />
</div>  )
}

export default SearchButton