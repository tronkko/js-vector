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
var v = a.sub (b);
```

If you need the x, y or z coordinate components, you can
access them easily through the member variables `v.x`, `v.y` and `v.z`.  For
example, you could print a vector as
```
alert ('v=[' + v.x + ',' + v.y + ',' v.z + ']');
```
`

# Using Js-vector in Your Own Projects

To use the Vector class in your own projects, copy the file `js/vector.js`
to your project and source it from HTML as
```
<script src="js/vector.js"></script>
```

Js-vector may be freely distributed under the MIT license.


# Vector Class

## Constructing Vectors

At first, you will need to construct some vectors that you can
compute later.  A vector is constructed from 2d or 3d coordinate simply
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

    * Addition: `c = a.add (b);`
    * Substraction: `c = a.sub (b);`
    * Multiplication: `c = a.mul (f);`
    * Division: `c = a.div (f);`
    * Length: `f = a.length ();`
    * Normalization: `c = a.normalize ();`
    * Negation: `c = a.neg ();`
    * Cross product: `c = a.cross (b);`
    * Dot product: `c = a.dot (b);`

Variables `a`, `b` and `c` represent vectors while `f` represents a
floating point number.

Be ware that Js-vector will never modify source or parameter vector.  This
allows you to build complicated calculations without
creating temporary vectors just to avoid overwriting real vectors.
For example, you could compute the distance between points `p` and `q` as
```
var distance = p.sub (q).length ();
```
and avoid modifying the vector `p` by accident.

If you do wish to modify a vector, then
be sure to assign the result back to the variable or else the result
will be discarded.  For example, to update position vector `p` with the
direction vector `d`, you might write
```
p = p.add (d.mul (speed));
```
Naturally, you don't need to assign the result to a variable immediately but
you can use the result for some more computation.



## Temporary Vectors

If you need a temporary copy of the vector for the computation,
then you can duplicate vectors the `new` operation:
```
var dup = new Vector (source);
```
or clone function:
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
vector (1,0,0) explicitly in
```
v = v.add (new Vector (1, 0, 0));
```
you can do the same calculation with less code by using an array
```
v = v.add ([ 1, 0, 0 ]);
```


## Error Handling

Js-vector reports all errors by exceptions.  This allows you to
build complex formulas without needing to check for return values in every
turn.

Some notable functions which may fail with an exception include:

    * Division: `v.div (f)` will fail if `f` is zero
    * Normalization: `x.normalize()` will fail if `x` is a zero-length vector


# Alternatives to Js-vector

While Js-vector is a small and useful library, there are
also other more comprehensive and better optimized math libraries for
JavaScript.  For example, [Sylvester](http://sylvester.jcoglan.com/) and
[glMatrix](http://glmatrix.net/) both contain rich set of functions
for 2d and 3d math.



