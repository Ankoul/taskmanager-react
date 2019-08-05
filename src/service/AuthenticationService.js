import Service from "./Service";
import jwtDecode from 'jwt-decode';

const URL = process.env.REACT_APP_REST_API + "/authentication";
class AuthenticationService extends Service {

    async login(username, password) {
        localStorage.removeItem("jwt");

        let basicToken = btoa(username + ':' + password);
        return this.post(`${URL}/login`, null, {
            headers: {"Authorization": `Basic ${basicToken}`},
            returnRes: true,
            silent: false,
        }).then(async (res) => {
            if (!res.ok) {
                return Promise.reject('wrong username or password');
            }
            let jwt = res.headers.get("Authorization");
            localStorage.setItem("jwt", jwt.replace('Bearer ', ''));

            return await res.json();
        });
    }

    async register(user){
        return this.post(`${URL}/register`, user);
    }

    async validate() {
        return this.get(`${URL}/validate`);
    }

    logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    isLoggedIn() {
        let jwt = localStorage.getItem('jwt');
        return !!jwt && !this.isTokenExpired(jwt);
    }

    isTokenExpired = (token) => {
        try {
            window.jwtDecode = jwtDecode;
            const decoded = jwtDecode(token);
            return decoded.exp < this.milliToSeconds(Date.now());
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    milliToSeconds(milliseconds) {
        return milliseconds / 1000;
    }

    getToken() {
        let jwt = localStorage.getItem('jwt');
        return jwt && jwt.replace('Bearer ', '');
    }

    getLoggedUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

}

export default new AuthenticationService();

