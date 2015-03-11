angular.module('starter.userService', ['ngResource'])

app.service('userService',function($http, messageService, sessionService) {
	return {
		getUsersByPage: function(page, usersPerPage, filterBy, filterVal, search, callback) {
			var first = true;
			var Url = "http://178.62.105.68:8081/api/users/fromTo/"+page+"/"+usersPerPage;
			if(filterBy != undefined && filterBy != null && filterVal != undefined && filterVal != null) {
				Url += "?filterBy=" + filterBy + "&value=" + filterVal;
				first = false;
			}
			if(search != undefined && search != null) {
				if(first)
					Url += "?";
				else Url += "&";
				Url += "search=" + search;
			}
			
			var req = {
				 method: 'GET',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 }
			}
			$http(req).success(function(data){
				if(data.success == false) {
					if(messageService.getMessages().errorMessage == null) {
						if(data.err != null && data.err.code == "22P02")
							messageService.setError("No users were found." );
						else
							messageService.setError("There has been an unexpected error." );
					}
					callback(null);
				}
				else if(data.result.length == 0) {
					if(messageService.getMessages().errorMessage == null)
						messageService.setError("No users were found.");
					callback(null);
				}
				else {
					callback(data.result);
				}
			}).error(function(data,status,headers, config) {
				messageService.setError("There has been an unexpected error.");
				callback(null);
			});
		},
		getUserById: function(id, callback) {
			var Url = "http://178.62.105.68:8081/api/users/id/"+id;
			var req = {
				 method: 'GET',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 }
			}
			$http(req).success(function(data){
				if(data.success == false) {
					if(messageService.getMessages().errorMessage == null && sessionService.getUser().permissions != "Manager")
						messageService.setError("There has been an unexpected error." );
					callback(null);
				}
				else if(data.result == null) {
					if(messageService.getMessages().errorMessage == null)
						messageService.setError("Unable to find user.");
					callback(null);
				}
				else {
					callback(data.result);
				}
			}).error(function(data,status,headers, config) {
				messageService.setError("There has been an unexpected error.");
				callback(null);
			});
		},
		getUserCount: function(filterBy, filterVal, search, callback) {
			var Url = "http://178.62.105.68:8081/api/users/count";
			if(filterBy != undefined && filterBy != null && filterVal != undefined && filterVal != null) {
				Url += "?filterBy=" + filterBy + "&value=" + filterVal;
				first = false;
			}
			if(search != undefined && search != null) {
				if(first)
					Url += "?";
				else Url += "&";
				Url += "search=" + search;
			}
			var req = {
				 method: 'GET',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 }
			}
			$http(req).success(function(data){
				if(data.success == false) {
					if(messageService.getMessages().errorMessage == null) {
						if(data.err != null && data.err.code == "22P02")
							messageService.setError("No users were found." );
						else
							messageService.setError("There has been an unexpected error.");
					}
					callback(null);
				}
				else if(data.result == null) {
					if(messageService.getMessages().errorMessage == null)
						messageService.setError("No users were found.");
					callback(null);
				}
				else {
					callback({integer: data.result.count});
				}
			}).error(function(data,status,headers, config) {
				messageService.setError("There has been an unexpected error.");
				callback(null);
			});
		},
		recoverPassword: function(email) {
			var Url = "/api/users/forgotPassword/" + email;
			var req = {
				 method: 'GET',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 }
			}
			$http(req).success(function(data){
				if(data.success == false) {
					if(messageService.getMessages().errorMessage == null)
						messageService.setError("No account associated with that email.");
				}
				if(data.result == null) {
					if(messageService.getMessages().errorMessage == null)
						messageService.setError("No account associated with that email.");
				}
				else {
					messageService.setSuccess("A new password was sent to your email!");
				}
			}).error(function(data,status,headers, config) {
				messageService.setError("There has been an unexpected error.");
				callback(null);
			});
		},
		changePermissions: function(userID, permission, callback) {
			var Url = "http://178.62.105.68:8081/api/users/changePermissions/" + userID + "?permission=" + permission;
			var req = {
				 method: 'GET',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 }
			}
			$http(req).success(function(data){
				if(data.success == false) {
					if(messageService.getMessages().errorMessage == null)
						messageService.setError("There has been an unexpected error.");
					callback(false);
				}
				else if(data.result == false) {
					if(messageService.getMessages().errorMessage == null)
						messageService.setError("Unable to change user permissions.");
					callback(false);
				}
				else {
					messageService.setSuccess("User permissions successfully changed!");
					callback(true);
				}
			}).error(function(data,status,headers, config) {
				messageService.setError("There has been an unexpected error.");
				callback(false);
			});
		},
		changePassword: function(oldPassword, newPassword, callback) {
			var Url = "http://178.62.105.68:8081/api/users/changePassword";
            var info = {oldPassword: oldPassword, newPassword: newPassword};
			var req = {
				 method: 'GET',
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
                messageService.setError("There has been an unexpected error.");
				callback(null);
            });
		},
		getFavorites: function(callback) {
			var Url = "http://178.62.105.68:8081/api/products/getFavorites";
			var req = {
				 method: 'GET',
				 url: Url,
				 headers: {
				   'Cookie': window.localStorage['connect.sid']
				 }
			}
			$http(req).success(function(data){
				if(data.success == false) {
					if(messageService.getMessages().errorMessage == null)
						messageService.setError("There has been an unexpected error.");
					callback(null);
				}
				else if(data.result == []) {
					if(messageService.getMessages().errorMessage == null)
						messageService.setError("No favorites found.");
					callback(data.result);
				}
				else {
					callback(data.result);
				}
			}).error(function(data,status,headers, config) {
				messageService.setError("There has been an unexpected error.");
				callback(null);
			});
		}
	};
});