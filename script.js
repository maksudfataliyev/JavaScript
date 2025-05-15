// Task 1

function compare(a,b){
    if(a<b){
        return -1;
    }
    else if(a>b){
        return 1;
    }
    else{
        return 0;
    }
};

// Task 2

function factorial(a){
    let num = 1;
    for(let i = 1; i <= a; i++){
        num = num * i
    }

    return num
};

// Task 3

function combine(a,b,c){
    let num = '';
    let astr = a.toString()
    let bstr = b.toString()
    let cstr = c.toString()
    num = num + a + b + c;
    return parseInt(num);
};

// Task 4

function calculate(a,b=a){
    return b*a
};

// Task 5

function isComplete(a){
    if (a <=1){
        return false;
    }

    let sum = 0;
    for (let i = 1; i <= a / 2; i++) {  // Делим до половины числа
        if (a % i === 0) {  // Если i - делитель числа
            sum += i;
        }
    }

    return sum == a;
};

console.log(isComplete(6))


// Task 6

function range(a,b){
    let arr = [];
    for (let c=a; c<=b; c++){
        if (isComplete(c)){
            arr.push(c)
        }
    }

    return arr
};


// Task 7

