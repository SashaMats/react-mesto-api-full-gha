import useFormValidation from "../../utils/useFormValidation";
import Form from "../form/Form";

export default function Login({name, handleLogin, isSend}) {
  const {values, errors, isValid, isInputValid, handleChange, reset} = useFormValidation()

  function onLogin(evt) {
    evt.preventDefault()
    handleLogin(values.password, values.email)
    reset({password: '', email: ''})

  }

  return(
    <Form isSend={isSend} isValid={isValid} onSubmit={onLogin} className='enter-form' name="login" textButton="Войти">
      <h2 className="enter-form__title">Вход</h2>
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
            placeholder="Пароль"
            value={values.password ? values.password : ''}
            onChange={handleChange}
      />
      <span className="popup__input-error name-input-error">{errors.password}</span>
    </Form>
  )
}