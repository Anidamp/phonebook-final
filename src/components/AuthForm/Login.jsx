import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import s from './AuthForm.module.css'
import { setCredentials } from '../../redux/slice'

import {useLoginMutation} from '../../serviceApi/Api'
import toast from 'react-hot-toast';

export default function LoginForm() {
     
    
    const{register, handleSubmit, reset, formState: { errors }}=useForm();
    const [loginUser] = useLoginMutation()
    const dispatch = useDispatch();


    const onSubmit = data => {loginUser(data).unwrap().then(fulfilled => {dispatch(setCredentials(fulfilled))
        toast.success(`Welcome, ${fulfilled.user.name}`)}).catch( error => toast.error('Login or password is invalid!',{id: 'err',iconTheme: {
            primary: '#e03c06',
            secondary: '#ecf0f3',
          }}) )
        
        reset()}

        return (
            <>
          
        
            
            
            
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                
                <label className={s.label}>Email
    <input {...register("email", {required: true})}className={s.input} title ="Input your email" type="email"  />
    {errors?.name?.type === 'required' && (
          <p className={s.error}>This field is required</p>
        )}
                </label>
                <label className={s.label}>Password                    
    <input {...register("password", {required: true} )} className={s.input} title ="Input your password" type="password"  />
    {errors?.password?.type === 'required' && (
          <p className={s.error}>This field is required</p>
        )}
    
    </label>
    <button className={s.button} type="submit">LOGIN</button>
                
  </form>
 
</>
    )
    
}