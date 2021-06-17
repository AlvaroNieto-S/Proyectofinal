import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import SignIn from './components/Sigin';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import SignUp from './components/Signup';
import {useEffect} from "react";
import { auth } from './Firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import Admin from './components/Adminvew';
import ShoppingCart from './components/Cart';
import Checkout from './components/Pago/Checkout';

function App() {

  const [{user}, dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      console.log(authUser);
      if(authUser){
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        })
      }
    });
  },[])

  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/admin">
          <Admin/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/signin">
          <SignIn/>
        </Route>
        <Route path="/cart">
          <ShoppingCart/>
        </Route>
        <Route path="/checkout">
          <Checkout/>
        </Route>
        <Route path = "/">
          <Products/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
