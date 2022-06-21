class Animal
{
    constructor(name)
    {
    }
    name = {
        aaa: '123'
    };

    ok()
    {
        console.log(1);
    }
}


const a1 = new Animal('汪汪');

const a2 = new Animal('喵喵');

console.log(a1.hasOwnProperty('name'));
