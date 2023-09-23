import React from "react";
import fail from '../images/fail.png'
import success from '../images/success.png'

const InfoTooltip = (props) => {

    React.useEffect(() => {
        if (!props.isOpen) return;

        function handleESC(e) {
            if (e.key === "Escape") {
                props.onClose()
            }
        }

        document.addEventListener("keydown", handleESC);

        return () => document.removeEventListener("keydown", handleESC);
    }, [props.isOpen]);

    return (

        <section className={`popup InfoTooltip-popop popup_${props.isOpen ? 'opened' : 'closed'}`}>
            <div className="popup__container popup__container-infoTooltip">
                <button className="popup__btn-closed" type="button" onClick={props.onClose} />
                <img className="popup__img" src={props.isSuccess ? success : fail} alt={props.isSuccess ? 'успешная регистрация' : 'не успешная регистрация'} />
                <h3 className="popup__title popup__title-infoTooltip">{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Пропробуйте ещё раз.'}</h3>
            </div>
        </section>

    )

}

export default InfoTooltip;