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
var LadderLogItem = (function (_super) {
    __extends(LadderLogItem, _super);
    function LadderLogItem() {
        var _this = _super.call(this) || this;
        _this._pkLogs = null;
        _this._uid = 0;
        return _this;
    }
    LadderLogItem.prototype.initItem = function (index, data, itemparam) {
        var _this = this;
        var playerInfo = data.pklogs[0][4];
        this._uid = playerInfo.uid;
        this._pkLogs = data;
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 610;
        bg.height = 120;
        this.addChild(bg);
        var replaybtn = ComponentManager.getButton("ladder_replay", null, this.replayHandle, this);
        replaybtn.setPosition(16, bg.height / 2 - replaybtn.height / 2);
        this.addChild(replaybtn);
        var line = BaseBitmap.create("public_line1");
        line.setPosition(155, 45);
        line.width = 280;
        this.addChild(line);
        var ptitle = null;
        if (playerInfo.ptitle && playerInfo.ptitle.ptitle && playerInfo.ptitle.ptitle != "") {
            ptitle = playerInfo.ptitle;
        }
        var headContainer = Api.playerVoApi.getPlayerCircleHead(playerInfo.pic, ptitle);
        headContainer.setPosition(73, bg.height / 2 - headContainer.height / 2);
        this.addChild(headContainer);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        headContainer.addTouchTap(function () {
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {
                ruid: _this._uid,
                rzid: Api.mergeServerVoApi.getTrueZid(_this._uid)
            });
        }, this);
        var zid = Api.mergeServerVoApi.getTrueZid(this._uid);
        var nameStr = LanguageManager.getlocal("acLadder_log_title", [String(playerInfo.name), String(zid)]);
        var name = ComponentManager.getTextField(nameStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW2);
        name.setPosition(176, 15);
        this.addChild(name);
        if (playerInfo.title && playerInfo.title.title && playerInfo.title.title != "") {
            var officerImg = App.CommonUtil.getTitlePic(playerInfo.title);
            var deltaV = 0.7;
            officerImg.setScale(deltaV);
            officerImg.x = name.x + name.width;
            officerImg.y = name.y + name.height / 2 - officerImg.height * officerImg.scaleY / 2;
            this.addChild(officerImg);
        }
        else {
            var officerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            officerTxt.text = LanguageManager.getlocal("officialTitle" + playerInfo.level);
            officerTxt.x = name.x + name.width + 20;
            officerTxt.y = name.y;
            this.addChild(officerTxt);
        }
        var timestr = App.DateUtil.getFormatBySecond(data.st, 19);
        var time = ComponentManager.getTextField(timestr, 20, TextFieldConst.COLOR_BROWN);
        time.setPosition(180, 60);
        time.lineSpacing = 5;
        this.addChild(time);
        if (data.winuid != Api.playerVoApi.getPlayerID()) {
            var fightNum = Api.laddertournamentVoApi.getFightTimes();
            var totalNum = Api.laddertournamentVoApi.cfg.freeNum;
            var freeNum = totalNum > fightNum ? totalNum - fightNum : 0;
            if (freeNum > 0) {
                var todaytimes = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
                this.addChild(todaytimes);
                todaytimes.text = LanguageManager.getlocal("acLadder_today_times2", [String(freeNum), String(totalNum)]);
                todaytimes.setPosition(530 - todaytimes.width / 2, 30);
            }
            else {
                var icon = BaseLoadBitmap.create("itemicon_small2281");
                icon.width = 50;
                icon.height = 45;
                icon.setPosition(480, 14);
                this.addChild(icon);
                var itemvo = GameData.formatRewardItem(Api.laddertournamentVoApi.cfg.needItem)[0];
                var hasNum = Api.itemVoApi.getItemNumInfoVoById(itemvo.id);
                var needNum = itemvo.num;
                var needitem = ComponentManager.getTextField("0", 20, TextFieldConst.COLOR_BROWN);
                needitem.text = LanguageManager.getlocal("AcMazeViewTaskPlan", [String(hasNum), String(needNum)]);
                needitem.setPosition(icon.x + icon.width + 2, icon.y + icon.height / 2 - needitem.height / 2);
                this.addChild(needitem);
                if (hasNum < needNum) {
                    needitem.textColor = TextFieldConst.COLOR_WARN_RED;
                }
            }
        }
        var againBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "acLadder_fight_agagin", this.againHandle, this);
        againBtn.setPosition(bg.width - 15 - againBtn.width, 55);
        this.addChild(againBtn);
        var scorestr;
        var scorecolor;
        if (data.winuid == Api.playerVoApi.getPlayerID()) {
            againBtn.setEnable(false);
            scorestr = LanguageManager.getlocal("acLadder_log_win", [String(data.getPoint[0])]);
            scorecolor = TextFieldConst.COLOR_WARN_GREEN2;
        }
        else {
            scorestr = LanguageManager.getlocal("acLadder_log_lose", [String(data.getPoint[0])]);
            scorecolor = TextFieldConst.COLOR_QUALITY_RED;
        }
        var score = ComponentManager.getTextField(scorestr, 20, scorecolor);
        score.setPosition(300, 70);
        this.addChild(score);
    };
    LadderLogItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        if (String(data.ruid) == String(this._uid)) {
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid(this._uid);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
    };
    LadderLogItem.prototype.replayHandle = function () {
        // Api.laddertournamentVoApi.setFightData(this._pkLogs);
        // ViewController.getInstance().openView(ViewConst.COMMON.LADDERFORMTIONVIEW);
        NetManager.request(NetRequestConst.REQUEST_LT_GETLOGDETAIL, {
            activeId: Api.laddertournamentVoApi.aidAndCode,
            idx: this._index + 1,
        });
    };
    LadderLogItem.prototype.againHandle = function () {
        if (Api.laddertournamentVoApi.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (Api.laddertournamentVoApi.checkIsTruce()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_truceTip"));
            return;
        }
        var fightNum = Api.laddertournamentVoApi.getFightTimes();
        var totalNum = Api.laddertournamentVoApi.cfg.freeNum;
        if (fightNum >= totalNum) {
            var itemvo = GameData.formatRewardItem(Api.laddertournamentVoApi.cfg.needItem)[0];
            var hasNum = Api.itemVoApi.getItemNumInfoVoById(itemvo.id);
            var needNum = itemvo.num;
            if (hasNum < needNum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_item_no_num"));
                return;
            }
        }
        NetManager.request(NetRequestConst.REQUEST_LT_FIGHT, {
            activeId: Api.laddertournamentVoApi.aidAndCode,
            fpos: this._index + 1,
            rfuid: this._uid,
        });
    };
    LadderLogItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this._pkLogs = null;
        this._uid = 0;
        _super.prototype.dispose.call(this);
    };
    return LadderLogItem;
}(ScrollListItem));
__reflect(LadderLogItem.prototype, "LadderLogItem");
//# sourceMappingURL=LadderLogItem.js.map