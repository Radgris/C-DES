/*

use bitwise operation to manipulate bits, these operation can be used with decimal numbers and will directly convert internally to bit operations
note: the operation that requires us to "cycle" bits is still pending, probably a custom function: https://stackoverflow.com/a/1768055
we also need a function that takes 2 array of bits ( not necesarrily an array structure) and shifts array A based on array's B content: (bit access)https://stackoverflow.com/a/9954810
https://www.w3schools.com/js/js_bitwise.asp

*/


//valores por default que se necesitan
const p10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6]
const p8 = [6, 3, 7, 4, 8, 5, 10, 9]
const ip = [2, 6, 3, 1, 4, 8, 5, 7]
const ipm = [4, 1, 3, 5, 7, 2, 8, 6]
const ep = [4, 1, 2, 3, 2, 3, 4, 1]
const p4 = [2, 4, 3, 1]

const s0 = [
    [1, 0, 3, 2],
    [3, 2, 1, 0],
    [0, 2, 1, 3],
    [3, 1, 3, 2]
]

const s1 = [
    [0, 1, 2, 3],
    [2, 0, 1, 3],
    [3, 0, 1, 0],
    [2, 1, 0, 3]
]

const testKey = [1, 1, 0, 0, 0, 1, 1, 1, 1, 0]

const testWord = [0, 0, 1, 0, 1, 0, 0, 0]

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

// funcion que genera un arreglo binario que representa un numero decimal
function natural_number(base, digits) {
    var n = 0;
    for (var i = 0; i < digits.length; i++) {
        n += digits[i];
        if (i + 1 < digits.length) {
            n *= base;
        }
    }
    return n;
}

//funcion que genera un numero decimal a partir de un arreglo que representa un numero binario
function explode_natural_number(base, number) {
    var remainder, exploded = [];
    while (number) {
        remainder = number % base;
        exploded.unshift(remainder);
        number = (number - remainder) / base;
    }
    return exploded.length ? exploded : [0];
}

//function xor
function exor(a,b)
{
    c=a.toString().split('')
    d=b.toString().split('')

    exored=[]
    for(var i=0; i<c.length;i++)
    {
        if (c[i]==d[i])
        {
            exored.push(0);
        }
        else
        {
            exored.push(1);
        }
    }
    return exored;
}

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


        }
//another interation of split
const splitAt = index => x => [x.slice(0, index), x.slice(index)]

//takes 2 array and makes them one
function Stitch(arr1, arr2) {
    let result = new Array()

    for (i = 0; i < arr1.length; i++) {
        result.push(arr1[i])
    }
    for (i = 0; i < arr2.length; i++) {
        result.push(arr2[i])
    }

    return result
}

//console.log(Shift("0100101", 3))
//console.log(Shuffle([1,1,0,0,0,1,1,1,1,0],[3,5,2,7,4,10,1,9,8,6]))
//console.log(Shuffle(testKey, p10))
//console.log(Shuffle("1100011110",p10))
//console.log(splitAt(2)("abcde"))
//console.log(stitch("abc","def"))

//funcion que genera k1 y k2 a partir de una llave de 10 bits
function kgen(key) {

    let result = new Array()

    let t
    let u = new Array()

    t = Shuffle(key, p10)

    console.log("key through p10 : " + t)
    t = splitAt((t.length / 2))(t)
    console.log("key through first split : " + t[0] + " and " + t[1])
    t[0] = Shift(t[0], 1)
    t[1] = Shift(t[1], 1)
    console.log("key fragments through shifts for k1 : " + t[0] + " and " + t[1])
    //aqui no recuerdo si es un shift de -1 o de -2 sobre del anterior
    u[0] = Shift(t[0], 2)
    u[1] = Shift(t[1], 2)
    console.log("key fragments through  another shift for k2 : " + u[0] + " and " + u[1])

    let k1
    let k2

    k1 = Stitch(t[0], t[1])
    k2 = Stitch(u[0], u[1])

    k1 = Shuffle(k1, p8)
    k2 = Shuffle(k2, p8)

    result[0] = k1
    result[1] = k2

    //k1 and k2 might return more elements than what we want
    return result
}

let r = kgen(testKey)
console.log("keys are: " + r[0]+ " and k2:" + r[1])


//NOT IMPLEMENTED : funcion que utilizar XOR y matrices, implementar  comportarmiento en funciones separadas 
function fk(a, b, tempk) {
    //this will not work
    let t = Shuffle(b, ep)
    //XOR operation that returns a 8-element array
    let xorresult
    xorresult = splitAt((xorresult.length / 2))(xorresult)
    letu = Array()
    u = matrixShuffle(xorresult[0], xorresult[1])

    
}




function matrixShuffle(a, b) {

    let t = new Array()
    let u = new Array()
    let v = new Array()
    let w = new Array()
    let y = new Array()
    t = [a[0],
        a[3]
    ]
    u = natural_number(2, t)
    t = [a[1],
        a[2]
    ]
    v = natural_number(2, t)

    t = [b[0],
        b[3]
    ]
    w = natural_number(2, t)
    t = [b[1],
        b[2]
    ]
    y = natural_number(2, t)

    let h = s0[u][v]
    let j = new Array()

    j = explode_natural_number(10, h)

    let i = s1[w][y]

    let k = new Array()

    k = explode_natural_number(10, i)

    let l = new Array()
    l = Stitch(j, k)

    l = Shuffle(l, p4)

    return l

}

//NOT IMPLEMENTED: no estoy seguro de que hace este paso asi que dejo este placeholder aqui
function sw() {

}

// el algoritmo en si, quizas sea mejor usar el mismo para Desencripcion y encripcion y agregarle un parametro de config
function S_DES(word, key, mode) {

    let karray = new Array()
    karray = kgen(key)
    let t = new Array()
    let t = Shuffle(word, ip)
    let t = splitAt((t.length / 2))(t)
    //we might need to parse karray elements into strings before sending as arguments
    if (mode == "E") {
        t = fk(t[0], t[1], karray[0])
        t = fk(t[1], t[0], karray[1])
    } else if (mode == "D") {
        t = fk(t[0], t[1], karray[1])
        t = fk(t[1], t[0], karray[0])
    } else {
        return "boom goes the dynamite"
    }


    let u = Stitch(t[0], t[1])
    u = Shuffle(u, ipm)

    return u;

}

//S_DES(testWord, testKey, E)