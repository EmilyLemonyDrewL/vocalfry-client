import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/RegisterForm';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading, updateUser } = useAuth();
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        {!isHomePage && <NavBar />}
        <div className="container">
          {'valid' in user ? (
            <RegisterForm user={user} updateUser={updateUser} />
          ) : (
            <Component {...pageProps} />
          )}
        </div>
      </>
    );
  }

  return <Signin />;
};

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
  hideNavbar: PropTypes.bool,
};

ViewDirectorBasedOnUserAuthStatus.defaultProps = {
  hideNavbar: false,
};

export default ViewDirectorBasedOnUserAuthStatus;
