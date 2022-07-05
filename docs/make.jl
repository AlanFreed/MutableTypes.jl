# make.jl for Documenter to create MutableTypes documentation.

push!(LOAD_PATH,"../src/")

using MutableTypes

using Documenter

makedocs(
        sitename = "MutableTypes.jl",
        modules  = [MutableTypes],
        pages = [
                "Home" => "index.md",
                ])

deploydocs(;
    repo="github.com/AlanFreed/MutableTypes.jl.git",
)
