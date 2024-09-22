import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import '../Shared/custombtn.css'
import PropTypes from 'prop-types';
import useAuth from '../../CustomHooks/useAuth';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../CustomHooks/useAxiosSecure';
import useCart from '../../CustomHooks/useCart';

const ItemCard = ({ item }) => {
    const { _id, image, name, recipe, price } = item;
    const [, refetch] = useCart();

    const navigate = useNavigate()
    const location = useLocation();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleAddToCart = () => {
        if (user && user.email) {

            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }

            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-start",
                            icon: "success",
                            title: "Successfully added to cart",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch();
                    }
                })
        }

        else {
            Swal.fire({
                title: "You're not logged-in!",
                text: "Please, LogIn first!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "LogIn"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: location.pathname });
                }
            });
        }
    }

    return (
        <div>
            <div className="card card-compact bg-[#f3f3f3] w-96 h-full shadow-xl flex flex-col">
                <figure>
                    <p className='absolute text-white text-base p-2 bg-[#111827] top-4 right-3'>${price}</p>
                    <img
                        className='w-full h-64'
                        src={image}
                        alt="Food" />
                </figure>

                <div className="text-center flex-grow px-3">
                    <h2 className="text-xl font-bold my-5">{name}</h2>
                    <p className="text-base">{recipe.length > 150 ? recipe.slice(0,150) + '....' : recipe}</p>
                </div>

                <div className="card-actions justify-center my-4">
                    <button onClick={handleAddToCart}>
                        <AwesomeButton className='uppercase' type="primary">Add to cart</AwesomeButton>
                    </button>
                </div>
            </div>
        </div>
    );
};

ItemCard.propTypes = {
    item: PropTypes.object
}

export default ItemCard;