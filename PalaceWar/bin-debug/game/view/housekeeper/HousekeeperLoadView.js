/**
 * 管家发送请求
 * author shaoliang
 * date 2020/4/28
 * @class HousekeeperLoadView
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var HousekeeperLoadView = (function (_super) {
    __extends(HousekeeperLoadView, _super);
    function HousekeeperLoadView() {
        var _this = _super.call(this) || this;
        _this._types = [];
        _this._curIdx = 0;
        _this._progress = null;
        _this._tipText = null;
        _this._numText = null;
        _this._rewardInfo = {};
        _this._oldInfo = null;
        //最大请求数
        _this._requestErrorMax = 3;
        _this._requestObject = null;
        _this._requestIdx = -1;
        return _this;
    }
    HousekeeperLoadView.prototype.getTitleBgName = function () {
        return null;
    };
    HousekeeperLoadView.prototype.getTitleStr = function () {
        return null;
    };
    HousekeeperLoadView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    HousekeeperLoadView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "housekeeperloadview", "names_cn",
        ]);
    };
    HousekeeperLoadView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_LOGIIN), this.hide, this);
        this._requestIdx = 0;
        this._types = this.param.data.info;
        this._tipText = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._tipText.width = 600;
        this._tipText.textAlign = egret.HorizontalAlign.CENTER;
        this._tipText.setPosition(20, GameConfig.stageHeigth / 2 - 50);
        this.addChild(this._tipText);
        this._progress = ComponentManager.getProgressBar("housekeepload_progress", "housekeepload_progressbg", 460);
        this._progress.setPosition(GameConfig.stageWidth / 2 - this._progress.width / 2, this._tipText.y + 43);
        this.addChild(this._progress);
        var cloud1 = BaseBitmap.create("housekeepload_clooud");
        cloud1.scaleX = -1;
        cloud1.setPosition(this._progress.x + 52, this._progress.y - 15);
        this.addChild(cloud1);
        var cloud2 = BaseBitmap.create("housekeepload_clooud");
        cloud2.setPosition(this._progress.x + this._progress.width - 40, cloud1.y);
        this.addChild(cloud2);
        var numbg = BaseBitmap.create("housekeepload_numbg");
        numbg.setPosition(GameConfig.stageWidth / 2 - numbg.width / 2, this._progress.y + 25);
        this.addChild(numbg);
        this._numText = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._numText.width = 80;
        this._numText.textAlign = egret.HorizontalAlign.CENTER;
        this._numText.setPosition(numbg.x + 32, numbg.y + 20);
        this.addChild(this._numText);
        this.doNextRound();
    };
    Object.defineProperty(HousekeeperLoadView.prototype, "curType", {
        get: function () {
            return this._types[this._curIdx - 1];
        },
        enumerable: true,
        configurable: true
    });
    HousekeeperLoadView.prototype.doNextRound = function () {
        this._curIdx++;
        if (this._curIdx > this._types.length) {
            this.roundEnd();
            return;
        }
        var typename = LanguageManager.getlocal("housekeeper_name_" + this.curType);
        this._tipText.text = LanguageManager.getlocal("housekeeper_loading", [typename]);
        this._numText.text = String(this._curIdx) + " / " + String(this._types.length);
        this._progress.setPercentage(this._curIdx / this._types.length);
        this._requestIdx = 0;
        //经营
        if (this.curType == "manage") {
            var manageNum = Api.manageVoApi.isOnekeyManage();
            if (manageNum == 0 || Api.practiceVoApi.isCollectEnable()) {
                this._oldInfo = { gold: Api.playerVoApi.getPlayerGold(), food: Api.playerVoApi.getFood(), soldier: Api.playerVoApi.getSoldier() };
                this._requestObject = { name: NetRequestConst.REQUEST_MANAGE_BATCHDEALFINANCE, parms: {} };
                this.sendRequest();
            }
            else {
                this.doNextRound();
            }
        }
        else if (this.curType == "affair") {
            if (Api.manageVoApi.getCurAffairNums() > 0) {
                var parms = Api.housekeeperVoApi.getCheckParms(this.curType);
                var dtype = 1;
                if (parms == "1") {
                    dtype = 3;
                }
                else if (parms == "3") {
                    dtype = 2;
                }
                this._requestObject = { name: NetRequestConst.REQUEST_MANAGE_BATCHDEALAFFAIR, parms: { useitemnum: 0, totalnum: Api.manageVoApi.getCurAffairNums(), opt: dtype } };
                this.sendRequest();
            }
            else {
                this.doNextRound();
            }
        }
        else if (this.curType == "wife") {
            if (Api.wifeVoApi.getEnergyNum() > 0) {
                var parmsstr = Api.housekeeperVoApi.getCheckParms(this.curType);
                var childFlag = 0;
                if (parmsstr != "1") {
                    childFlag = 1;
                }
                this._requestObject = { name: NetRequestConst.REQUEST_WIFE_CALL, parms: { "autoFlag": true, "childFlag": childFlag } };
                this.sendRequest();
            }
            else {
                this.doNextRound();
            }
        }
        else if (this.curType == "child") {
            //子嗣
            var childVoList = Api.childVoApi.getChildrenVoList();
            if (childVoList.length > 0) {
                var parmsstr = Api.housekeeperVoApi.getCheckParms(this.curType);
                var parmsArr = parmsstr.split("|");
                if (parmsArr[0] == "1") {
                    //有没有没起名的子嗣
                    var nameObj = {};
                    for (var i = 0; i < childVoList.length; i++) {
                        var oneVo = childVoList[i];
                        if (oneVo.name == "") {
                            nameObj[oneVo.id] = Api.childVoApi.getChildRandomName();
                        }
                    }
                    if (Object.keys(nameObj).length > 0) {
                        this._requestObject = { name: NetRequestConst.REQUEST_CHILD_BATCHRENAME, parms: { "nameArr": nameObj } };
                        this.sendRequest();
                    }
                    else {
                        this.sendChildAutotrain();
                    }
                }
                else {
                    this.sendChildAutotrain();
                }
            }
            else {
                this.doNextRound();
            }
        }
        else if (this.curType == "search") {
            if (Api.searchVoApi.getSearchNum() > 0) {
                this._requestObject = { name: NetRequestConst.REQUEST_SEARCH_PLAY, parms: { "isbatch": 1 } };
                this.sendRequest();
            }
            else {
                this.doNextRound();
            }
        }
        else if (this.curType == "bookroom") {
            this._requestObject = null;
            this.request(NetRequestConst.REQUEST_BOOKROOM_FINISH, { isbatch: 1, pos: 0 });
        }
        else if (this.curType == "conquest") {
            var loaclcid = Api.housekeeperVoApi.getCheckParms(this.curType);
            var maxcid = 1;
            if (loaclcid && loaclcid != "") {
                maxcid = Number(loaclcid);
            }
            var conVo = Api.conquestVoApi.getConquestVo();
            //最大能再打几关
            var maxNum = Api.conquestVoApi.getAttNum(conVo.info.cid);
            //该打第几关
            var car1 = conVo.info.cid;
            //能打到第几关
            var car2 = conVo.info.cid + maxNum - 1;
            //实际打第几关
            var realCid = Math.min(maxcid, car2);
            if (realCid >= car1) {
                this._requestObject = { name: NetRequestConst.REQUEST_CONQUEST_BATCHFIGHT, parms: { "cid": realCid } };
                this.sendRequest();
            }
            else {
                this.doNextRound();
            }
        }
        else if (this.curType == "trade") {
            var loaclcid = Api.housekeeperVoApi.getCheckParms(this.curType);
            var maxcid = 1;
            if (loaclcid && loaclcid != "") {
                maxcid = Number(loaclcid);
            }
            //该打第几关
            var currId = Api.tradeVoApi.getCurrentCid();
            //能打几关
            var maxNum = Api.tradeVoApi.getAttNum(Number(currId));
            var car2 = Number(currId) + maxNum - 1;
            //实际打第几关
            var realCid = Math.min(maxcid, car2);
            if (realCid >= Number(currId)) {
                this._requestObject = { name: NetRequestConst.REQUEST_TRADE_BATCHFIGHT, parms: { "cid": realCid } };
                this.sendRequest();
            }
            else {
                this.doNextRound();
            }
        }
        else if (this.curType == "prison") {
            if (Api.prisonVoApi.getMypre() > 0) {
                this._requestObject = { name: NetRequestConst.REQUEST_PRISON_AUTOPUNISH, parms: {} };
                this.sendRequest();
            }
            else {
                this.doNextRound();
            }
        }
        else if (this.curType == "zhenqifang") {
            this._requestObject = { name: NetRequestConst.REQUEST_ZQF_GETREWARD, parms: {
                    idx: 0,
                    taskType: 1,
                    cts: 0,
                    isBatch: 1
                } };
            this.sendRequest();
        }
    };
    HousekeeperLoadView.prototype.sendRequest = function () {
        if (this._requestIdx == -1) {
            return;
        }
        if (this._requestIdx >= this._requestErrorMax || this._requestObject == null) {
            this.doNextRound();
            return;
        }
        this.request(this._requestObject.name, this._requestObject.parms);
        this._requestIdx++;
    };
    HousekeeperLoadView.prototype.sendChildAutotrain = function () {
        if (Api.childVoApi.getChildrenCanUpdCount() > 0 || Api.childVoApi.getWaitAduleNum() > 0) {
            this._requestIdx = 0;
            var parmsstr = Api.housekeeperVoApi.getCheckParms(this.curType);
            var parmsArr = parmsstr.split("|");
            var type = 0;
            if (parmsArr[1] == "1") {
                if (parmsArr[2] && parmsArr[2] != "") {
                    type = Number(parmsArr[2]);
                }
                else {
                    type = 1;
                }
            }
            var times = Api.childVoApi.getChildrenCanUpdTiliCount();
            this._rewardInfo["child"] = { "times": times };
            this._requestObject = { name: NetRequestConst.REQUEST_CHILD_AUTOTRAIN, parms: { "eType": type } };
            this.sendRequest();
        }
        else {
            this.doNextRound();
        }
    };
    HousekeeperLoadView.prototype.sendZhenqifangAutotrain = function () {
        var parmsstr = Api.housekeeperVoApi.getCheckParms(this.curType);
        var parmsArr = parmsstr.split("|");
        if (parmsArr[0] != "1") {
            this.sendZhenqifangAutotrain2();
            return;
        }
        var servantobj = Api.zhenqifangVoApi.getBatchTaskObject();
        if (Object.keys(servantobj).length > 0) {
            if (!this._rewardInfo["zhenqifang"]) {
                this._rewardInfo["zhenqifang"] = {};
            }
            this._rewardInfo["zhenqifang"].times = Object.keys(servantobj).length;
            this.request(NetRequestConst.REQUEST_ZQF_BATCHITASK, {
                sarr: servantobj
            });
        }
        else {
            this.sendZhenqifangAutotrain2();
        }
    };
    HousekeeperLoadView.prototype.sendZhenqifangAutotrain2 = function () {
        var parmsstr = Api.housekeeperVoApi.getCheckParms(this.curType);
        var parmsArr = parmsstr.split("|");
        if (parmsArr[1] != "1") {
            this.doNextRound();
            return;
        }
        var servantobj = Api.zhenqifangVoApi.getBatchTaskObject2();
        if (Object.keys(servantobj).length > 0) {
            if (!this._rewardInfo["zhenqifang"]) {
                this._rewardInfo["zhenqifang"] = {};
            }
            if (this._rewardInfo["zhenqifang"].times) {
                this._rewardInfo["zhenqifang"].times += Object.keys(servantobj).length;
            }
            else {
                this._rewardInfo["zhenqifang"].times = Object.keys(servantobj).length;
            }
            this.request(NetRequestConst.REQUEST_ZQF_BATCHFTASK, {
                sarr: servantobj
            });
        }
        else {
            this.doNextRound();
        }
    };
    HousekeeperLoadView.prototype.receiveEvent = function (event) {
        if (event.data && event.data.ret == false) {
            this.sendRequest();
            return;
        }
        _super.prototype.receiveEvent.call(this, event);
    };
    //请求回调
    HousekeeperLoadView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        //一键经营
        if (rData.cmd == NetRequestConst.REQUEST_MANAGE_BATCHDEALFINANCE) {
            var cdata = rData.data;
            var times = cdata.type1Num + cdata.type2Num + cdata.type3Num;
            if (cdata.type4Num) {
                times += 1;
            }
            var num1 = cdata.type1Num > 0 ? (Api.playerVoApi.getPlayerGold() - this._oldInfo.gold) : 0;
            var num2 = cdata.type2Num > 0 ? (Api.playerVoApi.getFood() - this._oldInfo.food) : 0;
            var num3 = cdata.type3Num > 0 ? (Api.playerVoApi.getSoldier() - this._oldInfo.soldier) : 0;
            var num4 = cdata.type4Num;
            this._rewardInfo["manage"] = { "times": times, "gold": num1, "food": num2, "soldier": num3, "practice": num4 };
            this.doNextRound();
        }
        else if (rData.cmd == NetRequestConst.REQUEST_MANAGE_BATCHDEALAFFAIR) {
            var cdata = rData.data;
            var times = cdata.oknum;
            this._rewardInfo["affair"] = { "times": times, "rewards": cdata.rewards };
            this.doNextRound();
        }
        else if (rData.cmd == NetRequestConst.REQUEST_WIFE_CALL) {
            /* "autoCallWife":[
            [
                "208",
                13269,
                false
            ],
            [
                "306",
                182389,
                false
            ],]
            */
            var cdata = rData.data;
            var times = cdata.autoCallWife.length;
            this._rewardInfo["wife"] = { "times": times, "autoCallWife": cdata.autoCallWife };
            this.doNextRound();
        }
        else if (rData.cmd == NetRequestConst.REQUEST_SEARCH_PLAY) {
            var cdata = rData.data;
            var times = cdata.personId.length;
            var rewardsShowArr = [];
            var rewardStrArr = cdata.rewards ? cdata.rewards.split("|") : [];
            for (var i = 0; i < rewardStrArr.length; i++) {
                if (rewardStrArr[i] == "") {
                    var localStr = Api.searchVoApi.getPersonValueLocalStr(cdata.personId[i]);
                    if (localStr) {
                        rewardsShowArr.push(App.StringUtil.formatStringColor(localStr, TextFieldConst.COLOR_WARN_YELLOW));
                    }
                }
            }
            this._rewardInfo["search"] = { "times": times, "rewards": cdata.rewards, "showArr": rewardsShowArr };
            this.doNextRound();
        }
        else if (rData.cmd == NetRequestConst.REQUEST_BOOKROOM_FINISH) {
            var cdata = rData.data;
            /**
             * "bookroom_poss":[
            {
                "sid":"1001",
                "pos":false
            },
            {
                "sid":"1003",
                "pos":false
            },
            {
                "sid":"1037",
                "pos":false
            }
            */
            var sidss = Api.housekeeperVoApi.getBookroomServantIds();
            var times = sidss.length;
            if (times > 0) {
                this._rewardInfo["bookroom"] = { "times": times, "bookroom_poss": cdata.bookroom_poss, "sids": sidss };
                this._requestObject = { name: NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY, parms: { "sids": sidss } };
                this.sendRequest();
            }
            else {
                this.doNextRound();
            }
        }
        else if (rData.cmd == NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY) {
            this.doNextRound();
        }
        else if (rData.cmd == NetRequestConst.REQUEST_CHILD_BATCHRENAME) {
            this.sendChildAutotrain();
        }
        else if (rData.cmd == NetRequestConst.REQUEST_CHILD_AUTOTRAIN) {
            var cdata = rData.data;
            var levelsinfo = [];
            if (cdata.childArr) {
                var keys = Object.keys(cdata.childArr);
                for (var i = 0; i < keys.length; i++) {
                    var oneName = keys[i];
                    var oneInfo = cdata.childArr[oneName];
                    if (oneInfo.eType) {
                        levelsinfo.push(LanguageManager.getlocal("housekeeper_child_levelup2", [oneName, String(oneInfo.lv)]));
                    }
                    else {
                        levelsinfo.push(LanguageManager.getlocal("housekeeper_child_levelup1", [oneName, String(oneInfo.lv)]));
                    }
                }
            }
            if (levelsinfo.length > 0) {
                this._rewardInfo["child"]["levelinfo"] = levelsinfo;
            }
            this.doNextRound();
        }
        else if (rData.cmd == NetRequestConst.REQUEST_BOOKROOM_FINISH) {
            this.doNextRound();
        }
        else if (rData.cmd == NetRequestConst.REQUEST_CONQUEST_BATCHFIGHT) {
            var cdata = rData.data;
            var times = cdata.fightnum;
            this._rewardInfo["conquest"] = { "times": times, "rewards": cdata.rewards };
            this.doNextRound();
        }
        else if (rData.cmd == NetRequestConst.REQUEST_TRADE_BATCHFIGHT) {
            var cdata = rData.data;
            var times = cdata.fightnum;
            this._rewardInfo["trade"] = { "times": times, "rewards": cdata.rewards };
            this.doNextRound();
        }
        else if (rData.cmd == NetRequestConst.REQUEST_PRISON_AUTOPUNISH) {
            var cdata = rData.data;
            var times = cdata.punishvalue;
            this._rewardInfo["prison"] = { "times": times, "rewards": cdata.rewards };
            this.doNextRound();
        }
        else if (rData.cmd == NetRequestConst.REQUEST_ZQF_GETREWARD) {
            var cdata = rData.data;
            if (cdata.taskType == 1) {
                if (cdata.rewards) {
                    this._rewardInfo["zhenqifang"] = { "rewards": cdata.rewards };
                }
                this._requestObject = { name: NetRequestConst.REQUEST_ZQF_GETREWARD, parms: {
                        idx: 0,
                        taskType: 2,
                        cts: 0,
                        isBatch: 1
                    } };
                this.sendRequest();
            }
            else if (cdata.taskType == 2) {
                if (cdata.rewards) {
                    if (this._rewardInfo["zhenqifang"] && this._rewardInfo["zhenqifang"].rewards) {
                        this._rewardInfo["zhenqifang"].rewards += "|" + cdata.rewards;
                    }
                    else {
                        this._rewardInfo["zhenqifang"] = { "rewards": cdata.rewards };
                    }
                }
                this.sendZhenqifangAutotrain();
            }
            else {
                this.doNextRound();
            }
        }
        else if (rData.cmd == NetRequestConst.REQUEST_ZQF_BATCHITASK) {
            this.sendZhenqifangAutotrain2();
        }
        else if (rData.cmd == NetRequestConst.REQUEST_ZQF_BATCHFTASK) {
            this.doNextRound();
        }
    };
    HousekeeperLoadView.prototype.roundEnd = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.HOUSEKEEPERREPORTVIEW, { info: this._rewardInfo });
        this.hide();
    };
    HousekeeperLoadView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_LOGIIN), this.hide, this);
        this._types.length = 0;
        this._curIdx = 0;
        this._progress = null;
        this._tipText = null;
        this._numText = null;
        this._rewardInfo = {};
        this._oldInfo = null;
        this._requestIdx = -1;
        this._requestObject = null;
        _super.prototype.dispose.call(this);
    };
    return HousekeeperLoadView;
}(BaseView));
__reflect(HousekeeperLoadView.prototype, "HousekeeperLoadView");
//# sourceMappingURL=HousekeeperLoadView.js.map