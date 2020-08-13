/**
 * 群芳会对战
 */

class AcCrossServerWifeBattleBattleView  extends BaseView
{


    private _fightarr:any = null;
    private _point:number = 0;
    private _rewardnum:number = 0;
    private _winflag:number = 0;
    private _callback:Function = null;
    private _target:any = null;

    //跳过战斗按钮
    private _stepBtn:BaseButton = null;

    //我的剩余红颜个数
    private _myWifeCount:BaseTextField = null;
    //我的总才情
    private _myTotalTalent:BaseTextField = null;
    //我的卡牌容器
    private _myCardContainer:BaseDisplayObjectContainer = null;
    //我的总才情进度条
    private _myBProgress:ProgressBar = null;
    //我的红颜卡牌列表
    private _myWifeCardList:BaseDisplayObjectContainer[] = null;
    //当前红颜皮肤名称背景
    private _myCurSkinNameBg:BaseBitmap = null;
    //当前红颜才情进度条
    private _myCurProgress:ProgressBar = null;
    //我的当前红颜名称
    private _myCurWifeName:BaseTextField = null;
    //当前皮肤名称
    private _myCurSkinName:BaseTextField = null;
    //当前才情
    private _myCurTalent: BaseTextField = null;
    //当前红颜形象容器
    private _myCurWifeContainer:BaseDisplayObjectContainer = null;

    //敌人
    //敌人的剩余红颜个数
    private _enemyWifeCount:BaseTextField = null;
    //敌人的总才情
    private _enemyTotalTalent:BaseTextField = null;
    //敌人的卡牌容器
    private _enemyCardContainer:BaseDisplayObjectContainer = null;
    //敌人的总才情进度条
    private _enemyBProgress:ProgressBar = null;
    //敌人的红颜卡牌列表
    private _enemyWifeCardList:BaseDisplayObjectContainer[] = null;
    //当前敌人红颜皮肤名称背景
    private _enemyCurSkinNameBg:BaseBitmap = null;
    //当前敌人红颜才情进度条
    private _enemyCurProgress:ProgressBar = null;
    //敌人的当前红颜名称
    private _enemyCurWifeName:BaseTextField = null;
    //当前敌人皮肤名称
    private _enemyCurSkinName:BaseTextField = null;
    //当前敌人才情
    private _enemyCurTalent: BaseTextField = null;
    //当前敌人红颜形象容器
    private _enemyCurWifeContainer:BaseDisplayObjectContainer = null;


    // private _myCardDataList:any[] = null;
    // private _enemyCardDataList:any[]= null;

    private _myCurIndex:number = 0;
    private _enemyCurIndex:number = 0;
    private _curRound:number = 0;

    private _myNameBg:BaseBitmap = null;
    private _enemyNameBg:BaseBitmap = null;

    private _myCurWife: BaseLoadBitmap = null;
    private _enemyCurWife: BaseLoadBitmap = null;

    private _myMaxTalent:number = 0;
    private _enemyMaxTalent:number = 0;

    private _mySelectCard:BaseDisplayObjectContainer = null;
    private _enemySelectCard: BaseDisplayObjectContainer = null;

    private _myMaxNum = 0;
    private _enemyMaxNum = 0;

    private _myCurWifeStr:string = null;
    private _enemyCurWifeStr:string = null;

    private _enemyNameY:number = 0;
    private _myNameY:number = 0;

    private _myAnim:CustomMovieClip = null;
    private _enemyAnim:CustomMovieClip = null;

    private _myTalkBg:BaseBitmap = null;
    private _myTalkTxt:BaseTextField = null;

    private _enemyTalkBg:BaseBitmap = null;
    private _enemyTalkTxt:BaseTextField = null;

    private _isPause = false;
    private _isReview = false;
    
    private _animTime:number = 1000;
    public constructor() {
		super();
	}
    protected getCloseBtnName():string
    {
        return null;
    }
    // protected isTouchMaskClose():boolean
    // {
    //     return true;
    // }
    public hide()
    {
        if(this._target && this._callback){
            this._callback.apply(this._target);
        }
        super.hide();
    }
	protected initView():void
	{   
        if (PlatformManager.checkIsEnLang()|| PlatformManager.checkIsRuLang())
        {
            this._animTime= 3000;
        }

        this.titleTF.visible =false;
        this._fightarr = this.param.data.fightarr;
        this._point = this.param.data.point;
        this._rewardnum = this.param.data.rewardnum;
        this._winflag = this.param.data.winflag;
        this._callback = this.param.data.callback;
        this._target = this.param.data.target;
        this._isReview = this.param.data.isReview;
        
     

        
        this.initBottomView();   
        
        this.initCards();
        this.initCenterView();
    }

