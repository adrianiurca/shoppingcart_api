class Error {
  errorCodes = {
    AUT_01: ['Authorization code is empty', 400],
    AUT_02: ['Access Unauthorized', 403],
    PAG_01: ['The order is not matched \'field,(DESC|ASC)\'', 600],
    PAG_02: ['The field of order is not allow sorting', 600],
    USR_01: ['Email or Password is invalid', 410],
    USR_02: ['The field(s) are/is required', 430],
    USR_03: ['The email is invalid', 450],
    USR_04: ['The email already exists', 451],
    USR_05: ['The email doesn\'t exist', 452],
    USR_06: ['this is an invalid phone number', 470],
    USR_07: ['this is too long <' + this.field + '>', 480],
    USR_08: ['this is an invalid Credit Card', 490],
    USR_09: ['The Shipping Region ID is not number', 491],
    CAT_01: ['Don\'t exist category with this ID', 492],
    DEP_01: ['The ID is not a number', 493],
    DEP_02: ['Don\'exist department with this ID', 494]
  }
  constructor(props) {
    this.code = props.code;
    this.field = props.field;
  }
  show() {
    return {
      status: this.errorCodes[this.code][1],
      code: this.code,
      message: this.errorCodes[this.code][0],
      field: this.field
    }
  }
}

module.exports = {Error: Error};
