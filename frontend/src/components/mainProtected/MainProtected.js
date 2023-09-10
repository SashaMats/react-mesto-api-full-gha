import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";


export default function MainProtected({userEmail, onSignOut, loggedIn, ...props}) {

  return (
      <>
        <Header onSignOut={onSignOut} dataUser={userEmail}/>
        <Main name="main" {...props} />
        <Footer />
      </>
  )
}