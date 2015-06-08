/*
 * dot.js
 * Check dot product
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Vector.dot', function () {

    /* Dot product of perpendicular vectors is zero */
    this.test ('dot-100.0', function () {
        var a = new Vector (3, 0, 0);
        var b = new Vector (0, 1, 0);
        var v = a.dot (b);
        return v.length ();
    }, 0);
    this.test ('dot-101.0', function () {
        var a = new Vector (0, 2, 0);
        var b = new Vector (0, 0, 6);
        var v = a.dot (b);
        return v.length ();
    }, 0);
    this.test ('dot-102.0', function () {
        var a = new Vector (5, 0, 0);
        var b = new Vector (0, 0, 1);
        var v = a.dot (b);
        return v.length ();
    }, 0);

    /* Left-hand operand is not affected by the operation */
    this.test ('dot-110.0', function () {
        var a = new Vector (5, 0, 0);
        var b = new Vector (0, 0, 1);
        var v = a.dot (b);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 5, 0, 0, 1 ]);

    /* Right-hand operand is not affected by the operation */
    this.test ('dot-120.0', function () {
        var a = new Vector (5, 0, 0);
        var b = new Vector (0, 0, 1);
        var v = a.dot (b);
        return [ b.x, b.y, b.z, b.w ];
    }, [ 0, 0, 1, 1 ]);

    /* Dot product of vector itself */
    this.test ('dot-130.0', function () {
        var a = new Vector (1, 2, 3);
        var v = a.dot (a);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1*1, 2*2, 3*3, 1 ]);

});

