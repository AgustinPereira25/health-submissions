export interface IUser {
    id?       :number;
    name      :string;
    phone?    :string;
    email     :string;
    otherInfo?:string;
    weight?   :string;
    height?   :string;
    password  :string;
    role      :string;   //Medico, Paciente 
    created_at?:string;
}