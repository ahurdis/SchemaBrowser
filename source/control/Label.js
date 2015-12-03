/**
 * Label.js
 * @author Andrew
 */

'use strict';

define(["source/control/ControlBase"], function (ControlBase) {
    try {
        return function Label(options) {
            var self = this;

            // call parent constructor
            ControlBase.call(self, options);

            options = options ? options : {};

            self._offsetX = options.offsetX || 2;
            self._offsetY = options.offsetY || 2;

            self._width = options.width || 150;
            self._height = options.height || self._fontSize * 3;
            self._value = options.value || 'Label';

            self._isActive = true;

            /**
             * Clears and redraws the CanvasInput on an off-DOM canvas,
             * and if a main canvas is provided, draws it all onto that.
             * @return {CanvasInput}
             */
            self.render = function () {
                var ctx = self._ctx;

                ctx.save();
             
                // clear the canvas
                ctx.clearRect(self._x, self._y,
                                self._width,
                                self._height);
                                
                /*
                self._roundedRect(ctx,
                    self._x,
                    self._y,
                    self._width,
                    self._height,
                    2);

                ctx.stroke();
                */

                ctx.font = self._fontStyle + ' ' + self._fontWeight + ' ' + self._fontSize + 'px ' + self._fontFamily;
                ctx.fillText(self._value, self._x + self._offsetX,
                                          self._y + self._offsetY + self._height / 2);

                ctx.restore();

                return self;
            };

            /**
             * Get/set the value for the label.
             * @param  {String} data Label
             * @return {Mixed}      ControlBase or current label value.
             */

            self.value = function (data) {
                if (typeof data !== 'undefined') {
                    self._value = data;

                    return this; // self.render();
                } else {
                    return self._value;
                }
            };

            /**
             * Get/set the width of the label.
             * @param  {Number} data Width in pixels.
             * @return {Mixed}      EditBox or current width.
             */
            self.width = function (data) {
                if (typeof data !== 'undefined') {
                    self._width = data;
                    return this; // self.render();
                } else {
                    return self._width;
                }
            };

            // draw the text box
            self.render();

            // setup the inheritance chain
            Label.prototype = ControlBase.prototype;
            Label.prototype.constructor = ControlBase;
        }
    }
    catch (e) {
        alert('Label ctor' + e.message);
    }
});



/*
                    var g1 = ctx.createLinearGradient(self._offsetX + self._x, self._offsetY + self._y, self._offsetX +
                                                        self._x, self._offsetY + self._y + self._height);
                    g1.addColorStop(0, self._topColorStart);
                    g1.addColorStop(1, self._topColorEnd);
                    ctx.fillStyle = g1;
                    ctx.beginPath();
                    ctx.rect(self._offsetX + self._x + self._borderRadius, self._offsetY + self._y + self._borderRadius,
                        self._width - (2 * self._borderRadius), (self._height / 2) - self._borderRadius);
                    ctx.fill();
*/