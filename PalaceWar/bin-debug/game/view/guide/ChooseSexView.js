/**
 * 选择青梅竹马
 * author qianjun
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
var ChooseSexView = (function (_super) {
    __extends(ChooseSexView, _super);
    function ChooseSexView() {
        var _this = _super.call(this) || this;
        _this._sexType = 0; //0女 1男
        _this._femalebtn = null;
        _this._malebtn = null;
        return _this;
    }
    ChooseSexView.prototype.getTitleBgName = function () {
        return null;
    };
    ChooseSexView.prototype.getTitleStr = function () {
        return null;
    };
    // 初始化背景
    ChooseSexView.prototype.initBg = function () {
        var bgName = this.getBgName();
        this.viewBg = BaseLoadBitmap.create(bgName);
        this.addChild(this.viewBg);
        this.viewBg.width = GameConfig.stageWidth;
        this.viewBg.height = GameConfig.stageHeigth;
    };
    ChooseSexView.prototype.getBgName = function () {
        return "story_bg1";
    };
    ChooseSexView.prototype.getResourceList = function () {
        var guidePic = [];
        return guidePic.concat([
            "guidechoosesex"
        ]);
    };
    ChooseSexView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_USER_REVERSIONSETTING, this.setCallBack, this);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var wordbg = BaseBitmap.create("guidechoosesexwordbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, wordbg, view);
        view.addChild(wordbg);
        var wordTxt = ComponentManager.getTextField(LanguageManager.getlocal("chooseSexTipTxt"), 20, TextFieldConst.COLOR_BLACK);
        wordTxt.width = 585;
        wordTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wordTxt, wordbg, [0, 30]);
        view.addChild(wordTxt);
        var warnTxt = ComponentManager.getTextField(LanguageManager.getlocal("chooseSexTipTxt2"), 20, TextFieldConst.COLOR_WARN_RED2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, warnTxt, wordbg, [0, 35]);
        view.addChild(warnTxt);
        var npc1 = BaseLoadBitmap.create("wife_full_101_male");
        var npc2 = BaseLoadBitmap.create("wife_full_101");
        npc1.width = npc2.width = 640;
        npc1.height = npc2.height = 840;
        view.addChild(npc1);
        view.addChild(npc2);
        npc1.setScale(0.7);
        npc2.setScale(0.7);
        view._sexType = 1;
        var malebtn = ComponentManager.getButton("guidechoosesexbtn1", "chooseSexTxt1", function () {
            view._sexType = 1;
            view.freshView();
        }, view, null, 3);
        malebtn.setTextSize(28);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, malebtn, wordbg, [50, -malebtn.height - 15]);
        view.addChild(malebtn);
        view._malebtn = malebtn;
        var femalebtn = ComponentManager.getButton("guidechoosesexbtn2_down", "chooseSexTxt2", function () {
            view._sexType = 0;
            view.freshView();
        }, view, null, 3);
        femalebtn.setTextSize(28);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, femalebtn, wordbg, [50, -femalebtn.height - 15]);
        view.addChild(femalebtn);
        view._femalebtn = femalebtn;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, npc1, wordbg, [0, wordbg.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, npc2, wordbg, [0, wordbg.height]);
        npc1.x = -50;
        npc2.x = 240;
        var name1 = BaseBitmap.create("guidechoosesexname1");
        var txt1 = ComponentManager.getTextField(LanguageManager.getlocal("chooseSexDescTxt1"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, name1, npc1, [0, -name1.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt1, name1, [0, -txt1.height]);
        view.addChild(name1);
        view.addChild(txt1);
        var name2 = BaseBitmap.create("guidechoosesexname2");
        var txt2 = ComponentManager.getTextField(LanguageManager.getlocal("chooseSexDescTxt2"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, name2, npc2, [0, -name2.height]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt2, name2, [0, -txt2.height]);
        view.addChild(name2);
        view.addChild(txt2);
    };
    ChooseSexView.prototype.freshView = function () {
        var view = this;
        view._malebtn.setBtnBitMap(view._sexType == 1 ? "guidechoosesexbtn1" : "guidechoosesexbtn1_down");
        view._femalebtn.setBtnBitMap(view._sexType == 0 ? "guidechoosesexbtn2" : "guidechoosesexbtn2_down");
        NetManager.request(NetRequestConst.REQUEST_USER_REVERSIONSETTING, { stype: 2, sflag: view._sexType });
    };
    ChooseSexView.prototype.showOldGuide = function () {
        Api.rookieVoApi.isInGuiding = true;
        ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, { idx: "1", f: this.param.data.f, o: this.param.data.o });
        this.hide();
    };
    ChooseSexView.prototype.setCallBack = function (evt) {
        if (evt.data.data.data) {
            this.showOldGuide();
        }
    };
    ChooseSexView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_USER_REVERSIONSETTING, this.setCallBack, this);
        this._femalebtn = null;
        this._malebtn = null;
        this._sexType = 1;
        _super.prototype.dispose.call(this);
    };
    return ChooseSexView;
}(BaseView));
__reflect(ChooseSexView.prototype, "ChooseSexView");
//# sourceMappingURL=ChooseSexView.js.map