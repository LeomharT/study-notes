import { Button, Callout, Intent } from "@blueprintjs/core";
import { makeAutoObservable, observable, when } from "mobx";
import { observer } from "mobx-react-lite";


class MyResource
{
    constructor()
    {
        makeAutoObservable(this, {
            isVisible: observable
        });

        //第一个函数返回值第一次为true时会执行第二个函数,只会执行一次,然后释放掉.
        when(() =>
        {
            return this.isVisible;
        }, () =>
        {
            console.log('v');
        });
    }


    public isVisible: boolean = false;


    public visible = () =>
    {
        this.isVisible = !this.isVisible;
    };
}

const resource = new MyResource();


function WhenExample()
{
    return (
        <div>
            <Button
                text="++"
                onClick={resource.visible}
            />
            {resource.isVisible && <Callout intent={Intent.SUCCESS} title='我看见看见你了' icon='eye-open' />}
        </div>
    );
}


export default observer(WhenExample);
