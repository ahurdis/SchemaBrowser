// JavaScript source code

/*
var Dx = x2 - x1;
var Dy = y2 - y1;
var d = Math.abs(Dy*x0 - Dx*y0 - x1*y2+x2*y1)/Math.sqrt(Math.pow(Dx, 2) + Math.pow(Dy, 2));
*/

var images = [];

var preloadimages = function (ar) {
    var loadedImages = 0;
    //       var ar = (typeof ar != "object") ? [ar] : ar;
    function imageloadpost(strStatus) {
        loadedImages++;
        if (loadedImages == ar.length) {
            //                        alert('All images ' + strStatus);
            self.render();
        }
    }

    for (var i = 0; i < ar.length; i++) {
        images[i] = new Image();
        images[i].src = '/images/' + ar[i] + '.png';
        //                ar[i].setImage(images[i]);

        images[i].onload = function () {
            imageloadpost('loaded.');
        }

        images[i].onerror = function () {
            imageloadpost('not loaded.');
        }
    }

};

// load the add.pgn image
// preloadimages(['add']);



function drawPolyline(pts) {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (var i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.stroke();
};

/**
 * Creates the path for a rectangle with rounded corners.
 * Must call ctx.fill() after calling this to draw the rectangle.
 * @param  {Object} ctx Canvas context.
 * @param  {Number} x   x-coordinate to draw from.
 * @param  {Number} y   y-coordinate to draw from.
 * @param  {Number} w   Width of rectangle.
 * @param  {Number} h   Height of rectangle.
 * @param  {Number} r   Border radius.
 */
function drawRoundedRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;

    ctx.beginPath();

    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);

    ctx.closePath();
};
function drawRoundedRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;

    ctx.beginPath();

    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);

    ctx.closePath();
};
