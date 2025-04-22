type TreeOption = {
    /**
     * 主键
     */
    key?: string;
    /**
     * 父节点主键
     */
    pKey?: string;
    /**
     * 指定根节点
     */
    rootKey?: string | number;
    /**
     * 子元素集合字段
     */
    childrenKey?: string;
    /**
     * 获取父元素引用字段
     */
    parentKey?: string;
    /**
     * 元素浅拷贝，默认浅拷贝
     */
    copy?: boolean;
    /**
     * 通过 "[parentKey]" 访问父元素，parentKey 可以修改该属性名，默认为 true
     */
    assign?: boolean;
    transKey?: boolean;
    [key: string]: any;
};
type RecordMap<T = any> = Record<number | string, T>;
/**
 * 数组工具类
 */
declare const ArrayUtil: {
    /**
     * 将对象数组转换为树结构的数据
     * @param array 对象数据
     * @param options 转换为树结构数据特征描述
     * @param returnMap 获取数组的扁平数据
     */
    transToTree: (array: RecordMap[], options?: TreeOption, returnMap?: (map: RecordMap<RecordMap>, originalMap: RecordMap<RecordMap>) => void) => RecordMap[];
    /**
     * 转换对象数组的元素属性
     * @param array 被转换的数组
     * @param options { keyMap: 属性名映射对象，key 为新属性名 value 为原始属性名; recursive: 是否递归; childrenKey: 需要递归的属性名; delOriginalKey: 删除原始属性名 }
     */
    transItemProps: (array: RecordMap[], options: {
        keyMap: Record<string | number, string | number>;
        recursive?: boolean;
        childrenKey?: string;
        delOriginalKey?: boolean;
    }) => RecordMap[];
};
export default ArrayUtil;
