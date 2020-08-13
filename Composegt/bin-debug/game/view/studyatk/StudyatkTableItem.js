/**
 * 练武场
 * author yanyuling
 * date 2017/11/28
 * @class StudyatkTableItem
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
var StudyatkTableItem = (function (_super) {
    __extends(StudyatkTableItem, _super);
    function StudyatkTableItem() {
        var _this = _super.call(this) || this;
        _this._atkData = undefined;
        _this._npcList = [];
        _this._isOver = false;
        _this.init();
        return _this;
    }
    StudyatkTableItem.prototype.init = function () {
        var tableImg = BaseBitmap.create("studyatk_table");
        this.addChild(tableImg);
        this._tableImg = tableImg;
        var masterBg = BaseBitmap.create("atkrace_arrest_bg_di");
        masterBg.width = 230;
        masterBg.height = 65;
        masterBg.x = tableImg.x + tableImg.width / 2 - masterBg.width / 2 - 5;
        masterBg.y = tableImg.y + tableImg.height / 2 - masterBg.height / 2 - 25;
        this.addChild(masterBg);
        var master = BaseBitmap.create("studyatk_master");
        master.x = masterBg.x + 10;
        master.y = masterBg.y + masterBg.height / 2 - master.height / 2;
        this.addChild(master);
        this._cdTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        this._cdTxt.x = 40;
        this._cdTxt.y = masterBg.y - 10;
        this.addChild(this._cdTxt);
        var nameTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        nameTxt.x = this._cdTxt.x;
        nameTxt.y = this._cdTxt.y + 25;
        this.addChild(nameTxt);
        this._nameTxt = nameTxt;
        var allianceTitle = ComponentManager.getTextField(LanguageManager.getlocal("studyatkAllianeTitle"), 20, TextFieldConst.COLOR_WHITE);
        allianceTitle.x = this._cdTxt.x;
        allianceTitle.y = this._nameTxt.y + 25;
        this.addChild(allianceTitle);
        var allianceTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        allianceTxt.x = this._cdTxt.x;
        allianceTxt.y = allianceTitle.y + 25;
        this.addChild(allianceTxt);
        this._allianceTxt = allianceTxt;
        this.addTouchTap(this.enterAtkDetail, this);
        TickManager.addTick(this.tick, this);
    };
    StudyatkTableItem.prototype.refreshUI = function (atkdata) {
        this._atkData = atkdata;
        if (this._atkData.allianceid && this._atkData.allianceid > 0) {
            this._tableImg.setRes("studyatk_table_2");
            if (!this._allianceNameBg) {
                this._allianceNameBg = BaseBitmap.create("public_lvupbigbg");
                this._allianceNameBg.x = this._tableImg.x + this._tableImg.width / 2 - this._allianceNameBg.width / 2; //this.width/2 - this._allianceNameBg.width/2;
                this._allianceNameBg.y = this._tableImg.y + 10 - this._allianceNameBg.height / 2; //- this._allianceNameBg.height/2;
                this.addChild(this._allianceNameBg);
            }
            if (!this._allianceName) {
                this._allianceName = ComponentManager.getTextField(LanguageManager.getlocal("studyatkAllianceType"), 20, 0xffea9c);
                this._allianceName.x = this._allianceNameBg.x + this._allianceNameBg.width / 2 - this._allianceName.width / 2;
                this._allianceName.y = this._allianceNameBg.y + this._allianceNameBg.height / 2 - this._allianceName.height / 2;
                this.addChild(this._allianceName);
            }
            this._allianceNameBg.visible = true;
            this._allianceName.visible = true;
        }
        else {
            this._tableImg.setRes("studyatk_table");
            if (this._allianceNameBg) {
                this._allianceNameBg.visible = false;
            }
            if (this._allianceName) {
                this._allianceName.visible = false;
            }
        }
        var studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg;
        this._cdEndSec = this._atkData.create_time + studyAtkBaseCfg.lastTime;
        var posList = [
            { x: 15, y: -10 },
            { x: 190, y: -10 },
            { x: 15, y: 150 },
            { x: 190, y: 155 },
        ];
        for (var key in this._npcList) {
            this._npcList[key].visible = false;
        }
        var len = Object.keys(this._atkData.minfo).length + 1;
        for (var index = 0; index < len; index++) {
            var npc = this._npcList[index];
            if (!npc) {
                npc = BaseBitmap.create("studyatk_table_npc");
                npc.x = posList[index].x;
                npc.y = posList[index].y;
                this.addChild(npc);
                this._npcList.push(npc);
                if (index % 2 == 1) {
                    npc.scaleX = -1;
                }
            }
            npc.visible = true;
        }
        this._nameTxt.text = this._atkData.name;
        var str1 = LanguageManager.getlocal("officialTitle" + this._atkData.level);
        var leftTimt = this._cdEndSec - GameData.serverTime;
        this._cdTxt.text = LanguageManager.getlocal("studyatk_itemCdTxt", [str1, App.DateUtil.getFormatBySecond(leftTimt, 3)]);
        var allianceName = this._atkData.mygname;
        if (allianceName == "") {
            allianceName = LanguageManager.getlocal("allianceRankNoAlliance");
        }
        this._allianceTxt.text = allianceName;
        TickManager.removeTick(this.tick, this);
        TickManager.addTick(this.tick, this);
    };
    StudyatkTableItem.prototype.enterAtkDetail = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKDETAILVIEW, this._atkData);
    };
    StudyatkTableItem.prototype.tick = function () {
        var leftTimt = this._cdEndSec - GameData.serverTime;
        if (leftTimt < 0) {
            leftTimt = 0;
        }
        if (leftTimt >= 0) {
            // let studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg;
            if (this._cdTxt) {
                var str1 = LanguageManager.getlocal("officialTitle" + this._atkData.level);
                this._cdTxt.text = LanguageManager.getlocal("studyatk_itemCdTxt", [str1, App.DateUtil.getFormatBySecond(leftTimt, 3)]);
            }
            if (leftTimt == 0 && !this._isOver) {
                this._isOver = true;
                // 是否需要同步？
                NetManager.request(NetRequestConst.REQUEST_STUDYATK_INDEX, {});
            }
            return true;
        }
        return false;
    };
    StudyatkTableItem.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        this._nodeContainer = null;
        this._atkData = null;
        this._cdTxt = null;
        this._cdEndSec = null;
        this._nameTxt = null;
        this._allianceTxt = null;
        this._tableImg = null;
        this._allianceNameBg = null;
        this._allianceName = null;
        this._isOver = false;
        _super.prototype.dispose.call(this);
    };
    return StudyatkTableItem;
}(BaseDisplayObjectContainer));
__reflect(StudyatkTableItem.prototype, "StudyatkTableItem");
