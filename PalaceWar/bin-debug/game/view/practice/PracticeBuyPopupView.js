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
 * 阅历购买弹板
 * author yanyuling
 * date 2018/04/20
 * @class PracticeBuyPopupView
 */
var PracticeBuyPopupView = (function (_super) {
    __extends(PracticeBuyPopupView, _super);
    function PracticeBuyPopupView() {
        var _this = _super.call(this) || this;
        _this._maxNum = 0;
        _this._useNum = 0;
        _this._costNum = 0;
        return _this;
    }
    PracticeBuyPopupView.prototype.initView = function () {
        var iconPic = "practice_icon";
        var iconBg = "itembg_1";
        this._maxNum = 100;
        this._useNum = 0;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 240;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var temX = this.viewBg.x + this.viewBg.width / 2;
        var temY = 40;
        var itembg = BaseBitmap.create(iconBg);
        itembg.x = temX - itembg.width / 2;
        itembg.y = temY;
        this.addChildToContainer(itembg);
        itembg.touchEnabled = true;
        itembg.addTouchTap(function () {
            var rdata = {
                dType: "json",
                iconBg: "itembg_1",
                name: LanguageManager.getlocal("practice_name"),
                icon: "practice_icon",
                desc: LanguageManager.getlocal("itemDesc_6"),
                dropDesc: LanguageManager.getlocal("itemDropDesc_6"),
            };
            ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW, rdata);
        }, this);
        itembg.name = "itembg";
        var iconItem = BaseBitmap.create(iconPic);
        iconItem.x = itembg.x + itembg.width / 2 - iconItem.width / 2;
        iconItem.y = itembg.y + itembg.height / 2 - iconItem.height / 2;
        this.addChildToContainer(iconItem);
        var numbg = BaseBitmap.create("public_9_itemnumbg");
        numbg.name = "numbg";
        this.addChildToContainer(numbg);
        //中间改为消耗数量
        var numTF = ComponentManager.getTextField("", 18);
        this._numTF = numTF;
        this._numTF.text = LanguageManager.getlocal("practice_batchbuyTxt2", ["1"]);
        numTF.anchorOffsetX = numTF.width;
        numTF.x = itembg.x + itembg.width - 5;
        numTF.y = temY + 105 - numTF.height;
        this.addChildToContainer(numTF);
        //换行添加当前拥有数目
        var costTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        costTxt.multiline = true;
        costTxt.lineSpacing = 5;
        costTxt.textAlign = egret.HorizontalAlign.CENTER;
        costTxt.text = LanguageManager.getlocal("practice_batchbuyTxt", ["", "", ""]);
        costTxt.anchorOffsetX = costTxt.width / 2;
        costTxt.x = temX;
        costTxt.y = itembg.y + itembg.height + 20;
        this.addChildToContainer(costTxt);
        this._costTxt = costTxt;
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
        this._cancelBtn.x = temX - this._cancelBtn.width / 2 - 110;
        this._cancelBtn.y = bg.y + bg.height + 45;
        this.addChildToContainer(this._cancelBtn);
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.clickOkBtnHandler, this);
        okBtn.x = temX - okBtn.width / 2 + 110;
        okBtn.y = this._cancelBtn.y;
        this.addChildToContainer(okBtn);
        var buyTip = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_RED);
        buyTip.text = LanguageManager.getlocal("practice_buyTip", ["" + Api.practiceVoApi.getbuyNum()]);
        buyTip.x = okBtn.x + okBtn.width / 2 - buyTip.width / 2;
        buyTip.y = okBtn.y - buyTip.height - 10;
        this.addChildToContainer(buyTip);
        this.dragCallback(1);
    };
    PracticeBuyPopupView.prototype.dragCallback = function (curNum) {
        var basecfg = GameConfig.config.practicebaseCfg;
        var costNum = 0;
        var sp = Api.practiceVoApi.getRealSpd();
        var getNum = sp * basecfg.getTime / basecfg.time;
        if (this._useNum != curNum) {
            var alnum = Api.practiceVoApi.getbuyNum();
            var getCost = basecfg.getCost;
            var max = getCost[getCost.length - 1];
            if (alnum >= getCost.length - 1) {
                costNum = max * curNum;
                // getNum  +=
            }
            else {
                var topIdx = alnum + curNum;
                var maxIdx = topIdx < getCost.length ? topIdx : getCost.length;
                for (var index = alnum; index < maxIdx; index++) {
                    costNum = costNum + getCost[index];
                }
                if (maxIdx >= getCost.length) {
                    costNum += max * (maxIdx - getCost.length + 1);
                }
            }
        }
        this._useNum = curNum;
        this._numTF.text = LanguageManager.getlocal("practice_batchbuyTxt2", ["" + getNum]);
        this._numTF.anchorOffsetX = this._numTF.width;
        this._costTxt.text = LanguageManager.getlocal("practice_batchbuyTxt", ["" + costNum, "" + getNum, "" + Api.playerVoApi.getPlayerGem()]);
        this._costTxt.anchorOffsetX = this._costTxt.width / 2;
        this._costNum = costNum;
        var itembg = this.container.getChildByName("itembg");
        var numbg = this.container.getChildByName("numbg");
        if (getNum > 99) {
            numbg.width = this._numTF.width + 18;
        }
        numbg.setPosition(itembg.x + itembg.width - numbg.width - 4, itembg.y + itembg.height - numbg.height - 4);
    };
    PracticeBuyPopupView.prototype.clickOkBtnHandler = function (param) {
        if (Api.playerVoApi.getPlayerGem() < this._costNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("practice_batchBuyNotenoughdes"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_REQUEST_BUY, { num: this._useNum });
        this.hide();
    };
    PracticeBuyPopupView.prototype.getResourceList = function () {
        var list = _super.prototype.getResourceList.call(this).concat([
            "practice_icon", "progress2", "progress2_bg",
        ]);
        return list;
    };
    // protected getConfirmBtnName():string
    // {
    // 	return ButtonConst.BTN_NORMAL_YELLOW;
    // }
    PracticeBuyPopupView.prototype.getTitleStr = function () {
        return "practiceBuyPopupViewTitle";
    };
    PracticeBuyPopupView.prototype.dispose = function () {
        this._cancelBtn = null;
        this._maxNum = 0;
        this._useNum = 0;
        this._costTxt = null;
        this._numTF = null;
        this._costNum = 0;
        _super.prototype.dispose.call(this);
    };
    return PracticeBuyPopupView;
}(PopupView));
__reflect(PracticeBuyPopupView.prototype, "PracticeBuyPopupView");
//# sourceMappingURL=PracticeBuyPopupView.js.map