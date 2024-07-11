"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";

const CartModal = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkout = await wixClient.currentCart.createCheckoutFromCurrentCart({
        channelType: currentCart.ChannelType.WEB,
      });

      const { redirectSession } = await wixClient.redirects.createRedirectSession({
        ecomCheckout: { checkoutId: checkout.checkoutId },
        callbacks: {
          postFlowUrl: window.location.origin,
          thankYouPageUrl: `${window.location.origin}/success`,
        },
      });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="subm w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] top-12 flex flex-col gap-6 z-20 -right-16 md:right-0">
      {!cart.lineItems ? (
        <div className="">Cesta Vacía</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold">Cesta de compras</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cart.lineItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(item.image, 72, 96, {})}
                    alt=""
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">{item.productName?.original}</h3>
                      <div className="p-1 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">{item.quantity} x{" "}</div>
                        )}
                        HNL.{item.price?.amount}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className="text-sm text-gray-500">{item.availability?.status}</div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Unid. {item.quantity}</span>
                    <span
                      className="text-blue-500"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Descartar
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">HNL.{cart.subtotal?.amount || 0}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Envío e impuestos calculados al finalizar la compra.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-hovr">Ver cesta</button>
              <button
                className="rounded-md py-3 px-4 bg-button hover:bg-hovr transition duration-500 text-white disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
                onClick={handleCheckout}
              >
                Pagar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
