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
        _this.init();
        return _this;
    }
    StudyatkTableItem.prototype.init = function () {
        var tableImg = BaseBitmap.create("studyatk_table");
        this.addChild(tableImg);
        var masterBg = BaseBitmap.create("studyatk_master_bg");
        masterBg.width = 205;
        masterBg.height = 60;
        masterBg.x = tableImg.x + tableImg.width / 2 - masterBg.width / 2 - 5;
        masterBg.y = tableImg.y + tableImg.height / 2 - masterBg.height / 2 - 25;
        this.addChild(masterBg);
        this._cdTxt = ComponentManager.getTextField("", 20);
        this._cdTxt.x = 50;
        this._cdTxt.y = masterBg.y + 7;
        this.addChild(this._cdTxt);
        var nameTxt = ComponentManager.getTextField("", 20);
        nameTxt.x = this._cdTxt.x;
        nameTxt.y = this._cdTxt.y + 25;
        this.addChild(nameTxt);
        this._nameTxt = nameTxt;
        var master = BaseBitmap.create("studyatk_master");
        master.x = masterBg.x + 10;
        master.y = masterBg.y + masterBg.height / 2 - master.height / 2;
        this._master = master;
        this.addChild(master);
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang()) {
            this._master.x = -10;
            this._master.y = 35;
            this._cdTxt.x = 20;
            this._nameTxt.x = this._cdTxt.x;
        }
        this.addTouchTap(this.enterAtkDetail, this);
        TickManager.addTick(this.tick, this);
    };
    StudyatkTableItem.prototype.refreshUI = function (atkdata) {
        this._atkData = atkdata;
        var studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg;
        var lasttime = studyAtkBaseCfg.lastTime;
        if (this._atkData.lastTime) {
            lasttime = this._atkData.lastTime;
        }
        this._cdEndSec = this._atkData.create_time + lasttime;
        var posList = [
            { x: 15, y: -10 },
            { x: 190, y: -10 },
            { x: 15, y: 105 },
            { x: 190, y: 105 },
        ];
        for (var key in this._npcList) {
            this._npcList[key].visible = false;
        }
        var len = Object.keys(this._atkData.minfo).length + 1;
        var indexNum = this._master.parent.getChildIndex(this._master);
        for (var index = 0; index < len; index++) {
            var npc = this._npcList[index];
            if (!npc) {
                npc = BaseBitmap.create("studyatk_table_npc");
                npc.x = posList[index].x;
                npc.y = posList[index].y;
                // this.addChild(npc);
                this.addChildAt(npc, indexNum);
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
        TickManager.removeTick(this.tick, this);
        TickManager.addTick(this.tick, this);
    };
    StudyatkTableItem.prototype.enterAtkDetail = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKDETAILVIEW, this._atkData);
    };
    StudyatkTableItem.prototype.tick = function () {
        var leftTimt = this._cdEndSec - GameData.serverTime;
        if (leftTimt >= 0) {
            var studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg;
            var str1 = LanguageManager.getlocal("officialTitle" + this._atkData.level);
            this._cdTxt.text = LanguageManager.getlocal("studyatk_itemCdTxt", [str1, App.DateUtil.getFormatBySecond(leftTimt, 3)]);
            if (leftTimt == 0) {
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
        _super.prototype.dispose.call(this);
    };
    return StudyatkTableItem;
}(BaseDisplayObjectContainer));
__reflect(StudyatkTableItem.prototype, "StudyatkTableItem");
//# sourceMappingURL=StudyatkTableItem.js.map