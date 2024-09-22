import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import img1 from '../../assets/home/slide1.jpg'
import img2 from '../../assets/home/slide2.jpg'
import img3 from '../../assets/home/slide3.jpg'
import img4 from '../../assets/home/slide4.jpg'
import img5 from '../../assets/home/slide5.jpg'
import SectionTitle from '../Shared/SectionTitle';

const Category = () => {
    
    return (
        <div>
            <SectionTitle heading={'Order Online'} subheading={'---From 11:00am to 10:00pm---'}></SectionTitle>

            <div>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={-10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        // when window width is >= 320px (small screens)
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10, // adjust space if needed for smaller screens
                        },
                        // when window width is >= 640px (medium screens)
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        // when window width is >= 1024px (large screens)
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: -10, // maintain your negative space for larger screens
                        },
                    }}
                    modules={[Pagination]}
                    className={`mySwiper`}
                >
                    <SwiperSlide>
                        <div className='w-fit text-white lg:my-20 mb-20'>
                            <img src={img1} alt="" />
                            <h3 className='font-cinzel text-center -mt-16 text-4xl'>Salads</h3>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className='w-fit text-white lg:my-20 mb-20'>
                            <img src={img2} alt="" />
                            <h3 className='font-cinzel text-center -mt-16 text-4xl'>Pizzas</h3>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className='w-fit text-white lg:my-20 mb-20'>
                            <img src={img3} alt="" />
                            <h3 className='font-cinzel text-center -mt-16 text-4xl'>Soups</h3>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className='w-fit text-white lg:my-20 mb-20'>
                            <img src={img4} alt="" />
                            <h3 className='font-cinzel text-center -mt-16 text-4xl'>Desserts</h3>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className='w-fit text-white lg:my-20 mb-20'>
                            <img src={img5} alt="" />
                            <h3 className='font-cinzel text-center -mt-16 text-4xl'>Salads</h3>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>

    );
};

export default Category;