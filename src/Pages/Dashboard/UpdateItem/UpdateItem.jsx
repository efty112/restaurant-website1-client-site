import { useForm } from "react-hook-form";
import SectionTitle from "../../Shared/SectionTitle";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`

const UpdateItem = () => {
    const loaderData = useLoaderData();
    const { register, handleSubmit } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        let imageUrl = loaderData.image
        const imageFile = { image: data.image[0] }

        if (imageFile.image) {
            // Making an image URL from the image:
            const res = await axiosPublic.post(img_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            imageUrl = res?.data.data.display_url
        }

        const menuItem = {
            name: data.name,
            recipe: data.recipe,
            image: imageUrl,
            category: data.category,
            price: data.price
        }

        const menuRes = await axiosSecure.patch(`/menu/${loaderData._id}`, menuItem);

        if (menuRes.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Item has been updated",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/manageItems');
        }

    }

    return (
        <div>
            <div>
                <SectionTitle heading={'UPDATE ITEM'} subheading={''}></SectionTitle>
            </div>

            <div className='w-3/4 mx-auto bg-white'>
                <form className="p-10 space-y-5" onSubmit={handleSubmit(onSubmit)}>

                    {/* ----------------- Name ----------------- */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Recipe Name*</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="Recipe Name" className="input input-bordered" defaultValue={loaderData.name} required />
                    </div>

                    {/* ---------------- Category and Price ----------------- */}
                    <div className="flex items-center gap-5">
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-bold">Category*</span>
                            </label>
                            <select defaultValue={loaderData.category} {...register("category", { required: true })} className="select select-bordered w-full" required>
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
                            <input {...register("price", { required: true })} type="text" defaultValue={loaderData.price} placeholder="Price" className="input input-bordered w-full" required />
                        </div>
                    </div>

                    {/* ---------------- Recipe Detail ---------------------- */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Recipe Details*</span>
                        </label>
                        <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered resize-none" rows='5' placeholder="Recipe Details" defaultValue={loaderData.recipe} required></textarea>
                    </div>

                    {/* ---------------- Image -----------------------*/}
                    <div className="form-control">
                        <input {...register("image")} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>

                    {/* ---------------- Submit Button ---------------- */}
                    <div className="flex justify-center">
                        <button className="flex items-center gap-2 text-white p-3 bg-gradient-to-r from-[#835D23] to-[#B58130]">
                            <input type="submit" value="Update Recipe Details" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;