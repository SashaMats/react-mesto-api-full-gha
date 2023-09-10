import Popup from "../../popup/Popup";

export default function InfoTooltip({name, isSuccessful, isOpen, onClose}) {
  return (
    <div className={`popup ${name} ${isOpen && 'popup_opened'}`} onClick={onClose}  >
      <div className="popup__container popup__container_successful" onClick={(evt => evt.stopPropagation())}>
        <div className={`popup__successful-image ${!isSuccessful ? 'popup__successful-image_error' : ''}`} />
        <h2 className="popup__successful-title">{isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
      <button
          aria-label="Закрыть окно"
          type="button"
          className="popup__button-close"
          onClick={onClose}
        />
      </div>
    </div>
  )
}