(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["web-utils"] = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var os = Object.prototype.toString;
    var getTypeOf = function (arg) { return os.call(arg).slice(8, -1).toLowerCase(); };
    var assert = function (arg, type) { return getTypeOf(arg) === type; };
    var TypeUtil = {
        /**
         * 判断是否为null
         * @param value
         * @return boolean
         */
        isNull: function (value) {
            return value === null;
        },
        /**
         * 判断是否为空, 包括null, undefined, '', NaN
         * @param value
         * @param isValidateStr 是否校验'null', 'undefined', 'NaN'类数据
         * @return boolean
         */
        isEmpty: function (value, isValidateStr) {
            if (isValidateStr === void 0) { isValidateStr = false; }
            var emptyList = __spreadArray([
                null,
                undefined,
                '',
                NaN
            ], (isValidateStr ? ['null', 'undefined', 'NaN'] : []), true);
            return emptyList.includes(value);
        },
        /**
         * 判断参数为空、空数组、空对象
         * @param obj
         * @return boolean
         */
        isEmptyObject: function (obj) {
            return (TypeUtil.isEmpty(obj) ||
                (TypeUtil.isArray(obj) && !obj.length) ||
                (TypeUtil.isPlainObject(obj) && !Object.keys(obj).length));
        },
        /**
         * 判断参数属于数组类型
         * @param arr
         * @return boolean
         */
        isArray: function (arr) {
            return Array.isArray(arr);
        },
        /**
         * 判断参数属于简单对象，使用 Object.prototype.toString 判断
         * @param obj
         * @return boolean
         */
        isPlainObject: function (obj) {
            return assert(obj, 'object');
        },
    };

    var format = function (tw) {
        if (tw === void 0) { tw = false; }
        var integer_zh_cn = '零一二三四五六七八九';
        var integer_zh_tw = '零壹贰叁肆伍陆柒捌玖';
        var decimalism_zh_cn = ['', '十', '百', '千'];
        var decimalism_zh_tw = ['', '拾', '佰', '仟'];
        var units_cn = ['', '万', '亿', '万亿', '亿亿'];
        return {
            units: units_cn,
            decimalisms: tw ? decimalism_zh_tw : decimalism_zh_cn,
            integers: tw ? integer_zh_tw : integer_zh_cn,
        };
    };
    var formatNumber = function (num, y, decimal) {
        if (num >= Math.pow(10, y)) {
            return Math.round(num / Math.pow(10, y - decimal)) / Math.pow(10, decimal);
        }
        return false;
    };
    var NumberUtil = {
        /**
         * 判断是否为数字
         * @param value
         * @return boolean
         */
        isNumber: function (value) {
            // 是数字，且不是NaN
            return typeof value === 'number' && !isNaN(value);
        },
        /**
         * 将输入转换为数字，如果转换失败则返回默认值
         * @param value 要转换的值
         * @param defaultValue 默认值
         * @return number
         */
        toNumber: function (value, defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            var num = Number(value);
            return isNaN(num) ? defaultValue : num;
        },
        /**
         * 保留固定长度位的小数
         * @param value 要转换的数字
         * @param length 小数位数
         * @return string
         */
        fixedNumber: function (value, length) {
            if (length === void 0) { length = 0; }
            return (Math.round(Number(value) * Math.pow(10, length)) / Math.pow(10, length)).toFixed(length);
        },
        /**
         * 将数字转换为千分位格式
         * @param num 要转换的数字
         * @return string
         */
        parseThousands: function (num) {
            if (TypeUtil.isEmpty(num))
                return '';
            var _a = "".concat(num).split('.'), _b = _a[0], integer = _b === void 0 ? '0' : _b, decimal = _a[1];
            return [integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'), decimal]
                .filter(function (item) { return !TypeUtil.isEmpty(item); })
                .join('.');
        },
        /**
         * 数字自适应格式化显示
         * @param num
         * @param decimal 小数位数
         * @param fixed 固定小数位数
         */
        format: function (num, decimal, fixed) {
            if (decimal === void 0) { decimal = 2; }
            if (fixed === void 0) { fixed = false; }
            var n = formatNumber(num, 8, decimal);
            //  亿
            if (!n) {
                n = formatNumber(num, 4, decimal);
            }
            else {
                return (fixed ? n.toFixed(decimal) : n) + '亿';
            }
            // 万
            if (!n) {
                return "".concat(num);
            }
            else {
                return (fixed ? n.toFixed(decimal) : n) + '万';
            }
        },
        /**
         * 将数字转换为中文
         * @param num 要转化的数字
         * @param options 转换参数 繁体中文/中文金额 { money: 金额,traditional: 繁体 }
         */
        cn: function (num, options) {
            // NaN !== NaN
            if (Number(num) !== Number(num))
                return "".concat(num !== null && num !== void 0 ? num : '');
            // 转换参数，繁体中文、中文金额
            var _a = options === true ? { traditional: true, money: true } : options || {}, _b = _a.traditional, traditional = _b === void 0 ? false : _b, _c = _a.money, money = _c === void 0 ? false : _c;
            var _d = "".concat(num).split('.'), integer = _d[0], _e = _d[1], decimal = _e === void 0 ? '' : _e;
            var groups = integer.replace(/(\d)(?=(?:\d{4})+$)/g, '$1_').split('_');
            var _f = format(traditional), units = _f.units, integers = _f.integers, decimalisms = _f.decimalisms;
            var toCN = function (c) { return integers.charAt(Number(c)); };
            // 整数部分
            var integer_cn = groups
                .reverse()
                .map(function (figure, i) {
                var cn = figure
                    .split('')
                    .map(function (char, j) {
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
                    return "".concat(integer_cn, "\u5706\u6574");
                }
                // 角、分
                var _g = decimal.split(''), _h = _g[0], j = _h === void 0 ? '0' : _h, _j = _g[1], f = _j === void 0 ? '0' : _j;
                return "".concat(integer_cn, "\u5706").concat(j === '0' ? '零' : toCN(j) + '角').concat(f === '0' ? '' : toCN(f) + '分');
            }
            // 小数部分
            var decimal_cn = !/^0+$/.test(decimal)
                ? decimal
                    .split('')
                    .map(function (d) { return integers.charAt(Number(d)); })
                    .join('')
                : '';
            return decimal_cn ? "".concat(integer_cn, "\u70B9").concat(decimal_cn) : integer_cn;
        },
    };

    exports.NumberUtil = NumberUtil;
    exports.TypeUtil = TypeUtil;

}));
