/**
 * 席位抢夺对战
 * date 2020.5.14
 * author ycg
 */

class SixSection1SeatBattleView extends BaseBattleView
{
    private _fightarr:any = null;
    private _point:number = 0;
    private _rewardnum:number = 0;
    private _winflag:number = 0;
    private _callback:Function = null;
    private _target:any = null;
    private _downGroup:BaseDisplayObjectContainer = null;
    private _topGroup:BaseDisplayObjectContainer = null;

    //跳过战斗按钮
    private _stepBtn:BaseButton = null;
    private _curRoundFirst = 0;
    //上方玩家剩余红颜个数
    private _upWifeCount:BaseTextField = null;
    private _upWifeNum:number = 0;
    //上方玩家的总才情
    private _upTotalTalent:BaseTextField = null;
    //上方玩家的卡牌容器
    private _upCardContainer:BaseDisplayObjectContainer = null;
    //上方玩家的总才情进度条
    private _upBProgress:ProgressBar = null;
    //上方玩家的红颜卡牌列表
    private _upWifeCardList:BaseDisplayObjectContainer[] = null;

    //下方玩家的剩余红颜个数
    private _downWifeCount:BaseTextField = null;
    private _downWifeNum:number = 0;
    //下方玩家的总才情
    private _downTotalTalent:BaseTextField = null;
    //下方玩家的卡牌容器
    private _downCardContainer:BaseDisplayObjectContainer = null;
    //下方玩家的总才情进度条
    private _downBProgress:ProgressBar = null;
    //下方玩家的红颜卡牌列表
    private _downWifeCardList:BaseDisplayObjectContainer[] = null;

    // private _myCardDataList:any[] = null;
    // private _enemyCardDataList:any[]= null;

    private _upCurIndex:number = 0;
    private _downCurIndex:number = 0;
    private _curRound:number = 0;
    private _curIdex:number = 0;

    private _upSelectCard:BaseDisplayObjectContainer = null;
    private _downSelectCard: BaseDisplayObjectContainer = null;

    private _upMaxNum = 0;
    private _downMaxNum = 0;

    private _isPause = false;
    private _isReview = false;
    private _skip = false;
    private _isEnd = false;
    private _uptotalarmy = 0;
    private _upmaxarmy = 0;
    private _downtotalarmy = 0;
    private _downmaxarmy = 0;

    private _skinEquip = [];
	private _showSkin = 0;

    public constructor() {
		super();
	}
    protected getCloseBtnName():string
    {
        return null;
    }
    // protected isTouchMaskClose():boolean
    // {
    //     return true;
    // }

    protected getTitleBgName():string{
        return null;
    }

    public hide()
    {
        if(this._target && this._callback){
            this._callback.apply(this._target);
        }
        super.hide();
    }
    
	protected initView():void
	{
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        this.titleTF.visible =false;
        // this._fightarr = this.param.data.fightarr;
        this._point = this.param.data.getResource;
        // this._rewardnum = this.param.data.rewardnum;
        this._winflag = this.param.data.winuid == this.downPlayerInfo.uid ? 1 : 2;
        // this._callback = this.param.data.callback;
        // this._target = this.param.data.target;
        // this._isReview = this.param.data.isReview;
        this.initBottomView();   
        
        this.initCards();
        //第一场是双方玩家
        this._skinEquip = [];
        this.roundBeginAnim();
    }

