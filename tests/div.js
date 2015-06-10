/*
 * div.js
 * Check vector division
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Vector.div', function () {

    /* Division with 1 changes nothing */
    this.test ('div-100.0', function () {
        var a = new Vector (1, 2, 3);
        var v = a.div (1.0);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Basic division with number */
    this.test ('div-110.0', function () {
        var a = new Vector (1, 2, 3);
        var v = a.div (10);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0.1, 0.2, 0.3, 1 ]);

    /* Vector can only be divided by a number */
    this.test ('div-120.0', function () {
        var ok = false;
        try {
            
            /* Create two vectors */
            var a = new Vector (1, 2, 3);
            var b = new Vector (2, 3, 4);

            /* Attempt to divide vectors */
            var v = a.div (b);

        }
        catch (e) {
            /* Got an exception as expected */
            ok = true;
        }
        return ok;
    });

    /* Vector can only be divided by a valid number */
    this.test ('div-121.0', function () {
        var ok = false;
        try {
            
            /* Create test vectors */
            var a = new Vector (1, 2, 3);

            /* Attempt to divide vector with invalid number */
            var v = a.div ('12aza');

        }
        catch (e) {
            /* Got an exception as expected */
            ok = true;
        }
        return ok;
    });

    /* Division does not modify source vector */
    this.test ('div-130.0', function () {
        var a = new Vector (1, 2, 3);
        var v = a.div (10);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 1, 2, 3, 1 ]);

});

