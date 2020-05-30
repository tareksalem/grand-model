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
import { Settings } from "./types";
import { Entity } from "./index";
declare const property: (settings: Settings) => (target: Entity, key: string) => void;
declare const method: (target: any, key: any) => void;
declare const settings: (settings?: {}) => (constructor: Function) => void;
export { property, method, settings };
