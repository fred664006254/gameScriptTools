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
 * 头像框切换
 * date 2019.11.20
 * author ycg
 * @class TitleChangePopupView
 */
var TitleChangePopupView = (function (_super) {
    __extends(TitleChangePopupView, _super);
    function TitleChangePopupView() {
        var _this = _super.call(this) || this;
        _this._itemContainer = null;
        _this._titleId = null;
        _this._itemList = [];
        _this._leftBtn = null;
        _this._rightBtn = null;
        _this._currPage = 1;
        _this._maxPageNum = 0;
        _this._onePageNum = 3;
        _this._selectIndex = -1;
        _this._titleCfg = null;
        _this._titleInfo = null;
        _this._useBtn = null;
        _this._isSelected = false;
        _this._isFirstFresh = false;
        return _this;
    }
    TitleChangePopupView.prototype.initView = function () {
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ITEM,this.refresh,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_TITLE, this.useCallback, this);
        var titleId = this.param.data.id;
        this._titleId = titleId;
        var titleCfg = Config.TitleCfg.getTitleCfgById(titleId);
        var titleInfo = Api.itemVoApi.getTitleInfoVoById(this._titleId);
        this._titleCfg = titleCfg;
        this._titleInfo = titleInfo;
        this._maxPageNum = Math.ceil(titleCfg.changePic.length / this._onePageNum);
        var topBg = BaseBitmap.create("title_change_topbg");
        topBg.width = 538;
        topBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topBg.width / 2, 0);
        this.addChildToContainer(topBg);
        var topMsgStr = "titleChangeTitleTopMsg";
        //头像框
        if (titleCfg.isTitle == 2) {
            topMsgStr = "titleChangeHeadTopMsg";
        }
        //顶部描述
        var topMsg = ComponentManager.getTextField(LanguageManager.getlocal(topMsgStr), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        topMsg.width = topBg.width - 20;
        topMsg.lineSpacing = 5;
        topMsg.setPosition(topBg.x + topBg.width / 2 - topMsg.width / 2, topBg.y + 10);
        this.addChildToContainer(topMsg);
        //bg
        var bg = BaseBitmap.create("title_change_bg");
        bg.setPosition(topBg.x + topBg.width / 2 - bg.width / 2, topBg.y + topBg.height + 3);
        this.addChildToContainer(bg);
        //当前等级
        var currLevel = ComponentManager.getTextField(LanguageManager.getlocal("titleChangeCurrLevel", ["" + titleInfo.lv]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        currLevel.setPosition(bg.x + bg.width / 2 - currLevel.width / 2, bg.y + 12);
        this.addChildToContainer(currLevel);
        //leftBtn
        var leftBtn = ComponentManager.getButton("btn_leftpage", "", this.pageChangeBtnClick, this, ["left"]);
        leftBtn.anchorOffsetX = leftBtn.width / 2;
        leftBtn.anchorOffsetY = leftBtn.height / 2;
        leftBtn.setScale(0.8);
        leftBtn.setPosition(bg.x + leftBtn.width / 2 + 5, bg.y + bg.height / 2 + 8);
        this.addChildToContainer(leftBtn);
        leftBtn.visible = false;
        this._leftBtn = leftBtn;
        //rightBtn
        var rightBtn = ComponentManager.getButton("btn_leftpage", "", this.pageChangeBtnClick, this, ["right"]);
        rightBtn.anchorOffsetX = rightBtn.width / 2;
        rightBtn.anchorOffsetY = rightBtn.height / 2;
        rightBtn.scaleX = -0.8;
        rightBtn.scaleY = 0.8;
        rightBtn.setPosition(bg.x + bg.width - rightBtn.width / 2 - 5, bg.y + bg.height / 2 + 8);
        this.addChildToContainer(rightBtn);
        this._rightBtn = rightBtn;
        //item
        var itemContainer = new BaseDisplayObjectContainer();
        itemContainer.width = bg.width - 110;
        itemContainer.height = bg.height - 52;
        itemContainer.setPosition(bg.x + bg.width / 2 - itemContainer.width / 2, bg.y + 42);
        this.addChildToContainer(itemContainer);
        this._itemContainer = itemContainer;
        //装扮按钮
        var useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "titleChangeUseBtnName", this.useBtnClick, this);
        useBtn.setPosition(bg.x + bg.width / 2 - useBtn.width / 2, bg.y + bg.height + 10);
        this._useBtn = useBtn;
        this.addChildToContainer(useBtn);
        this.initItems();
        var currIndex = this.getCurrTitlePageInfo();
        App.LogUtil.log("currIndex: " + currIndex);
        if (currIndex) {
            this._currPage = Math.ceil(currIndex / this._onePageNum);
            var index = currIndex % this._onePageNum;
            if (index == 0) {
                index = 2;
            }
            else {
                index = index - 1;
            }
            this.freshItems(index);
        }
        else {
            this.clickItem(null, 0);
        }
        App.LogUtil.log("_currPage: " + this._currPage);
        if (this._currPage == this._maxPageNum) {
            if (this._maxPageNum == 1) {
                this._rightBtn.visible = false;
                this._leftBtn.visible = false;
            }
            else {
                this._rightBtn.visible = false;
                this._leftBtn.visible = true;
            }
        }
    };
    //初始化item
    TitleChangePopupView.prototype.initItems = function () {
        var posX = 6;
        for (var i = 0; i < this._onePageNum; i++) {
            var level = this._titleCfg.changePic[i];
            var item = new TitleChangeItem();
            item.init(i, level, this._titleId);
            item.x = posX + (item.width + 20) * i;
            item.y = 15;
            this._itemContainer.addChild(item);
            var bg = item.getChildByName("bg");
            bg.addTouchTap(this.clickItem, this, [i]);
            this._itemList.push(item);
        }
        this._isFirstFresh = true;
    };
    TitleChangePopupView.prototype.freshItems = function (selIndex) {
        var currIndex = (this._currPage - 1) * this._onePageNum;
        var itemListLen = this._itemList.length;
        var dataLength = this._titleCfg.changePic.length;
        for (var i = 0; i < itemListLen; i++) {
            var index = currIndex + i;
            this._itemList[i].visible = false;
            if (index < dataLength) {
                this._itemList[i].visible = true;
                var level = this._titleCfg.changePic[currIndex + i];
                this._itemList[i].fresh(level, this._titleId);
            }
        }
        this._isFirstFresh = true;
        var sel = selIndex ? selIndex : 0;
        this.clickItem(null, sel);
    };
    TitleChangePopupView.prototype.clickItem = function (target, index) {
        App.LogUtil.log("clickItemaaa: " + index);
        var currIndex = (this._currPage - 1) * this._onePageNum + index;
        var selLevel = this._titleCfg.changePic[currIndex];
        if (this._selectIndex != -1) {
            this._itemList[this._selectIndex].setSelect(false);
        }
        this._selectIndex = index;
        this._itemList[index].setSelect(true);
        if (this._titleInfo.num >= 0) {
            if (this._titleInfo.lv >= selLevel) {
                var usingIndex = this.getCurrTitlePageInfo();
                if (this._titleCfg.isTitle == 2) {
                    var pTitle = Api.playerVoApi.getPlayerPtitle();
                    var usingLevel = pTitle.plv;
                    if (usingIndex) {
                        usingLevel = this._titleCfg.changePic[usingIndex - 1];
                    }
                    if (pTitle.ptitle && pTitle.ptitle == String(this._titleId) && usingLevel == selLevel) {
                        this._useBtn.setEnable(false);
                    }
                    else {
                        this._useBtn.setEnable(true);
                    }
                }
                else if (this._titleCfg.isTitle == 1 || this._titleCfg.isTitle == 4) {
                    var titleData = Api.playerVoApi.getTitleInfo();
                    var usingLevel = titleData.tlv;
                    if (usingIndex) {
                        usingLevel = this._titleCfg.changePic[usingIndex - 1];
                    }
                    if (titleData.title && titleData.title == String(this._titleId) && usingLevel == selLevel) {
                        this._useBtn.setEnable(false);
                    }
                    else {
                        this._useBtn.setEnable(true);
                    }
                }
            }
            else {
                this._useBtn.setEnable(false);
                if (this._isFirstFresh == false) {
                    if (this._titleCfg.isTitle == 2) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("titleChangeNotGetTip1"));
                    }
                    else if (this._titleCfg.isTitle == 1 || this._titleCfg.isTitle == 4) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("titleChangeNotGetTip2"));
                    }
                }
            }
        }
        else {
            //暂未获得
            this._useBtn.setEnable(false);
            if (this._isFirstFresh == false) {
                if (this._titleCfg.isTitle == 2) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("titleChangeNotGetTip1"));
                }
                else if (this._titleCfg.isTitle == 1 || this._titleCfg.isTitle == 4) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("titleChangeNotGetTip2"));
                }
            }
        }
        this._isFirstFresh = false;
    };
    TitleChangePopupView.prototype.getCurrTitlePageInfo = function () {
        if (this._titleCfg.isTitle == 2) {
            var pTitle = Api.playerVoApi.getPlayerPtitle();
            if (String(this._titleId) == pTitle.ptitle) {
                var index = 0;
                for (var i = 0; i < this._titleCfg.changePic.length; i++) {
                    var tmplv = Number(this._titleCfg.changePic[i]);
                    if (pTitle.plv >= tmplv) {
                        index = Number(i) + 1;
                    }
                }
                return index;
            }
        }
        else if (this._titleCfg.isTitle == 1 || this._titleCfg.isTitle == 4) {
            var titleData = Api.playerVoApi.getTitleInfo();
            if (String(this._titleId) == titleData.title) {
                var index = 0;
                for (var i = 0; i < this._titleCfg.changePic.length; i++) {
                    var tmplv = Number(this._titleCfg.changePic[i]);
                    if (titleData.tlv >= tmplv) {
                        index = Number(i) + 1;
                    }
                }
                return index;
            }
        }
        return null;
    };
    //装配按钮
    TitleChangePopupView.prototype.useBtnClick = function () {
        // 
        this._isSelected = true;
        var currIndex = (this._currPage - 1) * this._onePageNum + this._selectIndex;
        var selLevel = this._titleCfg.changePic[currIndex];
        NetManager.request(NetRequestConst.REQUEST_ITEM_TITLE, { "titleid": this._titleId, "status": 2, "showLv": selLevel });
    };
    TitleChangePopupView.prototype.useCallback = function (evt) {
        this._isSelected = false;
        if (evt && evt.data && evt.data.ret) {
            //刷新
            var baseView = ViewController.getInstance().getView("TitleLevelDetailPopupView");
            this.hide();
            baseView.hide();
        }
    };
    TitleChangePopupView.prototype.refresh = function () {
        App.LogUtil.log("titlechange refresh item_model");
        // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGE_IMG);
    };
    //翻页按钮
    TitleChangePopupView.prototype.pageChangeBtnClick = function (tag) {
        if (tag == "right") {
            this._currPage += 1;
            if (this._currPage >= this._maxPageNum) {
                this._currPage = this._maxPageNum;
                this._rightBtn.visible = false;
                this._leftBtn.visible = true;
            }
        }
        else if (tag == "left") {
            this._currPage -= 1;
            if (this._currPage <= 1) {
                this._currPage = 1;
                this._rightBtn.visible = true;
                this._leftBtn.visible = false;
            }
        }
        App.LogUtil.log("this._currPage: " + this._currPage);
        this.freshItems();
    };
    TitleChangePopupView.prototype.getShowHeight = function () {
        return 540;
    };
    TitleChangePopupView.prototype.getTitleStr = function () {
        return "titleChangePopupTitle";
    };
    TitleChangePopupView.prototype.getResourceList = function () {
        var list = [];
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_in", "wifeview_noget",
        ]).concat(list);
    };
    TitleChangePopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_TITLE, this.useCallback, this);
        this._itemContainer = null;
        this._titleId = null;
        this._itemList = [];
        this._leftBtn = null;
        this._rightBtn = null;
        this._currPage = 1;
        this._maxPageNum = 0;
        this._onePageNum = 3;
        this._selectIndex = -1;
        this._titleCfg = null;
        this._titleInfo = null;
        this._useBtn = null;
        this._isSelected = false;
        _super.prototype.dispose.call(this);
    };
    return TitleChangePopupView;
}(PopupView));
__reflect(TitleChangePopupView.prototype, "TitleChangePopupView");
//# sourceMappingURL=TitleChangePopupView.js.map