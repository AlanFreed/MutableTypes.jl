# MutableTypes

This package provides mutable boolean, integer, rational, real and complex types. Their arithmetic operators are overloaded. The package also exports wrappers for the common math functions.

The intent of these mutable types is for their use in immutable data structures that contain a field or fields that need the capability to have their values changed during runtime. For example, a data structure that holds material properties may include a boolean field 'ruptured' that would get turned on (converted from `false` to `true`) after a rupture event has occurred, thereafter enabling a change in material properties to take place moving forward.

To use this module you will need to add it to your package:

```
using Pkg
Pkg.add(url = "https://github.com/AlanFreed/MutableTypes.jl")
```

## Abstract Types

Mutable types are based upon two abstract types.

The first abstract type is the super (or parent) type for all mutable types, viz.,

```
abstract type MType <: Number end
```

while the second abstract type is a sub-type of `MType`. It includes numeric types that can be sorted, e.g., smallest to largest, i.e.,

```
abstract type MNumber <: MType end
```

## Concrete Types

Mutable boolean values belong to the type:

```
mutable struct MBool <: MType
    n::Bool  # Bool <: Integer <: Real <: Number
end
```

Mutable integer numbers belong to the type:

```
mutable struct MInteger <: MNumber
    n::Int64  # Int64 <: Signed <: Integer <: Real <: Number
end
```

Mutable rational numbers belong to the type:

```
mutable struct MRational <: MNumber
    n::Rational{Int64}  # Rational <: Real <: Number
end
```
There is also a helper type `LowerRational` that is used to assist in the reading and writing of `Rational` and `MRational` objects from and to JSON files. This type is intended for internal use only.

Mutable real numbers belong to the type:

```
mutable struct MReal <: MNumber
    n::Float64  # Float64 <: AbstractFloat <: Real <: Number
end
```

Mutable complex numbers belong to the type:

```
mutable struct MComplex <: MType
    n::Complex{Float64}  # Complex <: Number
end
```
There is also a helper type `LowerComplex` that is used to assist in the reading and writing of `Complex` and `MComplex` objects from and to JSON files. This type is intended for internal use only.

### Constructors

All mutable types have multiple inner constructors. No external constructors are provided.

There are constructors without arguments, e.g.,
```
	b = MBool()        # b = false
	i = MInteger()     # i = 0
	r = MRational()    # r = 0//1
	x = MReal()        # x = 0.0
	z = MComplex()     # z = 0.0 + 0.0im
```
which assign values of zero in their respective types, with an `MBool` being assigning a value of `false`.

There are also constructors with a single argument, e.g., 
```
	b = MBool(y::Bool)
	i = MInteger(y::Integer)
	r = MRational(y::Rational)
	x = MReal(y::Real)
	z = MComplex(y::Complex)
```
which take on the appearance of a type casting.

Finally, types `MRational` and `MComplex` also have constructors that accept two arguments, viz.,
```
   r = MRational(num::Integer, den::Integer)
   z = MComplex(real_part::Real, imag_part::Real)
```
where `num` and `den` are the numerator and denominator of a rational number, while `real_part` and `imag_part` are the real and imaginary parts of a complex number.

There are also constructors for types `LowerRational` and `LowerComplex`, but they are for internal use only. They are needed to read and write objects of types `Rational`, `MRational`, `Complex` and `MComplex` from and to JSON files.

#### Type Casting

Julia's built-in types can be gotten from their mutable counterparts via the following type castings:
```
function Bool(y::MBool)::Bool
function Int64(y::MInteger)::Int64
function Rational(y::MRational)::Rational{Int64}
function Float64(y::MReal)::Float64
function Complex(y::MComplex)::Complex{Float64}
```

### Readers and Writers

There are methods that read and write the above mutable objects from and to a file to make these data persistent. JSON (JavaScript Object Notation) files are used for this purpose. JSON files store data in key-value pairs, and are therefore an ideal format for storing julia `struct` types to file. JSON files are lightweight, text-based, human-readable, and can even be edited using a standard text editor.

To open an existing JSON file for reading, one can call
```
function openJSONReader(my_dir_path::String, my_file_name::String)::IOStream
```
e.g., `json_stream = openJSONReader("home/my_dir", "my_file.json").` This reader attaches to a file located in directory `my_dir_path` whose name is `my_file_name` ending with a `.json` extension. The file is opened in read-only mode. This reader points to the beginning of the file at its creation.

To create a new, or open an existing JSON file for writing, one can call
```
function openJSONWriter(my_dir_path::String, my_file_name::String)::IOStream
```
e.g., `json_stream = openJSONWriter("home/my_dir", "my_file.json").` This writer attaches to a file located in directory `my_dir_path` whose name is `my_file_name` ending with a `.json` extension. The file is opened in write-create-append mode. This writer points to the beginning of the file, whether it already exists or is to be newly created.

To close the file to which a JSON stream is attached, simply call
```
function closeJSONStream(json_stream::IOStream)
```

