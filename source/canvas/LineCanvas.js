'use strict';


define(['source/canvas/CanvasBase', 'source/canvas/PolyLine'], function (CanvasBase, PolyLine) {
    try {
        return function LineCanvas(options) {
            var self = this;

            // call parent constructor
            CanvasBase.call(self, options);

            var pl = null;
            var selectedControl = null;

            options = options ? options : {};

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
               // alert();

                pl = new PolyLine({ canvas: self._canvas });
                pl.addPoint({ x: x, y: y });
                pl.addPoint({ x: x + 10, y: y + 10});
                pl.addPoint({ x: x + 20, y: y});
                //    alert();
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

                if (pl) {
                    pl.render();
                }

                if (selectedControl) {
                    alert(selectedControl.width())
                }

                ctx.restore();

                return self;
            };


            // draw the text box
            self.render();

            // setup the inheritance chain
            LineCanvas.prototype = CanvasBase.prototype;
            LineCanvas.prototype.constructor = CanvasBase;
        }
    }
    catch (e) {
        alert('LineCanvas ctor' + e.message);
    }
});