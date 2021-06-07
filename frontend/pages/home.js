import HomePage from '../views/Home';
import LoginRequired from '../protectedPages/LoginRequired/LoginRequired';

const Home = () => null;
Home.View = HomePage;
Home.RouteGuard = LoginRequired;

export default Home;
