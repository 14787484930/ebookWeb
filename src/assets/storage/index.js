/*
* localStorage 数据长期有效，所有同源窗口共享
* sessionStorage 仅在当前浏览器窗口关闭前有效,不共享
* */

let storage = {
    /**
     * set存储方法
     * @ param {String}  key键
     * @ param {String}  value值
     * */
    setLocal(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },

    /**
     * get取值方法
     * @ param {String}  key键
     * */
    getLocal(key) {
        return JSON.parse(localStorage.getItem(key))
    },

    /**
     * removeOne删除数据
     * @ param {String}  key键
     * */
    removeOneLocal(key) {
        localStorage.removeItem(key)
    },

    /**
     * removeAll删除数据
     * @ param {String}  key键
     * */
    removeAllLocal() {
        localStorage.clear()
    },

    /**
     * set存储方法
     * @ param {String}  key键
     * @ param {String}  value值
     * */
    setSession(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value))
    },

    /**
     * get取值方法
     * @ param {String}  key键
     * */
    getSession(key) {
        return JSON.parse(sessionStorage.getItem(key))
    },

    /**
     * removeOne删除数据
     * @ param {String}  key键
     * */
    removeOneSession(key) {
        sessionStorage.removeItem(key)
    },

    /**
     * removeAll删除数据
     * */
    removeAllSession() {
        localStorage.clear();
    }
};

// 暴露给外部访问
export default storage
