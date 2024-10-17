import axios from "../api/axios"; // Đảm bảo đường dẫn tới file axios

// Hàm lấy dữ liệu người dùng từ API
export const fetchUsersByRole = async (roleId) => {
  try {
    const response = await axios.get("/api/User?page=1&pageSize=100");

    if (response.data.success) {
      // Lọc chỉ những người dùng có roleId là giá trị được truyền vào
      const filteredUsers = response.data.data.listData.filter(
        (user) => user.roleId === roleId
      );



      // Map lại dữ liệu từ API vào định dạng mà bảng của bạn yêu cầu
      return filteredUsers.map((user, index) => ({
        key: index,
        roleId: user.roleId,
        userId: user.userId,
        username: user.name,
        fullName: user.name,
        dob: user.dateOfBirth.split("T")[0],
        phone: user.phone,
        email: user.email,
        address: "Unknown", // API hiện không trả về địa chỉ, có thể cập nhật nếu cần
        points: 0, // API hiện không trả về điểm, có thể cập nhật sau
        feedback: [], // API hiện không trả về phản hồi, có thể cập nhật sau
      }));
    } else {
      throw new Error("Không thể tải dữ liệu người dùng");
    }
  } catch (error) {
    throw error; // Bạn có thể tuỳ chỉnh thêm việc bắt lỗi ở đây
  }
};

export const createStaff = async (staffData) => {
  try {
    const response = await axios.post("/api/User/CreateStaff", staffData);
    if (response.data.success) {
      return response.data; // Trả về dữ liệu nếu thêm thành công
    } else {
      throw new Error(response.data.message || "Tạo nhân viên thất bại");
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

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`/api/User/${userId}`);
    if (response.data.success) {
      return response.data; // Trả về dữ liệu nếu xóa thành công
    } else {
      throw new Error(response.data.message || "Xóa người dùng thất bại");
    }
  } catch (error) {
    throw error; // Bắt lỗi để xử lý sau
  }
};