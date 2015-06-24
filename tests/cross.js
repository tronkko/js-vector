/*
 * cross.js
 * Check cross product
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Vector.cross', function () {

    /* Basic cross of x and y axes will produce z axis */
    this.test ('cross-100.0', function () {
        var a = new Vector (1, 0, 0);
        var b = new Vector (0, 1, 0);
        a.cross (b);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 0, 0, 1, 1 ]);

    /* Cross product of y and z axis will produce x axis */
    this.test ('cross-101.0', function () {
        var a = new Vector (0, 1, 0);
        var b = new Vector (0, 0, 1);
        a.cross (b);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 1, 0, 0, 1 ]);

    /* Cross product of z and x axis will produce y axis */
    this.test ('cross-102.0', function () {
        var a = new Vector (0, 0, 1);
        var b = new Vector (1, 0, 0);
        a.cross (b);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 0, 1, 0, 1 ]);

    /* Cross product of y and x axis will produce negative z axis */
    this.test ('cross-110.0', function () {
        var a = new Vector (1, 0, 0);
        var b = new Vector (0, 1, 0);
        b.cross (a);
        return [ b.x, b.y, b.z, b.w ];
    }, [ 0, 0, -1, 1 ]);

    /* Length of result corresponds to area */
    this.test ('cross-120.0', function () {
        var a = new Vector (10, 0, 0);
        var b = new Vector (0, 15, 0);
        a.cross (b);
        return Vector.len (a);
    }, 10*15);

    /* Cross product with zero-length vectors yeilds zero-length vector */
    this.test ('cross-130.0', function () {
        var a = new Vector (9, 0, 0);
        var b = new Vector (0, 0, 0);
        a.cross (b);
        return a.len ();
    }, 0);
    this.test ('cross-131.0', function () {
        var a = new Vector (0, 0, 0);
        var b = new Vector (1, 9, 2);
        a.cross (b);
        return a.len ();
    }, 0);

    /* Cross product with the vector itself produces zero-length vector */
    this.test ('cross-140.0', function () {
        var a = new Vector (1, 2, 3);
        a.cross (a);
        return a.len ();
    }, 0);

    /* Argument can be supplied as an indexed array */
    this.test ('cross-150.0', function () {
        var a = new Vector (1, 0, 0);
        a.cross ([0, 1, 0]);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 0, 0, 1, 1 ]);

    /* Vector.cross can compute cross product between two arrays */
    this.test ('cross-160.0', function () {
        var v = Vector.cross ([ 0, 1, 0 ], [ 0, 0, 1 ]);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 0, 0, 1 ]);

    /* Vector.cross does not modify left-hand operand */
    this.test ('cross-170.0', function () {
        var a = new Vector (9, 0, 0);
        var b = new Vector (0, 0, 0);
        var v = Vector.cross (a, b);
        return a.len ();
    }, 9);
});

