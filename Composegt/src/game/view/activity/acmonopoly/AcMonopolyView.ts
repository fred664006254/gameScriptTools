/**
 * author yanyuling
 */
class AcMonopolyView extends AcCommonView
{
    constructor() {
        super();
    }

    private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;
	private _lastTimesTxt:BaseTextField;
    private _taskBtn:BaseButton;
    private _isPlaying:boolean = false;

    private _scrollNode:BaseDisplayObjectContainer
    private _iconList:BaseBitmap[] = [];
    private _scrollView:ScrollView;
    private _selectMask:BaseDisplayObjectContainer = undefined;
    private _selectHeadNode:BaseDisplayObjectContainer;
    private _rewardButton:BaseButton;
    private _lastPos:number = 0;
    private _finalPosRewards:string = "";
    private _stepIconBtn:BaseBitmap;

    protected get acVo():AcMonopolyVo
	{
		return <AcMonopolyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
	}

    public initView()
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH,this.refreshTaskRed,this);

        this.viewBg.y = 40;
        let flipcard_txt = BaseBitmap.create("monopoly_txt1");
        flipcard_txt.x = GameConfig.stageWidth/2 - flipcard_txt.width/2;
        flipcard_txt.y = 0;
        this.addChild(flipcard_txt);

        //顶部
        let flipcard_bg06 = BaseBitmap.create("monopoly_bg11");
        // flipcard_bg06.width = GameConfig.stageWidth;//-10;
        // flipcard_bg06.height = 180;
        flipcard_bg06.x = GameConfig.stageWidth/2 - flipcard_bg06.width/2;
        flipcard_bg06.y = 70;
        this.addChildToContainer(flipcard_bg06);

		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = flipcard_bg06.x +15
		this._activityTimerText.y = flipcard_bg06.y + 13;
		this._activityTimerText.text  = this.acVo.getAcLocalTime(true,"0xffffff");
		this.addChildToContainer(this._activityTimerText);

		let deltaY = 5;
		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("",20, TextFieldConst.COLOR_LIGHT_YELLOW);
		acCDTxt.text = LanguageManager.getlocal("acMonopoly_acCD", [""]);
		acCDTxt.x = this._activityTimerText.x;
		acCDTxt.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
		this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt;

		//规则
		this._ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(),20,);
		this._ruleText.x = this._activityTimerText.x;
		this._ruleText.y = this._acCDTxt.y + this._activityTimerText.height + deltaY;
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 3;
        this._ruleText.width = flipcard_bg06.width - this._activityTimerText.x*2;
		this._ruleText.text = LanguageManager.getlocal("acMonopoly_Rule"+this.code);
		this.addChildToContainer(this._ruleText);

        //底部
        let bottombg = BaseBitmap.create("monopoly_bg3");
        bottombg.x = 0;
        bottombg.y = GameConfig.stageHeigth-bottombg.height - this.container.y;;
        this.addChildToContainer(bottombg);

        // 任务
        let iconBg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
        iconBg.x = 70;
        iconBg.y = bottombg.y+bottombg.height/2 - iconBg.height/2;
        iconBg.addTouchTap(this.taskBtnHandler,this);
        this.addChildToContainer(iconBg);
        // iconBg.visible = false;

        let taskButton:BaseButton = ComponentManager.getButton("punish_reward_icon","",this.taskBtnHandler,this);
        taskButton.width = taskButton.height = 80;
        taskButton.x =iconBg.x + iconBg.width/2 - taskButton.width/2;
        taskButton.y = iconBg.y + iconBg.height/2 - taskButton.height/2;
        this.addChildToContainer(taskButton);
        this._taskBtn = taskButton;

		let taskButtonTxt:BaseBitmap=BaseBitmap.create("acspringouting_taskname-1");
		taskButtonTxt.x = taskButton.x + taskButton.width/2 - taskButtonTxt.width/2+3;
		taskButtonTxt.y = taskButton.y + 57 ;
		this.addChildToContainer(taskButtonTxt);

        // 奖励
        let iconBg2:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
        iconBg2.x = GameConfig.stageWidth -iconBg2.width - iconBg.x ;
        iconBg2.y =  iconBg.y;
        iconBg.addTouchTap(this.rewardBtnHandler,this);
        this.addChildToContainer(iconBg2);

        let rewardButton:BaseButton = ComponentManager.getButton("acspringouting_taskicon-1","",this.rewardBtnHandler,this);
        rewardButton.x =iconBg2.x + iconBg2.width/2 - rewardButton.width/2;
        rewardButton.y = taskButton.y ;
        this.addChildToContainer(rewardButton);
        this._rewardButton = rewardButton;
        
		let rewardButtonTxt:BaseBitmap=BaseBitmap.create("activity_reward_txt");
		rewardButtonTxt.x = rewardButton.x + rewardButton.width/2 - rewardButtonTxt.width/2+3;
		rewardButtonTxt.y = taskButtonTxt.y  ;
		this.addChildToContainer(rewardButtonTxt);

        //中间骰子
        let monopoly_bg10 =BaseBitmap.create("monopoly_bg10");
		monopoly_bg10.x = bottombg.x + bottombg.width/2 - monopoly_bg10.width/2;
		monopoly_bg10.y = bottombg.y+bottombg.height/2 - monopoly_bg10.height/2+12;
		this.addChildToContainer(monopoly_bg10);

        let stepIcon = BaseBitmap.create("monopoly_icon_btn");//ComponentManager.getButton("monopoly_icon_btn","",this.stepBtnClick,this);
        stepIcon.addTouchTap(this.stepBtnClick,this);
        this._stepIconBtn = stepIcon;
        stepIcon.width = stepIcon.height = 100;
        stepIcon.x = monopoly_bg10.x + monopoly_bg10.width/2 ;
		stepIcon.y = monopoly_bg10.y+monopoly_bg10.height/2;
        this.addChildToContainer(stepIcon);
        this._stepIconBtn.anchorOffsetX = this._stepIconBtn.width/2;
        this._stepIconBtn.anchorOffsetY = this._stepIconBtn.height/2;
        this.dealStepIconAni();

        let lastnumbg = BaseBitmap.create("monopoly_bg8");
		lastnumbg.x = monopoly_bg10.x + monopoly_bg10.width/2-lastnumbg.width/2 ;
		lastnumbg.y = monopoly_bg10.y+monopoly_bg10.height - lastnumbg.height/2-10;
		this.addChildToContainer(lastnumbg);

        let searchtxt1 = ComponentManager.getTextField("",18, TextFieldConst.COLOR_QUALITY_YELLOW);
		searchtxt1.text  = LanguageManager.getlocal("acMonopoly_txt2");
		searchtxt1.x = lastnumbg.x + lastnumbg.width/2 - searchtxt1.width/2;
		searchtxt1.y = lastnumbg.y+lastnumbg.height/2 - searchtxt1.height/2;
		this.addChildToContainer(searchtxt1);

        
        //剩余次数
        this._lastTimesTxt =  ComponentManager.getTextField("123",TextFieldConst.FONTSIZE_CONTENT_SMALL);// ,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._lastTimesTxt.text = "0";
        this._lastTimesTxt.anchorOffsetX = this._lastTimesTxt.width/2;
        this._lastTimesTxt.x = monopoly_bg10.x + monopoly_bg10.width/2 ;
        this._lastTimesTxt.y = monopoly_bg10.y - 18;
        this.addChildToContainer(this._lastTimesTxt);

        // let startX = 5;
        // let startY = flipcard_bg06.y + flipcard_bg06.height + 10;
        
        let startX = 5;
        let startY = 5;
        let cfg = <Config.AcCfg.MonopolyCfg>this.acVo.config;
        let diceGrid = cfg.diceGrid;
        let diceMaxNum = cfg.diceMaxNum;

        this._scrollNode = new BaseDisplayObjectContainer();
        let keys = Object.keys(diceGrid);
        let len = keys.length;
        for (var index = 0; index < len+2; index++) {
            let rewardvo:RewardItemVo = undefined;
            let monopoly_bg = BaseBitmap.create("monopoly_bg9");
            if(index == 0){
                monopoly_bg.texture = ResourceManager.getRes("monopoly_start");
            }else if(index ==len+1 ){
                monopoly_bg.texture = ResourceManager.getRes("monopoly_end");
            }else{
                var element = diceGrid[keys[index-1]];
                rewardvo = GameData.formatRewardItem(element.gridReward)[0];
                monopoly_bg.addTouchTap(()=>{
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,rewardvo);
                },this);
            }
            monopoly_bg.x = startX;
            monopoly_bg.y = startY;
            this._scrollNode.addChild(monopoly_bg);
            this._iconList.push(monopoly_bg);
            if((index <=4) || (index > 15 && index <=20) || (index > 31 && index <=36)){
                startX += monopoly_bg.width+1;
            }else if((index >4 && index <=7) || (index >12 && index <=15)|| (index >20 && index <=23)  || (index > 28 && index <=31) || (index >36 && index <=39) ){
                startY += monopoly_bg.height+1;
            }else if( (index > 7 && index <=12 ) || (index > 23 && index <=28) || (index >39 && index <=44) ){
                startX -= monopoly_bg.width+1;
            }
           
            if(rewardvo){
                let rewardicon = BaseLoadBitmap.create(rewardvo.icon);
                rewardicon.width = rewardicon.height = 100;
                rewardicon.x = monopoly_bg.x + monopoly_bg.width/2 - rewardicon.width/2;
                rewardicon.y = monopoly_bg.y + monopoly_bg.height/2 - rewardicon.height/2;
                this._scrollNode.addChild(rewardicon);
            }

            // let txt = ComponentManager.getTextField(""+index,TextFieldConst.FONTSIZE_CONTENT_SMALL ,TextFieldConst.COLOR_LIGHT_YELLOW);
            // txt.x = monopoly_bg.x + 20 ;
            // txt.y = monopoly_bg.y + 20;
            // this._scrollNode.addChild(txt);
        }

        let rect = egret.Rectangle.create();
        rect.setTo(0,0,GameConfig.stageWidth,bottombg.y - flipcard_bg06.y - flipcard_bg06.height - 10);
        this._scrollView = ComponentManager.getScrollView(this._scrollNode,rect);
        this._scrollView.x = 0 ;
        this._scrollView.y = flipcard_bg06.y + flipcard_bg06.height + 5;
        this._scrollView.bounces = false;
        this._scrollView.horizontalScrollPolicy ="off";
        this.addChildToContainer(this._scrollView);  
        
        let public_alphabg = BaseBitmap.create("public_alphabg");
        public_alphabg.width=this._scrollNode.width;
        public_alphabg.height = this._scrollNode.height;;
        this._scrollNode.addChild(public_alphabg);

        //monopoly_bg4
        let monopoly_bg4 =  BaseBitmap.create("monopoly_bg4");
        monopoly_bg4.x= 60;
        monopoly_bg4.y=150;
        this._scrollNode.addChild(monopoly_bg4);

        let userhead = Api.playerVoApi.getUserCircleHead(Api.playerVoApi.getPlayePicId(),this.acVo.config.diceTitleID);
        userhead.x = monopoly_bg4.x + 40;
        userhead.y = monopoly_bg4.y + 2;
        this._scrollNode.addChild(userhead);

        let txt = ComponentManager.getTextField(""+index,20);
        txt.text = LanguageManager.getlocal("acMonopoly_headtxt_"+this.code);
        txt.multiline = true;
        txt.lineSpacing = 3;
        txt.width = 210;
        txt.height = monopoly_bg4.height-40;
        txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        txt.x = monopoly_bg4.x + 160 ;
        txt.y = monopoly_bg4.y + 10;
        this._scrollNode.addChild(txt);

        this._selectMask = new BaseDisplayObjectContainer();
        this._selectMask.width = 112;
        this._selectMask.height = 112;
        // BaseBitmap.create("monopoly_select");
        this._scrollNode.addChildAt(this._selectMask,0);

        this._selectHeadNode = new BaseDisplayObjectContainer();
        this._selectHeadNode.width = this._selectMask.width;
        this._selectHeadNode.height = this._selectMask.height;
        let monopoly_bg12 =  BaseBitmap.create("monopoly_bg12");
        monopoly_bg12.x=this._selectHeadNode.width/2 - monopoly_bg12.width/2;
        monopoly_bg12.y=this._selectHeadNode.height/2 - monopoly_bg12.height/2-10;
        this._selectHeadNode.addChild(monopoly_bg12);
        this._scrollNode.addChild(this._selectHeadNode);

        let boxClip = ComponentManager.getCustomMovieClip("monopoly_anibox",7,150);
        let deltaS = 1.0;
        boxClip.width = 160*deltaS;
        boxClip.height = 160*deltaS;
        boxClip.anchorOffsetY = boxClip.height/2 ;
        boxClip.anchorOffsetX = boxClip.width/2 ;
        boxClip.x =  this._selectHeadNode.width/2;
        boxClip.y =  this._selectHeadNode.height/2;
        // boxClip.blendMode = egret.BlendMode.ADD;
        this._selectMask.addChild(boxClip);
        boxClip.playWithTime(0);

        let headClip = ComponentManager.getCustomMovieClip("monopoly_ani_head",7,100);
        let deltaS2 = 1.0;
        headClip.width = 120*deltaS2;
        headClip.height = 120*deltaS2;
        headClip.anchorOffsetY = headClip.height/2 ;
        headClip.anchorOffsetX = headClip.width/2 ;
        headClip.x = this._selectHeadNode.width/2;
        headClip.y =  this._selectHeadNode.height/2-10;
        // headClip.blendMode = egret.BlendMode.ADD;
        this._selectHeadNode.addChild(headClip);
        headClip.playWithTime(0);

        let headimg = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPath());
        let deltaS3 = 0.6;
        headimg.width = 136*deltaS3;
        headimg.height = 143*deltaS3;
        headimg.x= monopoly_bg12.x+ monopoly_bg12.width/2 - headimg.width/2;
        headimg.y= monopoly_bg12.y+ monopoly_bg12.height/2 - headimg.height/2-8;
        this._selectHeadNode.addChild(headimg);

        this._lastPos = this.acVo.position;
        this.adjustSelectPos(this.acVo.position)
        this.refreshTaskRed();
        this.adjustScrolPos();
        this.tick();
    }   

    private dealStepIconAni()
    {
        egret.Tween.removeTweens(this._stepIconBtn);
        egret.Tween.get(this._stepIconBtn,{loop : true}).to({scaleX : 1.1, scaleY : 1.1}, 200).wait(600).to({scaleX : 1, scaleY : 1}, 200);
        egret.Tween.get(this._stepIconBtn,{loop : true}).wait(130).to({rotation : -20}, 70).to({rotation : 16}, 70).to({rotation : -14}, 130).to({rotation : 12}, 130).to({rotation : -10}, 140).to({rotation : 8}, 130).to({rotation : 0}, 130);
       
    }
    private refreshUI()
    {
        this._lastTimesTxt.text = LanguageManager.getlocal("acMonopoly_txt3",[ "" + this.acVo.dicenum]);
        this._lastTimesTxt.anchorOffsetX = this._lastTimesTxt.width/2;
    }

    private doStepAni()
    {
        let endPos = this.acVo.position;
        if(endPos == 0){
            endPos = this._iconList.length-1;
        }
        let deltat = 300;
        if(this._lastPos <= endPos)
        {
            this.adjustSelectPos(this._lastPos);
            this._lastPos +=1;
            egret.Tween.get(this._selectHeadNode,{loop:false}).wait(deltat).call(this.doStepAni,this);
            this.adjustScrolPos(deltat);
        }else{
            // let rList = GameData.formatRewardItem(this._finalPosRewards);
            // App.CommonUtil.playRewardFlyAction(rList);
           
                //添加动画 "monopoly_ani_head","monopoly_anibox",
                let boxClip = ComponentManager.getCustomMovieClip("monopoly_target",7,100);
                let deltaS = 1.0;
                boxClip.width = 200*deltaS;
                boxClip.height = 200*deltaS;
                boxClip.anchorOffsetY = boxClip.height/2 ;
                boxClip.anchorOffsetX = boxClip.width/2 ;
                boxClip.x = this._selectHeadNode.x +this._selectHeadNode.width/2;
                boxClip.y = this._selectHeadNode.y +this._selectHeadNode.height/2;
                boxClip.blendMode = egret.BlendMode.ADD;
                this._scrollNode.addChild(boxClip);
                boxClip.playWithTime(1);
                egret.Tween.pauseTweens(this._stepIconBtn);
                let tmpthis = this;
                egret.Tween.get(this,{loop:false}).wait(700).call(()=>{
                    tmpthis._scrollNode.removeChild(boxClip);
                    boxClip = null;
                },this).wait(200).call(this.showRewardUI,this);
                
        }
    }
    private showRewardUI()
    {
         this._isPlaying = false;
         if(this.acVo.position == 0){
            ViewController.getInstance().openView(ViewConst.POPUP.ACMONOPOLYREWARDPOPUPVIEW,{
                turn:this.acVo.theturn,
                aid:this.aid,
                code:this.code,
                rewards: this._finalPosRewards,
                tarobj:this,
                callback:this.showRewardCallback,
            });
        }else{
            this.adjustSelectPos(this.acVo.position);
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":this._finalPosRewards,"otherRewards":null,"isPlayAni":true,callback:this.dealStepIconAni,target:this});
        }
    }

    private showRewardCallback()
    {
        this.dealStepIconAni();//,this)
        this._lastPos = this.acVo.position;
        this.adjustSelectPos(this.acVo.position);
        this.adjustScrolPos();
    }
    private adjustSelectPos(posidx:number)
    {
        this._selectHeadNode.x = this._selectMask.x = this._iconList[posidx].x-5;
        this._selectHeadNode.y = this._selectMask.y = this._iconList[posidx].y-5;
    }
    private adjustScrolPos(deltat:number=0)
    {
        deltat = deltat || 0;
        let toptop = this._scrollView.scrollTop;
        let diffY = toptop + this._selectHeadNode.y;
        if( this._selectHeadNode.y -30 < toptop){
            this._scrollView.setScrollTop(0,300);
        } else if ( this._selectHeadNode.y  - toptop  > this._scrollView.height -20){
            this._scrollView.setScrollTop(this._scrollNode.height -this._scrollView.height+150 ,deltat);
        }
    }
    private stepBtnClick()
	{
        if( this._isPlaying){
            return;
        }
        if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if(this.acVo.dicenum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal('acMonopoly_nettip2'));
            return;
        }
        this._isPlaying = true;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_DICING,this.stepHandlerNetBack,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_DICING,{activeId:this.acVo.aidAndCode})
	}
  
    private stepHandlerNetBack(event:egret.Event)
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_DICING,this.stepHandlerNetBack,this);
		if (event.data.data.ret === 0) {
			let rdata = event.data.data.data;
			let rewards = rdata.rewards;

            let step = rdata.step;
            // let position = this._lastPos;
            // let max = this._iconList.length;
            // if(position + step > max){
            //     step = max - position;
            // }
            let treasureboxClip = ComponentManager.getCustomMovieClip("treasurebox1-",12,80);
            let deltaS2 = 1.0;
            treasureboxClip.width = 100*deltaS2;
            treasureboxClip.height = 100*deltaS2;
            treasureboxClip.anchorOffsetX = treasureboxClip.width/2;
            treasureboxClip.anchorOffsetY = treasureboxClip.height/2;
            treasureboxClip.x = this._stepIconBtn.x;
            treasureboxClip.y =  this._stepIconBtn.y;
            this.addChildToContainer(treasureboxClip);
            treasureboxClip.playWithTime(1);
            this._finalPosRewards = rewards;
            // this.dealStepIconAni();
            egret.Tween.removeTweens(this._stepIconBtn);

            let tmpthis = this;
            egret.Tween.get(treasureboxClip,{loop:false}).wait(960).call(()=>{
                treasureboxClip.visible = false;
                tmpthis._stepIconBtn.texture = ResourceManager.getRes("treasurebox1-"+(step+12));
            },this).wait(100).call(()=>{
                tmpthis.refreshUI();
                tmpthis.doStepAni();
                tmpthis.container.removeChild(treasureboxClip);
                treasureboxClip = null;
            },this);
		}else{
            this._isPlaying = false;
        }
	}

    private taskBtnHandler()
    {
        if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACMONOPOLYTASKANDREWARDVIEW,{aid:this.aid,code:this.code,showTab:0});
        
    }
    private rewardBtnHandler()
    {
        if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACMONOPOLYTASKANDREWARDVIEW,{aid:this.aid,code:this.code,showTab:1});
        
    }
   
    public tick(): boolean {
		let deltaT = this.acVo.et - GameData.serverTime;
		let cdStrK = "acMonopoly_acCD";
		if(this.code == "4"){
			cdStrK = "acMonopoly_acCD2";
		}
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [App.DateUtil.getFormatBySecond(deltaT, 8)]);
			return true;
		} else {
			this._acCDTxt.text = LanguageManager.getlocal(cdStrK, [LanguageManager.getlocal("acMonopoly_acCDEnd")]);
		}
	
		return false;
	}

    private refreshTaskRed()
    {
        if(this.acVo.isShowTaskRed())
        {
            App.CommonUtil.addIconToBDOC(this._taskBtn );
        }else{
            App.CommonUtil.removeIconFromBDOC(this._taskBtn );
        }
         if(this.acVo.isShowRewardRed())
        {
            App.CommonUtil.addIconToBDOC(this._rewardButton );
        }else{
            App.CommonUtil.removeIconFromBDOC(this._rewardButton );
        }
        this.refreshUI();
    }
    protected getTitleStr()
    {
        return "";
    }
    protected getBgName():string
	{
		return  "monopoly_bg1";
	}
	// 标题背景名称
	protected getTitleBgName():string
	{
		return  "monopoly_bg2";
	}

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"monopoly_bg1", "monopoly_bg2", "monopoly_bg3", "monopoly_bg4",
            "monopoly_bg8", "monopoly_bg9", "monopoly_bg10","monopoly_bg11",
            "monopoly_end","monopoly_icon_btn", "monopoly_start", "monopoly_txt1",
            "acspringouting_taskname-1","punish_reward_icon","monopoly_bg12","monopoly_select","acspringouting_taskicon-1","acspringouting_taskname-1",
            "activity_reward_txt","monopoly_ani_head","monopoly_anibox","treasurebox1-","monopoly_target",
		]);
	}

	public dispose(): void {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH,this.refreshTaskRed,this);
        this._activityTimerText = null;
        this._acCDTxt= null;
        this._ruleText = null;
        this._lastTimesTxt= null;
        this._isPlaying = false;
        this._taskBtn = null;

        this._scrollNode = null;
        this._iconList = [];
        this._scrollView = null;
        this._selectMask = null;
        this._selectHeadNode = null;
        this._rewardButton = null;
        this._lastPos = 0;
        this._finalPosRewards = null;
        this._stepIconBtn = null;

		super.dispose();
	}
}
