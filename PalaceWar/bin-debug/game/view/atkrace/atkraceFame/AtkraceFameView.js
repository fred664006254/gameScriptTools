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
 * 红颜册封
 * author dky
 * date 2018/4/24
 * @class WifestatusView
 */
var AtkraceFameView = (function (_super) {
    __extends(AtkraceFameView, _super);
    function AtkraceFameView() {
        return _super.call(this) || this;
    }
    AtkraceFameView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, this.fameUpHandler, this);
        var bottomBg = BaseBitmap.create("public_9_bg23");
        bottomBg.width = GameConfig.stageWidth - 10;
        bottomBg.height = GameConfig.stageHeigth - 186;
        bottomBg.x = 5;
        bottomBg.y = -7;
        this.addChildToContainer(bottomBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 10, GameConfig.stageHeigth - 219);
        var fameLevelList = Config.AtkraceCfg.getFameList();
        var servantList = Api.atkraceVoApi.getServantListByFame();
        this._scrollList = ComponentManager.getScrollList(AtkraceFameScrollItem, fameLevelList, rect, servantList);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(bottomBg.x, bottomBg.y + 10);
        if (fameLevelList.length > 0) {
            //this._scrollList.setScrollTopByIndex(fameLevelList.length - 2);
            this._scrollList.setScrollTop(this._scrollList.getItemByIndex(fameLevelList.length - 1).y - (GameConfig.stageHeigth - 580));
        }
        //总加成, 一键提升
        var bottomContainer = this.getBottomContainer();
        this.addChild(bottomContainer);
    };
    AtkraceFameView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkracefameservantpopupview_bg",
            "skin_detail_namebg",
            "arena_bottom", "progress3", "progress3_bg", "wifestatus_namebg"
        ]);
    };
    AtkraceFameView.prototype.getBottomContainer = function () {
        var bottomContainer = new BaseDisplayObjectContainer();
        //let [totalAtkAdd, totalCrtAdd] = [Api.atkraceFameVoApi.getTotalAtkAdd(), Api.atkraceFameVoApi.getTotalCrtAdd()]
        var _a = [100, 100], totalAtkAdd = _a[0], totalCrtAdd = _a[1];
        var bottom = BaseBitmap.create("arena_bottom");
        bottomContainer.addChild(bottom);
        // let addAtkText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFameAddAtk", [`+ ${totalAtkAdd}%`]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // addAtkText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        // addAtkText.setPosition(bottom.x + 20, bottom.y + 15);
        // bottomContainer.addChild(addAtkText);
        // let addCrtText = ComponentManager.getTextField(LanguageManager.getlocal("atkraceFameAddCrt", [`+ ${totalCrtAdd}%`]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
        // addCrtText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
        // addCrtText.setPosition(addAtkText.x, addAtkText.y + addAtkText.height + 10);
        // addCrtText.x = addAtkText.x;
        // bottomContainer.addChild(addCrtText);
        var addDetailBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "atkraceFameAddDetailBtn", this.clickAddDetailBtn, this);
        bottomContainer.addChild(addDetailBtn);
        addDetailBtn.setPosition(bottom.x + 50, bottom.y + bottom.height / 2 - addDetailBtn.height / 2);
        this._upAllBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "atkraceFameBtnAllUp", this.clickUpAllBtn, this);
        bottomContainer.addChild(this._upAllBtn);
        this._upAllBtn.setPosition(bottom.x + bottom.width - this._upAllBtn.width - 50, bottom.y + bottom.height / 2 - this._upAllBtn.height / 2);
        this.refreshUpAllBtn();
        bottomContainer.x = 0;
        bottomContainer.y = GameConfig.stageHeigth - 88;
        return bottomContainer;
    };
    AtkraceFameView.prototype.refreshView = function () {
        this.refreshList();
        this.refreshUpAllBtn();
    };
    AtkraceFameView.prototype.refreshUpAllBtn = function () {
        if (Api.atkraceVoApi.checkHaveServantCanUpFame()) {
            this._upAllBtn.setGray(false);
        }
        else {
            this._upAllBtn.setGray(true);
        }
    };
    AtkraceFameView.prototype.refreshList = function () {
        var fameLevelList = Config.AtkraceCfg.getFameList();
        var servantList = Api.atkraceVoApi.getServantListByFame();
        this._scrollList.refreshData(fameLevelList, servantList);
    };
    //一键提升
    AtkraceFameView.prototype.clickUpAllBtn = function (param) {
        this.refreshUpAllBtn();
        if (this._upAllBtn.getIsGray()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('atkraceFameUpAllFameFailTip'));
            return;
        }
        this.request(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, { servantId: '', batch: 1 });
    };
    //加成详情
    AtkraceFameView.prototype.clickAddDetailBtn = function (param) {
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACEFAMEADDINFOPOPUPVIEW);
    };
    AtkraceFameView.prototype.fameUpHandler = function (param) {
        var dataList = param.data.data.data.sidList;
        if (dataList && dataList.length) {
            for (var index = 0; index < dataList.length; index++) {
                var id = null;
                id = {
                    id: dataList[index][0],
                    beforeLv: dataList[index][1],
                    afterLv: dataList[index][2]
                };
                Api.specialRewardList.push({ id: id, type: "Fame" });
            }
        }
        Api.openSpecialView();
        this.refreshView();
    };
    AtkraceFameView.prototype.getTitleStr = function () {
        return "atkraceFameTitle";
    };
    AtkraceFameView.prototype.getRuleInfo = function () {
        return "atkraceFameRuleinfo";
    };
    AtkraceFameView.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    AtkraceFameView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SERVANT_FAMEUPGRADE, this.fameUpHandler, this);
        if (this._scrollList) {
            this._scrollList = null;
        }
        _super.prototype.dispose.call(this);
    };
    return AtkraceFameView;
}(CommonView));
__reflect(AtkraceFameView.prototype, "AtkraceFameView");
//# sourceMappingURL=AtkraceFameView.js.map