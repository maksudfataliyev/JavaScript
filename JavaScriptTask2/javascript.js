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
    for (let i = 1; i <= a / 2; i++) {  
        if (a % i === 0) {  
            sum += i;
        }
    }

    return sum == a;
};



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

function displayTime(hours, minutes = 0, seconds = 0) {
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    console.log(formattedTime);
}

// Task 8
function timeToSeconds(hours, minutes = 0, seconds = 0) {
    return (hours * 3600) + (minutes * 60) + seconds;
}

//Task 9
function secondsToTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Task 10
function dateDifference(year1, month1, day1, hour1, minute1, second1, year2, month2, day2, hour2, minute2, second2) {
    const date1 = new Date(year1, month1 - 1, day1, hour1, minute1, second1);
    const date2 = new Date(year2, month2 - 1, day2, hour2, minute2, second2);
    
    const differenceInSeconds = Math.abs((date2 - date1) / 1000); 
    return secondsToTime(differenceInSeconds);
}

