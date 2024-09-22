import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../CustomHooks/useAxiosSecure';
import useCart from '../../../CustomHooks/useCart';
import useAuth from '../../../CustomHooks/useAuth';
import Swal from 'sweetalert2'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState("");
    const navigate = useNavigate();

    let totalPrice = cart.reduce((acc, curr) => {
        let total = parseFloat(acc) + parseFloat(curr.price)
        return total;
    }, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post("/create-payment-intent", { price: totalPrice })
                .then((res) => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                },
            }
        })
        if (confirmError) {
            console.log('confirm Error')
            setPaymentId('')
        }
        else {
            console.log('payment intent', paymentIntent)

            if (paymentIntent.status === "succeeded") {
                setPaymentId(`id: ${paymentIntent.id}`);

                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payment', payment);
                console.log('payment saved', res)
                refetch();

                if(res?.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Payment has been received",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/dashboard/paymentHistory')
                }
            }
            setIsLoading(false);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='flex flex-col my-5 space-y-5'>
                    <button className='btn bg-red-500 text-white px-10' type="submit" disabled={!stripe || !clientSecret || isLoading}>
                        <span id="button-text">
                            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                        </span>
                    </button>
                    <div>
                        <p className='text-red-600 text-center'>{error}</p>
                    </div>
                    <div>
                        <p className='text-green-600 text-center'>{paymentId}</p>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default CheckoutForm;