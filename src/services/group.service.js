import http from "../http-common";

class GroupService {
  	getAll() {
  		return http.get("/groups");
  	}
}

export default new GroupService();