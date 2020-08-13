/**
 * 风华群芳  活动详情
 * date 2020/7/9
 * @class AcGroupWifeBattleDetailsView
 */
class AcGroupWifeBattleDetailsView extends CommonView {

	private _rankindex = 0;
	private _period : number = 1;
	/**规则说明按钮 */
	private _explainBtn: BaseButton = null;
	/**奖励按钮 */
	private _rewardBtn: BaseButton = null;
	/**点将按钮 */
	private _servantBtn: BaseButton = null;
	/**排行按钮 */
	private _rankBtn: BaseButton = null;

	private _isExplain: boolean = false;
	private _isRewarad: boolean = false;
	private _isServant: boolean = false;
	private _isRank: boolean = false;

	private _explainContainer: BaseDisplayObjectContainer = null;
	private _rewardContainer: BaseDisplayObjectContainer = null;
	private _servantContainer: BaseDisplayObjectContainer = null;
	private _rankContainer: BaseDisplayObjectContainer = null;
	//_rewardContainer 相关
	private _rewardScrollList: ScrollList = null;
	private _rewardMyTitle: BaseTextField = null;
	private _rewardTime: BaseTextField = null;
	private _rewardReceiveBtn: BaseButton = null;
	private _rewardMailDesc: BaseTextField = null;
	private _receiveBM: BaseBitmap = null;
	private _rwdType: number = 0;
	private _rewardType: number = 0;

	//servantContainer  相关
	private _servantScrollList: ScrollList = null;

	//rankContainer  相关
	// private _selfRankContainer: BaseDisplayObjectContainer = null;
	private _serverRankContainer: BaseDisplayObjectContainer = null;
	private _rankScrollList: RankScrollList = null;
	private _allianceRankScrollList:ScrollList = null;
	private _serverRankScrollList: ScrollList = null;

	private _containerType = 0;
	private _rewardTabBar:TabBarGroup = null;
	private topBg:BaseBitmap = null;

	private touchBoo:boolean =true;
	private moreBg:BaseBitmap =null;
	private describeTxt:BaseTextField =null;
	private moveContainer:BaseDisplayObjectContainer =null;
    private _moreArrow:BaseBitmap = null;
	private listconditions:BaseTextField = null;
    private _scrollList: ScrollList;
	private _currMaskBmp:BaseBitmap =null;
	private _bottomBg : BaseBitmap = null;
	private isData:boolean =false;
	private _nameTxt:BaseTextField =null;
	private _touchBg:BaseBitmap =null;
	private _isShowMore:boolean = false;
	private _atkraceInfoVoList:Array<any>=[];
	private _showMore:BaseButton =null;
	private _downottomBg:BaseBitmap =  null;
	private _cdText : BaseTextField = null;
	private rankTxtX:number =0;
	private rankTxtY:number =0;
	private _leftHorn:BaseBitmap = null;
	private _rightHorn:BaseBitmap = null;
	private _bottomLogTxt : BaseTextField = null;
	private allian_data:any =null
	private need:number =0;
	private mn = null;
	private alivemn = null; 
	private _servantTipTxt:BaseTextField = null;
	private rotationTxt2:BaseTextField = null;
	private rotationTxt3:BaseTextField = null;
	private rotationTxt4:BaseTextField = null;
	
	private rankArr:any =null;
	private allirankArr:any =null;

	private rewardacbattplayTxt:BaseTextField = null;
	private rewardacscoreTxt:BaseTextField = null;	
	private rewardlegionTxt:BaseTextField = null;	

	private acbattplayTxt:BaseTextField = null;
	private acscoreTxt:BaseTextField = null;
	private legionTxt:BaseTextField = null;
	private _waiting:number = 0;
	private _myrank:number =0;
	private _value:number =0;
	private _needFresh = false;
	private _prank= false;
	private _timer = 0;
	private _rankTabBar:TabBarGroup = null;
	private _isRankBtnClick:boolean = false;

