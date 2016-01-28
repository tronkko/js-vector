/*
 * rotate.js
 * Check operation of Matrix rotate functions
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Matrix.rotate', function () {

    /* Rotation with zero angle changes nothing */
    this.test ('rotate-100.0', function () {
        var m = new Matrix ();
        m.xrotate (0);
        var v = m.transform ([ 1, 1, 1 ]);
        return [ v.x, v.y, v.z ];
    }, [ 1, 1, 1 ]);
    this.test ('rotate-100.1', function () {
        var m = new Matrix ();
        m.yrotate (0);
        var v = m.transform ([ 1, 1, 1 ]);
        return [ v.x, v.y, v.z ];
    }, [ 1, 1, 1 ]);
    this.test ('rotate-100.2', function () {
        var m = new Matrix ();
        m.zrotate (0);
        var v = m.transform ([ 1, 1, 1 ]);
        return [ v.x, v.y, v.z ];
    }, [ 1, 1, 1 ]);

    /* Center point is not affected by rotation */
    this.test ('rotate-110.1', function () {
        var m = new Matrix ();
        m.translate (1, 2, 3);
        m.xrotate (25);
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 1, 2, 3 ]);
    this.test ('rotate-110.2', function () {
        var m = new Matrix ();
        m.translate (2, 1, 1);
        m.yrotate (55);
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 2, 1, 1 ]);
    this.test ('rotate-110.3', function () {
        var m = new Matrix ();
        m.translate (1, 5, 6);
        m.zrotate (192);
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 1, 5, 6 ]);

    /* Positive rotation around x axis transforms y to z axis */
    this.test ('rotate-120.0', function () {
        var m = new Matrix ();
        m.xrotate (90);
        var v = m.transform ([ 0, 9, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 0, 0, 9 ]);

    /* Positive rotation around y axis transforms z to x axis */
    this.test ('rotate-122.0', function () {
        var m = new Matrix ();
        m.yrotate (90);
        var v = m.transform ([ 0, 0, 5 ]);
        return [ v.x, v.y, v.z ];
    }, [ 5, 0, 0 ]);

    /* Positive rotation around z axis transforms x to y axis */
    this.test ('rotate-123.0', function () {
        var m = new Matrix ();
        m.zrotate (90);
        var v = m.transform ([ 2, 0, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 0, 2, 0 ]);

    /* Small rotations add up to create a big rotation */
    this.test ('rotate-130.0', function () {
        var m = new Matrix ();
        for (var i = 0; i < 10; i++) {
            m.xrotate (90 / 10);
        }
        var v = m.transform ([ 0, 9, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 0, 0, 9 ]);
    this.test ('rotate-131.0', function () {
        var m = new Matrix ();
        for (var i = 0; i < 10; i++) {
            m.yrotate (90 / 10);
        }
        var v = m.transform ([ 0, 0, 5 ]);
        return [ v.x, v.y, v.z ];
    }, [ 5, 0, 0 ]);
    this.test ('rotate-132.0', function () {
        var m = new Matrix ();
        for (var i = 0; i < 10; i++) {
            m.zrotate (90 / 10);
        }
        var v = m.transform ([ 2, 0, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 0, 2, 0 ]);

    /* Function xrotate, yrotate and zrotate are aliases for rotate */
    this.test ('rotate-140.0', function () {
        var m = new Matrix ();
        m.rotate (90, [ 1, 0, 0 ]);
        var v = m.transform ([ 0, 9, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 0, 0, 9 ]);
    this.test ('rotate-141.0', function () {
        var m = new Matrix ();
        m.rotate (90, [ 0, 1, 0 ]);
        var v = m.transform ([ 0, 0, 5 ]);
        return [ v.x, v.y, v.z ];
    }, [ 5, 0, 0 ]);
    this.test ('rotate-142.0', function () {
        var m = new Matrix ();
        m.rotate (90, [ 0, 0, 1 ]);
        var v = m.transform ([ 2, 0, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 0, 2, 0 ]);

    /* Function rotate will normalize the axis of rotation */
    this.test ('rotate-150.0', function () {
        var m = new Matrix ();
        m.rotate (90, [ 9, 0, 0 ]);
        var v = m.transform ([ 0, 1, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 0, 0, 1 ]);

    /* Axis of rotation may be omitted */
    this.test ('rotate-160.0', function () {
        var m = new Matrix ();
        m.rotate (90);
        var v = m.transform ([ 2, 0, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 0, 2, 0 ]);

    /* Static function works same as member function */
    this.test ('rotate-170.0', function () {
        var m = new Matrix ();
        var q = Matrix.rotate (m, 90);
        var v = q.transform ([ 2, 0, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 0, 2, 0 ]);

    /* Static function does not modify its argument */
    this.test ('rotate-171.0', function () {
        var m = new Matrix ();
        var q = Matrix.rotate (m, 90);
        var v = m.transform ([ 2, 0, 0 ]);
        return [ v.x, v.y, v.z ];
    }, [ 2, 0, 0 ]);

});

