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
};

var NumberUtil = {
    /**
     * 判断是否为数字
     * @param value
     * @return boolean
     */
    isNumber: function (value) {
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
};

export { NumberUtil, TypeUtil };
