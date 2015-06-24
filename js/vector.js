/*
 * vector.js 1.0
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
    this[0] = x;
    this[1] = y;
    this[2] = z;
    this[3] = 1;
}
Vector.prototype = {};
Vector.prototype.constructor = Vector;

/* Access elements of vector through variables x, y, z and w */
Object.defineProperty (Vector.prototype, 'x', {
    enumerable: true,
    configurable: false,
    get: function () {
        return this[0];
    },
});
Object.defineProperty (Vector.prototype, 'y', {
    enumerable: true,
    configurable: false,
    get: function () {
        return this[1];
    },
});
Object.defineProperty (Vector.prototype, 'z', {
    enumerable: true,
    configurable: false,
    get: function () {
        return this[2];
    },
});
Object.defineProperty (Vector.prototype, 'w', {
    enumerable: true,
    configurable: false,
    get: function () {
        return this[3];
    },
});

/* Access dimension of vector through length property */
Object.defineProperty (Vector.prototype, 'length', {
    enumerable: true,
    configurable: false,
    get: function () {
        return 4;
    },
});

/*
 * Convert argument to vector.
 *
 * The function expects to receive an indexed array, an associative array or
 * a vector as an argument.
 *
 * The function returns a vector object.  If the argument was an array of some
 * kind, then the result will be a new vector.  If the input argument was
 * already a vector, then the very same object is returned as a result.  If
 * the input argument cannot be converted into a vector, then the function
 * throws an exception.
 *
 * Example:
 *
 *     // Get existing object
 *     var v = new Vector (1, 0, 0);
 *     var q = Vector.getInstance (v);
 *
 *     // Create new object
 *     var q = Vector.getInstance ([ 1, 0, 0 ]);
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
 * Example:
 *
 *     // Returns 1.5
 *     var f = Vector.parseFloat ('1.5');
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
 * The function returns a new Vector object that contains copy of the
 * coordinate components.
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
    return new Vector (this);
};

/* Alias */
Vector.clone = function (v) {
    v = Vector.getInstance (v);
    return v.clone ();
};

/* Alias */
Vector.prototype.dup = function () {
    return this.clone ();
};

/* Alias */
Vector.dup = function (v) {
    v = Vector.getInstance (v);
    return v.dup ();
};

/**
 * Add vector.
 *
 * The function expects to receive the right-hand operand as an input.  This
 * operand may be a vector object, an indexed array or an associative
 * array with x, y, z and possibly w components.
 *
 * The function updates 'this' object and returns a reference to 'this' object
 * which may be used for chaining mathematical operations.
 *
 * Example:
 *
 *     // Construct vectors a and b
 *     var a = new Vector (100, 100);
 *     var b = new Vector (10, -10);
 *
 *     // Add vector b and store the result to vector a
 *     a.add (b);
 *
 *     // Output updated vector a, now (110,90)
 *     alert ('Vector a = ' + a.x + ',' + a.y);
 *
 * @param mixed b Right-hand operand (vector or array)
 * @return Vector
 */
Vector.prototype.add = function (b) {
    /* Convert argument to vector */
    var operand = Vector.getInstance (b);

    /* Add vector */
    this[0] += operand[0];
    this[1] += operand[1];
    this[2] += operand[2];
    return this;
};

/**
 * Add two vectors.
 *
 * The function expects to receive two vectors (or arrays convertible to
 * vectors) as input arguments.
 *
 * The function returns a new vector that contains the result of the addition.
 * No source operand is modified in the process.
 *
 * Example:
 *
 *     // Construct vectors a and b
 *     var a = new Vector (100, 100);
 *     var b = new Vector (10, -10);
 *
 *     // Add vectors a and b storing the result to vector v
 *     var v = Vector.add (a, b);
 *
 *     // Output coordinate 110,90
 *     alert ('Vector a = ' + v.x + ',' + v.y);
 *
 * @param mixed a Left-hand operand (vector or array)
 * @param mixed b Right-hand operand (vector or array)
 * @return Vector
 */
Vector.add = function (a, b) {
    var dup = new Vector (a);
    return dup.add (b);
};

/**
 * Substract vector.
 *
 * The function expects to receive the right-hand operand as an input.  The
 * input argument may be a vector object, an indexed array or an associative
 * array with x, y, z and possibly w components.
 *
 * The function updates 'this' object and returns a reference to 'this' object
 * which may be used for chaining mathematical operations.
 *
 * Example:
 *
 *     // Substract b from vector a
 *     a.sub (b);
 *
 *     // Substract temporary vector (1,0) from vector v
 *     v.sub ([1, 0]);
 *
 * @param mixed b Right-hand operand (vector or array)
 * @return Vector
 */
