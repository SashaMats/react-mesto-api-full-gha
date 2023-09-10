import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import ButtonLike from "../buttonLike/buttonLike"

export default
  function Card({card, onOpenImg, onDelete}) {
    const currentUser = useContext(CurrentUserContext)
    return (
      <>
        {currentUser._id === card.owner && <button id="wasteBasket" type="button" className="element__wastebasket" aria-label="Корзина" onClick={() => onDelete(card._id)}/>}
          <img className="element__image" src={card.link} alt={card.name} onClick={() => onOpenImg({link: card.link, name: card.name})} />
          <h2 className="element__description">{card.name}</h2>
          <div className="element__like-container">
          <ButtonLike likes={card.likes} userId={currentUser._id} cardId={card._id}/>
        </div>
      </>
    )
  }