/**
 * 端午活动 粽夏连连看
 * @author weixiaozhe
 */
class AcFindSameView extends AcCommonView {

    public static AID: string = null;
    public static CODE: string = null;
    private _detailBtn:BaseButton;
    // 进入按钮
    private enterButton: BaseButton;
    private _timeTxt: BaseTextField = null;
   
    protected initBg(): void {
        let bgName: string = this.getBgName();
        if (bgName) {
            this.viewBg = BaseLoadBitmap.create(bgName);
            this.viewBg.width = 640;
            this.viewBg.height = 1136;
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.viewBg.setPosition(0, GameConfig.stageHeigth - this.viewBg.height);
            this.addChild(this.viewBg);
        }
    }
    //规则
    protected getRuleInfo(): string {
        return "findSameRuleInfo-" + this.TypeCode;
    }    
	protected getRuleBtnName():string
	{	
		return ButtonConst.BTN2_RULE;
	}    
    private get TypeCode():string
    {
        if(this.code == "2")
        {
            return "1";
        }
        return this.code;
    }
    protected getTitleStr(): string {
        return null;
    }
    protected getTitleBgName(): string {
        // return this.getDefaultRes('findsame_title');
        return null;
    }  
    public initView() {

        AcFindSameView.AID = this.aid;
        AcFindSameView.CODE = this.code;

        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshVo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FINDSAME_GETRECHARGE, this.refreshVo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FINDSAME_GETACHIEVEMENT, this.refreshVo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FINDSAME_GETTASK, this.refreshVo, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_FINDSAME_ATTACK, this.refreshVo, this); 

        this.showStartDialog();

        this.initMoveBg();

        let bg4 = BaseBitmap.create(this.getDefaultRes("findsame_bg4"));
        this.addChildToContainer(bg4);
        bg4.x = GameConfig.stageWidth - bg4.width;
        bg4.y = 85;

        let titleBg = BaseBitmap.create(this.getDefaultRes("findsame_title"));
        this.addChildToContainer(titleBg);
        titleBg.x = titleBg.y = 0;


        // 底部背景
        let bottomBg = BaseBitmap.create(this.getDefaultRes("findsame_botbg"));
        bottomBg.x = GameConfig.stageWidth / 2 - bottomBg.width / 2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
        this.addChild(bottomBg);        

        //活动时间   
        let dateText = ComponentManager.getTextField(this.vo.acTimeAndHour, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = 15;
        dateText.y = bottomBg.y + bottomBg.height - 170;
        this.addChild(dateText);

        let timebg  = BaseBitmap.create("public_9_bg61");
        timebg.width = 230;
        this.addChild(timebg);
        timebg.x = GameConfig.stageWidth / 2 - timebg.width / 2;
        timebg.y = bottomBg.y + bottomBg.height - timebg.height - 7;

        //剩余时间
        let timeTxt = ComponentManager.getTextField(this.vo.acCountDown, 18,TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTxt.x = timebg.x + timebg.width / 2 - timeTxt.width / 2;
        timeTxt.y = timebg.y + timebg.height/2 - timeTxt.height/2;
        this.addChild(timeTxt);
        this._timeTxt = timeTxt;

        let achieveData = this.cfg.getAchievementList();
        let servantNeedMoney = this.vo.getNeedMoney1();
        let wifeNeedMoney = 0;
        if (achieveData && achieveData.length > 0 )
        {
            for(let j = 0; j < achieveData.length; j++)
            {
                let strArr:string[] = achieveData[j].getReward.split("|");
                for(let k = 0; k < strArr.length; k++)
                {
                    if(strArr[k].split("_")[1] == String(this.cfg.show2))
                    {
                        wifeNeedMoney = achieveData[j].needNum;
                        break;
                    }
                }
                if(wifeNeedMoney > 0)
                {
                    break;
                }
            }
            // wifeNeedMoney = achieveData[achieveData.length - 1].needNum;
        }
        //活动规则文本
        let descTxt  = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("findsame_desc"), [String(servantNeedMoney), String(wifeNeedMoney)]), 18);
        descTxt.width = 610;
        descTxt.lineSpacing = 5;
        descTxt.x = dateText.x;
        descTxt.y = dateText.y + dateText.height + 15;
        this.addChild(descTxt);

