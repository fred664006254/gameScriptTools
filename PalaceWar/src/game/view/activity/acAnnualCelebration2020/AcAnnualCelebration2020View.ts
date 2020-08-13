/*
    author : shaoliang  
    desc : 京城夜赏
    date : 2019.12.9
*/

class AcAnnualCelebration2020View extends AcCommonView
{

    private _cdText : BaseTextField = null;
    private _bgGroup : BaseDisplayObjectContainer = null;
    private _noticescrollView : ScrollView = null;

    private _checkFlag1:BaseBitmap = null;
    private _checkFlag2:BaseBitmap = null;
    private _throwType:number = 0; //0 单抽  1十连抽 2 如意抽
    private _numTF: BaseTextField = null;
    private _diceBtn:BaseButton = null;

    private _countDownTime: BaseTextField = null;
	private _countDownTimeBg: BaseBitmap = null;
    private _boxInfoList: { boxBM: BaseBitmap, isPlayAni: boolean, percent: number, itemCfg: Config.AcCfg.AnnualCelebration2020Cfg }[] = [];

    private _circleText : BaseTextField = null;
    private _rewardBtn : BaseButton = null;
    private _rewardScrollView : ScrollView = null;
    private _prevRoundReward : string = '';
    private _rewardGroup : BaseDisplayObjectContainer = null;
		
	private _carGroup : BaseDisplayObjectContainer = null;
    private _car : BaseBitmap = null;
    private _carTip : CustomMovieClip = null;
    private _stopPlay : boolean = false;
    private _stopClick : boolean = null;
    // private _checkBox : CheckBox = null;
    private _oneKeySearchStatus : boolean = false;
    private _isAIDice : boolean = false;
    private _isPlay: boolean = false;

    private _aiReddot:BaseBitmap = null;
    private _aidicename : BaseTextField = null;

    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.AnnualCelebration2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    private get vo() : AcAnnualCelebration2020Vo{
        return <AcAnnualCelebration2020Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get uicode():string
    {
        if (this.code == "2")
        {
            return "1";
        }
        return this.code;
    }

    protected getTitleStr():string
	{
		return null;
	}

    // 标题背景名称
	protected getTitleBgName():string
	{
		return null;
	}

    protected getRuleInfo() : string{
        return `acAC2020Rule-` + this.uicode;
    }

     protected getResourceList():string[]{
        let ret = super.getResourceList();
        let code = this.uicode;
        ret = ret.concat([
           `annualcelebration_title-1`,`annualcelebration_descbg-1`,"acwealthcarpview_skineffect1","acwealthcarpview","acliangbiographyview_common_acbg",
           "acannualcelebration-1", `annualcelebration_bigbg`,"hold_dinner_box","annualcelebration_bottombg-1","acannualcelebration_aidice3",
           "treasureboxicon-1","annualcelebration_rewardbg-1",`treasurereward-1`,"acenjoynight1",
          		   
           `enjoynightcarbg-`+code, `enjoynightcar1-`,`treasuregquan-1`,`treasuregquan1-`,
           `treasurecarmove1-`,`treasurecarscale-1`,"acnationalday_common_rewardtxt",
        ]);
		return ret;
	}

     public initView()
    {
        let view = this; 
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.update, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020ROLL),view.playBoxCallback,view);

        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        let code = view.uicode;


       	let titleBg = BaseBitmap.create(`annualcelebration_title-1`);
		titleBg.width = 640;
		titleBg.height = 92;
		titleBg.setPosition(0, 0);

		let acDescBg = BaseBitmap.create("annualcelebration_descbg-1")
		acDescBg.setPosition(titleBg.x, titleBg.y + titleBg.height - 7);

		this.addChildToContainer(acDescBg);
		this.addChildToContainer(titleBg);

        //衣装预览
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
        skinTxtEffect.setPosition(acDescBg.x + 103 - skinTxtEffectBM.width / 2, acDescBg.y + 120 - skinTxtEffectBM.height / 2);
        skinTxtEffect.blendMode = egret.BlendMode.ADD;
        this.addChild(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);

