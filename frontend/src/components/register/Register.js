import useFormValidation from "../../utils/useFormValidation";
import Form from "../form/Form";

export default function Register({name, handleRegister}) {
  
  const {values, errors, isValid, isInputValid, handleChange, reset} = useFormValidation()

  function onRegister(evt) {
    evt.preventDefault()
    handleRegister(values.password, values.email)
    reset({password: '', email: ''})
  }

  return(
    <Form isValid={isValid} onSubmit={onRegister} className='enter-form' name="enter" textButton="Зарегистрироваться">
      <h2 className="enter-form__title">Регистрация</h2>
      <input 
            name="email" 
            className={`enter-form__input ${isInputValid.email === undefined || isInputValid.email ? '' : 'enter-form__input_error '}`} 
            type="email" 
            placeholder="Email"
            value={values.email ? values.email : ''} 
            onChange={handleChange} 
            required 
      />
      <span className="popup__input-error name-input-error">{errors.email}</span>
      <input
            name="password" 
            className={`enter-form__input ${isInputValid.password === undefined || isInputValid.password ? '' : 'enter-form__input_error '}`}
            type="password"
            minLength={2} maxLength={8}
            placeholder="Пароль"
            value={values.password ? values.password : ''}
            onChange={handleChange}
      />
      <span className="popup__input-error name-input-error">{errors.password}</span>
    </Form>
  )
}