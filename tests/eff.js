/*
 * eff.js
 * Check efficiency
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Efficiency', function () {
    /* Fail test is current implementation is x times slower than the best */
    var eps = 10;

    /* Set this true to show execution times */
    var verbose = false;

    /* Efficiency of matrix creation */
    this.test ('eff-100.0', function () {
        var n = 1000000;

        /* Time different algorithms */
        var a = _createMatrixFloat32 (n);
        var b = _createMatrixIndex (n);
        var c = _createMatrixAssoc (n);
        var d = _createMatrixObject (n);

        /* Compute average time of fastest implementation */
        var min = Math.min (a, b, c, d);

        /* Check if performance is good enough */
        var ok;
        if (d < min * eps) {
            ok = true;
        } else {
            ok = false;
        }

        /* Print execution times */
        if (!ok  ||  verbose) {
            console.log ('Create Float32Array ' + a);
            console.log ('Create indexed ' + b);
            console.log ('Create associative ' + c);
            console.log ('Create object ' + d);
        }
        return ok;
    });

    /* Efficiency of matrix multiplication */
    this.test ('eff-140.0', function () {
        var n = 1000000;

        /* Time different algorithms */
        var a = _mulMatrixFloat32 (n);
        var b = _mulMatrixIndex (n);
        var c = _mulMatrixAssoc (n);
        var d = _mulMatrixObject (n);

        /* Compute average time of fastest implementation */
        var min = Math.min (a, b, c, d);

        /* Check if performance is good enough */
        var ok;
        if (d < min * eps) {
            ok = true;
        } else {
            ok = false;
        }

        /* Print execution times */
        if (!ok  ||  verbose) {
            console.log ('Mul Float32Array ' + a);
            console.log ('Mul array ' + b);
            console.log ('Mul assoc ' + c);
            console.log ('Mul object ' + d);
        }
        return ok;
    });

});

/* Construct associative arrays */
function _createMatrixAssoc (n) {
    var c;

    var start = new Date ();
    for (var i = 0; i < n; i++) {
        c = new __createMatrixAssoc ();
        _useVariable (c);
    }
    var stop = new Date ();
    return (stop.getTime () - start.getTime ()) / 1000.0;
}
function __createMatrixAssoc () {
    _useVariable (arguments);
    this.m11 = 1;
    this.m12 = 0;
    this.m13 = 0;
    this.m14 = 0;
    this.m21 = 0;
    this.m22 = 1;
    this.m23 = 0;
    this.m24 = 0;
    this.m31 = 0;
    this.m32 = 0;
    this.m33 = 1;
    this.m34 = 0;
    this.m41 = 0;
    this.m42 = 0;
    this.m43 = 0;
    this.m44 = 1;
}
__createMatrixAssoc.prototype = Object.create (VectorMath.prototype);
__createMatrixAssoc.prototype.constructor = __createMatrixAssoc;

/* Construct indexed arrays */
function _createMatrixIndex (n) {
    var c;

    var start = new Date ();
    for (var i = 0; i < n; i++) {
        c = new __createMatrixIndex ();
        _useVariable (c);
    }
    var stop = new Date ();
    return (stop.getTime () - start.getTime ()) / 1000.0;
}
function __createMatrixIndex () {
    _useVariable (arguments);
    this[0] = [ 1, 0, 0, 0 ];
    this[1] = [ 0, 1, 0, 0 ];
    this[2] = [ 0, 0, 1, 0 ];
    this[3] = [ 0, 0, 0, 1 ];
}
__createMatrixIndex.prototype = Object.create (VectorMath.prototype);
__createMatrixIndex.prototype.constructor = __createMatrixIndex;

/* Construct Float32Arrays */
function _createMatrixFloat32 (n) {
    var c;

    var start = new Date ();
    for (var i = 0; i < n; i++) {
        var buffer = new ArrayBuffer (16*16);
        c = new Float32Array (buffer);

        c[0] = 1;
        c[1] = 0;
        c[2] = 0;
        c[3] = 0;

        c[4] = 0;
        c[5] = 1;
        c[6] = 0;
        c[7] = 0;

        c[8] = 0;
        c[9] = 0;
        c[10] = 1;
        c[11] = 0;

        c[12] = 0;
        c[13] = 0;
        c[14] = 0;
        c[15] = 1;

        _useVariable (c);
    }
    var stop = new Date ();
    return (stop.getTime () - start.getTime ()) / 1000.0;
}

