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
* 编号查询
* date 2020.5.13
* author ycg
* @name SixSection1SeatInfoPopupViewTab4
*/
var SixSection1SeatInfoPopupViewTab4 = (function (_super) {
    __extends(SixSection1SeatInfoPopupViewTab4, _super);
    function SixSection1SeatInfoPopupViewTab4(data) {
        var _this = _super.call(this) || this;
        _this._inputTextField = null;
        _this._scrollList = null;
        _this._playerInfo = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    SixSection1SeatInfoPopupViewTab4.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_SIXSECTION1_SEARCH, this.searchRequestCallback, this);
        this.width = 530;
        this.height = 675;
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 675;
        bg.x = 26;
        bg.y = 55;
        this.addChild(bg);
        var searchTitle = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoSearchTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        searchTitle.setPosition(bg.x + 20, bg.y + 20);
        this.addChild(searchTitle);
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL, 330, 44, "public_9_bg5", LanguageManager.getlocal("sixSection1SeatInfoSearchNumber"), 0xb1b1b1);
        inputTF.setPosition(searchTitle.x, searchTitle.y + searchTitle.height + 10);
        this.addChild(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.restrict = "0-9";
        this._inputTextField.maxChars = 40;
        var searchBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "sixSection1SeatInfoSearchBtnName", this.searchBtnClick, this);
        searchBtn.setPosition(inputTF.x + inputTF.width + 10, inputTF.y + inputTF.height / 2 - searchBtn.height / 2);
        this.addChild(searchBtn);
        var playerInfo = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        playerInfo.setPosition(bg.x + 20, inputTF.y + inputTF.height + 15);
        this.addChild(playerInfo);
        this._playerInfo = playerInfo;
        var line = BaseBitmap.create("settingview_line");
        line.setPosition(bg.x + bg.width / 2 - line.width / 2, playerInfo.y + 25);
        this.addChild(line);
        var data = [];
        var scrollList = ComponentManager.getScrollList(SixSection1SeatInfoScrollItem4, data, new egret.Rectangle(0, 0, bg.width, bg.height - (line.y - bg.y) - 10 - line.height));
        scrollList.setPosition(bg.x, line.y + line.height + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        var tipBg = BaseBitmap.create("sixsection1_popbottombg");
        tipBg.setPosition(bg.x + bg.width / 2 - tipBg.width / 2, bg.y + bg.height - 105);
        this.addChild(tipBg);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1SeatInfoSearchBottomTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(tipBg.x + tipBg.width / 2 - tip.width / 2, tipBg.y + tipBg.height - 38);
        this.addChild(tip);
        var searchInfo = Api.sixsection1VoApi.getSearchInfo();
        if (searchInfo && searchInfo.uid) {
            if (searchInfo.st + 3 * 86400 > GameData.serverTime) {
                var dataList = this.refreshDataList(searchInfo);
                var svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(searchInfo.uid);
                this._playerInfo.text = LanguageManager.getlocal("sixSection1SeatInfoSearchInfo", ["" + searchInfo.name, "" + svNameStr]);
                if (dataList.length > 0) {
                    this._scrollList.refreshData(dataList);
                }
                else {
                    this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
                }
            }
        }
    };
    SixSection1SeatInfoPopupViewTab4.prototype.searchBtnClick = function () {
        if (!this._inputTextField.text) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SeatInfoSearchEmpty"));
            return;
        }
        var playerId = Api.playerVoApi.getPlayerID();
        if (this._inputTextField.text == String(playerId)) {
            // this._inputTextField.text = "";
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SeatInfoSearchPlayerTip"));
            return;
        }
        var itemId = Config.Sixsection1Cfg.item3;
        var itemCfg = Config.ItemCfg.getItemCfgById(itemId);
        var itemVo = Api.itemVoApi.getItemInfoVoById(itemId);
        var num = 0;
        if (itemVo) {
            num = itemVo.num;
        }
        var message = LanguageManager.getlocal("sixSection1SeatInfoSearchTip", [itemCfg.name, String(1)]);
        var mesObj = {
            confirmCallback: this.searchEnterCallback,
            handler: this,
            icon: itemCfg.icon,
            iconBg: itemCfg.iconBg,
            num: num,
            useNum: 1,
            msg: message,
            id: itemId,
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    SixSection1SeatInfoPopupViewTab4.prototype.searchEnterCallback = function () {
        App.LogUtil.log("text " + this._inputTextField.text);
        var itemId = Config.Sixsection1Cfg.item3;
        var itemCfg = Config.ItemCfg.getItemCfgById(itemId);
        var itemVo = Api.itemVoApi.getItemInfoVoById(itemId);
        var num = 0;
        if (itemVo) {
            num = itemVo.num;
        }
        if (num < 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1HoldTitleToolNotFull", [itemCfg.name]));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_SIXSECTION1_SEARCH, { fuid: this._inputTextField.text });
    };
    SixSection1SeatInfoPopupViewTab4.prototype.searchRequestCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        if (rData.SS1stat && rData.SS1stat == 4) {
            App.CommonUtil.showTip(LanguageManager.getlocal("sixSection1SeatInfoSearchNotExist"));
            return;
        }
        // console.log("searchRequestCallback ",rData);
        // let dataList = this.refreshDataList(rData);
        // if (dataList.length > 0){
        //     let svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(dataList[0].data.uid);
        //     this._playerInfo.text = LanguageManager.getlocal("sixSection1SeatInfoSearchInfo", [""+dataList[0].data.name, ""+svNameStr]);
        // }
        // else{
        //     this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        // }
        // this._scrollList.refreshData(dataList);
        var searchInfo = Api.sixsection1VoApi.getSearchInfo();
        if (searchInfo && searchInfo.uid) {
            var dataList = this.refreshDataList(searchInfo);
            var svNameStr = Api.mergeServerVoApi.getAfterMergeSeverName(searchInfo.uid);
            this._playerInfo.text = LanguageManager.getlocal("sixSection1SeatInfoSearchInfo", ["" + searchInfo.name, "" + svNameStr]);
            if (dataList.length <= 0) {
                this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
            }
            else {
                this._scrollList.refreshData(dataList);
            }
        }
    };
    SixSection1SeatInfoPopupViewTab4.prototype.refreshDataList = function (data) {
        var dataList = [];
        var buildData = data.build;
        if (buildData && buildData.length > 0) {
            for (var i = 0; i < buildData.length; i++) {
                var buildCfg = Api.sixsection1VoApi.getBuildCfgByLine(buildData[i].x);
                var et = buildData[i].st + Math.ceil(buildData[i].remain * 3600 / buildCfg.baseCfg.shujijingyanSpeed);
                dataList.push({ data: buildData[i], et: et, buildCfg: buildCfg, type: "build", index: buildCfg.baseCfg.index, st: data.st });
            }
        }
        if (dataList.length > 1) {
            dataList.sort(function (a, b) {
                if (a.index == b.index) {
                    return b.et - a.et;
                }
                return a.index - b.index;
            });
        }
        var dirData = [];
        if (data.director && Object.keys(data.director).length > 0) {
            var buildCfg = Api.sixsection1VoApi.getTitleCfgByLine(data.director.x);
            dirData.push({ data: data.director, buildCfg: buildCfg, type: "director", st: data.st });
        }
        if (dirData.length > 0) {
            var list = dirData.concat(dataList);
            console.log("list ", list);
            return list;
        }
        console.log("datalist ", dataList);
        return dataList;
    };
    SixSection1SeatInfoPopupViewTab4.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_SIXSECTION1_SEARCH, this.searchRequestCallback, this);
        this._inputTextField = null;
        this._scrollList = null;
        this._playerInfo = null;
        _super.prototype.dispose.call(this);
    };
    return SixSection1SeatInfoPopupViewTab4;
}(CommonViewTab));
__reflect(SixSection1SeatInfoPopupViewTab4.prototype, "SixSection1SeatInfoPopupViewTab4");
//# sourceMappingURL=SixSection1SeatInfoPopupViewTab4.js.map