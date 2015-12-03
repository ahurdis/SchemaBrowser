'use strict';


define(function () {
    try {
        return function PolyLine(options) {
            var self = this;

            self._canvas = options.canvas || null;
            self._ctx = self._canvas ? self._canvas.getContext('2d') : null;

            var points = options.points || [];


            options = options ? options : {};

            self.addPoint = function(point) {
                points.push(point);
            }

            self.addPointAt = function (point, i) {
                points.splice(i, 0, point);
            }

            /**
             * Fired with the click event on the canvas, and puts focus on/off
             * based on where the user clicks.
             * @param  {Event}       e    The click event.
             * @param  {LineCanvas} self
             * @return {LineCanvas}
             */
            self.click = function (e, self) {
                var mouse = self._mousePos(e),
                  x = mouse.x,
                  y = mouse.y;



                if (self._canvas) {
                    if (self._mouseDown) {
                        self._mouseDown = false;
                        self.click(e, self);
                    }
                }
            };

            /**
             * Fired with the mousemove event to update the default cursor.
             * @param  {Event}       e    The mousemove event.
             * @param  {LineCanvas} self
             * @return {LineCanvas}
             */
            self.mousemove = function (e, self) {
                var mouse = self._mousePos(e),
                  x = mouse.x,
                  y = mouse.y;


                //  isOver = self._overInput(x, y);

            };

            /**
             * Fired with the mousedown event to start a selection drag.
             * @param  {Event} e    The mousedown event.
             * @param  {LineCanvas} self
             */
            self.mousedown = function (e, self) {
                var mouse = self._mousePos(e),
                  x = mouse.x,
                  y = mouse.y;

                // is the point at an endpoint of a line?

                // is the point in the middle of a line segment?

                // is the point the beginning of a new line?

                self.render();
            };

            /**
             * Fired with the mouseup event 
             * @param  {Event} e    The mouseup event.
             * @param  {LineCanvas} self
             */
            self.mouseup = function (e, self) {
                var mouse = self._mousePos(e),
                  x = mouse.x,
                  y = mouse.y;

        //        alert();

                self.click(e, self);
            };



            /**
             * Clears and redraws the CanvasInput on an off-DOM canvas,
             * and if a main canvas is provided, draws it all onto that.
             * @return {LineCanvas}
             */
            self.render = function () {
                var ctx = self._ctx;

                ctx.save();

                if (points.length) {
                    ctx.moveTo(points[0].x, points[0].y);
                }

                for (var i = 1; i < points.length; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }

                ctx.stroke();

                ctx.restore();

                return self;
            };

            /**
             * Calculate the mouse position based on the event callback and the elements on the page.
             * @param  {Event} e
             * @return {Object}   x & y values
             */
            self._mousePos = function (e) {
                var elm = e.target,
                  style = document.defaultView.getComputedStyle(elm, undefined),
                  paddingLeft = parseInt(style['paddingLeft'], 10) || 0,
                  paddingTop = parseInt(style['paddingLeft'], 10) || 0,
                  borderLeft = parseInt(style['borderLeftWidth'], 10) || 0,
                  borderTop = parseInt(style['borderLeftWidth'], 10) || 0,
                  htmlTop = document.body.parentNode.offsetTop || 0,
                  htmlLeft = document.body.parentNode.offsetLeft || 0,
                  offsetX = 0,
                  offsetY = 0,
                  x, y;

                // calculate the total offset
                if (typeof elm.offsetParent !== 'undefined') {
                    do {
                        offsetX += elm.offsetLeft;
                        offsetY += elm.offsetTop;
                    } while ((elm = elm.offsetParent));
                }

                // take into account borders and padding
                offsetX += paddingLeft + borderLeft + htmlLeft;
                offsetY += paddingTop + borderTop + htmlTop;

                return {
                    x: e.pageX - offsetX,
                    y: e.pageY - offsetY
                };
            };

            // setup main canvas events
            if (self._canvas) {
                self._canvas.addEventListener('mousemove', function (e) {
                    e = e || window.event;
                    self.mousemove(e, self);
                }, false);

                self._canvas.addEventListener('mousedown', function (e) {
                    e = e || window.event;
                    self.mousedown(e, self);
                }, false);

                self._canvas.addEventListener('mouseup', function (e) {
                    e = e || window.event;
                    self.mouseup(e, self);
                }, false);
            }

            // draw the polyline box
            self.render();
        }
    }
    catch (e) {
        alert('PolyLine ctor' + e.message);
    }
});