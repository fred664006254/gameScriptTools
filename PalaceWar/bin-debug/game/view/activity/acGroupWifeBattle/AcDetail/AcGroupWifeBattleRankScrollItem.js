/** 风华群芳   帮会列表
 * anthor
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcGroupWifeBattleRankScrollItem = /** @class */ (function (_super) {
    __extends(AcGroupWifeBattleRankScrollItem, _super);
    function AcGroupWifeBattleRankScrollItem() {
        var _this = _super.call(this) || this;
        // 标题文本
        _this.titleText = null;
        //标题背景
        _this.titleBg = null;
        //内容背景
        _this.descBg = null;
        //内容图片
        _this.descImg = null;
        //内容购买按钮
        _this.descBtn = null;
        //内容时间文本
        _this.descTimeText = null;
        //数据
        _this._data = null;
        _this._itemIndex = null;
        _this._code = null;
        _this._type = 0;
        _this.need = 0;
        _this._waiting = 0;
        return _this;
    }
    AcGroupWifeBattleRankScrollItem.prototype.initItem = function (index, data, bigdata) {
        this._code = bigdata.code;
        this._type = bigdata.type;
        this._waiting = bigdata.waiting;
        this._data = data;
        var nameStr = "battlelistbg1";
        if (index % 2 == 0) {
            nameStr = 'battlelistbg2';
        }
        var bit = BaseBitmap.create(nameStr);
        bit.x = -5;
        this.addChild(bit);
        if (this._type == 2) {
            // var num = Number(Api.mergeServerVoApi.getAfterMergeSeverName().slice(0,1));
            if (data.id == Api.playerVoApi.getPlayerAllianceId()) {
                var bit2 = BaseBitmap.create("battlelisttouch");
                bit2.x = -5;
                this.addChild(bit2);
            }
        }
        if (this._type == 1) {
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
            if (data.name == Api.playerVoApi.getPlayerName()) {
                var bit2 = BaseBitmap.create("battlelisttouch");
                bit2.x = -5;
                this.addChild(bit2);
            }
            this.addTouchTap(function () {
                NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT, {
                    ruid: data.uid,
                    rzid: Api.mergeServerVoApi.getTrueZid(data.uid)
                });
            }, this);
        }
        var base = bigdata.index ? bigdata.index : 0;
        //index 排名
        var rankNum = index + 1 + base;
        var renkDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
        renkDesc.text = rankNum + "";
        renkDesc.y = bit.y + bit.height / 2 - renkDesc.height / 2;
        renkDesc.x = 5;
        renkDesc.width = 70;
        renkDesc.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(renkDesc);
        if (rankNum <= 3) {
            renkDesc.visible = false;
            var rankImg = BaseBitmap.create("newran" + rankNum);
            rankImg.setScale(0.8);
            rankImg.x = 10;
            this.addChild(rankImg);
        }
        //成员名称 
        var nameDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
        nameDesc.y = renkDesc.y;
        nameDesc.width = 150;
        nameDesc.x = 140;
        nameDesc.text = data.name;
        nameDesc.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(nameDesc);
        //帮会名
        var teliminateDesc = ComponentManager.getTextField(LanguageManager.getlocal(""), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
        teliminateDesc.y = renkDesc.y;
        teliminateDesc.x = 326;
        this.addChild(teliminateDesc);
        teliminateDesc.width = 160;
        teliminateDesc.textAlign = TextFieldConst.ALIGH_CENTER;
        teliminateDesc.text = data.gname;
        //分数
        var scoreDesc = ComponentManager.getTextField(LanguageManager.getlocal(""), TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x3e1f0f);
        scoreDesc.y = renkDesc.y;
        // scoreDesc.x = 544;
        scoreDesc.text = (data.value ? data.value : (data.alive ? 0 : (LanguageManager.getlocal("acBattleRoundOut-1")))) + "";
        this.addChild(scoreDesc);
        scoreDesc.x = 500;
        scoreDesc.width = 100;
        scoreDesc.textAlign = TextFieldConst.ALIGH_CENTER;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~type 2 状态~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //帮会名字
        if (this._type == 2) {
            nameDesc.text = data.name;
            nameDesc.x = 145;
        }
        //存活人数
        if (this._type == 2) {
            scoreDesc.x = 490;
            scoreDesc.text = LanguageManager.getlocal("acBattlealivemn", [data.alivemn, data.mn]);
            if (data.alivemn == 0) {
                scoreDesc.text = LanguageManager.getlocal("acBattleRoundOut-1");
                scoreDesc.setColor(0xaa825e);
                teliminateDesc.setColor(0xaa825e);
                nameDesc.setColor(0xaa825e);
                renkDesc.setColor(0xaa825e);
            }
        }
        //区服
        if (this._type == 2) {
            teliminateDesc.text = data.zid;
            teliminateDesc.x = 305;
        }
        if (this._type == 1) {
            // if(data.name==Api.playerVoApi.getPlayerName())
            // {
            // 	scoreDesc.textColor = TextFieldConst.COLOR_BROWN; 
            // 	teliminateDesc.textColor =scoreDesc.textColor;
            // 	nameDesc.textColor =scoreDesc.textColor;
            // 	renkDesc.textColor =scoreDesc.textColor;
            // } 
            // else
            // {	
            if (this.vo.getCurRound() != 0) //活动展示期
             {
                var need = this.cfg.weedOut[this.vo.getCurRound() - 1].btmLine;
                this.need = need;
                if (rankNum > this.need) {
                    scoreDesc.textColor = TextFieldConst.COLOR_WARN_RED2;
                    if (!data.alive || data.alive == 0) {
                        scoreDesc.textColor = 0xaa825e;
                    }
                }
                else {
                    scoreDesc.textColor = TextFieldConst.COLOR_WARN_GREEN2;
                }
                teliminateDesc.textColor = scoreDesc.textColor;
                nameDesc.textColor = scoreDesc.textColor;
                renkDesc.textColor = scoreDesc.textColor;
            }
            else {
                if (this.vo.getCurRound() >= 3) {
                    scoreDesc.textColor = 0xaa825e;
                    teliminateDesc.textColor = scoreDesc.textColor;
                    nameDesc.textColor = scoreDesc.textColor;
                    renkDesc.textColor = scoreDesc.textColor;
                }
            }
        }
        if (this._waiting == 1) {
            scoreDesc.text = LanguageManager.getlocal("acBattleWaiting");
        }
        // if(this._type==2)
        // {
        // 	if(data.name==Api.playerVoApi.getPlayerAllianceName())
        // 	{ 
        // 		// scoreDesc.textColor = TextFieldConst.COLOR_BROWN;
        // 		// teliminateDesc.textColor =scoreDesc.textColor;
        // 		// nameDesc.textColor =scoreDesc.textColor;
        // 		// renkDesc.textColor =scoreDesc.textColor;
        // 	} 
        // }
    };
    AcGroupWifeBattleRankScrollItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        if (String(data.ruid) == this._data.uid) {
            if (event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT) {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid(this._data.uid);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        }
    };
    Object.defineProperty(AcGroupWifeBattleRankScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_GROUPWIFEBATTLE, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGroupWifeBattleRankScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_GROUPWIFEBATTLE, this._code);
        },
        enumerable: true,
        configurable: true
    });
    AcGroupWifeBattleRankScrollItem.prototype.getSpaceY = function () {
        return -5;
    };
    AcGroupWifeBattleRankScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcGroupWifeBattleRankScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT), this.userShotCallback, this);
        this.titleText = null;
        //标题背景
        this.titleBg = null;
        //内容背景
        this.descBg = null;
        //内容图片
        this.descImg = null;
        //内容购买按钮
        this.descBtn = null;
        //内容时间文本
        this.descTimeText = null;
        //数据
        this.need = 0;
        this._data = null;
        this._itemIndex = null;
        _super.prototype.dispose.call(this);
    };
    return AcGroupWifeBattleRankScrollItem;
}(ScrollListItem));
//# sourceMappingURL=AcGroupWifeBattleRankScrollItem.js.map