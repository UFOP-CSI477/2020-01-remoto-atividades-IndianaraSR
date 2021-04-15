import { useEffect } from 'react';
import api from 'api';

import { useRouter } from 'next/router';

export default function AuthMiddleware({ children }) {
    const router = useRouter();

    useEffect(() => {
        function verificarToken() {
            const token = localStorage.getItem('token');

            if(typeof global.onTokenChange === "function") {
                global.onTokenChange(token);
            }

            if(token) {
                api.defaults.headers.Authorization = "Bearer " + token;
            } else {
                api.defaults.headers.Authorization = null;
            }
        }

        verificarToken();

        window.addEventListener('storage', verificarToken);

        return () => {
            window.removeEventListener('storage', verificarToken)
        }
    }, [router]);

    return children;
}