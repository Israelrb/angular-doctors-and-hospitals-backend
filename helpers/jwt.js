const jwt = require('jsonwebtoken');

const generaJWT = (uid) => {
    return new Promise((resolve, reject)=>{
        const payload = {
            uid
        };
    
        jwt.sign(payload, process.env.JWT_SCRET, {
            expiresIn: '12h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo gener el JWT');
            }else{
                resolve( token );
            }
        });
    });    
}

module.exports = {
    generaJWT
}