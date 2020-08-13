/**
 * 选择上阵门客
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
var AtkraceSelectView = (function (_super) {
    __extends(AtkraceSelectView, _super);
    function AtkraceSelectView() {
        var _this = _super.call(this) || this;
        _this.hasMove = false;
        _this.freeNum = 0;
        _this.freeMax = 2;
        return _this;
    }
    AtkraceSelectView.prototype.initView = function () {
        var _this = this;
        // Api.rookieVoApi.checkNextStep();
        this.fightType = this.param.data.fightType;
        this.fightUid = this.param.data.fightUid || null;
        this.costId = Config.AtkraceCfg.getCostId(this.fightType);
        this.initCardListInfo();
        // let topLineBg = BaseBitmap.create("commonview_border3");
        // topLineBg.width=620;
        // topLineBg.x = this.viewBg.width/2 - topLineBg.width/2;
        // topLineBg.y = -10; 
        // this.addChildToContainer(topLineBg);
        var topBg = BaseBitmap.create("commonview_redtitle");
        topBg.x = this.viewBg.width / 2 - topBg.width / 2;
        topBg.y = -22;
        this.addChildToContainer(topBg);
        var servantNumTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        servantNumTxt.text = LanguageManager.getlocal("servant_count") + this._cardData.length;
        servantNumTxt.setPosition(topBg.x + 26, topBg.y + 24);
        this.addChildToContainer(servantNumTxt);
        var lvTipLabel = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(lvTipLabel);
        lvTipLabel.text = LanguageManager.getlocal("atkrace_addtext18", ["" + Config.AtkraceCfg.getServantLv()]);
        lvTipLabel.width = topBg.width - 40;
        lvTipLabel.setPosition(topBg.x + 20, topBg.y + 24);
        lvTipLabel.textAlign = TextFieldConst.ALIGH_RIGHT;
        var list_w = 612;
        var list_h = GameConfig.stageHeigth - 168 - this.container.y - topBg.y - topBg.height;
        this._cardList = ComponentManager.getScrollList(AtkraceSelectCardItem, [], new egret.Rectangle(0, 0, list_w, list_h));
        this.addChildToContainer(this._cardList);
        this._cardList.setPosition(this.viewBg.width / 2 - list_w / 2, topBg.y + topBg.height);
        this.refreshCards();
        var bottomBox = new BaseDisplayObjectContainer();
        this.addChildToContainer(bottomBox);
        bottomBox.y = GameConfig.stageHeigth - 168 - this.container.y;
        var bottomBg = BaseBitmap.create("public_9v_bg14");
        bottomBox.addChild(bottomBg);
        bottomBg.width = 604;
        bottomBg.height = 132;
        bottomBg.setPosition(this.viewBg.width / 2 - bottomBg.width / 2, 10);
        var bottomBg2 = BaseBitmap.create("public_9v_bg12");
        bottomBox.addChild(bottomBg2);
        bottomBg2.width = bottomBg.width - 20;
        bottomBg2.height = bottomBg.height - 4;
        bottomBg2.setPosition(bottomBg.x + 10, bottomBg.y + 2);
        var fgline = BaseBitmap.create("commonview_border3");
        fgline.width = 620;
        bottomBox.addChild(fgline);
        fgline.setPosition(this.viewBg.width / 2 - fgline.width / 2, 0);
        var __cgName = this.freeNum > 0 ? "atkrace_addtext5" : "atkrace_addtext4";
        this.challengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, __cgName, this.onChallengeTap, this);
        bottomBox.addChild(this.challengeBtn);
        this.challengeBtn.setPosition(480, 24);
        this.challengeNum = ComponentManager.getTextField("2/3", 20, TextFieldConst.COLOR_BROWN_NEW);
        bottomBox.addChild(this.challengeNum);
        this.challengeNum.width = 130;
        this.challengeNum.textAlign = TextFieldConst.ALIGH_CENTER;
        this.challengeNum.setPosition(480, 94);
        this.challengeIcon = BaseLoadBitmap.create("itemicon" + this.costId);
        bottomBox.addChild(this.challengeIcon);
        this.challengeIcon.width = 47;
        this.challengeIcon.height = 41;
        this.challengeIcon.setPosition(480, 84);
        this.challengeIcon.visible = false;
        var icon_x = 36;
        var icon_y = bottomBox.y + 32;
        for (var i = 0; i < 5; i++) {
            var _icon_bg = BaseLoadBitmap.create("servant_cardbg_0");
            this.addChildToContainer(_icon_bg);
            _icon_bg.width = _icon_bg.height = 82;
            _icon_bg.setPosition(icon_x + 89 * i, icon_y);
        }
        this.IconBox = new BaseDisplayObjectContainer();
        this.addChildToContainer(this.IconBox);
        this.IconBox.setPosition(icon_x, icon_y);
        this._selectIcon = [];
        this._selectList.forEach(function (v, i) {
            var __icon = new AtkraceSelectIconItem();
            __icon.refreshView({ index: i, servant: v });
            _this.IconBox.addChild(__icon);
            _this._selectIcon[i] = __icon;
        });
        this.IconBox.addTouch(this.onIconTouch, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHALLENGE), this.onSelectCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REVENGE), this.onSelectCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_KILL), this.onSelectCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHOOSE), this.onSelectCallBack, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ATKRACE, this.onUpdateModel, this);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESET_ATKRACE, this.battleCallback,this);
        this.refreshNumsView();
    };
    AtkraceSelectView.prototype.doGuide = function () {
        this.onChallengeTap();
    };
    AtkraceSelectView.prototype.onUpdateModel = function () {
        this.initCardListInfo();
        this.refreshCards();
        this.refreshSelectIcon();
        this.refreshNumsView();
    };
    /**
     * 更新挑战次数与消耗相关视图
     */
    AtkraceSelectView.prototype.refreshNumsView = function () {
        var __info = Api.atkraceVoApi.getMyInfo();
        this.freeMax = 0;
        this.freeNum = 0;
        if (this.fightType == AtkraceFightTypes.choose) {
            this.freeMax = Config.AtkraceCfg.getDailyNum();
            this.freeNum = this.freeMax - __info.num;
        }
        var __cgName = this.freeNum > 0 ? "atkrace_addtext5" : "atkrace_addtext4";
        this.challengeBtn.setText(__cgName);
        if (this.freeMax > 0 && this.freeNum > 0) {
            this.challengeNum.text = this.freeNum + "/" + this.freeMax;
            this.challengeIcon.visible = false;
            this.challengeNum.width = 130;
            this.challengeNum.x = 480;
            this.challengeNum.setColor(TextFieldConst.COLOR_WARN_GREEN);
        }
        else {
            this.challengeNum.text = "1/" + Api.itemVoApi.getItemNumInfoVoById(this.costId);
            this.challengeIcon.visible = true;
            this.challengeNum.width = 130 - 47;
            this.challengeNum.x = 480 + 47;
            if (Api.itemVoApi.getItemNumInfoVoById(this.costId) > 0) {
                this.challengeNum.setColor(TextFieldConst.COLOR_WARN_GREEN);
            }
            else {
                this.challengeNum.setColor(TextFieldConst.COLOR_WARN_RED);
            }
        }
    };
    AtkraceSelectView.prototype.initCardListInfo = function () {
        var _this = this;
        this._cardData = [];
        this._selectList = [];
        var _servants = Api.servantVoApi.getServantInfoList();
        for (var sid in _servants) {
            if (_servants[sid].level >= Config.AtkraceCfg.getServantLv()) {
                this._cardData.push({
                    servantId: sid,
                    servantInfo: _servants[sid],
                    battle: _servants[sid].AttackNum,
                    HP: _servants[sid].HPNum,
                    isSelect: false,
                    callback: this.onCardTap,
                    callbackObj: this
                });
            }
        }
        // sort key：血量>资质>ID
        this._cardData.sort(function (a, b) {
            if (a.HP == b.HP) {
                if (a.servantInfo.getTotalBookValue() == b.servantInfo.getTotalBookValue()) {
                    return parseInt(b.servantId) - parseInt(a.servantId);
                }
                else {
                    return b.servantInfo.getTotalBookValue() - a.servantInfo.getTotalBookValue();
                }
            }
            else {
                return b.HP - a.HP;
            }
        });
        var _select = Api.atkraceVoApi.getMyInfo().combatlist;
        if (_select.length > 0) {
            _select.forEach(function (v, i) {
                _this._selectList[i] = Api.servantVoApi.getServantObj(_select[i]);
            });
            this._cardData.forEach(function (v) {
                if (_select.indexOf(v.servantId) >= 0) {
                    v.isSelect = true;
                }
            });
        }
        else {
            for (var i = 0; i < 5; i++) {
                this._cardData[i].isSelect = true;
                this._selectList.push(this._cardData[i].servantInfo);
            }
        }
    };
    AtkraceSelectView.prototype.refreshCards = function () {
        var _this = this;
        var _loop_1 = function (i) {
            this_1._cardData[i].isSelect = this_1._selectList.filter(function (v) { return v && v.servantId == _this._cardData[i].servantId; }).length > 0;
        };
        var this_1 = this;
        for (var i = 0; i < this._cardData.length; i++) {
            _loop_1(i);
        }
        this._cardList.refreshData(this._cardData);
    };
    AtkraceSelectView.prototype.refreshSelectIcon = function () {
        var _this = this;
        this._selectList.forEach(function (v, i) {
            _this._selectIcon[i].refreshView({
                index: i,
                servant: v
            });
        });
    };
    AtkraceSelectView.prototype.onCardTap = function (servant) {
        for (var i = 0; i < this._selectList.length; i++) {
            if (this._selectList[i] && this._selectList[i].servantId == servant.servantId) {
                this._selectList[i] = null;
                this.refreshCards();
                this.refreshSelectIcon();
                return;
            }
        }
        var _index = this._selectList.indexOf(null);
        if (_index == -1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_addtext19"));
            return;
        }
        this._selectList[_index] = servant;
        this.refreshCards();
        this.refreshSelectIcon();
    };
    AtkraceSelectView.prototype.onIconTouch = function (e) {
        // console.log(e.target, e.type)
        if (e.target != this.IconBox)
            return;
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.startPos = [e.stageX, e.stageY];
                this.handleIcon = this.getTargetIcon(this.startPos);
                if (this.handleIcon) {
                    this.IconBox.setChildIndex(this.handleIcon, 5);
                }
                this.hasMove = false;
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                if (this.handleIcon) {
                    this.hasMove = true;
                    this.onTouchIconMove(e);
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                if (this.handleIcon) {
                    this.onTouchIconEnd(e);
                    this.hasMove = false;
                    this.handleIcon = null;
                }
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                if (this.handleIcon) {
                    this.refreshSelectIcon();
                    this.hasMove = false;
                    this.handleIcon = null;
                }
                break;
            default:
                break;
        }
    };
    AtkraceSelectView.prototype.onTouchIconMove = function (e) {
        var _a = [
            e.stageX - this.startPos[0],
            e.stageY - this.startPos[1]
        ], dx = _a[0], dy = _a[1];
        this.handleIcon.moveToPos(dx, dy);
    };
    AtkraceSelectView.prototype.onTouchIconEnd = function (e) {
        if (this.hasMove) {
            var __Icon = this.getTargetIcon([e.stageX, e.stageY]);
            if (__Icon && __Icon.servantId != this.handleIcon.servantId) {
                _a = [this._selectList[this.handleIcon.Index], this._selectList[__Icon.Index]], this._selectList[__Icon.Index] = _a[0], this._selectList[this.handleIcon.Index] = _a[1];
            }
            this.refreshCards();
            this.refreshSelectIcon();
        }
        else {
            for (var i = 0; i < this._selectList.length; i++) {
                if (this._selectList[i] && this._selectList[i].servantId == this.handleIcon.servantId) {
                    this._selectList[i] = null;
                    this.refreshCards();
                    this.refreshSelectIcon();
                    break;
                }
            }
        }
        var _a;
    };
    AtkraceSelectView.prototype.getTargetIcon = function (pos) {
        var rsl = null;
        var boxp = this.IconBox.localToGlobal();
        var _a = [pos[0] - boxp.x, pos[1] - boxp.y], dx = _a[0], dy = _a[1];
        if (dy >= 0 && dy <= 82 && dx >= 0 && dx <= 438 && dx % 89 <= 82) {
            var i = Math.floor(dx / 89);
            rsl = this._selectIcon[i] && !this._selectIcon[i].isEmpty ? this._selectIcon[i] : null;
        }
        // for (let i=0;i<this._selectIcon.length;i++) {
        //     if (this._selectIcon[i].isEmpty) continue;
        //     let glp = this._selectIcon[i].localToGlobal();
        //     let [dx, dy] = [pos[0]-glp.x, pos[1]-glp.y];
        //     if (dx >= 0 && dy >= 0 && dx <= 82 && dy <= 82) {
        //         rsl = this._selectIcon[i];
        //         break;
        //     }
        // }
        return rsl;
    };
    /**
     * 出击
     */
    AtkraceSelectView.prototype.onChallengeTap = function () {
        Api.rookieVoApi.checkNextStep();
        // let param: AtkraceSettleInfo = {
        //     type: 2,
        //     fightnum: 10,
        //     name: "lalala",
        //     score: 100,
        //     uid: 1000010,
        //     uname2: "hehehe",
        //     score2: 100,
        //     getReward: "1_1001_10|1_1002_10"
        // }
        // ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESETTLEPOPUPVIEW, param)
        if (this._selectList.filter(function (v) { return v == null; }).length > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_addtext16"));
            return;
        }
        // 免费
        if (this.freeMax > 0 && this.freeNum > 0) {
            this.gotoFight();
            return;
        }
        var _item_name = Config.ItemCfg.getItemCfgById(this.costId).name;
        var _item_num = Api.itemVoApi.getItemNumInfoVoById(this.costId);
        var _tip = LanguageManager.getlocal("atkrace_addtext17", ["1", _item_name]);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
            confirmCallback: this.onConfirmCallBack,
            handler: this,
            icon: "itemicon" + this.costId,
            iconBg: "itembg_1",
            num: _item_num,
            msg: _tip,
            id: this.costId,
            useNum: 1
        });
    };
    AtkraceSelectView.prototype.onConfirmCallBack = function () {
        var _item = Api.itemVoApi.getItemInfoVoById(this.costId);
        if (this.fightType == AtkraceFightTypes.choose) {
            var _limit = Math.floor(this._cardData.length / Config.AtkraceCfg.getParameter1());
            if (_limit <= Api.atkraceVoApi.getMyInfo().extranum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_extro_no_times"));
                return;
            }
        }
        if (_item.num > 0) {
            this.gotoFight();
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
        }
    };
    AtkraceSelectView.prototype.gotoFight = function () {
        var req = "";
        var param = {
            servantList: this._selectList.map(function (v) { return v.servantId; })
        };
        switch (this.fightType) {
            case AtkraceFightTypes.choose:
                req = NetRequestConst.REQUEST_ATKRACE_CHOOSE;
                // 参数 isExtra 是否为购买额外出战标记(0-不是,1-是;默认为0)
                param.isExtra = this.freeMax > 0 && this.freeNum > 0 ? 0 : 1;
                // param.fuid = this.fightUid;
                break;
            case AtkraceFightTypes.revenge:
                req = NetRequestConst.REQUEST_ATKRACE_REVENGE;
                param.fuid = this.fightUid;
                break;
            case AtkraceFightTypes.kill:
                req = NetRequestConst.REQUEST_ATKRACE_KILL;
                param.fuid = this.fightUid;
                break;
            case AtkraceFightTypes.challenge:
                req = NetRequestConst.REQUEST_ATKRACE_CHALLENGE;
                param.fuid = this.fightUid;
                break;
            default:
                return;
        }
        NetManager.request(req, param);
    };
    AtkraceSelectView.prototype.onSelectCallBack = function (e) {
        // console.log(e)
        if (e.data.ret) {
            // todo 去战斗
            // NetManager.request(NetRequestConst.REQUEST_ATKRACE_FIGHT, {});
            ViewController.getInstance().hideView(ViewConst.COMMON.ATKRACEVIEW);
            Api.atkraceVoApi.checkAndStartBattle();
            this.hide();
        }
        else {
            // todo 错误，随便给个提示
        }
    };
    AtkraceSelectView.prototype.getTitleStr = function () {
        return "atkrace_addtext1";
    };
    AtkraceSelectView.prototype.getBorderName = function () {
        return "commonview_border1";
    };
    AtkraceSelectView.prototype.getBgName = function () {
        return "commonview_woodbg";
    };
    AtkraceSelectView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "commonview_border3",
            "commonview_redtitle"
        ]);
    };
    AtkraceSelectView.prototype.dispose = function () {
        this._cardList = null;
        this._cardData = null;
        this._selectList = null;
        this.IconBox = null;
        this._selectIcon = null;
        this.startPos = null;
        this.handleIcon = null;
        this.challengeBtn = null;
        this.challengeIcon = null;
        this.challengeNum = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.doGuide, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHALLENGE), this.onSelectCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REVENGE), this.onSelectCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_KILL), this.onSelectCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHOOSE), this.onSelectCallBack, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ATKRACE, this.onUpdateModel, this);
        _super.prototype.dispose.call(this);
    };
    return AtkraceSelectView;
}(CommonView));
__reflect(AtkraceSelectView.prototype, "AtkraceSelectView");
/**
 * 发起战斗类型
 */
var AtkraceFightTypes;
(function (AtkraceFightTypes) {
    /**随机挑战 1 */
    AtkraceFightTypes[AtkraceFightTypes["choose"] = 1] = "choose";
    /**复仇 2 */
    AtkraceFightTypes[AtkraceFightTypes["revenge"] = 2] = "revenge";
    /**追杀 3 */
    AtkraceFightTypes[AtkraceFightTypes["kill"] = 3] = "kill";
    /**指定挑战 4 */
    AtkraceFightTypes[AtkraceFightTypes["challenge"] = 4] = "challenge";
})(AtkraceFightTypes || (AtkraceFightTypes = {}));
