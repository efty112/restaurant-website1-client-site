import PageBanner from "../Shared/PageBanner";
import image from '../../assets/menu/banner3.jpg'
import SectionTitle from "../Shared/SectionTitle";
import { Helmet } from "react-helmet-async";
import useMenu from "../../CustomHooks/useMenu";
import ItemBanner from "./Shared Things/ItemBanner";
import TypeWiseItem from "../Shared/TypeWiseItem";

const OurMenu = () => {
    const [items, loading] = useMenu();

    const popularItems = items?.filter(item => item.category === 'popular');
    const dessertItems = items?.filter(item => item.category === 'dessert');
    const pizzaItems = items?.filter(item => item.category === 'pizza');
    const saladItems = items?.filter(item => item.category === 'salad');
    const soupItems = items?.filter(item => item.category === 'soup');
    
    return (
        <div >
            <Helmet>
                <title>Bistro Boss | Menu</title>
                <link rel="canonical" href="" />
            </Helmet>

            <div>
                <PageBanner image={image} heading={'Our Menu'} subheading='Would you like to try a dish?'></PageBanner>
            </div>

            <div className="my-16 max-w-7xl mx-auto">
                <div>
                    <SectionTitle heading={`TODAY'S OFFER`} subheading={`---Don't miss---`}></SectionTitle>
                </div>

                {/* Popular Items */}
                <TypeWiseItem loading={loading} title={'salad'} itemType={popularItems}></TypeWiseItem>


                {/* Dessert Items */}
                <div className='my-10'>
                    <ItemBanner heading={'DESSERTS'} subheading='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'></ItemBanner>
                </div>
                <TypeWiseItem loading={loading} title={'dessert'} itemType={dessertItems}></TypeWiseItem>


                {/* Pizzas */}
                <div className='my-10'>
                    <ItemBanner heading={'Pizza'} subheading='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'></ItemBanner>
                </div>
                <TypeWiseItem loading={loading} title={'pizza'} itemType={pizzaItems}></TypeWiseItem>


                {/* Salads */}
                <div className='my-10'>
                    <ItemBanner heading={'salads'} subheading='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'></ItemBanner>
                </div>
                <TypeWiseItem loading={loading} title={'salad'} itemType={saladItems}></TypeWiseItem>


                {/* Soups */}
                <div className='my-10'>
                    <ItemBanner heading={'soups'} subheading='Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'></ItemBanner>
                </div>
                <TypeWiseItem loading={loading} title={'soup'} itemType={soupItems}></TypeWiseItem>
            </div>
        </div>
    );
};

export default OurMenu;