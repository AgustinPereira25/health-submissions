import axios from 'axios';

const submissionApi = axios.create({
    baseURL: process.env.HOST_NAME + '/api',

})

export default submissionApi;