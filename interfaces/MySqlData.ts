//Interface designed for writting the sql query and the array of values.
export interface ISqlData{
    query: string,
    values?:(string|number|undefined)[]
}