Vector.prototype.sub = function (b) {
    /* Convert argument to vector */
    b = Vector.getInstance (b);

    /* Substract vector */
    this[0] -= b[0];
    this[1] -= b[1];
    this[2] -= b[2];
    return this;
};

/**
 * Substract two vectors.
 *
 * The function expects to receive two vectors (or arrays convertible to
 * vectors) as input arguments.
 *
 * The function returns a new vector that contains the result of the
 * substraction.  No source operand is modified in the process.
 *
 * Example:
 *
 *     // Substract vectors p and q storing the result to v
 *     var v = Vector.sub (p, q);
 *
 * @param mixed a Left-hand operand (vector or array)
 * @param mixed b Right-hand operand (vector or array)
 * @return Vector
 */
Vector.sub = function (a, b) {
    var dup = new Vector (a);
    return dup.sub (b);
};

/**
 * Multiply vector with a number.
 *
 * The function expects to receive a single number as an input argument.
 *
 * The function updates 'this' vector and returns a reference to 'this' object
 * which may be used for chaining mathematical operations.
 *
 * Example:
 *
 *     // Create vector q
 *     var q = new Vector (1, 2);
 *
 *     // Multiply vector q by 10
 *     q.mul (10);
 *
 *     // Output coordinate 10,20
 *     alert ('Vector q = ' + q.x + ',' + q.y);
 *
 * @param float f
 * @return Vector
 */
Vector.prototype.mul = function (f) {
    var r;

    /* Ensure that argument is a valid number */
    var value = Vector.parseFloat (f);

    /* Multiply vector */
    this[0] *= value;
    this[1] *= value;
    this[2] *= value;
    return this;
};

/**
 * Multiply vector and a number.
 *
 * The function expects to receive a vector (or array convertible to vector)
 * as the first input argument and a scalar number as the second input
 * argument.
 *
 * The function returns a new vector that contains the result of the
 * multiplication.  No input operands are modified in the process.
 *
 * Example:
 *
 *     // Create vector q that is multiple of vector v
 *     var q = Vector.mul (v, 10);
 *
 * @param mixed a Left-hand operand (vector or array)
 * @param float f Right-hand operand
 * @return Vector
 */
Vector.mul = function (a, f) {
    var dup = new Vector (a);
    return dup.mul (f);
};

/**
 * Divide vector by a number.
 *
 * The function expects to receive a single number as an input argument.
 *
 * The function updates 'this' object and returns a reference to 'this' object
 * which may be used for chaining mathematical operations.
 *
 * @param float f
 * @return Vector
 */
Vector.prototype.div = function (f) {
    /* Make sure that argument is a valid number */
    var value = Vector.parseFloat (f);

    /* Check against division by zero */
    if (Math.abs (value) > 1.0e-6) {

        /* Multiply with inverse number */
        this.mul (1.0 / value);

    } else {
        throw new Error ('Division by zero');
    }
    return this;
};

/**
 * Divide vector and a number.
 *
 * The function expects to receive a vector (or array convertible to vector)
 * as the first input argument and a scalar number as the second input
 * argument.
 *
 * The function returns a new vector that contains the result of the
 * division.  No input operands are modified in the process.
 *
 * @param mixed a Left-hand operand (vector or array)
 * @param float f Right-hand operand
 * @return Vector
 */
