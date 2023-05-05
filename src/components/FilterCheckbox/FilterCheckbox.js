function FilterCheckbox() {
    return(
        <div className='filter-checkbox'>
        <label className="toggler-wrapper style-14">
          <input type="checkbox" />
          <div className="toggler-slider">
            <div className="toggler-knob"></div>
          </div>
        </label>
            <label className="filter-checkbox__label">Короткометражки</label>
        </div>
    );
}

export default FilterCheckbox;