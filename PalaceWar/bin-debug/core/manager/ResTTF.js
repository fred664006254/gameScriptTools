var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        sys.fontResourceCache = {};
        function registerFontMapping(name, path) {
            console.error("empty sys.registerFontMapping = " + name + ", " + path);
        }
        sys.registerFontMapping = registerFontMapping;
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
(function (egret) {
    function _registerFontMapping(name, path) {
        egret.sys.registerFontMapping(name, path);
    }
    if (!egret.registerFontMapping) {
        egret.registerFontMapping = _registerFontMapping;
    }
})(egret || (egret = {}));
var Fonts;
(function (Fonts) {
    Fonts.fontArray = [];
    Fonts.count = 0;
    Fonts.loadArray = ["fontss"];
    function getResUrl(fontTpye) {
        return 'resource/assets/fonts/' + fontTpye + '.ttf';
    }
    Fonts.getResUrl = getResUrl;
    function getResCssUrl(name) {
        return 'resource/assets/fonts/' + name + '.css';
    }
    Fonts.getResCssUrl = getResCssUrl;
    function loadFont(fontTpye, obj, callbackThisObj) {
        if (Fonts.fontArray.indexOf(fontTpye) != -1) {
            return obj.callbackSucceed.call(callbackThisObj);
        }
        if (App.DeviceUtil.isWXgame()) {
            var ulr = Fonts.getResUrl(fontTpye);
            Fonts.count++;
            loadFontWX(ulr).then(function (res) {
                obj.callbackSucceed.call(callbackThisObj);
                Fonts.fontArray.push(fontTpye);
                console.log('success:', res);
            }).catch(function () {
                Fonts.reLoad(fontTpye, obj, callbackThisObj);
                console.error('fail:');
            });
        }
        else if (App.DeviceUtil.isRuntime2()) {
            Fonts.loadApp(fontTpye, obj, callbackThisObj);
        }
        else {
            Fonts.loadttf(fontTpye, function (num) {
                console.log(fontTpye);
                Fonts.count++;
                if (num != 2) {
                    Fonts.count = 0;
                    obj.callbackSucceed.call(callbackThisObj);
                    Fonts.fontArray.push(fontTpye);
                }
                else {
                    Fonts.reLoad(fontTpye, obj, callbackThisObj);
                }
            });
        }
    }
    Fonts.loadFont = loadFont;
    function reLoad(fontTpye, obj, callbackThisObj) {
        if (Fonts.count >= 5) {
            Fonts.count = 0;
            obj.callbackFailure.call(callbackThisObj);
        }
        else {
            Fonts.loadFont(fontTpye, obj, callbackThisObj);
        }
    }
    Fonts.reLoad = reLoad;
    //h5加载字体
    function loadttf(name, callback) {
        if (document["fonts"]) {
            var values = document["fonts"].values();
            var isLoaded = false;
            var item = values.next();
            while (!item.done && !isLoaded) {
                var fontFace = item.value;
                if (fontFace.family == name) {
                    isLoaded = true;
                }
                item = values.next();
            }
            if (isLoaded) {
                callback(1);
                return;
            }
        }
        console.log("aaa");
        if (window["FontFace"]) {
            console.log("bbb");
            if (RES.getRes(name)) {
                console.log("ccc");
                var ba = RES.getRes(name);
                var font = new window["FontFace"](name, ba);
                font.load().then(function (loadedFontFace) {
                    if (loadedFontFace.status == "loaded") {
                        document["fonts"].add(loadedFontFace);
                        callback(1);
                    }
                    else {
                        callback(2);
                    }
                });
            }
        }
        else {
            if (window["document"]) {
                dynamicLoadCss(name);
                callback(3);
            }
            else {
                callback(2);
            }
        }
    }
    Fonts.loadttf = loadttf;
    function dynamicLoadCss(name) {
        return __awaiter(this, void 0, void 0, function () {
            var head, link;
            return __generator(this, function (_a) {
                head = document.getElementsByTagName('head')[0];
                link = document.createElement('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = Fonts.getResCssUrl(name);
                head.appendChild(link);
                console.log("开始加载css");
                return [2 /*return*/];
            });
        });
    }
    //app加载字体
    function loadApp(name, obj, callbackThisObj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (RES.hasRes(name)) {
                    Fonts.loadArray.push(name);
                }
                console.log("开始加载loadApp");
                if (RES.getRes(name)) {
                    console.log("loadApp--------------");
                    egret.registerFontMapping(name, App.ResourceUtil.getResCfgByKey(name).url);
                    obj.callbackSucceed.call(callbackThisObj);
                    return [2 /*return*/];
                }
                return [2 /*return*/];
            });
        });
    }
    Fonts.loadApp = loadApp;
    //微信加载字体
    function loadFontWX(_url) {
        return new Promise(function (resolve, reject) {
            var fontName = window['wx'].loadFont(_url);
            if (fontName) {
                resolve(fontName);
            }
            else {
                reject();
            }
        });
    }
    Fonts.loadFontWX = loadFontWX;
})(Fonts || (Fonts = {}));
//# sourceMappingURL=ResTTF.js.map