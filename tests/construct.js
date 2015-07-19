/*
 * construct.js
 * Check construction of Vector class
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Vector.construct', function () {

    /* Basic construction from 2d-coordinate */
    this.test ('construct-100.0', function () {
        var v = new Vector (1, 2);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 0, 1 ]);

    /* 
     * Construction of basic 2d-coordinate fails if the argument is not a
     * valid number.
     */
    this.test ('construct-101.0', function () {
        var ok = false;
        try {

            /* Try to create a vector with invalid coordinate */
            var v = new Vector ('2aba', 2);

        }
        catch (e) {
            /* Got an exception as expected */
            ok = true;
        }
        return ok;
    });

    /* Basic construction from 3d-coordinate */
    this.test ('construct-110.0', function () {
        var v = new Vector (1, 2, 3);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 3, 1 ]);

    /* 
     * Construction of basic 3d-coordinate fails if the argument is not a
     * valid number.
     */
    this.test ('construct-111.0', function () {
        var ok = false;
        try {

            /* Try to create a vector with invalid coordinate */
            var v = new Vector (1, [2], 3);

        }
        catch (e) {
            /* Got an exception as expected */
            ok = true;
        }
        return ok;
    });

    /* Components of the coordinate can be accessed using array notation */
    this.test ('construct-112.0', function () {
        var v = new Vector (1, 2, 3);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 1, 2, 3, 1 ]);

    /* Construct zero-length vector */
    this.test ('construct-120.0', function () {
        var v = new Vector ();
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0, 0, 0, 1 ]);

    /* Copy-construct */
    this.test ('construct-130.0', function () {
        var src = new Vector (1, 2, 3);
        var v = new Vector (src);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Copy-construct fails with null object */
    this.test ('construct-131.0', function () {
        var ok = false;
        try {

            /* Try to create a vector with null object */
            var v = new Vector (null);

        }
        catch (e) {
            /* Got an exception as expected */
            ok = true;
        }
        return ok;
    });

    /* 
     * Construction from 3d-coordinate with the w component causes x, y and z
     * component to be altered.
     */
    this.test ('construct-140.0', function () {
        var v = new Vector (1, 2, 3, 4);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0.25, 0.5, 0.75, 1.0 ]);

    /* Construction with invalid w component fails */
    this.test ('construct-141.0', function () {
        var ok = false;
        try {

            /* Try to create a vector with invalid w component */
            var v = new Vector (1, 2, 3, 0);

        }
        catch (e) {
            /* Got an exception as expected */
            ok = true;
        }
        return ok;
    });

    /* Cloning a vector preserves the original coordinate */
    this.test ('construct-150.0', function () {
        /* Create source vector */
        var a = new Vector (1, 2, 3, 4);

        /* Clone vector */
        var v = a.clone ();

        /* Change source vector directly */
        a.x = 0;
        a.y = 234;
        a.z = 11;

        /* Original coordinate can still be found from vector v */
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0.25, 0.5, 0.75, 1.0 ]);

    /* Components of a vector can be given in an indexed array */
    this.test ('construct-160.0', function () {
        var v = new Vector ([1, 2, 3]);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Components of a vector can be given in an associative array */
    this.test ('construct-161.0', function () {
        var v = new Vector ({ x:1, y:2, z:3 });
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Vector inherits from VectorMath */
    this.test ('construct-170.0', function () {
        var ok;
        var v = new Vector ({ x:1, y:2, z:3 });
        if (v instanceof VectorMath) {
            ok = true;
        } else {
            ok = false;
        }
        return ok;
    });

});