    protected initBg(): void {
		this.viewBg = BaseBitmap.create("wifebattlebattleview_bg");
		this.viewBg.width = 640;
		this.viewBg.height = 1136;

		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);

	}
    protected isShowOpenAni():boolean
	{
		return false;
	}
    /**
     * 显示初始化View
     */
    private initBottomView()
    {
        console.log("initBottomView");
        let myCardsBg = BaseLoadBitmap.create("wifebattlebattleview_playercardbg");
        myCardsBg.width = 640;
        myCardsBg.height =161;
        myCardsBg.x = 0;
        myCardsBg.y = GameConfig.stageHeigth - myCardsBg.height;
        this.addChild(myCardsBg);

        let myBlackBg = BaseBitmap.create("wifebattlebattleview_blackbg");
        myBlackBg.width = 640;
        myBlackBg.x = 0;
        myBlackBg.y = myCardsBg.y - myBlackBg.height;
        this.addChild(myBlackBg);
    

        this._myCardContainer = new BaseDisplayObjectContainer();
        this._myCardContainer.width = 640;
        this._myCardContainer.height = 162;
        this._myCardContainer.x = 0;
        this._myCardContainer.y = myCardsBg.y + myCardsBg.height/2 - this._myCardContainer.height/2;
        this.addChild(this._myCardContainer);

        this._myWifeCount = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleBattleWifeCount",["44"]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._myWifeCount.x = 10;
        this._myWifeCount.y = myBlackBg.y + myBlackBg.height/2 - this._myWifeCount.height/2;
        this.addChild(this._myWifeCount);

        let myName = ComponentManager.getTextField(this._fightarr.auserinfo.name,22,0x70c6fb);
        myName.x = GameConfig.stageWidth - 10 - myName.width;
        myName.y = myBlackBg.y + myBlackBg.height/2 - myName.height/2;
        this.addChild(myName);

        this._myBProgress = ComponentManager.getProgressBar("wifebattlebattleview_bprogressbar","wifebattlebattleview_bprogressbg",350);
        this._myBProgress.scaleX = -1;
		this._myBProgress.x = GameConfig.stageWidth/2 - this._myBProgress.width/2 + this._myBProgress.width;
        this._myBProgress.y = myBlackBg.y + myBlackBg.height/2 - this._myBProgress.height/2;
		this._myBProgress.setPercentage(1);
        this.addChild(this._myBProgress);

        this._myTotalTalent = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleBattleTotalTalent",["555"]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._myTotalTalent.x = GameConfig.stageWidth / 2 - this._myTotalTalent.width/2;
        this._myTotalTalent.y = myBlackBg.y + myBlackBg.height/2 - this._myTotalTalent.height/2;
        this.addChild(this._myTotalTalent);


        //敌人
        let enemyCardsBg = BaseLoadBitmap.create("wifebattlebattleview_playercardbg");
        enemyCardsBg.width = 640;
        enemyCardsBg.height = 161;
        enemyCardsBg.scaleY = -1;
        enemyCardsBg.x = 0;
        enemyCardsBg.y = enemyCardsBg.height;
        this.addChild(enemyCardsBg);

        let enemyBlackBg = BaseBitmap.create("wifebattlebattleview_blackbg");
        enemyBlackBg.width = 640;
        enemyBlackBg.x = 0;
        enemyBlackBg.y = enemyCardsBg.y;
        this.addChild(enemyBlackBg);

        this._enemyCardContainer = new BaseDisplayObjectContainer();
        this._enemyCardContainer.width = 640;
        this._enemyCardContainer.height = 162;
        this._enemyCardContainer.x = 0;
        this._enemyCardContainer.y = enemyCardsBg.height/2 - this._enemyCardContainer.height/2;
        this.addChild(this._enemyCardContainer);

        this._enemyWifeCount = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleBattleWifeCount",["44"]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._enemyWifeCount.x = GameConfig.stageWidth - 10 - this._enemyWifeCount.width;
        this._enemyWifeCount.y = enemyBlackBg.y + enemyBlackBg.height/2 - this._enemyWifeCount.height/2;
        this.addChild(this._enemyWifeCount);

        let enemyName = ComponentManager.getTextField(this._fightarr.duserinfo.name,22,0xec3e49);
        enemyName.x = 10;
        enemyName.y = enemyBlackBg.y + enemyBlackBg.height/2 - enemyName.height/2;
        this.addChild(enemyName);

        this._enemyBProgress = ComponentManager.getProgressBar("wifebattlebattleview_bprogressbar","wifebattlebattleview_bprogressbg",350);
		this._enemyBProgress.x = GameConfig.stageWidth/2 - this._enemyBProgress.width/2;
        this._enemyBProgress.y = enemyBlackBg.y + enemyBlackBg.height/2 - this._enemyBProgress.height/2;
		this._enemyBProgress.setPercentage(1);
        this.addChild(this._enemyBProgress);

        this._enemyTotalTalent = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleBattleTotalTalent",["6666"]),22,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._enemyTotalTalent.x = GameConfig.stageWidth / 2 - this._enemyTotalTalent.width/2;
        this._enemyTotalTalent.y = enemyBlackBg.y + enemyBlackBg.height/2 - this._enemyTotalTalent.height/2;
        this.addChild(this._enemyTotalTalent);

        this._stepBtn = ComponentManager.getButton("wifebattlebattleview_step",null,this.stepBtnHandler,this);
        this._stepBtn.x = GameConfig.stageWidth - 10 - this._stepBtn.width;
        this._stepBtn.y = enemyBlackBg.y + enemyBlackBg.height + 15;
        // this._stepBtn.visible = false;
        this.addChild(this._stepBtn);
        // egret.Tween.get(this._stepBtn)
        // .wait(5000)
        // .set({visible:true})

    }
    
    private initCenterView()
    {
        console.log("initCenterView");

        let enemyNameY = 500 //530;
        this._enemyNameY = enemyNameY;

        this._enemyCurWifeContainer = new BaseDisplayObjectContainer();
        this._enemyCurWifeContainer.width = 320;
        this._enemyCurWifeContainer.height = 420;
        // this._enemyCurWifeContainer.setScale(0.5);
        this._enemyCurWifeContainer.x = 0;
        this._enemyCurWifeContainer.y = enemyNameY - this._enemyCurWifeContainer.height + 70;
        this._enemyCurWifeContainer.mask = new egret.Rectangle(0,0,this._enemyCurWifeContainer.width,this._enemyCurWifeContainer.height);

        this.addChild(this._enemyCurWifeContainer);

        this._enemyCurSkinNameBg = BaseBitmap.create("wifebattlebattleview_skinnamebg");
        if(PlatformManager.checkIsViSp()){
            this._enemyCurSkinNameBg.width = 279 + 50;
        }
        this._enemyCurSkinNameBg.x = 20;
        this._enemyCurSkinNameBg.y = enemyNameY - this._enemyCurSkinNameBg.height+30;
        this.addChild(this._enemyCurSkinNameBg);

        this._enemyCurSkinName = ComponentManager.getTextField("skinname111",20,0xec3e49);
        this._enemyCurSkinName.x = this._enemyCurSkinNameBg.x + this._enemyCurSkinNameBg.width/2 - this._enemyCurSkinName.width/2;
        this._enemyCurSkinName.y = this._enemyCurSkinNameBg.y + this._enemyCurSkinNameBg.height/2 - this._enemyCurSkinName.height/2 + 10;
        this.addChild(this._enemyCurSkinName);

        let enemyNameBg = BaseBitmap.create("wifebattlebattleview_wifenamebg");
        if(PlatformManager.checkIsViSp()){
            enemyNameBg.width = 344 + 50;
        }
        enemyNameBg.x = 0;
        enemyNameBg.y = enemyNameY;
        this.addChild(enemyNameBg);
        this._enemyNameBg = enemyNameBg;

        if(PlatformManager.checkIsViSp()){
            this._enemyCurProgress = ComponentManager.getProgressBar("wifebattlebattleview_sprogressbar","wifebattlebattleview_sprogressbg",220 + 50);
        } else {
            this._enemyCurProgress = ComponentManager.getProgressBar("wifebattlebattleview_sprogressbar","wifebattlebattleview_sprogressbg",220);
        }
        
        this._enemyCurProgress.x = enemyNameBg.x + 90;
        this._enemyCurProgress.y = enemyNameBg.y + 60;
        this.addChild(this._enemyCurProgress); 
        
        this._enemyCurTalent = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleBattleTalent",["3333"]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._enemyCurTalent.x = this._enemyCurProgress.x + this._enemyCurProgress.width/2 - this._enemyCurTalent.width/2;
        this._enemyCurTalent.y = this._enemyCurProgress.y + this._enemyCurProgress.height/2 - this._enemyCurTalent.height/2;
        this.addChild(this._enemyCurTalent);

        this._enemyCurWifeName = ComponentManager.getTextField("name111",20,0xec3e49);
        this._enemyCurWifeName.x = enemyNameBg.x + enemyNameBg.width/2 - this._enemyCurWifeName.width/2;
        this._enemyCurWifeName.y = enemyNameBg.y + 37;
        this.addChild(this._enemyCurWifeName);
        
        let enemyNameFg = BaseBitmap.create("wifebattlebattleview_wifenamefg");
        if(PlatformManager.checkIsViSp()){
            enemyNameFg.width = 356 + 50;
        }
        enemyNameFg.x = enemyNameBg.x;
        enemyNameFg.y = enemyNameBg.y;
        this.addChild(enemyNameFg);


        //自己
        let myNameY = 650 + (GameConfig.stageHeigth - 960) / (1136 - 960) * 100;
        this._myNameY = myNameY;

        this._myCurWifeContainer = new BaseDisplayObjectContainer();
        this._myCurWifeContainer.width = 320;
        this._myCurWifeContainer.height = 420;
        // this._myCurWifeContainer.setScale(0.5);
        this._myCurWifeContainer.x = GameConfig.stageWidth - 320;
        this._myCurWifeContainer.y = myNameY - this._myCurWifeContainer.height + 70;
        this._myCurWifeContainer.mask = new egret.Rectangle(0,0,this._myCurWifeContainer.width,this._myCurWifeContainer.height);
 
        this.addChild(this._myCurWifeContainer);

        this._myCurSkinNameBg = BaseBitmap.create("wifebattlebattleview_skinnamebg");
        if(PlatformManager.checkIsViSp()){
            this._myCurSkinNameBg.width = 279 + 50;
        }
        this._myCurSkinNameBg.scaleX = -1;
        this._myCurSkinNameBg.x = GameConfig.stageWidth - 20;
        this._myCurSkinNameBg.y = myNameY - this._myCurSkinNameBg.height+30;
        this.addChild(this._myCurSkinNameBg);

        this._myCurSkinName = ComponentManager.getTextField("skinname111",20,0xec3e49);
        this._myCurSkinName.x = this._myCurSkinNameBg.x + this._myCurSkinNameBg.width/2 - this._myCurSkinName.width/2 - this._myCurSkinNameBg.width;
        this._myCurSkinName.y = this._myCurSkinNameBg.y + this._myCurSkinNameBg.height/2 - this._myCurSkinName.height/2 + 10;
        this.addChild(this._myCurSkinName);


        let myNameBg = BaseBitmap.create("wifebattlebattleview_wifenamebg");
        if(PlatformManager.checkIsViSp()){
            myNameBg.width = 344 + 50;
        }
        myNameBg.scaleX = -1;
        myNameBg.x = GameConfig.stageWidth;
        myNameBg.y = myNameY;
        this.addChild(myNameBg);
        this._myNameBg = myNameBg;
        if(PlatformManager.checkIsViSp()){
            this._myCurProgress = ComponentManager.getProgressBar("wifebattlebattleview_sprogressbar","wifebattlebattleview_sprogressbg",220 + 50);
        } else {
            this._myCurProgress = ComponentManager.getProgressBar("wifebattlebattleview_sprogressbar","wifebattlebattleview_sprogressbg",220);  
        }
        
        this._myCurProgress.scaleX = -1;
        this._myCurProgress.x = myNameBg.x - 90;
        this._myCurProgress.y = myNameBg.y + 60;
        this.addChild(this._myCurProgress); 
        
        this._myCurTalent = ComponentManager.getTextField(LanguageManager.getlocal("wifeBattleBattleTalent",["3333"]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._myCurTalent.x = this._myCurProgress.x + this._myCurProgress.width/2 - this._myCurTalent.width/2 - this._myCurProgress.width;
        this._myCurTalent.y = this._myCurProgress.y + this._myCurProgress.height/2 - this._myCurTalent.height/2;
        this.addChild(this._myCurTalent);

        this._myCurWifeName = ComponentManager.getTextField("name111",20,0xec3e49);
        this._myCurWifeName.x = myNameBg.x + myNameBg.width/2 - this._myCurWifeName.width/2 - myNameBg.width;
        this._myCurWifeName.y = myNameBg.y + 37;
        this.addChild(this._myCurWifeName);
        
        let myNameFg = BaseBitmap.create("wifebattlebattleview_wifenamefg");
        if(PlatformManager.checkIsViSp()){
            myNameFg.width = 356 + 50;
        }
        myNameFg.scaleX = -1;
        myNameFg.x = myNameBg.x;
        myNameFg.y = myNameBg.y;
        this.addChild(myNameFg);

        this._myCurSkinNameBg.visible = false;
        this._myCurSkinName.visible = false;
        this._enemyCurSkinNameBg.visible = false;
        this._enemyCurSkinName.visible = false;
        this.beginRound();
    }

    private beginRound(){
        console.log("beginRound---");
        if(this._isPause){
            return;
        }
        //开始当前回合
        //当前我方初始化
        let curRoundData = this._fightarr.info[this._curRound];
        if(this._curRound == 0){
            this._myMaxTalent = curRoundData[8];
            this._enemyMaxTalent = curRoundData[9];
        }

        
        let myWifeCfg:Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(curRoundData[0]);
        let myWifeInfo = this._fightarr.ainfo[myWifeCfg.id];
        let myWifeSkinCfg:Config.WifeSkinItemCfg = null;
        let myWifeIconStr = myWifeCfg.body;//"wife_full_"+myWifeCfg.id;
        this._myCurSkinNameBg.visible = false;
        this._myCurSkinName.visible = false;
        if(myWifeInfo.skin  || myWifeInfo.maleskin){
            // myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(myWifeInfo.skin);
            // myWifeIconStr = myWifeSkinCfg.body//"wife_skin_"+myWifeInfo.skin;

            if(Api.switchVoApi.checkIsInBlueWife() && myWifeInfo.sexflag && myWifeInfo.sexflag >= 1){
                myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(myWifeInfo.maleskin);
                myWifeIconStr = myWifeSkinCfg.getBody(true);//"wife_skin_"+myWifeInfo.skin;
                this._myCurSkinName.text = myWifeSkinCfg.getName(true);
            } else {
                myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(myWifeInfo.skin);
                myWifeIconStr = myWifeSkinCfg.getBody(false);//"wife_skin_"+myWifeInfo.skin;
                this._myCurSkinName.text = myWifeSkinCfg.getName(false);
            }

            this._myCurSkinNameBg.visible = true;
            this._myCurSkinName.visible = true;
            // this._myCurSkinName.text = myWifeSkinCfg.name;
            this._myCurSkinName.x = this._myCurSkinNameBg.x + this._myCurSkinNameBg.width/2 - this._myCurSkinName.width/2 - this._myCurSkinNameBg.width;
        }
        if(PlatformManager.checkIsViSp()){
            this._myCurWifeName.text = myWifeCfg.getName(Api.switchVoApi.checkIsInBlueWife() && myWifeInfo.sexflag && myWifeInfo.sexflag >= 1);
        } else {
            this._myCurWifeName.text = myWifeCfg.getName(Api.switchVoApi.checkIsInBlueWife() && myWifeInfo.sexflag && myWifeInfo.sexflag >= 1) + "("+LanguageManager.getlocal("wifestatusTitle"+myWifeInfo.level)+")";
        }
        
        this._myCurWifeName.x = this._myNameBg.x + this._myNameBg.width/2 - this._myCurWifeName.width/2 - this._myNameBg.width;
        
        this._myCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent",[String(curRoundData[2])]);
        this._myCurTalent.x = this._myCurProgress.x + this._myCurProgress.width/2 - this._myCurTalent.width/2 - this._myCurProgress.width;

        this._myCurProgress.setPercentage(curRoundData[2]/myWifeInfo.talent);

        if(!this._myCurWife){
            this._myCurWife = BaseLoadBitmap.create(myWifeIconStr);
            this._myCurWife.width = 640;
            this._myCurWife.height = 840;
            this._myCurWife.anchorOffsetX = this._myCurWife.width /2;
            this._myCurWife.anchorOffsetY = this._myCurWife.height /2;
            this._myCurWifeContainer.addChild(this._myCurWife);
        }
        this._myCurWife.setScale(0.4)

        this._myCurWife.alpha = 1;
    
        if(this._myCurWifeStr != myWifeIconStr){
            
            this._myCurWife.setload(myWifeIconStr)
            this._myCurWife.x = 640 + this._myCurWife.width * this._myCurWife.scaleX / 2;
            this._myCurWife.y = this._myCurWifeContainer.height - this._myCurWife.height * this._myCurWife.scaleY /2;
            egret.Tween.get(this._myCurWife)
            .to({x:this._myCurWifeContainer.width/2},300);
            this._myCurWifeStr = myWifeIconStr
        }

        //当前敌人
        let enemyWifeCfg:Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(curRoundData[1]);
        let enemyWifeInfo = this._fightarr.dinfo[enemyWifeCfg.id];
        let enemyWifeSkinCfg:Config.WifeSkinItemCfg = null;
        let enemyWifeIconStr = enemyWifeCfg.getBody(enemyWifeInfo.sexflag && enemyWifeInfo.sexflag >= 1);//"wife_full_"+enemyWifeCfg.id;
        this._enemyCurSkinNameBg.visible = false;
        this._enemyCurSkinName.visible = false;
        let isBlue = false;
        if(enemyWifeInfo.skin || enemyWifeInfo.maleskin){
            if(enemyWifeInfo.sexflag && enemyWifeInfo.sexflag >= 1){
                enemyWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(enemyWifeInfo.maleskin);
                enemyWifeIconStr = enemyWifeSkinCfg.getBody(true);//"wife_skin_"+enemyWifeInfo.skin;
                 this._enemyCurSkinName.text = enemyWifeSkinCfg.getName(true);
                 let isBlue = true;
            } else {
                enemyWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(enemyWifeInfo.skin);
                enemyWifeIconStr = enemyWifeSkinCfg.getBody(false);//"wife_skin_"+enemyWifeInfo.skin;
                 this._enemyCurSkinName.text = enemyWifeSkinCfg.getName(false);
                 let isBlue = false;
            }


            this._enemyCurSkinNameBg.visible = true;
            this._enemyCurSkinName.visible = true;
           
            // this._enemyCurSkinName.x = this._enemyCurSkinNameBg.x + this._enemyCurSkinNameBg.width/2 - this._enemyCurSkinName.width/2 - this._enemyCurSkinNameBg.width;
            this._enemyCurSkinName.x = this._enemyCurSkinNameBg.x + this._enemyCurSkinNameBg.width/2 - this._enemyCurSkinName.width/2;
        }
        if(PlatformManager.checkIsViSp()){
            this._enemyCurWifeName.text = enemyWifeCfg.getName(enemyWifeInfo.sexflag && enemyWifeInfo.sexflag >= 1);
        } else {
            this._enemyCurWifeName.text = enemyWifeCfg.getName(enemyWifeInfo.sexflag && enemyWifeInfo.sexflag >= 1) + "("+LanguageManager.getlocal("wifestatusTitle"+enemyWifeInfo.level+(isBlue?"_blueType":""))+")";
        }
        
        this._enemyCurWifeName.x = this._enemyNameBg.x + this._enemyNameBg.width/2 - this._enemyCurWifeName.width/2;
        
        this._enemyCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent",[String(curRoundData[3])]);
        this._enemyCurTalent.x = this._enemyCurProgress.x + this._enemyCurProgress.width/2 - this._enemyCurTalent.width/2;
        this._enemyCurProgress.setPercentage(curRoundData[3]/enemyWifeInfo.talent);


        if(!this._enemyCurWife){
            this._enemyCurWife = BaseLoadBitmap.create(enemyWifeIconStr);
            this._enemyCurWife.width = 640;
            this._enemyCurWife.height = 840;
            this._enemyCurWife.anchorOffsetX = this._enemyCurWife.width /2;
            this._enemyCurWife.anchorOffsetY = this._enemyCurWife.height /2;
            this._enemyCurWifeContainer.addChild(this._enemyCurWife);
        }
        this._enemyCurWife.setScale(0.4);
        this._enemyCurWife.alpha = 1;

        if(this._enemyCurWifeStr != enemyWifeIconStr){
            this._enemyCurWife.setload(enemyWifeIconStr)
            this._enemyCurWife.x = -640 * this._enemyCurWife.scaleX /2;
            this._enemyCurWife.y = this._enemyCurWifeContainer.height - this._enemyCurWife.height * this._enemyCurWife.scaleY /2;
            egret.Tween.get(this._enemyCurWife)
            .to({x:this._enemyCurWifeContainer.width/2},300);
            this._enemyCurWifeStr = enemyWifeIconStr
        }


        

        //我方数据初始化
        this._myWifeCount.text = LanguageManager.getlocal("wifeBattleBattleWifeCount",[String(curRoundData[6])]);
        this._myTotalTalent.text = LanguageManager.getlocal("wifeBattleBattleTotalTalent",[String(curRoundData[8])]);
        this._myTotalTalent.x = GameConfig.stageWidth / 2 - this._myTotalTalent.width/2;

        //敌方数据初始化
        this._enemyWifeCount.text = LanguageManager.getlocal("wifeBattleBattleWifeCount",[String(curRoundData[7])]);
        this._enemyTotalTalent.text = LanguageManager.getlocal("wifeBattleBattleTotalTalent",[String(curRoundData[9])]);
        this._enemyTotalTalent.x = GameConfig.stageWidth / 2 - this._enemyTotalTalent.width/2;

         egret.Tween.get(this)
        .wait(600)
        .call(this.playRound,this);
    }
    private playRound(){
        console.log("playRound---");
        if(this._isPause){
            return;
        }
        
        this.enemyTalk();
        this.myTalk();

        if(!this._myAnim){
            this._myAnim = ComponentManager.getCustomMovieClip("wifebattlebattle_anim",13,70);
            this._myAnim.x = this._myCurWife.x - 180;
            this._myAnim.y = this._myCurWife.y - 180;
            this._myAnim.setEndCallBack(()=>{
                this._myAnim.visible = false;
            },this);
            this._myCurWifeContainer.addChild(this._myAnim);

        }
        if(!this._enemyAnim){
            this._enemyAnim = ComponentManager.getCustomMovieClip("wifebattlebattle_anim",13,70);
            this._enemyAnim.x = this._enemyCurWife.x - 180;
            this._enemyAnim.y = this._enemyCurWife.y - 180;
            this._enemyAnim.setEndCallBack(()=>{
                this._enemyAnim.visible = false;
            },this);
            this._enemyCurWifeContainer.addChild(this._enemyAnim);
        }

        egret.Tween.removeTweens(this);
        egret.Tween.get(this)
        .wait(200+this._animTime*2)
        .call(()=>{
            this._myAnim.visible = true;
            this._enemyAnim.visible = true;
            this._myAnim.playWithTime(1);
            this._enemyAnim.playWithTime(1);
            SoundManager.playEffect(SoundConst.EFFECT_WIFEBATTLEATK);
        });
        let myAnimX = this._myCurWife.x;
        let myAnimY = this._myCurWife.y;
        let enemyAnimX = this._enemyCurWife.x;
        let enemyAnimY = this._enemyCurWife.y;

        egret.Tween.get(this._myCurWife)
        .wait(200+this._animTime*2)
        .to({x: myAnimX + 7 ,y:myAnimY + 7},50)
        .to({x: myAnimX - 7  ,y:myAnimY -7},50)
        .to({x: myAnimX + 7 ,y:myAnimY - 7},50)
        .to({x: myAnimX - 7  ,y:myAnimY +7},50)
        .to({x: myAnimX  ,y:myAnimY })
        

        egret.Tween.get(this._enemyCurWife)
        .wait(200+this._animTime*2)
        .to({x: enemyAnimX + 7 ,y:enemyAnimY + 7},50)
        .to({x: enemyAnimX - 7  ,y:enemyAnimY -7},50)
        .to({x: enemyAnimX + 7 ,y:enemyAnimY - 7},50)
        .to({x: enemyAnimX - 7  ,y:enemyAnimY +7},50)
        .to({x: enemyAnimX  ,y: enemyAnimY })
        // .wait(500)
       

        egret.Tween.get(this)
        .wait(400+this._animTime*2)
        .call(this.overRound,this);

    }

    private enemyTalk(type?:number){
        let isBlue = false;
        let curRoundData = this._fightarr.info[this._curRound];
        let enemyWifeCfg:Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(curRoundData[1]);
        let enemyWifeInfo = this._fightarr.dinfo[enemyWifeCfg.id];
        let enemyWifeSkinCfg:Config.WifeSkinItemCfg = null;
        if(enemyWifeInfo.sexflag && enemyWifeInfo.sexflag >= 1){
            isBlue = true;
        } else {
            isBlue = false;
        }

        if(!this._enemyTalkBg){
            this._enemyTalkBg = BaseBitmap.create("wifebattleview_talkbg"); 
            this._enemyTalkTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
            this._enemyTalkTxt.width = 200;
        }
        let talkStr = null;
        if(type == 1){
            talkStr = LanguageManager.getlocal(`wifeBattleBattleWinTalk${isBlue ? "_blueType" : ""}`);
        } else {
            let talkIndex = Math.floor(Math.random() * 20) + 1;
            talkStr = LanguageManager.getlocal(`wifeBattleBattleTalk${talkIndex}${isBlue ? "_blueType" : ""}`);
        }
        this._enemyTalkTxt.text = talkStr;
        
        this._enemyTalkBg.width = this._enemyTalkTxt.width + 40;
        this._enemyTalkBg.height = this._enemyTalkTxt.height + 40 + 20;

        this._enemyTalkBg.scaleX = -1;

        this._enemyTalkBg.x = 200 + this._enemyTalkBg.width;
        this._enemyTalkBg.y = this._enemyNameY - 170 - this._enemyTalkBg.height;
        this.addChild(this._enemyTalkBg);

        this._enemyTalkTxt.x = this._enemyTalkBg.x - this._enemyTalkBg.width + this._enemyTalkBg.width/2 - this._enemyTalkTxt.width/2;
        this._enemyTalkTxt.y = this._enemyTalkBg.y + this._enemyTalkBg.height/2 - this._enemyTalkTxt.height/2 - 10;
        this.addChild(this._enemyTalkTxt);
        this._enemyTalkBg.visible = false;
        this._enemyTalkTxt.visible = false;
        
        if(type==1){
            if(this._enemyCurWife)
            {

                let curRoundData = this._fightarr.info[this._curRound];
                egret.Tween.get(this._enemyCurWife)
                .call(()=>{
                    this._enemyTalkBg.visible = true;
                    this._enemyTalkTxt.visible = true;
                })
                .wait(this._animTime)
                .call(()=>{
                    this._enemyTalkBg.visible = false;
                    this._enemyTalkTxt.visible = false;
                })
                
            }
        } else {
            if(this._enemyCurWife)
            {

                let curRoundData = this._fightarr.info[this._curRound];
                //1胜利  2平局  0负
                //干掉失败的形象
                let waitTime = 0;
                if(curRoundData[10] != 1){
                    waitTime = this._animTime;
                }
                egret.Tween.get(this._enemyCurWife)
                .wait(waitTime)
                .to({scaleX:0.5,scaleY: 0.5},100)
                .call(()=>{
                    this._enemyTalkBg.visible = true;
                    this._enemyTalkTxt.visible = true;
                    // this._enemyCurWife.scaleX = 0.5;
                    // this._enemyCurWife.scaleY = 0.5;
                })
                .wait(this._animTime)
                .call(()=>{
                    this._enemyTalkBg.visible = false;
                    this._enemyTalkTxt.visible = false;
                    // this._enemyCurWife.scaleX = 0.4;
                    // this._enemyCurWife.scaleY = 0.4;
                })
                .to({scaleX:0.4,scaleY: 0.4},100)
            }
        }

    }
    private myTalk(type?:number){
        if(!this._myTalkBg){
            this._myTalkBg = BaseBitmap.create("wifebattleview_talkbg");
            this._myTalkTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
            this._myTalkTxt.width = 200;
        }
        let talkStr = null;
        if(type == 1){
            talkStr = LanguageManager.getlocal("wifeBattleBattleWinTalk");
        } else {
            let talkIndex = Math.floor(Math.random() * 20) + 1;
            talkStr = LanguageManager.getlocal("wifeBattleBattleTalk"+talkIndex);
        }
        this._myTalkTxt.text = talkStr;
        this._myTalkBg.width = this._myTalkTxt.width + 40;
        this._myTalkBg.height = this._myTalkTxt.height + 40 + 20;

        this._myTalkBg.x = GameConfig.stageWidth - 200 - this._myTalkBg.width;
        this._myTalkBg.y = this._myNameY - 170 - this._myTalkBg.height;
        this.addChild(this._myTalkBg);

        this._myTalkTxt.x = this._myTalkBg.x + this._myTalkBg.width/2 - this._myTalkTxt.width/2;
        this._myTalkTxt.y = this._myTalkBg.y + this._myTalkBg.height/2 - this._myTalkTxt.height/2 - 10;
        this.addChild(this._myTalkTxt);
        this._myTalkBg.visible = false;
        this._myTalkTxt.visible = false;
        
        if(type == 1){
            egret.Tween.get(this._myCurWife)
            .call(()=>{
                this._myTalkBg.visible = true;
                this._myTalkTxt.visible = true;
            })
            .wait(this._animTime)
            .call(()=>{
                this._myTalkBg.visible = false;
                this._myTalkTxt.visible = false;
            })
        } else {
            if(this._myCurWife)
            {
                let curRoundData = this._fightarr.info[this._curRound];
                //1胜利  2平局  0负
                //干掉失败的形象
                let waitTime = 0;
               
                if(curRoundData[10] == 1){
                    waitTime = this._animTime;
                }
                egret.Tween.get(this._myCurWife)
                .wait(waitTime)
                .to({scaleX:0.5,scaleY: 0.5},100)
                .call(()=>{
                    // this._myCurWife.scaleX = 0.5;
                    // this._myCurWife.scaleY = 0.5;
                    this._myTalkBg.visible = true;
                    this._myTalkTxt.visible = true;
                    
                })
                .wait(this._animTime)
                .call(()=>{
                    // this._myCurWife.scaleX = 0.4;
                    // this._myCurWife.scaleY = 0.4;
                    this._myTalkBg.visible = false;
                    this._myTalkTxt.visible = false;
                })
                
                .to({scaleX:0.4,scaleY: 0.4},100)
            }
        }


    }
    private overRound(){
        if(this._isPause){
            return;
        }
        console.log("overRound---");
        // this._myAnim.visible = false;
        // this._enemyAnim.visible = false;
        let curRoundData = this._fightarr.info[this._curRound];
        //1胜利  2平局  0负
        //干掉失败的形象
        let timePlus = 0;
        switch(curRoundData[10]){
            case 0:
                if(this._myCurWife){
                    egret.Tween.get(this._myCurWife)
                    .wait(600)
                    .to({alpha:0},300)
     
                }
                if(curRoundData[5] + 1 >= Config.WifebattleCfg.battleTime){
                    
                    timePlus = 1100;
                    this.showWinBattle(false);
                    egret.Tween.get(this._enemyCurWife)
                    .wait(600)
                    .call(()=>{this.enemyTalk(1);})
                    .wait(1100)
                    .to({x:-640 * this._enemyCurWife.scaleX / 2},300)
                }

                this._myCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent",["0"]);
                this._myCurTalent.y = this._myCurProgress.y + this._myCurProgress.height/2 - this._myCurTalent.height/2;
                this._enemyCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent",[String(curRoundData[11])]);
                this._enemyCurTalent.y = this._enemyCurProgress.y + this._enemyCurProgress.height/2 - this._enemyCurTalent.height/2;

                
                let enemyWifeInfo = this._fightarr.dinfo[curRoundData[1]];
                // this._myCurProgress.setPercentage(0);
                // this._enemyCurProgress.setPercentage(curRoundData[11]/enemyWifeInfo.talent);
                this._myCurProgress.tweenTo(0,500,null,null,null,1);
                this._enemyCurProgress.tweenTo(curRoundData[11]/enemyWifeInfo.talent,500,null,null,null,1);
                break;
            case 1:
               

                if(this._enemyCurWife){
                    egret.Tween.get(this._enemyCurWife)
                    .wait(600)
                    .to({alpha:0},300)
    
                }
                if(curRoundData[4] + 1 >= Config.WifebattleCfg.battleTime){
                    
                    this.showWinBattle(true);
                    timePlus = 1100;
                    egret.Tween.get(this._myCurWife)
                    .wait(600)
                    .call(()=>{this.myTalk(1);})
                    .wait(1100)
                    .to({x:640 + this._myCurWife.width * this._myCurWife.scaleX / 2},300)
                }
                this._myCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent",[String(curRoundData[11])]);
                this._myCurTalent.y = this._myCurProgress.y + this._myCurProgress.height/2 - this._myCurTalent.height/2;
                this._enemyCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent",["0"]);
                this._enemyCurTalent.y = this._enemyCurProgress.y + this._enemyCurProgress.height/2 - this._enemyCurTalent.height/2;

                let myWifeInfo = this._fightarr.ainfo[curRoundData[0]];
                // this._myCurProgress.setPercentage(curRoundData[11]/myWifeInfo.talent);
                // this._enemyCurProgress.setPercentage(0);
                this._myCurProgress.tweenTo(curRoundData[11]/myWifeInfo.talent,500,null,null,null,1);
                this._enemyCurProgress.tweenTo(0,500,null,null,null,1);
                break;
            case 2:
                if(this._myCurWife){
                    egret.Tween.get(this._myCurWife)
                    .wait(600)
                    .to({alpha:0},300)
                }

                if(this._enemyCurWife){
                    egret.Tween.get(this._enemyCurWife)
                    .wait(600)
                    .to({alpha:0},300)

                }
                this._myCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent",["0"]);
                this._myCurTalent.y = this._myCurProgress.y + this._myCurProgress.height/2 - this._myCurTalent.height/2;
                this._enemyCurTalent.text = LanguageManager.getlocal("wifeBattleBattleTalent",["0"]);
                this._enemyCurTalent.y = this._enemyCurProgress.y + this._enemyCurProgress.height/2 - this._enemyCurTalent.height/2;

                // this._myCurProgress.setPercentage(0);
                // this._enemyCurProgress.setPercentage(0);
                this._myCurProgress.tweenTo(0,500,null,null,null,1);
                this._enemyCurProgress.tweenTo(0,500,null,null,null,1);
                break;
        }
        
        let nextRoundData = this._fightarr.info[this._curRound + 1];
        if(nextRoundData){
            //我方数据初始化
            this._myWifeCount.text = LanguageManager.getlocal("wifeBattleBattleWifeCount",[String(nextRoundData[6])]);
            this._myTotalTalent.text = LanguageManager.getlocal("wifeBattleBattleTotalTalent",[String(nextRoundData[8])]);
            this._myTotalTalent.x = GameConfig.stageWidth / 2 - this._myTotalTalent.width/2;
            
            // this._myBProgress.setPercentage(nextRoundData[8]/this._myMaxTalent);
            this._myBProgress.tweenTo(nextRoundData[8]/this._myMaxTalent, 500,null,null,null,1);
            //敌方数据初始化
            this._enemyWifeCount.text = LanguageManager.getlocal("wifeBattleBattleWifeCount",[String(nextRoundData[7])]);
            this._enemyTotalTalent.text = LanguageManager.getlocal("wifeBattleBattleTotalTalent",[String(nextRoundData[9])]);
            this._enemyTotalTalent.x = GameConfig.stageWidth / 2 - this._enemyTotalTalent.width/2;
            
            // this._enemyBProgress.setPercentage(nextRoundData[9]/this._enemyMaxTalent);
            this._enemyBProgress.tweenTo(nextRoundData[9]/this._enemyMaxTalent,500,null,null,null,1);
        } else {

            //1胜利  2平局  0负
            let myWifeCount:number =curRoundData[6];
            let enemyWifeCount:number = curRoundData[7];

            let myTotal:number = 0;
            let enemyTotal:number = 0;
       
            let blood = curRoundData[2] > curRoundData[3] ? curRoundData[3]:curRoundData[2];
            myTotal = curRoundData[8] - blood;
            enemyTotal = curRoundData[9] - blood;

            this._myWifeCount.text = LanguageManager.getlocal("wifeBattleBattleWifeCount",[String(myWifeCount)]);
            this._myTotalTalent.text = LanguageManager.getlocal("wifeBattleBattleTotalTalent",[String(myTotal)]);
            this._myTotalTalent.x = GameConfig.stageWidth / 2 - this._myTotalTalent.width/2;
            // this._myBProgress.setPercentage(myTotal/this._myMaxTalent);
            this._myBProgress.tweenTo(myTotal/this._myMaxTalent, 500,null,null,null,1);
            //敌方数据初始化
            this._enemyWifeCount.text = LanguageManager.getlocal("wifeBattleBattleWifeCount",[String(enemyWifeCount)]);
            this._enemyTotalTalent.text = LanguageManager.getlocal("wifeBattleBattleTotalTalent",[String(enemyTotal)]);
            this._enemyTotalTalent.x = GameConfig.stageWidth / 2 - this._enemyTotalTalent.width/2;
            // this._enemyBProgress.setPercentage(enemyTotal/this._enemyMaxTalent);
            this._enemyBProgress.tweenTo(enemyTotal/this._enemyMaxTalent,500,null,null,null,1);
        }
        egret.Tween.removeTweens(this);
        egret.Tween.get(this)
        .wait(900 + timePlus)
        .call(this.overRoundCardRun,this);
    }

    private showWinBattle(ismy:boolean):void{
        // let group = ismy ? this._myCurWifeContainer : this._enemyCurWifeContainer;
        let skinnamebg = ismy ? this._myNameBg : this._enemyNameBg;
        let descbg = BaseBitmap.create(`specialview_commoni_namebg`);
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip38-1`, [Config.WifebattleCfg.battleTime +'']), 22);
        
        descbg.height = tipTxt.textHeight + 70;
        descbg.width = tipTxt.textWidth + 230;

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, skinnamebg, [skinnamebg.scaleX == 1 ? 0 : -skinnamebg.width,-descbg.height]);
        if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
            descbg.x = GameConfig.stageWidth/2 - descbg.width/2;
		}
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
        this.addChild(descbg);
        this.addChild(tipTxt);
        descbg.alpha = 0;
        tipTxt.alpha = 0;

        egret.Tween.get(descbg).to({alpha : 1}, 200).wait(500).to({alpha : 0}, 200).call(()=>{
            descbg.dispose();
            descbg = null;
        },this);

        egret.Tween.get(tipTxt).to({alpha : 1}, 200).wait(500).to({alpha : 0}, 200).call(()=>{
            tipTxt.dispose();
            tipTxt = null;
        },this);
    }    

    private overRoundCardRun(){
        console.log("overRoundCardRun");
        if(this._isPause){
            return;
        }
        let curRoundData = this._fightarr.info[this._curRound];
        let nextRoundData = this._fightarr.info[this._curRound + 1];


        if(curRoundData && nextRoundData){
            
            if(curRoundData[0] != nextRoundData[0]){
                //自己方移动 visible
                // this._mySelectCard

                let tempCard = this._mySelectCard;
                this._mySelectCard = this._myWifeCardList[tempCard["index"] + 1];
                this._myCardContainer.setChildIndex(this._mySelectCard,this._myMaxNum );

                App.DisplayUtil.changeToGray(tempCard);
                tempCard["select"].visible = false;
                tempCard.setScale(0.85);
                tempCard.x = this._myCardContainer.width / 2 - tempCard.width * tempCard.scaleX/2 + 70 * tempCard["index"];
                tempCard.y = this._myCardContainer.height / 2 - tempCard.height * tempCard.scaleY/2;

                this._mySelectCard["select"].visible = true;
                this._mySelectCard.setScale(1);
                this._mySelectCard.x = this._myCardContainer.width / 2 - this._mySelectCard.width * this._mySelectCard.scaleX/2 + 70 * this._mySelectCard["index"];
                this._mySelectCard.y = this._myCardContainer.height / 2 - this._mySelectCard.height * this._mySelectCard.scaleY/2;  

                this._myCardContainer.setChildIndex(tempCard,this._myCardContainer.getChildIndex(this._mySelectCard)-1);
                // this._myCardContainer.setChildIndex(tempCard,tempCard["index"]);
                egret.Tween.get(this._myCardContainer)
                .to({x:this._myCardContainer.x - 70},400);


            }
            if(curRoundData[1] != nextRoundData[1]){
                let tempCard = this._enemySelectCard;
                this._enemySelectCard = this._enemyWifeCardList[tempCard["index"] + 1];
                this._enemyCardContainer.setChildIndex(this._enemySelectCard,this._enemyMaxNum);


                App.DisplayUtil.changeToGray(tempCard);
                tempCard["select"].visible = false;
                tempCard.setScale(0.85);
                tempCard.x = this._enemyCardContainer.width / 2 - tempCard.width * tempCard.scaleX/2 - 70 * tempCard["index"];
                tempCard.y = this._enemyCardContainer.height / 2 - tempCard.height * tempCard.scaleY/2;

                this._enemySelectCard["select"].visible = true;
                this._enemySelectCard.setScale(1);
                this._enemySelectCard.x = this._enemyCardContainer.width / 2 - this._enemySelectCard.width * this._enemySelectCard.scaleX/2 - 70 * this._enemySelectCard["index"];
                this._enemySelectCard.y = this._enemyCardContainer.height / 2 - this._enemySelectCard.height * this._enemySelectCard.scaleY/2;  

                this._enemyCardContainer.setChildIndex(tempCard,this._enemyCardContainer.getChildIndex(this._enemySelectCard)-1);
                // this._enemyCardContainer.setChildIndex(tempCard,tempCard["index"]);

                egret.Tween.get(this._enemyCardContainer)
                .to({x:this._enemyCardContainer.x + 70},400);
            }
            egret.Tween.removeTweens(this);
            egret.Tween.get(this)
            .wait(600)
            .call(this.playNext,this)

        } else {
            this.playOver();
        }

    }
    private playNext(){
        this._curRound ++;
        this.beginRound();

    }
    private playOver(){
        this.stopBattle();
        this.battleOver();
    }

 
    private initCards(){

    
     


        let myCardDataList = [];
        this._myWifeCardList = [];
        this._enemyWifeCardList = [];
        for(let key in this._fightarr.ainfo){
            let info = this._fightarr.ainfo[key];
            let obj = {wifeId: key,idx:info.idx};
            myCardDataList.push(obj);

        }
        myCardDataList = myCardDataList.sort((w1,w2)=>{
            return w1.idx - w2.idx;
        });

        let enemyCardDataList = [];
        for(let key in this._fightarr.dinfo){
            let info = this._fightarr.dinfo[key];
            let obj = {wifeId: key,idx:info.idx};
            enemyCardDataList.push(obj);

        }
        enemyCardDataList = enemyCardDataList.sort((w1,w2)=>{
            return w1.idx - w2.idx;
        });


        this._myMaxNum = myCardDataList.length;
        this._enemyMaxNum = enemyCardDataList.length;


        let offX = 70;
        let scale = 0.85;


        let curCard = null;
        for(let i = 0;i < enemyCardDataList.length; i++){
            let enemyCardData = enemyCardDataList[i];
            let card = this.createCard(enemyCardData.wifeId,i,false);
            card.setScale(scale);
           
            this._enemyCardContainer.addChild(card);
            if(i == 0){
                this._enemySelectCard = card;
                card.setScale(1);
                card["select"].visible = true;
            }
            card.x = this._enemyCardContainer.width / 2 - card.width * card.scaleX/2 - offX * i;
            card.y = this._enemyCardContainer.height / 2 - card.height * card.scaleY/2;
            if(curCard != null){
                this._enemyCardContainer.setChildIndex(card,this._enemyCardContainer.getChildIndex(curCard));
            }
            // this._enemyCardContainer.addChildAt(card,this._enemyMaxNum - i);

            this._enemyWifeCardList.push(card);
            curCard = card;
            
        }
        
        curCard = null;
        for(let i = 0;i < myCardDataList.length; i++){
            let myCardData = myCardDataList[i];
            let card = this.createCard(myCardData.wifeId,i,true);
            card.setScale(scale);

            this._myCardContainer.addChild(card);
            if(i == 0){
                this._mySelectCard = card;
                card.setScale(1);
                card["select"].visible = true;
            }
            card.x = this._myCardContainer.width / 2 - card.width * card.scaleX/2 + offX * i;
            card.y = this._myCardContainer.height / 2 - card.height * card.scaleY/2;
            if(curCard != null){
                this._myCardContainer.setChildIndex(card,this._myCardContainer.getChildIndex(curCard));
            }
            // this._myCardContainer.addChildAt(card,this._myMaxNum - i);
            this._myWifeCardList.push(card);
            curCard = card;
        }
    }
    
    private createCard(wifeId:number,index:number,isMy:boolean):BaseDisplayObjectContainer{
        let card = new BaseDisplayObjectContainer();
        card.width = 128;
        card.height = 162;

        let bg = BaseBitmap.create("wifebattlebattleview_cardbg");
        bg.x = 0;
        bg.y = 0;
        card.addChild(bg);
        let info = null;
        let isblue = false;
        if(isMy){
            info = this._fightarr.ainfo[wifeId];
            isblue = Api.switchVoApi.checkIsInBlueWife() && info.sexflag && info.sexflag >= 1;
        } else {
            info = this._fightarr.dinfo[wifeId];
            isblue = info.sexflag && info.sexflag >= 1;
        }
        let wifeInfo:Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(wifeId);//Api.wifeVoApi.getWifeInfoVoById(wifeId);

        let wifeSkinInfo:Config.WifeSkinItemCfg = null;
        let iconStr = null;
        if(info.skin || info.maleskin){
            // iconStr = "wife_skinhalf_"+info.skin;
            if(isblue && info.maleskin){
                wifeSkinInfo= Config.WifeskinCfg.getWifeCfgById(info.maleskin);
                iconStr = wifeSkinInfo.getIcon(true);
            } else {
                wifeSkinInfo= Config.WifeskinCfg.getWifeCfgById(info.skin);
                iconStr = wifeSkinInfo.getIcon(false);
            }
        } else {
            // iconStr = "wife_half_"+wifeId;
            //没有皮肤
            if(isblue){
                iconStr = wifeInfo.getIcon(true);
            } else {
                iconStr = wifeInfo.getIcon(false);
            }
        }
        let icon = BaseLoadBitmap.create(iconStr);
        icon.width = 205;
        icon.height = 196;
        icon.setScale(0.7);
        icon.x = card.width/2 - icon.width * icon.scaleX / 2;
        icon.y = 0;
        card.addChild(icon);
        let mask = BaseBitmap.create("wifebattlebattleview_cardmask");
        card.addChild(mask);
        icon.mask = mask;

        let fg = BaseBitmap.create("wifebattlebattleview_cardfg");
        fg.x = 0;
        fg.y = 0;   
        card.addChild(fg);
        let nameSize = 18;
        if(PlatformManager.checkIsViSp()){
            nameSize = 16;
        }
        let name = ComponentManager.getTextField(wifeInfo.getName(isblue),nameSize,TextFieldConst.COLOR_BROWN);
        
       
        if(PlatformManager.checkIsViSp()){
            name.width = 100;
            name.textAlign = egret.HorizontalAlign.CENTER;
            name.y = card.height - 25 - name.height/2;
        } else {
            name.y = card.height - 10 - name.height;
        }
        name.x = card.width/2 - name.width/2;
        
        card.addChild(name);
        
        let select = BaseBitmap.create("wifebattlebattleview_select");
        select.width = card.width + 10;
        select.height = card.height +10;
        select.x = -5;
        select.y = -5;
        card.addChild(select);
        card["select"] = select;
        card["index"] = index;
        select.visible = false;

        return card;
    }

    private stepBtnHandler(){
        this.stopBattle();
        this.battleOver();
    }

    private stopBattle(){
        this._isPause = true;
    }

    private battleOver(){

        this.stopBattle();
        ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLERESULTVIEW,{
            point:this._point,
            rewardnum:this._rewardnum,
            winflag:this._winflag,
            callback:this.hide,
            isReview:this._isReview,
            target:this
        
    
        });
    }


    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "wifebattlebattleview_blackbg",
            "wifebattlebattleview_bprogressbar",
            "wifebattlebattleview_bprogressbg",
            "wifebattlebattleview_cardbg",
            "wifebattlebattleview_cardfg",
            "wifebattlebattleview_flower1",
            "wifebattlebattleview_flower2",
            "wifebattlebattleview_playercardbg",
            "wifebattlebattleview_progresslight",
            "wifebattlebattleview_select",
            "wifebattlebattleview_step",
            "wifebattlebattleview_skinnamebg",
            "wifebattlebattleview_sprogressbar",
            "wifebattlebattleview_sprogressbg",
            "wifebattlebattleview_wifenamebg",
            "wifebattlebattleview_wifenamefg",
            "wifebattlebattleview_cardmask",
            "wifebattleview_talkbg",
            "wifebattlebattleview_bg",
            "specialview_commoni_namebg"
		]);
	}
   
        

    public dispose()
    {
        if(this){
            egret.Tween.removeTweens(this);
        }

        this._fightarr = null;
        this._point = 0;
        this._rewardnum = 0;
        this._winflag = 0;
        this._callback = null;
        this._target = null;
        if(this._stepBtn){
            egret.Tween.removeTweens(this._stepBtn);
        }
        this._stepBtn = null;
        //我方
        this._myWifeCount = null;
        this._myTotalTalent = null;
        this._myCardContainer = null;
        this._myBProgress = null;
        this._myWifeCardList = null;
        this._myCurSkinNameBg = null;
        this._myCurProgress = null;
        this._myCurWifeName = null;
        this._myCurSkinName = null;
        this._myCurTalent = null;
        this._myCurWifeContainer = null;
        //敌人
        this._enemyWifeCount = null;
        this._enemyTotalTalent = null;
        this._enemyCardContainer = null;
        this._enemyBProgress = null;
        this._enemyWifeCardList = null;
        this._enemyCurSkinNameBg = null;
        this._enemyCurProgress = null;
        this._enemyCurWifeName = null;
        this._enemyCurSkinName = null;
        this._enemyCurTalent = null;
        this._enemyCurWifeContainer = null;

        // this._myCardDataList = null;
        // this._enemyCardDataList= null;
        this._myCurIndex = 0;
        this._enemyCurIndex = 0;
        this._curRound = 0;

        this._myNameBg = null;
        this._enemyNameBg = null;

        if(this._myCurWife){
            egret.Tween.removeTweens(this._myCurWife);
        }
        this._myCurWife = null;
        if(this._enemyCurWife){
            egret.Tween.removeTweens(this._enemyCurWife);
        }
        this._enemyCurWife = null;

        this._myMaxTalent = 0;
        this._enemyMaxTalent = 0;

        this._mySelectCard = null;
        this._enemySelectCard = null;
        this._myMaxNum = 0;
        this._enemyMaxNum = 0;

        this._myCurWifeStr = null;
        this._enemyCurWifeStr = null;

        this._enemyNameY = 0;
        this._myNameY = 0;

        this._myAnim = null;
        this._enemyAnim = null;

        this._myTalkBg = null;
        this._myTalkTxt = null;

        this._enemyTalkBg = null;
        this._enemyTalkTxt = null;

        this._isPause = false;
        super.dispose()
    }
}