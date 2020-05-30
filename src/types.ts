/**
 * @package @GrandSchema
 * @author Tarek Salem
 * MIT License
 */
/**
 * ==============================================================================
 * File Role: Types File
 * ==============================================================================
 */
export interface Settings{required?: boolean, type:any, defaultValue?: any, unique?: boolean, message?: string, enum?: string[], isModel?:boolean, notEmpty?:string, min?:number, max?:number, regex?:RegExp, loop?:boolean, length?:number, onRead?:Function, onChange?:Function, beforeSet?: Function}

export interface OptionalObject {
    [key:string]:any
}