/**
 * 门客
 * author yanyuling
 * date 2017/9/25
 * @class ItemView
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
var ServantView = (function (_super) {
    __extends(ServantView, _super);
    function ServantView() {
        var _this = _super.call(this) || this;
        _this._lastDropIdx = 1;
        _this._scrollList = null;
        return _this;
    }
    ServantView.prototype.getBorderName = function () {
        return "commonview_border1";
    };
    ServantView.prototype.initView = function () {
        this._dropBtnList = [];
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        Api.mainTaskVoApi.isKeepGuide = true;
        Api.mainTaskVoApi.checkShowGuide();
        // let bottomBg = BaseBitmap.create("public_9v_bg03");
        // bottomBg.width = GameConfig.stageWidth;
        // bottomBg.height = GameConfig.stageHeigth - 300 + 160;
        // bottomBg.x = 0;
        // bottomBg.y = 50;
        // this.addChildToContainer(bottomBg);
        this._lastDropIdx = Api.otherInfoVoApi.getServantSortId();
        var topLineBg = BaseBitmap.create("commonview_border3");
        topLineBg.width = 620;
        topLineBg.x = this.viewBg.width / 2 - topLineBg.width / 2;
        topLineBg.y = -10;
        this._nodeContainer.addChild(topLineBg);
        var topBg = BaseBitmap.create("commonview_redtitle");
        topBg.x = this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = topLineBg.y + 2;
        this._nodeContainer.addChild(topBg);
        //门客滚顶区域
        var scroY = topBg.height - topBg.y;
        // let innerbg =  BaseBitmap.create("public_9v_bg02");
        // innerbg.width = GameConfig.stageWidth-10;
        // innerbg.height = GameConfig.stageHeigth - scroY-80;
        // innerbg.x = 5;
        // innerbg.y = scroY-35;
        // this._nodeContainer.addChild(innerbg);
        // let servantNumBg = BaseBitmap.create("servant_1");
        // servantNumBg.x = 20;
        // servantNumBg.y = topBg.y + topBg.height/2 - servantNumBg.height/2;
        // this._nodeContainer.addChild(servantNumBg);
        var servantNumTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        servantNumTxt.text = LanguageManager.getlocal("servant_count") + Api.servantVoApi.getServantCount();
        servantNumTxt.x = 40; //servantNumBg.x + servantNumBg.width/2 - servantNumTxt.width/2;
        servantNumTxt.y = topBg.y + topBg.height / 2 - servantNumTxt.height / 2;
        this._nodeContainer.addChild(servantNumTxt);
        this._dropDownBtn = ComponentManager.getButton("servant_sortbtn", "", this.dropDownBtnClickHandler, this, [0], 3);
        this._dropDownBtn.x = GameConfig.stageWidth - this._dropDownBtn.width - 30;
        this._dropDownBtn.y = servantNumTxt.y + servantNumTxt.height / 2 - this._dropDownBtn.height / 2;
        this._dropDownBtn.setColor(ServantView.DROPBTN_COLOR1);
        this._nodeContainer.addChild(this._dropDownBtn);
        this._dropDownBtn.setBold(false);
        this._dropDownBtn.setText("servant_dropTxt" + this._lastDropIdx);
        this._dropBtnList.push(this._dropDownBtn);
        this._dropDownFlag = BaseBitmap.create("servant_dropIcon");
        this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height / 2;
        this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width - this._dropDownFlag.width - 3;
        this._dropDownFlag.y = this._dropDownBtn.y + this._dropDownBtn.height - this._dropDownFlag.height / 2 - 2;
        this._nodeContainer.addChild(this._dropDownFlag);
        this._dropDownContainer = new BaseDisplayObjectContainer();
        this._dropDownContainer.visible = false;
        this._dropDownContainer.x = this._dropDownBtn.x;
        this._dropDownContainer.y = this._dropDownBtn.y + this._dropDownBtn.height;
        var dropCfg = [
            "servant_dropTxt1",
            "servant_dropTxt2", "servant_dropTxt3", "servant_dropTxt4"
        ];
        for (var index = 1; index <= dropCfg.length; index++) {
            var tmpBtn = ComponentManager.getButton("servant_sortbtn", "", this.dropDownBtnClickHandler, this, [index], 3);
            this._dropBtnList.push(tmpBtn);
            tmpBtn.setColor(ServantView.DROPBTN_COLOR1);
            tmpBtn.setBold(false);
            tmpBtn.y = tmpBtn.height * (index - 2);
            if (index == 1) {
                tmpBtn.visible = false;
            }
            this._dropDownContainer.addChild(tmpBtn);
            tmpBtn.setText(dropCfg[index - 1]);
        }
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - scroY - 100);
        var keys = Api.servantVoApi.getServantInfoIdListWithSort(this._lastDropIdx);
        this._scrollList = ComponentManager.getScrollList(ServantScrollItem, keys, rect);
        this._scrollList.x = GameConfig.stageWidth / 2 - (194 * 3 + 8 * 2) / 2;
        this._scrollList.y = scroY - 15;
        this._nodeContainer.addChild(this._scrollList);
        this._nodeContainer.addChild(this._dropDownContainer);
        // Api.rookieVoApi.checkNextStep();
        // let bottom = BaseBitmap.create("public_daoju_bg01");
        // bottom.x = GameConfig.stageWidth/2 - bottom.width/2;
        // bottom.y = GameConfig.stageHeigth-bottom.height;//-221;
        // this.addChild(bottom);
        // ViewController.getInstance().openView(ViewConst.BASE.SERVANTADVANCEVIEW,"1007")
    };
    ServantView.prototype.dropDownBtnClickHandler = function (btnIdx) {
        var tmpIdx = this._lastDropIdx;
        for (var index = 1; index < this._dropBtnList.length; index++) {
            this._dropBtnList[index].updateButtonImage(BaseButton.BTN_STATE1);
        }
        this._dropBtnList[this._lastDropIdx].updateButtonImage(BaseButton.BTN_STATE2);
        if (this._dropDownContainer.visible) {
            this._dropDownFlag.scaleY = 1;
            this._dropDownContainer.visible = false;
        }
        else {
            this._dropDownFlag.scaleY = -1;
            this._dropDownContainer.visible = true;
        }
        if (btnIdx > 0) {
            this._dropDownBtn.setText("servant_dropTxt" + btnIdx);
            this._lastDropIdx = btnIdx;
        }
        if (tmpIdx == this._lastDropIdx) {
            return;
        }
        //排序数据，刷新列表
        var keys = Api.servantVoApi.getServantInfoIdListWithSort(btnIdx);
        this._scrollList.refreshData(keys);
    };
    ServantView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_dropBtn", "servant_dropBtn_down",
            "servant_star",
            "servant_topnumbg",
            "servant_middlebg",
            "servant_1",
            "arena_bottom_bg",
            "servant_huawenleft",
            "servant_wenzibutiao",
            "progress_type1_bg",
            "progress_type1_yellow",
            "commonview_woodbg",
            "commonview_border3",
            "commonview_redtitle",
            "servant_sortbtn"
        ]);
    };
    // 背景图名称
    ServantView.prototype.getBgName = function () {
        return "commonview_woodbg";
    };
    ServantView.prototype.hide = function () {
        if (this._lastDropIdx != Api.otherInfoVoApi.getServantSortId()) {
            NetManager.request(NetRequestConst.REQUEST_OTHER_RECORDSERVANTSORT, { sortId: this._lastDropIdx });
        }
        _super.prototype.hide.call(this);
    };
    ServantView.prototype.getRuleInfo = function () {
        return "servant_description";
    };
    ServantView.prototype.dispose = function () {
        Api.mainTaskVoApi.isKeepGuide = false;
        Api.mainTaskVoApi.hideGuide();
        this._nodeContainer = null;
        this._dropDownContainer = null;
        this._scrollList = null;
        this._dropDownBtn = null;
        this._dropDownFlag = null;
        this._dropBtnList = null;
        this._lastDropIdx = 1;
        _super.prototype.dispose.call(this);
    };
    ServantView.DROPBTN_COLOR1 = 0xfffcd8;
    ServantView.DROPBTN_COLOR2 = 0x99a3b4;
    return ServantView;
}(CommonView));
__reflect(ServantView.prototype, "ServantView");
