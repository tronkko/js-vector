/*
 * js-test 1.0
 * Unit testing framework for JavaScript
 * 
 * Copyright (c) 2015 Toni Ronkko
 * This file is part of js-test.  Js-test may be freely distributed
 * under the MIT license.  For all details and documentation, see
 * https://github.com/tronkko/js-test
 */

/* Source required node.js modules */
if (typeof module !== 'undefined') {
    var fs = require ('fs');
}

/*
 * Namespace and base class for tests.
 */
Test = function () {
};
Test.prototype = {};
Test.prototype.constructor = Test;

/* Initialize static variables */
Test._testing = 0;
Test._success = 0;
Test._failed = 0;
Test._names = {};

/* Define placeholder functions */
Test.prototype.cleanup = function () {
    /*NOP*/;
};
Test.prototype.success = function () {
    /*NOP*/;
};
Test.prototype.failure = function () {
    /*NOP*/;
};

/*
 * Create derived test class.
 *
 * The function takes an array of functions as the first parameter.  This
 * array contains at least the function run, which contains the individual
 * test cases.  Additionally, the array can contain functions initialize and
 * cleanup.  The function initialize will be called prior to running tests,
 * and it is useful for allocating resources for the test.  The function
 * cleanup will be called after the last test case has been run, and it is
 * useful for releasing resources.
 *
 * The function returns a class that can be used to construct objects.
 *
 * Example:
 *
 *     // Derive simple test class
 *     var MyTest = Test.extend ({
 *         initialize: function () {
 *         },
 *         run: function () {
 *             // Simple test for making sure that 1 + 1 is still 2
 *             this.test ('mytest-1.0', function () {
 *                 return 1 + 1 == 2
 *             });
 *
 *             // Add another test case here
 *         },
 *         cleanup: function () {
 *         },
 *     });
 *
 *     // Create object
 *     var obj = new MyTest ();
 *
 * @param array args
 * @return Object
 */
Test.extend = function (args) {
    /* Create new class object */
    var _self;
    if (typeof args != 'object') {

        throw new Error ('Invalid argument');

    } else if (args.hasOwnProperty ('constructor')) {

        /* Constructor provided */
        _self = args['constructor'];

    } else if (args.hasOwnProperty ('initialize')) {

        /* Default constructor with initializer provided */
        var _that = this;
        _self = function () {
            _that.prototype.constructor.apply (this, arguments);
            args['initialize'].apply (this, arguments);
        };

    } else {

        /* Default constructor with default initializer */
        var _that = this;
        _self = function () {
            _that.prototype.constructor.apply (this, arguments);
        };

    }

    /* Override existing methods and define new methods */
    _self.prototype = Object.create (this.prototype);
    for (i in args) {
        _self.prototype[i] = args[i];
    }

    /* Set name of new class so that instanceof works as expected */
    _self.prototype.constructor = _self;

    /* Copy extend function to the new class so it can be extended too */
    _self.extend = this.extend;

    return _self;
};

/*
 * Test if argument is a string.
 *
 * Example:
 *
 *     // Returns true
 *     ok = Test.isString ('abc');
 *
 *     // Returns false
 *     ok = Test.isString (null);
 *
 * @param mixed arg
 * @return boolean True if argument is a string
 */
Test.isString = function (arg) {
    var result;
    if (typeof arg == 'string') {
        result = true;
    } else {
        result = false;
    }
    return result;
};

/*
 * Test if argument is an indexed array.
 *
 * Example:
 *
 *     // Returns true
 *     ok = Test.isArray ([ 1, 2, 3 ]);
 *
 *     // Returns false
 *     ok = Test.isArray ({ a:3 });
 *
 * @param mixed arg
 * @return boolean True if argument is an indexed array
 */
Test.isArray = function (arg) {
    var ok = true;

    /* Is the argument an object? */
    if (typeof arg == 'object'  &&  arg !== null) {

        /* Yes, does the object have the length property? */
        if (typeof arg['length'] == 'number') {

            /* 
             * Yes, length property exists so the object MAY be an indexed
             * array.  Loop through keys and find out for sure: the object is
             * deemed an associative array if evan a single non-numeric key
             * is found.
             */
            var re = new RegExp (/^([1-9][0-9]*|0)$/);
            for (var i in arg) {
                if (!re.test ("" + i)) {
                    ok = false;
                    break;
                }
            }

        } else {

            /* Argument has no length so is it cannot be an array */
            ok = false;

        }

    } else {

        /* String, number or null */
        ok = false;

    }
    return ok;
}

