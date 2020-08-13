/**
 * author shaoliang
 * date 2020/6/12
 * @class AcNewCrossServerAtkRaceView
 * 新跨服擂台入口
 */

class AcNewCrossServerAtkRaceView  extends AcCommonView
{	
	private _enterBtn:BaseButton = null;
	//活动倒计时
	private _countDownTime:number = 0;
	private _countDownText:BaseTextField = null;


	private _openNode:BaseDisplayObjectContainer = null;
	
	private _cdTimeDesc:BaseTextField = null;
	private _cdType:number = 1;//倒计时类型 1:开始倒计时  2:战斗倒计时   3:领奖倒计时


	//派遣门客倒计时
	private _dispatchServantNode:BaseDisplayObjectContainer = null;
	private _dispatchTime:number = 0;
	private _dispatchTimeText:BaseTextField = null;
	private _dispatchTimeBg:BaseBitmap = null;

	private _isCanJoin:number = null; // 0 没资格  1 有资格
	private _cornertip:BaseBitmap = null;
	private _openDesc:BaseTextField = null;
	private _dispathBtn:BaseButton = null;

    public constructor() 
	{
		super();
	}

    protected getBgName():string
	{
		return "newcrossatkrace_bg";
	}

	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

    // 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return "acchaoting_closebtn";
	}

	private get crossVo():AcNewCrossServerAtkRaceVo
	{	
		let crossVo = <AcNewCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace",this.code);
		return crossVo;
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		"newcrossatkrace_bg","newcrossatkrace_title","newcrossatkrace_cornertip",
        "dispatch_servant_btn",`dispatch_servant_btn_down`,"acredlotuswarrior_bottom",
        "btn_enter_race","crossserverintidaizi-7","newcrossatkrace_zhenrongbtn","newcrossatkrace_zhenrongbtn_down",
		]);
	}

    // 初始化背景
	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,640,1136);
			this.viewBg = BaseLoadBitmap.create(bgName,rect);
			this.viewBg.setPosition(0,(GameConfig.stageHeigth-this.viewBg.height)*0.1);
			this.addChild(this.viewBg); 
		}
	}

		
	private refreshInfo():void
	{	
		this.request(NetRequestConst.REQUEST_NEWATKRACECROSS_GETACTIVITYATK,{});
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{

		if (this.crossVo.info && this.crossVo.info.iscanjoin == 1)
		{	
			this._cornertip.visible = true;
			if (this._dispatchServantNode)
			{
				this._dispatchServantNode.visible = true;
			}
			if (!this.crossVo.getSids() || this.crossVo.getSids().length == 0)
			{
				if (this.crossVo.st > GameData.serverTime - 300)
				{	
					this._openDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkraceCrossOpenDesc2_2", this.crossVo.isCrossLeague()));
				}
				else
				{
					this._openDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkraceCrossOpenDesc2_3", this.crossVo.isCrossLeague()));
				}
			}	
			else
			{
				this._openDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkraceCrossOpenDesc2", this.crossVo.isCrossLeague()));
			}
			
		}
		else 
		{
			this._openDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkraceCrossOpenDesc3", this.crossVo.isCrossLeague()));
		}

		this._openNode.visible = true;
	}

    public initView():void
    {	
		Api.atkracecrossVoApi.newcrossCode = "1";//this.code;
		let titlePic:BaseBitmap = BaseBitmap.create(App.CommonUtil.getCrossLeagueRes(`newcrossatkrace_title`,this.crossVo.isCrossLeague()));
		titlePic.setPosition(GameConfig.stageWidth/2 - titlePic.width/2,20);
		this.addChildToContainer(titlePic);

		let cornertip = BaseBitmap.create("newcrossatkrace_cornertip");
		cornertip.setPosition(0,0);
		this.addChildToContainer(cornertip);
		this._cornertip = cornertip;
		cornertip.visible  = false;

		//人物形象
		let titleId = "3000";
		let tcfg = Config.TitleCfg.getTitleCfgById(titleId);
        let resPath = "palace_db_" + titleId;
		let playerDragon:BaseDisplayObjectContainer = null;
        if (titleId && App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes(resPath+"_ske") ) {
           
            let loadIdx:number=0;
			let myHair = null;
            playerDragon = new BaseDisplayObjectContainer();
            playerDragon.x = GameConfig.stageWidth/2;
            playerDragon.y = GameConfig.stageHeigth-800;
            this.addChildToContainer(playerDragon);

            let level = 1;
			let role=App.CommonUtil.getPlayerDragonRole(titleId, Api.playerVoApi.getPlayePicId(), level);
            role.name = "role";
            playerDragon.addChild(role);
            role.setPosition(0,40);

        } else 
		{
            
            let level = 1;
			playerDragon = Api.playerVoApi.getPlayerPortrait(Number(titleId), Api.playerVoApi.getPlayePicId(),0,false,null,null,level);
           	playerDragon.x = GameConfig.stageWidth/ 2 - playerDragon.width * playerDragon.scaleX/2;
            playerDragon.y = GameConfig.stageHeigth-800;

            this.addChildToContainer(playerDragon);
        }

		this._openNode = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._openNode);
		this._openNode.visible = false;

		let firebg = BaseBitmap.create("acredlotuswarrior_bottom");
		firebg.setPosition(0,GameConfig.stageHeigth-160-firebg.height);
		this._openNode.addChild(firebg);

		let redflag = BaseBitmap.create("crossserverintidaizi-7");
		redflag.setPosition(0,GameConfig.stageHeigth-160-redflag.height);
		this._openNode.addChild(redflag);

		//进入擂台按钮
		this._enterBtn = ComponentManager.getButton("btn_enter_race",null,this.enterRackHandler,this,null,0);
		this._enterBtn.setPosition(GameConfig.stageWidth/2 - this._enterBtn.width/2,GameConfig.stageHeigth-550);
		this.addChildToContainer(this._enterBtn);
		
		let crossVo = this.crossVo;
		let timeNumber:number = 7200;
		let timeNumber2:number = 3600*24;
		App.LogUtil.log("GameData.serverTime "+GameData.serverTime+"  et "+crossVo.et);
		if (crossVo.st > GameData.serverTime - timeNumber)
		{	
			this._enterBtn.visible = false;
			this._cdType = 1;
			this._countDownTime = timeNumber - GameData.serverTime + crossVo.st 
		}
		else if (crossVo.et > GameData.serverTime + timeNumber2)
		{
			this._cdType = 2;
			this._countDownTime = crossVo.et -  GameData.serverTime - timeNumber2;
		}
		else {
			this._cdType = 4;
			this._countDownTime = crossVo.et -  GameData.serverTime;
		}

		//派遣
		this._dispatchTime = this.crossVo.st + 7200 - GameData.serverTime;

		// if (this._dispatchTime > 0)
		// {
			this._dispatchServantNode = new BaseDisplayObjectContainer();
			this._dispatchServantNode.y = GameConfig.stageHeigth-266;
			this._openNode.addChild(this._dispatchServantNode);
			this._dispatchServantNode.visible = false;
			let dispatchBtnImg = "newcrossatkrace_zhenrongbtn";
			if (this._dispatchTime > 0){
				dispatchBtnImg = "dispatch_servant_btn";
			}
			let dispathBtn = ComponentManager.getButton(dispatchBtnImg,null,this.dispathServantHandler,this,null,0);
			dispathBtn.setPosition(GameConfig.stageWidth/2 - dispathBtn.width/2,100-dispathBtn.height);
			this._dispatchServantNode.addChild(dispathBtn);
			this._dispathBtn = dispathBtn;
			if (this.crossVo.dispatchServantRed())
			{
				App.CommonUtil.addIconToBDOC(dispathBtn);
				let reddot = dispathBtn.getChildByName("reddot");
				reddot.y = 18;
			}

			let timebg = BaseBitmap.create("public_9_bg15");
			timebg.width = 278;
			timebg.height = 40;
			timebg.x = GameConfig.stageWidth/2 - timebg.width/2;
			this._dispatchServantNode.addChild(timebg);
			this._dispatchTimeBg = timebg;

			let dispathTimeText:BaseTextField = ComponentManager.getTextField(this.getDispachTimeStr(), 30,TextFieldConst.COLOR_WARN_GREEN3);
			dispathTimeText.width = timebg.width;
			dispathTimeText.textAlign = egret.HorizontalAlign.CENTER;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,dispathTimeText,timebg);
			this._dispatchServantNode.addChild(dispathTimeText);
			this._dispatchTimeText = dispathTimeText;
			
		// }
		if (this._dispatchTime <= 0){
			timebg.visible = false;
			dispathTimeText.visible = false;
		}

		

		
		//底部
		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_wordbg");
		bottomBg.height = 168;
		bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2,GameConfig.stageHeigth - bottomBg.height);
		this.addChildToContainer(bottomBg);
		
		
		let timeDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime",[crossVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		timeDesc.x =24;
		timeDesc.y =bottomBg.y+20;
		this.addChildToContainer(timeDesc);


		//倒计时

		this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossCDTime"+this._cdType), TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._cdTimeDesc.x = timeDesc.x;
		this._cdTimeDesc.y =timeDesc.y+30
		this.addChildToContainer(this._cdTimeDesc);

		this._countDownText = ComponentManager.getTextField(this.getCountTimeStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON,0xe50404);
		this._countDownText.setPosition(this._cdTimeDesc.x+this._cdTimeDesc.width , this._cdTimeDesc.y);
		this.addChildToContainer(this._countDownText);

		let qualification:BaseTextField = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		qualification.x =timeDesc.x;
		qualification.y =this._countDownText.y + 30;
		qualification.width = GameConfig.stageWidth - qualification.x*2;
		qualification.lineSpacing = 6;
		this.addChildToContainer(qualification);
		this._openDesc = qualification;

		if (crossVo.st > GameData.serverTime - 300)
		{	
			this._openDesc.text = LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn("newatkraceCrossOpenDesc1", crossVo.isCrossLeague()));
			TimerManager.doTimer(crossVo.st - GameData.serverTime + 300,1,this.refreshInfo,this);
		}
		else 
		{
			this.refreshInfo();
		}
		this.tick();
    }	

	private enterRackHandler():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSVIEW,{
			code:this.code,
		});
	}

	private dispathServantHandler():void
	{	
		if (!this.crossVo.getSids() || this.crossVo.getSids().length == 0)
		{	
			App.CommonUtil.showTip(LanguageManager.getlocal("newatkraceServantLess30Tip"));
			return;
		}
		
		this.crossVo.setDispatchServantRed();
		App.CommonUtil.removeIconFromBDOC(this._dispathBtn)
		ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSNEWDISPACHVIEW,{
			code:this.code,
		});
	}

    private getCountTimeStr():string
	{	
		let time:number = this._countDownTime;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	private getDispachTimeStr():string
	{	
		let time:number = this._dispatchTime;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}


	public tick():void
	{	
		if (this._countDownText) {
			this._countDownTime--;
			this._countDownText.text = this.getCountTimeStr();

			if (this._countDownTime < 0) {
				this._cdType += 1;
				this.refreshEnterBtn();
			}
		}

		if (this._dispatchTime >=0) {
			this._dispatchTime--;
			
			if (this._dispatchTime < 0) {
				this._dispatchTimeText.visible = false;
				this._dispatchTimeBg.visible = false;
				// this._dispatchServantNode.dispose();
				// this._dispatchServantNode = null;
				this._dispathBtn.setBtnBitMap("newcrossatkrace_zhenrongbtn");
				this.refreshEnterBtn();
			}
			else{
				this._dispatchTimeText.visible = true;
				this._dispatchTimeBg.visible = true;
				this._dispatchTimeText.text = this.getDispachTimeStr();
			}
		}
	}

	private refreshEnterBtn():void
	{
		
		let crossVo = Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace",this.code);
		let timeNumber:number = 7200;
		let timeNumber2:number = 3600*24;
		if (this._cdType == 2)
		{	
			this._enterBtn.visible = true;
			this._countDownTime = crossVo.et -  GameData.serverTime - timeNumber2;
		}
		else if (this._cdType == 3)
		{
			this._countDownTime = crossVo.et -  GameData.serverTime;
			this._countDownText.visible = false;
			this._cdTimeDesc.textColor = TextFieldConst.COLOR_WARN_RED;
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ATKRACECROSS_FIGHTEND);
		}
		else if (this._cdType >= 4)
		{	
			ViewController.getInstance().hideAllView();
			App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(`newatkracecrossEndTip`, crossVo.isCrossLeague())));
			Api.acVoApi.isHandled_BI = false;
			Api.acVoApi.isHandled_LRP = false;
			Api.acVoApi.isHandled_ILI = false;
			return;
		}

		this._cdTimeDesc.text = LanguageManager.getlocal("atkracecrossCDTime"+this._cdType);
		this._countDownText.text = this.getCountTimeStr();

		if (this._cdType == 3)
		{
			this._countDownText.x =this._cdTimeDesc.x+this._cdTimeDesc.width;
		}
	}

    public dispose():void
	{	
		this._enterBtn = null;
		this._countDownTime = 0;
		this._countDownText = null;
		this._dispatchServantNode = null;
		this._cdTimeDesc = null;
		this._openNode = null;
		this._dispatchTime = 0;
		this._dispatchTimeText = null;
		this._dispatchTimeBg = null;
		this._cornertip = null;
		this._openDesc= null;
		this._cdType = 0;
		this._dispathBtn = null;
		Api.acVoApi.isHandled_LRP = false;

		super.dispose();
	}
}