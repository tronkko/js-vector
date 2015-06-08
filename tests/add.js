/*
 * add.js
 * Check add function
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Vector.add', function () {

    /* Adding zero-length vector changes nothing */
    this.test ('add-110.0', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (0, 0, 0);
        var v = a.add (b);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Add regular vectors */
    this.test ('add-111.0', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        var v = a.add (b);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 11, 22, 33, 1 ]);

    /* Left-hand operand is not modified by addition */
    this.test ('add-112.0', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        var v = a.add (b);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 1, 2, 3, 1 ]);

    /*  Right-hand operand is not modified by addition */
    this.test ('add-112.1', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        var v = a.add (b);
        return [ b.x, b.y, b.z, b.w ];
    }, [ 10, 20, 30, 1 ]);

    /* Adding vector with itself is same as multiplying by 2 */
    this.test ('add-120.0', function () {
        var a = new Vector (1, 2, 3);
        var v = a.add (a);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 2, 4, 6, 1 ]);
});