    protected initBg(): void {
		this.viewBg = BaseLoadBitmap.create("threekingdomsbattlebg");
		this.viewBg.width = 640;
		this.viewBg.height = 1136;

		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);

	}
    protected isShowOpenAni():boolean
	{
		return false;
    }

    /**
     * pklogs=pklogs,winuid=winuid,sidlist1={},sidlist2={}
     * pklogs = {log1,log2...}，
log1 = {firstflag,win,reports,ainfo,binfo}
firstflag = 1 表示主视角先手
win = 1 表示主视角获胜
reports = [hit1,hit2,hit3...] ，hit1为先手攻击，hit2为后手，以此类推
hit = [isCri,damage]  isCri=1表示暴击了，damage伤害
ainfo为主视角门客信息，binfo为对手门客信息
ainfo = {sid="1001", attr=1, quality=1, v=1, s1lv=1, s2lv=1, fullattr=1, clv=1, equip="", weaponDps=1} fullattr为最大血量，attr为战斗后血量
ainfo = {sid="1001", attr=1, quality=1, lv=1, s1lv=1, s2lv=1, fullattr=1, clv=1, equip="", weaponDps=1}     
*/
    private get upPlayerInfo():any{
        //上方信息 敌对
        // return this.param.data.pklogs[0][4];
        return this.param.data.finfo;
    }

    private get downPlayerInfo():any{
        //下方玩家 自己 主视角
        // return this.param.data.pklogs[0][3];
        return this.param.data.minfo;
    }

    
    private createInfoGroup(type : number):BaseDisplayObjectContainer{
        let view = this;
        //1顶部玩家 2底部玩家
        // let info = type == 1 ? view.upPlayerInfo : view.downPlayerInfo; 
        let group = new BaseDisplayObjectContainer();
        group.width = GameConfig.stageWidth;
        group.height = 110;
        /** 
        let topinfobg = BaseBitmap.create("threekingdomsbattletopbg");
        
        topinfobg.x = 0;
        topinfobg.y =  type == 1 ? 0 : 110;
        group.addChild(topinfobg);

        //人物形象
        //头像框
        let headContainer = Api.playerVoApi.getPlayerCircleHead(Number(info.pic),(info.ptitle));
        headContainer.addTouchTap(()=>{
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{
                ruid:info.uid,
                rzid:Api.mergeServerVoApi.getTrueZid(info.uid)
            });
        },this);
        headContainer.setScale(0.85);
        App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.leftverticalCenter : LayoutConst.rightverticalCenter, headContainer, topinfobg, [0,0]);
        //玩家名
        let namebg = BaseBitmap.create(`threekingdomsbattleplayernamebg`);
        namebg.width = 255;
        namebg.anchorOffsetX = namebg.width / 2;
        namebg.scaleX = type == 1 ? 1 : -1;
        group.addChild(namebg);
        App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.lefttop : LayoutConst.righttop, namebg, topinfobg, [type == 1 ? 90 : 100,17]);

        let playernameTxt = ComponentManager.getTextField(`${info.name}（${Api.mergeServerVoApi.getAfterMergeSeverName(info.uid, true, Api.mergeServerVoApi.getTrueZid(info.uid))}）`, 22, TextFieldConst.COLOR_BROWN);
        group.addChild(playernameTxt);
        App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.leftverticalCenter : LayoutConst.rightverticalCenter, playernameTxt, namebg, [5,0]);
        // playernameTxt.textColor = Number(info.uid) == Api.playerVoApi.getPlayerID() ? TextFieldConst.COLOR_WARN_YELLOW2 : TextFieldConst.COLOR_BROWN;
        //称号
        //总兵力
        let army = 0;
        let max = 0;
        let list = type == 1 ? view.param.data.sidlist2 : view.param.data.sidlist1;
        for(let i in list){
            let unit = list[i];
            if(unit.fightattr > 0){
                army += unit.fightattr;
            }
            max += unit.fullattr;
        }
        type == 1 ? view._uptotalarmy = army : view._downtotalarmy = army;
        type == 1 ? view._upmaxarmy = max : view._downmaxarmy = max;

        //进度条
        let progress = ComponentManager.getProgressBar("progress8","progress3_bg",540);
		progress.setPercentage(army/max);
        group.addChild(progress);
        App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.lefttop : LayoutConst.righttop, progress, namebg, [0,namebg.height]);
        type == 1 ? view._upBProgress = progress : view._downBProgress = progress;

        group.addChild(headContainer);

        // private _uptotalarmy = 0;
        // private _upmaxarmy = 0;


        let totalTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsbattlearmynum-1`,[army.toString()]),22);
        group.addChild(totalTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, totalTxt, progress);
        type == 1 ? view._upTotalTalent = totalTxt : view._downTotalTalent = totalTxt;
        //剩余门客数
        let servantnum = 0;
        let sidlist = type == 1 ? view.param.data.sidlist2 : view.param.data.sidlist1;
        for(let key in sidlist){
            let info = sidlist[key];
            if(info && info.fightattr > 0){
                ++ servantnum;
            }
        }

        let servantcount = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsbattleservantnum-1`,[""+servantnum]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
        group.addChild(servantcount);
        App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.righttop : LayoutConst.lefttop, servantcount, progress, [50,-servantcount.textHeight-5]);
        type == 1 ? view._upWifeCount = servantcount : view._downWifeCount = servantcount;
        type == 1 ? view._upWifeNum = servantnum : view._downWifeNum = servantnum;
        //门客列表   
        */
        let cardsBg = BaseBitmap.create("threekingdomsbattleservantlistbg");
        cardsBg.height = 110;
        cardsBg.anchorOffsetY = cardsBg.height / 2;
        cardsBg.scaleY = type == 1 ? 1 : -1;
        // App.DisplayUtil.setLayoutPosition(type == 1 ? LayoutConst.horizontalCentertop : LayoutConst.horizontalCenterbottom, cardsBg, topinfobg, [0,topinfobg.height]);
        cardsBg.setPosition(group.width/2 - cardsBg.width/2, cardsBg.height/2);

        group.addChild(cardsBg);
    
        let cardContainer = new BaseDisplayObjectContainer();
        cardContainer.width = 640;
        cardContainer.height = 95;
        group.addChild(cardContainer);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cardContainer, cardsBg);
        type == 1 ? view._upCardContainer = cardContainer : view._downCardContainer = cardContainer;

        //属性buff
        let buffImgs = ["atkrace_icon_1_1", "atkrace_icon_2_2", "atkrace_icon_3_1"];
        let buffTypes = ["atkUp", "criUp", "hpUp"];
        let buff = type == 1 ? this.param.data.bBuff : this.param.data.aBuff;

        //type 1 上 
        let buffY = type == 1 ? cardsBg.y + cardsBg.height/2 + 30 : cardsBg.y - cardsBg.height/2 - 30 - 70;
        let buffX = type == 1 ? group.width - 30 - (107 * 0.5) : 30;
        let buffCount = 0;
        for (let i=0; i < buffTypes.length; i++){
            if (buff[buffTypes[i]] > 0){
                let buffIcon = BaseLoadBitmap.create(buffImgs[i]);
                buffIcon.width = 107; 
                buffIcon.height = 106; 
                buffIcon.setScale(0.5);
                buffIcon.x = buffX + (buffIcon.width * buffIcon.scaleX + 10 ) * buffCount * (type == 1 ? -1 : 1);
                buffIcon.y = buffY;
                group.addChild(buffIcon);
                buffCount += 1;
                let buffValue = buff[buffTypes[i]] * 100;
                let buffNum = ComponentManager.getTextField("+"+buffValue.toFixed(0)+"%", 16, TextFieldConst.COLOR_WARN_GREEN);
                buffNum.setPosition(buffIcon.x + buffIcon.width * buffIcon.scaleX/2 - buffNum.width/2, buffIcon.y + buffIcon.height * buffIcon.scaleY);
                group.addChild(buffNum);
            }
        }
        return group;
    }

    private showWinBattle(str : string, isup : boolean, ismiddle = false):void{
        let view = this;
        // let group = ismy ? this._myCurWifeContainer : this._enemyCurWifeContainer;
        // let skinnamebg = ismy ? this._myNameBg : this._enemyNameBg;
        let descbg = BaseBitmap.create(`specialview_commoni_namebg`);
        let tipTxt = ComponentManager.getTextField(str, 22);
        tipTxt.lineSpacing = 6;
        descbg.height = 92;
        descbg.width = 392;

        if(ismiddle){
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descbg, view.container, [-40,0]);
        }
        else{
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descbg, isup ? this._upHero : this._downHero, [0,150]);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
        this.addChildToContainer(descbg);
        this.addChildToContainer(tipTxt);
        descbg.alpha = 0;
        tipTxt.alpha = 0;

        egret.Tween.get(descbg).to({alpha : 1}, 200).wait(800).to({alpha : 0}, 200).call(()=>{
            descbg.dispose();
            descbg = null;
        },this);

        egret.Tween.get(tipTxt).to({alpha : 1}, 200).wait(800).to({alpha : 0}, 200).call(()=>{
            tipTxt.dispose();
            tipTxt = null;
        },this);
    }
    /**
     * 显示初始化View
     */
    private initBottomView()
    {
        let view = this;
        //顶部信息栏
        let topGroup = view.createInfoGroup(1);
        view.addChild(topGroup);
        view._topGroup = topGroup;
        //底部信息栏
        let downGroup = view.createInfoGroup(2);
        view.addChild(downGroup);
        view._downGroup = downGroup;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, downGroup, view);
        
        view._stepBtn = ComponentManager.getButton("atkrace_skip_down",null,view.stepBtnHandler,view);
        view._stepBtn.x = GameConfig.stageWidth - 10 - view._stepBtn.width;
        view._stepBtn.y = topGroup.y + topGroup.height + 120;
        // this._stepBtn.visible = false;
        view.addChild(view._stepBtn);
        
        // egret.Tween.get(this._stepBtn)
        // .wait(5000)
        // .set({visible:true})

    }

    private isDeadAtk = false;
    /**
	 * 开始一回合战斗
	 */
	private showRound():void
	{	
        //当前回合信息
        App.LogUtil.log("showRound "+this._curIdex);
        let curRoundData = this.getCurRoundData();
		if(this._topCurValue >0 && this._bottomCurValue >0){
            if(this._curRound > 0 && this._curIdex > 1 && ((this._curIdex-1) % (2* 1) == 0)){
                if ((this._curIdex-1) % 5 == 0){
                    this.showWinBattle(LanguageManager.getlocal(`acThreeKingdomsbattletip7`, [String(Math.floor(this._curIdex/2))]), false, true);
                }
                // this.showWinBattle(LanguageManager.getlocal(`acThreeKingdomsbattletip7`, [String(Math.floor(this._curIdex/2))]), false, true);
                egret.Tween.get(this).wait(1300).call(()=>{
                    egret.Tween.removeTweens(this);
                    //上方先手0 下方先手1
                    let area:number = 1;
                    if (this._curRoundFirst != this._curIdex%2)
                    {
                        area = 2;
                    }
                    //伤害信息 当前步骤
                    let reportInfo = curRoundData.reports[this._curIdex - 1];
                    this.attackHandle(area,reportInfo[1],reportInfo[0]==1);
                    let num = 0;
                    if(area == 1){
                        if(reportInfo[1] > this._topCurValue){
                            num = this._topCurValue;
                        }
                        else{
                            num = reportInfo[1];
                        }
                        this._uptotalarmy -= num;
                    }
                    else{
                        if(reportInfo[1] > this._bottomCurValue){
                            num = this._bottomCurValue;
                        }
                        else{
                            num = reportInfo[1];
                        }
                        this._downtotalarmy -= num;
                    }
                    this._curIdex++;
                }, this);
            }
            else{
                 //上方先手0 下方先手1
                let area:number = 1;
                if (this._curRoundFirst != this._curIdex%2)
                {
                    area = 2;
                }
                //伤害信息 当前步骤
                let reportInfo = curRoundData.reports[this._curIdex - 1];
                this.attackHandle(area,reportInfo[1],reportInfo[0]==1);
                let num = 0;
                if(area == 1){
                    if(reportInfo[1] > this._topCurValue){
                        num = this._topCurValue;
                    }
                    else{
                        num = reportInfo[1];
                    }
                    this._uptotalarmy -= num;
                }
                else{
                    if(reportInfo[1] > this._bottomCurValue){
                        num = this._bottomCurValue;
                    }
                    else{
                        num = reportInfo[1];
                    }
                    this._downtotalarmy -= num;
                }
                this._curIdex++;
            }
		}
		else{
            if(this.isDeadAtk){
                this.showEndGameBefore();
                this.isDeadAtk = false;
            }
            else{
                this.checkDeadWeapon();
            }
            
		}
    }
    
    private checkDeadWeapon():void{
        let view = this;
        if(this._curRound == 1 || this._curRound >=this.param.data.pklogs.length){
            this.showEndGameBefore();
        }
        else{
            if(this._topCurValue > 0 || this._bottomCurValue > 0){
                let info = this.getCurRoundData();
                let weaponinfo = this._topCurValue > 0 ? info.ainfo : info.binfo;
                let serId = weaponinfo.sid;
                let sinfo = this.getServantInfo(serId, this._topCurValue <= 0);//;
                let value = sinfo.deadDps;
                if(value){//value
                    this.isDeadAtk = true;
                    let clipgroup = new BaseDisplayObjectContainer();
                    this.addChildToContainer(clipgroup);
    
                    let eff1 = ComponentManager.getCustomMovieClip(`threekingdomsfighteff1`, 10);
                    eff1.playWithTime(-1);
                    eff1.width = 230;
                    eff1.height = 230;
                    // eff1.blendMode = egret.BlendMode.ADD;
        
                    let eff2 = ComponentManager.getCustomMovieClip(`threekingdomsfighteff2`, 10);
                    eff2.playWithTime(-1);
                    eff2.width = 260;
                    eff2.height = 160;
                    // eff2.blendMode = egret.BlendMode.ADD;
                    clipgroup.addChild(eff2);
                    eff2.setPosition(120,25);

                    clipgroup.addChild(eff1);

                    let img = BaseBitmap.create(`threekingdomsbattlelastatk`);
                    clipgroup.addChild(img);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, img, eff2, [55,10]);
                    
                    let weaponimg = BaseLoadBitmap.create(`weapon_icon_${serId}`);
                    weaponimg.width = 346;
                    weaponimg.height = 346;
                    clipgroup.addChild(weaponimg);
                    weaponimg.setScale(0.4);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, weaponimg, eff1, [0,5]);

                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clipgroup, this._topCurValue > 0 ? this._downHero : this._upHero, [-60,-20]);

                    egret.Tween.get(this).wait(1000).call(()=>{
                        //复仇一击
                        //上方先手2 下方先手1
                        let area:number = this._topCurValue <= 0 ? 2 : 1;
                        clipgroup.visible = false;
                        clipgroup.dispose();
                        clipgroup = null;
                        //伤害信息 当前步骤
                        this.attackHandle(area,value,false);
                        let num = 0;
                        if(area == 1){
                            if(value > this._topCurValue){
                                num = this._topCurValue;
                            }
                            else{
                                num = value;
                            }
                            this._uptotalarmy -= num;
                        }
                        else{
                            if(value > this._bottomCurValue){
                                num = this._bottomCurValue;
                            }
                            else{
                                num = value[1];
                            }
                            this._downtotalarmy -= num;
                        }
                        egret.Tween.removeTweens(this);
                    },view);
    
                }
                else{
                    this.showEndGameBefore();  
                }
            }
            else{
                this.showEndGameBefore();
            }
        }
    }

	protected atkEndCallback():void
	{	
        //掉血
        // if(this._curRound > 1){
        //     this._upTotalTalent.text = LanguageManager.getlocal(`acThreeKingdomsbattlearmynum-1`,[this._uptotalarmy.toString()]);
        //     this._upBProgress.setPercentage(this._uptotalarmy/this._upmaxarmy);
    
        //     this._downTotalTalent.text = LanguageManager.getlocal(`acThreeKingdomsbattlearmynum-1`,[this._downtotalarmy.toString()]);
        //     this._downBProgress.setPercentage(this._downtotalarmy/this._downmaxarmy);
        // }
        if(this._skip){
			this.hideLoadingMask();
            this.battleEnd();
            this._skip = false;
		}
        else{
            if(this._isEnd != true && this._isPause!=true) {
			    this.showRound();
		    }
        }
	}

	private showEndGameBefore():void
	{
        // if(this._curRound == 1){
        //     this.showWinBattle(LanguageManager.getlocal(`acThreeKingdomsbattletip6`), this._topCurValue > 0, false);
        //     //进行一系列特效
        //     /*...*/
        //     egret.Tween.get(this._upHero).wait(1300).to({x:-this._upHero.width}, 600);
        //     egret.Tween.get(this._downHero).wait(1300).to({x:this.width + this._downHero.width}, 600).call(()=>{
        //                     //完成下一步
        //         this.showEndGame();
        //     },this);
        // }
        // else{
            //卡牌移动 
            this.overRoundCardRun();
        // }
	}


	private showEndGame():void
	{	
        if (this._isEnd)
		{
			return;
		}

		// if (this._type == 1)
		// {
		// 	this.battleEnd();
		// 	return;
		// }

		this.removeRoundAnim();
		this._upHero.clearHero();
		this._downHero.clearHero();
		this.showMaskAndWin(this._curRound);
		
		if (this._curRound>=this.param.data.pklogs.length) 
		{	
			this.battleEnd();
		}
		else {
			this.roundBeginAnim()
		}
    }

    	//给icon贴上 胜 或 负
	private showMaskAndWin(round:number):void
	{	
		// for (let r = 1; r<=round; r++)
		// {
		// 	if ( this._reportVoApi.getBattleResultByRound(this._type,r)==1)
		// 	{
		// 		this._topIcons[r-1].setResult(2);
		// 		this._bottomIcons[r-1].setResult(1);
		// 	}
		// 	else 
		// 	{
		// 		this._topIcons[r-1].setResult(1);
		// 		this._bottomIcons[r-1].setResult(2);
		// 	}
		// }
	}

    private roundBeginAnim():void
	{	
		this._curRound++;
		
		if (this._upHero)
		{
			this._upHero.visible = false;
		}
		if (this._downHero)
		{
			this._downHero.visible = false;
		}
		// if (this._bottomProgress)
		// {
		// 	this._bottomProgress.visible = false;
		// }
		// if (this._topProgress)
		// {
		// 	this._topProgress.visible = false;
		// }
		this._stepBtn.visible = false;


		// this._beginAnimNode = new BaseDisplayObjectContainer();
		// this.addChild(this._beginAnimNode);

		let view = this;
        //特效待补充
        view.roundBegin();
    }	
    
    private roundBegin():void	{	

		this._stepBtn.visible = true;
		this._isPause = false;
		this.removeRoundAnim();
		
        this._curIdex = 1;
        let curRoundData = this.getCurRoundData();
        //上方先手0 下方先手1
        this._curRoundFirst = curRoundData.firstflag == 1 ? 1 : 0; 
        let info = this.getCurRoundData();
        let ainfo = info.ainfo;
        let binfo = info.binfo;

		this._topMaxValue = binfo.fullattr;
		this._bottomMaxValue =ainfo.fullattr;
		this.setBottomProgress(ainfo.fightattr?ainfo.fightattr:ainfo.fullattr,ainfo.fullattr,345);
        this.setTopProgress(binfo.fightattr?binfo.fightattr:binfo.fullattr,binfo.fullattr,345);

		// if (this._curRound == 1)
		// {
        //     this.setUpHero(null,this.upPlayerInfo,4);
        //     this.setDownHero(null,this.downPlayerInfo,4);
		// 	this._upHero.x = 17;
		// 	this._downHero.x = 280;
		// 	this._upHero.y = 100;
		// 	this._downHero.y = GameConfig.stageHeigth - 420 -  320 + 100;
		// }
		// else
		// {
            let sid = ainfo.sid;
            let sinfo = this.getServantInfo(sid, false);
            for(let i in sinfo){
                if(i == `fightattr`){
                    continue;
                }
                if(typeof ainfo[i] == `undefined`){
                    ainfo[i] = sinfo[i];
                }
            }
            ainfo.level = sinfo.lv;
            ainfo.skin = sinfo.equip;

            sid = binfo.sid;
            sinfo = this.getServantInfo(sid, true);
            for(let i in sinfo){
                if(i == `fightattr`){
                    continue;
                }
                if(typeof binfo[i] == `undefined`){
                    binfo[i] = sinfo[i];
                }
            }
            binfo.level = sinfo.lv;
            binfo.skin = sinfo.equip;

            if (binfo.sid)
			{
				let flag = false;
				let upHeroPic:string = ``;
				if(binfo.equip){
					upHeroPic = `skin_full_${binfo.equip}`;
					flag = true;
				}
				else{
					upHeroPic = Config.ServantCfg.getServantItemById(binfo.sid).fullIcon;
				}
				this.setUpHero(upHeroPic,{level:binfo.lv,name:LanguageManager.getlocal("servant_name"+binfo.sid),quality:binfo.quality,pos:1},0,flag);
			}
			else
			{
				this.setUpHero(null);
			}

			if (ainfo.sid)
			{
				let downPic:string ;
				let flag = false;
				if(ainfo.equip){
					flag = true;
					downPic = `skin_full_${ainfo.equip}`
				}
				else{
					downPic = Config.ServantCfg.getServantItemById(ainfo.sid).fullIcon;
				}
				this.setDownHero(downPic,{level:ainfo.lv,name:LanguageManager.getlocal("servant_name"+ainfo.sid),quality:ainfo.quality,pos:1},0,flag);
			}
			else
			{
				this.setDownHero(null);
			}
			this._upHero.x = 17;
			this._downHero.x = 280;
			this._upHero.y = 100;
			this._downHero.y = GameConfig.stageHeigth - 740 + 100;
        // }
        // this._topProgress.y = this._upHero.y + (this._curRound == 1 ? 330 : 385);
        this._topProgress.y = this._upHero.y +  385;
        this._topProgress.x = 17;
        // this._bottomProgress.y = GameConfig.stageHeigth - 740 + (this._curRound == 1 ? 330 + 100 : 385 + 100);
        this._bottomProgress.y = GameConfig.stageHeigth - 740 + 385 + 100;
        this._bottomProgress.x = 280;

		this._upHero.visible = true;
		this._downHero.visible = true;
        if(this._upHero.x < 0){
            egret.Tween.get(this._upHero).to({x:17}, 300);
        }

        if(this._downHero.x > this.width){
            egret.Tween.get(this._downHero).to({x:280}, 300);
        }
		egret.Tween.get(this._upHero).wait(600).call(()=>{
            this._upPositon = egret.Point.create(this._upHero.x,this._upHero.y);
            this._downPositon = egret.Point.create(this._downHero.x,this._downHero.y);
            this.checkWeapon();
        },this);


    }

    private checkWeapon():void
	{	
		// if (this._curRound == 1)
		// {	
		// 	this.checkWeaponBack();
		// 	return;
		// } 
        let info = this.getCurRoundData();
        let ainfo = info.ainfo;
        let binfo = info.binfo;

		let serId = ainfo.sid;
		let serId2 = binfo.sid;


		let value1 = ainfo.weaponDps;
		let value2 = binfo.weaponDps;
		
		if (!value1 && !value2)
		{	
			this.checkWeaponBack();
			return;
		}		

		ViewController.getInstance().openView(ViewConst.BASE.WEAPONCOMEONVIEW,{
			sid:serId,
			type:1,
			atype:4,
			value:value1,
			sid2:serId2,
			type2:4,
			atype2:4,
			value2:value2,
			f:this.checkWeaponBack,
			o:this,
			auto: false,
		});
	}

	private checkWeaponBack(skip:number = 0):void
	{	
        if (this && this.isShow())
        {
            if (skip == 0)
            {
                this.showRound();
            }
            else if (skip == 1)
            {
                this._downHero.showLight(this.showRound,this);
            }
            else if (skip == 2)
            {
                this._upHero.showLight(this.showRound,this);
            }
            else if (skip == 3)
            {	
                this._upHero.showLight();
                this._downHero.showLight(this.showRound,this);
            }
            else
            {
                this.showRound();
            }
        }
		
	}
    private removeRoundAnim():void
	{
		// if (this._beginAnimNode)
		// {
		// 	egret.Tween.removeTweens(this._beginAnimNode);
		// 	this.removeChild(this._beginAnimNode);
		// 	this._beginAnimNode=null;
		// }
	}

	//真结束
	private battleEnd():void
    {	
        App.LogUtil.log("buildNameaaa "+this.param.data.buildIndex);
        this.stopBattle();
        this._isEnd = true;
        ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1SEATBATTLERESULTVIEW,{
            point: this._point,
            winflag:this._winflag,
            f:this.hide,
            o:this,
            index: this.param.data.buildIndex,
        });
	}

	private battleCallbackEnd():void
	{
		// this._fuction.apply(this._obj,[this._type]);

		// this.hide();
    }
    
    private getCurRoundData(round : number = 0):{firstflag:number,win:number,reports:any[],ainfo:any,binfo:any}{
        if(!round){
            round = this._curRound;
        }
        let log = this.param.data.pklogs[round- 1];
        if(log){
            return{
                firstflag:log[0],//表示主视角先手
                win:log[1],//表示主视角获胜
                reports:log[2],//[hit1,hit2,hit3...] ，hit1为先手攻击，hit2为后手，以此类推hit = [isCri,damage]  isCri=1表示暴击了，damage伤害
                ainfo:log[3],//主视角门客信息
                binfo:log[4],//对手门客信息
            };
        }
        else{
            return null;
        }
        
    }

    private overRoundCardRun(){
        // console.log("overRoundCardRun");
        if(this._isPause){
            return;
        }
        let curRoundData = this.getCurRoundData();
        let nextRoundData = this.getCurRoundData(this._curRound + 1);
        if(curRoundData && nextRoundData){
                
            //上方赢了
            if(curRoundData.win != 1){
                //剩余门客数
                -- this._downWifeNum;
                // this._downWifeCount.text = LanguageManager.getlocal(`acThreeKingdomsbattleservantnum-1`,[this._downWifeNum.toString()]);
                // App.DisplayUtil.setLayoutPosition( LayoutConst.lefttop, this._downWifeCount, this._downBProgress, [50,-this._downWifeCount.textHeight-5]);

                //自己方移动 visible
                let tempCard = this._downSelectCard;
                this._downSelectCard = this._downWifeCardList[tempCard["index"] + 1];
                this._downCardContainer.setChildIndex(this._downSelectCard,this._downMaxNum );

                App.DisplayUtil.changeToGray(tempCard);
                tempCard["select"].visible = false;
                tempCard.setScale(0.85);
                tempCard.x = this._downCardContainer.width / 2 - tempCard.width * tempCard.scaleX/2 + 90 * tempCard["index"];
                tempCard.y = this._downCardContainer.height / 2 - tempCard.height * tempCard.scaleY/2;

                this._downSelectCard["select"].visible = true;
                this._downSelectCard.setScale(1);
                this._downSelectCard.x = this._downCardContainer.width / 2 - this._downSelectCard.width * this._downSelectCard.scaleX/2 + 90 * this._downSelectCard["index"];
                this._downSelectCard.y = this._downCardContainer.height / 2 - this._downSelectCard.height * this._downSelectCard.scaleY/2;  

                this._downCardContainer.setChildIndex(tempCard,this._downCardContainer.getChildIndex(this._downSelectCard)-1);
                // this._downCardContainer.setChildIndex(tempCard,tempCard["index"]);
                egret.Tween.get(this._downCardContainer)
                .to({x:this._downCardContainer.x - 90},400);

                egret.Tween.get(this._downHero).to({x:this.width + this._downHero.width}, 600);


            }
            //下方赢了
            if(curRoundData.win == 1){
                 //剩余门客数
                // -- this._upWifeNum;
                // this._upWifeCount.text = LanguageManager.getlocal(`acThreeKingdomsbattleservantnum-1`,[this._upWifeNum.toString()]);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this._upWifeCount, this._upBProgress, [50,-this._upWifeCount.textHeight-5]);

                let tempCard = this._upSelectCard;
                this._upSelectCard = this._upWifeCardList[tempCard["index"] + 1];
                this._upCardContainer.setChildIndex(this._upSelectCard,this._upMaxNum);


                App.DisplayUtil.changeToGray(tempCard);
                tempCard["select"].visible = false;
                tempCard.setScale(0.85);
                tempCard.x = this._upCardContainer.width / 2 - tempCard.width * tempCard.scaleX/2 - 90 * tempCard["index"];
                tempCard.y = this._upCardContainer.height / 2 - tempCard.height * tempCard.scaleY/2;

                this._upSelectCard["select"].visible = true;
                this._upSelectCard.setScale(1);
                this._upSelectCard.x = this._upCardContainer.width / 2 - this._upSelectCard.width * this._upSelectCard.scaleX/2 - 90 * this._upSelectCard["index"];
                this._upSelectCard.y = this._upCardContainer.height / 2 - this._upSelectCard.height * this._upSelectCard.scaleY/2;  

                this._upCardContainer.setChildIndex(tempCard,this._upCardContainer.getChildIndex(this._upSelectCard)-1);
                // this._upCardContainer.setChildIndex(tempCard,tempCard["index"]);

                egret.Tween.get(this._upCardContainer)
                .to({x:this._upCardContainer.x + 90},400);
                egret.Tween.get(this._upHero).to({x:-this._upHero.width}, 600);

            }
            egret.Tween.removeTweens(this);
            egret.Tween.get(this)
            .wait(600)
            .call(this.showEndGame,this)

        } else {
            this.playOver();
            this.showEndGame();
        }

    }

    private playOver(){
        this.stopBattle();
    }

 
    private initCards(){
        let view = this;
        let myCardDataList = [];
        view._downWifeCardList = [];
        view._upWifeCardList = [];
        let sidlist1 = view.param.data.sidlist1;
        for(let i in sidlist1){
            let info = sidlist1[i];
            let obj = {
                servantid : info.sid,
                idx : Number(i) + 1,
                fightattr : info.fightattr,
            };
            myCardDataList.push(obj);
        }
        myCardDataList = myCardDataList.sort((w1,w2)=>{
            return w1.idx - w2.idx;
        });

        let enemyCardDataList = [];
        let sidlist2 = view.param.data.sidlist2;
        for(let i in sidlist2){
            let info = sidlist2[i];
            let obj = {
                servantid : info.sid,
                idx : Number(i) + 1,
                fightattr : info.fightattr,
            };
            enemyCardDataList.push(obj);
        }
        enemyCardDataList = enemyCardDataList.sort((w1,w2)=>{
            return w1.idx - w2.idx;
        });


        this._downMaxNum = myCardDataList.length;
        this._upMaxNum = enemyCardDataList.length;


        let offX = 90;
        let scale = 0.85;


        let curCard = null;
        let flag = -1;
        for(let i = 0;i < enemyCardDataList.length; i++){
            let enemyCardData = enemyCardDataList[i];
            let card = this.createCard(enemyCardData.servantid,i,true);
            card.setScale(scale);
           
            this._upCardContainer.addChild(card);
            // if(enemyCardData.fightattr <= 0){
            //     App.DisplayUtil.changeToGray(card);
            // }
            // if(enemyCardData.fightattr > 0 && flag == -1){
            //     flag = Number(i);
            //     this._upSelectCard = card;
            //     card.setScale(1);
            //     card["select"].visible = true;
            // }
            if(flag == -1){
                flag = Number(i);
                this._upSelectCard = card;
                card.setScale(1);
                card["select"].visible = true;
            }
            card.x = this._upCardContainer.width / 2 - card.width * card.scaleX/2 - offX * i;
            card.y = this._upCardContainer.height / 2 - card.height * card.scaleY/2;
            if(curCard != null){
                this._upCardContainer.setChildIndex(card,this._upCardContainer.getChildIndex(curCard));
            }
            // this._upCardContainer.addChildAt(card,this._upMaxNum - i);
            this._upWifeCardList.push(card);
            curCard = card;    
        }
        this._upCardContainer.x = 90 * flag;


        curCard = null;
        flag = -1;
        for(let i = 0;i < myCardDataList.length; i++){
            let myCardData = myCardDataList[i];
            let card = this.createCard(myCardData.servantid,i,false);
            card.setScale(scale);

            this._downCardContainer.addChild(card);
            // if(myCardData.fightattr <= 0){
            //     App.DisplayUtil.changeToGray(card);
            // }
            if(flag == -1){
                this._downSelectCard = card;
                card.setScale(1);
                card["select"].visible = true;
                flag = Number(i);
            }
            card.x = this._downCardContainer.width / 2 - card.width * card.scaleX/2 + offX * i;
            card.y = this._downCardContainer.height / 2 - card.height * card.scaleY/2;
            if(curCard != null){
                this._downCardContainer.setChildIndex(card,this._downCardContainer.getChildIndex(curCard));
            }
            // this._downCardContainer.addChildAt(card,this._downMaxNum - i);
            this._downWifeCardList.push(card);
            curCard = card;
        }
        this._downCardContainer.x = -90 * flag;
    }
    
    private getServantInfo(servantid : number, up : boolean):any{
        let view = this;
        let sinfo = up ? view.param.data.sidlist2 : view.param.data.sidlist1;
        for(let i in sinfo){
            if(Number(sinfo[i].sid) == Number(servantid)){
                return sinfo[i];
            }
        }
    }

    private createCard(servantid:number,index:number,isMy:boolean):BaseDisplayObjectContainer{
        let card = new BaseDisplayObjectContainer();
        card.width = 86;
        card.height = 86;

        let info = this.getServantInfo(servantid, isMy);
        let isblue = false;
        // if(isMy){
        //     isblue = Api.switchVoApi.checkIsInBlueWife() && info.sexflag && info.sexflag >= 1;
        // } else {
        //     isblue = info.sexflag && info.sexflag >= 1;
        // }

        let bg = BaseLoadBitmap.create(`servant_cardbg_${info.clv}`);
        bg.width = 194;
        bg.height = 192;
        bg.x = 0;
        bg.y = 0;
        bg.setScale(86/bg.width);
        card.addChild(bg);

        let servantcfg:Config.ServantItemCfg = Config.ServantCfg.getServantItemById(servantid);//Api.wifeVoApi.getWifeInfoVoById(wifeId);
        let servantskin:Config.ServantskinItemCfg = null;

        let iconStr = null;
        if(info.equip){
            //皮肤
            servantskin= Config.ServantskinCfg.getServantSkinItemById(info.equip);
            iconStr = servantskin.icon;
        } else {
            iconStr = servantcfg.halfIcon;
        } 

        let icon = BaseLoadBitmap.create(iconStr);
        icon.width = 180;
        icon.height = 177;
        icon.setScale(85/180);
        icon.x = card.width/2 - icon.width * icon.scaleX / 2;
        icon.y = 0;
        card.addChild(icon);
        icon.mask = new egret.Rectangle(0,0,186,186);

        let nameSize = 18;
        if(PlatformManager.checkIsViSp()){
            nameSize = 16;
        }
        // let name = ComponentManager.getTextField(wifeInfo.getName(isblue),nameSize,TextFieldConst.COLOR_BROWN);
        // //let name = ComponentManager.getTextField(wifeInfo.name,nameSize,TextFieldConst.COLOR_BROWN);
        
       
        // if(PlatformManager.checkIsViSp()){
        //     name.width = 100;
        //     name.textAlign = egret.HorizontalAlign.CENTER;
        //     name.y = card.height - 25 - name.height/2;
        // } else {
        //     name.y = card.height - 10 - name.height;
        // }
        // name.x = card.width/2 - name.width/2;
        
        // card.addChild(name);
        
        let select = BaseBitmap.create("wifebattlebattleview_select");
        select.width = card.width + 20;
        select.height = card.height +20;
        select.x = -10;
        select.y = -10;
        card.addChild(select);
        card["select"] = select;
        card["index"] = index;
        select.visible = false;

        return card;
    }

    protected setUpHero(picName:string,info?:any,type?:number, eff?:boolean):void
	{
        let tmpx = 0;
        let tmpy = 0;
		if (this._upHero) {
            tmpx = this._upHero.x;
            tmpy = this._upHero.y;
			this._upHero.dispose();
			this._upHero = null;
		}

		this._upHero = new BattleHero();
		this._upHero.init(picName, info, type, 0, eff);
		this._upHero.setPosition(tmpx, tmpy);
		this.addChildToContainer(this._upHero);
	}	

	protected setDownHero(picName:string,info?:any,type?:number, eff?:boolean):void
	{
		let tmpx = 0;
        let tmpy = 0;
		if (this._downHero) {
            tmpx = this._downHero.x;
            tmpy = this._downHero.y;
			this._downHero.dispose();
			this._downHero = null;
		}

		this._downHero = new BattleHero();
		this._downHero.init(picName, info ,type, 1, eff);
        this._downHero.setPosition(tmpx, tmpy);
		this.addChildToContainer(this._downHero);
	}

    private stepBtnHandler(){
        if(!this._skip){
            this._skip = true;
            this.showLoadingMask();
        }
    }

    private stopBattle(){
        this._isPause = true;
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            `atkrace_battle_info`,
            `threekingdomsbattleview`,
            "specialview_commoni_namebg",
            "wifebattlebattleview_blackbg",
            "progress3_bg",
            "progress8",
            "progress7_bg",
            "skinshowkuang3",
            "wifebattlebattleview_flower1",
            "wifebattlebattleview_flower2",
            "wifebattlebattleview_playercardbg",
            "wifebattlebattleview_progresslight",
            "wifebattlebattleview_select",
            "atkrace_skip_down",
            "wifebattlebattleview_skinnamebg",
            "wifebattlebattleview_sprogressbar",
            "wifebattlebattleview_sprogressbg",
            "wifebattlebattleview_wifenamebg",
            "wifebattlebattleview_wifenamefg",
            "wifebattlebattleview_cardmask"
		]);
	}
   
        

    public dispose()
    {
        if(this){
            egret.Tween.removeTweens(this);
        }

        this._topGroup = null;
        this._downGroup = null;
        this._fightarr = null;
        this._point = 0;
        this._rewardnum = 0;
        this._winflag = 0;
        this._callback = null;
        this._target = null;
        if(this._stepBtn){
            egret.Tween.removeTweens(this._stepBtn);
        }
        this._stepBtn = null;
        //我方
        this._downWifeCount = null;
        this._downTotalTalent = null;
        this._downCardContainer = null;
        this._downBProgress = null;
        this._downWifeCardList = null;
        //敌人
        this._upWifeCount = null;
        this._upTotalTalent = null;
        this._upCardContainer = null;
        this._upBProgress = null;
        this._upWifeCardList = null;
        // this._myCardDataList = null;
        // this._enemyCardDataList= null;
        this._curRound = 0;
        this._downSelectCard = null;
        this._upSelectCard = null;
        this._downMaxNum = 0;
        this._upMaxNum = 0;

        this._isPause = false;
        this._skip = false;
        this._isEnd = false;
        this._curRoundFirst = 0;
        this.isDeadAtk = false;
        super.dispose()
    }
}