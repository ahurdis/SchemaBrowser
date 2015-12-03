/**
 * @author Andrew
 */

'use strict';

define(['source/graph/Graph'],
    function (Graph) {
        try {
            return function GraphSerializer() {

                var self = this;

                self.SaveGraph = function (graph) {
                    try {
                        var jsonString = JSON.stringify(graph);

                        if (typeof (Storage) !== "undefined") {
                            localStorage.graph = jsonString;
                        }
                    } catch (e) {
                        alert("GraphSerializer: saveGraph " + e.name + " " + e.message);
                    }
                }

                self.LoadGraph = function () {
                    try {

                        var ret = null;

                        // Get back the array of vertex serializers
                        // But why does JSON.parse() need to be called twice?

                        if (typeof (Storage) !== "undefined") {
                            ret = Graph.fromJSON(localStorage.graph);
                        }

                        return ret;

                    } catch (e) {
                        alert("GraphSerializer: loadGraph " + e.name + " " + e.message);
                    }
                }

            }
        }
        catch(e) {
            alert("GraphSerializer: ctor " + e.name + " " + e.message);
        }
    });