
import Header from './header/Header'
import Main from './main/Main'
import PopupWithForm from './popupWithForm/PopupWithForm';
import ImagePopup from './imagePopup/ImagePopup';
import {useCallback, useEffect, useState} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { apiData } from "../utils/api";
import AddPlacePopup from './addPlacePopup/AddPlacePopup';
import EditProfilePopup from './editProfilePopup/EditProfilePopup';
import EditAvatarPopup from './editAvatarPoup/EditAvatarPopup';
import {Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import MainProtected from './mainProtected/MainProtected';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import InfoTooltip from './infoTooltip/InfoTooltip';
import { authorization, getUserData, registration } from '../utils/auth';

function App() {
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpen] = useState(false);
  const [isDelPopupOpen, setDelPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSend, setIsSend] = useState(false);

  const [currentUser, setCurrentUser] = useState({})

  const [defaultCards, setDefaultCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState('');

  const [loggenIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [isResultPopupOpen, setIsResultPupupOpen] = useState(false);

  const navigate = useNavigate()

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
    setEventListenerEsc();
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
    setEventListenerEsc();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerEsc();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerEsc();
  }

  function handleDeleteClick(cardId) {
    setDeleteCardId(cardId)
    setDelPopupOpen(true);
    setEventListenerEsc();
  }

  const setAllCloseStates = useCallback (() => {
    setisEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false)
    setSelectedCard({});
    setIsImagePopupOpen(false);
    setDelPopupOpen(false);
    setIsResultPupupOpen(false);
  }, [])

  const closePopupEsc = useCallback ((evt) => {
    if (evt.key === 'Escape') {
      setAllCloseStates()
      document.removeEventListener('keydown', closePopupEsc)
    }
  },[setAllCloseStates])

  const closeAllPopups = useCallback(() => {
    setAllCloseStates()
    document.removeEventListener('keydown', closePopupEsc)
  }, [setAllCloseStates, closePopupEsc])
  
  function setEventListenerEsc() {
    document.addEventListener('keydown', closePopupEsc)
  }

  useEffect(() => {
    if (localStorage.key) {
    getUserData(localStorage.getItem('key'))
        .then(res => {
          setUserEmail(res.data.email)
          setLoggedIn(true)
          navigate('/')
        })
        .catch(err => console.error(`Ошибка авторизации ${err}`))
    } else {
      setLoggedIn(false)
    }
  }, [navigate])


  useEffect(() => {
    if (loggenIn) {
      Promise.all([apiData.getAuthorInfo(localStorage.getItem('key')), apiData.getInitialCards(localStorage.getItem('key'))])
      .then(([dataUserInfo, dataCard]) => {
        setCurrentUser(dataUserInfo);
        setDefaultCards(dataCard);
      })
      .catch((error => console.error('Ошибка при получении данных с сервера о пользователе и карточках' `${error}`)))
      }
  }, [loggenIn])

  function handleCardDelete(evt) {
    evt.preventDefault()
    setIsSend(true)
    apiData.deleteCard(deleteCardId, localStorage.getItem('key'))
      .then(() => {
        setDefaultCards(defaultCards.filter(card => {
          return card._id !== deleteCardId
        }))
        closeAllPopups()
      })
    .catch((error => console.error('Ошибка при удалении' `${error}`)))
    .finally(() => setIsSend(false))
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSend(true)
    apiData.setAuthorInfo(dataUser, localStorage.getItem('key'))
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error => console.error('Ошибка при редактировании профиля' `${error}`)))
      .finally(() => setIsSend(false))
  }

  function handleUpdateAvatar(data, reset) {
    setIsSend(true)
    apiData.setAuthorAvatar(data, localStorage.getItem('key'))
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
    .catch((error => console.error('Ошибка при редактировании аватарки' `${error}`)))
    .finally(() => setIsSend(false))
  }

  function handleAddPlaceCard(data, reset) {
    setIsSend(true)
    apiData.setCardOnServ(data, localStorage.getItem('key'))
      .then((res) => {
        setDefaultCards([res, ...defaultCards])
        closeAllPopups()
        reset()
      })
    .catch((error => console.error('Ошибка при создании карточки' `${error}`)))
    .finally(() => setIsSend(false))
  }

  function handleRegister(password, email) {
    setIsSend(true)
    registration(password, email)
      .then(() => {
        setIsResultPupupOpen(true)
        setIsSuccessful(true)
        window.scrollTo(0, 0)
        navigate('sing-in')
      })
      .catch((err) => {
        setIsResultPupupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при регистрации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleLogin(password, email) {
    setIsSend(true)
    authorization(password, email)
      .then(res => {
        localStorage.setItem('key', res.token)
        setLoggedIn(true)
        navigate('/')
      })
      .catch((err) => {
        setIsResultPupupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при авторизации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleSignOut() {
    localStorage.removeItem('key')
    setLoggedIn(false)
    navigate('/')
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Routes>
          <Route 
            path='/' 
            element={
              <ProtectedRoute
                  name='main' 
                  userEmail={userEmail}
                  element={MainProtected}
                  loggedIn={loggenIn}
                  onEditProfile={handleEditProfileClick} 
                  onAddPlace={handleAddPlaceClick} 
                  onEditAvatar={handleEditAvatarClick} 
                  onOpenImg={handleCardClick} 
                  onDelete = {handleDeleteClick} 
                  defaultCards={defaultCards}
                  onSignOut={handleSignOut}
                  isSend={isSend}
              />
            }
          >
          </Route>
          <Route 
            path="/sign-in" 
            element={
              <>
                <Header name="signIn" />
                <Main name="signIn" handleLogin={handleLogin}/>
              </> 
            }
          >
          </Route>
          <Route
            path="/sign-up"
            element={
              <>
                <Header name="singUp" />
                <Main name="singUp" 
                handleRegister={handleRegister} />
              </>
            }
          >   
          
          </Route>
        
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes> 

        <EditAvatarPopup name="popup_avatar" onUpdateAvatar={handleUpdateAvatar} isSend={isSend} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}></EditAvatarPopup>

        <EditProfilePopup name="popup_profile" isSend={isSend} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}></EditProfilePopup>

        <AddPlacePopup name="popup_add-place" onAddPlace={handleAddPlaceCard} isOpen = {isAddPlacePopupOpened} onClose={closeAllPopups} isSend={isSend}></AddPlacePopup>

        <PopupWithForm name="popup_delete" title="Вы уверены?" textButton="Да" isOpen={isDelPopupOpen} onClose={closeAllPopups} onSubmit={handleCardDelete} isSend={isSend}></PopupWithForm>

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpened} onClose={closeAllPopups}></ImagePopup>
        
        <InfoTooltip name='result' isSuccessful={isSuccessful} isOpen={isResultPopupOpen} onClose={closeAllPopups} />
         
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;