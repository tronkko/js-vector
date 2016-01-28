/*
 * scale.js
 * Check operation of scale function
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Matrix.scale', function () {

    /* Scaling with constant factor of 1 changes nothing */
    this.test ('scale-100.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        m.scale (1);
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 12, 13, 14 ], 
        [ 21, 22, 23, 24 ],
        [ 31, 32, 33, 34 ],
        [ 41, 42, 43, 44 ]
    ]);

    /* Scaling x and y axis with 1 changes nothing */
    this.test ('scale-101.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        m.scale (1, 1);
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 12, 13, 14 ], 
        [ 21, 22, 23, 24 ],
        [ 31, 32, 33, 34 ],
        [ 41, 42, 43, 44 ]
    ]);

    /* Scaling x, y and z axis with 1 changes nothing */
    this.test ('scale-102.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        m.scale (1, 1, 1);
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 12, 13, 14 ], 
        [ 21, 22, 23, 24 ],
        [ 31, 32, 33, 34 ],
        [ 41, 42, 43, 44 ]
    ]);

    /* Scaling with number and its inverse changes nothing */
    this.test ('scale-103.0', function () {
        var m = new Matrix ([
            [ 11, 12, 13, 14 ], 
            [ 21, 22, 23, 24 ],
            [ 31, 32, 33, 34 ],
            [ 41, 42, 43, 44 ]
        ]);
        m.scale (10);
        m.scale (1.0/10);
        return [ m[0], m[1], m[2], m[3] ];
    }, [
        [ 11, 12, 13, 14 ], 
        [ 21, 22, 23, 24 ],
        [ 31, 32, 33, 34 ],
        [ 41, 42, 43, 44 ]
    ]);

    /* X, y and z axis may be scaled by constant factor */
    this.test ('scale-110.0', function () {
        var m = new Matrix ();
        m.scale (2);
        var v = m.transform ([ 1, 2, 3 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 2*1, 2*2, 2*3, 1 ]);

    /* X and y axis may be scaled separately */
    this.test ('scale-111.0', function () {
        var m = new Matrix ();
        m.scale (2, 3);
        var v = m.transform ([ 1, 2, 4 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 2*1, 3*2, 1*4, 1 ]);

    /* X, y and z axis may be scaled separately, result can be chained */
    this.test ('scale-112.0', function () {
        var m = new Matrix ();
        var v = m.scale (10, 20, 30).transform ([ 1, 2, 3 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 10*1, 20*2, 30*3, 1 ]);

    /* Translation offset is not affected by scaling */
    this.test ('scale-120.0', function () {
        var m = new Matrix ([
            [ 1, 0, 0, 10 ],
            [ 0, 1, 0, 20 ],
            [ 0, 0, 1, 30 ],
            [ 0, 0, 0, 1  ]
        ]);
        m.scale (2);
        var v = m.transform ([ 1, 2, 3 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 10+1*2, 20+2*2, 30+3*2, 1 ]);

    /* Class function does not modify its parameters */
    this.test ('scale-121.0', function () {
        var m = new Matrix ([
            [ 1, 0, 0, 10 ],
            [ 0, 1, 0, 20 ],
            [ 0, 0, 1, 30 ],
            [ 0, 0, 0, 1  ]
        ]);
        var x = Matrix.scale (m, 2);
        var v = m.transform ([ 1, 2, 3 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 10+1, 20+2, 30+3, 1 ]);

    /* ... but otherwise works as the member function */
    this.test ('scale-122.0', function () {
        var m = new Matrix ([
            [ 1, 0, 0, 10 ],
            [ 0, 1, 0, 20 ],
            [ 0, 0, 1, 30 ],
            [ 0, 0, 0, 1  ]
        ]);
        var x = Matrix.scale (m, 5, 6, 7);
        var v = x.transform ([ 1, 2, 3 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 10+1*5, 20+2*6, 30+3*7, 1 ]);

});

