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
var Celebration4ScrollItem = (function (_super) {
    __extends(Celebration4ScrollItem, _super);
    function Celebration4ScrollItem() {
        var _this = _super.call(this) || this;
        _this._goBtn3 = null;
        _this._data = [];
        _this._needTxt = null;
        return _this;
    }
    Celebration4ScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM, this.update, this);
        this._data = data;
        var wordsBg = BaseBitmap.create("public_9v_bg04");
        wordsBg.width = 606;
        wordsBg.height = 126;
        this.addChild(wordsBg);
        var spring_arrow = BaseBitmap.create("spring_sign");
        spring_arrow.x = 140;
        spring_arrow.y = 35;
        this.addChild(spring_arrow);
        var contentList = GameData.formatRewardItem(data.needItem);
        var iconBg = BaseBitmap.create("itembg_7");
        this.addChild(iconBg);
        iconBg.x = 20;
        iconBg.y = 10;
        var needIcon = BaseLoadBitmap.create("itemicon" + 1);
        needIcon.scaleX = needIcon.scaleY = 0.78;
        needIcon.x = iconBg.x + 15;
        needIcon.y = iconBg.y + 10;
        this.addChild(needIcon);
        var needIconTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        needIconTxt.text = data.cost;
        needIconTxt.x = iconBg.x + 50;
        needIconTxt.y = iconBg.y + 80;
        needIconTxt.width = 50;
        needIconTxt.textAlign = "right";
        this.addChild(needIconTxt);
        var cornerSp = BaseBitmap.create("shopview_corner");
        // cornerSp.x = 3;
        // cornerSp.y = 1;
        this.addChild(cornerSp);
        var discountTF = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        discountTF.x = 9;
        discountTF.y = 25;
        discountTF.rotation = -40;
        var num = data.discount * 10;
        discountTF.text = LanguageManager.getlocal("discountTitle", [num + ""]);
        this.addChild(discountTF);
        var tagnum = 10 - data.discount * 10;
        if (PlatformManager.checkIsKRSp() || PlatformManager.checkIsJPSp() || PlatformManager.checkIsKRNewSp()) {
            discountTF.x = 5;
            discountTF.y = 30;
            discountTF.text = LanguageManager.getlocal('discountTitle', [tagnum.toString()]);
        }
        if (PlatformManager.checkIsViSp()) {
            discountTF.text = "-" + tagnum * 10 + "%";
        }
        var iconList = GameData.getRewardItemIcons(data.getReward, true);
        if (iconList && iconList.length > 0) {
            //额外赠送ICON
            var startX = 220;
            var startY = 10;
            var l = iconList.length;
            var _icon;
            for (var i = 0; i < l; i++) {
                var icon = iconList[i];
                // icon.scaleX =0.78;
                // icon.scaleY =0.78;
                icon.setPosition(startX + i * (icon.width * icon.scaleX + 12), startY);
                this.addChild(icon);
            }
        }
        //领取
        this._goBtn3 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "exchange", this.collectHandler, this);
        this._goBtn3.x = 420;
        this._goBtn3.y = 45;
        this.addChild(this._goBtn3);
        //当前进度（0／1）
        var needTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        needTxt.text = LanguageManager.getlocal("springExchangedes", [1 + "", data.limit + ""]);
        needTxt.x = this._goBtn3.x - 30;
        needTxt.y = this._goBtn3.y - 25;
        needTxt.width = this._goBtn3.width + 55;
        needTxt.textAlign = "center";
        this._needTxt = needTxt;
        this.addChild(needTxt);
        this.update();
    };
    Celebration4ScrollItem.prototype.update = function () {
        var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (!springCelebrateVo) {
            return;
        }
        if (this._goBtn3) {
            if (Api.playerVoApi.getPlayerGem() >= this._data.cost) {
                App.DisplayUtil.changeToNormal(this._goBtn3);
            }
            else {
                App.DisplayUtil.changeToGray(this._goBtn3);
            }
        }
        if (springCelebrateVo.isExchange() == true) {
            App.DisplayUtil.changeToGray(this._goBtn3);
            this._goBtn3.touchEnabled = false;
        }
        if (this._needTxt) {
            var exchangeNum = springCelebrateVo.getExchange4Num(this._data.key);
            this._needTxt.text = LanguageManager.getlocal("springExchangedes", [exchangeNum + "", this._data.limit + ""]);
            if (exchangeNum == this._data.limit) {
                this._goBtn3.setText("acSpringOutofstock");
                App.DisplayUtil.changeToGray(this._goBtn3);
                this._goBtn3.touchEnabled = false;
                this._goBtn3.y = 45;
                this._needTxt.visible = false;
            }
        }
    };
    Celebration4ScrollItem.prototype.collectHandler = function () {
        var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (springCelebrateVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (springCelebrateVo.isExchange() == true) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_SPRING_ITEM);
            return;
        }
        if (Api.playerVoApi.getPlayerGem() >= this._data.cost) {
            NetManager.request(NetRequestConst.ACTIVITY_GETSPRINGITEMD, { "activeId": AcSpringCelebrateView.AID + "-" + AcSpringCelebrateView.CODE, "shopId": "" + this._data.key });
            return;
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("springAcerNotenoughdes"));
            return;
        }
    };
    Celebration4ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    Celebration4ScrollItem.prototype.dispose = function () {
        this._needTxt = null;
        this._data = null;
        this._goBtn3 = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM, this.update, this);
        _super.prototype.dispose.call(this);
    };
    return Celebration4ScrollItem;
}(ScrollListItem));
__reflect(Celebration4ScrollItem.prototype, "Celebration4ScrollItem");
