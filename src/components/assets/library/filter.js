//______________________________________________________________________________
export function validateEmail(email) {
  if(email==""){
    return false;
  }else{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
//______________________________________________________________________________
export function validatePhone(phn="") {
  return(phn.length==11 && phn[0]==0 && phn[1]==9);
}
//______________________________________________________________________________
export function validURL(str) {
  var pattern = new RegExp('^(https//?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}
//______________________________________________________________________________
export function indexFinder(obj, id) {
  let res = -1;
  for(let i=0; i < obj.length; i++){
    if(obj[i].id == id) res = i;
  }
  return res;
}
//______________________________________________________________________________



// _______________________________help__________________________________________
// import { validateEmail, validatePhone } from  "../../../assets/library/filter.js";
// _______________________________data__________________________________________
// validateEmail: validateEmail,
// validatePhone: validatePhone,
// _______________________________components____________________________________
// validateEmail,
// validateEmail,
