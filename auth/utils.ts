import crypto from 'crypto';


function pbkdf2Async(password, salt) {
    return new Promise( (res, rej) => {
        crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, key) => {
            err ? rej(null) : res(key);
        });
    });
}

export default pbkdf2Async;