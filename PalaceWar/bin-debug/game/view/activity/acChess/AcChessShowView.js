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
 * 棋社对弈--衣装展示
 * @author weixiaozhe  2020.5.8
 */
var AcChessShowView = (function (_super) {
    __extends(AcChessShowView, _super);
    function AcChessShowView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AcChessShowView.prototype, "TypeCode", {
        get: function () {
            if (this.code == "2") {
                return "1";
            }
            return this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcChessShowView.prototype.getTitleStr = function () {
        return "";
    };
    AcChessShowView.prototype.getTitleBgName = function () {
        return "";
    };
    AcChessShowView.prototype.getCloseBtnName = function () {
        return "";
    };
    Object.defineProperty(AcChessShowView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcChessView.AID, AcChessView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcChessShowView.prototype, "acVo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcChessView.AID, AcChessView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcChessShowView.prototype.initView = function () {
        var _this = this;
        this._maskBmp.visible = false;
        this.viewBg.visible = false;
        var bgmask = new BaseShape();
        bgmask.graphics.beginFill(0, 0.8);
        bgmask.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
        bgmask.graphics.endFill();
        this.addChild(bgmask);
        bgmask.touchEnabled = true;
        bgmask.addTouchTap(function () {
            _this.hide();
        }, this);
        var bg = BaseBitmap.create("acchess_show_bg");
        this.addChild(bg);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, this, [0, 0]);
        var servantSkinId = this.cfg.show1;
        var wifeSkinId = this.cfg.show2;
        var boneName = undefined;
        //佳人
        var wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinId);
        if (wifeSkinCfg && wifeSkinCfg.bone) {
            boneName = wifeSkinCfg.bone + "_ske";
        }
        var fun1 = function () {
            var caidai = BaseBitmap.create("acchess_showpd2");
            _this.addChild(caidai);
            _this.setLayoutPosition(LayoutConst.leftbottom, caidai, bg, [0, 50]);
            var namebg = BaseBitmap.create("acchess_showmj2");
            _this.addChild(namebg);
            _this.setLayoutPosition(LayoutConst.leftbottom, namebg, bg, [50, 230]);
            var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acchess_show1"), 26, TextFieldConst.COLOR_LIGHT_YELLOW);
            if (PlatformManager.checkIsTextHorizontal()) {
                namebg.rotation = -90;
                _this.setLayoutPosition(LayoutConst.leftbottom, namebg, bg, [0, 160]);
                nameTxt.x = namebg.x + namebg.height / 2 - nameTxt.width / 2;
                nameTxt.y = namebg.y - namebg.width / 2 - nameTxt.height / 2;
            }
            else {
                nameTxt.multiline = true;
                nameTxt.width = nameTxt.size;
                nameTxt.height = namebg.height;
                nameTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
                nameTxt.x = namebg.x + namebg.width / 2 - nameTxt.width / 2;
                nameTxt.y = namebg.y + namebg.height / 2 - nameTxt.height / 2;
            }
            _this.addChild(nameTxt);
            var yellowBg = BaseBitmap.create("acchess_showservtxt");
            _this.addChild(yellowBg);
            yellowBg.x = namebg.x + namebg.width;
            yellowBg.y = namebg.y + 15;
            if (PlatformManager.checkIsTextHorizontal()) {
                yellowBg.x = namebg.x + 15;
                yellowBg.y = namebg.y + namebg.width - 70;
            }
            var dengBtn = ComponentManager.getButton("acchess_showdeng", "", function () {
                ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSSKINPOPUPVIEW, {
                    wifeId: _this.cfg.show2,
                    servantId: _this.cfg.show1,
                    wifeNeedText: "acchessShowWifeTopMsg-" + AcChessView.CODE,
                    servantNeedText: "acchessShowServentTopMsg-" + AcChessView.CODE,
                    wifeNeed: "",
                    servantNeed: "",
                    isShowWife: false
                });
                _this.hide();
            }, _this);
            dengBtn.x = _this.width - dengBtn.width - 17;
            dengBtn.y = namebg.y + namebg.height - 140;
            if (PlatformManager.checkIsTextHorizontal()) {
                dengBtn.y = namebg.y + namebg.height - 70;
            }
            _this.addChild(dengBtn);
            if (_this.acVo.showExchangeDot()) {
                App.CommonUtil.addIconToBDOC(dengBtn);
                var dot = dengBtn.getChildByName("reddot");
                if (dot) {
                    dot.setPosition(60, 65);
                }
            }
            else {
                App.CommonUtil.removeIconFromBDOC(dengBtn);
            }
            var exchangeImg = BaseBitmap.create("acchess_showdengt1");
            _this.addChild(exchangeImg);
            exchangeImg.x = dengBtn.x + 55;
            exchangeImg.y = dengBtn.y + 80;
            var str = _this.cfg.change.needItem;
            var itemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
            var itemNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acchess_exchangepitemname"), 26, TextFieldConst.COLOR_LIGHT_YELLOW);
            _this.addChild(itemNameTxt);
            itemNameTxt.x = GameConfig.stageWidth / 2 - itemNameTxt.width / 2 - 5;
            itemNameTxt.y = bg.y + bg.height - itemNameTxt.height - 125;
            var have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
            var numTxt = ComponentManager.getTextField(LanguageManager.getlocal("acchess_exchangepro", [String(have), str.split("_")[2]]), 26, TextFieldConst.COLOR_WHITE);
            _this.addChild(numTxt);
            numTxt.x = itemNameTxt.x + itemNameTxt.width;
            numTxt.y = itemNameTxt.y;
            var icon = BaseLoadBitmap.create(itemCfg.icon);
            _this.addChild(icon);
            icon.width = icon.height = 45;
            icon.x = itemNameTxt.x - icon.width;
            icon.y = itemNameTxt.y - (icon.height / 2 - itemNameTxt.height / 2) - 5;
            // let pnode = this.param.data.pnode;
            // pnode.visible = true;    
        };
        var servantfunc = function () {
            //门客
            var skinCfg = Config.ServantskinCfg.getServantSkinItemById(servantSkinId);
            if (skinCfg && skinCfg.bone) {
                boneName = skinCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                ResourceManager.loadResources(_this.getBonesResArr(skinCfg.bone), null, function () {
                    var servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                    _this.addChild(servant);
                    servant.setScale(0.7);
                    servant.setPosition(300, bg.y + bg.height - 185);
                    fun1();
                }, null, _this);
            }
            else {
                var servant = BaseLoadBitmap.create(skinCfg.body);
                _this.addChild(servant);
                servant.setScale(0.85);
                servant.setPosition(170, bg.y + bg.height - 540);
                fun1();
            }
        };
        var fun2 = function () {
            var caidai = BaseBitmap.create("acchess_showpd1");
            _this.addChild(caidai);
            _this.setLayoutPosition(LayoutConst.lefttop, caidai, bg, [0, 180]);
            var namebg = BaseBitmap.create("acchess_showmj1");
            _this.addChild(namebg);
            _this.setLayoutPosition(LayoutConst.righttop, namebg, bg, [50, 80]);
            var nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acchess_show2"), 26, TextFieldConst.COLOR_LIGHT_YELLOW);
            if (PlatformManager.checkIsTextHorizontal()) {
                namebg.rotation = -90;
                _this.setLayoutPosition(LayoutConst.righttop, namebg, bg, [namebg.height - 50, 80]);
                nameTxt.x = namebg.x + namebg.height / 2 - nameTxt.width / 2;
                nameTxt.y = namebg.y - namebg.width / 2 - nameTxt.height / 2;
            }
            else {
                nameTxt.multiline = true;
                nameTxt.width = nameTxt.size;
                nameTxt.height = namebg.height;
                nameTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
                nameTxt.x = namebg.x + namebg.width / 2 - nameTxt.width / 2;
                nameTxt.y = namebg.y + namebg.height / 2 - nameTxt.height / 2;
            }
            _this.addChild(nameTxt);
            var yellowBg = BaseBitmap.create("acchess_showwifetxt");
            _this.addChild(yellowBg);
            yellowBg.x = namebg.x - yellowBg.width;
            yellowBg.y = namebg.y + 15;
            if (PlatformManager.checkIsTextHorizontal()) {
                yellowBg.x = namebg.x + 15;
                yellowBg.y = namebg.y + namebg.width - 70;
            }
            var dengBtn = ComponentManager.getButton("acchess_showdeng", "", function () {
                AcChessView.IS_SHOW_RECHARGE = true;
                ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSREWARDPOPVIEW, { aid: AcChessView.AID, code: AcChessView.CODE });
                _this.hide();
            }, _this);
            _this.addChild(dengBtn);
            dengBtn.scaleX = -1;
            dengBtn.x = dengBtn.width - 7;
            dengBtn.y = namebg.y + namebg.height - 170;
            var exchangeImg = BaseBitmap.create("acchess_showdengt2");
            _this.addChild(exchangeImg);
            exchangeImg.x = 3;
            exchangeImg.y = dengBtn.y + 80;
            servantfunc();
        };
        if (wifeSkinCfg && (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            ResourceManager.loadResources(this.getBonesResArr(wifeSkinCfg.bone), null, function () {
                var wife = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
                wife.anchorOffsetX = wife.width / 2;
                wife.anchorOffsetY = wife.height;
                _this.addChild(wife);
                wife.setPosition(0, 0);
                wife.setScale(0.6);
                wife.setPosition(300, bg.y + 350);
                fun2();
            }, null, this);
        }
        else {
            BaseLoadBitmap.create(wifeSkinCfg.body, null, {
                callback: function () {
                    var wife = BaseLoadBitmap.create(wifeSkinCfg.body);
                    _this.addChild(wife);
                    wife.anchorOffsetX = wife.width / 2;
                    wife.anchorOffsetY = wife.height;
                    wife.setScale(0.65);
                    wife.setPosition(150, bg.y - 40);
                    fun2();
                },
                callbackThisObj: null,
                callbackParams: null
            });
        }
    };
    AcChessShowView.prototype.getDefaultResList = function (resArr) {
        var arr = [];
        for (var i = 0; i < resArr.length; i++) {
            var element = resArr[i];
            var defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    };
    AcChessShowView.prototype.getResourceList = function () {
        var codeRes = this.getDefaultResList([]);
        var baseList = [
            "acchess_show_bg",
            "acchess_showmj2",
            "acchess_showmj1",
            "acchess_showservtxt",
            "acchess_showdeng",
            "acchess_showdengt1",
            "acchess_showwifetxt",
            "acchess_showdengt2",
            "acchess_showpd1",
            "acchess_showpd2",
        ];
        var codeList = null;
        if (this.code == "1") {
            codeList = [];
        }
        return _super.prototype.getResourceList.call(this).concat(baseList).concat(codeList).concat(codeRes);
    };
    AcChessShowView.prototype.getBonesResArr = function (name) {
        return [name + "_ske", name + "_tex_json", name + "_tex_png"];
    };
    Object.defineProperty(AcChessShowView.prototype, "acTivityId", {
        get: function () {
            return AcChessView.AID + "-" + AcChessView.CODE;
        },
        enumerable: true,
        configurable: true
    });
    //根据资源名字得到完整资源名字
    AcChessShowView.prototype.getDefaultRes = function (resName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (ResourceManager.hasRes(resName + "-" + this.code)) {
            return resName + "-" + this.code;
        }
        else {
            return resName + "-" + defaultCode;
        }
    };
    AcChessShowView.prototype.getDefaultCn = function (cnName, defaultCode) {
        defaultCode = defaultCode || "1";
        if (LanguageManager.checkHasKey(cnName + "-" + this.code)) {
            return cnName + "-" + this.code;
        }
        else {
            return cnName + "-" + defaultCode;
        }
    };
    AcChessShowView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcChessShowView;
}(AcCommonView));
__reflect(AcChessShowView.prototype, "AcChessShowView");
//# sourceMappingURL=AcChessShowView.js.map