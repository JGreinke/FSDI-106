
//this is an object constructor function
function Dog(name,age,color){
    this.name=name; 
    this.age=age;
    this.color=color;
}

class Cat{
    constructor(name,age){
        this.name=name; 
        this.age=age;
    }

    roar(){
        console.log("I'm roarrrring!");
    }
}

function test1(){
    //ways to create an object on JS

    // 1- object literal is really only good for when you have one object --good for fast input but bad for variety
    let lola = {
        name:"lola", 
        age: "2"
    }; 
    console.log(lola);
    
    // 2- object constructor && class will have capital letters
    //ex.function Dog can be used multiple times
    let fido = new Dog("Fido",2,"brown");
    console.log(fido);

    // 3-class
    let arwen = new Cat("Arwen",2);
    console.log(arwen);
    arwen.roar();
}

test1(); 