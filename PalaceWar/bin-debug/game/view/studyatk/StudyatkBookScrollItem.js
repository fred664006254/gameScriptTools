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
 * 武穆遗书 列表节点
 * author yanyuling
 * date 2017/11/30
 * @class StudyatkBookScrollItem
 */
var StudyatkBookScrollItem = (function (_super) {
    __extends(StudyatkBookScrollItem, _super);
    function StudyatkBookScrollItem() {
        var _this = _super.call(this) || this;
        _this._idx = 0;
        return _this;
    }
    StudyatkBookScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE), this.upgradeCallback, this);
        this._idx = index;
        var cfgData = Config.StudyatkCfg.getStudyatkCfgById(data);
        var ability = GameConfig.config.abilityCfg[cfgData.ability];
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 510;
        bg.height = 120;
        bg.x = 5;
        this.addChild(bg);
        var attrIcon = BaseLoadBitmap.create("servant_infoPro" + ability.type);
        attrIcon.width = 80;
        attrIcon.height = 83;
        attrIcon.x = bg.x + 15;
        attrIcon.y = bg.y + bg.height / 2 - attrIcon.height / 2;
        this.addChild(attrIcon);
        // 
        var name = LanguageManager.getlocal("servant_attrNameTxt" + cfgData.ability);
        var strCfg = [
            {
                txt: LanguageManager.getlocal("studyatkBook_txt1", [cfgData.id]),
            },
            {
                txt: LanguageManager.getlocal("studyatkBook_txt2", [name, cfgData.upLv]),
            },
            {
                txt: LanguageManager.getlocal("studyatkBook_txt3", [cfgData.needExp]),
            },
        ];
        var startX = 115;
        var startY = 20;
        for (var index = 0; index < 3; index++) {
            var bookTxt1 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            bookTxt1.text = strCfg[index].txt;
            bookTxt1.x = startX;
            bookTxt1.y = startY;
            bookTxt1.name = "bookTxt" + index;
            this.addChild(bookTxt1);
            startY += 28;
        }
        var lv = Api.studyatkVoApi.getStudySkillInfoLv();
        if (lv <= this._idx) {
            var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "studyatkBook_studyOver", this.btnHandler, this);
            btn.x = bg.x + bg.width - btn.width - 10;
            btn.y = bg.y + bg.height / 2 - btn.height / 2;
            btn.visible = false;
            btn.name = "btn";
            this.addChild(btn);
            this._btn = btn;
        }
        var flagImg = BaseBitmap.create("public_grasp");
        flagImg.width = 131;
        flagImg.height = 86;
        flagImg.x = bg.x + bg.width - flagImg.width - 10;
        flagImg.y = bg.y + bg.height / 2 - flagImg.height / 2;
        this.addChild(flagImg);
        this._flagImg = flagImg;
        if (lv < this._idx) {
            var mask = BaseBitmap.create("public_9_viewmask");
            mask.width = bg.width;
            mask.height = bg.height;
            mask.x = bg.x;
            mask.y = bg.y;
            mask.alpha = 0.7;
            mask.name = "mask";
            this.addChild(mask);
            flagImg.texture = ResourceManager.getRes("public_unlock");
            this._mask = mask;
        }
        this.refreshUI();
    };
    StudyatkBookScrollItem.prototype.refreshUI = function () {
        var lv = Api.studyatkVoApi.getStudySkillInfoLv();
        if (lv == this._idx) {
            this._btn.visible = true;
            this._flagImg.visible = false;
            this.getChildByName("bookTxt2").visible = true;
            if (this._mask)
                this._mask.visible = false;
        }
        else if (lv > this._idx) {
            if (this._btn)
                this._btn.visible = false;
            if (this._mask)
                this._mask.visible = false;
            this._flagImg.texture = ResourceManager.getRes("public_grasp");
            this._flagImg.visible = true;
            this.getChildByName("bookTxt2").visible = true;
        }
        else if (lv < this._idx) {
            if (this._mask)
                this._mask.visible = true;
            this._btn.visible = false;
            this._flagImg.texture = ResourceManager.getRes("public_unlock");
            this._flagImg.visible = true;
            this.getChildByName("bookTxt2").visible = false;
        }
    };
    StudyatkBookScrollItem.prototype.btnHandler = function () {
        var totalExp = Api.studyatkVoApi.getStudySkillInfoTotalExp();
        var cfgData = Config.StudyatkCfg.getStudyatkCfgById(String(this._idx + 1));
        if (totalExp < cfgData.needExp) {
            App.CommonUtil.showTip(LanguageManager.getlocal('studyatkBook_upgradeTip'));
            return;
        }
        StudyatkBookScrollItem.lastUpgradeBookId = cfgData.ability;
        StudyatkBookScrollItem.lastUpgradeIdx = this._idx;
        NetManager.request(NetRequestConst.REQUEST_STUDYATK_UPGRADE, {});
    };
    StudyatkBookScrollItem.prototype.getStars = function (num) {
        var objContainer = new BaseDisplayObjectContainer;
        for (var index = 1; index <= num; index++) {
            var starImg = BaseBitmap.create("servant_star");
            starImg.setScale(0.5);
            starImg.x = (index - 1) * starImg.width * 0.5;
            starImg.y = 0;
            objContainer.addChild(starImg);
        }
        return objContainer;
    };
    StudyatkBookScrollItem.prototype.upgradeCallback = function (event) {
        if (event.data.ret) {
            var rData = event.data.data;
            if (rData.ret == 0 && StudyatkBookScrollItem.lastUpgradeBookId != "") {
                if (this._idx == 0) {
                    var upservants = rData.data.upservants;
                    var tmpBid = StudyatkBookScrollItem.lastUpgradeBookId;
                    ViewController.getInstance().openView(ViewConst.BASE.STUDYATKBOOLLVUPSUCCESSVIEW, [tmpBid, upservants]);
                }
                //是刷新当前和下一级的数据
                if (this._idx == StudyatkBookScrollItem.lastUpgradeIdx) {
                    this.refreshUI();
                }
                if (this._idx == StudyatkBookScrollItem.lastUpgradeIdx + 1) {
                    var tmpNode_1 = this;
                    egret.Tween.get(this, { loop: false }).wait(500).call(function () {
                        tmpNode_1.refreshUI();
                    }, this);
                    StudyatkBookScrollItem.lastUpgradeBookId = "";
                    StudyatkBookScrollItem.lastUpgradeIdx = -1;
                }
            }
        }
    };
    StudyatkBookScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    StudyatkBookScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    StudyatkBookScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_UPGRADE), this.upgradeCallback, this);
        this._idx = null;
        this._flagImg = null;
        this._btn = null;
        this._mask = null;
        _super.prototype.dispose.call(this);
    };
    StudyatkBookScrollItem.lastUpgradeBookId = "";
    StudyatkBookScrollItem.lastUpgradeIdx = -1;
    return StudyatkBookScrollItem;
}(ScrollListItem));
__reflect(StudyatkBookScrollItem.prototype, "StudyatkBookScrollItem");
//# sourceMappingURL=StudyatkBookScrollItem.js.map