/**
 * author yanyuling
 */
// class AcWifeSkinInheritView extends CommonView {
class AcWifeSkinInheritView extends AcCommonView{
	public constructor() {
		super();
	}

	private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _bottomBg: BaseBitmap = null;
	private _countText: BaseTextField = null;
	private _countdetailText: BaseTextField = null;
	private _sendBtn: BaseButton = null;
	private _sendText: BaseBitmap = null;
	    //底部进度条
    private _progress : ProgressBar = null;
	private _boxList:BaseBitmap[] = [];
	private _isPlaying: Boolean = false;
	private _isSingle:Boolean = true;
	private _rewards: any = null;

	
	private _acvo:AcWifeSkinInheritVo = undefined;

	private _btnAnim:CustomMovieClip = null;
	private _bg: BaseLoadBitmap = null;
	private _talkArrow:BaseBitmap = null;
	private _talkBg: BaseBitmap = null;
	private _talkText: BaseTextField = null;
	private _showNumText: BaseTextField = null;

	private _fire:BaseBitmap = null;
	// private aid:string;
	// private code:string;
	private get vo() : AcWifeSkinInheritVo{
       	if(!this._acvo){
		    this._acvo =  <AcWifeSkinInheritVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	   	}
		return this._acvo;
    }
	private get cfg() : Config.AcCfg.WifeSkinInheritCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
	protected getRuleParam():string[]{
		return [""+this.vo.cfg.cost];
	} 

