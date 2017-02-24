import axios from 'axios';
import Auth from './auth';

function api() {
	const token = Auth.getToken();
	const instance = axios.create({
	  baseURL: 'https://staging.mangohacks.com/api/',
	  timeout: 10000,
	  headers: {'Authorization': token && `Bearer ${token}` }
	});

	return instance;
}

export default api();