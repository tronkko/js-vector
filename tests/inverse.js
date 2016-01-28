/*
 * inverse.js
 * Check inverse transformations
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Inverse transformations', function () {

    /* Inverse of unity matrix is unity matrix */
    this.test ('inverse-100.0', function () {
        var m = new Matrix ();
        m.inverse ();
        var v = m.transform ([ 1, 2, 3 ]);
        return [ v[0], v[1], v[2] ];
    }, [ 1, 2, 3 ]);

    /* Rotation followed by translation */
    this.test ('inverse-150.0', function () {
        var m = new Matrix ();

        /* Generate pseudo-random transformation */
        m.rotate (35);
        m.translate ([ 25, 4, 5 ]);

        /* Construct inverse of that transformation in one step */
        var a = Matrix.inverse (m);

        /* Transform from local to world coordinate system and back */
        var v = m.transform ([ 1, 2, 3 ]);
        var q = a.transform (v);
        return [ q[0], q[1], q[2] ];
    }, [ 1, 2, 3 ]);

    /* Translation followed by rotation */
    this.test ('inverse-151.0', function () {
        var m = new Matrix ();

        /* Generate pseudo-random transformation */
        m.translate ([ 10, -4, 20 ]);
        m.rotate (77);

        /* Construct inverse of that transformation in one step */
        var a = Matrix.inverse (m);

        /* Transform from local to world coordinate system and back */
        var v = m.transform ([ 2, 3, 4 ]);
        var q = a.transform (v);
        return [ q[0], q[1], q[2] ];
    }, [ 2, 3, 4 ]);

    /* Combined inverse of rotation followed by translation */
    this.test ('inverse-200.0', function () {
        var m = new Matrix ();
        var a = new Matrix ();

        /* Generate pseudo-random transformation */
        m.rotate (35);
        m.translate ([ 25, 4, 5 ]);

        /* Construct inverse of that transformation by chaining */
        a.rrotate (35);
        a.rtranslate ([ 25, 4, 5 ]);

        /* Transform from local to world coordinate system and back */
        var v = m.transform ([ 1, 2, 3 ]);
        var q = a.transform (v);
        return [ q[0], q[1], q[2] ];
    }, [ 1, 2, 3 ]);

    /* Combined inverse of translation followed by rotation */
    this.test ('inverse-201.0', function () {
        var m = new Matrix ();
        var a = new Matrix ();

        /* Generate pseudo-random transformation */
        m.translate ([ 10, -4, 20 ]);
        m.rotate (77);

        /* Construct inverse of that transformation by chaining */
        a.rtranslate ([ 10, -4, 20 ]);
        a.rrotate (77);

        /* Transform from local to world coordinate system and back */
        var v = m.transform ([ 2, 3, 4 ]);
        var q = a.transform (v);
        return [ q[0], q[1], q[2] ];
    }, [ 2, 3, 4 ]);

});

