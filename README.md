# Js-vector
Js-vector provides mathematical tools for doing 2d and 3d graphics
in JavaScript.

In essence, Js-vector allows you to do more by writing less.  For example,
Js-vector provides a handly Vector class that allows you to compute 2d and 3d
coordinates without having to compute the x, y or z components separately.
Consider, for example, a typical code substracting two vectors:
```
var vx = bx - ax;
var vy = by - ay;
var vz = bz - az;
```
With the Vector class, you can do the same as:
```
var v = Vector.sub (a, b);
```

If you need the x, y or z coordinate components, you can
access them easily through the member variables `v.x`, `v.y` and `v.z` or
using the array syntax.  For example, you could print the components of
vector `v` using member variables as
```
alert ('v=[' + v.x + ',' + v.y + ',' v.z + ']');
```
or using the array syntax
```
alert ('v=[' + v[0] + ',' + v[1] + ',' v[2] + ']');
```


# Vector Class

## Constructing Vectors

A vector is constructed from 2d or 3d coordinate simply
by providing the x, y and z components as parameters to the constructor.
For example, construct 2d vector (1,2) as
```
var v = new Vector (1, 2);
```
A 3d vector (100,5,4) would be constructed likewise:
```
var v = new Vector (100, 5, 4);
```


## Computing with Vectors

Once you have constructed one or more vector objects, you can use the
following mathematical operations to compute them:

  * Addition: `c = Vector.add (a, b);`
  * Substraction: `c = Vector.sub (a, b);`
  * Multiplication: `c = Vector.mul (a, f);`
  * Division: `c = Vector.div (a, f);`
  * Length: `f = Vector.length (a);`
  * Normalization: `c = Vector.normalize (a);`
  * Negation: `c = Vector.neg (a);`
  * Cross product: `c = Vector.cross (a, b);`
  * Dot product: `c = Vector.dot (a, b);`

where variables `a`, `b` and `c` represent vectors while `f` represents a
floating point number.

The above operations will never modify a parameter vector.  This allows
you to build complicated calculations without creating temporary vectors
explicitly.  For example, you can compute the distance between
points `p` and `q` simply as
```
var distance = Vector.length (Vector.sub (p, q));
```
without modifying the vector `p` by accident.

If you do wish to modify a vector, then assign the result to a variable
or use object versions of the above operations.  For example, to update
position vector `p` with the direction vector `d`, you might assign the
result back to vector `p` as
```
p = Vector.add (p, Vector.mul (d, speed));
```
or modify the vector `p` directly as
```
p.add (Vector.mul (d, speed));
```
Naturally, you don't need to assign the result to a variable immediately but
you can chain mathematical operations.



## Temporary Vectors

If you need a temporary copy of the vector for the computation,
then you can duplicate vectors the `new` operation:
```
var dup = new Vector (source);
```
or clone function
```
var dup = source.clone ();
```

Also note that Js-vector allows you to express coordinate components as
indexed and associative arrays.  For example, a vector (1,2,3) can be
constructed also as
```
var v = new Vector ([ 1, 2, 3 ]);
```
or
```
var v = new Vector ({ x:1, y:2, z:3 });
```

The array representation is especially useful in computation as it allows
you to create temporary vectors easily.  For example, instead of creating
vector (1,0,0) explicitly as in
```
v.add (new Vector (1, 0, 0));
```
you simply use an array
```
v.add ([ 1, 0, 0 ]);
```


## Error Handling

Js-vector reports all errors by exceptions.  This allows you to
build complex formulas without needing to check for return values in every
turn.

Some notable functions which may fail with an exception include:

  * Division: `div (f)` will fail if `f` is zero
  * Normalization: `normalize (x)` will fail if `x` is a zero-length vector


# Using Js-vector in Your Own Projects

To use the Vector class in your own projects, copy the file `js/vector.js`
to your project and source it from HTML as
```
<script src="js/vector.js"></script>
```

Js-vector may be freely distributed under the MIT license.


# Alternatives to Js-vector

While Js-vector is a small and useful library, there are
other more comprehensive and better optimized math libraries for
JavaScript.  For example, [Sylvester](http://sylvester.jcoglan.com/) and
[glMatrix](http://glmatrix.net/) both contain rich set of functions
for 2d and 3d math.



