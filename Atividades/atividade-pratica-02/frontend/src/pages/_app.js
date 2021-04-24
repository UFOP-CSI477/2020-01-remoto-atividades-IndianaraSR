import 'styles/globals.css';
import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />

            <ReactNotification />
        </>
    );
}

export default MyApp
