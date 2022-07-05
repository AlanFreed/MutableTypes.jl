# MutableTypes.jl

This package provides mutable boolean, integer, rational, real and complex types. Their arithmetic operators are overloaded. The package also exports wrappers for the more common math functions.

The intended use of these mutable types is to serve as fields within immutable data structures that contain a field or fields that need the capability to have their values changed during runtime. For example, a data structure that holds material properties may include a boolean field 'ruptured' that would get turned on \(converted from false to true\) after a rupture event has occurred, thereafter enabling a change in material properties to take place moving forward.

All operators and functions supply instances of the core types, viz., `Bool`, `Integer`, `Rational`, `Real` and `Complex`, as appropriate. They do not supply instances of their mutable versions. This is in accordance with the intended use of these mutable types, i.e., they are to serve as mutable fields within an otherwise immutable data structure.

## Types

MutableTypes.jl exports two abstract types, and five implementations of them.

### Abstract Types

`MType` is the core type for mutable types. It is a subtype of base type `Number`, and is defined by

```
abstract type MType <: Number end
```

Additionally, `MNumber` is a subtype of core type `MType`, and is defined by

```
abstract type MNumber <: MType end
```

### Concrete Types

Mutable booleans are instances of `MType`, whose single field `n` is of type `Bool`; specifically,

```
mutable struct MBool <: MType
    n::Bool
end
```

Recall that `Bool <: Integer <: Real <: Number`.

Mutable integers are instances of `MNumber`, whose single field `n` is of type `Int64`; specifically,

```
mutable struct MInteger <: MNumber
    n::Int64
end
```

Recall that `Int64 <: Signed <: Integer <: Real <: Number`.

Mutable rationals are instances of `MNumber`, whose single field `n` is of type `Rational{Int64}`; specifically,

```
mutable struct MRational <: MNumber
    n::Rational{Int64}
end
```

Recall that `Rational <: Real <: Number`.

Mutable reals are instances of `MNumber`, whose single field `n` is of type `Float64`; specifically,

```
mutable struct MReal <: MNumber
    n::Float64
end
```

Recall that `Float64 <: AbstractFloat <: Real <: Number`.

Mutable complex are instances of `MType`, whose single field `n` is of type `Complex{Float64}`; specifically,

```
mutable struct MComplex <: MType
    n::Complex{Float64}
end
```

Recall that `Complex <: Number`.

Constructors for these mutable types have the appearance of being type castings. For example, 

```
truth = MBool(true)
five = MInteger(5)
threeHalves = MRational(3//2)
pi = MReal(3.14159)
i = MComplex(0+1im)
```

## Methods

### get()

Method `get` extends method `Base.get`. Calls to `MutableTypes.get` return the value held by field `n` for instances of the above mutable types; specifically,

```
function Base.:(get)(y::MBool)::Bool
function Base.:(get)(y::MInteger)::Integer
function Base.:(get)(y::MRational)::Rational
function Base.:(get)(y::MReal)::Real
function Base.:(get)(y::MComplex)::Complex
```

### set!()

Method `set!` assigns the supplied value `x` to field `n` held by the mutable type. \(*Note:* there is no method `Base.set!` to inherit that pairs with method `Base.get`.\) Their interfaces are

```
function set!(y::MBool, x::Bool)
function set!(y::MInteger, x::Integer)
function set!(y::MRational, x::Rational)
function set!(y::MReal, x::Real)
function set!(y::MComplex, x::Complex)
```

### toString()

Method `toString` converts numbers into their string representation. For uniformity of structure, these methods are also provided for the core types via

```
function toString(y::Bool; aligned::Bool=false)::String
function toString(y::Integer; aligned::Bool=false)::String
function toString(y::Rational; aligned::Bool=false)::String
function toString(y::Real; format::Char='E', precision::Int=5, aligned::Bool=false)::String
function toString(y::Complex; format::Char='E', precision::Int=5,  aligned::Bool=false)::String
```

with the mutable types having like interfaces of

