/**
 * 暴击虎牢关
 * @author 赵占涛
 */
class AcBuildingWorshipView extends AcCommonView{
    // 血条
    private bloodBar:ProgressBar;
    // 倒计时
    private countdownTxt:BaseTextField;
    // 修缮按钮
    private doButton:BaseButton;
    // 修缮10次按钮
    private do10Button:BaseButton;
    // 任务
    private taskButton:BaseButton;
    // 门客容器
    private manNode:BaseDisplayObjectContainer;
    // 特效容器
    private effectNode:BaseDisplayObjectContainer;
    // 架1
    private struts1:BaseLoadBitmap;
    // 架2
    private struts2:BaseLoadBitmap;
    // 架3
    private struts3:BaseLoadBitmap;
    // 建筑工1
    private man1:CustomMovieClip;
    // 建筑工2
    private man2:CustomMovieClip;
    // 锤子
    private hammer:CustomMovieClip;
    // 是否已经播放礼花
    private _isShowLihua = false;
    // 官报界面是否已显示过
    private static reportShowed = {"1":0,"2":0};
    // 大背景
    private bigBg:BaseLoadBitmap;

    private scoreTip:BaseTextField = null;
    private scoreTxt:BaseTextField = null;
    //夹子
    private _clamp: BaseLoadDragonBones = null;
    //
    private _wifeNode: BaseDisplayObjectContainer = null;
    private _wifeWord: BaseTextField = null;
    //限制，发送请求后播完动画再可后续点击
    private _inAni = false;

    public constructor()
    {
        super();
    }
    public static AID:string = null;
    public static CODE:string = null;

