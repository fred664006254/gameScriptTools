var LanguageManager;
(function (LanguageManager) {
    var cnJson = undefined;
    var cnTypeJson = {};
    function getStr(key) {
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
    LanguageManager.checkHasKey = checkHasKey;
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
    LanguageManager.checkHasFontProblem = checkHasFontProblem;
    function getlocal(key, params, notUseBlueType) {
        var value;
        var spid = PlatformManager.getSpid();
        if (PlatformManager.checkIsXlSp() && LanguageManager.checkHasKey(key + "_xianlaiType")) {
            value = getStr(key + "_xianlaiType");
        }
        else if (!notUseBlueType && Api.switchVoApi.checkIsInBlueWife() && LanguageManager.checkHasKey(key + "_blueType")) {
            value = getStr[key + "_blueType"];
        }
        else if (PlatformManager.checkIsXySp() && LanguageManager.checkHasKey(key + "_xianyiType")) {
            value = getStr(key + "_xianyiType");
        }
        else if (PlatformManager.checkIs4399Sp() && LanguageManager.checkHasKey(key + "_4399Type")) {
            value = getStr(key + "_4399Type");
        }
        else if (PlatformManager.checkIsZjlySp() && LanguageManager.checkHasKey(key + "_zjlyType")) {
            value = getStr(key + "_zjlyType");
        }
        else if (PlatformManager.checkIsIOSShenheSp() && LanguageManager.checkHasKey(key + "_iosshenheType")) {
            value = getStr(key + "_iosshenheType");
        }
        else if (PlatformManager.checkisLocalPrice() && (GameData.platMoneyData || GameData.platMoneyData2) && (LanguageManager.checkHasKey(key + "_" + spid + "hwType") || LanguageManager.checkHasKey(key + "_thhwType"))) {
            var localKey = LanguageManager.checkHasKey(key + "_" + spid + "hwType") ? key + "_" + spid + "hwType" : key + "_thhwType";
            localKey = LanguageManager.checkHasKey(localKey) ? localKey : key + "_hwType";
            value = getStr(localKey);
            if (PlatformCfg.hwpriceCfg.indexOf(key) < 0) {
                params = Api.rechargeVoApi.formatThHwMoneyInfo(params);
            }
        }
        else if (Api.switchVoApi.checkOpenServantSkinAura() && LanguageManager.checkHasKey(key + "_servantSkinTatterType")) {
            //门客碎片描述
            value = getStr(key + "_servantSkinTatterType");
        }
        else {
            var osStr = App.DeviceUtil.isIOS() ? "IOS" : (App.DeviceUtil.isAndroid() ? "AND" : "H5");
            var spid_1 = PlatformManager.getSpid();
            if (PlatformManager.checkIsLocal() && App.CommonUtil.getOption("language") && ServerCfg.allHost[App.CommonUtil.getOption("language")]) {
                spid_1 = App.CommonUtil.getOption("language");
            }
            if (LanguageManager.checkHasKey(key + "_" + spid_1 + osStr + "Type")) {
                value = getStr(key + "_" + spid_1 + osStr + "Type");
            }
            else if (LanguageManager.checkHasKey(key + "_" + spid_1 + "Type")) {
                value = getStr(key + "_" + spid_1 + "Type");
            }
            else {
                value = getStr(key);
            }
        }
        if (Api.switchVoApi.checkOpenNewPrison() && LanguageManager.checkHasKey(key + "_laoyiType")) {
            value = getStr(key + "_laoyiType");
        }
        if (Api.switchVoApi.checkCloseText() && LanguageManager.checkHasKey(key + "_hexieType")) {
            value = getStr(key + "_hexieType");
        }
        if (Api.switchVoApi.checkCloseText2() && LanguageManager.checkHasKey(key + "_hexie2Type")) {
            value = getStr(key + "_hexie2Type");
        }
        if (!notUseBlueType && Api.switchVoApi.checkIsInBlueWife() && LanguageManager.checkHasKey(key + "_blueType")) {
            value = cnJson[key + "_blueType"];
        }
        if (value == undefined) {
            if (true) {
                return "缺少字段:" + key;
            }
            else {
                if (PlatformManager.checkIsLocal()) {
                    return "缺少字段:" + key;
                }
            }
            var reportData = { cnkey: key };
            StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData), "lostcnkey");
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
    LanguageManager.getlocal = getlocal;
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
    LanguageManager.setData = setData;
    function setTypeData(data) {
        cnTypeJson = data;
    }
    LanguageManager.setTypeData = setTypeData;
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
    LanguageManager.setShareText = setShareText;
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
    LanguageManager.getShareDesc = getShareDesc;
})(LanguageManager || (LanguageManager = {}));
//# sourceMappingURL=LanguageManager.js.map