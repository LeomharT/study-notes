import { Button } from '@blueprintjs/core';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import './assets/index.scss';

class Store
{
    constructor()
    {

    }

    public count: number = 1;

    public add()
    {
        this.count++;
    }
}

const store = new Store();


const log = autorun(() =>
{
    console.log(store.count);
});


const Spinner = observer(() =>
{
    return (
        <div className="spinner">
            <Button onClick={() => store.add()}>++</Button>
            {
                store.count
            }
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" >
                <circle cx="25" cy="25" r="20" stroke="black" strokeWidth="2" fill="none" />
            </svg>
        </div>
    );
});


export default Spinner;
