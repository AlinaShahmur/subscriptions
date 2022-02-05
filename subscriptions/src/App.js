import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import serverData from './utils/dataFromServer';
import {authActions} from './store/auth'
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/Movies/Movies';
import Subscriptions from './components/Subscriptions/Subscriptions';
import AuthVerify from './utils/auth-verify';

function customErrorMessage(errorCode) {
  switch(errorCode) {
    case 401: 
      return 'Username/password is/are not valid'
    default:
      return 'Something went erong'
  }
}

function App() {
  const dispatch = useDispatch()
  const [logErr, setLogErr] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)


  const loginHandler = (username,password) => {
    setLogErr('')
    setIsLoading(true)
    setIsSubmitting(true)
    let userCred = {
      userName: username,
      password: password
    }
    serverData.authUser('http://localhost:8000/api/users/login',userCred).then(data => {
      let {token, user} = data.data
      localStorage.setItem('isLoggedIn', '1')
      localStorage.setItem('token', token)
      localStorage.setItem('fullName', user.fullName)
      dispatch(authActions.login(user.fullName))
      setIsLoading(false)
      setIsSubmitting(false)
    })
    .catch(error => {
      setLogErr(customErrorMessage(error.response.status))
      setIsLoading(false)
      setIsSubmitting(false)
    })
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(authActions.login(localStorage.getItem('fullName')))
    }
  },[dispatch])

  const logoutHandler = () => {
      localStorage.clear()
      dispatch(authActions.logout())
  }

  return (
    <div>
      <Header logoutHandler = {logoutHandler}/>
      <div className="App">
        {!isLoggedIn && <Login isSending = {isSubmitting} isLoading = {isLoading} loginError = {logErr} onLogin = {loginHandler}/> }
        {isLoggedIn && <Switch>
                          <Route exact path = '/'>
                            <Redirect to = '/movies'/>
                          </Route>
                          <Route path = '/movies' component = {Movies}></Route>
                          <Route path = '/subscriptions' component = {Subscriptions}></Route>                         
                      </Switch>}
      </div>
      <AuthVerify logout = {logoutHandler}/> 
    </div>

  );
}

export default App;
