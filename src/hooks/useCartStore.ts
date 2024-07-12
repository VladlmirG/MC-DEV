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

    // Ensure lineItems is initialized to an empty array if undefined
    const lineItems = cart.lineItems || [];

    set({
      cart: {
        ...cart,
        subtotal: cart.subtotal || { amount: 0, currency: 'HNL' },
        lineItems: lineItems, // Ensure lineItems is always defined
      },
      isLoading: false,
      counter: lineItems.length, // Use lineItems length directly
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

    set({
      cart: {
        ...response.cart,
        subtotal: response.cart?.subtotal || { amount: 0, currency: 'HNL' },
      },
      counter: response.cart?.lineItems.length,
      isLoading: false,
    });
  },
  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
      [itemId]
    );

    set({
      cart: {
        ...response.cart,
        subtotal: response.cart?.subtotal || { amount: 0, currency: 'HNL' },
      },
      counter: response.cart?.lineItems.length,
      isLoading: false,
    });
  },
}));
