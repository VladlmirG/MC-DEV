import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

// Extend the Cart type if necessary
interface Cart extends currentCart.Cart {
  subtotal?: {
    amount: number;
    currency: string;
  };
}

type CartState = {
  cart: Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: {
    lineItems: [],
    subtotal: { amount: 0, currency: 'HNL' },
    // Add other necessary default properties here
  },
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();

      if (!cart) {
        throw new Error("Cart is undefined");
      }

      // Type assertion to ensure TypeScript knows cart is of type Cart
      const typedCart = cart as Cart;

      set({
        cart: {
          ...typedCart,
          subtotal: typedCart.subtotal || { amount: 0, currency: 'HNL' },
          lineItems: typedCart.lineItems || [], // Ensure lineItems is always defined
        },
        isLoading: false,
        counter: (typedCart.lineItems || []).length,
      });
    } catch (err) {
      console.error("Error fetching cart:", err);
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });

    // Type assertion for response.cart if necessary
    const typedResponse = response.cart as Cart;

    set({
      cart: {
        ...typedResponse,
        subtotal: typedResponse.subtotal || { amount: 0, currency: 'HNL' },
        lineItems: typedResponse.lineItems || [],
      },
      counter: (typedResponse.lineItems || []).length,
      isLoading: false,
    });
  },
  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );

    // Type assertion for response.cart if necessary
    const typedResponse = response.cart as Cart;

    set({
      cart: {
        ...typedResponse,
        subtotal: typedResponse.subtotal || { amount: 0, currency: 'HNL' },
        lineItems: typedResponse.lineItems || [],
      },
      counter: (typedResponse.lineItems || []).length,
      isLoading: false,
    });
  },
}));
