/*
author : yanyuling
*/

class AcOneYearHeraldView extends BaseView
{

    private aid:string = undefined;
    private _droWifeIcon:BaseLoadDragonBones=undefined;
	private _skinImg:BaseLoadBitmap=undefined;
    private _activityTimerText: BaseTextField = null;
	private _ruleText: BaseTextField = null;

    private _btn1:BaseButton = undefined;
    private _btn2:BaseButton = undefined;
    private _pro1Img:BaseBitmap = undefined;
    private _pro2Img:BaseBitmap = undefined;

    private _redbg:BaseBitmap = undefined;
    
	public constructor() 
	{
		super();
        this.aid=App.StringUtil.firstCharToLower(this.getClassName().replace("Ac","").replace("View",""));
	}
	protected get code():string
	{
		if(this.param && this.param.data){
			return this.param.data;
		} else {
			return "";
		}
	}

	protected get acVo():AcOneYearHeraldVo
	{
        this.aid=App.StringUtil.firstCharToLower(this.getClassName().replace("Ac","").replace("View",""));
		return <AcOneYearHeraldVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
	}


	protected initView():void
	{ 
       if(this.acVo.isFirstOpen()){
			NetManager.request(NetRequestConst.REQUEST_FANLI_GETOPEN_FIRST,{activeId:this.acVo.aidAndCode});
            ViewController.getInstance().openView("AcOneYearHeraIdStoryView",{
                idx : 1,
                buidId : "first",
                aid : this.aid,
                code : this.code
            });
		}
        let bg = BaseBitmap.create("oneYearHerald_bg");
        bg.y = GameConfig.stageHeigth/2 - bg.height/2;
        this.addChild(bg);
        this._redbg = bg;

        let closeBtn =  ComponentManager.getButton("xingcun_closebtn","",this.hide,this);
        closeBtn.x = bg.x + bg.width - closeBtn.width - 20;
        closeBtn.y = bg.y + 20;
        this.addChild(closeBtn);

        let oneYearHerald_txtbg = BaseBitmap.create("oneYearHerald_txtbg");
        oneYearHerald_txtbg.x =  GameConfig.stageWidth/2 - oneYearHerald_txtbg.width/2;
        oneYearHerald_txtbg.y = bg.y + 220;
        this.addChild(oneYearHerald_txtbg);
		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.text  = LanguageManager.getlocal("oneYearHeraldView_activityTime-" + this.code) ;// this.acVo.getAcLocalTime(true);
		this._activityTimerText.x =  GameConfig.stageWidth/2 - this._activityTimerText.width/2;
		this._activityTimerText.y = oneYearHerald_txtbg.y + 5;
		this.addChild(this._activityTimerText);
		let deltaY = 3;
    // "oneYearHeraldView_activityTime-1":"",
		//规则
		this._ruleText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 4;
        // this._ruleText.width =  500;
		this._ruleText.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
		this._ruleText.text = LanguageManager.getlocal("acOneYearHerald_desc-"+this.code);
        this._ruleText.x = GameConfig.stageWidth/2 - this._ruleText.width/2;
		this.addChild(this._ruleText);

        // let protxt1 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        // protxt1.x = 50;
		// protxt1.y = bg.y + bg.height - 210;
        // let starNum = Config.ServantCfg.getServantItemById(this.cfg.servantId).getStarNums();
		// protxt1.text = LanguageManager.getlocal("acRechargeBoxSPRewardTxt1",[": "+starNum]);
		// this.addChild(protxt1);

        // let protxt2 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        // protxt2.x = protxt1.x
		// protxt2.y = protxt1.y + protxt1.height + 10;
        // let wifeCfg = Config.WifeCfg.getWifeCfgById( this.cfg.wifeId);
		// protxt2.text = LanguageManager.getlocal("acRechargeBoxSPRewardTxt2",[": "+wifeCfg.glamour]);
		// this.addChild(protxt2);

        let btmbg = BaseBitmap.create("oneYearHerald_btmbg");
        btmbg.x = GameConfig.stageWidth/2 - btmbg.width/2;
        btmbg.y = bg.y + bg.height - btmbg.height-40;
        this.addChild(btmbg);
        
        let btn1 =  ComponentManager.getButton("oneYearHerald_btn1","",this.switchhandler,this,[1]);
        btn1.x = btmbg.x + btmbg.width/2 - btn1.width /2;
        btn1.y = btmbg.y + btmbg.height - btn1.height - 5;
        this.addChild(btn1);

        let btn2 =  ComponentManager.getButton("oneYearHerald_btn2","",this.switchhandler,this,[2]);
        btn2.x = btn1.x  ;
        btn2.y = btn1.y  ;
        this.addChild(btn2);
        this._btn1 = btn1;
        this._btn2 = btn2;

        this._pro1Img =  BaseBitmap.create("oneYearHerald_pro1");
        this._pro1Img.x = btmbg.x + btmbg.width/2 - this._pro1Img.width /2;
        this._pro1Img.y = btn1.y  - this._pro1Img.height - 10;
        this.addChild(this._pro1Img);

        this._pro2Img =  BaseBitmap.create("oneYearHerald_pro2");
        this._pro2Img.x = btmbg.x + btmbg.width/2 - this._pro2Img.width /2;
        this._pro2Img.y = btn1.y  - this._pro2Img.height - 10;
        this.addChild(this._pro2Img);

        let flower3 = BaseBitmap.create("oneYearHerald_flower1");
        flower3.x = 0;//btmbg.x;
        flower3.y = btmbg.y + btmbg.height - flower3.height+7;
        this.addChild(flower3);

        let oneyearoverview_bg2 = BaseBitmap.create("oneyearoverview_bg2");
        oneyearoverview_bg2.y = 60;
        this.addChild(oneyearoverview_bg2);
        
        this.switchhandler(2);
    }

