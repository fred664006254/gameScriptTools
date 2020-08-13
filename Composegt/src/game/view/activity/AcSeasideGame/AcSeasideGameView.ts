/**
 * author jiangliuyang
 */

class AcSeasideGameView extends AcCommonView{
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
	private _acvo:AcSeasideGameVo = undefined;
	private _bg: BaseLoadBitmap = null;
	private _powerText: BaseTextField = null;
	private _fire:BaseBitmap = null;
	private _isSingle:boolean = true;
	private _anim:CustomMovieClip = null;
	private _taskBtn:BaseButton = null;

	private _fireNumText:BaseTextField = null;
	private _bangzi:BaseBitmap = null;
	private _tempOldX = null;
	private _tempObj = null;
	private _animId = null;
	private _curHeadId = null;

	private _talkBg:BaseBitmap = null;
	private _talkTxt:BaseTextField = null;
	private _talkTimer:number = 0;
	private _talkBaseSec:number = 0;

	private get vo() : AcSeasideGameVo{
       	if(!this._acvo){
		    this._acvo =  <AcSeasideGameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	   	}
		return this._acvo;
    }
	private get cfg() : Config.AcCfg.SeasideGameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
	// protected getRuleParam():string[]{
	// 	return [String(this.cfg.cost),String(this.cfg.cost * 10)];
	// } 
	// protected getRequestData():{requestType:string,requestData:any}
	// {	
	// 	if(this.vo.isFirst()){
	// 		return {requestType:NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG,requestData:{
	// 			activeId : this.vo.aidAndCode,
	// 			flagkey:"seasideGame",
	// 			value:1
	// 		}};
	// 	} else {
	// 		return null;
	// 	}

    // }
	// protected receiveData(data:{ret:boolean,data:any}):void
	// {
	// }


