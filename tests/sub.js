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
        a.sub (b);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 9, 18, 27, 1 ]);

    /*  Right-hand operand is not modified by substraction */
    this.test ('sub-150.0', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        a.sub (b);
        return [ b.x, b.y, b.z, b.w ];
    }, [ 10, 20, 30, 1 ]);

    /* Substracting itself is same as zeroing */
    this.test ('sub-160.0', function () {
        var a = new Vector (10, 20, 30);
        a.sub (a);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 0, 0, 0, 1 ]);

    /* Argument can be an indexed array */
    this.test ('sub-170.0', function () {
        var a = new Vector (10, 20, 30);
        a.sub ([ 1, 2, 3 ]);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 9, 18, 27, 1 ]);

    /* Argument can be an associative array */
    this.test ('sub-171.0', function () {
        var a = new Vector (10, 20, 30);
        a.sub ({ x:1, y:2, z:3 });
        return [ a.x, a.y, a.z, a.w ];
    }, [ 9, 18, 27, 1 ]);

    /* Vector.sub can substract any two arrays as vectors */
    this.test ('sub-180.0', function () {
        var v = Vector.sub ([ 10, 20, 30 ], [ 1, 2, 3 ]);
        return [ v.x, v.y, v.z, v.w ];
    }, [ 9, 18, 27, 1 ]);

    /* Vector.sub does not modify left-hand operand */
    this.test ('sub-181.0', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        var v = Vector.sub (a, b);
        return [ a.x, a.y, a.z, a.w ];
    }, [ 1, 2, 3, 1 ]);

    /* Vector.sub does not modify right-hand operand */
    this.test ('sub-182.0', function () {
        var a = new Vector (1, 2, 3);
        var b = new Vector (10, 20, 30);
        var v = Vector.sub (a, b);
        return [ b.x, b.y, b.z, b.w ];
    }, [ 10, 20, 30, 1 ]);

});

