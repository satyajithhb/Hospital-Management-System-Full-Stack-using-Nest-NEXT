const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(64).toString('hex');

export const jwtConstants = {
    secret: jwtSecret,
};
