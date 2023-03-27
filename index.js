const fs = require("fs")


function CalcSol(input, number){
    //if(input.length != 4) throw "Too many or few Numbers!";
    /*
    for(let i = 0; i < input.length; i++){
        if(!Number.isInteger(input[i])) throw `The ${i + 1} input is not a whole number!`;
        if(input[i] < 0 || input[i] > 10) throw `The ${i + 1} number is not between 1 and 10!`;
    }
    */

    // Input = [1,2,3,4]

    let res = Calc24(input,input.join(","), number);

    if(res.bool){
        return res.str;
    }

    for(let i = 1; i <= number*2; i++){
        let str = "";
        let resOben = Calc24(input,input.join(","), number + i);
        if(resOben.bool){
            str += resOben.str
        }
        let resUnten = Calc24(input,input.join(","), number - i);
        if(resUnten.bool){
            if(resOben.bool){
                str += "\n" + resUnten.str;
            }else{
                str += resUnten.str;
            }
        }
        if(resOben.bool || resUnten.bool){
            return str;
        }
    }
}

const Operations = ["+","-","--","*","/","//","^","^^"];

function Calc24(input, string, target){
    if(input.length == 1) {
        if(input[0] == target){
            return {str: string + " = " + target, bool: true}
        }
        return {str: string, bool: false}
    }
    for(let i = 0; i < input.length; i++){
        for(let j = (i+1); j < input.length; j++){
            for(let k = 0; k < Operations.length; k++){
                let combo = comb(input,i,j,Operations[k]);
                let res = Calc24(combo.res, string + " => " + combo.str,target);
                if(res.bool){
                    return res;
                }
            }
        }
    }
    return {str: string, bool: false}
}

function comb(input,i,j,op){
    // i < j
    let res = [];
    let str = "";
    if(op == "+"){
        for(let k = 0; k < input.length; k++){
            if(k != i && k!= j){
                res.push(input[k]);
                str = str + input[k] + ","
            }else if(k == i){
                res.push(input[i] + input[j])
                if(input[j] < 0){
                    str = str + input[i] + "+(" + input[j] + "),"
                }else{
                    str = str + input[i] + "+" + input[j] + ","
                }
            }else if(k == j){
                //Do nothing!
            }
        }
    }else if(op == "-"){
        for(let k = 0; k < input.length; k++){
            if(k != i && k!= j){
                res.push(input[k]);
                str = str + input[k] + ","
            }else if(k == i){
                res.push(input[i] - input[j])
                if(input[j] < 0){
                    str = str + input[i] + "-(" + input[j] + "),"
                }else{
                    str = str + input[i] + "-" + input[j] + ","
                }
            }else if(k == j){
                //Do nothing!
            }
        }
    }else if(op == "--"){
        for(let k = 0; k < input.length; k++){
            if(k != i && k!= j){
                res.push(input[k]);
                str = str + input[k] + ","
            }else if(k == i){
                res.push(input[j] - input[i])
                if(input[i] < 0){
                    str = str + input[j] + "-(" + input[i] + "),"
                }else{
                    str = str + input[j] + "-" + input[i] + ","
                }
            }else if(k == j){
                //Do nothing!
            }
        }
    }else if(op == "*"){
        for(let k = 0; k < input.length; k++){
            if(k != i && k!= j){
                res.push(input[k]);
                str = str + input[k] + ","
            }else if(k == i){
                res.push(input[i] * input[j])
                if(input[j] < 0){
                    str = str + input[i] + "*(" + input[j] + "),"
                }else{
                    str = str + input[i] + "*" + input[j] + ","
                }
            }else if(k == j){
                //Do nothing!
            }
        }
    }else if(op == "/"){
        for(let k = 0; k < input.length; k++){
            if(k != i && k!= j){
                res.push(input[k]);
                str = str + input[k] + ","
            }else if(k == i){
                res.push(input[i] / input[j])
                if(input[j] < 0){
                    str = str + input[i] + "/(" + input[j] + "),"
                }else{
                    str = str + input[i] + "/" + input[j] + ","
                }
            }else if(k == j){
                //Do nothing!
            }
        }
    }else if(op == "//"){
        for(let k = 0; k < input.length; k++){
            if(k != i && k!= j){
                res.push(input[k]);
                str = str + input[k] + ","
            }else if(k == i){
                res.push(input[j] / input[i])
                if(input[i] < 0){
                    str = str + input[j] + "/(" + input[i] + "),"
                }else{
                    str = str + input[j] + "/" + input[i] + ","
                }
            }else if(k == j){
                //Do nothing!
            }
        }
    }else if(op == "^"){
        for(let k = 0; k < input.length; k++){
            if(k != i && k!= j){
                res.push(input[k]);
                str = str + input[k] + ","
            }else if(k == i){
                res.push(Math.pow(input[i] , input[j]))
                if(input[j] < 0){
                    str = str + input[i] + "^(" + input[j] + "),"
                }else{
                    str = str + input[i] + "^" + input[j] + ","
                }
            }else if(k == j){
                //Do nothing!
            }
        }
    }else if(op == "^^"){
        for(let k = 0; k < input.length; k++){
            if(k != i && k!= j){
                res.push(input[k]);
                str = str + input[k] + ","
            }else if(k == i){
                res.push(Math.pow(input[j] , input[i]))
                if(input[i] < 0){
                    str = str + input[j] + "^(" + input[i] + "),"
                }else{
                    str = str + input[j] + "^" + input[i] + ","
                }
            }else if(k == j){
                //Do nothing!
            }
        }
    }
    return {res: res, str: str.slice(0, -1)};
}

const Input = [ 24,24,24,24 ];

//console.log(CalcSol(...Input))

/*
for(let i = 1; i <= 10; i++){
    console.log(CalcSol(...[i,i,i,i]))
}
*/

let file = ""

let maxNumb = 12;



for (let i = 1; i <= maxNumb; i++) {
    for (let j = i; j <= maxNumb; j++) {
        for (let k = j; k <= maxNumb; k++) {
            for (let l = k; l <= maxNumb; l++) {
                for (let m = l; m <= maxNumb; m++) {
                    file = file + "\n\n" + CalcSol([i,j,k,l,m],36);
                    console.log(i,j,k,l,m);
                }
            }
        }
    }
}

fs.writeFileSync("Lösungen/res36-12-5.txt",file,"utf-8")

function ConvertNumber(num){
    let First = Math.round(num - 10*Math.floor(num/10));
    let Second = Math.round(num/10 - 10*Math.floor(num/100) - First/10);
    let Third = Math.round(num/100 - 10*Math.floor(num/1000) - First/100 - Second/10);
    let Fourth = Math.round(num/1000 - 10*Math.floor(num/10000) - First/1000 - Second/100 - Third/10);
    return[Fourth + 1,Third + 1,Second + 1,First + 1];
}

function Contains(List, array){
    for(let i = 0; i < List.length; i++){
        let bool = true;
        for (let j = 0; j < array.length; j++) {
            if(array[j] != List[i][j]){
                bool = false;
            }
        }
        if(bool){
            return true;
        }
    }
    return false;
}
/*
let sum = 0;

for(let i = 1; i <= 10; i++){
    for(let j = 1; j <= i; j++){
        sum += j*(j + 1);
    }
}

sum = sum/2

console.log(sum);
*/

async function start(pause){
    while(true){
        let numb = ConvertNumber(Math.floor(Math.random()*10000));
        console.log(numb)
        await Sleep(pause);
        console.log(CalcSol(...numb));
        await Sleep(pause);
    }
}


function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

//start(20000)