```
function toString(y::MBool; aligned::Bool=false)::String
function toString(y::MInteger; aligned::Bool=false)::String
function toString(y::MRational; aligned::Bool=false)::String
function toString(y::MReal; format::Char='E', precision::Int=5, aligned::Bool=false)::String
function toString(y::MComplex; format::Char='E', precision::Int=5, aligned::Bool=false)::String
```

These methods have keywords with default values, which include:

  * Keyword `aligned`, if set to `true` \(the default is `false`\), will right-align strings. This is useful when, e.g., printing arrays or matrices of values. For instances of `Bool` and `MBool`, a whitespace will preceed "true" strings so that they will read "  true", and will therefore right align with instances of "false". For all numeric types, a whitespace will preceed all non-negative values so that they read "  <value>", and will therefore right align with negative numbers.

  * Keyword `format` applies to floating-point numbers, i.e., instances of `Real`, `Complex`, `MReal` and `MComplex`. It differentiates exponential \(i.e., scientific\) notation from fixed-point notation in their string representations. The default is an exponential notation with a capital 'E' in the string. A lower-case 'e' will be used whenever `format='e'`. All other `Char` values will result in a fixed-point representation of the number.

  * Keyword `precision` specifies the number of significant figures that are to be retained in the string representation of a floating-point number. The default is 5, but any integer value within the interval \[3,…,7\] is admissible.

### copy()

Method `copy` extends method `Base.copy`. Calls to `MutableTypes.copy` return a shallow copy of the supplied argument; specifically,

```
function Base.:(copy)(y::MBool)::MBool
function Base.:(copy)(y::MInteger)::MInteger
function Base.:(copy)(y::MRational)::MRational
function Base.:(copy)(y::MReal)::MReal
function Base.:(copy)(y::MComplex)::MComplex
```

### deepcopy()

Method `deepcopy` extends method `Base.deepcopy`. Calls to `MutableTypes.deepcopy` return a deep copy of the supplied argument; specifically,

```
function Base.:(deepcopy)(y::MBool)::MBool
function Base.:(deepcopy)(y::MInteger)::MInteger
function Base.:(deepcopy)(y::MRational)::MRational
function Base.:(deepcopy)(y::MReal)::MReal
function Base.:(deepcopy)(y::MComplex)::MComplex
```

## Unary Operators

These operators extend their equivalent unary operators exported by module `Base`.

### !

Unary operator `!` negates the MBool value to the right of the operator. This operator is overloaded to handle

```
function Base.:!(y::MBool)::Bool
```

### +

Unariy operator `+` retains the value to the mutable type to the right of the operator. This operator is overloaded to handle

```
function Base.:+(y::MInteger)::Integer
function Base.:+(y::MRational)::Rational
function Base.:+(y::MReal)::Real
function Base.:+(y::MComplex)::Complex
```

### -

Unary operator `-` negates the value of the mutable type to the right of the operator. This operator is overloaded to handle

```
function Base.:-(y::MInteger)::Integer
function Base.:-(y::MRational)::Rational
function Base.:-(y::MReal)::Real
function Base.:-(y::MComplex)::Complex
```

## Binary Operators

These operators extend their equivalent binary operators exported by module `Base`.

### ==

Binary operator `==` tests to determine if the argument to the left equals the argument to the right. This operator is overloaded to handle comparisons of

```
function Base.:(==)(y::MType, z::MType)::Bool
function Base.:(==)(y::Union{Bool,Real,Complex}, z::MType)::Bool
function Base.:(==)(y::MType, z::Union{Bool,Real,Complex})::Bool
```

### ≠

Binary operator `≠` tests to determine if the argument to the left does not equal the argument to the right. This operator is overloaded to handle comparisons of

```
function Base.:≠(y::MType, z::MType)::Bool
function Base.:≠(y::Union{Bool,Real,Complex}, z::MType)::Bool
function Base.:≠(y::MType, z::Union{Bool,Real,Complex})::Bool
```

### ≈