/* Construct matrix objects */
function _createMatrixObject (n) {
    var c;

    var start = new Date ();
    for (var i = 0; i < n; i++) {
        c = new Matrix ();
        _useVariable (c);
    }
    var stop = new Date ();
    return (stop.getTime () - start.getTime ()) / 1000.0;
}

/* Multiply 4x4 matrices represented by Float32Arrays */
function _mulMatrixFloat32 (n) {
    var r1, r2, r3, r4;

    var c;

    var b2 = new ArrayBuffer (16*16);
    var a = new Float32Array (b2);
    for (var i = 0; i < 16; i++) {
        a[i] = i + 1.0;
    };

    var b3 = new ArrayBuffer (16*16);
    var b = new Float32Array (b3);
    for (var i = 0; i < 16; i++) {
        b[i] = i + 1.0;
    };

    var start = new Date ();
    for (var i = 0; i < n; i++) {
        var a11 = a[0];
        var a12 = a[1];
        var a13 = a[2];
        var a14 = a[3];
        r1 = [
            a11 * b[0] + a12 * b[4] + a13 * b[8] + a14 * b[12],
            a11 * b[1] + a12 * b[5] + a13 * b[9] + a14 * b[13],
            a11 * b[2] + a12 * b[6] + a13 * b[10] + a14 * b[14],
            a11 * b[3] + a12 * b[7] + a13 * b[11] + a14 * b[15]
        ];

        var a21 = a[4];
        var a22 = a[5];
        var a23 = a[6];
        var a24 = a[7];
        r2 = [
            a21 * b[0] + a22 * b[4] + a23 * b[8] + a24 * b[12],
            a21 * b[1] + a22 * b[5] + a23 * b[9] + a24 * b[13],
            a21 * b[2] + a22 * b[6] + a23 * b[10] + a24 * b[14],
            a21 * b[3] + a22 * b[7] + a23 * b[11] + a24 * b[15]
        ];

        var a31 = a[8];
        var a32 = a[9];
        var a33 = a[10];
        var a34 = a[11];
        r3 = [
            a31 * b[0] + a32 * b[4] + a33 * b[8] + a34 * b[12],
            a31 * b[1] + a32 * b[5] + a33 * b[9] + a34 * b[13],
            a31 * b[2] + a32 * b[6] + a33 * b[10] + a34 * b[14],
            a31 * b[3] + a32 * b[7] + a33 * b[11] + a34 * b[15]
        ];

        var a41 = a[12];
        var a42 = a[13];
        var a43 = a[14];
        var a44 = a[15];
        r4 = [
            a41 * b[0] + a42 * b[4] + a43 * b[8] + a44 * b[12],
            a41 * b[1] + a42 * b[5] + a43 * b[9] + a44 * b[13],
            a41 * b[2] + a42 * b[6] + a43 * b[10] + a44 * b[14],
            a41 * b[3] + a42 * b[7] + a43 * b[11] + a44 * b[15]
        ];

        var b1 = new ArrayBuffer (16*16);
        c = new Float32Array (b1);
        c[0] = r1[0];
        c[1] = r1[1];
        c[2] = r1[2];
        c[3] = r1[3];
        c[4] = r2[0];
        c[5] = r2[1];
        c[6] = r2[2];
        c[7] = r2[3];
        c[8] = r3[0];
        c[9] = r3[1];
        c[10] = r3[2];
        c[11] = r3[3];
        c[12] = r4[0];
        c[13] = r4[1];
        c[14] = r4[2];
        c[15] = r4[3];

        _useVariable (c);
    }
    var stop = new Date ();
    /*
    for (var i = 0; i < 16; i++) {
        console.log ('i=' + c[i]);
    }
    */
    return (stop.getTime () - start.getTime ()) / 1000.0;
}

