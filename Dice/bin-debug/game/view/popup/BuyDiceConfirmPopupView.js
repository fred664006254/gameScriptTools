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
 * 购买骰子通用确认面板 金币和钻石
 * author qianjun
 * 参数 ：title,msg,callback,handler  needCancel
 *
 */
var BuyDiceConfirmPopupView = (function (_super) {
    __extends(BuyDiceConfirmPopupView, _super);
    function BuyDiceConfirmPopupView() {
        return _super.call(this) || this;
    }
    // 打开该面板时，需要传参数msg
    BuyDiceConfirmPopupView.prototype.initView = function () {
        var view = this;
        var param = view.param.data;
        var rewardVo = GameData.formatRewardItem(param.id)[0];
        var dicecfg = Config.DiceCfg.getCfgById(rewardVo.id.toString());
        var bg = BaseBitmap.create("popupview_content1");
        bg.width = 110;
        bg.height = 110;
        bg.x = view.viewBg.x + 67;
        bg.y = 30;
        // view.addChildToContainer(bg);
        var itemGroup = GameData.getItemIcon(rewardVo); //, rewardVo.num);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemGroup, bg, [0, 0]);
        view.addChildToContainer(itemGroup);
        // let numTxt = ComponentMgr.getTextField(`x${rewardVo.num}`, TextFieldConst.SIZE_CONTENT_COMMON);
        // view.addChildToContainer(numTxt)
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, itemGroup, [0,itemGroup.height*itemGroup.scaleY + 10]);
        var curlv = Api.DiceVoApi.getDiceLvById(rewardVo.id.toString());
        var needNum = dicecfg.getNextLvCostNumByLv(curlv + 1);
        var curNum = Api.DiceVoApi.getDiceNumById(rewardVo.id.toString());
        var ismaxlevel = curlv == dicecfg.maxGrade;
        // let progressGroup = new BaseDisplayObjectContainer();
        // progressGroup.width = 260//curNum >= needNum ? 223 : 192;// 
        // progressGroup.height = 45;
        // view.addChildToContainer(progressGroup);
        // let line = BaseBitmap.create(`public_line1`);
        // line.width = 506;
        // view.addChildToContainer(line);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, bg, [0,bg.height+50]);
        if (1) {
            //中间进度
            var progress = ComponentMgr.getProgressBar("progress23", "progress_bg_1", 140);
            progress.setTextSize(TextFieldConst.SIZE_18);
            view.addChildToContainer(progress);
            if (ismaxlevel) {
                progress.setPercentage(1);
                progress.setText(LangMger.getlocal("dicemaxlevel"));
            }
            else {
                progress.setPercentage(curNum / needNum);
                progress.setText(curNum + "/" + needNum);
            }
            progress.setTextSize(TextFieldConst.SIZE_20);
            var levelbg = BaseBitmap.create("public_levelbg");
            view.addChildToContainer(levelbg);
            var levelTxt = ComponentMgr.getTextField("" + curlv, TextFieldConst.SIZE_TITLE_SMALL);
            view.addChildToContainer(levelTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, bg, [(itemGroup.width - progress.width) / 2, bg.height]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelbg, progress, [-levelbg.width / 2, 0]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, levelTxt, levelbg);
            if (!ismaxlevel && curNum >= needNum) {
                var levelarrow = BaseBitmap.create("public_arrowgreen");
                levelarrow.setScale(0.7);
                view.addChildToContainer(levelarrow);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, bg, [(itemGroup.width - progress.width) / 2, bg.height]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelbg, progress, [-levelbg.width / 2, 0]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, levelTxt, levelbg);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelarrow, progress, [progress.width - 15, -2]);
            }
            // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, bg, [0,bg.height+110]);
        }
        var txtBg = BaseBitmap.create('bird_des_shop_bg');
        this.addChildToContainer(txtBg);
        txtBg.y = 0;
        txtBg.x = 203;
        var txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, ColorEnums.white);
        this.addChildToContainer(txt);
        txt.stroke = 2;
        txt.strokeColor = 0x0C2C77;
        txt.width = 237;
        txt.wordWrap = true;
        txt.lineSpacing = 10;
        txt.text = dicecfg.qualityStr + "\n" + dicecfg.desc;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt, txtBg, [42, 42]);
    };
    BuyDiceConfirmPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        var view = this;
        var param = view.param.data;
        var conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, param.costnum, view.clickConHandler, view);
        if (param.costIcon) {
            conBtn.addTextIcon(param.costIcon);
            conBtn.setColor(ColorEnums.white);
        }
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, view.viewBg, [0,0]);
        view.addChild(conBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, conBtn, view.viewBg, [0, 15]);
    };
    BuyDiceConfirmPopupView.prototype.getBgExtraHeight = function () {
        return 150;
    };
    BuyDiceConfirmPopupView.prototype.isTouchMaskClose = function () {
        return (this.param && this.param.data && this.param.data.touchMaskClose) ? true : false;
    };
    BuyDiceConfirmPopupView.prototype.clickConHandler = function (data) {
        var param = this.param;
        if (!param.data.clickNotAutoHide) {
            this.hide();
        }
        if (param.data.callback) {
            param.data.callback.apply(param.data.handler, [this]);
        }
    };
    BuyDiceConfirmPopupView.prototype.clickCancelHandler = function (data) {
        var param = this.param;
        if (param.data.cancelcallback) {
            param.data.cancelcallback.apply(param.data.handler, [this]);
        }
        this.hide();
    };
    // protected getShowHeight(){
    // 	return 500;
    // }
    BuyDiceConfirmPopupView.prototype.getTitleStr = function () {
        return this.param.data.title;
    };
    BuyDiceConfirmPopupView.prototype.getCloseBtnName = function () {
        return this.param.data.needClose === 1 ? _super.prototype.getCloseBtnName.call(this) : null;
    };
    BuyDiceConfirmPopupView.prototype.closeHandler = function () {
        var param = this.param;
        if (param.data.closecallback) {
            param.data.closecallback.apply(param.data.handler, [this]);
        }
        _super.prototype.closeHandler.call(this);
    };
    BuyDiceConfirmPopupView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    BuyDiceConfirmPopupView.prototype.getParent = function () {
        if (this.param.data.inLayer) {
            return this.param.data.inLayer;
        }
        else {
            return _super.prototype.getParent.call(this);
        }
    };
    BuyDiceConfirmPopupView.prototype.getResourceList = function () {
        var array = [];
        array.concat(_super.prototype.getResourceList.call(this));
        return array.concat([
            "progress_bg_1", "progress23"
        ]);
    };
    BuyDiceConfirmPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return BuyDiceConfirmPopupView;
}(PopupView));
__reflect(BuyDiceConfirmPopupView.prototype, "BuyDiceConfirmPopupView");
//# sourceMappingURL=BuyDiceConfirmPopupView.js.map