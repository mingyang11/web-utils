declare const TypeUtil: {
    /**
     * 判断是否为null
     * @param value
     * @return boolean
     */
    isNull(value: any): boolean;
    /**
     * 判断是否为空, 包括null, undefined, '', NaN
     * @param value
     * @param isValidateStr 是否校验'null', 'undefined', 'NaN'类数据
     * @return boolean
     */
    isEmpty(value: any, isValidateStr?: boolean): boolean;
    /**
     * 判断参数为空、空数组、空对象
     * @param obj
     * @return boolean
     */
    isEmptyObject(obj: any): boolean;
    /**
     * 判断参数属于数组类型
     * @param arr
     * @return boolean
     */
    isArray(arr: any): boolean;
    /**
     * 判断参数属于简单对象，使用 Object.prototype.toString 判断
     * @param obj
     * @return boolean
     */
    isPlainObject(obj: any): boolean;
};
export default TypeUtil;