        //活动详情
        let detailBtnBg = ResourceManager.hasRes("ac_findsame_detailbtn-"+this.getUiCode()) ? "ac_findsame_detailbtn-"+this.getUiCode() : "ac_findsame_detailbtn-1";
        let detailBtn = ComponentManager.getButton(detailBtnBg, "", ()=>
        {
            ViewController.getInstance().openView(ViewConst.POPUP.ACFINDSAMEREWARDPOPVIEW, {aid:this.aid, code:this.code});
        }, this,null,);
        detailBtn.setPosition(10, 100);
        this.addChild(detailBtn);
        this._detailBtn = detailBtn;
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward() || this.vo.isShowTaskRewardRedDot())
        {
            App.CommonUtil.addIconToBDOC(this._detailBtn);
            let detailRed = <BaseBitmap>this._detailBtn.getChildByName("reddot");
            if (detailRed){
                detailRed.setPosition(70, 0);
            }
        }else
        {
            App.CommonUtil.removeIconFromBDOC(this._detailBtn);
        }

        // 开始按钮
        this.enterButton = ComponentManager.getButton(this.getDefaultRes("findsame_enter_btn"), "", this.enterClick, this);
        this.enterButton.x = GameConfig.stageWidth / 2 - this.enterButton.width / 2 - 15;
        this.enterButton.y = GameConfig.stageHeigth/2 - this.enterButton.height/2 - 130;
        this.addChild(this.enterButton);      

        // if (this.vo.inGaming()) {
        //     this.visible = false;
        //     this.enterClick();
        //     setTimeout(() => {// 避免闪一下主界面
        //         this.visible = true;
        //     }, 500);
        // }

        if (this.vo.firstOpen != 1) {
            // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.acVo.aid + "-" + this.acVo.code, flagkey: "firstOpen", value: 1 });
        }
        if (this.vo.avgShow != 1) {
            // NetManager.request(NetRequestConst.REQUEST_ACTIVITY_FIRSTFLAG, { "activeId": this.acVo.aid + "-" + this.acVo.code, flagkey: "avgShow", value: 1 });
            // ViewController.getInstance().openView(ViewConst.BASE.ACLINKGAMEAVGVIEW,{
            //     f : this.avgendCallback,
            //     o : this,
            //     idx : 1,
            //     aid : this.aid,
            //     code : this.code
            // });
        }
        this.showEffect();
         this.refreshVo();
    }
    private avgendCallback()
    {

    }
    private enterClick() {
        console.log("enter");

        // ViewController.getInstance().openView(ViewConst.POPUP.ACLINKGAMERESULTVIEW, {score:100, rewards:"6_6092_1|6_6092_2|6_6092_3"});

        if (!this.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (this.acVo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this.vo.inGaming()) {
            ViewController.getInstance().openView(ViewConst.COMMON.ACFINDSAMEGAMEVIEW, { "aid": this.aid, "code": this.code });
        }
        // else if (this.vo.getCount() <= 0) { // 次数不足，（已达到3次）
        //     App.CommonUtil.showTip(LanguageManager.getlocal('linkgame_count_not_enough'));
        // } 
        // else if (this.vo.num <= 0) { // 次数不足，（活跃不够）
        //     ViewController.getInstance().openView(ViewConst.COMMON.DAILYTASKVIEW);
        // } 
        else {
            this._isThisGetMap = true;
            this.request(NetRequestConst.REQUEST_FINDSAME_GETMAP, { "activeId": this.aid + "-" + this.code });
        }
    }

    private _isThisGetMap:boolean = false;
    //请求回调
    protected receiveData(data: { ret: boolean, data: any }): void {
        if (!data.ret) 
        {
            App.CommonUtil.showTip(data.data.ret);
        }
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_FINDSAME_GETMAP) {
            if(this._isThisGetMap)
            {
                this._isThisGetMap = false;
                ViewController.getInstance().openView(ViewConst.COMMON.ACFINDSAMEGAMEVIEW, { "aid": this.aid, "code": this.code });
            }
        }
    }
    private getDefaultResList(resArr: string[]): string[] {
        let arr = [];
        for (let i = 0; i < resArr.length; i++) {
            const element = resArr[i];
            let defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    }
    protected getResourceList(): string[] {
        let codeRes = this.getDefaultResList([
            "findsame_title",
            "findsame_botbg",
            "findsame_enter_btn",
            "ac_findsame_detailbtn",
            "acfindsame_poolbg",
            "findsame_bg1",
            "findsame_bg2",
            "findsame_bg3",
            "findsame_bg4",
        ])
        let baseList = [
            "findsame_lg_1",
            "findsame_lg_2",
            "findsame_lg_3",
            "findsame_lg_4",
            "acsearchproofview_common_skintxt",
            "story_bg6",
        ];
        let codeList = null;
        if (this.code == "1") {
            codeList = [
            ]
        }
        return super.getResourceList().concat(baseList).concat(codeList).concat(codeRes);
    }
    private refreshVo() 
    {
        if (this.vo.isCangetAchieveReward() || this.vo.isCangetChargeReward() || this.vo.isShowTaskRewardRedDot())
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

    private _flowerBoneList:BaseLoadDragonBones[] = [];
    private showEffect():void
    {
        let view = this;

        //门客
        let achieveData = this.cfg.getAchievementList();
        let servantNeedMoney = this.vo.getNeedMoney1();
        let wifeNeedMoney = 0;
        if (achieveData && achieveData.length > 0 )
        {
            wifeNeedMoney = achieveData[achieveData.length - 1].needNum;
        }

        let servantSkinId = this.cfg.show1;
        let wifeSkinId = this.cfg.show2;
        let skinCfg = Config.ServantskinCfg.getServantSkinItemById(servantSkinId);
        let boneName = undefined;
        if (skinCfg && skinCfg.bone) 
        {
            boneName = skinCfg.bone + "_ske";
        }
        
        let servantBaseCon = new BaseDisplayObjectContainer();
        view.addChildToContainer(servantBaseCon);

        let fun1 = ()=>
        {
            let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect.setPosition(150-104, GameConfig.stageHeigth-320);
            skinTxtEffect.blendMode = egret.BlendMode.ADD;
            servantBaseCon.addChild(skinTxtEffect);
            skinTxtEffect.playWithTime(-1);
            skinTxtEffect.addTouchTap(() => 
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACFINDSAMESKINPOPUPVIEW, { 
                    wifeId: wifeSkinId, //this.cfg.show2,
                    servantId:servantSkinId,   //this.cfg.show1,
                    wifeNeedText: "findsameShowWifeTopMsg-"+this.code,
                    servantNeedText: "findsameShowServentTopMsg-"+this.code,
                    wifeNeed: "",
                    servantNeed: "",
                    isShowWife:false
                });
            }, this);

            let skinTxt1 = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxt1.setPosition(skinTxtEffect.x+skinTxtEffect.width/2-skinTxt1.width/2+105, skinTxtEffect.y+skinTxtEffect.height/2-skinTxt1.height/2+75);
            servantBaseCon.addChild(skinTxt1);
            egret.Tween.get(skinTxt1, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

            let skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxteffect.setPosition(skinTxt1.x,skinTxt1.y);
            servantBaseCon.addChild(skinTxteffect);
            skinTxteffect.blendMode = egret.BlendMode.ADD;
            skinTxteffect.alpha = 0;
            egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) 
        {
            // let servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone,0,'idle',()=>
            // {
            //     servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            //     servantBaseCon.addChild(servant);
            //     servant.setScale(0.95);
            //     servant.setPosition(150,GameConfig.stageHeigth-220);
            // });
            ResourceManager.loadResources(this.getBonesResArr(skinCfg.bone),null,()=>
            {
                let servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                servantBaseCon.addChild(servant);
                servant.setScale(0.95);
                servant.setPosition(150,GameConfig.stageHeigth-220);
                fun1();
            },null,this);
        }else
        {
            let servant = BaseLoadBitmap.create(skinCfg.body);
            servantBaseCon.addChild(servant);
            servant.setScale(0.95);
            servant.setPosition(-30,GameConfig.stageHeigth-660);
            fun1();
        }

        //佳人
        let wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinId);
        if (wifeSkinCfg && wifeSkinCfg.bone)
        {
            boneName = wifeSkinCfg.bone + "_ske";
        }
        let baseCon = new BaseDisplayObjectContainer();
        view.addChildToContainer(baseCon);
        let fun2 = ()=>
        {
            let skinTxtEffect2 = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
            skinTxtEffect2.setPosition(480-104, GameConfig.stageHeigth-320);
            skinTxtEffect2.blendMode = egret.BlendMode.ADD;
            baseCon.addChild(skinTxtEffect2);
            skinTxtEffect2.playWithTime(-1);
            skinTxtEffect2.addTouchTap(() => 
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACFINDSAMESKINPOPUPVIEW, { 
                    wifeId: wifeSkinId, //this.cfg.show2,
                    servantId:servantSkinId,   //this.cfg.show1,
                    wifeNeedText: "findsameShowWifeTopMsg-"+this.code,
                    servantNeedText: "findsameShowServentTopMsg-"+this.code,
                    wifeNeed: ""+wifeNeedMoney,
                    servantNeed: ""+servantNeedMoney,
                    isShowWife:true
                });
            }, this);            

            let skinTxt3 = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxt3.setPosition(skinTxtEffect2.x+skinTxtEffect2.width/2-skinTxt3.width/2+105, skinTxtEffect2.y+skinTxtEffect2.height/2-skinTxt3.height/2+75);
            baseCon.addChild(skinTxt3);
            egret.Tween.get(skinTxt3, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

            let skinTxt4 = BaseBitmap.create("acsearchproofview_common_skintxt");
            skinTxt4.setPosition(skinTxt3.x,skinTxt3.y);
            baseCon.addChild(skinTxt4);
            skinTxt4.blendMode = egret.BlendMode.ADD;
            skinTxt4.alpha = 0;
            egret.Tween.get(skinTxt4, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);

        }
        if (wifeSkinCfg && (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) 
        {
            // let wife = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone,0,'idle',()=>
            // {
            //     wife = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
            //     wife.anchorOffsetX = wife.width / 2;
            //     wife.anchorOffsetY = wife.height;
            //     baseCon.addChild(wife);
            //     wife.setPosition(0,0);
            //     wife.setScale(0.65);
            //     wife.setPosition(480,GameConfig.stageHeigth-190);
            // });
            ResourceManager.loadResources(this.getBonesResArr(skinCfg.bone),null,()=>
            {
                let wife = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
                wife.anchorOffsetX = wife.width / 2;
                wife.anchorOffsetY = wife.height;
                baseCon.addChild(wife);
                wife.setPosition(0,0);
                wife.setScale(0.65);
                wife.setPosition(480,GameConfig.stageHeigth-190);
                fun2(); 
            },null,this);            
        }else
        {
            let wife = BaseLoadBitmap.create(wifeSkinCfg.body);
            baseCon.addChild(wife);
            wife.anchorOffsetX = wife.width / 2;
            wife.anchorOffsetY = wife.height;
            wife.setPosition(0,0);
            wife.setScale(0.65);
            wife.setPosition(300,GameConfig.stageHeigth-650); 
            fun2(); 
        }
   }

   	private getBonesResArr(name:string):string[]
	{
		return [name+"_ske",name+"_tex_json",name+"_tex_png"];
	}

    private _movebg1_1:BaseBitmap;
    private _movebg1_2:BaseBitmap;
    private _movebg2_1:BaseBitmap;
    private _movebg2_2:BaseBitmap;
    private _lgEffect1:CustomMovieClip;
    private _lgEffect2:CustomMovieClip;
    private initMoveBg():void
    {
        let bg2_1 = BaseBitmap.create(this.getDefaultRes("findsame_bg2"));
        this.addChildToContainer(bg2_1);
        this._movebg2_1 = bg2_1;
        this._movebg2_1.x = this._movebg2_1.y = 0;

        let bg2_2 = BaseBitmap.create(this.getDefaultRes("findsame_bg2"));
        this.addChildToContainer(bg2_2);
        this._movebg2_2 = bg2_2;
        this._movebg2_2.x = this._movebg2_1.width;
        this._movebg2_2.y = 0;

        let bg1_1 = BaseBitmap.create(this.getDefaultRes("findsame_bg1"));
        this.addChildToContainer(bg1_1);
        this._movebg1_1 = bg1_1;
        this._movebg1_1.x = this._movebg1_1.y = 0;

        let bg1_2 = BaseBitmap.create(this.getDefaultRes("findsame_bg1"));
        this.addChildToContainer(bg1_2);
        this._movebg1_2 = bg1_2;
        this._movebg1_2.x = this._movebg1_1.width;
        this._movebg1_2.y = 0;

        let bg3 = BaseBitmap.create(this.getDefaultRes("findsame_bg3"));
        this.addChildToContainer(bg3);
        bg3.x = 0;
        bg3.y = bg1_1.height - bg3.height; 

        this._lgEffect1 = ComponentManager.getCustomMovieClip("findsame_lg_", 4, 100);
        // this._lgEffect1.blendMode = egret.BlendMode.ADD;
        this._lgEffect1.x = 123;
        this._lgEffect1.y = 486;
        this._lgEffect1.scaleX = -1;
        this._lgEffect1.x = this._lgEffect1.x + 188;
        this._lgEffect1.playWithTime(0);
        this.addChildToContainer(this._lgEffect1);
        this._lgEffect2 = ComponentManager.getCustomMovieClip("findsame_lg_", 4, 100);
        // this._lgEffect2.blendMode = egret.BlendMode.ADD;
        this._lgEffect2.x = 225;
        this._lgEffect2.y = 565;
        this._lgEffect2.scaleX = -1;
        this._lgEffect2.x = this._lgEffect2.x + 188;
        this._lgEffect2.playWithTime(0);
        this.addChildToContainer(this._lgEffect2);
        this.addEventListener(egret.Event.ENTER_FRAME,this.enterHandel,this);
    }

    private _speed1:number = 1;
    private _speed2:number = 0.5;
    private enterHandel():void
    {
        this._movebg1_1.x -= this._speed1;
        this._movebg1_2.x -= this._speed1;
        if(this._movebg1_1.x <= -640)
        {
            this._movebg1_1.x = this._movebg1_2.x + this._movebg1_2.width;
        }
        if(this._movebg1_2.x <= -640)
        {
            this._movebg1_2.x = this._movebg1_1.x + this._movebg1_1.width;
        }  

        this._movebg2_1.x -= this._speed2;
        this._movebg2_2.x -= this._speed2;
        if(this._movebg2_1.x <= -640)
        {
            this._movebg2_1.x = this._movebg2_2.x + this._movebg2_2.width;
        }
        if(this._movebg2_2.x <= -640)
        {
            this._movebg2_2.x = this._movebg2_1.x + this._movebg2_1.width;
        }            
    }

    private tick() 
    {
        this._timeTxt.setString(this.vo.acCountDown);
        this._timeTxt.x = GameConfig.stageWidth / 2 - this._timeTxt.width / 2;
    }
    private get cfg(): Config.AcCfg.FindSameCfg 
    {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcFindSameVo {
        return <AcFindSameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId(): string {
        return `${AcFindSameView.AID}-${AcFindSameView.CODE}`;
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
    private showStartDialog():void
    {
        let localkey:string = this.vo.aidAndCode + Api.playerVoApi.getPlayerID()+"dialog";
        let lastTime:number = 0;
        let timeStr:string = LocalStorageManager.get(localkey);
        if (timeStr && timeStr!="")
        {
            lastTime = Number(timeStr);
        }
        if (lastTime == this.vo.et)
        {	
            return;
        }
        LocalStorageManager.set(localkey, String(this.vo.et));
        let view = this;
        let keyStr = "startDialog_"+this.TypeCode;
        let startCfg = view.cfg[keyStr];
        let bgName = "story_bg6";
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,
        {
            aid : view.aid,
            code : ""+view.TypeCode,
            AVGDialog : startCfg,
            visitId : "1",
            talkKey: "acFindSameStartTalk_",
            bgName: bgName,
        });
    }      
    public dispose(): void {
        super.dispose();
        for (let i=0; i < this._flowerBoneList.length; i++)
        {
            this._flowerBoneList[i].dispose();
        }
        this._flowerBoneList = [];        
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshVo, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_FINDSAME_GETRECHARGE, this.refreshVo, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_FINDSAME_GETACHIEVEMENT, this.refreshVo, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_FINDSAME_GETTASK, this.refreshVo, this); 
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_FINDSAME_ATTACK, this.refreshVo, this);       
        this.removeEventListener(egret.Event.ENTER_FRAME,this.enterHandel,this);
        this._lgEffect1.dispose();
        this._lgEffect2.dispose();
        this._movebg1_1 = null;
        this._movebg1_2 = null;
        this._movebg2_1 = null;
        this._movebg2_2 = null;
    }
}