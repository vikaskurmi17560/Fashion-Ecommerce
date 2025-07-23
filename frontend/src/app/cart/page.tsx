'use client';
import React from 'react';
import Navbar from '@/components/UI/Navbar';
import Footer from '@/components/UI/Footer';
import Cart from '@/components/UI/Carts';
import useCart from '@/hook/useCart';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
    const { carts, deleteCart } = useCart();
    const router = useRouter();

    const subtotal =
        carts?.reduce(
            (acc: number, item: any) => acc + item.total_price * item.quantity,
            0
        ) || 0;

    return (
        <main className="flex flex-col min-h-screen justify-between bg-slate-100 text-black">

            <Navbar />
            <section className="flex flex-col items-center w-full px-4 py-6">

                <Cart
                    carts={carts}
                    onRemove={deleteCart}
                    onCheckout={() => {
                        localStorage.setItem('checkout_subtotal', subtotal.toString());
                        router.push('/checkout');
                    }}
                />


            </section>

            <Footer />
        </main>
    );
}