/*
 * Convert argument to string.
 *
 * The function accepts a single argument of any type and returns the
 * corresponding string representation.
 *
 * Be ware that the resulting string is formatted for readability over
 * precision.  For example, the string may not include every element of a
 * large array.
 *
 * Example:
 *
 *     // Returns 'null'
 *     var x = Test.toString (null);
 *
 *     // Returns '12.4'
 *     var x = Test.toString (12.4);
 *
 *     // Returns '[ 1, 2, 3 ]'
 *     var x = Test.toString ([1,2,3]);
 *
 * @param mixed arg Argument
 * @return string
 */
Test.toString = function (arg) {
    /* Convert arrays recursively */
    return Test._toString (arg, 0);
}
Test._toString = function (arg, level) {
    var result;

    var type = (typeof arg);
    switch (type) {
    case 'boolean':
        /* Convert boolean true/false */
        if (arg) {
            result = 'true';
        } else {
            result = 'false';
        }
        break;

    case 'number':
        /* Convert number with arbitrary number of decimals */
        result = arg.toString ();
        break;

    case 'string':
        /* Convert string to string */
        if (level == 0) {

            /* Convert a single string value */
            result = arg;

        } else {

            /* Convert string within array of strings */
            var value;
            if (arg.length < 50) {
                value = arg;
            } else {
                value = arg.substr (0, 47) + '...';
            }
            result = '"' + value + '"';

        }
        break;

    case 'object':
        /* Convert object */
        if (arg === null) {

            /* Null object */
            result = 'null';

        } else if (arg instanceof Date) {

            /* Convert date */
            function fix (n) {
                return ((n < 10) ? "0" + n : n);
            }
            result = arg.getFullYear ()
                + '-' + fix (arg.getMonth () + 1)
                + '-' + fix (arg.getDate ())
                + ' ' + fix (arg.getHours ())
                + ':' + fix (arg.getMinutes ())
                + ':' + fix (arg.getSeconds ());

        } else {

            /* Is the object array? */
            if (Test.isArray (arg)) {

                /* Convert an indexed array */
                var compound = '';
                if (level < 10) {
                    for (var i = 0; i < arg.length; i++) {
                        /* Append separator */
                        if (compound != '') {
                            compound += ', ';
                        }

                        /* Format single value */
                        var value = Test._toString (arg[i], level + 1);

                        /* Append single compound to compound */
                        if (compound.length + value.length < 100) {
                            compound += value;
                        } else {
                            compound += '...';
                            break;
                        }
                    }
                }

                /* Format compound array */
                if (compound != '') {
                    result = '[ ' + compound + ' ]';
                } else {
                    result = '[]';
                }

            } else {

                /* Convert associative array or object */
                var compound = '';
                if (level < 10) {
                    for (var i in arg) {
                        /* Append separator */
                        if (compound != '') {
                            compound += ', ';
                        }

                        /* Format key-value pair */
                        var value = i + ':'
                            + Test._toString (arg[i], level + 1);

                        /* Append compound and break string on long data */
                        if (compound.length + value.length < 100) {
                            compound += value;
                        } else {
                            compound += '...';
                            break;
                        }
                    }
                }

                /* Format compound object */
                if (compound != '') {
                    result = '{ ' + compound + ' }';
                } else {
                    result = '{}';
                }

            }
        }
        break;

    case 'undefined':
        /* Argument is an undefined variable */
        result = 'undefined';
        break;

    case 'function':
        /* Argument is a function */
        result = 'function';
        break;

    default:
        throw new Error ("Invalid data type " + type + " in toString");
    }

    return result;
};

/*
 * Convert argument to boolean.
 *
 * Example:
 *
 *     // Returns true
 *     ok = Test.toBoolean ('zap');
 *
 *     // Returns false
 *     ok = Test.toBoolean (0);
 *
 *     // Returns true
 *     ok = Test.toBoolean ([ 1,2 ]);
 *
 * @param mixed arg
 * @return boolean
 */