Methods have been created for reading and writing that take advantage of the multiple dispatch capability of the Julia compiler. The chosen protocal requires that one knows the type belonging to an object to be read in before it can actually be read in. As implemented, the JSON stream does not store type information.

#### fromFile

To read from a JSON file the mutable types of this module, and their Julia built-in counterparts, one can call the method
```
function fromFile(type::Type, json_stream::IOStream)::Union{String, Number}
```
where admissible types `type` for reading from a JSON file include: `String,` `Bool,` `MBool,` `Integer,` `MInteger,` `Rational,` `MRational,` `Real,` `MReal,` `Complex` and `MComplex.` All integer values are read in as `Int64` objects, and all real values are read in as `Float64` objects.
Argument `json_stream` comes from a call to `openJSONReader.`

These methods require the type to be read in to be a known entity, fore which a call to this method returns an object of the specified type.

#### toFile

To write the Julia built-in types to a JSON file, one can call the method
```
function toFile(y::Bool, json_stream::IOStream)
function toFile(y::Integer, json_stream::IOStream)
function toFile(y::Rational, json_stream::IOBuffer)
function toFile(y::Real, json_stream::IOBuffer)
function toFile(y::Complex, json_stream::IOBuffer)
```
where all integer values are stored as `Int64` objects, and all real values are stored as `Float64` objects.

Likewise, to write the mutable versions of these built-in types to a JSON file, one can call
```
function toFile(y:MBool, json_stream::IOStream)
function toFile(y::MInteger, json_stream::IOStream)
function toFile(y::MRational, json_stream::IOBuffer)
function toFile(y::MReal, json_stream::IOBuffer)
function toFile(y::MComplex, json_stream::IOBuffer)
```
Argument `json_stream` comes from a call to `openJSONWriter.`

#### toString

There is also a method that converts the basic built-in types of the Julia language and their mutable versions into human readable strings for printing. No parsing method is provided for the reverse process; this is the purview of `fromFile.` For the case of real and complex numbers, the actual values are truncated in their string representations. This is consistent with the intent of method `toString` being for human consumption.

Methods that convert the standard core objects into human readable strings include:

```
function toString(y::Bool; aligned::Bool=false)::String
function toString(y::Integer; aligned::Bool=false)::String
function toString(y::Rational; aligned::Bool=false)::String
function toString(y::Real;
                  format::Char='E',
                  precision::Int=5,
                  aligned::Bool=false)::String
function toString(y::Complex;
                  format::Char='E',
                  precision::Int=5,
                  aligned::Bool=false)::String
```
 
Methods that convert mutable objects into human readable strings include:

```
function toString(y::MBool; aligned::Bool=false)::String
function toString(y::MInteger; aligned::Bool=false)::String
function toString(y::MRational; aligned::Bool=false)::String
function toString(y::MReal;
                  format::Char='E',
                  precision::Int=5,
                  aligned::Bool=false)::String
function toString(y::MComplex;
                  format::Char='E',
                  precision::Int=5,
                  aligned::Bool=false)::String
```

For the various `toString` interfaces listed above, their keywords are given default values that can be overwritten. Specifically, 

* `format`: An exponential or scientific output will be written whenever `format` is set to `e` or `E`; otherwise, the output will be written in a fixed-point notation.
* `precision`: The number of significant figures to be used in a numeric representation, precision ∈ {3, …, 7}.
* `aligned`: If `true`, a white space will appear before `true` when converting a `MBool` to string, or a white space will appear before the first digit in a number whenever its value is non-negative. Aligning is useful, e.g., when stacking outputs, like when printing out a matrix as a string.

## Methods

### get

Methods that retrieve the fundamental value held by field `n` belonging to a mutable object `y` include: 

```
function Base.:(get)(y::MBool)::Bool
function Base.:(get)(y::MInteger)::Integer
function Base.:(get)(y::MRational)::Rational
function Base.:(get)(y::MReal)::Real
function Base.:(get)(y::MComplex)::Complex
```

### set!

Methods that assign a fundamental value `x` to field `n` belonging to a mutable object `y` include:

```
function set!(y::MBool, x::Bool)
function set!(y::MInteger, x::Integer)
function set!(y::MRational, x::Rational)
function set!(y::MReal, x::Real)
function set!(y::MComplex, x::Complex)
```

### copy

Methods that make shallow copies of mutable types include:

```
function Base.:(copy)(y::MBool)::MBool
function Base.:(copy)(y::MInteger)::MInteger
function Base.:(copy)(y::MRational)::MRational
function Base.:(copy)(y::MReal)::MReal
function Base.:(copy)(y::MComplex)::MComplex
```

### deepcopy

Methods that make deep copies of mutable types include:

```
function Base.:(deepcopy)(y::MBool)::MBool
function Base.:(deepcopy)(y::MInteger)::MInteger
function Base.:(deepcopy)(y::MRational)::MRational
function Base.:(deepcopy)(y::MReal)::MReal
function Base.:(deepcopy)(y::MComplex)::MComplex
```

