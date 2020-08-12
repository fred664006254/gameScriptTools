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
 * 等待匹配
 * author qianjun
 *
 */
var WarWaitingPopView = (function (_super) {
    __extends(WarWaitingPopView, _super);
    function WarWaitingPopView() {
        var _this = _super.call(this) || this;
        _this._end = false;
        _this._findTime = 0;
        _this._findTimeCount = -1;
        _this._findNum = 1;
        return _this;
    }
    WarWaitingPopView.prototype.getNetConstEventArr = function () {
        return [
            NetConst.BATTLE_FIND
        ];
    };
    WarWaitingPopView.prototype.netEventCallBack = function (evt) {
        var view = this;
        switch (evt.type) {
            case NetConst.BATTLE_FIND:
                view.findResult(evt);
                break;
        }
    };
    // 打开该面板时，需要传参数msg
    WarWaitingPopView.prototype.initView = function () {
        var view = this;
        var param = view.param.data;
        //type 1对战 2协同
        var type = param.type;
    };
    WarWaitingPopView.prototype.upgardeBack = function (evt) {
        var view = this;
        if (evt.data.ret) {
            // App.CommonUtil.showTip(LangMger.getlocal(`sysUpgardeSucc`));
            // view.freshView();
        }
    };
    WarWaitingPopView.prototype.resetBgSize = function () {
        var view = this;
        view._end = false;
        // view.viewBg.width = this.getShowWidth();
        // view.viewBg.height = this.getShowHeight();
        _super.prototype.resetBgSize.call(this);
        view.viewBg.y = (GameConfig.stageHeigth - view.viewBg.height - 35 - 154) / 2;
        view.container.y = view.viewBg.y + view._titleBg.height + view.getContainerY();
        if (this._titleBg) {
            this._titleBg.x = this.viewBg.x + this.viewBg.width / 2 - 286.5;
            this._titleBg.y = this.viewBg.y - 20;
            // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, this._titleBg2, this._titleBg, [-28,0]);
        }
        if (this.titleTF) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this.titleTF, this._titleBg, [50, 0]);
        }
        if (this.closeBtn) {
            if (this._titleBg) {
                this.closeBtn.x = PlatMgr.hasSpcialCloseBtn() ? 0 : (this._titleBg.x + this._titleBg.width - this.closeBtn.width - 10);
            }
            else {
                this.closeBtn.x = PlatMgr.hasSpcialCloseBtn() ? 0 : (this.viewBg.x + this.viewBg.width - this.closeBtn.width - 17);
            }
            this.closeBtn.y = this._titleBg.y + (this._titleBg.height - this.closeBtn.height) / 2;
        }
        var param = view.param.data;
        //type 1对战 2协同
        var type = param.type;
        var reloadImg = BaseBitmap.create("reloading");
        view.addChildToContainer(reloadImg);
        reloadImg.anchorOffsetX = reloadImg.width / 2;
        reloadImg.anchorOffsetY = reloadImg.height / 2;
        reloadImg.x = view.viewBg.width / 2;
        reloadImg.y = 20 + reloadImg.anchorOffsetY;
        egret.Tween.get(reloadImg, { loop: true }).to({ rotation: -360 }, 1500);
        //取消
        var cancelbtn = ComponentMgr.getButton(ButtonConst.BTN_CANCEL, LangMger.getlocal("canelStr"), view.clickCancelHandler, view, null, null, 28);
        view.addChild(cancelbtn);
        // cancelbtn.setTextPos(null,25);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, cancelbtn, this.viewBg, [0, 15]);
        //小提示
        var tipGroup = new BaseDisplayObjectContainer();
        tipGroup.width = 524;
        tipGroup.height = 154;
        view.addChild(tipGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipGroup, view.viewBg, [0, view.viewBg.height]);
        var tipbg = BaseBitmap.create("joinwartipbg");
        tipbg.width = tipGroup.width;
        tipbg.height = tipGroup.height;
        tipGroup.addChild(tipbg);
        var tipTittleTxt = ComponentMgr.getTextField(LangMger.getlocal("sysTip"), TextFieldConst.SIZE_CONTENT_COMMON, ColorEnums.white);
        tipGroup.addChild(tipTittleTxt);
        tipTittleTxt.stroke = 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTittleTxt, tipbg, [0, 15]);
        var rid = App.MathUtil.getRandom(1, 6);
        var tipTxt = ComponentMgr.getTextField(LangMger.getlocal("warwaitngtip" + rid), TextFieldConst.SIZE_CONTENT_SMALL_POPUP, 0x9FB7E4);
        tipGroup.addChild(tipTxt);
        tipTxt.stroke = 0;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
        var nextBtn = ComponentMgr.getButton("public_alphabg", "", function () {
            rid = App.MathUtil.getRandom(1, 6);
            tipTxt.text = LangMger.getlocal("warwaitngtip" + rid);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
        }, view);
        nextBtn.setBtnSize(150, 152);
        var arrow = BaseBitmap.create("joinwartipbext");
        nextBtn.addChild(arrow);
        tipGroup.addChild(nextBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, nextBtn, tipbg, [-55, -55]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, arrow, nextBtn, [0, 0]);
        egret.Tween.get(nextBtn).wait(1000).call(function () {
            egret.Tween.removeTweens(nextBtn);
            view.find();
        }, view);
    };
    WarWaitingPopView.prototype.find = function () {
        if (this._end) {
            if (this._findTimeCount != -1) {
                egret.clearTimeout(this._findTimeCount);
                this._findTimeCount = -1;
            }
            return;
        }
        var param = this.param.data;
        //type 1对战 2协同
        var type = param.type;
        if (this._findTimeCount != -1) {
            egret.clearTimeout(this._findTimeCount);
            this._findTimeCount = -1;
        }
        this._findTime = egret.getTimer();
        NetManager.request(NetConst.BATTLE_FIND, {
            findType: type,
            findNum: this._findNum
        });
        this._findNum++;
    };
    WarWaitingPopView.prototype.clickCancelHandler = function (data) {
        if ((Api.GameinfoVoApi.checlIsInGuideId(2))) {
            return;
        }
        var param = this.param;
        this._end = true;
        if (param.data.cancelcallback) {
            param.data.cancelcallback.apply(param.data.handler, [this]);
        }
        NetManager.request(NetConst.BATTLE_CANCELFIND, {
            findType: param.data.type,
        });
        this.hide();
    };
    Object.defineProperty(WarWaitingPopView.prototype, "isWave", {
        // protected getTitleBgName():string{
        //     return `public_poptittle${this.isWave ? `purple` : `red`}`;
        // }
        get: function () {
            var view = this;
            var param = view.param.data;
            //type 1对战 2协同
            var type = param.type;
            return type == 2;
        },
        enumerable: true,
        configurable: true
    });
    WarWaitingPopView.prototype.isTouchMaskClose = function () {
        return false;
    };
    WarWaitingPopView.prototype.getTitleStr = function () {
        var param = this.param.data;
        return LangMger.getlocal("warwaitng");
    };
    // protected getCloseBtnName():string{
    //     return `popupview_closebtn${this.isWave ? `purple` : `red`}`;
    // }
    WarWaitingPopView.prototype.closeHandler = function () {
        if ((Api.GameinfoVoApi.checlIsInGuideId(2))) {
            return;
        }
        var param = this.param;
        this._end = true;
        if (param.data.cancelcallback) {
            param.data.cancelcallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    // protected getShowWidth():number{
    // 	return 552;
    // }
    WarWaitingPopView.prototype.getShowHeight = function () {
        return 350;
    };
    WarWaitingPopView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    WarWaitingPopView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        return array.concat([
            "joinwartipbg", "joinwartipbext"
        ]);
    };
    WarWaitingPopView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    WarWaitingPopView.prototype.preInit = function () {
        _super.prototype.preInit.call(this);
        // if(Api.GameinfoVoApi.checlIsInGuideId(2)){
        //     App.CommonUtil.sendNewGuideId(2);
        // }
    };
    WarWaitingPopView.prototype.findResult = function (e) {
        var isSuccess = false;
        var param = this.param.data;
        //type 1对战 2协同
        var type = param.type;
        var rdata = e.data;
        if (rdata.ret) {
            var result = rdata.data.data.matchFlag;
            if (result) {
                if (result == 1) {
                    if (rdata.data.data.randSeed) {
                        BattleStatus.randSeed = rdata.data.data.randSeed;
                    }
                    if (type == 2) {
                        Api.UserinfoVoApi.setFreshCard(false);
                    }
                    isSuccess = true;
                    Api.BattleVoApi.startBattle(type);
                }
                else if (result == 2) {
                    isSuccess = true;
                    App.CommonUtil.showTip(LangMger.getlocal("warcreateroomtip8"));
                }
                if (param.findcallback) {
                    param.findcallback.apply(param.handler, [this]);
                }
                this.hide();
            }
        }
        if (!isSuccess) {
            var t = egret.getTimer() - this._findTime;
            if (t >= 980) {
                this.find();
            }
            else {
                this._findTimeCount = egret.setTimeout(this.find, this, 1000 - t);
            }
        }
    };
    WarWaitingPopView.prototype.dispose = function () {
        var view = this;
        view._findTime = 0;
        if (view._findTimeCount != -1) {
            egret.clearTimeout(view._findTimeCount);
            view._findTimeCount = -1;
        }
        view._findNum = 1;
        _super.prototype.dispose.call(this);
    };
    return WarWaitingPopView;
}(PopupView));
__reflect(WarWaitingPopView.prototype, "WarWaitingPopView");
//# sourceMappingURL=WarWaitingPopView.js.map