	protected initView(): void {



		// App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFESKININHERIT_RECALL_ANI_END,this.recallAniBack,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_WIFESKININHERIT_RECALL_NUM_REFRESH,this.refreshData,this);
       



		let titleFont = BaseBitmap.create(this.getDefaultRes("acwifeskininherit_title"));
		titleFont.x = GameConfig.stageWidth / 2 - titleFont.width/2;
		titleFont.y = 10;
		this.addChild(titleFont);

		// this.getDefaultRes("acwifeskininherit_infobg")
		let topbg = BaseLoadBitmap.create(this.getDefaultRes("acwifeskininherit_infobg"));
        topbg.width =640;
        topbg.height =134;
        topbg.x = 0;
		topbg.y = 72;
        this.addChild(topbg);

		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 18,0x42df1b);
		this._activityTimerText.x = 15
		this._activityTimerText.y = topbg.y + 5;
		this._activityTimerText.text  = this.vo.getAcLocalTime(true);
		this.addChild(this._activityTimerText);

		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		let deltaT = this.vo.et - GameData.serverTime;
		this._acCDTxt = acCDTxt;

		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [LanguageManager.getlocal("acWifeSkinInheritReward_acCDEnd")]);
		}

		// acCDTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_acCD", [App.DateUtil.getFormatBySecond(deltaT, 3)]);
		acCDTxt.x = GameConfig.stageWidth - 15 - acCDTxt.width;
		acCDTxt.y = this._activityTimerText.y;
		this.addChild(acCDTxt);
		

		let ruleText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGem().toString(),18, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleText.width = GameConfig.stageWidth - 30;
		ruleText.multiline = true;
		ruleText.lineSpacing = 2;
		ruleText.x = 15
		ruleText.y = this._acCDTxt.y + this._acCDTxt.height + 5;
		ruleText.text = LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInheritView_description"),[""+this.vo.cfg.cost]);
		this.addChild(ruleText);

		let bottomBg = BaseBitmap.create(this.getDefaultRes("acwifeskininherit_bottom"));
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
		this.addChild(bottomBg);
		this._bottomBg = bottomBg;


		
		if(App.CommonUtil.check_dragon())
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

		let bottomcenter = BaseBitmap.create(this.getDefaultRes("acwifeskininherit_bottomcenter"));
		bottomcenter.x = GameConfig.stageWidth/2 - bottomcenter.width/2;
		bottomcenter.y = bottomBg.y + bottomBg.height/2 - bottomcenter.height/2;
		this.addChild(bottomcenter);
  
		this._countText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInherit_count"),[String(this.vo.lotterynum)]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._countText.x = 420;//GameConfig.stageWidth - 50 - this._countText.width;
		this._countText.y = bottomBg.y + 35;
		this.addChild(this._countText);

		let countdetailText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInherit_countdetail"),[String(this.cfg.cost - this.vo.chargenum % this.cfg.cost)]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		countdetailText.x = this._countText.x;
		countdetailText.y = this._countText.y + this._countText.height + 7;
		countdetailText.width = 210;
		this.addChild(countdetailText);
		this._countdetailText = countdetailText;

		this._sendBtn = ComponentManager.getButton(this.getDefaultRes("acwifeskininherit_button"),null,this.sendBtnHandler,this);
		this._sendBtn.x = GameConfig.stageWidth/2 - this._sendBtn.width/2;
		this._sendBtn.y = bottomBg.y + bottomBg.height / 2 - this._sendBtn.height/2+8;
		this.addChild(this._sendBtn);
   
		let sendTextRes = "";
		if(this.vo.lotterynum >= 10){
			sendTextRes = this.getDefaultRes("acwifeskininherit_batchsend");
		} else {
			sendTextRes = this.getDefaultRes("acwifeskininherit_send");
		}
		this._sendText = BaseBitmap.create(sendTextRes);
		this._sendText.x = GameConfig.stageWidth/2 - this._sendText.width/2;
		this._sendText.y = this._bottomBg.y + 95;
		this.addChild(this._sendText);



		// 充值
        let rechargeBtn:BaseButton = ComponentManager.getButton("ac_luckbag-1_icon","",this.rechargeClick,this);
        rechargeBtn.x = GameConfig.stageWidth - 20 - rechargeBtn.width;
        rechargeBtn.y = bottomBg.y - rechargeBtn.height + 10;
        this.addChild(rechargeBtn);        
        let rechargeTxt = BaseBitmap.create("acwifeskininherit_chargetxt");
		rechargeTxt.x = rechargeBtn.x + rechargeBtn.width/2 - rechargeTxt.width/2;
		rechargeTxt.y = rechargeBtn.y + 50;
        this.addChild(rechargeTxt);


		        //进度条
        
        this._progress = ComponentManager.getProgressBar("dailytask_dt_02","dailytask_dt_01",450);
		this._progress.x = GameConfig.stageWidth/2-this._progress.width/2;
        this._progress.y = topbg.y + topbg.height + 35;
		this._progress.setPercentage(this.getProgressPercent());
        this.addChild(this._progress);

		let fire = BaseBitmap.create(this.getDefaultRes("acwifeskininherit_progresst"));
		fire.x = this._progress.x - fire.width/2;
		fire.y = this._progress.y + this._progress.height/2 - fire.height/2;
		this.addChild(fire);
		this._fire = fire;
	

		let fireNum = this.cfg.FireNum;
		let maxFireNum = this.cfg.FireNum[this.cfg.FireNum.length-1]["needNum"];

		let shownum = this.vo.lotterysnum > maxFireNum ? maxFireNum :  this.vo.lotterysnum;
		this._showNumText = ComponentManager.getTextField(LanguageManager.getlocal("acWifeSkinInheritViewShowNum",[String(shownum)]),18,TextFieldConst.COLOR_WHITE);
		this._showNumText.x = fire.x + fire.width/2 - this._showNumText.width/2;
		this._showNumText.y = fire.y + fire.height + 2;

		this.addChild(this._showNumText);

		for (let index = 0; index < fireNum.length; index++) {
			let tmprcfg = fireNum[index];
			// let perY = startY - (index+1) * perHeight;
           
			// 1->宝箱关闭 ,2->可以领取宝箱, 3->已经打开宝箱
			let rStatus = this.vo.getBoxStatusById(index);
			let imgres = this.getDefaultRes("acwifeskininherit_box"+rStatus);
			
			let boxImg = BaseBitmap.create(imgres);
			boxImg.anchorOffsetX = boxImg.width/2;
			boxImg.anchorOffsetY = boxImg.height/2;
			boxImg.name = "boxImg"+index;
			boxImg.x = this._progress.x + this.cfg.FireNum[String(index)]["needNum"]/maxFireNum * this._progress.width;
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
            
			let need = this.cfg.FireNum[index]["needNum"];
			let numTxt =  ComponentManager.getTextField(need.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
			numTxt.x = boxImg.x-numTxt.width/2;
			numTxt.y = boxImg.y + boxImg.height/2 +5;
			this.addChild(numTxt);
		}
		this.refreshData();
		this.showFirstDialog();

		TimerManager.doTimer(10000,0,this.showTalk,this);

		// this.showTalk();
	}

	private refreshData()
	{
		this._countdetailText.text = LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInherit_countdetail"),[String(this.cfg.cost - this.vo.chargenum % this.cfg.cost)]);

		let maxFireNum = this.cfg.FireNum[this.cfg.FireNum.length-1]["needNum"];
		let shownum = this.vo.lotterysnum > maxFireNum ? maxFireNum :  this.vo.lotterysnum;
		this._showNumText.text = LanguageManager.getlocal("acWifeSkinInheritViewShowNum",[String(shownum)]);
		this._showNumText.x = this._fire.x + this._fire.width/2 - this._showNumText.width/2;

		let scene = this.cfg.FireNum;
		let num = this.vo.lotterysnum;
		let sceneId = 0;
		for(let i = 0; i < scene.length;i++){
			if(scene[i]["needNum"] > num){
				sceneId = i+1;
				break;
			}
		}
		if(sceneId == 0){
			sceneId = scene.length + 1;
		}

		this._bg.setload(this.getDefaultRes("acwifeskininherit_bg"+sceneId));




		this._countText.text = LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInherit_count"),[String(this.vo.lotterynum)]);
		this._progress.setPercentage(this.getProgressPercent());
		let fireNum = this.cfg.FireNum;
		for (var index = 0; index < fireNum.length; index++) {
			
			let rStatus = this.vo.getBoxStatusById(index);
			let imgres = this.getDefaultRes("acwifeskininherit_box"+rStatus);
			let boxImg = this.getChildByName("boxImg"+index);
			let lightImg =  this.getChildByName("lightImg"+ index);
			if (boxImg instanceof(BaseBitmap))
			{
				boxImg.texture = ResourceManager.getRes(imgres);
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

		let sendTextRes = "";
		if(this.vo.lotterynum >= 10){
			sendTextRes = this.getDefaultRes("acwifeskininherit_batchsend");
		} else {
			sendTextRes = this.getDefaultRes("acwifeskininherit_send");
		}
		this._sendText.texture = ResourceManager.getRes(sendTextRes);
		this._sendText.x = GameConfig.stageWidth/2 - this._sendText.width/2;
	}

	private getProgressPercent():number
	{
		if(this.vo.lotterysnum > this.cfg.wifeSkinInheritItemNum){
			return 1;
		} else {
			return this.vo.lotterysnum / this.cfg.wifeSkinInheritItemNum;
		}
	}
	private sendBtnHandler():void
	{
		if(this._isPlaying){
			return;
		}
		if(!this.vo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		if(this.vo.lotterynum <= 0){		
			let message = LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInheritReward_sendTip1"),[""+this.vo.cfg.cost]);
			
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
				msg:message,
				callback:()=>{
					ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
				},
				handler:this,
				needCancel:true
			});
			return;
		}
		this._isPlaying = true;
		if(this.vo.lotterynum>=10){
			this._isSingle = false;
		} else {
			this._isSingle = true;
		}
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINREWARD,this.sendReward,this);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINREWARD,{activeId:this.vo.aidAndCode,});
	}
	protected initBg():void
	{
		// let bgName:string=this.getDefaultRes("acwifeskininherit_bg1");
		// if(bgName)
		// {
		// 	this.viewBg = BaseLoadBitmap.create(bgName);

		// 	if(this.isTouchMaskClose())
		// 	{
		// 		this.viewBg.touchEnabled=true;
		// 	}
		// 	this.viewBg.width = 640;
		// 	this.viewBg.height = 1136;
		// 	this.addChild(this.viewBg);
		// }

		this._bg = BaseLoadBitmap.create("");
		this._bg.width = 640;
		this._bg.height = 1136;
		this._bg.x = 0;
		this._bg.y = GameConfig.stageHeigth / 2 - this._bg.height/2;
		this.addChild(this._bg);
	}


	private sendReward(event: egret.Event): void 
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINREWARD,this.sendReward,this);
		
		if (event.data.data.ret < 5) {
			// ViewController.getInstance().openView("AcFanliRecallView");
			let rewards = event.data.data.data.rewards;
			this._rewards = rewards;
			// let rewardList = GameData.formatRewardItem(rewards);

			if(this._isSingle){
				if(!this._btnAnim){
					this._btnAnim = ComponentManager.getCustomMovieClip(this.getDefaultRes("acwifeskininherit_btnanim"),6,70);
					this._btnAnim.x = GameConfig.stageWidth/2 - 300/2;
					this._btnAnim.y = this._bottomBg.y + this._bottomBg.height / 2 + 8 -150;
					this.addChild(this._btnAnim);
					this._btnAnim.blendMode = egret.BlendMode.ADD; 
					this._btnAnim.setEndCallBack(()=>{
						SoundManager.playEffect(SoundConst.EFFECT_DOUBLESEVEN3_CLICKBTN);
						egret.Tween.get(this._sendBtn)
						.to({x:450,y:GameConfig.stageHeigth/2,scaleX:0.5,scaleY:0.5},1000)
						.to({alpha:0},300)
						.call(this.recallAniBack,this)
						.set({x:GameConfig.stageWidth/2 - this._sendBtn.width/2,y:this._bottomBg.y + this._bottomBg.height / 2 - this._sendBtn.height/2+8,alpha:1,scaleX:1,scaleY:1})
					},this);
				}


				this._btnAnim.playWithTime(1);


			} else {
				this.recallAniBack(true);
			}
			this._isSingle = true;
		}
	}
	private recallAniBack(isNotCheck:boolean)
	{
		this._isPlaying = false;
		let check = null;
		if(!isNotCheck){
			check = this.checkStory;
		}
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
	private checkStory(){
		let fireNum = this.cfg.FireNum;
		let num = this.vo.lotterysnum;
		let id = 0;
		for(let i = 0; i < fireNum.length; i++){
			if(fireNum[i]["needNum"] == num){
				id = i+1;
				break;
			}

		}
		if(id > 0){
			this.showDialog(id);
		}

		
	}
	private showTalk(){
		if(!this._talkArrow){
			this._talkArrow = BaseBitmap.create(this.getDefaultRes("acwifeskininherit_talkarrow"));
			this._talkArrow.x = 220;
			this._talkArrow.y = this._bottomBg.y - 440;
			this.addChild(this._talkArrow);
			
		}
		if(!this._talkBg){
			this._talkBg = BaseBitmap.create(this.getDefaultRes("acwifeskininherit_talkbg"));
			this._talkBg.width = 270;
			this.addChild(this._talkBg);
		}
		if(!this._talkText){
			this._talkText = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
			this._talkText.width = 240;
			this.addChild(this._talkText);
		}
		this._talkArrow.alpha = 0;
		this._talkBg.alpha = 0;
		this._talkText.alpha = 0;

		let talkId = Math.floor(Math.random() * 3) + 1;
		this._talkText.text = LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInheritViewDialog"+talkId));


		// this._talkText.x = this._talkArrow.x - 15;
		// this._talkText.y = this._talkArrow.y - 5 - this._talkText.height;

		this._talkBg.width = this._talkText.width +40;
		this._talkBg.height = this._talkText.height + 10;
		this._talkBg.x = this._talkArrow.x - 20;//+ this._talkText.width/2- this._talkBg.width/2;
		this._talkBg.y = this._talkArrow.y - this._talkBg.height;//+ this._talkText.height/2 - this._talkBg.height/2;

		this._talkText.x = this._talkBg.x + this._talkBg.width/2 - this._talkText.width/2;
		this._talkText.y = this._talkBg.y + this._talkBg.height/2 - this._talkText.height/2;

		egret.Tween.get(this._talkArrow)
		.to({alpha:1},500)
		.wait(5000)
		.to({alpha:0},500);

		egret.Tween.get(this._talkText)
		.to({alpha:1},500)
		.wait(5000)
		.to({alpha:0},500);

		egret.Tween.get(this._talkBg)
		.to({alpha:1},500)
		.wait(5000)
		.to({alpha:0},500);

		
	}
    private showFirstDialog(){
        if(!this.vo.getFirstOpen()){
            
           
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.aid + "-" + this.code,flagkey:"firstOpen",value:1});
            ViewController.getInstance().openView(ViewConst.BASE.ACWIFESKININHERITAVGVIEW,{

                idx : 1,
                buidId : "first",
                aid : this.aid,
                code : this.code
            });

        }
    }		
    private showDialog(index) {
       
        if(this.vo.getAvgConfig(index, this.code)){
            ViewController.getInstance().openView(ViewConst.BASE.ACWIFESKININHERITAVGVIEW,{
 
                idx : 1,
                buidId : index,
                aid : this.aid,
                code : this.code
            });
        }
    }
	
	private getBoxReward(event:any,boxId:number)
	{
		if(!this.vo.isStart ){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
		let lotterysnum = this.vo.lotterysnum;
		let cfg = this.vo.cfg;
		let ReviewNum = cfg.FireNum;

		let element = ReviewNum[boxId];
		//不可领取
		if(element.needNum > lotterysnum){
			ViewController.getInstance().openView(ViewConst.POPUP.ACWIFESKININHERITREWARDPOPUPVIEW,{aid:this.aid,code:this.code,boxid:boxId+1});
			return;
		}
		

		
		// if(boxId == this.cfg.FireNum.length-1 && !Api.wifeVoApi.getWifeInfoVoById(this.cfg.wifeID) ){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInheritReward_needwife")));
		// 	return;
		// }
		//已领取
		if(this.vo.stageinfo[boxId+1]){
			ViewController.getInstance().openView(ViewConst.POPUP.ACWIFESKININHERITREWARDPOPUPVIEW,{aid:this.aid,code:this.code,boxid:boxId+1,})
			return
		}
		let tmpThis = this;
		// ViewController.getInstance().openView(ViewConst.POPUP.ACWIFESKININHERITSTORYVIEW,{
		// 	aid:this.aid,
		// 	code:this.code,sid:boxId+1,
		// 	callBack:()=>{
		// 		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINBOXREWARD,tmpThis.boxRewardNetResp,tmpThis);
		// 		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINBOXREWARD,{activeId:tmpThis.vo.aidAndCode,gid:boxId+1});
		// 	},
		// 	obj:tmpThis,
		// });
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINBOXREWARD,tmpThis.boxRewardNetResp,tmpThis);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINBOXREWARD,{activeId:tmpThis.vo.aidAndCode,gid:boxId+1});
	}
	//获得宝箱奖励
	private boxRewardNetResp(event: egret.Event): void 
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2S_GETWIFESKINBOXREWARD,this.boxRewardNetResp,this);
		if (event.data.data.ret == 0) {
			// this.refreshData();
			 let data = event.data.data.data;
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
	private rechargeClick():void{
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
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
		return "music_wifeskininherit";
	}
    // protected getBgName():string
	// {
	// 	return "fanliReview_bg";
	// }
    protected getTitleBgName():string
	{
		return this.getDefaultRes("acwifeskininherit_titlebg");
    }
	protected getTitleStr():string
	{
        return  null;
    }
	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return "btn_win_closebtn";
	}

	// protected getTitleStr():string
	// {
	// 	return "acWifeSkinInheritReviewMainViewTitle1";
	// }
    protected getResourceList(): string[] {
		return super.getResourceList().concat([
			this.getDefaultRes("acwifeskininherit_batchsend"),
			this.getDefaultRes("acwifeskininherit_bottom"),
			this.getDefaultRes("acwifeskininherit_bottomcenter"),
			this.getDefaultRes("acwifeskininherit_box1"),
			this.getDefaultRes("acwifeskininherit_box2"),
			this.getDefaultRes("acwifeskininherit_box3"),
			this.getDefaultRes("acwifeskininherit_button"),
			// this.getDefaultRes("acwifeskininherit_infobg"),
			this.getDefaultRes("acwifeskininherit_progresst"),
			this.getDefaultRes("acwifeskininherit_send"),
			this.getDefaultRes("acwifeskininherit_talkarrow"),
			this.getDefaultRes("acwifeskininherit_talkbg"),
			this.getDefaultRes("acwifeskininherit_title"),
			this.getDefaultRes("acwifeskininherit_titlebg"),
			"acwifeskininherit_chargetxt",
			"dailytask_dt_02",
			"dailytask_dt_01",
			"dailytask_box_light",
			"ac_luckbag-1_icon"
		]);
	}

	// protected getRuleInfo():string
	// {
	// 	return "acFanliReviewViewRule"+this.code;
	// }

	public dispose(): void {

		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFESKININHERIT_RECALL_ANI_END,this.recallAniBack,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_WIFESKININHERIT_RECALL_NUM_REFRESH,this.refreshData,this);

		let fireNum = this.cfg.FireNum;
		for (var index = 0; index < fireNum.length; index++) {
			let boxImg = this.getChildByName("boxImg" + index);
            let lightImg =  this.getChildByName("lightImg"+ index);
            egret.Tween.removeTweens(boxImg);
            egret.Tween.removeTweens(lightImg);
        }
		this._activityTimerText = null;
		this._acCDTxt = null;
		this._bottomBg = null;
		this._countText = null;

		if(this._sendBtn){
			egret.Tween.removeTweens(this._sendBtn);
		}
		this._sendBtn = null;
		this._sendText = null;
	    //底部进度条
    	this._progress = null;
		this._boxList = [];
		this._isPlaying= false;
		this._isSingle = true;
		this._rewards = null;
		this._acvo = undefined;
		this._btnAnim = null;
		this._bg = null;

		TimerManager.remove(this.showTalk,this);
		if(this._talkArrow){
			egret.Tween.removeTweens(this._talkArrow);
		}
		if(this._talkBg){
			egret.Tween.removeTweens(this._talkBg);
		}
		if(this._talkText){
			egret.Tween.removeTweens(this._talkText);
		}
		this._talkArrow = null;
		this._talkBg = null;
		this._talkText = null;
		this._showNumText = null;
		this._fire = null;
		super.dispose();
	}

}



