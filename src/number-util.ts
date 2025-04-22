import TypeUtil from './type-util';

const format = (tw = false) => {
  const integer_zh_cn = '零一二三四五六七八九';
  const integer_zh_tw = '零壹贰叁肆伍陆柒捌玖';
  const decimalism_zh_cn = ['', '十', '百', '千'];
  const decimalism_zh_tw = ['', '拾', '佰', '仟'];
  const units_cn = ['', '万', '亿', '万亿', '亿亿'];

  return {
    units: units_cn,
    decimalisms: tw ? decimalism_zh_tw : decimalism_zh_cn,
    integers: tw ? integer_zh_tw : integer_zh_cn,
  };
};

const formatNumber = (num: number, y: number, decimal: number) => {
  if (num >= Math.pow(10, y)) {
    return Math.round(num / Math.pow(10, y - decimal)) / Math.pow(10, decimal);
  }
  return false;
};

const NumberUtil = {
  /**
   * 判断是否为数字
   * @param value
   * @return boolean
   */
  isNumber(value: any): boolean {
    // 是数字，且不是NaN
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

  /**
   * 保留固定长度位的小数
   * @param value 要转换的数字
   * @param length 小数位数
   * @return string
   */
  fixedNumber(value: number, length = 0): string {
    return (Math.round(Number(value) * 10 ** length) / 10 ** length).toFixed(
      length
    );
  },

  /**
   * 将数字转换为千分位格式
   * @param num 要转换的数字
   * @return string
   */
  parseThousands(num: number | string): string {
    if (TypeUtil.isEmpty(num)) return '';
    const [integer = '0', decimal] = `${num}`.split('.');
    return [integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'), decimal]
      .filter((item) => !TypeUtil.isEmpty(item))
      .join('.');
  },

  /**
   * 数字自适应格式化显示
   * @param num
   * @param decimal 小数位数
   * @param fixed 固定小数位数
   */
  format(num: number, decimal = 2, fixed = false): string {
    let n = formatNumber(num, 8, decimal);
    //  亿
    if (!n) {
      n = formatNumber(num, 4, decimal);
    } else {
      return (fixed ? n.toFixed(decimal) : n) + '亿';
    }
    // 万
    if (!n) {
      return `${num}`;
    } else {
      return (fixed ? n.toFixed(decimal) : n) + '万';
    }
  },

  /**
   * 将数字转换为中文
   * @param num 要转化的数字
   * @param options 转换参数 繁体中文/中文金额 { money: 金额,traditional: 繁体 }
   */
  cn(
    num: number | string,
    options?: true | { money: boolean; traditional: boolean }
  ): string {
    // NaN !== NaN
    if (Number(num) !== Number(num)) return `${num ?? ''}`;
    // 转换参数，繁体中文、中文金额
    const { traditional = false, money = false } =
      options === true ? { traditional: true, money: true } : options || {};
    const [integer, decimal = ''] = `${num}`.split('.');
    const groups = integer.replace(/(\d)(?=(?:\d{4})+$)/g, '$1_').split('_');
    const { units, integers, decimalisms } = format(traditional);
    const toCN = (c: string) => integers.charAt(Number(c));
    // 整数部分
    const integer_cn = groups
      .reverse()
      .map((figure, i) => {
        const cn = figure
          .split('')
          .map((char, j) => {
            return char === '0'
              ? '零'
              : toCN(char) + decimalisms[figure.length - j - 1];
            // replace末尾的所有“零”，例如“壹仟零零零”变成“壹仟”；再replace中间的多个零，例如“壹万零零零玖”变成“壹万零玖”
          })
          .join('')
          .replace(/\u96f6+$/, '')
          .replace(/\u96f6+/g, '\u96f6');

        // 防止出现“零零零零”变成“”之后再加大数位，例如“（零零零零）万”变成“万”
        return cn.length ? cn + units[i] : units[i] ? '零' : '';
      })
      .reverse()
      .join('')
      .replace(/\u96f6+$/, '')
      .replace(/\u96f6+/g, '\u96f6');
    // 中文金额
    if (money) {
      if (!decimal.length || /^0+$/.test(decimal)) {
        return `${integer_cn}圆整`;
      }
      // 角、分
      const [j = '0', f = '0'] = decimal.split('');
      return `${integer_cn}圆${j === '0' ? '零' : toCN(j) + '角'}${
        f === '0' ? '' : toCN(f) + '分'
      }`;
    }
    // 小数部分
    const decimal_cn = !/^0+$/.test(decimal)
      ? decimal
          .split('')
          .map((d) => integers.charAt(Number(d)))
          .join('')
      : '';
    return decimal_cn ? `${integer_cn}点${decimal_cn}` : integer_cn;
  },
};

export default NumberUtil;
