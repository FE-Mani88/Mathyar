import * as Yup from 'yup'

const loginValidator = Yup.object().shape({
    email: Yup.string().email('لطفا یک ایمیل معتبر وارد کنید').min(10, 'ایمیل شما نباید کمتر از 10 کاراکتر باشد').max(34 , 'ایمیل شما نباید بیشتر از 34 کاراکتر باشد').required('لطفا ایمیل خود را وارد کنید'),
    password: Yup.string().min(8, 'رمز عبور شما نباید کمتر از 8 کاراکتر باشد').max(10, 'رمز عبور شما نباید بیشتر از 10 کاراکتر باشد').required('لطفا رمز عبور خود را وارد کنید')
})

export default loginValidator;