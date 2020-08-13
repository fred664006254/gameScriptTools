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
var Celebration2ScrollItem = (function (_super) {
    __extends(Celebration2ScrollItem, _super);
    function Celebration2ScrollItem() {
        var _this = _super.call(this) || this;
        _this._goBtn3 = null;
        _this._data = null;
        _this._needTxt = null;
        return _this;
    }
    Celebration2ScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM, this.update, this);
        this._data = data;
        var wordsBg = BaseBitmap.create("public_9v_bg04");
        wordsBg.width = 606;
        wordsBg.height = 126;
        this.addChild(wordsBg);
        var spring_arrow = BaseBitmap.create("spring_arrow");
        spring_arrow.x = 140;
        spring_arrow.y = 35;
        this.addChild(spring_arrow);
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(data.needItem));
        var icon = GameData.getItemIcon(itemCfg, false);
        this.addChild(icon);
        icon.x = 20;
        icon.y = 10;
        var _data = itemCfg.id;
        icon.addTouch(this.openItemDes, this, _data);
        var needIconTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        needIconTxt.text = data.needNum + "";
        needIconTxt.x = icon.x + 70;
        needIconTxt.y = icon.y + 80;
        needIconTxt.width = 30;
        needIconTxt.textAlign = "right";
        this.addChild(needIconTxt);
        var iconList = GameData.getRewardItemIcons(data.getReward, true);
        if (iconList && iconList.length > 0) {
            //额外赠送ICON
            var startX = 220;
            var startY = 10;
            var l = iconList.length;
            var _icon;
            for (var i = 0; i < l; i++) {
                var icon_1 = iconList[i];
                // icon.scaleX =0.78;
                // icon.scaleY =0.78;
                icon_1.setPosition(startX + i * (icon_1.width * icon_1.scaleX + 12), startY);
                this.addChild(icon_1);
            }
        }
        //兑换
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
    Celebration2ScrollItem.prototype.update = function () {
        var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (!springCelebrateVo) {
            return;
        }
        if (this._goBtn3) {
            var currNum = Api.itemVoApi.getItemNumInfoVoById(this._data.needItem);
            if (currNum >= this._data.needNum) {
                App.DisplayUtil.changeToNormal(this._goBtn3);
            }
            else {
                App.DisplayUtil.changeToGray(this._goBtn3);
            }
        }
        if (this._needTxt) {
            var exchangeNum = springCelebrateVo.getExchangeNum(this._data.key);
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
    Celebration2ScrollItem.prototype.openItemDes = function (evt, _data) {
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, _data);
    };
    Celebration2ScrollItem.prototype.collectHandler = function () {
        var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID, AcSpringCelebrateView.CODE);
        if (springCelebrateVo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var currNum = Api.itemVoApi.getItemNumInfoVoById(this._data.needItem);
        if (currNum >= this._data.needNum) {
            NetManager.request(NetRequestConst.ACTIVITY_GETSPRINGITEMB, { "activeId": AcSpringCelebrateView.AID + "-" + AcSpringCelebrateView.CODE, "exchangeId": "" + this._data.key });
            return;
        }
        else {
            var nameStr = LanguageManager.getlocal("itemName_" + this._data.needItem);
            App.CommonUtil.showTip(LanguageManager.getlocal("acSpringceItemDes", [nameStr]));
            return;
        }
    };
    Celebration2ScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    Celebration2ScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM, this.update, this);
        this._goBtn3 = null;
        this._data = null;
        this._needTxt = null;
        _super.prototype.dispose.call(this);
    };
    return Celebration2ScrollItem;
}(ScrollListItem));
__reflect(Celebration2ScrollItem.prototype, "Celebration2ScrollItem");
