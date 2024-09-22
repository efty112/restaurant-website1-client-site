import SectionTitle from "../Shared/SectionTitle";
import useMenu from "../../CustomHooks/useMenu";
import TypeWiseItem from "../Shared/TypeWiseItem";

const FeaturedMenu = () => {
    const [items, loading] = useMenu();
    const popularItems = items?.filter(item => item.category === 'popular')

    return (
        <div>
            <SectionTitle heading='FROM OUR MENU' subheading='---Check it out---'></SectionTitle>
            <TypeWiseItem loading={loading} itemType={popularItems}></TypeWiseItem>
        </div>
    );
};

export default FeaturedMenu;