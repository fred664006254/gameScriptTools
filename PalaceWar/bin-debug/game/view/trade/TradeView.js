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
 * 贸易
 * author yanyuling
 * date 2018/01/04
 * @class TradeView
 */
var TradeView = (function (_super) {
    __extends(TradeView, _super);
    function TradeView() {
        var _this = _super.call(this) || this;
        _this._preCid = 0;
        _this._lastNameCid = 0;
        _this._bgH = 1274;
        _this._lastTradeName = "";
        _this._lastTradeGold = 0;
        _this._lastTradeInte = 0;
        _this._laseIdStr = '';
        _this._btomY = 0;
        _this._shipMoving = false;
        _this.shipCfg = [
            {
                id: 0,
                shipid: 2,
                portid: 1,
                portPosx: 96,
                portPosy: 0,
                shipPosX: 219,
                shipPosY: 144,
            }, {
                id: 1,
                shipid: 2,
                portid: 4,
                portPosx: 101,
                portPosy: 144,
                shipPosX: 198,
                shipPosY: 289,
            },
            {
                id: 2,
                shipid: 3,
                portid: 2,
                portPosx: 467,
                portPosy: 292,
                shipPosX: 521,
                shipPosY: 450,
            },
            {
                id: 3,
                shipid: 2,
                portid: 3,
                portPosx: 36,
                portPosy: 482,
                shipPosX: 113,
                shipPosY: 654,
            },
            {
                id: 4,
                shipid: 3,
                portid: 5,
                portPosx: 391,
                portPosy: 664,
                shipPosX: 409,
                shipPosY: 803,
            },
            {
                id: 5,
                shipid: 2,
                portid: 1,
                portPosx: 0,
                portPosy: 787,
                shipPosX: 130,
                shipPosY: 942,
            },
            {
                id: 6,
                shipid: 3,
                portid: 2,
                portPosx: 427,
                portPosy: 959,
                shipPosX: 401,
                shipPosY: 1078,
            },
            {
                id: 7,
                shipid: 2,
                portid: 3,
                portPosx: 32,
                portPosy: 1054,
                shipPosX: 111,
                shipPosY: 1223,
            },
            {
                id: 8,
                shipid: 3,
                portid: 3,
                portPosx: 449,
                portPosy: 1255,
                shipPosX: 494,
                shipPosY: 1416,
            }
        ];
        _this.shipNumPerPage = _this.shipCfg.length - 1;
        _this.lastGoldNum = 0;
        _this._flag = 0;
        _this._batchBtn = null;
        return _this;
    }
    Object.defineProperty(TradeView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    TradeView.prototype.getContainerY = function () {
        return 0;
    };
    TradeView.prototype.getBigFrame = function () {
        return null;
    };
    TradeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_INDEX), this.indexInterfaceCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_FIGHT), this.refreshAfterTrade, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_BATCHFIGHT), this.refreshAfterTrade, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_TRADE_AFTER_FIGHT, this.refreshTradeInfoAfterFight, this);
        // NetManager.request(NetRequestConst.REQUEST_TRADE_INDEX,{});
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._nodeContainer2 = new BaseDisplayObjectContainer();
        var bg = BaseBitmap.create("trade_bg");
        var bg2 = BaseBitmap.create("trade_bg");
        this._bg1 = new BaseDisplayObjectContainer();
        this._bg1.addChild(bg);
        this._bg2 = new BaseDisplayObjectContainer();
        this._bg2.y = bg.height;
        this._bg2.addChild(bg2);
        this._bgH = bg.height;
        this._curTopBg = this._bg1;
        this._nextTopBg = this._bg2;
        this._nodeContainer.addChild(this._bg2);
        this._nodeContainer.addChild(this._bg1);
        this._tradeArrow = BaseBitmap.create("trade_arrow");
        this._tradeArrow.anchorOffsetY = this._tradeArrow.height;
        this._tradeArrow.anchorOffsetX = this._tradeArrow.width / 2;
        this._nodeContainer.addChild(this._tradeArrow);
        for (var index_1 = 0; index_1 < this.shipNumPerPage * 2; index_1++) {
            var id = index_1 % this.shipNumPerPage + 1;
            var cfg = this.shipCfg[id];
            var portImg = BaseBitmap.create("trade_port" + cfg.portid);
            portImg.x = cfg.portPosx;
            portImg.y = cfg.portPosy;
            if (index_1 == 0) {
                var shipImg = BaseBitmap.create("trade_ship" + cfg.shipid);
                shipImg.x = cfg.shipPosX;
                shipImg.y = cfg.shipPosY;
                this._shipImg = shipImg;
                this._shipImg.visible = false;
                this._nodeContainer.addChild(shipImg);
            }
            portImg.name = "portImg" + id;
            var namebg = BaseBitmap.create("trade_namebg_red");
            // namebg.width = 160;
            namebg.x = portImg.x + 20;
            namebg.name = "namebg" + id;
            var nameTxt = ComponentManager.getTextField("", 20);
            //名字竖改横
            if (PlatformManager.checkIsTextHorizontal()) {
                namebg.y = portImg.y + portImg.height / 2 - namebg.height / 2 - 40;
            }
            else {
                namebg.y = portImg.y + portImg.height / 2 - namebg.height / 2;
                nameTxt.width = 21;
            }
            nameTxt.multiline = true;
            nameTxt.x = namebg.x + namebg.width / 2;
            nameTxt.y = namebg.y + namebg.height / 2;
            nameTxt.name = "nameTxt" + id;
            if (index_1 < this.shipNumPerPage) {
                this._bg1.addChild(portImg);
                this._bg1.addChild(namebg);
                this._bg1.addChild(nameTxt);
            }
            else {
                this._bg2.addChild(portImg);
                this._bg2.addChild(namebg);
                this._bg2.addChild(nameTxt);
            }
        }
        if (!Api.switchVoApi.checkOpenShenhe()) {
            this.makeRankBtn();
        }
        var bottomBg = BaseBitmap.create("trade_bottombg");
        // bottomBg.height= 227;
        bottomBg.y = GameConfig.stageHeigth - this._nodeContainer.y - bottomBg.height - this.container.y;
        this._nodeContainer2.addChild(bottomBg);
        this._btomY = bottomBg.y;
        var bottomBg2 = BaseBitmap.create("trade_bottomnumbg");
        // bottomBg2.width = GameConfig.stageWidth;
        // bottomBg2.height= 62;
        bottomBg2.x = 30;
        bottomBg2.y = bottomBg.y + 55;
        this._nodeContainer2.addChild(bottomBg2);
        this._curTradeNameTxt = ComponentManager.getTextField("", 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curTradeNameTxt.x = bottomBg2.x + 25;
        this._curTradeNameTxt.y = bottomBg2.y + bottomBg2.height / 2 - 12;
        this._nodeContainer2.addChild(this._curTradeNameTxt);
        var getTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("conquestGetItem"), 20, TextFieldConst.COLOR_BROWN);
        getTipTxt.x = 40;
        getTipTxt.y = bottomBg2.y + 48;
        this._nodeContainer2.addChild(getTipTxt);
        this._rewardNodeContainer = new BaseDisplayObjectContainer();
        this._rewardNodeContainer.x = bottomBg.x;
        this._rewardNodeContainer.y = bottomBg.y;
        this._nodeContainer2.addChild(this._rewardNodeContainer);
        var isBatch = Api.tradeVoApi.isBatchEnable();
        if (!isBatch) {
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("tradeBatchTip"), 20, TextFieldConst.COLOR_BROWN);
            tipTxt.x = 50;
            tipTxt.y = bottomBg.y + bottomBg.height - 60;
            tipTxt.name = "tipTxt";
            this._nodeContainer2.addChild(tipTxt);
        }
        var batchBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "tradeBatchBtn", this.batchHandler, this);
        batchBtn.x = GameConfig.stageWidth / 2 - batchBtn.width - 50;
        batchBtn.y = bottomBg.y + bottomBg.height - 80;
        this._batchBtn = batchBtn;
        batchBtn.visible = isBatch;
        this._nodeContainer2.addChild(batchBtn);
        var tradeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "tradeBtn", this.tradeBtnHandler, this);
        tradeBtn.x = GameConfig.stageWidth / 2 + 50;
        tradeBtn.y = batchBtn.y;
        this._nodeContainer2.addChild(tradeBtn);
        var resCfg = [
            {
                icon: "public_icon_zhi",
                posx: 260,
                // posx:360,
                posy: -5 - 6 + 5,
                num: Api.playerVoApi.getRealInte()
            },
            {
                icon: "public_icon2",
                // posx:150,
                posx: 50,
                posy: -5 - 6 + 5,
                num: Api.playerVoApi.getPlayerGoldStr()
            },
            {
                icon: "public_icon_zhi",
                posx: 450,
                posy: bottomBg2.y - 5 - 6,
                num: ""
            },
            {
                icon: "public_icon2",
                posx: 290,
                posy: bottomBg2.y - 5 - 6,
                num: ""
            },
        ];
        for (var index = 0; index < resCfg.length; index++) {
            var tmpcfg = resCfg[index];
            var resbg = BaseBitmap.create("public_9_resbg");
            resbg.x = tmpcfg.posx;
            resbg.y = tmpcfg.posy + 14;
            this._nodeContainer2.addChild(resbg);
            var resIcon = BaseBitmap.create(tmpcfg.icon);
            resIcon.x = resbg.x - 2;
            resIcon.y = resbg.y - 5;
            this._nodeContainer2.addChild(resIcon);
            var numTxt = ComponentManager.getTextField(String(tmpcfg.num), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            numTxt.setPosition(resIcon.x + 50, resIcon.y + 12 + 5);
            this._nodeContainer2.addChild(numTxt);
            numTxt.name = "numTxt" + index;
            if (index > 1) {
                numTxt.setPosition(resIcon.x + resIcon.width, resIcon.y + 15);
                resbg.visible = false;
                numTxt.textColor = TextFieldConst.COLOR_BLACK;
            }
        }
        var mask = BaseBitmap.create("public_9_viewmask");
        mask.width = GameConfig.stageWidth;
        mask.height = 56;
        mask.y = -1;
        this.addChildToContainer(mask);
        this.addChildToContainer(this._nodeContainer2);
        this.lastGoldNum = Api.playerVoApi.getPlayerGold();
        this.setBatchInfo(true);
        this.refreshTradeInfo();
        this.refreshBaseInfo();
    };
    TradeView.prototype.makeRankBtn = function () {
        var forpeople_bottom = BaseBitmap.create("forpeople_bottom");
        forpeople_bottom.x = 5;
        forpeople_bottom.y = 50;
        this._nodeContainer2.addChild(forpeople_bottom);
        var rankBtn = ComponentManager.getButton("trade_tanlBtn", "", this.rankBtnHandler, this);
        rankBtn.x = forpeople_bottom.x + forpeople_bottom.width / 2 - rankBtn.width / 2 + 8;
        rankBtn.y = forpeople_bottom.y + forpeople_bottom.height / 2 - rankBtn.height / 2;
        this._nodeContainer2.addChild(rankBtn);
    };
    TradeView.prototype.setBatchInfo = function (isInit) {
        var cid = Number(Api.tradeVoApi.getCurrentCid());
        if (isInit || cid - this._preCid > 1) {
            this._bg1.y = 0;
            this._bg2.y = this._bgH;
            this._curTopBg = this._bg1;
            this._nextTopBg = this._bg2;
            this._nodeContainer.y = 0;
            this._tradeArrow.y = 0;
            this._shipImg.y = 0;
            var curIdx = (cid - 1) % this.shipNumPerPage + 1;
            var maxCid = Config.TradeCfg.getMaxTradeIndex();
            if (cid > maxCid) {
                cid = maxCid;
            }
            this._lastNameCid = Math.floor((cid - curIdx) / this.shipNumPerPage) * this.shipNumPerPage;
        }
    };
    TradeView.prototype.refreshTradeInfo = function () {
        this.setBatchInfo();
        var cid = Number(Api.tradeVoApi.getCurrentCid());
        var maxCid = Config.TradeCfg.getMaxTradeIndex();
        if (cid - 1 == maxCid) {
            cid = maxCid;
        }
        var tradeCfg = Config.TradeCfg.getTradeCfgById(String(cid));
        if (tradeCfg == null) {
            return;
        }
        var numTxt2 = this._nodeContainer2.getChildByName("numTxt2");
        var numTxt3 = this._nodeContainer2.getChildByName("numTxt3");
        numTxt2.text = App.StringUtil.changeIntToText(tradeCfg.tradeInte);
        numTxt3.text = App.StringUtil.changeIntToText(tradeCfg.tradeGold);
        this._curTradeNameTxt.text = cid + " . " + tradeCfg.tradeName;
        this._lastTradeName = tradeCfg.tradeName;
        this._lastTradeGold = tradeCfg.tradeGold;
        this._lastTradeInte = tradeCfg.tradeInte;
        this._rewardNodeContainer.removeChildren();
        var rewards = Api.tradeVoApi.getCurrentRewards();
        if (rewards.length > 0) {
            var rewarsStr = rewards.join("|");
            var rewardArr = GameData.getRewardItemIcons(rewarsStr, true);
            var scaleV = 0.80;
            for (var index = 0; index < rewardArr.length; index++) {
                var icon = rewardArr[index];
                icon.setScale(scaleV);
                icon.x = 25 + (icon.width * scaleV + 10) * index;
                icon.y = 127;
                this._rewardNodeContainer.addChild(icon);
            }
        }
        var isShowAni = true;
        var tmpIdpre = (cid - 2) % this.shipNumPerPage + 1;
        var tmpId = (cid - 1) % this.shipNumPerPage + 1;
        if (this._preCid == 0 || cid - this._preCid > 1) {
            isShowAni = false;
            this._preCid = cid;
            if (tmpId == 1 && cid > 1) {
                this._curTopBg = this._bg2;
                this._nextTopBg = this._bg1;
            }
        }
        var cfg = this.shipCfg[tmpId];
        var cfgpre = this.shipCfg[tmpIdpre];
        /**
         * 需要移动
         */
        var deltaY = 0;
        var tarPosY = GameConfig.stageHeigth / 2 - 100;
        if (this._curTopBg.y + cfg.shipPosY > tarPosY) {
            deltaY = cfg.shipPosY + this._curTopBg.y - tarPosY;
        }
        this._shipImg.texture = ResourceManager.getRes("trade_ship" + cfg.shipid);
        if (!isShowAni) {
            egret.Tween.removeTweens(this._tradeArrow);
            this._tradeArrow.x = this._curTopBg.x + cfg.portPosx + 104;
            this._tradeArrow.y = this._curTopBg.y + cfg.portPosy + 30;
            egret.Tween.get(this._tradeArrow, { loop: true }).to({ y: this._tradeArrow.y + 30 }, 1000).to({ y: this._tradeArrow.y }, 1000);
            this._shipImg.y = this._curTopBg.y + cfg.shipPosY;
            this._shipImg.x = cfg.shipPosX;
            this._shipImg.visible = true;
            this._nodeContainer.y -= deltaY;
            this.refreshNameTxt(true);
            this.refreshnameBg(tmpId);
            this._preCid = cid;
            return;
        }
        var isAtNextBg = false;
        deltaY = cfg.shipPosY - cfgpre.shipPosY;
        if (deltaY < 0) {
            deltaY += this._bgH;
            isAtNextBg = true;
        }
        var tmpPosY = this._nodeContainer.y - deltaY;
        this._shipImg.x = cfgpre.shipPosX;
        if (tmpPosY > 0)
            tmpPosY = 0;
        var isMoveBg = false;
        var tmpPort = undefined;
        this._preCid = cid;
        if (this._curTopBg.y < this._nextTopBg.y) {
            if (this._curTopBg.y + this._bgH + tmpPosY <= this.container.y - 15) {
                isMoveBg = true;
                tmpPort = this._curTopBg.getChildByName("portImg" + tmpId);
            }
        }
        else {
            if (this._nextTopBg.y + this._bgH + tmpPosY <= this.container.y - 15) {
                isMoveBg = true;
                tmpPort = this._nextTopBg.getChildByName("portImg" + tmpId);
            }
        }
        if (!isMoveBg) {
            this.refreshnameBg(tmpId, isAtNextBg);
            egret.Tween.removeTweens(this._tradeArrow);
            if (isAtNextBg) {
                this._tradeArrow.x = this._nextTopBg.x + cfg.portPosx + 104;
                this._tradeArrow.y = this._nextTopBg.y + cfg.portPosy + 30;
            }
            else {
                this._tradeArrow.x = this._curTopBg.x + cfg.portPosx + 104;
                this._tradeArrow.y = this._curTopBg.y + cfg.portPosy + 30;
            }
            this._nodeContainer.setChildIndex(this._tradeArrow, 3);
            egret.Tween.get(this._tradeArrow, { loop: true }).to({ y: this._tradeArrow.y + 30 }, 1000).to({ y: this._tradeArrow.y }, 1000);
        }
        var tmpthis = this;
        var moveT = 10000 * Math.abs(deltaY) / this._bgH;
        // let moveT2 = 5000*Math.abs(deltaY)/this._bgH;
        var moveT2 = moveT;
        /**
         * 现有问题:
         * 1.建筑背景选中状态不对
         * 2.一键贸易，次数较大时滑动有问题
         */
        this._shipImg.texture = ResourceManager.getRes("trade_ship" + cfg.shipid);
        this._shipMoving = true;
        egret.Tween.get(this._shipImg, { loop: false }).to({ x: cfg.shipPosX, y: this._shipImg.y + deltaY }, moveT2).call(function () {
            tmpthis._shipMoving = false;
        }, this);
        egret.Tween.get(this._nodeContainer, { loop: false }).to({ y: tmpPosY }, moveT).call(function () {
            if (isMoveBg) {
                if (tmpthis._bg1.y < tmpthis._bg2.y) {
                    tmpthis._bg1.y += tmpthis._bgH * 2;
                    tmpthis._curTopBg = tmpthis._bg2;
                    tmpthis._nextTopBg = tmpthis._bg1;
                }
                else {
                    tmpthis._bg2.y += tmpthis._bgH * 2;
                    tmpthis._curTopBg = tmpthis._bg1;
                    tmpthis._nextTopBg = tmpthis._bg2;
                }
                tmpthis._nodeContainer.swapChildren(tmpthis._curTopBg, tmpthis._nextTopBg);
                egret.Tween.removeTweens(tmpthis._tradeArrow);
                tmpthis._tradeArrow.x = tmpthis._curTopBg.x + cfg.portPosx + 104;
                tmpthis._tradeArrow.y = tmpthis._curTopBg.y + cfg.portPosy + 30;
                egret.Tween.get(tmpthis._tradeArrow, { loop: true }).to({ y: tmpthis._tradeArrow.y + 30 }, 1000).to({ y: tmpthis._tradeArrow.y }, 1000);
                tmpthis.refreshNameTxt();
                tmpthis.refreshnameBg(tmpId);
            }
        }, this);
    };
    TradeView.prototype.refreshnameBg = function (tmpIdx, isAtNextBg) {
        var bg_gray = "trade_namebg_gray";
        var bg_red = "trade_namebg_red";
        var cid = Number(Api.tradeVoApi.getCurrentCid());
        for (var index = 1; index <= this.shipNumPerPage; index++) {
            var namebg = this._curTopBg.getChildByName("namebg" + index);
            var namebg2 = this._nextTopBg.getChildByName("namebg" + index);
            if (!isAtNextBg) {
                if (this._curTopBg.y < this._nextTopBg.y) {
                    namebg2.texture = ResourceManager.getRes(bg_gray);
                }
                else {
                    namebg2.texture = ResourceManager.getRes(bg_red);
                }
                if (index > tmpIdx) {
                    namebg.texture = ResourceManager.getRes(bg_gray);
                }
                else {
                    namebg.texture = ResourceManager.getRes(bg_red);
                }
            }
            else {
                namebg.texture = ResourceManager.getRes(bg_red);
                if (index > tmpIdx) {
                    namebg2.texture = ResourceManager.getRes(bg_gray);
                }
                else {
                    namebg2.texture = ResourceManager.getRes(bg_red);
                }
            }
        }
    };
    TradeView.prototype.refreshNameTxt = function (isFrist) {
        var deltaValue = this.shipNumPerPage;
        for (var index = 1; index <= this.shipNumPerPage; index++) {
            var txt2 = this._nextTopBg.getChildByName("nameTxt" + index);
            var namebg2 = this._nextTopBg.getChildByName("namebg" + index);
            var portImg2 = this._nextTopBg.getChildByName("portImg" + index);
            if (isFrist) {
                var portImg1 = this._curTopBg.getChildByName("portImg" + index);
                var namebg1 = this._curTopBg.getChildByName("namebg" + index);
                var txt1 = this._curTopBg.getChildByName("nameTxt" + index);
                this.dealTradeName(txt1, namebg1, portImg1, this._lastNameCid + index);
                this.dealTradeName(txt2, namebg2, portImg2, this._lastNameCid + index + deltaValue);
            }
            else {
                this.dealTradeName(txt2, namebg2, portImg2, this._lastNameCid + index);
            }
        }
        if (isFrist) {
            this._lastNameCid += this.shipNumPerPage * 2;
        }
        else {
            this._lastNameCid += this.shipNumPerPage;
        }
    };
    TradeView.prototype.dealTradeName = function (txt, namebg, portImg, tmpId) {
        var maxCid = Config.TradeCfg.getMaxTradeIndex();
        /**
         * 超出范围，隐藏处理
         */
        if (tmpId > maxCid) {
            txt.visible = false;
            namebg.visible = false;
            portImg.visible = false;
        }
        txt.text = LanguageManager.getlocal("tradeName" + tmpId);
        txt.anchorOffsetX = txt.width / 2;
        txt.anchorOffsetY = txt.height / 2;
    };
    TradeView.prototype.refreshBaseInfo = function () {
        var numTxt0 = this._nodeContainer2.getChildByName("numTxt0");
        var numTxt1 = this._nodeContainer2.getChildByName("numTxt1");
        numTxt1.text = Api.playerVoApi.getPlayerGoldStr();
        var addInfo = Api.tradeVoApi.getDecreePolicyAddAttrInfo();
        var addV = 0;
        if (addInfo) {
            if (!this._decreeAddTxt) {
                this._decreeAddTxt = ComponentManager.getTextField("", numTxt0.size, TextFieldConst.COLOR_WARN_YELLOW2);
                this._decreeAddTxt.setPosition(numTxt0.x + numTxt0.width + 10, numTxt0.y);
                this._nodeContainer2.addChild(this._decreeAddTxt);
            }
            if (addInfo.lastTimes > 0) {
                addV = Math.floor(Api.playerVoApi.getInte() * addInfo.addExtent);
                this._decreeAddTxt.text = LanguageManager.getlocal(addInfo.strKey, [addInfo.strKey2, App.StringUtil.changeIntToText(addV)]);
                // operation by shaoliang
                // this._decreeAddTxt.visible = false;
            }
            else {
                this._decreeAddTxt.text = "";
            }
        }
        // if (Api.otherInfoVoApi.isHasScene("303","searchScene") || Api.otherInfoVoApi.isHasSceneUnlock("303","searchScene"))
        // {
        // 	let abilitycfg = Config.SceneCfg.getSceneCfgBySceneName("searchScene","303").personalityCfg;
        // 	if (abilitycfg.buffValue)
        // 	{
        // 		addV += Api.playerVoApi.getInte()*abilitycfg.buffValue;
        // 		addV= Math.floor(addV+0.5);
        // 	}
        // }
        numTxt0.text = App.StringUtil.changeIntToText(Api.playerVoApi.getRealInte() + addV);
    };
    TradeView.prototype.indexInterfaceCallBack = function (event) {
        if (event && event.data && event.data.ret) {
            var rdata = event.data.data;
            if (rdata.data.trade._flag) {
                this._flag = rdata.data.trade._flag;
            }
            //解锁一键商贸
            var isBatch = Api.tradeVoApi.isBatchEnable();
            var tipTxt = this._nodeContainer2.getChildByName("tipTxt");
            if (tipTxt) {
                tipTxt.visible = !isBatch;
            }
            this._batchBtn.visible = isBatch;
        }
    };
    TradeView.prototype.refreshTradeInfoAfterFight = function () {
        var cid = Number(Api.tradeVoApi.getCurrentCid());
        var maxCid = Config.TradeCfg.getMaxTradeIndex();
        if (cid <= maxCid || (cid > maxCid && cid - this._preCid > 1)) {
            this.refreshTradeInfo();
        }
    };
    TradeView.prototype.refreshAfterTrade = function (event) {
        if (event && event.data && event.data.ret) {
            var rdata = event.data.data;
            this.refreshBaseInfo();
            if (event.type == NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_BATCHFIGHT) || Api.tradeVoApi.getCurrentTradeCfg()) {
                NetManager.request(NetRequestConst.REQUEST_TRADE_INDEX, {});
            }
            var data = {};
            data.consumeGold = rdata.data.fightusegold;
            data.rdata = rdata;
            //一键商贸
            if (event.type == NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_BATCHFIGHT)) {
                var lastTradeNum = Number(Api.tradeVoApi.getCurrentCid()) - 1;
                var str = LanguageManager.getlocal("tradeName" + lastTradeNum);
                data.tradeName = str;
                ViewController.getInstance().openView(ViewConst.COMMON.TRADEINFOPOPUPVIEW, data);
            }
            else {
                data.rewards = rdata.rewards; //this._lastRewards;
                data.tradeName = this._lastTradeName;
                data.tradeGold = this._lastTradeGold;
                data.tradeInte = this._lastTradeInte;
                ViewController.getInstance().openView(ViewConst.COMMON.TRADEFIGHTVIEW, data);
            }
        }
    };
    TradeView.prototype.getRuleInfo = function () {
        if (Api.switchVoApi.checkIsSceneState("303")) {
            return "tradeViewDesc2";
        }
        else {
            return "tradeViewDesc";
        }
    };
    // protected getRuleInfoParam():string[]
    // { 
    //     var zoneStr:number = 1;   
    //     zoneStr =  App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;   
    // 	return [zoneStr+""];
    // }
    TradeView.prototype.getRuleInfoParam = function () {
        var zoneStr = 0;
        zoneStr = App.DateUtil.formatSvrHourByLocalTimeZone(0).hour;
        if (Api.switchVoApi.checkIsSceneState("303")) {
            var force1 = Api.playerVoApi.getInte();
            var force2 = 0;
            if (Api.otherInfoVoApi.isHasScene("303", "searchScene")) {
                var abilitycfg = Config.SceneCfg.getSceneCfgBySceneName("searchScene", "303").personalityCfg;
                force2 = Math.floor(force1 * abilitycfg.buffValue + 0.5);
            }
            return [zoneStr + "", String(force1 + force2), String(force1), String(force2)];
        }
        else {
            return [zoneStr + ""];
        }
    };
    TradeView.prototype.rankBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.TRADERANKLISTVIEW);
    };
    TradeView.prototype.batchHandler = function () {
        if (this._shipMoving) {
            return;
        }
        if (Api.tradeVoApi.isBatchEnable() == false) {
            return;
        }
        var tradeCfg = Api.tradeVoApi.getCurrentTradeCfg();
        if (tradeCfg == null) 
        // if(Config.TradeCfg.getMaxTradeIndex()+1 == Number(Api.tradeVoApi.getCurrentCid()))
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("tradeMaxIdxTip"));
            return;
        }
        if (Api.playerVoApi.getPlayerGold() <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("tradeGoldTip1"));
            return;
        }
        if (Api.tradeVoApi.getAttNum(Number(Api.tradeVoApi.getCurrentCid())) <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("tradeGoldTip2"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.TRADEONEKEYPOPUPVIEW, { callback: this.callbackHandler, handler: this });
    };
    TradeView.prototype.callbackHandler = function (itemNum) {
        var currId = Number(Api.tradeVoApi.getCurrentCid());
        var carNum = currId + itemNum;
        NetManager.request(NetRequestConst.REQUEST_TRADE_BATCHFIGHT, { cid: carNum });
    };
    TradeView.prototype.tradeBtnHandler = function () {
        if (this._shipMoving) {
            return;
        }
        if (Api.playerVoApi.getPlayerGold() <= 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("tradeGoldTip1"));
            return;
        }
        var tradeCfg = Api.tradeVoApi.getCurrentTradeCfg();
        if (tradeCfg == null) 
        // if(Config.TradeCfg.getMaxTradeIndex()+1 == Number(Api.tradeVoApi.getCurrentCid()))
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("tradeMaxIdxTip"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_TRADE_FIGHT, {});
    };
    TradeView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "trade_bg", "forpeople_bottom", "trade_tanlBtn", "trade_tanlBtn_down", "studyatk_master_bg",
            "trade_ship1", "trade_ship2", "trade_ship3", "trade_pb_bottombg",
            "trade_port1", "trade_port2", "trade_port3", "trade_port4", "trade_port5", "servant_infoPro2",
            "trade_arrow", "trade_bottombg", "trade_bottomnumbg", "trade_namebg_gray", "trade_namebg_red",
            "trade_bg2", "jpgold_1", "jpgold_2", "jpgold_3"
        ]);
    };
    TradeView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_INDEX), this.indexInterfaceCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_FIGHT), this.refreshAfterTrade, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_BATCHFIGHT), this.refreshAfterTrade, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_TRADE_AFTER_FIGHT, this.refreshTradeInfoAfterFight, this);
        this._curTradeNameTxt = null;
        this._nodeContainer = null;
        this._nodeContainer2 = null;
        this._rewardNodeContainer = null;
        this._bg1 = null;
        this._bg2 = null;
        this._curTopBg = null;
        this._nextTopBg = null;
        this._shipImg = null;
        this._preCid = 0;
        this._lastNameCid = 0;
        this.lastGoldNum = 0;
        this._lastTradeName = null;
        this._lastTradeGold = null;
        this._lastTradeInte = null;
        this._tradeArrow = null;
        this._shipMoving = false;
        this._decreeAddTxt = null;
        _super.prototype.dispose.call(this);
    };
    return TradeView;
}(CommonView));
__reflect(TradeView.prototype, "TradeView");
//# sourceMappingURL=TradeView.js.map