Test.toBoolean = function (arg) {
    var result;

    switch (typeof arg) {
    case 'boolean':
        /* Argument is already boolean */
        result = arg;
        break;

    case 'number':
        /* Number zero evaluates to false */
        if (Math.abs (arg) < 1.0e-6) {
            result = false;
        } else {
            result = true;
        }
        break;

    case 'string':
        /* Empty string evaluates to false */
        switch (arg) {
        case '':
        case 'false':
        case '0':
            result = false;
            break;

        case 'true':
        default:
            result = true;
        }
        break;

    case 'object':
        /* Null and empty array evaluate to false */
        if (arg === null) {

            /* Null value */
            result = false;

        } else if (Test.isArray (arg)) {

            /* Indexed array */
            if (arg.length == 0) {
                result = false;
            } else {
                result = true;
            }

        } else {

            /* Object or associative array */
            result = false;
            for (var i in arg) {
                result = true;
                break;
            }

        }
        break;

    case 'undefined':
        /* Undefined is always false */
        result = false;
        break;

    case 'function':
        /* Function is never false (though it shouldn't be true either) */
        result = true;
        break;

    default:
        throw new Error ('Invalid type ' + (typeof arg));
    }

    return result;
}

/*
 * Convert argument to number.
 *
 * @param mixed arg
 * @return number
 */
Test.toNumber = function (arg) {
    var result;

    switch (typeof arg) {
    case 'boolean':
        if (arg) {
            result = 1;
        } else {
            result = 0;
        }
        break;

    case 'number':
        /* Argument is already a number */
        result = arg;
        break;

    case 'string':
        /* Convert string to floating point number */
        switch (arg.toLowerCase ()) {
        case 'false':
            result = 0;
            break;

        case 'true':
            result = 1;
            break;

        default:
            result = parseFloat (arg);
        }
        break;

    case 'object':
        /* Count the number of elements in object */
        if (arg === null) {

            /* Null evaluates to zero */
            result = 0;

        } else if (arg instanceof Date) {

            /* Get number of milliseconds since 1 January 1970 */
            result = arg.getTime ();

        } else if (Test.isArray (arg)) {

            /* Indexed array evaluates to its length */
            result = arg.length;

        } else {

            /* Associative array evaluates to number of elements */
            result = 0;
            for (var i in arg) {
                result++;
            }

        }
        break;

    case 'undefined':
        /* Undefined is always zero */
        result = 0;
        break;

    case 'function':
        /* Function evaluates to zero (there is no reasonable conversion) */
        result = 0;
        break;

    default:
        throw new Error ('Invalid argument');
    }

    return result;
}

/*
 * Test arguments for equality.
 *
 * The function accepts two parameters of any type, and returns true if the
 * first parameter is considered equal to the second one.  Be ware that while
 * the first parameter may be equal to the second one, the opposite is not
 * always true.  For example, the value true is considered equal to 'abc'
 * whereas value 'abc' is NOT considered equal to true.  The conversions
 * rules are shown in detail in the table below.
 *
 *     a/b       | true | false | 1 | 0 | '1' | '0' | '' | null | [] | [1]
 *     ----------|------|-------|---|---|-----|-----|----|------|----|------
 *     true      | 1    | 0     | 1 | 0 | 1   | 0   | 0  | 0    | 0  | 1
 *     false     | 0    | 1     | 0 | 1 | 0   | 1   | 1  | 1    | 1  | 0
 *     1         | 0    | 0     | 1 | 0 | 1   | 0   | 0  | 0    | 0  | 0
 *     0         | 0    | 0     | 0 | 1 | 0   | 1   | 0  | 0    | 0  | 0
 *     '1'       | 0    | 0     | 1 | 0 | 1   | 0   | 0  | 0    | 0  | 0
 *     '0'       | 0    | 0     | 0 | 1 | 0   | 1   | 0  | 0    | 0  | 0
 *     ''        | 0    | 0     | 0 | 0 | 0   | 0   | 1  | 0    | 0  | 0
 *     null      | 0    | 0     | 0 | 0 | 0   | 0   | 0  | 1    | 0  | 0
 *     []        | 0    | 0     | 0 | 0 | 0   | 0   | 0  | 0    | 1  | 0
 *     [1]       | 0    | 0     | 0 | 0 | 0   | 0   | 0  | 0    | 0  | 1
 *
 * Example:
 *
 *     // Returns true
 *     ok = Test.isEqual ('abc', 'abc');
 *
 *     // Returns true while the values are not exactly equal
 *     ok = Test.isEqual (1000000.0, 1000000.0001);
 *
 *     // Returns true
 *     ok = Test.isEqual (true, 'abc');
 *
 *     // Returns false
 *     ok = Test.isEqual ('abc', true);
 *
 *     // Returns true
 *     ok = Test.isEqual ([ 1,2,3 ], [ 1,2,3 ]);
 *
 *     // Returns false
 *     ok = Test.isEqual ({ a:3 }, { a:3, b:5 });
 *
 * @param any a
 * @param any b
 * @return boolean True if a is equal to b
 */