Binary operator `≈` tests to determine if the argument to the left is approximately equal to the argument to the right. This operator applies to floating-points objects and tests for equality of at least 32-bit precision between two 64-bit numbers. This operator is overloaded to handle comparisons of

```
function Base.:≈(y::MReal, z::MReal)::Bool
function Base.:≈(y::Real, z::MReal)::Bool
function Base.:≈(y::MReal, z::Real)::Bool
function Base.:≈(y::MComplex, z::MComplex)::Bool
function Base.:≈(y::Complex, z::MComplex)::Bool
function Base.:≈(y::MComplex, z::Complex)::Bool
```

Recall that `Int64`, `Rational{Int64}` and `Float64` are all instances of type `Real`.

### <

Binary operator `<` tests to determine if the left argument is less than the right argument. This operator is overloaded to handle comparisons of

```
function Base.:<(y::MNumber, z::MNumber)::Bool
function Base.:<(y::Real, z::MNumber)::Bool
function Base.:<(y::MNumber, z::Real)::Bool
```

### ≤

Binary operator `≤` tests to determine if the left argument is less than or equal to the right argument. This operator is overloaded to handle comparisons of

```
function Base.:≤(y::MNumber, z::MNumber)::Bool
function Base.:≤(y::Real, z::MNumber)::Bool
function Base.:≤(y::MNumber, z::Real)::Bool
```

### ≥

Binary operator `≥` tests to determine if the left argument is greater than or equal to the right argument. This operator is overloaded to handle comparisons of

```
function Base.:≥(y::MNumber, z::MNumber)::Bool
function Base.:≥(y::Real, z::MNumber)::Bool
function Base.:≥(y::MNumber, z::Real)::Bool
```

### >

Binary operator `>` tests to determine if the left argument is greater than the right argument. This operator is overloaded to handle comparisons of

```
function Base.:>(y::MNumber, z::MNumber)::Bool
function Base.:>(y::Real, z::MNumber)::Bool
function Base.:>(y::MNumber, z::Real)::Bool
```

### +

Binary operator `+` adds the value held by the right argument to the value held by the left argument. This operator is overloaded to handle cases of

```
function Base.:+(y::MInteger, z::MInteger)::Integer
function Base.:+(y::MInteger, z::Integer)::Integer
function Base.:+(y::Integer, z::MInteger)::Integer
function Base.:+(y::MRational, z::MRational)::Rational
function Base.:+(y::Union{Integer, Rational}, z::MRational)::Rational
function Base.:+(y::MRational, z::Union{Integer, Rational})::Rational
function Base.:+(y::MRational, z::MInteger)::Rational
function Base.:+(y::MInteger, z::MRational)::Rational
function Base.:+(y::MReal, z::MReal)::Real
function Base.:+(y::MReal, z::Union{MInteger,MRational})::Real
function Base.:+(y::Union{MInteger,MRational}, z::MReal)::Real
function Base.:+(y::MReal, z::Real)::Real
function Base.:+(y::Real, z::MReal)::Real
function Base.:+(y::MComplex, z::MComplex)::Complex
function Base.:+(y::MComplex, z::Complex)::Complex
function Base.:+(y::Complex, z::MComplex)::Complex
function Base.:+(y::MComplex, z::MNumber)::Complex
function Base.:+(y::MNumber, z::MComplex)::Complex
function Base.:+(y::MComplex, z::Real)::Complex
function Base.:+(y::Real, z::MComplex)::Complex
```

### -

Binary operator `-` subtracts the value held by the right argument from the value held by the left argument. This operator is overloaded to handle cases of

