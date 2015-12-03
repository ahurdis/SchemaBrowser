// JavaScript source code

/**
 * Form.js
 * @author Andrew
 */

'use strict';



define(['source/control/Button', 'source/control/DropDown', 'source/control/EditBox', 'source/control/Label'],
function (Button, DropDown, EditBox, Label) {
    try {
        return function Form(options) {
            var self = this;

            self._controls = [];

            self._data = options.data;

            var _autoLayout = options.autoLayout || true;
            
            var _paddingX = 30;
            var _paddingY = 30;

            var _nextX = _paddingX;
            var _nextY = _paddingY;

            var _controlPaddingY = 30;

            /**
             * Updates the position of the control baesd on the next available Form position
             * @param  {Object} options The options for the ControlBase.
             * @return {Object} The ControlBase options with an updated position
             */
            var getNextPosition = function (options) {

                if (_autoLayout === true) {
                    options.x = _nextX;
                    options.y = _nextY;
                }

                return options;
            };

            /**
             * Adds an Control to the Form
             * @param  {Object} options The constructor options for the EditBox.
             * @param  {Function} fn The function that will call the actual controls constructor
             * @return {ControlBase} The control that has been added
             */
            var addControl = function (options, fn) {

                getNextPosition(options);

                var control = fn(options);

                if (control !== null) {
                    
                    self._controls.push(control);

                    if (typeof control.value !== 'undefined' && typeof self._data !== 'undefined') {
                        control.value(self._data[control.id()]);
                    }
                }

                _nextY += control.height() + _controlPaddingY;

                return control;
            };

            /**
             * Adds a button to the Form
             * @param  {Object} options The constructor options for the Button.
             * @return {ControlBase} The Button that has been created.
             */
            self.addButton = function (options) {
                return addControl(options, function (options) { return new Button(options) });
            };

            /**
             * Adds an EditBox to the Form
             * @param  {Object} options The constructor options for the EditBox.
             * @return {ControlBase} The EditBox that has been created.
             */
            self.addDropDown = function (options) {
                return addControl(options, function (options) { return new DropDown(options) });
            };

            /**
             * Adds an EditBox to the Form
             * @param  {Object} options The constructor options for the EditBox.
             * @return {ControlBase} The EditBox that has been created.
             */
            self.addEditBox = function (options) {
                return addControl(options, function (options) { return new EditBox(options) });
            };


            /**
             * Adds a Label to the Form
             * @param  {Object} options The constructor options for the Label.
             * @return {ControlBase} The Label that has been created.
             */
            self.addLabel = function (options) {
                return addControl(options, function (options) { return new Label(options) });
            };
            /**
             * Adds a submit button to the Form, linking it to the Form's onsubmit function
             * @param  {Object} options The constructor options for the Button.
             * @return {ControlBase} The submit Button.
             */
            self.addSubmitButton = function (options) {
                options.onsubmit = self.onsubmit;
                return addControl(options, function (options) { return new Button(options) });
            };

            /**
             * Removes the focus from all of the the Forms controls
             */
            self.removeFocus = function () {
                for (var i = 0; i < self._controls.length; i++) {
                    if (self._controls[i].hasFocus()) {
                        self._controls[i].blur();
                    }
                }
            };

            /**
             * Moves the focus "up" the form
             * @param  {control} ControlBase The ControlBase that has the focus
             * @return {ControlBase} The ControlBase object that now has the focus.
             */
            self.rewindFocus = function (control) {
                return moveFocus(control, -1);
            };

            /**
            * Moves the focus "down" the form
            * @param  {control} ControlBase The ControlBase that has the focus
            * @return {ControlBase} The ControlBase object that now has the focus.
            */
            self.advanceFocus = function (control) {
                moveFocus(control, 1);
            };

            /**
            * Moves the focus up or down the form
            * @param  {ControlBase} control The ControlBase that has the focus
            * @param  {number} control The ControlBase that has the focus
            * @return {ControlBase} The ControlBase object that now has the focus.
            */
            var moveFocus = function (control, direction) {
                if (self._controls.length > 1) {
                    var inputIndex = self._controls.indexOf(control);

                    var next = 0;
                    if (self._controls[inputIndex + direction]) {
                        next = inputIndex + direction;
                    }
                    else {
                        if (inputIndex + direction < 0) {
                            next = self._controls.length - 1;
                        }
                    }
                    control.blur();
                    setTimeout(function () {
                        self._controls[next].focus();
                    }, 10);
                }
                return self._controls[next];
            };

            /**
            * Gets the control by its id
            * @param  {number} id The ControlBase.id() that has the focus
            * @return {ControlBase} The ControlBase object with that id, or null
            */
            var getControlById = function (id) {
                for (var i = 0; i < self._controls.length; i++) {
                    var control = self._controls[i];

                    if (control.id() === id)
                        return control;
                }
                return null;
            };

            /**
             * Called to submit the form and retreive an object with its values
             * @return {Object} An object that contains the id/value pairs of the Form's controls for those with a value
             */
            self.onsubmit = function () {
                var objRet = {};

                for (var i = 0; i < self._controls.length; i++) {
                    var control = self._controls[i];

                    if (typeof control.value !== 'undefined') {
                        objRet[control.id()] = control.value();
                    }
                }

                return objRet;
            };

            /**
             * Called to submit the form and retreive an object with its values
             * @return {Object} An object that contains the id/value pairs of the Form's controls for those with a value
             */
            self.render = function () {
                for (var i = 0; i < self._controls.length; i++) {
                    var control = self._controls[i];

                    if (typeof control !== 'undefined') {
                        control.render();
                    }
                }
            };

            /**
            * Updates the Form control values 
            * @param  {Object} data The object that maps the ControlBase.id() to it's value
            */
            self.update = function (data) {

                self._data = data;

                if (typeof self._data !== 'undefined') {

                    for (var element in self._data) {
                        var control = getControlById(element);

                        if (control !== null && typeof control.value !== 'undefined') {
                            control.value(self._data[element]);
                        }
                    }
                }
            };
        }
    }
    catch (e) {
        alert('Form ctor' + e.message);
    }
});
