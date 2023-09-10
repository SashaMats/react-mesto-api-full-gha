import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../popupWithForm/PopupWithForm";


export default function EditProfilePopup({name, isOpen, onClose, onUpdateUser, isSend}) {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

  useEffect(() => {
    setValue("name", currentUser.name)
    setValue("description", currentUser.about)
  }, [currentUser, setValue])

  function resetForClose () {
    onClose()
    reset({name: currentUser.name, description: currentUser.about})
  }

  function handlaSumbit(evt) {
    evt.preventDefault()
    onUpdateUser({ name: values.name, description: values.description}, reset)
  }
  return(
    <PopupWithForm textButton="Сохранить" name={name} title="Редактировать профиль" isOpen={isOpen} onClose={resetForClose} isValid={isValid} onSubmit={handlaSumbit} isSend={isSend}>
      <input name="name" 
      className={`popup__input popup__input_text_name ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input_evt-error'}`} 
      type="text" placeholder="Имя" minLength={2} maxLength={40} value={values.name ? values.name : ''} onChange={handleChange} required />
      <span className="popup__input-error name-input-error">{errors.name}</span>
      <input name="description"
      className={`popup__input popup__input_text_description ${isInputValid.description === undefined || isInputValid.description ? '' : 'popup__input_evt-error'}`} 
      type="text" placeholder="О себе" minLength={2} maxLength={200} value={values.description ? values.description : ''} onChange={handleChange} required />
      <span className="popup__input-error description-input-error">{errors.description}</span>
    </PopupWithForm>
  )
}