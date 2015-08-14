/*
 * transpose.js
 * Check operation of Matrix transpose function
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Matrix.transpose', function () {

    /* Transposition of unity matrix results in unity matrix */
    this.test ('transpose-100.0', function () {
        var m = new Matrix ();
        m.transpose ();
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 1, 0, 0, 0 ], 
        [ 0, 1, 0, 0 ],
        [ 0, 0, 1, 0 ],
        [ 0, 0, 0, 1 ]
    ]);

    /* Rows and columns are exchanged by transpose */
    this.test ('transpose-110.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ],
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        m.transpose ();
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 21, 31, 41 ],
        [ 12, 22, 32, 42 ],
        [ 13, 23, 33, 43 ],
        [ 14, 24, 34, 44 ]
    ]);

    /* Source matrix is not affected by class function */
    this.test ('transpose-120.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        var dummy = Matrix.transpose (m);
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 12, 13, 14 ], 
        [ 21, 22, 23, 24 ],
        [ 31, 32, 33, 34 ],
        [ 41, 42, 43, 44 ]
    ]);

    /* ... but otherwise class function works just like the member function */
    this.test ('transpose-121.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        var x = Matrix.transpose (m);
        return [ x[0], x[1], x[2], x[3] ];
    }, [
        [ 11, 21, 31, 41 ],
        [ 12, 22, 32, 42 ],
        [ 13, 23, 33, 43 ],
        [ 14, 24, 34, 44 ]
    ]);

    /* Transpose can be used to construct new matrix */
    this.test ('transpose-130.0', function () {
        var m = Matrix.transpose ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 21, 31, 41 ],
        [ 12, 22, 32, 42 ],
        [ 13, 23, 33, 43 ],
        [ 14, 24, 34, 44 ]
    ]);

});

