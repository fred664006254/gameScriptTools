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
 * 冲榜
 * author dky
 * date 2018/2/27
 * @class RankActiveScrollItem
 */
var RankActiveScrollItem = (function (_super) {
    __extends(RankActiveScrollItem, _super);
    function RankActiveScrollItem() {
        var _this = _super.call(this) || this;
        _this._acName = null;
        return _this;
    }
    RankActiveScrollItem.prototype.initItem = function (index, acVo) {
        this._acVo = acVo;
        this.width = 636;
        this.height = 340 + this.getSpaceY();
        var bg = BaseBitmap.create("activity_rank_listbg");
        // bg.x = 15;
        // bg.width =606;
        // bg.height =315; 
        this.addChild(bg);
        var acBgStr = "rankactive_bg_" + acVo.atype;
        var acBg = BaseLoadBitmap.create(acBgStr);
        this.addChild(acBg);
        acBg.x = this.width / 2 - 578 / 2;
        acBg.y = 43;
        // let nameBg:BaseBitmap = BaseBitmap.create("activity_charge_red");
        // nameBg.x = 15;
        // nameBg.y = 8; 
        // this.addChild(nameBg);
        //韩国开服特殊版本  权势冲榜
        var acNameStr = "rankactive_name_" + acVo.atype;
        if (this._acVo.code.toString() == "51") {
            acNameStr = "rankactive_name_1-1";
        }
        else if (this._acVo.code.toString() == "52") {
            acNameStr = "rankactive_name_2-1";
        }
        var nameComplete = function (container) {
            console.log("nameComplete", this._acName.width);
            this._acName.x = this.width / 2 - this._acName.width / 2;
            this._acName.y = bg.y + 14 - this._acName.height / 2;
        };
        var acName = BaseLoadBitmap.create(acNameStr, null, { callback: nameComplete, callbackThisObj: this });
        this._acName = acName;
        this.addChild(acName);
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(acVo.aid, String(acVo.code));
        var rankDescTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN_NEW);
        // rankDescTxt.width = 440;
        // rankDescTxt.multiline = true;
        rankDescTxt.lineSpacing = 3;
        rankDescTxt.text = LanguageManager.getlocal("acRankActiveDesc" + acVo.atype, [rankcfg.getMaxRangValue()]);
        rankDescTxt.x = 33;
        rankDescTxt.y = 223;
        this.addChild(rankDescTxt);
        var acTimeTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN_NEW);
        var stTxt = App.DateUtil.getFormatBySecond(acVo.st, 7);
        var etTxt = App.DateUtil.getFormatBySecond(acVo.et - 86400, 7);
        var timeStr = App.DateUtil.getOpenLocalTime(acVo.st, acVo.et, true);
        // acTimeTxt.multiline = true;
        acTimeTxt.lineSpacing = 3;
        // acTimeTxt.width = activity_rank_rightBg2.width - 50;
        acTimeTxt.text = acVo.getAcLocalTime(true);
        //  LanguageManager.getlocal("acRank_actime",[timeStr]);
        // this.acVo.acLocalCountDown;
        acTimeTxt.x = 33;
        acTimeTxt.y = rankDescTxt.y + rankDescTxt.height + 3;
        this.addChild(acTimeTxt);
        var deltaT = acVo.et - 86400 - GameData.serverTime;
        var acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN_NEW);
        this._acCDTxt = acCDTxt;
        if (this._acCDTxt && deltaT > 0) {
            var showType = 8;
            if (PlatformManager.checkIsViSp()) {
                showType = 1;
            }
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [App.DateUtil.getFormatBySecond(deltaT, showType)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [LanguageManager.getlocal("acRank_acCDEnd")]);
        }
        acCDTxt.x = 33;
        acCDTxt.y = acTimeTxt.y + acTimeTxt.height + 3;
        ;
        this.addChild(acCDTxt);
        var rankListBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acRank_enter", this.rankListBtnHandler, this);
        rankListBtn.x = 475;
        rankListBtn.y = 250;
        this.addChild(rankListBtn);
        //产出跨服
        if (rankcfg.isCross == 1 || rankcfg.isCross == 2) {
            var crossTip = BaseLoadBitmap.create("atkracecross_tip");
            crossTip.setPosition(370, 43);
            this.addChild(crossTip);
        }
        TickManager.addTick(this.tick, this);
    };
    RankActiveScrollItem.prototype.tick = function () {
        var deltaT = this._acVo.et - 86400 - GameData.serverTime;
        if (this._acCDTxt && deltaT > 0) {
            var showType = 8;
            if (PlatformManager.checkIsViSp()) {
                showType = 1;
            }
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [App.DateUtil.getFormatBySecond(deltaT, showType)]);
            // return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [LanguageManager.getlocal("acRank_acCDEnd")]);
        }
    };
    RankActiveScrollItem.prototype.rankListBtnHandler = function (event) {
        ViewController.getInstance().openView("Ac" + App.StringUtil.firstCharToUper(this._acVo.aid) + "View", this._acVo.code);
    };
    RankActiveScrollItem.prototype.refreshData = function (id) {
        var wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);
        this._intimacyTF.text = wifeInfo.intimacy.toString();
        this._glamourTF.text = wifeInfo.glamour.toString();
    };
    RankActiveScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    RankActiveScrollItem.prototype.dispose = function () {
        this._intimacyTF = null;
        this._glamourTF = null;
        this._wifeInfoVo = null;
        this._acVo = null;
        this._acCDTxt = null;
        this._acName = null;
        TickManager.removeTick(this.tick, this);
        _super.prototype.dispose.call(this);
    };
    return RankActiveScrollItem;
}(ScrollListItem));
__reflect(RankActiveScrollItem.prototype, "RankActiveScrollItem");
