/**
 * 本地存储数据管理
 * author 陈可
 * date 2017/9/8
 * @class LocalStorageManager
 */
namespace LocalStorageMgr 
{
	/**
     * 保存数据
     * @param key
     * @param value
     * @returns {boolean}
     */
    export function set(key:string,value:string):boolean
    {
        try
        {
            return egret.localStorage.setItem(key,value);
        }
        catch(e)
        {
            console.log("unsupport localStorage try cookie");
            setCookie(key,value);
            return false;
        }
    }

    /**
     * 读取数据
     * @param key 要读取的键名称
     * @returns {string}
     */
    export function get(key:string):string
    {
        try
        {
            var str:string = egret.localStorage.getItem(key);
            if(str==null)
            {
                str="";
            }
            return str;
        }
        catch(e)
        {
            console.log("unsupport localStorage try cookie");
            return getCookie(key);
        }
    }

    /**
     *
     * @param key 要删除的键名称
     */
    export function remove(key:string)
    {
        try
        {
            egret.localStorage.removeItem(key);
        }
        catch(e)
        {
            console.log("unsupport localStorage try cookie");
            removeCookie(key);
        }
    }

    /**
     * 将所有数据清空
     */
    export function clear()
    {
        try
        {
            egret.localStorage.clear();
        }
        catch(e)
        {
            console.log("unsupport localStorage");
        }
    }

    //写cookies
    function setCookie(name,value)
    {
        if(App.DeviceUtil.IsHtml5())
        {
            var Days = 300;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = name + "="+ window["escape"](value) + ";expires=" + exp["toGMTString"]();
        }
    }

    //读cookies
    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        {
            return window["unescape"](arr[2]);
        }
        else
        {
            return "";
        }
    }

    //删cookies
    function removeCookie(name)
    {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp["toGMTString"]();
    }
}