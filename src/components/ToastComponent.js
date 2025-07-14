import { toast } from 'react-toastify';
import { TOAST_INFO, TOAST_WARN, TOAST_SUCCESS, TOAST_ERROR } from "../assets/constants/Constants";
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    className: 'toast'
};

const ShowToast = (message, type, options = null) => {
    const toastOptions = options || defaultOptions;

    if (type === TOAST_INFO) {
        toastOptions.toastId = 'information-toast';
        toast.info(message, { ...toastOptions });
    }
    if (type === TOAST_WARN) {
        toastOptions.toastId = 'warning-toast';
        toast.warn(message, { ...toastOptions });
    }
    if (type === TOAST_SUCCESS) {
        toastOptions.toastId = 'success-toast';
        toast.success(message, { ...toastOptions });
    }
    if (type === TOAST_ERROR) {
        toastOptions.toastId = 'error-toast';
        toast.error(message, { ...toastOptions });
    }
}
export default ShowToast;
