/*
 * translate.js
 * Check operation of translate function
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Matrix.translate', function () {

    /* Translation with zero vector does nothing */
    this.test ('translate-100.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        m.translate ([ 0, 0, 0, 1 ]);
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 12, 13, 14 ], 
        [ 21, 22, 23, 24 ],
        [ 31, 32, 33, 34 ],
        [ 41, 42, 43, 44 ]
    ]);

    /* Translation of unity matrix affects the 3x1 submatrix at right edge */
    this.test ('translate-110.0', function () {
        var m = new Matrix ();
        m.translate ([ 1, 2, 3 ]);
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 1, 0, 0, 1 ], 
        [ 0, 1, 0, 2 ],
        [ 0, 0, 1, 3 ],
        [ 0, 0, 0, 1 ]
    ]);

    /* Translation changes the transformed coordinate */
    this.test ('translate-120.0', function () {
        var m = new Matrix ();
        m.translate ([ 1, 2, 3 ]);
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 1, 2, 3, 1 ]);

    /* Two small translation produce same as one combined translation */
    this.test ('translate-130.0', function () {
        var m = new Matrix ();
        m.translate ([ 1, 2, 3 ]);
        m.translate ([ 5, 7, 8 ]);
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 1+5, 2+7, 3+8, 1 ]);

    /* Negative translation substracts from coordinate */
    this.test ('translate-131.0', function () {
        var m = new Matrix ();
        m.translate ([ -10, -12, -20 ]);
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ -10, -12, -20, 1 ]);

    /* Translation by x axis transform the coordinate by that axis */
    this.test ('translate-140.0', function () {
        var m = new Matrix ([
            [ 1, 0, 0, 0 ],
            [ 2, 1, 0, 0 ],
            [ 3, 0, 1, 0 ],
            [ 0, 0, 0, 1 ],
        ]);
        m.translate ([ 1, 0, 0 ]);
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 1, 2, 3, 1 ]);

    /* Translation by y axis */
    this.test ('translate-141.0', function () {
        var m = new Matrix ([
            [ 1, 2, 0, 0 ],
            [ 0, 1, 0, 0 ],
            [ 0, 3, 1, 0 ],
            [ 0, 0, 0, 1 ],
        ]);
        m.translate ([ 0, 1, 0 ]);
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 2, 1, 3, 1 ]);

    /* Translation by z axis */
    this.test ('translate-142.0', function () {
        var m = new Matrix ([
            [ 1, 0, 3, 0 ],
            [ 0, 1, 2, 0 ],
            [ 0, 0, 1, 0 ],
            [ 0, 0, 0, 1 ],
        ]);
        m.translate ([ 0, 0, 1 ]);
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 3, 2, 1, 1 ]);

    /* Translation is affected by scale preceeding translate */
    this.test ('translate-150.0', function () {
        var m = new Matrix ();
        m.scale (10);
        m.translate ([ 1, 2, 3 ]);
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 10, 20, 30, 1 ]);

    /* Translation is not affected by scale following translate */
    this.test ('translate-151.0', function () {
        var m = new Matrix ();
        m.translate ([ -1, -2, -3 ]);
        m.scale (10);
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ -1, -2, -3, 1 ]);

    /* Class function does not change input arguments */
    this.test ('translate-160.0', function () {
        var m = new Matrix ();
        Matrix.translate (m, [ 1, 2, 3 ]);
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 1, 0, 0, 0 ], 
        [ 0, 1, 0, 0 ],
        [ 0, 0, 1, 0 ],
        [ 0, 0, 0, 1 ]
    ]);

    /* ... but otherwise produces the same result as the member function */
    this.test ('translate-161.0', function () {
        var m = new Matrix ();
        var x = Matrix.translate (m, [ 1, 2, 3 ]);
        return [ x[0], x[1], x[2], x[3] ];
    }, [
        [ 1, 0, 0, 1 ], 
        [ 0, 1, 0, 2 ],
        [ 0, 0, 1, 3 ],
        [ 0, 0, 0, 1 ]
    ]);

    /* Translation offset can be given as separate arguments */
    this.test ('translate-170.0', function () {
        var m = new Matrix ();
        m.translate (-10, -12, -20);
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ -10, -12, -20, 1 ]);

});

