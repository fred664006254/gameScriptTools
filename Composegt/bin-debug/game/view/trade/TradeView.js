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
        _this._bgW = 1280;
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
                portPosX: 987,
                portPosY: 1136 - 326 - 170,
                shipPosX: 920,
                shipPosY: 617
            },
            {
                id: 1,
                shipid: 1,
                portid: 2,
                portPosX: 774,
                portPosY: 1136 - 600 - 170,
                shipPosX: 780,
                shipPosY: 457
            },
            {
                id: 2,
                shipid: 2,
                portid: 3,
                portPosX: 650,
                portPosY: 1136 - 346 - 170,
                shipPosX: 570,
                shipPosY: 607
            },
            {
                id: 3,
                shipid: 1,
                portid: 4,
                portPosX: 347,
                portPosY: 1136 - 648 - 170,
                shipPosX: 420,
                shipPosY: 437
            },
            {
                id: 4,
                shipid: 2,
                portid: 5,
                portPosX: 168,
                portPosY: 1136 - 326 - 170,
                shipPosX: 190,
                shipPosY: 582
            },
            {
                id: 5,
                shipid: 1,
                portid: 6,
                portPosX: 10,
                portPosY: 1136 - 584 - 170,
                shipPosX: 0,
                shipPosY: 462
            },
        ];
        _this.shipNumPerPage = _this.shipCfg.length;
        _this.lastGoldNum = 0;
        _this._flag = 0;
        _this._batchBtn = null;
        return _this;
    }
    TradeView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_INDEX), this.indexInterfaceCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_FIGHT), this.refreshAfterTrade, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_BATCHFIGHT), this.refreshAfterTrade, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_TRADE_AFTER_FIGHT, this.refreshTradeInfoAfterFight, this);
        // NetManager.request(NetRequestConst.REQUEST_TRADE_INDEX,{});
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.x;
        this._nodeContainer.width = 2560; //1280;
        this._nodeContainer.height = 1136;
        this._nodeContainer.name = "node--->";
        this._nodeContainer.y = -this.container.y - (1136 - GameConfig.stageHeigth);
        this.addChildToContainer(this._nodeContainer);
        this._nodeContainer2 = new BaseDisplayObjectContainer();
        var bg = BaseLoadBitmap.create("trade_bg1");
        bg.width = 1280;
        bg.height = 1136;
        var bg2 = BaseLoadBitmap.create("trade_bg1");
        bg2.width = 1280;
        bg2.height = 1136;
        this._bg1 = new BaseDisplayObjectContainer();
        this._bg1.name = "bg1";
        this._bg1.width = bg.width;
        this._bg1.height = bg.height;
        this._bg1.addChild(bg);
        this._bg2 = new BaseDisplayObjectContainer();
        this._bg2.name = "bg2";
        this._bg2.width = bg2.width;
        this._bg2.height = bg2.height;
        this._bg2.addChild(bg2);
        this._curTopBg = this._bg1;
        this._nextTopBg = this._bg2;
        this._nodeContainer.addChild(this._bg2);
        this._nodeContainer.addChild(this._bg1);
        this._tradeArrow = BaseBitmap.create("trade_arrow");
        this._tradeArrow.anchorOffsetY = this._tradeArrow.height;
        this._tradeArrow.anchorOffsetX = this._tradeArrow.width / 2;
        this._nodeContainer.addChild(this._tradeArrow);
        for (var index_1 = 0; index_1 < this.shipNumPerPage * 2; index_1++) {
            var id = index_1 % this.shipNumPerPage;
            var cfg = this.shipCfg[id];
            id = id + 1;
            var portImg = BaseLoadBitmap.create("trade_port" + cfg.portid);
            portImg.width = 293;
            portImg.height = 170;
            portImg.x = cfg.portPosX;
            portImg.y = cfg.portPosY;
            if (index_1 == 0) {
                this._shipImg = new BaseDisplayObjectContainer();
                this._shipImg.width = 154;
                this._shipImg.height = 154;
                this._shipImg.x = cfg.shipPosX;
                this._shipImg.y = cfg.shipPosY;
                this._nodeContainer.addChild(this._shipImg);
                this._shipImgAnim1 = ComponentManager.getCustomMovieClip("trade_carriage1_", 4, 120);
                this._shipImgAnim1.name = "shipImgAnim1";
                this._shipImgAnim1.visible = false;
                this._shipImgAnim1.playWithTime(-1);
                this._shipImg.addChild(this._shipImgAnim1);
                this._shipImgAnim2 = ComponentManager.getCustomMovieClip("trade_carriage2_", 4, 120);
                this._shipImgAnim2.name = "shipImgAnim2";
                this._shipImgAnim2.visible = false;
                this._shipImgAnim2.playWithTime(-1);
                this._shipImg.addChild(this._shipImgAnim2);
                this._shipImg1 = BaseBitmap.create("trade_carri1");
                this._shipImg1.name = "_shipImg1";
                this._shipImg1.visible = false;
                this._shipImg.addChild(this._shipImg1);
                this._shipImg2 = BaseBitmap.create("trade_carri2");
                this._shipImg2.name = "shipImg2";
                this._shipImg2.visible = false;
                this._shipImg.addChild(this._shipImg2);
            }
            portImg.name = "portImg" + id;
            var namebg = BaseBitmap.create("trade_namebg");
            // namebg.width = 160;
            namebg.x = portImg.x + 50;
            namebg.y = portImg.y + 50;
            namebg.name = "namebg" + id;
            var nameTxt = ComponentManager.getTextField("", 20);
            nameTxt.multiline = true;
            nameTxt.x = portImg.x + 147;
            nameTxt.y = portImg.y + 40;
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
        var bottomBg = BaseLoadBitmap.create("public_9_wordbg");
        bottomBg.height = 312;
        bottomBg.y = GameConfig.stageHeigth - this._nodeContainer2.y - bottomBg.height - this.container.y;
        this._nodeContainer2.addChild(bottomBg);
        this._btomY = bottomBg.y;
        this._curTopBg.x = 1280;
        // this._curTopBg.y = GameConfig.stageHeigth - this._bottomBg.y - 1136 + 200;
        this._nextTopBg.x = 0;
        // this._nextTopBg.y = this._curTopBg.y;
        var bottomBg2 = BaseBitmap.create("public_biaotinew");
        // bottomBg2.width = GameConfig.stageWidth;
        // bottomBg2.height= 62;
        bottomBg2.width = GameConfig.stageWidth + 80;
        bottomBg2.x = GameConfig.stageWidth / 2 - bottomBg2.width / 2;
        bottomBg2.y = bottomBg.y + 15;
        this._nodeContainer2.addChild(bottomBg2);
        var rewardBg = BaseBitmap.create("public_9v_bg10");
        rewardBg.width = 614;
        rewardBg.height = 109;
        rewardBg.x = GameConfig.stageWidth / 2 - rewardBg.width / 2;
        rewardBg.y = bottomBg.y + 110;
        this._nodeContainer2.addChild(rewardBg);
        this._curTradeNameTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curTradeNameTxt.x = bottomBg2.x + 110;
        this._curTradeNameTxt.y = bottomBg2.y + bottomBg2.height / 2 - 11;
        this._nodeContainer2.addChild(this._curTradeNameTxt);
        var getTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("conquestGetItem"), 22, 0xe6caac);
        getTipTxt.x = 40;
        getTipTxt.y = bottomBg2.y + 56;
        this._nodeContainer2.addChild(getTipTxt);
        this._rewardNodeContainer = new BaseDisplayObjectContainer();
        this._rewardNodeContainer.x = bottomBg.x;
        this._rewardNodeContainer.y = bottomBg.y;
        this._nodeContainer2.addChild(this._rewardNodeContainer);
        var isBatch = Api.tradeVoApi.isBatchEnable();
        if (!isBatch) {
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("tradeBatchTip"), 22, 0xe6caac);
            tipTxt.x = 30;
            tipTxt.y = bottomBg.y + bottomBg.height - 60;
            tipTxt.name = "tipTxt";
            this._nodeContainer2.addChild(tipTxt);
        }
        var batchBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "tradeBatchBtn", this.batchHandler, this);
        batchBtn.x = GameConfig.stageWidth / 2 - batchBtn.width - 50;
        batchBtn.y = bottomBg.y + bottomBg.height - 80;
        this._batchBtn = batchBtn;
        batchBtn.visible = isBatch;
        this._nodeContainer2.addChild(batchBtn);
        var tradeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "tradeBtn", this.tradeBtnHandler, this);
        tradeBtn.x = GameConfig.stageWidth / 2 + 50;
        tradeBtn.y = batchBtn.y;
        this._nodeContainer2.addChild(tradeBtn);
        var resCfg = [
            {
                icon: "trade_zhi",
                posx: 360,
                posy: 0,
                num: Api.playerVoApi.getInte()
            },
            {
                icon: "public_icon2",
                posx: 150,
                posy: 0,
                num: Api.playerVoApi.getPlayerGoldStr()
            },
            {
                icon: "trade_zhi",
                posx: 460,
                posy: bottomBg2.y + bottomBg2.height / 2 - 14,
                num: ""
            },
            {
                icon: "public_icon2",
                posx: 315,
                posy: bottomBg2.y + bottomBg2.height / 2 - 14,
                num: ""
            },
        ];
        for (var index = 0; index < resCfg.length; index++) {
            var tmpcfg = resCfg[index];
            var resbg = BaseBitmap.create("public_hb_bg01");
            resbg.x = tmpcfg.posx;
            resbg.y = tmpcfg.posy;
            this._nodeContainer2.addChild(resbg);
            var resIcon = BaseBitmap.create(tmpcfg.icon);
            resIcon.x = resbg.x - 15;
            resIcon.y = resbg.y + resbg.height / 2 - resIcon.height / 2;
            this._nodeContainer2.addChild(resIcon);
            var numTxt = ComponentManager.getTextField(String(tmpcfg.num), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            numTxt.x = resIcon.x + resIcon.width + 0;
            numTxt.y = resbg.y + resbg.height / 2 - numTxt.height / 2;
            this._nodeContainer2.addChild(numTxt);
            numTxt.name = "numTxt" + index;
            if (index > 1) {
                // numTxt.setPosition(resIcon.x + resIcon.width,resIcon.y+15);
                resIcon.setScale(0.7);
                resIcon.y = resbg.y + resbg.height / 2 - resIcon.height * resIcon.scaleY / 2;
                numTxt.x = resIcon.x + resIcon.width;
                numTxt.y = resbg.y + resbg.height / 2 - 10;
                resbg.visible = false;
                numTxt.textColor = TextFieldConst.COLOR_WHITE;
            }
        }
        var mask = BaseBitmap.create("public_9v_bg10");
        mask.width = GameConfig.stageWidth;
        mask.height = 56;
        mask.y = -15;
        this.addChildToContainer(mask);
        this.addChildToContainer(this._nodeContainer2);
        this.lastGoldNum = Api.playerVoApi.getPlayerGold();
        this.setBatchInfo(true);
        this.refreshTradeInfo();
        this.refreshBaseInfo();
    };
    TradeView.prototype.makeRankBtn = function () {
        // let forpeople_bottom = BaseBitmap.create("forpeople_bottom");
        // forpeople_bottom.x = 5;
        // forpeople_bottom.y = 50;
        // this._nodeContainer2.addChild(forpeople_bottom);
        var rankBtn = ComponentManager.getButton("trade_tanlBtn", "", this.rankBtnHandler, this);
        rankBtn.x = 5; //forpeople_bottom.x + forpeople_bottom.width/2 - rankBtn.width/2+8;
        rankBtn.y = 50; //forpeople_bottom.y + forpeople_bottom.height/2 - rankBtn.height/2;
        this._nodeContainer2.addChild(rankBtn);
    };
    TradeView.prototype.setBatchInfo = function (isInit) {
        var cid = Number(Api.tradeVoApi.getCurrentCid());
        if (isInit || cid - this._preCid > 1) {
            // this._bg1.y = 0;
            // this._bg2.y = this._bgW;
            this._bg1.x = 1280;
            this._bg2.x = 0;
            this._curTopBg = this._bg1;
            this._nextTopBg = this._bg2;
            this._nodeContainer.x = 640 - 2560;
            this._tradeArrow.x = 0;
            this._shipImg.x = 0;
            var curIdx = (cid - 1) % this.shipNumPerPage;
            var maxCid = Config.TradeCfg.getMaxTradeIndex();
            if (cid > maxCid) {
                cid = maxCid;
            }
            this._lastNameCid = Math.floor((cid - curIdx) / this.shipNumPerPage) * this.shipNumPerPage;
        }
    };
    TradeView.prototype.refreshTradeInfo = function () {
        var _this = this;
        this.setBatchInfo();
        var cid = Number(Api.tradeVoApi.getCurrentCid());
        // cid = this.test;
        // this.test ++;
        // if(this.test == 26){
        //     this.test = 25;
        // }
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
                icon.y = 122;
                this._rewardNodeContainer.addChild(icon);
            }
        }
        var isShowAni = true;
        var tmpId = (cid - 2) % this.shipNumPerPage;
        if (tmpId == -1) {
            tmpId = 0;
        }
        var tmpIdpre = (cid - 1) % this.shipNumPerPage;
        if (this._preCid == 0 || cid - this._preCid > 1) {
            isShowAni = false;
            this._preCid = cid;
            if (tmpIdpre == 0 && cid > 1) {
                this._curTopBg = this._bg2;
                this._nextTopBg = this._bg1;
            }
        }
        var cfg = this.shipCfg[tmpId];
        var cfgpre = this.shipCfg[tmpIdpre];
        /**
         * 需要移动
         */
        var deltaX = 0;
        var tarPosX = GameConfig.stageWidth / 2;
        var initX = 0;
        if (tarPosX > cfgpre.portPosX % 640) {
            deltaX = (tarPosX - cfgpre.portPosX % 640);
        }
        if (cfgpre.portPosX < 640) {
            initX = deltaX + 640;
        }
        else {
            initX = deltaX;
        }
        switch (cfgpre.shipid) {
            case 1:
                this._shipImg1.visible = true;
                this._shipImg2.visible = false;
                break;
            case 2:
                this._shipImg1.visible = false;
                this._shipImg2.visible = true;
                break;
        }
        if (!isShowAni) {
            egret.Tween.removeTweens(this._tradeArrow);
            this._tradeArrow.x = this._curTopBg.x + cfgpre.portPosX + 147;
            this._tradeArrow.y = this._curTopBg.y + cfgpre.portPosY + 10;
            egret.Tween.get(this._tradeArrow, { loop: true }).to({ y: this._tradeArrow.y + 30 }, 1000).to({ y: this._tradeArrow.y }, 1000);
            this._shipImg.y = cfgpre.shipPosY;
            this._shipImg.x = this._curTopBg.x + cfgpre.shipPosX;
            this._nodeContainer.x += initX;
            if (cfgpre.portPosX > cfg.portPosX) {
                this._nodeContainer.x += 1280;
            }
            this.refreshNameTxt(true);
            // this.refreshnameBg(tmpId);
            this._preCid = cid;
            return;
        }
        var isAtNextBg = false;
        if (cfgpre.portPosX > cfg.portPosX) {
            isAtNextBg = true;
            var tmpBg = this._curTopBg;
            this._curTopBg = this._nextTopBg;
            this._nextTopBg = tmpBg;
            deltaX = cfg.portPosX + 1280 - cfgpre.portPosX;
        }
        else {
            deltaX = cfg.portPosX - cfgpre.portPosX;
        }
        this._preCid = cid;
        var tmpthis = this;
        var moveT = 1000;
        var moveT2 = moveT;
        // this._shipImg.texture = ResourceManager.getRes("trade_ship"+ cfg.shipid);
        switch (cfgpre.shipid) {
            case 1:
                this._shipImg1.visible = false;
                this._shipImg2.visible = false;
                this._shipImgAnim1.visible = true;
                this._shipImgAnim2.visible = false;
                break;
            case 2:
                this._shipImg1.visible = false;
                this._shipImg2.visible = false;
                this._shipImgAnim1.visible = false;
                this._shipImgAnim2.visible = true;
                break;
        }
        this._shipMoving = true;
        var shipMoveX = this._curTopBg.x + cfgpre.shipPosX;
        egret.Tween.get(this._shipImg, { loop: false }).to({ x: shipMoveX, y: cfgpre.shipPosY }, moveT2).call(function () {
            tmpthis._shipMoving = false;
            switch (cfgpre.shipid) {
                case 1:
                    _this._shipImg1.visible = true;
                    _this._shipImg2.visible = false;
                    _this._shipImgAnim1.visible = false;
                    _this._shipImgAnim2.visible = false;
                    break;
                case 2:
                    _this._shipImg1.visible = false;
                    _this._shipImg2.visible = true;
                    _this._shipImgAnim1.visible = false;
                    _this._shipImgAnim2.visible = false;
                    break;
            }
        }, this);
        var nodeMoveX = this._nodeContainer.x + deltaX;
        egret.Tween.get(this._nodeContainer, { loop: false }).to({ x: nodeMoveX }, moveT).call(function () {
            var isMoveBg = false;
            if (_this._curTopBg.x < _this._nextTopBg.x && cfgpre.portPosX < 1280 - 640) {
                isMoveBg = true;
            }
            if (isMoveBg) {
                if (tmpthis._bg1.x > tmpthis._bg2.x) {
                    tmpthis._bg1.x -= tmpthis._bgW * 2;
                }
                else {
                    tmpthis._bg2.x -= tmpthis._bgW * 2;
                }
                tmpthis.refreshNameTxt();
            }
            tmpthis._nodeContainer.swapChildren(tmpthis._curTopBg, tmpthis._nextTopBg);
            egret.Tween.removeTweens(tmpthis._tradeArrow);
            tmpthis._tradeArrow.x = tmpthis._curTopBg.x + cfgpre.portPosX + 147;
            tmpthis._tradeArrow.y = tmpthis._curTopBg.y + cfgpre.portPosY + 10;
            egret.Tween.get(tmpthis._tradeArrow, { loop: true }).to({ y: tmpthis._tradeArrow.y + 30 }, 1000).to({ y: tmpthis._tradeArrow.y }, 1000);
        }, this);
        /*
        let deltaX = 0;
        let tarPosX = GameConfig.stageWidth/2 ;

        // if((this._curTopBg.x + 1280 - cfg.shipPosX) % GameConfig.stageWidth > tarPosX ){
        //     // deltaX = tarPosX - (this._curTopBg.x + cfg.shipPosX) % GameConfig.stageWidth ;
        //     deltaX = (this._curTopBg.x + 1280 - cfg.shipPosX) % GameConfig.stageWidth - tarPosX
        // }





        


        // if( this._curTopBg.x + cfg.shipPosX > tarPosX)
        // {
        //     deltaX = cfg.shipPosY + this._curTopBg.y - tarPosX ;
        // }
        this._shipImg.texture = ResourceManager.getRes("trade_ship"+ cfg.shipid);
        if(!isShowAni)
        {
            egret.Tween.removeTweens(this._tradeArrow);
            this._tradeArrow.x = this._curTopBg.x + cfg.portPosX+104;
            this._tradeArrow.y = this._curTopBg.y + cfg.portPosY+30;
            egret.Tween.get(this._tradeArrow,{loop:true}).to({y:this._tradeArrow.y+30},1000).to({y:this._tradeArrow.y},1000);
        
            this._shipImg.y =  cfg.shipPosY;
            this._shipImg.x = this._curTopBg.x + cfg.shipPosX;
            this._shipImg.visible = true;
            this._nodeContainer.x += deltaX ;
            
            this.refreshNameTxt(true);
            // this.refreshnameBg(tmpId);
            this._preCid = cid;
            return;
        }
        let isAtNextBg = false;
        deltaX = cfgpre.shipPosX -cfg.shipPosX;
        if(deltaX <0)
        {
            deltaX += this._bgW;
            isAtNextBg = true;
        }
        let tmpPosX =  this._nodeContainer.x + deltaX ;
        this._shipImg.x = cfgpre.shipPosX;
        if (tmpPosX > 0)
            tmpPosX = 0;
        
        let isMoveBg = false;
        let tmpPort:BaseBitmap = undefined;

        this._preCid = cid;
        if(this._curTopBg.x < this._nextTopBg.x)
        {
            if(this._curTopBg.x + this._bgW + tmpPosX <= this.container.x-15)
            {
                isMoveBg = true;
                tmpPort = <BaseBitmap>this._curTopBg.getChildByName("portImg"+tmpId);
            }
        }else{
            if(this._nextTopBg.x + this._bgW + tmpPosX <= this.container.x-15)
            {
                isMoveBg = true;
                tmpPort = <BaseBitmap>this._nextTopBg.getChildByName("portImg"+tmpId);
            }
        }
        
        if(!isMoveBg){
            // this.refreshnameBg(tmpId,isAtNextBg);
            egret.Tween.removeTweens(this._tradeArrow);
            if(isAtNextBg)
            {
                this._tradeArrow.x = this._nextTopBg.x + cfg.portPosX+104;
                this._tradeArrow.y = this._nextTopBg.y + cfg.portPosY+30;
            }else{
                this._tradeArrow.x = this._curTopBg.x + cfg.portPosX+104;
                this._tradeArrow.y = this._curTopBg.y + cfg.portPosY+30;
            }
            this._nodeContainer.setChildIndex(this._tradeArrow,3);
            egret.Tween.get(this._tradeArrow,{loop:true}).to({y:this._tradeArrow.y+30},1000).to({y:this._tradeArrow.y},1000);
        
        }
        
        let tmpthis = this;
        let moveT = 10000*Math.abs(deltaX)/this._bgW;
        // let moveT2 = 5000*Math.abs(deltaY)/this._bgH;
        let moveT2 = moveT;
      
         * 现有问题:
         * 1.建筑背景选中状态不对
         * 2.一键贸易，次数较大时滑动有问题
         
        this._shipImg.texture = ResourceManager.getRes("trade_ship"+ cfg.shipid);
        this._shipMoving = true;
        egret.Tween.get(this._shipImg,{loop:false}).to({x:this._shipImg.x+deltaX,y:cfg.shipPosY},moveT2).call( ()=>{
             tmpthis._shipMoving = false;
        },this);
        egret.Tween.get(this._nodeContainer,{loop:false}).to({x:-tmpPosX},moveT).call(()=>{
            
            if(isMoveBg)// && cid < 198)
            {
                if(tmpthis._bg1.y < tmpthis._bg2.y)
                {
                    tmpthis._bg1.y += tmpthis._bgW*2;
                    tmpthis._curTopBg = tmpthis._bg2;
                    tmpthis._nextTopBg =  tmpthis._bg1;
                }else{
                    tmpthis._bg2.y += tmpthis._bgW*2;
                    tmpthis._curTopBg = tmpthis._bg1;
                    tmpthis._nextTopBg =  tmpthis._bg2;
                }
                tmpthis._nodeContainer.swapChildren(tmpthis._curTopBg,tmpthis._nextTopBg)
                egret.Tween.removeTweens(tmpthis._tradeArrow);
                tmpthis._tradeArrow.x = tmpthis._curTopBg.x + cfg.portPosX+104;
                tmpthis._tradeArrow.y = tmpthis._curTopBg.y + cfg.portPosY+30;
                egret.Tween.get(tmpthis._tradeArrow,{loop:true}).to({y:tmpthis._tradeArrow.y+30},1000).to({y:tmpthis._tradeArrow.y},1000);
                
                tmpthis.refreshNameTxt();
                // tmpthis.refreshnameBg(tmpId);
            }
            
        },this);
        */
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
        namebg.width = txt.width + 20;
        namebg.anchorOffsetX = namebg.width / 2;
        namebg.anchorOffsetY = namebg.height / 2;
        namebg.x = txt.x;
        namebg.y = txt.y;
    };
    TradeView.prototype.refreshBaseInfo = function () {
        var numTxt0 = this._nodeContainer2.getChildByName("numTxt0");
        var numTxt1 = this._nodeContainer2.getChildByName("numTxt1");
        numTxt0.text = App.StringUtil.changeIntToText(Api.playerVoApi.getInte());
        numTxt1.text = Api.playerVoApi.getPlayerGoldStr();
    };
    TradeView.prototype.indexInterfaceCallBack = function (event) {
        var rdata = event.data.data;
        if (rdata.ret == 0) {
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
        var rdata = event.data.data;
        if (rdata.ret == 0) {
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
        return "tradeViewDesc";
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
            // "trade_bg","forpeople_bottom","trade_tanlBtn","trade_tanlBtn_down",
            // "trade_ship1","trade_ship2","trade_ship3","trade_pb_bottombg",
            // "trade_port1","trade_port2","trade_port3","trade_port4","trade_port5","servant_infoPro2",
            // "trade_arrow","trade_bottombg","trade_bottomnumbg", "trade_namebg_gray","trade_namebg_red",
            // "trade_bg2",
            "trade_arrow",
            "trade_namebg",
            "trade_zhi",
            "trade_tanlBtn",
            "trade_biaoti",
            "recharge2_fnt",
            "trade_pb_bottombg",
            "trade_carri1",
            "trade_carri2"
            // "trade_bg","forpeople_bottom","trade_tanlBtn","trade_tanlBtn_down",
            // "trade_ship1","trade_ship2","trade_ship3","trade_pb_bottombg",
            // "trade_port1","trade_port2","trade_port3","trade_port4","trade_port5","servant_infoPro2",
            // "trade_arrow","trade_bottombg","trade_bottomnumbg", "trade_namebg_gray","trade_namebg_red",
            // "trade_zhi","trade_biaoti","recharge2_fnt",
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
        this._shipImg1 = null;
        this._shipImg2 = null;
        this._preCid = 0;
        this._lastNameCid = 0;
        this.lastGoldNum = 0;
        this._lastTradeName = null;
        this._lastTradeGold = null;
        this._lastTradeInte = null;
        this._tradeArrow = null;
        this._shipMoving = false;
        _super.prototype.dispose.call(this);
    };
    return TradeView;
}(CommonView));
__reflect(TradeView.prototype, "TradeView");
