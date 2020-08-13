/**
 * author yanyuling
 */

class AcMoonlightView extends AcCommonView{
	public constructor() {
		super();
	}

	private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _bottomBg: BaseBitmap = null;
    private _progress : ProgressBar = null;
	private _boxList:BaseBitmap[] = [];
	private _isPlaying: Boolean = false;
	private _rewards: any = null;
	private _acvo:AcMoonlightVo = undefined;
	private _bg: BaseLoadBitmap = null;
	private _showNumText: BaseTextField = null;
	private _fire:BaseBitmap = null;
	// private _isSingle:boolean = true;
	private _anim:CustomMovieClip = null;
	private _taskBtn:BaseButton = null;
	// private aid:string;
	// private code:string;
	private get vo() : AcMoonlightVo{
       	if(!this._acvo){
		    this._acvo =  <AcMoonlightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	   	}
		return this._acvo;
    }
	private get cfg() : Config.AcCfg.MoonlightCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
	protected getRuleParam():string[]{
		return [String(this.cfg.cost),String(this.cfg.cost * 10)];
	} 
	protected getRequestData():{requestType:string,requestData:any}
	{	
		if(this.vo.isFirst()){
			return {requestType:NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG,requestData:{
				activeId : this.vo.aidAndCode,
				flagkey:"moonlight",
				value:1
			}};
		} else {
			return null;
		}

    }
	protected receiveData(data:{ret:boolean,data:any}):void
	{
	}
	protected initView(): void {

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_MOONLIGHT_REFRESHVO,this.refreshData,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTTASKREWARD,this.eventCollectHandlerCallBack,this);

		let titleFont = BaseBitmap.create(this.getDefaultRes("acmoonlight_title"));
		titleFont.x = GameConfig.stageWidth / 2 - titleFont.width/2;
		titleFont.y = 10;
		this.addChild(titleFont);

		
		let topbg = BaseBitmap.create(this.getDefaultRes("acmoonlight_topbg"));
   