/* Multiply matrices represented by associative arrays */
function _mulMatrixAssoc (n) {
    var r1, r2, r3, r4;

    var c;
    var a = {
        m11: 1,
        m12: 2,
        m13: 3,
        m14: 4,
        m21: 5,
        m22: 6,
        m23: 7,
        m24: 8,
        m31: 9,
        m32: 10,
        m33: 11,
        m34: 12,
        m41: 13,
        m42: 14,
        m43: 15,
        m44: 16
    };
    var b = {
        m11: 1,
        m12: 2,
        m13: 3,
        m14: 4,
        m21: 5,
        m22: 6,
        m23: 7,
        m24: 8,
        m31: 9,
        m32: 10,
        m33: 11,
        m34: 12,
        m41: 13,
        m42: 14,
        m43: 15,
        m44: 16
    };

    var start = new Date ();
    for (var i = 0; i < n; i++) {
        var a11 = a.m11;
        var a12 = a.m12;
        var a13 = a.m13;
        var a14 = a.m14;
        r1 = [
            a11 * b.m11 + a12 * b.m21 + a13 * b.m31 + a14 * b.m41,
            a11 * b.m12 + a12 * b.m22 + a13 * b.m32 + a14 * b.m42,
            a11 * b.m13 + a12 * b.m23 + a13 * b.m33 + a14 * b.m43,
            a11 * b.m14 + a12 * b.m24 + a13 * b.m34 + a14 * b.m44
        ];

        var a21 = a.m21;
        var a22 = a.m22;
        var a23 = a.m23;
        var a24 = a.m24;
        r2 = [
            a21 * b.m11 + a22 * b.m21 + a23 * b.m31 + a24 * b.m41,
            a21 * b.m12 + a22 * b.m22 + a23 * b.m32 + a24 * b.m42,
            a21 * b.m13 + a22 * b.m23 + a23 * b.m33 + a24 * b.m43,
            a21 * b.m14 + a22 * b.m24 + a23 * b.m34 + a24 * b.m44
        ];

        var a31 = a.m31;
        var a32 = a.m32;
        var a33 = a.m33;
        var a34 = a.m34;
        r3 = [
            a31 * b.m11 + a32 * b.m21 + a33 * b.m31 + a34 * b.m41,
            a31 * b.m12 + a32 * b.m22 + a33 * b.m32 + a34 * b.m42,
            a31 * b.m13 + a32 * b.m23 + a33 * b.m33 + a34 * b.m43,
            a31 * b.m14 + a32 * b.m24 + a33 * b.m34 + a34 * b.m44
        ];

        var a41 = a.m41;
        var a42 = a.m42;
        var a43 = a.m43;
        var a44 = a.m44;
        r4 = [
            a41 * b.m11 + a42 * b.m21 + a43 * b.m31 + a44 * b.m41,
            a41 * b.m12 + a42 * b.m22 + a43 * b.m32 + a44 * b.m42,
            a41 * b.m13 + a42 * b.m23 + a43 * b.m33 + a44 * b.m43,
            a41 * b.m14 + a42 * b.m24 + a43 * b.m34 + a44 * b.m44
        ];

        c = {};
        c.m11 = r1[0];
        c.m12 = r1[1];
        c.m13 = r1[2];
        c.m14 = r1[3];
        c.m21 = r2[0];
        c.m22 = r2[1];
        c.m23 = r2[2];
        c.m24 = r2[3];
        c.m31 = r3[0];
        c.m32 = r3[1];
        c.m33 = r3[2];
        c.m34 = r3[3];
        c.m41 = r4[0];
        c.m42 = r4[1];
        c.m43 = r4[2];
        c.m44 = r4[3];

        _useVariable (c);
    }
    var stop = new Date ();
    /*
    console.log (c);
    */
    return (stop.getTime () - start.getTime ()) / 1000.0;
}