Test.isEqual = function (a, b) {
    var ok;

    switch (typeof a) {
    case 'boolean':
        switch (typeof b) {
        case 'number':
        case 'string':
        case 'object':
        case 'undefined':
            b = Test.toBoolean (b);
            /*FALLTHROUGH*/

        case 'boolean':
            if (a == b) {
                ok = true;
            } else {
                ok = false;
            }
            break;

        case 'function':
            ok = false;
            break;

        default:
            throw new Error ("Invalid type " + (typeof b));
        }
        break;

    case 'number':
        switch (typeof b) {
        case 'number':
            if (isFinite (a)  &&  isFinite (b)) {
                /* Compare equality of two floating point numbers */
                var q = Math.max (Math.abs (a), Math.abs (b), 1);
                var eps = q * 1.0e-6;
                if (Math.abs (a - b) < eps) {
                    ok = true;
                } else {
                    ok = false;
                }
            } else {
                ok = false;
            }
            break;

        case 'string':
            if (Test.toString (a) == b) {
                ok = true;
            } else {
                ok = false;
            }
            break;

        case 'boolean':
        case 'object':
        case 'undefined':
        case 'function':
            ok = false;
            break;

        default:
            throw new Error ("Invalid type " + (typeof b));
        }
        break;

    case 'string':
        switch (typeof b) {
        case 'string':
            if (a == b) {
                ok = true;
            } else {
                ok = false;
            }
            break;

        case 'number':
            if (a == Test.toString (b)) {
                ok = true;
            } else {
                ok = false;
            }
            break;

        case 'boolean':
        case 'object':
        case 'undefined':
        case 'function':
            ok = false;
            break;

        default:
            throw new Error ("Invalid type " + (typeof b));
        }
        break;

    case 'object':
        switch (typeof b) {
        case 'object':
            if (a === null  &&  b === null) {
                ok = true;
            } else if (a === null  ||  b === null) {
                ok = false;
            } else if (a === b) {
                /* Objects a and b are the same object */
                ok = true;
            } else if (a instanceof Date  &&  b instanceof Date) {

                /* Compare two dates */
                if (a.getTime () == b.getTime ()) {
                    ok = true;
                } else {
                    ok = false;
                }

            } else if (Test.isArray (a) == Test.isArray (b)) {

                /* Compare elements of arrays in both ways */
                ok = true;
                for (var i in a) {
                    if (a.hasOwnProperty (i)) {
                        if (b.hasOwnProperty (i)) {
                            if (!Test.isEqual (a[i], b[i])) {
                                ok = false;
                                break;
                            }
                        } else {
                            ok = false;
                            break;
                        }
                    }
                }
                for (var i in b) {
                    if (b.hasOwnProperty (i)) {
                        if (a.hasOwnProperty (i)) {
                            if (!Test.isEqual (b[i], a[i])) {
                                ok = false;
                                break;
                            }
                        } else {
                            ok = false;
                            break;
                        }
                    }
                }

            } else {
                /* Indexed and associative array are not equal */
                ok = false;
            }
            break;

        case 'boolean':
        case 'number':
        case 'string':
        case 'undefined':
        case 'function':
            ok = false;
            break;

        default:
            throw new Error ("Invalid type " + (typeof b));
        }
        break;

    case 'undefined':
        if (typeof b == 'undefined') {
            ok = true;
        } else {
            ok = false;
        }
        break;

    case 'function':
        switch (typeof b) {
        case 'boolean':
        case 'number':
        case 'string':
        case 'object':
        case 'undefined':
            ok = false;
            break;

        case 'function':
            if (a == b) {
                ok = true;
            } else {
                ok = false;
            }
            break;

        default:
            throw new Error ("Invalid type " + (typeof b));
        }
        break;

    default:
        throw new Error ("Invalid type " + (typeof a));
    }
    return ok;
}

