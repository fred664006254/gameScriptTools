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
 * 春节活动 奖励宝箱奖励预览弹板
 */
var AcNewYearPopupView = (function (_super) {
    __extends(AcNewYearPopupView, _super);
    function AcNewYearPopupView() {
        var _this = _super.call(this) || this;
        _this._rbg = null;
        _this._goBtn = null;
        _this.isShowBtnType = 0;
        _this._isshow = false;
        _this._rewardNum = 0;
        _this._btnType = 0;
        _this._name = "";
        _this._btnTypeNum = 0;
        return _this;
    }
    AcNewYearPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.refreshUIInfo, this);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var reward = this.param.data.reward; // "6_1030_1|6_1020_1|6_1030_1|6_1020_1";//this.param.data.reward; 
        this.isShowBtnType = this.param.data.isShowBtnType;
        this._isshow = this.param.data.isshow;
        this._rewardNum = this.param.data.rewardNum;
        // 第一页面 礼包状态 
        if (this.param.data._name) {
            this._name = this.param.data._name;
            this._btnTypeNum = this.param.data._btnTypeNum;
        }
        var ofy = 91;
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 520;
        bg.height = 205;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 116 - ofy;
        this._nodeContainer.addChild(bg);
        this._rbg = bg;
        var rewardArr = GameData.getRewardItemIcons(reward, true);
        var lineNum = Math.ceil(rewardArr.length / 4);
        var rbg = BaseBitmap.create("public_tc_bg03");
        rbg.width = bg.width - 20;
        rbg.height = 120 * lineNum;
        rbg.x = this.viewBg.x + this.viewBg.width / 2 - rbg.width / 2;
        rbg.y = bg.y + 20;
        // rbg.visible =false;
        this._nodeContainer.addChild(rbg);
        bg.height = rbg.height + 90;
        var rewardX = rbg.x + 20;
        var rewardY = rbg.y + 10;
        var iconContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(iconContainer);
        for (var index = 0; index < rewardArr.length; index++) {
            var icon = rewardArr[index];
            if (index > 0) {
                rewardX += (icon.width + 10);
                if (index % 4 == 0) {
                    rewardX = rbg.x + 10;
                    rewardY += icon.height + 5;
                }
            }
            icon.x = rewardX;
            icon.y = rewardY;
            iconContainer.addChild(icon);
        }
        iconContainer.x = rbg.x + (rbg.width - iconContainer.width) / 2 - 85; //-rewardX;
        this._nodeContainer.addChild(iconContainer);
        this.setConfirmBtnPosition(0, 0);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "sysConfirm", this.collectHandler, this);
        this._goBtn.x = rbg.x + rbg.width / 2 - this._goBtn.width / 2;
        this._goBtn.y = rbg.y + rbg.height - this._goBtn.height / 2 + 40;
        this._nodeContainer.addChild(this._goBtn);
        if (this._name == "newYear1") {
            this._goBtn.visible = false;
            var curr_acNewYearVo = Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID, AcNewYearView.CODE);
            if (curr_acNewYearVo.getBtnType(this._rewardNum)) {
                var collectflag = BaseBitmap.create("collectflag");
                collectflag.x = 235;
                collectflag.y = 165;
                // collectflag.scaleX=0.6;
                // collectflag.scaleY=0.6;  
                this._nodeContainer.addChild(collectflag);
            }
            else {
                if (collectflag) {
                    collectflag.visible = false;
                }
                else {
                    //可以领取
                    if (this._btnTypeNum == 2) {
                        this._goBtn.visible = true;
                        this._goBtn.setText("taskCollect");
                    }
                }
            }
            return;
        }
        // 2不显示，1可领取 3，已领取
        if (this.isShowBtnType == 2) {
            this._goBtn.visible = false;
        }
        if (this.isShowBtnType == 1) {
            this._goBtn.setText("taskCollect");
        }
        if (AcNewYearViewTab2.isStarBoo == false) {
            this._goBtn.visible = false;
        }
        else {
            var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcNewYearView.AID, AcNewYearView.CODE);
            if (tmpVo.taskinfo[tmpVo.getCurDay() + ""].dayFlag == 2) {
                this._goBtn.visible = false;
                var collectflag_1 = BaseBitmap.create("collectflag");
                collectflag_1.x = 235;
                collectflag_1.y = 165;
                // collectflag.scaleX=0.6;
                // collectflag.scaleY=0.6;  
                this._nodeContainer.addChild(collectflag_1);
            }
            else if (tmpVo.taskinfo[tmpVo.getCurDay() + ""].dayFlag == 1) {
                this._goBtn.visible = true;
                this._goBtn.setText("taskCollect");
            }
            else {
                this._goBtn.setEnable(true);
            }
        }
    };
    AcNewYearPopupView.prototype.collectHandler = function (evt) {
        //领取状态 第一页面礼包
        if (this._btnTypeNum == 2) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD, { "activeId": AcNewYearView.AID + "-" + AcNewYearView.CODE, "questType": this._rewardNum + "", "ftype": 3 });
        }
        else {
            if (this.isShowBtnType == 1) {
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD, { "activeId": AcNewYearView.AID + "-" + AcNewYearView.CODE, "questType": 1001 + "", "ftype": 2 });
            }
            else {
                this.hide();
            }
        }
    };
    AcNewYearPopupView.prototype.refreshUIInfo = function (evt) {
        if (evt.data.ret) {
            var collectflag = BaseBitmap.create("collectflag");
            collectflag.x = 235;
            collectflag.y = 165;
            // collectflag.scaleX=0.6;
            // collectflag.scaleY=0.6;  
            this._nodeContainer.addChild(collectflag);
            this._goBtn.visible = false;
            App.CommonUtil.playRewardFlyAction(GameData.formatRewardItem(evt.data.data.data.rewards));
            Api.servantVoApi.checkServantChangeRewards(evt.data.data.data.cfrewards, evt.data.data.data.rewards);
        }
    };
    AcNewYearPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcNewYearPopupView.prototype.dispose = function () {
        this._rbg = null;
        this._goBtn = null;
        this.isShowBtnType = 0;
        this._isshow = false;
        this._nodeContainer = null;
        this._rewardNum = 0;
        this._btnType = 0;
        this._name = null;
        this._btnTypeNum = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETNEWYEARREWARD), this.refreshUIInfo, this);
        _super.prototype.dispose.call(this);
    };
    return AcNewYearPopupView;
}(PopupView));
__reflect(AcNewYearPopupView.prototype, "AcNewYearPopupView");
