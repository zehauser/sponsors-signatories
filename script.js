$( document ).ready(function() {

    $( "form" ).submit(function (event) {
        event.preventDefault()
        var input = $( "input[name='countryInput']" ).val()
        $( "input[name='countryInput']" ).val("")
        processInput(input)
    })

})

function printError(errMsg) {
    $( "#output" ).text(errMsg)
}

function updatePreview() {
    $( "#preview" ).text(selectedCountries.join(", "))
}

function processInput(input) {
    try {
        var match = getBestMatchOrThrow(input)
        selectedCountries.push(match)
        selectedCountries.sort()
        updatePreview()
        printError("")
    } catch (errMsg) {
        printError(errMsg)
    }
}

var selectedCountries = []

function filterSome(arr2d, pred) {
    return arr2d.filter(function(arr) {
        return arr.some(pred)
    })
}

function containsMatches(strArr2d, match) {
    return filterSome(strArr2d, function(str) {
        return str.indexOf(match) !== -1
    })
}

function startsWithMatches(strArr2d, match) {
    return filterSome(strArr2d, function(str) {
        return str.indexOf(match) === 1
    })
}

function exactMatches(strArr2d, match) {
    return filterSome(strArr2d, function(str) {
        return str === match
    })
}

function throwMultipleMatches(input, strArr2d) {
    throw "Multiple matches for " + input + "! " 
    + strArr2d.map(function (arr) {
        return arr[0]
    }).join(", ")
}

function getBestMatchOrThrow(input) {
    var allContains = containsMatches(countrySet, input)
    if (allContains.length === 1) {
        return allContains[0][0]
    }

    var allStartsWith = startsWithMatches(allContains, input)
    if (allStartsWith.length === 1) {
        return allStartsWith[0][0]
    }

    var allExact = exactMatches(allContains, input) 
    if (allExact.length === 1) {
        return allExact[0][0]
    } 

    if (allExact.length > 1) {
        throw "Error! Multiple exact matches for " + input + ". " 
        + "Go fix the country-names spreadsheet!"
    } else if (allStartsWith.length > 1) {
        throwMultipleMatches(input, allStartsWith)
    } else if (allContains.length > 1) {
        throwMultipleMatches(input, allContains)
    }

    throw "No matches for " + input + "!"
}