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
//
var AcBattleGroundDetailsViewTab2 = (function (_super) {
    __extends(AcBattleGroundDetailsViewTab2, _super);
    function AcBattleGroundDetailsViewTab2(param) {
        var _this = _super.call(this) || this;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBattleGroundDetailsViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattleGroundDetailsViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBattleGroundDetailsViewTab2.prototype.initView = function () {
        var _this = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDDETAIL), this.allianCallback, this);
        // 膜拜背景
        var bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 69 - 83;
        this.addChild(bottomBg);
        this._bottomBg = bottomBg;
        //排行榜内部
        var innerBg = BaseBitmap.create("public_tc_bg03");
        innerBg.height = bottomBg.y;
        innerBg.width = 620;
        innerBg.x = GameConfig.stageWidth / 2 - innerBg.width / 2;
        innerBg.y = 3;
        this.addChild(innerBg);
        var titleBg = BaseBitmap.create("rank_biao");
        titleBg.width = innerBg.width - 20;
        titleBg.x = GameConfig.stageWidth / 2 - titleBg.width / 2;
        titleBg.y = innerBg.y + 45;
        this.addChild(titleBg);
        var rankText = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank1"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        var memberText = ComponentManager.getTextField(LanguageManager.getlocal("allianceMemberPopupViewTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        var poText = ComponentManager.getTextField(LanguageManager.getlocal("alliance_po"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        var valueText = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank4"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        rankText.x = 80 - rankText.width / 2;
        rankText.y = titleBg.y + titleBg.height / 2 - rankText.height / 2;
        this.addChild(rankText);
        memberText.x = 200 - memberText.width / 2;
        memberText.y = titleBg.y + titleBg.height / 2 - memberText.height / 2;
        this.addChild(memberText);
        poText.x = 380 - poText.width / 2;
        poText.y = titleBg.y + titleBg.height / 2 - poText.height / 2;
        this.addChild(poText);
        valueText.x = 530 - valueText.width / 2;
        valueText.y = titleBg.y + titleBg.height / 2 - valueText.height / 2;
        this.addChild(valueText);
        var scroRect = new egret.Rectangle(0, 0, innerBg.width, innerBg.height - 125); //innerBg.height -titleBg.height - 90);
        this._scrollList = ComponentManager.getScrollList(AcBattleGroundDetailsAlliScrollItem, [], scroRect, { aid: this.param.data.aid, code: this.param.data.code });
        this._scrollList.x = GameConfig.stageWidth / 2 - this._scrollList.width / 2;
        this._scrollList.y = innerBg.y + 80;
        this.addChild(this._scrollList);
        var innerTitle = BaseBitmap.create("public_up3");
        innerTitle.width = innerBg.width - 6;
        innerTitle.height = 35;
        innerTitle.x = innerBg.x + innerBg.width / 2 - innerTitle.width / 2;
        innerTitle.y = innerBg.y + 5;
        this.addChild(innerTitle);
        this._innerTitle = innerTitle;
        var innerBottom = BaseBitmap.create("public_up3");
        innerBottom.width = innerBg.width - 6;
        innerBottom.height = 35;
        innerBottom.scaleY = -1;
        innerBottom.x = innerBg.x + innerBg.width / 2 - innerBottom.width / 2;
        innerBottom.y = innerBg.y + innerBg.height - 5;
        this.addChild(innerBottom);
        this._innerBottom = innerBottom;
        var border = BaseBitmap.create("public_9v_bg03");
        border.width = GameConfig.stageWidth;
        border.height = GameConfig.stageHeigth - 69 - 83 + 5;
        border.x = 0;
        border.y = -5;
        this.addChild(border);
        // private _myRankIndex:BaseTextField;
        // private _myName:BaseTextField;
        // private _myP:BaseTextField;
        // private _myValue:BaseTextField;
        var logbtn = ComponentManager.getButton("atkracecross_laifa", null, function () {
            //打开详情界面
            ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDVISITVIEW, {
                aid: _this.param.data.aid,
                code: _this.param.data.code
            });
        }, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, logbtn, bottomBg, [15, 0]);
        this.addChild(logbtn);
        var loginTxt = BaseBitmap.create("atkracecross_laifa_text");
        this.addChild(loginTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, loginTxt, logbtn);
        //帮会列表请求
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDDETAIL, {
            activeId: this.vo.aidAndCode,
            allianceId: Api.playerVoApi.getPlayerAllianceId()
        });
    };
    AcBattleGroundDetailsViewTab2.prototype.allianCallback = function (data) {
        if (data.data.data) {
            // this.allian_data = data.data.data.data.allianceList;
            // this.mn = data.data.data.data.mn;
            // this.alivemn = data.data.data.data.alivemn;//存活
            // if(this.param.data.type=="alliance")
            // {
            // 	// this.servantBtnClick(); 
            // }
            // let test =[
            // 	{value:20,po:1,uid:1},
            // 	{value:30,po:2,uid:2},
            // 	{value:30,po:4,uid:3},
            // 	{value:40,po:3,uid:4},
            // 	{value:40,po:4,uid:5}
            // ]
            var allianceList = data.data.data.data.allianceList;
            allianceList.sort(function (a, b) {
                if (b.value != a.value) {
                    return Number(b.value) - Number(a.value);
                }
                if (a.po != b.po) {
                    return a.po - b.po;
                }
                return a.uid - b.uid;
            });
            var myData = null;
            var myIndex = 0;
            for (var i = 0; i < allianceList.length; i++) {
                if (allianceList[i].uid == Api.playerVoApi.getPlayerID()) {
                    myData = allianceList[i];
                    myIndex = i + 1;
                    break;
                }
            }
            // private _myRankIndex:BaseTextField;
            // private _myName:BaseTextField;
            // private _myP:BaseTextField;
            // private _myValue:BaseTextField;
            //更新数据
            if (allianceList) {
                this._scrollList.refreshData(allianceList, { aid: this.param.data.aid, code: this.param.data.code });
            }
            else {
                return;
            }
            this._myRankIndex = ComponentManager.getTextField(myIndex > 0 ? String(myIndex) : "--", 20, TextFieldConst.COLOR_WARN_GREEN);
            this._myName = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), 20, TextFieldConst.COLOR_WARN_GREEN);
            var poStr = myData ? LanguageManager.getlocal("allianceMemberPo" + myData.po) : "--";
            this._myP = ComponentManager.getTextField(poStr, 20, TextFieldConst.COLOR_WARN_GREEN);
            this._myValue = ComponentManager.getTextField(myData ? String(myData.value) : LanguageManager.getlocal("crossImacyNoAccess"), 20, TextFieldConst.COLOR_WARN_GREEN);
            if (myData) {
                if ((!Boolean(myData.alive)) || myData.alive == 0) {
                    this._myRankIndex.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                    this._myName.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                    this._myP.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                    this._myValue.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                    this._myValue.text = LanguageManager.getlocal("acBattleRankPopupOut");
                }
                else {
                    if (Number(myData.value) < this.vo.curOutScore) {
                        //要被淘汰了
                        this._myRankIndex.textColor = TextFieldConst.COLOR_WARN_RED;
                        this._myName.textColor = TextFieldConst.COLOR_WARN_RED;
                        this._myP.textColor = TextFieldConst.COLOR_WARN_RED;
                        this._myValue.textColor = TextFieldConst.COLOR_WARN_RED;
                    }
                }
            }
            else {
                this._myRankIndex.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                this._myName.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                this._myP.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
                this._myValue.textColor = TextFieldConst.COLOR_QUALITY_GRAY;
            }
            //80 200 380 530
            this._myRankIndex.x = 80 - this._myRankIndex.width / 2;
            this._myName.x = 200 - this._myName.width / 2;
            this._myP.x = 380 - this._myP.width / 2;
            this._myValue.x = 530 - this._myValue.width / 2;
            this._myRankIndex.y = this._bottomBg.y - 10 - this._myRankIndex.height;
            this._myName.y = this._myP.y = this._myValue.y = this._myRankIndex.y;
            this.addChild(this._myRankIndex);
            this.addChild(this._myName);
            this.addChild(this._myP);
            this.addChild(this._myValue);
            // private _myRank:BaseTextField;
            // private _alliRank:BaseTextField;
            // private _liveNum:BaseTextField;
            // private _warn1:BaseTextField;
            // private _warn2:BaseTextField;
            var type1 = 0;
            if (myData) {
                if (myData.alive == 0) {
                    type1 = 3;
                }
                else {
                    if (this.vo.getRankPlayerScore() < this.vo.curOutScore) {
                        //要被淘汰了
                        type1 = 2;
                    }
                    else {
                        //成绩良好
                        type1 = 1;
                    }
                }
            }
            var myAlliData = this.vo.getMyAlliData();
            // _innerTitle
            var alliNameText = ComponentManager.getTextField(myAlliData.name, 20, TextFieldConst.COLOR_BROWN);
            alliNameText.x = this._innerTitle.x + this._innerTitle.width / 2 - alliNameText.width / 2;
            alliNameText.y = this._innerTitle.y + this._innerTitle.height / 2 - alliNameText.height / 2;
            this.addChild(alliNameText);
            var type2 = 0;
            if (Number(myAlliData.alivemn) > 0) {
                type2 = 1;
            }
            else {
                type2 = 2;
            }
            switch (type1) {
                case 1:
                    //玩家当前名次在未淘汰范围内：
                    this._warn1 = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewAlliUp1"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    break;
                case 2:
                    //玩家当前名次在淘汰范围内
                    this._warn1 = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewAlliUp2"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    break;
                case 3:
                    //玩家已被淘汰
                    this._warn1 = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewAlliUp3"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    break;
                case 4:
                    //没有资格
                    this._warn1 = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewAlliUp4"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    break;
            }
            this._warn1.x = GameConfig.stageWidth / 2 - this._warn1.width / 2;
            this._warn1.y = this._bottomBg.y + 10;
            this.addChild(this._warn1);
            var playerRank = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRankPopupViewPlayerRank", [String(this.vo.getMyRank())]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            playerRank.x = GameConfig.stageWidth / 2 - playerRank.width / 2;
            playerRank.y = this._warn1.y + this._warn1.height + 5;
            this.addChild(playerRank);
            var allRank = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRankPopupViewAllRank", [String(this.vo.getRankAllRank())]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            allRank.x = GameConfig.stageWidth / 2 - allRank.width / 2;
            allRank.y = playerRank.y + playerRank.height + 5;
            this.addChild(allRank);
            var liveNum = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRankPopupViewAllPlayerNum", [myAlliData.alivemn]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
            liveNum.x = GameConfig.stageWidth / 2 - liveNum.width / 2;
            liveNum.y = allRank.y + allRank.height + 5;
            this.addChild(liveNum);
            switch (type2) {
                case 1:
                    //帮会未淘汰
                    this._warn2 = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewAlliDown1"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    break;
                case 2:
                    //帮会已淘汰
                    this._warn2 = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewAlliDown2"), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
                    break;
            }
            this._warn2.x = GameConfig.stageWidth / 2 - this._warn2.width / 2;
            this._warn2.y = liveNum.y + liveNum.height + 5;
            this.addChild(this._warn2);
        }
    };
    AcBattleGroundDetailsViewTab2.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcBattleGroundDetailsViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDDETAIL), this.allianCallback, this);
        this._allinameText = null;
        this._scrollList = null;
        this._myRankIndex = null;
        this._myName = null;
        this._myP = null;
        this._myValue = null;
        this._myRank = null;
        this._alliRank = null;
        this._liveNum = null;
        this._warn1 = null;
        this._warn2 = null;
        this._comeBtn = null;
        this._innerTitle = null;
        this._innerBottom = null;
        this._bottomBg = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattleGroundDetailsViewTab2;
}(CommonViewTab));
__reflect(AcBattleGroundDetailsViewTab2.prototype, "AcBattleGroundDetailsViewTab2");
