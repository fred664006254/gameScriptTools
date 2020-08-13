/**
 * author:qianjun
 * desc:跨服权势活动首页
*/
class AcCrossServantPowerView extends AcCommonView
{
	private _timeDesc : BaseTextField = null;
	private _ranktxt : BaseTextField = null;
	private _descGroup:BaseDisplayObjectContainer;
	private _descTxtBg  : BaseBitmap = null;
	private _descTxt  : BaseTextField = null;
	private _taskBtn:BaseButton;
	private _droWifeIcon:BaseLoadDragonBones
	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.CrossServantPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcCrossServantPowerVo{
        return <AcCrossServantPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([

			// "public_9_wordbg2","crosspowerenter","crosspowerenter_down","crossserverpower_canjoin","crosspowerenterbg",
			// "punish_reward_icon",
			// "punish_rank_icon",
			// "punish_rank_name",
			"rechargevie_db_01",

			"crossServantPower_bg",
			"crossServantPower_taskIcon",
			"crossServantPower_txtIcon",
			"adult_lowbg",
		]);
	}

	protected getTitleStr():string
	{
		return  "acCrossServantPower-1_Title";
	}

	public initView():void
	{	
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSS_SERVANT_REFRESH,this.refreshRank,this);

		let view = this;
		let topbg =  BaseBitmap.create('crossServantPower_bg'); 
		view.addChildToContainer(topbg); 

