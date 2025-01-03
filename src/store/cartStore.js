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
        const cartItems = response.data.data.cartItems.map((item) => ({
          ...item,
          availableQuantity: null, // Giá trị mặc định nếu không có từ API
        }));
        // get().setCartItems(response.data.data.cartItems);
        get().setCartItems(cartItems);
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

  updateQuantity: async (cartItemId, newQuantity) => {
    try {
      const item = get().items.find((item) => item.cartItemId === cartItemId);
      if (!item) {
        message.error("Sản phẩm không tồn tại trong giỏ hàng.");
        return;
      }

      const oldQuantity = item.quantity;
      const delta = newQuantity - oldQuantity;
      if (delta === 0) return;

      // Gọi API cập nhật số lượng
      const response = await axios.put(`/api/CartItem/PackageQuantity/${cartItemId}&&${newQuantity}`);
      if (response.status === 200 && response.data.success) {
        // Trích xuất availableQuantity từ thông báo
        const messageText = response.data.message || "";
        const availableQuantity = parseInt(messageText.match(/now it's only (\d+)/)?.[1], 10) || 0;

        // Cập nhật store
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.cartItemId === cartItemId
              ? {
                ...item,
                quantity: newQuantity,
                availableQuantity, // Cập nhật số lượng còn lại
              }
              : item
          );
          sessionStorage.setItem("cartItems", JSON.stringify(updatedItems));
          return { items: updatedItems };
        });

        // Phản hồi người dùng
        if (availableQuantity === 0) {
          message.warning("Sản phẩm này đã đạt giới hạn. Không thể thêm nữa.");
        } else {
          message.success(`Cập nhật số lượng thành công.`);
        }
      } else {
        message.error("Không thể cập nhật số lượng sản phẩm.");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi cập nhật số lượng.");
      console.error("Error updating quantity:", error);
    }
  },
}));

export default useCartStore;