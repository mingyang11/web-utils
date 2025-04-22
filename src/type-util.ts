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
};

export default TypeUtil;
