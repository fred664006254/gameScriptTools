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
 * author qianjun
 */
var WifeChangeSexView = (function (_super) {
    __extends(WifeChangeSexView, _super);
    function WifeChangeSexView() {
        var _this = _super.call(this) || this;
        _this._sexType = 0; //0女 1男
        _this._femalebtn = null;
        _this._changebtn = null;
        _this._text = null;
        _this._maletext = null;
        _this._npc = null;
        _this._malebtn = null;
        _this._wordbg = null;
        _this._line = null;
        _this._dragon = null;
        _this._nameBg = null;
        _this._stop = false;
        _this._droWifeIcon = null;
        return _this;
    }
    WifeChangeSexView.prototype.getTitleBgName = function () {
        return "wifechangesextitle";
    };
    WifeChangeSexView.prototype.getCloseBtnName = function () {
        return ButtonConst.COMMON_CLOSE_1;
    };
    WifeChangeSexView.prototype.getBgName = function () {
        var wid = this.param.data.wid;
        var wifeinfovo = Api.wifeVoApi.getWifeInfoVoById(wid);
        var sex = wifeinfovo.sexflag;
        var style = sex == 0 ? "female" : "male";
        return style + "changebg";
    };
    WifeChangeSexView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            this.viewBg.width = GameConfig.stageWidth;
            this.viewBg.height = GameConfig.stageHeigth;
            if (bgName == "commonview_bg1" && (this.viewBg instanceof BaseBitmap)) {
                this.viewBg.fillMode = egret.BitmapFillMode.REPEAT;
            }
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
        }
    };
    WifeChangeSexView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifechangesex"
        ]);
    };
    WifeChangeSexView.prototype.getTitleStr = function () {
        return null;
    };
    // 是否隐藏标题背景阴影
    WifeChangeSexView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    WifeChangeSexView.prototype.initView = function () {
        var _this = this;
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING, this.setWifeCallback, this);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.titleBg.y = 10;
        var wid = view.param.data.wid;
        var wifeinfovo = Api.wifeVoApi.getWifeInfoVoById(wid);
        var sex = wifeinfovo.sexflag;
        view._sexType = sex;
        var style = view._sexType == 0 ? "female" : "male";
        var zshi = BaseBitmap.create("wifechangezshi");
        view.addChildAt(zshi, view.getChildIndex(view.titleBg) - 1);
        //0女1男
        var bottombg = BaseBitmap.create("wifechangesexbottom");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottombg, view);
        var nameBg = BaseBitmap.create(style + "changenamebg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, nameBg, view);
        nameBg.x = 300;
        nameBg.y = 130;
        view.addChild(nameBg);
        view._nameBg = nameBg;
        var maletext = ComponentManager.getTextField(LanguageManager.getlocal("changewife" + style, [wifeinfovo.name]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view._maletext = maletext;
        view.addChild(maletext);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, maletext, nameBg, [10, 0]);
        var line = BaseBitmap.create(style + "changeline");
        view.addChild(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, line, nameBg, [0, nameBg.height]);
        view._line = line;
        var text = ComponentManager.getTextField(wifeinfovo.desc, 20, sex == 0 ? 0x954815 : 0xafc3f3);
        text.width = 320;
        text.lineSpacing = 5;
        view.addChild(text);
        view._text = text;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, text, line, [0, line.height + 10]);
        var npc = BaseLoadBitmap.create(wifeinfovo.body);
        npc.width = 640;
        npc.height = 840;
        npc.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, npc, bottombg, [0, 100]);
        view.addChild(npc);
        view._npc = npc;
        if (App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(wifeinfovo.bone + "_ske")) {
            view._npc.visible = false;
            this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeinfovo.bone);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this.viewBg, [260, 100]); //, [100, 200]
            this._droWifeIcon.setScale(1.1);
            this.addChildAt(this._droWifeIcon, this.getChildIndex(view._npc));
        }
        else {
            view._npc.visible = true;
        }
        view.addChild(bottombg);
        var malebtn = ComponentManager.getButton("malechangebtn", "", function () {
            if (view._sexType == 0) {
                view._sexType = 1;
                view.freshView();
            }
        }, view, null, 3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, malebtn, view, [30, line.y + line.height + 95]);
        view.addChild(malebtn);
        view._malebtn = malebtn;
        var femalebtn = ComponentManager.getButton("femalechangebtn", "", function () {
            if (view._sexType > 0) {
                view._sexType = 0;
                view.freshView();
            }
        }, view, null, 3);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, femalebtn, malebtn, [0, malebtn.height + 35]);
        view.addChild(femalebtn);
        view._femalebtn = femalebtn;
        var changebtn = ComponentManager.getButton("wiifechangebtnres", "blueWife", function () {
            //发消息
            // ViewController.getInstance().openView(ViewConst.COMMON.WIFECHANGESEXSUCCESSVIEW,{
            //     id : view.param.data.wid,
            //     type : 10,
            //     sex : view._sexType
            // });
            if (view._stop) {
                return;
            }
            view._stop = true;
            NetManager.request(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING, {
                wifeId: wid,
                sexflag: _this._sexType
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, changebtn, bottombg, [0, 5]);
        view.addChild(changebtn);
        view._changebtn = changebtn;
        var boneName = "qianshijinsheng_tex_png";
        if (!Api.switchVoApi.checkCloseBone() && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones("qianshijinsheng", -1, 'stop');
            droWifeIcon.setScale(1);
            droWifeIcon.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, this.dragonMc, this);
            droWifeIcon.stop();
            droWifeIcon.x = 320;
            droWifeIcon.y = 500;
            droWifeIcon.scaleY = 1.5;
            view._dragon = droWifeIcon;
            droWifeIcon.alpha = 0;
            view.addChild(droWifeIcon);
        }
        //樱花
        var flower = zshi;
        flower.x = -20;
        flower.y = -20;
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
        // let jqingbtn = ComponentManager.getButton(`wifechangesexjqingbtn`, ``, ()=>{
        // }, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, jqingbtn, bottombg, [40,60]);
        // view.addChild(jqingbtn);
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
        if (!evt.data.ret) {
            return;
        }
        if (evt.data.data) {
            if (view._dragon) {
                view._dragon.alpha = 1;
                view._dragon.playDragonMovie("idle", 1);
            }
            else {
                var wid = view.param.data.wid;
                var wifecfg = Config.WifeCfg.getWifeCfgById(wid);
                ViewController.getInstance().openView(ViewConst.BASE.WIFECHANGESEXAVGVIEW, {
                    callback: function () {
                        ViewController.getInstance().openView(ViewConst.COMMON.WIFECHANGESEXSUCCESSVIEW, {
                            id: view.param.data.wid,
                            type: 10,
                            sex: view._sexType
                        });
                    },
                    target: view,
                    storyId: view._sexType == 0 ? wifecfg.wifeStory : wifecfg.blueStory
                });
                //view.hide();
            }
        }
    };
    WifeChangeSexView.prototype.dragonMc = function () {
        var view = this;
        //播放剧情
        var wid = view.param.data.wid;
        var wifecfg = Config.WifeCfg.getWifeCfgById(wid);
        ViewController.getInstance().openView(ViewConst.BASE.WIFECHANGESEXAVGVIEW, {
            callback: function () {
                view._stop = false;
                ViewController.getInstance().openView(ViewConst.COMMON.WIFECHANGESEXSUCCESSVIEW, {
                    id: view.param.data.wid,
                    type: 10,
                    sex: view._sexType
                });
            },
            target: view,
            storyId: view._sexType == 0 ? wifecfg.wifeStory : wifecfg.blueStory
        });
        view._dragon.alpha = 0;
        view.freshView();
        //view.hide();
    };
    WifeChangeSexView.prototype.freshView = function (isInit) {
        var view = this;
        var wid = this.param.data.wid;
        var wifeinfovo = Api.wifeVoApi.getWifeInfoVoById(wid);
        var isfemale = view._sexType == 0;
        var style = view._sexType == 0 ? "female" : "male";
        var viewbg = view.viewBg;
        viewbg.setload(style + "changebg");
        view._npc.setload(isfemale ? ("wife_full_" + wid) : ("wife_full_" + wid + "_male"));
        view._femalebtn.setBtnBitMap(isfemale ? "femalechangebtn" : "femalechangebtn_down");
        view._malebtn.setBtnBitMap(isfemale ? "malechangebtn_down" : "malechangebtn");
        view._text.text = LanguageManager.getlocal(isfemale ? ("wifeDesc_" + wid) : ("wifeDesc_" + wid + "_male"));
        view._text.textColor = isfemale ? 0x954815 : 0xafc3f3;
        view._maletext.text = LanguageManager.getlocal("changewife" + (isfemale ? "female" : "male"), [LanguageManager.getlocal(isfemale ? "wifeName_" + wid : "wifeName_" + wid + "_male")]);
        view._changebtn.setEnable(wifeinfovo.sexflag != view._sexType);
        view._line.setRes(style + "changeline");
        view._nameBg.setRes(style + "changenamebg");
        var nowBone = isfemale ? ("wife_full_" + wid) : ("wife_full_" + wid + "_male");
        if (!isInit) {
            if (App.CommonUtil.check_dragon() && Api.wifeVoApi.isHaveBone(nowBone + '_ske')) {
                view._npc.visible = false;
                if (this._droWifeIcon) {
                    this.removeChild(this._droWifeIcon);
                    this._droWifeIcon.dispose();
                    this._droWifeIcon = null;
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(nowBone);
                    this._droWifeIcon.setScale(1.1);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this.viewBg, [260, 100]);
                    this.addChildAt(this._droWifeIcon, this.getChildIndex(view._npc));
                }
                else {
                    this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(nowBone);
                    this._droWifeIcon.setScale(1.1);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, this._droWifeIcon, this.viewBg, [260, 100]); //, [100, 200]
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
    };
    WifeChangeSexView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIIFE_SETSEXSETTING, this.setWifeCallback, this);
        view._sexType = 0; //0女 1男
        view._stop = false;
        view._text = null;
        view._maletext = null;
        view._npc = null;
        view._malebtn = null;
        view._femalebtn = null;
        view._changebtn = null;
        view._wordbg = null;
        view._line = null;
        view._dragon = null;
        view._nameBg = null;
        view._droWifeIcon = null;
        _super.prototype.dispose.call(this);
    };
    return WifeChangeSexView;
}(CommonView));
__reflect(WifeChangeSexView.prototype, "WifeChangeSexView");
//# sourceMappingURL=WifeChangeSexView.js.map