```
function Base.:-(y::MInteger, z::MInteger)::Integer
function Base.:-(y::MInteger, z::Integer)::Integer
function Base.:-(y::Integer, z::MInteger)::Integer
function Base.:-(y::MRational, z::MRational)::Rational
function Base.:-(y::Union{Integer, Rational}, z::MRational)::Rational
function Base.:-(y::MRational, z::Union{Integer, Rational})::Rational
function Base.:-(y::MRational, z::MInteger)::Rational
function Base.:-(y::MInteger, z::MRational)::Rational
function Base.:-(y::MReal, z::MReal)::Real
function Base.:-(y::MReal, z::Real)::Real
function Base.:-(y::Real, z::MReal)::Real
function Base.:-(y::MReal, z::Union{MInteger,MRational})::Real
function Base.:-(y::Union{MInteger,MRational}, z::MReal)::Real
function Base.:-(y::MComplex, z::MComplex)::Complex
function Base.:-(y::MComplex, z::Complex)::Complex
function Base.:-(y::Complex, z::MComplex)::Complex
function Base.:-(y::MComplex, z::MNumber)::Complex
function Base.:-(y::MNumber, z::MComplex)::Complex
function Base.:-(y::MComplex, z::Real)::Complex
function Base.:-(y::Real, z::MComplex)::Complex
```

### *

Binary operator `*` multiplies the value held by the left argument with the value held by the right argument. This operator is overloaded to handle cases of

```
function Base.:*(y::MInteger, z::MInteger)::Integer
function Base.:*(y::MInteger, z::Integer)::Integer
function Base.:*(y::Integer, z::MInteger)::Integer
function Base.:*(y::MRational, z::MRational)::Rational
function Base.:*(y::Union{Integer, Rational}, z::MRational)::Rational
function Base.:*(y::MRational, z::Union{Integer, Rational})::Rational
function Base.:*(y::MRational, z::MInteger)::Rational
function Base.:*(y::MInteger, z::MRational)::Rational
function Base.:*(y::MReal, z::MReal)::Real
function Base.:*(y::MReal, z::Real)::Real
function Base.:*(y::Real, z::MReal)::Real
function Base.:*(y::MReal, z::Union{MInteger,MRational})::Real
function Base.:*(y::Union{MInteger,MRational}, z::MReal)::Real
function Base.:*(y::MComplex, z::MComplex)::Complex
function Base.:*(y::MComplex, z::Complex)::Complex
function Base.:*(y::Complex, z::MComplex)::Complex
function Base.:*(y::MComplex, z::MNumber)::Complex
function Base.:*(y::MNumber, z::MComplex)::Complex
function Base.:*(y::MComplex, z::Real)::Complex
function Base.:*(y::Real, z::MComplex)::Complex
```

### ÷

Binary operator `÷` provides integer division where the left integer is divided by the right integer. This operator is overloaded to handle cases of

```
function Base.:÷(y::MInteger, z::MInteger)::Integer
function Base.:÷(y::MInteger, z::Integer)::Integer
function Base.:÷(y::Integer, z::MInteger)::Integer
```

### %

Binary operator `%` returns the remainder \(or modulus\) associated with an integer division. This operator is overloaded to handle the cases of

```
function Base.:%(y::MInteger, z::MInteger)::Integer
function Base.:%(y::MInteger, z::Integer)::Integer
function Base.:%(y::Integer, z::MInteger)::Integer

```

### //

Binary operator `//` provides rational division where the left argument is divided by the right argument. This operator is overloaded to handle the cases of

```
function Base.:(//)(y::MInteger, z::MInteger)::Rational
function Base.:(//)(y::MInteger, z::Union{Integer, Rational})::Rational
function Base.:(//)(y::Union{Integer, Rational}, z::MInteger)::Rational
function Base.:(//)(y::MRational, z::MRational)::Rational
function Base.:(//)(y::Rational, z::Union{MInteger, MRational})::Rational
function Base.:(//)(y::Union{MInteger, MRational}, z::Rational)::Rational
function Base.:(//)(y::MRational, z::Integer)::Rational
function Base.:(//)(y::Integer, z::MRational)::Rational
```

### /

Binary operator `/` provides real and complex division where the left argument is divided by the right argument. This operator is overloaded to handle the cases of

