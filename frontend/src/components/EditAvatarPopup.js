import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {

    const avatarRef = React.useRef('');


    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    React.useEffect(() => {
        if (props.isOpen) {
            avatarRef.current.value = "";
        }
    }, [props.isOpen]);



    return (

        <PopupWithForm
            name='avatar'
            isOpen={props.isOpen}
            title='Обновить аватар'
            buttonText='Сохранить'
            onClose={props.onClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <label className="popup__form-label">
                        <input type="url" className="popup__input" name="avatar" placeholder="Ссылка на картинку" required
                            id="avatar-input" ref={avatarRef} />
                        <span className="popup__input-error avatar-input-error">1</span>
                    </label>
                </>
            } />

    )
}