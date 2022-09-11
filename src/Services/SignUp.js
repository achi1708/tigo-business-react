import httpInstance from './Base';

const SignUp = {
    async doSignUp (formData) {
        try {
            const {data} = await httpInstance.post(`participant`, formData);
            return data;
        } catch (error){
            return error.response.data;
        }
    },
    async setCode (userId, formData) {
        try {
            const {data} = await httpInstance.post(`participant/${userId}`, formData);
            return data;
        } catch (error){
            return error.response.data;
        }
    }
}

export default SignUp;