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
 * desc:港台美女投票界面
*/
var AcDraftVoteView = (function (_super) {
    __extends(AcDraftVoteView, _super);
    function AcDraftVoteView() {
        var _this = _super.call(this) || this;
        _this._flowerCurText = null;
        return _this;
    }
    Object.defineProperty(AcDraftVoteView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcDraftView.AID, AcDraftView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDraftVoteView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcDraftView.AID, AcDraftView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    AcDraftVoteView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "draftvotetopbg", "draftflower", "draftreward", "draftreward_down", "emparena_bottom"
        ]);
    };
    AcDraftVoteView.prototype.getTitleStr = function () {
        return 'AcDraftViewTitle';
    };
    AcDraftVoteView.prototype.initView = function () {
        var view = this;
        var topbg = BaseBitmap.create('draftvotetopbg');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, view.titleBg, [0, view.titleBg.height]);
        view.addChild(topbg);
        var flower = BaseBitmap.create('draftflower');
        view.setLayoutPosition(LayoutConst.leftverticalCenter, flower, view.titleBg, [5, 0]);
        view.addChild(flower);
        var haveFlower = 0;
        var fTxt = ComponentManager.getTextField(haveFlower.toString(), 22, TextFieldConst.COLOR_WHITE);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, fTxt, flower, [5, 0]);
        view.addChild(fTxt);
        view._flowerCurText = fTxt;
        var awardBtn = ComponentManager.getButton('draftreward', '', view.awardClick, view);
        view.setLayoutPosition(LayoutConst.lefttop, awardBtn, topbg, [5, 15]);
        view.addChild(awardBtn);
        var emparena_bottom = BaseBitmap.create('emparena_bottom');
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);
        var midbg = BaseBitmap.create('public_9_bg22');
        midbg.width = GameConfig.stageWidth - 10;
        midbg.height = GameConfig.stageHeigth - topbg.y - topbg.height - emparena_bottom.height;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, midbg, topbg, [0, topbg.height]);
        view.addChild(midbg);
    };
    AcDraftVoteView.prototype.awardClick = function () {
        var view = this;
    };
    AcDraftVoteView.prototype.dispose = function () {
        var view = this;
        view._flowerCurText = null;
        _super.prototype.dispose.call(this);
    };
    AcDraftVoteView.AID = null;
    AcDraftVoteView.CODE = null;
    return AcDraftVoteView;
}(CommonView));
__reflect(AcDraftVoteView.prototype, "AcDraftVoteView");
//# sourceMappingURL=AcDraftVoteView.js.map