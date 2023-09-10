import { useEffect, useState } from "react"
import { apiData } from "../../utils/api"
export default 
function ButtonLike({likes, userId, cardId}) {
  const [isLike, setIsLike] = useState(false)
  const [count, setCount] = useState(likes.length)

  useEffect(() => {
    setIsLike(likes.some(element => userId === element))
  }, [likes, userId])

  function handleCardLike() {
    if (isLike) {
      apiData.deleteLike(cardId, localStorage.getItem('key'))
        .then(res => {
          setIsLike(false)
          setCount(res.likes.length)
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
    } else {
      apiData.setLike(cardId, localStorage.getItem('key'))
        .then(res => {
          setIsLike(true)
          setCount(res.likes.length)
        })
        .catch((err) => console.error(`Ошибка при снятии лайка ${err}`))
    }
  }
  return (
    <>
      <button
        id="LikeButton"
        type="button"
        className={`element__like ${isLike && 'element__like_active'}`}
        aria-label="Лайк"
        onClick={handleCardLike}
      />
      <span className="element__likes-count">{count}</span>
    </>
  )
}