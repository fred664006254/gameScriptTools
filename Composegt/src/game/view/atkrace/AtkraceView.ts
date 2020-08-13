class AtkraceView extends CommonView {
    public constructor() {
        super();
    }

    private readonly moreHeight: number = 720;
    private bottomBox: BaseDisplayObjectContainer;
    private bottomTip: BaseTextField;
    private moreMask: BaseBitmap;
    private moreInfoContainer: BaseDisplayObjectContainer;
    private moreSwitchBtn: BaseDisplayObjectContainer;
    private moreList: ScrollList;
    private moreData: ActrackMoreInfo[] = [];
    private moreIsShow: boolean = false;
    private isMoving: boolean = false;

    private myScore: number = 100;
    private myRank: number = 100;
    private myScoreLabel: BaseTextField;
    private myRankLabel: BaseTextField;

    private playerInfoBox: BaseDisplayObjectContainer;
    private playerImg: BaseDisplayObjectContainer;
    private playerNameLabel: BaseTextField;
    private playerScoreLabel: BaseTextField;
    private playerRankLabel: BaseTextField;

    private _talk: BaseTextField;
    private _qipao: BaseLoadBitmap;
    private _talkTimer: egret.Timer;
    private _challengeDB: BaseDisplayObjectContainer;

    private noRival: boolean = false;

    protected initView() {
        Api.rookieVoApi.checkNextStep();
        this.container.y = 0;

        this.playerInfoBox = new BaseDisplayObjectContainer();
        this.addChildToContainer(this.playerInfoBox);
        this.playerInfoBox.y = (GameConfig.stageHeigth - 80 - 290 - 600)/2 + 80;

        this.playerImg = new BaseDisplayObjectContainer();
        this.playerInfoBox.addChild(this.playerImg);

        let _qipao = BaseLoadBitmap.create("public_9v_bg11_2");
        _qipao.width = 318;
        _qipao.height = 102;
        this.playerInfoBox.addChild(_qipao);
        _qipao.setPosition((GameConfig.stageWidth - _qipao.width)/2, -30);
        this._qipao = _qipao;

        this._talk = ComponentManager.getTextField("", 22, 0x7a4a1a);
        this._talk.width = 285;
        this._talk.lineSpacing = 4;
        this.playerInfoBox.addChild(this._talk);
        this._talk.setPosition(_qipao.x + 15, _qipao.y + 18);

        let playerBg = BaseBitmap.create("atkrace_bg1");
        this.playerInfoBox.addChild(playerBg);
        playerBg.setPosition((GameConfig.stageWidth - playerBg.width)/2, 486);

        this.playerNameLabel = ComponentManager.getTextField("", 22, 0xfff4b4);
        this.playerInfoBox.addChild(this.playerNameLabel);
        this.playerNameLabel.width = playerBg.width;
        this.playerNameLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.playerNameLabel.setPosition(playerBg.x, playerBg.y + 6);

        this.playerScoreLabel = ComponentManager.getTextField("", 22, 0xfff4b4);
        this.playerInfoBox.addChild(this.playerScoreLabel);
        this.playerScoreLabel.width = playerBg.width;
        this.playerScoreLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.playerScoreLabel.setPosition(playerBg.x, playerBg.y + 48);

        this.playerRankLabel = ComponentManager.getTextField("", 22, 0xfff4b4);
        this.playerInfoBox.addChild(this.playerRankLabel);
        this.playerRankLabel.width = playerBg.width;
        this.playerRankLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.playerRankLabel.setPosition(playerBg.x, playerBg.y + 76);

        this.bottomBox = new BaseDisplayObjectContainer();
        this.addChildToContainer(this.bottomBox);
        this.bottomBox.setPosition(0, GameConfig.stageHeigth - 212);

        this.moreMask = BaseBitmap.create("public_9_viewmask");
        this.addChild(this.moreMask);
        this.moreMask.width = GameConfig.stageWidth;
        this.moreMask.height = GameConfig.stageHeigth - 106;
        this.moreMask.setPosition(0, 0);
        this.moreMask.visible = false;
        this.moreMask.addTouchTap(this.moreInfoSwitch, this);

        let _bg1 = BaseLoadBitmap.create("atkrace_bg2");
        this.bottomBox.addChild(_bg1);
        let _bg2 = BaseLoadBitmap.create("atkrace_bg3");
        this.bottomBox.addChild(_bg2);
        _bg2.setPosition(0, 106);

        this.initBottomBtns();
        this.initMoreInfos();

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESET_ATKRACE, this.onReset,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ATKRACE,this.onUpdateModel,this);

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REFRESH), this.refreshServant, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_LIST), this.refreshMoreInfo, this);
        NetManager.request(NetRequestConst.REQUEST_ATKRACE_LIST, {});

        this.refreshPlayerView();
    }

    private doGuide() {
        this.onChallengeTap();
    }

    private onUpdateModel(e:egret.Event) {
        // NetManager.request(NetRequestConst.REQUEST_ATKRACE_LIST, {});
        let data=e.data;
        if(data&&data.ret)
        {
            if(data.data&&(data.data.cmd!=NetRequestConst.REQUEST_ATKRACE_FIGHT
                ||data.data.cmd!=NetRequestConst.REQUEST_ATKRACE_CHALLENGE
                ||data.data.cmd!=NetRequestConst.REQUEST_ATKRACE_KILL
                ||data.data.cmd!=NetRequestConst.REQUEST_ATKRACE_REVENGE
                ||data.data.cmd!=NetRequestConst.REQUEST_ATKRACE_CHOOSE))
            {
                this.refreshPlayerView();
            }
        }
    }

    private refreshServant():void {
		this.request(NetRequestConst.REQUEST_ATKRACE_INDEX,{});
	}

    /**底部按钮及我的分数等 */
    private initBottomBtns() {
        // 消息按钮
        let msgBtn: BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.onMessageTap,this,null,0);
        this.bottomBox.addChild(msgBtn);
        msgBtn.setPosition(28, -102);
        let msgIcon:BaseBitmap = BaseBitmap.create("arena_visit");
        msgIcon.setPosition(msgBtn.width/2-msgIcon.width/2,msgBtn.height/2-msgIcon.height/2-5);
        msgBtn.addChild(msgIcon);
        let msgText:BaseBitmap = BaseBitmap.create("arena_visit_text");
        msgText.setPosition(msgBtn.width/2-msgText.width/2,msgIcon.y + msgIcon.height -30);
        msgBtn.addChild(msgText);
        // msgBtn.setScale(0.74);

        // 排行按钮
        let rankBtn: BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.onRankTap,this,null,0);
        this.bottomBox.addChild(rankBtn);
        rankBtn.setPosition(508, -102);
        let rankIcon:BaseBitmap = BaseBitmap.create("arena_rank");
        rankIcon.setPosition(rankBtn.width/2-rankIcon.width/2,rankBtn.height/2-rankIcon.height/2-5);
        rankBtn.addChild(rankIcon);
        let rankText:BaseBitmap = BaseBitmap.create("arena_rank_text");
        rankText.setPosition(rankBtn.width/2-rankText.width/2,rankIcon.y + rankIcon.height -30);
        rankBtn.addChild(rankText);
        // rankBtn.setScale(0.74);

        // 挑战按钮
        let challengeBtn: BaseButton = ComponentManager.getButton("atkrace_startBtn",null,this.onChallengeTap,this,null,0);
        this.bottomBox.addChild(challengeBtn);
        challengeBtn.setPosition((GameConfig.stageWidth - challengeBtn.width)/2, -70);
        if (RES.hasRes("leitai_anniu_ske")) {
            challengeBtn.addTouch(this.onChallengeTouch, this);
            this._challengeDB = new BaseDisplayObjectContainer();
            this.bottomBox.addChild(this._challengeDB);
            let challengeDb = App.DragonBonesUtil.getLoadDragonBones("leitai_anniu");
            this._challengeDB.addChild(challengeDb);
            this._challengeDB.setPosition((GameConfig.stageWidth - challengeDb.width)/2, -360);
            challengeDb.setPosition(0, 0);
            challengeDb.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, ()=>{
                challengeDb.playDragonMovie("idle01",0);
            }, this);
            challengeDb.playDragonMovie("idle",1);
            challengeBtn.alpha = 0;
            this._challengeDB.width = 324;
            this._challengeDB.height = 327;
        }

        // 我的分数&排名
        this.myScoreLabel = ComponentManager.getTextField(
            LanguageManager.getlocal("atkrace_addtext6", [""+this.myScore]),
            TextFieldConst.FONTSIZE_CONTENT_COMMON,
            0xfdf1b5
        );
        this.bottomBox.addChild(this.myScoreLabel);
        this.myScoreLabel.setPosition(72, 58);

        this.myRankLabel = ComponentManager.getTextField(
            LanguageManager.getlocal("atkrace_addtext7", [""+this.myRank]),
            TextFieldConst.FONTSIZE_CONTENT_COMMON,
            0xfdf1b5
        );
        this.bottomBox.addChild(this.myRankLabel);
        this.myRankLabel.setPosition(464, 58);

    }

    private onChallengeTouch(event: egret.Event) {
        if (!this._challengeDB) return;
        let scale = 0.9;
        let obj = this._challengeDB;
        const dy = (obj.height*(1 - scale));
        switch(event.type)
        {
            case egret.TouchEvent.TOUCH_BEGIN:
                obj.setScale(0.9);
                // obj.x+=(obj.width*(1 - scale))/2;
                obj.y+=dy;
                break;
            case egret.TouchEvent.TOUCH_END:
                obj.setScale(1);
                // obj.x-=(obj.width*(1 - scale))/2;
                obj.y-=dy;
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                obj.setScale(1);
                // obj.x-=(obj.width*(1 - scale))/2;
                obj.y-=dy;
                // callback.apply(handler);
                break;
        }
    }

    /**底部更多信息 */
    private initMoreInfos() {
        this.moreIsShow = false;

        this.moreSwitchBtn = new BaseDisplayObjectContainer();
        this.bottomBox.addChild(this.moreSwitchBtn);
        this.moreSwitchBtn.setPosition(470, 146);
        this.moreSwitchBtn.addTouchTap(this.moreInfoSwitch, this);
        let __arrow = BaseBitmap.create("arena_arrow");
        this.moreSwitchBtn.addChild(__arrow);
        __arrow.name = "more_arrow"
        __arrow.anchorOffsetY = __arrow.height / 2;
        __arrow.setPosition(0, __arrow.height / 2);
        let __moretxt = BaseBitmap.create("arena_more");
        this.moreSwitchBtn.addChild(__moretxt);
        __moretxt.setPosition(__arrow.width + 6, (__arrow.height - __moretxt.height)/2);

        this.bottomTip = ComponentManager.getTextField("", 22, 0xffffff);
        this.bottomTip.width = 450;
        this.bottomBox.addChild(this.bottomTip);

        this.moreInfoContainer = new BaseDisplayObjectContainer();
        this.addChild(this.moreInfoContainer);
        this.moreInfoContainer.setPosition(0, GameConfig.stageHeigth);
        let _moreBg = BaseLoadBitmap.create("commonview_woodbg");
        _moreBg.width = GameConfig.stageWidth;
        _moreBg.height = this.moreHeight;
        _moreBg.touchEnabled = true;
        this.moreInfoContainer.addChild(_moreBg);
        let _moreL = BaseLoadBitmap.create("atkrace_line2");
        this.moreInfoContainer.addChild(_moreL);

        const list_w = GameConfig.stageWidth;
        const list_h = this.moreHeight - 15;
        this.moreList = ComponentManager.getScrollList(ActrackMoreItem, [], new egret.Rectangle(0, 0, list_w, list_h));
        this.moreInfoContainer.addChild(this.moreList);
        this.moreList.setPosition(0, 15);
        this.moreList.setEmptyTip(LanguageManager.getlocal("atkracedes3"));
    }

    private onRankTap() {
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACERANKLISTVIEW);
    }
    private onMessageTap() {
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVISITVIEW);
    }
    private onChallengeTap() {
        if (this.noRival) return;
        ViewController.getInstance().openView(ViewConst.COMMON.ATKRACESELECTVIEW, {
            fightType: AtkraceFightTypes.choose,
            fightUid: Api.atkraceVoApi.getMyFightInfo().uid
        })
    }
    private moreInfoSwitch() {
        if (this.isMoving) return;
        this.moreIsShow = !this.moreIsShow;
        this.moreSwitchBtn.getChildAt(0).scaleY = this.moreIsShow ? -1 : 1;
        this.moreMask.visible = this.moreIsShow;
        this.isMoving = true;
        let toY: number = GameConfig.stageHeigth;
        if (this.moreIsShow) {
            toY -= (this.moreHeight + 106);
        }
        egret.Tween.get(this.moreInfoContainer)
        .to({y: toY}, 500)
        .call(() => {
            this.isMoving = false;
        }, this);

        this.refreshBottomLabel();
    }

    private refreshMoreInfo(e: egret.Event) {
        this.moreData = [];
        if (e.data.ret) {
            this.moreData = e.data.data.data.atklist;
        }
        this.moreList.refreshData(this.moreData);
        this.refreshBottomLabel();
    }

    private refreshBottomLabel() {
        if (this.moreIsShow) {
            var num =Config.AtkraceCfg.getbeatNum();
			this.bottomTip.text = LanguageManager.getlocal("atkracelistconditions",[num+""]);
            this.bottomTip.setPosition(100, 156);
        } else {
            if (this.moreData.length > 0) {
                this.bottomTip.text = this.formatMoreMsg(this.moreData[0]);
                this.bottomTip.setPosition(20, 140);
            } else {
                this.bottomTip.text = "";
            }
        }
    }

    private formatMoreMsg(data: ActrackMoreInfo) {
        let rsl = "";
        let act: string = LanguageManager.getlocal(data.info.type == 1 ? "atkrace_addtext10":"atkrace_addtext11");
        rsl = LanguageManager.getlocal("atkrace_addtext8", [
            data.info.name,
            act,
            data.info.uname2,
            data.info.fightnum+""
        ]);

        if (data.info.streak > 2) {
            rsl += LanguageManager.getlocal("atkrace_addtext9", [""+data.info.streak]);
        }
        return rsl;
    }

    protected getRequestData():{requestType:string,requestData:any}	{	
		return {
            requestType:NetRequestConst.REQUEST_ATKRACE_INDEX,
            requestData:{}
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void {
        this.noRival = !data.ret || data.data.data.nomatchuid;
        if (this.noRival) {
            App.CommonUtil.showTip(LanguageManager.getlocal("atkraceViewError"));
        } else {
            this.myRank = data.data.data.myrank || 0;
        }
    }

    /**
     * 重制
     */
    private onReset() {
        // NetManager.request(NetRequestConst.REQUEST_ATKRACE_LIST, {});
        this.refreshPlayerView();
    }

    /**
     * 更新玩家（敌&我）信息
     */
    private refreshPlayerView() {
        this.playerInfoBox.visible = !this.noRival;
        if (!this.noRival) {
            let _ainfo = Api.atkraceVoApi.getMyFightInfo();

            this.playerImg.removeChildren();
            let __playerImg = Api.playerVoApi.getPlayerPortrait(_ainfo.flevel, _ainfo.fpic);
            this.playerImg.addChild(__playerImg);
            __playerImg.anchorOffsetX = __playerImg.width / 2;
            __playerImg.setPosition(GameConfig.stageWidth/2, 50);
            __playerImg.setScale(213/300);

            this.randomTalk();
            if (!this._talkTimer) {
                this._talkTimer = new egret.Timer(5000, 0);
                this._talkTimer.addEventListener(egret.TimerEvent.TIMER, this.randomTalk, this);
            }
            this._talkTimer.reset();
            this._talkTimer.start();

            this.playerNameLabel.text = _ainfo.getFName();
            this.playerScoreLabel.text = LanguageManager.getlocal("atkrace_addtext6", [""+_ainfo.fpoint]);
            let _rankText = _ainfo.frank > 0 ? ""+_ainfo.frank : LanguageManager.getlocal("atkracedes4");
            this.playerRankLabel.text = LanguageManager.getlocal("atkrace_addtext7", [""+_rankText]);

            this.myScoreLabel.text = LanguageManager.getlocal("atkrace_addtext6", [""+Api.atkraceVoApi.getPoint()]);
            let _myrankText = this.myRank > 0 ? ""+this.myRank : LanguageManager.getlocal("atkracedes4");
            this.myRankLabel.text = LanguageManager.getlocal("atkrace_addtext7", [""+_myrankText]);
        } else {
            this._talkTimer && this._talkTimer.stop();
        }
    }

    private randomTalk() {
        const _max = 13;
        const _rd = Math.floor(Math.random()*_max)+1;
        let _str = LanguageManager.getlocal(`atkraceTalk${_rd}`);

        this._talk.text = _str;
        let _h = this._talk.height + 19 + 36;
        this._qipao.height = _h > 102 ? _h : 102;
        this._qipao.y = 66 - this._qipao.height;
        this._talk.y = this._qipao.y + 18;

        let _localPos = this._qipao.localToGlobal();
        if (_localPos.y < this.titleBg.height) {
            const dy = this.titleBg.height - _localPos.y;
            this._qipao.y += dy;
            this._talk.y += dy;
            this.playerImg.y = this._qipao.y + this._qipao.height - 66;
        }
    }

    // 规则说明内容
	protected getRuleInfo():string {
		return "atkraceInfo";
	}

	protected getBgName():string {
		return "arena_battlebg";
	}

    protected getResourceList():string[] {
		return super.getResourceList().concat([
			"forpeople_bottom","arena_bottom","atkrace_morale",
			"arena_arrow","arena_bottom_bg","arena_more","arena_rank","arena_rank_text","arena_visit","arena_visit_text",
			"servant_mask","atkrace_startBtn","atkrace_bg1","atkrace_startBtnBg",
			"progress_type3_red",
			"progress_type3_bg",
			"atkrace_xian_1",
			"atkrace_xiuxi",
			"atkrace_1_newui",
			"prisonview_1",
			"guide_hand"
		]);
	}

    public dispose() {
        this.bottomBox = null;
        this.bottomTip = null;
        this.moreMask = null;
        this.moreInfoContainer = null;
        this.moreSwitchBtn = null;
        this.moreList = null;
        this.moreData = null;
        this.myScoreLabel = null;
        this.myRankLabel = null;
        this.playerImg = null;
        this._challengeDB = null;

        this._qipao = null;
        this._talk = null;
        this._talkTimer && this._talkTimer.stop();
        this._talkTimer = null;

        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESET_ATKRACE, this.onReset,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ATKRACE,this.onUpdateModel,this);

        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REFRESH), this.refreshServant, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_LIST), this.refreshMoreInfo, this);
        super.dispose();
    }
}