import React from "react";

export default function ImagePopup(props) {

    React.useEffect(() => {
        if (!props.card.link) return;

        function handleESC(e) {
            if (e.key === "Escape") {
                props.onClose()
            }
        }

        document.addEventListener("keydown", handleESC);

        return () => document.removeEventListener("keydown", handleESC);
    }, [props.card.link]);

    return (
        <section className={`popup img-popup ${props.card.link !== '' && 'popup_opened'}`} >
            <div className="popup__container-img">
                <button className="popup__btn-closed" type="button" onClick={props.onClose} />
                <img className="popup__img" src={`${props.card.link}`} alt={props.card.name} />
                <p className="popup__caption">{props.card.name}</p>
            </div>
        </section>
    );
}