/*
 * RestHelper.js
 * @author Andrew
 */

'use strict';

define(function () {
    try {
        var ret = function RestHelper() {
            var self = this;
            

        }
        
        /*
        Makes a GET request to the server with JSON data
        JSONP callback returns the status of the request 
        */
        ret.postJSON = function (that, options, callback) {

            try {
                 // now we call the rest service
                $.ajax({
                    url:  'http://127.0.0.1:1337/' + options.method,
                    dataType: "jsonp",
                    jsonpCallback: "_testcb",
                    data: 'jsonData=' + JSON.stringify(options.data),
                    contentType: 'application/json',
                    cache: options.cache || false,
                    timeout: options.timeout || 5000,
                    success: callback,
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('error ' + textStatus + " " + errorThrown);
                    }
                });
            }
            catch (e) {
                alert(e);
            }
        };
       
        ret.makeRequest = function (that, options, callback) {

            try {
                $.support.cors = true;
                // now we call the rest service
                $.ajax({
                    url: self.url + options.method,
                    dataType: "jsonp",
                    jsonpCallback: "_testcb",
                    async: false,
                    cache: false,
                    timeout: 5000,
                    success: callback,
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('error ' + textStatus + " " + errorThrown);
                    }
                });
            }
            catch (e) {
                alert(e);
            }
        };

        return ret;
    } catch (e) {
        alert("RestHelper c'tor " + e.name + " " + e.message);
    }
});

/*


*/