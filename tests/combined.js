/*
 * combined.js
 * Check combined transformations
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Combined transformations', function () {

    /* Rotation followed by translation */
    this.test ('combine-100.0', function () {
        var m = new Matrix ();

        /* Rotate coordinate system 90 degrees anti-clockwise */
        m.rotate (90);

        /* Translate center point along rotated x axis */
        m.translate ([ 25, 0, 0 ]);

        var v = m.transform ([ 5, 0, 0 ]);
        return [ v[0], v[1], v[2] ];
    }, [ 0, 25+5, 0 ]);

    /* Translation followed by rotation */
    this.test ('combine-101.0', function () {
        var m = new Matrix ();

        /* Translate center point along x axis */
        m.translate ([ 10, 0, 0 ]);

        /* Rotate coordinate system 90 degrees anti-clockwise */
        m.rotate (90);

        var v = m.transform ([ 5, 0, 0 ]);
        return [ v[0], v[1], v[2] ];
    }, [ 10, 5, 0 ]);

    /* Scaling followed by translation */
    this.test ('combine-110.0', function () {
        var m = new Matrix ();

        /* Scale coordinate system by 10 */
        m.scale (10);

        /* Translate center point in scaled coordinate system */
        m.translate ([ 1, 2, 3 ]);

        var v = m.transform ([ 10, 20, 30 ]);
        return [ v[0], v[1], v[2] ];
    }, [ 1*10+10*10, 2*10+20*10, 3*10+30*10 ]);

    /* Translation followed by scaling */
    this.test ('combine-111.0', function () {
        var m = new Matrix ();

        /* Translate center point */
        m.translate ([ 1, 2, 3 ]);

        /* Scale coordinate system by 10 */
        m.scale (10);

        var v = m.transform ([ 10, 20, 30 ]);
        return [ v[0], v[1], v[2] ];
    }, [ 1+10*10, 2+20*10, 3+30*10 ]);

});

