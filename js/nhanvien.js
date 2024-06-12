class NhanVien {
  constructor(
    tknv ,
    name ,
    email,
    password ,
    datepicker,
    luongCB,
    chucVu ,
    gioLam,
  ) {
    this.tknv = tknv;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.xepLoaiNhanVien
    this.tongLuong
  }
  tongLuong = function () {
    let tongLuong = 0;
    if (this.chucVu == "Sếp") {
      tongLuong = this.luongCB * 3;
    } else if (this.chucVu == "Trưởng phòng") {
      tongLuong = this.luongCB * 2;
    } else if (this.chucVu == "Nhân viên") {
      tongLuong = this.luongCB * 1;
    }
    return tongLuong;
  };
  xepLoaiNhanVien = function (gioLam) {
    if (gioLam*1 >= 192) {
      return "Nhân viên xuất sắc";
    } else if (gioLam*1 >= 176 && gioLam*1 < 192) {
      return "Nhân viên giỏi";
    } else if (gioLam*1 >= 160 && gioLam*1< 176) {
      return "Nhân viên khá";
    } else {
      return "Nhân viên trung bình";
    }
    
  };
}
