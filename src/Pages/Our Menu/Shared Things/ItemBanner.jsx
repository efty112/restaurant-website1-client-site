import img1 from '../../../assets/home/chef-service.jpg'

const ItemBanner = ({heading, subheading}) => {
    return (
        <div>
            <div className='relative flex items-center justify-center'>
                <img className='relative' src={img1} alt="" />

                <div className='text-center bg-black bg-opacity-60 absolute flex items-center justify-center py-16 mx-24'>
                    <div className='w-2/3 mx-auto space-y-5 text-white'>
                        <h1 className='font-cinzel text-4xl font-bold'>{heading}</h1>
                        <p>{subheading}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemBanner;