import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";

const TypeWiseItem = ({ loading, itemType }) => {
    
    return (
        <div>
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:mx-0 mx-10 gap-x-10">
                {
                    loading ? <span className="loading loading-spinner loading-md mx-auto"></span> : itemType?.map(item => <MenuItems key={item._id} item={item}></MenuItems>)
                }
            </div>

            <Link className="flex justify-center my-10" to={`/ourshop/salad`}>
                <button className="btn btn-ghost uppercase border-b-black border-2">Order Your favourite Food</button>
            </Link>
        </div>
    );
};

export default TypeWiseItem;