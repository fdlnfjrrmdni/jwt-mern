import http from "../http-common";

class GoodsService {
  	getAll() {
  		return http.get("/goods");
  	}

	  get(id) {
    	return http.get(`/goods/${id}`);
  	}

  	create(data) {
    	return http.post("/goods", data);
  	}

  	update(id, data) {
    	return http.put(`/goods/${id}`, data);
  	}

  	delete(id) {
    	return http.delete(`/goods/${id}`);
  	}

  	deleteAll() {
    	return http.delete(`/goods`);
  	}

  	findByTitle(description) {
    	return http.get(`/goods?description=${description}`);
  	}
}

export default new GoodsService();