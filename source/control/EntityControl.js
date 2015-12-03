// JavaScript source code

/**
 * EntityControl.js
 * @author Andrew
 */

'use strict';


define(['source/control/ControlBase'], function (ControlBase) {
    try {
        return function EntityControl(options) {
            var self = this;

            // call parent constructor
            ControlBase.call(self, options);

            options = options ? options : {};

            self._width = options.width || 250;
            self._values = ['name', 'description', 'location'];
            self._height = options.height || self._fontSize * 2 * self._values.length;
            self._borderRadius = options.borderRadius || 10;
            self._value = 'default';

            self._borderColor = options.borderColor || 'rgba(79, 212, 253, 1.0)';
            self._selectionColor = options.selectionColor || 'rgba(179, 212, 253, 0.6)';

            self._textPadding = 10;
            self._textCellSize = self._fontSize + self._textPadding;

            self._onsubmit = options.onsubmit || function () { };
            self._onclick = options.onclick || function () { };


            var dragging;
            var handleDragging;
            var mouseX, mouseY;
            var dragHoldX, dragHoldY;
            var timer;
            var targetX, targetY;
            var easeAmount = 0.4;
            var oldX, oldY;

            self._selected = false;
            self._handleRadius = 6;

            var handleArray = [ { x: self._x - self._handleRadius + self._width, y: self._y - self._handleRadius + self._height} ];
            
            /*
            { x: self._x + self._handleRadius, y: self._y + self._handleRadius },
                               { x: self._x - self._handleRadius + self._width, y: self._y + self._handleRadius },
                               { x: self._x + self._handleRadius, y: self._y - self._handleRadius + self._height},
            */

            var activeHandle = null;

            self._wasOver = false;

            self._canvas.onclick = function (event) {
                if (event.region) {
                    alert('You clicked ' + event.region);
                }
            }

            /**
             * Helper method to get the off-DOM canvas.
             * @return {Object} Reference to the canvas.
             */
            self.renderCanvas = function () {
                return self._renderCanvas;
            };


            /**
             * Fired with the click event on the canvas, and puts focus on/off
             * based on where the user clicks.
             * @param  {Event}       e    The click event.
             * @param  {CheckBox} self
             * @return {CheckBox}
             */
            self.click = function (e, self) {
                var mouse = self._mousePos(e),
                              x = mouse.x,
                              y = mouse.y;

                if (self._canvas && self._overInput(x, y)) {
                    if (self._mouseDown) {
                        self._mouseDown = false;
                        // call the user defined onclick
                        self._onclick();
                        self._selected = !self._selected;
                        return self.focus();
                    }
                } else {
                    return self.blur();
                }
            };

            /**
             * Fired with the mousemove event to update the default cursor.
             * @param  {Event}       e    The mousemove event.
             * @param  {CheckBox} self
             * @return {CheckBox}
             */
            self.mousemove = function (e, self) {
                var mouse = self._mousePos(e),
                  x = mouse.x,
                  y = mouse.y,
                  isOver = self._overInput(x, y);

                if (dragging) {
                    var posX;
                    var posY;
                    var minX = 0;
                    var maxX = self._canvas.width - this._width;
                    var minY = 0;
                    var maxY = self._canvas.height - this._height;
                    //getting mouse position correctly
                    var bRect = self._canvas.getBoundingClientRect();
                    mouseX = (event.clientX - bRect.left) * (self._canvas.width / bRect.width);
                    mouseY = (event.clientY - bRect.top) * (self._canvas.height / bRect.height);

                    //clamp x and y positions to prevent object from dragging outside of canvas
                    posX = mouseX - dragHoldX;
                    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
                    posY = mouseY - dragHoldY;
                    posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

                    targetX = posX;
                    targetY = posY;
                }
                
                if (handleDragging) {
                    self._width = self._width + x - activeHandle.x;
                    self._height = self._height + y - activeHandle.y;
                    activeHandle.x = x;
                    activeHandle.y = y;
                }

                self.render();
            };


            /**
             * Fired with the mousedown event to start a selection drag.
             * @param  {Event} e    The mousedown event.
             * @param  {CheckBox} self
             */
            self.mousedown = function (e, self) {
                var mouse = self._mousePos(e),
                  x = mouse.x,
                  y = mouse.y,
                  isOver = self._overInput(x, y);

                // setup the 'click' event
                self._mouseDown = isOver;

                // are we in a handle?

                if (self._selected)
                {
                    activeHandle = mouseInHandle(x, y);

                    handleDragging = activeHandle.inHandle;
                }

                dragHoldX = x - self._x;
                dragHoldY = y - self._y;

                // The "target" position is where the object should be if it were to move there instantaneously.
                // This target position is approached gradually, producing a smooth motion.
                targetX = x - dragHoldX;
                targetY = y - dragHoldY;

                dragging = isOver && !handleDragging;

                if (dragging) {
                    easeAmount = 0.5;
                    //start timer
                    timer = setInterval(onMouseTimer, 1000 / 30);
                }

                self.render();
            };

            /**
             * Fired with the mouseup event 
             * @param  {Event} e    The mouseup event.
             * @param  {CheckBox} self
             */
            self.mouseup = function (e, self) {
                var mouse = self._mousePos(e),
                  x = mouse.x,
                  y = mouse.y;

                self.click(e, self);

                if (dragging || handleDragging) {
                    dragging = false;
                    handleDragging = false;
/*
                    easeAmount = 0.7;
                    targetX = x;
                    targetY = y;
*/
                }
            };

            function updateHandleArray() {
                if (handleDragging) {
 ///                   handleArray = [{ x: self._x - self._handleRadius + self._width, y: self._y - self._handleRadius + self._height }];
                }
                else {
                   handleArray = [  { x: self._x - self._handleRadius + self._width, y: self._y - self._handleRadius + self._height } ];
                }
            }

            function mouseInHandle(x, y) {

                for (var i = 0; i < handleArray.length; i++) {
                    if ((Math.sqrt(Math.pow(x - handleArray[i].x, 2) + Math.pow(y - handleArray[i].y, 2)) <= self._handleRadius)) {
                        return { inHandle: true, x: handleArray[i].x, y: handleArray[i].y };
                    }
                }
                return { inHandle: false, x: NaN, y: NaN };
            };

            function onMouseTimer() {

                oldX = self._x;
                oldY = self._y;


                self._x = self._x + easeAmount * (targetX - self._x);
                self._y = self._y + easeAmount * (targetY - self._y);

                //stop the timer when the target position is reached (close enough)
                if ((!dragging) && (Math.abs(self._x - targetX) < 0.1) && (Math.abs(self._y - targetY) < 0.1)) {
                    self._x = targetX;
                    self._y = targetY;

                    //stop timer:
                    clearInterval(timer);
                }
                self.render();

                updateHandleArray();

            };

            self.render = function () {
                var ctx = self._ctx;

                ctx.clearRect(oldX - 2, oldY - 2, self._width + 3, self._height + 3);

                ctx.save();
                       
                self._roundedRect(ctx,
                                    self._x,
                                    self._y,
                                    self._width,
                                    self._height,
                                    self._borderRadius);

                if (self._selected) {
                  //  ctx.setLineDash([5]);
                }
               //     ? ctx.lineWidth = 4 : ctx.lineWidth = 2;

                

                ctx.stroke();

                if (self._selected) {

                    ctx.fillStyle = self._selectionColor;
                    ctx.lineWidth = 1;


                    // draw handles at each of the corners
                    for (var i = 0; i < handleArray.length; i++)
                    {
                        ctx.beginPath();
                        ctx.arc(handleArray[i].x, handleArray[i].y, self._handleRadius, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.stroke();
                    }

                 //   ctx.drawImage(images[0], 100, 100, 25, 25);

//                    drawScissors(ctx, handleArray[0].x, handleArray[0].y);
                }

                ctx.font = self._fontStyle + ' ' + self._fontWeight + ' ' + self._fontSize + 'px ' + self._fontFamily;

                for (var i = 0; i < self._values.length; i++) {
                    ctx.fillText(self._values[i], self._x + ((self._width - ctx.measureText(self._value).width) / 2),
                        self._y + (i + 1) * self._textCellSize);
                }

                ctx.restore();

                return self;
            };

            /**
             * Get/set the current text box value.
             * @param  {String} data Text value.
             * @return {Mixed}      EditBox or current text value.
             */
            self.value = function (data) {
                if (typeof data !== 'undefined') {
                    self._value = data + '';

                    self.render();

                    return self;
                } else {
                    return (self._value === self._placeHolderText) ? '' : self._value;
                }
            };

            /**
             * Recalculate the outer with and height of the text box.
             */
            self._calcWH = function () {
                // calculate the full width and height with padding, borders and shadows
                self.outerW = self._width + self._offsetX * 2 + self._borderWidth * 2 + self.shadowW;
                self.outerH = self._height + self._offsetY * 2 + self._borderWidth * 2 + self.shadowH;
            };

            /**
             * Update the width and height of the off-DOM canvas when attributes are changed.
             */
            self._updateCanvasWH = function () {
                var oldW = self._renderCanvas.width,
                  oldH = self._renderCanvas.height;

                // update off-DOM canvas
                self._renderCanvas.setAttribute('width', self.outerW);
                self._renderCanvas.setAttribute('height', self.outerH);
                self._shadowCanvas.setAttribute('width', self._width + self._padding * 2);
                self._shadowCanvas.setAttribute('height', self._height + self._padding * 2);

                // clear the main canvas
                if (self._ctx) {
                    self._ctx.clearRect(self._x, self._y, oldW, oldH);
                }
            };

            // setup the off-DOM canvas
            self._renderCanvas = document.createElement('canvas');
            self._renderCanvas.setAttribute('width', self.outerW);
            self._renderCanvas.setAttribute('height', self.outerH);
            self._renderCtx = self._renderCanvas.getContext('2d');


            // setup the inheritance chain
            EntityControl.prototype = ControlBase.prototype;
            EntityControl.prototype.constructor = ControlBase;

        }
    }
    catch (e) {
        alert('EntityControl ctor' + e.message);
    }
});
