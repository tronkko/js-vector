/*
 * neg.js
 * Check the neg function
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Vector.neg', function () {

    /* Basic negate */
    this.test ('neg-100.0', function () {
        var src = new Vector (1, 2, 3);
        var dest = src.neg ();
        return [ dest.x, dest.y, dest.z, dest.w ];
    }, [ -1, -2, -3, 1 ]);

    /* Zero-length vector is not affected by negation */
    this.test ('neg-110.0', function () {
        var src = new Vector (0, 0, 0);
        var dest = src.neg ();
        return [ dest.x, dest.y, dest.z, dest.w ];
    }, [ 0, 0, 0, 1 ]);

    /* Source object is not modified by negation */
    this.test ('neg-120.0', function () {
        var src = new Vector (1, 2, 3);
        var dest = src.neg ();
        return [ src.x, src.y, src.z, src.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Length of vector is not modified by negation */
    this.test ('neg-160.0', function () {
        for (var i = 0; i < 100; i++) {

            /* Construct random vector */
            var v = new Vector(
                Math.random () * 1000 - 500,
                Math.random () * 1000 - 500,
                Math.random () * 1000 - 500
            );

            /* Negate and check length */
            var q = v.neg ();
            if (Math.abs (q.length () - v.length ()) > 1.0e-6) {
                throw new Error ('Not negated');
            }

        }
        return true;
    });

});

