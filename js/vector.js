/*
 * vector.js
 * Vector and Matrix math on JavaScript
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

/**
 * Construct vector.
 *
 * The function can be invoked in five different forms:
 *
 *   (1) as new Vector ()
 *   (2) as new Vector (v)
 *   (3) as new Vector (x, y)
 *   (4) as new Vector (x, y, z)
 *   (5) as new Vector (x, y, z, w)
 *
 * The first form creates a zero-length vector, the second form creates copy
 * of the vector v and the forms 3 to 5 construct vector from 2d or 3d
 * coordinate.
 *
 * @param mixed x
 * @param float y
 * @param float z
 * @param float w
 */
function Vector (/*args*/) {
    if (arguments.length == 2) {

        /* Construct from 2d-coordinate */
        this.x = arguments[0];
        this.y = arguments[1];
        this.z = 0;
        this.w = 1;

    } else if (arguments.length == 3) {

        /* Construct from 3d-coordinate */
        this.x = arguments[0];
        this.y = arguments[1];
        this.z = arguments[2];
        this.w = 1;

    } else if (arguments.length == 1) {

        var src = arguments[0];
        if (typeof src == 'object'  &&  src) {
            if (src instanceof Vector) {

                /* Copy-construct */
                this.x = src.x;
                this.y = src.y;
                this.z = src.z;
                this.w = src.w;

            } else {
                /* Argument is not a vector */
                throw new Error ('Argument is not vector');
            }
        } else {
            throw new Error ('Argument is not object');
        }

    } else if (arguments.length == 0) {

        /* Construct zero-length vector */
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;

    } else if (arguments.length == 4) {

        /* Construct 3d-coordinate with w component */
        var w = arguments[3];
        if (Math.abs (w) > 1.0e-6) {
            this.x = arguments[0] / w;
            this.y = arguments[1] / w;
            this.z = arguments[2] / w;
            this.w = 1;
        } else {
            throw new Error ('Invalid w component');
        }

    } else {

        throw new Error ('Invalid number of arguments');

    }
}

Vector.prototype = {};
Vector.prototype.constructor = Vector;

/**
 * Clone vector.
 *
 * Example:
 *
 *     // Create vector
 *     var v = new Vector (100, 50);
 *
 *     // Clone vector v
 *     var q = v.clone ();
 *
 * @return Vector
 */
Vector.prototype.clone = function () {
    var r = new Vector(
        this.x,
        this.y,
        this.z
    );
    return r;
};

/**
 * Add two vectors and return the result as a new vector.
 *
 * Example:
 *
 *     // Construct vectors a and b
 *     var a = new Vector (100, 100);
 *     var b = new Vector (10, -10);
 *
 *     // Add vectors a and b producing vector v
 *     var v = a.add (b);
 *
 * @param Vector b
 * @return Vector
 */
Vector.prototype.add = function (b) {
    var r = new Vector(
        this.x + b.x,
        this.y + b.y,
        this.z + b.z
    );
    return r;
};

/**
 * Substract vectors and return the result a new vector.
 *
 * @param Vector b
 * @return Vector
 */
Vector.prototype.sub = function (b) {
    var r = new Vector(
        this.x - b.x,
        this.y - b.y,
        this.z - b.z
    );
    return r;
};


