let arrNhanVien = [];
//1.In ra table danh sách nhân viên
function renderArrNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nhanVien of arr) {
    let newArrNhanVien = Object.assign(new NhanVien(), nhanVien);
    //    console.log(newArrNhanVien);

    let { tknv, name, email, datepicker, chucVu, gioLam } = newArrNhanVien;
    // console.log(typeof newArrNhanVien.xepLoaiNhanVien);
    content += `
      <tr>
      <td>${tknv}</td>
      <td>${name}</td>
      <td>${email}</td>
      <td>${datepicker}</td>
      <td>${chucVu}</td>
      <td>${newArrNhanVien.tongLuong().toLocaleString("VN", {
        style: "currency",
        currency: "VND",
      })}</td>
      <td>${newArrNhanVien.xepLoaiNhanVien(gioLam)}</td>
      <td>
        <button onclick = "deleteNhanVien('${email}')" class="btn btn-danger">Xoá</button>
        <button onclick = "getInfoNhanVien('${email}')" class="btn btn-dark mt-3" data-toggle="modal"
									data-target="#myModal" >Sửa</button>
      </td>     
      </tr>
      `;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

//2. Thêm nhân viên
document.getElementById("formQLNV").onsubmit = function (event) {
  event.preventDefault();
  // console.log(arrField);

  let nhanVien = getValueForm();
  if (!nhanVien) {
    return;
  }
  //console.log(nhanVien);

  // thêm nhân viên vào mảng
  arrNhanVien.push(nhanVien);

  // chạy hàm renderArrNhanVien để hiển thị dữ liệu
  renderArrNhanVien();
  // gọi tới phương thức lưu trữ local
  saveLocalStorage();

  // reset toàn bộ dữ liệu đang có trên form
  event.target.reset();
  document.getElementById("formQLNV").reset();
  //  console.log(arrNhanVien);
};
function renderSaveReset() {
  renderArrNhanVien();
  saveLocalStorage();

  document.getElementById("formQLNV").reset();
}
//console.log(arrNhanVien);

getLocalStorage();
// Lưu trữ dữ liệu xuống local storage
function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
  // lưu trữ mảng arrNhanVien xuống local storage
  let stringJson = JSON.stringify(value);
  localStorage.setItem(key, stringJson);
}

// Lấy dữ liệu từ local storage
function getLocalStorage(key = "arrNhanVien") {
  // lấy dữ liệu từ local storage lên
  let arrLocal = localStorage.getItem(key);
  if (arrLocal) {
    arrNhanVien = JSON.parse(arrLocal);
    renderArrNhanVien();
  }
}
//3. Tạo đối tượng nhân viên với thông tin lấy từ form người dùng nhập vào.
function getValueForm() {
  let arrField = document.querySelectorAll("#formQLNV input,#formQLNV select");
  // console.log(arrField);
  let nhanVien = new NhanVien();
  let isValid = true;
  for (let field of arrField) {
    let { value, id } = field;
    nhanVien[id] = value;
    // console.log(field);
    let parent = field.parentElement;
    // console.log(parent);
    let grandparent = parent.parentElement;
    // console.log(grandparent);
    let errorField = grandparent.querySelector(".sp-thongbao");
    errorField.style.display = "inline-block";

    // console.log(errorField);
    let check = checkEmptryValue(value, errorField);

    // console.log(nhanVien);
    isValid &= check;
    if (check && id == "tknv") {
      isValid &= checkTknvValue(value, errorField, 4, 6);
    }
    if (check && id == "name") {
      isValid &= checkNameValue(value, errorField);
    }
    if (check && id == "email") {
      isValid &= checkEmailValue(value, errorField);
    }
    if (check && id == "password") {
      isValid &= checkPasswordValue(value, errorField);
    }

    if (check && id == "datepicker") {
      isValid &= checkDatepickerValue(value, errorField);
    }

    if (check && id == "luongCB") {
      isValid &= checkLuongCBValue(value, errorField);
    }

    if (check && id == "gioLam") {
      isValid &= checkGioLamValue(value, errorField);
    }
    //   console.log(nhanVien);
  }

  if (isValid) {
    return nhanVien;
  }
}
//4.Validation (file validation.js)
//5. Xây dựng phương thức tính tổng lương cho đối tượng nhân viên(file nhanvien.js)
//6. Xây dựng phương thức xếp loại cho đối tượng nhân viên(file nhanvien.js)

