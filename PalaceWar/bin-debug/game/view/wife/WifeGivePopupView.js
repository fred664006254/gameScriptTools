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
 * 赏赐
 * author dky
 * date 2017/11/18
 * @class WifeGivePopupView
 */
var WifeGivePopupView = (function (_super) {
    __extends(WifeGivePopupView, _super);
    function WifeGivePopupView() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        return _this;
    }
    WifeGivePopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_GIVE, this.doGive, this);
        this._handler = this.param.data.handler;
        this._confirmCallback = this.param.data.confirmCallback;
        var id = this.param.data.id;
        this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            //亲密度
            var icon1Bg = BaseBitmap.create("public_9_resbg");
            icon1Bg.x = 40 + 40.5 + GameData.popupviewOffsetX; //140;
            icon1Bg.y = 20;
            this.addChildToContainer(icon1Bg);
            var icon1 = BaseBitmap.create("wifeview_vigoricon");
            icon1.x = icon1Bg.x;
            icon1.y = icon1Bg.y + icon1Bg.height / 2 - icon1.height / 2;
            this.addChildToContainer(icon1);
            this._text1 = ComponentManager.getTextField(this._wifeInfoVo.intimacy.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            this._text1.x = icon1Bg.x + icon1Bg.width / 2 - icon1.width / 2;
            this._text1.y = icon1.y + icon1.height / 2 - this._text1.height / 2;
            this.addChildToContainer(this._text1);
            //魅力
            var icon2Bg = BaseBitmap.create("public_9_resbg");
            icon2Bg.x = 196.5 + 40.5 + GameData.popupviewOffsetX;
            icon2Bg.y = icon1Bg.y;
            this.addChildToContainer(icon2Bg);
            var icon2 = BaseBitmap.create("wifeview_charmicon");
            icon2.x = icon2Bg.x;
            icon2.y = icon2Bg.y + icon2Bg.height / 2 - icon2.height / 2;
            this.addChildToContainer(icon2);
            this._text2 = ComponentManager.getTextField(this._wifeInfoVo.glamour.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            this._text2.x = icon2Bg.x + icon2Bg.width / 2 - icon2.width / 2;
            this._text2.y = icon2.y + icon2.height / 2 - this._text2.height / 2;
            this.addChildToContainer(this._text2);
            //才艺
            var icon3Bg = BaseBitmap.create("public_9_resbg");
            icon3Bg.x = 353 + 40.5 + GameData.popupviewOffsetX;
            icon3Bg.y = icon1Bg.y;
            this.addChildToContainer(icon3Bg);
            var icon3 = BaseBitmap.create("wifeview_artistryicon");
            icon3.x = icon3Bg.x;
            icon3.y = icon3Bg.y + icon3Bg.height / 2 - icon3.height / 2;
            this.addChildToContainer(icon3);
            this._text3 = ComponentManager.getTextField(this._wifeInfoVo.artistry.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            this._text3.x = icon3Bg.x + icon3Bg.width / 2 - icon3.width / 2;
            this._text3.y = icon3.y + icon3.height / 2 - this._text3.height / 2;
            this.addChildToContainer(this._text3);
        }
        else {
            //亲密度
            var icon1Bg = BaseBitmap.create("public_9_resbg");
            icon1Bg.x = 100 + GameData.popupviewOffsetX;
            icon1Bg.y = 15;
            this.addChildToContainer(icon1Bg);
            var icon1 = BaseBitmap.create("wifeview_vigoricon");
            icon1.x = icon1Bg.x;
            icon1.y = icon1Bg.y + icon1Bg.height / 2 - icon1.height / 2;
            this.addChildToContainer(icon1);
            this._text1 = ComponentManager.getTextField(this._wifeInfoVo.intimacy.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            this._text1.x = icon1Bg.x + icon1Bg.width / 2 - icon1.width / 2;
            this._text1.y = icon1.y + icon1.height / 2 - this._text1.height / 2;
            this.addChildToContainer(this._text1);
            //魅力
            var icon2Bg = BaseBitmap.create("public_9_resbg");
            icon2Bg.x = 310 + GameData.popupviewOffsetX;
            icon2Bg.y = 15;
            this.addChildToContainer(icon2Bg);
            var icon2 = BaseBitmap.create("wifeview_charmicon");
            icon2.x = icon2Bg.x;
            icon2.y = icon2Bg.y + icon2Bg.height / 2 - icon2.height / 2;
            this.addChildToContainer(icon2);
            this._text2 = ComponentManager.getTextField(this._wifeInfoVo.glamour.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            this._text2.x = icon2Bg.x + icon2Bg.width / 2 - icon2.width / 2;
            this._text2.y = icon2.y + icon2.height / 2 - this._text2.height / 2;
            this.addChildToContainer(this._text2);
        }
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 535;
        bottomBg.height = 535;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = 75;
        this.addChildToContainer(bottomBg);
        var list1 = new Array();
        // 是否是亲密度最高的红颜
        var isMaxIntimacyWife = Api.wifeVoApi.getIdOfIntimacyMax() === String(id);
        // 第一个有数量的index,如果都没有数量，那就是0
        var firstHasNumIndex = 0;
        if (Api.switchVoApi.checkOpenWifeBattle()) {
            for (var index = 0; index < 6; index++) {
                var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(Config.WifebaseCfg.wifeGift[String(index + 1)].item));
                if (hasNum > 0) {
                    firstHasNumIndex = index;
                    break;
                }
            }
            for (var index = 0; index < 6; index++) {
                list1.push({ index: index, isMaxIntimacyWife: isMaxIntimacyWife, isFirstHasNumIndex: firstHasNumIndex === index });
            }
        }
        else {
            for (var index = 0; index < 4; index++) {
                var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(Config.WifebaseCfg.wifeGift[String(index + 1)].item));
                if (hasNum > 0) {
                    firstHasNumIndex = index;
                    break;
                }
            }
            for (var index = 0; index < 4; index++) {
                list1.push({ index: index, isMaxIntimacyWife: isMaxIntimacyWife, isFirstHasNumIndex: firstHasNumIndex === index });
            }
        }
        var list = Config.WifebaseCfg.wifeGift;
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 525, 535);
        this._scrollList = ComponentManager.getScrollList(WifeGiveScrollItem, list1, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(bottomBg.x + 5, bottomBg.y + 8);
        this._decreeAddTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._decreeAddTxt.setPosition(this.viewBg.x + this.viewBg.width / 2, bottomBg.y + bottomBg.height + 15);
        this.addChildToContainer(this._decreeAddTxt);
        this.refreshDecreeTxt();
    };
    WifeGivePopupView.prototype.refreshDecreeTxt = function () {
        var addInfo = Api.wifeVoApi.getDecreePolicyAddAttrInfo3();
        if (addInfo) {
            if (addInfo.lastTimes > 0) {
                var addV = App.StringUtil.changeIntToText(Math.floor(Api.playerVoApi.getInte() * addInfo.addExtent));
                this._decreeAddTxt.text = LanguageManager.getlocal("decreeAttrAddTxt7", [addInfo.strKey2, "" + addInfo.lastTimes]);
                this._decreeAddTxt.anchorOffsetX = this._decreeAddTxt.width / 2;
            }
            else {
                this._decreeAddTxt.text = "";
            }
        }
    };
    WifeGivePopupView.prototype.doGive = function (event) {
        var data = event.data;
        this._index = data.index;
        var num = data.num;
        this.request(NetRequestConst.REQUEST_WIFE_AWARD, { wifeId: this.param.data.id.toString(), key: data.key, rnum: num });
    };
    //请求回调
    WifeGivePopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            if (data.data.cmd == NetRequestConst.REQUEST_WIFE_AWARD) {
                if (data.data.data && data.data.data.rewards) {
                    var rewards = GameData.formatRewardItem(data.data.data.rewards);
                    if (rewards && rewards.length > 0) {
                        App.CommonUtil.playRewardFlyAction(rewards);
                    }
                }
                this.refreshDecreeTxt();
                var index = this._index;
                var wideItem = this._scrollList.getItemByIndex(index);
                wideItem.refreshData(index);
                var id = this.param.data.id;
                this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
                this._text1.text = this._wifeInfoVo.intimacy.toString();
                this._text2.text = this._wifeInfoVo.glamour.toString();
                if (this._text3) {
                    this._text3.text = this._wifeInfoVo.artistry.toString();
                }
            }
        }
    };
    WifeGivePopupView.prototype.refreshHandler = function () {
    };
    WifeGivePopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    // protected getTabbarTextArr():Array<string>
    // {
    // 	return ["wifeViewTab1Title",
    // 			"wifeViewTab2Title"
    // 	];
    // }
    // protected getRuleInfo():string
    // {
    // 	return "wife_description";
    // }
    WifeGivePopupView.prototype.dispose = function () {
        // 未婚滑动列表
        this._scrollList = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_GIVE, this.doGive, this);
        this._confirmCallback = null;
        this._handler = null;
        this._wifeInfoVo = null;
        this._text1 = null;
        this._text2 = null;
        this._text3 = null;
        this._index = null;
        this._decreeAddTxt = null;
        _super.prototype.dispose.call(this);
    };
    return WifeGivePopupView;
}(PopupView));
__reflect(WifeGivePopupView.prototype, "WifeGivePopupView");
//# sourceMappingURL=WifeGivePopupView.js.map