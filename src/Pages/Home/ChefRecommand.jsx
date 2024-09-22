import { useEffect, useState } from "react";
import SectionTitle from "../Shared/SectionTitle";
import ItemsCard from "../Shared/ItemsCard";

const ChefRecommand = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://bistro-boss-server-five-rho.vercel.app/chefsRecommend')
            .then(res => res.json())
            .then(data => setItems(data));
    }, [])

    return (
        <div className="pb-16">
            <div>
                <SectionTitle heading={'CHEF RECOMMENDS'} subheading={'---Should Try---'}></SectionTitle>
            </div>

            <div className='my-10 grid lg:grid-flow-col gap-5 justify-around'>
                {
                    items?.map(item => <ItemsCard key={item._id} item={item}></ItemsCard>)
                }
            </div>

        </div>
    );
};

export default ChefRecommand;