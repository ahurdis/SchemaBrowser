'use strict';


define(['source/control/ControlBase'], function (ControlBase) {
    try {
        return function Expander(options) {
            var self = this;

            // call parent constructor
            ControlBase.call(self, options);

            options = options ? options : {};

            self._width = options.width || 150;
            self._height = options.height || self._fontSize * 3;
            self._borderRadius = options.borderRadius || 4;
            self._value = 'Press Me!';

            self._borderColor = options.borderColor || 'rgba(79, 212, 253, 1.0)';

            self._onclick = options.onclick || function () { };

            self._wasOver = false;

            self._handleRadius = 6;

            var handleArray = [{ id: 0, x: self._x - self._handleRadius + self._width, y: self._y - self._handleRadius + self._height }];



            /**
             * Fired with the click event on the canvas, and puts focus on/off
             * based on where the user clicks.
             * @param  {Event}       e    The click event.
             * @param  {Expander} self
             * @return {Expander}
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

                        return self.focus();
                    }
                } else {
                    return self.blur();
                }
            };

            /**
             * Fired with the mousemove event to update the default cursor.
             * @param  {Event}       e    The mousemove event.
             * @param  {Expander} self
             * @return {Expander}
             */
            self.mousemove = function (e, self) {
                var mouse = self._mousePos(e),
                  x = mouse.x,
                  y = mouse.y,
                  isOver = self._overInput(x, y);

            };

            /**
             * Fired with the mousedown event to start a selection drag.
             * @param  {Event} e    The mousedown event.
             * @param  {Expander} self
             */
            self.mousedown = function (e, self) {
                var mouse = self._mousePos(e),
                  x = mouse.x,
                  y = mouse.y,
                  isOver = self._overInput(x, y);

                // setup the 'click' event
                self._mouseDown = isOver;

                self.render();
            };

            /**
             * Fired with the mouseup event 
             * @param  {Event} e    The mouseup event.
             * @param  {Expander} self
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
             * @return {CanvasInput}
             */
            self.render = function () {
                var ctx = self._ctx;

                ctx.save();
/*
                // clear the canvas
                ctx.clearRect(self._offsetX + self._x, self._offsetY + self._y,
                                self._width,
                                self._height);
                                */

                self._roundedRect(ctx,
                                    self._offsetX + self._x,
                                    self._offsetY + self._y,
                                    self._width,
                                    self._height,
                                    self._borderRadius);

                ctx.stroke();

                drawScissors(ctx, handleArray[0].x, handleArray[0].y);

           //     ctx.lineWidth = 3;

                ctx.restore();

                return self;
            };


            var drawArrow = function (ctx, x, y) {
                ctx.save();
                ctx.translate(x, y);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(25, 0);
                ctx.lineTo(25, 25);
                ctx.lineTo(0, 25);
                ctx.closePath();
                ctx.clip();
                ctx.translate(0, 0);
                ctx.translate(0, 0);
                ctx.scale(0.25, 0.25);
                ctx.translate(0, 0);
                ctx.strokeStyle = 'rgba(0,0,0,0)';
                ctx.lineCap = 'butt';
                ctx.lineJoin = 'miter';
                ctx.miterLimit = 4;
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(77.464, 49.999);
                ctx.bezierCurveTo(77.465, 50.333000000000006, 77.31, 50.645, 77.047, 50.848);
                ctx.lineTo(50.853, 70.986);
                ctx.bezierCurveTo(50.661, 71.132, 50.431000000000004, 71.208, 50.202, 71.208);
                ctx.bezierCurveTo(49.975, 71.208, 49.75, 71.137, 49.556999999999995, 70.992);
                ctx.bezierCurveTo(49.17399999999999, 70.70400000000001, 49.032, 70.193, 49.206999999999994, 69.747);
                ctx.lineTo(54.474999999999994, 56.412);
                ctx.lineTo(23.604999999999993, 56.413);
                ctx.bezierCurveTo(23.015999999999995, 56.412, 22.534999999999993, 55.934, 22.535999999999994, 55.342999999999996);
                ctx.lineTo(22.535999999999994, 44.657999999999994);
                ctx.bezierCurveTo(22.535999999999994, 44.06699999999999, 23.014999999999993, 43.589999999999996, 23.605999999999995, 43.58899999999999);
                ctx.lineTo(54.476, 43.58899999999999);
                ctx.lineTo(49.207, 30.254999999999992);
                ctx.bezierCurveTo(49.033, 29.807999999999993, 49.175000000000004, 29.296999999999993, 49.56, 29.007999999999992);
                ctx.bezierCurveTo(49.943000000000005, 28.71899999999999, 50.473, 28.71899999999999, 50.854, 29.014999999999993);
                ctx.lineTo(77.049, 49.15299999999999);
                ctx.bezierCurveTo(77.31, 49.354, 77.464, 49.669, 77.464, 49.999);
                ctx.closePath();
                ctx.moveTo(88.978, 50);
                ctx.bezierCurveTo(88.978, 71.492, 71.49199999999999, 88.97800000000001, 49.99999999999999, 88.97800000000001);
                ctx.bezierCurveTo(28.507999999999996, 88.97800000000001, 11.022, 71.492, 11.022, 50);
                ctx.bezierCurveTo(11.022, 28.507999999999996, 28.508, 11.022, 50, 11.022);
                ctx.bezierCurveTo(71.493, 11.022, 88.978, 28.508, 88.978, 50);
                ctx.closePath();
                ctx.moveTo(84.704, 50);
                ctx.bezierCurveTo(84.703, 30.864, 69.135, 15.297, 50, 15.297);
                ctx.bezierCurveTo(30.864, 15.297, 15.296, 30.865000000000002, 15.296, 50);
                ctx.bezierCurveTo(15.296, 69.136, 30.863, 84.703, 50, 84.703);
                ctx.bezierCurveTo(69.135, 84.703, 84.704, 69.136, 84.704, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();
                ctx.restore();
            };

            var drawX = function (ctx, x, y) {
                ctx.save();
                ctx.translate(x, y);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(25, 0);
                ctx.lineTo(25, 25);
                ctx.lineTo(0, 25);
                ctx.closePath();
                ctx.clip();
                ctx.translate(0, 0);
                ctx.translate(0, 0);
                ctx.scale(0.25, 0.25);
                ctx.translate(0, 0);
                ctx.strokeStyle = 'rgba(0,0,0,0)';
                ctx.lineCap = 'butt';
                ctx.lineJoin = 'miter';
                ctx.miterLimit = 4;
                ctx.save();
                ctx.fillStyle = "#020202";
                ctx.beginPath();
                ctx.moveTo(76.83, 32.561);
                ctx.lineTo(59.392, 50);
                ctx.lineTo(76.83, 67.439);
                ctx.bezierCurveTo(79.42399999999999, 70.03299999999999, 79.42399999999999, 74.237, 76.83, 76.83099999999999);
                ctx.bezierCurveTo(75.53399999999999, 78.127, 73.835, 78.77599999999998, 72.136, 78.77599999999998);
                ctx.bezierCurveTo(70.43599999999999, 78.77599999999998, 68.737, 78.12799999999999, 67.441, 76.83099999999999);
                ctx.lineTo(50, 59.391);
                ctx.lineTo(32.56, 76.831);
                ctx.bezierCurveTo(31.264000000000003, 78.12700000000001, 29.565, 78.776, 27.865000000000002, 78.776);
                ctx.bezierCurveTo(26.166, 78.776, 24.468000000000004, 78.128, 23.171000000000003, 76.831);
                ctx.bezierCurveTo(20.577, 74.238, 20.577, 70.034, 23.171000000000003, 67.43900000000001);
                ctx.lineTo(40.608, 50);
                ctx.lineTo(23.17, 32.561);
                ctx.bezierCurveTo(20.576, 29.967, 20.576, 25.762999999999998, 23.17, 23.169);
                ctx.bezierCurveTo(25.763, 20.577, 29.965000000000003, 20.577, 32.559, 23.169);
                ctx.lineTo(50, 40.609);
                ctx.lineTo(67.44, 23.169);
                ctx.bezierCurveTo(70.03399999999999, 20.577, 74.236, 20.577, 76.829, 23.169);
                ctx.bezierCurveTo(79.424, 25.763, 79.424, 29.967, 76.83, 32.561);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();
                ctx.restore();
            };

            var drawScissors = function (ctx, x, y) {
                ctx.save();
                ctx.translate(x, y);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(25, 0);
                ctx.lineTo(25, 25);
                ctx.lineTo(0, 25);
                ctx.closePath();
                ctx.clip();
                ctx.translate(0, 0);
                ctx.translate(0, 0);
                ctx.scale(0.25, 0.25);
                ctx.translate(0, 0);
                ctx.strokeStyle = 'rgba(0,0,0,0)';
                ctx.lineCap = 'butt';
                ctx.lineJoin = 'miter';
                ctx.miterLimit = 4;
                ctx.save();
                ctx.fillStyle = "#020202";
                ctx.beginPath();
                ctx.moveTo(82.084, 65.643);
                ctx.bezierCurveTo(79.989, 59.221000000000004, 75.188, 54.457, 69.855, 53.503);
                ctx.bezierCurveTo(68.119, 53.193, 66.42, 53.302, 64.805, 53.83);
                ctx.bezierCurveTo(64.49100000000001, 53.931999999999995, 64.191, 54.062999999999995, 63.894000000000005, 54.193999999999996);
                ctx.lineTo(58.39300000000001, 48.736999999999995);
                ctx.lineTo(58.37100000000001, 48.748999999999995);
                ctx.lineTo(57.66100000000001, 48.010999999999996);
                ctx.bezierCurveTo(57.946000000000005, 47.904999999999994, 58.23500000000001, 47.80499999999999, 58.51500000000001, 47.69499999999999);
                ctx.bezierCurveTo(81.93700000000001, 38.37499999999999, 78.72300000000001, 13.477999999999994, 78.688, 13.227999999999994);
                ctx.bezierCurveTo(78.622, 12.744999999999994, 78.284, 12.341999999999995, 77.82000000000001, 12.191999999999995);
                ctx.bezierCurveTo(77.355, 12.041999999999994, 76.843, 12.168999999999995, 76.507, 12.520999999999995);
                ctx.lineTo(50.007000000000005, 40.05799999999999);
                ctx.lineTo(23.61, 12.627);
                ctx.bezierCurveTo(23.273, 12.275, 22.762, 12.148000000000001, 22.298, 12.297);
                ctx.bezierCurveTo(21.833, 12.447000000000001, 21.496, 12.850000000000001, 21.427999999999997, 13.333);
                ctx.bezierCurveTo(21.392999999999997, 13.583, 18.179999999999996, 38.48, 41.602, 47.8);
                ctx.bezierCurveTo(41.830999999999996, 47.891999999999996, 42.07299999999999, 47.973, 42.305, 48.061);
                ctx.lineTo(41.638, 48.753);
                ctx.lineTo(41.606, 48.736);
                ctx.lineTo(36.105000000000004, 54.193);
                ctx.bezierCurveTo(35.80800000000001, 54.062, 35.508, 53.931, 35.194, 53.829);
                ctx.bezierCurveTo(33.579, 53.301, 31.881000000000004, 53.192, 30.144000000000002, 53.502);
                ctx.bezierCurveTo(24.812, 54.456, 20.01, 59.22, 17.915000000000003, 65.642);
                ctx.bezierCurveTo(16.573000000000004, 69.755, 16.505000000000003, 74.03399999999999, 17.719, 77.69);
                ctx.bezierCurveTo(19.004, 81.55199999999999, 21.556, 84.28, 24.902, 85.371);
                ctx.bezierCurveTo(26.517, 85.898, 28.216, 86.009, 29.952, 85.698);
                ctx.bezierCurveTo(35.285000000000004, 84.74499999999999, 40.085, 79.979, 42.181, 73.559);
                ctx.bezierCurveTo(43.047999999999995, 70.904, 43.349, 68.23599999999999, 43.172, 65.745);
                ctx.lineTo(47.461, 50.84);
                ctx.lineTo(47.336999999999996, 50.773);
                ctx.bezierCurveTo(48.833, 50.61300000000001, 48.37, 50.402, 49.776999999999994, 50.144000000000005);
                ctx.bezierCurveTo(51.282, 50.437000000000005, 50.928, 50.672000000000004, 52.541, 50.852000000000004);
                ctx.lineTo(56.827999999999996, 65.745);
                ctx.bezierCurveTo(56.650999999999996, 68.236, 56.952999999999996, 70.90400000000001, 57.818999999999996, 73.559);
                ctx.bezierCurveTo(59.91499999999999, 79.979, 64.71499999999999, 84.745, 70.047, 85.698);
                ctx.bezierCurveTo(71.783, 86.009, 73.483, 85.898, 75.098, 85.371);
                ctx.bezierCurveTo(78.444, 84.28099999999999, 80.995, 81.55199999999999, 82.281, 77.69);
                ctx.bezierCurveTo(83.494, 74.034, 83.426, 69.756, 82.084, 65.643);
                ctx.closePath();
                ctx.moveTo(28.374, 34.355);
                ctx.bezierCurveTo(28.374, 34.355, 22.645, 24.544999999999995, 23.102999999999998, 15.749999999999996);
                ctx.bezierCurveTo(23.102999999999998, 15.749999999999996, 29.281, 35.19, 34.580999999999996, 38.751);
                ctx.bezierCurveTo(34.58, 38.751, 31.084, 39.734, 28.374, 34.355);
                ctx.closePath();
                ctx.moveTo(38.54, 72.372);
                ctx.bezierCurveTo(36.903, 77.391, 33.181, 81.232, 29.278, 81.93);
                ctx.bezierCurveTo(28.171, 82.128, 27.098, 82.06200000000001, 26.09, 81.73200000000001);
                ctx.bezierCurveTo(23.927, 81.02700000000002, 22.245, 79.16300000000001, 21.353, 76.48200000000001);
                ctx.bezierCurveTo(20.395000000000003, 73.59800000000001, 20.466, 70.17000000000002, 21.557000000000002, 66.82900000000001);
                ctx.bezierCurveTo(23.194000000000003, 61.80900000000001, 26.917, 57.970000000000006, 30.82, 57.27100000000001);
                ctx.bezierCurveTo(31.927, 57.074000000000005, 33, 57.13900000000001, 34.008, 57.46800000000001);
                ctx.bezierCurveTo(38.689, 58.997, 40.724, 65.683, 38.54, 72.372);
                ctx.closePath();
                ctx.moveTo(50, 46.063);
                ctx.bezierCurveTo(49.24, 46.063, 48.625, 45.447, 48.625, 44.688);
                ctx.bezierCurveTo(48.625, 43.929, 49.24, 43.313, 50, 43.313);
                ctx.bezierCurveTo(50.76, 43.313, 51.375, 43.929, 51.375, 44.688);
                ctx.bezierCurveTo(51.375, 45.447, 50.76, 46.063, 50, 46.063);
                ctx.closePath();
                ctx.moveTo(78.646, 76.482);
                ctx.bezierCurveTo(77.754, 79.162, 76.07300000000001, 81.026, 73.91, 81.732);
                ctx.bezierCurveTo(72.901, 82.062, 71.829, 82.128, 70.722, 81.92999999999999);
                ctx.bezierCurveTo(66.82, 81.232, 63.096999999999994, 77.39099999999999, 61.461, 72.37199999999999);
                ctx.bezierCurveTo(59.275999999999996, 65.68299999999999, 61.311, 58.996999999999986, 65.992, 57.46899999999999);
                ctx.bezierCurveTo(67.001, 57.13899999999999, 68.07300000000001, 57.073999999999984, 69.18, 57.271999999999984);
                ctx.bezierCurveTo(73.08300000000001, 57.969999999999985, 76.805, 61.80999999999999, 78.44300000000001, 66.82999999999998);
                ctx.bezierCurveTo(79.534, 70.17, 79.605, 73.598, 78.646, 76.482);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();
                ctx.restore();
            };

            var drawAdd = function (ctx, x, y) {
                ctx.save();
                ctx.translate(x, y);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(25, 0);
                ctx.lineTo(25, 25);
                ctx.lineTo(0, 25);
                ctx.closePath();
                ctx.clip();
                ctx.translate(0, 0);
                ctx.translate(0, 0);
                ctx.scale(0.25, 0.25);
                ctx.translate(0, 0);
                ctx.strokeStyle = 'rgba(0,0,0,0)';
                ctx.lineCap = 'butt';
                ctx.lineJoin = 'miter';
                ctx.miterLimit = 4;
                ctx.save();
                ctx.fillStyle = "#020202";
                ctx.beginPath();
                ctx.moveTo(50, 11.126);
                ctx.bezierCurveTo(29.129, 11.126, 12.209000000000003, 28.046, 12.209000000000003, 48.916999999999994);
                ctx.bezierCurveTo(12.209000000000003, 69.78799999999998, 29.129, 86.708, 50, 86.708);
                ctx.bezierCurveTo(70.871, 86.708, 87.791, 69.788, 87.791, 48.917);
                ctx.bezierCurveTo(87.791, 28.046000000000006, 70.871, 11.126, 50, 11.126);
                ctx.closePath();
                ctx.moveTo(71.566, 54.988);
                ctx.lineTo(55.487, 54.988);
                ctx.lineTo(55.487, 71.065);
                ctx.bezierCurveTo(55.487, 73.82, 53.255, 76.053, 50.5, 76.053);
                ctx.bezierCurveTo(47.746, 76.053, 45.512, 73.82, 45.512, 71.065);
                ctx.lineTo(45.512, 54.988);
                ctx.lineTo(29.435, 54.988);
                ctx.bezierCurveTo(26.68, 54.988, 24.447, 52.755, 24.447, 50);
                ctx.bezierCurveTo(24.447, 47.245, 26.68, 45.012, 29.435, 45.012);
                ctx.lineTo(45.513, 45.012);
                ctx.lineTo(45.513, 28.935);
                ctx.bezierCurveTo(45.513, 26.18, 47.745999999999995, 23.948, 50.501, 23.948);
                ctx.bezierCurveTo(53.256, 23.948, 55.488, 26.18, 55.488, 28.935000000000002);
                ctx.lineTo(55.488, 45.013000000000005);
                ctx.lineTo(71.56700000000001, 45.013000000000005);
                ctx.bezierCurveTo(74.32100000000001, 45.013000000000005, 76.555, 47.246, 76.555, 50.001000000000005);
                ctx.bezierCurveTo(76.555, 52.75600000000001, 74.32, 54.988, 71.566, 54.988);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();
                ctx.restore();
            };

            var drawLink = function (ctx, x, y) {
                ctx.save();
                ctx.translate(x, y);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(25, 0);
                ctx.lineTo(25, 25);
                ctx.lineTo(0, 25);
                ctx.closePath();
                ctx.clip();
                ctx.translate(0, 0);
                ctx.translate(0, 0);
                ctx.scale(0.25, 0.25);
                ctx.translate(0, 0);
                ctx.strokeStyle = 'rgba(0,0,0,0)';
                ctx.lineCap = 'butt';
                ctx.lineJoin = 'miter';
                ctx.miterLimit = 4;
                ctx.save();
                ctx.fillStyle = "#020202";
                ctx.beginPath();
                ctx.moveTo(53.426, 83.59);
                ctx.lineTo(53.426, 84.59);
                ctx.bezierCurveTo(53.426, 86.247, 52.083, 87.59, 50.426, 87.59);
                ctx.lineTo(40.426, 87.59);
                ctx.bezierCurveTo(24.849000000000004, 87.59, 12.176000000000002, 74.917, 12.176000000000002, 59.34);
                ctx.bezierCurveTo(12.176000000000002, 43.763000000000005, 24.849000000000004, 31.090000000000003, 40.426, 31.090000000000003);
                ctx.lineTo(58.875, 31.090000000000003);
                ctx.lineTo(46.168, 18.384);
                ctx.bezierCurveTo(44.804, 17.02, 44.804, 14.799, 46.168, 13.435);
                ctx.bezierCurveTo(47.489, 12.113, 49.796, 12.113, 51.117, 13.435);
                ctx.lineTo(69.798, 32.116);
                ctx.bezierCurveTo(70.459, 32.777, 70.82300000000001, 33.656, 70.82300000000001, 34.591);
                ctx.bezierCurveTo(70.82300000000001, 35.526, 70.459, 36.405, 69.798, 37.066);
                ctx.lineTo(51.118, 55.746);
                ctx.bezierCurveTo(49.797000000000004, 57.068000000000005, 47.492000000000004, 57.07, 46.168, 55.746);
                ctx.bezierCurveTo(44.804, 54.382000000000005, 44.804, 52.161, 46.168, 50.797000000000004);
                ctx.lineTo(58.875, 38.09);
                ctx.lineTo(40.426, 38.09);
                ctx.bezierCurveTo(28.709000000000003, 38.09, 19.176000000000002, 47.623000000000005, 19.176000000000002, 59.34);
                ctx.bezierCurveTo(19.176000000000002, 71.057, 28.709000000000003, 80.59, 40.426, 80.59);
                ctx.lineTo(50.426, 80.59);
                ctx.bezierCurveTo(52.083, 80.59, 53.426, 81.934, 53.426, 83.59);
                ctx.closePath();
                ctx.moveTo(86.799, 32.116);
                ctx.lineTo(68.118, 13.435);
                ctx.bezierCurveTo(66.797, 12.113, 64.49, 12.113, 63.169, 13.435);
                ctx.bezierCurveTo(61.803999999999995, 14.799000000000001, 61.803999999999995, 17.02, 63.169, 18.384);
                ctx.lineTo(75.875, 31.09);
                ctx.lineTo(79.275, 34.459);
                ctx.lineTo(75.875, 38.09);
                ctx.lineTo(63.169, 50.796);
                ctx.bezierCurveTo(61.803999999999995, 52.16, 61.803999999999995, 54.381, 63.169, 55.745);
                ctx.bezierCurveTo(64.493, 57.068999999999996, 66.798, 57.067, 68.119, 55.745);
                ctx.lineTo(86.8, 37.06399999999999);
                ctx.bezierCurveTo(87.461, 36.40299999999999, 87.825, 35.523999999999994, 87.825, 34.58899999999999);
                ctx.bezierCurveTo(87.825, 33.65399999999999, 87.46, 32.776, 86.799, 32.116);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();
                ctx.restore();
            };



            // draw the text box
            self.render();

            // setup the inheritance chain
            Expander.prototype = ControlBase.prototype;
            Expander.prototype.constructor = ControlBase;
        }
    }
    catch (e) {
        alert('Expander ctor' + e.message);
    }
});