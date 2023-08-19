import React from 'react';
import magnifier from '../../images/magnifier.svg'
import searchButton from '../../images/search-button.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
    const [searchBar, setSearchBar] = React.useState('');
    const [checkboxState, setCheckboxState] = React.useState(false);

    React.useEffect(() => {
        const searchMovie = JSON.parse(localStorage.getItem('searchMovie'));
        if(searchMovie && !props.userSavedMovies) {
            setSearchBar(searchMovie[0].value);
            setCheckboxState(searchMovie[1].value);
        }
      }, []);

    function changeSearchBar(evt) {
        setSearchBar(evt.target.value);
    }

    function changeCheckboxState() {
        setCheckboxState(!checkboxState);
    }

    function searchFilms(evt) {
        evt.preventDefault();
        props.getFilms(props.serializeForm(evt.target));
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
                <form className="search-form__form" onSubmit={searchFilms}>
                    <div className="search-form__serch-panel" id='search-form__serch-panel'>
                        <img className="search-form__magnifier" src={magnifier} alt="Поиск" />
                        <input className="search-form__input" onFocus={focusInput} onBlur={blurInput} placeholder='Фильм' name="search-form__input" onChange={changeSearchBar} value={searchBar}/>
                        <button className="search-form__button"><img className="search-form__button-image" alt="кнопка" src={searchButton} /></button>
                    </div>
                    <FilterCheckbox checkboxState={checkboxState} changeCheckboxState={changeCheckboxState}/>
                </form>
                <div className="search-form__line"></div>
            </div>
        </section>
    );
}

export default SearchForm;