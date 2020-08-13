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
var LadderChooseTeamPopupView = (function (_super) {
    __extends(LadderChooseTeamPopupView, _super);
    function LadderChooseTeamPopupView() {
        var _this = _super.call(this) || this;
        _this._powerText = null;
        _this._sids = [];
        _this._buffText = null;
        _this._drumBtn = null;
        _this._addBtn = null;
        _this._topIcons = [];
        _this._confirmBtn2 = null;
        return _this;
    }
    Object.defineProperty(LadderChooseTeamPopupView.prototype, "type", {
        get: function () {
            return this.param.data.type;
        },
        enumerable: true,
        configurable: true
    });
    LadderChooseTeamPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ladderteam_bg" + this.type, "ladder_infobg", "alliance_taskwotdbg1",
            "countrywarrewardview_itembg", 'wifebattleyonglelistbg',
            "ladderteam_add", "activity_fnt", "ladderteam_numbg",
        ]);
    };
    // 标题背景名称
    LadderChooseTeamPopupView.prototype.getTitleBgName = function () {
        return null;
    };
    // 背景图名称
    LadderChooseTeamPopupView.prototype.getBgName = function () {
        return "ladder_infobg";
    };
    LadderChooseTeamPopupView.prototype.getTitleStr = function () {
        return null;
    };
    // 弹框面板宽度，高度动态计算
    LadderChooseTeamPopupView.prototype.getShowWidth = function () {
        return 640;
    };
    Object.defineProperty(LadderChooseTeamPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderChooseTeamPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderChooseTeamPopupView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderChooseTeamPopupView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderChooseTeamPopupView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    LadderChooseTeamPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    LadderChooseTeamPopupView.prototype.resetBgSize = function () {
        _super.prototype.resetBgSize.call(this);
        this.closeBtn.x = 560;
        this.closeBtn.y = 30 + (GameConfig.stageHeigth - 960) / 2;
    };
    LadderChooseTeamPopupView.prototype.initView = function () {
        this._sids = Api.laddertournamentVoApi.getSidsByTeam(this.type);
        this.viewBg.width = this.getShowWidth();
        var view = this;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE, view.hide, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_ADDBUFF), this.refreshCallback, this);
        var topbg = BaseBitmap.create("ladderteam_bg" + this.type);
        topbg.setPosition(this.viewBg.width / 2 - topbg.width / 2, -50);
        view.addChildToContainer(topbg);
        var contentBg = BaseBitmap.create("public_9_bg44");
        contentBg.width = 536;
        contentBg.height = 450;
        contentBg.setPosition(this.viewBg.width / 2 - contentBg.width / 2, topbg.y + topbg.height + 8);
        view.addChildToContainer(contentBg);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "acLadder_gowar_confirm", this.confirmHandle, this);
        confirmBtn.setPosition(this.viewBg.width / 2 - confirmBtn.width / 2, contentBg.y + contentBg.height + 10);
        view.addChildToContainer(confirmBtn);
        this._confirmBtn2 = confirmBtn;
        var topdescbg = BaseBitmap.create("alliance_taskwotdbg1");
        topdescbg.width = 540;
        topdescbg.height = 58;
        topdescbg.setPosition(this.viewBg.width / 2 - topdescbg.width / 2, 30);
        this.addChildToContainer(topdescbg);
        var paramstr = LanguageManager.getlocal("servantInfo_speciality" + this.type);
        var topdesc = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_team_topdesc", [paramstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        topdesc.setPosition(topdescbg.x + topdescbg.width / 2 - topdesc.width / 2, topdescbg.y + 8);
        this.addChildToContainer(topdesc);
        var powerDesc = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_team_power" + this.type, [String(this.getTotalPower())]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        powerDesc.width = 540;
        powerDesc.textAlign = egret.HorizontalAlign.CENTER;
        powerDesc.setPosition(topdescbg.x + topdescbg.width / 2 - powerDesc.width / 2, topdesc.y + topdesc.height + 6);
        this.addChildToContainer(powerDesc);
        this._powerText = powerDesc;
        var buffbg = BaseBitmap.create("countrywarrewardview_itembg");
        buffbg.width = 480;
        buffbg.height = 38;
        buffbg.setPosition(this.viewBg.width / 2 - buffbg.width / 2, 200);
        this.addChildToContainer(buffbg);
        var buffer = ComponentManager.getTextField("0", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        buffer.width = 440;
        buffer.textAlign = egret.HorizontalAlign.CENTER;
        buffer.setPosition(buffbg.x + buffbg.width / 2 - buffer.width / 2, buffbg.y + buffbg.height / 2 - buffer.height / 2);
        this.addChildToContainer(buffer);
        this._buffText = buffer;
        this._drumBtn = BaseLoadBitmap.create("itemicon2282"); //ComponentManager.getButton("itemicon2282",null,this.addBuffHandle,this,null,1);
        // this._drumBtn.setScale(0.5)
        this._drumBtn.width = 50;
        this._drumBtn.height = 50;
        this._drumBtn.setPosition(buffbg.x - 20, buffbg.y + buffbg.height / 2 - 25);
        this.addChildToContainer(this._drumBtn);
        this._drumBtn.addTouchTap(this.addBuffHandle, this);
        this._addBtn = ComponentManager.getButton("ladderteam_add", null, this.addBuffHandle, this, null, 1);
        this._addBtn.setPosition(buffbg.x - 20, buffbg.y + buffbg.height / 2 - this._addBtn.height / 2);
        this.addChildToContainer(this._addBtn);
        //门客icon
        var posx = (this.viewBg.width - 507) / 2;
        var poxy = topdescbg.y + topdescbg.height + 8;
        for (var i = 0; i < 5; i++) {
            var oneServant = new LadderTeamServantIcon();
            oneServant.init(i + 1, this.deleteServant, this);
            oneServant.setPosition(posx + 103 * i, poxy);
            this.addChildToContainer(oneServant);
            oneServant.setServant(this._sids[i], false);
            this._topIcons.push(oneServant);
        }
        //门客列表
        var sids = Api.servantVoApi.getServantInfoIdListByProperty(this.type);
        var tmpRect = new egret.Rectangle(0, 0, contentBg.width - 6, contentBg.height - 6);
        var scrollList = ComponentManager.getScrollList(LadderChooseTeamItem, sids, tmpRect, { type: this.type, o: this, f: this.addServant, f2: this.deleteServantBySid });
        scrollList.setPosition(contentBg.x + 3, contentBg.y + 3);
        view.addChildToContainer(scrollList);
        scrollList.bounces = false;
        this.resetBuff();
        if (this.getServantCount() < 5) {
            App.DisplayUtil.changeToGray(this._confirmBtn2);
        }
        else {
            App.DisplayUtil.changeToNormal(this._confirmBtn2);
        }
    };
    LadderChooseTeamPopupView.prototype.deleteServant = function (idx) {
        this._sids.splice(idx - 1, 1, null);
        this.resetAllIcons();
    };
    LadderChooseTeamPopupView.prototype.deleteServantBySid = function (sid) {
        for (var i = 0; i < this._sids.length; i++) {
            if (this._sids[i] == sid) {
                this._sids.splice(i, 1, null);
                break;
            }
        }
        this.resetAllIcons();
    };
    LadderChooseTeamPopupView.prototype.addServant = function (sid) {
        if (this.getServantCount() >= 5) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_team_max"));
            return;
        }
        this.insertServant(sid);
        this.resetAllIcons();
    };
    LadderChooseTeamPopupView.prototype.insertServant = function (sid) {
        for (var i = 0; i < this._sids.length; i++) {
            if (this._sids[i] == null) {
                this._sids.splice(i, 1, sid);
                return;
            }
        }
        this._sids.push(sid);
    };
    LadderChooseTeamPopupView.prototype.resetAllIcons = function () {
        for (var i = 0; i < 5; i++) {
            var oneServant = this._topIcons[i];
            oneServant.setServant(this._sids[i]);
        }
        this.resetPower();
        if (this.getServantCount() < 5) {
            App.DisplayUtil.changeToGray(this._confirmBtn2);
        }
        else {
            App.DisplayUtil.changeToNormal(this._confirmBtn2);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LATTERTOURNAMENT_TEAM_CHOOSE, this._sids);
    };
    LadderChooseTeamPopupView.prototype.resetBuff = function () {
        var bufftimes = Api.laddertournamentVoApi.getBuffTimes(this.type);
        if (bufftimes > 0) {
            this._drumBtn.visible = true;
            this._addBtn.visible = false;
            var buffvalue = this.cfg.getBuffCfg().atkUp * 100;
            this._buffText.text = LanguageManager.getlocal("acLadder_team_buff_effect", [String(buffvalue), String(bufftimes)]);
            for (var i = 0; i < 5; i++) {
                var oneServant = this._topIcons[i];
                oneServant.setBuff();
            }
        }
        else {
            var buffCfg = this.cfg.buffList["1"];
            if (Api.itemVoApi.getItemNumInfoVoById(buffCfg.needItem) > 0) {
                App.CommonUtil.addIconToBDOC(this._addBtn);
            }
            this._drumBtn.visible = false;
            this._addBtn.visible = true;
            this._buffText.text = LanguageManager.getlocal("acLadder_team_buff_empty");
        }
    };
    LadderChooseTeamPopupView.prototype.addBuffHandle = function () {
        var buffCfg = this.cfg.buffList["1"];
        if (Api.itemVoApi.getItemNumInfoVoById(buffCfg.needItem) <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.LADDERITEMUSEPOPUPVIEW, { type: this.type });
    };
    LadderChooseTeamPopupView.prototype.getServantCount = function () {
        var count = 0;
        for (var i = 0; i < this._sids.length; i++) {
            if (this._sids[i]) {
                count++;
            }
        }
        return count;
    };
    LadderChooseTeamPopupView.prototype.getTotalPower = function () {
        var power = 0;
        for (var i = 0; i < this._sids.length; i++) {
            if (this._sids[i]) {
                var servantvo = Api.servantVoApi.getServantObj(this._sids[i]);
                if (this.type == 1) {
                    power += servantvo.attrVo.forceTotal;
                }
                else if (this.type == 2) {
                    power += servantvo.attrVo.brainsTotal;
                }
                else if (this.type == 3) {
                    power += servantvo.attrVo.politicsTotal;
                }
                else if (this.type == 4) {
                    power += servantvo.attrVo.charmTotal;
                }
            }
        }
        return power;
    };
    LadderChooseTeamPopupView.prototype.resetPower = function () {
        this._powerText.text = LanguageManager.getlocal("acLadder_team_power" + this.type, [String(this.getTotalPower())]);
    };
    LadderChooseTeamPopupView.prototype.confirmHandle = function () {
        if (this.vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.getServantCount() < 5) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_team_less"));
            return;
        }
        this.request(NetRequestConst.REQUEST_LT_SELECTSERVANT, { team: this.type, sids: this._sids, activeId: this.acTivityId });
    };
    LadderChooseTeamPopupView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        if (rData.cmd == NetRequestConst.REQUEST_LT_SELECTSERVANT) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_team_success"));
            this.hide();
            NetManager.request(NetRequestConst.REQUEST_LT_GETRANK, { activeId: Api.laddertournamentVoApi.aidAndCode });
        }
    };
    LadderChooseTeamPopupView.prototype.refreshCallback = function (evt) {
        var rData = evt.data.data.data;
        if (!rData) {
            return;
        }
        if (rData = evt.data.data.ret >= 0 && evt.data.data.cmd == NetRequestConst.REQUEST_LT_ADDBUFF) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_addbuff_success"));
        }
        this.resetBuff();
    };
    LadderChooseTeamPopupView.prototype.tick = function () {
        if (Api.laddertournamentVoApi.checkIsTruce()) {
            this.hide();
        }
    };
    LadderChooseTeamPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_ADDBUFF), this.refreshCallback, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE, this.hide, this);
        this._powerText = null;
        this._sids.length = 0;
        this._buffText = null;
        this._drumBtn = null;
        this._addBtn = null;
        this._topIcons.length = 0;
        this._confirmBtn2 = null;
        _super.prototype.dispose.call(this);
    };
    return LadderChooseTeamPopupView;
}(PopupView));
__reflect(LadderChooseTeamPopupView.prototype, "LadderChooseTeamPopupView");
//# sourceMappingURL=LadderChooseTeamPopupView.js.map