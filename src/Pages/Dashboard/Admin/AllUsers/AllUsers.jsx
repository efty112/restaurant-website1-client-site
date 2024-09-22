import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Shared/SectionTitle";
import useAxiosSecure from "../../../../CustomHooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    // console.log(users)
    const handleDelete = (userId) => {
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

                axiosSecure.delete(`/users/${userId}`)
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

    const handleMakeAdmin = (userId, userName) => {
        Swal.fire({
            title: "Are you sure you want to make him admin?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Do it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/admin/${userId}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Modified",
                                text: `${userName} is admin now!`,
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
                <SectionTitle heading={'Manage All Users'} subheading={'---How Many---'}></SectionTitle>
            </div>

            <div className="bg-white p-16 m-16">
                <div className="uppercase font-cinzel font-bold text-2xl flex items-center justify-between">
                    <h1>Total Users : {users?.length} </h1>
                </div>

                <div className="mt-6">
                    <div className="overflow-x-auto">
                        <table className="table text-xl">
                            {/* head */}
                            <thead className="text-xl text-white bg-[#D1A054] uppercase">
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* row 1 */}

                                {
                                    users.map((user, index) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td className="">{user.name} </td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role == 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user._id, user.name)}>
                                                    <FaUsers className="text-5xl p-3 text-white bg-[#D1A054] rounded-lg" />
                                                </button>
                                            }
                                        </td>

                                        <td>
                                            <button onClick={() => handleDelete(user._id)}><MdDelete className="text-5xl p-3 bg-red-500 text-white rounded-lg" /></button>
                                        </td>
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

export default AllUsers;