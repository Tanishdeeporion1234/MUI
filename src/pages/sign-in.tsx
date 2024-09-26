import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import Login from '../login/login';
import {SignInView} from '../sections/auth/sign-in-view'

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Sign in - ${CONFIG.appName}`}</title>
      </Helmet>

      {/* <Login /> */}
      <SignInView/>
    </>
  );
}
