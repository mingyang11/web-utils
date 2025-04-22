const NumberUtil = {
  /**
   * 判断是否为数字
   * @param value
   * @return boolean
   */
  isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
  },

  /**
   * 将输入转换为数字，如果转换失败则返回默认值
   * @param value 要转换的值
   * @param defaultValue 默认值
   * @return number
   */
  toNumber(value: any, defaultValue = 0): number {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  },
};

export default NumberUtil;
