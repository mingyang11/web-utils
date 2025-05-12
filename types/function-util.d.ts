/**
 * 函数处理工具类
 */
declare const FunctionUtil: {
    /**
     * 防抖函数（一定时间范围内连续触发回调只执行一次）
     * @param fn 回调函数
     * @param delay 超过这个时间不触发函数才执行回调
     */
    debounce(fn: (...args: any[]) => void, delay?: number): (...args: any[]) => void;
    /**
     * 节流函数 （第一次立即执行，一定间隔后才能继续相应，连续事件结束后执行最后一次）
     * @param fn 回调
     * @param delay 间隔频率
     * @param last 是否执行最后一次
     */
    throttle(fn: (...args: any[]) => void, delay?: number, last?: boolean): (...args: any[]) => void;
    /**
     * 深拷贝函数
     * @param source 要拷贝的数据
     * @param weakMap 用于循环引用检测的 WeakMap
     * @returns 深拷贝后的数据
     */
    deepClone<T>(source: T, weakMap?: WeakMap<any, any>): T;
};
export default FunctionUtil;
