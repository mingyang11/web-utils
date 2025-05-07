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
};

export default FunctionUtil;
