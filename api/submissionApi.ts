import axios from 'axios';

const submissionApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_NAME + '/api',

})

export default submissionApi;