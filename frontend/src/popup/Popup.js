export default
  function Popup({name, isOpen, onClose}) {
    return (
      <div className={`popup ${name} ${isOpen && 'popup_opened'}`} onClick={onClose}  >
        <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
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