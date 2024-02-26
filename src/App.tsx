import { useEffect, useState} from "react";
import { app, db } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import Router from './components/Router'
import Loader from "components/Loader";

function App() {
    const auth = getAuth(app);

    //auth를 체크하기전(initialize전), loader를 띄워줌
    const [init, setInit] = useState<boolean>(false);
    
    /* login시 current는 있지만, currentUser값은 아래 코드로만으로는 변경되지 않음(false상태)
    따라서 auth의 currentUser가 있으면 authenticated로 변경*/
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        //auth check
        !!auth?.currentUser
    );

    /* auth값을 관찰하고, currentUser값을 변경해야하므로(실시간으로 update) 
       onAuthStateChanged를 관찰자로 사용
       헤딩 코드 단점 - 매번 onAuthStateChanged를 호출해야함
    */
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if(user) {
            setIsAuthenticated(true);
          }else {
            setIsAuthenticated(false);
          }
          setInit(true);
        });
    }, [auth]);

    return (
      <>
      <ToastContainer />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </>
    );
}

export default App;
