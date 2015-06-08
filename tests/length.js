/*
 * length.js
 * Check length function
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Vector.length', function () {

    /* Length of zero-length vector is zero */
    this.test ('length-100.0', function () {
        var v = new Vector (0, 0, 0);
        return v.length ();
    }, 0.0);

    /* Length of unity vector is one */
    this.test ('length-110.0', function () {
        var v = new Vector (1, 0, 0);
        return v.length ();
    }, 1.0);
    this.test ('length-110.1', function () {
        var v = new Vector (0, 1, 0);
        return v.length ();
    }, 1.0);
    this.test ('length-110.2', function () {
        var v = new Vector (0, 0, 1);
        return v.length ();
    }, 1.0);

    /* Length of 2d-vector */
    this.test ('length-120.0', function () {
        var v = new Vector (5, -10, 0);
        return v.length ();
    }, Math.sqrt (5*5 + 10*10));
    this.test ('length-121.0', function () {
        var v = new Vector (100, 100, 0);
        return v.length ();
    }, Math.sqrt (100*100 + 100*100));

    /* Length of 3d-vector */
    this.test ('length-130.0', function () {
        var v = new Vector (-1, 1, -1);
        return v.length ();
    }, Math.sqrt (1*1 + 1*1 + 1*1));

});