//7.Xóa nhân viên
// //Chức năng xóa dữ liệu của nhân viên
function deleteNhanVien(email) {
  // console.log(email);
  // Tìm kiếm vị trí của Nhân viên đang cần xoá trong mảng arrNhanVien thông qua email (sử dụng findIndex)
  let index = arrNhanVien.findIndex((item) => {
    // console.log(item);
    return item.email == email;
  });

  //console.log(index);
  if (index != -1) {
    arrNhanVien.splice(index, 1);
    renderArrNhanVien();
    saveLocalStorage();
  }
}
//8.Cập nhật nhân viên (có validation)
// // chức năng sửa dữ liệu nhân viên
function getInfoNhanVien(email) {
  // console.log(email);
  // Sử dụng hàm find để lấy phần tử trong mảng
  let nhanVien = arrNhanVien.find((item, index) => {
    return item.email == email;
  });
  //    console.log(nhanVien);
  if (nhanVien) {
    // đưa dữ liệu nhân viên lên giao diện
    let arrField = document.querySelectorAll(
      "#formQLNV input,#formQLNV select"
    );
    //   console.log(arrField);
    for (let field of arrField) {
      //  console.log(field);
      let id = field.id;
      field.value = nhanVien[id];
      //console.log(field);
    }
    document.getElementById("tknv").readOnly = true;
  }
  document.getElementById("btnThemNV").remove();
  document.getElementById("btnThemNV").disabled;
}

// // Chúc năng updateNhanvien
function updateNhanVien() {
  //   //Thực hiện lấy dữ liệu của người dùng
  let nhanVien = getValueForm();
//tìm kiếm vị trí index của phần tử đang chỉnh sửa trong mảng
  let index = arrNhanVien.findIndex((item) => {
    return item.tknv == nhanVien.tknv;
  });
  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    renderSaveReset();
    document.getElementById("tknv").readOnly = false;
  }
  //đóng moldel
  $("#myModal").modal("hide");
}

document.getElementById("btnCapNhat").onclick = updateNhanVien;
//console.log(arrNhanVien);
//9.Tìm Nhân Viên theo loại (xuất săc, giỏi, khá...) và hiển thị
// Chức năng tìm kiếm
function searchNhanVien(event) {
  let newKeyword = removeVietnameseTones(
    event.target.value.toLowerCase().trim()
  );
  //Thực hiện clone Object  từ DOO NhanViên()  để lấy dữ liêu truyền vào ob mới
  let newArrNhanVien = [];
  for (let nhanVien of arrNhanVien) {
    newArrNhanVien.push(Object.assign(new NhanVien(), nhanVien));
  }
  //console.log(newArrNhanVien);
  arrNhanVienFillter = newArrNhanVien.filter(function (item) {
    // thực hiện kiểm tra keyword người dùngnhập vào có được chứa trong nhân viên hay không    console.log(item);
    // console.log(item);
    let xepLoai = item.xepLoaiNhanVien(item.gioLam).toLowerCase().trim();
    //  console.log(xepLoai);
    // convert dữ liệu trước khi đọc=> chuyển keyword thành chữ thường , loại bỏ tất cả các dấu
    let newLoaiNhanVien = removeVietnameseTones(xepLoai);
    // hàm includes
    return newLoaiNhanVien.includes(newKeyword);
  });
  // gọi hàm hiện thị nhân viên
  renderArrNhanVien(arrNhanVienFillter);
}
// oninput
document.getElementById("searchName").oninput = searchNhanVien;
