/*

use bitwise operation to manipulate bits, these operation can be used with decimal numbers and will directly convert internally to bit operations
note: the operation that requires us to "cycle" bits is still pending, probably a custom function: https://stackoverflow.com/a/1768055
we also need a function that takes 2 array of bits ( not necesarrily an array structure) and shifts array A based on array's B content: (bit access)https://stackoverflow.com/a/9954810
https://www.w3schools.com/js/js_bitwise.asp

*/

function Shift(input, offset) {

    let result = new Array()

    for (i = 0; i < input.length; i++) {

        let t = i + offset
        result[i] = input[t % input.length]
    }

    return result
}

function Shuffle(target, reference) {

    let result = new Array()

    for (i = 0; i < target.length; i++) {

        let t = reference[i]
        result[i] = target[t-1]
       
    }
    
    return result
}

//console.log(Shift("0100101", 1))
//console.log(Shuffle([1,1,0,0,0,1,1,1,1,0],[3,5,2,7,4,10,1,9,8,6]))