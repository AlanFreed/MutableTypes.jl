module testMReal


using
    MutableTypes
# include("../src/MutableTypes.jl")

const MReal    = MutableTypes.MReal
const get      = MutableTypes.get
const set!     = MutableTypes.set!
const toString = MutableTypes.toString

export run

function run()
    println("This function tests mutable floating-point numbers.")
    x = MReal(-3.0)
    y = MReal(2.0)
    format = 'E'
    precision = 6
    aligned = true
    println("Given that")
    println("    x  = ", toString(get(x); format, precision, aligned))
    println("    y  = ", toString(y; format, precision, aligned))
    println("    2y = ", toString(2y; format, precision, aligned))
    println("the following logical operators return")
    println("    x == y is ", toString(x==y))
    println("    x ≠ y  is ", toString(x≠y))
    println("    x < y  is ", toString(x<y))
    println("    x ≤ y  is ", toString(x≤y))
    println("    x > y  is ", toString(x>y))
    println("    x ≥ y  is ", toString(x≥y))
    println("with approximately equal returning")
    println("    x ≈ y  is ", toString(x≈y))
    z = 2.000000001
    println("for z = ", string(z))
    println("    y ≈ z  is ", toString(y≈z))
    println("while the arithmatic operators return")
    println("    +x    = ", toString(+x; format, precision, aligned))
    println("    -x    = ", toString(-x; format, precision, aligned))
    println("    x + y = ", toString(x+y; format, precision, aligned))
    println("    x - y = ", toString(x-y; format, precision, aligned))
    println("    x * y = ", toString(x*y; format, precision, aligned))
    println("    x / y = ", toString(x/y; format, precision, aligned))
    println("    x ^ y = ", toString(x^y; format, precision, aligned))
    println("Now we verify the functions using  z = -y/x")
    z = MReal(0.0)
    set!(z, -y/x)
    println("copy(z)     = ", toString(copy(z); format, precision, aligned))
    println("deepcopy(z) = ", toString(deepcopy(z); format, precision, aligned))
    println("abs(z)      = ", toString(abs(z); format, precision, aligned))
    println("sign(z)     = ", toString(sign(z); format, precision, aligned))
    println("round(2z)   = ", toString(round(2z); format, precision, aligned))
    println("floor(2z)   = ", toString(floor(2z); format, precision, aligned))
    println("ceil(2z)    = ", toString(ceil(2z); format, precision, aligned))
    println("the trigonometric functions are:")
    println("sin(z) = ", toString(sin(z); format, precision, aligned))
    println("cos(z) = ", toString(cos(z); format, precision, aligned))
    println("tan(z) = ", toString(tan(z); format, precision, aligned))
    println("where")
    println("asin(sin(z)) = ", toString(asin(sin(z)); format, precision, aligned))
    println("acos(cos(z)) = ", toString(acos(cos(z)); format, precision, aligned))
    println("atan(tan(z)) = ", toString(atan(tan(z)); format, precision, aligned))
    println("while")
    println("atan(y, x) = ", toString(atan(y, x); format, precision, aligned))
    println("the hyperbolic functions are:")
    println("sinh(z) = ", toString(sinh(z); format, precision, aligned))
    println("cosh(z) = ", toString(cosh(z); format, precision, aligned))
    println("tanh(z) = ", toString(tanh(z); format, precision, aligned))
    println("where")
    println("asinh(sinh(z)) = ", toString(asinh(sinh(z)); format, precision, aligned))
    println("acosh(cosh(z)) = ", toString(acosh(cosh(z)); format, precision, aligned))
    println("atanh(tanh(z)) = ", toString(atanh(tanh(z)); format, precision, aligned))
    println("while the logarithmic and exponential functions are:")
    println("log(z)   = ", toString(log(z); format, precision, aligned))
    println("log2(z)  = ", toString(log2(z); format, precision, aligned))
    println("log10(z) = ", toString(log10(z); format, precision, aligned))
    println("exp(z)   = ", toString(exp(z); format, precision, aligned))
    println("exp2(z)  = ", toString(exp2(z); format, precision, aligned))
    println("exp10(z) = ", toString(exp10(z); format, precision, aligned))
    println("where")
    println("log(exp(z))     = ", toString(log(exp(z)); format, precision, aligned))
    println("log2(exp2(z))   = ", toString(log2(exp2(z)); format, precision, aligned))
    println("log10(exp10(z)) = ", toString(log10(exp10(z)); format, precision, aligned))
    println()
    println("If these answers make sense, then this test passes.")
    return nothing
end

end  # module testMReal
