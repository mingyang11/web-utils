/**
 * 函数处理工具类
 */
const FunctionUtil = {
  /**
   * 防抖函数（一定时间范围内连续触发回调只执行一次）
   * @param fn 回调函数
   * @param delay 超过这个时间不触发函数才执行回调
   */
  debounce(fn: (...args: any[]) => void, delay = 300) {
    let id: any = null;

    return (...args: any[]) => {
      id && clearTimeout(id);
      id = setTimeout(() => fn(...args), delay);
    };
  },

  /**
   * 节流函数 （第一次立即执行，一定间隔后才能继续相应，连续事件结束后执行最后一次）
   * @param fn 回调
   * @param delay 间隔频率
   * @param last 是否执行最后一次
   */
  throttle(fn: (...args: any[]) => void, delay = 300, last = true) {
    let t = 0;
    let id: any = null;

    return (...args: any[]) => {
      id && clearTimeout(id);
      const now = Date.now();
      const diff = now - t;

      const execute = () => {
        t = now;
        fn(...args);
      };

      // 大于间隔频率立即执行
      if (diff >= delay) {
        execute();
      } else if (last) {
        // 小于间隔频率，则延后相应时间执行，保证最后一次执行
        id = setTimeout(execute, delay - diff);
      }
    };
  },

  /**
   * 深拷贝函数
   * @param source 要拷贝的数据
   * @param weakMap 用于循环引用检测的 WeakMap
   * @returns 深拷贝后的数据
   */
  deepClone<T>(source: T, weakMap = new WeakMap<any, any>()): T {
    // 处理原始类型
    if (typeof source !== 'object' || source === null) {
      return source;
    }

    // 处理循环引用
    if (weakMap.has(source)) {
      return weakMap.get(source);
    }

    // 处理日期对象
    if (source instanceof Date) {
      return new Date(source.getTime()) as any;
    }

    // 处理正则表达式
    if (source instanceof RegExp) {
      return new RegExp(source.source, source.flags) as any;
    }

    // 处理 Map
    if (source instanceof Map) {
      const clonedMap = new Map();
      weakMap.set(source, clonedMap);
      source.forEach((value, key) => {
        clonedMap.set(
          this.deepClone(key, weakMap),
          this.deepClone(value, weakMap)
        );
      });
      return clonedMap as any;
    }

    // 处理 Set
    if (source instanceof Set) {
      const clonedSet = new Set();
      weakMap.set(source, clonedSet);
      source.forEach((value) => {
        clonedSet.add(this.deepClone(value, weakMap));
      });
      return clonedSet as any;
    }

    // 处理数组
    if (Array.isArray(source)) {
      const clonedArray: any[] = [];
      weakMap.set(source, clonedArray);
      for (let i = 0; i < source.length; i++) {
        clonedArray[i] = this.deepClone(source[i], weakMap);
      }
      return clonedArray as any;
    }

    // 处理普通对象
    const clonedObject: any = Object.create(Object.getPrototypeOf(source));
    weakMap.set(source, clonedObject);
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        clonedObject[key] = this.deepClone(source[key], weakMap);
      }
    }

    // 处理 Symbol 属性
    const symbolKeys = Object.getOwnPropertySymbols(source);
    for (const symbolKey of symbolKeys) {
      (clonedObject as any)[symbolKey] = this.deepClone(
        (source as any)[symbolKey],
        weakMap
      );
    }

    return clonedObject;
  },
};

export default FunctionUtil;
