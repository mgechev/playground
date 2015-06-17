// Simple typescript playground

module Test {
  export class Human {
    // Automatically assigns name and age
    // adds them to the current context, i.e.
    // they are private only compile time
    constructor(private name:string, private age:number) {
    }
    // Adds it to the prototype
    // Private only compile time
    private doPrivateStuff() {
    }
    // Provides two different signatures
    // for doStaticStuff
    static doStaticStuff(name: string): void;
    static doStaticStuff() {

    }
  }

  // Interface definition
  // could be implemented
  interface IHero {
    firstName: string;
    fightBadGuys(badGuys:string[]):void
  }
  // or used with duck typing
  // however, not completely sure how duck is
  // this typing because of the static typing here
  let hero: IHero = {
    firstName: 'Minko',
    fightBadGuys(badGuys:string[]) {
    }
  };

  let a = new Human('1', 2);
  // Callback typing
  let callback:{ (name:string):void };
  callback = (name:string) => console.log(name);
  // Will suggest type for the anonymous arrow function
  callback = (name) => console.log(name);
  callback("asd");

  declare var foobar;
  foobar.bar();
}