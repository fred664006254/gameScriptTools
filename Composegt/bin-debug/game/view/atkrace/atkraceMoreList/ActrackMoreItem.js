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
var ActrackMoreItem = (function (_super) {
    __extends(ActrackMoreItem, _super);
    function ActrackMoreItem() {
        var _this = _super.call(this) || this;
        _this.uid = 0;
        return _this;
    }
    ActrackMoreItem.prototype.initItem = function (index, data) {
        this.uid = data.info.uid;
        this.height = 130;
        var rankinglist_line = BaseBitmap.create("atkrace_xian_1");
        rankinglist_line.x = 10;
        this.addChild(rankinglist_line);
        rankinglist_line.y = 130;
        var rankTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        rankTxt.text = String(index + 1);
        rankTxt.x = 20;
        rankTxt.y = 15;
        rankTxt.width = 30;
        rankTxt.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(rankTxt);
        //名称  
        var msgLabel = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON);
        msgLabel.text = this.formatMoreMsg(data);
        msgLabel.x = rankTxt.x + 40;
        msgLabel.y = rankTxt.y;
        msgLabel.lineSpacing = 6;
        msgLabel.width = 400;
        this.addChild(msgLabel);
        // //击败｜｜全歼
        // let str = "";
        // if(data.info.type==1){
        // 	str =LanguageManager.getlocal("atkracebeat")
        // }
        // else
        // {
        // 	str =LanguageManager.getlocal("atkraceAnnihilation")
        // }
        // //描述    
        // let describeTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        // var servantName =Config.ServantCfg.getServantItemById(data.info.sid).name;
        // describeTxt.text ="";
        // if(data.info.streak&&data.info.streak>=3)
        // {
        // 	describeTxt.text =LanguageManager.getlocal("actrackStraight",[servantName,str,data.info.uname2,""+data.info.fightnum,""+data.info.streak]);
        // }
        // else
        // {
        //   describeTxt.text =LanguageManager.getlocal("actrackDescription",[servantName,str,data.info.uname2,""+data.info.fightnum]);
        // }
        // describeTxt.x = nameTxt.x; 
        // describeTxt.y = nameTxt.y+43;
        // if(describeTxt.width>=400)
        // {
        // 	describeTxt.width=400;
        //     describeTxt.y = 50;
        // } 
        // describeTxt.lineSpacing = 7;
        // this.addChild(describeTxt);
        //时间  
        var timerTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        timerTxt.text = App.DateUtil.getFormatBySecond(data.info.st, 2);
        timerTxt.x = msgLabel.x;
        timerTxt.y = 105; //describeTxt.y+52;
        this.addChild(timerTxt);
        //挑战按钮
        var challengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "atkraceChallenge", this.challengBtnHandler, this);
        challengeBtn.setScale(0.85);
        challengeBtn.x = GameConfig.stageWidth - challengeBtn.width - 10;
        challengeBtn.y = 60;
        this.addChild(challengeBtn);
        if (Api.playerVoApi.getPlayerID() == data.info.uid) {
            challengeBtn.visible = false;
        }
    };
    //挑战
    ActrackMoreItem.prototype.challengBtnHandler = function (evt) {
        // var data:any =[];
        // data.type=1;//挑战
        // data.uid=this.uid;
        // AtkraceChallengeItem.data =data;
        // ViewController.getInstance().openView(ViewConst.POPUP.ATKRACECHALLENGEVIEW);
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACESELECTVIEW, {
            fightType: AtkraceFightTypes.challenge,
            fightUid: this.uid
        });
    };
    ActrackMoreItem.prototype.formatMoreMsg = function (data) {
        var rsl = "";
        var act = LanguageManager.getlocal(data.info.type == 1 ? "atkrace_addtext10" : "atkrace_addtext11");
        rsl = LanguageManager.getlocal("atkrace_addtext8", [
            data.info.name,
            act,
            data.info.uname2,
            data.info.fightnum + ""
        ]);
        if (data.info.streak > 2) {
            rsl += LanguageManager.getlocal("atkrace_addtext9", ["" + data.info.streak]);
        }
        return rsl;
    };
    ActrackMoreItem.prototype.getSpaceY = function () {
        return 1;
    };
    ActrackMoreItem.prototype.getSpaceX = function () {
        return 0;
    };
    ActrackMoreItem.prototype.dispose = function () {
        this.uid = 0;
        _super.prototype.dispose.call(this);
    };
    return ActrackMoreItem;
}(ScrollListItem));
__reflect(ActrackMoreItem.prototype, "ActrackMoreItem");
