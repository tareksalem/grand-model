/**
 * @package @GrandSchema
 * @author Tarek Salem
 * MIT License
 */
/**
 * ==============================================================================
 * File Role: Main File
 * ==============================================================================
 */

import {Schema, Types, Validator, ValidationResult} from "grand-validator";
import {Settings, OptionalObject} from "./types";
import {property, method, settings} from "./decorators";

abstract class Entity{
    [prop:string]: any
    properties: string[]
    settings:{}
    Methods: any
    validations: ValidationResult[]
    data: OptionalObject;
    // Validator:Validator
    Schema: Schema | OptionalObject
    functions = {
        toObject: () => {
            let object = {};
            let self = this;
            this.properties.map((key) => {
                object[key] = self[key];
            })
            return object;
        },
        toJSON:() => {
            let object = this.functions.toObject()
            return JSON.stringify(object);
        },
        validate:() => {
            let Schema = this.Schema;
            let validations = this.checkFields();
            this.validations = validations;
        },
    }
    constructor(data:OptionalObject = {}) {
        this.data = data;
        this.Schema = this.Schema || {};
        this.properties = this.properties || [];
        this.properties.map((key) => {
            this[key] = data[key];
        })
    }
    private checkFields() {
        let validations = [];
        const ModelSchema = this.Schema;
        const self = this;
        let schemaObject = {};
        Object.keys(ModelSchema).map(key => {
            let schema = ModelSchema[key];
            let data = self[key];
            if(schema.isModel) {
                if(Array.isArray(schema.type) && schema.type.length > 0) {
                    let model = new schema.type[0](data);                    
                    schemaObject[key] = {type: [model.Schema], required: schema.required, message: schema.message}
                } else {
                    let model = new schema.type(data);
                    schemaObject[key] = {type: model.Schema, required: schema.required, message: schema.message}
                }
            } else {
                schemaObject[key] = schema;
            }
        })
        let schemaValidation = new Schema(schemaObject);
        schemaValidation.validate(this.data);
        validations = [...schemaValidation.validations];
        return validations;
    }
}


export {Entity, property, settings, method}

