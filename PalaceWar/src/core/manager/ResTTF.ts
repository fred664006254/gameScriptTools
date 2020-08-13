namespace egret.sys {
    export let fontResourceCache: { [url: string]: any } = {}

    export function registerFontMapping(name: string, path: string): void {
        console.error(`empty sys.registerFontMapping = ${name}, ${path}`);
    }
}
namespace egret {
    /**
     * Register font mapping.
     * @param name The font family name to register.
     * @param path The font path.
     * @version Egret 5.3
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 注册字体映射
     * @param name 要注册的字体名称
     * @param path 注册的字体地址
     * @version Egret 5.3
     * @platform Web,Native
     * @language zh_CN
     */
    export declare function registerFontMapping(name: string, path: string): void;


    function _registerFontMapping(name: string, path: string): void {
        egret.sys.registerFontMapping(name, path);
    }

    if (!egret.registerFontMapping) {
        egret.registerFontMapping = _registerFontMapping;
    }
}
namespace Fonts {
    export var fontArray: Array<string> = [];
    export var count: number = 0;
    export var loadArray = ["fontss"];

    export function getResUrl(fontTpye: string) {
        return 'resource/assets/fonts/'+fontTpye+'.ttf';
    }

    export function getResCssUrl(name: string) {
        return 'resource/assets/fonts/' + name + '.css';
    }

    export function loadFont(fontTpye: string, obj: { callbackSucceed: Function, callbackFailure: Function }, callbackThisObj: any) {
        if (Fonts.fontArray.indexOf(fontTpye) != -1) {
            return obj.callbackSucceed.call(callbackThisObj);
        }
        if (App.DeviceUtil.isWXgame()) {
            let ulr: string = Fonts.getResUrl(fontTpye);
            Fonts.count++;
            loadFontWX(ulr).then(res => {
                obj.callbackSucceed.call(callbackThisObj);
                Fonts.fontArray.push(fontTpye);
                console.log('success:', res);
            }).catch(() => {
                Fonts.reLoad(fontTpye, obj, callbackThisObj);
                console.error('fail:', )
            })
        } else if (App.DeviceUtil.isRuntime2()) {
            Fonts.loadApp(fontTpye, obj, callbackThisObj);
        } else {
            Fonts.loadttf(fontTpye, (num) => {
                console.log(fontTpye);
                Fonts.count++;
                if (num != 2) {
                    Fonts.count = 0;
                    obj.callbackSucceed.call(callbackThisObj)
                    Fonts.fontArray.push(fontTpye);
                } else {
                    Fonts.reLoad(fontTpye, obj, callbackThisObj);
                }
            });
        }
    }

    export function reLoad(fontTpye: string, obj: { callbackSucceed: Function, callbackFailure: Function }, callbackThisObj: any) {
        if (Fonts.count >= 5) {
            Fonts.count = 0;
            obj.callbackFailure.call(callbackThisObj)
        } else {
            Fonts.loadFont(fontTpye, obj, callbackThisObj);
        }
    }

    //h5加载字体
    export function loadttf(name, callback) {
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
        if (window["FontFace"]) 
        {
            console.log("bbb");
            if(RES.getRes(name))
            {
                console.log("ccc");
                let ba = RES.getRes(name) as ArrayBuffer;
                var font = new window["FontFace"](name,ba);
                font.load().then(function (loadedFontFace) {
                    if (loadedFontFace.status == "loaded") {
                        document["fonts"].add(loadedFontFace);
                        callback(1);
                    } else {
                        callback(2);
                    }
                });
            }
        } else {
            if (window["document"]) {
                dynamicLoadCss(name);
                callback(3);
            } else {
                callback(2);
            }

        }
    }

    async function dynamicLoadCss(name) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = Fonts.getResCssUrl(name);
        head.appendChild(link);
        console.log("开始加载css");
    }

    //app加载字体
    export async function loadApp(name: string, obj: { callbackSucceed: Function, callbackFailure: Function }, callbackThisObj: any) {
        if (RES.hasRes(name)) {
            loadArray.push(name);
        }
        console.log("开始加载loadApp");
       if(RES.getRes(name))
       {
           console.log("loadApp--------------");
           
           egret.registerFontMapping(name, App.ResourceUtil.getResCfgByKey(name).url);
           obj.callbackSucceed.call(callbackThisObj);
           return;
       }
    }

    //微信加载字体
    export function loadFontWX(_url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const fontName: string = window['wx'].loadFont(_url);
            if (fontName) {
                resolve(fontName);
            } else {
                reject();
            }
        })
    }
}