/*
 * Clear test log.
 */
Test.clear = function () {
    /* Reset static variables */
    Test._success = 0;
    Test._failed = 0;
    Test._names = {};

    /* Clear log if the debug window has been created */
    if (typeof document != 'undefined') {
        var pre = document.getElementById ('test-output');
        if (pre) {
            pre.innerText = '';
        }
    }
};

/*
 * Output message to test log.
 *
 * The function can be invoked with any number of string, number or object
 * parameters.  If multiple parameters are provided, then the function
 * separates each argument with space and outputs them to test log as single
 * string.
 *
 * Example:
 *
 *     // Output plain string
 *     Test.output ('Cannot initialize game');
 *
 *     // Concatenate string and array producing message "Error { zap: 3 }"
 *     Test.output ('Error', { zap:3 });
 *
 *     // Output string "Error 25 in file x.js"
 *     Test.output ('Error', 25, 'in file', 'x.js');
 *
 * @param mixed msg
 */
Test.output = function (/*msg, ...*/) {
    /* Format message to string */
    var msg = '';
    for (var i = 0; i < arguments.length; i++) {

        /* Separate arguments with space */
        if (msg != '') {
            msg += ' ';
        }

        /* Format as string and append the string representation to message */
        msg += Test.toString (arguments[i]);

    }

    /* Output to Firefox/Chrome/Node.js console */
    if (typeof console != 'undefined'  &&  console.log) {
        console.log (msg);
    }

    /* Output to Rhino console */
    if (typeof java != 'undefined'  &&  java.lang) {
        java.lang.System.out.println (msg);
    }

    /* Output to HTML page */
    if (typeof document != 'undefined') {
        /* Find debug window */
        var pre = document.getElementById ('test-output');

        /* Create debug window if it does not exist */
        if (!pre) {
            pre = document.createElement ('pre');
            pre.setAttribute ('id', 'test-output');
            document.body.appendChild (pre);
        }

        /* Append line to debug window */
        var text = document.createTextNode (msg + "\n");
        pre.appendChild (text);

    }
};

/*
 * Test single condition.
 *
 * The function accepts boolean true or false as an argument.  If the argument
 * is false, then the function raises an exception.
 *
 * Example:
 *
 *     // Stop execution if variable a is null
 *     Test.assert (a !== null);
 *
 * @param boolean assertion
 */
Test.assert = function (assertion) {
    if (!assertion) {
        /* Format message */
        var msg = 'Assertion failed';

        /* Increment error counter so that tests won't pass cleanly */
        Test._failed++;

        /* Stop execution of further tests */
        throw new Error (msg);
    }
}

/*
 * Returns true if test case is being run.
 *
 * This function is useful for modifying the behaviour.  For example, you
 * might want to avoid sending emails or use development servers instead of
 * live production servers when running tests.
 *
 * @return boolean
 */
Test.isTesting = function () {
    var ok;

    if (Test._testing > 0) {
        ok = true;
    } else {
        ok = false;
    }

    return ok;
}

