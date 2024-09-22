const MenuItems = ({ item }) => {
    const { name, image, recipe, price } = item

    return (
        <div className="flex items-center gap-x-5 w-full h-36 my-5">
            <div className='w-1/3 h-full'>
                <img className="rounded-br-full rounded-tr-full rounded-bl-full w-full h-full" src={image} alt="" />
            </div>

            <div className='font-cinzel w-full h-full'>
                <div className="space-y-2 flex justify-between items-center">
                    <h1 className="text-xl">{name} ------------</h1>
                    <p className="text-[#BB8506] text-lg">${price}</p>
                </div>
                <p className="text-base">{recipe}</p>
            </div>
        </div>
    );
};

export default MenuItems;