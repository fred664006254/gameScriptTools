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
 * 仓库容量扩展弹板
 * author yanyuling
 * date 2018/04/20
 * @class PracticeExpandPopupView
 */
var PracticeExpandPopupView = (function (_super) {
    __extends(PracticeExpandPopupView, _super);
    function PracticeExpandPopupView() {
        var _this = _super.call(this) || this;
        _this._useNum = 0;
        _this._costNum = 0;
        return _this;
    }
    PracticeExpandPopupView.prototype.initView = function () {
        var iconPic = "itemicon1";
        var iconBg = "itembg_1";
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
        // itembg.addTouchTap(()=>{
        // 	let rdata={
        // 		dType:"json",
        // 		iconBg:"itembg_1",
        // 		name:LanguageManager.getlocal("practice_name"),
        // 		icon:"practice_icon",
        // 		desc:LanguageManager.getlocal( "itemDesc_6"),
        // 		dropDesc:LanguageManager.getlocal( "itemDropDesc_6"),
        // 	};
        // 	ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,rdata);
        // },this)
        var iconItem = BaseBitmap.create(iconPic);
        iconItem.x = itembg.x + itembg.width / 2 - iconItem.width / 2;
        iconItem.y = itembg.y + itembg.height / 2 - iconItem.height / 2;
        this.addChildToContainer(iconItem);
        //中间改为消耗数量
        var numTF = ComponentManager.getTextField("", 18);
        this._numTF = numTF;
        numTF.anchorOffsetX = numTF.width;
        numTF.x = itembg.x + itembg.width - 5;
        numTF.y = temY + 98 - numTF.height;
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
        buyTip.text = LanguageManager.getlocal("practice_buyTip_1", ["" + Api.practiceVoApi.getStorageLv()]);
        buyTip.x = okBtn.x + okBtn.width / 2 - buyTip.width / 2;
        buyTip.y = okBtn.y - buyTip.height - 10;
        this.addChildToContainer(buyTip);
        this.dragCallback(1);
    };
    PracticeExpandPopupView.prototype.dragCallback = function (curNum) {
        var basecfg = GameConfig.config.practicebaseCfg;
        var slv = Api.practiceVoApi.getStorageLv();
        var costNum = basecfg.storeAddCost[slv];
        var getNum = basecfg.storeAdd * 100;
        this._useNum = curNum;
        // this._numTF.text = LanguageManager.getlocal(""+costNum);
        this._numTF.text = "";
        this._numTF.anchorOffsetX = this._numTF.width;
        this._costTxt.text = LanguageManager.getlocal("practice_expandTipTxt", ["" + costNum, "" + getNum, Api.playerVoApi.getPlayerGemStr()]);
        this._costTxt.anchorOffsetX = this._costTxt.width / 2;
        this._costNum = costNum;
    };
    PracticeExpandPopupView.prototype.clickOkBtnHandler = function (param) {
        if (Api.playerVoApi.getPlayerGem() < this._costNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("practice_batchBuyNotenoughdes"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_PRACTICE_UPSTORAGE, {});
        this.hide();
    };
    PracticeExpandPopupView.prototype.getResourceList = function () {
        var list = _super.prototype.getResourceList.call(this).concat([
            "practice_icon", "progress2", "progress2_bg", "itemicon1",
        ]);
        return list;
    };
    // protected getTitleStr():string
    // {
    // 	return "practiceBuyPopupViewTitle";
    // }
    PracticeExpandPopupView.prototype.dispose = function () {
        this._cancelBtn = null;
        this._useNum = 0;
        this._costTxt = null;
        this._numTF = null;
        this._costNum = 0;
        _super.prototype.dispose.call(this);
    };
    return PracticeExpandPopupView;
}(PopupView));
__reflect(PracticeExpandPopupView.prototype, "PracticeExpandPopupView");
//# sourceMappingURL=PracticeExpandPopupView.js.map