	protected getUiCode() : string{
        let code = ``;
        switch(Number(this.param.data.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }	
	public constructor() {
		super();
	}

	protected initView(): void 
	{
		let code = this.getUiCode();
		this._rankindex = 0;
		if(this.rankArr==null)
		{
			this.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETRANK, {activeId:this.param.data.aid+"-"+this.param.data.code,index:0});
		}
		else
		{
			this.openList();
		}
	

		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETRANK, this.zidRankHandle, this);
		  
		// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_COUNTRYWAR_MODEL, this.refreashView, this);
       	App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETALNDETAIL), this.allianCallback, this)
	 	
		//帮会列表请求
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETALNDETAIL,{	
			activeId : this.vo.aidAndCode,
			allianceId : Api.playerVoApi.getPlayerAllianceId() 
		});

		this._period = this.vo.getCurperiod();

        let bouttom:BaseBitmap =BaseBitmap.create("battledownbg");
        bouttom.width = GameConfig.stageWidth;
        bouttom.height = GameConfig.stageHeigth- 72;
        this.addChildToContainer(bouttom); 
		

		let downottomBg = BaseBitmap.create(`acgroupwifebattlebottombg-${code}`); 
		downottomBg.y = GameConfig.stageHeigth - downottomBg.height-55;
		this._downottomBg =downottomBg;
        this.addChildToContainer(downottomBg); 

		let leftHorn = BaseBitmap.create(`acgroupwifebattlecorner-${code}`); 
		leftHorn.x = downottomBg.x;
		leftHorn.y = downottomBg.y+55;  
        this.addChildToContainer(leftHorn);
		this._leftHorn = leftHorn;
		
		let rightHorn = BaseBitmap.create(`acgroupwifebattlecorner-${code}`); 
		rightHorn.scaleX =-1;
		rightHorn.x = downottomBg.width -rightHorn.width+22;
		rightHorn.y = leftHorn.y; 
		this._rightHorn = rightHorn;
        this.addChildToContainer(rightHorn);

        let topBg:BaseBitmap =BaseBitmap.create("battle-topbg");
        this.addChildToContainer(topBg);
        topBg.y =-13; 
		this.topBg = topBg;

        let offest:number = 0;
        //详情
        this._explainBtn = ComponentManager.getButton("groupwifebtn1", "", this.explainBtnClick, this);
        this._explainBtn.setPosition(this.viewBg.x + offest+8,-12);
		this.addChildToContainer(this._explainBtn);
		
		//帮会
		this._servantBtn = ComponentManager.getButton("battle-legion", "", this.servantBtnClick, this);
		this._servantBtn.setPosition(this._explainBtn.x + this._explainBtn.width + offest, this._explainBtn.y);
		this.addChildToContainer(this._servantBtn);

		if(Api.playerVoApi.getPlayerAllianceId() == 0||!this.vo.getAttendQuality())
		{	
		   App.DisplayUtil.changeToGray(this._servantBtn);
		}
		
		//奖励	
		this._rewardBtn = ComponentManager.getButton("battle-reward", "", this.rewaradBtnClick, this);
		this._rewardBtn.setPosition(this._servantBtn.x + this._servantBtn.width + offest, this._explainBtn.y);
		this.addChildToContainer(this._rewardBtn);

		//排行	
		this._rankBtn  = ComponentManager.getButton("battle-rank", "", this.rankBtnClick, this);
		this._rankBtn.setPosition(this._rewardBtn.x + this._rewardBtn.width + offest, this._explainBtn.y);
		this.addChildToContainer(this._rankBtn);

		
		
		if(this.param.data.type=="alliance")
		{
			//帮会列表请求
			NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETALNDETAIL,{	
				activeId : this.vo.aidAndCode,
				allianceId : Api.playerVoApi.getPlayerAllianceId() 
			});
		
		}
		else  if(this.param.data.type =="rank")
		{
			this.rankBtnClick(); 
		}
		else
		{
			this.explainBtnClick();
		} 
	}
	/**
	 * 刷新UI
	 */
	private refreashView() {
		if (Api.countryWarVoApi.isShowRewardRedPoint()) {
			App.CommonUtil.addIconToBDOC(this._rewardBtn);
		}
		else {
			App.CommonUtil.removeIconFromBDOC(this._rewardBtn);
		}
	}
 
	private _maxIndex:number=-1;
	/**
	 * 区服排行
	 */
	private zidRankHandle(event: egret.Event) {
		if(this.vo.flag){
			return;
		}
		if (event.data.ret) {
			let zidRank = event.data.data.data.rankArr;//个人排行
			if(zidRank && zidRank.length)
			{
				this.rankArr = zidRank;
				if(zidRank.length < 100)
				{
					this._maxIndex = event.data.data.data.index;
				}
			}
			this._rankindex = event.data.data.data.index; 
			// if (zidRank && zidRank.length){
			// 	this.rankArr = zidRank;
			// }
			// else{
				
			// }
			this.allirankArr = event.data.data.data.allirankArr;//帮会排行
			
			if(event.data.data.data.myrankArr)
			{
				this._value = event.data.data.data.myrankArr.value;
			}
					
			if(event.data.data.data.waiting)
			{
				this._waiting = event.data.data.data.waiting;
			} 
		 
			if(event.data.data.data.myrankArr&&event.data.data.data.myrankArr.myrank)
			{
				this._myrank =event.data.data.data.myrankArr.myrank;//value
			}
			this.openList();
		
		}
	} 

	private isWaiting():void
	{
		if(this._waiting==1)
		{
			if(this.acbattplayTxt)
			{
				this.acbattplayTxt.text = LanguageManager.getlocal("acbattplayrank",[LanguageManager.getlocal("acBattleWaiting")]);
			}
			if(this.acscoreTxt)
			{
				this.acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acBattleWaiting")]);
			} 
		}

		let need = this.vo.getCurperiod();
		if(need==1)
		{
			if(this.acbattplayTxt)
			{
				this.acbattplayTxt.text = LanguageManager.getlocal("acbattplayrank",[LanguageManager.getlocal("acbattlenobegun")]);
			}
			if(this.acscoreTxt)
			{
				this.acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acbattlenobegun")]);
			} 
		}
	}

	//帮会存活人数
	private getalivemn():number
	{
		let num = 0;
		for(var i:number=0;i<this.allirankArr.length;i++)
		{
			if(this.allirankArr[i].id==Api.playerVoApi.getPlayerAllianceId())
			{
				num = this.allirankArr[i].alivemn;
				break;
			}
		} 
		return num;
	}
	private openList ():void

	{
		if(this.vo.flag){
			return;
		}
		if(this._rankScrollList)
		{
            // this._rankTabBar.selectedIndex = 0;
			// this._rankScrollList.visible = true;
			// this._allianceRankScrollList.visible = false;
			// let _data : any = {};
			// if(this._prank){
			// 	_data.index = this._rankindex;
			// }
			// _data.code = this.param.data.code;  
			// _data.waiting = this._waiting;
			// _data.type =1;
			// this._rankScrollList.scrollTop = 0;
			// if (this._isRankBtnClick){
			// 	this._isRankBtnClick = false;
			// }
			// else{
			// 	if(this.rankArr && this.rankArr.length > 0)
			// 	{
			// 		this._rankScrollList.refreshRankData(this.rankArr, _data);
			// 	}
			// }
			if(this.rankArr && this.rankArr.length > 0)
			{
				var data:any ={};
				data.code =this.param.data.code;
				data.type = 1;
				data.waiting = this._waiting;
				data.index = this._rankindex;
				this._rankScrollList.refreshData(this.rankArr, data);
				this._rankScrollList.scrollTop = 0;
			}			
			// if(this._rankTabBar.selectedIndex == 0)
			// {
			// 	return;
			// }
		}
		
		if(this._isRank==true||	this.param.data.type =="rank")
		{
			this.showRankUI(this.rankArr);
		}
	}

	//帮会存活人数
	private getallindex():number
	{	
		if(this.allirankArr&&this.allirankArr.length>0)
		{
			for(var i:number=0;i<this.allirankArr.length;i++)
			{
				if(this.allirankArr[i].id==Api.playerVoApi.getPlayerAllianceId())
				{
					return i+1;
				}
			} 
		}
		return 0 
	}

	// /所有帮会长度
	private getMaxLength():number
	{ 
		return this.allirankArr.length; 	
	} 
	/**
	 * 规则说明事件
	 */
	private explainBtnClick() {
		this._containerType = 1;
		if (this._isExplain) {
			return;
		}
		this._isExplain = true; 
		this._explainBtn.touchEnabled = false;
		this._rewardBtn.touchEnabled = true;
		this._servantBtn.touchEnabled = true;
		this._rankBtn.touchEnabled = true;
		this._isServant = false;
		this._isRank = false;
		this._isRewarad = false;
		if(this._showMore)
		{
			this._showMore.visible =false;
			this._moreArrow.visible =false; 
		}
		this._leftHorn.visible =true;
		this._rightHorn.visible =true;
	
		this.removeTxt();
		this._explainBtn.setBtnBitMap("groupwifebtn1_down");
		this._rewardBtn.setBtnBitMap("battle-reward");
		this._servantBtn.setBtnBitMap("battle-legion");
		this._rankBtn.setBtnBitMap("battle-rank");
		this.showExplainUI(); 
	}
	/**
	 * 显示规则说明的UI
	 */
	private showExplainUI() 
	{
		// this.tick();
		if (this._rankContainer && (this.container.getChildByName("rankContainer"))) {
			this.container.removeChild(this._rankContainer)
		}
		if (this._rewardContainer && (this.container.getChildByName("rewardContainer"))) {
			this.container.removeChild(this._rewardContainer)
		}
		if (this._servantContainer && (this.container.getChildByName("servantContainer"))) {
			this.container.removeChild(this._servantContainer)
		}
		if (this._explainContainer) {
			this.addChildToContainer(this._explainContainer)
			return;
		}
		this._explainContainer = new BaseDisplayObjectContainer();
		this._explainContainer.name = "explainContainer";
		this.addChildToContainer(this._explainContainer);

		let purportBg:BaseBitmap =BaseBitmap.create("battle-purport");
		purportBg.y = this.topBg.y+ this.topBg.height;
		purportBg.x =7; 
        this._explainContainer.addChild(purportBg);

		let timeCdTxt = ComponentManager.getTextField(LanguageManager.getlocal(`AcTurnTableViewTime3`,[this.vo.acTimeAndHour]), 22, 0x3e1f0f);
		timeCdTxt.y =purportBg.y+25;
		timeCdTxt.x = purportBg.x+30;
		this._explainContainer.addChild(timeCdTxt); 

		let acDesTxt = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleDetailsDes"), 22, 0x3e1f0f);
		acDesTxt.y =timeCdTxt.y+timeCdTxt.height+10;
		acDesTxt.x = timeCdTxt.x;
		acDesTxt.width =570;
		acDesTxt.lineSpacing = 4;
		this._explainContainer.addChild(acDesTxt); 


		let bg = BaseBitmap.create("battlerankbg");
		bg.width = 626; 
		bg.x = 7;
		bg.y = purportBg.y+purportBg.height;
		bg.height =GameConfig.stageHeigth - purportBg.height+purportBg.y-360; 
	 	this._explainContainer.addChild(bg);


		let fontTitleBg = BaseLoadBitmap.create("battletitle"); 
		fontTitleBg.setPosition(bg.width / 2 - fontTitleBg.width / 2,bg.y +5)
		this._explainContainer.addChild(fontTitleBg);

		let txtDesc2 = ComponentManager.getTextField(LanguageManager.getlocal("acGroupWifeBattleDetailsTimer"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		txtDesc2.setPosition(fontTitleBg.x, fontTitleBg.y + fontTitleBg.height+6);
		this._explainContainer.addChild(txtDesc2);
		fontTitleBg.width = 309+txtDesc2.width+10;
		fontTitleBg.x = (bg.width-fontTitleBg.width)/2;
		txtDesc2.x =fontTitleBg.x+160;
		// weedOut
		let  arr =  this.cfg.weedOut; 
		let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,bg.height-31-(fontTitleBg.y+35-bg.y-20));
		var data:any ={};
		data.code = this.param.data.code;
		data.arr =arr;
		var need =0;
		if(this.vo.getCurRound()==0)
		{
			need = 0;
		}
		else
		{
			need = this.cfg.weedOut[this.vo.getCurRound() - 1].btmLine;
		} 
		data.need = need;

		let scrollList = ComponentManager.getScrollList(AcGroupwifeBattleTimerScrollItem,arr,tmpRect,data);
		scrollList.y = fontTitleBg.y+66+10-11;//yellowline.y+yellowline.height+10-6;
		scrollList.x = 15;  
		this._explainContainer.addChild(scrollList);  

		let yellowline = BaseBitmap.create("battleyellow");  
		yellowline.x = 7;
		yellowline.y = fontTitleBg.y+35; 
		this._explainContainer.addChild(yellowline);
		
		//轮次
		let  rotationTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRotation"), 22);
		rotationTxt.x =yellowline.x+40;
		rotationTxt.y = yellowline.y+yellowline.height/2- rotationTxt.height/2;
		this._explainContainer.addChild(rotationTxt); 

		//时间
		let  rotationTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acBattletxt2"), 22);
		rotationTxt2.x = 275;//yellowline.x+240;
		rotationTxt2.y =rotationTxt.y;
		this._explainContainer.addChild(rotationTxt2); 


		// 淘汰名次
		let  rotationTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acBattletxt3"), 22);
		rotationTxt3.x = yellowline.x+493;
		rotationTxt3.y = rotationTxt.y;
		this._explainContainer.addChild(rotationTxt3); 
			
		

		//倒计时
        let tipTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;   
		tipTxt.height = 50; 
        this._cdText = tipTxt; 
		this._explainContainer.addChild(tipTxt);  

		this.freshText(); 
		
	}

	public tick():void{
        let view = this;
        let curPeriod = view.vo.getCurperiod();
        view.freshText();
        view._period = curPeriod;
    }

	private freshText():void{
        let view = this;
        let code =  this.getUiCode();
        let period = view.vo.getCurperiod();
        //提示板信息
        let cd = App.DateUtil.getFormatBySecond(view.vo.getCountCD());
        let str = `acGroupWifeBattleCDTxt${view._period}-${code}`;
	 
        let param = [];
        let myRank = view.vo.getMyRank();

        switch(period){
            case 1:
                param.push(cd);
                break;
            case 2:
                param.push(cd);
                let need = view.cfg.weedOut[view.vo.getCurRound() - 1].btmLine;
				this.need  = need;
                if(period == 2 && view.cfg.weedOut.length == view.vo.getCurRound()){
                    //最后一轮
                    str = `acGroupWifeBattleCDTxt4-${code}`;
                }
                else{
                    param.push(need);
                }
                if(view.vo.getAttendQuality()){
                    //没被淘汰
                    if(view.vo.getJoinIn())
					{  
						param.push(LanguageManager.getlocal(`acBattleRoundRank-${code}`, [String(myRank <= need ? 0x21eb39 : 0xff3c3c),myRank.toString()]));
						if(this._waiting==1)
						{
							param.push(LanguageManager.getlocal(`acBattleRoundRank-${code}`, [LanguageManager.getlocal("acBattleWaiting")]));
						}
                    }
                    else{
                        param.push(LanguageManager.getlocal(`acGroupWifeBattleCDTxt5-${code}`));
                    }
                }
                else{
                    param.push(LanguageManager.getlocal(`acBattleRoundNoAttend-${code}`));
                }
                break;
			case 3:
			case 4:
					 str = `acGroupWifeBattleCDTxt3-${code}`;
                    param.push(view.vo.getWinnerAlliance().name);
                    let tyle = 1;
                    if(view.vo.getWinnerAlliance().mid == Number(Api.playerVoApi.getPlayerAllianceId())){
                        tyle = 9;
                    }
                    else if(view.vo.getAttendQuality()){
                        tyle = 7;
                    }
                    else{
                        tyle = 8;
                    }
                    param.push(LanguageManager.getlocal(`acGroupWifeBattleCDTxt${tyle}-${this.getUiCode()}`));
				break;
        }

		if(view.vo.isWaiting()){
            str = `acGroupWifeBattleTip8-1`;
        }

		if(view._cdText)
		{	 
			view._cdText.text = LanguageManager.getlocal(str,param);
			view._cdText.x = GameConfig.stageWidth/2  - view._cdText.width/2;
			view._cdText.y = GameConfig.stageHeigth - view._cdText.height-110;  
		}  

		if(this._servantTipTxt)
		{
			view._servantTipTxt.text = LanguageManager.getlocal(str,param);
			view._servantTipTxt.x = GameConfig.stageWidth/2  - view._servantTipTxt.width/2;
			view._servantTipTxt.y =  GameConfig.stageHeigth - view._servantTipTxt.height-110;
		}
	}
    
	/**
	 * 奖励事件
	 */
	private rewaradBtnClick() {
		this._containerType = 2;
		if (this._isRewarad) {
			return;
		}
		if(this._showMore)
		{
			this._showMore.visible =false;
			this._moreArrow.visible =false; 
		}
		this.removeTxt();
		this._leftHorn.visible =true;
		this._rightHorn.visible =true;
		this._isRewarad = true;
		this._explainBtn.touchEnabled = true;
		this._rewardBtn.touchEnabled = false;
		this._servantBtn.touchEnabled = true;
		this._rankBtn.touchEnabled = true;
		this._isServant = false;
		this._isExplain = false;
		this._isRank = false;
		this._explainBtn.setBtnBitMap("groupwifebtn1");
		this._rewardBtn.setBtnBitMap("battle-reward_down");
		this._servantBtn.setBtnBitMap("battle-legion");
		this._rankBtn.setBtnBitMap("battle-rank");
		this.showRewardUI();
	
	}
	/**
	 * 	奖励的UI
	 */
	private showRewardUI() {
		if (this._rankContainer && (this.container.getChildByName("rankContainer"))) {
			this.container.removeChild(this._rankContainer)
		}
		if (this._explainContainer && (this.container.getChildByName("explainContainer"))) { 
			this.container.removeChild(this._explainContainer)
		}
		if (this._servantContainer && (this.container.getChildByName("servantContainer"))) {
			this.container.removeChild(this._servantContainer)
		}
		if (this._rewardContainer) {
			this.addChildToContainer(this._rewardContainer);
			// this.refreashRewardView(this._rewardType);
			return;
		}
		this._rwdType = 1;
		this._rewardContainer = new BaseDisplayObjectContainer();
		this._rewardContainer.name = "rewardContainer";
		this.addChildToContainer(this._rewardContainer);

		 

		let buttomBg = BaseBitmap.create("battletabbg"); 
		buttomBg.setPosition(0,this.topBg.height+this.topBg.y);
		this._rewardContainer.addChild(buttomBg);

		let tabarArr = ["countryWarRewardTabBarReward3", "acBattlallreward"];
		let rewardTabBar = ComponentManager.getTabBarGroup(ButtonConst.BTN2_TAB, tabarArr, this.rewardTabBarClick, this);
		rewardTabBar.setPosition(20,this.topBg.height+this.topBg.y-13);
		rewardTabBar.setSpace(0);
		this._rewardContainer.addChild(rewardTabBar);
		this._rewardTabBar = rewardTabBar;

		let rewardData = this.vo.getRewardKeyByType(2); 
		let rect = new egret.Rectangle(0, 0, 640, GameConfig.stageHeigth-370);
		var data:any={};
		data.type =1;
		data.code = this.param.data.code;

		this._rewardScrollList = ComponentManager.getScrollList(AcGroupWifeBattleRewardScrollItem, rewardData, rect,data);
		this._rewardScrollList.setPosition(0,rewardTabBar.y+70);
		this._rewardContainer.addChild(this._rewardScrollList);

		let rewardDes = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerewardDes"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		rewardDes.x = GameConfig.stageWidth/2 - rewardDes.width/2;
		rewardDes.y = this._rewardScrollList.y+this._rewardScrollList.height+10;
		this._rewardContainer.addChild(rewardDes);

		//玩家昵称
		let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acbattleplayname",[Api.playerVoApi.getPlayerName()]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameTxt.x = this._downottomBg.x+80;
		nameTxt.y = this._downottomBg.y+15; 
		this._rewardContainer.addChild(nameTxt); 


		//帮会名
		let legionTxt = ComponentManager.getTextField(LanguageManager.getlocal("acbattleallname",[Api.playerVoApi.getPlayerAllianceName()]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
		legionTxt.x = this._downottomBg.x+346;
		legionTxt.y = nameTxt.y;
		this._rewardContainer.addChild(legionTxt); 
		this.rewardlegionTxt = legionTxt;

		//个人排名
		let acbattplayTxt = ComponentManager.getTextField(LanguageManager.getlocal("acbattplayrank",[this._myrank+""]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
		acbattplayTxt.x = nameTxt.x;
		acbattplayTxt.y = nameTxt.y+nameTxt.height+14;
		this._rewardContainer.addChild(acbattplayTxt); 
		this.rewardacbattplayTxt = acbattplayTxt;


		//个人分数
		let acscoreTxt = ComponentManager.getTextField("", 20,TextFieldConst.COLOR_LIGHT_YELLOW);
		acscoreTxt.x = legionTxt.x;
		acscoreTxt.y = acbattplayTxt.y;
		this._rewardContainer.addChild(acscoreTxt); 
		this.rewardacscoreTxt = acscoreTxt;

		if(this._value!=null)
		{
			if(this._value == -9999)
			{
				acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acGroupWifeBattleRankOut-"+this.getUiCode())]);
			}else
			{
				acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[this._value+""]);
			}			
		}
		else
		{
			acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acBattleRoundOut-1")])
		}

		let curPeriod = this.vo.getAttendQuality(); 
		if(curPeriod==false)
		{
			acbattplayTxt.text = LanguageManager.getlocal("acbattplayrank",[LanguageManager.getlocal("crossImacyNoAccess")]);
			acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("crossImacyNoAccess")]);
		} 

		if(this._waiting==1)
		{
			acbattplayTxt.text = LanguageManager.getlocal("acbattplayrank",[LanguageManager.getlocal("acBattleWaiting")]);
			acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acBattleWaiting")]);
		}
		let need2 = this.vo.getCurperiod();
		if(need2==1)
		{
			acbattplayTxt.text = LanguageManager.getlocal("acbattplayrank",[LanguageManager.getlocal("acbattlenobegun")]);
			acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acbattlenobegun")]);
		}

		if(legionTxt.width > acscoreTxt.width)
		{
			legionTxt.x = this._downottomBg.x + this._downottomBg.width - legionTxt.width - 80;
			acscoreTxt.x = legionTxt.x;
		}else
		{
			acscoreTxt.x = this._downottomBg.x + this._downottomBg.width - acscoreTxt.width - 80;
			legionTxt.x = acscoreTxt.x;
		}
	}
 
	/**Tab 事件 */
	private rewardTabBarClick(data: any) {
		var _data:any ={};
		_data.code = this.param.data.code; 

		if (data.index == 0) 
		{
			_data.type = 1;
			let rewardData = this.vo.getRewardKeyByType(2);
			this._rewardScrollList.refreshData(rewardData,_data);
			this._rwdType = 1;
		}
		else if (data.index == 1) 
		{	
			_data.type =2;
			let rewardData = this.vo.getRewardKeyByType(1);
			this._rewardScrollList.refreshData(rewardData,_data);
			this._rwdType = 2;
		} 
		this._rewardType = data.index;

		if (data.index == 0) 
		{
			if(this._value!=null)
			{
				if(this._value == -9999)
				{
					this.rewardacscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acGroupWifeBattleRankOut-"+this.getUiCode())]);
				}else
				{
					this.rewardacscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[this._value+""]);
				}			
			}
			else
			{
				this.rewardacscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acBattleRoundOut-1")])
			}

			this.rewardacbattplayTxt.text = LanguageManager.getlocal("acbattplayrank",[this._myrank+""]);
			let curPeriod = this.vo.getAttendQuality(); 
			if(curPeriod==false)
			{
				this.rewardacbattplayTxt.text = LanguageManager.getlocal("acbattplayrank",[LanguageManager.getlocal("crossImacyNoAccess")]);
				this.rewardacscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("crossImacyNoAccess")]);
			} 

			if(this._waiting==1)
			{
				this.rewardacbattplayTxt.text = LanguageManager.getlocal("acbattplayrank",[LanguageManager.getlocal("acBattleWaiting")]);
				this.rewardacscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acBattleWaiting")]);
			}
			let need2 = this.vo.getCurperiod();
			if(need2==1)
			{
				this.rewardacbattplayTxt.text = LanguageManager.getlocal("acbattplayrank",[LanguageManager.getlocal("acbattlenobegun")]);
				this.rewardacscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acbattlenobegun")]);
			}
		}else
		{
			let curPeriod = this.vo.getAttendQuality();
			if(curPeriod==false)
			{
				this.rewardacbattplayTxt.text = LanguageManager.getlocal("acbattplayrank2",[LanguageManager.getlocal("crossImacyNoAccess")]);
				this.rewardacscoreTxt.text = LanguageManager.getlocal("acbattplayscore2",[LanguageManager.getlocal("crossImacyNoAccess")]);
			}
			else
			{
				this.rewardacbattplayTxt.text  = LanguageManager.getlocal("acbattplayrank2",[this.getallindex()+""]);
				this.rewardacscoreTxt.text = LanguageManager.getlocal("acbattplayscore2",[this.getalivemn()+""]);
			}
		}
		if(this.rewardlegionTxt.width > this.rewardacscoreTxt.width)
		{
			this.rewardlegionTxt.x = this._downottomBg.x + this._downottomBg.width - this.rewardlegionTxt.width - 80;
			this.rewardacscoreTxt.x = this.rewardlegionTxt.x;
		}else
		{
			this.rewardacscoreTxt.x = this._downottomBg.x + this._downottomBg.width - this.rewardacscoreTxt.width - 80;
			this.rewardlegionTxt.x = this.rewardacscoreTxt.x;
		}
		this.isWaiting(); 
	}

	private rankTabBarTabBarClick(data:any):void
	{
		var _data:any ={};
		_data.code = this.param.data.code;  
		_data.waiting = this._waiting;
		if (data.index == 0) 
		{ 
			this._prank = true;
			_data.type =1;
			if(this._rankScrollList)
			{
				this._rankScrollList.visible = true;
				this._allianceRankScrollList.visible = false;
				_data.index = this._rankindex;
				if (this.rankArr && this.rankArr.length > 0){
					this._rankScrollList.refreshData(this.rankArr,_data); 
				}
			}
		
			this.rotationTxt2.text =LanguageManager.getlocal("acBattlerank2");
			this.rotationTxt3.text =LanguageManager.getlocal("acBattlerank3");
			this.rotationTxt4.text =LanguageManager.getlocal("acBattlerank4");
			this.rotationTxt3.x = 379;	
			this.rotationTxt4.x= 542;

			let curPeriod = this.vo.getAttendQuality();
			if(curPeriod==false)
			{
				this.acbattplayTxt.text = LanguageManager.getlocal("acbattplayrank",[LanguageManager.getlocal("crossImacyNoAccess")]);
				this.acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("crossImacyNoAccess")]);
			}
			else
			{
				this.acbattplayTxt.text  = LanguageManager.getlocal("acbattplayrank",[this._myrank+""]);
				
				if(this._value==null)
				{
					this.acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acBattleRoundOut-1")]);
				}
				else
				{
					if(this._value == -9999)
					{
						if(this.vo.getCurperiod() < 2)
						{
							this.acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acGroupWifeBattleRankNoAttend-"+this.getUiCode())]);
						}else
						{
							this.acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acGroupWifeBattleRankOut-"+this.getUiCode())]);
						}
					}else
					{
						this.acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[this._value+""]);
					}
				}
			} 
		}
		else if (data.index == 1) 
		{	
			this._prank = false;
			this.rotationTxt2.text =LanguageManager.getlocal("acBattlerank3");
			this.rotationTxt3.text =LanguageManager.getlocal("countryWarRewardServerTitle");
			this.rotationTxt3.x = 379;
			this.rotationTxt4.text =LanguageManager.getlocal("acBattlerank5");
			this.rotationTxt4.x= 512; 
			_data.type =2; 
			if(this._allianceRankScrollList)
			{
				this._rankScrollList.visible = false;
				this._allianceRankScrollList.visible = true;
				this._allianceRankScrollList.refreshData(this.allirankArr,_data);   
			} 
			let curPeriod = this.vo.getAttendQuality();
			if(curPeriod==false)
			{
				this.acbattplayTxt.text = LanguageManager.getlocal("acbattplayrank2",[LanguageManager.getlocal("crossImacyNoAccess")]);
				this.acscoreTxt.text = LanguageManager.getlocal("acbattplayscore2",[LanguageManager.getlocal("crossImacyNoAccess")]);
			}
			else
			{
				this.acbattplayTxt.text  = LanguageManager.getlocal("acbattplayrank2",[this.getallindex()+""]);
				this.acscoreTxt.text = LanguageManager.getlocal("acbattplayscore2",[this.getalivemn()+""]);
			} 
		}  
		this.isWaiting();

		if(this.legionTxt.width > this.acscoreTxt.width)
		{
			this.legionTxt.x = this._downottomBg.x + this._downottomBg.width - this.legionTxt.width - 80;
			this.acscoreTxt.x = this.legionTxt.x;
		}else
		{
			this.acscoreTxt.x = this._downottomBg.x + this._downottomBg.width - this.acscoreTxt.width - 80;
			this.legionTxt.x = this.acscoreTxt.x;			
		}		
	}

	/**
	 * 点将事件
	 */
	private servantBtnClick() 
	{		 	
		this._containerType = 3;
		if(Api.playerVoApi.getPlayerAllianceId() == 0||!this.vo.getAttendQuality()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acBattleAllDes"));
			return 
		}
		if (this._isServant) {
			return;
		}   
		if(this._showMore)
		{
			this._showMore.visible =true;
			this._moreArrow.visible =true; 
		}
		this.removeTxt();
		this._isServant = true; 
		this._explainBtn.touchEnabled = true;
		this._rewardBtn.touchEnabled = true;
		this._servantBtn.touchEnabled = false;
		this._rankBtn.touchEnabled = true;
		this._isExplain = false;
		this._isRank = false;
		this._isRewarad = false;
		this._leftHorn.visible =true;
		this._rightHorn.visible =true;
		
		this._servantBtn.setBtnBitMap("battle-legion_down");
		this._explainBtn.setBtnBitMap("groupwifebtn1"); 
		this._rewardBtn.setBtnBitMap("battle-reward"); 
		this._rankBtn.setBtnBitMap("battle-rank"); 
		this.showServantUI();
		//帮会列表请求
		
		this.freshText();
	}
	/**
	 * 帮会UI
	 */
	private showServantUI() 
	{ 	 
		if (this._rankContainer && (this.container.getChildByName("rankContainer"))) {
			this.container.removeChild(this._rankContainer);
		}
		if (this._explainContainer && (this.container.getChildByName("explainContainer"))) {
			this.container.removeChild(this._explainContainer);
		}
		if (this._rewardContainer && (this.container.getChildByName("rewardContainer"))) {
			this.container.removeChild(this._rewardContainer);
		}
		if (this._servantContainer) {
			this.addChildToContainer(this._servantContainer);
			return;
		}
		this._servantContainer = new BaseDisplayObjectContainer();
		this._servantContainer.name = "servantContainer";
		this.addChildToContainer(this._servantContainer);

		let purportBg:BaseBitmap =BaseBitmap.create("battle-purports");
		purportBg.y =GameConfig.stageHeigth - purportBg.height-182; // this.topBg.y+ this.topBg.height;
		purportBg.x =7; 
        this._servantContainer.addChild(purportBg); 

		let line = BaseBitmap.create("battleline");
		line.x = purportBg.x+20; 
		line.y = purportBg.y+58; 
	 	this._servantContainer.addChild(line);

		let allid = Api.playerVoApi.getPlayerAllianceId();
		let str= '';
		if(allid && allid > 0){
			str = LanguageManager.getlocal("acsurvival",[this.alivemn+'',this.mn+''])
			if(this.vo.getCurperiod() == 1)
			{
				str = LanguageManager.getlocal("acsurvival",[this.mn+'',this.mn+''])
			}
		}
		else{
			str = LanguageManager.getlocal("acsurvival2");
		}
		// 存活人数
		let gangsRankTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		gangsRankTxt.x = line.x+15;//+343;
		gangsRankTxt.y = line.y+15;
		this._servantContainer.addChild(gangsRankTxt);
		if(!this.alivemn&&!this.mn)
		{
			gangsRankTxt.text =  LanguageManager.getlocal("acNewYearisOpen");
		}
	
		if(allid && allid > 0){
			str = LanguageManager.getlocal("acgangsRank",[this.getallindex()+"",this.getMaxLength()+""])
		}
		else{
			str = LanguageManager.getlocal("acgangsRank2");
		}
		
		// 帮会排名
		let acsurvivaTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		acsurvivaTxt.x = line.x+15;
		acsurvivaTxt.y = line.y -gangsRankTxt.height-10;
		this._servantContainer.addChild(acsurvivaTxt);  
		if(this.vo.getCurperiod()==1)
		{
			acsurvivaTxt.text = LanguageManager.getlocal("noacgangsRank");
		}

 
		this.rankTxtX = acsurvivaTxt.x;
		this.rankTxtY = acsurvivaTxt.y+acsurvivaTxt.height+10;
		
		//倒计时 

		let tipTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.lineSpacing = 5; 
		tipTxt.textAlign = egret.HorizontalAlign.CENTER;   
		tipTxt.height = 50;
        this._servantTipTxt = tipTxt; 
		this._servantContainer.addChild(tipTxt);   
		
		this.freshText(); 
		let logbtn = ComponentManager.getButton(`battlegroundlog-${this.getUiCode()}`,'', ()=>{
            //打开详情界面
			let curPeriod = this.vo.getCurperiod();
			if(curPeriod==1)
			{	
				App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleNotStart-${code}`));
				return;
			}
            ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLEVISITVIEW, {
                aid : this.param.data.aid,
                code : this.param.data.code
            })
        }, this);
		
		logbtn.setPosition(purportBg.width -logbtn.width-42+20,purportBg.y+purportBg.height/2-purportBg.height/2+16);
		this._servantContainer.addChild(logbtn);

        let protectbtn = ComponentManager.getButton(`acgroupwifebattle_protect-${this.getUiCode()}`,'', ()=>
		{
           	if(this.vo.isStart==false || this.vo.checkIsInEndShowTime())
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            else
            {
				if(view.vo.getCurperiod() == 1)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleNotStart-${code}`));
					return;
				}
                if(!view.vo.getAttendQuality())
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleNoAttend-${code}`));
                    return;
                }               
                if(!view.vo.getJoinIn())
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip4-${code}`));
                    return;
                }		
                if(view.vo.isOut())
                {        
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip16-${code}`));
                    return;                                    
                }				
                if(view.vo.getCurperiod() == 1)
                {
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleNotStart-${code}`));
                    return;              
                }				
				//金兰之令界面
                ViewController.getInstance().openView(ViewConst.POPUP.ACGROUPWIFEBATTLEPROTECTVIEW,
				{
                    aid : this.vo.aid,
                    code : this.vo.code
                }); 
             }
        }, this);
		protectbtn.setScale(1);
        protectbtn.setPosition(logbtn.x-protectbtn.width,logbtn.y);
        this._servantContainer.addChild(protectbtn);		

		let view = this;
		let bg = BaseBitmap.create("battlerankbg");
		bg.width = 626; 
		bg.x = 7;
		bg.y =this.topBg.y+this.topBg.height;
		bg.height = GameConfig.stageHeigth -this.topBg.y -purportBg.height-(Api.switchVoApi.checkOpenAtkracegChangegpoint() ? 315 : 285);// purportBg.height+purportBg.y;//height; 
		this._servantContainer.addChild(bg);
		
		let code = this.getUiCode();

		let fontTitleBg = BaseLoadBitmap.create("battletitle"); 
		fontTitleBg.setPosition(bg.x+bg.width / 2 - fontTitleBg.width / 2,95)
		this._servantContainer.addChild(fontTitleBg);

		//帮会名字 
		let  aName = Api.playerVoApi.getPlayerAllianceName();
		let txtDesc2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		txtDesc2.setPosition(fontTitleBg.x, fontTitleBg.y + fontTitleBg.height+6);
		this._servantContainer.addChild(txtDesc2);
		txtDesc2.text = aName +"";//_allianceVo.name;
		fontTitleBg.width = 309+txtDesc2.width+10;
		fontTitleBg.x = (bg.width-fontTitleBg.width)/2+bg.x;
		txtDesc2.x =fontTitleBg.x+fontTitleBg.width/2-txtDesc2.width/2;

		let yellowline = BaseBitmap.create("battleyellow");  
		yellowline.x =7;
		yellowline.y = fontTitleBg.y+35; 
		this._servantContainer.addChild(yellowline); 

		//排名
		let  acBattlerank1Txt = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank1"), 22);
		acBattlerank1Txt.x =yellowline.x+28;
		acBattlerank1Txt.y = yellowline.y+yellowline.height/2- acBattlerank1Txt.height/2;
		this._servantContainer.addChild(acBattlerank1Txt);  

		//成员名称
		let  acBattlerankTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank2"), 22);
		acBattlerankTxt2.x =yellowline.x+181;
		acBattlerankTxt2.y =acBattlerank1Txt.y;
		this._servantContainer.addChild(acBattlerankTxt2);  

		// 职位
		let alliance_poTxt = ComponentManager.getTextField(LanguageManager.getlocal("alliance_po"), 22);
		alliance_poTxt.x = yellowline.x+392;
		alliance_poTxt.y = acBattlerank1Txt.y;
		this._servantContainer.addChild(alliance_poTxt);  

		// 分数
		let  acBattlerank = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank4"), 22);
		acBattlerank.x = yellowline.x+535;
		acBattlerank.y = acBattlerank1Txt.y;
		this._servantContainer.addChild(acBattlerank);  


		//文本
        let tip2Txt = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip2Txt.lineSpacing = 5;
        this._servantContainer.addChild(tip2Txt);
		tip2Txt.x= 10;
		tip2Txt.y= this._downottomBg.y+30; 
        this._bottomLogTxt = tip2Txt; 
		 
		this.allian_data.sort(function(a: any,b: any):number
        {
            if(a.myrank > b.myrank) return 1;
            else if(a.myrank == b.myrank) return 0;
            return -1;
        });

		let tmpRect =  new egret.Rectangle(0,0,626,bg.height-80);
		let scrollList = ComponentManager.getScrollList(AcGroupWifeBattleRank2ScrollItem,this.allian_data,tmpRect,this.param.data.code);
		scrollList.y = yellowline.y+yellowline.height;
		scrollList.x = 15;  
		this._servantContainer.addChild(scrollList);

		if(Api.switchVoApi.checkOpenAtkracegChangegpoint()){
			let scoreTip = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleTip12-${this.getUiCode()}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scoreTip, bg, [0,bg.height + 8]);
			this._servantContainer.addChild(scoreTip);  
		}

		this.isWaiting();
	}
	private allianCallback(data : any) :void
	{	
		 if(data.data.ret && data.data.data){
			this.allian_data = data.data.data.data.allianceList;
			this.mn = data.data.data.data.mn;
			this.alivemn = data.data.data.data.alivemn;//存活
			if(this.param.data.type=="alliance")
			{
				if(this.vo.flag){
					return;
				}
				this.servantBtnClick();
			}
		
        }
	}
	/**
	 * 排行事件
	 */
	private rankBtnClick() {
		this._containerType = 4;
		if (this._isRank) {
			return;
		}
		this._isRank = true;
		this._explainBtn.touchEnabled = true;
		this._rewardBtn.touchEnabled = true;
		this._servantBtn.touchEnabled = true;
		this._rankBtn.touchEnabled = false;
		this._isServant = false;
		this._isExplain = false;
		this._isRewarad = false;
		this._leftHorn.visible =true;
		this._rightHorn.visible =true;
		if(this._showMore)
		{
			this._showMore.visible =false;
			this._moreArrow.visible =false; 
		}
		this._explainBtn.setBtnBitMap("groupwifebtn1");
		this._rewardBtn.setBtnBitMap("battle-reward");
		this._servantBtn.setBtnBitMap("battle-legion");
		this._rankBtn.setBtnBitMap("battle-rank_down"); 
		 
		 if(this.rankArr==null)
		 {
			 if (this._rankScrollList){
				 this._rankScrollList.setRequestIndex(1);
			 }
			this.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETRANK, {activeId:this.param.data.aid+"-"+this.param.data.code,index:0});
		 }
		 else
		 {
			this._isRankBtnClick = true;
			this.openList();
		 }
		
	 
	}
	/**
	 * 排行UI
	 */
	private showRankUI(zidRank: any) 
	{
		if (this._servantContainer && (this.container.getChildByName("servantContainer"))) {
			this.container.removeChild(this._servantContainer);
		}
		if (this._explainContainer && (this.container.getChildByName("explainContainer"))) {
			this.container.removeChild(this._explainContainer);
		}
		if (this._rewardContainer && (this.container.getChildByName("rewardContainer"))) {
			this.container.removeChild(this._rewardContainer);
		}
		if (this._rankContainer) {
			this.addChildToContainer(this._rankContainer)
			return;
		} 
		this._rankContainer = new BaseDisplayObjectContainer();
		this._rankContainer.name = "rankContainer";
		this.addChildToContainer(this._rankContainer);

		let buttomBg = BaseBitmap.create("battletabbg"); 
		buttomBg.setPosition(0,this.topBg.height+this.topBg.y);
		this._rankContainer.addChild(buttomBg);

		let tabarArr = ["acPunishRankRewardTab1", "acPunishRankRewardTab2"];
		let rankTabBar = ComponentManager.getTabBarGroup(ButtonConst.BTN2_TAB, tabarArr, this.rankTabBarTabBarClick, this);
		rankTabBar.setPosition(20,this.topBg.height+this.topBg.y-13);
		rankTabBar.setSpace(0);
		this._rankContainer.addChild(rankTabBar);
		this._rankTabBar = rankTabBar;


		let bg = BaseBitmap.create("battlerankbg");
		bg.width = 626; 
		bg.x = 7;
		bg.y = buttomBg.y+buttomBg.height+5;
 	 	bg.height = GameConfig.stageHeigth -(Api.switchVoApi.checkOpenAtkracegChangegpoint() ? 360 : 330); //360
	 	this._rankContainer.addChild(bg);


		let yellowline = BaseBitmap.create("battlerank2");  
		yellowline.x =7;
		yellowline.y = bg.y; 
		this._rankContainer.addChild(yellowline); 

		//排名
		let  rotationTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank1"), 22);
		rotationTxt.x =yellowline.x+28;
		rotationTxt.y = yellowline.y+yellowline.height/2- rotationTxt.height/2;
		this._rankContainer.addChild(rotationTxt);  

		//成员名称
		let  rotationTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank2"), 22);
		rotationTxt2.x =yellowline.x+181;
		rotationTxt2.y =rotationTxt.y;
		this.rotationTxt2 =rotationTxt2;
		this._rankContainer.addChild(rotationTxt2);  

		// 帮会名
		let  rotationTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank3"), 22);
		rotationTxt3.x = yellowline.x+372;
		rotationTxt3.y = rotationTxt.y;
		this.rotationTxt3 = rotationTxt3;
		this._rankContainer.addChild(rotationTxt3);  

		// 分数
		let  rotationTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank4"), 22);
		rotationTxt4.x = yellowline.x+535;
		rotationTxt4.y = rotationTxt.y;
		this.rotationTxt4 = rotationTxt4;
		this._rankContainer.addChild(rotationTxt4);  

		let  arr = zidRank;
		let tmpRect =  new egret.Rectangle(0,0,616,bg.height-50);//100
		var data:any ={};
		data.code =this.param.data.code;
		data.type = 1;
		data.waiting = this._waiting;
		data.index = 0;//this._rankindex;

		this._prank = true;

		let rankRequest = {requestType: NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETRANK, requestParam:{activeId:this.param.data.aid+"-"+this.param.data.code,index:0}};
		let scrollList = ComponentManager.getRankScrollList(AcGroupWifeBattleRankScrollItem,arr,tmpRect,data,rankRequest);
		scrollList.y = yellowline.y+yellowline.height-3;
		scrollList.x = 15; 
		
		this._rankScrollList = scrollList;
		this._rankContainer.addChild(scrollList); 
		scrollList.addRequestFlag(); 
		this._rankScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

		scrollList.bindMoveCompleteCallback(()=>{
			let view = this;
			let index = this._rankindex;
			if(!scrollList.checkShowArrow()){
				index += 100;
				if(this._maxIndex > -1)
				{
					if(this._maxIndex == this._rankindex)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip13-1`));
						return;
					}
				}
			}
			else if(scrollList.scrollTop == 0){
				index = Math.max(0, index - 100)
			}
			if(this._rankindex != index){
				this.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETRANK, {activeId:this.param.data.aid+"-"+this.param.data.code, index : index});
			}
		}, this);		

		//帮会排行
		let allianScrollList = ComponentManager.getScrollList(AcGroupWifeBattleRankScrollItem,arr,tmpRect,data);
		allianScrollList.y = yellowline.y+yellowline.height-3;
		allianScrollList.x = 15; 
		this._rankContainer.addChild(allianScrollList);
		this._allianceRankScrollList = allianScrollList;
		allianScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		allianScrollList.visible = false;

		//提示
		if(Api.switchVoApi.checkOpenAtkracegChangegpoint()){
			let scoreTip = ComponentManager.getTextField(LanguageManager.getlocal(`acGroupWifeBattleTip12-${this.getUiCode()}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scoreTip, bg, [0,bg.height + 5]);
			this._rankContainer.addChild(scoreTip); 
		}


		//玩家昵称
		let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acbattleplayname",[Api.playerVoApi.getPlayerName()]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameTxt.x = this._downottomBg.x+80;
		nameTxt.y = this._downottomBg.y+15; 
		this._rankContainer.addChild(nameTxt); 


		//帮会名
		let legionTxt = ComponentManager.getTextField(LanguageManager.getlocal("acbattleallname",[Api.playerVoApi.getPlayerAllianceName()]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
		legionTxt.x = this._downottomBg.x+346;
		legionTxt.y = nameTxt.y;
		this.legionTxt = legionTxt;
		this._rankContainer.addChild(legionTxt); 
		//个人排名
		let acbattplayTxt = ComponentManager.getTextField(LanguageManager.getlocal("acbattplayrank",[this._myrank+""]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
		acbattplayTxt.x = nameTxt.x;
		acbattplayTxt.y = nameTxt.y+nameTxt.height+14;
		this.acbattplayTxt =acbattplayTxt;
		this._rankContainer.addChild(acbattplayTxt); 
		

		//个人分数
		let acscoreTxt = ComponentManager.getTextField("", 20,TextFieldConst.COLOR_LIGHT_YELLOW);
		acscoreTxt.x = legionTxt.x;
		acscoreTxt.y = acbattplayTxt.y;
		this.acscoreTxt =acscoreTxt;
		this._rankContainer.addChild(acscoreTxt);
		if(this._value!=null)
		{
			if(this._value == -9999)
			{
				if(this.vo.getCurperiod() < 2)
				{
					acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acGroupWifeBattleRankNoAttend-"+this.getUiCode())]);
				}else
				{
					acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acGroupWifeBattleRankOut-"+this.getUiCode())]);
				}
			}else
			{
				acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[this._value+""]);
			}			
		}
		else
		{
			acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("acBattleRoundOut-1")])
		}
 
		let curPeriod = this.vo.getAttendQuality();
		if(curPeriod==false)
		{
			acbattplayTxt.text = LanguageManager.getlocal("acbattplayrank",[LanguageManager.getlocal("crossImacyNoAccess")]);
			acscoreTxt.text = LanguageManager.getlocal("acbattplayscore",[LanguageManager.getlocal("crossImacyNoAccess")]);
		}
		this.isWaiting(); 

		if(legionTxt.width > acscoreTxt.width)
		{
			legionTxt.x = this._downottomBg.x + this._downottomBg.width - legionTxt.width - 80;
			acscoreTxt.x = legionTxt.x;
		}else
		{
			acscoreTxt.x = this._downottomBg.x + this._downottomBg.width - acscoreTxt.width - 80;
			legionTxt.x = acscoreTxt.x;			
		}
	}
	 
 
	// protected getRequestData(): { requestType: string, requestData: any } {
	// 	return { requestType: NetRequestConst.REQUEST_COUNTRYWAY_GETDPSRANK, requestData: {} };
	// }
	protected receiveData(data: { ret: boolean, data: any }): void {

	}



	 
	public useCallback(event : any): void 
	{
		if(event.data.ret)
		{
			this._atkraceInfoVoList = this.vo.getBattleLog(event.data.data.data.atklist);	 
			this.refreshText(); 
			if(this._isShowMore)
			{
                if(this._scrollList){
                    this._scrollList.refreshData(this._atkraceInfoVoList,this.param.data.code);
                }
            }

			if(this.listconditions)
			{
				this.listconditions.visible =false;
			} 

			if(this._atkraceInfoVoList.length>0)
			{
				this.isData =true;
			}
			else
			{
				this.isData =false;
			}
		}
		else
		{
			this.isData =false;
		}  
    }
 

	private refreshText():void
	{	 
		if(this._atkraceInfoVoList.length>0&&this._atkraceInfoVoList[0])
		{
            let data:any =this._atkraceInfoVoList[0];
            let news = data;
            //击败｜｜全歼
            let textStr = LanguageManager.getlocal(`acBattileGroundVisitLog-${this.getUiCode()}`, [news.alliName,news.playerName,news.uid]);
			let str = "";
			if(news.info.weedout){
                textStr += `<font color=0xff3c3c>【${LanguageManager.getlocal(`battlestaut3`)}】</font>`;
            }
			if(this.isData&&data.info.type==1){
				str = LanguageManager.getlocal("atkracebeat");
			}
			else
			{
				str =LanguageManager.getlocal("atkraceAnnihilation");
			} 
			
			let currName = Config.ServantCfg.getServantItemById(data.info.sid).name;
		 
			if(data.info.streak&&data.info.streak>=3)
			{	
				var desStr:string ="acBattleStraight"
				if(data.info.atype&&data.info.atype==2)
				{
					 desStr ="acBattleStraight_1";
				} 
				else if(data.info.atype&&data.info.atype==4)
				{
					 desStr ="acBattleStraight_4";//追杀  全歼了
				}
				textStr += LanguageManager.getlocal(desStr,[LanguageManager.getlocal(data.info.support == 1 ? `actracksupport` : `actrackservant`), currName,str,data.info.uname2,data.info.fightnum,data.info.streak]);
			}
			else
			{	
				let desStr2:string ="acBattleDescription"
				if(data.info.atype&&data.info.atype==2)
				{
					 desStr2 ="acBattleDescription_1";
				} 
				else if(data.info.atype&&data.info.atype==4)
				{
					 desStr2 ="acBattleStraight_4_2";//追杀 
				}
				textStr += LanguageManager.getlocal(desStr2,[LanguageManager.getlocal(data.info.support == 1 ? `actracksupport` : `actrackservant`),currName,str,data.info.uname2,data.info.fightnum]);
            }
			this._bottomLogTxt.text = textStr;
		}
	}

	private removeTxt():void
	{
	
		// if(this.rotationTxt2&&this.rotationTxt2.parent)
		// {
		// 	this.rotationTxt2.parent.removeChild(this.rotationTxt2);
		// 	this.rotationTxt2 =null;
		// }
		
		// if(this.rotationTxt3&&this.rotationTxt3.parent)
		// {
		// 	this.rotationTxt3.parent.removeChild(this.rotationTxt3);
		// 	this.rotationTxt3 =null;
		// }

		// if(this.rotationTxt4&&this.rotationTxt4.parent)
		// {
		// 	this.rotationTxt4.parent.removeChild(this.rotationTxt4);
		// 	this.rotationTxt4 =null;
		// }
		
	 
	}
 	protected getRuleInfo() : string{	
		 let code = this.getUiCode();
		// if(Api.switchVoApi.checkServantRefuseBattle() && this.getUiCode() == '1' &&Api.switchVoApi.checkOpenAtkracegChangegpoint()){
		// 	return "acBattleRoundRule-1_newRule_withOpenRefusal";
		// }
        // return Api.switchVoApi.checkOpenAtkracegChangegpoint() ? (`acBattleRoundRule-${this.getUiCode()}_newRule`) : (`acBattleRoundRule-${this.getUiCode()}`);
		return `acGroupWifeBattleRule-${code}`;
	}
    
    protected getRuleInfoParam() : string[]{
        return this.vo.getRuleInfoParam();	
    }
   protected getResourceList():string[]{
		let ret = super.getResourceList();
        ret = ret.concat([
           'acbattledetailsview',"battlegroundlog-1",`activity_rank_ask`,`progress5`, `progress3_bg`,
        ]);
		return ret;
   }
	
	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
	 private get acTivityId() : string{
        return `${this.param.data.aid}-${this.param.data.code}`;
    } 
    protected getTitleStr():string{
        return "acGroupWifeBattleDetailsTitle";
    }
	protected getShowHeight() 
	{
		return 840;
	}
	public dispose(): void {
	  
	   	App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETALNDETAIL), this.allianCallback, this)
	 	App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_COUNTRYWAR_MODEL, this.refreashView, this);
	  
		this._explainBtn = null;
		this._rewardBtn = null;
		this._servantBtn = null;
		this._rankBtn = null;
		this._rewardType = 0;
		this._isExplain = false;
		this._isRewarad = false;
		this._isServant = false;
		this._isRank = false;
		this._explainContainer = null;
		this._rewardContainer = null;
		this._servantContainer = null;
		this._rankContainer = null;
		this._rewardScrollList = null;
		this._rewardMyTitle = null;
		this._rewardTime = null;
		this._rewardReceiveBtn = null;
		this._rewardMailDesc = null;
		// this._selfRankContainer = null;
		this._serverRankContainer = null;
		this._rankScrollList = null;
		this._allianceRankScrollList = null;
		this._serverRankScrollList = null;
		this._rwdType = 0;
		this._receiveBM = null;
		this._containerType = 0;
		this._rewardTabBar = null; 
		this._showMore  = null;
		this._moreArrow = null;  
		this._servantTipTxt = null;
		this._leftHorn.visible = null;
		this._rightHorn.visible = null;
		this._scrollList = null;
		this._atkraceInfoVoList =null;
		this.allian_data = null;
		this.need = 0;
		this.allirankArr =null;
		this.rotationTxt2 =null;
		this.rotationTxt3 =null;
		this.rotationTxt4 =null;
		this.rankArr =null;
		this.acbattplayTxt =null;
		this.acscoreTxt =null;  
		this.legionTxt = null;
		this._myrank =null;
		this._value =null;
		this._waiting = 0;
		this._rankindex = 0;
		this._needFresh = false;
		this._prank = false;
		this._timer = 0;
		this._rankTabBar = null;
		this._isRankBtnClick = false;
		this.rewardacscoreTxt = null;
		this.rewardacbattplayTxt = null;
		this.rewardlegionTxt = null;
		this._maxIndex = -1;
		super.dispose();
	}
}