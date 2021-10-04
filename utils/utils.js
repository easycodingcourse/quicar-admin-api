var bcrypt = require('bcryptjs');
const randomKey = () => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("cf97f15e-184f-472e-b83f-0df26f90d774", salt);
    return hash;
  };
  const getRandomNumber = (length = 4) => {
    let random = Math.random().toString().substr(2, length);
    return random;
  };
  
  const getHashPassword = (password = "12345") => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  };
  
  const checkHashPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
  };


  function getPaninationInfo(field) {
    let {page,limit = 10} = field;
    limit = parseInt(limit);
    page = parseInt(page);
    page === 0 ? (page = 1) : null;


    let offset = parseInt((page - 1) * parseInt(limit));

    return {offset,page,limit}
    
  }

  function getPaninationPageInfo({total,limit,page}) {

    let totalPage = Math.ceil(total / limit);
    var hasNextPage = true;
    let nextPage = page + 1;
    nextPage > totalPage ? hasNextPage = false : null


  

    if(!hasNextPage){
      nextPage=1
    }

    return {
      totalPage,
      currentPage:page,
      hasNextPage,
      nextPage,
      total,
      limit
    }
    
  }








module.exports = {
    getRandomNumber,
    randomKey,
    getHashPassword,
    checkHashPassword,
    getPaninationInfo,
    getPaninationPageInfo
}
