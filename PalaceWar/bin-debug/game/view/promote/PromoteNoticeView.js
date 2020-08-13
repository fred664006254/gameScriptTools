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
var PromoteNoticeView = (function (_super) {
    __extends(PromoteNoticeView, _super);
    function PromoteNoticeView() {
        var _this = _super.call(this) || this;
        _this._szhi_g = null;
        _this._nameTxt = null;
        _this._wenziTxt = null;
        _this.canTouch = false;
        return _this;
    }
    Object.defineProperty(PromoteNoticeView.prototype, "api", {
        get: function () {
            return Api.promoteVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PromoteNoticeView.prototype, "cfg", {
        get: function () {
            return Config.PromoteCfg;
        },
        enumerable: true,
        configurable: true
    });
    PromoteNoticeView.prototype.getBgName = function () {
        return '';
    };
    PromoteNoticeView.prototype.initView = function () {
        var view = this;
        var szhi_g = new BaseDisplayObjectContainer();
        szhi_g.width = 640;
        szhi_g.height = 355;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, szhi_g, view);
        view.addChild(szhi_g);
        view._szhi_g = szhi_g;
        // let rect = ComponentManager.getr
        var light1 = BaseBitmap.create("emperor_win_light");
        light1.anchorOffsetX = light1.width / 2;
        light1.anchorOffsetY = light1.height / 2;
        light1.setScale(0.82);
        view.setLayoutPosition(LayoutConst.lefttop, light1, szhi_g, [szhi_g.width / 2, 70], true);
        light1.alpha = 0;
        szhi_g.addChild(light1);
        egret.Tween.get(light1, { loop: true }).to({ rotation: 360 }, 6000);
        var light2 = BaseBitmap.create("promotelight");
        light2.anchorOffsetX = light2.width / 2;
        light2.anchorOffsetY = light2.height / 2;
        light2.setScale(0.73);
        view.setLayoutPosition(LayoutConst.lefttop, light2, szhi_g, [szhi_g.width / 2, 70], true);
        light2.alpha = 0;
        szhi_g.addChild(light2);
        egret.Tween.get(light2, { loop: true }).to({ rotation: -360 }, 6000);
        var szhibg = BaseBitmap.create('promoteszhibg');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, szhibg, szhi_g, [0, 0], true);
        szhi_g.addChild(szhibg);
        szhibg.mask = egret.Rectangle.create().setTo(320, 0, 0, GameConfig.stageHeigth);
        var promotefnt = BaseBitmap.create('promotefnt');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, promotefnt, szhibg, [0, -20]);
        promotefnt.alpha = 0;
        szhi_g.addChild(promotefnt);
        var nameTxt = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), 24, 0xfedb38);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, szhibg, [0, 105]);
        szhi_g.addChild(nameTxt);
        nameTxt.alpha = 0;
        view._nameTxt = nameTxt;
        var descTxt1 = ComponentManager.getTextField('', 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt1.width = 530;
        descTxt1.lineSpacing = 5;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt1, nameTxt, [0, nameTxt.textHeight + 5]);
        szhi_g.addChild(descTxt1);
        var descTxt2 = ComponentManager.getTextField('', 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt2.width = 530;
        descTxt2.lineSpacing = 5;
        szhi_g.addChild(descTxt2);
        var descTxt3 = ComponentManager.getTextField('', 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt3.width = 530;
        descTxt3.lineSpacing = 5;
        szhi_g.addChild(descTxt3);
        // let goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'PromoteGoPromote', ()=>{
        //     if(view.canTouch){
        //         ViewController.getInstance().openView(ViewConst.COMMON.PROMOTEVIEW);
        //         view.hide();
        //     }
        // }, view);
        // view.setLayoutPosition(LayoutConst.leftbottom, goBtn, szhibg, [80,55]);
        // goBtn.alpha = 0;
        // szhi_g.addChild(goBtn);
        var lzhiBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, 'PromoteConfirm', function () {
            if (view.canTouch) {
                ViewController.getInstance().openView(ViewConst.COMMON.PROMOTEVIEW);
                view.hide();
            }
        }, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, lzhiBtn, szhibg, [0, 55]);
        lzhiBtn.alpha = 0;
        szhi_g.addChild(lzhiBtn);
        var juanzhou1 = BaseBitmap.create('promotejzhou');
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, juanzhou1, szhi_g, [-17, 0]);
        juanzhou1.alpha = 0;
        view.addChild(juanzhou1);
        var juanzhou2 = BaseBitmap.create('promotejzhou');
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, juanzhou2, szhi_g, [17, 0]);
        juanzhou2.alpha = 0;
        view.addChild(juanzhou2);
        view._maskBmp.alpha = 0;
        egret.Tween.get(juanzhou1).to({ 'alpha': 1 }, 500).wait(500).to({ x: 0 }, 1000).call(function () {
            juanzhou1.visible = false;
            egret.Tween.removeTweens(juanzhou1);
            view.removeChild(juanzhou1);
            juanzhou1 = null;
        }, view);
        egret.Tween.get(juanzhou2).to({ 'alpha': 1 }, 500).wait(500).to({ x: GameConfig.stageWidth - 33 }, 1000).call(function () {
            juanzhou2.visible = false;
            egret.Tween.removeTweens(juanzhou2);
            view.removeChild(juanzhou2);
            juanzhou2 = null;
        }, view);
        egret.Tween.get(view._maskBmp).to({ 'alpha': 1 }, 1000).call(function () {
            //播放卷轴动画
            egret.Tween.get(szhibg.mask, { onChange: function () {
                    if (szhibg.mask) {
                        szhibg.mask.x = (640 - szhibg.mask.width) / 2;
                    }
                }, onChangeObj: view }).to({ width: 640 }, 1000).call(function () {
                //文字出现
                szhibg.mask = null;
                light1.alpha = light2.alpha = promotefnt.alpha = nameTxt.alpha = 1;
                var position = LanguageManager.getlocal("promoteType" + view.api.getSelfPosition());
                if (PlatformManager.checkIsThSp()) {
                    descTxt1.text = LanguageManager.getlocal('PromoteNotice3', [position]);
                    view.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt1, nameTxt, [20, nameTxt.textHeight + 5]);
                    lzhiBtn.alpha = 1;
                    view.canTouch = true;
                }
                else {
                    //打印效果
                    var tempstr1_1 = LanguageManager.getlocal('PromoteNotice1');
                    var tempstr2_1 = LanguageManager.getlocal('PromoteNotice2');
                    var totalNum_1 = tempstr1_1.length + position.length + tempstr2_1.length;
                    var now_1 = 0;
                    egret.Tween.get(descTxt1, { onChange: function () {
                            ++now_1;
                            if (now_1 <= tempstr1_1.length) {
                                descTxt1.text = tempstr1_1.substring(0, now_1);
                            }
                            else if (now_1 > tempstr1_1.length && now_1 <= tempstr1_1.length + position.length) {
                                descTxt2.textColor = 0x21eb39;
                                descTxt2.text = position.substring(0, now_1);
                                if (PlatformManager.checkIsEnSp()) {
                                    view.setLayoutPosition(LayoutConst.lefttop, descTxt2, descTxt1, [184, 29]);
                                }
                                else {
                                    view.setLayoutPosition(LayoutConst.lefttop, descTxt2, descTxt1, [144, 29]);
                                }
                            }
                            else if (now_1 > tempstr1_1.length + position.length && now_1 <= totalNum_1) {
                                descTxt3.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
                                descTxt3.text = tempstr2_1.substring(0, now_1);
                                view.setLayoutPosition(LayoutConst.lefttop, descTxt3, descTxt2, [descTxt2.textWidth, 0]);
                            }
                        }, onChangeObj: view }).to({ 'alpha': 1 }, totalNum_1 * 15).wait(1000).call(function () {
                        lzhiBtn.alpha = 1;
                        view.canTouch = true;
                    }, view);
                }
            }, view);
        });
    };
    PromoteNoticeView.prototype.getResourceList = function () {
        return ["promotefnt", "promotejzhou", "promoteszhibg", "promotelight", "emperor_win_light"];
    };
    // protected isTouchMaskClose():boolean{
    //     return true;
    // }
    PromoteNoticeView.prototype.getTitleStr = function () {
        return null;
    };
    PromoteNoticeView.prototype.getCloseBtnName = function () {
        return null;
    };
    PromoteNoticeView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PromoteNoticeView;
}(PopupView));
__reflect(PromoteNoticeView.prototype, "PromoteNoticeView");
//# sourceMappingURL=PromoteNoticeView.js.map