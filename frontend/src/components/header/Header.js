import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
export default function Header({name, dataUser, onSignOut}) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип"
      />
      {name === 'signIn' ? 
        <Link to={'/sign-up'} className='header__link'>{'Регистрация'}</Link> :
        name === 'singUp' ? <Link to={'/sign-in'} className='header__link'>{'Войти'}</Link> :
        <div className='header__email-container'>
          <p className='header__email'>{dataUser}</p>
          <Link to={'/'} onClick={onSignOut} className='header__link'>{'Выйти'}</Link>
        </div>
      }
    </header>
  )
} 