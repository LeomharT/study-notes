interface Animal
{
    cat: string;
    dog: string;
    rat: string;
}
interface B
{
    name: string;
    age: string;
}

let aa: Record<keyof Animal, B>;
aa = {
    cat: {
        name: '',
        age: ''
    },
    dog: {
        name: '',
        age: ''
    },
    rat: {
        name: '',
        age: ''
    },
};
