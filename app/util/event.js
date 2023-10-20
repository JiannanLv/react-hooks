const Event = {
  _handlers: {},

  /**
   * 单次触发绑定，trigger后销毁
   *
   * @param {string} event 事件名
   * @param {Function} handler 响应函数
   * @param {Object} context
   */
  one(event, handler, context) {
    const _h = this._handlers;

    if (!handler || !event) {
      return this;
    }

    if (!_h[event]) {
      _h[event] = [];
    }

    if (_h[event].indexOf(event) >= 0) {
      return this;
    }

    _h[event].push({
      h: handler,
      one: true,
      ctx: context || this,
    });

    return this;
  },

  /**
   * 绑定事件
   * @param {string} event 事件名
   * @param {Function} handler 事件处理函数
   * @param {Object} [context]
   */
  on(event, handler, context) {
    const _h = this._handlers;

    if (!handler || !event) {
      return this;
    }

    if (!_h[event]) {
      _h[event] = [];
    }

    _h[event].push({
      h: handler,
      one: false,
      ctx: context || this,
    });

    return this;
  },

  /**
   * 是否绑定了事件
   * @param  {string}  event
   * @return {boolean}
   */
  isSilent(event) {
    const _h = this._handlers;
    return _h[event] && _h[event].length;
  },

  /**
   * 解绑事件
   * @param {string} event 事件名
   * @param {Function} [handler] 事件处理函数
   */
  off(event, handler) {
    const _h = this._handlers;

    if (!event) {
      this._handlers = {};
      return this;
    }

    if (handler) {
      if (_h[event]) {
        const newList = [];
        for (let i = 0, l = _h[event].length; i < l; i++) {
          if (_h[event][i].h != handler) {
            newList.push(_h[event][i]);
          }
        }
        _h[event] = newList;
      }

      if (_h[event] && _h[event].length === 0) {
        delete _h[event];
      }
    } else {
      delete _h[event];
    }

    return this;
  },

  /**
   * 事件分发
   *
   * @param {string} type 事件类型
   */
  trigger(type) {
    if (this._handlers[type]) {
      let args = arguments;
      const argLen = args.length;

      if (argLen > 3) {
        args = arrySlice.call(args, 1);
      }

      const _h = this._handlers[type];
      let len = _h.length;
      for (let i = 0; i < len; ) {
        // Optimize advise from backbone
        switch (argLen) {
          case 1:
            _h[i].h.call(_h[i].ctx);
            break;
          case 2:
            _h[i].h.call(_h[i].ctx, args[1]);
            break;
          case 3:
            _h[i].h.call(_h[i].ctx, args[1], args[2]);
            break;
          default:
            // have more than 2 given arguments
            _h[i].h.apply(_h[i].ctx, args);
            break;
        }

        if (_h[i].one) {
          _h.splice(i, 1);
          len--;
        } else {
          i++;
        }
      }
    }

    return this;
  },

  /**
   * 带有context的事件分发, 最后一个参数是事件回调的context
   * @param {string} type 事件类型
   */
  triggerWithContext(type) {
    if (this._handlers[type]) {
      let args = arguments;
      const argLen = args.length;

      if (argLen > 4) {
        args = arrySlice.call(args, 1, args.length - 1);
      }
      const ctx = args[args.length - 1];

      const _h = this._handlers[type];
      let len = _h.length;
      for (let i = 0; i < len; ) {
        // Optimize advise from backbone
        switch (argLen) {
          case 1:
            _h[i].h.call(ctx);
            break;
          case 2:
            _h[i].h.call(ctx, args[1]);
            break;
          case 3:
            _h[i].h.call(ctx, args[1], args[2]);
            break;
          default:
            // have more than 2 given arguments
            _h[i].h.apply(ctx, args);
            break;
        }

        if (_h[i].one) {
          _h.splice(i, 1);
          len--;
        } else {
          i++;
        }
      }
    }

    return this;
  },
};

export default Event;
