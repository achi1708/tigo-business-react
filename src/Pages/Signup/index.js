import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SignUp from './../../Services/SignUp';
import tigoBusiness from './../../Assets/images/tigo-business-logo.png';

const Signup = () => {
    const [isLoading, setLoading] = useState(false);
    const [errorForm, setErrorForm] = useState('');
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({mode: 'all'});

    const validations = {
        name: { required: "Indícanos tu nombre" },
        lastname: { required: "Indícanos tu apellido" },
        email: { required: "Ingresa tu correo electrónico", 
                 pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Ingresa un correo electrónico válido"
                 }
               },
        cellphone: { minLength: {
                        value: 10,
                        message: "Ingresa un número de celular válido"
                     },
                     maxLength: {
                        value: 10,
                        message: "Ingresa un número de celular válido"
                     } 
                   },
        terminos: { required: "Por favor acepta nuestras políticas de Habeas Data" }
    };

    const onFormSubmit = async (data) => {
        setLoading(true);
        setErrorForm('');
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("lastname", data.lastname);
        formData.append("email", data.email);
        formData.append("cellphone", data.cellphone);
        formData.append("company", data.company);

        const res= await SignUp.doSignUp(formData);
        setLoading(false);
        if(res.status == 'Ok' && res.data){
            navigate(`${process.env.REACT_APP_BASE_URL}/code/${res.data}`,{state: { fromApp: true }});
        }else{
            setErrorForm(res.message);
        }
    }

    return(
        <div id="signup-page" className="content-page">
            <div id="intro-form">
                <h3>Si vas a ser el gran ganador<br/>de este premio, necesitamos <br/>conocerte.</h3>
            </div>
            <div id="form-content">
                <h6>Registra tus datos<br/>para contactarte</h6>
                {errorForm != '' && <small className="form-error">{errorForm}</small>}
                <form method='post' onSubmit={handleSubmit(onFormSubmit)}>
                    <input disabled={isLoading} type="text" name="name" placeholder="Nombre" {...register('name', validations.name)} />
                    <small className="form-error"> {errors?.name && errors.name.message} </small>
                    <input disabled={isLoading} type="text" name="lastname" placeholder="Apellido" {...register('lastname', validations.lastname)} />
                    <small className="form-error"> {errors?.lastname && errors.lastname.message} </small>
                    <input disabled={isLoading} type="email" name="email" placeholder="Correo electrónico" {...register('email', validations.email)} />
                    <small className="form-error"> {errors?.email && errors.email.message} </small>
                    <input disabled={isLoading} type="number" name="cellphone" placeholder="Celular" {...register('cellphone', validations.cellphone)} />
                    <small className="form-error"> {errors?.cellphone && errors.cellphone.message} </small>
                    <input disabled={isLoading} type="text" name="company" placeholder="Empresa" {...register('company')} />
                    <button disabled={isLoading} type="submit" name="registrar">
                        Registrar 
                    </button>
                    <div id="terms-container" className="full-width">
                        <span>Check</span>
                        <label className="check-cont">
                            <input type="checkbox" name="terminos" {...register('terminos', validations.terminos)} />
                            <span className="checkmark"></span>
                        </label>
                        <span><b>Acepta nuestras políticas de Habeas Data</b></span>
                    </div>
                    <div className="full-width text-center">
                        <small className="form-error"> {errors?.terminos && errors.terminos.message} </small>
                    </div>
                </form>
            </div>
            <div id="footer-form">
                <img src={tigoBusiness} width="200px" alt="Tigo Business" />
            </div>
        </div>
    );
}

export default Signup;