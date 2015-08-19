/*
 * vector.js 1.0
 * Vector and Matrix math on JavaScript
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

/* Base class */
function VectorMath () {
}
VectorMath.prototype = {};
VectorMath.prototype.constructor = VectorMath;

/*
 * Convert argument to floating point number.
 *
 * The function expects to receive a string or floating point argument.
 *
 * The function returns a floating point number.  If the argument cannot be
 * converted to a floating point number, then the function throws an
 * exception.
 *
 * Example:
 *
 *     // Returns 1.5
 *     var f = VectorMath.parseFloat ('1.5');
 *
 * @param mixed value
 * @return float
 */
VectorMath.parseFloat = function (value) {
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

    case 'undefined':
        throw new Error ('Missing argument');
        break;

    case 'boolean':
    case 'object':
    case 'function':
    default:
        /* No conversion possible */
        throw new Error ('Invalid data type ' + type);
    }

    return r;
};

/**
 * Convert value to array of 4.
 *
 * Example:
 *
 *     // Returns [ 1, 2, 0, 1 ]
 *     var x = VectorMath.getArray ([ 1, 2 ], 1);
 *
 * @param mixed value Value to convert
 * @param float w Default value of fourth component (mandatory)
 * @return array
 */
VectorMath.getArray = function (value, w) {
    /* Convert value to array (if not already) */
    var args;
    if (value.length == 1) {

        /* Value is array of one => convert */
        args = value[0];
        if (!args  ||  typeof args != 'object') {
            throw new Error ('Invalid argument');
        }

    } else {

        /* Value is already an array of zero or many items => no conversion */
        args = value;

    }

    /* Get x, y, z and w components */
    var x, y, z;
    if (args instanceof Vector) {

        /* Argument is a vector */
        x = args[0];
        y = args[1];
        z = args[2];
        w = 1;

    } else if (typeof args.length != 'undefined') {

        /* Argument is an indexed array */
        z = 0;
        switch (args.length) {
        case 4:
            w = VectorMath.parseFloat (args[3]);
            /*FALLTHROUGH*/

        case 3:
            z = VectorMath.parseFloat (args[2]);
            /*FALLTHROUGH*/

        case 2:
            x = VectorMath.parseFloat (args[0]);
            y = VectorMath.parseFloat (args[1]);
            break;

        case 0:
            x = 0;
            y = 0;
            break;

        case 1:
        default:
            throw new Error ('Invalid arguments');
        }

    } else {

        /* Argument is an associative array */
        if (typeof args.x != 'undefined') {
            x = VectorMath.parseFloat (args.x);
        } else {
            x = 0;
        }

        if (typeof args.y != 'undefined') {
            y = VectorMath.parseFloat (args.y);
        } else {
            y = 0;
        }

        if (typeof args.z != 'undefined') {
            z = VectorMath.parseFloat (args.z);
        } else {
            z = 0;
        }

        if (typeof args.w != 'undefined') {
            w = VectorMath.parseFloat (args.w);
        }

    }

    return [ x, y, z, w ];
};

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
function Vector (/*...*/) {
    /* Get the four coordinate components */
    var arr = VectorMath.getArray (arguments, 1);

    /* Normalize coordinate components */
    if (arr[3] == 1) {

        /* Components are already in normalized form */
        this[0] = arr[0];
        this[1] = arr[1];
        this[2] = arr[2];
        this[3] = 1;

    } else if (arr[3] > 1.0e-6) {

        /* Normalize components such that w becomes 1 */
        var w = 1.0 / arr[3];
        this[0] = arr[0] * w;
        this[1] = arr[1] * w;
        this[2] = arr[2] * w;
        this[3] = 1;

    } else {

        /* Point in infinity */
        this[0] = arr[0] * 1e12;
        this[1] = arr[1] * 1e12;
        this[2] = arr[2] * 1e12;
        this[3] = 1;

    }
}
Vector.prototype = Object.create (VectorMath.prototype);
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
 * The function returns new vector or a reference to source vector depending
 * on the argument: if the input argument is an array of some kind, then the
 * function will construct a new vector and return that.  If the input
 * argument is already a vector, then the function returns a reference to the
 * input argument.  If the input argument cannot be converted into a vector,
 * then the function throws an exception.
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

