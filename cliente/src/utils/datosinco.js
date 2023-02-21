import  sw from 'sweetalert2'

const datosinco = ({title, icon, timer, position} = {}) => {
    return sw.fire({
        position: position || 'top-end',
        icon: icon || 'success',
        title:  title || 'Los datos ingresados son incorrectos!!!',
        timer: timer || 1500 ,
        showConfirmButton: false,   
    })
}

export default datosinco 