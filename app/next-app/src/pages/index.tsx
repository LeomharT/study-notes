import type { NextPage } from 'next';
import Demo from '../components/demo';


const Home: NextPage = (props: any) =>
{

    return (

        <div style={{ fontFamily: 'Greycliff CF', fontSize: "50px" }}>
            hahah我是index
            <Demo />
        </div>

    );
};

export default Home;
