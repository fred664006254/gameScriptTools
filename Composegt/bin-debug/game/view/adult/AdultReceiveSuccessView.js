/**
 * 拜访接受成功
 * author qianjun
 * date 2017/11/1
 * @class AdultMarrySuccessView
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
var AdultReceiveSuccessView = (function (_super) {
    __extends(AdultReceiveSuccessView, _super);
    function AdultReceiveSuccessView() {
        var _this = _super.call(this) || this;
        _this._visitGroup = null;
        _this._visitTxt = null;
        _this._descBg = null;
        // id 孩子ID
        _this._childId = null;
        return _this;
    }
    // protected getResourceList():string[]
    // {
    // 	let rewardPic:string[] = super.getResourceList();
    // 	return rewardPic.concat(["adultreceivebg","adultvisitbg"
    // 	]);
    // }
    AdultReceiveSuccessView.prototype.getTitleBgName = function () {
        return null;
    };
    AdultReceiveSuccessView.prototype.getTitleStr = function () {
        return null;
    };
    AdultReceiveSuccessView.prototype.getBgName = function () {
        return "public_9_bg8";
    };
    AdultReceiveSuccessView.prototype.initView = function () {
        var view = this;
        view.alpha = 1;
        this._confirmCallback = this.param.data.confirmCallback;
        //this.addTouchTap(this.touchTap,this,null);
        var type = this.param.data.type;
        //拜访成功
        view._visitGroup = new BaseDisplayObjectContainer();
        view.setLayoutPosition(LayoutConst.lefttop, view._visitGroup, view);
        view.addChild(view._visitGroup);
        var group = view._visitGroup;
        group.width = GameConfig.stageWidth;
        group.height = GameConfig.stageHeigth;
        // group.alpha = 0;
        var visitbg = BaseLoadBitmap.create(type == 'receiveSuccess' ? 'adultreceivebg' : 'adultvisitbg');
        visitbg.width = 640;
        visitbg.height = 1136;
        group.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, visitbg, group, [0, 0], true);
        group.addChild(visitbg);
        var str = '';
        if (type == 'receiveSuccess') {
            str = LanguageManager.getlocal('adultreceivetxt', [this.param.data.wifename, this.param.data.childname, this.param.data.attr]);
        }
        else {
            str = LanguageManager.getlocal('adultvisittxt', [this.param.data.name]);
        }
        var visitTxt = ComponentManager.getTextField(str, 20);
        visitTxt.lineSpacing = 5;
        group.setLayoutPosition(LayoutConst.horizontalCenterbottom, visitTxt, visitbg, [0, 120]);
        group.addChild(visitTxt);
        view._visitTxt = visitTxt;
        var descbg = BaseBitmap.create('public_tipbg');
        descbg.height = visitTxt.textHeight + 20;
        group.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descbg, visitTxt);
        group.addChild(descbg);
        group.swapChildren(visitTxt, descbg);
        view._descBg = descbg;
        egret.Tween.get(view).wait(2000).to({ alpha: 0 }, 3000).call(function () {
            view.hide();
        }, view);
    };
    AdultReceiveSuccessView.prototype.noBtnClick = function () {
        this.hide();
        // ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
    };
    AdultReceiveSuccessView.prototype.isShowOpenAni = function () {
        return false;
    };
    AdultReceiveSuccessView.prototype.touchTap = function () {
        this.hide();
    };
    AdultReceiveSuccessView.prototype.hide = function () {
        _super.prototype.hide.call(this);
        if (this.param.data.confirmCallback) {
            this.param.data.confirmCallback.apply(this.param.data.handler, []);
        }
    };
    AdultReceiveSuccessView.prototype.dispose = function () {
        this._childId = null;
        egret.Tween.removeTweens(this);
        this._visitGroup.dispose();
        this._visitGroup = null;
        this._visitTxt = null;
        this._descBg = null;
        _super.prototype.dispose.call(this);
    };
    return AdultReceiveSuccessView;
}(BaseView));
__reflect(AdultReceiveSuccessView.prototype, "AdultReceiveSuccessView");
