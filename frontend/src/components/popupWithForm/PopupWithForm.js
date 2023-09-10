import Form from "../form/Form";

export default
  function PopupWithForm({title, name, textButton, children, isOpen, onClose, onSubmit,  isSend, isValid=true}) {
    return (
      <div className={`popup ${name} ${isOpen && 'popup_opened'}`} onClick={onClose}  >
        <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
          <h2 className="popup__title">{title}</h2>
          <Form name={name} className='popup__form' textButton={textButton} children={children} onSubmit={onSubmit} isSend={isSend} isValid={isValid}></Form>
          <button
            id="CloseProfileInfoPopup"
            aria-label="Закрыть окно"
            type="button"
            className="popup__button-close"
            onClick={onClose}
          />
        </div>
      </div>
    )

  }