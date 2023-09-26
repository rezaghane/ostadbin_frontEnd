//______________________________________________________________________________
export function loading(THIS) {
  THIS.$swal.fire({
    position: 'center',
    type: '',
    title:"لطفا صبر کنید",
    html: '<div class="text-orange text-center"><i class="fas fa-spinner fa-pulse" style="font-size:100px;"></i></div>',
    showConfirmButton: false,
    allowOutsideClick: false
  });
}
//______________________________________________________________________________
export function success(THIS, title="ثبت شد") {
  THIS.$swal.fire({
    position: 'center',
    type: 'success',
    title: title,
    showCloseButton: true,
    showCancelButton: false,
    showConfirmButton: false,
    timer: 2000,
  })
}
//______________________________________________________________________________
export function success_sm(THIS, title="ثبت شد", position='top-end') {
  const Toast = THIS.$swal.mixin({
    toast: true,
    position: position,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', THIS.$swal.stopTimer)
      toast.addEventListener('mouseleave', THIS.$swal.resumeTimer)
    }
  })
  Toast.fire({
    type: 'success',
    title: title
  })
}
//______________________________________________________________________________
export function error(THIS, title='اطلاعات را تکمیل نمایید') {
  THIS.$swal.fire({
    title: title,
    position: 'center',
    type: 'error',
    timer: '2000',
    showCloseButton: true,
    showConfirmButton: false
  });
}
//______________________________________________________________________________
export function showImg(THIS, img='') {
  THIS.$swal.fire({
    width: "70%",
    title: '',
    position: 'center',
    type: '',
    html: "<img class='w-100 border-15' src=" + img + " />",
    showCloseButton: true,
    confirmButtonText: 'بستن'
  });
}