/*
 * Execute test module.
 *
 * The function expects name of module as the first parameter and definition
 * of test as the second parameter.  Module name is a string and test
 * defition is either a function or an associative array.  The former is good
 * for simple tests while the latter allows for more complicated tests with
 * separate initialization and cleanup procedures.
 *
 * If the second argument is an associative array, then the array may contain
 * functions:
 *
 *     Function   | Purpose
 *    ------------|------------------------------------------------------------
 *     initialize | Set up test enviroment
 *     run        | Run series of tests
 *     cleanup    | Clean up test environment
 *     success    | Called after passed test
 *     failure    | Called after failed test
 *
 * Example:
 *
 *     // Simple test function with no initialization or cleanup
 *     Test.module ('isString', function () {
 *         // First test case
 *         this.test ('string-100.0', function () {
 *             return Test.isString ('');
 *         });
 *
 *         // Add another test case here
 *     });
 *
 *     // Complex test with initialization and cleanup
 *     Test.module ('user', {
 *         initialize: function () {
 *             // Retrieve user id from server (synchronously)
 *             this.id = server.createUser ('Teddy Bear');
 *         },
 *         run: function () {
 *             // First test case
 *             this.test ('user-100.0', function () {
 *                 return server.getUserName (this.id);
 *             }, 'Teddy Bear');
 *
 *             // Add another test case here
 *         },
 *         cleanup: function () {
 *             // Release user id
 *             server.removeUser (this.id);
 *         },
 *         success: function () {
 *         },
 *         failure: function () {
 *             alert ('isString failed with user id ' + this.id);
 *         },
 *     });
 *
 * @param string name
 * @param object def
 */
Test.module = function (name, def) {
    /* Format test name to string */
    var title = (name + "                                ").substr (0, 31);

    /* Run test */
    var test = null;
    try {

        /* Record start time */
        var start = (new Date ()).getTime ();

        /* Create derived class for test */
        var MyTest;
        if (typeof def == 'object') {
            MyTest = Test.extend (def);
        } else {
            MyTest = Test.extend ({
                run: def
            });
        }

        /* Create test object and initialize the test */
        test = new MyTest ();

        /* Run test suite */
        test.run ();

        /* Compute the number of milliseconds elapsed */
        var end = (new Date ()).getTime ();
        var elapsed = (end - start) / 1000;

        /* Test succeeded */
        if (elapsed < 1000) {
            Test.output (title, 'OK');
        } else {
            Test.output (title, 'OK', '(' + elapsed + ')');
        }
        test.success ();
        Test._success++;

    }
    catch (e) {

        /* Test failed */
        Test.output (title, 'FAILED');
        Test.output (e.message);
        test.failure ();
        Test._failed++;

    }

    /* Cleanup */
    if (test) {
        test.cleanup ();
    }
};

/*
 * Execute single test case.
 *
 * The function accepts test name, anonymous function and expected
 * result as arguments.  If the expected result is omitted, then the test
 * is expected to return boolean true.
 *
 * The function does not return a value.  However, if the test function
 * fails to produce the expected value, then the function throws an
 * exception.
 *
 * Example:
 *
 *     // Simple test suite
 *     Test.module ('formatDate', {
 *         run: function () {
 *
 *             // Test case 1: compare result against true
 *             this.test ('date-1.0', function () {
 *                 return MyClass.formatDate ('2015-01-01');
 *             });
 *
 *             // Test case 2: compare result against string
 *             this.test ('date-2.0', function () {
 *                 return MyClass.formatDate ('2015-03-01');
 *             }, '1.3.2015');
 *
 *         }
 *     });
 *
 * @param string name Name of test case, e.g. "sanity-101.0"
 * @param callable func Anonymous test function
 * @param mixed exp Expected result of the test function (optional)
 */
Test.prototype.test = function (name, func/*, exp*/) {
    /* Pick the expected result */
    var exp;
    if (arguments.length > 2) {
        exp = arguments[2]; 
    } else {
        exp = true;
    }

    /* Issue a warning if test name is not unique */
    if (typeof Test._names[name] != 'undefined') {
        Test.output ('Warning: duplicate test name', name);
    }
    Test._names[name] = 1;

    /* Run test function */
    Test._testing++;
    try {
        var res = func.apply (this);
    }
    catch (e) {
        /* Test function failed with an exception */
        var msg;
        if (e instanceof Error) {
            msg = "Test case " + name + " failed with the exception: "
                + e.message;
        } else {
            msg = "Test case " + name + " failed with an exception";
        }
        Test._testing--;
        throw new Error (msg);
    }
    Test._testing--;

    /* 
     * Test function did produce a value so compare the result against the
     * expected result to see if the test passed.
     */
    if (!Test.isEqual (exp, res)) {
        /* Format message */
        var msg = 
            "Test case " + name + " returned " + Test.toString (res)
            + " while " + Test.toString (exp) + " was expected";

        /* Raise exception to test the program */
        throw new Error (msg);
    }
}

