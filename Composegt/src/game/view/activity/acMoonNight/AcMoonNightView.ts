/*
author : jiangly
desc : 月夜仙缘
*/
class AcMoonNightView extends AcCommonView{
    public constructor()
    {
        super();
    }


    private _moveContainer:BaseDisplayObjectContainer =null;
    private _buildContainer:BaseDisplayObjectContainer = null;
    private _bridgeContainer:BaseDisplayObjectContainer = null;
    private _cloudContainer:BaseDisplayObjectContainer = null;
    private _descContainer:BaseDisplayObjectContainer = null;

    private scrollView:ScrollView =null;
    private acTimeTF:BaseTextField = null;
    private acCDTF:BaseTextField = null;

    private buildPosArr = [
        {buildId : 1, buildPos : [318, 986], namePos : [340,1083]},
        {buildId : 2, buildPos : [0,873],    namePos : [165,924]},
        {buildId : 3, buildPos : [370,744],   namePos : [568,830]},
        {buildId : 4, buildPos : [0,626],    namePos : [36,674]},
        {buildId : 5, buildPos : [360, 514],  namePos : [540,555]},
        {buildId : 6, buildPos : [0,440],    namePos : [18,431]},
        {buildId : 7, buildPos : [129,230],   namePos : [206,279]},      
    ];

    private bridgePosArr = [
        {bridgeId : 1, bridgePos : [88, 1064]},
        {bridgeId : 2, bridgePos : [239, 947]},
        {bridgeId : 3, bridgePos : [282, 816]},
        {bridgeId : 4, bridgePos : [311, 678]},
        {bridgeId : 5, bridgePos : [192, 570]},
        {bridgeId : 6, bridgePos : [174, 435]}
    ];

    private buildPosArrVi = [
        {buildId : 1, buildPos : [318, 986], namePos : [443,1197]},
        {buildId : 2, buildPos : [0,873],    namePos : [134,1003]},
        {buildId : 3, buildPos : [370,744],   namePos : [442,920]},
        {buildId : 4, buildPos : [0,626],    namePos : [24,758]},
        {buildId : 5, buildPos : [360, 514],  namePos : [442,678]},
        {buildId : 6, buildPos : [0,440],    namePos : [15,562]},
        {buildId : 7, buildPos : [129,230],   namePos : [274,426]},     
    ]

    private descBgPosArrVi = [
        {pos:[370, 1256]},
        {pos:[109, 1060]},
        {pos:[380, 977]},
        {pos:[0, 815]},
        {pos:[380, 735]},
        {pos:[41, 618]},
        {pos:[282, 482]},

    ];
    private descBgPosArr = [
        {pos:[487, 1270]},
        {pos:[109, 1105]},
        {pos:[510, 996]},
        {pos:[174, 844]},
        {pos:[501, 725]},
        {pos:[143, 630]},
        {pos:[320, 468]},
    ];

    private cloudPosArr = [
        {pos:[510, 1130]},
        {pos:[115, 974]},
        {pos:[524, 879]},
        {pos:[170, 735]},
        {pos:[487, 611]},
        {pos:[142, 527]},
        {pos:[330, 360]},

    ];




    private buildList: BaseBitmap[] = [];
    private nameBgList: BaseBitmap[] = [];
    private nameTxtList: BaseTextField[] = [];
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



    private get cfg() : Config.AcCfg.MoonNightCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcMoonNightVo{
        return <AcMoonNightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return this.aid+"-"+this.code;
    }

    protected getTitleBgName():string
	{
		return this.getDefaultRes("moonnight_titlebg");//"moonnight_titlebg-1"+this.code;
    }

    protected getTitleStr():string
	{
        return  null;
    }

	protected isShowOpenAni():boolean
	{
		return false;
	}

