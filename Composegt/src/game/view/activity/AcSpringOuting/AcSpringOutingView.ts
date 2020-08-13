/**
 * 春分活动
 * 2019/3/4
 * jiangliuyang
 */
class AcSpringOutingView extends AcCommonView
{
    // private _timeText: BaseTextField = null;
    private _countText: BaseTextField = null;
    private _progress: ProgressBar = null;
    private _taskBtn: BaseButton = null;
    private _numText: BaseTextField = null;
    private _numBg: BaseBitmap = null;
    private _animMap = null; 
    private _luckAnim:CustomMovieClip = null; 
    private _resiTimeText: BaseTextField = null;

    private _progressAnim:CustomMovieClip = null;
    private _taskHand: BaseBitmap = null;
    private _baseX:number = 0;
    private _baseY: number = 0;
    private _luckText:BaseTextField = null;
    private _luckValueText:BaseTextField = null;
    private _tiliText:BaseTextField = null;
    public static AID:string = null;
    public static CODE:string = null;

    private _lihuaParam = ["hong","huang","lan"];
    private _isShowLihua = false;
    private _lihuaPool = {"hong":[],"huang":[],"lan":[]};
    private _buildCountainer:BaseDisplayObjectContainer = null;
    private _timeoutid:number = -1;

    private get cfg() : Config.AcCfg.SpringOutingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    protected get acVo():AcSpringOutingVo
	{
		return <AcSpringOutingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
	}
    protected isShowOpenAni():boolean
	{
		return false;
	}
    public constructor() {
		super();
	}