    private switchhandler(param:any){
        if(param == 2){
            this.showDBDragon(true);
        }else{
            this.showDBDragon(false);
        }
    }

    private showDBDragon(isServant:boolean = true)
	{
        this._pro1Img.visible =  this._btn2.visible = !isServant;
        this._pro2Img.visible = this._btn1.visible = isServant;
        let servantId = this.cfg.servantId;
        let wifeId = this.cfg.wifeId;
        let boneName = "servant_full2_"+ servantId+ "_ske";
        let dagonBonesName = "servant_full2_"+ servantId ;
        if(isServant == false){
            boneName = "wife_full_"+ wifeId+ "_ske";
            dagonBonesName = "wife_full_"+ wifeId ;
        }
        if(this._droWifeIcon){
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        if(this._skinImg){
            this._skinImg.visible = false;
        }
        if( !Api.switchVoApi.checkServantCloseBone() && boneName && servantId && RES.hasRes(boneName)&&App.CommonUtil.check_dragon() ){
            this._droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            this._droWifeIcon.visible = true; 
            this._droWifeIcon.setScale(0.9);
            this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
            this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width/2 *this._droWifeIcon.scaleX;
            this._droWifeIcon.x = GameConfig.stageWidth/2;
            this._droWifeIcon.y =  this._redbg.y + this._redbg.height  - 120;
            this.addChildAt(this._droWifeIcon,3);
            this._droWifeIcon.mask = new egret.Rectangle(-300,-640,620,680);
        }else{
            let skinW =640;
            let skinH = 482;
            let tarScale = 1.15;

            let skinImgPath = undefined;
            let rectM = new egret.Rectangle(0,0,570,0);
            if(isServant ){
                let serCfg = Config.ServantCfg.getServantItemById(servantId);
                skinImgPath = serCfg.fullIcon;
                 rectM.width = 570;
            }else{
                tarScale = 0.68;
                let serCfg = Config.WifeCfg.getWifeCfgById(wifeId);
                skinImgPath = serCfg.body;
                let skinW =640;
                skinH = 840;
                rectM.width = 820;
            }
            if(!this._skinImg){
                this._skinImg = BaseLoadBitmap.create(skinImgPath);
                this.addChildAt(this._skinImg,3);
            }else{
                this._skinImg.setload(skinImgPath);
            }
            this._skinImg.visible = true;
            this._skinImg.width = skinW;
            this._skinImg.height = skinH;
            this._skinImg.setScale(tarScale);
            // this._skinImg.anchorOffsetY = this._skinImg.height;
            this._skinImg.anchorOffsetX = this._skinImg.width/2;
            this._skinImg.x = GameConfig.stageWidth/2;
            this._skinImg.y = this._redbg.y + this._redbg.height - this._skinImg.height*tarScale - 100;
            rectM.height = this._skinImg.height;
			this._skinImg.mask = rectM;
		}
	}

    private get cfg() : Config.AcCfg.OneYearHeraldCfg{
        return this.acVo.config;
    }

    protected getTitleStr(): string {
        return null;
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "oneYearHerald_bg","oneYearHerald_btmbg","xingcun_closebtn",
            "oneYearHerald_btn1","oneYearHerald_btn2","oneYearHerald_flower1","oneyearoverview_flower",
            "oneYearHerald_txtbg","oneYearHerald_pro1", "oneYearHerald_pro2",
         ]);
	} 

    protected getBgName():string
	{
		return null;
	}

	protected getButtomLineBg():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected getTitleBgName():string
	{
		return null;
	}

    public dispose():void
	{	 
        this.aid = null;
        this._droWifeIcon=null;
        this._skinImg=null;
        this._activityTimerText = null;
        this._ruleText = null;
        this._redbg = null;
        this._btn1 = null;
        this._btn2 = null;
        super.dispose();
	}

}

