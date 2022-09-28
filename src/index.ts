//Numbers: With long numbers you can use underscores to separate its digits
//This helps with code legibility
let someReallyBigNumber = 123_456_789;


//The 'any' type is used when a variable type is not declared and its
//value is not initialized. When initializing a variable, the compiler
//infers the type, but if we don't provide either the type or a value, 
//the any type will be assigned to the variable and we should
//definitely avoid this. Best practice is to annotate or initialize.
let x; //any type
let y: number; //number type
let z = 1; //number type






// Arrays. TypeScript allows us to statically type the arrays
// so that every element of it is checked to be the same type
// Adding an element of any type other than number to the array will throw an error
let nums: number[];
nums = [1, 2, 3];




//Tuples. Best practice is to only use 2 values for code legibility.
//tuples allow us to define the exact number of elements of an array,
//as well as defining their type.
//A gap of typescript is that you can still use methods of the arrays like push.
//This might create some bugs, beware!
let user: [number, string] = [1, 'sam'];
user.push('I am an infiltrated element')




//Enums. Always use const in enums since this allows the compiler to create
//a much more optimized JavaScript code. The compiler can automatically
//assign ascendant numeric values. This feature can also be used while
//specifying the first number and the compiler starts ascending from there.
//In this case, Medium will have a value of 2 and Large will have a value of 3
//because Small was initialized with 1.
const enum Size { Small = 1, Medium, Large};
let mySize = Size.Medium;

//Functions. While using functions, the best practice is to annotate every
//parameter type as well as the function type to avoid bugs.
//Also, it is very well recommended to enable these three compiler settings:
//noUnusedParameters, noImplicitReturns and noUnusedLocals (tsconfig.json)
//note how taxYear becomes an optional parameter by assigning a default value to it.
//If the function is called without specifying taxYear, its value will be 2022.
//Otherwise, the taxYear value will be overwritten
function calculateTax(income: number, taxYear = 2022): number{
    if(taxYear < 2022){
        return income * 1.2;
    }else{
        return income * 1.3;
    }
}




//Objects. While using objects in typescript, you can also annotate their 
//properties and the value type of the properties, as well as annotating
//the index signature. This prevents the program to add new properties that
//were not specified in declaration. The typescript compiler can also infer
//the property type if it is initialized with a value. When initializing an object,
//if a declared property is not provided, an error will pop up. This can be solved
//by initializing with null, undefined or empty string (if the property is a string).
//Using the question mark ? to make a property optional is also possible but not
//very recommended, it depends if it makes sense to make the property optional
//(like fax, for example). The readonly keyword can be used to prevent a property
//from changing its value once it is initialized. this keyword can also be used
//in index signature. A property can also be a function where
//the arrow syntax is used.
let employee: {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
} = {
    id: 1,
    name: 'Sam',
    retire: (date: Date) => {
        console.log(date);
    }
}

//type alias. Following the DRY Principle (Don't repeat yourself), the "type"
//keyword can be used to specify a custom data type. Pascal Case must be used.
//type aliases allows us to specify the employee type just once throughout our code.
type Employee = {
    readonly id: number,
    name: string,
    retire: (date: Date) => void    
}

let employee2: Employee = {
    id: 2,
    name: 'Mosh',
    retire: (date: Date) => {
        console.log(date);
    }
}

//Union types. A vertical bar (|) can be used to indicate to the compiler that
//a variable can take one type of value or another. The Narrowing technique can
//also be used to specify different code paths depending on the 
//variable type.
function kgToLbs(weight: number | string): number {
    //Narrowing
    if (typeof weight === 'number')
        return weight * 2.2;
    else
        return parseInt(weight) * 2.2;
}


//intersection types. An ampersand (&) can be used to indicate that 
//a type can be of another two types at the same time. for example:
type Draggable = {
    drag: () => void
};

type Resizable = {
    resize: () => void
};

type UIWidget = Draggable & Resizable;

//The UIWidget type is both draggable and resizable. To initialize 
//an instance of this type, every property of both types must be used.

let textBox: UIWidget = {
    drag: () => {},
    resize: () => {}
}


//Literal types. Specific values can be assigned to variables or types
//so that they can only take those specific values and nothing else.

type Quantity = 50 | 100;
let quantity: Quantity = 100;

type Metric = 'cm' | 'inch' | 'ft' | 'yard'

//null in typescript. By default, null types cant be used in typescript,
//but we can use a union operator yo specify different code paths
//in case we have a null or even an undefined as well.
function greet(name: string | null | undefined) {
    name ? console.log(name.toUpperCase()) : console.log('Hola')
}

greet('sam');

//Optional chaining. The ?. operator helps us check if the value of a property,
//an element (of an array) or a function is set to null or undefined.
type Customer = {
    birthday?: Date
};

function getCustomer(id: number): Customer | null | undefined {
    return id === 0 ? null: {birthday: new Date()};
}

let customer = getCustomer(1);
//Optional property access operator
console.log(customer?.birthday?.getFullYear());

//Optional element access operator
//customers?.[0]

//Optional call
let log: any = null;
log?.('a');

