import jwt from 'jsonwebtoken';

function jwtTokens({user_id,user_name,user_email}) {
   const user = {user_id,user_name,user_email};
   console.log(process.env.ACCESS_TOKEN_SECRET)
   console.log(process.env.REFRESH_TOKEN_SECRET)
   const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET ||'fallback_secret',{expiresIn:'20s'});
   const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET  ||'gdgsjjjjjgdsjhg',{expiresIn:'5m'});
   return ({accessToken,refreshToken});
}

export {jwtTokens};