```
function Base.:/(y::MReal, z::MReal)::Real
function Base.:/(y::MReal, z::Real)::Real
function Base.:/(y::Real, z::MReal)::Real
function Base.:/(y::MReal, z::Union{MInteger,MRational})::Real
function Base.:/(y::Union{MInteger,MRational}, z::MReal)::Real
function Base.:/(y::MComplex, z::MComplex)::Complex
function Base.:/(y::MComplex, z::Complex)::Complex
function Base.:/(y::Complex, z::MComplex)::Complex
function Base.:/(y::MComplex, z::MNumber)::Complex
function Base.:/(y::MNumber, z::MComplex)::Complex
function Base.:/(y::MComplex, z::Real)::Complex
function Base.:/(y::Real, z::MComplex)::Complex
```

### ^

Binary operator `^` raises the left argument to the power of the right argument. This operator is overloaded to handle the cases of

```
function Base.:^(y::MInteger, z::MInteger)::Integer
function Base.:^(y::MInteger, z::Integer)::Integer
function Base.:^(y::Integer, z::MInteger)::Integer
function Base.:^(y::MReal, z::MReal)::Real
function Base.:^(y::MReal, z::Real)::Real
function Base.:^(y::Real, z::MReal)::Real
function Base.:^(y::MReal, z::Union{MInteger,MRational})::Real
function Base.:^(y::Union{MInteger,MRational}, z::MReal)::Real
function Base.:^(y::MComplex, z::MComplex)::Complex
function Base.:^(y::MComplex, z::Complex)::Complex
function Base.:^(y::Complex, z::MComplex)::Complex
function Base.:^(y::MComplex, z::MNumber)::Complex
function Base.:^(y::MNumber, z::MComplex)::Complex
function Base.:^(y::MComplex, z::Real)::Complex
function Base.:^(y::Real, z::MComplex)::Complex
```

## Functions: all numeric types.

### abs

Function `abs()` extends function `Base.abs()`. It returns the absolute value of its argument.

```
function Base.:(abs)(y::MInteger)::Integer
function Base.:(abs)(y::MRational)::Rational
function Base.:(abs)(y::MReal)::Real
function Base.:(abs)(y::MComplex)::Complex
```

## Functions: all non-complex numeric types.

### sign

Function `sign()` extends function `Base.sign()`. It returns the sign of its argument.

```
function Base.:(sign)(y::MNumber)::Real
```

## Functions: rational numbers.

These functions extend their `Base` equivalents.

### Function `numerator()` returns the numerator of a rational number.

```
function Base.:(numerator)(y::MRational)::Integer
```

### Function `denominator()` returns the denominator of a rational number.

```
function Base.:(denominator)(y::MRational)::Integer
```

## Functions: real numbers.

These functions extend their `Base` equivalents.

### round

Function `round()` rounds the real value to its nearest integer value.

```
function Base.:(round)(y::MReal)::Real
```

### ceil

Function `ceil()` returns the ceiling of the supplied real, i.e., the nearest integer greater than or equal to its value.

```
function Base.:(ceil)(y::MReal)::Real
```

### floor

Function `floor()` returns the floor of the supplied real, i.e., the nearest integer less than or equal to its value.

```
function Base.:(floor)(y::MReal)::Real
```

### cbrt or ∛

Function `cbrt()`, or equivalently `∛()`, returns the cube root of the supplied real.

```
function Base.Math.:(cbrt)(y::MNumber)::Real
function Base.Math.:∛(y::MNumber)::Real
```

### atan

Function `atan(y,x)` returns the inverse tangent of `y/x` where `y` is the rise and `x` is the run. In many languages this is denoted as `atan2`. The following additional cases are handled:

```
function Base.:(atan)(y::MNumber, x::MNumber)::Real
function Base.:(atan)(y::MNumber, x::Real)::Real
function Base.:(atan)(y::Real, x::MNumber)::Real
```

## Functions: complex numbers.

These functions extend their `Base` equivalents.

### abs2

Function `abs2()` returns the squared absolute value of its argument.

```
function Base.:(abs2)(y::MComplex)::Real
```

### real

Function `real()` returns the real part of its complex argument.

```
function Base.:(real)(y::MComplex)::Real
```

### imag

Function `imag()` returns the imaginary part of its complex argument.

```
function Base.:(imag)(y::MComplex)::Real
```

### conj

Function `conj()` returns the complex conjugate of its complex argument.

```
function Base.:(conj)(y::MComplex)::Complex
```

### angle

Function `angle()` returns the angle in radians of the complex argument.

```
function Base.:(angle)(y::MComplex)::Real
```

## Functions: math

These functions extend their `Base` equivalents.

Function `sqrt()`, or equivalently `√()`, returns the square root of the argument.

```
function Base.:(sqrt)(y::MNumber)::Real
function Base.:(sqrt)(y::MComplex)::Complex
function Base.:√(y::MNumber)::Real
function Base.:√(y::MComplex)::Complex
```

Function `sin()` returns the sine of the argument, which is in radians.

```
function Base.:(sin)(y::MNumber)::Real
function Base.:(sin)(y::MComplex)::Complex
```

Function `cos()` returns the cosine of the argument, which is in radians.

```
function Base.:(cos)(y::MNumber)::Real
function Base.:(cos)(y::MComplex)::Complex
```

Function `tan()` returns the tangent of the argument, which is in radians.

```
function Base.:(tan)(y::MNumber)::Real
function Base.:(tan)(y::MComplex)::Complex
```

Function `sinh()` returns the hyperbolic sine of the argument.

```
function Base.:(sinh)(y::MNumber)::Real
function Base.:(sinh)(y::MComplex)::Complex
```

Function `cosh()` returns the hyperbolic cosine of the argument.

```
function Base.:(cosh)(y::MNumber)::Real
function Base.:(cosh)(y::MComplex)::Complex
```

Function `tanh()` returns the hyperbolic tangent of the argument.

```
function Base.:(tanh)(y::MNumber)::Real
function Base.:(tanh)(y::MComplex)::Complex
```

Function `asin()` returns the inverse of the sine of the argument.

```
function Base.:(asin)(y::MNumber)::Real
function Base.:(asin)(y::MComplex)::Complex
```

Function `acos()` returns the inverse of the cosine of the argument.

```
function Base.:(acos)(y::MNumber)::Real
function Base.:(acos)(y::MComplex)::Complex
```

Function `atan()` returns the inverse of the tangent of the argument.

```
function Base.:(atan)(y::MNumber)::Real
function Base.:(atan)(y::MComplex)::Complex
```

Function `asinh()` returns the inverse of the hyperbolic sine of the argument.

```
function Base.:(asinh)(y::MNumber)::Real
function Base.:(asinh)(y::MComplex)::Complex
```

Function `acosh()` returns the inverse of the hyperbolic cosine of the argument.

```
function Base.:(acosh)(y::MNumber)::Real
function Base.:(acosh)(y::MComplex)::Complex
```

Function `atanh()` returns the inverse of the hyperbolic tangent of the argument.

```
function Base.:(atanh)(y::MNumber)::Real
function Base.:(atanh)(y::MComplex)::Complex
```

Function `log()` returns the natural logarithm of the argument.

```
function Base.:(log)(y::MNumber)::Real
function Base.:(log)(y::MComplex)::Complex
```

Function `log2()` returns the logarithm of the argument in base 2.

```
function Base.:(log2)(y::MNumber)::Real
function Base.:(log2)(y::MComplex)::Complex
```

Function `log10()` returns the logarithm of the argument in base 10.

```
function Base.:(log10)(y::MNumber)::Real
function Base.:(log10)(y::MComplex)::Complex
```

Function `exp()` returns the exponential of the argument, which is the inverse function to `log()`.

```
function Base.:(exp)(y::MNumber)::Real
function Base.:(exp)(y::MComplex)::Complex
```

Function `exp2()` returns the exponential of the argument in base 2, which is the inverse function to `log2()`.

```
function Base.:(exp2)(y::MNumber)::Real
function Base.:(exp2)(y::MComplex)::Complex
```

Function `exp10()` returns the exponential of the argument in base 10, which is the inverse function to `log10()`.

```
function Base.:(exp10)(y::MNumber)::Real
function Base.:(exp10)(y::MComplex)::Complex
```