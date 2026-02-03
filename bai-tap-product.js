// ============================================
// BÀI TẬP QUẢN LÝ SẢN PHẨM - JAVASCRIPT
// ============================================

// ---------- CÂU 1: Constructor function Product ----------
function Product(id, name, price, quantity, category, isAvailable) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.category = category;
  this.isAvailable = isAvailable;
}

// ---------- CÂU 2: Khởi tạo mảng products (ít nhất 6 sp, 2 danh mục) ----------
const products = [
  new Product(1, "Tai nghe Bluetooth", 500000, 20, "Accessories", true),
  new Product(2, "Laptop Dell XPS", 25000000, 5, "Electronics", true),
  new Product(3, "Dây sạc Type-C", 150000, 0, "Accessories", false),
  new Product(4, "Chuột không dây", 200000, 35, "Accessories", true),
  new Product(5, "Màn hình LG 24inch", 3500000, 8, "Electronics", true),
  new Product(6, "Bàn phím cơ", 1200000, 15, "Accessories", true),
];

// ---------- CÂU 3: Mảng mới chỉ chứa name và price ----------
const namePriceList = products.map(function (sp) {
  return { name: sp.name, price: sp.price };
});
console.log("Câu 3 - Danh sách name, price:", namePriceList);

// ---------- CÂU 4: Lọc sản phẩm còn hàng (quantity > 0) ----------
const conHang = products.filter(function (sp) {
  return sp.quantity > 0;
});
console.log("Câu 4 - Sản phẩm còn hàng:", conHang);

// ---------- CÂU 5: Có ít nhất 1 sản phẩm giá > 30.000.000? ----------
const coSpTren30tr = products.some(function (sp) {
  return sp.price > 30000000;
});
console.log("Câu 5 - Có sản phẩm giá > 30tr?", coSpTren30tr);

// ---------- CÂU 6: Tất cả Accessories đang bán (isAvailable = true)? ----------
const accessories = products.filter(function (sp) {
  return sp.category === "Accessories";
});
const tatCaAccessoriesDangBan = accessories.every(function (sp) {
  return sp.isAvailable === true;
});
console.log("Câu 6 - Tất cả Accessories đang bán?", tatCaAccessoriesDangBan);

// ---------- CÂU 7: Tổng giá trị kho = price × quantity ----------
let tongGiaTriKho = 0;
for (let i = 0; i < products.length; i++) {
  tongGiaTriKho += products[i].price * products[i].quantity;
}
console.log("Câu 7 - Tổng giá trị kho:", tongGiaTriKho.toLocaleString("vi-VN"), "VNĐ");

// ---------- CÂU 8: for...of - In Tên - Danh mục - Trạng thái ----------
console.log("\nCâu 8 - Duyệt for...of:");
for (const sp of products) {
  const trangThai = sp.isAvailable ? "Đang bán" : "Ngừng bán";
  console.log(sp.name, "-", sp.category, "-", trangThai);
}

// ---------- CÂU 9: for...in - In tên thuộc tính và giá trị (1 sản phẩm) ----------
console.log("\nCâu 9 - Thuộc tính của sản phẩm đầu tiên:");
const motSanPham = products[0];
for (const thuocTinh in motSanPham) {
  console.log(thuocTinh + ":", motSanPham[thuocTinh]);
}

// ---------- CÂU 10: Tên các sản phẩm đang bán VÀ còn hàng ----------
const dangBanVaConHang = products
  .filter(function (sp) {
    return sp.isAvailable === true && sp.quantity > 0;
  })
  .map(function (sp) {
    return sp.name;
  });
console.log("\nCâu 10 - Sản phẩm đang bán và còn hàng:", dangBanVaConHang);