/**
 * Clone vector.
 *
 * The function accepts no arguments.
 *
 * The function returns a new vector object that contains copy of the
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
 * The function expects to receive the right-hand vector as an input argument.
 * The argument may be a vector object, an indexed array or an associative
 * array with x, y, z and possibly w components.
 *
 * The function adds the right-hand operand to the left-hand operand and
 * stores the result to the left-hand operand.  The function returns a
 * referece to the left-hand operand which may be used for chaining
 * mathematical operations.
 *
 * Example:
 *
 *     // Construct vectors a and b
 *     var a = new Vector (100, 100);
 *     var b = new Vector (10, -10);
 *
 *     // Compute a = a + b
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
 * The function expects to receive left and right-hand vectors as input
 * arguments.  These arguments may be vector objects or arrays convertible to
 * vectors.
 *
 * The function adds the right-hand operand to the left-hand operand and
 * returns the result as a new vector.  No source operand is modified in the
 * process.
 *
 * Example:
 *
 *     // Construct vectors a and b
 *     var a = new Vector (100, 100);
 *     var b = new Vector (10, -10);
 *
 *     // Compute v = a + b
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
 * The function expects to receive right-hand vector as an input argument.
 * This argument may be a vector object, an indexed array or an associative
 * array with x, y, z and possibly w components.
 *
 * The function substracts right-hand operand from the left-hand operand and
 * stores the result to left-hand operand.  The function returns a reference
 * to the left-hand operand which may be used for chaining mathematical
 * operations.
 *
 * Example:
 *
 *     // Compute a = a - b
 *     a.sub (b);
 *
 *     // Compute v = v - (1,0,0)
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
 * The function expects to receive left and right-hand vectors as input
 * arguments.  These arguments may be vector objects or arrays convertible to
 * vectors.
 *
 * The function substracts right-hand operand from the left-hand operand and
 * returns the result as a new vector.  No source operand is modified in the
 * process.
 *
 * Example:
 *
 *     // Compute v = p - q
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
 * The function updates vector operand and returns a reference to it which may
 * be used for chaining mathematical operations.
 *
 * Example:
 *
 *     // Create vector q
 *     var q = new Vector (1, 2);
 *
 *     // Compute q = q * 10
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
    var value = VectorMath.parseFloat (f);

    /* Multiply vector */
    this[0] *= value;
    this[1] *= value;
    this[2] *= value;
    return this;
};

/**
 * Multiply vector with a number.
 *
 * The function expects to receive a vector or array convertible to vector
 * as the first input argument and a scalar number as the second input
 * argument.
 *
 * The function multiplies the vector with a number and returns the result as
 * a new vector object.  No input operands are modified in the process.
 *
 * Example:
 *
 *     // Compute q = v * 10
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
 * Divide vector by number.
 *
 * The function expects to receive a single number as an input argument.
 *
 * The function multiplies the left-hand vector with the inverse number and
 * returns a reference to the left-hand vector.  If the input argument is
 * zero, then the function throws an exception.
 *
 * @param float f
 * @return Vector
 */
