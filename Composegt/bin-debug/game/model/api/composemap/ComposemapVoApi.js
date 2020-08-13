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
/**
 * 合成api
 * author 陈可
 * date 2019/12/02
 * @class ComposemapVoApi
 */
var ComposemapVoApi = (function (_super) {
    __extends(ComposemapVoApi, _super);
    function ComposemapVoApi() {
        var _this = _super.call(this) || this;
        _this._unlockGroupList = [];
        _this._timeCount = -1;
        _this._waitBuyData = null;
        return _this;
    }
    ComposemapVoApi.prototype.formatUnlockGroupList = function () {
        this._unlockGroupList = Config.MapinfoCfg.getUnlockGroupList(Api.challengeVoApi.getHasPassId());
    };
    ComposemapVoApi.prototype.checkOpenUnlock = function () {
        return this.getMaxLv() >= 6;
    };
    ComposemapVoApi.prototype.checkUnlock = function (group) {
        return this._unlockGroupList.indexOf(group) > -1;
    };
    ComposemapVoApi.prototype.openFunction = function (group) {
        var cfg = Config.MapinfoCfg.getStartPosCfgByGroup(group);
        switch (cfg.building) {
            case 1:
                break;
            case 2:
                ViewController.getInstance().openView(ViewConst.COMMON.LEVYVIEW);
                break;
            case 3:
                SceneController.getInstance().goCity();
                break;
        }
    };
    /**
     * 获取所有小人按照等级key分组列表
     * 注意每次调用会重新计算，返回最新list
     *
     */
    ComposemapVoApi.prototype.getMapinfoLvData = function () {
        var list = this.composemapVo.mapInfoList;
        var lvData = {};
        for (var key in list) {
            if (list.hasOwnProperty(key)) {
                var info = list[key];
                if (info && info.lv) {
                    if (!lvData[info.lv]) {
                        lvData[info.lv] = [];
                    }
                    lvData[info.lv].push(info);
                }
            }
        }
        return lvData;
    };
    ComposemapVoApi.prototype.getUnlockStrByGroup = function (group) {
        var str = "";
        var unlockId = Config.MapinfoCfg.getUnlockByGroup(group);
        if (unlockId) {
            var bid = Api.challengeVoApi.getBigChannelIdByCid2(unlockId);
            //str=ChallengeCfg.getLocalStrByBigId(String(bid));
            str = String(bid);
            str = LanguageManager.getlocal("composeUnlockDesc", [str]);
        }
        return str;
    };
    /**
     * 检测是否可以合并，目前逻辑是检测是否达到最大合成上限
     * @param clv 参与合成的小人等级
     */
    ComposemapVoApi.prototype.checkCanCompose = function (clv) {
        var result = true;
        var mid = Api.playerVoApi.getPlayerMinLevelId();
        var lvCfg = Config.MinlevelCfg.getCfgByMinLevelId(mid);
        var canMaxLv = this.getCanHaveMaxPersonLv();
        var maxComposeLv = canMaxLv || this.getMaxLv();
        if (clv >= maxComposeLv) {
            result = false;
        }
        return result;
    };
    ComposemapVoApi.prototype.checkMaxCfgLv = function (clv) {
        return clv >= Config.PersoninfoCfg.getMaxLv();
    };
    ComposemapVoApi.prototype.getMinLonelyId = function () {
        var data = this.composemapVo.minLvData;
        if (data && (data.num % 2 == 1) && (data.lv < this.normalBuyPersonLv())) {
            return data.item.id;
        }
        return null;
    };
    /**
     * 弹板提示不满足合成条件
     * @param callback 确定回调
     * @param thisObj 回调执行对象
     */
    ComposemapVoApi.prototype.showCannotComposeView = function (callback, thisObj) {
        // let msg="";
        // if(Api.playerVoApi.checkMaxPlayerLevel())
        // {
        //     msg=LanguageManager.getlocal("servant_skilllLvTop");
        // }
        // else
        // {
        //     let nextLv=Api.playerVoApi.getPlayerNextLevel();
        //     msg=Api.playerVoApi.getPlayerOfficeByLevel(nextLv);
        //     msg=LanguageManager.getlocal("composeNeedLvupDesc",[msg]);
        // }
        // ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
        //     title:"composeNeedLvupTitle",
        //     msg:msg,
        //     yesKey:"composeGoChallenge",
        //     callback:()=>{ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);},
        //     handler:this,
        //     showCloseBtn:true,
        // });
        if (this.isChallengeLv() && Api.challengeVoApi.getHasPassId() >= 370) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMPOSENEEDLVUPNEWVIEW);
        }
        else {
            if (!Api.playerVoApi.checkMaxMinLv()) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMPOSENEEDLVUPVIEW);
            }
        }
    };
    ComposemapVoApi.prototype.showConfirmDel = function (id, callback, thisObj) {
        var data = this.getCellDataById(id);
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            title: "itemUseConstPopupViewTitle",
            msg: LanguageManager.getlocal("composeDelPersionDesc", [this.getBuyTimeByLv(data.lv) + Config.RewardCfg.getNameByTypeAndId(ItemEnums.gold)]),
            // yesKey:"composeGoChallenge",
            callback: callback,
            handler: thisObj,
            showCloseBtn: true,
        });
    };
    ComposemapVoApi.prototype.checkOpenUnlockGroup = function () {
        return Api.composemapVoApi.getMaxLv() >= 6;
    };
    ComposemapVoApi.prototype.getNextUnlockGroup = function () {
        var cid = Api.challengeVoApi.getHasPassId();
        var group = Config.MapinfoCfg.getNextUnlockGroup(cid);
        if (group) {
            while (Config.MapinfoCfg.getCfgByGroup(group)) {
                if (this.hasGroupData(group)) {
                    group = String(Number(group) + 1);
                }
                else {
                    break;
                }
            }
        }
        return group;
    };
    ComposemapVoApi.prototype.hasGroupData = function (group) {
        var pos = Config.MapinfoCfg.getStartPosCfgByGroup(String(group));
        return !!this.getCellDataById(pos.id);
    };
    ComposemapVoApi.prototype.getAllComposeNum = function () {
        var allCost = this._waitBuyData ? this._waitBuyData.length : 0;
        // if(this._waitBuyData)
        // {
        //     for(let i=0;i<this._waitBuyData.length;i++)
        //     {
        //         let lv=this._waitBuyData[i][1];
        //         // allCost+=this.getComposeCostByLv(lv);
        //     }
        // }
        return allCost;
    };
    /**
     * 下次购买小人的价格
     */
    // public getComposeCost():number
    // {
    //     return 111;//this.getComposeCostByLv(this.curBuyPersonLv());
    // }
    // public getComposeCostByLv(lv:number):number
    // {
    //     return Config.PersoninfoCfg.getGoldCostByLv(lv);
    // }
    ComposemapVoApi.prototype.getBuyTimeByLv = function (lv) {
        return Config.PersoninfoCfg.getBuyTimeByLv(lv);
    };
    /**
     * 当前购买单次恢复时间
     */
    ComposemapVoApi.prototype.getCurBuyTime = function () {
        return this.getBuyTimeByLv(this.curBuyPersonLv());
    };
    ComposemapVoApi.prototype.getBuyNum = function () {
        return Math.min(this.getMaxBuyNum(), this.composemapVo.attinfo.num + Math.floor((GameData.serverTime - this.composemapVo.attinfo.st) / this.getCurBuyTime()));
    };
    ComposemapVoApi.prototype.getNextRecoverPassT = function () {
        return (GameData.serverTimeMs - this.composemapVo.attinfo.st * 1000) % (this.getNextRecoverMaxT() * 1000);
    };
    ComposemapVoApi.prototype.getNextRecoverMaxT = function () {
        return Config.PersoninfoCfg.getBuyTimeByLv(this.curBuyPersonLv());
    };
    ComposemapVoApi.prototype.getMaxBuyNum = function () {
        return Config.MinlevelCfg.getbuyLimitByMinLvId(Api.playerVoApi.getPlayerMinLevelId());
    };
    ComposemapVoApi.prototype.curBuyPersonLv = function () {
        var loneId = this.getMinLonelyId();
        var curBuyLv = loneId ? this.getCellDataById(loneId).lv : this.normalBuyPersonLv();
        return curBuyLv;
    };
    ComposemapVoApi.prototype.normalBuyPersonLv = function () {
        return Math.max(1, this.getMaxLv() - 5);
    };
    /**
     * 下次购买小人的资源
     */
    ComposemapVoApi.prototype.getcurBuyRes = function () {
        return Config.MapinfoCfg.getPersonResBig(this.curBuyPersonLv());
    };
    /**
     *
     * @param id
     * @param allstatus 是否返回全部状态的地块信息，默认不返回地块动画未播放完成的地块
     */
    ComposemapVoApi.prototype.getCellDataById = function (id, allstatus) {
        var item = this.composemapVo.mapInfoList[String(id)];
        var rookieCfg = RookieCfg.getRookieCfg(Api.rookieVoApi.curStep);
        var idCfg = { "10100": 1, "10200": 1 };
        if (Api.rookieVoApi.isInGuiding && rookieCfg && rookieCfg.moveHand) {
            if (!idCfg[id]) {
                item = null;
            }
        }
        if (!allstatus) {
            if (item && item.unlocking) {
                item = null;
            }
        }
        return item;
    };
    ComposemapVoApi.prototype.setunlockingStatusById = function (id) {
        var item = this.getCellDataById(id, true);
        item && (item.unlocking = true);
    };
    ComposemapVoApi.prototype.setunlockedStatusById = function (id) {
        var item = this.getCellDataById(id, true);
        item && (item.unlocking = false);
    };
    ComposemapVoApi.prototype.getAllCellData = function () {
        return this.composemapVo.mapInfoList;
    };
    ComposemapVoApi.prototype.move = function (oid, nid) {
        this.composemapVo.move(oid, nid);
    };
    ComposemapVoApi.prototype.removeData = function (id) {
        this.composemapVo.removeData(id);
    };
    /**
     * 获取当前拥有的小人的最大等级
     */
    ComposemapVoApi.prototype.getOwnCoposeMaxLv = function () {
        return this.composemapVo.maxinfo.plv;
    };
    /**
     * 获取当前可以合并的最大等级
     */
    ComposemapVoApi.prototype.getCanComposeMaxLv = function () {
        var mid = Api.playerVoApi.getPlayerMinLevelId();
        var cfg = Config.MinlevelCfg.getCfgByMinLevelId(mid);
        var maxLv = (cfg && cfg.personLv) || this.composemapVo.maxinfo.plv;
        return maxLv;
    };
    ComposemapVoApi.prototype.checkAndStartCount = function (pos, lv) {
        var _this = this;
        if (!this._waitBuyData) {
            this._waitBuyData = [];
        }
        this._waitBuyData.push([pos, lv]);
        if (this._timeCount != -1) {
            egret.clearTimeout(this._timeCount);
        }
        this._timeCount = egret.setTimeout(function () {
            _this.checkAndStopCount();
        }, this, 300);
    };
    ComposemapVoApi.prototype.checkAndStopCount = function () {
        var result = false;
        if (this._timeCount != -1) {
            egret.clearTimeout(this._timeCount);
            this._timeCount = -1;
            if (this._waitBuyData) {
                if (this._waitBuyData.length > 0) {
                    NetManager.request(NetRequestConst.REQUEST_MAP_BUYPERSON, { poslvs: this._waitBuyData });
                }
                this._waitBuyData = null;
            }
            result = true;
        }
        return result;
    };
    /**
     * 检测是否开启一键购买小人
     */
    ComposemapVoApi.prototype.checkCanFastBuyPerson = function () {
        return Api.playerVoApi.getPlayerLevel() >= Config.MinlevelCfg.oneClickBuy;
    };
    ComposemapVoApi.prototype.buyPerson = function () {
        // console.log(Api.playerVoApi.getPlayerGold(),this.getAllComposeCost()+this.getComposeCost());
        if (this.getBuyNum() < this.getAllComposeNum() + 1) {
            // if(MainUI.getInstance().getUnlockIndex()>=10)
            // {
            //     ViewController.getInstance().openView(ViewConst.POPUP.COMPOSENEEDGOLDPOPUPVIEW);
            //     return false;
            // }else{
            var leftT = Math.ceil(Api.composemapVoApi.getNextRecoverMaxT() - Api.composemapVoApi.getNextRecoverPassT() / 1000);
            App.CommonUtil.showTip(LanguageManager.getlocal("composewaittime", [App.DateUtil.getFormatBySecond(leftT)]));
            return false;
            // }
        }
        var posId = "";
        var groupList = Config.MapinfoCfg.groupIdArr;
        var l = groupList.length;
        for (var i = 0; i < l; i++) {
            var groupCfg = Config.MapinfoCfg.getCfgByGroup(String(groupList[i]));
            if (groupCfg) {
                var ll = groupCfg.length;
                for (var j = 0; j < ll; j++) {
                    var item = groupCfg[j];
                    var data = this.getCellDataById(item.id);
                    if (data && !data.lv) {
                        posId = item.id;
                        if (GameData.isNewUser && ComposeStatus.buyNum == 0 && posId == groupCfg[0].id && !this.getCellDataById(groupCfg[1].id).lv) {
                            posId = groupCfg[1].id;
                        }
                        else if (GameData.isNewUser && ComposeStatus.buyNum == 1 && posId == groupCfg[0].id && !this.getCellDataById(groupCfg[2].id).lv) {
                            posId = groupCfg[2].id;
                        }
                        var lv = this.curBuyPersonLv();
                        var result = this.composemapVo.addClientItem(posId, lv);
                        if (result) {
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_ADDPERSON);
                            this.checkAndStartCount(posId, lv);
                        }
                        // NetManager.request(NetRequestConst.REQUEST_MAP_BUYPERSON,{pos:posId,lv:this.curBuyPersonLv()});
                        return true;
                    }
                }
            }
        }
        App.CommonUtil.showTip(LanguageManager.getlocal("composeNoSpace"));
        return false;
    };
    ComposemapVoApi.prototype.getAddPresonList = function () {
        return this.composemapVo.addList;
    };
    ComposemapVoApi.prototype.clearAddPersonList = function () {
        this.composemapVo.addList.length = 0;
    };
    ComposemapVoApi.prototype.getNeedDelPersonList = function () {
        return this.composemapVo.delList;
    };
    ComposemapVoApi.prototype.delClientPerson = function () {
        this.composemapVo.delClientitem();
    };
    ComposemapVoApi.prototype.getLvList = function (lv) {
        return this.composemapVo.mapInfoLvList[lv] || [];
    };
    ComposemapVoApi.prototype.getMaxLv = function () {
        return this.composemapVo.maxinfo.plv;
    };
    ComposemapVoApi.prototype.checkCanBath = function () {
        // return Api.rookieVoApi.isInGuiding==false;
        if (Api.rookieVoApi.isInGuiding) {
            return false;
        }
        else {
            return Api.playerVoApi.getPlayerMinLevelId() >= 5;
        }
        // return false;
    };
    /**
     * 是否可以放下or合并
     */
    ComposemapVoApi.prototype.checkCanPos = function () {
        var _a = ComposeStatus.curStopPos, x = _a.x, y = _a.y;
        var id = Config.MapinfoCfg.getIdByPos(x, y);
        var selectId = Config.MapinfoCfg.getIdByPos(ComposeStatus.curSelectPos.x, ComposeStatus.curSelectPos.y);
        var stopitem = this.getCellDataById(id);
        var moveitem = this.getCellDataById(selectId);
        var result = false;
        if (Config.MapinfoCfg.checkHasPos(x, y) && moveitem && moveitem.lv) {
            if (stopitem && stopitem.id != moveitem.id) {
                // if((stopitem.lv==moveitem.lv)||(!stopitem.lv))
                // {
                result = true;
                // }
            }
        }
        return result;
    };
    ComposemapVoApi.prototype.getLeftTopPos = function () {
        return { x: this.composemapVo.minX, y: this.composemapVo.minY };
    };
    ComposemapVoApi.prototype.getRightButtomPos = function () {
        var unlockX = 0;
        var unlockY = 0;
        if (this.checkOpenUnlockGroup()) {
            var nextgroup = this.getNextUnlockGroup();
            if (nextgroup) {
                var cfg = Config.MapinfoCfg.getStartPosCfgByGroup(nextgroup);
                unlockX = cfg.x;
                unlockY = cfg.y;
            }
        }
        return { x: Math.max(this.composemapVo.maxX, unlockX), y: Math.max(this.composemapVo.maxY, unlockY) };
    };
    ComposemapVoApi.prototype.getOfficePersonLv = function () {
        var curMinLvId = Api.playerVoApi.getPlayerMinLevelId();
        var curLvCfg = Config.MinlevelCfg.getCfgByMinLevelId(curMinLvId);
        return curLvCfg.personLv || 1;
    };
    ComposemapVoApi.prototype.getChallengeAddPersonLv = function () {
        if (!this.isChallengeLv()) {
            return 0;
        }
        var hasPasId = Api.challengeVoApi.getHasPassId();
        return Config.ChallengelvCfg.getAddPersonLvByChallengeId(hasPasId);
    };
    ComposemapVoApi.prototype.isChallengeLv = function () {
        if (JSON.stringify(GameConfig.config.challengelvCfg) === '{}') {
            return false;
        }
        return true;
    };
    ComposemapVoApi.prototype.getCanHaveMaxPersonLv = function () {
        var maxLv = this.getOfficePersonLv() + this.getChallengeAddPersonLv();
        maxLv = Math.min(maxLv, 60);
        return maxLv;
    };
    ComposemapVoApi.prototype.getCanHavePreviewPersonLv = function () {
        var previewlv = this.getOfficePersonLv() + this.getChallengeAddPersonLv() + 1;
        previewlv = Math.min(previewlv, 60);
        return previewlv;
    };
    ComposemapVoApi.prototype.dispose = function () {
        this.checkAndStopCount();
        this.composemapVo = null;
        this._unlockGroupList.length = 0;
        _super.prototype.dispose.call(this);
    };
    return ComposemapVoApi;
}(BaseVoApi));
__reflect(ComposemapVoApi.prototype, "ComposemapVoApi");
