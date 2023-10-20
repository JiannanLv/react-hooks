import "./message.css";

export default {
  getElementPos(elementId) {
    const ua = navigator.userAgent.toLowerCase();
    // var isOpera = (ua.indexOf('opera') != -1);
    // var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
    const el = document.getElementById(elementId);
    if (el.parentNode === null || el.style.display == "none") {
      return false;
    }
    let parent = null;
    let pos = [];
    let box;

    if (el.getBoundingClientRect) {
      // IE
      box = el.getBoundingClientRect();
      const scrollTop = Math.max(
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      const scrollLeft = Math.max(
        document.documentElement.scrollLeft,
        document.body.scrollLeft
      );
      return { x: box.left + scrollLeft, y: box.top + scrollTop };
    } else if (document.getBoxObjectFor) {
      // gecko
      box = document.getBoxObjectFor(el);
      const borderLeft = el.style.borderLeftWidth
        ? parseInt(el.style.borderLeftWidth)
        : 0;
      const borderTop = el.style.borderTopWidth
        ? parseInt(el.style.borderTopWidth)
        : 0;
      pos = [box.x - borderLeft, box.y - borderTop];
    } else {
      // safari & opera
      pos = [el.offsetLeft, el.offsetTop];
      parent = el.offsetParent;
      if (parent != el) {
        while (parent) {
          pos[0] += parent.offsetLeft;
          pos[1] += parent.offsetTop;
          parent = parent.offsetParent;
        }
      }
      if (
        ua.indexOf("opera") != -1 ||
        (ua.indexOf("safari") != -1 && el.style.position == "absolute")
      ) {
        pos[0] -= document.body.offsetLeft;
        pos[1] -= document.body.offsetTop;
      }
    }
    if (el.parentNode) {
      parent = el.parentNode;
    } else {
      parent = null;
    }
    while (parent && parent.tagName != "BODY" && parent.tagName != "HTML") {
      // account for any scrolled ancestors
      pos[0] -= parent.scrollLeft;
      pos[1] -= parent.scrollTop;
      if (parent.parentNode) {
        parent = parent.parentNode;
      } else {
        parent = null;
      }
    }
    return { x: pos[0], y: pos[1] };
  },
  getElementSize(elementId) {
    const o = document.getElementById(elementId);
    return { w: o.offsetWidth, h: o.offsetHeight };
  },
  showMessage(message, title) {
    let timer = null;

    function remove() {
      const r = document.getElementById("message");

      if (r) {
        document.body.removeChild(r);
      }
    }

    // 创建信息
    const mesDiv = document.createElement("div");
    mesDiv.setAttribute("id", "message");
    mesDiv.style.display = "block";
    mesDiv.style.left = `${document.body.children[0].offsetWidth - 366}px`;
    mesDiv.style.top = "0px";
    mesDiv.style.zIndex = 999;
    document.body.appendChild(mesDiv);

    const cloBtn = document.createElement("button");
    cloBtn.innerHTML = "X";

    cloBtn.addEventListener("click", remove, false);
    mesDiv.appendChild(cloBtn);

    const titleP = document.createElement("p");
    titleP.innerHTML = title ? ` ⚠️ ${title}` : " ⚠️ 错误";
    mesDiv.appendChild(titleP);

    const mes = document.createElement("div");
    mes.innerHTML = message;
    mesDiv.appendChild(mes);

    timer = setTimeout(remove, 5000);

    // 进入
    mesDiv.addEventListener(
      "mouseover",
      () => {
        clearTimeout(timer);
      },
      false
    );

    // 移出
    mesDiv.addEventListener(
      "mouseout",
      () => {
        clearTimeout(timer);
        timer = setTimeout(remove, 5000);
      },
      false
    );
  },
  appendBackDrop(id) {
    this.removeBackDrop();
    const body = document.querySelector(id);
    const backdrop = document.createElement("div");
    backdrop.setAttribute("id", "backdrop");
    backdrop.style.position = "fixed";
    backdrop.style.top = "0";
    backdrop.style.right = "0";
    backdrop.style.bottom = "0";
    backdrop.style.left = "0";
    backdrop.style.backgroundColor = "#000";
    backdrop.style.opacity = ".3";
    body.parentNode.appendChild(backdrop);
  },
  removeBackDrop() {
    const backdrop = document.getElementById("backdrop");
    if (backdrop) {
      backdrop.parentNode.removeChild(backdrop);
    }
  },
  appendLoading() {
    this.removeLoading();
    const body = document.getElementsByTagName("body")[0];
    const loading = document.createElement("div");
    loading.setAttribute("id", "loading");
    loading.style.position = "fixed";
    loading.style.top = "0";
    loading.style.right = "0";
    loading.style.bottom = "0";
    loading.style.left = "0";
    loading.style.backgroundColor = "#000";
    loading.style.opacity = ".1";
    loading.style.verticalAlign = "middle";
    loading.style.textAlign = "center";
    loading.style.backgroundImage = "url('/dashboard/images/loading.gif')";
    loading.style.backgroundRepeat = "no-repeat";
    loading.style.backgroundPosition = "center center";
    body.appendChild(loading);
  },
  removeLoading() {
    const loading = document.getElementById("loading");
    if (loading) {
      loading.parentNode.removeChild(loading);
    }
  }
};
