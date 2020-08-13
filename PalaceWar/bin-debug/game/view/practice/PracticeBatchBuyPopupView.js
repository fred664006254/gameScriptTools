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
 * @class PracticeBatchBuyPopupView
 */
var PracticeBatchBuyPopupView = (function (_super) {
    __extends(PracticeBatchBuyPopupView, _super);
    function PracticeBatchBuyPopupView() {
        var _this = _super.call(this) || this;
        _this._maxNum = 0;
        _this._useNum = 0;
        _this._costNum = 0;
        return _this;
    }
    PracticeBatchBuyPopupView.prototype.initView = function () {
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
        var temY = 24;
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
        var iconItem = BaseBitmap.create(iconPic);
        iconItem.x = itembg.x + itembg.width / 2 - iconItem.width / 2;
        iconItem.y = itembg.y + itembg.height / 2 - iconItem.height / 2;
        this.addChildToContainer(iconItem);
        //中间改为消耗数量
        var numTF = ComponentManager.getTextField("", 18);
        this._numTF = numTF;
        this._numTF.text = LanguageManager.getlocal("practice_batchbuyTxt2", ["1"]);
        numTF.anchorOffsetX = numTF.width;
        numTF.x = itembg.x + itembg.width - 5;
        numTF.y = temY + 98 - numTF.height;
        this.addChildToContainer(numTF);
        //换行添加当前拥有数目
        var costTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        costTxt.text = LanguageManager.getlocal("practice_batchbuyTxt", ["", ""]);
        costTxt.anchorOffsetX = costTxt.width / 2;
        costTxt.x = temX;
        costTxt.y = itembg.y + itembg.height + 10;
        this.addChildToContainer(costTxt);
        this._costTxt = costTxt;
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", this._maxNum, this.dragCallback, this);
        dragProgressBar.x = temX - dragProgressBar.width / 2;
        dragProgressBar.y = itembg.y + itembg.height + 50;
        this.addChildToContainer(dragProgressBar);
        this._dragProgressBar = dragProgressBar;
        var numBg = BaseBitmap.create("public_9_bg5");
        numBg.width = 90;
        numBg.x = bg.x + bg.width - 10 - numBg.width;
        numBg.y = dragProgressBar.y + dragProgressBar.height / 2 - numBg.height / 2;
        this.addChildToContainer(numBg);
        this._numBg = numBg;
        this._selectedNumTF = ComponentManager.getTextField(this._useNum + "", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
        this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        this._selectedNumTF.y = numBg.y + numBg.height / 2 - this._selectedNumTF.height / 2;
        this.addChildToContainer(this._selectedNumTF);
        this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
        this._maxNumTF.y = numBg.y + numBg.height / 2 - this._maxNumTF.height / 2;
        this.addChildToContainer(this._maxNumTF);
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = numBg.x + (numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        this._cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "cancelBtn", this.hide, this);
        this._cancelBtn.x = temX - this._cancelBtn.width / 2 - 100;
        this._cancelBtn.y = bg.y + bg.height + 15;
        this.addChildToContainer(this._cancelBtn);
        var okBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.clickOkBtnHandler, this);
        okBtn.x = temX - okBtn.width / 2 + 100;
        okBtn.y = bg.y + bg.height + 15;
        this.addChildToContainer(okBtn);
        this.dragCallback(1);
    };
    PracticeBatchBuyPopupView.prototype.dragCallback = function (curNum) {
        var costNum = 0;
        if (this._useNum != curNum) {
            var alnum = Api.practiceVoApi.getbuyNum();
            var getCost = GameConfig.config.practicebaseCfg.getCost;
            var max = getCost[getCost.length - 1];
            if (alnum >= getCost.length - 1) {
                costNum = max * curNum;
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
        this._numTF.text = LanguageManager.getlocal("practice_batchbuyTxt2", ["" + this._useNum]);
        this._numTF.anchorOffsetX = this._numTF.width;
        this._selectedNumTF.text = this._useNum + "";
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        this._costTxt.text = LanguageManager.getlocal("practice_batchbuyTxt", ["" + costNum, "" + this._useNum]);
        this._costTxt.anchorOffsetX = this._costTxt.width / 2;
        this._costNum = costNum;
    };
    PracticeBatchBuyPopupView.prototype.clickOkBtnHandler = function (param) {
        if (Api.playerVoApi.getPlayerGem() < this._costNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("practice_batchBuyNotenoughdes"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_REQUEST_BUY, { num: this._useNum });
        this.hide();
    };
    PracticeBatchBuyPopupView.prototype.getResourceList = function () {
        var list = _super.prototype.getResourceList.call(this).concat([
            "practice_icon", "progress2", "progress2_bg",
        ]);
        return list;
    };
    // protected getConfirmBtnName():string
    // {
    // 	return ButtonConst.BTN_NORMAL_YELLOW;
    // }
    PracticeBatchBuyPopupView.prototype.getTitleStr = function () {
        return "itemUseConstPopupViewTitle";
    };
    PracticeBatchBuyPopupView.prototype.dispose = function () {
        this._cancelBtn = null;
        this._maxNum = 0;
        this._useNum = 0;
        this._numBg = null;
        this._selectedNumTF = null;
        this._maxNumTF = null;
        this._costTxt = null;
        this._numTF = null;
        this._dragProgressBar = null;
        this._costNum = 0;
        _super.prototype.dispose.call(this);
    };
    return PracticeBatchBuyPopupView;
}(PopupView));
__reflect(PracticeBatchBuyPopupView.prototype, "PracticeBatchBuyPopupView");
//# sourceMappingURL=PracticeBatchBuyPopupView.js.map