    // 背景图名称
	protected getBgName():string
	{
        return this.getDefaultRes("moonnight_bg");//'acsevenbg1';
    } 
    private createHand():void
    {
        
      
        let posX  = this.cloudPosArr[0]["pos"][0] ;
        let posY  = this.cloudPosArr[0]["pos"][1] ;
        
        this.guidHand = BaseBitmap.create("guide_hand");
        this.guidHand.x = posX;
        this.guidHand.y = posY;
        this.guidHand.setScale(0.5);
        this._moveContainer.addChild(this.guidHand);

        egret.Tween.get(this.guidHand,{loop:true})
            .to({y:posY - 5 ,scaleX:0.4,scaleY:0.4}, 500)
            .to({y:posY ,scaleX:0.5,scaleY:0.5}, 500)

    }
    protected initBg():void
	{   

        let bigBg = BaseBitmap.create("public_9v_bg01");
        bigBg.width=GameConfig.stageWidth;
        bigBg.height=GameConfig.stageHeigth;
        bigBg.touchEnabled = true;
        this.addChild(bigBg);

		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            // this.viewBg.width = GameConfig.stageWidth;
            // this.viewBg.height = 1700;
            this.height = GameConfig.stageHeigth; 
            this.viewBg.y =0;
		}
	} 
    private taskRed(){
        if(!this.taskBtn){
            return;
        }
        if(this.vo.isHaveTaskRedDot()){
            App.CommonUtil.addIconToBDOC(this.taskBtn);
        } else {
            App.CommonUtil.removeIconFromBDOC(this.taskBtn);
        }

    }
    public initView(){
        // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:1, kid:NetRequestConst.KID_DOUBLESEVENTH});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONNIGHTBOXREWARD),this.getRewardCallback,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MOONNIGHT_FRESH,this.refreshView,this); 




        this._moveContainer =new BaseDisplayObjectContainer(); 
        this._moveContainer.width = 640;
        this._moveContainer.height = 1700;
        this.addChild(this._moveContainer);  
        this._moveContainer.addChild(this.viewBg);


        this._buildContainer = new BaseDisplayObjectContainer(); 
        this._buildContainer.width = 640;
        this._moveContainer.addChild(this._buildContainer);

        this._bridgeContainer = new BaseDisplayObjectContainer(); 
        this._bridgeContainer.width = 640;
        this._moveContainer.addChild(this._bridgeContainer);
        

        this._cloudContainer = new BaseDisplayObjectContainer(); 
        this._cloudContainer.width = 640;
        this._cloudContainer.height = this._moveContainer.height;
        this._moveContainer.addChild(this._cloudContainer);

        this._descContainer = new  BaseDisplayObjectContainer(); 
        this._descContainer.width = 640;
        this._moveContainer.addChild(this._descContainer);
 
        let scrollRect1 = new egret.Rectangle(0,0,640,GameConfig.stageHeigth);        
        this.scrollView =ComponentManager.getScrollView(this._moveContainer,scrollRect1);
        this.scrollView.bounces = false;
        this.addChild(this.scrollView);
        this.setChildIndex(this.scrollView,2);


		let titleFont = BaseBitmap.create(this.getDefaultRes("moonnight_titletext"));
		titleFont.x = GameConfig.stageWidth / 2 - titleFont.width/2;
		titleFont.y = 0;
		this.addChild(titleFont);

        this.createBuild();

        
        
        let descBg = BaseBitmap.create(this.getDefaultRes("moonnight_descbg"))
        descBg.x = 0;
        descBg.y = 69;
        this.addChild(descBg);

        this.countBg = BaseBitmap.create("public_lockbg");
        this.countBg.x = GameConfig.stageWidth - this.countBg.width + 20 ;
        this.countBg.y = descBg.y + descBg.height ;
        this.addChild(this.countBg);

        this.countText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acMoonNightCount"),[String(this.vo.ainfo.scorenum)]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.countText.x = this.countBg.x + this.countBg.width / 2 - this.countText.width/2;//GameConfig.stageWidth - this.countText.width - 15;
        this.countText.y = this.countBg.y + this.countBg.height / 2 - this.countText.height/2;
        this.addChild(this.countText);

        
        //活动时间
        this.acTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acMoonNightTime",[this.vo.acTimeAndHour]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this.acTimeTF.x = descBg.x + 20;
        this.acTimeTF.y = descBg.y + 10;  
        this.addChild(this.acTimeTF);
        
        this.acCDTF = ComponentManager.getTextField(LanguageManager.getlocal("acMoonNightAcCD",[this.vo.getAcCDStr()]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this.acCDTF.x = descBg.x + 20;
        this.acCDTF.y = this.acTimeTF.y + this.acTimeTF.height + 3;  
        this.addChild(this.acCDTF);
        

        //活动规则文本
        let acRuleTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acMoonNightDesc"),[String(this.cfg.rechargeCost)]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        acRuleTxt.width = 600;
        acRuleTxt.lineSpacing = 3;
        acRuleTxt.x = this.acTimeTF.x;
        acRuleTxt.y = this.acCDTF.y + this.acCDTF.height + 3;
        this.addChild(acRuleTxt);
        

        //活动任务
		let taskBtnBg:BaseBitmap = BaseBitmap.create("mainui_bottombtnbg");
        taskBtnBg.x = GameConfig.stageWidth - 10 - taskBtnBg.width;
        taskBtnBg.y = GameConfig.stageHeigth - 200;
		this.addChild(taskBtnBg);

        let taskBtn = ComponentManager.getButton(this.getDefaultRes("moonnight_taskbtn"), "", this.taskBtnHandler, this);
		taskBtn.x = taskBtnBg.x + taskBtnBg.width /2 - taskBtn.width / 2;
		taskBtn.y = taskBtnBg.y + taskBtnBg.height /2 - taskBtn.height / 2;
		this.addChild(taskBtn);
        this.taskBtn = taskBtn;
        let taskBtnTxt = BaseBitmap.create(this.getDefaultRes("moonnight_taskbtntxt"));
		taskBtnTxt.x = taskBtnBg.x + taskBtnBg.width/2 - taskBtnTxt.width/2;
		taskBtnTxt.y = taskBtnBg.y + taskBtnBg.height - taskBtnTxt.height;
		this.addChild(taskBtnTxt);
        

        //衣装预览
		let showBtnBg:BaseBitmap = BaseBitmap.create("mainui_bottombtnbg");
        showBtnBg.x = GameConfig.stageWidth - 10 - showBtnBg.width;
        showBtnBg.y = GameConfig.stageHeigth - 100;
		this.addChild(showBtnBg);

        let showBtn = ComponentManager.getButton(this.getDefaultRes("moonnight_showbtn"), "", this.showBtnHandler, this);
		showBtn.x = showBtnBg.x + showBtnBg.width /2 - showBtn.width / 2;
		showBtn.y = showBtnBg.y + showBtnBg.height /2 - showBtn.height / 2;
		this.addChild(showBtn);

        let showBtnTxt = BaseBitmap.create(this.getDefaultRes("moonnight_showbtntxt"));
		showBtnTxt.x = showBtnBg.x + showBtnBg.width/2 - showBtnTxt.width/2;
		showBtnTxt.y = showBtnBg.y + showBtnBg.height - showBtnTxt.height;
		this.addChild(showBtnTxt);



        // this.setChildIndex(this.scrollView,2);
        this.createDragon();

        this.baseRefreshView();
 
        this.scrollPage();
        // if(1==1){
        //     return;
        // }
        this.showTip();
        this.taskRed();
        
    }

    private createDragon():void
    {
        // if(!Api.switchVoApi.checkServantCloseBone()  && RES.hasRes("servant_full2_"+this.cfg.servantSkin+"_ske") && App.CommonUtil.check_dragon() ){
        //     if(this.leftDragon == null){
        //         this.leftDragon = App.DragonBonesUtil.getLoadDragonBones("servant_full2_"+this.cfg.servantSkin);
        //         this.leftDragon.setScale(0.5);
        //         this.leftDragon.x = 400;
        //         this.leftDragon.y = this._moveContainer.height ;
        //         this._moveContainer.addChild(this.leftDragon);
        //     }
        // }else{
        //     let skinW =640;
        //     let skinH = 482;
        //     let tarScale = 0.75;

        //     if(this.leftBM == null){
        //         this.leftBM = BaseLoadBitmap.create("skin_full_"+this.cfg.servantSkin);
        //         this.leftBM.width = skinW;
        //         this.leftBM.height = skinH;
        //         this.leftBM.setScale(tarScale);
        //         this.leftBM.x = GameConfig.stageWidth - this.leftBM.width * tarScale;
        //         this.leftBM.y = this._moveContainer.height - this.leftBM.height * tarScale;
        //         this._moveContainer.addChild(this.leftBM);
        //     }	
		// }

        if(!Api.switchVoApi.checkCloseBone() && RES.hasRes("wife_full3_"+this.cfg.wifeSkin+"_ske") && App.CommonUtil.check_dragon() ){
            if(this.rightDragon == null){
                this.rightDragon = App.DragonBonesUtil.getLoadDragonBones("wife_full3_"+this.cfg.wifeSkin);
                this.rightDragon.setScale(0.7);
                this.rightDragon.x = 210;
                this.rightDragon.y = this._moveContainer.height ;
                this._moveContainer.addChild(this.rightDragon);
            }
        }else{
            let skinW =640;
            let skinH = 840;
            let tarScale = 0.55;
 
            if(this.rightBM == null){
                this.rightBM = BaseLoadBitmap.create("wife_skin_"+this.cfg.wifeSkin);
                this.rightBM.width = skinW;
                this.rightBM.height = skinH;
                this.rightBM.setScale(tarScale);
                this.rightBM.x = 100;
                this.rightBM.y = this._moveContainer.height - this.rightBM.height * tarScale ;
                this._moveContainer.addChild(this.rightBM);
            }	
		}



    }
    private showTip():void
    {
        if(!this.tipNode){
            this.tipNode = new BaseDisplayObjectContainer();
            this._moveContainer.addChild(this.tipNode);
        }

        if(this.vo.ainfo.stagenum < 7){

            if(!this.tipBg1 && !this.tipTxt1){
                this.tipBg1 = BaseBitmap.create(this.getDefaultRes("moonnight_talkbg"));
                this.tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acMoonNightTip1")),16,TextFieldConst.COLOR_BLACK);
                this.tipBg1.width = this.tipTxt1.width + 30;
                this.tipBg1.x = 385;
                this.tipBg1.y = 358;

                this.tipTxt1.x = this.tipBg1.x + this.tipBg1.width/2 - this.tipTxt1.width/2;
                this.tipTxt1.y = this.tipBg1.y + this.tipBg1.height/2 - this.tipTxt1.height/2 + 6;

                this.tipNode.addChild(this.tipBg1);
                this.tipNode.addChild(this.tipTxt1);
            }

            if(!this.tipHeadBg1){
                this.tipHeadBg1 = BaseBitmap.create("mainui_bottombtnbg");
                this.tipHeadBg1.x = this.tipBg1.x - this.tipHeadBg1.width + 15;
                this.tipHeadBg1.y = this.tipBg1.y - 10;
                this.tipNode.addChild(this.tipHeadBg1);
            }
            if(!this.tipHead1){
                this.tipHead1 = BaseBitmap.create(this.getDefaultRes("moonnight_wifeicon"));
                this.tipHead1.x = this.tipHeadBg1.x + this.tipHeadBg1.width/2 - this.tipHead1.width/2;
                this.tipHead1.y = this.tipHeadBg1.y + this.tipHeadBg1.height/2 - this.tipHead1.height/2;
                this.tipNode.addChild(this.tipHead1);
            }
        } else {

            if(this.tipHeadBg1){
                this.tipHeadBg1.visible = false;
            }
            if(this.tipHead1){
                this.tipHead1.visible = false;
            }
            if(this.tipBg1){
                this.tipBg1.visible = false;
            }
            if(this.tipTxt1){
                this.tipTxt1.visible = false;
            }

        }



        if(this.vo.ainfo.stagenum < 5){
            // if(!this.tipHeadBg2){
            //     // this.tipHeadBg1 = BaseBitmap.create
            // }
            // if(!this.tipHead2){

            // }
            if(!this.tipBg2 && !this.tipTxt2){
                this.tipBg2 = BaseBitmap.create(this.getDefaultRes("moonnight_talkbg"));
                this.tipBg2.scaleX = -1;
                this.tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acMoonNightTip2")),16,TextFieldConst.COLOR_BLACK);
                this.tipBg2.width = this.tipTxt2.width + 30;
                this.tipBg2.x = 520;
                this.tipBg2.y = 650;

                this.tipTxt2.x = this.tipBg2.x + this.tipBg2.width * -1/2 - this.tipTxt2.width/2;
                this.tipTxt2.y = this.tipBg2.y + this.tipBg2.height /2 - this.tipTxt2.height/2+ 6;

                this.tipNode.addChild(this.tipBg2);
                this.tipNode.addChild(this.tipTxt2);
            }
            if(!this.tipHeadBg2){
                this.tipHeadBg2 = BaseBitmap.create("mainui_bottombtnbg");
                this.tipHeadBg2.x = this.tipBg2.x - this.tipHeadBg2.width + 15 -this.tipBg2.width;
                this.tipHeadBg2.y = this.tipBg2.y - 10;
                this.tipNode.addChild(this.tipHeadBg2);
            }
            if(!this.tipHead2){
                this.tipHead2 = BaseBitmap.create(this.getDefaultRes("moonnight_taskbtn"));
                this.tipHead2.x = this.tipHeadBg2.x + this.tipHeadBg2.width/2 - this.tipHead2.width/2;
                this.tipHead2.y = this.tipHeadBg2.y + this.tipHeadBg2.height/2 - this.tipHead2.height/2;
                this.tipNode.addChild(this.tipHead2);
            }


        } else {

            if(this.tipHeadBg2){
                this.tipHeadBg2.visible = false;
            }
            if(this.tipHead2){
                this.tipHead2.visible = false;
            }
            if(this.tipBg2){
                this.tipBg2.visible = false;
            }
            if(this.tipTxt2){
                this.tipTxt2.visible = false;
            }

        }

        egret.Tween.get(this.tipNode)
        .set({visible:true})
        .to({alpha:1},200)
        .wait(5000)
        .to({alpha:0},200)
        .set({visible:false})
        .wait(5000)
        .call(()=>{
            egret.Tween.removeTweens(this.tipNode);
            this.showTip();
        },this);


    }
    private scrollPage():void
    {
        // this.scrollView.getMaxScrollTop()
        // console.log(this.scrollView.getMaxScrollTop());
       
        if(!this.vo.getFirstOpen()){

            this.scrollView.setScrollTop(1700 - GameConfig.stageHeigth,1000);
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.aid + "-" + this.code,flagkey:"firstOpen",value:1});
        } else {
            let move:number = 0;
            if(this.vo.ainfo.stagenum >=6){
                move = 0;
            } else {
                move = this.buildList[this.vo.ainfo.stagenum].y + this.buildList[this.vo.ainfo.stagenum].height/2 - GameConfig.stageHeigth/2;
            }
            
            this.scrollView.setScrollTop(move,1000);
        }
    }
    private buildClick(event:egret.Event,boxIndex:number):void
    {
        // console.log(11111111,boxIndex);


        if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        /**
		 *  1未完成 2可领取 3已领取
		 */
		let status = this.vo.getBoxStatusById(boxIndex);

		if (status == 2)
		{
            if(this.guidHand){
                egret.Tween.removeTweens(this.guidHand);
                this.guidHand.visible = false;
            }

            this._curRewardBoxId = boxIndex;

            this.cfgReward = this.cfg.lotteryNum[boxIndex].getReward;
            this.selectIndex = boxIndex;

			NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONNIGHTBOXREWARD,{activeId:this.aid+"-"+this.code,gid:(boxIndex+1)});
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.POPUP.ACMOONNIGHT_REWARDPOPUPVIEW,{aid:this.aid,code:this.code, id : boxIndex});
		}
    }
    private createBuild():void
    {
        //create build 


        for(let i = 0; i < this.buildPosArr.length; i ++){
            let buildPos = this.buildPosArr[i];
            if(PlatformManager.checkIsViSp()){
                buildPos = this.buildPosArrVi[i];
            } 
            

            let build = BaseBitmap.create(this.getDefaultRes("moonnight_room"+(i + 1)));
            build.x = this.viewBg.x + buildPos.buildPos[0];
            build.y = this.viewBg.y + buildPos.buildPos[1];
            this._buildContainer.addChild(build);

            let cloud = new AcMoonNightCloud();
            cloud.x = this.viewBg.x + this.cloudPosArr[i]["pos"][0] - cloud.width/2;
            cloud.y = this.viewBg.y + this.cloudPosArr[i]["pos"][1] - cloud.height/2;
            this.cloudList.push(cloud);
            this._cloudContainer.addChild(cloud);
            // cloud.visible = false;



            this.buildList.push(build);
            build.visible = false;
            // build.alpha = 0;

            let buildPart = BaseBitmap.create("public_alphabg");
            buildPart.name = "buildPart"+i;
     
            buildPart.width = build.width;
            buildPart.height = build.height;
            buildPart.x = build.x;
            buildPart.y = build.y;
            this._moveContainer.addChild(buildPart);
            buildPart.addTouchTap(this.buildClick, this,[i]);
 



            if(i != this.buildPosArr.length -1){
                let bridgePos = this.bridgePosArr[i];
                let bridge = BaseBitmap.create(this.getDefaultRes("moonnight_bridge"+(i + 1)));
                bridge.x = this.viewBg.x + bridgePos.bridgePos[0];
                bridge.y = this.viewBg.y + bridgePos.bridgePos[1];
                bridge.visible = false;
                this.bridgeList.push(bridge);
                this._bridgeContainer.addChild(bridge);

            }

            let nameBg = BaseBitmap.create(this.getDefaultRes("moonnight_namebg"));
            if(PlatformManager.checkIsViSp()){
                nameBg.rotation = -90;
                nameBg.x = buildPos.namePos[0];
                nameBg.y = buildPos.namePos[1] + 58;
            } else {
                nameBg.x = buildPos.namePos[0];
                nameBg.y = buildPos.namePos[1];
            }

            this.nameBgList.push(nameBg);
            this._descContainer.addChild(nameBg);

            let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acMoonNightName"+(i + 1))),18,TextFieldConst.COLOR_BROWN);
            if(PlatformManager.checkIsViSp()){

                nameTxt.x = nameBg.x + 45;
                nameTxt.y = nameBg.y - nameBg.width / 2 - nameTxt.height/2;

            } else {
                nameTxt.x = nameBg.x + nameBg.width / 2 - nameTxt.width/2;
                nameTxt.y = nameBg.y + nameBg.height / 2 - nameTxt.height/2 + 10;
            }
            

            nameTxt.textAlign = egret.HorizontalAlign.CENTER;
            this.nameTxtList.push(nameTxt);
            this._descContainer.addChild(nameTxt);

            let descBg = BaseBitmap.create("public_lockbg");
            let scale = 300 / 233;
            descBg.scaleX = scale;
            if(PlatformManager.checkIsViSp()){
                descBg.x = this.viewBg.x + this.descBgPosArrVi[i].pos[0] - descBg.width * scale/2 + 110;
                descBg.y = this.viewBg.y + this.descBgPosArrVi[i].pos[1] - descBg.height * scale/2 + 19;
            } else {
                descBg.x = this.viewBg.x + this.descBgPosArr[i].pos[0] - descBg.width * scale/2;
                descBg.y = this.viewBg.y + this.descBgPosArr[i].pos[1] - descBg.height * scale/2;
            }

            this.descBgList.push(descBg);
            this._descContainer.addChild(descBg);

            console.log(this.cfg.lotteryNum);
            let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acMoonNightCostDesc"),[String(this.cfg.lotteryNum[i].needNum)]),18,TextFieldConst.COLOR_LIGHT_YELLOW);
            descTxt.x = descBg.x + descBg.width * scale /2 - descTxt.width/2;
            descTxt.y = descBg.y + descBg.height / 2 - descTxt.height/2;
            this.descTxtList.push(descTxt);
            this._descContainer.addChild(descTxt);

        }
    }
    private baseRefreshView():void
    {
        this.countText.text = LanguageManager.getlocal(this.getDefaultCn("acMoonNightCount"),[String(this.vo.ainfo.scorenum)]);
        this.countText.x = this.countBg.x + this.countBg.width / 2 - this.countText.width/2;
        for(let i = 0; i < this.vo.ainfo.stagenum; i++){
            if(i < this.bridgeList.length){
                let bridge = this.bridgeList[i];
                bridge.visible = true;
            }


            let build = this.buildList[i];
            build.visible = true;

            let cloud = this.cloudList[i];
            cloud.visible = false;

            let descTxt = this.descTxtList[i];
            descTxt.text = LanguageManager.getlocal(this.getDefaultCn("acMoonNightVisit"));

            let scale = 300 / 233;
            let descBg = this.descBgList[i];
            descTxt.x = descBg.x + descBg.width * scale /2 - descTxt.width/2;
        }

        
        if(this.vo.ainfo.stagenum < this.buildList.length){
            if(this.vo.ainfo.scorenum >= this.cfg.lotteryNum[this.vo.ainfo.stagenum].needNum){
                //下一个点亮灯
                let b = this.buildList[this.vo.ainfo.stagenum];
                b.visible = true;

                let c:AcMoonNightCloud = this.cloudList[this.vo.ainfo.stagenum];
                c.visible = true;
                c.playIdle();

                if(this.vo.ainfo.stagenum == 0){
                    this.createHand();
                }

            }
        }


    }
    private refreshView():void
    {
        this.countText.text = LanguageManager.getlocal(this.getDefaultCn("acMoonNightCount"),[String(this.vo.ainfo.scorenum)]);
        this.countText.x = this.countBg.x + this.countBg.width / 2 - this.countText.width/2;

        this.taskRed();
        for(let i = 0; i < this.vo.ainfo.stagenum; i++){
            let descTxt = this.descTxtList[i];
            descTxt.text = LanguageManager.getlocal(this.getDefaultCn("acMoonNightVisit"));

            let scale = 300 / 233;
            let descBg = this.descBgList[i];
            descTxt.x = descBg.x + descBg.width * scale /2 - descTxt.width/2;
        }

        if(this.vo.ainfo.stagenum > 0){
            let cloud = this.cloudList[this.vo.ainfo.stagenum-1];
            if(cloud.visible){
                cloud.playDiss();
            }
        }


        if(this.vo.ainfo.stagenum > 6){
            return;
        }


       
        if(this.vo.ainfo.scorenum >= this.cfg.lotteryNum[this.vo.ainfo.stagenum].needNum){
            let preBuild = this.buildList[this.vo.ainfo.stagenum];

            let preCloud = this.cloudList[this.vo.ainfo.stagenum];
            if(preCloud.visible){
                preCloud.playIdle();
                // if(this.vo.ainfo.stagenum == 0){
                //     this.createHand();
                // }
            }


            if(!preBuild.visible){
                egret.Tween.get(preBuild)
                .set({visible: true, alpha:0})
                .to({alpha: 1},1000)
            }
        }
    
        if(this.vo.ainfo.stagenum > 0){
            let bridge = this.bridgeList[this.vo.ainfo.stagenum - 1];
            if(!bridge.visible){
                egret.Tween.get(bridge)
                .set({visible: true, alpha:0})
                .to({alpha: 1},1000)
            }
        }
     




    }

    private taskBtnHandler():void
    {
     
        if(!this.acVo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACMOONNIGHTTASKVIEW,{aid:this.aid,code:this.code});
    }
    private showBtnHandler():void
    {
        ViewController.getInstance().openView(ViewConst.COMMON.ACMOONNIGHTSHOWVIEW,{aid:this.aid,code:this.code});
    } 

    private getRewardCallback(event:egret.Event):void
    {
        if(event.data.data.ret == 0){
            let data = event.data.data.data;
            let rewards = data.rewards;
            // let rList = GameData.formatRewardItem(rewards);
            
            // let build = this.buildList[this._curRewardBoxId];
            // let pos = build.localToGlobal(build.width/2,build.height/2);
            // App.CommonUtil.playRewardFlyAction(rList,pos);

            // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, rewards);
            let haveServant = false;

        
            let rList = GameData.formatRewardItem(rewards);
            for(let i = 0; i < rList.length ; i ++){
                if(rList[i].type == 19){
                    let servantSkin = Config.ServantskinCfg.getServantSkinItemById(rList[i].id);

                    let checkServantId = servantSkin.noServExch;
                    let servantVo = Api.servantVoApi.getServantObj(String(checkServantId));
                    if(servantVo){
                        haveServant = true;
                    }

                }

            }
            

            if(haveServant){
                Api.servantVoApi.checkServantChangeRewards( this.cfgReward,data.rewards);
            } else {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{rewards:event.data.data.data.rewards,isPlayAni:true});
            }
           
            

          
        }

    }
    public tick(): boolean {

		let deltaT = this.vo.et - GameData.serverTime;
	
		if (this.acCDTF && deltaT > 0) {
			this.acCDTF.text = LanguageManager.getlocal("acMoonNightAcCD",[this.vo.getAcCDStr()])
			return true;
		} else {
			this.acCDTF.text = LanguageManager.getlocal("acMoonNightAcCD",[LanguageManager.getlocal("acWifeSkinInheritReward_acCDEnd")]);//LanguageManager.getlocal("acWifeSkinInheritReward_acCD", []);
		}
		// this.acCDTF.x = GameConfig.stageWidth - 15 - this.acCDTF.width;
		return false;
	}

    protected getResourceList():string[]
	{

        let result = super.getResourceList().concat([ 
            this.getDefaultRes("moonnight_descbg"),
            this.getDefaultRes("moonnight_namebg"),
            this.getDefaultRes("moonnight_namebggray"),
            this.getDefaultRes("moonnight_showbtn"),
            this.getDefaultRes("moonnight_showbtntxt"),
            this.getDefaultRes("moonnight_talkbg"),
            this.getDefaultRes("moonnight_taskbtn"),
            this.getDefaultRes("moonnight_taskbtntxt"),
            this.getDefaultRes("moonnight_titlebg"),
            this.getDefaultRes("moonnight_titletext"),

            this.getDefaultRes("moonnight_room1"),
            this.getDefaultRes("moonnight_room2"),
            this.getDefaultRes("moonnight_room3"),
            this.getDefaultRes("moonnight_room4"),
            this.getDefaultRes("moonnight_room5"),
            this.getDefaultRes("moonnight_room6"),
            this.getDefaultRes("moonnight_room7"),

            this.getDefaultRes("moonnight_bridge1"),
            this.getDefaultRes("moonnight_bridge2"),
            this.getDefaultRes("moonnight_bridge3"),
            this.getDefaultRes("moonnight_bridge4"),
            this.getDefaultRes("moonnight_bridge5"),
            this.getDefaultRes("moonnight_bridge6"),
            "moonnight_cloud11-1",
            "moonnight_cloud12-1",
            "moonnight_cloud21-1",
            "moonnight_cloud22-1",
            this.getBgName(),
            "guide_hand",
            this.getDefaultRes("moonnight_wifeicon"),

        ]);

        return result;
	}

    
    public dispose():void
	{   

        
    
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GETMOONNIGHTBOXREWARD),this.getRewardCallback,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MOONNIGHT_FRESH,this.refreshView,this); 
        this._moveContainer = null;
        this._buildContainer = null;
        this._bridgeContainer = null;
        this._descContainer = null;
        this._cloudContainer = null;
        this.scrollView = null;
        this.acTimeTF = null;
        this.acCDTF = null;


        this.buildList = [];
        this.nameBgList = [];
        this.nameTxtList = [];
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