/* Multiply 4x4 matrices represented by indexed arrays */
function _mulMatrixIndex (n) {
    var r1, r2, r3, r4;

    var c;
    var a = [
        [ 1, 2, 3, 4 ],
        [ 5, 6, 7, 8 ],
        [ 9, 10, 11, 12 ],
        [ 13, 14, 15, 16 ]
    ];
    var b = [
        [ 1, 2, 3, 4 ],
        [ 5, 6, 7, 8 ],
        [ 9, 10, 11, 12 ],
        [ 13, 14, 15, 16 ]
    ];

    var start = new Date ();
    for (var i = 0; i < n; i++) {
        var a11 = a[0][0];
        var a12 = a[0][1];
        var a13 = a[0][2];
        var a14 = a[0][3];
        r1 = [
            a11 * b[0][0] + a12 * b[1][0] + a13 * b[2][0] + a14 * b[3][0],
            a11 * b[0][1] + a12 * b[1][1] + a13 * b[2][1] + a14 * b[3][1],
            a11 * b[0][2] + a12 * b[1][2] + a13 * b[2][2] + a14 * b[3][2],
            a11 * b[0][3] + a12 * b[1][3] + a13 * b[2][3] + a14 * b[3][3]
        ];

        var a21 = a[1][0];
        var a22 = a[1][1];
        var a23 = a[1][2];
        var a24 = a[1][3];
        r2 = [
            a21 * b[0][0] + a22 * b[1][0] + a23 * b[2][0] + a24 * b[3][0],
            a21 * b[0][1] + a22 * b[1][1] + a23 * b[2][1] + a24 * b[3][1],
            a21 * b[0][2] + a22 * b[1][2] + a23 * b[2][2] + a24 * b[3][2],
            a21 * b[0][3] + a22 * b[1][3] + a23 * b[2][3] + a24 * b[3][3]
        ];

        var a31 = a[2][0];
        var a32 = a[2][1];
        var a33 = a[2][2];
        var a34 = a[2][3];
        r3 = [
            a31 * b[0][0] + a32 * b[1][0] + a33 * b[2][0] + a34 * b[3][0],
            a31 * b[0][1] + a32 * b[1][1] + a33 * b[2][1] + a34 * b[3][1],
            a31 * b[0][2] + a32 * b[1][2] + a33 * b[2][2] + a34 * b[3][2],
            a31 * b[0][3] + a32 * b[1][3] + a33 * b[2][3] + a34 * b[3][3]
        ];

        var a41 = a[3][0];
        var a42 = a[3][1];
        var a43 = a[3][2];
        var a44 = a[3][3];
        r4 = [
            a41 * b[0][0] + a42 * b[1][0] + a43 * b[2][0] + a44 * b[3][0],
            a41 * b[0][1] + a42 * b[1][1] + a43 * b[2][1] + a44 * b[3][1],
            a41 * b[0][2] + a42 * b[1][2] + a43 * b[2][2] + a44 * b[3][2],
            a41 * b[0][3] + a42 * b[1][3] + a43 * b[2][3] + a44 * b[3][3]
        ];

        c = [ r1, r2, r3, r4 ];

        _useVariable (c);
    }
    var stop = new Date ();
    /*
    console.log ('r1=' + c[0]);
    console.log ('r2=' + c[1]);
    console.log ('r3=' + c[2]);
    console.log ('r4=' + c[3]);
    */
    return (stop.getTime () - start.getTime ()) / 1000.0;
}

/* Multiply 4x4 matrices represented by objects */
function _mulMatrixObject (n) {
    var c;
    var a = new Matrix ([
        [ 1, 2, 3, 4 ],
        [ 5, 6, 7, 8 ],
        [ 9, 10, 11, 12 ],
        [ 13, 14, 15, 16 ]
    ]);
    var b = new Matrix ([
        [ 1, 2, 3, 4 ],
        [ 5, 6, 7, 8 ],
        [ 9, 10, 11, 12 ],
        [ 13, 14, 15, 16 ]
    ]);

    var start = new Date ();
    for (var i = 0; i < n; i++) {
        c = Matrix.mul (a, b);
        _useVariable (c);
    }
    var stop = new Date ();
    /*
    console.log (c);
    */
    return (stop.getTime () - start.getTime ()) / 1000.0;
}

/* Use variable to prevent browsers from optimizing it away */
function _useVariable (c) {
    /*
     * Firefox and Chrome may eliminate unused code.  This can skew timings by
     * making some code seem more efficient than it really is.  The code below
     * tries to use the variable c in a way that the browser cannot determine
     * in advance if the value is used or not.
     */
    if (!c  ||  typeof c != 'object'  ||  c.__dummy > 0) {
        throw new Error ('Invalid object');
    }
    if (Math.random () * 10000 < 0) {
        Test.output (c);
        throw new Error ('Bad luck ' + c.toString ());
    }
}
