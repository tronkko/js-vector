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
 * Construct new vector.
 *
 * The constructor can be invoked in five different forms:
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
 * Example:
 *
 *     // Create basic 2d vector
 *     var v = new Vector (100, 50);
 *
 *     // Output coordinate 100,50
 *     alert ('Vector v = ' + v.x + ',' + v.y);
 *
 * @param mixed x
 * @param float y
 * @param float z
 * @param float w
 */
function Vector (/*args*/) {
    if (arguments.length == 2) {

        /* Construct from 2d-coordinate */
        this.x = Vector.parseFloat (arguments[0]);
        this.y = Vector.parseFloat (arguments[1]);
        this.z = 0;
        this.w = 1;

    } else if (arguments.length == 3) {

        /* Construct from 3d-coordinate */
        this.x = Vector.parseFloat (arguments[0]);
        this.y = Vector.parseFloat (arguments[1]);
        this.z = Vector.parseFloat (arguments[2]);
        this.w = 1;

    } else if (arguments.length == 1) {

        /* Copy-construct */
        var src = arguments[0];
        if (typeof src == 'object'  &&  src  &&  src instanceof Vector) {
            this.x = src.x;
            this.y = src.y;
            this.z = src.z;
            this.w = src.w;
        } else {
            throw new Error ('Invalid argument');
        }

    } else if (arguments.length == 0) {

        /* Construct zero-length vector */
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;

    } else if (arguments.length == 4) {

        /* Construct 3d-coordinate with w component */
        var w = Vector.parseFloat (arguments[3]);
        if (Math.abs (w) > 1.0e-6) {

            /* Normalize vector such that w = 1 */
            this.x = Vector.parseFloat (arguments[0]) / w;
            this.y = Vector.parseFloat (arguments[1]) / w;
            this.z = Vector.parseFloat (arguments[2]) / w;
            this.w = 1;

        } else {
            throw new Error ('Invalid vector');
        }

    } else {

        throw new Error ('Invalid vector');

    }
}
Vector.prototype = {};
Vector.prototype.constructor = Vector;

/*
 * Convert argument to floating point number.
 *
 * The function expects to receive a string or floating point argument as an
 * input.
 *
 * The function returns floating point number.  If the argument cannot be
 * converted to a floating point number, then the function throws an
 * exception.
 *
 * @param mixed value
 * @return float
 */
Vector.parseFloat = function (value) {
    var r;

    var type = typeof value;
    switch (type) {
    case 'number':
        /* Argument is already a number, no conversion needed */
        r = value;
        break;

    case 'string':
        /* Convert from string */
        if (/^(\-|\+)?([0-9]+(\.[0-9]+)?)$/.test (value)) {

            /* Convert to floating point number */
            r = parseFloat (value);

            /* Make sure that the string could be expressed as number */
            if (!isFinite (r)) {
                throw new Error ('Invalid number ' + value);
            }

        } else {
            /* Invalid number format, e.g. "12x" */
            throw new Error ('Invalid number ' + value);
        }

        break;

    case 'boolean':
    case 'object':
    case 'undefined':
    case 'function':
    default:
        /* No conversion possible */
        throw new Error ('Invalid data type ' + type);
    }

    return r;
};

/**
 * Clone vector.
 *
 * The function accepts no arguments.
 *
 * The function returns a new Vector object that contains the copy of the
 * coordinate.
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
 * Add two vectors.
 *
 * The function expects to receive the right-hand vector as an input argument.
 *
 * The function returns a new vector that contains the result of the addition.
 * Input argument or object are not modified by the operation.
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
 *     // Output coordinate 110,90
 *     alert ('Vector v = ' + v.x + ',' + v.y);
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
 * Substract two vectors.
 *
 * The function expects to receive the right-hand vector as an input argument.
 *
 * The function returns a new vector that contains the result of the
 * substraction.  Neither input argument or vector are modified in the
 * process.
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

/**
 * Multiply vector with a number.
 *
 * The function expects to receive a single number as an input argument.
 *
 * The function returns a new vector that contains the result of the
 * multiplication -- the source object is not modified by the operation.
 *
 * Example:
 *
 *     // Create vector q
 *     var q = new Vector (1, 2);
 *
 *     // Multiply vector q by 10
 *     var v = q.mul (10);
 *
 *     // Output coordinate 10,20
 *     alert ('Vector v = ' + v.x + ',' + v.y);
 *
 * @param float f
 * @return Vector
 */
Vector.prototype.mul = function (f) {
    var r;

    /* Ensure that argument is a valid number */
    var value = Vector.parseFloat (f);
    if (isFinite (value)) {

        /* Create new vector */
        r = new Vector(
            this.x * value,
            this.y * value,
            this.z * value
        );

    } else {
        throw new Error ('Invalid argument ' + f);
    }
    return r;
};

/**
 * Compute the length of vector.
 *
 * The function accepts no input arguments.  The function returns the length
 * of the vector as a floating point number.
 *
 * Example:
 *
 *     // Construct vector
 *     var v = new Vector (100, 100);
 *
 *     // Output 141.42
 *     alert ('len=' + v.length ());
 *
 * @return float
 */
Vector.prototype.length = function () {
    var r = Math.sqrt(
        this.x * this.x
        + this.y * this.y
        + this.z * this.z
    );
    return r;
};

/**
 * Return a new vector with length of unity.
 *
 * The function accepts no input arguments.
 *
 * The function returns a new vector that contains the result -- the source
 * object is not modified by the operation.
 *
 * Example:
 *
 *     // Construct vector
 *     var v = new Vector (100, 100);
 *
 *     // Normalize vector
 *     v = v.normalize ();
 *
 *     // Output coordinate 0.7071,0.7071
 *     alert ('Vector v = ' + v.x + ',' + v.y);
 *
 * @return Vector
 */
Vector.prototype.normalize = function () {
    var r;

    /* Compute length of vector */
    var f = this.length ();
    if (f > 1.0e-6) {

        /* Construct new vector with length of 1 */
        r = this.mul (1.0 / f);

    } else {
        throw new Error ('Zero-length vector');
    }
    return r;
};

/**
 * Negate vector.
 *
 * The function accepts no input arguments.
 *
 * The function returns a new vector object that contains the result of the
 * negation -- the source object is not modified.
 *
 * Example:
 *
 *     // Construct vector
 *     var v = new Vector (100, 100);
 *
 *     // Negate vector
 *     v = v.neg ();
 *
 *     // Output coordinate -100,-100
 *     alert ('Vector v = ' + v.x + ',' + v.y);
 *
 * @return Vector
 */
Vector.prototype.neg = function () {
    var r = new Vector(
        -this.x,
        -this.y,
        -this.z
    );
    return r;
};

/**
 * Compute cross product.
 *
 * The function expects to receive the right-hand vector as an input argument.
 *
 * The function returns a new vector that contains the result -- the source or
 * the argument vector are not modified.
 *
 * @param Vector b
 * @return Vector
 */
Vector.prototype.cross = function (b) {
    var r = new Vector(
        this.y * b.z - this.z * b.y,
        this.z * b.x - this.x * b.z,
        this.x * b.y - this.y * b.x
    );
    return r;
};

/**
 * Compute dot product.
 *
 * The function expects to receive the right-hand vector as an input argument.
 *
 * The function returns a new vector that contains the result -- the source or
 * the argument vector are not modified.
 *
 * @param Vector b
 * @return Vector
 */
Vector.prototype.dot = function (b) {
    var r = new Vector(
        this.x * b.x,
        this.y * b.y,
        this.z * b.z
    );
    return r;
};

