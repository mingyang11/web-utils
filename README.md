# web-utils

前端通用工具库，提供类型判断、数组处理、数字处理等常用功能。

## 安装

```bash
npm install fuyao-web-utils
```

## 功能模块

### TypeUtil - 类型判断工具

提供多种类型判断方法，帮助您处理各种数据类型。

```javascript
import { TypeUtil } from 'fuyao-web-utils';

// 判断是否为空
TypeUtil.isEmpty(null); // true
TypeUtil.isEmpty(undefined); // true
TypeUtil.isEmpty(''); // true
TypeUtil.isEmpty(NaN); // true
TypeUtil.isEmpty(0); // false
TypeUtil.isEmpty(false); // false

// 判断是否为空（包括特殊字符串）
TypeUtil.isEmpty('null', true); // true
TypeUtil.isEmpty('undefined', true); // true
TypeUtil.isEmpty('NaN', true); // true

// 判断是否为空对象/空数组/空值
TypeUtil.isEmptyObject({}); // true
TypeUtil.isEmptyObject([]); // true
TypeUtil.isEmptyObject(null); // true

// 判断是否为数组
TypeUtil.isArray([]); // true
TypeUtil.isArray({}); // false

// 判断是否为普通对象
TypeUtil.isPlainObject({}); // true
TypeUtil.isPlainObject([]); // false
TypeUtil.isPlainObject(null); // false
```

### NumberUtil - 数字处理工具

提供数字相关的操作方法，包括数字判断、转换、格式化等功能。

```javascript
import { NumberUtil } from 'fuyao-web-utils';

// 判断是否为数字
NumberUtil.isNumber(123); // true
NumberUtil.isNumber('123'); // false
NumberUtil.isNumber(NaN); // false

// 将值转换为数字
NumberUtil.toNumber('123'); // 123
NumberUtil.toNumber('abc'); // 0 (默认值)
NumberUtil.toNumber('abc', -1); // -1 (自定义默认值)

// 保留固定小数位
NumberUtil.fixedNumber(123.456, 2); // "123.46"

// 千分位格式化
NumberUtil.parseThousands(1234567.89); // "1,234,567.89"

// 数字自适应格式化（万、亿）
NumberUtil.format(12345); // "1.23万"
NumberUtil.format(123456789); // "1.23亿"

// 数字转中文
NumberUtil.cn(123); // "一百二十三"
NumberUtil.cn(123.45); // "一百二十三点四五"

// 数字转中文金额
NumberUtil.cn(123.45, { money: true }); // "一百二十三圆四角五分"

// 数字转繁体中文
NumberUtil.cn(123, { traditional: true }); // "壹佰贰拾叁"

// 数字转繁体中文金额
NumberUtil.cn(123.45, true); // "壹佰贰拾叁圆肆角伍分"
```

### ArrayUtil - 数组处理工具

提供数组操作和转换功能，特别是处理树形结构数据。

```javascript
import { ArrayUtil } from 'fuyao-web-utils';

// 将扁平数据转换为树形结构
const flatData = [
  { id: 1, name: '部门A', parentId: null },
  { id: 2, name: '部门B', parentId: 1 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 2 },
];

const treeData = ArrayUtil.transToTree(flatData, {
  key: 'id',
  pKey: 'parentId',
  childrenKey: 'children',
});

// 转换数组元素的属性名
const result = ArrayUtil.transItemProps(flatData, {
  keyMap: {
    identifier: 'id',
    title: 'name',
    pid: 'parentId',
  },
  delOriginalKey: true, // 删除原始属性
});
```

## 许可证

MIT
