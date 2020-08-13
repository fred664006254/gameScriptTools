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
        // Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.ENERGY_EMPTY);
        // Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.ENERGY_EMPTY2);
        var wifeIdList = this.param.data[0];
        // let useNum = this.param.data[1];
        // let itemName = this.param.data[2];
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = GameConfig.stageHeigth - 200;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 2;
        this._nodeContainer.addChild(bottomBg);
        var closeBtn = ComponentManager.getButton("commonview_closebtn1", "", this.hide, this);
        closeBtn.x = this.viewBg.width - closeBtn.width - 10;
        closeBtn.y = bottomBg.y - closeBtn.height / 2;
        this._nodeContainer.addChild(closeBtn);
        // let closeBtn = 
        var res = "wifeview_batch_get";
        if (Api.switchVoApi.checkIsInBlueWife()) {
            res = "wifeview_batch_get_blueType";
        }
        var titleFlag = BaseBitmap.create(res);
        titleFlag.x = bottomBg.x + bottomBg.width / 2 - titleFlag.width / 2;
        titleFlag.y = bottomBg.y - titleFlag.height / 2 - 15;
        this._nodeContainer.addChild(titleFlag);
        var tipTxt = ComponentManager.getTextField("", 20);
        tipTxt.text = LanguageManager.getlocal("wifeBatchCallTip");
        tipTxt.x = bottomBg.x + bottomBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = bottomBg.y + 45;
        this._nodeContainer.addChild(tipTxt);
        var scrollH = bottomBg.height - 100;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, scrollH);
        var tmpNode = new BaseDisplayObjectContainer();
        var StartY = 20;
        var StartX = 50;
        var Len = wifeIdList.length;
        for (var index = 0; index < Len; index++) {
            var tmpWifeData = wifeIdList[index];
            // let sbg = BaseBitmap.create("studyatk_servant_bg");
            var sbgy = StartY;
            var sbgx = void 0;
            if (index % 2 == 0) {
                sbgx = StartX;
            }
            else {
                sbgx = GameConfig.stageWidth - StartX - 270;
                StartY += 270;
            }
            // tmpNode.addChild(sbg);
            // let circleImg =  BaseBitmap.create("studyatk_booklv_circle"); 
            // circleImg.anchorOffsetX = circleImg.width/2;
            // circleImg.anchorOffsetY = circleImg.height/2;
            // circleImg.setScale(0.5);
            // circleImg.x = sbg.x + 270/2;
            // circleImg.y = sbg.y + 270/2;
            // let light1 =  BaseBitmap.create("studyatk_booklv_light1"); 
            // light1.anchorOffsetX = light1.width/2;
            // light1.anchorOffsetY = light1.height/2;
            // light1.x = sbg.x + 270/2;
            // light1.y = sbg.y + 270/2;
            // light1.setScale(1.18);
            // tmpNode.addChild(light1);
            // let light2 =  BaseBitmap.create("studyatk_booklv_light2"); 
            // light2.anchorOffsetX = light2.width/2;
            // light2.anchorOffsetY = light2.height/2;
            // light2.x = light1.x;
            // light2.y = light1.y;
            // light2.setScale(light1.scaleX);
            // tmpNode.addChild(light2);
            // tmpNode.addChild(circleImg);
            // egret.Tween.get(circleImg,{loop:true}).to({scaleX:1.25,scaleY:1.25},1000).to({scaleX:2.0,scaleY:2.0,alpha:0},1000).set({scaleX:0.5,scaleY:0.5,alpha:1});
            // egret.Tween.get(light1,{loop:true}).to({rotation:360},15000);
            // egret.Tween.get(light2,{loop:true}).to({rotation:-360},15000);
            var wifeId = tmpWifeData[0];
            var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
            var simg = BaseLoadBitmap.create(wifeCfg.body);
            var mask = egret.Rectangle.create();
            simg.width = 540;
            simg.height = 760;
            mask.setTo(0, 0, 540, 600);
            simg.mask = mask;
            simg.anchorOffsetX = simg.width / 2;
            simg.anchorOffsetY = simg.height / 2;
            simg.setScale(0.4);
            simg.x = sbgx + 270 / 2;
            simg.y = sbgy + 270 / 2 - 10;
            tmpNode.addChild(simg);
            var bookBg = BaseBitmap.create("wifeview_wenzibg2");
            bookBg.scaleY = 1.7;
            bookBg.x = sbgx + 270 / 2 - bookBg.width / 2;
            bookBg.y = sbgy + 270 - 105 - 10;
            tmpNode.addChild(bookBg);
            var attrY = bookBg.y + 12;
            var attrV = tmpWifeData[1];
            var addAttrTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_GREEN);
            addAttrTxt.textColor = 0x20eb37;
            addAttrTxt.text = LanguageManager.getlocal("wifeExp") + attrV;
            addAttrTxt.x = bookBg.x + bookBg.width / 2 - addAttrTxt.width / 2;
            addAttrTxt.y = bookBg.y + bookBg.height / 2 * bookBg.scaleY - addAttrTxt.height / 2;
            tmpNode.addChild(addAttrTxt);
            if (tmpWifeData[2]) {
                addAttrTxt.y = bookBg.y + 12;
                var addAttrTxt2 = ComponentManager.getTextField("", 20);
                addAttrTxt2.text = LanguageManager.getlocal("wifeBatchExp");
                addAttrTxt2.textColor = TextFieldConst.COLOR_QUALITY_ORANGE;
                addAttrTxt2.x = bookBg.x + bookBg.width / 2 - addAttrTxt2.width / 2;
                addAttrTxt2.y = bookBg.y + bookBg.height / 2 * bookBg.scaleY - addAttrTxt2.height / 2 + 10;
                tmpNode.addChild(addAttrTxt2);
            }
        }
        var scrollView = ComponentManager.getScrollView(tmpNode, rect);
        scrollView.y = bottomBg.y + 80;
        scrollView.bounces = false;
        // scrollView.touchEnabled = false;
        this._nodeContainer.addChild(scrollView);
    };
    WifeCallBatchSuccessView.prototype.getTitleStr = function () {
        return null;
    };
    WifeCallBatchSuccessView.prototype.clickHandler = function () {
        _super.prototype.hide.call(this);
    };
    WifeCallBatchSuccessView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "studyatk_servant_bg", "wifeview_batch_get", "wifeview_wenzibg2", "wifeview_batch_get_blueType"
            // "studyatk_booklv_circle","studyatk_booklv_light1","studyatk_booklv_light2","popupview_closebtn1",
        ]);
    };
    WifeCallBatchSuccessView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return WifeCallBatchSuccessView;
}(BaseView));
__reflect(WifeCallBatchSuccessView.prototype, "WifeCallBatchSuccessView");
