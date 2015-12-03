/*
 * Graph.js
 * @author Andrew
 */


'use strict';

define(['source/graph/GraphData'], function (GraphData) {

    function Graph() {
        var self = this;

        self.vertexSet = {};
        self.vertices = [];
        self.edges = [];
        self.adjacency = {};

        self.nextNodeId = 0;
        self.nextEdgeId = 0;

        self.AddVertex = function (options) {

            if (typeof (options) !== 'undefined') {
                options.id = self.nextNodeId++;
            }

            var vertex = new GraphData(options);

            if (vertex != null) {
                if (!(vertex.id in self.vertexSet)) {
                    self.vertices.push(vertex);
                }

                self.vertexSet[vertex.id] = vertex;
            }
            return vertex;

        };

        function createArray(length) {
            var arr = new Array(length || 0),
                i = length;

            if (arguments.length > 1) {
                var args = Array.prototype.slice.call(arguments, 1);
                while (i--) arr[length - 1 - i] = createArray.apply(this, args);
            }

            return arr;
        }


        self.GetVertexById = function (id) {
            if (id in self.vertexSet) {
                return self.vertexSet[id];
            }
            else {
                return null;
            }
        };

        self.GetAdjacencyMatrix = function () {
            var vertexCount = self.Count();

            var a = createArray(vertexCount, vertexCount);

            for (var i = 0; i < vertexCount; i++) {
                for (var j = 0; j < vertexCount; j++) {
                    if (typeof (self.adjacency[i]) !== 'undefined') {
                        if (typeof (self.adjacency[i][j]) !== 'undefined') {
                            a[i][j] = 1;
                        }
                        else {
                            a[i][j] = Infinity;
                        }
                    }
                    else {
                        a[i][j] = Infinity;
                    }
                }
            }

            return a;
        };


        self.AddEdge = function (source, target, options) {

            if (typeof (options) !== 'undefined') {
                options.id = self.nextEdgeId++;
                options.source = source;
                options.target = target;
            }

            var edge = new GraphData(options);

            if (edge != null) {

                // Only add an edge that doesn't already exist
                if (!self.ContainsEdge(edge)) {
                    self.edges.push(edge);
                }

                // Are we already in the adjacency "matrix"?
                if (!(edge.source.id in self.adjacency)) {
                    self.adjacency[edge.source.id] = {};
                }

                if (!(edge.target in self.adjacency[edge.source.id])) {
                    self.adjacency[edge.source.id][edge.target.id] = [];
                }

                var exists = false;
                self.adjacency[edge.source.id][edge.target.id].forEach(function (e) {
                    if (edge.id === e.id) { exists = true; }
                });

                if (!exists) {
                    self.adjacency[edge.source.id][edge.target.id].push(edge);
                }
            }
            return edge;
        };

        // get all self.edges for all vertices
        self.GetAllEdges = function () {
            return self.edges;
        };

        // get all vertices
        self.GetVertices = function () {
            return self.vertices;
        };

        // find the edges from vertex1 to vertex2
        self.GetEdgesBetween = function (vertex1, vertex2) {
            if (vertex1.id in self.adjacency
                    && vertex2.id in self.adjacency[vertex1.id]) {
                return self.adjacency[vertex1.id][vertex2.id];
            }

            return [];
        };

        // find all edges from a given vertex 
        self.GetEdges = function (vertex) {
            if (vertex.id in self.adjacency) {
                return self.adjacency[vertex.id];
            }

            return [];
        };

        // remove a vertex and it's associated edges from the graph
        self.RemoveVertex = function (vertex) {
            if (vertex.id in self.vertexSet) {
                delete self.vertexSet[vertex.id];
            }

            for (var i = self.vertices.length - 1; i >= 0; i--) {
                if (self.vertices[i].id === vertex.id) {
                    self.vertices.splice(i, 1);
                }
            }

            self.DetachVertex(vertex);
        };

        // removes edges associated with a given vertex
        self.DetachVertex = function (vertex) {
            var tmpEdges = self.edges.slice();
            tmpEdges.forEach(function (e) {
                if (e.source === vertex || e.target === vertex) {
                    RemoveEdge(e);
                }
            }, self);
        };

        // remove a vertex and it's associated edges from the graph
        self.RemoveEdge = function (edge) {
            for (var i = self.edges.length - 1; i >= 0; i--) {
                if (self.edges[i].id === edge.id) {
                    self.edges.splice(i, 1);
                }
            }

            for (var x in self.adjacency) {
                for (var y in self.adjacency[x]) {
                    var edges = self.adjacency[x][y];

                    for (var j = edges.length - 1; j >= 0; j--) {
                        if (self.adjacency[x][y][j].id === edge.id) {
                            self.adjacency[x][y].splice(j, 1);
                        }
                    }

                    // Clean up empty edge arrays
                    if (self.adjacency[x][y].length == 0) {
                        delete self.adjacency[x][y];
                    }
                }

                // Clean up empty objects
                if (isEmpty(self.adjacency[x])) {
                    delete self.adjacency[x];
                }
            }
        };

        self.FilterVertices = function (fn) {
            var tmpVertices = self.vertices.slice();
            tmpVertices.forEach(function (n) {
                if (!fn(n)) {
                    self.RemoveVertex(n);
                }
            }, self);
        };

        self.FilterEdges = function (fn) {
            var tmpEdges = self.edges.slice();
            tmpEdges.forEach(function (e) {
                if (!fn(e)) {
                    self.RemoveEdge(e);
                }
            }, self);
        };

        // Is the graph empty?
        self.IsEmpty = function () {
            return (self.vertices.length === 0);
        };

        // Gets the vertex count
        self.Count = function () {
            return self.vertices.length;
        };

        // Returns true if the Graph contains a vertex
        self.ContainsVertex = function (vertex) {

            self.vertices.forEach(function (v) {
                if (vertex === v) { return true; }
            });

            return false;
        };
        /*
        self.GetMatchingVertices = function (fn) {
            var tmpVertices = self.vertices.slice();
            tmpVertices.forEach(function (n) {
                if (fn(n)) {
          //          self.RemoveVertex(n);
                }
            }, self);
        };
        */

        // Returns true if the Graph contains an edge
        self.ContainsEdge = function (edge) {

            self.edges.forEach(function (e) {
                if (edge === e) { return true; }
            });

            return false;
        };

        // Initialize the state of the graph
        self.Clear = function () {
            self.vertices = [];
            self.edges = [];
            self.adjacency = {};
        };

        self.toJSON = function () {

            var rv = {
                ctor: "Graph",
                data: {
                    vertexSet: self.vertexSet,
                    vertices: self.vertices,
                    edges: self.edges,
                    adjacency: self.adjacency,
                    nextNodeId: self.nextNodeId,
                    nextEdgeId: self.nextEdgeId

                }
            };

            return Serialization.toJSON(rv.ctor, rv.data);
        };
    };

    Graph.fromJSON = function (value) {
        return Serialization.fromJSON(Graph, value);
    };

    // return constructor
	return Graph;
});

