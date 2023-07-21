function empty(param){
    if(param==null||param==undefined||param=="")
    return true;
    else
    return false;
}

function validemail(param){
    return param.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};

function validphn(param){
    return param.match(/^[6-9]\d{9}$/gi);
};

function validPassword(param){
    return param.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,1000}$/);
}
module.exports={
    empty,
    validemail,
    validphn,
    validPassword
};