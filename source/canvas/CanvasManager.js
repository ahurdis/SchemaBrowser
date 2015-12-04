/*
 * CanvasManager.js
 * @author Andrew
 */

'use strict';

define(["source/graph/Graph", "source/canvas/CanvasUtilities", "source/canvas/TableShape", "source/utility/RestHelper"],
    function (Graph, CanvasUtilities, TableShape, RestHelper) {
        try {
            return function CanvasManager(canvas, graph) {

                var self = this;

                self.graph = graph;
                self.canvas = canvas;
                self.ctx = self.canvas.getContext('2d');
                self.mouseHandler = 'DrawNode';
                
                // for every edge in the graph, create a tableshape
                var vertices = self.graph.GetVertices();

                for (var i = 0; i < vertices.length; i++) {
                    var graphData = vertices[i];
                    vertices[i].shape = new TableShape(graphData.x, graphData.y, graphData.imageName);
                }
             
                self.SetMouseHandler = function (mouseHandler) {
                    self.mouseHandler = mouseHandler;
                }

                self.AddVertex = function (vertexId, e) {

                    if (vertexId === null)
                        return;

                    var mouse = self.GetMouse(e);
                    var x = mouse.x;
                    var y = mouse.y;
                    
                    var gd = { name: 'My Data Source', type: 'SQLServer', x: x, y: y, imageName: 'images/DataSource.png' };

                    RestHelper.postJSON(this, { method: 'CreateVertex', data: gd }, function (data) {

                        var v = self.graph.AddVertex(gd);

                        v.shape = new TableShape(v.x, v.y, v.imageName);

                        self.valid = false;
                        
//                        alert('The graph has ' + data + ' elements in it.')
                    });
                };

                self.GetMouse = function (e) {
                    var element = self.canvas, offsetX = 0, offsetY = 0, mx, my;

                    // Compute the total offset
                    if (element.offsetParent !== undefined) {
                        do {
                            offsetX += element.offsetLeft;
                            offsetY += element.offsetTop;
                        } while ((element = element.offsetParent));
                    }

                    // Add padding and border style widths to offset
                    offsetX += self.stylePaddingLeft + self.styleBorderLeft + self.htmlLeft;
                    offsetY += self.stylePaddingTop + self.styleBorderTop + self.htmlTop;
                    mx = e.pageX - offsetX;
                    my = e.pageY - offsetY;

                    // We return a hash with x and y
                    return {
                        x: mx,
                        y: my
                    };
                };

                // **** Then events! ****
                var selectedVertexIndex = -1;

                var m_functionOnMouseUp = function (e) {
                    self.dragging = false;

                    try {

                        if (self.mouseHandler == 'DrawEdge' && self.selection) {

                            var mouse = self.GetMouse(e);
                            var mx = mouse.x;
                            var my = mouse.y;
                            var vertices = self.graph.GetVertices();
                            var l = vertices.length;

                            for (var i = l - 1; i >= 0; i--) {
                                if (vertices[i].shape.Contains(mx, my)) {
                                    self.graph.AddEdge(self.selectedVertex, vertices[i], {type : 'Association'});
                                    self.valid = false;
                                }
                            }

                        }
                        
                        self.selection = null;
                        self.selectedVertex = null;
                        
                    } catch (e) {

                        alert(e.message);
                    }
                };

                var m_functionOnMouseMove = function (e) {

                    try {

                        if (self.dragging) {

                            var mouse = self.GetMouse(e);
                            // We don't want to drag the object by its top-left corner, we want to drag it
                            // from where we clicked. Thats why we saved the offset and use it here
                            self.selection.x = mouse.x - self.dragoffx;
                            self.selection.y = mouse.y - self.dragoffy;

                            if (typeof self.graph.GetVertices()[selectedVertexIndex] !== 'undefined') {
                                self.graph.GetVertices()[selectedVertexIndex].shape.x = self.selection.x;
                                self.graph.GetVertices()[selectedVertexIndex].shape.y = self.selection.y;
                            }

                            self.valid = false;
                            // Something's dragging so we must redraw
                        }

                        if (self.mouseHandler == 'DrawEdge' && self.selection) {

                            var mouse = self.GetMouse(e);
                            self.ctx.strokeStyle = '#AAAAAA';
                            self.ctx.beginPath();
                            self.ctx.moveTo(self.selection.x + self.selection.w, self.selection.y + self.selection.h / 2);

                            self.ctx.bezierCurveTo(self.selection.x + self.selection.w + 30, self.selection.y + self.selection.h / 2,
                                mouse.x - 30, mouse.y,
                                mouse.x, mouse.y);

                            //  self.ctx.lineTo(mouse.x, mouse.y);
                            self.ctx.stroke();
                            self.valid = false;
                        }
                    } catch (e) {

                        alert(e.message);
                    }
                };

                var m_functionOnMouseDown = function (e) {

                    try {
                        var mouse = self.GetMouse(e);
                        var mx = mouse.x;
                        var my = mouse.y;
                        var vertices = self.graph.GetVertices();

                        var l = vertices.length;
                        for (var i = l - 1; i >= 0; i--) {
                            if (vertices[i].shape.Contains(mx, my)) {

                                var myShape = vertices[i].shape;

                                self.selectedVertex = vertices[i];
                                self.selectedVertexIndex = i;

                                if (self.mouseHandler === 'DrawEdge') {
                                    self.selection = myShape;
                                    self.valid = false;
                                    return;
                                }
                                else {
                                    self.dragoffx = mx - myShape.x;
                                    self.dragoffy = my - myShape.y;
                                    self.dragging = true;
                                    self.selection = myShape;
                                    self.valid = false;
                                    return;
                                    // Keep track of where in the object we clicked
                                }
                            }
                        }

                        // If we're here, nothing is selected, so we ensure deselect it
                        if (self.selection) {
                            self.selectedVertex = null;
                            self.selection = null;
                            self.valid = false;
                            // Need to clear the old selection border
                        }
                    } catch (e) {
                        alert(e.message);
                    }
                };

                // Creates an object with x and y defined, set to the mouse position relative to the state's canvas
                // If you wanna be super-correct this can be tricky, we have to worry about padding and borders
                // This complicates things a little but but fixes mouse co-ordinate problems
                // when there's a border or padding. See GetMouse for more detail

                if (document.defaultView && document.defaultView.getComputedStyle) {

                    self.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
                    self.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
                    self.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
                    self.styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
                }
                // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
                // They will mess up mouse coordinates and this fixes that
                var html = document.body.parentNode;
                self.htmlTop = html.offsetTop;
                self.htmlLeft = html.offsetLeft;

                // **** Keep track of state! ****

                self.valid = false;
                // when set to false, the canvas will redraw everything
                self.dragging = false;
                // Keep track of when we are dragging
                // the current selected object. In the future we could turn this into an array for multiple selection
                self.selection = null;
                self.selectedVertex = null;
                self.dragoffx = 0;
                self.dragoffy = 0;

                // mousedown, mousemove, and mouseup are for dragging
                $(canvas).bind('mousedown', m_functionOnMouseDown);
                $(canvas).bind('mousemove', m_functionOnMouseMove);
                $(canvas).bind('mouseup', m_functionOnMouseUp);

                self.Clear = function () {
                    self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
                };

                // While draw is called as often as the INTERVAL variable demands,
                // It only ever does something if the canvas gets invalidated by our code
                self.Draw = function () {
                    // if our state is invalid, redraw and validate
                    if (!self.valid) {
                        var ctx = self.ctx;

                        self.Clear();

                        var vertices = graph.GetVertices();

                        for (var i = 0; i < vertices.length; i++) {

                            vertices[i].shape.Draw(ctx, graph);

                            // get the edges from each vertex
                            var edges = self.graph.GetEdges(vertices[i]);

                            // for each edge, draw a curve between the source and the target
                            for (var j in edges) {
                                for (var iTarget = 0; iTarget < vertices.length; iTarget++) {
                                    if (edges[j][iTarget]) {
                                        var source = edges[j][iTarget].source;
                                        var target = edges[j][iTarget].target;

                                        ctx.strokeStyle = '#AAAAAA';
                                        
                                        ctx.beginPath();
                                        ctx.moveTo(source.shape.x + source.shape.w, source.shape.y + source.shape.h / 2);
                                        ctx.bezierCurveTo(source.shape.x + source.shape.w + 30, source.shape.y + source.shape.h / 2,
                                            target.shape.x - 30, target.shape.y + target.shape.h / 2,
                                            target.shape.x, target.shape.y + target.shape.h / 2);

                                        ctx.stroke();
                                    }
                                }
                            }
                        }

                        self.valid = true;
                    }
                };

                // **** Options! ****
                self.interval = 30;
                setInterval(function () {

                    self.Draw();
                }, self.interval);
            }
        }
        catch (e) {
            return e;
        }
    });
