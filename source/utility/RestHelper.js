/*
 * RestHelper.js
 * @author Andrew
 */

'use strict';

define(function () {
    try {
        var self = function RestHelper() {

        }
        
        self.makeRequest = function (that, options, callback) {

            try {
                $.support.cors = true;
                // now we call the rest service
                $.ajax({
                    url: 'http://127.0.0.1:1337/' + options.method,
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

        return self;
    } catch (e) {
        alert("RestHelper c'tor " + e.name + " " + e.message);
    }
});

/*


*/