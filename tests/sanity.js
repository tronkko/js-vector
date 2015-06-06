/*
 * sanity.js
 * Self-test module for Vector class
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('sanity', function () {

    /* Basic construction from 2d-coordinate */
    this.test ('sanity-101.0', function () {
        var v = new Vector (1, 2);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 0, 1 ]);

    /* Basic construction from 3d-coordinate */
    this.test ('sanity-102.0', function () {
        var v = new Vector (1, 2, 3);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Construction of zero-length vector */
    this.test ('sanity-103.0', function () {
        var v = new Vector ();
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0, 0, 0, 1 ]);

    /* Copy-construct */
    this.test ('sanity-104.0', function () {
        var src = new Vector (1, 2, 3);
        var v = new Vector (src);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Construction from 3d-coordinate with w component */
    this.test ('sanity-105.0', function () {
        var v = new Vector (1, 2, 3, 4);
        return v.x;
    }, 1.0 / 4.0);
    this.test ('sanity-105.1', function () {
        var v = new Vector (1, 2, 3, 4);
        return v.y;
    }, 2.0 / 4.0);
    this.test ('sanity-105.2', function () {
        var v = new Vector (1, 2, 3, 4);
        return v.z;
    }, 3.0 / 4.0);
    this.test ('sanity-105.3', function () {
        var v = new Vector (1, 2, 3, 4);
        return v.w;
    }, 1.0);

    /* Adding zero-length vector changes nothing */
    this.test ('sanity-110.0', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (0, 0, 0);
        var v = a.add (b);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Add regular vectors */
    this.test ('sanity-111.0', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        var v = a.add (b);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 11, 22, 33, 1 ]);

    /* Source vector is not modified by addition */
    this.test ('sanity-112.0', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        var v = a.add (b);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 1, 2, 3, 1 ]);
    this.test ('sanity-112.1', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        var v = a.add (b);
        return [ b.x, b.y, b.z, b.w ];
    }, [ 10, 20, 30, 1 ]);

    /* Substract vectors */
    this.test ('sanity-120.0', function () {
        var a = new Vector (10, 20, 30);
        var b = new Vector (1, 2, 3);
        var v = a.sub (b);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 9, 18, 27, 1 ]);

});