        topbg.x = 0;
		topbg.y = 72;
        this.addChild(topbg);

		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 18,0x42df1b);
		this._activityTimerText.x = 15
		this._activityTimerText.y = topbg.y + 3;
		this._activityTimerText.text  = this.vo.getAcLocalTime(true);
		this.addChild(this._activityTimerText);

		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		let deltaT = this.vo.et - GameData.serverTime;
		this._acCDTxt = acCDTxt;

		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acMoonlight_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acMoonlight_acCD", [LanguageManager.getlocal("acMoonlight_acCDEnd")]);
		}

		// acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
		acCDTxt.x = GameConfig.stageWidth - 15 - acCDTxt.width;
		acCDTxt.y = this._activityTimerText.y;
		this.addChild(acCDTxt);
		

		let ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(),18, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleText.width = GameConfig.stageWidth - 30;
		ruleText.multiline = true;
		ruleText.lineSpacing = 1;
		ruleText.x = 15
		ruleText.y = this._acCDTxt.y + this._acCDTxt.height + 1;
		ruleText.text = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_description"),[""+this.cfg.cost]);
		this.addChild(ruleText);

		let drawNum = this.cfg.drawNum;
		let maxDrawNum = this.cfg.drawNum[this.cfg.drawNum.length-1]["needNum"];
        let shownum = this.vo.ainfo.score > maxDrawNum ? maxDrawNum :  this.vo.ainfo.score;
        this._showNumText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acMoonlight_moonvalue"),[String(shownum)]),18,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._showNumText.x = 15;
		this._showNumText.y = topbg.y + topbg.height - 13 - this._showNumText.height;//ruleText.y + ruleText.height + 1;
		this.addChild(this._showNumText);


		this._anim =ComponentManager.getCustomMovieClip("acmoonlight_effect-1",5,70);
		this._anim.x = 330;
		this._anim.y = GameConfig.stageHeigth - 575;//GameConfig.stageHeigth/2;
		this._anim.texture = ResourceManager.getRes(this.getDefaultRes("acmoonlight_baseeffect"));
		this.addChild(this._anim);
		// this._anim.blendMode = egret.BlendMode.ADD;
		this._anim.setEndCallBack(()=>{

			this.recallAniBack();

		},this);
		
		if(App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("wife_full_"+ this.cfg.wifeId + "_ske"))
        {
       
            let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones("wife_full_"+ this.cfg.wifeId);
            droWifeIcon.setScale(1)
            droWifeIcon.x = 120;
            droWifeIcon.y = GameConfig.stageHeigth - 30;
            this.addChild(droWifeIcon);
        }
        else
        {
            // wife 的 图片
            let scaleNum = 0.8;
            let wifeBM =  BaseLoadBitmap.create("wife_full_"+ this.cfg.wifeId);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(scaleNum);
            wifeBM.x = -100;
            wifeBM.y = GameConfig.stageHeigth - 840 * 0.8;
            this.addChild(wifeBM);
        }

		let bottomBg = BaseBitmap.create(this.getDefaultRes("acmoonlight_bottom"));
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
		this.addChild(bottomBg);
		this._bottomBg = bottomBg;

        //抽奖一次
		let oneBtn = ComponentManager.getButton(this.getDefaultRes("acmoonlight_onebtn"),null,this.oneSendBtnHandler,this);
		oneBtn.x = GameConfig.stageWidth/4 - oneBtn.width/2;
		oneBtn.y = bottomBg.y + bottomBg.height - oneBtn.height;
		this.addChild(oneBtn);

        let oneBtnText = BaseBitmap.create(this.getDefaultRes("acmoonlight_onebtntext"));
        oneBtnText.x = oneBtn.x + oneBtn.width/2 - oneBtnText.width/2;
        oneBtnText.y = oneBtn.y + oneBtn.height - 30 - oneBtnText.height;
        this.addChild(oneBtnText);

        let oneBtnGemBg = BaseBitmap.create(this.getDefaultRes("acmoonlight_btndetailbg"));
        oneBtnGemBg.x = oneBtnText.x + oneBtnText.width/2 - oneBtnGemBg.width/2;
        oneBtnGemBg.y = oneBtnText.y + oneBtnText.height;
        this.addChild(oneBtnGemBg);

        let oneBtnGem = BaseBitmap.create("itemicon1");
        oneBtnGem.scaleX = 0.4;
        oneBtnGem.scaleY = 0.4;
        let oneBtnGemText = ComponentManager.getTextField(String(this.cfg.cost),20,TextFieldConst.COLOR_CROSS_YELLOW);
        oneBtnGem.x = oneBtnGemBg.x + oneBtnGemBg.width /2 - (oneBtnGem.width * oneBtnGem.scaleX + oneBtnGemText.width + 10)/2;
        oneBtnGem.y = oneBtnGemBg.y + oneBtnGemBg.height/2 - oneBtnGem.height * oneBtnGem.scaleY/2;
        this.addChild(oneBtnGem);
        oneBtnGemText.x = oneBtnGem.x + oneBtnGem.width * oneBtnGem.scaleX + 10;
        oneBtnGemText.y = oneBtnGemBg.y + oneBtnGemBg.height/2 - oneBtnGemText.height/2;
        this.addChild(oneBtnGemText);


        let tenbg = BaseBitmap.create(this.getDefaultRes("acmoonlight_btnbg"));
        tenbg.x = 3*GameConfig.stageWidth/4 -tenbg.width - 30;
        tenbg.y = bottomBg.y + bottomBg.height - tenbg.height - 60;
        this.addChild(tenbg);
        //抽奖十次
		let tenBtn = ComponentManager.getButton(this.getDefaultRes("acmoonlight_tenbtn"),null,this.tenSendBtnHandler,this);
		tenBtn.x = 3*GameConfig.stageWidth/4 - tenBtn.width/2;
		tenBtn.y = bottomBg.y + bottomBg.height - tenBtn.height;
		this.addChild(tenBtn);

        let tenBtnText = BaseBitmap.create(this.getDefaultRes("acmoonlight_tenbtntext"));
        tenBtnText.x = tenBtn.x + tenBtn.width/2 - tenBtnText.width/2;
        tenBtnText.y = tenBtn.y + tenBtn.height - 30 - tenBtnText.height;
        this.addChild(tenBtnText);

        let tenBtnGemBg = BaseBitmap.create(this.getDefaultRes("acmoonlight_btndetailbg"));
        tenBtnGemBg.x = tenBtnText.x + tenBtnText.width/2 - tenBtnGemBg.width/2;
        tenBtnGemBg.y = tenBtnText.y + tenBtnText.height;
        this.addChild(tenBtnGemBg);

        let tenBtnGem = BaseBitmap.create("itemicon1");
        tenBtnGem.scaleX = 0.4;
        tenBtnGem.scaleY = 0.4;
        let tenBtnGemText = ComponentManager.getTextField(String(this.cfg.cost * 10),20,TextFieldConst.COLOR_CROSS_YELLOW);
        tenBtnGem.x = tenBtnGemBg.x + tenBtnGemBg.width /2 - (tenBtnGem.width * tenBtnGem.scaleX + tenBtnGemText.width + 10)/2;
        tenBtnGem.y = tenBtnGemBg.y + tenBtnGemBg.height/2 - tenBtnGem.height * tenBtnGem.scaleY/2;
        this.addChild(tenBtnGem);
        tenBtnGemText.x = tenBtnGem.x + tenBtnGem.width * tenBtnGem.scaleX + 10;
        tenBtnGemText.y = tenBtnGemBg.y + tenBtnGemBg.height/2 - tenBtnGemText.height/2;
        this.addChild(tenBtnGemText);

        //进度条
        this._progress = ComponentManager.getProgressBar("progress_type4_yellow","progress_type4_bg",530);
		this._progress.x = GameConfig.stageWidth/2-this._progress.width/2;
        this._progress.y = topbg.y + topbg.height + 26;
		this._progress.setPercentage(this.getProgressPercent());
        this.addChild(this._progress);

        // 查看按钮
        let lookBtnBg :BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
        lookBtnBg.x = GameConfig.stageWidth - 15 - lookBtnBg.width;
        lookBtnBg.y = this._progress.y + 60;
		this.addChild(lookBtnBg);
		
        let lookBtn:BaseButton = ComponentManager.getButton(this.getDefaultRes("acmoonlight_lookbtn"),"",this.lookBtnHandler,this);
        lookBtn.x = lookBtnBg.x + lookBtnBg.width/2 - lookBtn.width/2;
        lookBtn.y = lookBtnBg.y + lookBtnBg.height/2 - lookBtn.height/2;
        this.addChild(lookBtn); 

        let lookTxt = BaseBitmap.create("acmoonlight_searchtext");
		lookTxt.x = lookBtn.x + lookBtn.width/2 - lookTxt.width/2;
		lookTxt.y = lookBtnBg.y + lookBtnBg.height - lookTxt.height;
        this.addChild(lookTxt);


        // 活动任务按钮
        let taskBtnBg :BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
        taskBtnBg.x = lookBtnBg.x - 5 - taskBtnBg.width;
        taskBtnBg.y = lookBtnBg.y;//lookBtnBg.y + lookBtnBg.height+ 5;
        this.addChild(taskBtnBg);

        let taskBtn:BaseButton = ComponentManager.getButton(this.getDefaultRes("acmoonlight_taskicon"),"",this.taskBtnHandler,this);
        taskBtn.x = taskBtnBg.x + taskBtnBg.width/2 - taskBtn.width/2;
        taskBtn.y = taskBtnBg.y + taskBtnBg.height/2 - taskBtn.height/2;
        this.addChild(taskBtn); 
		this._taskBtn = taskBtn;

        let taskTxt = BaseBitmap.create("acspringouting_taskname-1");
		taskTxt.x = taskBtn.x + taskBtn.width/2 - taskTxt.width/2;
		taskTxt.y = taskBtnBg.y + taskBtnBg.height - taskTxt.height;
        this.addChild(taskTxt);


		let fire = BaseBitmap.create(this.getDefaultRes("acmoonlight_progbg"));
		fire.x = this._progress.x - fire.width/2;
		fire.y = this._progress.y + this._progress.height/2 - fire.height/2;
		this.addChild(fire);

        let fireText = BaseBitmap.create(this.getDefaultRes("acmoonlight_progname"));
        fireText.x = fire.x + fire.width/2 - fireText.width/2;
		fireText.y = fire.y + 20;
		this.addChild(fireText);





		for (let index = 0; index < drawNum.length; index++) {
			let tmprcfg = drawNum[index];
			// let perY = startY - (index+1) * perHeight;
           
			// 1->宝箱关闭 ,2->可以领取宝箱, 3->已经打开宝箱
			let rStatus = this.vo.getBoxStatusById(index);
			let imgres = this.getDefaultRes("acmoonlight_box"+rStatus);
			
			let boxImg = BaseBitmap.create(imgres);
			boxImg.anchorOffsetX = boxImg.width/2;
			boxImg.anchorOffsetY = boxImg.height/2;
			boxImg.name = "boxImg"+index;
			boxImg.x = this._progress.x + this.cfg.drawNum[String(index)]["needNum"]/maxDrawNum * this._progress.width;
			boxImg.y = this._progress.y + this._progress.height/2;
			
			let lightImg =  BaseBitmap.create("dailytask_box_light");
			lightImg.anchorOffsetX = 40;
			lightImg.anchorOffsetY = 40;
		
			lightImg.name = "lightImg"+index
            lightImg.x = boxImg.x;
			lightImg.y = boxImg.y;
			lightImg.visible = false;
			this.addChild(lightImg);
			this.addChild(boxImg);

            boxImg.addTouchTap(this.getBoxReward,this,[index]);
            


            let numTxtBg = BaseBitmap.create(this.getDefaultRes("acmoonlight_prognumbg"));
            numTxtBg.x = boxImg.x- numTxtBg.width/2;
            numTxtBg.y = boxImg.y + boxImg.height/2 +5;
            this.addChild(numTxtBg);

			let need = this.cfg.drawNum[index]["needNum"];
			let numTxt =  ComponentManager.getTextField(need.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			numTxt.x = numTxtBg.x + numTxtBg.width/2 - numTxt.width/2;
			numTxt.y = numTxtBg.y + numTxtBg.height/2 - numTxt.height/2;
			this.addChild(numTxt);
		}
		this.refreshData();
		// this.showFirstDialog();

		// TimerManager.doTimer(10000,0,this.showTalk,this);

	
	}
    protected eventCollectHandlerCallBack(event:egret.Event)
    {

		if(event)
		{
			if(event.data&&event.data.ret)
			{
				let cmd =  event.data.data.cmd;
				
				let data = event.data.data.data;
				let rewards = data.rewards;
				let rList = GameData.formatRewardItem(rewards);
				App.CommonUtil.playRewardFlyAction(rList);
		
				Api.servantVoApi.checkServantChangeRewards( data.cfrewards, data.rewards);
				
				
			}
		}
		

    }
	private refreshData()
	{

		let maxDrawNum = this.cfg.drawNum[this.cfg.drawNum.length-1]["needNum"];
		let shownum = this.vo.ainfo.score > maxDrawNum ? maxDrawNum :  this.vo.ainfo.score;
		this._showNumText.text = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_moonvalue"),[String(shownum)]);


		let scene = this.cfg.drawNum;
		let num = this.vo.ainfo.score;

		if(this._taskBtn){
			if(this.vo.isHaveTaskRedDot()){
				App.CommonUtil.addIconToBDOC(this._taskBtn)
			} else {
				App.CommonUtil.removeIconFromBDOC(this._taskBtn)
			}

		}



		this._progress.setPercentage(this.getProgressPercent());
		let fireNum = this.cfg.drawNum;
		for (var index = 0; index < fireNum.length; index++) {
			
			let rStatus = this.vo.getBoxStatusById(index);
			let imgres = this.getDefaultRes("acmoonlight_box"+rStatus);
			let boxImg = this.getChildByName("boxImg"+index);
			let lightImg =  this.getChildByName("lightImg"+ index);
			if (boxImg instanceof(BaseBitmap))
			{
				boxImg.texture = ResourceManager.getRes(imgres);
				boxImg.anchorOffsetX = boxImg.width/2;
				boxImg.anchorOffsetY = boxImg.height/2;
			}
			if(rStatus == 2){
				lightImg.visible = true;
				egret.Tween.get(lightImg,{loop:true}).to({rotation:lightImg.rotation+360},10000);
				egret.Tween.get(boxImg,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);

			} else {
				lightImg.visible = false;
				egret.Tween.removeTweens(lightImg);
				egret.Tween.removeTweens(boxImg);
			}
		}


	}

	private getProgressPercent():number
	{
		let drawNum = this.cfg.drawNum;
		let maxDrawNum = this.cfg.drawNum[this.cfg.drawNum.length-1]["needNum"];

		if(this.vo.ainfo.score > maxDrawNum){
			return 1;
		} else {
			return this.vo.ainfo.score / maxDrawNum;
		}
	}
    private lookBtnHandler():void
    {
        ViewController.getInstance().openView(ViewConst.POPUP.ACMOONLIGHTACINFOPOPUPVIEW,{"code":this.code,"aid":this.aid});

    }
    private taskBtnHandler():void
    {
        ViewController.getInstance().openView(ViewConst.POPUP.ACMOONLIGHTTASKPOPUPVIEW,{aid:this.aid,code:this.code});
 
    }
	private oneSendBtnHandler():void
	{
		if(this._isPlaying){
			return;
		}
		if(!this.vo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		if(Api.playerVoApi.getPlayerGem() >= this.cfg.cost){
			// this._isSingle = true;
			this.confirmOneCallbackHandler();
	
		} else {

			let message = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_gemNotEnough"),[""+this.cfg.cost]);

			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
				msg:message,
				callback:()=>{
					ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
				},
				handler:this,
				needCancel:true
			});
		}

	}    
	private tenSendBtnHandler():void
	{
		if(this._isPlaying){
			return;
		}
		if(!this.vo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }

		if(Api.playerVoApi.getPlayerGem() >= this.cfg.cost * 10){
			// this._isSingle = false;
			let message = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_btnCostGem"),[""+this.cfg.cost*10]);

			//显示弹出框
			ViewController.getInstance().openView(ViewConst.POPUP.COSTGEMBUYITEMPOPUPVIEW,{
				useNum: this.cfg.cost * 10,								//物品价格
				confirmCallback: this.confirmTenCallbackHandler,	//确认回调函数
				handler: this,									//target
				num: Api.playerVoApi.getPlayerGem(),									//玩家元宝数
				msg: message,									//显示消息
				id:1											//消耗物品id  1->元宝
			});
		} else {
			let message = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_gemNotEnoughTen"),[""+this.cfg.cost * 10]);

			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
				msg:message,
				callback:()=>{
					ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
				},
				handler:this,
				needCancel:true
			});
		}



		// if(this.vo.lotterynum <= 0){		
		// 	let message = LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInheritReward_sendTip1"),[""+this.vo.cfg.cost]);
			
		// 	ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
		// 		title:"itemUseConstPopupViewTitle",
		// 		msg:message,
		// 		callback:()=>{
		// 			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		// 		},
		// 		handler:this,
		// 		needCancel:true
		// 	});
		// 	return;
		// }
		// this._isPlaying = true;
		// if(this.vo.lotterynum>=10){
		// 	this._isSingle = false;
		// } else {
		// 	this._isSingle = true;
		// }
		// App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINREWARD,this.sendReward,this);
		// NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINREWARD,{activeId:this.vo.aidAndCode,});
	}
	private confirmOneCallbackHandler()
	{
		SoundManager.playEffect(SoundConst.EFFECT_DOUBLESEVEN3_CLICKBTN);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTREWARD,this.sendReward,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTREWARD,{activeId:this.vo.aidAndCode,gid:1});
	}
	private confirmTenCallbackHandler()
	{
		SoundManager.playEffect(SoundConst.EFFECT_DOUBLESEVEN3_CLICKBTN);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTREWARD,this.sendReward,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTREWARD,{activeId:this.vo.aidAndCode,gid:10});
	}
	protected initBg():void
	{


		this._bg = BaseLoadBitmap.create(this.getDefaultRes("acmoonlight_bg"));
		this._bg.width = 640;
		this._bg.height = 1136;
		this._bg.x = 0;
		this._bg.y = GameConfig.stageHeigth - 1136;//GameConfig.stageHeigth / 2 - this._bg.height/2;
		this.addChild(this._bg);
	}


	private sendReward(event: egret.Event): void 
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTREWARD,this.sendReward,this);
		
		if (event.data.data.ret < 5) {
		
			let rewards = event.data.data.data.rewards;
			this._rewards = rewards;
			SoundManager.playEffect(SoundConst.EFFECT_MOONLIGHT_ANIM);
			this._anim.playWithTime(1);
			// if(this._isSingle){
			// 	this._anim.playWithTime(1);

			// 	// this.recallAniBack();
			// } else {
			// 	this.recallAniBack();
			// }
	
		}
	}
	private recallAniBack()
	{
		this._isPlaying = false;
		let check = null;

		SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
		ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
			"rewards":this._rewards,
			"otherRewards":null,
			"isPlayAni":true, 
			showTip:null,
			callback:check,
			target:this,
		});
		this._rewards = null;
	}

	
	private getBoxReward(event:any,boxId:number)
	{
		if(!this.vo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		let score = this.vo.ainfo.score;
		let cfg = this.cfg;
		let drawNum = cfg.drawNum;

		let element = drawNum[boxId];
		//不可领取
		if(element.needNum > score){
			ViewController.getInstance().openView(ViewConst.POPUP.ACMOONLIGHTREWARDPOPUPVIEW,{aid:this.aid,code:this.code,boxid:boxId+1});
			// ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{'type' : AcMayDayView.AID,'id' : boxRewardId});

			return;
		}
		

		//已领取
		if(this.vo.ainfo.stageinfo[boxId+1]){
			ViewController.getInstance().openView(ViewConst.POPUP.ACMOONLIGHTREWARDPOPUPVIEW,{aid:this.aid,code:this.code,boxid:boxId+1,})
			// ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{'type' : AcMayDayView.AID,'id' : boxRewardId});
			return
		}


		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTBOXREWARD,this.boxRewardNetResp,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTBOXREWARD,{activeId:this.vo.aidAndCode,gid:boxId+1});
	}
	//获得宝箱奖励
	private boxRewardNetResp(event: egret.Event): void 
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTBOXREWARD,this.boxRewardNetResp,this);
		if (event.data.data.ret == 0) {
			// this.refreshData();
			 let data = event.data.data.data;

			//  Api.servantVoApi.checkServantChangeRewards(data.cfrewards,data.rewards);
			 Api.wifeVoApi.checkWifeChangeRewards(data.cfrewards,data.rewards);
			//  SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
            //     ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
            //         "rewards":data.rewards,
            //         "otherRewards":null,
            //         "isPlayAni":true, 
            //         showTip:null,
            //         callback:null,
            //         target:this
            //     });
		} else {
			App.CommonUtil.showTip(event.data.data.ret);
		}
	}


    public tick(): boolean {

		let deltaT = this.vo.et - GameData.serverTime;
	
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
			return true;
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [LanguageManager.getlocal("acWifeSkinInheritReward_acCDEnd")]);
		}
		this._acCDTxt.x = GameConfig.stageWidth - 15 - this._acCDTxt.width;
		return false;
	}

	protected getSoundBgName():string
	{
		return "music_moonlightbg-1";
	}

    protected getTitleBgName():string
	{
		return this.getDefaultRes("acmoonlight_titlebg");
    }
	protected getTitleStr():string
	{
        return  null;
    }

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
			
			this.getDefaultRes("acmoonlight_bottom"),
			this.getDefaultRes("acmoonlight_box1"),
			this.getDefaultRes("acmoonlight_box2"),
			this.getDefaultRes("acmoonlight_box3"),
            this.getDefaultRes("acmoonlight_btnbg"),
			this.getDefaultRes("acmoonlight_btndetailbg"),
			this.getDefaultRes("acmoonlight_lookbtn"),
            this.getDefaultRes("acmoonlight_onebtn"),
			this.getDefaultRes("acmoonlight_onebtntext"),
			this.getDefaultRes("acmoonlight_progbg"),
			this.getDefaultRes("acmoonlight_progname"),
            this.getDefaultRes("acmoonlight_prognumbg"),
            this.getDefaultRes("acmoonlight_taskicon"),
            this.getDefaultRes("acmoonlight_tenbtn"),
            this.getDefaultRes("acmoonlight_tenbtntext"),
			this.getDefaultRes("acmoonlight_title"),
			this.getDefaultRes("acmoonlight_titlebg"),
            this.getDefaultRes("acmoonlight_topbg"),
			this.getDefaultRes("acmoonlight_red"),
			this.getDefaultRes("acmoonlight_baseeffect"),
			"collectflag",
			"acmoonlight_searchtext",
			"dailytask_box_light",
            "itemicon1",
            "acspringouting_taskname-1",
			"progress_type4_yellow",
            "progress_type4_bg",
		]);
	}



	public dispose(): void {
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MOONLIGHT_REFRESHVO,this.refreshData,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONLIGHTTASKREWARD,this.eventCollectHandlerCallBack,this);

		let drawNum = this.cfg.drawNum;
		for (var index = 0; index < drawNum.length; index++) {
			let boxImg = this.getChildByName("boxImg" + index);
            let lightImg =  this.getChildByName("lightImg"+ index);
			if(boxImg){
				egret.Tween.removeTweens(boxImg);
			}
			if(lightImg){
				egret.Tween.removeTweens(lightImg);
			}
            
        }
		this._activityTimerText = null;
		this._acCDTxt = null;
		this._bottomBg = null;
    	this._progress = null;
		this._boxList = [];
		this._isPlaying= false;
		this._rewards = null;
		this._acvo = undefined;
		this._bg = null;
		this._showNumText = null;
		this._fire = null;
		// this._isSingle = true;
		this._anim = null;
		this._taskBtn = null;
		super.dispose();
	}

}