## Overloaded Operators

  * `MBool:`		==, ≠, \!

  * `MInteger:`		==, ≠, \<, ≤, ≥, \>, \+, \-, \*, ÷, %, ^

  * `MRational:`	==, ≠, \<, ≤, ≥, \>, \+, \-, \*, //, /, ^

  * `MReal:`		==, ≠, ≈, \<, ≤, ≥, \>, \+, \-, \*, /, ^

  * `MComplex:`		==, ≠, ≈, \+, \-, \*, /, ^

## Math Functions

### A method for all numeric mutable types is:

```
function Base.:(abs)(y::MInteger)::Integer
function Base.:(abs)(y::MRational)::Rational
function Base.:(abs)(y::MReal)::Real
function Base.:(abs)(y::MComplex)::Complex
```

### A method for all non-complex, numeric, mutable types is:

```
function Base.:(sign)(y::MNumber)::Real
```

### Additional methods for the `MRational` type are:

```
function Base.:(numerator)(y::MRational)::Integer
```

```
function Base.:(denominator)(y::MRational)::Integer
```

### Additional methods for the `MReal` type are:

```
function Base.:(round)(y::MReal)::Real
```

```
function Base.:(ceil)(y::MReal)::Real
```

```
function Base.:(floor)(y::MReal)::Real
```

```
function Base.:(atan)(y::MNumber, x::MNumber)::Real
function Base.:(atan)(y::MNumber, x::Real)::Real
function Base.:(atan)(y::Real, x::MNumber)::Real
```

where `y` is the rise and `x` is the run in these `atan` methods.

### Additional methods for the `MComplex` type are:

```
function Base.:(abs2)(y::MComplex)::Real
```

```
function Base.:(real)(y::MComplex)::Real
```

```
function Base.:(imag)(y::MComplex)::Real
```

```
function Base.:(conj)(y::MComplex)::Complex
```

```
function Base.:(angle)(y::MComplex)::Real
```

### Math functions whose arguments can be of types `MNumber` or `MComplex` include:

```
function Base.:(sqrt)(y::MNumber)::Real
function Base.:(sqrt)(y::MComplex)::Complex
```

```
function Base.:(sin)(y::MNumber)::Real
function Base.:(sin)(y::MComplex)::Complex
```

```
function Base.:(cos)(y::MNumber)::Real
function Base.:(cos)(y::MComplex)::Complex
```

```
function Base.:(tan)(y::MNumber)::Real
function Base.:(tan)(y::MComplex)::Complex
```

```
function Base.:(sinh)(y::MNumber)::Real
function Base.:(sinh)(y::MComplex)::Complex
```

```
function Base.:(cosh)(y::MNumber)::Real
function Base.:(cosh)(y::MComplex)::Complex
```

```
function Base.:(tanh)(y::MNumber)::Real
function Base.:(tanh)(y::MComplex)::Complex
```

```
function Base.:(asin)(y::MNumber)::Real
function Base.:(asin)(y::MComplex)::Complex
```

```
function Base.:(acos)(y::MNumber)::Real
function Base.:(acos)(y::MComplex)::Complex
```

```
function Base.:(atan)(y::MNumber)::Real
function Base.:(atan)(y::MComplex)::Complex
```

```
function Base.:(asinh)(y::MNumber)::Real
function Base.:(asinh)(y::MComplex)::Complex
```

```
function Base.:(acosh)(y::MNumber)::Real
function Base.:(acosh)(y::MComplex)::Complex
```

```
function Base.:(atanh)(y::MNumber)::Real
function Base.:(atanh)(y::MComplex)::Complex
```

```
function Base.:(log)(y::MNumber)::Real
function Base.:(log)(y::MComplex)::Complex
```

```
function Base.:(log2)(y::MNumber)::Real
function Base.:(log2)(y::MComplex)::Complex
```

```
function Base.:(log10)(y::MNumber)::Real
function Base.:(log10)(y::MComplex)::Complex
```

```
function Base.:(exp)(y::MNumber)::Real
function Base.:(exp)(y::MComplex)::Complex
```

```
function Base.:(exp2)(y::MNumber)::Real
function Base.:(exp2)(y::MComplex)::Complex
```

```
function Base.:(exp10)(y::MNumber)::Real
function Base.:(exp10)(y::MComplex)::Complex
```

## Notes

Methods, operators and math functions pertaining to these types (except for `copy` and `deepcopy`) return instances belonging to their associated core types: viz., `Bool,` `Integer,` `Rational,` `Real` or `Complex`. This is because their intended use is to permit mutable fields to be incorporated into what are otherwise immutable data structures; thereby, allowing such fields to have a potential to change their values. Mutable fields belonging to immutable data structures have the necessary infrastructure to be able to be used seamlessly in simple mathematical formulae outside the data structure itself.

## Updates

### Version 0.2.0

All constructors were made internal. They can accept: no argument, one argument, or in the cases of rational and complex, they can accept two arguments, too. External constructors no longer exist.

Added functions to read and write the mutable types of this module, and their built-in counterparts, from or to a JSON file. Specifically, functions `openJSONReader`, `openJSONWriter` and `closeJSONStream`, and methods `toFile` and `fromFile` were added to the API.

### Version 0.1.0

Initial release.
