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
 * author:qianjun
 * desc:跨服门客擂台
*/
var AcCrossServerServantView = (function (_super) {
    __extends(AcCrossServerServantView, _super);
    function AcCrossServerServantView() {
        var _this = _super.call(this) || this;
        _this._countDownText = null;
        _this._attrBg = null;
        _this._timeBg = null;
        _this._bottomBg = null;
        _this._yzchi1 = null;
        _this._yzchi2 = null;
        _this._vs1Group = null;
        _this._vs2Group = null;
        _this._warstate1 = null;
        _this._warstate2 = null;
        _this._vs1num1 = null;
        _this._vs1num2 = null;
        _this._vs1num3 = null;
        _this._vs1num4 = null;
        _this._vs1num5 = null;
        _this._vs1num6 = null;
        _this._vs2num1 = null;
        _this._vs2num2 = null;
        _this._vs2num3 = null;
        _this._vs2num4 = null;
        _this._vs2num5 = null;
        _this._vs2num6 = null;
        _this._vs1numbg1 = null;
        _this._vs1numbg2 = null;
        _this._vs1numbg3 = null;
        _this._vs1numbg4 = null;
        _this._vs1numbg5 = null;
        _this._vs1numbg6 = null;
        _this._vs2numbg1 = null;
        _this._vs2numbg2 = null;
        _this._vs2numbg3 = null;
        _this._vs2numbg4 = null;
        _this._vs2numbg5 = null;
        _this._vs2numbg6 = null;
        _this._zyuan1 = null;
        _this._zyuan2 = null;
        _this._type = 1;
        _this._cheerNumTxt1 = null;
        _this._cheerNumTxt2 = null;
        _this._arrow1 = null;
        _this._arrow2 = null;
        _this._descBg1 = null;
        _this._descBg2 = null;
        _this._descTxt1 = null;
        _this._descTxt2 = null;
        _this._servantImg1 = null;
        _this._servantImg2 = null;
        _this.public_dot1 = null;
        _this._vs1bg = null;
        _this._vs2bg = null;
        _this._list1 = null;
        _this._list2 = null;
        _this._vsimg = null;
        _this._loopclip = null;
        _this._skinNamebg = null;
        _this._showTween = false;
        return _this;
    }
    Object.defineProperty(AcCrossServerServantView.prototype, "api", {
        get: function () {
            return Api.crossServerServantVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerServantView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerServantView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "crossservantvsmask1", "crossservantvsmask2", "wifeview_bottombg",
            "servantpkduizhan", "servantpkxunhuan",
        ]);
    };
    AcCrossServerServantView.prototype.getBgName = function () {
        return null;
    };
    AcCrossServerServantView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUST_SERVANTPK_GETINFO, requestData: {
                activeId: view.aid + "-" + view.code
            } };
    };
    AcCrossServerServantView.prototype.receiveData = function (data) {
        var view = this;
        view.api.initData(data.data.data);
        //view.api.setZoneRankInfo(data.data.data);
    };
    AcCrossServerServantView.prototype.initView = function () {
        this.width = GameConfig.stageWidth;
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GO), view.zyuanCallback, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK, view.freshView, view);
        view._type = view.api.getCurpeirod();
        var bottombg = BaseBitmap.create('wifeview_bottombg');
        bottombg.width = GameConfig.stageWidth;
        bottombg.height = 125;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
        view.addChild(bottombg);
        view._bottomBg = bottombg;
        var ruleBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'crossServerServantRule', view.ruleClick, view);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, ruleBtn, bottombg, [40, 0]);
        view.addChild(ruleBtn);
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'crossServerServantReward', view.rewardClick, view);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, rewardBtn, bottombg, [40, 0]);
        view.addChild(rewardBtn);
        var timedescbg = BaseBitmap.create('public_searchdescbg');
        timedescbg.alpha = 0.9;
        timedescbg.height = 30;
        view._timeBg = timedescbg;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, timedescbg, view, [0, view.titleBg.height + 255]);
        var attrbg = BaseBitmap.create('public_9_wordbg');
        attrbg.width = GameConfig.stageWidth;
        attrbg.height = 145;
        view._attrBg = attrbg;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, attrbg, timedescbg, [0, timedescbg.height]);
        for (var i = 1; i < 3; ++i) {
            var vsbg = BaseBitmap.create("crossservantvsbg" + i);
            view.setLayoutPosition(i == 1 ? LayoutConst.lefttop : LayoutConst.righttop, vsbg, view, [0, view.titleBg.height]);
            view.addChild(vsbg);
            view["_vs" + i + "bg"] = vsbg;
        }
        view.addChild(attrbg);
        var vsimg = BaseBitmap.create('crossservantrulevs');
        vsimg.anchorOffsetX = vsimg.width / 2;
        vsimg.anchorOffsetY = vsimg.height / 2;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, vsimg, view, [vsimg.anchorOffsetX, vsimg.anchorOffsetY + 100]);
        view.addChild(vsimg);
        if (PlatformManager.checkIsThSp()) {
            vsimg.y += 20;
        }
        view._vsimg = vsimg;
        var loopClip = ComponentManager.getCustomMovieClip("servantpkxunhuan", 10, 110);
        if (PlatformManager.checkIsThSp()) {
            //通过一帧的动画 去设置位置
            var loopClip1 = BaseBitmap.create("servantpkxunhuan1");
            loopClip.setPosition(view._vsimg.x - loopClip1.width / 2, vsimg.y - loopClip1.height / 2);
        }
        else {
            loopClip.width = 249;
            loopClip.height = 229;
            loopClip.anchorOffsetX = loopClip.width / 2;
            loopClip.anchorOffsetY = loopClip.height / 2;
            loopClip.x = 306;
            loopClip.y = 248;
        }
        view.addChild(loopClip);
        loopClip.alpha = 0;
        view._loopclip = loopClip;
        view.createVS(1);
        view.createVS(2);
        if (PlatformManager.checkIsTextHorizontal()) {
            this._skinNamebg = BaseLoadBitmap.create("accrossserverservantview_topbg");
            this._skinNamebg.width = 640;
            this._skinNamebg.height = 40;
            this._skinNamebg.y = 90;
            this.addChild(this._skinNamebg);
            var skincfg1 = Config.ServantskinCfg.getServantSkinItemById(view.api.getVsServantSkin(1));
            var skinnameTxt1 = ComponentManager.getTextField(skincfg1.getSkinName(), 20);
            skinnameTxt1.setPosition(this._skinNamebg.x + this._skinNamebg.width / 4 - skinnameTxt1.width / 2, this._skinNamebg.y + this._skinNamebg.height / 2 - skinnameTxt1.height / 2);
            this.addChild(skinnameTxt1);
            var skincfg2 = Config.ServantskinCfg.getServantSkinItemById(view.api.getVsServantSkin(2));
            var skinnameTxt2 = ComponentManager.getTextField(skincfg2.getSkinName(), 20);
            skinnameTxt2.setPosition(this._skinNamebg.x + this._skinNamebg.width / 4 * 3 - skinnameTxt2.width / 2, skinnameTxt1.y);
            this.addChild(skinnameTxt2);
        }
        view.createNum(1);
        view.createNum(2);
        view.addChild(timedescbg);
        view.setChildIndex(attrbg, view.getChildIndex(view._descBg2) - 1);
        //支援按钮
        var zyuanImg1 = ComponentManager.getButton("crossservantvszyuan" + 1, '', view.zyuanClick, view, [1]); //BaseBitmap.create(``);
        view.setLayoutPosition(LayoutConst.leftbottom, zyuanImg1, timedescbg, [-118, 10]);
        view.addChild(zyuanImg1);
        view._zyuan1 = zyuanImg1;
        var zyuanImg2 = ComponentManager.getButton("crossservantvszyuan" + 2, '', view.zyuanClick, view, [2]); //BaseBitmap.create(``);
        view.setLayoutPosition(LayoutConst.rightbottom, zyuanImg2, timedescbg, [-118, 10]);
        view.addChild(zyuanImg2);
        view._zyuan2 = zyuanImg2;
        var cdTimeTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._countDownText = cdTimeTxt;
        view.addChild(cdTimeTxt);
        //红点1
        var public_dot1 = BaseBitmap.create("public_dot2");
        this.addChild(public_dot1);
        ;
        public_dot1.x = rewardBtn.x + rewardBtn.width - 20;
        public_dot1.y = rewardBtn.y;
        view.public_dot1 = public_dot1;
        view.setChildIndex(view.closeBtn, 100);
        view.freshView();
        if (view._type < 8) {
            view.showTween();
        }
        else {
            // view.showPengzhuang();
        }
    };
    AcCrossServerServantView.prototype.createNum = function (area) {
        var view = this;
        //队伍总属性
        var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal('crossServerServantTotalAttr'), 20, TextFieldConst.COLOR_WARN_YELLOW);
        view.setLayoutPosition(area == 1 ? LayoutConst.lefttop : LayoutConst.righttop, attrTxt, view._attrBg, [10, 15]);
        view.addChild(attrTxt);
        var font = BaseBitmap.create("crossservantattrwzi");
        view.setLayoutPosition(area == 1 ? LayoutConst.horizontalCenterverticalCenter : LayoutConst.rightverticalCenter, font, view._attrBg, [area == 1 ? -45 : 5, 0]);
        view.addChild(font);
        if (PlatformManager.checkIsTextHorizontal()) {
            if (area == 1) {
                font.x += 20;
            }
        }
        var cheerNumTxt = ComponentManager.getTextField(LanguageManager.getlocal('crossServerServantCheerNum', [view.api.getCheerNum(area).toString()]), 20, TextFieldConst.COLOR_QUALITY_ORANGE);
        view.setLayoutPosition(area == 1 ? LayoutConst.leftbottom : LayoutConst.rightbottom, cheerNumTxt, view._attrBg, [10, 15]);
        view.addChild(cheerNumTxt);
        view["_cheerNumTxt" + area] = cheerNumTxt;
        for (var i = 1; i < 7; ++i) {
            var numbg = BaseBitmap.create("crossservantattrbg" + area);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, numbg, font, [(0 - numbg.width) * i - 5, 0]);
            view.addChild(numbg);
            view["_vs" + area + "numbg" + i] = numbg;
            // if(i == 2){
            //     let dhaoTxt = ComponentManager.getTextField('.', 20, TextFieldConst.COLOR_QUALITY_YELLOW);
            //     view.setLayoutPosition(LayoutConst.leftbottom, dhaoTxt, font, [-17-numbg.width,5]);
            //     view.addChild(dhaoTxt);
            // }
            // if(i > 1){
            //     numbg.x -= 20;
            // }
            var num = ComponentManager.getBitmapText('?', TextFieldConst.FONTNAME_ITEMTIP);
            num.width = 25;
            num.height = 30;
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, num, numbg);
            view.addChild(num);
            view["_vs" + area + "num" + i] = num;
        }
    };
    AcCrossServerServantView.prototype.showTween = function () {
        var view = this;
        view._showTween = true;
        var group1posX = view._vs1Group.x;
        var group2posX = view._vs2Group.x;
        view._vsimg.alpha = 0;
        view._vsimg.setScale(10);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view._vsimg, view, [view._vsimg.anchorOffsetX, view._vsimg.anchorOffsetY + 100]);
        if (PlatformManager.checkIsThSp()) {
            view._vsimg.y += 20;
        }
        view._vs1Group.x = 0 - view._vs1Group.width;
        egret.Tween.get(view._vs1Group).to({ x: group1posX + 50 }, 400).to({ x: group1posX }, 100).wait(30).call(function () {
            egret.Tween.removeTweens(view._vs1Group);
            var upgradeClip = ComponentManager.getCustomMovieClip("servantpkduizhan", 17, 100);
            upgradeClip.width = 444;
            upgradeClip.height = 478;
            upgradeClip.anchorOffsetX = upgradeClip.width / 2;
            upgradeClip.anchorOffsetY = upgradeClip.height / 2;
            upgradeClip.x = 305;
            upgradeClip.y = 245;
            view.addChild(upgradeClip);
            //upgradeClip.setEndCallBack(view.showPengzhuang,view);
            upgradeClip.playWithTime(1);
            upgradeClip.setEndCallBack(function () {
                upgradeClip.dispose();
                upgradeClip = null;
                view._loopclip.alpha = 1;
                view._loopclip.playWithTime(-1);
                view.showPengzhuang();
            }, view);
        }, view);
        view._vs2Group.x = GameConfig.stageWidth;
        egret.Tween.get(view._vs2Group).to({ x: group2posX - 50 }, 400).to({ x: group2posX }, 100).call(function () {
            egret.Tween.removeTweens(view._vs2Group);
            view._vsimg.x = GameConfig.stageWidth / 2;
            egret.Tween.get(view._vsimg).to({ scaleX: 1.2, scaleY: 1.2, alpha: 1 }, 200).call(function () {
                egret.Tween.removeTweens(view._vsimg);
                view._showTween = false;
            }, view);
        }, view);
    };
    AcCrossServerServantView.prototype.showPengzhuang = function () {
        var view = this;
        var _loop_1 = function (i) {
            var descBg = view["_descBg" + i];
            var descTxt = view["_descTxt" + i];
            var arrowBM = view["_arrow" + i];
            var group = view["_vs" + i + "Group"];
            var posx = group.x;
            if (i == 1) {
                egret.Tween.get(descBg, { loop: true }).to({ alpha: 1 }, 1000).wait(4000).to({ alpha: 0 }, 1000).wait(7000);
                egret.Tween.get(arrowBM, { loop: true }).to({ alpha: 1 }, 1000).wait(4000).to({ alpha: 0 }, 1000).wait(7000);
                egret.Tween.get(descTxt, { loop: true }).to({ alpha: 1 }, 1000).wait(4000).to({ alpha: 0 }, 1000).call(function () {
                    descTxt.text = LanguageManager.getlocal("crossServerServantDesc" + App.MathUtil.getRandom(1, 6));
                    descBg.width = 180;
                    descBg.height = descTxt.textHeight + 36;
                    view.setLayoutPosition(LayoutConst.lefttop, descBg, view, [i == 1 ? 200 : 300, view.titleBg.height + 20]);
                    view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
                    view.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [i == 1 ? (arrowBM.anchorOffsetX + 15) : (descBg.width + arrowBM.anchorOffsetX - 55), arrowBM.anchorOffsetY + descBg.height - 3]);
                    if (PlatformManager.checkIsTextHorizontal()) {
                        descBg.width = 200;
                        view.setLayoutPosition(LayoutConst.lefttop, descBg, view, [i == 1 ? 240 : 240, view.titleBg.height + 40]);
                        view.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [i == 1 ? (arrowBM.anchorOffsetX + 15) : (descBg.width + arrowBM.anchorOffsetX - 55), arrowBM.anchorOffsetY + descBg.height - 3]);
                        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
                    }
                }, view).wait(7000);
            }
            else {
                egret.Tween.get(descBg, { loop: true }).wait(6500).to({ alpha: 1 }, 1000).wait(4000).to({ alpha: 0 }, 1000).wait(500);
                egret.Tween.get(arrowBM, { loop: true }).wait(6500).to({ alpha: 1 }, 1000).wait(4000).to({ alpha: 0 }, 1000).wait(500);
                egret.Tween.get(descTxt, { loop: true }).wait(6500).to({ alpha: 1 }, 1000).wait(4000).to({ alpha: 0 }, 1000).call(function () {
                    descTxt.text = LanguageManager.getlocal("crossServerServantDesc" + App.MathUtil.getRandom(1, 6));
                    descBg.width = 180;
                    descBg.height = descTxt.textHeight + 36;
                    view.setLayoutPosition(LayoutConst.lefttop, descBg, view, [i == 1 ? 150 : 300, view.titleBg.height + 20]);
                    view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
                    view.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [i == 1 ? (arrowBM.anchorOffsetX + 15) : (descBg.width + arrowBM.anchorOffsetX - 55), arrowBM.anchorOffsetY + descBg.height - 3]);
                    if (PlatformManager.checkIsTextHorizontal()) {
                        descBg.width = 200;
                        view.setLayoutPosition(LayoutConst.lefttop, descBg, view, [i == 1 ? 240 : 240, view.titleBg.height + 40]);
                        view.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [i == 1 ? (arrowBM.anchorOffsetX + 15) : (descBg.width + arrowBM.anchorOffsetX - 55), arrowBM.anchorOffsetY + descBg.height - 3]);
                        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
                    }
                }, view).wait(500);
            }
            var timeparm = 12000;
            // egret.Tween.get(group,{loop : true}).wait(6000).to({x : posx + (i == 1 ? 150 : -150)}, 200).to({x : posx}, 300);
        };
        for (var i = 1; i < 3; ++i) {
            _loop_1(i);
        }
    };
    AcCrossServerServantView.prototype.zyuanClick = function (area) {
        var view = this;
        if (view._showTween) {
            return;
        }
        //出恢复弹窗
        var servantid = view.api.getVsServant(area);
        var servantVo = Api.servantVoApi.getServantObj(servantid);
        if (servantVo) {
            var mesObj = {
                confirmCallback: function () {
                    if (Number(view.api.vo.sid)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip4"));
                        return;
                    }
                    NetManager.request(NetRequestConst.REQUST_SERVANTPK_GO, {
                        activeId: view.vo.aidAndCode,
                        sid: servantVo.servantId,
                    });
                },
                handler: view,
                icon: servantVo.halfImgPath,
                iconBg: servantVo.qualityBoxImgPath,
                msg: LanguageManager.getlocal("crossServerServantTip3", [servantVo.servantName, App.StringUtil.changeIntToText(servantVo.total)]),
                id: servantid,
                linespacing: 6,
                height: 250
            };
            // itemName_109
            ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSENDCONSTPOPUPVIEW, mesObj);
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("crossServerServantTip9"));
        }
    };
    AcCrossServerServantView.prototype.zyuanCallback = function (evt) {
        var view = this;
        view._zyuan1.visible = view._zyuan2.visible = false;
        view.api.initData(evt.data.data.data);
        view.freshView();
    };
    AcCrossServerServantView.prototype.ruleClick = function () {
        var view = this;
        if (view._showTween) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTDETAILVIEW);
    };
    AcCrossServerServantView.prototype.rewardClick = function () {
        var view = this;
        if (view._showTween) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.CROSSSERVERSERVANTREWARDVIEW, { "aid": this.aid, "code": this.code });
    };
    AcCrossServerServantView.prototype.createVS = function (area) {
        var view = this;
        var group = new BaseDisplayObjectContainer();
        group.width = 364;
        group.height = 330;
        view.setLayoutPosition(area == 1 ? LayoutConst.lefttop : LayoutConst.righttop, group, view["_vs" + area + "bg"]);
        view.addChild(group);
        view["_vs" + area + "Group"] = group;
        //门客图像
        var man = null;
        if (App.CommonUtil.check_dragon()) {
            var cfg = Config.ServantskinCfg.getServantSkinItemById(view.api.getVsServantSkin(area));
            man = App.DragonBonesUtil.getLoadDragonBones(cfg.bone, 0);
            man.scaleX = -0.6;
            man.scaleY = 0.6;
            man.width = 705 * man.scaleX;
            man.height = 588 * man.scaleY;
            // man.anchorOffsetX = man.width / 2;
            // man.anchorOffsetY = - man.height / 2;
            group.setLayoutPosition(LayoutConst.lefttop, man, group, [area == 1 ? 180 : 200, area == 1 ? 275 : 280], true);
        }
        else {
            man = BaseLoadBitmap.create("servant_full_" + view.api.getVsServant(area));
            man.width = 405;
            man.height = 466;
            man.mask = new egret.Rectangle(0, 0, 405, 466);
            man.setScale(0.6);
            group.setLayoutPosition(area == 1 ? LayoutConst.lefttop : LayoutConst.righttop, man, group, [0, 20], true);
        }
        group.addChild(man);
        //名字背景
        var namebg = BaseBitmap.create('crossservantnamebg');
        view.setLayoutPosition(area == 1 ? LayoutConst.lefttop : LayoutConst.righttop, namebg, group, [60, 50], true);
        group.addChild(namebg);
        //名字
        var nameTxt = ComponentManager.getTextField(Config.ServantCfg.getServantItemById(view.api.getVsServant(area)).name, 20);
        if (!PlatformManager.checkIsTextHorizontal()) {
            nameTxt.width = 20;
        }
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
        group.addChild(nameTxt);
        //皮肤名字背景
        var skincfg = Config.ServantskinCfg.getServantSkinItemById(view.api.getVsServantSkin(area));
        var skinbg = BaseBitmap.create('crossservantskinnamebg');
        view.setLayoutPosition(area == 1 ? LayoutConst.lefttop : LayoutConst.righttop, skinbg, group, [10, 0], true);
        group.addChild(skinbg);
        //皮肤名字
        var skinnameTxt = ComponentManager.getTextField(skincfg.getSkinName(), 20);
        skinnameTxt.width = 20;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinnameTxt, skinbg);
        group.addChild(skinnameTxt);
        if (PlatformManager.checkIsTextHorizontal()) {
            skinbg.setVisible(false);
            skinnameTxt.setVisible(false);
            namebg.width = nameTxt.width + 20;
            if (area == 1) {
                namebg.setPosition(0, 40);
                nameTxt.setPosition(namebg.x + 5, namebg.y + namebg.height / 2 - nameTxt.height / 2);
            }
            else {
                namebg.anchorOffsetX = namebg.width / 2;
                namebg.anchorOffsetY = namebg.height / 2;
                namebg.rotation = 180;
                namebg.setPosition(group.width - namebg.width / 2, 40 + namebg.height / 2);
                nameTxt.setPosition(namebg.x + namebg.width / 2 - nameTxt.width - 5, namebg.y - nameTxt.height / 2);
            }
        }
        //支持
        var zchiImg = BaseBitmap.create('crossservantyzchi');
        group.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, zchiImg, group, [0, 0], true);
        group.addChild(zchiImg);
        zchiImg.visible = false;
        view["_yzchi" + area] = zchiImg;
        //胜负
        var stateImg = BaseBitmap.create('crossservantwin');
        group.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, stateImg, group, [0, 0], true);
        group.addChild(stateImg);
        stateImg.visible = false;
        view["_warstate" + area] = stateImg;
        var posx = group.x;
        if (1) {
            //语言文本
            var descBg = BaseBitmap.create('public_9_bg42');
            view.addChild(descBg);
            descBg.width = 180;
            descBg.alpha = 0;
            view["_descBg" + area] = descBg;
            var arrowBM = BaseBitmap.create("public_9_bg13_tail");
            arrowBM.anchorOffsetX = arrowBM.width / 2;
            arrowBM.anchorOffsetY = arrowBM.height / 2;
            arrowBM.scaleX = area == 1 ? 1 : -1;
            view["_arrow" + area] = arrowBM;
            arrowBM.alpha = 0;
            view.addChild(arrowBM);
            var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("crossServerServantDesc" + App.MathUtil.getRandom(1, 6)), 24, TextFieldConst.COLOR_BLACK);
            descTxt.width = 120;
            descTxt.lineSpacing = 5;
            view.addChild(descTxt);
            descTxt.alpha = 0;
            view["_descTxt" + area] = descTxt;
            descBg.height = descTxt.textHeight + 36;
            view.setLayoutPosition(LayoutConst.lefttop, descBg, view, [area == 1 ? 200 : 300, view.titleBg.height + 20]);
            view.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [area == 1 ? (arrowBM.anchorOffsetX + 15) : (descBg.width + arrowBM.anchorOffsetX - 55), arrowBM.anchorOffsetY + descBg.height - 3]);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
            if (PlatformManager.checkIsTextHorizontal()) {
                descBg.width = 200;
                view.setLayoutPosition(LayoutConst.lefttop, descBg, view, [area == 1 ? 240 : 240, view.titleBg.height + 40]);
                view.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [area == 1 ? (arrowBM.anchorOffsetX + 15) : (descBg.width + arrowBM.anchorOffsetX - 55), arrowBM.anchorOffsetY + descBg.height - 3]);
                view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descBg);
            }
        }
        //egret.Tween.get(man,{loop : true}).wait(area == 1 ? 5000 : 0).to({alpha : area - 1}, 1000).wait(4000).to({alpha : 2 - area}, 1000);
        view["_servantImg" + area] = man;
        var maskbg = BaseBitmap.create("crossservantvsmask" + area);
        maskbg.height = view._bottomBg.y - view._attrBg.y - view._attrBg.height;
        view.setLayoutPosition(area == 1 ? LayoutConst.lefttop : LayoutConst.righttop, maskbg, view._attrBg, [0, view._attrBg.height]);
        view.addChild(maskbg);
        var tmpRect = new egret.Rectangle(0, 0, maskbg.width - 10, maskbg.height - 30);
        var arr = view.api.getCheerPlayer(area);
        var scrollList = ComponentManager.getScrollList(AcCrossServerServantPlayerItem, arr, tmpRect);
        scrollList.setEmptyTip(LanguageManager.getlocal("crossServerServantNoCheer"));
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, maskbg);
        view["_list" + area] = scrollList;
        view.addChild(scrollList);
    };
    AcCrossServerServantView.prototype.tick = function () {
        var view = this;
        var newType = view.api.getCurpeirod();
        if (newType > view._type) {
            view.freshView();
            if (newType == 8) {
                view.request(NetRequestConst.REQUST_SERVANTPK_GETINFO, {
                    activeId: view.aid + "-" + view.code
                });
            }
        }
        view._type = newType;
        view._countDownText.text = view._type == 8 ? LanguageManager.getlocal("crossserverCDEnd") : LanguageManager.getlocal("crossserverCDTime", [App.DateUtil.getFormatBySecond(view.api.getCountTime())]);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._countDownText, view._timeBg);
    };
    AcCrossServerServantView.prototype.freshView = function () {
        var view = this;
        view._type = view.api.getCurpeirod();
        for (var i = 1; i < 3; ++i) {
            var iswin = view.api.getWinServant() == i;
            view["_warstate" + i].visible = view["_yzchi" + i].visible = view["_zyuan" + i].visible = false;
            if (view._type == 8) {
                egret.Tween.get(view["_vs" + i + "Group"]).setPaused(true);
                egret.Tween.removeTweens(view["_vs" + i + "Group"]);
                view.setLayoutPosition(i == 1 ? LayoutConst.lefttop : LayoutConst.righttop, view["_vs" + i + "Group"], view["_vs" + i + "bg"]);
                view["_warstate" + i].visible = true;
                view["_warstate" + i].setRes(iswin ? 'crossservantwin' : 'crossservantlose');
                if (!iswin) {
                    App.DisplayUtil.changeToGray(view["_vs" + i + "Group"]);
                    App.DisplayUtil.changeToGray(view["_vs" + i + "bg"]);
                }
            }
            else {
                view["_yzchi" + i].visible = view.api.getCheerForArea() == i;
                view["_zyuan" + i].visible = view.api.getCheerServantId() == 0;
            }
            view["_cheerNumTxt" + i].text = LanguageManager.getlocal('crossServerServantCheerNum', [view.api.getCheerNum(i).toString()]);
            view.setLayoutPosition(i == 1 ? LayoutConst.leftbottom : LayoutConst.rightbottom, view["_cheerNumTxt" + i], view._attrBg, [10, 15]);
            var arr = view.api.getCheerPlayer(i);
            view["_list" + i].refreshData(arr);
            if (view.api.getCurpeirod() == 8) {
                if (view["_descBg" + i]) {
                    egret.Tween.get(view["_descBg" + i]).setPaused(true);
                    egret.Tween.get(view["_descTxt" + i]).setPaused(true);
                    egret.Tween.get(view["_arrow" + i]).setPaused(true);
                    egret.Tween.removeTweens(view["_descBg" + i]);
                    egret.Tween.removeTweens(view["_descTxt" + i]);
                    egret.Tween.removeTweens(view["_arrow" + i]);
                    view["_descBg" + i].dispose();
                    view["_descBg" + i] = null;
                    view["_descTxt" + i].dispose();
                    view["_descTxt" + i] = null;
                    view["_arrow" + i].dispose();
                    view["_arrow" + i] = null;
                }
            }
            for (var j = 1; j < 7; ++j) {
                if ((j + 1) <= view._type && view._type > 1) {
                    view["_vs" + i + "num" + j].text = view.api.getTotalNum(i, j);
                    view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view["_vs" + i + "num" + j], view["_vs" + i + "numbg" + j], [5, 0]);
                }
            }
        }
        this.public_dot1.visible = view.vo.isShowRedDot;
    };
    AcCrossServerServantView.prototype.getRuleInfo = function () {
        return "crossserverRuleInfo";
    };
    AcCrossServerServantView.prototype.hide = function () {
        var view = this;
        if (view._showTween) {
            return;
        }
        _super.prototype.hide.call(this);
    };
    AcCrossServerServantView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_SERVANTPK_GO), view.zyuanCallback, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SERVANTPK, view.freshView, view);
        view._countDownText = null;
        view._attrBg = null;
        view._bottomBg = null;
        view._timeBg = null;
        for (var i = 1; i < 3; ++i) {
            for (var j = 1; j < 7; ++j) {
                view["vs" + i + "num" + j] = null;
                view["_vs" + i + "numbg" + j] = null;
            }
            view["zyuan" + i] = null;
            view["_cheerNumTxt" + i] = null;
            view["_yzchi" + i] = null;
            if (view["_descBg" + i]) {
                egret.Tween.get(view["_descBg" + i]).setPaused(true);
                egret.Tween.get(view["_descTxt" + i]).setPaused(true);
                egret.Tween.get(view["_arrow" + i]).setPaused(true);
                egret.Tween.removeTweens(view["_descBg" + i]);
                egret.Tween.removeTweens(view["_descTxt" + i]);
                egret.Tween.removeTweens(view["_arrow" + i]);
                view["_descBg" + i].dispose();
                view["_descBg" + i] = null;
                view["_descTxt" + i].dispose();
                view["_descTxt" + i] = null;
                view["_arrow" + i].dispose();
                view["_arrow" + i] = null;
            }
            if (App.CommonUtil.check_dragon()) {
                view["_servantImg" + i].dispose();
            }
            else {
                BaseLoadBitmap.release(view["_servantImg" + i]);
            }
            view["_servantImg" + i] = null;
            view["_list" + i] = null;
            view["_warstate" + i] = null;
            view["_vs" + i + "bg"] = null;
            view["_vs" + i + "Group"].dispose();
            view["_vs" + i + "Group"] = null;
        }
        view._type = 1;
        view.public_dot1 = null;
        view._vsimg = null;
        view._loopclip.stop();
        view._loopclip.dispose();
        view._loopclip = null;
        this._skinNamebg = null;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.useCallback, this);
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerServantView;
}(AcCommonView));
__reflect(AcCrossServerServantView.prototype, "AcCrossServerServantView");
//# sourceMappingURL=AcCrossServerServantView.js.map