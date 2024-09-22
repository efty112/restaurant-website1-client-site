import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../CustomHooks/useAuth";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import SectionTitle from "../../Shared/SectionTitle";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payment } = useQuery({
        queryKey: ['payment', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <div>
                <SectionTitle heading={'PAYMENT HISTORY'} subheading={'---At a Glance!---'}></SectionTitle>
            </div>

            <div className="bg-white p-16 m-16">
                <div className="uppercase font-cinzel font-bold text-2xl flex items-center justify-between">
                    <h1>Total Payments: {payment?.length} </h1>
                    
                    {/* {
                        cart.length > 0 ? <Link to='/dashboard/payment'>
                            <button className="btn bg-[#D1A054] text-white">Pay</button>
                        </Link> : ''
                    } */}

                </div>

                <div className="mt-6">
                    <div className="overflow-x-auto">
                        <table className="table text-xl">
                            {/* head */}
                            <thead className="text-xl text-center text-white bg-[#D1A054] uppercase">
                                <tr>
                                    <th></th>
                                    <th>Email</th>
                                    <th>Category</th>
                                    <th>Total Price</th>
                                    <th>Payment Date</th>
                                    <th>Order Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* row 1 */}

                                {
                                    payment?.map((item, index) => <tr key={item._id} className="text-center">
                                        <th>{index + 1}</th>
                                        <td className="flex justify-center">{item.email}</td>
                                        <td>Food Order</td>
                                        <td>${item.price}</td>
                                        <td>{item.date}</td>
                                        <td>{item.status}</td>
                                        
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

export default PaymentHistory;