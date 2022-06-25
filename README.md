# MutableTypes

This package provides mutable boolean, integer, rational, real and complex types. Their arithmetic operators are overloaded. The package also exports wrappers for the common math functions.

The intent of these mutable types is for their use in immutable data structures that contain a field or fields that need the capability to have their values changed during runtime. For example, a data structure that holds material properties may include a boolean field `ruptured` that would get turned on (converted from false to true) after a rupture event has occurred, thereafter enabling a change in material properties to take place moving forward.

Mutable core types are based upon two abstract types; they are:
  * MType    \<: Number
  * MNumber  \<: MType

Mutable data structures with a single field `n` are introduced; specifically:
  * MBool     \<: MType   \# `n::Bool`
  * MInteger  \<: MNumber   \# `n::Int64`
  * MRational \<: MNumber   \# `n::Rational{Int64}`
  * MReal     \<: MNumber   \# `n::Float64`
  * MComplex  \<: MType   \# `n::Complex{Float64}`

whose constructors look like a type casting, e.g., `x = MReal(2.5)`.

Methods for retrieval and assignment of all concrete mutable types include:
  * get, set! and toString

Overloaded operators include:
  * MBool:   ==, ≠, \!
  * MInteger:   ==, ≠, \<, ≤, ≥, \>, \+, \-, \*, ÷, %, ^
  * MRational:   ==, ≠, \<, ≤, ≥, \>, \+, \-, \*, //, /
  * MReal:   ==, ≠, ≈, \<, ≤, ≥, \>, \+, \-, \*, /, ^
  * MComplex:   ==, ≠, ≈, \+, \-, \*, /, ^

Methods common to all concrete mutable types include:
  * copy and deepcopy

A method for all numeric mutable types is:
  * abs

A method for all non-complex, numeric, mutable types is:
  * sign

Additional methods for the MRational type are:
  * numerator and denominator

Additional methods for the MReal type are:
  * round, ceil, floor, cbrt or ∛, and atan(y,x)

Additional methods for the MComplex type are:
  * abs2, real, imag, conj and angle

Math functions whose arguments are of types MReal or MComplex include:
  * sqrt or √, sin, cos, tan, asin, acos, atan, sinh, cosh, tanh, asinh, acosh, atanh, log, log2, log10, exp, exp2 and exp10

## Note

Operators, methods and math functions pertaining to these types \(except for copy and deepcopy\) return instances belonging to their associated core types: Bool, Integer, Rational, Real or Complex. This is because their intended use is to permit mutable fields to be incorporated into what are otherwise immutable data structures; thereby, allowing such fields to have a potential to change their values. Mutable fields belonging to immutable data structures have the necessary infrastructure to be able to be used seamlessly in simple mathematical formulae outside the data structure itself.