Vector.prototype.div = function (f) {
    /* Make sure that argument is a valid number */
    var value = VectorMath.parseFloat (f);

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
 * Divide vector by number.
 *
 * The function expects to receive a vector or array convertible to vector
 * as the first input argument and a scalar number as the second input
 * argument.
 *
 * The function multiplies the source vector with the inverse number and
 * returns the result as a new vector.  No input operands are modified in the
 * process.
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
 * Normalize length.
 *
 * The function accepts no input arguments.
 *
 * The function updates the left-hand vector such that the length becomes 1.
 * The function returns a reference to the left-hand vector which can be used
 * for chaining mathematical operations.
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
 * Construct normalized vector.
 *
 * The function expects to receive a vector or array convertible to vector
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
 * The function updates the left-hand vector and returns a reference it which
 * can be used for chaining mathematical operations.
 *
 * Example:
 *
 *     // Construct vector
 *     var v = new Vector (100, 100);
 *
 *     // Compute v = -v
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
 * Construct negated vector.
 *
 * The function expects to receive a vector or array convertible to vector
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
 *     // Compute q = -v
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
 * The function expects to receive the right-hand vector as an input argument.
 * This argument may be a vector object, an indexed array or an associative
 * array with x, y, z and optional w components.
 *
 * The function stores the result to the left-hand vector and returns a
 * reference to it which may be used for chaining mathematical operations.
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
 * Compute cross product of two vectors.
 *
 * The function expects to receive two vectors or arrays convertible to
 * vectors as input arguments.
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
 * The function expects to receive the right-hand vector as an input argument.
 * This argument may be a vector object, an indexed array or an associative
 * array with x, y, z and optional w components.
 *
 * The function updates the left-hand vector and returns a reference to it
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
 * Compute dot product of two vectors.
 *
 * The function expects to receive left and right-hand vectors as an input
 * arguments.  These arguments may be a vector objects, indexed arrays or
 * associative arrays with x, y, z and optional w components.
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

/**
 * Create 4x4 matrix.
 *
 * The constructor can be invoked in several forms:
 *
 *   (1) as new Matrix ()
 *   (2) as new Matrix (m)
 *   (3) as new Matrix (arr)
 *
 * The first form creates a unity matrix, the second from creates a copy of
 * the matrix m and third from initializes matrix from two-dimensional array.
 *
 * Example:
 *
 *     // Construct translation matrix from rows
 *     var m = new Matrix ([
 *         [ 1, 0, 0, x ], 
 *         [ 0, 1, 0, y ],
 *         [ 0, 0, 1, z ],
 *         [ 0, 0, 0, 1 ]
 *     ]);
 *
 *     // Copy-construct
 *     var q = new Matrix (m);
 *
 *     // Create unity matrix
 *     var r = new Matrix ();
 *
 * @param mixed m Optional source operand (matrix or array)
 */
function Matrix (/*m*/) {
    /* Get cell values */
    var m;
    if (arguments.length == 1) {

        /* Exactly one argument provided: treat it as object or array */
        m = arguments[0];
        if (!m  ||  typeof m != 'object') {
            throw new Error ('Invalid argument');
        }

    } else {
        m = arguments;
    }

    /* Get rows of source matrix */
    var r1, r2, r3, r4;
    if (m instanceof Matrix) {

        /* 
         * Copy-construct from another Matrix object.  Be ware that the
         * code below could also be achieved by:
         *
         *   r1 = m[0].slice (0);
         *   r2 = m[1].slice (0);
         *   r3 = m[2].slice (0);
         *   r4 = m[3].slice (0);
         *
         * However, copying each element individually seems to be faster.
         */
        var m0 = m[0];
        var m1 = m[1];
        var m2 = m[2];
        var m3 = m[3];
        r1 = [ m0[0], m0[1], m0[2], m0[3] ];
        r2 = [ m1[0], m1[1], m1[2], m1[3] ];
        r3 = [ m2[0], m2[1], m2[2], m2[3] ];
        r4 = [ m3[0], m3[1], m3[2], m3[3] ];

    } else if (m.length == 0) {

        /* Construct unity matrix */
        r1 = [ 1, 0, 0, 0 ];
        r2 = [ 0, 1, 0, 0 ];
        r3 = [ 0, 0, 1, 0 ];
        r4 = [ 0, 0, 0, 1 ];

    } else {

        /* Get first row */
        if (m.length > 0) {
            r1 = VectorMath.getArray (m[0], 0);
        } else {
            r1 = [ 1, 0, 0, 0 ];
        }

        /* Get second row */
        if (m.length > 1) {
            r2 = VectorMath.getArray (m[1], 0);
        } else {
            r2 = [ 0, 1, 0, 0 ];
        }

        /* Get third row */
        if (m.length > 2) {
            r3 = VectorMath.getArray (m[2], 0);
        } else {
            r3 = [ 0, 0, 1, 0 ];
        }

        /* Get fourth row */
        if (m.length > 3) {
            r4 = VectorMath.getArray (m[3], 1);
        } else {
            r4 = [ 0, 0, 0, 1 ];
        }

    }

    /* Store rows */
    this[0] = r1;
    this[1] = r2;
    this[2] = r3;
    this[3] = r4;
}
Matrix.prototype = Object.create (VectorMath.prototype);
Matrix.prototype.constructor = Matrix;

/* Access dimension of matrix through length property */
Object.defineProperty (Matrix.prototype, 'length', {
    enumerable: true,
    configurable: false,
    get: function () {
        return 4;
    },
});

/**
 * Construct unity matrix.
 *
 * The function expects no parameters.
 *
 * The function returns a reference to the left-hand operand which may be used
 * for chaining mathematical operations.
 *
 * @return Matrix
 */
Matrix.prototype.unity = function () {
    this[0] = [ 1, 0, 0, 0 ];
    this[1] = [ 0, 1, 0, 0 ];
    this[2] = [ 0, 0, 1, 0 ];
    this[3] = [ 0, 0, 0, 1 ];
    return this;
};

/**
 * Convert argument to matrix.
 *
 * The function expects to receive a matrix object or array convertible to
 * matrix as an input argument.
 *
 * The function returns a new matrix object or a reference to existing matrix
 * depending on the argument: if the argument is a matrix, then the function
 * returns a reference to it.  If the argument is an array, then the function
 * creates a new matrix object and returns it.  If the input argument cannot
 * be converted into a matrix, then the function throws an exception.
 *
 * @param mixed arg
 * @return Matrix
 */
Matrix.getInstance = function (arg) {
    var m;

    if (arg) {
        if (typeof arg == 'object') {

            if (arg instanceof Matrix) {

                /* Argument is already matrix, no conversion needed */
                m = arg;

            } else {

                /* Try to convert the argument to a matrix */
                m = new Matrix (arg);

            }

        } else {
            /* Non-zero scalar argument */
            throw new Error ('Invalid argument');
        }
    } else {

        /* Null object or zero scalar argument */
        throw new Error ('Invalid argument');

    }
    return m;
};

/**
 * Clone matrix.
 *
 * The function accepts no arguments.
 *
 * The function returns a new Matrix object that is duplicate of the left-hand
 * matrix.
 *
 * @return Matrix
 */
Matrix.prototype.clone = function () {
    return new Matrix (this);
};

/* Alias */
Matrix.clone = function (m) {
    return new Matrix (m);
};

/* Alias */
Matrix.prototype.dup = function () {
    return new Matrix (this);
};

/* Alias */
Matrix.dup = function (m) {
    return new Matrix (m);
};

/**
 * Get row from matrix.
 *
 * @param int i Row number from 0 to 3 (inclusive)
 * @return array
 */
Matrix.prototype.getRow = function (i) {
    var row;

    if (0 <= i  &&  i < 4) {
        row = this[i];
    } else {
        throw new Error ('Invalid row ' + i);
    }

    return row;
};

/**
 * Get column from matrix.
 *
 * @param int j Column number from 0 to 3 (inclusive)
 * @return array
 */
Matrix.prototype.getColumn = function (j) {
    var col;

    if (0 <= j  &&  j < 4) {
        col = [
            this[0][j],
            this[1][j],
            this[2][j],
            this[3][j]
        ];
    } else {
        throw new Error ('Invalid column ' + j);
    }

    return col;
};

/**
 * Multiply matrix.
 *
 * The function expects to receive right-hand matrix as an input argument.
 * This argument may be a matrix object or an array convertible to matrix.
 *
 * The function multiplies left-hand matrix with the argument and stores the
 * result to the left-hand matrix.  The function returns a reference to the
 * left-hand matrix.
 *
 * @param mixed b Right-hand operator
 * @return Matrix
 */
Matrix.prototype.mul = function (b) {
    /* Do a full 4x4 matrix multiply since contents of b are unknown */
    Matrix._mul4 (this, this, Matrix.getInstance (b));
    return this;
};

/* Multiply with 3x1 submatrix at upper right corner */
Matrix._mul1 = function (c, a, b) {
    var b1 = b[0];
    var b2 = b[1];
    var b3 = b[2];
    var b4 = b[3];

    var a1 = a[0];
    var a11 = a1[0];
    var a12 = a1[1];
    var a13 = a1[2];
    var a14 = a1[3];
    var r1 = [
        a11,
        a12,
        a13,
        a11 * b1[3] + a12 * b2[3] + a13 * b3[3] + a14
    ];

    var a2 = a[1];
    var a21 = a2[0];
    var a22 = a2[1];
    var a23 = a2[2];
    var a24 = a2[3];
    var r2 = [
        a21,
        a22,
        a23,
        a21 * b1[3] + a22 * b2[3] + a23 * b3[3] + a24
    ];

    var a3 = a[2];
    var a31 = a3[0];
    var a32 = a3[1];
    var a33 = a3[2];
    var a34 = a3[3];
    var r3 = [
        a31,
        a32,
        a33,
        a31 * b1[3] + a32 * b2[3] + a33 * b3[3] + a34
    ];

    var a4 = a[3];
    var a41 = a4[0];
    var a42 = a4[1];
    var a43 = a4[2];
    var a44 = a4[3];
    var r4 = [
        a41,
        a42,
        a43,
        a41 * b1[3] + a42 * b2[3] + a43 * b3[3] + a44
    ];

    /* Store result */
    c[0] = r1;
    c[1] = r2;
    c[2] = r3;
    c[3] = r4;
};

/* Multiply with 2x2 submatrix at upper left corner */
Matrix._mul2 = function (c, a, b) {
    var b1 = b[0];
    var b2 = b[1];

    var a1 = a[0];
    var a11 = a1[0];
    var a12 = a1[1];
    var r1 = [
        a11 * b1[0] + a12 * b2[0],
        a11 * b1[1] + a12 * b2[1],
        a1[2],
        a1[3]
    ];

    var a2 = a[1];
    var a21 = a2[0];
    var a22 = a2[1];
    var r2 = [
        a21 * b1[0] + a22 * b2[0],
        a21 * b1[1] + a22 * b2[1],
        a2[2],
        a2[3]
    ];

    var a3 = a[2];
    var a31 = a3[0];
    var a32 = a3[1];
    var r3 = [
        a31 * b1[0] + a32 * b2[0],
        a31 * b1[1] + a32 * b2[1],
        a3[2],
        a3[3]
    ];

    var a4 = a[3];
    var a41 = a4[0];
    var a42 = a4[1];
    var r4 = [
        a41 * b1[0] + a42 * b2[0],
        a41 * b1[1] + a42 * b2[1],
        a4[2],
        a4[3]
    ];

    /* Store result */
    c[0] = r1;
    c[1] = r2;
    c[2] = r3;
    c[3] = r4;
};

/* Multiply with 3x3 submatrix at upper left corner */
Matrix._mul3 = function (c, a, b) {
    var b1 = b[0];
    var b2 = b[1];
    var b3 = b[2];

    var a1 = a[0];
    var a11 = a1[0];
    var a12 = a1[1];
    var a13 = a1[2];
    var r1 = [
        a11 * b1[0] + a12 * b2[0] + a13 * b3[0],
        a11 * b1[1] + a12 * b2[1] + a13 * b3[1],
        a11 * b1[2] + a12 * b2[2] + a13 * b3[2],
        a1[3]
    ];

    var a2 = a[1];
    var a21 = a2[0];
    var a22 = a2[1];
    var a23 = a2[2];
    var r2 = [
        a21 * b1[0] + a22 * b2[0] + a23 * b3[0],
        a21 * b1[1] + a22 * b2[1] + a23 * b3[1],
        a21 * b1[2] + a22 * b2[2] + a23 * b3[2],
        a2[3]
    ];

    var a3 = a[2];
    var a31 = a3[0];
    var a32 = a3[1];
    var a33 = a3[2];
    var r3 = [
        a31 * b1[0] + a32 * b2[0] + a33 * b3[0],
        a31 * b1[1] + a32 * b2[1] + a33 * b3[1],
        a31 * b1[2] + a32 * b2[2] + a33 * b3[2],
        a3[3]
    ];

    var a4 = a[3];
    var a41 = a4[0];
    var a42 = a4[1];
    var a43 = a4[2];
    var r4 = [
        a41 * b1[0] + a42 * b2[0] + a43 * b3[0],
        a41 * b1[1] + a42 * b2[1] + a43 * b3[1],
        a41 * b1[2] + a42 * b2[2] + a43 * b3[2],
        a4[3]
    ];

    /* Store result */
    c[0] = r1;
    c[1] = r2;
    c[2] = r3;
    c[3] = r4;
};

/* Full 4x4 matrix multiply */
Matrix._mul4 = function (c, a, b) {
    var b1 = b[0];
    var b2 = b[1];
    var b3 = b[2];
    var b4 = b[3];

    var a1 = a[0];
    var a11 = a1[0];
    var a12 = a1[1];
    var a13 = a1[2];
    var a14 = a1[3];
    var r1 = [
        a11 * b1[0] + a12 * b2[0] + a13 * b3[0] + a14 * b4[0],
        a11 * b1[1] + a12 * b2[1] + a13 * b3[1] + a14 * b4[1],
        a11 * b1[2] + a12 * b2[2] + a13 * b3[2] + a14 * b4[2],
        a11 * b1[3] + a12 * b2[3] + a13 * b3[3] + a14 * b4[3]
    ];

    var a2 = a[1];
    var a21 = a2[0];
    var a22 = a2[1];
    var a23 = a2[2];
    var a24 = a2[3];
    var r2 = [
        a21 * b1[0] + a22 * b2[0] + a23 * b3[0] + a24 * b4[0],
        a21 * b1[1] + a22 * b2[1] + a23 * b3[1] + a24 * b4[1],
        a21 * b1[2] + a22 * b2[2] + a23 * b3[2] + a24 * b4[2],
        a21 * b1[3] + a22 * b2[3] + a23 * b3[3] + a24 * b4[3]
    ];

    var a3 = a[2];
    var a31 = a3[0];
    var a32 = a3[1];
    var a33 = a3[2];
    var a34 = a3[3];
    var r3 = [
        a31 * b1[0] + a32 * b2[0] + a33 * b3[0] + a34 * b4[0],
        a31 * b1[1] + a32 * b2[1] + a33 * b3[1] + a34 * b4[1],
        a31 * b1[2] + a32 * b2[2] + a33 * b3[2] + a34 * b4[2],
        a31 * b1[3] + a32 * b2[3] + a33 * b3[3] + a34 * b4[3]
    ];

    var a4 = a[3];
    var a41 = a4[0];
    var a42 = a4[1];
    var a43 = a4[2];
    var a44 = a4[3];
    var r4 = [
        a41 * b1[0] + a42 * b2[0] + a43 * b3[0] + a44 * b4[0],
        a41 * b1[1] + a42 * b2[1] + a43 * b3[1] + a44 * b4[1],
        a41 * b1[2] + a42 * b2[2] + a43 * b3[2] + a44 * b4[2],
        a41 * b1[3] + a42 * b2[3] + a43 * b3[3] + a44 * b4[3]
    ];

    /* Store result */
    c[0] = r1;
    c[1] = r2;
    c[2] = r3;
    c[3] = r4;
};

/**
 * Multiply two matrices.
 *
 * The function expects to receive left and right-hand matrices as input
 * arguments.  These input arguments may be matrix objects or two-dimensional
 * arrays convertible to matrix objects.
 *
 * The function multiplies the two input arguments and returns the result as a
 * new matrix object.  The input arguments are not modified in the process.
 *
 * @param mixed a Left-hand operand
 * @param mixed b Right-hand operand
 * @return Matrix
 */
Matrix.mul = function (a, b) {
    var c = new Matrix ();
    Matrix._mul4 (c, a, b);
    return c;
};

/**
 * Transform vector.
 *
 * The function expects to receive a vector object or an array convertible to
 * vector as an input argument.
 *
 * The function multiplies the left-hand matrix with the vector and returns
 * the result as a new vector object.  Neither the matrix or the vector are
 * modified in the process.
 *
 * @param mixed v Vector or array convertible to vector.
 * @return Vector
 */
Matrix.prototype.transform = function (/*...*/) {
    /* Convert argument to vector */
    var v = VectorMath.getArray (arguments, 1);

    /* Rows of source of matrix */
    var a1 = this[0];
    var a2 = this[1];
    var a3 = this[2];
    var a4 = this[3];

    /* Cells of column vector */
    var b1 = v[0];
    var b2 = v[1];
    var b3 = v[2];

    /* Multiple 4x4 and 4x1 matrices */
    var v = new Vector(
        a1[0] * b1 + a1[1] * b2 + a1[2] * b3 + a1[3],
        a2[0] * b1 + a2[1] * b2 + a2[2] * b3 + a2[3],
        a3[0] * b1 + a3[1] * b2 + a3[2] * b3 + a3[3],
        a4[0] * b1 + a4[1] * b2 + a4[2] * b3 + a4[3]
    );
    return v;
};

/**
 * Multiply matrix and vector.
 *
 * The function expects to receive left-hand matrix and right-hand vector as
 * input arguments.  These arguments may be matrix and vector objects or
 * arrays convertible to matrix and vector objects.
 *
 * The function multiplies the left-hand matrix with the right-hand vector and
 * returns the result as a new vector object.  No arguments are modified in
 * the process.
 *
 * @param mixed a Matrix
 * @param mixed b Vector
 * @return Vector
 */
Matrix.transform = function (a, b) {
    var m = Matrix.getInstance (a);
    return m.transform (b);
};

/**
 * Scale matrix.
 *
 * The function can be used in three different forms:
 *
 *   (1) as m.scale (f)
 *   (2) as m.scale (sx, sy)
 *   (3) as m.scale (sx, sy, sz)
 *
 * The first form scales x, y and z axis by the constant factor f.  The second
 * form scales x and y axis with the factors sx and sy, respectively, while
 * leaving z axis unscaled.  The third form scales x, y and z axis separately
 * with factors sx, sy and sz, respectively.
 *
 * The function updates the left-hand matrix and returns a reference to it.
 *
 * Example:
 *
 *     // Returns [ 1, 1, 1, 1 ]
 *     var v = m.transform (1, 1, 1);
 *
 *     // Scale by constant factor
 *     m.scale (10);
 *
 *     // Now returns [ 10, 10, 10, 1 ]
 *     var v = m.transform (1, 1, 1);
 *
 * @param float sx
 * @param float sy
 * @param float sz
 * @return Matrix
 */
Matrix.prototype.scale = function (/*...*/) {
    /* Get scaling factors */
    var sx;
    var sy;
    var sz;
    switch (arguments.length) {
    case 1:
        sx = VectorMath.parseFloat (arguments[0]);
        sy = sx;
        sz = sx;
        break;

    case 2:
        sx = VectorMath.parseFloat (arguments[0]);
        sy = VectorMath.parseFloat (arguments[1]);
        sz = 1;
        break;

    case 3:
        sx = VectorMath.parseFloat (arguments[0]);
        sy = VectorMath.parseFloat (arguments[1]);
        sz = VectorMath.parseFloat (arguments[2]);
        break;

    default:
        throw new Error ('Invalid arguments');
    }

    /* Construct scaling transformation */
    var m = [
        [ sx, 0,  0,  0 ],
        [ 0,  sy, 0,  0 ],
        [ 0,  0,  sz, 0 ],
        [ 0,  0,  0,  1 ]
    ];

    /* Multiply with scaling transformation */
    Matrix._mul3 (this, this, m);
    return this;
};

/**
 * Construct scaled matrix.
 *
 * Function excepts to receive a matrix object or an array convertible to
 * matrix object as the first input argument and scaling factors as further
 * input arguments.
 *
 * The function multiplies the input matrix with the scaling factors and
 * returns the result as a new matrix object.  The input matrix is not
 * modified in the process.
 *
 * @param mixed m Source matrix
 * @param float sx
 * @param float sy
 * @param float sz
 * @return Matrix
 */
Matrix.scale = function (/*...*/) {
    var m = new Matrix (arguments[0]);
    return m.scale.apply (m, Array.prototype.slice.call (arguments, 1));
};

/**
 * Translate origin.
 *
 * The function expects to receive a vector or an array convertible to
 * vector as an input argument.
 *
 * The function updates the left-hand matrix and returns a reference to it.
 * The returned value may be used for chaining mathematical operations.
 *
 * Example:
 *
 *     // Returns [ 0, 0, 0, 1 ]
 *     var v = m.transform (0, 0, 0);
 *
 *     // Translate origin
 *     m.translate ([ 1, 2, 3 ]);
 *
 *     // Now returns [ 1, 2, 3, 1 ]
 *     var v = m.transform (0, 0, 0);
 *
 * @param Vector v
 * @return Matrix
 */
Matrix.prototype.translate = function (/*...*/) {
    /* Convert argument to array */
    var v = VectorMath.getArray (arguments, 1);

    /* Construct translation transformation */
    var m = [
        [ 1, 0, 0, v[0] ],
        [ 0, 1, 0, v[1] ],
        [ 0, 0, 1, v[2] ],
        [ 0, 0, 0, 1    ]
    ];

    /* Multiply current matrix with translation matrix */
    Matrix._mul1 (this, this, m);
    return this;
};

/**
 * Construct translated matrix.
 *
 * The function expects to receive matrix and vector as input arguments.  The
 * arguments may be matrix and vector objects or arrays convertible to matrix
 * and vector.
 *
 * The function multiplies the left-hand matrix with the translation matrix
 * produced from the right-hand vector and returns the result as a new matrix
 * object.  No arguments are modified in the process.
 *
 * @param Matrix m
 * @param Vector v
 * @return Matrix
 */
Matrix.translate = function (/*...*/) {
    var m = new Matrix (arguments[0]);
    return m.translate.apply (m, Array.prototype.slice.call (arguments, 1));
};

/**
 * Transpose matrix.
 *
 * The function expects no arguments.
 *
 * The function exchanges rows and columns of the left-hand matrix and returns
 * a reference to it.
 *
 * @return Matrix
 */
Matrix.prototype.transpose = function () {
    /* Copy rows to temporary variables */
    var r1 = this[0];
    var r2 = this[1];
    var r3 = this[2];
    var r4 = this[3];

    /* Exchange rows and columns */
    this[0] = [ r1[0], r2[0], r3[0], r4[0] ];
    this[1] = [ r1[1], r2[1], r3[1], r4[1] ];
    this[2] = [ r1[2], r2[2], r3[2], r4[2] ];
    this[3] = [ r1[3], r2[3], r3[3], r4[3] ];
    return this;
};

/**
 * Construct transpose of a matrix.
 *
 * The function expects to receive a matrix object or an array convertible to
 * matrix object as an input argument.
 *
 * The function returns a new matrix object where each row stores a column of
 * the source matrix.  The input argument is not modified in the process.
 *
 * @param Matrix m
 * @return Matrix
 */
Matrix.transpose = function (m) {
    var dup = new Matrix (m);
    return dup.transpose ();
};

/**
 * Rotate around x axis.
 *
 * The function is an alias for rotate (angle, [1, 0, 0]).
 *
 * @param float angle Rotation angle in degrees
 * @return Matrix
 */
Matrix.prototype.xrotate = function (angle) {
    /* Convert to radians */
    var rad = angle * Math.PI / 180;

    /* Construct rotation matrix */
    var a = Math.sin (rad);
    var b = -a;
    var c = Math.cos (rad);
    var m = [
        [ 1, 0, 0, 0 ],
        [ 0, c, b, 0 ],
        [ 0, a, c, 0 ],
        [ 0, 0, 0, 1 ]
    ];

    /* Multiply current matrix */
    Matrix._mul3 (this, this, m);
    return this;
};

/**
 * Construct rotated matrix.
 *
 * The function expects to receive a matrix object or an array convertible to
 * matrix as the first input argument and a rotation angle in degrees as the
 * second input argument.
 *
 * The function rotates the matrix around the x axis and returns the result as
 * a new matrix object.  The source matrix is not modified in the process.
 *
 * @param mixed m Source matrix (object or array)
 * @param float angle Rotation angle in degrees
 * @return Matrix
 */
Matrix.xrotate = function (m, angle) {
    var dup = new Matrix (m);
    return dup.xrotate (angle);
};

/**
 * Rotate around y axis.
 *
 * The function is an alias for rotate (angle, [0, 1, 0]).
 *
 * @param float angle Rotation angle in degrees
 * @return Matrix
 */
Matrix.prototype.yrotate = function (angle) {
    /* Convert to radians */
    var rad = angle * Math.PI / 180;

    /* Construct rotation matrix */
    var a = Math.sin (rad);
    var b = -a;
    var c = Math.cos (rad);
    var m = [
        [ c, 0, a, 0 ],
        [ 0, 1, 0, 0 ],
        [ b, 0, c, 0 ],
        [ 0, 0, 0, 1 ]
    ];

    /* Multiply current matrix */
    Matrix._mul3 (this, this, m);
    return this;
};

/**
 * Construct rotated matrix.
 *
 * The function expects to receive a matrix object or an array convertible to
 * matrix as the first input argument and a rotation angle in degrees as the
 * second input argument.
 *
 * The function rotates the matrix around the y axis and returns the result as
 * a new matrix object.  The source matrix is not modified in the process.
 *
 * @param mixed m Source matrix (object or array)
 * @param float angle Rotation angle in degrees
 * @return Matrix
 */
Matrix.yrotate = function (m, angle) {
    var dup = new Matrix (m);
    return dup.yrotate (angle);
};

/**
 * Rotate around z axis.
 *
 * The function is an alias for rotate (angle, [0, 0, 1]).
 *
 * @param float angle Rotation angle in degrees
 * @return Matrix
 */
Matrix.prototype.zrotate = function (angle) {
    /* Convert to radians */
    var rad = angle * Math.PI / 180;

    /* Construct rotation matrix */
    var a = Math.sin (rad);
    var b = -a;
    var c = Math.cos (rad);
    var m = [
        [ c, b, 0, 0 ],
        [ a, c, 0, 0 ],
        [ 0, 0, 1, 0 ],
        [ 0, 0, 0, 1 ]
    ];

    /* Multiply current matrix */
    Matrix._mul2 (this, this, m);
    return this;
};

/**
 * Construct rotated matrix.
 *
 * The function expects to receive a matrix object or an array convertible to
 * matrix as the first input argument and a rotation angle in degrees as the
 * second input argument.
 *
 * The function rotates the matrix around the z axis and returns the result as
 * a new matrix object.  The source matrix is not modified in the process.
 *
 * @param mixed m Source matrix (object or array)
 * @param float angle Rotation angle in degrees
 * @return Matrix
 */
Matrix.zrotate = function (m, angle) {
    var dup = new Matrix (m);
    return dup.zrotate (angle);
};

/**
 * Rotate around vector.
 *
 * The function expects to receive a rotation angle in degrees as the first
 * input argument and a vector object or an array convertible to vector as the
 * second argument.  If the second argument is omitted, then the function
 * rotates around z-axis.
 *
 * The function constructs a rotation matrix from the input arguments and
 * multiplies the left-hand matrix with this rotation matrix.  The function
 * stores the result to the left-hand matrix and returns a reference to it.
 *
 * @param float angle Rotation angle in degrees
 * @param mixed v Optional axis of rotation (vector or array)
 * @return Matrix
 */
Matrix.prototype.rotate = function (/*...*/) {
    /* Get rotation angle in degrees */
    var angle = VectorMath.parseFloat (arguments[0]);

    /* Convert rotation angle to radians */
    var rad = angle * Math.PI / 180;

    /* Get axis of rotation */
    var v;
    if (arguments.length == 1) {
        v = new Vector (0, 0, 1);
    } else if (arguments.length == 2) {
        v = new Vector (arguments[1]);
    } else {
        throw new Error ('Invalid arguments');
    }

    /* Normalize axis of rotation */
    v.normalize ();

    /* Construct rotation matrix */
    var x = v[0];
    var y = v[1];
    var z = v[2];
    var c = Math.cos (rad);
    var s = Math.sin (rad);
    var m = [
        [ x*x*(1-c)+c,   x*y*(1-c)-z*s, x*z*(1-c)+y*s, 0 ],
        [ y*x*(1-c)+z*s, y*y*(1-c)+c,   y*z*(1-c)-x*s, 0 ],
        [ x*z*(1-c)-y*s, y*z*(1-c)+x*s, z*z*(1-c)+c,   0 ],
        [ 0,             0,             0,             1 ]
    ];

    /* Multiply current matrix with rotation matrix */
    Matrix._mul3 (this, this, m);
    return this;
};

