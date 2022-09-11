import { useState } from 'react';
import { Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SignUp from './../../Services/SignUp';
import Code from './../../Services/Code';
import tigoBusiness from './../../Assets/images/tigo-business-logo.png';

const CheckCode = () => {
    const { state } = useLocation();
    console.log(state);
    const [isLoading, setLoading] = useState(false);
    const [errorForm, setErrorForm] = useState('');
    let navigate = useNavigate();
    let params = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm({mode: 'all'});

    const validations = {
        codigo: { required: "Por favor ingresa tu código" }
    };

    const onFormSubmit = async (data) => {
        setLoading(true);
        setErrorForm('');
        const formData = new FormData();
        formData.append("codigo", data.codigo);

        const res= await SignUp.setCode(params.userId, formData);
        if(res.status == 'Ok' && res.data){
            const res2 = await Code.checkCodeOut(data.codigo);
            if(res2.status == 'Ok' && res2.data){
                if(res2.data.length){
                    navigate(`${process.env.REACT_APP_BASE_URL}/winner`);
                }else{
                    navigate(`${process.env.REACT_APP_BASE_URL}/goodtry`);
                }
            }else{
                setErrorForm(res.message);
            }
        }else{
            setErrorForm(res.message);
        }
        setLoading(false);
    }

    return (!state?.fromApp) ? 
        <Navigate to="/" replace={true} />
        :
        <div id="checkcode-page" className="content-page">
            <div>
                <div id="title-page">
                    <h2>Ingresa tu código</h2>
                    <hr/>
                </div>
                <div id="form-content">
                    <form method='post' onSubmit={handleSubmit(onFormSubmit)}>
                        <input disabled={isLoading} type="text" name="codigo" {...register('codigo', validations.codigo)} />
                        <small className="form-error"> {errors?.codigo && errors.codigo.message} </small>
                        {errorForm != '' && <small className="form-error">{errorForm}</small>}
                        <h5>¿Eres el ganador del premio?</h5>
                        <button disabled={isLoading} className="blue-btn" type="submit" name="enviar">Click Aquí</button>
                    </form>
                </div>
            </div>
            <div id="footer-form">
                <img src={tigoBusiness} width="200px" alt="Tigo Business" />
            </div>
        </div>
    ;
}

export default CheckCode;