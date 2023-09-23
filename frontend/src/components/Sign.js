import React from "react";


export default function Sign(props) {

    return (
        <section className='sign' >
            <div className="popup__container sign__container">
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__btn-save sign__btn-save" type="submit">{props.buttonText}</button>
                </form>
                {props.linkMarkup && props.linkMarkup}
            </div>
        </section>
        )

}
