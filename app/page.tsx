import { Metadata } from 'next';
import HomePage from '@/components/homepage/page';
import { homePageMetaData } from '@/constants';


export const metadata: Metadata = homePageMetaData;


export default function Home() {


  return (
    <HomePage></HomePage>
  );
}