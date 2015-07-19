/*
 * matrix.js
 * Check construction of Matrix class
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Matrix.construct', function () {

    /* Basic construction of unity matrix */
    this.test ('matrix-100.0', function () {
        var m = new Matrix ();
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 1, 0, 0, 0 ], 
        [ 0, 1, 0, 0 ],
        [ 0, 0, 1, 0 ],
        [ 0, 0, 0, 1 ]
    ]);

    /* Matrix can be constructed from rows */
    this.test ('matrix-110.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 12, 13, 14 ], 
        [ 21, 22, 23, 24 ],
        [ 31, 32, 33, 34 ],
        [ 41, 42, 43, 44 ]
    ]);

    /* Rows and columns may be omitted in construction */
    this.test ('matrix-111.0', function () {
        var m = new Matrix ([
            [ 11, 12 ], 
            [ 21, 22 ],
        ]);
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 12, 0, 0 ], 
        [ 21, 22, 0, 0 ],
        [  0,  0, 1, 0 ],
        [  0,  0, 0, 1 ]
    ]);

    /* Function unity resets the matrix */
    this.test ('matrix-115.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        m.unity ();
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 1, 0, 0, 0 ], 
        [ 0, 1, 0, 0 ],
        [ 0, 0, 1, 0 ],
        [ 0, 0, 0, 1 ]
    ]);

    /* Copy-construct preserves original content */
    this.test ('matrix-120.0', function () {
        var orig = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);

        /* Duplicate matrix */
        var m = new Matrix (orig);

        /* Modify source matrix */
        orig.unity ();

        /* Modification does not affect the clone */
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 12, 13, 14 ], 
        [ 21, 22, 23, 24 ],
        [ 31, 32, 33, 34 ],
        [ 41, 42, 43, 44 ]
    ]);

    /* Matrix can also be copied with clone */
    this.test ('matrix-121.0', function () {
        var orig = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);

        /* Duplicate matrix */
        var m = orig.clone ();

        /* Modify source matrix */
        orig.unity ();

        /* Modification does not affect the clone */
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 12, 13, 14 ], 
        [ 21, 22, 23, 24 ],
        [ 31, 32, 33, 34 ],
        [ 41, 42, 43, 44 ]
    ]);

    /* Function clone can be invoked through Matrix class */
    this.test ('matrix-122.0', function () {
        var orig = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);

        /* Duplicate matrix */
        var m = Matrix.clone (orig);

        /* Modify source matrix */
        orig.unity ();

        /* Modification does not affect the clone */
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 12, 13, 14 ], 
        [ 21, 22, 23, 24 ],
        [ 31, 32, 33, 34 ],
        [ 41, 42, 43, 44 ]
    ]);

    /* Function Matrix.getInstance will create a matrix at need */
    this.test ('matrix-123.0', function () {
        var m = Matrix.clone ([
            [ 110, 120, 130, 140 ], 
            [ 210, 220, 230, 240 ],
            [ 310, 320, 330, 340 ],
            [ 410, 420, 430, 440 ]
        ]);
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 110, 120, 130, 140 ], 
        [ 210, 220, 230, 240 ],
        [ 310, 320, 330, 340 ],
        [ 410, 420, 430, 440 ]
    ]);

    /* Columns can be accessed with function getColumn */
    this.test ('matrix-130.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        return m.getColumn (0);
    }, [ 11, 21, 31, 41 ]);
    this.test ('matrix-131.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        return m.getColumn (1);
    }, [ 12, 22, 32, 42 ]);
    this.test ('matrix-132.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        return m.getColumn (2);
    }, [ 13, 23, 33, 43 ]);
    this.test ('matrix-133.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        return m.getColumn (3);
    }, [ 14, 24, 34, 44 ]);

    /* Function getColumn fails if argument is out of bounds */
    this.test ('matrix-135.0', function () {
        var ok = false;
        try {
            var m = new Matrix ();
            dummy = m.getColumn (99);
        }
        catch (e) {
            /* OK: got exception */
            ok = true;
        }
        return ok;
    });

});

