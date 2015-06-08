/*
 * sub.js
 * Check workings of sub function
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-vector.  Js-vector may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-vector
 */

Test.module ('Vector.sub', function () {

    /* Substract vectors */
    this.test ('sub-120.0', function () {
        var a = new Vector (10, 20, 30);
        var b = new Vector (1, 2, 3);
        var v = a.sub (b);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 9, 18, 27, 1 ]);

    /* Left-hand operand is not modified by substraction */
    this.test ('sub-140.0', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        var v = a.sub (b);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 1, 2, 3, 1 ]);

    /*  Right-hand operand is not modified by substraction */
    this.test ('sub-150.0', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        var v = a.sub (b);
        return [ b.x, b.y, b.z, b.w ];
    }, [ 10, 20, 30, 1 ]);

    /* Substracting itself is same as zeroing */
    this.test ('sub-160.0', function () {
        var a = new Vector (10, 20, 30);
        var v = a.sub (a);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 0, 0, 0, 1 ]);

});

