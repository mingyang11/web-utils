declare const NumberUtil: {
    /**
     * 判断是否为数字
     * @param value
     * @return boolean
     */
    isNumber(value: any): boolean;
    /**
     * 将输入转换为数字，如果转换失败则返回默认值
     * @param value 要转换的值
     * @param defaultValue 默认值
     * @return number
     */
    toNumber(value: any, defaultValue?: number): number;
    /**
     * 保留固定长度位的小数
     * @param value 要转换的数字
     * @param length 小数位数
     * @return string
     */
    fixedNumber(value: number, length?: number): string;
    /**
     * 将数字转换为千分位格式
     * @param num 要转换的数字
     * @return string
     */
    parseThousands(num: number | string): string;
    /**
     * 数字自适应格式化显示
     * @param num
     * @param decimal 小数位数
     * @param fixed 固定小数位数
     */
    format(num: number, decimal?: number, fixed?: boolean): string;
    /**
     * 将数字转换为中文
     * @param num 要转化的数字
     * @param options 转换参数 繁体中文/中文金额 { money: 金额,traditional: 繁体 }
     */
    cn(num: number | string, options?: true | {
        money: boolean;
        traditional: boolean;
    }): string;
};
export default NumberUtil;
