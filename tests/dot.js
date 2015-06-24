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
        a.dot (b);
        return a.len ();
    }, 0);
    this.test ('dot-101.0', function () {
        var a = new Vector (0, 2, 0);
        var b = new Vector (0, 0, 6);
        a.dot (b);
        return a.len ();
    }, 0);
    this.test ('dot-102.0', function () {
        var a = new Vector (5, 0, 0);
        var b = new Vector (0, 0, 1);
        a.dot (b);
        return a.len ();
    }, 0);

    /* Dot product of vector itself is same as squaring each component */
    this.test ('dot-130.0', function () {
        var a = new Vector (1, 2, 3);
        a.dot (a);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 1*1, 2*2, 3*3, 1 ]);

    /* Argument can be supplied as an indexed array */
    this.test ('dot-140.0', function () {
        var a = new Vector (5, 0, 0);
        a.dot ([0, 0, 1]);
        return a.len ();
    }, 0);

    /* Argument can be supplied as an associative array */
    this.test ('dot-150.0', function () {
        var a = new Vector (1, 2, 3);
        a.dot ({ x:1, y:2, z:3, w:1 });
        return [ a.x, a.y, a.z, a.w ];
    }, [ 1*1, 2*2, 3*3, 1 ]);

    /* Vector.dot can compute dot product between two arrays */
    this.test ('dot-160.0', function () {
        var v = Vector.dot ([ 1,2,3 ],[ 1,2,3 ]);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1*1, 2*2, 3*3, 1 ]);

    /* Vector.dot does not modify left-hand operand */
    this.test ('dot-170.0', function () {
        var a = new Vector (5, 0, 0);
        var b = new Vector (0, 0, 1);
        var v = Vector.dot (a, b);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 5, 0, 0, 1 ]);

    /* Vector.dot does not modify right-hand operand */
    this.test ('dot-180.0', function () {
        var a = new Vector (5, 0, 0);
        var b = new Vector (0, 0, 1);
        var v = Vector.dot (a, b);
        return [ b.x, b.y, b.z, b.w ];
    }, [ 0, 0, 1, 1 ]);

});

