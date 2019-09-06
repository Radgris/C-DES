/*

use bitwise operation to manipulate bits, these operation can be used with decimal numbers and will directly convert internally to bit operations
note: the operation that requires us to "cycle" bits is still pending, probably a custom function: https://stackoverflow.com/a/1768055
we also need a function that takes 2 array of bits ( not necesarrily an array structure) and shifts array A based on array's B content: (bit access)https://stackoverflow.com/a/9954810
https://www.w3schools.com/js/js_bitwise.asp

*/


//valores por default que se necesitan
p10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6]
p8 = [6, 3, 7, 4, 8, 5, 10, 9]
ip = [2, 6, 3, 1, 4, 8, 5, 7]
ipm = [4, 1, 3, 5, 7, 2, 8, 6]
ep = [4, 1, 2, 3, 2, 3, 4, 1]
p4 = [2, 4, 3, 1]

s0 = [
    [1, 0, 3, 2],
    [3, 2, 1, 0],
    [0, 2, 1, 3],
    [3, 1, 3, 2]
]

s1 = [
    [0, 1, 2, 3],
    [2, 0, 1, 3],
    [3, 0, 1, 0],
    [2, 1, 0, 3]
]

//funcion que toma un arreglo y un numero de casillas, luego cicla los elementos por el numero
function Shift(input, offset) {

    let result = new Array()

    for (i = 0; i < input.length; i++) {

        let t = i + offset
        result[i] = input[t % input.length]
    }

    return result
}

//toma 2 arreglos y regresa un arreglo cuyos elementos son el primer arreglo reorganizados en base al segundo arreglo de parametro
function Shuffle(target, reference) {

    let result = new Array()

    for (i = 0; i < target.length; i++) {

        let t = reference[i]
        result[i] = target[t - 1]

    }

    return result
}

//toma un arreglo y regresa un arrelo de arreglos con cada mitad del arreglo original en indice 0 y 1
function split(input) {

    let result = new Array()

    for (i = 0; i < input.length; i++) {

        let a = new Array()
        let b = new Array()

        if (i < (input.length / 2)) {
            a.push(input[i])
        } else {
            b.push(input[i])
        }
    }

    result[0] = a
    result[1] = b

    return result
}

console.log(Shift("0100101", 1))
//console.log(Shuffle([1,1,0,0,0,1,1,1,1,0],[3,5,2,7,4,10,1,9,8,6]))


function DES_E() {

}

function DES_D() {

}