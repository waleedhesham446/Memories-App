const  jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];  //  taking the token
        const isCustomAuth = token.length < 500;    //  check the type of token (google or custome)

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData.id;
        }else{
            decodedData = jwt.decode(token);

            req.userId = decodedData.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth;