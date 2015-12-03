'use strict';


define(['source/canvas/CanvasBase'], function (CanvasBase) {
    try {
        return function LineCanvas(options) {
            var self = this;

            // call parent constructor
            CanvasBase.call(self, options);

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
                        //                      return self.focus();
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

                // isOver = self._overInput(x, y);

                // setup the 'click' event
                // self._mouseDown = isOver;
                alert();


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