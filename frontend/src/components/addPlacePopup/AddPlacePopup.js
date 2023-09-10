import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../popupWithForm/PopupWithForm";

export default function AddPlacePopup({name, onAddPlace, isOpen, onClose, isSend}) {

  const {values, errors, isInputValid, isValid, handleChange, reset} = useFormValidation()

  function resetForClose() {
    onClose()
    reset()
  }
  function handlaSumbit(evt) {
    evt.preventDefault()
    onAddPlace({ name: values.name, link: values.link}, reset)
  }

  return(
    <PopupWithForm
    name={name} 
    title="Новое место" isOpen={isOpen} onClose={resetForClose} textButton="Создать" isValid={isValid} onSubmit={handlaSumbit} isSend={isSend}>
      <input name="name" 
        className={`popup__input popup__input_place_name ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input_evt-error'}`}
        type="text" 
        placeholder="Название" 
        minLength={2} maxLength={30} 
        value={values.name ? values.name : ''}
        disabled={isSend}
        onChange={handleChange}
        required
      />
      <span className="popup__input-error name-input-error">{errors.name}</span>
      <input name="link"
        className={`popup__input popup__input_place_url ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_evt-error'}`}
        type="url" 
        placeholder="Ссылка на картинку" 
        value={values.link ? values.link : ''}
        disabled={isSend}
        onChange={handleChange}
        required 
      />
      <span className="popup__input-error link-input-error">{errors.link}</span>
    </PopupWithForm>
  )
}