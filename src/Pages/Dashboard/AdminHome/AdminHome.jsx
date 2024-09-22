import useAuth from "../../../CustomHooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { IoWallet } from "react-icons/io5";
import { FaTruck, FaUsers } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { BarChart, Bar, Cell, XAxis, YAxis, Legend, CartesianGrid, PieChart, Pie } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: adminStats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data;
        }
    })
    const { data: orderStats = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats')
            return res.data;
        }
    })
    // console.log(orderStats)

    // Graph Chart:
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // Pie Chart:
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const pieChartData = orderStats?.map(data => {
        return {
            name: data.category,
            value: data.revenue
        }
    })


    return (
        <div>
            <div>
                <h1 className="text-4xl font-cinzel font-bold">
                    <span> Hi, Welcome </span>
                    {
                        user?.displayName ? user.displayName + '!' : 'Back !'
                    }
                </h1>
            </div>

            <div className='grid grid-cols-4 gap-10 my-10'>
                <div className={`flex items-center gap-5 p-10 rounded-lg text-white bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF]`}>
                    <div>
                        <IoWallet className="text-6xl"></IoWallet>
                    </div>
                    <div className="text-3xl">
                        <h1 className="font-bold">{adminStats?.revenue}</h1>
                        <p>Revenue</p>
                    </div>
                </div>


                <div className={`flex items-center gap-5 p-10 rounded-lg text-white bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]`}>
                    <div>
                        <FaUsers className="text-6xl"></FaUsers>
                    </div>
                    <div className="text-3xl">
                        <h1 className="font-bold">{adminStats?.users}</h1>
                        <p>Customers</p>
                    </div>
                </div>


                <div className={`flex items-center gap-5 p-10 rounded-lg text-white bg-gradient-to-r from-[#FE4880] to-[#FECDE9]`}>
                    <div>
                        <SiCodechef className="text-6xl"></SiCodechef>
                    </div>
                    <div className="text-3xl">
                        <h1 className="font-bold">{adminStats?.menuItems}</h1>
                        <p>Products</p>
                    </div>
                </div>


                <div className={`flex items-center gap-5 p-10 rounded-lg text-white bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF]`}>
                    <div>
                        <FaTruck className="text-6xl" />
                    </div>
                    <div className="text-3xl">
                        <h1 className="font-bold">{adminStats?.orders}</h1>
                        <p>Orders</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex items-center">
                <div className="w-2/3">
                    <BarChart
                        width={700}
                        height={500}
                        data={orderStats}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {orderStats?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>




        </div>
    );
};

export default AdminHome;