/**
 * @author Andrew
 */

'use strict';

define(
    function () {
        try {
            return function YQLMetadata() {

                this.Describe = function (dataTable) {
                    $.ajax({
                        // ajax request to yql public json url
                        url: 'http://query.yahooapis.com/v1/public/yql',
                        jsonp: 'callback',
                        // tell jQuery that we need JSON format
                        dataType: 'jsonp',
                        // tell YQL what we want and to output in JSON format
                        data: {
                            q: "desc " + dataTable,
                            format: 'json'
                        },
                        // parse response data
                        success: function (response) {

                            if (response.query.results !== null) {
                                var v = response.query.results;
                            }
                            else {

                            }
                        }
                    });

                }



            }
        }
        catch(e) {
        
        }
    });