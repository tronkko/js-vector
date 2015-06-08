/*
 * mul.js
 * Check mul function
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Vector.mul', function () {

    /* Multiply with 1 changes nothing */
    this.test ('mul-100.0', function () {
        var a = new Vector (1, 2, 3);
        var v = a.mul (1.0);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Basic multiply with a number */
    this.test ('mul-110.0', function () {
        var a = new Vector (1, 2, 3);
        var v = a.mul (10);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 10, 20, 30, 1 ]);

    /* Vector can only be multiplied by a number */
    this.test ('mul-120.0', function () {
        var ok = false;
        try {
            
            /* Create two vectors */
            var a = new Vector (1, 2, 3);
            var b = new Vector (2, 3, 4);

            /* Attempt to multiple vectors */
            var v = a.mul (b);

        }
        catch (e) {
            /* Got an exception as expected */
            ok = true;
        }
        return ok;
    });

    /* Vector can only be multiplied by a valid number */
    this.test ('mul-121.0', function () {
        var ok = false;
        try {
            
            /* Create test vectors */
            var a = new Vector (1, 2, 3);

            /* Attempt to multiple vector with invalid number */
            var v = a.mul ('12aza');

        }
        catch (e) {
            /* Got an exception as expected */
            ok = true;
        }
        return ok;
    });

    /* Multiplication does not modify source vector */
    this.test ('mul-130.0', function () {
        var a = new Vector (1, 2, 3);
        var v = a.mul (10);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 1, 2, 3, 1 ]);

});

