/**
 * @author Andrew
 */

"use strict";

define(function () {
    try {
        return function TableShape(x, y, imageName, w, h, fill) {
            /**
			    Creates a new TableShape
				
			    @param obj the object to introspect.
			    @returns an array of property names
		    */

            this.x = x || 0;
            this.y = y || 0;
            this.w = w || 100;
            this.h = h || 80;
            this.fill = fill || '#AAAAAA';
            this.r = 20;
            this.handleRadius = 10;
            this.tableData = "Table 0";

            this.img = new Image();
            this.img.src = imageName || 'images/OpenGraph.png';

            if (this.w < 2 * this.r) {
                this.r = this.w / 2;
            }

            if (this.h < 2 * this.r) {
                this.r = this.h / 2;
            }

            this.GetX = function () {
                return this.x;
            }

            this.GetY = function () {
                return this.y;
            }

            this.GetImagePath = function () {
                return this.img.src;
            }

            // Determine if a point is inside the shape's bounds
            this.Contains = function (x, y) {
                return (this.x <= x) && (this.x + this.w >= x) && (this.y <= y) && (this.y + this.h >= y);
            };

            this.MouseInInputHandle = function (x, y) {
                return (Math.sqrt(Math.pow(this.x - x, 2)
                        + Math.pow(this.y + this.h / 2 - y, 2))
                    <= this.handleRadius);
            };

            this.MouseInOutputHandle = function (x, y) {
                return (Math.sqrt(Math.pow(this.x + this.w - x, 2)
                                + Math.pow(this.y + this.h / 2 - y, 2))
                                        <= this.handleRadius);
            };

            /**
			    Draws this "handles" for this node
				
			    @param obj the object to introspect.
			    @returns an array of property names
			    */
            this.DrawHandle = function (ctx, x, y) {

                ctx.save();

                ctx.beginPath();
                // recall arc(x,y,r,sAngle,eAngle,counterclockwise);
                ctx.arc(x, y, this.handleRadius, 0, 2 * Math.PI);
                ctx.stroke();

                ctx.restore();
            }

            /**
			    Draws this shape to a given context
				
			    @param obj the object to introspect.
			    @returns an array of property names
			    */

            this.Draw = function (ctx) {

                this.RoundedRect(ctx, this.x, this.y, this.w, this.h, this.r);

                ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

       //         this.DrawHandle(ctx, this.x, this.y + this.h / 2);
       //         this.DrawHandle(ctx, this.x + this.w, this.y + this.h / 2);

                ctx.save();

                ctx.fillStyle = "blue";
                ctx.font = "10pt Helvetica";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.fillText(this.tableData, this.x + this.w / 2, this.y + this.r / 2);

                ctx.restore();
            };

            /**
			    Draws a rounded rectangle

			    @param ctx the drawing context
			    @param x the x coordinate of the rounded rect
			    @param y the y coordinate of the rounded rect
			    @param width the width of the rounded rect
			    @param height the height of the rounded rect
			    @param radius the radius of the rounded rect's arcs

			    */
            this.RoundedRect = function (ctx, x, y, width, height, radius) {
                ctx.save();	// save the context so we don't mess up others

                ctx.beginPath();

                // draw top and top right corner
                ctx.moveTo(x + radius, y);

                /*
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.shadowBlur = 4;
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                */

                ctx.arcTo(x + width, y, x + width, y + radius, radius);

                // due to a bug in IE, we must call moveTo after arcTo to get the expected behavior
                ctx.moveTo(x + width, y + radius);

                // draw right side and bottom right corner
                ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
                ctx.moveTo(x + width - radius, y + height);

                // draw bottom and bottom left corner
                ctx.arcTo(x, y + height, x, y + height - radius, radius);
                ctx.moveTo(x, y + height - radius);

                // draw left and top left corner
                ctx.arcTo(x, y, x + radius, y, radius);

                ctx.stroke();

                ctx.restore();	// restore context to what it was on entry
            };
            /**
			    Sets the data specific to the table for the shape to render
			    @param data the data for the table
			    */

            this.SetTableData = function (data) {
                this.tableData = data;
            };
        }
    }
    catch (e) {
        alert('TableShape ctor' + e.message);
    }
});
