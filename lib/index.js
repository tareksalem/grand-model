"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.method = exports.settings = exports.property = exports.Entity = void 0;
const grand_validator_1 = require("grand-validator");
const decorators_1 = require("./decorators");
Object.defineProperty(exports, "property", { enumerable: true, get: function () { return decorators_1.property; } });
Object.defineProperty(exports, "method", { enumerable: true, get: function () { return decorators_1.method; } });
Object.defineProperty(exports, "settings", { enumerable: true, get: function () { return decorators_1.settings; } });
class Entity {
    constructor(data = {}) {
        this.functions = {
            toObject: () => {
                let object = {};
                let self = this;
                this.properties.map((key) => {
                    object[key] = self[key];
                });
                return object;
            },
            toJSON: () => {
                let object = this.functions.toObject();
                return JSON.stringify(object);
            },
            validate: () => {
                let Schema = this.Schema;
                let validations = this.checkFields();
                this.validations = validations;
            },
        };
        this.data = data;
        this.Schema = this.Schema || {};
        this.properties = this.properties || [];
        this.properties.map((key) => {
            this[key] = data[key];
        });
    }
    checkFields() {
        let validations = [];
        const ModelSchema = this.Schema;
        const self = this;
        let schemaObject = {};
        Object.keys(ModelSchema).map(key => {
            let schema = ModelSchema[key];
            let data = self[key];
            if (schema.isModel) {
                if (Array.isArray(schema.type) && schema.type.length > 0) {
                    let model = new schema.type[0](data);
                    schemaObject[key] = { type: [model.Schema], required: schema.required, message: schema.message };
                }
                else {
                    let model = new schema.type(data);
                    schemaObject[key] = { type: model.Schema, required: schema.required, message: schema.message };
                }
            }
            else {
                schemaObject[key] = schema;
            }
        });
        let schemaValidation = new grand_validator_1.Schema(schemaObject);
        schemaValidation.validate(this.data);
        validations = [...schemaValidation.validations];
        return validations;
    }
}
exports.Entity = Entity;