		let sercfg = Config.ServantCfg.getServantItemById(this.cfg.servantid);
		let skinId = this.cfg.servantSkinID;
		if (!Api.switchVoApi.checkServantCloseBone() && skinId)
		{
			let dagonBonesName =  "servant_full2_" + skinId; 
			let boneName = dagonBonesName+ "_ske";
			if(boneName &&  RES.hasRes(boneName)&&App.CommonUtil.check_dragon() ){
				this.makeDBdragon();
				App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,this.backFromServantSkin,this);
				App.MessageHelper.addEventListener(MessageConst.MESSAFE_CROSS_SERVANT_GOTASK,this.removeDBdragon,this);
			}else{
				let servantFullImg = BaseLoadBitmap.create(sercfg.fullIcon);
				servantFullImg.width = 640;
				servantFullImg.height = 482;
				servantFullImg.anchorOffsetY = servantFullImg.height;
				servantFullImg.x = 120; 
				servantFullImg.y = 500; 
				this.addChildToContainer(servantFullImg);
			}
		}else{
			let servantFullImg = BaseLoadBitmap.create(sercfg.fullIcon);
			servantFullImg.width = 640;
			servantFullImg.height = 482;
			servantFullImg.anchorOffsetY = servantFullImg.height;
			servantFullImg.x = 120; 
			servantFullImg.y = 500; 
			this.addChildToContainer(servantFullImg);
		}

		// 对话
		let iconBg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
		view.addChildToContainer(iconBg);

		let taskBtn = ComponentManager.getButton("crossServantPower_taskIcon","",this.taskBtnHandler,this);
		taskBtn.x = GameConfig.stageWidth - taskBtn.width - 20;
		taskBtn.y = 370;
		view.addChildToContainer(taskBtn);
		this._taskBtn = taskBtn;

		let tasktxt = BaseBitmap.create("crossServantPower_txtIcon");
		tasktxt.x = taskBtn.x + taskBtn.width/2 - tasktxt.width/2;
        tasktxt.y = taskBtn.y + taskBtn.height - tasktxt.height -10;
		view.addChildToContainer(tasktxt)

		iconBg.x = taskBtn.x + taskBtn.width/2 - iconBg.width/2;
        iconBg.y = taskBtn.y + taskBtn.height/2 - iconBg.height/2;

		//中部信息
		let vo = view.vo;
		let bottomBg = BaseBitmap.create("public_lockbg");
		bottomBg.width = GameConfig.stageWidth+40;
        bottomBg.height = 140;
		bottomBg.x = GameConfig.stageWidth/2 - bottomBg.width/2;
		bottomBg.y = 450;// GameConfig.stageHeigth - bottomBg.height;
		view.addChildToContainer(bottomBg);

		//活动时间
		let timeDesc : BaseTextField = ComponentManager.getTextField("",20, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeDesc = timeDesc;
		let colorR0 = App.StringUtil.formatStringColor(vo.acCountDown,TextFieldConst.COLOR_WARN_GREEN2);
		this._timeDesc.text = LanguageManager.getlocal("acTigertrappass_countdown_time", [ colorR0]);
		timeDesc.x = GameConfig.stageWidth/2 - timeDesc.width/2;
		timeDesc.y = bottomBg.y + 10;
		view.addChildToContainer(timeDesc);
		
		//活动倒计时时间

		//规则描述
		let ruleDesc : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServantPower_tipdesc" + (this.code == "1" ? "" : "_"+ this.code) ),20, TextFieldConst.COLOR_LIGHT_YELLOW);
		// ruleDesc.width = GameConfig.stageWidth - 20;
		ruleDesc.lineSpacing = 6;
		ruleDesc.x = GameConfig.stageWidth/2 - ruleDesc.width/2;;
		ruleDesc.y = timeDesc.y + timeDesc.textHeight + 7;
		view.addChildToContainer(ruleDesc);

		let ruleDesc2: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServantPower_tipdesc2" + (this.code == "1" ? "" : "_"+ this.code)  ,[sercfg.name,""+this.cfg.servantlv]),20, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleDesc2.x = 70;
		ruleDesc2.y = ruleDesc.y + ruleDesc.height + 7;
		view.addChildToContainer(ruleDesc2);

		
		let ranktxt = ComponentManager.getTextField("",20, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._ranktxt = ranktxt;
		ranktxt.x = ruleDesc2.x;
		this.refreshRankTxt();
		ranktxt.y = ruleDesc2.y + ruleDesc2.height + 5;
		view.addChildToContainer(ranktxt);

		let rankListBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acRankBtnTxt",this.rankListBtnHandler,this);
		rankListBtn.x = GameConfig.stageWidth/2 + 80;
		rankListBtn.y = ruleDesc2.y + 5;
		this.addChildToContainer(rankListBtn);

		//底部信息
		let bottomBg3:BaseBitmap = BaseBitmap.create("public_9v_bg02");
		bottomBg3.x = 0;
        bottomBg3.width =GameConfig.stageWidth;
		bottomBg3.y = bottomBg.y + bottomBg.height-3; 
		bottomBg3.height = GameConfig.stageHeigth - bottomBg.y  - this.container.y;//-20; 
		this.addChildToContainer(bottomBg3);

        let bottomBg4 = BaseBitmap.create("adult_lowbg");
		bottomBg4.x =GameConfig.stageWidth/2 - bottomBg4.width/2;
        bottomBg4.y =GameConfig.stageHeigth -180;
		this.addChildToContainer(bottomBg4);

		let bottomBgV = BaseBitmap.create("public_9v_bg03");
		bottomBgV.width = GameConfig.stageWidth;
		bottomBgV.height = GameConfig.stageHeigth - this.container.y + 15; ;
		bottomBgV.x = 0;
		bottomBgV.y = -15;
		this.addChildToContainer(bottomBgV);

		let tipTxt = ComponentManager.getTextField("",24);
		let zoneTxt = "";
		let zidgroup = this.vo.zidgroup;
		for (var index = 0; index < zidgroup.length; index++) {
			var element = zidgroup[index];
			let str = Api.mergeServerVoApi.getAfterMergeSeverName(Api.playerVoApi.getPlayerID(),true,element)
			zoneTxt += str + ","
		}
		zoneTxt = zoneTxt.substr(0,zoneTxt.length-1);
        tipTxt.text = LanguageManager.getlocal("acCrossServantPower_bottomtip",[zoneTxt] );
		tipTxt.multiline = true;
		tipTxt.lineSpacing = 4;
		tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.x = GameConfig.stageWidth/2 - tipTxt.width/2;
        tipTxt.y = bottomBg4.y+bottomBg4.height/2 -tipTxt.height/2 ;
        bottomBg.name = "bottomBg";
		this.addChildToContainer(tipTxt);
		
		//榜单
		let rect = new egret.Rectangle(0,10,GameConfig.stageWidth,bottomBg4.y -bottomBg.y - bottomBg.height - 10 );
        let list = [];
        for (var key in this.cfg.rankList1) {
            list.push({aid:this.aid,code:this.code,key:key});
        }
        let scrollList = ComponentManager.getScrollList(AcCrossServantPowerScrollItem,list,rect);
        scrollList.x = 0;
        scrollList.y = bottomBg.y + bottomBg.height + 5;
		this.addChildToContainer(scrollList);
		this.showTalkPanel();
		this.tick();
	}
	protected backFromServantSkin()
	{
		this.makeDBdragon();
	}
	private makeDBdragon()
	{
		let skinId = this.cfg.servantSkinID;
		if (!Api.switchVoApi.checkServantCloseBone() && skinId && !this._droWifeIcon)
		{
			let dagonBonesName =  "servant_full2_" + skinId; 
			let boneName = dagonBonesName+ "_ske";
			if(boneName &&  RES.hasRes(boneName)&&App.CommonUtil.check_dragon() ){
				let dagonBonesName =  "servant_full2_" + skinId; 
				let boneName = dagonBonesName+ "_ske";
				this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
				this._droWifeIcon.visible = true; 
				this._droWifeIcon.setScale(0.9);
				this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
				this._droWifeIcon.anchorOffsetX =  this._droWifeIcon.width/2;
				this._droWifeIcon.x = GameConfig.stageWidth/2;
				this._droWifeIcon.y = 580;
				// this.addChildToContainer(this._droWifeIcon);
				this.container.addChildAt(this._droWifeIcon,2);
			}
		}
	}

	private refreshRankTxt()
	{
		if(!this._ranktxt){
			return;
		}
		let ranknum = this.vo.myrank;
		let rankStr = ranknum == 0 ? LanguageManager.getlocal("atkracedes4") : ranknum
		let colorR = App.StringUtil.formatStringColor("" + rankStr,TextFieldConst.COLOR_WARN_GREEN2);
		this._ranktxt.text = LanguageManager.getlocal("acRank_myrank1", [ colorR]);
	}
	private showTalkPanel()
	{
		let descgroup:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
        descgroup.width = 180;
		descgroup.x = GameConfig.stageWidth - descgroup.width - 30;
		descgroup.y = 40;
        this.addChildToContainer(descgroup);
		descgroup.alpha = 0;
		this._descGroup = descgroup;
        
        let descTxtBg = BaseBitmap.create('public_9v_bg11');
        descTxtBg.width = descgroup.width;
        descTxtBg.anchorOffsetX = descTxtBg.width / 2;
        descTxtBg.scaleX = -1;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxtBg, descgroup, [0, 0], true);
        descgroup.addChild(descTxtBg);
        this._descTxtBg = descTxtBg;

        let desctTxt = ComponentManager.getTextField('',20,TextFieldConst.COLOR_BROWN);
        desctTxt.width = descgroup.width - 50;
        desctTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, desctTxt, descTxtBg, [0, 15]);
        descgroup.addChild(desctTxt);
        this._descTxt = desctTxt;
		
        egret.Tween.get(descgroup, {loop : true}).call(()=>{
			let ranIdx = App.MathUtil.getRandom(1,6);
			let desc = LanguageManager.getlocal("acCrossServantPower_servantTip" + this.code +"_" + ranIdx)
            desctTxt.text = desc;
            descTxtBg.height = desctTxt.textHeight + 50;
            descgroup.height = descTxtBg.height + 10;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, desctTxt, descTxtBg, [0, 15]);
        },this).to({alpha : 1},2000).wait(3000).to({alpha : 0}, 1500).call(()=>{
        },this).wait(7000);  
	}

	public tick():void
	{	
		if (this.vo.et > GameData.serverTime + 86400) {
			let timeStr = App.DateUtil.getFormatBySecond(Math.max(0,(this.vo.et - GameData.serverTime -  86400)),1);
			let colorR0 = App.StringUtil.formatStringColor(timeStr,TextFieldConst.COLOR_WARN_GREEN2);
			this._timeDesc.text = LanguageManager.getlocal("acTigertrappass_countdown_time", [ colorR0]);
		}else{
			this._timeDesc.text = LanguageManager.getlocal("crossIntimacyCDTime4");
		}
		if(this.vo.isShowRedForTask()){
			App.CommonUtil.addIconToBDOC(this._taskBtn);
		}else{
			App.CommonUtil.removeIconFromBDOC(this._taskBtn);
		}
	}

	private rankListBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVANTPOWERRANKLISTPOPUPVIEW,{aid:this.aid,code:this.code});
	}
	private taskBtnHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVANTPOWERTASKPOPUPVIEW,{aid:this.aid,code:this.code});
	}

	protected receiveData(data: { ret: boolean, data: any }): void
    {
        let rData = data.data;
        if(rData.ret == 0)
        {
			let cmd = rData.cmd;
			if(cmd == NetRequestConst.REQUEST_CROSS_SERVANT_RANKINFO){
				this.vo.ranks = rData.data.ranks;
				this.vo.zidgroup = rData.data.zidgroup;
				this.vo.myrank = rData.data.myrank;
				this.refreshRankTxt();
			}
        }
    }
	private refreshRank()
	{
		let serObj = Api.servantVoApi.getServantObj(this.cfg.servantid);
		if(serObj && serObj.level >= this.cfg.servantlv){
			NetManager.request(NetRequestConst.REQUEST_CROSS_SERVANT_RANKINFO,{activeId:this.acVo.aidAndCode});
		}
	}
    protected getRequestData():{requestType:string,requestData:any} 
	{
		return {requestType:NetRequestConst.REQUEST_CROSS_SERVANT_RANKINFO,requestData:{activeId:this.acVo.aidAndCode}};
	}
	private removeDBdragon()
	{
		if(this._droWifeIcon){
			this._droWifeIcon.stop();
			this._droWifeIcon.dispose();
			this._droWifeIcon = null;
		}
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSS_SERVANT_REFRESH,this.refreshRank,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_FROM_SERVANT_SKIN,this.backFromServantSkin,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAFE_CROSS_SERVANT_GOTASK,this.removeDBdragon,this);
		this._timeDesc = null;
		this._ranktxt = null;
		this.removeDBdragon();
		super.dispose();
	}
}