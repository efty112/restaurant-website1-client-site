import PageBanner from "../Shared/PageBanner";
import image from '../../assets/shop/banner2.jpg'
import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from "react";
import useMenu from "../../CustomHooks/useMenu";
import ItemCard from "./ItemCard";
import { useParams } from "react-router-dom";


const OurShop = () => {
    const { category } = useParams();

    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const indexOfCategory = categories.indexOf(category)

    const [tabIndex, setTabIndex] = useState(indexOfCategory);
    const [items, loading] = useMenu();

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page when the component mounts
    }, []);

    function filterItems(itemName) {
        return items?.filter(item => item.category == itemName);
    }

    const drinkItems = filterItems('drinks');
    const dessertItems = filterItems('dessert');
    const pizzaItems = filterItems('pizza');
    const saladItems = filterItems('salad');
    const soupItems = filterItems('soup');


    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Shop</title>
                <link rel="canonical" href="" />
            </Helmet>
            <div>
                <PageBanner image={image} heading={'Our Shop'} subheading='Would you like to try a dish?'></PageBanner>
            </div>

            {
                loading ? <span className="loading loading-spinner loading-lg"></span> :
                    <div className="max-w-7xl mx-auto text-center my-20">
                        <Tabs className='text-xl' defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                            <TabList>
                                {
                                    categories.map(category => {
                                        return <Tab key={category[0]}>{category.toUpperCase()}</Tab>
                                    })
                                }
                            </TabList>

                            {/* Salad Items */}
                            <TabPanel>
                                <div className="lg:grid lg:grid-cols-3 flex flex-col items-center gap-5">
                                    {
                                        saladItems.map(item => <ItemCard item={item} key={item._id}></ItemCard>)
                                    }
                                </div>
                            </TabPanel>

                            {/* Pizza Items */}
                            <TabPanel>
                                <div className="lg:grid lg:grid-cols-3 flex flex-col items-center gap-5">
                                    {
                                        pizzaItems.map(item => <ItemCard item={item} key={item._id}></ItemCard>)
                                    }
                                </div>
                            </TabPanel>

                            {/* Soup Items */}
                            <TabPanel>
                                <div className="lg:grid lg:grid-cols-3 flex flex-col items-center gap-5">
                                    {
                                        soupItems.map(item => <ItemCard item={item} key={item._id}></ItemCard>)
                                    }
                                </div>
                            </TabPanel>

                            {/* Dessert Items */}
                            <TabPanel>
                                <div className="lg:grid lg:grid-cols-3 flex flex-col items-center gap-5">
                                    {
                                        dessertItems.map(item => <ItemCard item={item} key={item._id}></ItemCard>)
                                    }
                                </div>
                            </TabPanel>

                            {/* Drinks Items */}
                            <TabPanel>
                                <div className="lg:grid lg:grid-cols-3 flex flex-col items-center gap-5">
                                    {
                                        drinkItems.map(item => <ItemCard item={item} key={item._id}></ItemCard>)
                                    }
                                </div>
                            </TabPanel>

                        </Tabs>

                    </div>
            }


        </div>
    );
};

export default OurShop;