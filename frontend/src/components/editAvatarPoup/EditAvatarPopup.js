import { useRef } from "react"
import PopupWithForm from "../../components/popupWithForm/PopupWithForm"
import useFormValidation from "../../utils/useFormValidation"


export default function EditAvatarPopup({name, isOpen, onClose, onUpdateAvatar, isSend}) {
  const input = useRef()
  const { values, errors, isValid, isInputValid, handleChange, reset} = useFormValidation()

  function resetForClose() {
    onClose()
    reset()
  }

  function handlaSumbit(evt) {
    evt.preventDefault()
    onUpdateAvatar({link: input.current.value}, reset)
  }

  return (
    <PopupWithForm 
    name={name} 
    title="Обновить аватар" 
    isOpen={isOpen} 
    onClose={resetForClose} 
    onSubmit={handlaSumbit} 
    isSend={isSend}
    isValid={isValid}
    textButton="Сохранить"
    >
      <input 
      ref={input} 
      name="link" 
      className={`popup__input popup__input_avatar_url ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_evt-error'}`} 
      type="url" placeholder="Ссылка на картинку"
      value={values.link ? values.link : ''}
      disabled={isSend}
      onChange={handleChange}
      required />
      <span className="popup__input-error link-input-error">{errors.link}</span>
    </PopupWithForm>
  )
}