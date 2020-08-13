/*
author : jiangly
desc : 月夜仙缘
*/
class AcThxgivingView extends AcCommonView{
    public constructor()
    {
        super();
    }

    private _buildContainer:BaseDisplayObjectContainer = null;

    private scrollView:ScrollView =null;
    private acTimeTF:BaseTextField = null;
    private acCDTF:BaseTextField = null;

    private buildPosArr = [
        {buildId : 1, buildPos : [183,202]},
        {buildId : 2, buildPos : [78,178]},
        {buildId : 3, buildPos : [44,114]},
        {buildId : 4, buildPos : [62,53]},
        {buildId : 5, buildPos : [155,23]},
        {buildId : 6, buildPos : [267,25]},
        {buildId : 7, buildPos : [346,69]},
        {buildId : 8, buildPos : [346,135]},
        {buildId : 9, buildPos : [293,191]},
        {buildId : 10, buildPos : [181,86]},    
    ];


    private buildList: BaseBitmap[] = [];
    private effectList: BaseBitmap[] = [];
    private topSpList: BaseBitmap[] = [];
    private bridgeList: BaseBitmap[] = [];
    private descBgList: BaseBitmap[] = [];
    private descTxtList: BaseTextField[] = [];

    private cloudList:AcMoonNightCloud[] = [];

    private countText:BaseTextField = null;
    private _curRewardBoxId:number = -1;

    private tipNode:BaseDisplayObjectContainer;

    private tipHeadBg1:BaseBitmap;
    private tipHead1:BaseBitmap;
    private tipBg1:BaseBitmap;
    private tipTxt1:BaseTextField;

    private tipHead2:BaseBitmap;
    private tipHeadBg2:BaseBitmap;
    private tipBg2:BaseBitmap;
    private tipTxt2:BaseTextField;

    private leftDragon:BaseLoadDragonBones;
    private rightDragon:BaseLoadDragonBones;

    private leftBM: BaseLoadBitmap;
    private rightBM: BaseLoadBitmap;
    private countBg:BaseBitmap;

    private taskBtn:BaseButton;

    private guidHand:BaseBitmap;

    private cfgReward:string;

    private selectIndex:number;
	private _progressBar: ProgressBar;
	private _progressTxt: BaseTextField;



