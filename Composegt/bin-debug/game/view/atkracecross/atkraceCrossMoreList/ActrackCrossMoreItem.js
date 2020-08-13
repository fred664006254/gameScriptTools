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
var ActrackCrossMoreItem = (function (_super) {
    __extends(ActrackCrossMoreItem, _super);
    function ActrackCrossMoreItem() {
        var _this = _super.call(this) || this;
        _this.uid = 0;
        _this.zid = 0;
        return _this;
    }
    ActrackCrossMoreItem.prototype.initItem = function (index, data) {
        this.uid = data.info.uid;
        var wordsBg = BaseBitmap.create("public_9v_bg11");
        wordsBg.width = 640;
        wordsBg.height = 124;
        wordsBg.x = 0;
        wordsBg.y = 0;
        wordsBg.visible = false;
        this.addChild(wordsBg);
        var rankinglist_line = BaseBitmap.create("rankinglist_line");
        rankinglist_line.y = 128;
        rankinglist_line.x = 15;
        this.addChild(rankinglist_line);
        var rankImg = BaseBitmap.create("rankinglist_rankbg");
        rankImg.x = 50 - rankImg.width / 2 - 20;
        rankImg.y = 26; //15;
        rankImg.visible = false;
        this.addChild(rankImg);
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        rankTxt.text = String(index + 1);
        rankTxt.x = 50 - rankTxt.width / 2 - 20;
        rankTxt.y = this.height / 2 - rankTxt.height / 2 - 20;
        this.addChild(rankTxt);
        //名称  
        var nameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        var zidStr = Api.mergeServerVoApi.getAfterMergeSeverName(data.info.uid); //data.zid
        nameTxt.text = zidStr + data.info.name;
        this.zid = data.info.zid;
        nameTxt.x = rankImg.x + 50;
        nameTxt.y = rankTxt.y;
        this.addChild(nameTxt);
        //击败｜｜全歼
        var str = "";
        if (data.info.type == 1) {
            str = LanguageManager.getlocal("atkracebeat");
        }
        else {
            str = LanguageManager.getlocal("atkraceAnnihilation");
        }
        //描述    
        var describeTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        var servantName = Config.ServantCfg.getServantItemById(data.info.sid).name;
        describeTxt.text = "";
        //追杀文字
        if (data.info.iskill && data.info.iskill == 1) {
            if (data.info.type == 1) {
                describeTxt.text = LanguageManager.getlocal("atkraceCrossIskilldes1", [servantName, data.info.uname2, data.info.fightnum]);
            }
            else {
                describeTxt.text = LanguageManager.getlocal("atkraceCrossIskilldes2", [servantName, data.info.uname2, data.info.fightnum]);
            }
        }
        else if (data.info.streak && data.info.streak >= 3) {
            describeTxt.text = LanguageManager.getlocal("actrackStraight", [servantName, str, data.info.uname2, data.info.fightnum, data.info.streak]);
        }
        else {
            describeTxt.text = LanguageManager.getlocal("actrackDescription", [servantName, str, data.info.uname2, data.info.fightnum]);
        }
        describeTxt.width = 450;
        describeTxt.x = nameTxt.x;
        describeTxt.y = nameTxt.y + 30;
        this.addChild(describeTxt);
        //时间  
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        timerTxt.text = App.DateUtil.getFormatBySecond(data.info.st, 2);
        timerTxt.x = describeTxt.x;
        timerTxt.y = describeTxt.y + 40;
        this.addChild(timerTxt);
        //挑战按钮
        var challengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceChallenge", this.challengBtnHandler, this);
        challengeBtn.setScale(0.85);
        challengeBtn.x = 530;
        challengeBtn.y = 70;
        this.addChild(challengeBtn);
        var zonerankinfos = Api.atkracecrossVoApi.zonerankinfos;
        if (Api.playerVoApi.getPlayerID() == data.info.uid || Api.mergeServerVoApi.judgeIsSameServer(data.info.zid, Api.mergeServerVoApi.getTrueZid())) {
            challengeBtn.visible = false;
        }
    };
    //挑战
    ActrackCrossMoreItem.prototype.challengBtnHandler = function (evt) {
        var crossVo = Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
        if (GameData.serverTime > crossVo.et - 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (Api.atkracecrossVoApi.isCanJoin == false) {
            var strName = "atkraceNoDes";
            if (AtkracecrossSummaryView.curCrossServerType && LanguageManager.checkHasKey("atkraceNoDes-" + AtkracecrossSummaryView.curCrossServerType)) {
                strName = "atkraceNoDes-" + AtkracecrossSummaryView.curCrossServerType;
            }
            var str = LanguageManager.getlocal(strName);
            App.CommonUtil.showTip(str);
            return;
        }
        var data = [];
        data.type = 1; //挑战
        data.uid = this.uid;
        data.zid = this.zid;
        AtkraceCrossChallengeItem.data = data;
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECROSSCHALLENGEVIEW);
    };
    ActrackCrossMoreItem.prototype.getSpaceY = function () {
        return 1;
    };
    ActrackCrossMoreItem.prototype.getSpaceX = function () {
        return 0;
    };
    ActrackCrossMoreItem.prototype.dispose = function () {
        this.uid = 0;
        this.zid = 0;
        _super.prototype.dispose.call(this);
    };
    return ActrackCrossMoreItem;
}(ScrollListItem));
__reflect(ActrackCrossMoreItem.prototype, "ActrackCrossMoreItem");
