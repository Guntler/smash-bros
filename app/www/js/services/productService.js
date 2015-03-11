angular.module('starter.productService', ['ngResource'])

app.service('productService', function ($http, $location, messageService) {

    var categories = function (callback) {
        var Url = "http://178.62.105.68:8081/api/categories/all";
		var req = {
				 method: 'GET',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 }
			}
        $http(req).success(function (data) {
            if (data.success == false) {
                if (messageService.getMessages().errorMessage == null)
                    messageService.setError("There has been an unexpected error.");

                callback(null);
            }
            if (data.result.length == 0) {
                if (messageService.getMessages().errorMessage == null)
                    messageService.setError("No categories found.");

                callback(null);
            }
            else {
                callback(data.result);
            }
        }).error(function (data, status, headers, config) {
            messageService.setError("There has been an unexpected error.");
        });
    }

    return {
        addProduct: function (name, link, category, imagename, imagecontents, callback) {
            var Url = "http://178.62.105.68:8081/api/products/new/";
            var info = {name: name, link: link, imagename: imagename, category: category, imagecontents: imagecontents};
			var req = {
				 method: 'POST',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 },
				 data: info
			}
            $http(req).success(function (data) {
                if (data.success == false) {
                    if (messageService.getMessages().errorMessage == null)
                        messageService.setError("There has been an unexpected error.");
					callback(null);
                }
                else {
                    callback(data.result);
                }
            }).error(function (data, status, headers, config) {
                messageService.setError("There has been an unexpected error. The product could not be added.");
				callback(null);
            });
        },
        editProduct: function (productid, reason, name, link, image, imagecontents, category, callback) {
            var Url = "http://178.62.105.68:8081/api/editrequests/new/";
            var info = {productid: productid, edittype: 'Edit', reason: reason, name: name, link: link, image: image, imagename: image, imagecontents: imagecontents, category: category};
			var req = {
				 method: 'POST',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 },
				 data: info
			}
            $http(req).success(function (data) {
                if (data.success == false) {
                    if (messageService.getMessages().errorMessage == null)
                        messageService.setError("There has been an unexpected error.");
					callback(null);
                }
                else {
                    callback(data.result);
                }
            }).error(function (data, status, headers, config) {
                messageService.setError("There has been an unexpected error. The product could not be added.");
            });
        },
        deleteProduct: function (id, reason, callback) {
            var Url = "http://178.62.105.68:8081/api/editrequests/new/";
            var info = {productid: id, edittype: "Delete", reason: reason};
			var req = {
				 method: 'POST',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 },
				 data: info
			}
            $http(req).success(function (data) {
                if (data.success == false) {
                    if (messageService.getMessages().errorMessage == null)
                        messageService.setError("There has been an unexpected error.");
					callback(null);
                }
                else {
                    callback(data.result);
                }
            }).error(function (data, status, headers, config) {
                messageService.setError("There has been an unexpected error. The product could not be deleted.");
				callback(null);
            });
        },
        getProductsByPage: function (page, productsPerPage, search, callback) {
            var Url = "http://178.62.105.68:8081/api/products/fromTo/" + page + "/" + productsPerPage;
            if (search != undefined && search != null) {
                Url += "?search=" + search;
            }
			
			var req = {
				 method: 'GET',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 }
			}

            $http(req).success(function (data) {
                if (data.success == false) {
                    if (messageService.getMessages().errorMessage == null)
                        messageService.setError("There has been an unexpected error.");
                    callback(null);
                }
                if (data.result.length == 0) {
                    if (messageService.getMessages().errorMessage == null)
                        messageService.setError("No products found.");
                    callback(null);
                }
                else {
                    callback(data.result);
                }
            }).error(function (data, status, headers, config) {
                messageService.setError("There has been an unexpected error.");
                callback(null);
            });
        },
        getProductById: function (id, callback) {
            var Url = "http://178.62.105.68:8081/api/products/id/" + id;
			var req = {
				 method: 'GET',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 }
			}
            $http(req).success(function (data) {
                if (data.success == false) {
                    if (messageService.getMessages().errorMessage == null)
                        messageService.setError("There has been an unexpected error.");
                }
                if (data.result == null) {
                    if (messageService.getMessages().errorMessage == null)
                        messageService.setError("Failed to find product.");

                    callback(null);
                }
                else {
                    callback(data.result);
                }
            }).error(function (data, status, headers, config) {
                callback(null);
                messageService.setError("There has been an unexpected error.");
            });
        },
        getProductCount: function (search, callback) {
            var Url = "http://178.62.105.68:8081/api/products/count/";
            if (search != undefined && search != null) {
                Url += "?search=" + search;
            }
			
			var req = {
				 method: 'GET',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 }
			}
            $http(req).success(function (data) {
                if (data.success == false) {
                    if (messageService.getMessages().errorMessage == null)
                        messageService.setError("There has been an unexpected error.");
                    callback(null);
                }
                if (data.result == null) {
                    if (messageService.getMessages().errorMessage == null)
                        messageService.setError("No products found.");
                    callback(null);
                }
                else {
                    callback({integer: data.result.count});

                }
            }).error(function (data, status, headers, config) {
                messageService.setError("There has been an unexpected error.");
                callback(null);
            });
        },
        getCategoryById: function (id, callback) {
            categories(function (data) {
                if (data != null) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].categoryid == id) {
                            callback(data[i]);
                            return;
                        }
                    }
                    callback(null);
                }
            });
        },
        getCategories: categories,
		viewProducts: function (n, callback) {
			var Url = "http://178.62.105.68:8081/api/products/viewProducts/" + n;
			console.log(window.localStorage['connect.sid']);
			var req = {
				 method: 'GET',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 }
			}
            $http(req).success(function (data) {
                if (data.success == false) {
                    if (messageService.getMessages().errorMessage == null)
                        messageService.setError("There has been an unexpected error.");
                    callback(null);
                }
                if (data.result == null) {
                    if (messageService.getMessages().errorMessage == null)
                        messageService.setError("No products found.");
                    callback(null);
                }
                else {
                    callback(data.result);
                }
            }).error(function (data, status, headers, config) {
                messageService.setError("There has been an unexpected error.");
                callback(null);
            });
		}
    };
});