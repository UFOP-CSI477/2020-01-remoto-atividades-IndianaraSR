import AuthMiddleware from 'components/AuthMiddleware';
import 'react-notifications-component/dist/theme.css';
import '../styles/globals.css';

import ReactNotification from 'react-notifications-component';

function App({ Component, pageProps }) {
    return (
        <>
            <AuthMiddleware>
                <Component {...pageProps} />
            </AuthMiddleware>

            <ReactNotification />
        </>
    );
}

export default App;
