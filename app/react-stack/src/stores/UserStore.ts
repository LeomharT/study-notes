import { makeAutoObservable } from "mobx";

export default class UserStore
{
    constructor()
    {
        makeAutoObservable(this);
    }

    person = {
        name: 'lzy', age: 21
    };


    static Instance: UserStore;

    static GetInstance(): UserStore
    {
        if (this.Instance) return this.Instance;
        this.Instance = new UserStore();
        return this.Instance;
    }

}
