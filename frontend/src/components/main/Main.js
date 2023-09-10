import { useContext } from "react"
import Card from "../card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Register from "../register/Register";
import Login from "../login/Login";

export default
  function Main({name, handleLogin, handleRegister, onEditAvatar, onEditProfile, onAddPlace, onOpenImg, onDelete, defaultCards, isSend}) {
    const currentUser = useContext(CurrentUserContext)
    return (
      <main className="main">
        {
          name === 'main' ?
            <>
              <section className="profile">
                <button type="button" className="profile__avatar-button" onClick={onEditAvatar} >
                  <img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : '#'} alt="Аватар" />
                  
                </button>
                <div className="profile__info">
                  <div className="profile__title-wrapper">
                    <h1 className="profile__title">{currentUser.name ? currentUser.name : ''}</h1>
                    <button
                      aria-label="Редактировать профайл"
                      type="button"
                      className="profile__pencil-button"
                      onClick={onEditProfile}
                    />
                  </div>
                  <p className="profile__subtitle">{currentUser.about ? currentUser.about : ''}</p>
                </div>
                <button
                  aria-label="Добавить содержимое"
                  type="button"
                  className="profile__add-button"
                  onClick={onAddPlace}
                />
              </section>
              <section className="elements">
                <ul className="elements__list">
                  {defaultCards.map(data => {
                    return (
                      <li className="element" key={data._id}>
                        <Card card={data} onOpenImg={onOpenImg} onDelete={onDelete}> </Card>
                      </li>
                      )
                    })
                  }
                </ul>
              </section>
            </> : 
            name === 'singUp' ?
              <Register name={name} handleRegister={handleRegister}></Register> :
              <Login isSend={isSend} name={name} handleLogin={handleLogin} />
        }
      </main>


    ) 
  }