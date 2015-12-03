/**
 * @author Andrew
 */

'use strict';

define(['source/graph/Graph'],
    function (Graph) {
    try {
        return function GraphFactory() {

			var self = this;
			
			self._graph = null;
            
           
			self.GetGraph = function ()
            {
			    return self._graph;
            };
            

			self.CreateSimpleGraph = function ()
            {
                self._graph = new Graph();

                var vertex1 = self._graph.AddVertex({ type: 'Data Source', x: 10, y: 10, imageName: 'images/DataSource.png' });
                var vertex2 = self._graph.AddVertex({ type: 'Filter', x: 100, y: 100, imageName: 'images/Filter.png' });
                var vertex3 = self._graph.AddVertex({ type: 'Table', x: 200, y: 120, imageName: 'images/Table.png' });

			    self._graph.AddEdge(vertex1, vertex2, { type: 'Data Source' });
			    self._graph.AddEdge(vertex2, vertex3, { type: 'Data Source' });

                return self._graph;
            };
        }
    }
    catch (e) {

        alert('GraphFactory ctor' + e.message);
    }
});