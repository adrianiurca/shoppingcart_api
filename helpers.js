var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var axios = require('axios');

let helpers = {};

helpers.hash = (str) => {
  if(typeof str === 'string' && str.length > 0) {
    return crypto.createHmac('md5', process.env.PASSWORD_ENCRYPTION_PHRASE).update(str).digest('hex');
  } else {
    return false;
  }
};

helpers.createToken = (email) => {
  let token = jwt.sign({email: email}, process.env.TOKEN_SIGN_PHRASE, {expiresIn: '1h'});
  return token;
};

helpers.checkToken = async function(token) {
  return new Promise(function(resolve, reject) {
    jwt.verify(token, process.env.TOKEN_SIGN_PHRASE, (error, decoded) => {
      if(error) reject(error);
      resolve(decoded);
    });
  });
};

helpers.isExpired = (decoded) => {
  return (Date.now() >= decoded.exp * 1000);
}

helpers.stripeCharge = (data) => {
  return new Promise(function(resolve, reject) {
    axios({
      method: 'post',
      url: 'https://api.stripe.com/v1/charges/',
      timeout: 5 * 1000,
      headers: {
        authorization: `Bearer ${data.stripeToken}`
      },
      data: {
        stripeToken: data.stripeToken,
        order_id: data.order_id,
        description: data.description,
        amount: data.amount,
        currency: data.currency
      }
    }).then(response => resolve(response))
    .catch(reason => reject(reason));
  });
};

module.exports = helpers;