/*
 * Output result of all tests.
 */
Test.complete = function () {
    if (Test._success > 0  &&  Test._failed == 0) {

        Test.output ('');
        Test.output ('All', Test._success, 'test modules passed');

    } else if ((Test._success + Test._failed) > 0) {

        Test.output ('');
        Test.output ('SOME TESTS FAILED');

    } else {

        Test.output ('No test modules were run!');

    }
};

/*
 * Run test suite.
 *
 * The function expects an indexed list of test module names as the first
 * parameter.  Each test module name should be saved as a separate js file in
 * the same directory.
 *
 * Example:
 *
 *     <body>
 *     <script src="../js/test.js"></script>
 *     <script type="text/javascript">
 *     // Run test suite compromising of isArray.js and isString.js files
 *     Test.suite ([
 *         'isArray',
 *         'isString',
 *     ]);
 *     </script>
 *
 * @param array tests
 */
Test.suite = function (tests) {
    /* Convert string to array */
    if (typeof tests == 'string') {
        tests = tests.split (/[,]\s*/);
    }

    /* Clear debug window */
    Test.clear ();

    /* Branch according to development system */
    if (typeof window !== 'undefined') {

        /* Running in browser */
        Test.output ('Running tests:');
        Test.output ('');
        for (var i in tests) {

            /* 
             * Create unique url for the test script by adding time stamp at
             * the end of the script.  This ensures that test script is
             * reloaded from server each time the test is run.
             */
            var src = tests[i] + '.js?' + (new Date ()).getTime ();

            /*
             * Append script tag to the current page so that the browser will
             * load the file and execute it once the Test.suite function
             * returns.
             */
            document.write ('<script src="' + src + '"></script>');

        }

        /* Complete tests once all javascript files have loaded */
        document.write(
            '<script type="text/javascript">'
            + 'Test.complete ();\n'
            + '</script>'
        );

    } else if (typeof load !== 'undefined') {

        /* Running under rhino (probably) */
        Test.output ('Running tests:');
        Test.output ('');
        for (var i in tests) {

            /* Create file name */
            var src = './' + tests[i] + '.js';

            /*
             * Load test module to memory and run it using eval.
             *
             * Be ware that load() cannot be used here: load() continues
             * execution despite of syntax errors and this causes the test
             * suite as a whole pass OK.  Function eval(), on the other hand,
             * causes the test suite to stop on a first syntax error.
             */
            var data = readFile (src, 'utf8');
            eval (data);

        }

        /* Finish tests */
        Test.complete ();

    } else if (typeof module !== 'undefined') {

        /* Running under node.js */
        Test.output ('Running tests:');
        Test.output ('');
        for (var i in tests) {

            /* Create file name */
            var src = './' + tests[i] + '.js';

            /*
             * Load test module to memory and run it using eval.  Eval is
             * preferred here over require so that the very same JavaScript
             * file can be run unmodified on a browser.
             */
            var data = fs.readFileSync (src, 'utf8');
            eval (data);

        }

        /* Finish tests */
        Test.complete ();

    } else {

        /* Not running under any known JavaScript system */
        throw new Error ('Cannot source test modules');

    }
};

/* 
 * Add global error handler to catch syntax errors outside test cases.
 *
 * Browsers typically output error messages in console which is hidden by
 * default.  To make matters worse, browsers don't usually stop on errors but
 * continue running from the next JavaScript file.  As such, syntax
 * errors in test modules are easily left unnoticed by the developer.
 *
 * The code below makes error messages visible on browsers and ensures that
 * syntax errors make the test suite fail as a whole.  This fix is not needed
 * for Rhino or Node.js as error messages are clearly visible in the standard
 * error stream and both Rhino and Node.js stop the execution to the first
 * syntax error.
 */
if (typeof window != 'undefined'  &&  window.addEventListener) {
    window.addEventListener ('error', function (e) {
        /* Increment error counter so that tests won't pass cleanly */
        Test._failed++;

        /* Output error message to debug log */
        Test.output (e.message, 'in file', e.filename);

        /* Let the default handler run */
        return false;
    }, false);
}

/* Export Test class for node.js */
if (typeof module !== 'undefined') {
    module.exports = Test;
}

