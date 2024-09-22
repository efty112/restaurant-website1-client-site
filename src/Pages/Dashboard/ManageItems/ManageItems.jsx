import useMenu from "../../../CustomHooks/useMenu";
import SectionTitle from "../../Shared/SectionTitle";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

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

                axiosSecure.delete(`/menu/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Item has been deleted.",
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
                <SectionTitle heading={'MANAGE ALL ITEMS'} subheading={'---Hurry Up!---'}></SectionTitle>
            </div>

            <div className="bg-white p-16 m-16">
                <div className="uppercase font-cinzel font-bold text-2xl flex items-center justify-between">
                    <h1>Total Items: {menu.length}  </h1>
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
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* row 1 */}

                                {
                                    menu.map((item, index) => <tr key={item._id} className="text-center">
                                        <th>{index + 1}</th>
                                        <td className="flex justify-center items-center"><img src={item.image} alt="" className="w-16 h-16" /> </td>
                                        <td>{item.name}</td>
                                        <td>${item.price}</td>
                                        <td>
                                            <Link to={`/dashboard/updateItem/${item._id}`}>
                                                <button><FiEdit className="text-4xl p-2 bg-[#D1A054] text-white rounded-lg" /></button>
                                            </Link>
                                        </td>
                                        <td> <button onClick={() => handleDelete(item._id)}><MdDelete className="text-4xl p-1 bg-red-500 text-white rounded-lg" /></button> </td>
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

export default ManageItems;