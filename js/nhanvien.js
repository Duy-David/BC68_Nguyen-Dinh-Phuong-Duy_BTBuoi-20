class NhanVien {
  constructor(tknv = "", name = "", email = "", password = "", datepicker = "", luongCB = 0, chucVu = "", gioLam = 0) {
    this.tknv = tknv;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
  }
  xepLoai = function () {
      let xepLoai = ""
    if (this.gioLam >= 192) {
      xepLoai = "Nhân viên xuất sắc";
    } else if (this.gioLam >= 176 && this.gioLam < 192) {
      xepLoai ="Nhân viên giỏi";
    } else if (this.gioLam >= 160 && this.gioLam < 176) {
      xepLoai= "Nhân viên khá";
    } else {
      xepLoai= "Nhân viên trung bình";
    }return xepLoai
  };
  tongLuong = function () {
    let tongLuong = 0
    if (this.chucVu == "Sếp") {
      tongLuong= this.luongCB * 3;
    } else if (this.chucVu == "Trưởng phòng") {
      tongLuong=this.luongCB * 2;
    } else if (this.chucVu == "Nhân viên") {
      tongLuong = this.luongCB * 1;
    }return tongLuong
  };
}

//let nv1 = new NhanVien("001", "Nguyen Van A", "a@example.com", "password123", "01/01/2022", 5000, "Sếp", 200);
//console.log(nv1.xepLoai()); // Output: "Nhân viên xuất sắc"
//console.log(nv1.tongLuong()); // Output: 15000