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
 * 选择门客弹板
 * @class LevySelectServantPopupView
 */
var LevySelectServantPopupView = (function (_super) {
    __extends(LevySelectServantPopupView, _super);
    function LevySelectServantPopupView() {
        var _this = _super.call(this) || this;
        // 道具id	
        _this._itemId = 0;
        _this._scrollList = null;
        _this._callback = null;
        _this._handler = null;
        _this._selectedServantId = "";
        _this._pos = "";
        _this._launch = null;
        _this._chosenFlag = [];
        return _this;
    }
    LevySelectServantPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SELECTED_SERVANT, this.clickItemHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.refreshList, this);
        this._itemId = 0;
        this._scrollList = null;
        this._callback = null;
        this._handler = null;
        this._selectedServantId = "";
        this._index = 0;
        this._pos = "";
        this._chosenFlag = [];
        this._launch = null;
        _super.prototype.dispose.call(this);
    };
    /**
     * 需要传的参数{callback：回调函数，handler:回调函数所属对下，type：面板类型（1，2，3），itemId：使用道具时传}
     */
    LevySelectServantPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED, this.refreshList, this);
        this._callback = this.param.data.callback;
        this._handler = this.param.data.handler;
        var pos = this.param.data.data.pos;
        this._pos = pos;
        this._launch = Api.levyVoApi.getLaunchConditionByPos(pos);
        var woodbg = BaseBitmap.create("popupview_bg3");
        woodbg.x = GameConfig.stageWidth / 2 - woodbg.width / 2 - 5;
        woodbg.y = 16;
        woodbg.height = this.getShowHeight() - 113;
        this.container.addChildAt(woodbg, 0);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SELECTED_SERVANT, this.clickItemHandler, this);
        //顶部条件
        var redBg = this.container.getChildByName("newRedBg");
        if (redBg) {
            var titletip = ComponentManager.getTextField(this.getTitleTipStr(), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            titletip.x = redBg.x + redBg.width / 2 - titletip.width / 2;
            titletip.y = this.y + 30;
            this.addChildToContainer(titletip);
        }
        var servantInfoVoList = Api.levyVoApi.getSortServantListBySpId(this._launch.type, this._launch.type, this._pos);
        console.log(servantInfoVoList);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 530, this.getShowHeight() - 248);
        var list = null;
        list = ComponentManager.getScrollList(LevySelectServantItem, servantInfoVoList, rect, { pos: pos, launch: this._launch });
        list.setPosition((GameConfig.stageWidth - list.width) / 2 - 5, 70);
        this.addChildToContainer(list);
        this._scrollList = list;
        this._scrollList.setEmptyTip(LanguageManager.getlocal("levy_selectservant_emptytip"), TextFieldConst.COLOR_LIGHT_YELLOW);
        this.initBottom();
    };
    LevySelectServantPopupView.prototype.refreshList = function () {
        var param = this._launch.type;
        for (var i = 0; i < this._chosenFlag.length; i++) {
            var chosenFlag = this._chosenFlag[i];
            if (chosenFlag.visible == true) {
                param = i + 1;
            }
        }
        var serList = Api.levyVoApi.getSortServantListBySpId(param, this._launch.type, this._pos);
        this._scrollList.refreshData(serList, { pos: this._pos, launch: this._launch });
    };
    //底部按钮列表
    LevySelectServantPopupView.prototype.initBottom = function () {
        var bottomBg = BaseBitmap.create("public_9v_bg14");
        bottomBg.width = this.getShowWidth() - 40;
        bottomBg.height = 70;
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, 630);
        this.addChildToContainer(bottomBg);
        var line = BaseBitmap.create("commonview_border3");
        line.width = bottomBg.width;
        line.setPosition(GameConfig.stageWidth / 2 - line.width / 2, bottomBg.y - line.height + 10);
        this.addChildToContainer(line);
        for (var i = 1; i <= 5; i++) {
            var spImg = BaseBitmap.create("servant_speciality" + ((i == 5 ? 6 : i)));
            spImg.setScale(0.8);
            spImg.setPosition(bottomBg.x + i * 55 + (i - 1) * spImg.width * 0.8, bottomBg.y + 13);
            this.addChildToContainer(spImg);
            spImg.addTouchTap(this.bottomClickHander, this, [i]);
            var chosenFlag = BaseBitmap.create("levy_selected");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, chosenFlag, spImg);
            this.addChildToContainer(chosenFlag);
            chosenFlag.visible = false;
            if (i == this._launch.type) {
                chosenFlag.visible = true;
            }
            this._chosenFlag.push(chosenFlag);
        }
    };
    LevySelectServantPopupView.prototype.bottomClickHander = function (event, param) {
        for (var i = 0; i < this._chosenFlag.length; i++) {
            var chosenFlag = this._chosenFlag[i];
            if (i == param - 1) {
                chosenFlag.visible = true;
            }
            else {
                chosenFlag.visible = false;
            }
        }
        var serList = Api.levyVoApi.getSortServantListBySpId(param, this._launch.type, this._pos);
        this._scrollList.refreshData(serList, { pos: this._pos, launch: this._launch });
    };
    LevySelectServantPopupView.prototype.getTitleTipStr = function () {
        var launch = Config.LevyCfg.LevyItemList[Number(this._pos.split("_")[0])].launch[Number(this._pos.split("_")[1]) - 1];
        var type = Number(launch.split("_")[0]);
        var need = Number(launch.split("_")[1]);
        var str = '';
        if (type >= 5) {
            str = LanguageManager.getlocal("levy_selectservant_condtip_onlylevel", [need + '']);
        }
        else {
            str = LanguageManager.getlocal("levy_selectservant_condtip", [LanguageManager.getlocal("servantInfo_speciality" + type), need + '']);
        }
        return str;
    };
    /**点击具体门客按钮事件 */
    LevySelectServantPopupView.prototype.clickItemHandler = function (event) {
        var data = event.data;
        this._selectedServantId = String(data.servantId) || "";
        this._callback.apply(this._handler, [{
                servantId: this._selectedServantId,
                isSelf: data.isSelf
            }]);
        this.hide();
    };
    LevySelectServantPopupView.prototype.isHaveTitle = function () {
        return true;
    };
    LevySelectServantPopupView.prototype.getShowWidth = function () {
        return 585;
    };
    LevySelectServantPopupView.prototype.getShowHeight = function () {
        return 798;
    };
    LevySelectServantPopupView.prototype.getTitleStr = function () {
        return "servantSelectedPopupViewTitle";
    };
    LevySelectServantPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "popupview_bg3", "commonview_border3", "levy_selected"
        ]);
    };
    return LevySelectServantPopupView;
}(PopupView));
__reflect(LevySelectServantPopupView.prototype, "LevySelectServantPopupView");
