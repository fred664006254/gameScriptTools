/**
 * 府内门客Tab1
 * @author 张朝阳
 * date 2019/2/18
 * @class ServantViewTab1
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
var ServantViewTab1 = (function (_super) {
    __extends(ServantViewTab1, _super);
    function ServantViewTab1() {
        var _this = _super.call(this) || this;
        _this._lastDropIdx = 1;
        _this._scrollList = null;
        _this._servantNumTxt = null;
        _this._qingyuanBtn = null;
        egret.callLater(_this.initView, _this);
        return _this;
    }
    ServantViewTab1.prototype.initView = function () {
        App.MessageHelper.addNetMessage("servantbanish", this.refreshSort, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP), this.refreshSort, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_END2, this.rookieGuideEndCheck, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL, this.refreshQingyuan, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT), this.refreshQingyuan, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshQingyuan, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.refreshQingyuan, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA, this.refreshQingyuan, this);
        //使用丹药
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.refreshQingyuan, this);
        //书记升级
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY), this.refreshQingyuan, this);
        //神器
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE), this.refreshQingyuan, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN), this.refreshQingyuan, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY), this.refreshQingyuan, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL), this.refreshQingyuan, this);
        //光环
        App.MessageHelper.addEventListener(NetRequestConst.REQUEST_SERVANT_UPAURA, this.refreshQingyuan, this);
        this._dropBtnList = [];
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        this._lastDropIdx = Api.otherInfoVoApi.getServantSortId();
        // if (Api.rookieVoApi.getIsGuiding())
        // {
        // 	this._lastDropIdx = 1;
        // }
        //衬底
        var topBg = BaseBitmap.create("commonview_substrate");
        topBg.height = GameConfig.stageHeigth - 215;
        topBg.y = 3 + 5;
        topBg.x = GameConfig.stageWidth / 2 - topBg.width / 2;
        // this._nodeContainer.addChild(topBg);
        //门客滚顶区域
        var scroY = topBg.y + 10;
        var innerbg = BaseBitmap.create("public_9_bg74");
        innerbg.width = topBg.width - 10;
        innerbg.height = topBg.height - 20;
        innerbg.x = topBg.x + 5;
        innerbg.y = scroY;
        // this._nodeContainer.addChild(innerbg);
        var downBg = BaseBitmap.create("servantview_bottomui");
        downBg.x = 0;
        downBg.y = topBg.y + topBg.height - 10;
        this._nodeContainer.addChild(downBg);
        var servantNumTxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
        servantNumTxt.x = downBg.x + 30;
        servantNumTxt.y = downBg.y + downBg.height / 2 - servantNumTxt.height / 2 - 10;
        this._nodeContainer.addChild(servantNumTxt);
        this._servantNumTxt = servantNumTxt;
        this.resetServantNum();
        this._dropDownBtn = ComponentManager.getButton("common_select_frame", "", this.dropDownBtnClickHandler, this, [0]);
        this._dropDownBtn.x = GameConfig.stageWidth - this._dropDownBtn.width - 40;
        this._dropDownBtn.y = servantNumTxt.y + servantNumTxt.height / 2 - this._dropDownBtn.height / 2;
        this._dropDownBtn.setColor(ServantView.DROPBTN_COLOR1);
        this._nodeContainer.addChild(this._dropDownBtn);
        this._dropDownBtn.setText("servant_dropTxt" + this._lastDropIdx);
        this._dropBtnList.push(this._dropDownBtn);
        this._dropDownFlag = BaseBitmap.create("common_arrow_1");
        this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height / 2;
        this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width - this._dropDownFlag.width - 3;
        this._dropDownFlag.y = this._dropDownBtn.y + this._dropDownBtn.height - this._dropDownFlag.height / 2 - 3;
        this._nodeContainer.addChild(this._dropDownFlag);
        this._dropDownContainer = new BaseDisplayObjectContainer();
        this._dropDownContainer.visible = false;
        this._dropDownContainer.x = this._dropDownBtn.x;
        this._dropDownContainer.y = this._dropDownBtn.y - this._dropDownBtn.height;
        var dropCfg = [
            "servant_dropTxt1", "servant_dropTxt2", "servant_dropTxt3", "servant_dropTxt4"
        ];
        for (var index = 1; index <= dropCfg.length; index++) {
            var tmpBtn = ComponentManager.getButton("common_select_frame", "", this.dropDownBtnClickHandler, this, [index]);
            this._dropBtnList.push(tmpBtn);
            tmpBtn.setColor(ServantView.DROPBTN_COLOR1);
            tmpBtn.y = -tmpBtn.height * (index - 1) - 3;
            this._dropDownContainer.addChild(tmpBtn);
            tmpBtn.setText(dropCfg[index - 1]);
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, innerbg.height - 10);
        var keys = Api.servantVoApi.getServantInfoIdListWithSort(this._lastDropIdx);
        this._scrollList = ComponentManager.getScrollList(ServantNewScrollItem, [], rect);
        this._scrollList.y = topBg.y + 2;
        this._scrollList.x = 3;
        this._nodeContainer.addChild(this._scrollList);
        this._scrollList.refreshData(keys);
        this._nodeContainer.addChild(this._dropDownContainer);
        //情缘绘卷入口
        if (Api.switchVoApi.checkOpenOfficialCareer() && Api.switchVoApi.checkOpenQingYuanHuiJuan() && Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
            var qingyuanBtn = ComponentManager.getButton("qingyuannew_icon", "", function () {
                // if (Api.playerVoApi.getPlayerLevel() >= Config.CareerCfg.getStoryNeedLv()) {
                ViewController.getInstance().openViewByFunName("qingyuan");
                // }
                // else {
                //     App.CommonUtil.showTip(LanguageManager.getlocal("mianUIFriendBtnTip", [LanguageManager.getlocal("officialTitle" + Config.CareerCfg.getStoryNeedLv())]));
                // }
            }, this);
            qingyuanBtn.setPosition(downBg.x - 20, downBg.y - qingyuanBtn.height);
            this._nodeContainer.addChild(qingyuanBtn);
            this._qingyuanBtn = qingyuanBtn;
            var redDot = BaseBitmap.create("public_dot2");
            redDot.setPosition(qingyuanBtn.x + qingyuanBtn.width - 39, qingyuanBtn.y + 24);
            this._nodeContainer.addChild(redDot);
            redDot.name = "qingyuanRedDot";
            this.refreshQingyuan();
        }
        if (Api.rookieVoApi.getIsGuiding() && Api.rookieVoApi.curStep == "weapon_5") {
            var guideIdx = 0;
            for (var i = 0; i < keys.length; i++) {
                var tmp = keys[i];
                if (tmp == "1001") {
                    guideIdx = i;
                    this._scrollList.setScrollTopByIndex(guideIdx);
                    var item = this._scrollList.getItemByIndex(guideIdx);
                    var posnew = item.localToGlobal();
                    RookieCfg.rookieCfg["weapon_6_2"].clickRect.x = posnew.x + 10;
                    RookieCfg.rookieCfg["weapon_6_2"].clickRect.y = posnew.y + 3;
                    break;
                }
            }
        }
        if (Api.rookieVoApi.getIsGuiding()) {
            this._scrollList.verticalScrollPolicy = "off";
        }
        if (Api.switchVoApi.checkOpenExile()) {
            RookieCfg.changeRookieCfg();
        }
        Api.rookieVoApi.checkNextStep();
    };
    ServantViewTab1.prototype.refreshQingyuan = function () {
        if (this._qingyuanBtn) {
            var redDot = this._nodeContainer.getChildByName("qingyuanRedDot");
            if (Api.encounterVoApi.isShowNpc()) {
                // App.CommonUtil.addIconToBDOC(this._qingyuanBtn);
                redDot.visible = true;
            }
            else {
                redDot.visible = false;
            }
        }
    };
    ServantViewTab1.prototype.resetServantNum = function () {
        var totalNum = Api.servantVoApi.getServantCount();
        var excileNum = Api.servantVoApi.getServantCountExiled();
        this._servantNumTxt.text = LanguageManager.getlocal("atkracemenkeText2", [String(totalNum), String(totalNum - excileNum), String(excileNum)]);
    };
    ServantViewTab1.prototype.dropDownBtnClickHandler = function (btnIdx) {
        var tmpIdx = this._lastDropIdx;
        for (var index = 1; index < this._dropBtnList.length; index++) {
            this._dropBtnList[index].updateButtonImage(BaseButton.BTN_STATE1);
        }
        this._dropBtnList[this._lastDropIdx].updateButtonImage(BaseButton.BTN_STATE2);
        if (this._dropDownContainer.visible) {
            this._dropDownFlag.scaleY = 1;
            this._dropDownContainer.visible = false;
        }
        else {
            this._dropDownFlag.scaleY = -1;
            this._dropDownContainer.visible = true;
        }
        if (btnIdx > 0) {
            this._dropDownBtn.setText("servant_dropTxt" + btnIdx);
            this._lastDropIdx = btnIdx;
        }
        if (tmpIdx == this._lastDropIdx) {
            return;
        }
        //排序数据，刷新列表
        var keys = Api.servantVoApi.getServantInfoIdListWithSort(btnIdx);
        this._scrollList.refreshData(keys);
        NetManager.request(NetRequestConst.REQUEST_OTHER_RECORDSERVANTSORT, { sortId: this._lastDropIdx });
    };
    ServantViewTab1.prototype.refreshSort = function () {
        var keys = Api.servantVoApi.getServantInfoIdListWithSort(Api.otherInfoVoApi.getServantSortId());
        this._scrollList.refreshData(keys);
        this.resetServantNum();
        this.refreshQingyuan();
    };
    ServantViewTab1.prototype.rookieGuideEndCheck = function () {
        if (this._scrollList) {
            this._scrollList.verticalScrollPolicy = "on";
        }
    };
    ServantViewTab1.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage("servantbanish", this.refreshSort, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT_EQUIP), this.refreshSort, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_NOTICE_GUIDE_END2, this.rookieGuideEndCheck, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ENCOUNTER_MODEL, this.refreshQingyuan, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_UPGRADE_SERVANT), this.refreshQingyuan, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPSKILL), this.refreshQingyuan, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN, this.refreshQingyuan, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTSKIN_AURA, this.refreshQingyuan, this);
        //使用丹药
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM), this.refreshQingyuan, this);
        //书记升级
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_SERVANT_UPABILITY), this.refreshQingyuan, this);
        //神器
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADE), this.refreshQingyuan, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPGRADETEN), this.refreshQingyuan, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPABILITY), this.refreshQingyuan, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_WEAPON_UPSKILL), this.refreshQingyuan, this);
        //光环
        App.MessageHelper.removeEventListener(NetRequestConst.REQUEST_SERVANT_UPAURA, this.refreshQingyuan, this);
        this._nodeContainer = null;
        this._dropDownContainer = null;
        this._scrollList = null;
        this._dropDownBtn = null;
        this._dropDownFlag = null;
        this._dropBtnList = null;
        this._lastDropIdx = 1;
        this._servantNumTxt = null;
        this._qingyuanBtn = null;
        _super.prototype.dispose.call(this);
    };
    ServantViewTab1.DROPBTN_COLOR1 = 0xfffcd8;
    ServantViewTab1.DROPBTN_COLOR2 = 0x99a3b4;
    return ServantViewTab1;
}(CommonViewTab));
__reflect(ServantViewTab1.prototype, "ServantViewTab1");
//# sourceMappingURL=ServantViewTab1.js.map