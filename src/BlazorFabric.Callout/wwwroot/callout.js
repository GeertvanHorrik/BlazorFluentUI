//declare interface Window { debounce(func: Function, wait: number, immediate: boolean): Function }
var BlazorFabricCallout;
(function (BlazorFabricCallout) {
    function registerHandlers(targetElement, calloutRef) {
        var window = targetElement.ownerDocument.defaultView;
        //window.addEventListener("scroll", (ev: Event) => { if (checkTarget(ev, targetElement)) { calloutRef.invokeMethodAsync("ScrollHandler"); } }, true);
        //window.addEventListener("resize", (ev: Event) => calloutRef.invokeMethodAsync("ResizeHandler"), true);
        //document.documentElement.addEventListener("focus", (ev: Event) => calloutRef.invokeMethodAsync("FocusHandler"), true);
        //document.documentElement.addEventListener("click", clickHandler, true);
        var scrollId = Handler.addListener(window, "scroll", function (ev) { if (checkTarget(ev, targetElement)) {
            calloutRef.invokeMethodAsync("ScrollHandler");
        } ; }, true);
        var resizeId = Handler.addListener(window, "resize", function (ev) { if (checkTarget(ev, targetElement)) {
            calloutRef.invokeMethodAsync("ResizeHandler");
        } ; }, true);
        var focusId = Handler.addListener(document.documentElement, "focus", function (ev) { if (checkTarget(ev, targetElement)) {
            calloutRef.invokeMethodAsync("FocusHandler");
        } ; }, true);
        var clickId = Handler.addListener(document.documentElement, "click", function (ev) { if (checkTarget(ev, targetElement)) {
            calloutRef.invokeMethodAsync("ClickHandler");
        } ; }, true);
        //set focus, too
        return [scrollId, resizeId, focusId, clickId];
    }
    BlazorFabricCallout.registerHandlers = registerHandlers;
    function unregisterHandlers(targetElement, calloutRef, ids) {
        var window = targetElement.ownerDocument.defaultView;
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var id = ids_1[_i];
            Handler.removeListener(id);
        }
        //const scrollhandler = (ev: Event) => {
        //    if (checkTarget(ev, targetElement)) {
        //        calloutRef.invokeMethodAsync("ScrollHandler");
        //    };
        //}
        //window.removeEventListener("scroll", scrollhandler, true);
        //window.removeEventListener("resize", (ev: Event) => calloutRef.invokeMethodAsync("ResizeHandler"), true);
        //document.documentElement.removeEventListener("focus", (ev: Event) => calloutRef.invokeMethodAsync("FocusHandler"), true);
        //document.documentElement.removeEventListener("click", clickHandler, true);
    }
    BlazorFabricCallout.unregisterHandlers = unregisterHandlers;
    var Handler = /** @class */ (function () {
        function Handler() {
        }
        Handler.addListener = function (element, event, handler, capture) {
            element.addEventListener(event, handler, capture);
            this.listeners[this.i] = { capture: capture, event: event, handler: handler, element: element };
            return this.i++;
        };
        Handler.removeListener = function (id) {
            if (id in this.listeners) {
                var h = this.listeners[id];
                h.element.removeEventListener(h.event, h.handler, h.capture);
                delete this.listeners[id];
            }
        };
        Handler.i = 1;
        Handler.listeners = {};
        return Handler;
    }());
    function clickHandler(ev) {
    }
    function checkTarget(ev, targetElement) {
        var target = ev.target;
        var isEventTargetOutsideCallout = !elementContains(targetElement, target);
        return isEventTargetOutsideCallout;
        //// complicated mess that includes mouse events for right-click menus...
        //if (
        //    (!this._target && isEventTargetOutsideCallout) ||
        //    (ev.target !== this._targetWindow &&
        //        isEventTargetOutsideCallout &&
        //        ((this._target as MouseEvent).stopPropagation ||
        //            (!this._target || (target !== this._target && !elementContains(this._target as HTMLElement, target)))))
        //) {
        //    return true;
        //}
        //return false;
    }
    function elementContains(parent, child, allowVirtualParents) {
        if (allowVirtualParents === void 0) { allowVirtualParents = true; }
        var isContained = false;
        if (parent && child) {
            if (allowVirtualParents) {
                isContained = false;
                while (child) {
                    var nextParent = getParent(child);
                    if (nextParent === parent) {
                        isContained = true;
                        break;
                    }
                    child = nextParent;
                }
            }
            else if (parent.contains) {
                isContained = parent.contains(child);
            }
        }
        return isContained;
    }
    function getParent(child) {
        return child && (child.parentNode && child.parentNode);
    }
    function getWindow(element) {
        return element.ownerDocument.defaultView;
    }
    BlazorFabricCallout.getWindow = getWindow;
    function getWindowRect() {
        var rect = {
            width: window.innerWidth,
            height: window.innerHeight,
            top: 0,
            left: 0
        };
        return rect;
    }
    BlazorFabricCallout.getWindowRect = getWindowRect;
    ;
})(BlazorFabricCallout || (BlazorFabricCallout = {}));
window['BlazorFabricCallout'] = BlazorFabricCallout || {};
//# sourceMappingURL=callout.js.map