    private get cfg() : Config.AcCfg.ThxgivingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcThxgivingVo{
        return <AcThxgivingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected getTitleBgName():string
	{
		return "oneyearrank_titlebg-1";//"moonnight_titlebg-1"+this.code;
    }

    protected getTitleStr():string
	{
        return  null;
    }

    protected initBg():void
	{   

        let bigBg = BaseBitmap.create("acthxgivingviewBg");
        bigBg.touchEnabled = true;
        bigBg.y = GameConfig.stageHeigth - bigBg.height;
        this.addChild(bigBg);
	} 
    
    public initView(){
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETTHXGIVINGREWARD),this.getRewardCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETTHXGIVINGBOXREWARD),this.getRewardCallback,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_THXGIVINGREFRESHVO,this.refreshView,this); 


		let titleFont = BaseBitmap.create("acthxgivingviewTitle");
		titleFont.x = GameConfig.stageWidth / 2 - titleFont.width/2;
		titleFont.y = 0;
		this.addChild(titleFont);

        this.createBuild();

        
        
        let descBg = BaseBitmap.create("acthxgivingviewDescBg")
        descBg.x = 0;
        descBg.y = 69;
        this.addChild(descBg);
        
        //活动时间
        this.acTimeTF = ComponentManager.getTextField(this.acVo.getAcLocalTime(true),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.acTimeTF.x = 15;
        this.acTimeTF.y = descBg.y + 10;
        this.addChild(this.acTimeTF);
        
        this.acCDTF = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeople_acCD",[this.vo.getAcCDStr()]),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.acCDTF.x = GameConfig.stageWidth -  this.acCDTF.width -8;
        this.acCDTF.y = this.acTimeTF.y;  
        this.addChild(this.acCDTF);
        

        //活动规则文本
        let acRuleTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acThxgvingDesc"),[String(this.cfg.cost)]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        acRuleTxt.width = 600;
        acRuleTxt.lineSpacing = 3;
        acRuleTxt.x = this.acTimeTF.x;
        acRuleTxt.y = this.acCDTF.y + this.acCDTF.height + 3;
        this.addChild(acRuleTxt);

        let perCentNum = this.vo.getPercentageNum();
        this._progressBar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 430);
		this._progressBar.x = GameConfig.stageWidth / 2 - this._progressBar.width / 2 + 30;
		this._progressBar.y = descBg.y + descBg.height + 37;
        this._progressBar.setText((perCentNum*100)  + "%");
		this._progressBar.setPercentage(perCentNum);
        this.addChild(this._progressBar);

        // this._progressTxt = ComponentManager.getTextField((perCentNum*100)  + "%", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		// this._progressTxt.x = this._progressBar.x + this._progressBar.width / 2 - this._progressTxt.width / 2;
		// this._progressTxt.y = this._progressBar.y + this._progressBar.height / 2 - this._progressTxt.height / 2 - 1;
		// this.addChild(this._progressTxt);

        let progressSp = BaseBitmap.create("acthxgivingviewProgess");
        progressSp.x = 50;
        progressSp.y = descBg.y + descBg.height ;
        this.addChild(progressSp);

        let progressNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThxgvingProgressName"),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        progressNameTxt.x = progressSp.x + progressSp.width / 2 - progressNameTxt.width/2;
        progressNameTxt.y = progressSp.y + progressSp.height - progressNameTxt.height;
        this.addChild(progressNameTxt);

        let tarScale = 0.7;
        let res = "wife_full_"+this.cfg.wifeID;
        if(Api.switchVoApi.checkOpenWxHexiePic()&&ResourceManager.hasRes(res+"_wxhexie")){
			res = res+"_wxhexie"
		}
        this.rightBM = BaseLoadBitmap.create(res);
        this.rightBM.setScale(tarScale);
        this.rightBM.x = -150;
        this.rightBM.y = GameConfig.stageHeigth - 680;
        this.addChild(this.rightBM);

         let talkBg = BaseBitmap.create(this.getDefaultRes("acspringouting_talkbg","3"));
        talkBg.x = 140;
        talkBg.y = GameConfig.stageHeigth - 680;;
        this.addChild(talkBg);

        let talk = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acThxgvingPeople")),18,TextFieldConst.COLOR_BROWN);
        talk.width = 150;
        talk.rotation = 18;
        talk.x = talkBg.x + 15 + 30;
        talk.y = talkBg.y + 15 + 10;
        this.addChild(talk);

       
        let DownBg = BaseBitmap.create("acthxgivingviewDownBg")
        DownBg.x = 0;
        DownBg.y = GameConfig.stageHeigth - DownBg.height;
        this.addChild(DownBg);

         //衣装预览
        let infoBtn = ComponentManager.getButton("acredlotuswarrior_infobtn","",this.infoBtnClick,this);
        infoBtn.x = GameConfig.stageWidth - 10 - infoBtn.width;
        infoBtn.y = GameConfig.stageHeigth - DownBg.height - infoBtn.height - 20;
        this.addChild(infoBtn);

        // let showBtn = ComponentManager.getButton(this.getDefaultRes("moonnight_showbtn"), "", this.showBtnHandler, this);
		// showBtn.x = showBtnBg.x + showBtnBg.width /2 - showBtn.width / 2;
		// showBtn.y = showBtnBg.y + showBtnBg.height /2 - showBtn.height / 2;
		// this.addChild(showBtn);

        // let showBtnTxt = BaseBitmap.create(this.getDefaultRes("moonnight_showbtntxt"));
		// showBtnTxt.x = showBtnBg.x + showBtnBg.width/2 - showBtnTxt.width/2;
		// showBtnTxt.y = showBtnBg.y + showBtnBg.height - showBtnTxt.height;
		// this.addChild(showBtnTxt);
        
        this.countText = ComponentManager.getTextField(LanguageManager.getlocal("acThxgvingCanNumStr",[String(this.vo.cannum)]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.countText.x = DownBg.x + DownBg.width / 2 - this.countText.width/2;
        this.countText.y = DownBg.y + 15;
        this.addChild(this.countText);

        let doButton =  ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE,"acThxgvingButtonStr",this.doButtonClick,this);
        doButton.setScale(0.85);
        doButton.x =  DownBg.width/4 - doButton.width*0.85/2;
        doButton.y = GameConfig.stageHeigth - 65;
        this.addChild(doButton);

        let do10Button =  ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acThxgvingButton10Str",this.do10ButtonClick,this);
        do10Button.setScale(0.85);
        do10Button.x = DownBg.width/4*3 - do10Button.width*0.85/2;
        do10Button.y = GameConfig.stageHeigth - 65;
        this.addChild(do10Button);
        
    }
    private doButtonClick() {
        this.doClick(1);
    }
    private do10ButtonClick() {
        this.doClick(10);
    }

    private doClick(num : number):void{
        if(AcMayDayView._isCircleRun){
            return;
        }
        if(this.vo.et - GameData.serverTime <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("buy_error"));
            return;
        }
        if(num>this.vo.cannum){
            let message = LanguageManager.getlocal("acThxgvingViewScoreNotEnoughNew");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: message,
                callback: () => {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                },
                handler: this,
                needCancel: true
            });
            return;
        }
        let view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETTHXGIVINGREWARD,{activeId : this.aid+"-"+this.code, lotterynum : num });
    }
  
    private buildClick(event:egret.Event,boxIndex:number):void
    {
        // console.log(11111111,boxIndex);
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }

        /**
		 *  1未完成 2可领取 3已领取
		 */
		let status = this.vo.getBoxStatusById(boxIndex);

		if (status == 2)
		{
            this._curRewardBoxId = boxIndex;

            this.cfgReward = this.cfg.feastList[boxIndex].getReward;
            this.selectIndex = boxIndex;

			NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETTHXGIVINGBOXREWARD,{activeId:this.aid+"-"+this.code,gid:(boxIndex+1)});
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.POPUP.ACTHXGIVING_REWARDPOPUPVIEW,{aid:this.aid,code:this.code, id : boxIndex});
		}
    }
    private createBuild():void
    {

        this._buildContainer = new BaseDisplayObjectContainer(); 
        this._buildContainer.x = 170;
        this._buildContainer.y = GameConfig.stageHeigth - 580;
        this.addChild(this._buildContainer);

        for(let i = 0; i < this.buildPosArr.length; i ++){
            let buildPos = this.buildPosArr[i];
            let bgName = "acthxgivingdishbg";
            let topScale = 0.8;
            let offsetPosY = 20;
            if(i == 0 || i == 3 || i == 6){
                bgName = bgName + "1";
            }else if(i == 1 || i == 4 || i == 7){
                bgName = bgName + "2";
            }else if(i == 2 || i == 5 || i == 8){
                bgName = bgName + "3";
            }else if(i == 9){
                bgName = bgName + "4";
                topScale = 1;
                offsetPosY = 10;
            }
            let spName = bgName;
            let statusTag = this.vo.getBoxStatusById(i);
            if(statusTag == 3){
                spName = "acthxgivingdish"+(i+1);
            }
            let build = BaseBitmap.create(spName);
            build.x = buildPos.buildPos[0];
            build.y = buildPos.buildPos[1];
            this._buildContainer.addChild(build);
            this.buildList.push(build);

             let effectSp = ComponentManager.getCustomMovieClip("acthxgivingDishEffect",10,150);
            effectSp.width = 300;
            effectSp.height = 300;
            effectSp.setScale(topScale);
            effectSp.x = buildPos.buildPos[0] + build.width/2 - effectSp.width*topScale/2;
            effectSp.y = buildPos.buildPos[1] + build.height/2 - effectSp.height*topScale/2 - offsetPosY;
            effectSp.playWithTime(-1);
            this._buildContainer.addChild(effectSp);
            this.effectList.push(effectSp);

            let dishTopSp = BaseBitmap.create("acthxgivingdishTopSp"); 
			dishTopSp.anchorOffsetX = dishTopSp.width / 2;
			dishTopSp.anchorOffsetY = dishTopSp.height / 2;
            dishTopSp.setScale(topScale);
            dishTopSp.x = buildPos.buildPos[0] + build.width/2 ;
            dishTopSp.y = buildPos.buildPos[1] + build.height/2 -offsetPosY;
            this._buildContainer.addChild(dishTopSp);
            this.topSpList.push(dishTopSp);

            if(i>0 && i<4){
                let bIndex = this._buildContainer.getChildIndex(this.buildList[i-1]);
                let eIndex = this._buildContainer.getChildIndex(this.effectList[i-1]);
                let tIndex = this._buildContainer.getChildIndex(this.topSpList[i-1]);
                this._buildContainer.setChildIndex(build,bIndex+2);
                this._buildContainer.setChildIndex(effectSp,eIndex+2);
                this._buildContainer.setChildIndex(dishTopSp,tIndex+2);
            }
            if(statusTag != 2){
               effectSp.visible = false;
               dishTopSp.visible = false;
            }else{

               egret.Tween.get(dishTopSp,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
            }

            let buildPart = BaseBitmap.create("public_alphabg");
            buildPart.name = "buildPart"+i;
     
            buildPart.width = build.width*0.8;
            buildPart.height = build.height*0.8;
            buildPart.x = build.x+build.width*0.1;
            buildPart.y = build.y+build.height*0.1;
            this._buildContainer.addChild(buildPart);

            buildPart.addTouchTap(this.buildClick, this,[i]);

        }

        let build = this.buildList[0];
        let effectSp = this.effectList[0];
        let dishTopSp = this.topSpList[0];
        let bIndex = this._buildContainer.getChildIndex(this.buildList[9]);
        let eIndex = this._buildContainer.getChildIndex(this.effectList[9]);
        let tIndex = this._buildContainer.getChildIndex(this.topSpList[9]);
        this._buildContainer.setChildIndex(build,bIndex+2);
        this._buildContainer.setChildIndex(effectSp,eIndex+2);
        this._buildContainer.setChildIndex(dishTopSp,tIndex+2);
    }
    
    private refreshView():void
    {
        let perCentNum = this.vo.getPercentageNum();
       
        this._progressBar.setText(Math.floor(perCentNum*100)  + "%");
		this._progressBar.setPercentage(perCentNum);

        for(let i = 0; i < this.buildPosArr.length; i ++){
            let build = this.buildList[i];
            let effectSp = this.effectList[i];
            let dishTopSp = this.topSpList[i];
            let statusTag = this.vo.getBoxStatusById(i);

            if(statusTag == 2){
               effectSp.visible = true;
               dishTopSp.visible = true;

               egret.Tween.get(dishTopSp,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
            }else if(statusTag == 3)
            {
                effectSp.visible = false;
                dishTopSp.visible = false;
                build.texture = ResourceManager.getRes("acthxgivingdish"+(i+1));
            }

        }

        this.countText.text =  LanguageManager.getlocal("acThxgvingCanNumStr",[String(this.vo.cannum)]);
    }

    private showBtnHandler():void
    {
        ViewController.getInstance().openView(ViewConst.COMMON.ACMOONNIGHTSHOWVIEW,{aid:this.aid,code:this.code});
    } 

    private getRewardCallback(event:egret.Event):void
    {
        if(event.data.data.ret == 0){
            //领取成功
            let rewardStr = event.data.data.data.rewards;
            if(rewardStr.search(this.cfg.wifeBathSceneID)!= -1){
                ViewController.getInstance().openView(ViewConst.BASE.WIFEBATHSCENEVIEW,{id:this.cfg.wifeID,sceneId:this.cfg.wifeBathSceneID});
            }

            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{rewards:event.data.data.data.rewards,isPlayAni:true});           
                      
        }

    }
    public tick(): boolean {

		let deltaT = this.vo.et - GameData.serverTime;
	
		if (this.acCDTF && deltaT > 0) {
			this.acCDTF.text = LanguageManager.getlocal("acFourPeople_acCD",[this.vo.getAcCDStr()])
			return true;
		} else {
			this.acCDTF.text = LanguageManager.getlocal("acFourPeople_acCD",[LanguageManager.getlocal("acWifeSkinInheritReward_acCDEnd")]);//LanguageManager.getlocal("acWifeSkinInheritReward_acCD", []);
		}
		this.acCDTF.x = GameConfig.stageWidth - 15 - this.acCDTF.width;


        let perCentNum = this.vo.getPercentageNum();
		
        this._progressBar.setText(Math.floor(perCentNum*100)  + "%");
		this._progressBar.setPercentage(perCentNum);
		return false;
	}

    /**
	 * 查看信息
	 */
    private infoBtnClick() {
        
        ViewController.getInstance().openView(ViewConst.POPUP.ACTHXGIVINGDETAILPOPUPVIEW,{"code":this.code,"aid":this.aid});
            
    }

    protected getResourceList():string[]
	{

        let result = super.getResourceList().concat([ 
            
            "acthxgivingviewBg",
            "acthxgivingviewTitle",
            "acthxgivingviewDescBg",
            "oneyearrank_titlebg-1",
            "acthxgivingviewDownBg",
            "acthxgivingdish1",
            "acthxgivingdish2",
            "acthxgivingdish3",
            "acthxgivingdish4",
            "acthxgivingdish5",
            "acthxgivingdish6",
            "acthxgivingdish7",
            "acthxgivingdish8",
            "acthxgivingdish9",
            "acthxgivingdish10",
            "acthxgivingdishbg1",
            "acthxgivingdishbg2",
            "acthxgivingdishbg3",
            "acthxgivingdishbg4",
            "acthxgivingdishTopSp",
            "public_alphabg",
            "acthxgivingDishEffect1",
            "acthxgivingDishEffect2",
            "acthxgivingDishEffect3",
            "acthxgivingDishEffect4",
            "acthxgivingDishEffect5",
            "acthxgivingDishEffect6",
            "acthxgivingDishEffect7",
            "acthxgivingDishEffect8",
            "acthxgivingDishEffect9",
            "acthxgivingDishEffect10",
            "progress_type1_yellow2",
            "progress_type3_bg",
            "acthxgivingviewProgess",
            "acredlotuswarrior_infobtn",
            "wifeview_charmicon",
            "acwifebathingview_expicon",
            this.getDefaultRes("acwifebathingview_detaildescbg","1"),
            this.getDefaultRes("acspringouting_talkbg","3"),

        ]);

        return result;
	}

    
    public dispose():void
	{   

        
    
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETTHXGIVINGREWARD),this.getRewardCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETTHXGIVINGBOXREWARD),this.getRewardCallback,this);
        
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_THXGIVINGREFRESHVO,this.refreshView,this); 
        this._buildContainer = null;
        this.scrollView = null;
        this.acTimeTF = null;
        this.acCDTF = null;


        this.buildList = [];
        this.effectList = [];
        this.topSpList = [];
        this.bridgeList = [];
        this.descBgList = [];
        this.descTxtList = [];
        this.cloudList = [];

        this.countText = null;
        this._curRewardBoxId = -1;

        if(this.tipNode){
            egret.Tween.removeTweens(this.tipNode);
        }
        this.tipNode = null;

        this.tipHeadBg1 = null;
        this.tipHead1 = null;
        this.tipBg1 = null;
        this.tipTxt1 = null;

        this.tipHead2 = null;
        this.tipHeadBg2 = null;
        this.tipBg2 = null;
        this.tipTxt2 = null;
        this.leftDragon = null;
        this.rightDragon = null;

        this.leftBM = null;
        this.rightBM = null;
        this.countBg = null;
        this.taskBtn = null;
        if(this.guidHand){
            egret.Tween.removeTweens(this.guidHand);
        }
        this.guidHand = null;
        this.cfgReward = null;
        this.selectIndex= 0;
        super.dispose();
    }
}
