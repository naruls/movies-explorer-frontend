function NotFound() {
    return(
        <section className="not-found">
            <p className="not-found__error-code">404</p>
            <p className="not-found__error-name">Страница не найдена</p>
            <button className="not-found__back-button">Назад</button>
        </section>
    );
}

export default NotFound;