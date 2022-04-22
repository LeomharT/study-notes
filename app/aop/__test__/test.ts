
class Person
{
    constructor()
    {
        this.name = 'lzy';
        this.age = '22';
        this.address = 'sw';
    }
    private name: string;
    private age: string;
    private address: string;
    SayHi = () =>
    {

    };
    ChangeName = (name: string) =>
    {
        this.name = name;
    };
}
const person = new Person();
Begin(person, person.ChangeName, (name: string) =>
{
    person.ChangeName("只要该名字我就是你的名字");
});


const app = new WeakMap<Object, number>();
const b = [12333];
app.set(b, 21);
console.log(app.get(b));
function Begin(person: Person, ChangeName: (name: string) => void, arg2: (name: string) => void)
{
    throw new Error("Function not implemented.");
}
