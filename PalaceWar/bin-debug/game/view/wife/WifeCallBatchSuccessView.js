/**
 * 红颜批量传唤 弹出UI
 * author yanyuling
 * date 2017/12/29
 * @class WifeCallBatchSuccessView
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
var WifeCallBatchSuccessView = (function (_super) {
    __extends(WifeCallBatchSuccessView, _super);
    function WifeCallBatchSuccessView() {
        return _super.call(this) || this;
    }
    WifeCallBatchSuccessView.prototype.initView = function () {
        //手动调用红颜限时礼包强弹  一键传唤
        Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap2.ENERGY);
        var wifeIdList = this.param.data[0];
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = GameConfig.stageHeigth;
        bottomBg.y = 0;
        this._nodeContainer.addChild(bottomBg);
        var closeBtn = ComponentManager.getButton(ButtonConst.COMMON_CLOSE_1, "", this.hide, this);
        closeBtn.x = this.viewBg.width - closeBtn.width;
        closeBtn.y = bottomBg.y;
        this._nodeContainer.addChild(closeBtn);
        // let closeBtn = 
        var titleFlag = BaseBitmap.create(Api.switchVoApi.checkIsInBlueWife() ? "wifeview_batch_get_blueType" : "wifeview_batch_get");
        titleFlag.x = bottomBg.x + bottomBg.width / 2 - titleFlag.width / 2;
        titleFlag.y = bottomBg.y;
        this._nodeContainer.addChild(titleFlag);
        var tipTxt = ComponentManager.getTextField("", 20);
        tipTxt.text = LanguageManager.getlocal("wifeBatchCallTip");
        tipTxt.x = bottomBg.x + bottomBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = bottomBg.y + 100;
        this._nodeContainer.addChild(tipTxt);
        var scrollH = bottomBg.height - 135;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, scrollH);
        var tmpNode = new BaseDisplayObjectContainer();
        var StartY = 20;
        var StartX = 50;
        var Len = wifeIdList.length;
        for (var index = 0; index < Len; index++) {
            var tmpWifeData = wifeIdList[index];
            var sbg = BaseBitmap.create("studyatk_servant_bg");
            sbg.y = StartY;
            if (index % 2 == 0) {
                sbg.x = StartX;
            }
            else {
                sbg.x = GameConfig.stageWidth - StartX - sbg.width;
                StartY += 270;
            }
            tmpNode.addChild(sbg);
            var circleImg = BaseBitmap.create("studyatk_booklv_circle");
            circleImg.anchorOffsetX = circleImg.width / 2;
            circleImg.anchorOffsetY = circleImg.height / 2;
            circleImg.setScale(0.5);
            circleImg.x = sbg.x + sbg.width / 2;
            circleImg.y = sbg.y + sbg.height / 2;
            var light1 = BaseBitmap.create("studyatk_booklv_light1");
            light1.anchorOffsetX = light1.width / 2;
            light1.anchorOffsetY = light1.height / 2;
            light1.x = sbg.x + sbg.width / 2;
            light1.y = sbg.y + sbg.height / 2;
            light1.setScale(1.18);
            tmpNode.addChild(light1);
            var light2 = BaseBitmap.create("studyatk_booklv_light2");
            light2.anchorOffsetX = light2.width / 2;
            light2.anchorOffsetY = light2.height / 2;
            light2.x = light1.x;
            light2.y = light1.y;
            light2.setScale(light1.scaleX);
            tmpNode.addChild(light2);
            tmpNode.addChild(circleImg);
            egret.Tween.get(circleImg, { loop: true }).to({ scaleX: 1.25, scaleY: 1.25 }, 1000).to({ scaleX: 2.0, scaleY: 2.0, alpha: 0 }, 1000).set({ scaleX: 0.5, scaleY: 0.5, alpha: 1 });
            egret.Tween.get(light1, { loop: true }).to({ rotation: 360 }, 15000);
            egret.Tween.get(light2, { loop: true }).to({ rotation: -360 }, 15000);
            var wifeId = tmpWifeData[0];
            var cfg = Config.WifeCfg.getWifeCfgById(wifeId);
            var simg = BaseLoadBitmap.create(cfg.body);
            var mask = egret.Rectangle.create();
            // simg.width = 540;
            // simg.height = 760;
            simg.width = 640;
            simg.height = 840;
            simg.setScale(0.36);
            mask.setTo(0, 0, 540 + 80, 500);
            simg.mask = mask;
            simg.anchorOffsetX = simg.width / 2;
            simg.anchorOffsetY = simg.height / 2;
            // simg.setScale(0.4);
            simg.x = sbg.x + sbg.width / 2 - 10;
            // simg.y = sbg.y + sbg.height/2-10;
            simg.y = sbg.y + sbg.height / 2 + 8;
            tmpNode.addChild(simg);
            var bookBg = BaseBitmap.create("bookroom_cdbg");
            bookBg.scaleY = 1.7;
            bookBg.x = sbg.x + sbg.width / 2 - bookBg.width / 2;
            bookBg.y = sbg.y + sbg.height - 105;
            tmpNode.addChild(bookBg);
            var attrY = bookBg.y + 12;
            var attrV = tmpWifeData[1];
            var addAttrTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_QUALITY_GREEN);
            addAttrTxt.text = LanguageManager.getlocal("wifeExp") + attrV;
            addAttrTxt.x = bookBg.x + bookBg.width / 2 - addAttrTxt.width / 2;
            addAttrTxt.y = bookBg.y + bookBg.height / 2 * bookBg.scaleY - addAttrTxt.height / 2;
            tmpNode.addChild(addAttrTxt);
            if (tmpWifeData[2]) {
                addAttrTxt.y = bookBg.y + 12;
                var addAttrTxt2 = ComponentManager.getTextField("", 20);
                addAttrTxt2.text = LanguageManager.getlocal("wifeBatchExp");
                addAttrTxt2.x = bookBg.x + bookBg.width / 2 - addAttrTxt2.width / 2;
                addAttrTxt2.y = bookBg.y + bookBg.height / 2 * bookBg.scaleY - addAttrTxt2.height / 2 + 10;
                tmpNode.addChild(addAttrTxt2);
            }
        }
        var scrollView = ComponentManager.getScrollView(tmpNode, rect);
        scrollView.y = bottomBg.y + 135;
        scrollView.bounces = false;
        // scrollView.touchEnabled = false;
        this._nodeContainer.addChild(scrollView);
    };
    WifeCallBatchSuccessView.prototype.clickHandler = function () {
        _super.prototype.hide.call(this);
    };
    WifeCallBatchSuccessView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "studyatk_servant_bg", "wifeview_batch_get", "bookroom_cdbg", "popupview_closebtn1",
            "studyatk_booklv_circle", "studyatk_booklv_light1", "studyatk_booklv_light2", "wifeview_batch_get_blueType"
        ]);
    };
    WifeCallBatchSuccessView.prototype.getTitleStr = function () {
        return '';
    };
    WifeCallBatchSuccessView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return WifeCallBatchSuccessView;
}(BaseView));
__reflect(WifeCallBatchSuccessView.prototype, "WifeCallBatchSuccessView");
//# sourceMappingURL=WifeCallBatchSuccessView.js.map