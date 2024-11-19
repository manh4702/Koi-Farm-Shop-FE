import {create} from "zustand";
import axios from "../api/axios.jsx";
import {message} from "antd";
import useAuthStore from "@/store/store.js";

const getUserId = () => useAuthStore.getState().userId;

const useCartStore = create((set, get) => ({
  items: JSON.parse(sessionStorage.getItem("cartItems") || "[]"),
  userCartId: sessionStorage.getItem("userCartId"),


  setCartItems: (cartItems) => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    set({ items: cartItems });
  },
  setUserCartId: (userCartId) => {
    sessionStorage.setItem("userCartId", userCartId.toString());
    set({ userCartId });
  },
  clearCart: () => {
    sessionStorage.removeItem("cartItems");
    // sessionStorage.removeItem("userCartId");
    set({ items: [], userCartId: null });
  },

  fetchCart: async (userId) => {
    try {
      const response = await axios.get(`/api/Cart/User/${userId}`);
      if (response.data.success) {
        get().setCartItems(response.data.data.cartItems);
        get().setUserCartId(response.data.data.userCartId);
      }
    } catch (error) {
      // console.error("Error fetching cart:", error);
      // message.error("Failed to load cart data");
    }
  },

  addItem: async (item) => {
    const userId = getUserId();
    const userCartIdParsed = parseInt(get().userCartId, 10);
    if (!Number.isInteger(userCartIdParsed)) {
      message.error("Mã giỏ hàng không hợp lệ. Vui lòng đăng nhập lại.");
      return;
    }

    const { items } = get();

    let apiEndpoint = item.fishPackageId ? '/api/CartItem/FishPackage' : '/api/CartItem/FishSingle';
    let apiBody = {
      userCartId: userCartIdParsed,
      ...(item.fishPackageId ? {packageId: item.fishPackageId, quantity: 1} : {fishId: item.fishId, quantity: 1})
    };

    try {
      const response = await axios.post(apiEndpoint, apiBody);
      if (response.status === 200 || response.status === 201) {
        await get().fetchCart(userId); // Update sessionStorage
        message.success("Sản phẩm đã được thêm vào giỏ hàng.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.includes("You haved added this Fish before, now you can only update Quantity inside")) {
          message.error("Bạn đã thêm loại cá này trước đó, giờ bạn chỉ có thể cập nhật số lượng.");
        } else {
          message.error("Đã xảy ra lỗi khi thêm vào giỏ hàng: " + error.response.data);
        }
      } else {
        console.error("API call failed:", error);
        message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  },


  removeItem: async (id) => {
    try {
      const response = await axios.delete(`/api/CartItem/${id}`);
      if (response.status === 200) {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.cartItemId !== id);

          sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));

          return { items: updatedItems };
        });

        message.success("Đã xóa sản phẩm khỏi giỏ hàng");
      } else {
        message.error("Không thể xóa sản phẩm khỏi giỏ hàng");
      }
    } catch (error) {
      console.error("API call failed:", error);
      message.error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  },

  updateQuantity: async (id, quantity) => {
    await set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? {...item, quantity} : item
      ),
    }));
    // Optionally, make an API call to update the quantity if necessary
  },
}));

export default useCartStore;