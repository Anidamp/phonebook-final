import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {useSignupMutation} from '../../serviceApi/Api'
import s from './AuthForm.module.css'
import { setCredentials } from '../../redux/slice'
import toast from 'react-hot-toast';


export default function RegisterForm() {
const [onRegister] = useSignupMutation()
const{register, handleSubmit, reset, formState: { errors }}=useForm();
const dispatch = useDispatch();

const onSubmit = async (data) => {
  try {
    const userData = await onRegister(data).unwrap();
    dispatch(setCredentials(userData));
    reset()
  } catch (error) { toast.error(error)
    
  }
  
    }

    
    return (
        <>
            
            
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <label className={s.label}>Name
    <input {...register("name", {
            required: true,
            pattern:/^[a-zA-Zа-яА-Я0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Zа-яА-Я0-9]){2,18}[a-zA-Zа-яА-Я0-9]$/,
          })} className={s.input}  title ="Input your Name" type="text" placeholder="Name" />
          {errors?.name?.type === 'required' && (
          <p className={s.error}>This field is required</p>
        )}
        {errors?.name?.type === 'pattern' && (
          <p className={s.error}>Alphabetical characters only</p>
        )}
                </label>
                <label className={s.label}>Email
    <input {...register("email", {required: true, type: 'email'})}className={s.input} title ="Input your email" type="email" placeholder="example@test.com" />
    {errors?.email?.type === 'required' && (
          <p className={s.error}>This field is required</p>
        )}
                </label>
                <label className={s.label}>Password                    
    <input {...register("password", {required: true, minLength: 7} )} className={s.input} title ="Input your password" type="password" placeholder="Min 7 characters long" />
    {errors?.password?.type === 'required' && (
          <p className={s.error}>This field is required</p>
        )}
    {errors?.password?.type === 'minLength' && (
          <p className={s.error}>Password must contain minimum 7 charts</p>
        )}
    
    </label>
    <button className={s.button} type="submit">REGISTER</button>
                
  </form>
 
</>
    )
    
}