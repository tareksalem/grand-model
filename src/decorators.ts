/**
 * @package @GrandSchema
 * @author Tarek Salem
 * MIT License
 */
/**
 * ==============================================================================
 * File Role: Decorators File
 * ==============================================================================
 */
import {Settings} from "./types";
import {Entity} from "./index";
const property = (settings: Settings) => {
    return (target: Entity, key: string) => {
        target.properties = target.properties || [];
        target.properties.push(key);
        target.Schema = target.Schema || {};
        // console.log(target);
        target.Schema[key] = settings
        let value = target[key];
        let oldValue = value;
        const getter = () => {
            // check if on read
            if(typeof settings.onRead === "function") {
                return settings.onRead(value);
            }
            return value;
        }
        const setter = (next) => {
            if(typeof settings.beforeSet === "function") {
                value = settings.beforeSet(value, next);
                if(typeof settings.onChange === "function") {
                    settings.onChange(value, oldValue);
                }
            } else {
                value = next;
                if(typeof settings.onChange === "function") {
                    settings.onChange(value, oldValue);
                }
            }
            if(!value && settings.defaultValue) value = settings.defaultValue
        }
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            configurable: true,
            enumerable: true
        })
    }
}

const method = (target, key) => {
    target.Methods = target.Methods || class{};
    let classMethod = target[key];
    target.Methods.prototype[key] = classMethod;
}

const settings = (settings: {} = {}) => {
    return (constructor: Function) => {
        constructor.prototype.settings = settings
        constructor.prototype.properties = constructor.prototype.properties || [];
        constructor.prototype.validations = constructor.prototype.validations || [];
        constructor.prototype.Methods = constructor.prototype.Methods
    }
}



export {property, method, settings};