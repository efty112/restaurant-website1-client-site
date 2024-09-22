import { ImSpoonKnife } from "react-icons/im";
import SectionTitle from "../../Shared/SectionTitle";
import { useForm } from "react-hook-form"
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const imageFile = {image: data.image[0]}
        // console.log(data)

        // Making an image URL from the image:
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        })

        if(res?.data.success){
            const newMenuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res?.data.data.display_url,
                category: data.category,
                price: data.price
            }
            const menuRes = await axiosSecure.post('/menu', newMenuItem);
            // console.log(menuRes.data);
            if(menuRes.data.insertedId){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item has been added",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    }

    return (
        <div>
            <div>
                <SectionTitle heading={'ADD AN ITEM'} subheading={'---What\'s new?---'}></SectionTitle>
            </div>
            <div className='w-3/4 mx-auto bg-white'>
                <form className="p-10 space-y-5" onSubmit={handleSubmit(onSubmit)}>

                    {/* ----------------- Name ----------------- */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Recipe Name*</span>
                        </label>
                        <input type="text" {...register("name", {required: true})} placeholder="Recipe Name" className="input input-bordered" required />
                    </div>

                    {/* ---------------- Category and Price ----------------- */}
                    <div className="flex items-center gap-5">
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-bold">Category*</span>
                            </label>
                            <select defaultValue='salad' {...register("category", {required: true})} className="select select-bordered w-full" required>
                                <option value={'salad'}>Salad</option>
                                <option value={'pizza'}>Pizza</option>
                                <option value={'soup'}>Soup</option>
                                <option value={'dessert'}>Dessert</option>
                                <option value={'drinks'}>Drinks</option>
                            </select>
                        </div>

                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-bold">Price*</span>
                            </label>
                            <input {...register("price", {required: true})} type="text" placeholder="Price" className="input input-bordered w-full" required />
                        </div>
                    </div>

                    {/* ---------------- Recipe Detail ---------------------- */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Recipe Details*</span>
                        </label>
                        <textarea {...register("recipe", {required: true})} className="textarea textarea-bordered resize-none" rows='5' placeholder="Recipe Details" required></textarea>
                    </div>

                    {/* ---------------- Image -----------------------*/}
                    <div className="form-control">
                        <input {...register("image", {required: true})} type="file" className="file-input file-input-bordered w-full max-w-xs" required />
                    </div>

                    {/* ---------------- Submit Button ---------------- */}
                    <div>
                        <button className="flex items-center gap-2 text-white p-3 bg-gradient-to-r from-[#835D23] to-[#B58130]">
                            <input type="submit" value="Add Item" />
                            <ImSpoonKnife></ImSpoonKnife>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItems;