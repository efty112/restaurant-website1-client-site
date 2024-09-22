import img from '../../assets/home/featured.jpg'
import SectionTitle from '../Shared/SectionTitle';

const Featured = () => {
    return (
        <div>
            <div
                className="hero min-h-full bg-fixed"
                style={{
                    backgroundImage: `url(${img})`,
                }}>
                <div className="hero-overlay bg-opacity-60"></div>

                <div className="hero-content text-white text-left">

                    <div>
                        <div>
                            <SectionTitle heading='FROM OUR MENU' subheading='---Check it out---'></SectionTitle>
                        </div>

                        <div className='flex items-center justify-center gap-10 mt-10 mb-20'>

                            <img className='w-1/2' src={img} alt="" />

                            <div className='space-y-5'>
                                <p className="mb-5 text-xl">March 20, 2023</p>
                                <p className="mb-5 uppercase text-2xl">WHERE CAN I GET SOME?</p>
                                <p className="mb-5 uppercase text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                                <div>
                                    <button className="btn btn-ghost uppercase border-b-white border-b-2">Read More</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;