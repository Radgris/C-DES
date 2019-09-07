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

//function que lee el .txt dentro de la misma carpeta que el archivo y lo transforma en un array
function reader() {
    var fs = require('fs');
    var path = process.cwd();
    var buffer = fs.readFileSync(path + "\\Pairs1001100100.txt").toString();

    console.log(buffer.toString());

    var plainText = buffer.split(/[/\n]/);
    return plainText;
}

//console.log(reader());

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

//another interation of split
const splitAt = index => x => [x.slice(0, index), x.slice(index)]

//takes 2 array and makes them one
function stitch(arr1, arr2) {
    let result = new Array()

    for (i = 0; i < arr1.length; i++) {
        result.push(arr1[i])
    }
    for (i = 0; i < arr2.length; i++) {
        result.push(arr2[i])
    }

    return result
}

//console.log(Shift("0100101", 1))
//console.log(Shuffle([1,1,0,0,0,1,1,1,1,0],[3,5,2,7,4,10,1,9,8,6]))
//console.log(splitAt(2)("abcde"))
//console.log(stitch("abc","def"))

//NOT TESTED: funcion que genera k1 y k2 a partir de una llave de 10 bits
function kgen(key) {

    let result = new Array()

    let t
    let u

    t = Shuffle(key, p10)
    t = splitAt((t.length / 2))(t)
    t[1] = Shift(t[0], 1)
    t[2] = Shift(t[1], 1)
    //aqui no recuerdo si es un shift de -1 o de -2 sobre del anterior
    u[1] = Shift(t[0], 1)
    u[2] = Shift(t[1], 1)

    let k1
    let k2

    k1 = stitch(t[0], t[1])
    k2 = stitch(u[0], u[1])

    k1 = Shuffle(v, p8)
    k2 = Shuffle(w, p8)

    result[0] = k1
    result[1] = k2
}

//NOT IMPLEMENTED : funcion que utilizar XOR y matrices, implementar  comportarmiento en funciones separadas 
function fk(){

}
//NOT IMPLEMENTED: no estoy seguro de que hace este paso asi que dejo este placeholder aqui
function sw(){

}

// el algoritmo en si, quizas sea mejor usar el mismo para Desencripcion y encripcion y agregarle un parametro de config
function DES_E(word, key) {

    let karray = new Array()
    karray = kgen(key)
    let t
    t = Shuffle(word, ip)

}
// algorito de desencripcion
function DES_D(cipher, key) {




}