
function recursiveFeb(n){
    if(n<0) return 0;
    if(n<=2)return 1;
    else
    return recursiveFeb(n-1)+recursiveFeb(n-2);
}
function doPromise(n) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
          
         resolve(recursiveFeb(n))
        },   1000);
    });
}

let feb10 = doPromise(10).then(success => console.log(success) );
let feb42 = doPromise(42).then(success => console.log(success));
let feb0 = doPromise(0).then(success => console.log(success) );