import axios from "../api/axios"; // Đảm bảo đường dẫn tới file axios

// Hàm lấy dữ liệu người dùng từ API
export const fetchUsersByRole = async (roleName) => {
  try {
    const response = await axios.get("/api/User?page=1&pageSize=100");

    if (response.data.success) {
      // Lọc chỉ những người dùng có roleId là giá trị được truyền vào
      const filteredUsers = response.data.data.listData.filter(
        (user) => user.roleName === roleName
      );



      // Map lại dữ liệu từ API vào định dạng mà bảng của bạn yêu cầu
      return filteredUsers.map((user, index) => ({
        key: index,
        // roleId: user.roleId,
        roleName: user.roleName,
        userId: user.userId,
        userName: user.name,
        fullName: user.name,
        dob: user.dateOfBirth.split("T")[0],
        phone: user.phone,
        email: user.email,
        status: user.status ,
        addresses: user.addresses || [],
        address: user.addresses && user.addresses.length > 0
          ? `${user.addresses[0].street}, ${user.addresses[0].district}, ${user.addresses[0].city}`
          : "Chưa cập nhật",
        points: 0,
        orders: (user.orders || []).map(order => ({
          orderId: order.orderId,
          date: order.orderDate,
          total: order.totalPrice,
          status: order.status
        })),
        feedback: [], // API hiện không trả về phản hồi, có thể cập nhật sau
      }));
    } else {
      // throw new Error("Không thể tải dữ liệu người dùng");
    }
  } catch (error) {
    throw error; // Bạn có thể tuỳ chỉnh thêm việc bắt lỗi ở đây
  }
};

export const createStaff = async (staffData) => {
  try {
    const response = await axios.post("/api/User/createStaff", staffData);
    if (response.data.success) {
      return response.data; // Trả về dữ liệu nếu thêm thành công
    } else {
      throw new Error(response.data.message || "Tạo nhân viên thất bại");
    }
  } catch (error) {
    throw error; // Bắt lỗi để xử lý sau
  }
};

export const createManager = async (managerData) => {
  try {
    const response = await axios.post("/api/User/createManager", managerData);
    if (response.data.success) {
      return response.data; // Trả về dữ liệu nếu thêm thành công
    } else {
      throw new Error(response.data.message || "Tạo quản lý thất bại");
    }
  } catch (error) {
    throw error; // Bắt lỗi để xử lý sau
  }
};


export const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`/api/User/updateUser/${userId}`, updatedData);
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Cập nhật người dùng thất bại");
    }
  } catch (error) {
    throw error; // Bắt lỗi để xử lý sau
  }
};

export const deleteStaff = async (userId) => {
  try {
    const response = await axios.delete(`/api/User/deleteHard/${userId}`);
    if (response.data.success) {
      return response.data; // Trả về dữ liệu nếu xóa thành công
    } else {
      throw new Error(response.data.message || "Xóa người dùng thất bại");
    }
  } catch (error) {
    throw error; // Bắt lỗi để xử lý sau
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axios.put(`/api/User/deleteUser/${userId}`);
    if (response.data.success) {
      return response.data; // Trả về dữ liệu nếu xóa thành công
    } else {
      throw new Error(response.data.message || "Xóa người dùng thất bại");
    }
  } catch (error) {
    throw error; // Bắt lỗi để xử lý sau
  }
};

export const restoreUser = async (userId) => {
  try {
    const response = await axios.put(`/api/User/restoreUser/${userId}`);
    if (response.data.success) {
      return response.data; // Trả về dữ liệu nếu xóa thành công
    } else {
      throw new Error(response.data.message || "Xóa người dùng thất bại");
    }
  } catch (error) {
    throw error; // Bắt lỗi để xử lý sau
  }
};