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
import { Schema, ValidationResult } from "grand-validator";
import { OptionalObject } from "./types";
import { property, method, settings } from "./decorators";
declare abstract class Entity {
    [prop: string]: any;
    properties: string[];
    settings: {};
    Methods: any;
    validations: ValidationResult[];
    data: OptionalObject;
    Schema: Schema | OptionalObject;
    functions: {
        toObject: () => {};
        toJSON: () => string;
        validate: () => void;
    };
    constructor(data?: OptionalObject);
    private checkFields;
}
export { Entity, property, settings, method };
