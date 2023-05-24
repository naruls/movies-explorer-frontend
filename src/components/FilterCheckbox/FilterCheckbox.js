function FilterCheckbox(props) {
    return(
        <div className='filter-checkbox'>
        <label className="toggler-wrapper style-14">
          <input type="checkbox" name="search-form__checkbox" checked={props.checkboxState} onChange={props.changeCheckboxState}/>
          <div className="toggler-slider">
            <div className="toggler-knob"></div>
          </div>
        </label>
            <label className="filter-checkbox__label">Короткометражки</label>
        </div>
    );
}

export default FilterCheckbox;