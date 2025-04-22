import TypeUtil from './type-util';

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
const ArrayUtil = {
  /**
   * 将对象数组转换为树结构的数据
   * @param array 对象数据
   * @param options 转换为树结构数据特征描述
   * @param returnMap 获取数组的扁平数据
   */
  transToTree: (
    array: RecordMap[],
    options?: TreeOption,
    returnMap?: (
      map: RecordMap<RecordMap>,
      originalMap: RecordMap<RecordMap>
    ) => void
  ): RecordMap[] => {
    const {
      key = 'key',
      pKey = 'pKey',
      rootKey,
      childrenKey = 'children',
      parentKey = 'parent',
      copy = true,
      assign = true,
      transKey = false,
      ...keyMap
    } = options || {};

    // 转换其他属性
    const assignProperties = (() => {
      const assign = copy
        ? (item: RecordMap) => ({ ...item })
        : (item: RecordMap) => item;
      transKey && key !== 'key' && (keyMap.key = key);
      transKey && pKey !== 'pKey' && (keyMap.pKey = key);
      return TypeUtil.isEmptyObject(keyMap)
        ? assign
        : (() => {
            const keys = Object.keys(keyMap);
            return (item: RecordMap) => {
              keys.forEach((key, index) => {
                item[key] = item[keyMap[key]];
              });
              return assign(item);
            };
          })();
    })();

    // 设置parent属性
    const defineParent = (() => {
      if (!assign)
        return (child: RecordMap, parent: RecordMap) => {
          // do nothing
        };
      return typeof Object.defineProperty === 'function'
        ? (child: RecordMap, parent: RecordMap) => {
            Object.defineProperty(child, parentKey, {
              get() {
                return parent;
              },
              configurable: false,
              enumerable: false,
            });
          }
        : (child: RecordMap, parent: RecordMap) => {
            child.getParent = () => parent;
          };
    })();

    const ROOT_KEY = '__root__';
    // 按照父节点Id分组
    const groups: RecordMap<RecordMap[]> = {
      // 缓存根节点
      [ROOT_KEY]: [],
    };
    // 数据扁平化
    const originalMap: RecordMap<RecordMap> = {};
    const mergedMap: RecordMap<RecordMap> = {};

    const isInvalidPk = (pk: any) => !pk && pk !== 0;

    // 遍历数组进行分组
    (Array.isArray(array) ? array : [])
      .map((item) => {
        const newItem = assignProperties(item);
        const pk = newItem[pKey];
        const k = newItem[key];
        originalMap[k] = { ...newItem };
        mergedMap[k] = newItem;
        if (isInvalidPk(pk)) {
          groups[ROOT_KEY].push(newItem);
        } else if (groups[pk]) {
          groups[pk].push(newItem);
        } else {
          groups[pk] = [newItem];
        }
        return newItem;
      })
      .forEach((item) => {
        item[childrenKey] = groups[item[key]];
        delete groups[item[key]];
        const pk = item[pKey];
        defineParent(item, isInvalidPk(pk) ? null : mergedMap[pk]);
      });

    const { [ROOT_KEY]: children, ...others } = groups;

    const m =
      typeof options === 'function'
        ? options
        : typeof returnMap === 'function'
        ? returnMap
        : undefined;
    m && m(mergedMap, originalMap);
    // 有指定根节点
    return !TypeUtil.isEmpty(rootKey)
      ? groups[rootKey] || []
      : children.concat(...Object.values(others));
  },

  /**
   * 转换对象数组的元素属性
   * @param array 被转换的数组
   * @param options { keyMap: 属性名映射对象，key 为新属性名 value 为原始属性名; recursive: 是否递归; childrenKey: 需要递归的属性名; delOriginalKey: 删除原始属性名 }
   */
  transItemProps: (
    array: RecordMap[],
    options: {
      keyMap: Record<string | number, string | number>;
      recursive?: boolean;
      childrenKey?: string;
      delOriginalKey?: boolean;
    }
  ): RecordMap[] => {
    const {
      keyMap,
      recursive = true,
      childrenKey = 'children',
      delOriginalKey = true,
    } = options;

    return array.map((item) => {
      // 遍历字段
      Object.keys(keyMap).forEach((key) => {
        item[key] = item[keyMap[key]];
        delOriginalKey && delete item[keyMap[key]];
      });

      const children = item[childrenKey];

      // 递归
      recursive &&
        TypeUtil.isArray(children) &&
        (item[childrenKey] = ArrayUtil.transItemProps(children, options));
      return item;
    });
  },
};

export default ArrayUtil;
