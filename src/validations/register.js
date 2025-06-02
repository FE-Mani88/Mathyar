import * as Yup from "yup";

const registerValidator = Yup.object().shape({
    name: Yup.string().min(4, 'نام کاربری باید بیشتر از 4 کاراکتر باشد').max(8, 'نام کاربری باید کمتر از 8 کاراکتر باشد').required('نام کاربری نباید خالی باشد'),
    email: Yup.string().email('لطفا یک ایمیل معتبر وارد کنید').min(10, 'ایمیل نباید کمتر از 10 کاراکتر باشد').max(34, 'ایمیل نباید بیشتر از 34 کاراکتر باشد').required('لطفا یک آدرس ایمیل وارد کنید'),
    password: Yup.string().min(8, 'رمز عبور نباید کمتر از 8 کاراکتر باشد').max(10, 'رمز عبور نباید بیشتر از 10 کاراکتر باشد').required('لطفا یک رمز عبور برای خود انتخاب کنید')
})


export default registerValidator