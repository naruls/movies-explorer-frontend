import magnifier from '../../images/magnifier.svg'
import searchButton from '../../images/search-button.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
    function searchFilms(evt) {
        evt.preventDefault();
        props.getFilms();
    }

    function focusInput() {
        document.getElementById('search-form__serch-panel').style.outline = "#e7e7e8 solid 1px"
    }

    function blurInput() {
        document.getElementById('search-form__serch-panel').style.outline = "";
    }

    return(
        <section className="search-form">
            <div className="search-form__content">
                <form className="search-form__form" id='search-form__form' onSubmit={searchFilms}>
                    <div className="search-form__serch-panel" id='search-form__serch-panel'>
                        <img className="search-form__magnifier" src={magnifier} alt="Поиск" />
                        <input onFocus={focusInput} onBlur={blurInput} className="search-form__input" placeholder='Фильм' required/>
                        <button className="search-form__button"><img className="search-form__button-image" alt="кнопка" src={searchButton} /></button>
                    </div>
                    <FilterCheckbox />
                </form>
                <div className="search-form__line"></div>
            </div>
        </section>
    );
}

export default SearchForm;