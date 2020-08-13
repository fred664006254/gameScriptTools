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
 * 春季送礼 item
 */
var Celebration1ScrollItem = (function (_super) {
    __extends(Celebration1ScrollItem, _super);
    function Celebration1ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._needTxt = null;
        _this._goBtn3 = null;
        _this.cu_index = 0;
        return _this;
    }
    Celebration1ScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM, this.update, this);
        this._data = data;
        this.cu_index = Number(data.key);
        var wordsBg = BaseBitmap.create("public_9v_bg04");
        wordsBg.width = 606;
        wordsBg.height = 170;
        this.addChild(wordsBg);
        var bottom2 = BaseBitmap.create("activity_charge_red");
        bottom2.width = 405;
        this.addChild(bottom2);
        //活动期间充值
        var taskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        taskTxt.text = LanguageManager.getlocal("acSpringCelebrationRechargedes", [data.needGem + ""]);
        // taskTxt.width=bottom2.width;
        taskTxt.x = bottom2.x + 15;
        taskTxt.y = bottom2.y + 6;
        this.addChild(taskTxt);
        bottom2.width = taskTxt.textWidth + 35;
        var iconList = GameData.getRewardItemIcons(data.getReward, true);
        if (iconList && iconList.length > 0) {
            //额外赠送ICON
            var startX = 20;
            var startY = 50;
            var l = iconList.length;
            var _icon;
            for (var i = 0; i < l; i++) {
                var icon = iconList[i];
                icon.setPosition(startX + i * (icon.width * icon.scaleX + 12), startY);
                this.addChild(icon);
            }
        }
        //领取
        this._goBtn3 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._goBtn3.x = 420;
        this._goBtn3.y = 75;
        this.addChild(this._goBtn3);
        //当前充值进度（0／1）
        var needTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        needTxt.width = this._goBtn3.width + 50;
        needTxt.x = this._goBtn3.x - 20;
        needTxt.y = this._goBtn3.y - 30;
        needTxt.textAlign = "center";
        this._needTxt = needTxt;
        this.addChild(needTxt);
        this.update();
    };
    Celebration1ScrollItem.prototype.collectHandler = function (evt) {
        var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (springCelebrateVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._data.needGem <= springCelebrateVo.getAinfoV()) {
            var newRechargeNum = this.cu_index;
            NetManager.request(NetRequestConst.ACTIVITY_GETSPRINGITEMA, { "activeId": AcSpringCelebrateView.AID + "-" + AcSpringCelebrateView.CODE, "rechargeId": newRechargeNum });
        }
        else {
            if (springCelebrateVo.isExchange() == true) {
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_SPRING_ITEM);
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
    };
    Celebration1ScrollItem.prototype.update = function () {
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (!tmpVo) {
            return;
        }
        var myRechargeNum = tmpVo.getAinfoV();
        if (tmpVo && tmpVo.getReceiveType(this.cu_index) == false) {
            if (this._goBtn3.visible == true) {
                this._goBtn3.visible = false;
                this._needTxt.visible = false;
                var collectflag = BaseBitmap.create("collectflag");
                collectflag.x = 420;
                collectflag.y = 50;
                this.addChild(collectflag);
            }
        }
        else {
            if (myRechargeNum >= this._data.needGem) {
                this._goBtn3.setText("taskCollect");
                this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr", [myRechargeNum + "", this._data.needGem + ""]);
            }
            else {
                this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2", [myRechargeNum + "", this._data.needGem + ""]);
                this._goBtn3.setText("vipshopbtn");
                if (tmpVo.isExchange() == true) {
                    App.DisplayUtil.changeToGray(this._goBtn3);
                    this._goBtn3.touchEnabled = false;
                }
            }
        }
    };
    Celebration1ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    Celebration1ScrollItem.prototype.dispose = function () {
        this._data = null;
        this._needTxt = null;
        this._goBtn3 = null;
        this.cu_index = 0;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return Celebration1ScrollItem;
}(ScrollListItem));
__reflect(Celebration1ScrollItem.prototype, "Celebration1ScrollItem");
