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
        a.add (b);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Add regular vectors */
    this.test ('add-111.0', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        a.add (b);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 11, 22, 33, 1 ]);

    /* Right-hand operand is not modified by addition */
    this.test ('add-112.1', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        a.add (b);
        return [ b.x, b.y, b.z, b.w ];
    }, [ 10, 20, 30, 1 ]);

    /* Adding vector with itself is same as multiplying by 2 */
    this.test ('add-120.0', function () {
        var a = new Vector (1, 2, 3);
        a.add (a);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 2, 4, 6, 1 ]);

    /* Operand can be given as an indexed array */
    this.test ('add-130.0', function () {
        var a = new Vector (1, 2, 3);
        a.add ([10, 20, 30]);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 11, 22, 33, 1 ]);

    /* Vector.add can add any arrays as if they were vectors */
    this.test ('add-140.0', function () {
        var v = Vector.add ([1, 2, 3], [10, 20, 30]);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 11, 22, 33, 1 ]);

    /* Vector.add will not modify left-hand operand */
    this.test ('add-141.0', function () {
        var a = new Vector (1, 2, 3);
        var v = Vector.add (a, [10, 20, 30]);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Additions may be chained */
    this.test ('add-150.0', function () {
        var v = new Vector ();
        v.add ([ 1, 0, 0 ]).add ([ 1, 1, 0 ]).add ([ 1, 1, 1 ]);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 3, 2, 1, 1 ]);

});

