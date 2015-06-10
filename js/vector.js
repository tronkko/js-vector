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
 * of the vector or array v and the forms 3 to 5 construct vector from 2d
 * or 3d coordinate.
 *
 * Example:
 *
 *     // Create basic 2d vector and output it (third form)
 *     var v = new Vector (100, 50);
 *     alert ('Vector v = ' + v.x + ',' + v.y);
 *
 *     // Create copy of vector a (second form)
 *     var v = new Vector (a);
 *
 *     // Construct 3d vector from array (second form)
 *     var v = new Vector ([ 100, 50, 0 ]);
 *
 * @param mixed x Number, vector or array
 * @param float y
 * @param float z
 * @param float w
 */
function Vector (/*args*/) {
    /* Get list of arguments */
    var args;
    if (arguments.length == 1) {

        /* Exactly one argument provided: treat it as object or array */
        args = arguments[0];
        if (!args  ||  typeof args != 'object') {
            throw new Error ('Invalid argument');
        }

    } else {

        /* Zero or many arguments provided */
        args = arguments;

    }

    /* Get x-coordinate from argument list */
    var x;
    if (typeof args[0] != 'undefined') {
        x = Vector.parseFloat (args[0]);
    } else if (typeof args.x != 'undefined') {
        x = Vector.parseFloat (args.x);
    } else {
        x = 0;
    }

    /* Get y-coordinate */
    var y;
    if (typeof args[1] != 'undefined') {
        y = Vector.parseFloat (args[1]);
    } else if (typeof args.y != 'undefined') {
        y = Vector.parseFloat (args.y);
    } else {
        y = 0;
    }

    /* Get z-coordinate */
    var z;
    if (typeof args[2] != 'undefined') {
        z = Vector.parseFloat (args[2]);
    } else if (typeof args.z != 'undefined') {
        z = Vector.parseFloat (args.z);
    } else {
        z = 0;
    }

    /* Handle the w-coordinate component */
    if (typeof args[3] != 'undefined'  ||  typeof args.w != 'undefined') {
        var w;

        /* Read w-coordinate from argument list */
        if (typeof args[3] != 'undefined') {
            w = Vector.parseFloat (args[3]);
        } else if (typeof args.w != 'undefined') {
            w = Vector.parseFloat (args.w);
        } else {
            throw new Error ('Missing w');
        }

        /* Avoid division by zero error */
        if (Math.abs (w) > 1.0e-6) {

            /* Normalize x, y and z-coordinate components such that w is 1 */
            x /= w;
            y /= w;
            z /= w;

        } else {
            throw new Error ('Division by zero');
        }

    }

    /* Store coordinate */
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = 1;
}
Vector.prototype = {};
Vector.prototype.constructor = Vector;

/*
 * Convert argument to vector.
 *
 * The function expects to receive an indexed array, an associative array or
 * a vector as an argument.
 *
 * The function returns a vector object.  If the argument was an array of some
 * kind, then the result will be a new vector.  If the input argument was
 * already a vector, then the very same object is returned as a result.  The
 * function throws an exception if the input argument cannot be converted into
 * a vector.
 *
 * @param mixed v Array or vector
 * @return Vector
 */
Vector.getInstance = function (v) {
    var r;

    if (v) {
        if (typeof v == 'object') {

            if (v instanceof Vector) {

                /* Argument is already vector, no conversion needed */
                r = v;

            } else {

                /* Try to convert the argument to a vector */
                r = new Vector (v);

            }

        } else {
            /* Non-zero scalar argument */
            throw new Error ('Invalid argument');
        }
    } else {
        /* Null object or zero scalar argument */
        throw new Error ('Invalid argument');
    }
    return r;
};

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

            /* Make sure that the string can be expressed as a number */
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
 *     // Create duplicate of vector v
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

/* Alias */
Vector.prototype.dup = function () {
    return this.clone ();
};

/**
 * Add two vectors.
 *
 * The function expects to receive the right-hand operand as an input.  The
 * operand may be a vector object, an indexed array or an associative
 * array with x, y, z and possibly w components.
 *
 * The function returns a new vector that contains the result of the addition.
 * Input argument or source object are not modified by the operation.
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
 * @param mixed b Right-hand operand (vector or array)
 * @return Vector
 */
Vector.prototype.add = function (b) {
    /* Convert argument to vector */
    b = Vector.getInstance (b);

    /* Add vectors */
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
 * The function expects to receive the right-hand operand as an input.  The
 * input argument may be a vector object, an indexed array or an associative
 * array with x, y, z and possibly w components.
 *
 * The function returns a new vector that contains the result of the
 * substraction.  Neither input argument or source vector are modified in the
 * process.
 *
 * Example:
 *
 *     // Substract vector b from vector a producing vector v
 *     v = a.sub (b);
 *
 *     // Substract temporary vector (1,0)
 *     v = v.sub ([1, 0]);
 *
 * @param mixed b Right-hand operand (vector or array)
 * @return Vector
 */
Vector.prototype.sub = function (b) {
    /* Convert argument to vector */
    b = Vector.getInstance (b);

    /* Substract vectors */
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
        throw new Error ('Invalid number');
    }
    return r;
};

/**
 * Divide vector by number.
 *
 * The function expects to receive a single number as an input argument.
 *
 * The function returns a new vector that contains the result of the
 * multiplication -- the source object is not modified by the operation.
 *
 * @param float f
 * @return Vector
 */
Vector.prototype.div = function (f) {
    var r;

    /* Make sure that argument is a valid number */
    var value = Vector.parseFloat (f);
    if (isFinite (value)) {

        /* Check against division by zero */
        if (Math.abs (value) > 1.0e-6) {

            /* Multiply with inverse number */
            r = this.mul (1.0 / value);

        } else {
            throw new Error ('Division by zero');
        }

    } else {
        throw new Error ('Invalid number');
    }

    return r;
};

/**
 * Compute the length of vector.
 *
 * The function accepts no input arguments.
 *
 * The function returns the length of the vector as a floating point number.
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

/* Alias */
Vector.prototype.len = function () {
    return this.length ();
};

/**
 * Return a new vector with length of unity.
 *
 * The function accepts no input arguments.
 *
 * The function returns a new vector that contains the result -- the source
 * object is not modified by the operation.  The function throws an exception
 * if the source vector has no length.
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
 * The function returns a new vector that contains the result of the
 * negation -- the source object is not modified.  If the source object is a
 * zero-length vector, then the function will return a new zero-length
 * vector.
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
 * The function expects to receive the right-hand operand as an input.  This
 * operand may be a vector, an indexed array or an associative array with x,
 * y, z and optional w components.
 *
 * The function returns a new vector that contains the result -- the source or
 * the argument vector are not modified.
 *
 * @param mixed b Right-hand operand (vector or array)
 * @return Vector
 */
Vector.prototype.cross = function (b) {
    /* Convert argument to vector */
    b = Vector.getInstance (b);

    /* Compute cross product */
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
 * The function expects to receive the right-hand operand as an input.  This
 * operand may be a vector, an indexed array or an associative array with x,
 * y, z and optional w components.
 *
 * The function returns a new vector that contains the result -- the source or
 * the argument vector are not modified.
 *
 * @param mixed b Right-hand operand (vector or array)
 * @return Vector
 */
Vector.prototype.dot = function (b) {
    /* Convert argument to vector */
    b = Vector.getInstance (b);

    /* Compute dot product */
    var r = new Vector(
        this.x * b.x,
        this.y * b.y,
        this.z * b.z
    );
    return r;
};

