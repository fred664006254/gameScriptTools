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
 * 转世界面
 */
var WifeChangeSexView = (function (_super) {
    __extends(WifeChangeSexView, _super);
    function WifeChangeSexView() {
        var _this = _super.call(this) || this;
        _this._sexType = 0; //0女 1男
        _this._text = null;
        _this._maletext = null;
        _this._npc = null;
        _this._malebtn = null;
        _this._femalebtn = null;
        _this._changebtn = null;
        _this._nameBg = null;
        _this._nameLine = null;
        _this._droWifeIcon = null;
        _this._changebtnName = null;
        return _this;
    }
    WifeChangeSexView.prototype.getTitleBgName = function () {
        return "wifechangesextitle";
    };
    WifeChangeSexView.prototype.isShowTitleBgShadow = function () {
        return false;
    };
    WifeChangeSexView.prototype.getCloseBtnName = function () {
        return "wifechangesex_closebtn";
    };
    WifeChangeSexView.prototype.getBgName = function () {
        var wid = this.param.data.wid;
        var wifeinfovo = Api.wifeVoApi.getWifeInfoVoById(wid);
        var sex = wifeinfovo.sexflag;
        return "wifechangesexbg" + (sex ? '_male' : '');
    };
    WifeChangeSexView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifechangesex", 'wifechangesexbg', 'wifechangesexbg_male', 'createuser_flower', "acredlotuswarrior_btn-1",
        ]);
    };
    WifeChangeSexView.prototype.getTitleStr = function () {
        return null;
    };
    WifeChangeSexView.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_WIFESEXSETTING, this.setWifeCallback, this);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var wid = view.param.data.wid;
        var wifeinfovo = Api.wifeVoApi.getWifeInfoVoById(wid);
        var sex = wifeinfovo.sexflag;
        //0女1男
        view._sexType = sex;
        view.titleBg.y = 15;
        view.closeBtn.y = 15;
        var malebtn = ComponentManager.getButton("malechangebtn", "", function () {
            if (view._sexType == 0) {
                view._sexType = 1;
                view.freshView();
            }
        }, view, null, 3);
        malebtn.x = GameConfig.stageWidth - malebtn.width - 30;
        malebtn.y = GameConfig.stageHeigth - 730 + 50;
        view.addChild(malebtn);
        view._malebtn = malebtn;
        var femalebtn = ComponentManager.getButton("femalechangebtn", "", function () {
            if (view._sexType > 0) {
                view._sexType = 0;
                view.freshView();
            }
        }, view, null, 3);
        femalebtn.x = GameConfig.stageWidth - femalebtn.width - 30;
        femalebtn.y = GameConfig.stageHeigth - 555 + 50;
        view.addChild(femalebtn);
        view._femalebtn = femalebtn;
        var npc = BaseLoadBitmap.create(wifeinfovo.body);
        npc.width = 640;
        npc.height = 840;
        npc.setScale(0.75);
        npc.setPosition(-20, malebtn.y - 20);
        view.addChild(npc);
        view._npc = npc;
        if (App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(wifeinfovo.bone + "_ske")) {
            view._npc.visible = false;
            this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeinfovo.bone);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this.viewBg, [220, 90]); //, [100, 200]
            this.addChildAt(this._droWifeIcon, this.getChildIndex(view._npc));
        }
        else {
            view._npc.visible = true;
        }
        var bottombg = BaseBitmap.create("wifechangesexbottom");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
        view.addChild(bottombg);
        var changebtn = ComponentManager.getButton("acredlotuswarrior_btn-1", "", function () {
            //发消息
            NetManager.request(NetRequestConst.REQUEST_WIFE_WIFESEXSETTING, {
                wifeId: wid,
                sexflag: _this._sexType
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, changebtn, bottombg, [0, 15]);
        view.addChild(changebtn);
        view._changebtn = changebtn;
        this._changebtnName = ComponentManager.getTextField(LanguageManager.getlocal('blueWife'), 32, TextFieldConst.COLOR_BROWN);
        this.addChild(this._changebtnName);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._changebtnName, this._changebtn);
        var line = BaseBitmap.create("wifechangesex_nameline" + (this._sexType ? '_male' : ''));
        line.width = 360;
        view.addChild(line);
        line.setPosition(GameConfig.stageWidth - line.width - 20, malebtn.y / 2 + 55);
        view._nameLine = line;
        var text = ComponentManager.getTextField(wifeinfovo.desc, 22, TextFieldConst.COLOR_QUALITY_WHITE);
        text.width = 360;
        text.lineSpacing = 5;
        view.addChild(text);
        view._text = text;
        text.setPosition(line.x, line.y + 10);
        var nameBg = BaseBitmap.create("wifechangesex_namebg" + (view._sexType ? '_male' : ''));
        view.addChild(nameBg);
        nameBg.setPosition(line.x, line.y - nameBg.height);
        view._nameBg = nameBg;
        var maletext = ComponentManager.getTextField(LanguageManager.getlocal("changewife" + (view._sexType == 0 ? "female" : "male"), [wifeinfovo.name]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._maletext = maletext;
        view.addChild(maletext);
        if (PlatformManager.checkIsTextHorizontal()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, maletext, nameBg, [25, 10]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, maletext, nameBg, [-20, 3]);
        }
        //樱花
        var flower = BaseBitmap.create("wifechangesex_flower");
        flower.x = -20;
        flower.y = -30;
        this.addChild(flower);
        this.swapChildren(flower, this.titleBg);
        //樱花动效
        var randomT = 2000 + Math.floor(Math.random() * 800);
        var randomR = 2.5 + Math.random();
        egret.Tween.get(flower, { loop: true })
            .to({ rotation: 1.5 * randomR }, randomT, egret.Ease.quadOut)
            .to({ rotation: -0.5 * randomR }, randomT * 2, egret.Ease.quadInOut)
            .to({ rotation: 0 }, randomT, egret.Ease.quadIn);
        var randomTT = 5000 + Math.floor(Math.random() * 800);
        var x = flower.x;
        var y = flower.y;
        egret.Tween.get(flower, { loop: true })
            .to({ x: x + 10, y: y + 5 }, randomTT, egret.Ease.quadOut)
            .to({ x: x - 10, y: y - 5 }, randomTT * 2, egret.Ease.quadInOut)
            .to({ x: x, y: y }, randomTT, egret.Ease.quadIn);
        //花瓣骨骼
        if (App.DeviceUtil.CheckWebglRenderMode() && App.CommonUtil.check_dragon()) {
            var flowerDragon = App.DragonBonesUtil.getLoadDragonBones("createuser_huaban");
            flowerDragon.x = 100;
            flowerDragon.y = 100;
            flowerDragon.setIdle("huaban");
            this.addChild(flowerDragon);
        }
        view.freshView(1);
    };
    WifeChangeSexView.prototype.setWifeCallback = function (evt) {
        var view = this;
        if (evt.data.data) {
            ViewController.getInstance().openView(ViewConst.COMMON.WIFECHANGESEXSUCCESSVIEW, {
                wid: view.param.data.wid,
                type: 10,
                sex: view._sexType
            });
            view.hide();
        }
    };
    WifeChangeSexView.prototype.freshView = function (isInit) {
        var view = this;
        var isfemale = view._sexType == 0;
        var wid = view.param.data.wid;
        var wifeinfovo = Api.wifeVoApi.getWifeInfoVoById(wid);
        var bg = view.viewBg;
        bg.setRes("wifechangesexbg" + (view._sexType ? '_male' : ''));
        view._npc.setload(isfemale ? ("wife_full_" + wid) : ("wife_full_" + wid + "_male"));
        var nowBone = isfemale ? ("wife_full_" + wid) : ("wife_full_" + wid + "_male");
        if (!isInit) {
            if (App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(nowBone + '_ske')) {
                view._npc.visible = false;
                if (this._droWifeIcon) {
                    this.removeChild(this._droWifeIcon);
                    this._droWifeIcon.dispose();
                    this._droWifeIcon = null;
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(nowBone);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this.viewBg, [220, 90]);
                    this.addChildAt(this._droWifeIcon, this.getChildIndex(view._npc));
                }
                else {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(nowBone);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this.viewBg, [220, 90]); //, [100, 200]
                    this.addChildAt(this._droWifeIcon, this.getChildIndex(view._npc));
                }
            }
            else {
                view._npc.visible = true;
                if (this._droWifeIcon) {
                    this._droWifeIcon.visible = false;
                }
            }
        }
        view._femalebtn.setBtnBitMap(isfemale ? "femalechangebtn" : "femalechangebtn_down");
        view._malebtn.setBtnBitMap(isfemale ? "malechangebtn_down" : "malechangebtn");
        view._text.text = LanguageManager.getlocal(isfemale ? ("wifeDesc_" + wid) : ("wifeDesc_" + wid + "_male"));
        view._text.setColor((isfemale ? 0x954815 : TextFieldConst.COLOR_QUALITY_WHITE));
        view._maletext.text = LanguageManager.getlocal("changewife" + (isfemale ? "female" : "male"), [LanguageManager.getlocal(isfemale ? "wifeName_" + wid : "wifeName_" + wid + "_male")]);
        view._changebtn.setEnable(wifeinfovo.sexflag != view._sexType);
        if (wifeinfovo.sexflag == view._sexType) {
            App.DisplayUtil.changeToGray(view._changebtnName);
        }
        else {
            App.DisplayUtil.changeToNormal(view._changebtnName);
        }
        view._nameBg.setRes("wifechangesex_namebg" + (view._sexType ? '_male' : ''));
        view._nameLine.setRes("wifechangesex_nameline" + (view._sexType ? '_male' : ''));
        // view._text.x = 30;
        // view._text.y = view._maletext.y + view._maletext.height + 10;
    };
    WifeChangeSexView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_WIFESEXSETTING, this.setWifeCallback, this);
        view._sexType = 0; //0女 1男
        view._text = null;
        view._maletext = null;
        view._npc = null;
        view._malebtn = null;
        view._femalebtn = null;
        view._changebtn = null;
        view._nameBg = null;
        view._nameLine = null;
        view._droWifeIcon = null;
        view._changebtnName = null;
        _super.prototype.dispose.call(this);
    };
    return WifeChangeSexView;
}(CommonView));
__reflect(WifeChangeSexView.prototype, "WifeChangeSexView");