        let skinTxt = BaseBitmap.create("acnationalday_common_rewardtxt");
        skinTxt.anchorOffsetX = skinTxt.width / 2;
        skinTxt.anchorOffsetY = skinTxt.height / 2;
        skinTxt.setPosition(acDescBg.x + 103, acDescBg.y + 120);
        this.addChild(skinTxt);
        egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);


        let skinTxteffect = BaseBitmap.create("acnationalday_common_rewardtxt");
        skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
        skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        skinTxteffect.setPosition(acDescBg.x + 103, acDescBg.y + 120);
        this.addChild(skinTxteffect);
        skinTxteffect.blendMode = egret.BlendMode.ADD;
        skinTxteffect.alpha = 0;
        egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        
        //透明点击区域
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 180;
        touchPos.height = 176;
        touchPos.setPosition(acDescBg.x, acDescBg.y);
        view.addChild(touchPos);
        touchPos.addTouchTap(() => {
            if(this._stopClick){
                return;
            }
            if (this._isPlay) {
				return;
			}
            let needstr = LanguageManager.getlocal("acAC2020_need_circle",[String(this.cfg.getSkinNeedCircle())]);
             let wifId = Config.WifeCfg.formatRewardItemVoStr(this.cfg.show);
            let data = {data:[
                    {idType: wifId, topMsg:needstr, bgName:"", scale: 0.8, title:``,offY:120},
                ], showType:""};
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
            
        }, this);



        let vo = this.vo;

        //活动时间
		let timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewAcTime-" + code, [vo.acTimeAndHour]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		timeTF.width = 466;
		timeTF.setPosition(175, acDescBg.y + 8);
		this.addChildToContainer(timeTF);


		let descTF = ComponentManager.getTextField(LanguageManager.getlocal("acAnnualCelebration2020Desc-" + code), 18, TextFieldConst.COLOR_WHITE);
		descTF.width = 465;
		descTF.lineSpacing = 4;
		descTF.setPosition(timeTF.x, timeTF.y + timeTF.height + 8);
		this.addChildToContainer(descTF)

		this._countDownTimeBg = BaseBitmap.create("public_9_bg61");
		this._countDownTimeBg.y = acDescBg.y + acDescBg.height - this._countDownTimeBg.height / 2-6;
		this.addChildToContainer(this._countDownTimeBg);

		this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewCountDownTime-" + code, [vo.acCountDownNoExtra]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
		this._countDownTimeBg.width = 60 + this._countDownTime.width;
		this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
		this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);
		this.addChildToContainer(this._countDownTime);

        //领奖
        let bottomBg = BaseBitmap.create(`annualcelebration_rewardbg-1`);
        bottomBg.y = 234;
        view.addChild(bottomBg);
        
        let roundbottomTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acTreasureRoundReward-${code}`, [(view.vo.getCircleNum()+1).toString()]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        roundbottomTxt.lineSpacing = 5;
        roundbottomTxt.textAlign = egret.HorizontalAlign.CENTER;
        view._circleText = roundbottomTxt;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, roundbottomTxt, bottomBg, [10,0]);
        view.addChild(roundbottomTxt);

        let rewardbtn = ComponentManager.getButton(`treasurereward-1`,'',()=>{
            if(this._stopClick){
                return;
            }
            if (this._isPlay) {
				return;
			}
            ViewController.getInstance().openView(ViewConst.COMMON.ACANNUALCELEBRATION2020REWARDVIEW, { 
                aid: this.aid, 
                code: this.code,
                uicode: this.uicode,
             });
        },view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardbtn, bottomBg);
        view.addChild(rewardbtn);
        view._rewardBtn = rewardbtn;

        //奖励
         let rewardgroup = new BaseDisplayObjectContainer();
        rewardgroup.height = 90;
        view.addChild(rewardgroup);
        view._rewardGroup = rewardgroup;

        let rewardStr = view.vo.getCurRoundReward();
        let rewardArr = GameData.getRewardItemIcons(rewardStr,true,false);
        let tmpX = (455 - rewardArr.length * 80 - (rewardArr.length - 1) * 5) / 2;
        if(rewardArr.length > 5){
            tmpX = 5;
        }
        
        for(let i in rewardArr){
            let icon = rewardArr[i];
            icon.setScale(80/108);
            icon.x = tmpX + 85 * Number(i);
            icon.y = 5;
            rewardgroup.addChild(icon);
        }

        let rect = new egret.Rectangle(0,0,455,90);
        let noticescrollView = ComponentManager.getScrollView(rewardgroup,rect);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, noticescrollView, bottomBg);
        view.addChild(noticescrollView);
        view._prevRoundReward = rewardStr;

        //底部
        let buttombg = BaseBitmap.create(`annualcelebration_bottombg-1`);
        buttombg.setPosition(0, GameConfig.stageHeigth - buttombg.height);
		view.addChild(buttombg);

        let diceBtn= ComponentManager.getButton("treasureboxicon-1",null,this.diceBtnClick, this,null,1);
        diceBtn.setPosition(GameConfig.stageWidth/2-diceBtn.width/2,buttombg.y+10);
        view.addChild(diceBtn);
        this._diceBtn= diceBtn;
        let dicetext = BaseBitmap.create("acannualcelebration_dicetext-1");
        dicetext.setPosition(GameConfig.stageWidth/2-dicetext.width/2,buttombg.y+110);
        view.addChild(dicetext);

        //十连骰子
        let tenDiceIcon = BaseBitmap.create(`acannualcelebration_tendice-1`);
        tenDiceIcon.setPosition(116, buttombg.y+62);
		view.addChild(tenDiceIcon);

        let probg1 = BaseBitmap.create("hold_dinner_box")
        probg1.x = 79;
        probg1.y = buttombg.y+115;
        this.addChild(probg1);
        probg1.addTouchTap(this.tenThrowCheckHandle,this);

        let name1 = ComponentManager.getTextField(LanguageManager.getlocal("acAC2020_throw_ten",[String(vo.getAIDiceNum())]),20,TextFieldConst.COLOR_WHITE);
        name1.setPosition(probg1.x+probg1.width+8,probg1.y+probg1.height/2-name1.height/2);
        this.addChild(name1);

        let checkFlag1 = BaseLoadBitmap.create("hold_dinner_check");
        checkFlag1.width = checkFlag1.height = 38;
        checkFlag1.setPosition(probg1.x,probg1.y);
        this.addChild(checkFlag1);
        checkFlag1.visible = false;
        this._checkFlag1 = checkFlag1;

        //如意骰子
        let AIDiceIcon = BaseBitmap.create(`acannualcelebration_aidice-1`);
        AIDiceIcon.setPosition(500, buttombg.y+64);
		view.addChild(AIDiceIcon);

        let probg2 = BaseBitmap.create("hold_dinner_box")
        probg2.x = 458;
        probg2.y = buttombg.y+115;
        this.addChild(probg2);
        probg2.addTouchTap(this.aiThrowCheckHandle,this);

        let name2 = ComponentManager.getTextField(LanguageManager.getlocal("acAC2020_ai_throw_num"),20,TextFieldConst.COLOR_WHITE);
        name2.lineSpacing = 5;
        name2.width = 150;
        // name2.textAlign = egret.HorizontalAlign.CENTER;
        name2.setPosition(probg2.x+probg2.width+8,probg2.y+probg2.height/2-name2.height/2);
         
        this.addChild(name2);
        this._aidicename = name2;

        let checkFlag2 = BaseLoadBitmap.create("hold_dinner_check");
        checkFlag2.width = checkFlag2.height = 38;
        checkFlag2.setPosition(probg2.x,probg2.y);
        this.addChild(checkFlag2);
        checkFlag2.visible = false;
        this._checkFlag2 = checkFlag2;

        this._aiReddot = BaseBitmap.create("public_dot2");
        this._aiReddot.setPosition(probg2.x,probg2.y);
        this.addChild(this._aiReddot);
        this.setLayoutPosition(LayoutConst.righttop, this._aiReddot, probg2, [-10,-10]);
        this._aiReddot.visible = false;

       	this._numTF = ComponentManager.getTextField("0", 20, TextFieldConst.COLOR_WHITE);
		this._numTF.width = 250;
		this._numTF.textAlign = egret.HorizontalAlign.CENTER;
		this._numTF.setPosition(GameConfig.stageWidth/2-this._numTF.width/2,buttombg.y+140);
		this.addChild(this._numTF);


        this.update();

        view._carGroup = new BaseDisplayObjectContainer();
        view._carGroup.width = GameConfig.stageWidth;
        view._carGroup.height = GameConfig.stageHeigth;// - 80 - 119 - view.titleBg.height;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._carGroup, view);
        view._carGroup.addTouchTap(()=>{
            view._stopPlay = true;
            view.moveCar();
            view._carGroup.removeChildren();
        },view);
 

        let car = BaseBitmap.create(`enjoynightcar-1`);
        view._bgGroup.addChild(car);
        view._car = car;

        // let carTip = BaseBitmap.create(`enjoynightcartip-1`);
        let carTip = ComponentManager.getCustomMovieClip(`acac2020_arrow_effect`,11);
        view._bgGroup.addChild(carTip);
        carTip.playWithTime();
        carTip.width = 154;
        carTip.height = 200;
        view._carTip = carTip;
        // egret.Tween.get(view._carTip, {loop : true}).to({y : view._carTip.y - 15}, 500).to({y : view._carTip.y}, 500);

        view.moveCar(false);

        view.addChild(view._carGroup);

        this.tick();
    }

    private tenThrowCheckHandle():void
    {
        
        if (this._throwType == 1)
        {
            this._checkFlag1.visible = false;
            this._throwType = 0;
        }
        else
        {
            this._checkFlag1.visible = true;
            this._checkFlag2.visible = false;
            this._throwType = 1;
        }
        this._diceBtn.setBtnBitMap("treasureboxicon-1");
        this.update();
    }

    private aiThrowCheckHandle():void
    {   
        if (this._throwType == 2)
        {
            this._checkFlag2.visible = false;
            this._throwType = 0;
           
             this._diceBtn.setBtnBitMap("treasureboxicon-1");
        }
        else
        {
            this._checkFlag2.visible = true;
            this._checkFlag1.visible = false;
            this._throwType = 2;
             this._diceBtn.setBtnBitMap("acannualcelebration_aidice3");
        }
        this.update();
    }

    private freshView():void
    {
        let view = this;
        let code = view.code;

        this.update();
    }

    private mapLightOffset = {
        1:{x:-38,y:-25},//太学
        4:{x:-36,y:-30},
        7:{x:-28,y:-42},
        10:{x:-23,y:-26},//寻访
        13:{x:-46,y:-70},
        16:{x:-36,y:-36},
        19:{x:-36,y:-26},//酒楼
        22:{x:-45,y:-30},//排行榜
    }

    public initBg()
    {
        this.height = GameConfig.stageHeigth;
        this.width = GameConfig.stageWidth;
		let bgName:string="annualcelebration_bigbg";
		if(bgName){
            let rect6 = new egret.Rectangle(0,0,1280,1136);
            this.viewBg = BaseLoadBitmap.create(bgName,rect6);
            if(this.isTouchMaskClose()){
				this.viewBg.touchEnabled=true;
            }
            // this.viewBg.y += 60;
            let bggroup = new BaseDisplayObjectContainer();
            bggroup.width = this.viewBg.width;
            bggroup.height = 1136;//GameConfig.stageHeigth;
            this.addChild(bggroup);
            this._bgGroup = bggroup;
			
            // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, this.viewBg, bggroup, [0,0], true);
            bggroup.addChild(this.viewBg);

            for(let i in this.cfg.map){
                let unit = this.cfg.map[i];
                
                let picName:string = "acenjoynight_b_common";
                if (unit.buildingType)
                {
                    picName = `acannualcelebration_b_${unit.buildingType}`;
                }
                let posCfg = this.mapPos[unit.pointID];
                let mask1 = BaseBitmap.create(picName);
                mask1.x = posCfg.x;
                mask1.y = this.viewBg.y + posCfg.y;
                mask1.setScale(4);

                let touchT = mask1;
                if (unit.buildingType)
                {
                    mask1.setScale(1);
                    if (this.mapLightOffset[unit.pointID])
                    {   
                        let offset = this.mapLightOffset[unit.pointID];
                        mask1.x = posCfg.x +offset.x;
                        mask1.y = this.viewBg.y+ posCfg.y + offset.y;
                    }
                    let touchSp = BaseBitmap.create("public_alphabg");
                    touchSp.width = mask1.width/3*2;
                    touchSp.height = mask1.height/3*2;
                    touchSp.x = mask1.x + mask1.width/6;
                    touchSp.y = mask1.y + mask1.height/6;
                    bggroup.addChild(touchSp);
                    touchT = touchSp;
                }
                mask1.alpha = 0;
                mask1.name = `item${unit.pointID}`;

                touchT.addTouch((e : egret.Event)=>{
                    if(this._stopClick){
                        return;
                    }
                    if(e.type==egret.TouchEvent.TOUCH_BEGIN){
                        if(mask1.alpha == 0){
                            mask1.alpha = 1;
                        }
                        else{
                            mask1.alpha = 0;
                        }
                    }
                    else if(e.type==egret.TouchEvent.TOUCH_CANCEL){
                        mask1.alpha = 0;
                    }
                    if(e.type==egret.TouchEvent.TOUCH_END){
                        mask1.alpha = 0;
                        let viewName = '';
                        let mapId = "common";
						let mapname = "common";

						 if (unit.buildingType)
						 {
							mapId = unit.buildingType;
							mapname = "taixue";
						 }
						
                       
						ViewController.getInstance().openView("AcAC2020Award"+App.StringUtil.firstCharToUper(mapname),{
                            code : this.code,
                            uicode : this.uicode,
                            aid : this.aid,
                            mapId : unit.id,
							buildingType : mapId
                        })
                    }
                },this,null,true);
                bggroup.addChild(mask1);

                
                if (posCfg.n)
                {   
                    let name = BaseLoadBitmap.create(posCfg.n);
                    if (PlatformManager.checkIsTextHorizontal())
                    {
                        name.setPosition(posCfg.np2[0],this.viewBg.y+posCfg.np2[1]);
                    }
                    else
                    {
                        name.setPosition(posCfg.np[0],this.viewBg.y+posCfg.np[1]);
                    }
                    bggroup.addChild(name);
                }
                
            }

            let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth-300);
            let noticescrollView = ComponentManager.getScrollView(bggroup,rect);
            noticescrollView.bounces = false;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, noticescrollView, this);
            // noticescrollView.verticalScrollPolicy = 'off';
            noticescrollView.y = 220;
            noticescrollView.setShowArrow(false);
            noticescrollView.name = "noticescrollView";
            this.addChild(noticescrollView);
            this._noticescrollView = noticescrollView;
        }
    }

    private tick() {
		let cfg = this.cfg;
		let vo = this.vo;
		if (vo.checkIsInEndShowTime()) {
			this._countDownTime.text = LanguageManager.getlocal("acPunishEnd");
		}
		else {
			this._countDownTime.text = LanguageManager.getlocal("acWorshipViewCountDownTime-" + this.uicode, [vo.acCountDownNoExtra]);
		}
		this._countDownTimeBg.width = 60 + this._countDownTime.width;
		this._countDownTimeBg.x = GameConfig.stageWidth - this._countDownTimeBg.width - 15;
		this._countDownTime.setPosition(this._countDownTimeBg.x + this._countDownTimeBg.width / 2 - this._countDownTime.width / 2, this._countDownTimeBg.y + this._countDownTimeBg.height / 2 - this._countDownTime.height / 2);

        let view = this;
        if(view.vo.checkCircleRedDot() ||view.vo.checkTaskRedDot()){
			App.CommonUtil.addIconToBDOC(view._rewardBtn);
        }
        else{
            App.CommonUtil.removeIconFromBDOC(view._rewardBtn);
        }
	}

      private mapPos = {
        1 : { x : 52, y : 568, width : 180, height : 116,n:"citynpcbookroomname",np:[212,544],np2:[92,549]}, //太学
        2 : { x : 288, y : 562, width : 54, height : 54},
        3 : { x : 358, y : 513, width : 54, height : 54},
        4 : { x : 143, y : 370, width : 180, height : 116,n:"citynpcpalacename",np:[323,402],np2:[190,423]},//皇宫
        5 : { x : 417, y : 410, width : 54, height : 54},
        6 : { x : 532, y : 421, width : 54, height : 54},
        7 : { x : 527, y : 479, width : 180, height : 116,n:"citynpcatkracename",np:[624,443],np2:[544,471]},//雷台
        8 : { x : 687, y : 477, width : 54, height : 54},
        9 : { x : 755, y : 438, width : 54, height : 54},
        10 : { x : 815, y : 375, width : 54, height : 54,n:"citynpcsearchname",np:[880,387],np2:[778,410]},//寻访
        11 : { x : 963, y : 481, width : 54, height : 54},
        12 : { x : 900, y : 518, width : 54, height : 54},
        13 : { x : 993, y : 559, width : 54, height : 54,n:"citynpcstudyatkname",np:[1150,553],np2:[1052,542]},//演武场
        14 : { x : 1197, y : 706, width : 54, height : 54},
        15 : { x : 1111, y : 745, width : 54, height : 54},
        16 : { x : 902, y : 741, width : 236, height : 132,n:"citynpcalliancename",np:[1045,719],np2:[924,722]},//帮会
        17 : { x : 802, y : 839, width : 54, height : 54},
        18 : { x : 716, y : 765, width : 54, height : 54},
        19 : { x : 567, y : 640, width : 54, height : 54,n:"citynpcdinnername",np:[697,615],np2:[560,620]},//酒楼
        20 : { x : 512, y : 742, width : 54, height : 54},
        21 : { x : 537, y : 862, width : 54, height : 54},
        22 : { x : 324, y : 790, width : 54, height : 54,n:"citynpcrankname",np:[461,760],np2:[326,772]},//排行榜
        23 : { x : 212, y : 788, width : 188, height : 124},
        24 : { x : 169, y : 696, width : 54, height : 54},
       
    }

 
    private diceBtnClick() :void
    {
		if(this._stopClick){
                return;
		}
        if (this._isPlay) {
				return;
			}
		let view = this;

        if(!view.vo.isInActy())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
			return;
        }

        if (this._throwType == 2)
        {   
            if (view.vo.getAIDiceNum()>0)
            {
                 ViewController.getInstance().openView(ViewConst.POPUP.ACAC2020AIDICEPOPUPVIEW,{
                    aid : view.aid,
                    code : view.code,
                    uicode : view.uicode,
                    confirmCallback : (idx)=>{
                        view._stopClick = true;
                        view._isAIDice  = true;
                        NetManager.request(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020ROLL,{
                            activeId:view.acTivityId,
                            chooseNum:idx
                        });
                    },
                    handler : view
                });
            }
            else
            {
                App.CommonUtil.showTip(LanguageManager.getlocal(`itemNumNotEnough`));
            }
            return;
        }
        
        let neednum = 1;
        let is10 = null;
        if (this._throwType == 1)
        {
            neednum = 10;
            is10 = 1;
        }

        if(view.vo.getBoxNum() >= neednum){//
            view._stopClick = true;
             view._isAIDice = false;
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020ROLL,{
                activeId:view.acTivityId,
                isten:is10
            });
        }
        else{
            
            App.CommonUtil.showTip(LanguageManager.getlocal(`itemNumNotEnough`));
            return;
        }
        
	
    }

  
    private update():void
    {
        let vo = this.vo;

        let num = 0;
        if (this._throwType == 2)
        {
            num = vo.getAIDiceNum();
        }
        else
        {
            num = vo.getBoxNum();
        }
        this._numTF.text =  LanguageManager.getlocal("acTreasureBoxNum-1",[String(num)]);
        this._aiReddot.visible = vo.getAIDiceNum()>0;

        this._aidicename.text =  LanguageManager.getlocal("acAC2020_ai_throw_num",[String(vo.getAIDiceNum())]);
    }

	private _rewardData : any = null;

	private playBoxCallback(evt : egret.Event):void
	{
		let view = this;
        let data = evt.data.data.data;
        view._rewardData = null;
        view._rewardData = data;
        if(evt.data.data.ret < 0){
            view._stopClick = false;
            App.CommonUtil.showTip(LanguageManager.getlocal('limitedCollectErrorTips'));
            return;
        }
        view._stopPlay = false;

        //刷新奖励
        view._circleText.text = LanguageManager.getlocal(`acTreasureRoundReward-1`, [(view.vo.getCircleNum()+1).toString()]);
        let rewardStr = view.vo.getCurRoundReward();
        if(view._prevRoundReward !== rewardStr){
            view._rewardGroup.removeChildren();
            let rewardArr = GameData.getRewardItemIcons(rewardStr,true,false);
            let tmpX = (455 - rewardArr.length * 80 - (rewardArr.length - 1) * 5) / 2;
            if(rewardArr.length > 5){
                tmpX = 5;
            }
            
            for(let i in rewardArr){
                let icon = rewardArr[i];
                icon.setScale(80/108);
                icon.x = tmpX + 85 * Number(i);
                icon.y = 5;
                view._rewardGroup.addChild(icon);
            }
        }
        view._prevRoundReward = rewardStr;
		
        ViewController.getInstance().openView(ViewConst.BASE.ACAC2020BOXRESULTVIEW,{
            aid : view.aid,
            code : view.code,
            uicode : view.uicode,
            result : data.randNumber,
            skip : view._oneKeySearchStatus,
            aidice:view._isAIDice,
            confirmCallback : ()=>{
                if(view._oneKeySearchStatus){
                    view.moveCar(false);
                    view.showBoxEnd();
                }
                else{
                    if(view._carGroup){
                        view._carGroup.removeChildren();
                    }
                    // view.setChildIndex(view._carGroup, 99999);
                    // let bg = BaseBitmap.create(`public_9_viewmask`);
                    // bg.height = view._carGroup.height;//GameConfig.stageHeigth - 80 - 119 - view.titleBg.height;
                    // bg.width = GameConfig.stageWidth;
                    // view._carGroup.addChild(bg);

                    // let carbg = BaseBitmap.create(`enjoynightcarbg-1`);
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, carbg, view._carGroup, [0,0], true);
                    // view._carGroup.addChild(carbg);
            
                    // let carbg2 = BaseBitmap.create(`enjoynightcarbg-1`);
                    // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, carbg2, carbg, [carbg.width,0]);
                    // view._carGroup.addChild(carbg2);

                    // let boatclip = ComponentManager.getCustomMovieClip(`treasurecar1-`,6,100);
                    // boatclip.width = 368;
                    // boatclip.height = 170;
                    // view.setLayoutPosition(LayoutConst.horizontalCentertop, boatclip, view._carGroup, [0,carbg.y + carbg.height - boatclip.height - 35], true);
                    // view._carGroup.addChild(boatclip); 
                    // boatclip.playWithTime(-1);

                    // let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acTreasurecarTip1-1`),22,TextFieldConst.COLOR_BLACK);
                    // view.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, view._carGroup, [0,carbg.y + 20], true);
                    // view._carGroup.addChild(tipTxt); 

                    // let tipBg = BaseBitmap.create(`public_itemtipbg2`);
                    // view._carGroup.addChild(tipBg);

                    // let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acTreasurecarTip2-1`),22);
                    // view._carGroup.addChild(tipTxt2); 
                    
                    // tipBg.width = tipTxt2.textWidth + 60;
                    // view.setLayoutPosition(LayoutConst.horizontalCentertop, tipBg, view._carGroup, [0,carbg.y + carbg.height + 15], true);
                    // view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt2, tipBg);

                    // egret.Tween.get(carbg,{loop : true}).
                    // to({x : -carbg.width},5000). 
                    // to({x : carbg.width - 10}, 1).
                    // to({x : 0},5000);
            
                    // egret.Tween.get(carbg2,{loop : true}).
                    // to({x : -carbg2.width}, 10000).
                    // to({x : carbg2.width - 10}, 1);

                    // egret.Tween.get(carbg).wait(1500).call(()=>{
                    //     if(!view._stopPlay){
                            view.moveCar();
                            //
                            view._carGroup.removeChildren();
                    //     }
                    // },view);
                }
            },
            handler : view
        });
	}

	private moveCar(flag = true):void{
        let view = this;
        //小车位置
        let curMap = view.vo.getCurMapId();
        let item = view._bgGroup.getChildByName(`item${curMap}`);
        let info = view.mapPos[curMap];
        let curLeft = view._noticescrollView.scrollLeft;
        if(flag){

            let lamp = ComponentManager.getCustomMovieClip(`treasurecarmove1-`,15,50);
            lamp.blendMode = egret.BlendMode.ADD;
            lamp.width = 407;
            lamp.height = 154;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lamp, view._car);
            lamp.playWithTime(1);
            egret.Tween.get(view._car).to({alpha : 0}, 230).call(()=>{
                view._carTip.alpha = 0;
            },view);

            lamp.setEndCallBack(()=>{
                if(lamp){
                    view._bgGroup.removeChild(lamp);
                }
                egret.Tween.get(view._car).wait(200).call(()=>{
                    App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._car, item, [item.width* item.scaleX/2-15,item.height * item.scaleY + (view.cfg.map[curMap].pointType == 1 ? -20 : -35)]);
                    let posX = view._car.x + view._car.width / 2 - GameConfig.stageWidth / 2;
                    let left = Math.min(Math.max(0,posX), view.viewBg.width / 2);
                    let posY =  view._car.y+view._car.height/2-(GameConfig.stageHeigth-300)/2-220;
                    posY = Math.max(0,posY);
                    let maxY =1136- (GameConfig.stageHeigth-220);
                    let right = Math.min(posY, maxY);
                    
                    egret.Tween.get(view._noticescrollView).to({scrollLeft : left,scrollTop:right }, 500).wait(500).call(()=>{
                        let car1 = BaseBitmap.create(`treasurecarscale-1`);
                        car1.anchorOffsetX = car1.width / 2;
                        car1.anchorOffsetY = car1.height / 2;
                        car1.setScale(2);
                        view._bgGroup.addChild(car1);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, car1, view._car, [40,32.5]);
                        egret.Tween.get(car1).to({scaleX : 1, scaleY : 1}, 170).wait(230).call(()=>{
                            egret.Tween.removeTweens(car1);
                            view._bgGroup.removeChild(car1);
                        },view);
        
                        let car2 = BaseBitmap.create(`treasurecarscale-1`);
                        car2.alpha = 0.08;
                        car2.anchorOffsetX = car2.width / 2;
                        car2.anchorOffsetY = car2.height / 2;
                        car2.setScale(2);
                        view._bgGroup.addChild(car2);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, car2, view._car, [40,32.5]);
                        egret.Tween.get(car2).wait(130).to({scaleX : 1, scaleY : 1, alpha : 0.75}, 170).wait(100).call(()=>{
                            egret.Tween.removeTweens(car2);
                            view._bgGroup.removeChild(car2);
                        },view);
        
                        let car3 = BaseBitmap.create(`treasurecarscale-1`);
                        car3.alpha = 0.08;
                        car3.anchorOffsetX = car3.width / 2;
                        car3.anchorOffsetY = car3.height / 2;
                        car3.setScale(2);
                        view._bgGroup.addChild(car3);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, car3, view._car, [40,32.5]);
                        egret.Tween.get(car3).wait(260).to({scaleX : 1, scaleY : 1, alpha : 1}, 140).call(()=>{
                            egret.Tween.removeTweens(car3);
                            view._bgGroup.removeChild(car3);
                        },view).call(()=>{
                            let lamp2 = ComponentManager.getCustomMovieClip(`treasurecarmove1-`,15,50);
                            lamp2.blendMode = egret.BlendMode.ADD;
                            lamp2.width = 407;
                            lamp2.height = 154;
                            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lamp2, view._car);
                            lamp2.playWithTime(1);
                            view._car.alpha = 1;
                            lamp2.setEndCallBack(()=>{
                                if(lamp2){
                                    egret.Tween.get(lamp2).to({alpha : 0}, 200).call(()=>{
                                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._carTip, item, [10,100-view._carTip.height]);
                                        // egret.Tween.removeTweens(view._carTip);
                                        view._carTip.alpha = 1;
                                    //     egret.Tween.get(view._carTip, {loop : true}).to({y : view._carTip.y - 15}, 500).to({y : view._carTip.y}, 500);
                                    // },view).wait(200).call(()=>{
                                        egret.Tween.removeTweens(lamp2);
                                        view._bgGroup.removeChild(lamp2);
                                        view.showBoxEnd();
                                    },view);
                                }
                            },view);
                            view._bgGroup.addChild(lamp2);
                        },view);
                        egret.Tween.removeTweens(view._noticescrollView);
                    },view);
                },view);
            },view);
            view._bgGroup.addChild(lamp);
        }
        else{
            if(item){
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view._car, item, [item.width* item.scaleX/2-15,item.height * item.scaleY + (view.cfg.map[curMap].pointType == 1 ? -20 : -35)]);
                let posX = view._car.x + view._car.width / 2 - GameConfig.stageWidth / 2;
                let left = Math.min(Math.max(0,posX), view.viewBg.width / 2);
                view._noticescrollView.scrollLeft = left;

                let posY =  view._car.y+view._car.height/2-(GameConfig.stageHeigth-300)/2-220;
                posY = Math.max(0,posY);
                let maxY =1136- (GameConfig.stageHeigth-220);
                let right = Math.min(posY, maxY);
                view._noticescrollView.scrollTop = right;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._carTip, item, [10,100-view._carTip.height]);
                // egret.Tween.removeTweens(view._carTip);
        
                // egret.Tween.get(view._carTip, {loop : true}).to({y : view._carTip.y - 15}, 500).to({y : view._carTip.y}, 500);
            }
        }        
    }

	private showBoxEnd():void{
        let view = this;
        let info = view.cfg.map[view.vo.getCurMapId()];
        let data = view._rewardData;
        view.freshView();
        
        if(info.pointType == 2){
            view.showReward(data,2);
        }
        else{
            view.showReward(data);
        }
        view._stopClick = false;
    }

    private showAvg():void{
        let view = this;
        let mapId = view.vo.getCurMapId();

        ViewController.getInstance().openView(ViewConst.BASE.ACAC2020AVGVIEW,{
            aid : view.aid,
            code : view.code,
            uicode : view.uicode,
            mapId : mapId,
            key : view.vo.getMapTimes(),
            
        });
    }

    private showReward(data : any, type=1 ):void{
        let view = this;

        if (data.isten)
        {
            ViewController.getInstance().openView(ViewConst.POPUP.ACAC2020TENPOPUPVIEW,{
                    aid : view.aid,
                    code : view.code,
                    uicode : view.uicode,
                    info : data.rollArr,
                    
                });
        }
        else
        {
            let addValue = data.addValue;

            if (type == 2)
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACAC2020GETREWARDVIEW,{
                    aid : view.aid,
                    code : view.code,
                    uicode : view.uicode,
                    rewards : data.rewards,
                    extra : data.wealthGodRewards,
                    addValue :addValue,
                    confirmCallback : ()=>{        
                        view.showAvg();
                    },
                    handler : view
                });
            }
            else
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACAC2020GETREWARDVIEW,{
                    aid : view.aid,
                    code : view.code,
                    uicode : view.uicode,
                    rewards : data.rewards,
                    extra : data.wealthGodRewards,
                    addValue : addValue,

                });
            }
        }
    } 

    public getuicode():string
    {
        return this.uicode;
    }

    public getUicode():string
    {
        return this.getuicode()
    }

     /**
	 * 如果要显示tip弹板重写此方法，可以加上条件检测，多次打开都会检测
	 */
	// protected getReportTipData():{title:{key:string,param?:string[]},msg:{key:string,param?:string[]}}{

    //     let localkey:string = `acEnjoyNightreportTipTime`+this.code+"_"+Api.playerVoApi.getPlayerID();
    //     let timeStr:string = LocalStorageManager.get(localkey);
    //     let lastTime:number = 0;
    //     if (timeStr && timeStr!="")
    //     {   
    //         lastTime = Number(timeStr);
    //     }

    //     if (lastTime < this.vo.et)
    //     {   
    //         let getReportData:any = {title:{key:`acEnjoyNightreporttitle-${this.code}`},msg:{key:`acEnjoyNightreportmsg-${this.code}`}};
    //         LocalStorageManager.set(localkey,String(this.vo.et));
    //         return getReportData;
    //     }
    //     else
    //     {
    //        return null;
    //     }
	// }

     public dispose():void
     {  
		let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.update, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020ROLL),view.playBoxCallback,view);

        view._bgGroup = null;
        view._stopClick = null;
        view._cdText = null;

        this._checkFlag1 = null;
        this._checkFlag2 = null;
        this._throwType = 0;
        this._numTF = null;
        this._diceBtn = null;

        this._rewardScrollView = null;
        this._prevRoundReward = null;
      
        this._countDownTime = null;
		this._countDownTimeBg = null;
        this._circleText = null;
        this._rewardBtn = null;
        this._rewardGroup = null;

        this._boxInfoList = [];

		view._bgGroup = null;
        if(view._carGroup){
            view._carGroup.removeTouchTap();
            view._carGroup.dispose();
            view._carGroup = null;
        }
        view._car = null;
        // egret.Tween.removeTweens(view._carTip);
        view._carTip = null;
        view._noticescrollView = null;
        view._stopPlay = false;
        view._stopClick = false;
        this._isPlay= false;
        this._isAIDice = false;
        this._aiReddot = null;
        this._aidicename = null;

        super.dispose();
     }
}