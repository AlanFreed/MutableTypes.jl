module runtests

using
    MutableTypes,
    Test

@testset "get" begin
    t = MutableTypes.MBool(true)
    @test MutableTypes.get(t) == true
    i = MutableTypes.MInteger(-2)
    @test MutableTypes.get(i) == -2
    j = MutableTypes.MRational(-2//3)
    @test MutableTypes.get(j) == -2//3
    k = MutableTypes.MReal(1.234E-6)
    @test MutableTypes.get(k) == 1.234E-6
    l = MutableTypes.MComplex(-4.0 + 3im)
    @test MutableTypes.get(l) == -4.0 + 3im
end

@testset "set!" begin
    t = MutableTypes.MBool(true)
    set!(t, false)
    @test MutableTypes.get(t) == false
    i = MutableTypes.MInteger(-2)
    set!(i, 5)
    @test MutableTypes.get(i) == 5
    j = MutableTypes.MRational(-2//3)
    set!(j, 3//2)
    @test MutableTypes.get(j) == 3//2
    k = MutableTypes.MReal(1.234E-6)
    set!(k, 3.14159)
    @test MutableTypes.get(k) == 3.14159
    l = MutableTypes.MComplex(-4.0 + 3im)
    set!(l, -l)
    @test MutableTypes.get(l) == 4.0 - 3im
end

@testset "toString" begin
    t = MutableTypes.MBool(true)
    @test MutableTypes.toString(t) == "true"
    i = MutableTypes.MInteger(-2)
    @test MutableTypes.toString(i) == "-2"
    j = MutableTypes.MRational(-2//3)
    @test MutableTypes.toString(j) == "-2//3"
    k = MutableTypes.MReal(1.234E-6)
    @test MutableTypes.toString(k) == "1.2340E-06"
    l = MutableTypes.MComplex(-4.0 + 3im)
    @test MutableTypes.toString(l) == "-4.0000E+00 + 3.0000E+00im"
end

end  # runtests
#=
include("testMBool.jl")
include("testMInteger.jl")
include("testMRational.jl")
include("testMReal.jl")
include("testMComplex.jl")

export run

function run()
    println("Running testMBool.run():\n")
    testMBool.run()
    println("Running testMInteger.run():\n")
    testMInteger.run()
    println("Running testMRational.run():\n")
    testMRational.run()
    println("Running testMReal.run():\n")
    testMReal.run()
    println("Running testMComplex.run():\n")
    testMComplex.run()
end
=#
