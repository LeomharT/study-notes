import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';
import UserStore from '../stores/UserStore';

class App extends Component
{
    constructor(props: any)
    {
        super(props);

        makeObservable(this, {
            name: observable,
        });
    }
    public name: number = 123;

    UserStore: UserStore = UserStore.GetInstance();

    render()
    {
        return (
            <div>
                {this.name}
                {this.UserStore.person.name}
                {
                    this.UserStore.person.age
                }
                <button onClick={e =>
                {
                    this.name++;
                    console.log(this.name);
                    this.UserStore.person.age++;
                    this.UserStore.person.name = '🐎';
                }}>
                    gogo
                </button>
            </div>
        );
    }
}

export default observer(App);
