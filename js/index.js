let arrNhanVien = [];
//1.In ra table danh sách nhân viên
// lấy dữ liệu người dùng
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
    // Nếu như trường hợp rỗng thì phải hiện thị là không bỏ trốngchứ không hiện th5 check min max
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

 // console.log(arrNhanVien);
  //  renderSaveReset(event)
  // chạy hàm renderArrNhanVien để hiển thị dữ liệu
  renderArrNhanVien();
  // gọi tới phương thức lưu trữ local
  saveLocalStorage();

  // xoá toàn bộ dữ liệu đang có trên form
  event.target.reset();
  document.getElementById("formQLNV").reset();
  //  console.log(arrNhanVien);
};
function renderSaveReset() {
  renderArrNhanVien();
  saveLocalStorage();
  // event.target.reset();

  document.getElementById("formQLNV").reset();
}
//console.log(arrNhanVien);
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
//console.log(arrNhanVien);
// //Chức năng xóa dữ liệu của nhân viên
function deleteNhanVien(email) {
  // console.log(email);
  // Tìm kiếm vị trí của Nhân viên đang cần xoá trong mảng arrNhanVien thông qua tknv
  // Sau khi đã tìm  được vị trí, thực hiện sử dụng các phương thức từ mảng để xoá
  // findIndex
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
}

// // Chúc năng updateNhanvien
function updateNhanVien() {
  //   //Thực hiện lấy dữ liệu của người dùng
  //   // tách hàm khi sữ dụng nhiều lần
  let nhanVien = getValueForm();
  //  arrNhanVien.push(nhanVien);
  //console.log(arrNhanVien);
  //   //tìm kiếm vị trí index của phần tử đang chỉnh sửa trong mảng
  let index = arrNhanVien.findIndex((item) => {
    return item.tknv == nhanVien.tknv;
  });
  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    renderSaveReset();
    document.getElementById("tknv").readOnly = false;
  }
}

document.getElementById("btnCapNhat").onclick = updateNhanVien;
//console.log(arrNhanVien);
// Chức năng tìm kiếm
function searchNhanVien(event) {
  // console.log(event.target.value);
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
    //console.log(typeof item.xepLoaiNhanVien(item.gioLam));
    let xepLoai = item.xepLoaiNhanVien(item.gioLam).toLowerCase().trim();
    //  console.log(xepLoai);
    let newLoaiNhanVien = removeVietnameseTones(xepLoai);
    // hàm includes
    return newLoaiNhanVien.includes(newKeyword);
  });
  //console.log(arrNhanVienFillter);
  // convert dữ liệu trước khi đọc=> chuyển keyword thành chữ thường , loại bỏ tất cả các dấu
  // gọi hàm hiện thị nhân viên
  renderArrNhanVien(arrNhanVienFillter);
}
// oninput
document.getElementById("searchName").oninput = searchNhanVien;
