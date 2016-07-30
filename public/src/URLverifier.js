
exports.verify = function verify(url) {
    var isValid = false;
    var message = '';

    if (url.match(/^https\:\/\/|http:\/\//) != null) {
        isValid = true;
    } else {
        message = 'Missing/invalid protocol';
    }

    return {isValid: isValid, message: message};
};