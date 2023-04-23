import { Navigate, Outlet } from 'react-router-dom';
// import { getCookie } from '../lib/cookie';
// import { useAuth } from '../server/auth.context';

export default function PublicRoute() {
  // const { currentUser } = useAuth();

  // if(currentUser){
  //   if (currentUser.emailVerified && getCookie("ccm")) {
  //     return <Navigate to="/" />;
  //   }
  // }

  return <Outlet />;
}
