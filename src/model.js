const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY  = "0a69138b81abd002d7540efe7d6679fe";

export default {
    callApi(method,link, params) {
      return new Promise(function(resolve, reject) {
        var url = BASE_URL + link +'?api_key=' + API_KEY;

        if (params) {
          for (var key in params) {
            url = url + '&' + key + '=' + params[key]
          }
        }
        // console.log(url);
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.onload = function() {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            var error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
          }
        };

        xhr.onerror = function() {
          reject(new Error("Network Error"));
        };

        xhr.send();
      });
    },
    getTranding(params = {}) {
      return this.callApi('GET', 'trending/movie/day', params);
    },
    getTopRated(params = {}) {
      return this.callApi('GET', 'movie/top_rated', params);
    },
    getById(id, params = {}) {
      return this.callApi('GET', 'movie/' + id, params);
    },
    getRecomendationById(id, params = {}) {
      return this.callApi('GET', 'movie/' + id + '/recommendations', params);
    },
    getByQuery(query = null) {
      var params = [];
      if (query) {
        params["query"] = query;
      };
      return this.callApi('GET', 'search/movie', params);
    }
};
