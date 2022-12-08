import axios from 'axios';
import authHeader from './auth.headers';
import { API_URL, REFRESH_ENDPOINT } from './auth.constants';

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
    baseURL: API_URL,
});

client.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === API_URL + REFRESH_ENDPOINT) {
            window.location.href = '/login/';
            return Promise.reject(error);
        }

        if (
            error.response.data.code === "token_not_valid" &&
            error.response.status === 401
        ) {
            const user = localStorage.getItem('user');

            if (user) {
                const tokenParts = JSON.parse(atob(user.refresh.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return client
                        .post(REFRESH_ENDPOINT, { refresh: user.refresh })
                        .then((response) => {

                            localStorage.setItem('user', response.data);

                            client.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;

                            return client(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                } else {
                    console.log("Refresh token is expired", tokenParts.exp, now);
                    window.location.href = '/login/';
                }
            } else {
                console.log("Refresh token not available.")
                window.location.href = '/login/';
            }
        }


        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);


/**
 * Request Wrapper with default success/error actions
 */
const request = async (opts) => {
    let options = {
        ...opts,
        headers: authHeader(),
    }

    const onSuccess = (response) => {
        console.debug('Request Successful!', response);
        return response;
    }

    const onError = (error) => {
        console.error('Request Failed:', error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);

        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.error('Error Message:', error.message);
        }

        return Promise.reject(error.response || error.message);
    }

    return await client(options)
        .then(onSuccess)
        .catch(onError);
}

export default request;