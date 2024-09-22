import Banner from "./Banner";
import CallUs from "./CallUs";
import Category from "./Category";
import ChefRecommand from "./ChefRecommand";
import ChefService from "./ChefService";
import Featured from "./Featured";
import FeaturedMenu from "./FeaturedMenu";
import Testimonials from "./Testimonials/Testimonials";
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
                <link rel="canonical" href="" />
            </Helmet>

            <Banner></Banner>
            <div className='max-w-7xl mx-auto space-y-10'>
                <Category></Category>
                <ChefService></ChefService>
                <FeaturedMenu></FeaturedMenu>
                <CallUs></CallUs>
                <ChefRecommand></ChefRecommand>
            </div>
            <Featured></Featured>
            <div className='max-w-7xl mx-auto py-16'>
                <Testimonials></Testimonials>
            </div>
        </div>
    );
};

export default Home;