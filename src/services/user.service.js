import http from "../http-common";

class UserService {
	getPublicContent() {
	    return http.get('test/all');
	}

	getAdminBoard() {
	    return http.get('test/admin');
	}
}

export default new UserService();