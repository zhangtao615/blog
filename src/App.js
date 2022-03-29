import React  from 'react';
import SiderBar from './components/SiderBar/SiderBar';
import Article from './components/Article/Article';
import Others from './components/Others/Others';
import WriteArticle from './pages/WriteArticle/WriteArticle';
import Detail from './pages/Detail/Detail'
import Login from './pages/Login/Login'
import Reg from './pages/Reg/Reg'
import Management from './pages/Management/Management'
import Personal from './pages/Personal/Personal'
import store from './store'
import { getCurrentUser } from './store/actionCreators'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import avatar from './static/avatar.png'
import './App.scss';

const App = () => {
  const data = store.getState()
  if (!data.isLogin && localStorage.getItem('token')) {
    store.dispatch(getCurrentUser(localStorage.getItem('token')))
  }
  return (
      <div className="warpper">
        <Router>
          <div className="personal-info">
            <Link to="/">
              <img className="avatar" src={avatar} alt="" style={{cursor:'pointer'}}/>
            </Link>
            <SiderBar/>
          </div>
          <div className="article-part">
            <Route exact path="/" component={Article} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/write" component={WriteArticle} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reg" component={Reg} />
            <Route exact path="/management" component={Management} />
            <Route exact path="/personal" component={Personal} />
          </div>
          <Others />
        </Router>
      </div>
  );
}

export default App;
