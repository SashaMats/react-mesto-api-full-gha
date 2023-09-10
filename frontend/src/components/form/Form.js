import { Link } from "react-router-dom";

export default function Form({className, name, textButton, children, isValid, onSubmit, isSend}) {
  return (
    <form
      name={`${name}-form`}
      className={className}
      noValidate
      onSubmit={onSubmit}
    >
      {children}
      { name === 'enter' ? 
        <>
          <button disabled={isSend} type="submit" className='enter-form__button'>{isSend ? `${textButton}...` : textButton}</button>
          <Link to={'/sign-in'} className="enter-form__link">{'Уже зарегистрированы? Войти'}</Link>
        </> : name === 'login' ? 
          <>
            <button disabled={isSend} type="submit" className='enter-form__button'>
              {isSend ? `${textButton}...` : textButton}
            </button>
          </> :
            <button disabled={isSend} type="submit" className={`popup__button-save ${name === 'popup_delete' ? 'popup__button-save_delete-form' : ''} ${isValid ? '' : 'popup__button-save_status-disactive'}`}>
              {isSend ? `${textButton}...` : textButton}
            </button>

      }
    </form>
  )
}