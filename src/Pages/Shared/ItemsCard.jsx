import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './custombtn.css'


const ItemsCard = ({ item }) => {
    const { image, name, recipe, price, category } = item;

    return (
        <div>
            <div className="card card-compact bg-[#f3f3f3] w-96 shadow-xl">
                <figure>
                    <img
                        className='w-full'
                        src={image}
                        alt="Food" />
                </figure>
                <div className="card-body text-center">
                    <h2 className="text-xl font-bold">{name + " " + category}</h2>
                    <p className="text-lg">{recipe}</p>
                    <p className="text-lg text-[#BB8506]">Price : ${price}</p>

                    <div className="card-actions justify-center">
                        <AwesomeButton className='uppercase' type="primary">Add to cart</AwesomeButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemsCard;