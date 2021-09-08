import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate'
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import  CheckoutTemplate  from './templates/CheckoutTemplate/CheckoutTemplate';
import Checkout from './pages/Checkout/Checkout';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
import User from './pages/Admin/Users/Users';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Films from './pages/Admin/Films/Films';
import ShowTime from './pages/Admin/Showtime/ShowTime';
import AddNewFilm from './pages/Admin/Films/AddNewFilm/AddNewFilm';
import EditFilm from './pages/Admin/Films/EditFilm/EditFilm';
import AddNewUser from './pages/Admin/Users/AddNewUser/AddNewUser';
import EditUser from './pages/Admin/Users/EditUser/EditUser';
import NotFound from './pages/NotFound/NotFound';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/news" Component={News} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/profile" Component={Profile} />

        <CheckoutTemplate exact path="/checkout/:id" component={Checkout} />

        <UserTemplate exact path="/login" Component={Login} />
        <UserTemplate exact path="/register" Component={Register} />
        
        <AdminTemplate exact path="/admin" Component={User} />
        <AdminTemplate exact path="/admin/films" Component={Films} />
        <AdminTemplate exact path="/admin/films/addnew" Component={AddNewFilm} />
        <AdminTemplate exact path="/admin/films/edit/:id" Component={EditFilm} />
        <AdminTemplate exact path="/admin/films/showtime/:id/:tenphim" Component={ShowTime} />

        <AdminTemplate exact path="/admin/users" Component={User} />
        <AdminTemplate exact path="/admin/users/addnew" Component={AddNewUser} />
        <AdminTemplate exact path="/admin/users/edit/:id" Component={EditUser} />

        <HomeTemplate exact path="/" Component={Home} />
        <HomeTemplate exact path='*' Component={NotFound} />
      
      </Switch>
    </Router>
  );
}

export default App;



