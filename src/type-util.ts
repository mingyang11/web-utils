const os = Object.prototype.toString;

const getTypeOf = (arg: any) => os.call(arg).slice(8, -1).toLowerCase();
const assert = (arg: any, type: string) => getTypeOf(arg) === type;

const TypeUtil = {
  /**
   * 判断是否为null
   * @param value
   * @return boolean
   */
  isNull(value: any): boolean {
    return value === null;
  },

  /**
   * 判断是否为空, 包括null, undefined, '', NaN
   * @param value
   * @param isValidateStr 是否校验'null', 'undefined', 'NaN'类数据
   * @return boolean
   */
  isEmpty(value: any, isValidateStr = false) {
    const emptyList: any[] = [
      null,
      undefined,
      '',
      NaN,
      ...(isValidateStr ? ['null', 'undefined', 'NaN'] : []),
    ];
    return emptyList.includes(value);
  },

  /**
   * 判断参数为空、空数组、空对象
   * @param obj
   * @return boolean
   */
  isEmptyObject(obj: any): boolean {
    return (
      TypeUtil.isEmpty(obj) ||
      (TypeUtil.isArray(obj) && !obj.length) ||
      (TypeUtil.isPlainObject(obj) && !Object.keys(obj).length)
    );
  },

  /**
   * 判断参数属于数组类型
   * @param arr
   * @return boolean
   */
  isArray(arr: any): boolean {
    return Array.isArray(arr);
  },

  /**
   * 判断参数属于简单对象，使用 Object.prototype.toString 判断
   * @param obj
   * @return boolean
   */
  isPlainObject(obj: any): boolean {
    return assert(obj, 'object');
  },
};

export default TypeUtil;
