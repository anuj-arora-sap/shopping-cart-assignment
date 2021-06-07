import Plp from '../views/Plp';
import LoginRequired from '../protectedPages/LoginRequired/LoginRequired';

const PlP = () => null;
PlP.View = Plp;
PlP.RouteGuard = LoginRequired;

export default PlP;
