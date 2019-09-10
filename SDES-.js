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

const testEncryption = [1, 0, 0, 0, 1, 0, 1, 0]

//function que lee el .txt dentro de la misma carpeta que el archivo y lo transforma en un array
function reader() {
    var fs = require('fs');
    var path = process.cwd();
    var buffer = fs.readFileSync(path + "\\Pairs1001100100.txt").toString();
    var plainText = buffer.split(/[/\n]/);
    return plainText;
}

// funcion que regresa un numero decimal a partir de un arreglo binbario
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

//funcion que genera un numero binario en forma de arreglo a partir de un decimal
function explode_natural_number(base, number) {
    var remainder, exploded = [];
    while (number) {
        remainder = number % base;
        exploded.unshift(remainder);
        number = (number - remainder) / base;
    }
    return exploded.length ? exploded : [0];
}

//funcion xor
function exor(c, d) {

    exored = []
    for (var i = 0; i < c.length; i++) {
        if (c[i] == d[i]) {
            exored.push(0);
        } else {
            exored.push(1);
        }
    }
    return exored;
}

function equalArrays(a, b) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
}

//function pair selector
function randomPairSelector(max_value) {
    let x = Math.floor(Math.random() * max_value);
    x += (x % 2 == 0 ? 1 : 0);
    return x;
}

//funcion que toma un arreglo y un numero de casillas, luego cicla los elementos por el numero
function Shift(input, offset) {

    let result = new Array()

    for (var i = 0; i < input.length; i++) {

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

//funcion que genera k1 y k2 a partir de una llave de 10 bits
function kgen(key) {

    let result = new Array()

    let t
    let u = new Array()

    t = Shuffle(key, p10)

    t = splitAt((t.length / 2))(t)
    t[0] = Shift(t[0], 1)
    t[1] = Shift(t[1], 1)
    u[0] = Shift(t[0], 2)
    u[1] = Shift(t[1], 2)

    let k1
    let k2

    k1 = Stitch(t[0], t[1])
    k2 = Stitch(u[0], u[1])

    k1 = Shuffle(k1, p8)
    k2 = Shuffle(k2, p8)

    result[0] = k1
    result[1] = k2

    return result
}

//does the matrix part of the FK portion
function matrixShuffle(a, b) {

    //console.log("A EQUALS " + a)
    //console.log("B EQUALS " + b)

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
    let i = s1[w][y]
    let k = new Array()

    j = explode_natural_number(2, h)
    k = explode_natural_number(2, i)

    if (j == 0) {
        j = [0, 0]
    }

    if (k == 0) {
        k = [0, 0]
    }

    if (j == 1) {
        j = [0, 1]
    }

    if (k == 1) {
        k = [0, 1]
    }

    let l = new Array()
    l = Stitch(j, k)
    l = Shuffle(l, p4)

    return l

}

//funcion que utilizar XOR y matrices, implementar  comportarmiento en funciones separadas 
function fk(a, b, tempk) {

    let t = Array()
    t = Stitch(b, b)
    t = Shuffle(t, ep)

    //console.log('running exor with: ' + t + "and: " + tempk)

    let xorresult = exor(t, tempk)

    xorresult = splitAt((xorresult.length / 2))(xorresult)
    let u = Array()
    u = matrixShuffle(xorresult[0], xorresult[1])

    xorresult = exor(a, u)

    let result = new Array()

    result[0] = xorresult
    result[1] = b

    return result
}

// el algoritmo en si, quizas sea mejor usar el mismo para Desencripcion y encripcion y agregarle un parametro de config
function S_DES(word, key, mode) {

    console.log("\n Input:" + word)
    console.log("\n key:" + key)
    console.log("\n mode:" + mode + "\n")


    let karray = new Array()
    karray = kgen(key)
    let t = new Array()
    t = Shuffle(word, ip)
    t = splitAt((t.length / 2))(t)

    //IMPORTANT we might need to parse karray elements into strings before sending as arguments
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

//funcion de bruteforce, recibe un ciphertext y una palabra
function Bruteforce() {
    let pairsArray = reader();
    let key = []

    for (var i = 0; i < pairsArray.length; i = i + 2) {
        let keycounter = 0;
        let done = false;
        let currentPair = i;
        let currentPlain = pairsArray[i];
        let currentCipher = pairsArray[i + 1];

        while (done == false) {
            //this part generates a key each cycle
            key = (keycounter.toString(2).split('').map(Number));

            while (key.length < 10) {
                key.unshift(0);
            }
            keycounter++;
            //here the key generator ends

            let karray = new Array()
            karray = kgen(key)
            let t = new Array()
            t = Shuffle(currentPlain, ip)
            t = splitAt((t.length / 2))(t)
            t = fk(t[0], t[1], karray[0])
            t = fk(t[1], t[0], karray[1])
            let u = Stitch(t[0], t[1])
            u = Shuffle(u, ipm)

            if (equalArrays(u, currentCipher)) {
                done = true;

                console.log('The key for the current plain ' + currentPlain + ' and the current cipher ' + currentCipher + ' is: ' + key +' ' +natural_number(2,key));
            }

            if (keycounter > 1024) {
                return 'AAAAAA';
            }

        }
    }
}


//console.log(S_DES(testWord,testKey,"E"))
//console.log(S_DES(testEncryption,testKey,"D"))
Bruteforce()