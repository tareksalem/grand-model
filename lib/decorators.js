"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = exports.method = exports.property = void 0;
const property = (settings) => {
    return (target, key) => {
        target.properties = target.properties || [];
        target.properties.push(key);
        target.Schema = target.Schema || {};
        // console.log(target);
        target.Schema[key] = settings;
        let value = target[key];
        let oldValue = value;
        const getter = () => {
            // check if on read
            if (typeof settings.onRead === "function") {
                return settings.onRead(value);
            }
            return value;
        };
        const setter = (next) => {
            if (typeof settings.beforeSet === "function") {
                value = settings.beforeSet(value, next);
                if (typeof settings.onChange === "function") {
                    settings.onChange(value, oldValue);
                }
            }
            else {
                value = next;
                if (typeof settings.onChange === "function") {
                    settings.onChange(value, oldValue);
                }
            }
            if (!value && settings.defaultValue)
                value = settings.defaultValue;
        };
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            configurable: true,
            enumerable: true
        });
    };
};
exports.property = property;
const method = (target, key) => {
    target.Methods = target.Methods || class {
    };
    let classMethod = target[key];
    target.Methods.prototype[key] = classMethod;
};
exports.method = method;
const settings = (settings = {}) => {
    return (constructor) => {
        constructor.prototype.settings = settings;
        constructor.prototype.properties = constructor.prototype.properties || [];
        constructor.prototype.validations = constructor.prototype.validations || [];
        constructor.prototype.Methods = constructor.prototype.Methods;
    };
};
exports.settings = settings;
