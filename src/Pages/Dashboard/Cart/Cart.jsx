import { MdDelete } from "react-icons/md";
import useCart from "../../../CustomHooks/useCart";
import SectionTitle from "../../Shared/SectionTitle";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure();

    let totalPrice = cart.reduce((acc, curr) => {
        let total = parseFloat(acc) + parseFloat(curr.price)
        return total;
    }, 0)

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div>
                <SectionTitle heading={'WANNA ADD MORE?'} subheading={'---My Cart---'}></SectionTitle>
            </div>

            <div className="bg-white p-16 m-16">
                <div className="uppercase font-cinzel font-bold text-2xl flex items-center justify-between">
                    <h1>Total Orders: {cart.length} </h1>
                    <h1>Total Price: ${totalPrice} </h1>
                    {
                        cart.length > 0 ? <Link to='/dashboard/payment'>
                            <button className="btn bg-[#D1A054] text-white">Pay</button>
                        </Link> : ''
                    }

                </div>

                <div className="mt-6">
                    <div className="overflow-x-auto">
                        <table className="table text-xl">
                            {/* head */}
                            <thead className="text-xl text-center text-white bg-[#D1A054] uppercase">
                                <tr>
                                    <th></th>
                                    <th>Item Image</th>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* row 1 */}

                                {
                                    cart.map((item, index) => <tr key={item._id} className="text-center">
                                        <th>{index + 1}</th>
                                        <td className="flex justify-center"><img src={item.image} alt="" className="w-16 h-16" /> </td>
                                        <td>{item.name}</td>
                                        <td>${item.price}</td>
                                        <td className="flex justify-center"> <button onClick={() => handleDelete(item._id)}><MdDelete className="text-4xl p-1 bg-red-500 text-white rounded-lg" /></button> </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;