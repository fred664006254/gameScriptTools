/**
 * 鼠来进宝
 * @author shaoliang
 * @date 2020.7.29
 */
class AcMouseTreasureView extends AcCommonView 
{   

    private _detailBtn:BaseButton;
    // 进入按钮
    private _enterButton: BaseButton;
    private _countDownTime: BaseTextField = null;
    private _isThisGetMap:boolean = false;

     public constructor() 
	{
		super();
	}

     // 标题背景名称
	protected getTitleBgName():string
	{
		return App.CommonUtil.getResByCode(`mousetreasure_titlebg`,this.getUiCode());
	}

    protected getTitleStr():string
	{
		return null;
	}

    protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
    }

    protected getBgName():string
	{	
        return  App.CommonUtil.getResByCode("mousetreasure_bg",this.getUiCode());
	}

     private get cfg() : Config.AcCfg.MouseTreasureCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcMouseTreasureVo{
        return <AcMouseTreasureVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}

    protected getProbablyInfo(): string {
		return App.CommonUtil.getCnByCode(`acMouseTreasureProbablyInfo`, this.code);
    }

    protected  getUiCode():string
	{   
        if (this.code == "2" || this.code == "3")
        {
            return "1";
        }
		return this.code;
	}

     protected getRuleInfo(): string {

        return App.CommonUtil.getCnByCode(`mouseTreasureRuleInfo`,this.getUiCode());
    }    

    protected initBg():void
    {
        this.viewBg = BaseBitmap.create(this.getBgName());
        this.viewBg.y = GameConfig.stageHeigth - this.viewBg.height;
		this.addChild(this.viewBg);
    }

     protected getResourceList():string[]{
        let view = this;
        let code = view.getUiCode();
        return super.getResourceList().concat([
            this.getResByCode("mousetreasure_bottombg1"),
            this.getResByCode("mousetreasure_descbg"),
            this.getResByCode("mousetreasure_detailbtn"),
            this.getResByCode("mousetreasure_rewardbtn"),
            "acwealthcarpview_skineffect","acgiftreturnview_common_skintxt","acsearchproofview_common_skintxt",
        ]);
    }


    public initView() 
    {

        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshVo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_GETMAP, this.refreshVo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_GETACHIEVEMENT, this.refreshVo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_ATTACK, this.refreshVo, this); 


        let code = this.getUiCode();
        let vo = this.vo;

        let key: string = this.acTivityId+ Api.playerVoApi.getPlayerID() + String(vo.st);
		let storage = LocalStorageManager.get(key);
		if (!storage) {

            ViewController.getInstance().openView(ViewConst.BASE.ROOKIEVIEW, {
				idx: "acMouseTreasure_1-" + this.getUiCode(), f: () => {
				}, o: this
			});

			LocalStorageManager.set(key, vo.aidAndCode);
		}

        let acDescBg = BaseBitmap.create(App.CommonUtil.getResByCode(`mousetreasure_descbg`,code));
		acDescBg.y = 90;
		this.addChildToContainer(acDescBg);

        //活动时间
		let timeTF = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipViewAcTime-1", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		timeTF.width = 540;
		timeTF.setPosition(20,acDescBg.y+32);
		this.addChildToContainer(timeTF);

        let desckey = App.CommonUtil.getCnByCode(`mouseTreasureDesc`,code);
		let descTF = ComponentManager.getTextField(LanguageManager.getlocal(desckey), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		descTF.width = 600;
		descTF.lineSpacing = 5;
		descTF.setPosition(timeTF.x, timeTF.y + timeTF.height + 8);
		this.addChildToContainer(descTF);

        let detailBtn =  ComponentManager.getButton(App.CommonUtil.getResByCode(`mousetreasure_rewardbtn`,code), null,this.detailBtnHandler,this);
        detailBtn.setPosition(20,310);
        this.addChildToContainer(detailBtn);
        this._detailBtn = detailBtn;
        
        let rewardstr = this.cfg.change.changeReward;
        let rewardvo = GameData.formatRewardItem(rewardstr)[0];
        let skinid = rewardvo.id;
        // skinid = 3104;
        let skincfg = Config.WifeskinCfg.getWifeCfgById(skinid);
        let skinBone = skincfg.bone;
        if(!Api.switchVoApi.checkCloseBone() && App.CommonUtil.check_dragon() && RES.hasRes(skinBone+"_ske"))
        {
            let wifeskinDB = App.DragonBonesUtil.getLoadDragonBones(skinBone);
            wifeskinDB.setScale(0.85);
			wifeskinDB.setPosition(320,GameConfig.stageHeigth-130);
			this.addChildToContainer(wifeskinDB);
        }
        else
        {   
            let wifeskinPic = BaseLoadBitmap.create("wifeskin_fullscreen_3105");
            wifeskinPic.setPosition(0,260+(GameConfig.stageHeigth-960)*0.5); 
			this.addChildToContainer(wifeskinPic);
        }
        //预览
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
        skinTxtEffect.width = 208;
        skinTxtEffect.height = 154;

		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffect.setPosition(GameConfig.stageWidth / 2 -skinTxtEffectBM.width/2 ,GameConfig.stageHeigth-320);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
        skinTxtEffect.playWithTime(-1);

		let skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinTxteffect, skinTxt);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

        //透明点击区域
		let touchPos = BaseBitmap.create("public_alphabg");
		touchPos.width = 160;
		touchPos.height = 80;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, touchPos, skinTxtEffect);
		this.addChildToContainer(touchPos);
		touchPos.addTouchTap(() => {

            if (!this.vo.isStart) {
                App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
                return;
            }

            ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASUREREREWARDPOPVIEWTAB4,{
                aid:this.aid, 
                code:this.code,
                uicode:this.getUiCode(),
            });

        }, ViewController);




        //bottom
        let bottombg = BaseBitmap.create(App.CommonUtil.getResByCode(`mousetreasure_bottombg1`,code));
        bottombg.y = GameConfig.stageHeigth - bottombg.height;
        this.addChild(bottombg);

        this._countDownTime = ComponentManager.getTextField(LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._countDownTime.width = GameConfig.stageWidth;
        this._countDownTime.textAlign = egret.HorizontalAlign.CENTER;
		this._countDownTime.y = GameConfig.stageHeigth - 45;
		this.addChild(this._countDownTime);


          // 开始按钮
        this._enterButton = ComponentManager.getButton(this.getDefaultRes("mousetreasure_detailbtn"), "", this.enterClick, this);
        this._enterButton.x = GameConfig.stageWidth / 2 - this._enterButton.width / 2 ;
        this._enterButton.y = bottombg.y - 45;
        this.addChild(this._enterButton);      


        this.refreshVo();
    }

    private enterClick() {


        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.vo.inGaming()) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACMOUSETREASUREGAMEVIEW, { "aid": this.aid, "code": this.code , uicode:this.getUiCode()});
        }
        else {
            this._isThisGetMap = true;
            this.request(NetRequestConst.REQUEST_MOUSETREASURE_GETMAP, { "activeId": this.aid + "-" + this.code });
        }
    }

    protected receiveData(data: { ret: boolean, data: any }): void {
        if (!data.ret) 
        {
            App.CommonUtil.showTip(data.data.ret);
        }
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_MOUSETREASURE_GETMAP) {
            if(this._isThisGetMap)
            {
                this._isThisGetMap = false;
                ViewController.getInstance().openView(ViewConst.COMMON.ACMOUSETREASUREGAMEVIEW, { "aid": this.aid, "code": this.code , uicode:this.getUiCode()});
            }
        }
    }

    private tick() {
        
		this._countDownTime.text = LanguageManager.getlocal("acComm_timeCount", [this.vo.getCountDown()]);
	}

    private detailBtnHandler():void{

        if (!this.vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
		 ViewController.getInstance().openView(ViewConst.POPUP.ACMOUSETREASUREREWARDPOPVIEW,{
                aid:this.aid, 
                code:this.code,
                uicode:this.getUiCode(),
            });
	}

    private refreshVo() 
    {
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetRechargeReward() )
        {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let detailRed = <BaseBitmap>this._detailBtn.getChildByName("reddot");
            if (detailRed){
                detailRed.setPosition(70, 0);
            }
        }
        else{
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }        


    }

    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {   
        let code = this.getUiCode();
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+"-"+code)){
            return resName+"-"+code;
        } else {
            return resName+"-"+defaultCode;
        }
    }
    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {   
        let code = this.getUiCode();
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+code)){
            return cnName + "-" + code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }     

    public dispose(): void {

        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshVo, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_GETMAP, this.refreshVo, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_GETACHIEVEMENT, this.refreshVo, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MOUSETREASURE_ATTACK, this.refreshVo, this); 

        this._detailBtn= null
        this._enterButton = null;
        this._countDownTime = null;
        this._isThisGetMap = false;

        super.dispose();
     }
}