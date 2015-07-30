/*
 * transform.js
 * Check operation of transform function
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Matrix.transform', function () {

    /* Transformations with unity matrix return the same coordinate */
    this.test ('transform-100.0', function () {
        var m = new Matrix ();
        var v = m.transform ([ 0, 0, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 0, 0, 0, 1 ]);

    this.test ('transform-101.0', function () {
        var m = new Matrix ();
        var v = m.transform ([ 1, 2, 3 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 1, 2, 3, 1 ]);

    /* Translated matrix adds or substracts from the position */
    this.test ('transform-110.0', function () {
        var m = new Matrix ([
            [ 1, 0, 0, 10 ],
            [ 0, 1, 0, 20 ],
            [ 0, 0, 1, 30 ],
            [ 0, 0, 0, 1  ]
        ]);
        var v = m.transform ([ 1, 2, 3 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 11, 22, 33, 1 ]);

    this.test ('transform-111.0', function () {
        var m = new Matrix ([
            [ 1, 0, 0, -10 ],
            [ 0, 1, 0, -20 ],
            [ 0, 0, 1, -30 ],
            [ 0, 0, 0,  1  ]
        ]);
        var v = m.transform ([ 11, 22, 33 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 1, 2, 3, 1 ]);

    /* X, y and z axes control the coordinate directly */
    this.test ('transform-120.0', function () {
        var m = new Matrix ([
            [ 1, 0, 0, 0 ],
            [ 2, 1, 0, 0 ],
            [ 3, 0, 1, 0 ],
            [ 0, 0, 0, 1 ]
        ]);
        var v = m.transform ([ 1, 0, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 1, 2, 3, 1 ]);

    this.test ('transform-121.0', function () {
        var m = new Matrix ([
            [ 1, 1, 0, 0 ],
            [ 0, 2, 0, 0 ],
            [ 0, 3, 1, 0 ],
            [ 0, 0, 0, 1 ]
        ]);
        var v = m.transform ([ 0, 1, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 1, 2, 3, 1 ]);

    this.test ('transform-122.0', function () {
        var m = new Matrix ([
            [ 1, 0, 1, 0 ],
            [ 0, 1, 2, 0 ],
            [ 0, 0, 3, 0 ],
            [ 0, 0, 0, 1 ]
        ]);
        var v = m.transform ([ 0, 0, 2 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 1*2, 2*2, 3*2, 1 ]);

    /* Fourth row affects w-coordinate and is important for projections */
    this.test ('transform-130.0', function () {
        var m = new Matrix ([
            [ 1, 0, 0,   0 ],
            [ 0, 1, 0,   0 ],
            [ 0, 0, 0,   0 ],
            [ 0, 0, 1/3, 1 ]
        ]);
        var v = m.transform ([ 100, 100, 0 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 100, 100, 0, 1 ]);

    this.test ('transform-131.0', function () {
        var m = new Matrix ([
            [ 1, 0, 0, 0 ],
            [ 0, 1, 0, 0 ],
            [ 0, 0, 0, 0 ],
            [ 0, 0, 1, 1 ]
        ]);
        var v = m.transform ([ 100, 100, 1 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 100/2, 100/2, 0, 1 ]);

    /* Scaling */
    this.test ('transform-132.0', function () {
        var m = new Matrix ([
            [ 9, 0, 0, 0 ],
            [ 0, 9, 0, 0 ],
            [ 0, 0, 0, 0 ],
            [ 0, 0, 1, 1 ]
        ]);
        var v = m.transform ([ 1, 1, 2 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 1*9/3, 1*9/3, 0, 1 ]);

    /* Static version can be invoked with array argument */
    this.test ('transform-140.0', function () {
        var v = Matrix.transform ([
            [ 9, 0, 0, 0 ],
            [ 0, 0, 0, 0 ],
            [ 0, 0, 9, 0 ],
            [ 0, 1, 0, 1 ]
        ], [ 1, 1, 1 ]);
        return [ v[0], v[1], v[2], v[3] ];
    }, [ 1*9/2, 0, 1*9/2, 1 ]);

});