	private showFirstDialog(){
        if(this.vo.isFirst()){
            
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.aid + "-" + this.code,flagkey:"seasideGame",value:1});
            ViewController.getInstance().openView(ViewConst.BASE.ACSEASIDEGAMEAVGVIEW,{

                idx : 1,
                buidId : "first",
                aid : this.aid,
                code : this.code
            });

        }
    }
	protected initView(): void {

		this.showFirstDialog();
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SEASIDEGAME_REFRESHVO,this.refreshData,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMETASKREWARD,this.eventCollectHandlerCallBack,this);

		let titleFont = BaseBitmap.create(this.getDefaultRes("acseasidegame_title"));
		titleFont.x = GameConfig.stageWidth / 2 - titleFont.width/2;
		titleFont.y = 10;
		this.addChild(titleFont);

		
		let topbg = BaseBitmap.create(this.getDefaultRes("acseasidegame_detailbg"));
   
        topbg.x = 0;
		topbg.y = 72;
        this.addChild(topbg);

		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 18,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = 15
		this._activityTimerText.y = topbg.y + 3;
		this._activityTimerText.text  = this.vo.getAcLocalTime(true);
		this.addChild(this._activityTimerText);

		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		let deltaT = this.vo.et - GameData.serverTime;
		this._acCDTxt = acCDTxt;

		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acseasidegameview_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acseasidegameview_acCD", [LanguageManager.getlocal("acseasidegameview_acCDEnd")]);
		}

		// acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
		acCDTxt.x = GameConfig.stageWidth - 15 - acCDTxt.width;
		acCDTxt.y = this._activityTimerText.y;
		this.addChild(acCDTxt);
		

		let ruleText = ComponentManager.getTextField("",18, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleText.width = GameConfig.stageWidth - 30;
		ruleText.multiline = true;
		ruleText.lineSpacing = 1;
		ruleText.x = 15
		ruleText.y = this._acCDTxt.y + this._acCDTxt.height + 1;
		ruleText.text = LanguageManager.getlocal(this.getDefaultCn("acseasidegameview_description"));
		this.addChild(ruleText);





		
		if(App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("wife_full3_"+ this.cfg.wifeSkinId + "_ske"))
        {
       
            let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones("wife_full3_"+ this.cfg.wifeSkinId);
            droWifeIcon.setScale(1)
            droWifeIcon.x = 120;
            droWifeIcon.y = GameConfig.stageHeigth - 30;
            this.addChild(droWifeIcon);
        }
        else
        {
            // wife 的 图片
            let scaleNum = 0.8;
            let wifeBM =  BaseLoadBitmap.create("wife_skin_"+ this.cfg.wifeSkinId);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(scaleNum);
            wifeBM.x = -100;
            wifeBM.y = GameConfig.stageHeigth - 840 * 0.8;
            this.addChild(wifeBM);
        }

		let bottomBg = BaseBitmap.create(this.getDefaultRes("acseasidegame_bottom"));
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
		this.addChild(bottomBg);
		this._bottomBg = bottomBg;

        //抽奖一次
		let oneBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,this.getDefaultCn("acseasidegameview_onebtntxt"),this.oneSendBtnHandler,this);
		oneBtn.x = GameConfig.stageWidth/4 - oneBtn.width/2;
		oneBtn.y = bottomBg.y + bottomBg.height/2 - oneBtn.height/2 + 15;
		this.addChild(oneBtn);

		let oneBtnText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acseasidegameview_btnnumtxt")),18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(oneBtnText);

		let oneBtnIcon = BaseBitmap.create(this.getDefaultRes("acseasidegame_item0"));
		this.addChild(oneBtnIcon);

		let oneBtnNum = ComponentManager.getTextField("x1",18, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.addChild(oneBtnNum);

		oneBtnText.x = oneBtn.x + oneBtn.width/2 - (oneBtnText.width + oneBtnIcon.width + oneBtnNum.width) /2;
		oneBtnText.y = oneBtn.y - 10 - oneBtnText.height;

		oneBtnIcon.x = oneBtnText.x + oneBtnText.width;
		oneBtnIcon.y = oneBtnText.y + oneBtnText.height/2 - oneBtnIcon.height/2;

		oneBtnNum.x = oneBtnIcon.x + oneBtnIcon.width;
		oneBtnNum.y = oneBtnText.y + oneBtnText.height/2 - oneBtnNum.height/2;




        //抽奖十次
		let tenBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,this.getDefaultCn("acseasidegameview_tenbtntxt"),this.tenSendBtnHandler,this);
		tenBtn.x = 3*GameConfig.stageWidth/4 - tenBtn.width/2;
		tenBtn.y = bottomBg.y + bottomBg.height/2 - tenBtn.height/2 + 15;
		this.addChild(tenBtn);

		let tenBtnText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acseasidegameview_btnnumtxt")),18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(tenBtnText);

		let tenBtnIcon = BaseBitmap.create(this.getDefaultRes("acseasidegame_item0"));
		this.addChild(tenBtnIcon);

		let tenBtnNum = ComponentManager.getTextField("x10",18, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.addChild(tenBtnNum);

		tenBtnText.x = tenBtn.x + tenBtn.width/2 - (tenBtnText.width + tenBtnIcon.width + tenBtnNum.width) /2;
		tenBtnText.y = tenBtn.y - 10 - tenBtnText.height;

		tenBtnIcon.x = tenBtnText.x + tenBtnText.width;
		tenBtnIcon.y = tenBtnText.y + tenBtnText.height/2 - tenBtnIcon.height/2;

		tenBtnNum.x = tenBtnIcon.x + tenBtnIcon.width;
		tenBtnNum.y = tenBtnText.y + tenBtnText.height/2 - tenBtnNum.height/2;

        //进度条
        this._progress = ComponentManager.getProgressBar("progress_type4_yellow","progress_type4_bg",530);
		this._progress.x = GameConfig.stageWidth/2-this._progress.width/2;
        this._progress.y = topbg.y + topbg.height + 26;
		this._progress.setPercentage(this.getProgressPercent());
        this.addChild(this._progress);

		//体力
		let powerBg = BaseBitmap.create(this.getDefaultRes("acseasidegame_needitembg"));
		powerBg.x = GameConfig.stageWidth - 10 - powerBg.width;
		powerBg.y = this._progress.y + 50;
		this.addChild(powerBg);


        // let shownum = this.vo.ainfo.score > maxDrawNum ? maxDrawNum :  this.vo.ainfo.score;
		let power = this.vo.binfo.coin;
        this._powerText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acseasidegameview_powertext"),[String(power)]),18,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._powerText.x = powerBg.x + 70;
		this._powerText.y = powerBg.y + powerBg.height/2 - this._powerText.height/2 +5;
		this.addChild(this._powerText);


        // 活动任务按钮
        let taskBtnBg :BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
        taskBtnBg.x = GameConfig.stageWidth - 15 - taskBtnBg.width;
        taskBtnBg.y = powerBg.y + powerBg.height + 5;//lookBtnBg.y + lookBtnBg.height+ 5;
        this.addChild(taskBtnBg);

        let taskBtn:BaseButton = ComponentManager.getButton(this.getDefaultRes("acseasidegame_taskicon"),"",this.taskBtnHandler,this);
        taskBtn.x = taskBtnBg.x + taskBtnBg.width/2 - taskBtn.width/2;
        taskBtn.y = taskBtnBg.y + taskBtnBg.height/2 - taskBtn.height/2;
        this.addChild(taskBtn); 
		this._taskBtn = taskBtn;

        let taskTxt = BaseBitmap.create("acspringouting_taskname-1");
		taskTxt.x = taskBtn.x + taskBtn.width/2 - taskTxt.width/2;
		taskTxt.y = taskBtnBg.y + taskBtnBg.height - taskTxt.height;
        this.addChild(taskTxt);


		let fire = BaseBitmap.create(this.getDefaultRes("acseasidegame_progbg"));
		fire.x = this._progress.x - fire.width/2;
		fire.y = this._progress.y + this._progress.height/2 - fire.height/2;
		this.addChild(fire);
		this._fire = fire;

		let fireText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acseasidegameview_firetxt")),20, TextFieldConst.COLOR_LIGHT_YELLOW);
        fireText.x = fire.x + fire.width/2 - fireText.width/2;
		fireText.y = fire.y + 20;
		this.addChild(fireText);

		let maxScore = this.cfg.scoreLimit;
		let score = this.vo.ainfo.score > maxScore ? maxScore : this.vo.ainfo.score;
		//进度
		this._fireNumText = ComponentManager.getTextField(String(score),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._fireNumText.x = fireText.x + fireText.width/2 - this._fireNumText.width/2;
		this._fireNumText.y = fireText.y + fireText.height;
		this.addChild(this._fireNumText);


		let drawNum = this.cfg.drawNum;
		let maxDrawNum = this.cfg.scoreLimit;


		for (let index = 0; index < drawNum.length; index++) {
			let tmprcfg = drawNum[index];
			// let perY = startY - (index+1) * perHeight;
           
			// 1->宝箱关闭 ,2->可以领取宝箱, 3->已经打开宝箱
			let rStatus = this.vo.getBoxStatusById(index);
			let imgres = this.getDefaultRes("acseasidegame_progres_box"+rStatus); 
			if(index == drawNum.length - 1){
				imgres = this.getDefaultRes("acseasidegame_box_"+rStatus);
			}
			
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
            


            let numTxtBg = BaseBitmap.create(this.getDefaultRes("acseasidegame_prognumbg"));
            numTxtBg.x = boxImg.x- numTxtBg.width/2;
            numTxtBg.y = boxImg.y + boxImg.height/2 +5;
			if(index == drawNum.length - 1){
				numTxtBg.x = boxImg.x- numTxtBg.width/2-10;
				numTxtBg.y = boxImg.y + boxImg.height/2 +5 - 13;
			}
            this.addChild(numTxtBg);

			let need = this.cfg.drawNum[index]["needNum"];
			let numTxt =  ComponentManager.getTextField(need.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			numTxt.x = numTxtBg.x + numTxtBg.width/2 - numTxt.width/2;
			numTxt.y = numTxtBg.y + numTxtBg.height/2 - numTxt.height/2;
			this.addChild(numTxt);
		}




		this.refreshData();

		this.createHead();
	
	}

	private createHead(){
		
		

		let offX = -30;
		let offY = 70;
		
		

		let head1 = BaseBitmap.create(this.getDefaultRes("acseasidegame_item1"));
		head1.name = "head1";
		head1.x = this._bg.x + 285 + offX;
		head1.y = this._bg.y + 502 + offY;
		this.addChild(head1);

		let head2 = BaseBitmap.create(this.getDefaultRes("acseasidegame_item2"));
		head2.name = "head2";
		head2.x = this._bg.x + 509 + offX;
		head2.y = this._bg.y + 478 + offY;
		this.addChild(head2);

		let head3 = BaseBitmap.create(this.getDefaultRes("acseasidegame_item3"));
		head3.name = "head3";
		head3.x = this._bg.x + 347 + offX;
		head3.y = this._bg.y + 689 + offY;
		this.addChild(head3);

		let head4 = BaseBitmap.create(this.getDefaultRes("acseasidegame_item4"));
		head4.name = "head4";
		head4.x = this._bg.x + 509 + offX;
		head4.y = this._bg.y + 671 + offY;
		this.addChild(head4);

		let head5 = BaseBitmap.create(this.getDefaultRes("acseasidegame_item5"));
		head5.name = "head5";
		head5.x = this._bg.x + 402 +20 + offX;
		head5.y = this._bg.y + 574 +20 + offY;
		this.addChild(head5);

		let headb1 = BaseBitmap.create(this.getDefaultRes("acseasidegame_itemb1"));
		headb1.name = "headb1";
		headb1.x = this._bg.x + 285 + offX;
		headb1.y = this._bg.y + 502 + offY;
		this.addChild(headb1);

		let headb2 = BaseBitmap.create(this.getDefaultRes("acseasidegame_itemb2"));
		headb2.name = "headb2";
		headb2.x = this._bg.x + 509 + offX;
		headb2.y = this._bg.y + 478 + offY;
		this.addChild(headb2);

		let headb3 = BaseBitmap.create(this.getDefaultRes("acseasidegame_itemb3"));
		headb3.name = "headb3";
		headb3.x = this._bg.x + 347 + offX;
		headb3.y = this._bg.y + 689 + offY;
		this.addChild(headb3);

		let headb4 = BaseBitmap.create(this.getDefaultRes("acseasidegame_itemb4"));
		headb4.name = "headb4";
		headb4.x = this._bg.x + 509 + offX;
		headb4.y = this._bg.y + 671 + offY;
		this.addChild(headb4);

		let headb5 = BaseBitmap.create(this.getDefaultRes("acseasidegame_itemb5"));
		headb5.name = "headb5";
		headb5.x = this._bg.x + 402+20 + offX;
		headb5.y = this._bg.y + 574+20 + offY;
		this.addChild(headb5);

		headb1.visible = false;
		headb2.visible = false;
		headb3.visible = false;
		headb4.visible = false;
		headb5.visible = false;

		this._bangzi = BaseBitmap.create(this.getDefaultRes("acseasidegame_useitem"));
		this._bangzi.anchorOffsetX = 121;
		this._bangzi.anchorOffsetY = 121;
		this._bangzi.x = 0;
		this._bangzi.y = 0;
		this._bangzi.visible = false;
		this.addChild(this._bangzi);

		this._talkTxt = ComponentManager.getTextField("",18,TextFieldConst.COLOR_LIGHT_YELLOW);
		
		this._talkBg = BaseBitmap.create("acseasidegame_talkbg");
		this.addChild(this._talkBg);
		this.addChild(this._talkTxt);

		this._talkBg.visible = false;
		this._talkTxt.visible = false;


	}
	private startTalk(){
		if(this._isPlaying){
			return;
		}
		let personId = Math.floor(Math.random() * 4) + 1;
		let talkId = Math.floor(Math.random() * 5) + 1;
		let head = this.getChildByName("head"+personId);

		if(!this._talkBg){
			return;
		}
		egret.Tween.removeTweens(this._talkBg);
		egret.Tween.get(this._talkBg)
		.call(()=>{
			this._bangzi.visible = true;
			this._bangzi.rotation = 0;
			this._bangzi.x = head.x + 145;
			this._bangzi.y = head.y + 80;


			this._talkTxt.text = LanguageManager.getlocal(this.getDefaultCn("acSeasideGameCommonTalk"+talkId));
			this._talkTxt.width = 234;//162 + 18 * 4;
			this._talkTxt.x = head.x - this._talkTxt.width + 30;
			this._talkTxt.y = head.y - this._talkTxt.height;

			this._talkBg.height = this._talkTxt.height + 35;
			this._talkBg.width = this._talkTxt.width + 25;
			this._talkBg.x = this._talkTxt.x + this._talkTxt.width/2 - this._talkBg.width/2;
			this._talkBg.y = this._talkTxt.y + this._talkTxt.height/2 - this._talkBg.height/2 + 8;
			this._talkBg.visible = true;
			this._talkTxt.visible = true;
		})
		.wait(2000)
		.call(()=>{
			this._talkBg.visible = false;
			this._talkTxt.visible = false;			
		})

	}
	private startHitTalk(){

		if(this._animId == 5){
			return;
		}
		let talkId = Math.floor(Math.random() * 5) + 1;
		// let head = this.getChildByName("head"+personId);
		let head = this.getChildByName("head"+this._animId);
		if(!this._talkBg){
			return;
		}
		egret.Tween.removeTweens(this._talkBg);
		egret.Tween.get(this._talkBg)
		.call(()=>{
			this._talkTxt.text = LanguageManager.getlocal(this.getDefaultCn("acSeasideGameHitTalk"+talkId));
			this._talkTxt.x = head.x - this._talkTxt.width + 30;
			this._talkTxt.y = head.y - this._talkTxt.height;

			this._talkBg.width = this._talkTxt.width + 40;
			this._talkBg.x = this._talkTxt.x + this._talkTxt.width/2 - this._talkBg.width/2;
			this._talkBg.y = this._talkTxt.y + this._talkTxt.height/2 - this._talkBg.height/2 + 5;
			this._talkBg.visible = true;
			this._talkTxt.visible = true;
		})
		.wait(1000)
		.call(()=>{
			this._talkBg.visible = false;
			this._talkTxt.visible = false;			
		})

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
		
				// Api.servantVoApi.checkServantChangeRewards( data.cfrewards, data.rewards);
				
				SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                    "rewards":data.rewards,
                    "otherRewards":null,
                    "isPlayAni":true, 
                    showTip:null,
                    callback:null,
                    target:this
                });
			}
		}
		

    }
	private playAnim(){
		this._isPlaying = true;
		this._talkBg.visible = false;
		this._talkTxt.visible = false;
		let turnIndex = 6 + Math.floor(Math.random() * 2);
		let turnTime = turnIndex * 150;


		this._tempObj = {x:0};
		this._tempOldX = 0;

		let randList = [];
		for(let i = 1;i<=5;i++){
			// if(this._curHeadId != i){
				randList.push(i);
			// }
		}
		let curIndex = Math.floor(Math.random() * 5);
		let curId = randList[curIndex];
		let head = this.getChildByName("head"+curId);

		this._bangzi.rotation = 0;
		this._bangzi.visible=true;
		this._bangzi.x = head.x + 145;
		this._bangzi.y = head.y + 80;
		this._curHeadId = curId;
		
		egret.Tween.get(this._tempObj,{onChange:()=>{
		
			if(Math.floor(this._tempObj.x) != this._tempOldX){
				this._tempOldX = Math.floor(this._tempObj.x);
				let randList = [];
				for(let i = 1;i<=5;i++){
					if(this._curHeadId != i){
						randList.push(i);
					}
				}

				let curIndex = Math.floor(Math.random() * 4);
				let curId = randList[curIndex];


				let head = this.getChildByName("head"+curId);
				this._bangzi.x = head.x + 145;
				this._bangzi.y = head.y + 80;
				this._curHeadId = curId;
			}

		}})
		.to({x:turnIndex},turnTime,egret.Ease.sineOut)//.to({x:turnIndex},turnTime,egret.Ease.quadOut)
		.wait(200)
		.call(this.overAnim,this);

		
	}
	private overAnim(){

		
		if(this._animId != this._curHeadId){
			let lastHead = this.getChildByName("head"+this._animId);
			this._bangzi.x = lastHead.x + 145;
			this._bangzi.y = lastHead.y + 80;
			egret.Tween.get(this._bangzi)
			.wait(300)
			.call(this.breakHead,this);
		} else {
			this.breakHead();

			// let lastList = [];
			// for(let i = 1;i<=5;i++){
			// 	if(i != this._animId && i != this._curHeadId){
			// 		lastList.push(i);
			// 	}
			// }

			// let cId = Math.floor(Math.random() * 3);
			// let tlastHeadId = lastList[cId];
			// let tlastHead = this.getChildByName("head"+tlastHeadId);
			// this._bangzi.x = tlastHead.x + 145;
			// this._bangzi.y = tlastHead.y + 80;
			// let lastHead = this.getChildByName("head"+this._animId);
			// egret.Tween.get(this._bangzi)
			// .wait(300)
			// .set({x:lastHead.x + 145,y:lastHead.y+80})
			// .wait(400)
			// .call(this.breakHead,this);
			


		}
	}
	private breakHead(){

		egret.Tween.get(this._bangzi)
		.to({rotation:-30},150)
		.call(()=>{
			this.startHitTalk();
			this._bangzi.visible = false;
			let head = this.getChildByName("head"+this._animId);
			let headb = this.getChildByName("headb"+this._animId);
			head.visible = false;
			headb.visible = true;
		})
		.wait(500)
		.call(()=>{
			let head = this.getChildByName("head"+this._animId);
			let headb = this.getChildByName("headb"+this._animId);
			head.visible = true;
			headb.visible = false;
			this._isPlaying = false;
			this.recallAniBack();
		})

	}
	private refreshData()
	{
		// this._fireNumText = ComponentManager.getTextField(String(this.vo.ainfo.score)
		let maxScore = this.cfg.scoreLimit;
		let score = this.vo.ainfo.score > maxScore ? maxScore : this.vo.ainfo.score;
		this._fireNumText.text = String(score);
		this._fireNumText.x = this._fire.x + this._fire.width/2 - this._fireNumText.width/2;


		let power = this.vo.binfo.coin;
		this._powerText.text = LanguageManager.getlocal(this.getDefaultCn("acseasidegameview_powertext"),[String(power)]);



		

		// let maxDrawNum = this.cfg.drawNum[this.cfg.drawNum.length-1]["needNum"];
		// let shownum = this.vo.ainfo.score > maxDrawNum ? maxDrawNum :  this.vo.ainfo.score;
		// this._showNumText.text = LanguageManager.getlocal(this.getDefaultCn("acMoonlight_moonvalue"),[String(shownum)]);


		// let scene = this.cfg.drawNum;
		// let num = this.vo.ainfo.score;

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
			// let imgres = this.getDefaultRes("acmoonlight_box"+rStatus);
			let imgres = this.getDefaultRes("acseasidegame_progres_box"+rStatus); 
			if(index == fireNum.length - 1){
				imgres = this.getDefaultRes("acseasidegame_box_"+rStatus);
			}
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
/*
		*/
	}

	private getProgressPercent():number
	{
		let drawNum = this.cfg.drawNum;
		// let maxDrawNum = this.cfg.drawNum[this.cfg.drawNum.length-1]["needNum"];
		let maxDrawNum = this.cfg.scoreLimit;
		if(this.vo.ainfo.score > maxDrawNum){
			return 1;
		} else {
			return this.vo.ainfo.score / maxDrawNum;
		}
	}

    private taskBtnHandler():void
    {
        ViewController.getInstance().openView(ViewConst.POPUP.ACSEASIDEGAMETASKPOPUPVIEW,{aid:this.aid,code:this.code});
 
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
		
		if(this.vo.binfo.coin < 1){
			App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultRes("acseasidegameview_powernotenough")));
			return;
		} 	
		this.confirmOneCallbackHandler();
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
		if(this.vo.binfo.coin <10)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultRes("acseasidegameview_powernotenough")));
			return;
		}
		
		this.confirmTenCallbackHandler();
		/*
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
		*/


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
		this._isSingle = true;
		// SoundManager.playEffect(SoundConst.EFFECT_DOUBLESEVEN3_CLICKBTN);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMEREWARD,this.sendReward,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMEREWARD,{activeId:this.vo.aidAndCode,gid:1});
	}
	private confirmTenCallbackHandler()
	{
		this._isSingle = false;
		// SoundManager.playEffect(SoundConst.EFFECT_DOUBLESEVEN3_CLICKBTN);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMEREWARD,this.sendReward,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMEREWARD,{activeId:this.vo.aidAndCode,gid:10});
	}
	protected initBg():void
	{


		this._bg = BaseLoadBitmap.create(this.getDefaultRes("acseasidegame_bg"));
		this._bg.width = 640;
		this._bg.height = 1136;
		this._bg.x = 0;
		this._bg.y = GameConfig.stageHeigth - 1136;//GameConfig.stageHeigth / 2 - this._bg.height/2;
		this.addChild(this._bg);
	}


	private sendReward(event: egret.Event): void 
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMEREWARD,this.sendReward,this);
		
		if (event.data.data.ret < 5) {
		
			let rewards = event.data.data.data.rewards;
			this._rewards = rewards;

			// this._addScore = event.data.data.data.addscore;
			// _animId
			

			if(this._isSingle){

				let rewardArr:RewardItemVo[] = GameData.formatRewardItem(rewards);
				let rewardId = rewardArr[0].id;
			
				for(let key in this.cfg.itemPlace){
					if(this.cfg.itemPlace[key]["itemID"] == rewardId){
						this._animId = Number(key) + 1;
						break;
					}
				}

				this.playAnim();

			} else {
				this.recallAniBack();
			}


			// SoundManager.playEffect(SoundConst.EFFECT_MOONLIGHT_ANIM);
			// this._anim.playWithTime(1);
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
		this._isSingle = true;
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
			ViewController.getInstance().openView(ViewConst.POPUP.ACSEASIDEGAMEREWARDPOPUPVIEW,{aid:this.aid,code:this.code,boxid:boxId+1});
			// ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{'type' : AcMayDayView.AID,'id' : boxRewardId});

			return;
		}
		

		//已领取
		if(this.vo.ainfo.stageinfo[boxId+1]){
			ViewController.getInstance().openView(ViewConst.POPUP.ACSEASIDEGAMEREWARDPOPUPVIEW,{aid:this.aid,code:this.code,boxid:boxId+1,})
			// ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{'type' : AcMayDayView.AID,'id' : boxRewardId});
			return
		}


		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMEBOXREWARD,this.boxRewardNetResp,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMEBOXREWARD,{activeId:this.vo.aidAndCode,gid:boxId+1});
	}
	//获得宝箱奖励
	private boxRewardNetResp(event: egret.Event): void 
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMEBOXREWARD,this.boxRewardNetResp,this);
		if (event.data.data.ret == 0) {
			// this.refreshData();
			 let data = event.data.data.data;

			//  Api.servantVoApi.checkServantChangeRewards(data.cfrewards,data.rewards);
			//  Api.wifeVoApi.checkWifeChangeRewards(data.cfrewards,data.rewards);
			 SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
                    "rewards":data.rewards,
                    "otherRewards":null,
                    "isPlayAni":true, 
                    showTip:null,
                    callback:null,
                    target:this
                });
		} else {
			App.CommonUtil.showTip(event.data.data.ret);
		}
	}


    public tick(): boolean {
		//_talkTimer _talkBaseSec
		if(this._talkBaseSec == 0){
			let sec = Math.floor(Math.random() * 1)+3;
			this._talkBaseSec = sec;
			this._talkTimer = 0;
			
		} else {
			this._talkTimer ++;
			if(this._talkTimer >= this._talkBaseSec){
				this.startTalk();
				this._talkTimer = 0;
				this._talkBaseSec = 0;
			}
		}



		let deltaT = this.vo.et - GameData.serverTime;
		if(this._acCDTxt){
			if (deltaT > 0) {
				this._acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
				return true;
			} else {
				this._acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [LanguageManager.getlocal("acWifeSkinInheritReward_acCDEnd")]);
				this._acCDTxt.x = GameConfig.stageWidth - 15 - this._acCDTxt.width;
				return false;
			}
		}

	}

	// protected getSoundBgName():string
	// {
	// 	return "music_moonlightbg-1";
	// }

    protected getTitleBgName():string
	{
		return this.getDefaultRes("acseasidegame_titlebg");
    }
	protected getTitleStr():string
	{
        return  null;
    }

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
			

			this.getDefaultRes("acseasidegame_bottom"),
			this.getDefaultRes("acseasidegame_box_1"),
			this.getDefaultRes("acseasidegame_box_2"),
			this.getDefaultRes("acseasidegame_box_3"),
			this.getDefaultRes("acseasidegame_detailbg"),
			this.getDefaultRes("acseasidegame_item0"),
			this.getDefaultRes("acseasidegame_item1"),
			this.getDefaultRes("acseasidegame_item2"),
			this.getDefaultRes("acseasidegame_item3"),
			this.getDefaultRes("acseasidegame_item4"),
			this.getDefaultRes("acseasidegame_item5"),
			this.getDefaultRes("acseasidegame_itemb1"),
			this.getDefaultRes("acseasidegame_itemb2"),
			this.getDefaultRes("acseasidegame_itemb3"),
			this.getDefaultRes("acseasidegame_itemb4"),
			this.getDefaultRes("acseasidegame_itemb5"),

			this.getDefaultRes("acseasidegame_needitembg"),
			this.getDefaultRes("acseasidegame_progbg"),
			this.getDefaultRes("acseasidegame_prognumbg"),
			this.getDefaultRes("acseasidegame_progres_box1"),
			this.getDefaultRes("acseasidegame_progres_box2"),
			this.getDefaultRes("acseasidegame_progres_box3"),
			this.getDefaultRes("acseasidegame_title"),
			this.getDefaultRes("acseasidegame_titlebg"),
			this.getDefaultRes("acseasidegame_useitem"),
			this.getDefaultRes("acseasidegame_taskicon"),
	
			"acseasidegame_red-1",
			"collectflag",
		
			"dailytask_box_light",
 
            "acspringouting_taskname-1",
			"progress_type4_yellow",
            "progress_type4_bg",
			"acseasidegame_talkbg"
		]);
	}

	public hide(){
		if(this._isPlaying){
			return;
		}
		super.hide();
	}

	public dispose(): void {
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SEASIDEGAME_REFRESHVO,this.refreshData,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETSEASIDEGAMETASKREWARD,this.eventCollectHandlerCallBack,this);

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
		this._powerText = null;
		this._fire = null;
		this._isSingle = true;
		this._anim = null;
		this._taskBtn = null;

		this._fireNumText = null;
		if(this._bangzi){
			egret.Tween.removeTweens(this._bangzi);
		}
		this._bangzi = null;
		this._tempOldX = null;
		this._tempObj = null;
		this._animId = null;
		this._curHeadId = null;

		if(this._talkBg){
			egret.Tween.removeTweens(this._talkBg);
		}
		this._talkBg = null;
		this._talkTxt = null;
		this._talkTimer = 0;
		this._talkBaseSec = 0;
		super.dispose();
	}

}



