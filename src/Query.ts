export default interface Query{
    query: string;
    parameters: any[];
    type: string;
    databasePort?: string;
    callback?: any;
}