	public initView():void
	{
        AcSpringOutingView.AID = this.aid;
		AcSpringOutingView.CODE = this.code;

        




        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETSPRINGOUTINGREWARD),this.getRewardHandler,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETSPRINGOUTINGBOXREWARD),this.getNumRewardHandler,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshData,this);


        if(this.code == "1" ||this.code =="2"){
            let titleFont = BaseLoadBitmap.create(this.getDefaultRes("acspringouting_titletxt"));
            titleFont.width = 181;
            titleFont.height = 64;
            titleFont.x = GameConfig.stageWidth/2 - titleFont.width/2;
            titleFont.y = 4;
            this.addChild(titleFont);

            let timeBg = BaseLoadBitmap.create(this.getDefaultRes("acspringouting_titlebg"));
            timeBg.width = 640;
            timeBg.height = 71;
            timeBg.x = 0;
            timeBg.y = 72;
            this.addChild(timeBg);

            let timeText = ComponentManager.getTextField(LanguageManager.getlocal("acSpringOutingTime",[this.acVo.acTimeAndHour]),20,TextFieldConst.COLOR_WHITE);
            timeText.x = 20;
            timeText.y = timeBg.y + 10// timeBg.height/2 - timeText.height/2;
            this.addChild(timeText);
            
            let deltaT = this.acVo.et - GameData.serverTime;
            let timeStr = "";
            if (deltaT > 0) {
                timeStr = LanguageManager.getlocal("acSpringOutingResidueTime", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
                
            } else {
                timeStr = LanguageManager.getlocal("acSpringOutingResidueTime", [LanguageManager.getlocal("acSpringOutingTimeEnd")]);
            }

            this._resiTimeText = ComponentManager.getTextField(timeStr, 20, TextFieldConst.COLOR_WHITE);
            this._resiTimeText.x = 20;
            this._resiTimeText.y = timeBg.y + timeBg.height - 10-this._resiTimeText.height;
            this.addChild(this._resiTimeText);




            this._taskBtn = ComponentManager.getButton(this.getDefaultRes("acspringouting_taskicon"),null,this.taskBtnClick,this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this._taskBtn, timeBg, [20,timeBg.height + 20]);
            this.addChild(this._taskBtn);

            let taskBtnText = BaseBitmap.create(this.getDefaultRes("acspringouting_taskname"));
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, taskBtnText, this._taskBtn, [0,0]);
            this.addChild(taskBtnText);


            let countBg = BaseBitmap.create(this.getDefaultRes("acspringouting_countbg"));
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, countBg, timeBg, [10,timeBg.height + 40]);
            this.addChild(countBg);

            let countIcon = BaseBitmap.create(this.getDefaultRes("acspringouting_icon"));
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, countIcon, countBg, [-40,0]);
            this.addChild(countIcon);
            
            this._countText = ComponentManager.getTextField("0",20,TextFieldConst.COLOR_WHITE);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, this._countText, countBg, [65,0]);
            this.addChild(this._countText);



            if(this.code == "1" && App.CommonUtil.check_dragon() && RES.hasRes("yinghuapiaopiao_ske")){
               
                let flowerBoneNode=App.DragonBonesUtil.getLoadDragonBones("yinghuapiaopiao");//xuehua_piaopiao actigertrappass
            
                flowerBoneNode.x = GameConfig.stageWidth/2;
                flowerBoneNode.y = 200;
                flowerBoneNode.setScale(3);
                this.addChild(flowerBoneNode);
                
            }


            if(App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("wife_full3_1071_ske"))
            {



                let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones("wife_full3_1071");
                droWifeIcon.setScale(1)
                droWifeIcon.x = 200;
                droWifeIcon.y = GameConfig.stageHeigth - 150 + 3;
                this.addChild(droWifeIcon);
            }
            else
            {
                // wife 的 图片
                let scaleNum = 0.7;
                let wifeBM =  BaseLoadBitmap.create("wife_skin_1071");
                wifeBM.width = 640;
                wifeBM.height = 840;
                wifeBM.setScale(scaleNum);
                wifeBM.x = 0;
                wifeBM.y = GameConfig.stageHeigth - 150 - 840 * 0.7;
                this.addChild(wifeBM);
            }


            let talkBg = BaseBitmap.create("public_9v_bg11_2");
            talkBg.width = 180;
            talkBg.height = 120;
            talkBg.scaleX = -1;
            talkBg.x = GameConfig.stageWidth/2 + talkBg.width - 30;
            talkBg.y = timeBg.y + 400 - 220;
            this.addChild(talkBg);

            let talk = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acSpringOutingPeople")),18,TextFieldConst.COLOR_BROWN);
            talk.width = 150;
            talk.x = talkBg.x + 15 - talkBg.width;
            talk.y = talkBg.y + 15;
            this.addChild(talk);
        

            let bottom = BaseBitmap.create("public_bottombg1");
            bottom.height = 150;
            bottom.x = 0;
            bottom.y = GameConfig.stageHeigth - bottom.height;
            this.addChild(bottom);

            let bottomTip = BaseBitmap.create("public_9_bg8");
            bottomTip.width = GameConfig.stageWidth;
            bottomTip.height = 30;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bottomTip, bottom, [0,-bottomTip.height+1]);
            this.addChild(bottomTip);

            let bottomTipText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acSpringOutingBottomTipText"),[this.cfg.getRechargeCost()+"","1"]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bottomTipText, bottomTip, [0,0]);
            this.addChild(bottomTipText);



            this._progress = ComponentManager.getProgressBar(this.getDefaultRes("acspringouting_progressbar"),this.getDefaultRes("acspringouting_progressbg"),450);
            // this._progress.setPercentage(0.3);
            this._progress.rotation = -90;
            this._progress.x = GameConfig.stageWidth - 90;
            this._progress.y = bottom.y - 70 - (150 - 70) * (GameConfig.stageHeigth - 960) / (1136 - 960);  //70   150
            this.addChild(this._progress);

            let progressAnimRes = "";
            if(ResourceManager.hasRes("acspringouting-"+this.code+"_press")){
                progressAnimRes = "acspringouting-"+this.code+"_press";
            } else {
                progressAnimRes = "acspringouting-_press";
            }
            this._progressAnim = ComponentManager.getCustomMovieClip(progressAnimRes, 6, 150);

            this._progressAnim.x = this._progress.x + this._progress.height/2 - 50 -1;
            this._progressAnim.y = this._progress.y - (this._progress.getPercent()>1?1:this._progress.getPercent()) * this._progress.width - 40 + 17;

            // this._progressAnim.blendMode = egret.BlendMode.ADD;
            this._progressAnim.playWithTime(-1)
            this.addChild(this._progressAnim);


            let luckBg = BaseBitmap.create(this.getDefaultRes("acspringouting_rightbg"));
            luckBg.x = this._progress.x + this._progress.height/2 - luckBg.width/2;
            luckBg.y = this._progress.y;
            this.addChild(luckBg);
            let luckAnimRes = "";
            if(ResourceManager.hasRes("acspringouting-"+this.code+"_luck")){
                luckAnimRes = "acspringouting-"+this.code+"_luck";
            } else {
                luckAnimRes = "acspringouting-1_luck";
            }
            this._luckAnim = ComponentManager.getCustomMovieClip(luckAnimRes, 6, 50);
            this._luckAnim.x = luckBg.x + luckBg.width/2 - 160/2;
            this._luckAnim.y = luckBg.y + luckBg.height/2 - 80/2;
            this._luckAnim.blendMode = egret.BlendMode.ADD;
            this._luckAnim.visible = false;
            this.addChild(this._luckAnim);
            
            let luckText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acSpringOutingLuckText")),20,TextFieldConst.COLOR_WHITE);
            luckText.x = luckBg.x + luckBg.width/2 - luckText.width/2;
            luckText.y = luckBg.y + luckBg.height/2 - luckText.height/2;
            this.addChild(luckText);


            let onceBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE,this.getDefaultCn("acSpringOutingOnceText"),this.onceBtnClick,this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, onceBtn, bottom, [60,7]);
            this.addChild(onceBtn);
            let tenBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,this.getDefaultCn("acSpringOutingTenText"),this.tenBtnClick,this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, tenBtn, bottom, [60,7]);
            this.addChild(tenBtn);

            let onceIcon = BaseBitmap.create(this.getDefaultRes("acspringouting_icon"));
            onceIcon.setScale(0.8);
            let onceText = ComponentManager.getTextField(this.cfg.cost+"",20,TextFieldConst.COLOR_LIGHT_YELLOW);

            onceIcon.x = onceBtn.x + onceBtn.width/2 - (onceIcon.width * onceIcon.scaleX + onceText.width)/2;
            onceIcon.y = onceBtn.y - onceIcon.height * onceIcon.scaleY;
            this.addChild(onceIcon);

            onceText.x = onceIcon.x + onceIcon.width * onceIcon.scaleX;
            onceText.y = onceIcon.y + onceIcon.height * onceIcon.scaleY / 2 - onceText.height/2;
            this.addChild(onceText);
            
            let tenIcon = BaseBitmap.create(this.getDefaultRes("acspringouting_icon"));
            tenIcon.setScale(0.8);
            let tenText = ComponentManager.getTextField(this.cfg.cost * 10+"",20,TextFieldConst.COLOR_LIGHT_YELLOW);

            tenIcon.x = tenBtn.x + tenBtn.width/2 - (tenIcon.width * tenIcon.scaleX + tenText.width)/2;
            tenIcon.y = tenBtn.y - tenIcon.height * tenIcon.scaleY;
            this.addChild(tenIcon);

            tenText.x = tenIcon.x + tenIcon.width * tenIcon.scaleX;
            tenText.y = tenIcon.y + tenIcon.height * tenIcon.scaleY / 2 - tenText.height/2;
            this.addChild(tenText);
            this._animMap ={};
            // 宝箱
            for (var i = 0; i < this.cfg.lotteryNum.length; i++) { 
                let tmprcfg = this.cfg.lotteryNum[i];


                let rStatus = 1 ;
                if (this.acVo.ainfo.stageinfo[i+1]) {
                    rStatus = 3; // 已领取
                } else if (this.acVo.ainfo.lotterynum >= tmprcfg.needNum) {
                    rStatus = 2;
                }
                let imgresbg = this.getDefaultRes("acspringouting_heartbg");
                let imgres = this.getDefaultRes("acspringouting_heart");
                let lightres ="";
                if(ResourceManager.hasRes("acspringouting-"+this.code+"_heart")){
                    lightres = "acspringouting-"+this.code+"_heart";
                } else {
                    lightres = "acspringouting-1_heart";
                }
                let scale = 1;
                if (i == this.cfg.lotteryNum.length - 1){
                    scale = 1;
                } else {
                    scale = 0.6;
                }

                let boxImgBg = BaseBitmap.create(imgresbg);
                let boxImg = BaseBitmap.create(imgres);
                let lightClip:CustomMovieClip = ComponentManager.getCustomMovieClip(lightres,6,200);
                // lightClip.blendMode = egret.BlendMode.ADD;


                if (i == this.cfg.lotteryNum.length - 1){
                    boxImgBg.setScale(scale);
                    boxImgBg.x = this._progress.x + this._progress.height / 2 - boxImgBg.width * scale/2;
                    boxImgBg.y = this._progress.y - this._progress.width - boxImgBg.height + 15;

                    this._baseX = boxImgBg.x + boxImgBg.width * scale / 2;
                    this._baseY = boxImgBg.y + boxImgBg.height * scale / 2;
                    boxImg.setScale(scale);
                    boxImg.x = this._progress.x + this._progress.height / 2 - boxImg.width * scale/2;
                    boxImg.y = this._progress.y - this._progress.width - boxImg.height + 15;

                    lightClip.setScale(scale + 0.1);
                    lightClip.x = boxImgBg.x + boxImgBg.width/2 - 150 *(scale + 0.1)/2+2; //this._progress.x + this._progress.height / 2 - lightClip.width * scale/2;
                    lightClip.y = boxImgBg.y + boxImgBg.height/2 - 150 *(scale + 0.1)/2-4;//this._progress.y - this._progress.width - lightClip.height + 15;
                
                } else {
                    boxImgBg.setScale(scale);
                    boxImgBg.anchorOffsetX = boxImgBg.width/2;
                    boxImgBg.anchorOffsetY = boxImgBg.height/2;
                    boxImgBg.x = this._progress.x + this._progress.height/2
                    boxImgBg.y = this._progress.y - this._progress.width * ((i+1)/this.cfg.lotteryNum.length);

                    boxImg.setScale(scale);
                    boxImg.anchorOffsetX = boxImg.width/2;
                    boxImg.anchorOffsetY = boxImg.height/2;
                    boxImg.x = boxImgBg.x;
                    boxImg.y = boxImgBg.y;

                    lightClip.setScale(scale + 0.1);
                    lightClip.x = boxImgBg.x - 150 * (scale+0.1)/2 +1;
                    lightClip.y = boxImgBg.y - 150 * (scale+0.1)/2 -2;
                }
                boxImgBg.name = "boxImgBg"+i;
                boxImg.name = "boxImg"+i;
                lightClip.name = "lightClip"+i;
                
                this._animMap["lightClip"+i] = lightClip;
                this.addChild(boxImgBg);
                this.addChild(boxImg);
                this.addChild(lightClip);
                boxImg.visible = false;
                lightClip.visible = false;
                boxImgBg.addTouchTap(this.boxClick,this,[i]);

            }
            this.showFirstDialog();
            this.startNumShow();
            this.refreshData();
        } else if(this.code == "3"){
            let titleFont = BaseLoadBitmap.create(this.getDefaultRes("acspringouting_titletxt"));
            titleFont.width = 300;
            titleFont.height = 75;
            titleFont.x = GameConfig.stageWidth/2 - titleFont.width/2;
            titleFont.y = 4;
            this.addChild(titleFont);

            let timeBg = BaseLoadBitmap.create(this.getDefaultRes("acspringouting_titlebg"));
            timeBg.width = 640;
            timeBg.height = 142;
            timeBg.x = 0;
            timeBg.y = 72;
            

            this._buildCountainer = new BaseDisplayObjectContainer();
            this._buildCountainer.width = 640;
            this._buildCountainer.height = 130;
            this._buildCountainer.x = 0;
            this._buildCountainer.y = timeBg.y + timeBg.height;
            this.addChild(this._buildCountainer);
            this.addChild(timeBg);

            if(this.closeBtn){
                this.setChildIndex(this.closeBtn,this.getChildIndex(timeBg));
            }

            let timeText = ComponentManager.getTextField(LanguageManager.getlocal("acSpringOutingTime",[this.acVo.acTimeAndHour]),20,TextFieldConst.COLOR_WHITE);
            timeText.x = 20;
            timeText.y = timeBg.y + 10// timeBg.height/2 - timeText.height/2;
            this.addChild(timeText);
            
            let deltaT = this.acVo.et - GameData.serverTime;
            let timeStr = "";
            if (deltaT > 0) {
                timeStr = LanguageManager.getlocal("acSpringOutingResidueTime", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
                
            } else {
                timeStr = LanguageManager.getlocal("acSpringOutingResidueTime", [LanguageManager.getlocal("acSpringOutingTimeEnd")]);
            }

            this._resiTimeText = ComponentManager.getTextField(timeStr, 20, TextFieldConst.COLOR_WHITE);
            this._resiTimeText.x = GameConfig.stageWidth - 20 - this._resiTimeText.width;
            this._resiTimeText.y = timeText.y;
            this.addChild(this._resiTimeText);

            let descText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acSpringOutingDesc")),20,TextFieldConst.COLOR_WHITE);
            descText.width = 600;
            descText.lineSpacing = 7;
            descText.x = timeText.x;
            descText.y = timeText.y + timeText.height + 10;
            this.addChild(descText);
 





            if(App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("wife_full3_2201_ske"))
            {
  


                let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones("wife_full3_2201");
                droWifeIcon.setScale(0.8)
                droWifeIcon.x = 200;
                droWifeIcon.y = GameConfig.stageHeigth - 150 + 3;
                this.addChild(droWifeIcon);
            }
            else
            {
                // wife 的 图片
                let scaleNum = 0.6;
                let wifeBM =  BaseLoadBitmap.create("wife_skin_2201");
                wifeBM.width = 640;
                wifeBM.height = 840;
                wifeBM.setScale(scaleNum);
                wifeBM.x = 0;
                wifeBM.y = GameConfig.stageHeigth - 134 - 840 * 0.6;
                this.addChild(wifeBM);
            }



        

            let bottom = BaseBitmap.create(this.getDefaultRes("acspringouting_bottombg"));
            bottom.name = "bottom";
            bottom.x = 0;
            bottom.y = GameConfig.stageHeigth - bottom.height;
            this.addChild(bottom);

            let talkBg = BaseBitmap.create(this.getDefaultRes("acspringouting_talkbg"));
            // talkBg.width = 180;
            // talkBg.height = 120;
            // talkBg.scaleX = -1;
            talkBg.x = 320;
            talkBg.y = bottom.y - 490;
            this.addChild(talkBg);

            let talk = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acSpringOutingPeople")),18,TextFieldConst.COLOR_BROWN);
            talk.width = 150;
            talk.rotation = 18;
            talk.x = talkBg.x + 15 + 30;
            talk.y = talkBg.y + 15 + 10;
            this.addChild(talk);

            this._taskBtn = ComponentManager.getButton(this.getDefaultRes("acspringouting_taskicon"),null,this.taskBtnClick,this);
            this._taskBtn.x = 20;
            this._taskBtn.y = bottom.y - 20 - this._taskBtn.height;
            this.addChild(this._taskBtn);

            let taskBtnText = BaseBitmap.create(this.getDefaultRes("acspringouting_taskname"));
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, taskBtnText, this._taskBtn, [0,0]);
            this.addChild(taskBtnText);




            this._progress = ComponentManager.getProgressBar(this.getDefaultRes("acspringouting_progressbar"),this.getDefaultRes("acspringouting_progressbg"),500);
            this._progress.x = GameConfig.stageWidth/2 - this._progress.width /2; //GameConfig.stageWidth - 90;
            this._progress.y = timeBg.y + timeBg.height + 40; //bottom.y - 70 - (150 - 70) * (GameConfig.stageHeigth - 960) / (1136 - 960);  //70   150
            this.addChild(this._progress);


            let countBg = BaseBitmap.create(this.getDefaultRes("acspringouting_countbg"));
            countBg.x = GameConfig.stageWidth - 20 - countBg.width;
            countBg.y = this._progress.y + 50;
            this.addChild(countBg);

            let countIcon = BaseBitmap.create(this.getDefaultRes("acspringouting_icon"));
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, countIcon, countBg, [0,0]);
            this.addChild(countIcon);

            this._tiliText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acSpringOutingTiliText")),18,TextFieldConst.COLOR_WHITE);
            
            this._tiliText.x = countBg.x +110-40;
            this._tiliText.y = countBg.y + 3;
            this.addChild(this._tiliText);
            
            this._countText = ComponentManager.getTextField("0",18,TextFieldConst.COLOR_WHITE);
            this._countText.x = this._tiliText.x + this._tiliText.width/2 - this._countText.width/2;
            this._countText.y = this._tiliText.y + this._tiliText.height + 3;
            this.addChild(this._countText);

            let luckBg = BaseBitmap.create(this.getDefaultRes("acspringouting_rightbg"));
            luckBg.x = this._progress.x - luckBg.width/2;
            luckBg.y = this._progress.y + this._progress.height/2 - luckBg.height/2;
            this.addChild(luckBg);

            
            let luckText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acSpringOutingLuckText")),18,TextFieldConst.COLOR_WHITE);
            luckText.x = luckBg.x + luckBg.width/2 - luckText.width/2-10;
            luckText.y = luckBg.y + 10;
            this.addChild(luckText);
            this._luckText = luckText;

            this._luckValueText = ComponentManager.getTextField(String(this.acVo.getLotteryNum()),18,TextFieldConst.COLOR_WHITE);
            this._luckValueText.x = this._luckText.x + this._luckText.width/2 - this._luckValueText.width/2;
            this._luckValueText.y = this._luckText.y + this._luckText.height + 5;
            this.addChild(this._luckValueText);

            let onceBtn = ComponentManager.getButton(this.getDefaultRes("acspringouting_bluebtn"),this.getDefaultCn("acSpringOutingOnceText"),this.onceBtnClick,this);
            onceBtn.setColor(TextFieldConst.COLOR_BTN_BLUE);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, onceBtn, bottom, [60+13,7+9]);
            this.addChild(onceBtn);
            let tenBtn = ComponentManager.getButton(this.getDefaultRes("acspringouting_yellowbtn"),this.getDefaultCn("acSpringOutingTenText"),this.tenBtnClick,this);
            tenBtn.setColor(TextFieldConst.COLOR_BTN_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, tenBtn, bottom, [60+13,7+9]);
            this.addChild(tenBtn);

            let line = BaseBitmap.create(this.getDefaultRes("acspringouting_line"));
            line.x = GameConfig.stageWidth/2 - line.width/2;
            line.y = bottom.y + 25;
            this.addChild(line);

            let onceIcon = BaseBitmap.create(this.getDefaultRes("acspringouting_icon"));
            onceIcon.setScale(0.8);
            let onceText = ComponentManager.getTextField(this.cfg.cost+"",20,TextFieldConst.COLOR_LIGHT_YELLOW);

            onceIcon.x = onceBtn.x + onceBtn.width/2 - (onceIcon.width * onceIcon.scaleX + onceText.width)/2;
            onceIcon.y = onceBtn.y - onceIcon.height * onceIcon.scaleY;
            this.addChild(onceIcon);

            onceText.x = onceIcon.x + onceIcon.width * onceIcon.scaleX;
            onceText.y = onceIcon.y + onceIcon.height * onceIcon.scaleY / 2 - onceText.height/2;
            this.addChild(onceText);
            
            let tenIcon = BaseBitmap.create(this.getDefaultRes("acspringouting_icon"));
            tenIcon.setScale(0.8);
            let tenText = ComponentManager.getTextField(this.cfg.cost * 10+"",20,TextFieldConst.COLOR_LIGHT_YELLOW);

            tenIcon.x = tenBtn.x + tenBtn.width/2 - (tenIcon.width * tenIcon.scaleX + tenText.width)/2;
            tenIcon.y = tenBtn.y - tenIcon.height * tenIcon.scaleY;
            this.addChild(tenIcon);

            tenText.x = tenIcon.x + tenIcon.width * tenIcon.scaleX;
            tenText.y = tenIcon.y + tenIcon.height * tenIcon.scaleY / 2 - tenText.height/2;
            this.addChild(tenText);
            this._animMap ={};
            let maxDrawNum = this.cfg.lotteryNum[this.cfg.lotteryNum.length-1]["needNum"];
            // 宝箱
            for (var i = 0; i < this.cfg.lotteryNum.length; i++) { 
                let tmprcfg = this.cfg.lotteryNum[i];


                let rStatus = 1 ;
                if (this.acVo.ainfo.stageinfo[i+1]) {
                    rStatus = 3; // 已领取
                } else if (this.acVo.ainfo.lotterynum >= tmprcfg.needNum) {
                    rStatus = 2;
                }
                

                let scale = 0.8;
                if(i == this.cfg.lotteryNum.length - 1){
                    scale = 1;

                }
                
                let imgres = this.getDefaultRes("acspringouting_bag1");
                if(rStatus == 3){
                    imgres = this.getDefaultRes("acspringouting_bag2");
                }
                let boxImg = BaseBitmap.create(imgres);
                boxImg.setScale(scale);
                boxImg.anchorOffsetX = boxImg.width/2;
                boxImg.anchorOffsetY = boxImg.height/2;
                boxImg.name = "boxImg"+i;
                boxImg.x = this._progress.x + this.cfg.lotteryNum[String(i)]["needNum"]/maxDrawNum * this._progress.width;
                boxImg.y = this._progress.y + this._progress.height/2;

                if(i == this.cfg.lotteryNum.length - 1){
                    this._baseX = boxImg.x;// + boxImg.width * scale / 2;
                    this._baseY = boxImg.y ;//+ boxImg.height * scale / 2;
                }

                let lightImg =  BaseBitmap.create("dailytask_box_light");
                lightImg.anchorOffsetX = 40;
                lightImg.anchorOffsetY = 40;

                lightImg.name = "lightImg"+i;
                lightImg.x = boxImg.x;
                lightImg.y = boxImg.y;
                lightImg.visible = false;
                this.addChild(lightImg);
                this.addChild(boxImg);
                boxImg.addTouchTap(this.boxClick,this,[i]);



            }
            this.showFirstDialog();
            // this.startNumShow();
            this.refreshData();
            this.showLihua();
        }



    }

 

    private refreshData()
    {
        if(this.code == "1" || this.code == "2"){
            this._numText.text = this.acVo.getLotteryNum()+"";
            this._countText.text = this.acVo.getScoreNum()+"";
            
            let curKey = this.acVo.getCurrVal();

            this._progress.setPercentage(curKey);

            this._progressAnim.x = this._progress.x + this._progress.height/2 - 50 -1;
            this._progressAnim.y = this._progress.y - (this._progress.getPercent()>1?1:this._progress.getPercent()) * this._progress.width - 40 + 17;
            
            for(let i = 0; i < this.cfg.lotteryNum.length; i ++){
                let boxImg = this.getChildByName("boxImg"+i);
                let lightClip = this._animMap["lightClip"+i];//this.getChildByName("lightClip"+i);
                let tmprcfg = this.cfg.lotteryNum[i];
                let rStatus = 1 ;
    
                if (this.acVo.ainfo.lotterynum >= tmprcfg.needNum) {
                    //可领取
                    boxImg.visible = true;

                    if (this.acVo.ainfo.stageinfo[i+1]) {
                        // 已领取
                        lightClip.visible = false;
                        lightClip.stop();
                    } else {
                        lightClip.visible = true;
                        lightClip.playWithTime(-1);
                    }

                }

            }
            if (this.acVo.isHaveTaskRedDot()) {
                App.CommonUtil.addIconToBDOC(this._taskBtn);
            }else{
                App.CommonUtil.removeIconFromBDOC(this._taskBtn);
            }
        } else if(this.code == "3"){
            this._luckValueText.text = this.acVo.getLotteryNum()+"";
            this._luckValueText.x = this._luckText.x + this._luckText.width/2 - this._luckValueText.width/2;
            this._countText.text = this.acVo.getScoreNum()+"";
            this._countText.x = this._tiliText.x + this._tiliText.width/2 - this._countText.width/2;
            let curKey = this.acVo.getCurrVal();

            this._progress.setPercentage(curKey);


            for(let i = 0; i < this.cfg.lotteryNum.length; i ++){
                let boxImg = this.getChildByName("boxImg"+i);
                let lightImg = this.getChildByName("lightImg"+i);//this.getChildByName("lightClip"+i);
                let tmprcfg = this.cfg.lotteryNum[i];
                let rStatus = 1 ;
                if (this.acVo.ainfo.stageinfo[i+1]) {
                    rStatus = 3; // 已领取
                } else if (this.acVo.ainfo.lotterynum >= tmprcfg.needNum) {
                    rStatus = 2;
                }
                
                

                let imgres = this.getDefaultRes("acspringouting_bag1");
                if(rStatus == 3){
                    imgres = this.getDefaultRes("acspringouting_bag2");
                }

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
            if (this.acVo.isHaveTaskRedDot()) {
                App.CommonUtil.addIconToBDOC(this._taskBtn);
            }else{
                App.CommonUtil.removeIconFromBDOC(this._taskBtn);
            }

        }




    }

    private startNumShow():void
    {
        if(!this._numBg){
            this._numBg = BaseBitmap.create(this.getDefaultRes("acspringouting_numbg"));
            this._numText = ComponentManager.getTextField(this.acVo.getLotteryNum() + "",20,TextFieldConst.COLOR_WHITE);
        }
        this._numBg.visible = false;
        this._numText.visible = false;
        this.addChild(this._numBg);
        this.addChild(this._numText);
        this.refreshNum();

     
    }
    	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
        if(this.code == "1" || this.code == "2"){
            return ButtonConst.COMMON_CLOSE_1;
        } else if(this.code == "3"){
            return "btn_closebtn2";
        }
		
	}
    private refreshNum():void
    {
        // if(this.code == "1" || this.code == "2"){
            this._numText.text = this.acVo.getLotteryNum()+"";
            this._numBg.width = this._numText.width + 35;
            this._numBg.x = this._progress.x - 20 - this._numBg.width;
            this._numBg.y = this._progress.y - (this._progress.getPercent()>1?1:this._progress.getPercent()) * this._progress.width - this._numBg.height;
            
            this._numText.x = this._numBg.x + this._numBg.width/2 - this._numText.width/2 - 4 ;
            this._numText.y = this._numBg.y + this._numBg.height/2 - this._numText.height/2;
            this._numBg.visible = true;
            this._numText.visible = true;
            this._numBg.alpha = 0;
            this._numText.alpha = 0;
            egret.Tween.removeTweens(this._numBg);
            egret.Tween.removeTweens(this._numText);

            egret.Tween.get(this._numBg)
                .to({alpha:1},200)
                .wait(5000)
                .to({alpha:0},200)
                .set({visible:false})
                .wait(5000)
                .call(()=>{
                    egret.Tween.removeTweens(this._numBg);
                },this);
            egret.Tween.get(this._numText)
                .to({alpha:1},200)
                .wait(5000)
                .to({alpha:0},200)
                .set({visible:false})
                .wait(5000)
                .call(()=>{
                    egret.Tween.removeTweens(this._numText);
                    this.refreshNum();
                },this);
        // } else if(this.code == "3"){
        //     this._luckValueText.text = this.acVo.getLotteryNum()+"";
        //     this._luckValueText.x = this._luckText.x + this._luckText.width/2 - this._luckValueText.width/2;
        // }


    }

    private taskBtnClick():void
    {
        if(!this.acVo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.ACSPRINGOUTINGTASKVIEW,{aid:this.aid,code:this.code});
    }
    private onceBtnClick():void
    {
        this.doClick(1);
    }
    private tenBtnClick():void
    {
        this.doClick(10);
    }
    private doClick(count) {
       
        if(!this.acVo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        let needGem = 0;
        if (count == 1) {
            needGem = this.cfg.cost;
        } else {
            needGem = this.cfg.cost * 10;
        }
        if (needGem > this.acVo.getScoreNum()) {
            // App.CommonUtil.showTip(LanguageManager.getlocal('allianceBossOpen_tip5'));
            ViewController.getInstance().openView(ViewConst.POPUP.ACSPRINGOUTING_BUYITEMPOPUPVIEW);

            return;
        }
        
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETSPRINGOUTINGREWARD, { "activeId": this.aid + "-" + this.code, "gid": count });

        
    }	
    private boxClick(event, index) {
       
        
        if(!this.acVo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if(index == this.cfg.lotteryNum.length-1){
            if(this._taskHand){
                egret.Tween.removeTweens(this._taskHand);
                this._taskHand.parent.removeChild(this._taskHand);
                this._taskHand = null;
            }
        }
        if ((!this.acVo.ainfo.stageinfo[index+1]) && this.acVo.ainfo.lotterynum >= this.cfg.lotteryNum[index].needNum) {
            this.showDialog(index);

        } else {
            // if (index == this.cfg.lotteryNum.length-1) {
            //     NetManager.request(NetRequestConst.REQUEST_STATS_CLICKEVENT, {pos:3, kid:NetRequestConst.KID_BUILDINGWORSHIPAC});
            // }
            ViewController.getInstance().openView(ViewConst.POPUP.DAILYTASK_REWARDPREVIEWPOPUPVIEW,{type : this.aid, activeCode: this.code, id : index});
        }
    }

    // 获得奖励
	private getRewardHandler(event:egret.Event)
	{
        if(this.code == "1" || this.code == "2"){
            if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY_GETSPRINGOUTINGREWARD) {
                if (event.data.data.ret === 0) {
                    let data = event.data.data.data;
                    this._luckAnim.visible = true;
                    this._luckAnim.playWithTime(1);
                    egret.setTimeout(()=>{
                        this._luckAnim.visible = false;
                        ViewController.getInstance().openView(ViewConst.POPUP.ACSPRINGOUTINGLUCKUPPOPUPVIEW,{
                            data:{
                                rewards:data.rewards,
                                otherRewards:data.otherrewards,
                                isPlayAni:true,
                                showTip:data.isluck>0?LanguageManager.getlocal("acHuLaoBaoji"):null,
                            },
                            callback:this.showReward,
                            target:this
                        });
                    },this,300);  


                } else {
                    App.CommonUtil.showTip(event.data.data.ret);
                }
            }
        } else if(this.code == "3"){
            if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY_GETSPRINGOUTINGREWARD) {
                if (event.data.data.ret === 0) {
                    let data = event.data.data.data;


                    ViewController.getInstance().openView(ViewConst.POPUP.ACSPRINGOUTINGLUCKUPPOPUPVIEW,{
                        data:{
                            rewards:data.rewards,
                            otherRewards:data.otherrewards,
                            isPlayAni:true,
                            showTip:data.isluck>0?LanguageManager.getlocal("acHuLaoBaoji"):null,
                        },
                        callback:this.showReward,
                        target:this
                    });

                    // this._luckAnim.visible = true;
                    // this._luckAnim.playWithTime(1);
                    // egret.setTimeout(()=>{
                    //     // this._luckAnim.visible = false;
                    //     ViewController.getInstance().openView(ViewConst.POPUP.ACSPRINGOUTINGLUCKUPPOPUPVIEW,{
                    //         data:{
                    //             rewards:data.rewards,
                    //             otherRewards:data.otherrewards,
                    //             isPlayAni:true,
                    //             showTip:data.isluck>0?LanguageManager.getlocal("acHuLaoBaoji"):null,
                    //         },
                    //         callback:this.showReward,
                    //         target:this
                    //     });
                    // },this,300);  


                } else {
                    App.CommonUtil.showTip(event.data.data.ret);
                }
            }

        }

	}
    private showReward(data)
    {
        ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, data);
    }
    // 获得宝箱奖励
	private getNumRewardHandler(event:egret.Event)
	{
        if (event.data.data.cmd === NetRequestConst.REQUEST_ACTIVITY_GETSPRINGOUTINGBOXREWARD) {
            if (event.data.data.ret === 0) {
                let data = event.data.data.data;
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW, {"rewards":data.rewards,"otherRewards":data.otherrewards,"isPlayAni":true});
            } else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
	}
    private showFirstDialog(){
        if(!this.acVo.getFirstOpen()){
            
            let posX = this._baseX;
            let posY = this._baseY;
            this._taskHand = BaseBitmap.create("guide_hand");
            this._taskHand.x = posX;
            this._taskHand.y = posY;
            this._taskHand.setScale(0.5);
            this.addChild(this._taskHand);

            egret.Tween.get(this._taskHand,{loop:true})
                .to({y:posY - 5 ,scaleX:0.4,scaleY:0.4}, 500)
                .to({y:posY ,scaleX:0.5,scaleY:0.5}, 500)


            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETFIRSTOPENSPRINGOUTING, { "activeId": this.aid + "-" + this.code});
            ViewController.getInstance().openView(ViewConst.BASE.ACSPRINGOUTINGAVGVIEW,{

                idx : 1,
                buidId : "first",
                aid : this.aid,
                code : this.code
            });

        }
    }
    // 大门客说话
    private showDialog(index) {
       
        if(this.acVo.getAvgConfig(index, this.code)){
            ViewController.getInstance().openView(ViewConst.BASE.ACSPRINGOUTINGAVGVIEW,{
                f : ()=>{
                     NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETSPRINGOUTINGBOXREWARD, { "activeId": this.aid + "-" + this.code, "gid": index + 1 });
                },
                o : this,
                idx : 1,
                buidId : index,
                aid : this.aid,
                code : this.code
            });
        }
    }


    //标题背景
    protected getTitleBgName():string
	{		
        return this.getDefaultRes("acspringouting_title");
	}
    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+"-"+this.code)){
            return resName+"-"+this.code;
        } else {
            return resName+"-"+defaultCode;
        }
    }
    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }
    protected getTitleStr():string
	{
        return  null;
    }
    public tick(): boolean {

        if(this.code == "1" || this.code == "2"){
            let deltaT = this.acVo.et - GameData.serverTime;
            if (this._resiTimeText && deltaT > 0) {
                this._resiTimeText.text = LanguageManager.getlocal("acSpringOutingResidueTime", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
                
            
                return true;
            } else {
                this._resiTimeText.text = LanguageManager.getlocal("acSpringOutingResidueTime", [LanguageManager.getlocal("acSpringOutingTimeEnd")]);
                
                
            }
        } else if(this.code == "3"){
            let deltaT = this.acVo.et - GameData.serverTime;
            if (this._resiTimeText && deltaT > 0) {
                this._resiTimeText.text = LanguageManager.getlocal("acSpringOutingResidueTime", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
                this._resiTimeText.x = GameConfig.stageWidth - 20 - this._resiTimeText.width;
            
                return true;
            } else {
                this._resiTimeText.text = LanguageManager.getlocal("acSpringOutingResidueTime", [LanguageManager.getlocal("acSpringOutingTimeEnd")]);
                this._resiTimeText.x = GameConfig.stageWidth - 20 - this._resiTimeText.width;
                
            }
        }

		return false;
	}
    //放礼花
    private showLihua(){
        if(this._isShowLihua){
            return;
        }

        this.createLihua();

        this._isShowLihua = true;
    }
    private createLihua(){
        // let x = 330 + Math.floor(Math.random() * 100);
        // let y = 120 + Math.floor(Math.random() * 100);
        // let scale = 0.6 + Math.random() * 0.5;
        // let x = 120 + Math.floor(Math.random() * 400);
        // let y = 180 + Math.floor(Math.random() * 300);




        let scale = 1 + Math.random() * 0.5;

        let x = 100 + Math.floor(Math.random() * 440);
        let y = Math.floor(Math.random() * this._buildCountainer.height - 102 *scale/2);

        let index = Math.floor(Math.random() * 3);
        let delay = 500 + Math.floor(Math.random() * 500);

        let lihuaName = this._lihuaParam[index];
        let lihuaclip:CustomMovieClip = null;
        if(this._lihuaPool[lihuaName].length > 0){
            lihuaclip = this._lihuaPool[lihuaName].pop();
        } else {
            lihuaclip = ComponentManager.getCustomMovieClip(`lihua_${lihuaName}000`, 10, 150);
        }
        // lihuaclip = ComponentManager.getCustomMovieClip(`lihua_${param[index]}000`, 10, 150);
        lihuaclip.x = x;
        lihuaclip.y = y;
        lihuaclip.setScale(scale);

        if(this._buildCountainer){
            this._buildCountainer.addChild(lihuaclip);
            lihuaclip.playWithTime(1);
            lihuaclip.setEndCallBack(()=>{
                this._buildCountainer.removeChild(lihuaclip);
                if(this._lihuaPool[lihuaName].length <4){
                    this._lihuaPool[lihuaName].push(lihuaclip);
                }
                
            },this);


            this._timeoutid = egret.setTimeout(()=>{
                this.createLihua();
            },this,delay);
        }
    }    
    // 背景图名称
	protected getBgName():string
	{
        return this.getDefaultRes("acspringouting_bg");
    } 
    protected initBg():void
	{   

		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseBitmap.create(bgName);

			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
			
			this.viewBg.width = GameConfig.stageWidth;
			this.viewBg.height = 1000;
            this.viewBg.y = GameConfig.stageHeigth - this.viewBg.height;
            this.addChild(this.viewBg);
		}
	} 
    protected getResourceList():string[]
	{
        if(this.code == "1"|| this.code == "2"){
            return super.getResourceList().concat([
                this.getTitleBgName(),
                this.getBgName(),
                this.getDefaultRes("acspringouting_countbg"),
                this.getDefaultRes("acspringouting_heart"),
                this.getDefaultRes("acspringouting_heartbg"),
                this.getDefaultRes("acspringouting_icon"),
                this.getDefaultRes("acspringouting_numbg"),
                this.getDefaultRes("acspringouting_progressbar"),
                this.getDefaultRes("acspringouting_progressbg"),
                this.getDefaultRes("acspringouting_rightbg"),
                this.getDefaultRes("acspringouting_taskicon"),
                this.getDefaultRes("acspringouting_taskname"),
                "taoxin","taoxin_json","guide_hand",
            ]);
        } else if(this.code == "3"){
            return super.getResourceList().concat([
                this.getTitleBgName(),
                this.getBgName(),
                this.getDefaultRes("acspringouting_bag1"),
                this.getDefaultRes("acspringouting_bag2"),
                this.getDefaultRes("acspringouting_bluebtn"),
                this.getDefaultRes("acspringouting_bottombg"),
                this.getDefaultRes("acspringouting_countbg"),
                this.getDefaultRes("acspringouting_icon"),
                this.getDefaultRes("acspringouting_line"),
                this.getDefaultRes("acspringouting_rightbg"),
                this.getDefaultRes("acspringouting_talkbg"),
                this.getDefaultRes("acspringouting_taskicon"),
                this.getDefaultRes("acspringouting_taskname"),
                this.getDefaultRes("acspringouting_yellowbtn"),
                this.getDefaultRes("acspringouting_progressbar"),
                this.getDefaultRes("acspringouting_progressbg"),
                "dailytask_box_light",
                "taoxin","taoxin_json","guide_hand",
   
            ]);    
        }

	} 
	public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETSPRINGOUTINGREWARD),this.getRewardHandler,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETSPRINGOUTINGBOXREWARD),this.getNumRewardHandler,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshData,this);
        
        if(this._timeoutid != -1){
            egret.clearTimeout(this._timeoutid);
        }
        this._timeoutid = -1;
        if(this._numBg){
            egret.Tween.removeTweens(this._numBg);
        }
        if(this._numText){
            egret.Tween.removeTweens(this._numText);
        }
        if(this._taskHand){
            egret.Tween.removeTweens(this._taskHand);
        }
        
        if(this.code == "3"){
            for(let i = 0; i < this.cfg.lotteryNum.length; i ++){
                let boxImg = this.getChildByName("boxImg"+i);
                let lightImg = this.getChildByName("lightImg"+i);
                if(boxImg){
                    egret.Tween.removeTweens(boxImg);
                }
                if(lightImg){
                    egret.Tween.removeTweens(lightImg);
                }

            }
        }



        this._countText = null;
        this._progress = null;
        this._taskBtn = null;
        this._numText = null;
        this._numBg = null;
        this._animMap = null;
        this._luckAnim = null;
        this._resiTimeText = null;

        this._progressAnim = null;
        this._taskHand = null;
        this._baseX = 0;
        this._baseY = 0;
        this._luckText = null;
        this._luckValueText = null;
        this._tiliText = null;


        this._lihuaParam = ["hong","huang","lan"];
        this._isShowLihua = false;
        this._lihuaPool = {"hong":[],"huang":[],"lan":[]};
        this._buildCountainer = null;
        super.dispose();
    }
}