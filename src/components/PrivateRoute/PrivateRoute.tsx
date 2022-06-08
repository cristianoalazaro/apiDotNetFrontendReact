import {Navigate} from 'react-router-dom';
import {userAppSelector} from '../../redux/hooks';

type Props = {
    children: JSX.Element;
}

export const PrivateRoute = ({children}: Props)=>{
    const token = userAppSelector(state => state.auth.token);
    console.log('token ',token)

    if (!token || token == '' || token == 'Bearer '){
        return <Navigate to='/' />
    }

    return children;
}