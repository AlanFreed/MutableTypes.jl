var documenterSearchIndex = {"docs":
[{"location":"toc/","page":"-","title":"-","text":"","category":"page"},{"location":"#MutableTypes.jl","page":"Home","title":"MutableTypes.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package provides mutable boolean, integer, rational, real and complex types. Their arithmetic operators are overloaded. The package also exports wrappers for the more common math functions.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The intended use of these mutable types is to serve as fields within immutable data structures that contain a field or fields that need the capability to have their values changed during runtime. For example, a data structure that holds material properties may include a boolean field 'ruptured' that would get turned on (converted from false to true) after a rupture event has occurred, thereafter enabling a change in material properties to take place moving forward.","category":"page"},{"location":"","page":"Home","title":"Home","text":"All operators and functions supply instances of the core types, viz., Bool, Integer, Rational, Real and Complex, as appropriate. They do not supply instances of their mutable versions. This is in accordance with the intended use of these mutable types, i.e., they are to serve as mutable fields within an otherwise immutable data structure.","category":"page"},{"location":"#Types","page":"Home","title":"Types","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"MutableTypes.jl exports two abstract types, and five implementations of them.","category":"page"},{"location":"#Abstract-Types","page":"Home","title":"Abstract Types","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"MType is the core type for mutable types. It is a subtype of base type Number, and is defined by","category":"page"},{"location":"","page":"Home","title":"Home","text":"abstract type MType <: Number end","category":"page"},{"location":"","page":"Home","title":"Home","text":"Additionally, MNumber is a subtype of core type MType, and is defined by","category":"page"},{"location":"","page":"Home","title":"Home","text":"abstract type MNumber <: MType end","category":"page"},{"location":"#Concrete-Types","page":"Home","title":"Concrete Types","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Mutable booleans are instances of MType, whose single field n is of type Bool; specifically,","category":"page"},{"location":"","page":"Home","title":"Home","text":"mutable struct MBool <: MType\n    n::Bool\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"Recall that Bool <: Integer <: Real <: Number.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Mutable integers are instances of MNumber, whose single field n is of type Int64; specifically,","category":"page"},{"location":"","page":"Home","title":"Home","text":"mutable struct MInteger <: MNumber\n    n::Int64\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"Recall that Int64 <: Signed <: Integer <: Real <: Number.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Mutable rationals are instances of MNumber, whose single field n is of type Rational{Int64}; specifically,","category":"page"},{"location":"","page":"Home","title":"Home","text":"mutable struct MRational <: MNumber\n    n::Rational{Int64}\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"Recall that Rational <: Real <: Number.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Mutable reals are instances of MNumber, whose single field n is of type Float64; specifically,","category":"page"},{"location":"","page":"Home","title":"Home","text":"mutable struct MReal <: MNumber\n    n::Float64\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"Recall that Float64 <: AbstractFloat <: Real <: Number.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Mutable complex are instances of MType, whose single field n is of type Complex{Float64}; specifically,","category":"page"},{"location":"","page":"Home","title":"Home","text":"mutable struct MComplex <: MType\n    n::Complex{Float64}\nend","category":"page"},{"location":"","page":"Home","title":"Home","text":"Recall that Complex <: Number.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Constructors for these mutable types have the appearance of being type castings. For example, ","category":"page"},{"location":"","page":"Home","title":"Home","text":"truth = MBool(true)\nfive = MInteger(5)\nthreeHalves = MRational(3//2)\npi = MReal(3.14159)\ni = MComplex(0+1im)","category":"page"},{"location":"#Methods","page":"Home","title":"Methods","text":"","category":"section"},{"location":"#get()","page":"Home","title":"get()","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Method get extends method Base.get. Calls to MutableTypes.get return the value held by field n for instances of the above mutable types; specifically,","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(get)(y::MBool)::Bool\nfunction Base.:(get)(y::MInteger)::Integer\nfunction Base.:(get)(y::MRational)::Rational\nfunction Base.:(get)(y::MReal)::Real\nfunction Base.:(get)(y::MComplex)::Complex","category":"page"},{"location":"#set!()","page":"Home","title":"set!()","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Method set! assigns the supplied value x to field n held by the mutable type. (Note: there is no method Base.set! to inherit that pairs with method Base.get.) Their interfaces are","category":"page"},{"location":"","page":"Home","title":"Home","text":"function set!(y::MBool, x::Bool)\nfunction set!(y::MInteger, x::Integer)\nfunction set!(y::MRational, x::Rational)\nfunction set!(y::MReal, x::Real)\nfunction set!(y::MComplex, x::Complex)","category":"page"},{"location":"#toString()","page":"Home","title":"toString()","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Method toString converts numbers into their string representation. For uniformity of structure, these methods are also provided for the core types via","category":"page"},{"location":"","page":"Home","title":"Home","text":"function toString(y::Bool; aligned::Bool=false)::String\nfunction toString(y::Integer; aligned::Bool=false)::String\nfunction toString(y::Rational; aligned::Bool=false)::String\nfunction toString(y::Real; format::Char='E', precision::Int=5, aligned::Bool=false)::String\nfunction toString(y::Complex; format::Char='E', precision::Int=5,  aligned::Bool=false)::String","category":"page"},{"location":"","page":"Home","title":"Home","text":"with the mutable types having like interfaces of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function toString(y::MBool; aligned::Bool=false)::String\nfunction toString(y::MInteger; aligned::Bool=false)::String\nfunction toString(y::MRational; aligned::Bool=false)::String\nfunction toString(y::MReal; format::Char='E', precision::Int=5, aligned::Bool=false)::String\nfunction toString(y::MComplex; format::Char='E', precision::Int=5, aligned::Bool=false)::String","category":"page"},{"location":"","page":"Home","title":"Home","text":"These methods have keywords with default values, which include:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Keyword aligned, if set to true (the default is false), will right-align strings. This is useful when, e.g., printing arrays or matrices of values. For instances of Bool and MBool, a whitespace will preceed \"true\" strings so that they will read \"  true\", and will therefore right align with instances of \"false\". For all numeric types, a whitespace will preceed all non-negative values so that they read \"  <value>\", and will therefore right align with negative numbers.\nKeyword format applies to floating-point numbers, i.e., instances of Real, Complex, MReal and MComplex. It differentiates exponential (i.e., scientific) notation from fixed-point notation in their string representations. The default is an exponential notation with a capital 'E' in the string. A lower-case 'e' will be used whenever format='e'. All other Char values will result in a fixed-point representation of the number.\nKeyword precision specifies the number of significant figures that are to be retained in the string representation of a floating-point number. The default is 5, but any integer value within the interval [3,…,7] is admissible.","category":"page"},{"location":"#copy()","page":"Home","title":"copy()","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Method copy extends method Base.copy. Calls to MutableTypes.copy return a shallow copy of the supplied argument; specifically,","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(copy)(y::MBool)::MBool\nfunction Base.:(copy)(y::MInteger)::MInteger\nfunction Base.:(copy)(y::MRational)::MRational\nfunction Base.:(copy)(y::MReal)::MReal\nfunction Base.:(copy)(y::MComplex)::MComplex","category":"page"},{"location":"#deepcopy()","page":"Home","title":"deepcopy()","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Method deepcopy extends method Base.deepcopy. Calls to MutableTypes.deepcopy return a deep copy of the supplied argument; specifically,","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(deepcopy)(y::MBool)::MBool\nfunction Base.:(deepcopy)(y::MInteger)::MInteger\nfunction Base.:(deepcopy)(y::MRational)::MRational\nfunction Base.:(deepcopy)(y::MReal)::MReal\nfunction Base.:(deepcopy)(y::MComplex)::MComplex","category":"page"},{"location":"#Unary-Operators","page":"Home","title":"Unary Operators","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"These operators extend their equivalent unary operators exported by module Base.","category":"page"},{"location":"#!","page":"Home","title":"!","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Unary operator ! negates the MBool value to the right of the operator. This operator is overloaded to handle","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:!(y::MBool)::Bool","category":"page"},{"location":"#","page":"Home","title":"+","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Unariy operator + retains the value to the mutable type to the right of the operator. This operator is overloaded to handle","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:+(y::MInteger)::Integer\nfunction Base.:+(y::MRational)::Rational\nfunction Base.:+(y::MReal)::Real\nfunction Base.:+(y::MComplex)::Complex","category":"page"},{"location":"#-2","page":"Home","title":"-","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Unary operator - negates the value of the mutable type to the right of the operator. This operator is overloaded to handle","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:-(y::MInteger)::Integer\nfunction Base.:-(y::MRational)::Rational\nfunction Base.:-(y::MReal)::Real\nfunction Base.:-(y::MComplex)::Complex","category":"page"},{"location":"#Binary-Operators","page":"Home","title":"Binary Operators","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"These operators extend their equivalent binary operators exported by module Base.","category":"page"},{"location":"#-3","page":"Home","title":"==","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator == tests to determine if the argument to the left equals the argument to the right. This operator is overloaded to handle comparisons of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(==)(y::MType, z::MType)::Bool\nfunction Base.:(==)(y::Union{Bool,Real,Complex}, z::MType)::Bool\nfunction Base.:(==)(y::MType, z::Union{Bool,Real,Complex})::Bool","category":"page"},{"location":"#-4","page":"Home","title":"≠","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator ≠ tests to determine if the argument to the left does not equal the argument to the right. This operator is overloaded to handle comparisons of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:≠(y::MType, z::MType)::Bool\nfunction Base.:≠(y::Union{Bool,Real,Complex}, z::MType)::Bool\nfunction Base.:≠(y::MType, z::Union{Bool,Real,Complex})::Bool","category":"page"},{"location":"#-5","page":"Home","title":"≈","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator ≈ tests to determine if the argument to the left is approximately equal to the argument to the right. This operator applies to floating-points objects and tests for equality of at least 32-bit precision between two 64-bit numbers. This operator is overloaded to handle comparisons of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:≈(y::MReal, z::MReal)::Bool\nfunction Base.:≈(y::Real, z::MReal)::Bool\nfunction Base.:≈(y::MReal, z::Real)::Bool\nfunction Base.:≈(y::MComplex, z::MComplex)::Bool\nfunction Base.:≈(y::Complex, z::MComplex)::Bool\nfunction Base.:≈(y::MComplex, z::Complex)::Bool","category":"page"},{"location":"","page":"Home","title":"Home","text":"Recall that Int64, Rational{Int64} and Float64 are all instances of type Real.","category":"page"},{"location":"#-6","page":"Home","title":"<","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator < tests to determine if the left argument is less than the right argument. This operator is overloaded to handle comparisons of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:<(y::MNumber, z::MNumber)::Bool\nfunction Base.:<(y::Real, z::MNumber)::Bool\nfunction Base.:<(y::MNumber, z::Real)::Bool","category":"page"},{"location":"#-7","page":"Home","title":"≤","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator ≤ tests to determine if the left argument is less than or equal to the right argument. This operator is overloaded to handle comparisons of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:≤(y::MNumber, z::MNumber)::Bool\nfunction Base.:≤(y::Real, z::MNumber)::Bool\nfunction Base.:≤(y::MNumber, z::Real)::Bool","category":"page"},{"location":"#-8","page":"Home","title":"≥","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator ≥ tests to determine if the left argument is greater than or equal to the right argument. This operator is overloaded to handle comparisons of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:≥(y::MNumber, z::MNumber)::Bool\nfunction Base.:≥(y::Real, z::MNumber)::Bool\nfunction Base.:≥(y::MNumber, z::Real)::Bool","category":"page"},{"location":"#-9","page":"Home","title":">","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator > tests to determine if the left argument is greater than the right argument. This operator is overloaded to handle comparisons of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:>(y::MNumber, z::MNumber)::Bool\nfunction Base.:>(y::Real, z::MNumber)::Bool\nfunction Base.:>(y::MNumber, z::Real)::Bool","category":"page"},{"location":"#-10","page":"Home","title":"+","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator + adds the value held by the right argument to the value held by the left argument. This operator is overloaded to handle cases of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:+(y::MInteger, z::MInteger)::Integer\nfunction Base.:+(y::MInteger, z::Integer)::Integer\nfunction Base.:+(y::Integer, z::MInteger)::Integer\nfunction Base.:+(y::MRational, z::MRational)::Rational\nfunction Base.:+(y::Union{Integer, Rational}, z::MRational)::Rational\nfunction Base.:+(y::MRational, z::Union{Integer, Rational})::Rational\nfunction Base.:+(y::MRational, z::MInteger)::Rational\nfunction Base.:+(y::MInteger, z::MRational)::Rational\nfunction Base.:+(y::MReal, z::MReal)::Real\nfunction Base.:+(y::MReal, z::Union{MInteger,MRational})::Real\nfunction Base.:+(y::Union{MInteger,MRational}, z::MReal)::Real\nfunction Base.:+(y::MReal, z::Real)::Real\nfunction Base.:+(y::Real, z::MReal)::Real\nfunction Base.:+(y::MComplex, z::MComplex)::Complex\nfunction Base.:+(y::MComplex, z::Complex)::Complex\nfunction Base.:+(y::Complex, z::MComplex)::Complex\nfunction Base.:+(y::MComplex, z::MNumber)::Complex\nfunction Base.:+(y::MNumber, z::MComplex)::Complex\nfunction Base.:+(y::MComplex, z::Real)::Complex\nfunction Base.:+(y::Real, z::MComplex)::Complex","category":"page"},{"location":"#-11","page":"Home","title":"-","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator - subtracts the value held by the right argument from the value held by the left argument. This operator is overloaded to handle cases of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:-(y::MInteger, z::MInteger)::Integer\nfunction Base.:-(y::MInteger, z::Integer)::Integer\nfunction Base.:-(y::Integer, z::MInteger)::Integer\nfunction Base.:-(y::MRational, z::MRational)::Rational\nfunction Base.:-(y::Union{Integer, Rational}, z::MRational)::Rational\nfunction Base.:-(y::MRational, z::Union{Integer, Rational})::Rational\nfunction Base.:-(y::MRational, z::MInteger)::Rational\nfunction Base.:-(y::MInteger, z::MRational)::Rational\nfunction Base.:-(y::MReal, z::MReal)::Real\nfunction Base.:-(y::MReal, z::Real)::Real\nfunction Base.:-(y::Real, z::MReal)::Real\nfunction Base.:-(y::MReal, z::Union{MInteger,MRational})::Real\nfunction Base.:-(y::Union{MInteger,MRational}, z::MReal)::Real\nfunction Base.:-(y::MComplex, z::MComplex)::Complex\nfunction Base.:-(y::MComplex, z::Complex)::Complex\nfunction Base.:-(y::Complex, z::MComplex)::Complex\nfunction Base.:-(y::MComplex, z::MNumber)::Complex\nfunction Base.:-(y::MNumber, z::MComplex)::Complex\nfunction Base.:-(y::MComplex, z::Real)::Complex\nfunction Base.:-(y::Real, z::MComplex)::Complex","category":"page"},{"location":"#*","page":"Home","title":"*","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator * multiplies the value held by the left argument with the value held by the right argument. This operator is overloaded to handle cases of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:*(y::MInteger, z::MInteger)::Integer\nfunction Base.:*(y::MInteger, z::Integer)::Integer\nfunction Base.:*(y::Integer, z::MInteger)::Integer\nfunction Base.:*(y::MRational, z::MRational)::Rational\nfunction Base.:*(y::Union{Integer, Rational}, z::MRational)::Rational\nfunction Base.:*(y::MRational, z::Union{Integer, Rational})::Rational\nfunction Base.:*(y::MRational, z::MInteger)::Rational\nfunction Base.:*(y::MInteger, z::MRational)::Rational\nfunction Base.:*(y::MReal, z::MReal)::Real\nfunction Base.:*(y::MReal, z::Real)::Real\nfunction Base.:*(y::Real, z::MReal)::Real\nfunction Base.:*(y::MReal, z::Union{MInteger,MRational})::Real\nfunction Base.:*(y::Union{MInteger,MRational}, z::MReal)::Real\nfunction Base.:*(y::MComplex, z::MComplex)::Complex\nfunction Base.:*(y::MComplex, z::Complex)::Complex\nfunction Base.:*(y::Complex, z::MComplex)::Complex\nfunction Base.:*(y::MComplex, z::MNumber)::Complex\nfunction Base.:*(y::MNumber, z::MComplex)::Complex\nfunction Base.:*(y::MComplex, z::Real)::Complex\nfunction Base.:*(y::Real, z::MComplex)::Complex","category":"page"},{"location":"#-12","page":"Home","title":"÷","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator ÷ provides integer division where the left integer is divided by the right integer. This operator is overloaded to handle cases of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:÷(y::MInteger, z::MInteger)::Integer\nfunction Base.:÷(y::MInteger, z::Integer)::Integer\nfunction Base.:÷(y::Integer, z::MInteger)::Integer","category":"page"},{"location":"#%","page":"Home","title":"%","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator % returns the remainder (or modulus) associated with an integer division. This operator is overloaded to handle the cases of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:%(y::MInteger, z::MInteger)::Integer\nfunction Base.:%(y::MInteger, z::Integer)::Integer\nfunction Base.:%(y::Integer, z::MInteger)::Integer\n","category":"page"},{"location":"#//","page":"Home","title":"//","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator // provides rational division where the left argument is divided by the right argument. This operator is overloaded to handle the cases of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(//)(y::MInteger, z::MInteger)::Rational\nfunction Base.:(//)(y::MInteger, z::Union{Integer, Rational})::Rational\nfunction Base.:(//)(y::Union{Integer, Rational}, z::MInteger)::Rational\nfunction Base.:(//)(y::MRational, z::MRational)::Rational\nfunction Base.:(//)(y::Rational, z::Union{MInteger, MRational})::Rational\nfunction Base.:(//)(y::Union{MInteger, MRational}, z::Rational)::Rational\nfunction Base.:(//)(y::MRational, z::Integer)::Rational\nfunction Base.:(//)(y::Integer, z::MRational)::Rational","category":"page"},{"location":"#/","page":"Home","title":"/","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator / provides real and complex division where the left argument is divided by the right argument. This operator is overloaded to handle the cases of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:/(y::MReal, z::MReal)::Real\nfunction Base.:/(y::MReal, z::Real)::Real\nfunction Base.:/(y::Real, z::MReal)::Real\nfunction Base.:/(y::MReal, z::Union{MInteger,MRational})::Real\nfunction Base.:/(y::Union{MInteger,MRational}, z::MReal)::Real\nfunction Base.:/(y::MComplex, z::MComplex)::Complex\nfunction Base.:/(y::MComplex, z::Complex)::Complex\nfunction Base.:/(y::Complex, z::MComplex)::Complex\nfunction Base.:/(y::MComplex, z::MNumber)::Complex\nfunction Base.:/(y::MNumber, z::MComplex)::Complex\nfunction Base.:/(y::MComplex, z::Real)::Complex\nfunction Base.:/(y::Real, z::MComplex)::Complex","category":"page"},{"location":"#-13","page":"Home","title":"^","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Binary operator ^ raises the left argument to the power of the right argument. This operator is overloaded to handle the cases of","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:^(y::MInteger, z::MInteger)::Integer\nfunction Base.:^(y::MInteger, z::Integer)::Integer\nfunction Base.:^(y::Integer, z::MInteger)::Integer\nfunction Base.:^(y::MReal, z::MReal)::Real\nfunction Base.:^(y::MReal, z::Real)::Real\nfunction Base.:^(y::Real, z::MReal)::Real\nfunction Base.:^(y::MReal, z::Union{MInteger,MRational})::Real\nfunction Base.:^(y::Union{MInteger,MRational}, z::MReal)::Real\nfunction Base.:^(y::MComplex, z::MComplex)::Complex\nfunction Base.:^(y::MComplex, z::Complex)::Complex\nfunction Base.:^(y::Complex, z::MComplex)::Complex\nfunction Base.:^(y::MComplex, z::MNumber)::Complex\nfunction Base.:^(y::MNumber, z::MComplex)::Complex\nfunction Base.:^(y::MComplex, z::Real)::Complex\nfunction Base.:^(y::Real, z::MComplex)::Complex","category":"page"},{"location":"#Functions:-all-numeric-types.","page":"Home","title":"Functions: all numeric types.","text":"","category":"section"},{"location":"#abs","page":"Home","title":"abs","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Function abs() extends function Base.abs(). It returns the absolute value of its argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(abs)(y::MInteger)::Integer\nfunction Base.:(abs)(y::MRational)::Rational\nfunction Base.:(abs)(y::MReal)::Real\nfunction Base.:(abs)(y::MComplex)::Complex","category":"page"},{"location":"#Functions:-all-non-complex-numeric-types.","page":"Home","title":"Functions: all non-complex numeric types.","text":"","category":"section"},{"location":"#sign","page":"Home","title":"sign","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Function sign() extends function Base.sign(). It returns the sign of its argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(sign)(y::MNumber)::Real","category":"page"},{"location":"#Functions:-rational-numbers.","page":"Home","title":"Functions: rational numbers.","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"These functions extend their Base equivalents.","category":"page"},{"location":"#Function-numerator()-returns-the-numerator-of-a-rational-number.","page":"Home","title":"Function numerator() returns the numerator of a rational number.","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"function Base.:(numerator)(y::MRational)::Integer","category":"page"},{"location":"#Function-denominator()-returns-the-denominator-of-a-rational-number.","page":"Home","title":"Function denominator() returns the denominator of a rational number.","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"function Base.:(denominator)(y::MRational)::Integer","category":"page"},{"location":"#Functions:-real-numbers.","page":"Home","title":"Functions: real numbers.","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"These functions extend their Base equivalents.","category":"page"},{"location":"#round","page":"Home","title":"round","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Function round() rounds the real value to its nearest integer value.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(round)(y::MReal)::Real","category":"page"},{"location":"#ceil","page":"Home","title":"ceil","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Function ceil() returns the ceiling of the supplied real, i.e., the nearest integer greater than or equal to its value.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(ceil)(y::MReal)::Real","category":"page"},{"location":"#floor","page":"Home","title":"floor","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Function floor() returns the floor of the supplied real, i.e., the nearest integer less than or equal to its value.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(floor)(y::MReal)::Real","category":"page"},{"location":"#cbrt","page":"Home","title":"cbrt","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Function cbrt() returns the cube root of the supplied real.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.Math.:(cbrt)(y::MNumber)::Real","category":"page"},{"location":"#atan","page":"Home","title":"atan","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Function atan(y,x) returns the inverse tangent of y/x where y is the rise and x is the run. In many languages this is denoted as atan2. The following additional cases are handled:","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(atan)(y::MNumber, x::MNumber)::Real\nfunction Base.:(atan)(y::MNumber, x::Real)::Real\nfunction Base.:(atan)(y::Real, x::MNumber)::Real","category":"page"},{"location":"#Functions:-complex-numbers.","page":"Home","title":"Functions: complex numbers.","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"These functions extend their Base equivalents.","category":"page"},{"location":"#abs2","page":"Home","title":"abs2","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Function abs2() returns the squared absolute value of its argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(abs2)(y::MComplex)::Real","category":"page"},{"location":"#real","page":"Home","title":"real","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Function real() returns the real part of its complex argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(real)(y::MComplex)::Real","category":"page"},{"location":"#imag","page":"Home","title":"imag","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Function imag() returns the imaginary part of its complex argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(imag)(y::MComplex)::Real","category":"page"},{"location":"#conj","page":"Home","title":"conj","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Function conj() returns the complex conjugate of its complex argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(conj)(y::MComplex)::Complex","category":"page"},{"location":"#angle","page":"Home","title":"angle","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Function angle() returns the angle in radians of the complex argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(angle)(y::MComplex)::Real","category":"page"},{"location":"#Functions:-math","page":"Home","title":"Functions: math","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"These functions extend their Base equivalents.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function sqrt() returns the square root of the argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(sqrt)(y::MNumber)::Real\nfunction Base.:(sqrt)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function sin() returns the sine of the argument, which is in radians.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(sin)(y::MNumber)::Real\nfunction Base.:(sin)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function cos() returns the cosine of the argument, which is in radians.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(cos)(y::MNumber)::Real\nfunction Base.:(cos)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function tan() returns the tangent of the argument, which is in radians.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(tan)(y::MNumber)::Real\nfunction Base.:(tan)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function sinh() returns the hyperbolic sine of the argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(sinh)(y::MNumber)::Real\nfunction Base.:(sinh)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function cosh() returns the hyperbolic cosine of the argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(cosh)(y::MNumber)::Real\nfunction Base.:(cosh)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function tanh() returns the hyperbolic tangent of the argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(tanh)(y::MNumber)::Real\nfunction Base.:(tanh)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function asin() returns the inverse of the sine of the argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(asin)(y::MNumber)::Real\nfunction Base.:(asin)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function acos() returns the inverse of the cosine of the argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(acos)(y::MNumber)::Real\nfunction Base.:(acos)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function atan() returns the inverse of the tangent of the argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(atan)(y::MNumber)::Real\nfunction Base.:(atan)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function asinh() returns the inverse of the hyperbolic sine of the argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(asinh)(y::MNumber)::Real\nfunction Base.:(asinh)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function acosh() returns the inverse of the hyperbolic cosine of the argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(acosh)(y::MNumber)::Real\nfunction Base.:(acosh)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function atanh() returns the inverse of the hyperbolic tangent of the argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(atanh)(y::MNumber)::Real\nfunction Base.:(atanh)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function log() returns the natural logarithm of the argument.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(log)(y::MNumber)::Real\nfunction Base.:(log)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function log2() returns the logarithm of the argument in base 2.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(log2)(y::MNumber)::Real\nfunction Base.:(log2)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function log10() returns the logarithm of the argument in base 10.","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(log10)(y::MNumber)::Real\nfunction Base.:(log10)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function exp() returns the exponential of the argument, which is the inverse function to log().","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(exp)(y::MNumber)::Real\nfunction Base.:(exp)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function exp2() returns the exponential of the argument in base 2, which is the inverse function to log2().","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(exp2)(y::MNumber)::Real\nfunction Base.:(exp2)(y::MComplex)::Complex","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function exp10() returns the exponential of the argument in base 10, which is the inverse function to log10().","category":"page"},{"location":"","page":"Home","title":"Home","text":"function Base.:(exp10)(y::MNumber)::Real\nfunction Base.:(exp10)(y::MComplex)::Complex","category":"page"}]
}
