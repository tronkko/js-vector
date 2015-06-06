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
    this.test ('construct-101.0', function () {
        var v = new Vector (1, 2);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 0, 1 ]);

    /* Basic construction from 3d-coordinate */
    this.test ('construct-102.0', function () {
        var v = new Vector (1, 2, 3);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Construction of zero-length vector */
    this.test ('construct-103.0', function () {
        var v = new Vector ();
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0, 0, 0, 1 ]);

    /* Copy-construct */
    this.test ('construct-104.0', function () {
        var src = new Vector (1, 2, 3);
        var v = new Vector (src);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 3, 1 ]);

    /* 
     * Construction from 3d-coordinate with w component causes x, y and z
     * component to change.
     */
    this.test ('construct-105.0', function () {
        var v = new Vector (1, 2, 3, 4);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0.25, 0.5, 0.75, 1.0 ]);

    /* Cloning */
    this.test ('construct-106.0', function () {
        var a = new Vector (1, 2, 3, 4);
        var v = a.clone ();
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0.25, 0.5, 0.75, 1.0 ]);

});

