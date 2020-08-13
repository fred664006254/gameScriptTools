/**
 * 特殊道具使用成功，门客弹出UI
 * author yanyuling
 * date 2017/12/20
 * @class ItemUseSuccessView
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
var ItemUseSuccessView = (function (_super) {
    __extends(ItemUseSuccessView, _super);
    function ItemUseSuccessView() {
        return _super.call(this) || this;
    }
    ItemUseSuccessView.prototype.initView = function () {
        var servantIdList = this.param.data[0];
        var useNum = this.param.data[1];
        var itemVo = this.param.data[2];
        var itemName = itemVo.name;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = GameConfig.stageHeigth - 200;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 2;
        this._nodeContainer.addChild(bottomBg);
        var closeBtn = ComponentManager.getButton("commonview_closebtn1", "", this.hide, this);
        closeBtn.x = this.viewBg.width - closeBtn.width;
        closeBtn.y = bottomBg.y - closeBtn.height / 2 - 25;
        this._nodeContainer.addChild(closeBtn);
        // let closeBtn = 
        var titleFlag = BaseBitmap.create("itemuse_succeed");
        titleFlag.x = bottomBg.x + bottomBg.width / 2 - titleFlag.width / 2;
        titleFlag.y = bottomBg.y - titleFlag.height / 2 - 15;
        this._nodeContainer.addChild(titleFlag);
        var tipTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        tipTxt.text = LanguageManager.getlocal("itemUse_speciatTip", [useNum, itemName]);
        tipTxt.x = bottomBg.x + bottomBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = bottomBg.y + 45;
        this._nodeContainer.addChild(tipTxt);
        var scrollH = bottomBg.height - 100;
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, scrollH);
        var tmpNode = new BaseDisplayObjectContainer();
        var StartY = 20;
        var StartX = -10;
        var serObj = {};
        var Len = servantIdList.length;
        for (var idx = 0; idx < Len; idx++) {
            serObj[String(idx)] = servantIdList[idx];
        }
        var isWife = false;
        if (itemVo.id == 1361 || itemVo.id == 1362 || itemVo.id == 1363) {
            isWife = true;
        }
        var vList = Object.keys(serObj);
        var index = 0;
        while (vList.length > 0) {
            var tmpK = vList[App.MathUtil.getRandom(0, vList.length)];
            var sbg = BaseBitmap.create("studyatk_servant_bg");
            sbg.y = StartY;
            sbg.width = 368;
            sbg.height = 368;
            if (index % 2 == 0) {
                sbg.x = StartX;
            }
            else {
                sbg.x = GameConfig.stageWidth - StartX - sbg.width;
                if (isWife) {
                    // StartY += 270;
                    StartY += 340;
                }
                else {
                    // StartY += 230;
                    StartY += 340;
                }
            }
            tmpNode.addChild(sbg);
            var circleImg = BaseBitmap.create("studyatk_booklv_circle");
            circleImg.anchorOffsetX = circleImg.width / 2;
            circleImg.anchorOffsetY = circleImg.height / 2;
            // circleImg.setScale(0.5);
            circleImg.x = sbg.x + sbg.width / 2;
            circleImg.y = sbg.y + sbg.height / 2;
            var light1 = BaseBitmap.create("studyatk_booklv_light1");
            light1.anchorOffsetX = light1.width / 2;
            light1.anchorOffsetY = light1.height / 2;
            light1.x = sbg.x + sbg.width / 2;
            light1.y = sbg.y + sbg.height / 2;
            // light1.setScale(1.18);
            light1.setScale(2.18);
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
            var serInfo = null;
            var servantId = "";
            for (var key in serObj[tmpK]) {
                servantId = key;
                serInfo = serObj[tmpK][key];
            }
            var resPath = "servant_full_" + servantId;
            if (isWife) {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(servantId);
                resPath = wifeCfg.body;
                ;
            }
            var simg = BaseLoadBitmap.create(resPath);
            var mask = egret.Rectangle.create();
            if (isWife) {
                var wifeCfg = Config.WifeCfg.getWifeCfgById(servantId);
                resPath = wifeCfg.body;
                ;
                // simg.width = 540;
                // simg.height = 760;
                // mask.setTo(0,0,540,500);
                simg.width = 405;
                simg.height = 531; //840 * (405 / 640);
                mask.setTo(0, 0, 405, 400);
            }
            else {
                simg.width = 640;
                simg.height = 482;
                mask.setTo(0, 0, 640, 400);
            }
            simg.mask = mask;
            simg.anchorOffsetX = simg.width / 2;
            simg.anchorOffsetY = simg.height / 2;
            simg.setScale(0.7);
            simg.x = sbg.x + sbg.width / 2;
            simg.y = sbg.y + sbg.height / 2 - 10;
            tmpNode.addChild(simg);
            var bookBg = BaseBitmap.create("wifeview_wenzibg2");
            // bookBg.scaleY = 1.7;
            bookBg.height = 60;
            bookBg.x = sbg.x + sbg.width / 2 - bookBg.width / 2;
            bookBg.y = sbg.y + sbg.height - 95;
            if (isWife) {
                bookBg.y -= 10;
            }
            tmpNode.addChild(bookBg);
            var attrY = bookBg.y + 12;
            for (var proIdx = 0; proIdx < serInfo.length; proIdx++) {
                var rewInfo = GameData.formatRewardItem(serInfo[proIdx])[0];
                var attrV = servantIdList[servantId];
                var addAttrTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WARN_GREEN2);
                addAttrTxt.text = rewInfo.message;
                addAttrTxt.x = bookBg.x + bookBg.width / 2 - addAttrTxt.width / 2;
                if (serInfo.length == 1) {
                    addAttrTxt.y = bookBg.y + bookBg.height / 2 * bookBg.scaleY - addAttrTxt.height / 2;
                }
                else {
                    addAttrTxt.y = attrY - 5;
                    attrY = attrY + 25;
                }
                tmpNode.addChild(addAttrTxt);
            }
            index++;
            delete serObj[tmpK];
            vList = Object.keys(serObj);
        }
        var scrollView = ComponentManager.getScrollView(tmpNode, rect);
        scrollView.y = bottomBg.y + 80;
        scrollView.bounces = false;
        scrollView.horizontalScrollPolicy = "off";
        // scrollView.touchEnabled = false;
        this._nodeContainer.addChild(scrollView);
    };
    ItemUseSuccessView.prototype.clickHandler = function () {
        _super.prototype.hide.call(this);
    };
    ItemUseSuccessView.prototype.getTitleStr = function () {
        return null;
    };
    ItemUseSuccessView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "studyatk_servant_bg", "popupview_closebtn1",
            "studyatk_booklv_circle", "studyatk_booklv_light1", "studyatk_booklv_light2",
            "wifeview_wenzibg2"
        ]);
    };
    ItemUseSuccessView.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return ItemUseSuccessView;
}(BaseView));
__reflect(ItemUseSuccessView.prototype, "ItemUseSuccessView");
