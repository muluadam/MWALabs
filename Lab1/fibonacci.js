
  const fibonacci=function(number){
      if(number<2)return 1;
      else{
          return fibonacci(number-1)+fibonacci(number-2)
      }
    
}

module.exports={
    fibonacci: fibonacci
}

 console.log("Fibonacci of 30:  "+fibonacci(30));
 console.log("Fibonacci of -10:  "+fibonacci(-10));