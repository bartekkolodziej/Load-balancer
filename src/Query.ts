export default interface Query{
    query: string;
    parameters: any[];
    type: string;
    databasePort?: number;
    callback?: any;
}