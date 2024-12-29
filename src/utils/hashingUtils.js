import bcrypt from 'bcript'

export const createHash= password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))
export const inValidPassword=(user,password)=>bcrypt.compareSync(password,user.password)