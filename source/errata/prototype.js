// JavaScript source code
////////////////////////////////////////
// Extend JavaScript type prototypes.
// No return.

'use strict';

define([],
    function () {

        try {
            // Extend Object's prototype to support OOP.
            Object.defineProperty(Object.prototype,
                "inherits",
                {
                    value: function (parent) {

                        // Call the parent constructor in the 
                        // context of "this" (the object instance)
                        // to link the two objects together.
                        if (arguments.length > 1) {

                            // Pass extra constructor parameters.
                            parent.apply(this, Array.prototype.slice.call(arguments, 1));
                        }
                        else {

                            // Just call default constuctor.
                            parent.call(this);
                        }
                    },
                    enumerable: false,
                    configurable: true,
                    writable: true
                });

            // Extend Object's prototype to support object merging.
            Object.defineProperty(Object.prototype,
                "inject",
                {
                    value: function (objectSource) {

                        // Define recursive object merger.
                        var functionMerge = function (objectTarget,
                            objectSource) {

                            // Can't merge undefineds.
                            if (objectSource === undefined) {

                                return objectTarget;
                            }
                            // Can't merge nulls either.
                            if (objectSource === null) {

                                return objectTarget;
                            }
                            // Target can't be undefined or null because it is "this" in calling block.

                            // Must handle arrays and objects differently.
                            if (objectSource instanceof Array) {

                                // Loop over all source items.
                                for (var i = 0; i < objectSource.length; i++) {

                                    if (objectTarget.length > i) {

                                        // Recurse down.
                                        functionMerge(objectTarget[i],
                                            objectSource[i]);
                                    } else {

                                        objectTarget.push(objectSource[i]);
                                    }
                                }
                            } else if (objectSource instanceof Object) {

                                // Loop over all source properties.
                                for (var strKey in objectSource) {

                                    // Do not handle base properties.
                                    if (objectSource.hasOwnProperty(strKey) === false) {

                                        continue;
                                    }

                                    // If the target does not have a source property, add, else...
                                    if (objectTarget[strKey] === undefined) {

                                        objectTarget[strKey] = objectSource[strKey];
                                    } else {

                                        // Recurse down if object or array, otherwise assign.

                                        if (objectTarget[strKey] instanceof Array ||
                                            objectTarget[strKey] instanceof Object) {

                                            // Recurse down.
                                            functionMerge(objectTarget[strKey],
                                                objectSource[strKey]);
                                        } else {

                                            // Even though target has a value here, need
                                            // To over-write since the type is a kernel.
                                            objectTarget[strKey] = objectSource[strKey];
                                        }
                                    }
                                }
                            } else /* Kernel type */ {

                                objectTarget = objectSource;
                            }

                            // Return the target for chaining purposes.
                            return objectTarget;
                        };

                        // Invoke merger function with this and specified object.
                        return functionMerge(this,
                            objectSource);
                    },
                    enumerable: false,
                    configurable: true,
                    writable: true
                });

            Object.defineProperty(Function.prototype,
                "inheritsFrom",
            {
                value: function (ParentConstructorFunction) {

                    this.prototype = new ParentConstructorFunction();
                    this.prototype.constructor = this;
                },
                enumerable: false,
                configurable: true,
                writable: true
            });

        } catch (e) {

            alert(e.message);
        }
    }
);