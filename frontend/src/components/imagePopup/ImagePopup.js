export  default
  function ImagePopup({card, onClose, isOpen}) {
    return (
      <div className={`popup popup_img ${isOpen && 'popup_opened'}`} onClick={onClose}>
        <div className="popup__container popup__container_container-img" onClick={(evt => evt.stopPropagation())}>
          <img className="popup__image" alt={card.name} src={card.link} />
          <p className="popup__title popup__title_image-description">{card.name}</p>
          <button
            onClick={onClose}
            id="CloseImgPopup"
            aria-label="Закрыть окно"
            type="button"
            className="popup__button-close"
          />
        </div>
      </div>
    )
  }