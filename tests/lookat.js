/*
 * combined.js
 * Check operation of lookAt function.
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Matrix.lookAt', function () {

    /* 
     * Look along z axis to the center of coordinate system and the coordinate
     * (0,0,0) is projected away from the viewer.
     */
    this.test ('lookat-100.0', function () {
        var m = new Matrix ();
        m.lookAt(
            [ 0, 0, 1 ],
            [ 0, 0, 0 ],
            [ 0, 1, 0 ]
        );
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v[0], v[1], v[2] ];
    }, [ 0, 0, 1 ]);

    /*
     * Look along z axis to the center of coordinate system and the coordinate
     * (5,0,0) is projected right of viewer.
     */
    this.test ('lookat-101.0', function () {
        var m = new Matrix ();
        m.lookAt(
            [ 0, 0, 1 ],
            [ 0, 0, 0 ],
            [ 0, 1, 0 ]
        );
        var v = m.transform ([ 5, 0, 0 ]);
        return [ v[0], v[1], v[2] ];
    }, [ 5, 0, 1 ]);

    /*
     * Look along z axis to the center of coordinate system and the coordinate
     * (0,7,0) is projected above the viewer.
     */
    this.test ('lookat-102.0', function () {
        var m = new Matrix ();
        m.lookAt(
            [ 0, 0, 1 ],
            [ 0, 0, 0 ],
            [ 0, 1, 0 ]
        );
        var v = m.transform ([ 0, 7, 0 ]);
        return [ v[0], v[1], v[2] ];
    }, [ 0, 7, 1 ]);

    /* Vectors p and u are normalized automatically */
    this.test ('lookat-110.0', function () {
        var m = new Matrix ();
        m.lookAt(
            [   0,  0, 0 ],
            [ 100,  0, 0 ],
            [  20, 70, 0 ]
        );
        var v = m.transform ([ 100, 0, 0 ]);
        return [ v[0], v[1], v[2] ];
    }, [ 0, 0, 100 ]);

});

