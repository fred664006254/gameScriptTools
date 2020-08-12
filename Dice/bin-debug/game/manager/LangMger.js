var LangMger;
(function (LangMger) {
    var cnJson = undefined;
    var cnTypeJson = {};
    function getStr(key) {
        key = checkKey(key);
        var str = null;
        if (cnJson[key]) {
            str = cnJson[key];
        }
        else if (cnTypeJson[key]) {
            str = cnTypeJson[key];
        }
        return str;
    }
    /**
     * 检测是否存在key
     * @param key
     */
    function checkHasKey(key) {
        if (cnJson[key]) {
            return true;
        }
        else if (cnTypeJson[key]) {
            return true;
        }
        return false;
    }
    LangMger.checkHasKey = checkHasKey;
    function checkKey(key) {
        var addStr = "";
        if (Api.SwitchVoApi.checkWxShenhe()) {
            addStr = "_sh";
        }
        if (checkHasKey(key + addStr)) {
            key = key + addStr;
        }
        return key;
    }
    /**
     * 检测是否存在key
     * @param key
     */
    function checkHasFontProblem() {
        var allkey = "";
        for (var k in cnJson) {
            var str = cnJson[k];
            var replacestr1 = "<font";
            var replacestr2 = "</font>";
            var rl1 = replacestr1.length;
            var rl2 = replacestr2.length;
            var n1 = (str.length - str.replace(replacestr1, "").length) / rl1;
            var n2 = (str.length - str.replace(replacestr2, "").length) / rl2;
            if (n1 != n2) {
                allkey += (k + " | ");
            }
        }
        console.log("QAZ cn " + allkey);
        allkey = "";
        for (var k in cnTypeJson) {
            var str = cnTypeJson[k];
            var replacestr1 = "<font";
            var replacestr2 = "</font>";
            var rl1 = replacestr1.length;
            var rl2 = replacestr2.length;
            var n1 = (str.length - str.replace(replacestr1, "").length) / rl1;
            var n2 = (str.length - str.replace(replacestr2, "").length) / rl2;
            if (n1 != n2) {
                allkey += (k + " | ");
            }
        }
        console.log("QAZ cntype " + allkey);
    }
    LangMger.checkHasFontProblem = checkHasFontProblem;
    function getlocal(key, params, notUseBlueType) {
        var value = getStr(key);
        if (value == undefined) {
            if (true) {
                return "缺少字段:" + key;
            }
            else {
                if (PlatMgr.checkIsLocal()) {
                    return "缺少字段:" + key;
                }
            }
            return "**";
        }
        var ruler = new RegExp("#.*#");
        while (value.search(ruler) != -1) {
            var startIdx = value.search(ruler);
            var strs = value.substring(startIdx + 1);
            var endIdx = strs.search("#");
            var firstStr = "";
            var endStr = "";
            if (startIdx >= 1) {
                firstStr = value.substring(0, startIdx);
            }
            if (endIdx < value.length && endIdx != -1) {
                endStr = value.substring(startIdx + endIdx + 2);
            }
            if (endIdx != -1) {
                var newKey = value.substring(startIdx + 1, startIdx + endIdx + 1);
                value = firstStr + getStr(newKey) + endStr;
            }
            else {
                value = firstStr + endStr;
            }
            if (value.indexOf("#" + key + "#") > -1) {
                console.log("cn配置引用死循环:" + key + "，跳出");
                break;
            }
        }
        return App.StringUtil.formatLocalLanuageValue(value, params);
    }
    LangMger.getlocal = getlocal;
    // export function loadJson(loadComplete:()=>void,loadCompleteTarget:any):void
    // {
    // 	App.LogUtil.log("startload cn");
    // 	let cnName:string;
    // 	if(RES.hasRes(PlatformManager.getSpid()))
    // 	{
    // 		cnName=PlatformManager.getSpid();
    // 	}
    // 	else
    // 	{
    // 		cnName="cn";
    // 	}
    // 	//test code 
    // 	// cnName="tw";
    // 	ResourceManager.loadItem(cnName,(data:any)=>{
    // 		App.LogUtil.log("loadcomplete cn");
    // 		cnJson=data;
    // 		if(loadComplete)
    // 		{
    // 			loadComplete.apply(loadCompleteTarget);
    // 		}
    // 	},this);
    // }
    function setData(data) {
        cnJson = data;
    }
    LangMger.setData = setData;
    function setTypeData(data) {
        cnTypeJson = data;
    }
    LangMger.setTypeData = setTypeData;
    var shareTextArr = [];
    function setShareText(textArr) {
        if (textArr.ret) {
            shareTextArr = [];
        }
        else {
            shareTextArr = textArr.slice();
            var content = getShareDesc();
            window["shareTitle"] = content.title;
            window["shareDesc"] = content.desc;
        }
    }
    LangMger.setShareText = setShareText;
    function getShareDesc() {
        var str = null;
        var title = null;
        var desc = null;
        var imageurl = null;
        var shareId = null;
        if (shareTextArr && shareTextArr.length) {
            var randid = Math.floor(Math.random() * shareTextArr.length);
            str = shareTextArr[randid];
            if (str) {
                title = str[0];
                desc = str[1];
                shareId = str[2];
                // 以后做成gm配置的
                if (App.DeviceUtil.isWXgame() && !App.DeviceUtil.isQQGame()) {
                    imageurl = "https://gt-fkwx-web001.raygame3.com/wxgameOtherPic/share_" + shareId + ".jpg";
                }
                else if (App.DeviceUtil.isWyw()) {
                    imageurl = "https://gt-lm-web01.raygame3.com/wywOtherPic/share_" + randid + ".jpg";
                }
                else if (App.DeviceUtil.isQQGame()) {
                    imageurl = App.ResourceUtil.getResCfgByKey(shareId + "_vx").url;
                }
            }
        }
        else {
            if (App.DeviceUtil.isQQGame()) {
                imageurl = App.ResourceUtil.getResCfgByKey(1 + "_vx").url;
            }
        }
        return { title: title, desc: desc, imageurl: imageurl, shareId: shareId };
    }
    LangMger.getShareDesc = getShareDesc;
})(LangMger || (LangMger = {}));
//# sourceMappingURL=LangMger.js.map