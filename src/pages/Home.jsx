import { BsFillPencilFill } from 'react-icons/bs';

import Card from '../Components/Card';
import HomeLayout from './../Layouts/HomeLayout';

export default function Home() {
  return (
    <HomeLayout>
         <Card>
                <BsFillPencilFill className='inline mr-2' />
            </Card>
            <Card status={30} background='bg-yellow-300' borderColor='border-green-300' fontColor='text-black' dividerColor='bg-black'>
                <BsFillPencilFill className='inline mr-2' />
            </Card>
    </HomeLayout>   
  );
}
