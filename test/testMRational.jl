module testMRational


using
    MutableTypes
# include("../src/MutableTypes.jl")

const MRational = MutableTypes.MRational
const get       = MutableTypes.get
const set!      = MutableTypes.set!
const toString  = MutableTypes.toString

export run

function run()
    println("This function tests mutable rationals.")
    x = MRational(-1//3)
    y = MRational(2//7)
    aligned = true  # strings align to account for the minus sign
    println("Given that")
    println("    x  = ", toString(get(x)))
    println("    y  = ", toString(y; aligned))
    println("the following logical operators return")
    println("    x == y is ", toString(x==y))
    println("    x ≠ y  is ", toString(x≠y))
    println("    x < y  is ", toString(x<y))
    println("    x ≤ y  is ", toString(x≤y))
    println("    x > y  is ", toString(x>y))
    println("    x ≥ y  is ", toString(x≥y))
    println("while the arithmatic operators return")
    println("    +x     = ", toString(+x; aligned))
    println("    -x     = ", toString(-x; aligned))
    println("    x + y  = ", toString(x+y; aligned))
    println("    x - y  = ", toString(x-y; aligned))
    println("    2y     = ", toString(2y; aligned))
    println("    x * y  = ", toString(x*y; aligned))
    println("    x // y = ", toString(x//y; aligned))
    println("    x / y  = ", toString(x/y; aligned))
    println("Reassigning y to -2//7 gives")
    set!(y, -get(y))
    println("    y      = ", toString(y; aligned))
    println("The functions pertaining to mutable rationals include:")
    println("    copy(y)        = ", toString(copy(y); aligned))
    println("    deepcopy(y)    = ", toString(deepcopy(y); aligned))
    println("    abs(y)         = ", toString(abs(y); aligned))
    println("    sign(y)        = ", toString(sign(y); aligned))
    println("    numerator(y)   = ", toString(numerator(y); aligned))
    println("    denominator(y) = ", toString(denominator(y); aligned))
    println("If these answers make sense, then this test passes.")
    println()
    return nothing
end

end  # module testMRational
