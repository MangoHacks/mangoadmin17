// Retrieve Token from local storge
const Auth = {
	getToken() {
		let token = localStorage.getItem('token');
		let expiration = localStorage.getItem('expiration');

		if (!token || !expiration)
			return null;

		if (Date.now() > parseInt(expiration)) {
			this.destroyToken();
			return null;
		}
		else {
			return token;
		}
	},

	// Sets token and expiration to local storage
	setToken(token, expiration) {
		localStorage.setItem('token', token);
		localStorage.setItem('expiration', Date.now() + expiration);
	},

	// Removes token from local storage
	destroyToken() {
		localStorage.removeItem('token');
		localStorage.removeItem('expiration')
	},

	// Authentication check
	isAuthenticated() {
		return this.getToken()
	}
}

export default Auth;