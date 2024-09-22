import { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Testimonial from "./Testimonial";


const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('https://bistro-boss-server-five-rho.vercel.app/testimonials')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, [])

    return (
        <div>
            <div>
                <SectionTitle heading='TESTIMONIALS' subheading='---What Our Clients Say---'></SectionTitle>
            </div>

            <div className="my-10">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews?.map(review =>
                            <SwiperSlide key={review._id}>
                                <Testimonial key={review._id} review={review}></Testimonial>
                            </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;