    private get cfg() : Config.AcCfg.BuildingWorshipCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcBuildingWorshipView.AID, AcBuildingWorshipView.CODE);
    }

    private get vo() : AcBuildingWorshipVo{
        return <AcBuildingWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(AcBuildingWorshipView.AID, AcBuildingWorshipView.CODE);
    }

    private get acTivityId() : string{
        return `${AcBuildingWorshipView.AID}-${AcBuildingWorshipView.CODE}`;
    }

    protected initBg():void
	{   
        if(this.code == "6"|| this.code == "5"||this.code=='4'){
            //背景
            let stageH = GameConfig.stageHeigth;
            let bigBg = BaseLoadBitmap.create('buildingworship_5_bg_over');
            bigBg.touchEnabled = true;
            this.addChild(bigBg);
            bigBg.y = stageH - 1136;
            //米饭烟
            let baiyan = ComponentManager.getCustomMovieClip("buildingworship_baiyan", 7, 100);
            baiyan.setPosition(364, stageH - 420);
            this.addChild(baiyan);
            baiyan.playWithTime(-1);
            baiyan.blendMode = egret.BlendMode.ADD;
            //火焰
            let fire = ComponentManager.getCustomMovieClip("buildingworship_fire", 7, 100);
            fire.setPosition(334, stageH - 712);
            this.addChild(fire);
            fire.playWithTime(-1);
            fire.blendMode = egret.BlendMode.ADD;
            //网
            let wang = BaseBitmap.create('buildingworship_5_bg_02');
            this.addChild(wang);
            wang.x = 251;
            wang.y = stageH - 707;
            //烟
            let smoke = ComponentManager.getCustomMovieClip("buildingworship_smoke", 7, 100);
            smoke.setPosition(264, stageH - 888);
            this.addChild(smoke);
            smoke.playWithTime(-1);
            //夹子的动画
            if (App.CommonUtil.check_dragon()) {
                let _clamp = App.DragonBonesUtil.getLoadDragonBones("shaokao");
                _clamp.y = stageH + 5;
                _clamp.x = 5;
                this.addChild(_clamp);
                this._clamp = _clamp;
                _clamp.stop();
                _clamp.visible = false;
                _clamp.setTimeScale(1.2);
                _clamp.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, () => {
                    // console.log('播放完成');
                    _clamp.stop();
                    _clamp.visible = false;
                    // this.showReward();
                }, this);
            }
            //人物
            this.addAni('234');
        } else {
            let bigBg = BaseLoadBitmap.create("buildingworship_"+this.code+"_bg_notover");
            bigBg.width=640;
            bigBg.height=1136;
            bigBg.touchEnabled = true;
            this.addChild(bigBg);
            this.bigBg = bigBg;

            // 架子
            this.struts1 = BaseLoadBitmap.create("buildingworship_"+this.code+"_struts1");
            this.struts1.width = 636;
            this.struts1.height = 344;
            this.struts1.x = bigBg.x + bigBg.width - this.struts1.width;
            this.struts1.y = bigBg.y + bigBg.height - this.struts1.height - 50;
            this.struts1.visible = false;
            this.addChild(this.struts1);

            this.struts2 = BaseLoadBitmap.create("buildingworship_"+this.code+"_struts2");
            this.struts2.y = bigBg.y + 565;
            this.struts2.visible = false;
            this.addChild(this.struts2);

            this.struts3 = BaseLoadBitmap.create("buildingworship_"+this.code+"_struts3");
            this.struts3.y = bigBg.y + 336;
            this.struts3.visible = false;
            this.addChild(this.struts3);   

            // 建筑工
            let poscfg = [
                {x:69,y:790},
                {x:294,y:645}
            ];
            let idx = 1;
            let aniNode = new BaseDisplayObjectContainer();
            for (let i = 0; i < poscfg.length; i++) {
                let manClip = ComponentManager.getCustomMovieClip("alliancetask_frame3",6,300);
                manClip.x = poscfg[i].x;
                manClip.y = poscfg[i].y;
                egret.Tween.get(manClip,{loop:false}).wait(260*i).call(()=>{
                    manClip.playWithTime(0);
                },this);
                aniNode.addChild(manClip);
                this["man" + (i+1)] = manClip;
            }
            this.addChild(aniNode);

            // 锤子
            this.hammer = ComponentManager.getCustomMovieClip("effect_chuizi_0000",5,200);
            this.hammer.width = 260;
            this.hammer.height = 260;
            this.hammer.setScale(1.3);
            this.hammer.x = GameConfig.stageWidth/2 - this.hammer.width * this.hammer.scaleX/2 ;
            this.hammer.y = 320;
            this.hammer.visible = false;
            this.addChild(this.hammer);
        }
	} 
    public addAni(id): void {
        //创建一个容器，存放动画
        let parent: BaseDisplayObjectContainer = new BaseDisplayObjectContainer;
        this.addChild(parent);
        let itemCfg = Config.WifeCfg.getWifeCfgById(id);
        let dagonBonesName = itemCfg.bone,
            picName = itemCfg.body,
            boneName = dagonBonesName + "_ske";
        if (!Api.switchVoApi.checkCloseBone() && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let boneAni = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            boneAni.x = GameConfig.stageWidth / 2 - 120;
            console.log(boneAni.height);
            let y1 = GameConfig.stageHeigth - boneAni.height;
            boneAni.y = y1;
            parent.addChild(boneAni);
        } else {
            let Img = BaseLoadBitmap.create(picName, null, {
                callback: (...args) => {
                    Img.height *= 0.8;
                    Img.width *= 0.8;
                    let y1 = GameConfig.stageHeigth - Img.height;
                    Img.y = y1;
                    Img.x = -80;
                }, callbackThisObj: this
            });
            parent.addChild(Img);
        }
        this.sayFor5_6();
    }
    private sayFor5_6() {
        let wifeNode = new BaseDisplayObjectContainer;
        this.addChild(wifeNode);
        wifeNode.x = GameConfig.stageWidth / 2 - 100;
        wifeNode.y = GameConfig.stageHeigth - 650;
        this._wifeNode = wifeNode;
        // 说话
        let rndSay = (~~(Math.random() * 100)) % 5 + 1;
        let rndSayBg: BaseBitmap = BaseBitmap.create("buildingworship_talkbg-5");//149,106
        let rndSayTxt: BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`acBuildingWorshipBigServantTip${this.code}_${rndSay}`), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        rndSayTxt.width = 130;
        // rndSayBg.width = rndSayTxt.width + 30;
        // rndSayBg.height = rndSayTxt.height + 60;
        wifeNode.addChild(rndSayBg);
        rndSayTxt.x = rndSayBg.x + 15;
        rndSayTxt.y = rndSayBg.y + 25;
        wifeNode.addChild(rndSayTxt);
        this._wifeWord = rndSayTxt;
        this.beginShowText();
    }
    private beginShowText(){//acBuildingWorshipAVGDialog${x}_code5,1~6
        let _wifeNode = this._wifeNode;
        if (_wifeNode && this._wifeWord) {
            egret.Tween.removeTweens(_wifeNode);
            _wifeNode.alpha = 0;
            egret.Tween.get(_wifeNode, { loop: true }).call(() => {
                let rndSay = (~~(Math.random() * 100)) % 5 + 1;
                this._wifeWord.text = LanguageManager.getlocal(`acBuildingWorshipBigServantTip${this.code}_${rndSay}`);
            }).
                to({ alpha: 1 }, 100).
                wait(3000).
                to({ alpha: 0 }, 100).
                wait(3000);
        }
    }

    public initView(){

		// NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:1, kid:NetRequestConst.KID_BUILDINGWORSHIPAC});

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPREWARD),this.getRewardHandler,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPBOXREWARD),this.getNumRewardHandler,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshData,this);
        

        AcBuildingWorshipView.AID = this.aid;
		AcBuildingWorshipView.CODE = this.code;
        this.width = GameConfig.stageWidth;


		if (this.code == "6"||this.code == "5"||this.code == '4')
		{
			let titletxt = BaseBitmap.create("buildingworship_titletxt-5");
			titletxt.x = GameConfig.stageWidth/2 - titletxt.width/2;
			titletxt.y = 0;
			this.addChild(titletxt);
		}


        this.manNode = new BaseDisplayObjectContainer();
        this.addChild(this.manNode);
        this.effectNode = new BaseDisplayObjectContainer();
        this.addChild(this.effectNode);
        
        let topres = "tigertrappass_topbg";
        if(this.code == "6" || this.code == "5"||this.code =='4' ){
            topres = "buildingworship_topbg-5";
        }
		//活动规则背景图片
		let acruleTxtBg: BaseBitmap = BaseBitmap.create(topres);
		acruleTxtBg.y = 67;
		this.addChild(acruleTxtBg);



        if(this.code == "6" || this.code == "5" ||this.code == '4'){



            //活动规则文本
            let acruleTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acBuildingWorshipRuleInView" + this.code,[String(this.cfg.cost)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
            // acruleTxt.textAlign = egret.HorizontalAlign.CENTER;
            acruleTxt.width = 600;
            acruleTxt.x = acruleTxtBg.x + acruleTxtBg.width/2 - acruleTxt.width/2;
            acruleTxt.y = acruleTxtBg.y + 30;
            this.addChild(acruleTxt);
            //剩余时间
            this.countdownTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_countdown_time", [this.vo.acCountDown]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
            this.countdownTxt.x = acruleTxt.x + acruleTxt.width - this.countdownTxt.width;
            this.countdownTxt.visible = this.vo.isInActivity();
            this.addChild(this.countdownTxt);
            // acruleTxt.y = acruleTxtBg.y + acruleTxtBg.height/2 - (acruleTxt.height + this.countdownTxt.height)/2;
            this.countdownTxt.y = acruleTxtBg.y + 5;//acruleTxt.y + acruleTxt.height;

            let actimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSPTime",[this.vo.acTimeAndHour]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
            actimeTF.width = 580;
            actimeTF.lineSpacing = 5;
            actimeTF.x = acruleTxt.x;
            actimeTF.y = acruleTxtBg.y + 5;
            this.addChild(actimeTF);


            let infoBtn = ComponentManager.getButton("acredlotuswarrior_infobtn","",this.infoBtnClick,this);
			infoBtn.setPosition(/*acruleTxtBg.width -110*/23,acruleTxtBg.y + acruleTxtBg.height + 193);
			this.addChild(infoBtn);

        } else {
            //活动规则文本
            let acruleTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acBuildingWorshipRuleInView" + this.code),TextFieldConst.FONTSIZE_CONTENT_SMALL);
            acruleTxt.textAlign = egret.HorizontalAlign.CENTER;
            acruleTxt.x = acruleTxtBg.x + acruleTxtBg.width/2 - acruleTxt.width/2;
            this.addChild(acruleTxt);
            //剩余时间
            this.countdownTxt = ComponentManager.getTextField(LanguageManager.getlocal("acTigertrappass_countdown_time", [this.vo.acCountDown]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
            this.countdownTxt.x = acruleTxt.x + acruleTxt.width/2 - this.countdownTxt.width/2;
            this.countdownTxt.visible = this.vo.isInActivity();
            this.addChild(this.countdownTxt);
            acruleTxt.y = acruleTxtBg.y + acruleTxtBg.height/2 - (acruleTxt.height + this.countdownTxt.height)/2;
            this.countdownTxt.y = acruleTxt.y + acruleTxt.height;
        }




		// //进度区背景图片
		// let processBg: BaseBitmap = BaseBitmap.create("public_lockbg");
		// processBg.y = acruleTxtBg.y + acruleTxtBg.height - 10;
        // processBg.scaleX = acruleTxtBg.width / processBg.width * 2;
		// processBg.x = acruleTxtBg.x + acruleTxtBg.width/2 - processBg.width * processBg.scaleX/2;
        // processBg.height = 120;
		// this.addChild(processBg);
        // 血条
        this.bloodBar = ComponentManager.getProgressBar("progress_type1_green","progress_type3_bg", 470);
        this.bloodBar.x = 76;
        this.bloodBar.y = acruleTxtBg.y + acruleTxtBg.height - 10 + 72 - this.bloodBar.height/2;
        this.addChild(this.bloodBar);

        if(this.code == "6" || this.code == "5" || this.code == '4'){
            //起始箱子位
            let startBoxBg: BaseBitmap = BaseBitmap.create("buildingworship_startbox-5");
            startBoxBg.x = this.bloodBar.x - startBoxBg.width/2 - 10;
            startBoxBg.y = this.bloodBar.y - startBoxBg.height/2 + 7;
            this.addChild(startBoxBg);



            let scoreTip:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acBuildingWorshipScoreName-5"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
            scoreTip.textAlign = egret.HorizontalAlign.CENTER;
            scoreTip.x = startBoxBg.x + startBoxBg.width/2 - scoreTip.width/2;
            scoreTip.y = startBoxBg.y + 20;
            this.addChild(scoreTip);
            this.scoreTip = scoreTip;

            this.scoreTxt = ComponentManager.getTextField(String(this.vo.ainfo.lotterynum),20,TextFieldConst.COLOR_LIGHT_YELLOW);
            this.scoreTxt.x = scoreTip.x + scoreTip.width/2 - this.scoreTxt.width/2;
            this.scoreTxt.y = scoreTip.y + scoreTip.height ;
            this.addChild(this.scoreTxt);

        } else {
            //起始箱子位
            let startBoxBg: BaseBitmap = BaseBitmap.create("buildingworship_startbox");
            startBoxBg.x = this.bloodBar.x - startBoxBg.width/2 - 10;
            startBoxBg.y = this.bloodBar.y - startBoxBg.height/2 + 7;
            this.addChild(startBoxBg);
        }


        // 宝箱
        for (var i = 0; i < this.cfg.lotteryNum.length; i++) { 
			let tmprcfg = this.cfg.lotteryNum[i];


			let rStatus = 1 ;
            if (this.vo.ainfo.stageinfo[i+1]) {
                rStatus = 3; // 已领取
            } else if (this.vo.ainfo.lotterynum >= tmprcfg.needNum) {
                rStatus = 2;
            }
			let imgres = "dailytask_box1_";
			if (i == this.cfg.lotteryNum.length - 1){
				imgres = "acrechargeboxview_box";
            } else if (i > 1){
				imgres = "dailytask_box2_";
			}

			let boxImg = BaseLoadBitmap.create(imgres + String(rStatus));
            if (i == this.cfg.lotteryNum.length - 1){
                boxImg.setScale(0.6);
                boxImg.anchorOffsetX = 50;
                boxImg.anchorOffsetY = 75;
                boxImg.x = this.bloodBar.x + this.bloodBar.width*(tmprcfg.needNum/this.cfg.getMaxBoxNeedNum()) + 10;
                boxImg.y = this.bloodBar.y + 8;
            } else {
                boxImg.setScale(0.8);
                boxImg.anchorOffsetX = 60/2;
                boxImg.anchorOffsetY = 64/2;
                boxImg.x = this.bloodBar.x + this.bloodBar.width*(tmprcfg.needNum/this.cfg.getMaxBoxNeedNum());
                boxImg.y = this.bloodBar.y - 20;
            }
			boxImg.name = "boxImg"+i;
			
			let lightImg =  BaseLoadBitmap.create("dailytask_box_light");
			lightImg.anchorOffsetX = 80/2;
			lightImg.anchorOffsetY = 80/2;
			lightImg.x = boxImg.x + 5;
			lightImg.name = "lightImg"+i;
			lightImg.y = boxImg.y;
			lightImg.visible = false;
			this.addChild(lightImg);
			
			this.addChild(boxImg);
			boxImg.addTouchTap(this.boxClick,this,[i]);

        }




        if(this.code == "6" || this.code == "5"||this.code == '4'){
                    // 任务
            let iconBg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
            iconBg.x = 20//acruleTxtBg.x + acruleTxtBg.width - 200;
            iconBg.y = acruleTxtBg.y + acruleTxtBg.height + 108;
            this.addChild(iconBg);
            let taskRes = "buildingworship_taskIcon-5";


            let taskButton:BaseButton = ComponentManager.getButton(taskRes,"",this.taskButtonClick,this);
            taskButton.x = iconBg.x + iconBg.width/2 - taskButton.width/2;//20;
            taskButton.y = iconBg.y + iconBg.height/2 - taskButton.height/2;
            this.addChild(taskButton);
            let taskButtonTxt:BaseBitmap=BaseBitmap.create("acchristmasview_1_taskname");
            taskButtonTxt.x = taskButton.x + taskButton.width/2 - taskButtonTxt.width/2+3;
            taskButtonTxt.y = taskButton.y + 55 ;
            this.addChild(taskButtonTxt);
            this.taskButton = taskButton;


            // infoBtn.setPosition(acruleTxtBg.width -110,acruleTxtBg.y + acruleTxtBg.height + 108);

        } else {
            // 任务
            let iconBg:BaseBitmap=BaseBitmap.create("mainui_bottombtnbg");
            iconBg.x = 20;
            iconBg.y = this.bloodBar.y + 70;
            this.addChild(iconBg);
            let taskRes = "buildingworship_"+this.code+"_taskIcon";
     

            let taskButton:BaseButton = ComponentManager.getButton(taskRes,"",this.taskButtonClick,this);
            taskButton.x = 20;
            taskButton.y = this.bloodBar.y + 70;
            this.addChild(taskButton);
            let taskButtonTxt:BaseBitmap=BaseBitmap.create("acchristmasview_1_taskname");
            taskButtonTxt.x = taskButton.x + taskButton.width/2 - taskButtonTxt.width/2+3;
            taskButtonTxt.y = taskButton.y + 50 ;
            this.addChild(taskButtonTxt);
            this.taskButton = taskButton;

        }
        


        let bottomRes = "public_bottombg1";
        let bottomH = 120;
        if(this.code == "6" || this.code == "5" ||this.code == '4'){
            bottomRes = "buildingworship_bottombg-5";
            bottomH = 123;
        }

        // 底部背景
		let buttomBg:BaseBitmap=BaseBitmap.create(bottomRes);
		buttomBg.height=bottomH;
		buttomBg.y = GameConfig.stageHeigth-buttomBg.height;
		this.addChild(buttomBg);


        // 修缮

        if(this.code == "6" || this.code == "5"||this.code == '4'){
            this.doButton =  ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acBuildingWorshipDo-5",this.doButtonClick,this);
            this.doButton.x = (buttomBg.width - this.doButton.width*2)/3;
            this.doButton.y = buttomBg.y + buttomBg.height/2 - this.doButton.height/2 + 20;
            this.addChild(this.doButton);

            let btnMark = BaseBitmap.create("buildingworship_btnmark-5");
            btnMark.x = this.doButton.x +  this.doButton.width - 50;
            btnMark.y = this.doButton.y - 20;
            this.addChild(btnMark);
        } else {
            this.doButton =  ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acBuildingWorshipDo",this.doButtonClick,this);
            this.doButton.x = (buttomBg.width - this.doButton.width*2)/3;
            this.doButton.y = buttomBg.y + buttomBg.height/2 - this.doButton.height/2 + 20;
            this.addChild(this.doButton);
        }


		let gemIcon1:BaseBitmap=BaseBitmap.create("itemicon1");
        gemIcon1.setScale(0.4);
		gemIcon1.y = this.doButton.y - 20 - gemIcon1.height*gemIcon1.scaleY/2;
		this.addChild(gemIcon1);
        let gemTxt1 = ComponentManager.getTextField(String(this.cfg.cost),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        gemTxt1.y = this.doButton.y - 15 - gemTxt1.height/2;
        this.addChild(gemTxt1);
		gemIcon1.x = this.doButton.x + this.doButton.width/2 - (gemIcon1.width*gemIcon1.scaleX + 10 + gemTxt1.width)/2;
        gemTxt1.x = gemIcon1.x + gemIcon1.width * gemIcon1.scaleX + 10;


        if(this.code == "6" || this.code == "5"||this.code == '4'){
            // 攻击10次按钮
            this.do10Button =  ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE,"acBuildingWorshipDo10-5",this.do10ButtonClick,this);
            this.do10Button.x = buttomBg.width - (buttomBg.width - this.doButton.width*2)/3 - this.do10Button.width;
            this.do10Button.y = this.doButton.y
            this.addChild(this.do10Button);

            let btnMark = BaseBitmap.create("buildingworship_btnmark-5");
            btnMark.x = this.do10Button.x +  this.do10Button.width - 50;
            btnMark.y = this.do10Button.y - 20;
            this.addChild(btnMark);
            this.showFirstDialog();
            
        } else {
            // 攻击10次按钮
            this.do10Button =  ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acBuildingWorshipDo10",this.do10ButtonClick,this);
            this.do10Button.x = buttomBg.width - (buttomBg.width - this.doButton.width*2)/3 - this.do10Button.width;
            this.do10Button.y = this.doButton.y
            this.addChild(this.do10Button);
        }


		let gemIcon2:BaseBitmap=BaseBitmap.create("itemicon1");
        gemIcon2.setScale(0.4);
		gemIcon2.y = this.do10Button.y - 20 - gemIcon2.height*gemIcon2.scaleY/2;
		this.addChild(gemIcon2);
        let gemTxt2 = ComponentManager.getTextField(String(this.cfg.cost * 10 * this.cfg.discount),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        gemTxt2.y = this.do10Button.y - 15 - gemTxt2.height/2;
        this.addChild(gemTxt2);
		gemIcon2.x = this.do10Button.x + this.do10Button.width/2 - (gemIcon2.width*gemIcon2.scaleX + 10 + gemTxt2.width)/2;
        gemTxt2.x = gemIcon2.x + gemIcon2.width * gemIcon2.scaleX + 10;

        // 开始随机说话
        this.randomSay();
        this.refreshData();

        if (AcBuildingWorshipView.reportShowed[this.code] == 0) {
            ViewController.getInstance().openView(ViewConst.BASE.ACBUILDINGWORSHIPREPORTVIEW,{aid:this.aid,code:this.code});
            AcBuildingWorshipView.reportShowed[this.code] = 1;
        }
    }
    private showFirstDialog(){
        if(!this.vo.getFirstOpen()){
            
           
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.aid + "-" + this.code,flagkey:"firstOpen",value:1});
            ViewController.getInstance().openView(ViewConst.BASE.ACBUILDINGWORSHIPAVGVIEW,{

                idx : 1,
                buidId : "first",
                aid : this.aid,
                code : 4
            });

        }
    }	
    private randomSay() {
        if (this.vo.ainfo.lotterynum < this.cfg.getMaxBoxNeedNum()) {
            // 随机一个人说话
            let rndSayBg:BaseBitmap=BaseBitmap.create("public_9_qipao");
            let rndSayTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acBuildingWorshipTip" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            rndSayBg.width=rndSayTxt.width + 40;
            rndSayBg.height=56;
            rndSayBg.x = this.bloodBar.x + this.bloodBar.width - rndSayBg.width + 80;
            rndSayBg.y = this.bloodBar.y + this.bloodBar.height + rndSayBg.height + 20;
            rndSayBg.scaleY = -1;
            this.addChild(rndSayBg);
            rndSayTxt.x = rndSayBg.x + rndSayBg.scaleX * rndSayBg.width/2 - rndSayTxt.width/2;
            rndSayTxt.y = rndSayBg.y - rndSayBg.height / 2 - rndSayTxt.height / 2+8;
            this.addChild(rndSayTxt);

            let rndSayHead:BaseBitmap=BaseBitmap.create("buildingworship_"+this.code+"_talk_head");
            rndSayHead.x = rndSayBg.x - rndSayHead.width + 28;
            rndSayHead.y = rndSayBg.y - rndSayBg.height/2 - rndSayHead.height/2 - 3;
            this.addChild(rndSayHead);

            egret.Tween.get(rndSayBg)
                .wait(4000)
                .call(()=>{
                    rndSayBg.visible = false;
                    rndSayTxt.visible = false;
                    rndSayHead.visible = false;
                })
                .wait(6000)            
                .call(()=>{
                    this.randomSay();
                    rndSayBg.parent.removeChild(rndSayBg);
                    rndSayTxt.parent.removeChild(rndSayTxt);
                    rndSayHead.parent.removeChild(rndSayHead);
                });
        }
    }
	/**
	 * 查看信息
	 */
    private infoBtnClick() {
        if (this.code == '5' || this.code == '6'||this.code=='4') {
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTWIFEDETAILVIEW, { servantId: 1062, wifeId: 234 });
        } else {
            ViewController.getInstance().openView(ViewConst.POPUP.ACBUILDINGWORSHIPACINFOPOPUPVIEW, { "code": this.code, "aid": this.aid });
        }
    }
	protected getTitleBgName():string
	{
		
		if(this.code == "6" || this.code == "5"||this.code == '4'){
            return "buildingworship_titlebg-5";
        }
        // super.getTitleBgName();
        return "commonview_titlebg";

	}

	protected getTitleStr():string
	{
		return  this.code == "6" || this.code == "5"||this.code =='4' ? "" : super.getTitleStr();
	}

    private tick()
    {
        let isInActivity = this.vo.isInActivity();
        if (isInActivity) {
            this.countdownTxt.text = LanguageManager.getlocal("acTigertrappass_countdown_time", [this.vo.acCountDown]);
        } else {
            this.countdownTxt.text = LanguageManager.getlocal("acPunishEnd");
        }
        if (this.code == "6" || this.code == "5" || this.code == '4') {
            this.countdownTxt.x = 620 - this.countdownTxt.width;
        }
    }
    // 刷新数据
	private refreshData()
	{

        if(this.scoreTxt){
            this.scoreTxt.text = String(this.vo.ainfo.lotterynum);
            this.scoreTxt.x = this.scoreTip.x + this.scoreTip.width/2 - this.scoreTxt.width/2;
            this.scoreTxt.y = this.scoreTip.y + this.scoreTip.height;
        }

     



        let process = this.vo.ainfo.lotterynum / this.cfg.getMaxBoxNeedNum();
        this.bloodBar.setPercentage(process);
        if(this.code == "6" || this.code == "5"||this.code == '4'){

        } else {
             this.bloodBar.setText(Math.min(100, Math.floor(process * 100)) + "%");
        }
       

        // 宝箱状态
        for (var i = 0; i < this.cfg.lotteryNum.length; i++) { 
			let tmprcfg = this.cfg.lotteryNum[i];
			// let tmpRew = Config.DailytaskCfg.getDailyRewardsCfgByRewardId(tmpK);
			let boxImg = this.getChildByName("boxImg"+i);
			let lightImg =  this.getChildByName("lightImg"+ i);

			let rStatus = 1 ;
            if (this.vo.ainfo.stageinfo[i+1]) {
                rStatus = 3; // 已领取
            } else if (this.vo.ainfo.lotterynum >= tmprcfg.needNum) {
                rStatus = 2;
            }
			let imgres = "dailytask_box1_";
			if (i == this.cfg.lotteryNum.length - 1){
				imgres = "acrechargeboxview_box";
            } else if (i >1){
				imgres = "dailytask_box2_";
			}
			
			if (boxImg instanceof(BaseBitmap))
			{
				boxImg.texture = ResourceManager.getRes(imgres + rStatus);
			}
			
			if (rStatus == 2) //可领取状态需要添加背景光
			{	
				lightImg.visible = true;
				egret.Tween.get(lightImg,{loop:true}).to({rotation:lightImg.rotation+360},10000);
				egret.Tween.get(boxImg,{loop:true}).to({rotation:10},50).to({rotation:-10},100).to({rotation:10},100).to({rotation:0},50).wait(500);
			}else
			{
				lightImg.visible = false;
				egret.Tween.removeTweens(lightImg);
				egret.Tween.removeTweens(boxImg);
			}
		}
        
		if (this.vo.isHaveTaskRedDot()) {
			App.CommonUtil.addIconToBDOC(this.taskButton);
		}else{
			App.CommonUtil.removeIconFromBDOC(this.taskButton);
		}
        // this.struts1.visible = true;
        // this.struts2.visible = true;

        // this.struts3.visible = true;


        if(this.code =="6"||this.code == "5"||this.code == '4'){

        } else {
            this.struts1.visible = process < 1;
            this.struts2.visible = process < 0.66;
            this.struts3.visible = process < 0.33;
            this.man1.visible = this.struts1.visible;
            this.man2.visible = this.struts2.visible;

            // 礼花
            if (process >= 1) {
                this.showLihua();
            }
            // 背景
            this.bigBg.setload("buildingworship_"+this.code+"_bg_" + (process >= 1?"over":"notover"));
        }

        
	}

    //放礼花
    private showLihua(){
        if(this._isShowLihua){
            return;
        }

        this.createLihua();

        this._isShowLihua = true;
    }
    private _lihuaPool = {"hong":[],"huang":[],"lan":[]};
    private _lihuaParam = ["hong","huang","lan"];
    private createLihua(){
        let x = 0 + Math.floor(Math.random() * GameConfig.stageWidth);
        let y = 120 + Math.floor(Math.random() * 200);
        let scale = 0.8 + Math.random() * 0.5;
 
        let index = Math.floor(Math.random() * 3);
        let delay = 500 + Math.floor(Math.random() * 500);

        let lihuaName = this._lihuaParam[index];
        let lihuaclip:CustomMovieClip = null;
        if(this._lihuaPool[lihuaName].length > 0){
            // App.LogUtil.log("from pool");
            lihuaclip = this._lihuaPool[lihuaName].pop();
        } else {
            // App.LogUtil.log("from create");
            lihuaclip = ComponentManager.getCustomMovieClip(`lihua_${lihuaName}000`, 10, 150);
        }
        // lihuaclip = ComponentManager.getCustomMovieClip(`lihua_${param[index]}000`, 10, 150);
        lihuaclip.x = x;
        lihuaclip.y = y;
        lihuaclip.setScale(scale);

        if(this.effectNode){
            this.effectNode.addChild(lihuaclip);
            lihuaclip.playWithTime(1);
            lihuaclip.setEndCallBack(()=>{
                this.effectNode.removeChild(lihuaclip);
                if(this._lihuaPool[lihuaName].length <4){
                    this._lihuaPool[lihuaName].push(lihuaclip);
                }
                
            },this);


            egret.setTimeout(()=>{
                this.createLihua();
            },this,delay);
        }
        
    }
    private taskButtonClick() {
        App.LogUtil.log("taskButtonClick");
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACBUILDINGWORSHIPTASKVIEW,{"aid":this.aid,"code":this.code});
    }
    private boxClick(event, index) {
        App.LogUtil.log("boxClick", index);
        
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if ((!this.vo.ainfo.stageinfo[index+1]) && this.vo.ainfo.lotterynum >= this.cfg.lotteryNum[index].needNum) {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPBOXREWARD, { "activeId": this.aid + "-" + this.code, "gid": index + 1 });
        } else {
            if (index == this.cfg.lotteryNum.length-1) {
                // NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:3, kid:NetRequestConst.KID_BUILDINGWORSHIPAC});
            }
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{type : this.aid, activeCode: this.code, id : index});
        }
    }
    private doClick(count) {
        if (this._inAni == true) {
            return;
        }
        App.LogUtil.log("doClick", count);
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }

		let gem = Api.playerVoApi.getPlayerGem();
        let needGem = 0;
        if (count == 1) {
            needGem = this.cfg.cost;
        } else {
            needGem = this.cfg.cost * 10 * this.cfg.discount;
        }

        let message:string = null;
        if(this.code == "6" || this.code == "5"||this.code == "4"){
            message = LanguageManager.getlocal("acBuildingWorshipBuyConfirm-5",[String(needGem),count]);
        } else {
            message = LanguageManager.getlocal("acBuildingWorshipBuyConfirm",[String(needGem),count]);
        }
        
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{useNum:needGem,confirmCallback:()=>{

            if(this.code == "6" || this.code == "5"||this.code == "4"){
                this.doReal(count);
                // this.hammer.visible = true;
                // this.hammer.playWithTime(1);
                // this.hammer.setEndCallBack(this.doReal.bind(this, count), this);
            
                // egret.setTimeout(()=>{
                //     SoundManager.playEffect(SoundConst.EFFECT_BUILDING);
                // },this,200);
                
                // egret.setTimeout(()=>{
                //     SoundManager.playEffect(SoundConst.EFFECT_BUILDING);
                // },this,600);
            } else {
                this.hammer.visible = true;
                this.hammer.playWithTime(1);
                this.hammer.setEndCallBack(this.doReal.bind(this, count), this);
            
                egret.setTimeout(()=>{
                    SoundManager.playEffect(SoundConst.EFFECT_BUILDING);
                },this,200);
                
                egret.setTimeout(()=>{
                    SoundManager.playEffect(SoundConst.EFFECT_BUILDING);
                },this,600);
            }


            // this.doReal(count);
        },handler:this,icon:"itemicon1",iconBg: "itembg_1",num:gem,msg:message,id : 1});
    }
    // 经过二次确认后的发请求
    private doReal(count) {
        if(this.hammer){
            this.hammer.visible = false;
        }
       
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        let needGem = 0;
        if (count == 1) {
            needGem = this.cfg.cost;
        } else {
            needGem = this.cfg.cost * 10 * this.cfg.discount;
        }
        if (needGem > Api.playerVoApi.getPlayerGem()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('allianceBossOpen_tip5'));
            return;
        }
        this._inAni = true;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPREWARD, { "activeId": this.aid + "-" + this.code, "gid": count });
    }
    private doButtonClick() {
        this.doClick(1);
    }
    private do10ButtonClick() {
        this.doClick(10);
    }
    private timeOut = -1;
    // 获得奖励
	private getRewardHandler(event:egret.Event)
	{
        if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPREWARD) {
            if (event.data.data.ret === 0) {
                // let data = event.data.data.data;
                this._rewardData = event.data.data.data;
                if (this.code == '5' || this.code == '6' ||this.code =='4') {
                    if (this._clamp) {
                        this._clamp.visible = true;
                        this._clamp.resume();
                        egret.clearTimeout(this.timeOut);
                        this.timeOut = egret.setTimeout(() => {
                            this.showReward();
                        }, this, 2200)
                    } else {
                        this.showReward();
                    }
                    let _wifeNode = this._wifeNode;
                    if (_wifeNode) {
                        egret.Tween.removeTweens(_wifeNode);
                        _wifeNode.alpha = 0;
                    }
                } else {
                    this.showReward();
                }
            } else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
	}
    private _rewardData = null;
    private showReward() {
        if(!this)
        {
            return;
        }   
        let data = this._rewardData;
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {
            "rewards": data.rewards,
            "otherRewards": data.otherrewards,
            "isPlayAni": true,
            showTip: data.isluck > 0 ? LanguageManager.getlocal("acHuLaoBaoji") : null,
            callback: this.showManSay,
            target: this
        });
        this._inAni = false;
    }
    // 获得宝箱奖励
	private getNumRewardHandler(event:egret.Event)
	{
        if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPBOXREWARD) {
            if (event.data.data.ret === 0) {
                let data = event.data.data.data;
                Api.servantVoApi.checkServantChangeRewards(data.cfrewards,data.rewards);
                // ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":data.rewards,"otherRewards":data.otherrewards,"isPlayAni":true});
            } else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
	}
    // 大门客说话
    private showManSay() {
        if(!this||!this.manNode)
        {
            return;
        }
        if (this.code == '5' || this.code == '6' ||this.code == '4') {
            this.beginShowText();
            return
        }
        if (this.vo.ainfo.lotterynum >= this.cfg.getMaxBoxNeedNum()) {
            return;
        }
        // 门客
        let servant = BaseLoadBitmap.create("servant_full_" + ["1042","1041"][parseInt(this.code) - 1]);
		servant.width = 640;
		servant.height = 482;
        servant.setScale(0.7);
		servant.x = GameConfig.stageWidth - 100 - servant.width*servant.scaleX; 
		servant.y = GameConfig.stageHeigth - 450; 
		this.manNode.addChild(servant);

        // 说话
        let rndSay = Math.floor(Math.random() * 5);
        let rndSayBg:BaseBitmap=BaseBitmap.create("public_9v_bg11");
        let rndSayTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acBuildingWorshipBigServantTip" + this.code + "_" + (rndSay + 1)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        rndSayTxt.width = 200;
        rndSayBg.width=rndSayTxt.width + 30;
        rndSayBg.height=rndSayTxt.height + 60;
        rndSayBg.x = servant.x - rndSayBg.width + 200;
        rndSayBg.y = servant.y;
        this.manNode.addChild(rndSayBg);
        rndSayTxt.x = rndSayBg.x + rndSayBg.scaleX * rndSayBg.width/2 - rndSayTxt.width/2;
        rndSayTxt.y = rndSayBg.y + 20;
        this.manNode.addChild(rndSayTxt);

        egret.Tween.get(servant)
            .wait(3000)          
            .call(()=>{
                servant.parent.removeChild(servant);
                rndSayTxt.parent.removeChild(rndSayTxt);
                rndSayBg.parent.removeChild(rndSayBg);
            });
    }

	protected getSoundBgName():string
	{
		return "music_dailyboss";
	}
    protected getResourceList():string[]
	{
        let resList = null;
        if(this.code == "1" || this.code == "2" || this.code == "3"){
            resList = [
                "tigertrappass_topbg",
                "dailytask_box1_1",
                "dailytask_box1_2",
                "dailytask_box1_3",
                "dailytask_box2_1",
                "dailytask_box2_2",
                "dailytask_box2_3",
                "progress_type1_green",
                "progress_type3_bg",
                "acrechargeboxview_box1",
                "acrechargeboxview_box2",
                "acrechargeboxview_box3",
                "itemicon1",
                "acchristmasview_1_taskname",
                "buildingworship_startbox",
                "buildingworship_"+this.code+"_talk_head",
                "buildingworship_"+this.code+"_taskIcon",
            ];
        }
        if(this.code == "6" || this.code == "5" || this.code=='4'){
            resList = [
                
                "dailytask_box1_1",
                "dailytask_box1_2",
                "dailytask_box1_3",
                "dailytask_box2_1",
                "dailytask_box2_2",
                "dailytask_box2_3",
                "progress_type1_green",
                "progress_type3_bg",
                
                "acrechargeboxview_box1",
                "acrechargeboxview_box2",
                "acrechargeboxview_box3",
                "itemicon1",

                "acchristmasview_1_taskname",
                "acredlotuswarrior_infobtn",
                "buildingworship_bottombg-5",
                "buildingworship_btnmark-5",
                "buildingworship_startbox-5",
                "buildingworship_numbg-5",
                "buildingworship_talkbg-5",
                "buildingworship_titlebg-5",
                "buildingworship_titletxt-5",
                "buildingworship_topbg-5",
                "buildingworship_taskIcon-5",
                'buildingworship_5_bg_02'
                // "buildingworship_"+this.code+"_talk_head",
                // "buildingworship_"+this.code+"_taskIcon",
            ];

        }

		return super.getResourceList().concat(resList);
	}
    protected getRuleInfo():string
    {
        return "acbuildingworshipRuleInfo" + this.code;
    }
    public dispose():void
	{   
        
        this.bloodBar = null;
        this.countdownTxt = null;
        this.doButton = null;
        this.do10Button = null;
        this.taskButton = null;
        this.manNode = null;
        this.effectNode = null;
        this.struts1 = null;
        this.struts2 = null;
        this.struts3 = null;
        this.man1 = null;
        this.man2 = null;
        this.hammer = null;
        this._isShowLihua = false;
        this.bigBg = null;
        this.scoreTxt = null;
        this.scoreTip = null;
        this._clamp = null;
        this._wifeNode = null;
        this._wifeWord = null;
        this._inAni = false;
        egret.clearTimeout(this.timeOut);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPTASKREWARD),this.getRewardHandler,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPBOXREWARD),this.getNumRewardHandler,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshData,this);
        super.dispose();
    }
}