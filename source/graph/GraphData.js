// JavaScript source code

/**
 * GraphData.js
 * @author Andrew
 */

'use strict';

define(['source/model/Contracts', 'source/utility/Serialization'], function (Contracts, Serialization) {
    try {

        return function GraphData(options, contract) {
            var self = this;
            var state = options;

            // We always verify we satisfy the base constraints (id, name, type) 

            // Verify we've fulfilled the contract as passed in by GraphData instances
            if (typeof (contract) !== 'undefined') {
                contract.call(self, state);
            }
            else {
                Contracts.ContractBase(state);
            }

            self.getState = function () {
                return state;
            };

            /*
            // Now (re)populate non-required fields that we should have
            if (typeof(options) !== 'undefined')
            {
                state.description = options.description || 'default description';
            }
            */

            // Set up the ES5-style getters and setters
            Object.keys(state).forEach(function (prop) {
                Object.defineProperty(self, prop, {
                    // Create a new getter for the property
                    get: function () {
                        return state[prop];
                    },
                    // Create a new setter for the property
                    set: function (val) {
                        state[prop] = val;
                    }
                })
            }, self);

            self.Insert = function () {

                var collection = db.collection(state.type);

                // safe mode ( w : 1 } to ensure document persistance on MongoDB
                collection.insert(state, { w: 1 },
                            function (error, result) {
                                if (error || !result) {
                                    console.log('Not Saved');
                                    console.log(error);
                                    console.log(result);
                                }
                                else {
                                    //                            console.log('Saved');
                                    //                            console.log(error);
                                    console.log(result);
                                }
                            });
            };

            self.PrintName = function () {
                console.log(self.name);
            };

            self.toJSON = function () {
                return Serialization.structToJSON("GraphData", state);
            };

            self.Execute = function (obj) {
                var d = $.Deferred();
                /*
                    // parse response data
                    success: function (response) {
    
                        if (response.query.results !== null) {
                            d.resolve(response.query.results.Result[0].Title);
                        }
                        else {
    
                            // TODO: need to pass in a callback here
                            d.reject(function () { alert('No results found.'); }());
                        }
                    }
                */
                return d.promise();
            };
        };

        GraphData.fromJSON = function (value) {
            return Serialization.fromJSON(GraphData, value);
        };
    }
    catch (e) {
        alert('GraphData ctor ' + e.name + ' ' + e.message);
}
});
