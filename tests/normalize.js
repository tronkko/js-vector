/*
 * normalize.js
 * Check normalize function
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Vector.normalize', function () {

    /* Nothing changes if unity vector is normalized */
    this.test ('normalize-100.0', function () {
        var v = new Vector (1, 0, 0);
        v.normalize ();
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 0, 0, 1 ]);
    this.test ('normalize-101.0', function () {
        var v = new Vector (0, 1, 0);
        v.normalize ();
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0, 1, 0, 1 ]);
    this.test ('normalize-102.0', function () {
        var v = new Vector (0, 0, 1);
        v.normalize ();
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0, 0, 1, 1 ]);

    /* Normalize 2d-vector */
    this.test ('normalize-120.0', function () {
        var v = new Vector (1, 1);
        v.normalize ();
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1 / Math.sqrt (2), 1 / Math.sqrt (2), 0, 1 ]);

    /* Normalize 3d-vector */
    this.test ('normalize-130.0', function () {
        var v = new Vector (-1, -1, -1);
        v.normalize ();
        return [ v.x, v.y, v.z, v.w ];
    }, [ -1 / Math.sqrt (3), -1 / Math.sqrt (3), -1 / Math.sqrt (3), 1 ]);

    /* Vector.normalize does not modify source operand */
    this.test ('normalize-140.0', function () {
        var v = new Vector (-1, -1, -1);
        var q = Vector.normalize (v);
        return [ v.x, v.y, v.z, v.w ];
    }, [ -1, -1, -1, 1 ]);

    /* Zero-length vector cannot be normalized */
    this.test ('normalize-150.0', function () {
        var ok = false;
        try {

            /* Construct zero-length vector and try to normalize it */
            var v = new Vector ();
            v.normalize ();

        }
        catch (e) {
            /* Got exception as expected */
            ok = true;
        }
        return ok;
    });

    /* After normalization, vector's length is one */
    this.test ('normalize-160.0', function () {
        for (var i = 0; i < 100; i++) {

            /* Construct random vector */
            var v = new Vector(
                Math.random () * 1000 - 500,
                Math.random () * 1000 - 500,
                Math.random () * 1000 - 500
            );

            /* Ensure the length is always greater than zero */
            if (v.len () < 1) {
                v.x = 1;
            }

            /* Normalize and check length */
            var q = Vector.normalize (v);
            if (Math.abs (q.len () - 1) > 1.0e-6) {
                throw new Error ('Not normalized');
            }

        }
        return true;
    });

    /* Vector.normalize can normalize any array */
    this.test ('normalize-170.0', function () {
        v = Vector.normalize ([ 1, 1 ]);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1 / Math.sqrt (2), 1 / Math.sqrt (2), 0, 1 ]);

});