Vector.div = function (a, f) {
    var dup = new Vector (a);
    return dup.div (f);
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
 *     alert ('len=' + v.len ());
 *
 * @return float
 */
Vector.prototype.len = function () {
    var f = Math.sqrt(
        this[0] * this[0]
        + this[1] * this[1]
        + this[2] * this[2]
    );
    return f;
};

/* Alias */
Vector.len = function (a) {
    var v = Vector.getInstance (a);
    return v.len ();
};

/**
 * Normalize vector's length.
 *
 * The function accepts no input arguments.
 *
 * The function updates 'this' object and returns a reference to 'this' object
 * which can be used for chaining mathematical operations.
 *
 * Example:
 *
 *     // Construct vector
 *     var v = new Vector (100, 100);
 *
 *     // Normalize vector
 *     v.normalize ();
 *
 *     // Output normalized coordinate 0.7071,0.7071
 *     alert ('Vector v = ' + v.x + ',' + v.y);
 *
 * @return Vector
 */
Vector.prototype.normalize = function () {
    var r;

    /* Compute length of vector */
    var f = this.len ();
    if (f > 1.0e-6) {

        /* Construct new vector with length of 1 */
        this.mul (1.0 / f);

    } else {
        throw new Error ('Zero-length vector');
    }
    return this;
};

/**
 * Create normalized vector.
 *
 * The function expects to receive a vector (or array convertible to vector)
 * as an input argument.
 *
 * The function returns a new vector object that contains the normalized
 * vector.  The source operand is not modified in the process.
 *
 * Example:
 *
 *     // Construct vector v
 *     var v = new Vector (100, 100);
 *
 *     // Create normalized version of v without changing v
 *     var q = Vector.normalize (v);
 *
 *     // Output normalized coordinate 0.7071,0.7071
 *     alert ('Vector q = ' + q.x + ',' + q.y);
 *
 * @return Vector
 */
Vector.normalize = function (a) {
    var dup = new Vector (a);
    return dup.normalize ();
};

/**
 * Negate vector.
 *
 * The function accepts no input arguments.
 *
 * The function updates 'this' object and returns a reference to 'this' object
 * which can be used for chaining mathematical operations.
 *
 * Example:
 *
 *     // Construct vector
 *     var v = new Vector (100, 100);
 *
 *     // Negate vector
 *     v.neg ();
 *
 *     // Output negated coordinate -100,-100
 *     alert ('Vector v = ' + v.x + ',' + v.y);
 *
 * @return Vector
 */
Vector.prototype.neg = function () {
    this[0] = -this[0];
    this[1] = -this[1];
    this[2] = -this[2];
    return this;
};

/**
 * Create negated vector.
 *
 * The function expects to receive a vector (or array convertible to vector)
 * as an input argument.
 *
 * The function returns a new vector that contains the result of the
 * negation.  The source object is not modified.
 *
 * Example:
 *
 *     // Construct vector
 *     var v = new Vector (100, 100);
 *
 *     // Create negated vector q without chaning v
 *     var q = Vector.neg (v);
 *
 *     // Output negated coordinate -100,-100
 *     alert ('Vector q = ' + q.x + ',' + q.y);
 *
 * @return Vector
 */
Vector.neg = function (a) {
    var dup = new Vector (a);
    return dup.neg ();
};

/**
 * Compute cross product.
 *
 * The function expects to receive the right-hand operand as an input.  This
 * operand may be a vector, an indexed array or an associative array with x,
 * y, z and optional w components.
 *
 * The function stores the result to 'this' object and returns a reference to
 * 'this' object which may be used for chaining mathematical operations.
 *
 * @param mixed b Right-hand operand (vector or array)
 * @return Vector
 */
Vector.prototype.cross = function (b) {
    /* Convert argument to vector */
    b = Vector.getInstance (b);

    /* 
     * Compute cross product into temporary variables.  Use of temporary
     * variables prevents overwriting the source operand too soon and also
     * allows the function to work correctly if input argument b is aliased
     * to 'this'.
     */
    var rx = this[1] * b[2] - this[2] * b[1];
    var ry = this[2] * b[0] - this[0] * b[2];
    var rz = this[0] * b[1] - this[1] * b[0];

    /* Store final result to 'this' object */
    this[0] = rx;
    this[1] = ry;
    this[2] = rz;

    return this;
};

/**
 * Compute cross product between two vectors.
 *
 * The function expects to receive two vectors (or arrays convertible to
 * vectors) as input arguments.
 *
 * The function returns a new vector that contains the result.  The source
 * operands are not modified in the process.
 *
 * @param mixed a Left-hand operand (vector or array)
 * @param mixed b Right-hand operand (vector or array)
 * @return Vector
 */
Vector.cross = function (a, b) {
    var dup = new Vector (a);
    return dup.cross (b);
};

/**
 * Compute dot product.
 *
 * The function expects to receive the right-hand operand as an input.  This
 * operand may be a vector, an indexed array or an associative array with x,
 * y, z and optional w components.
 *
 * The function updates 'this' object and returns a reference to 'this' object
 * which may be used for chaining mathematical operations.
 *
 * @param mixed b Right-hand operand (vector or array)
 * @return Vector
 */
Vector.prototype.dot = function (b) {
    /* Convert argument to vector */
    b = Vector.getInstance (b);

    /* Compute dot product */
    this[0] *= b[0];
    this[1] *= b[1];
    this[2] *= b[2];
    return this;
};

/**
 * Compute dot product.
 *
 * The function expects to receive the right-hand operand as an input.  This
 * operand may be a vector, an indexed array or an associative array with x,
 * y, z and optional w components.
 *
 * The function returns a new vector that contains the result.  No source
 * arguments are modified in the process.
 *
 * @param mixed b Right-hand operand (vector or array)
 * @return Vector
 */
Vector.dot = function (a, b) {
    var dup = new Vector (a);
    return dup.dot (b);
};


