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
        var v = a.cross (b);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0, 0, 1, 1 ]);

    /* Cross product of y and z axis will produce x axis */
    this.test ('cross-101.0', function () {
        var a = new Vector (0, 1, 0);
        var b = new Vector (0, 0, 1);
        var v = a.cross (b);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 0, 0, 1 ]);

    /* Cross product of z and x axis will produce y axis */
    this.test ('cross-102.0', function () {
        var a = new Vector (0, 0, 1);
        var b = new Vector (1, 0, 0);
        var v = a.cross (b);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0, 1, 0, 1 ]);

    /* Cross product of y and x axis will produce negative z axis */
    this.test ('cross-110.0', function () {
        var a = new Vector (1, 0, 0);
        var b = new Vector (0, 1, 0);
        var v = b.cross (a);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0, 0, -1, 1 ]);

    /* Length of result corresponds to area */
    this.test ('cross-120.0', function () {
        var a = new Vector (10, 0, 0);
        var b = new Vector (0, 15, 0);
        var v = a.cross (b);
        return v.length ();
    }, 10*15);

    /* Cross product with zero-length vectors yeilds zero-length vector */
    this.test ('cross-130.0', function () {
        var a = new Vector (9, 0, 0);
        var b = new Vector (0, 0, 0);
        var v = a.cross (b);
        return v.length ();
    }, 0);
    this.test ('cross-131.0', function () {
        var a = new Vector (0, 0, 0);
        var b = new Vector (1, 9, 2);
        var v = a.cross (b);
        return v.length ();
    }, 0);

    /* Cross product with the vector itself produces zero-length vector */
    this.test ('cross-140.0', function () {
        var a = new Vector (1, 2, 3);
        var v = a.cross (a);
        return v.length ();
    }, 0);

    /* Argument can be supplied as an indexed array */
    this.test ('cross-150.0', function () {
        var a = new Vector (1, 0, 0);
        var v = a.cross ([0, 1, 0]);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0, 0, 1, 1 ]);

});

