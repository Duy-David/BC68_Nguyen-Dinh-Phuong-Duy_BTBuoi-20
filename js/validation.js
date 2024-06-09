function checkEmptryValue(value, errorField) {
  // Thực hiện kiểm tra lổi cho người dùng]
  if (!value) {
    // không có dữ liệu
    errorField.innerHTML = "Vui lòng không bỏ trống trường dữ liệu này";
    return false;
  } else {
    errorField.innerHTML = "";
    return true;
  }
}
function checkTknvValue(value, errorField, min, max) {
  if (min <= value.length && value.length <= max) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = `Vui lòng nhập dữ liệu trong trường từ ${min} đến ${max}`;
    return false;
  }
}
function checkNameValue(value, errorField) {
  let regexName = /^[A-Za-zÀ-ỹà-ỹ\s]+$/;
  let isValid = regexName.test(value);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = `Vui lòng nhập chữ vào trường dử liệu này`;
    return false;
  }
}

function checkEmailValue(value, errorField) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isValid = regexEmail.test(value);
  console.log(isValid);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = `Vui lòng nhập đúng định dạng email`;
    return false;
  }
}
function checkPasswordValue(value, errorField) {
  let regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

  //+ mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt),

  let isValid = regexPassword.test(value);
  // console.log(isValid);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = `Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)`;
    return false;
  }
}
function checkDatepickerValue(value, errorField) {
  let regexDatepicker =
    /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;

  let isValid = regexDatepicker.test(value);
  console.log(isValid);
  if (isValid) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = `Định dạng: mm/dd/yyyy`;
    return false;
  }
}
function checkLuongCBValue(value, errorField, min = 1000000, max = 20000000) {
  //   let regexLuongCB = /^(1[0-9]{6}|20[0]{6}|[2-9][0-9]{6}|[1-9][0-9]{7})$/;
  //   let isValid = regexLuongCB.test(value);
  if (min <= value && value <= max) {
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = `Vui lòng nhập lương cơ bản từ ${min.toLocaleString(
      "VN",
      {
        style: "currency",
        currency: "VND",
      }
    )} đến ${max.toLocaleString("VN", {
      style: "currency",
      currency: "VND",
    })}`;
    return false;
  }
}
function checkGioLamValue(value, errorField, min = 80, max = 200) {
  //let regexGioLam = /^(8[0-9]|9[0-9]|1[0-9]{2}|200)$/;
  //let isValid = regexGioLam.test(value);
  if (min <= value && value <= max) {
    //TH Dữ liêu trong số
    errorField.innerHTML = "";
    return true;
  } else {
    errorField.innerHTML = `Vui lòng nhập giờ làm từ ${min} đến ${max}`;
    return false;
  }
  console.log(value);
}
