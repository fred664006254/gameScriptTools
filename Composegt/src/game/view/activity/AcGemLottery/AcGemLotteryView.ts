/*
* 双十一转盘活动
*/

class AcGemLotteryView extends AcCommonView
{
    public _isCircleRun: boolean = false;

    private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;
    private _circleGroup : BaseDisplayObjectContainer = null;
    //转盘
    private _turnTable : BaseBitmap = null;
    //向上的指针
    private _upArrow : BaseBitmap = null;
    //转到奖励的光
    // private _selectLight: BaseBitmap = null;

    private _turnGroup: BaseDisplayObjectContainer = null;
    private _turnGroup2: BaseDisplayObjectContainer = null;
    private _selMask:BaseBitmap = undefined;
    private _rewardItem : number = 0;
    private _havenumTxt: BaseTextField = null;

    private _lotteryDro:BaseLoadDragonBones = null;

	public constructor() 
	{
		super();
    }
    
	protected initView():void
	{ 
        const code = this.code;
        const aid = this.aid;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GEMLOTTERYDRAW,this.buyBtnHandlerCaller,this);
        App.MessageHelper.addEventListener(MessageConst.MESAAGE_GEMLOTTERY_FRESH_ITEM,this.refreshUIInfo,this);

        let titletxt = BaseBitmap.create("gemlottery_title-"+code);
        titletxt.x = GameConfig.stageWidth/2 - titletxt.width/2;
        // titletxt.y = 5;
        this.addChild(titletxt);

		//顶部背景图片
		let forpeople_top: BaseBitmap = BaseLoadBitmap.create('gemlottery_descbg');
        this.addChildToContainer(forpeople_top);
        forpeople_top.y = 70;

        
		//活动时间   
		this._activityTimerText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._activityTimerText.x = 15
		this._activityTimerText.y = forpeople_top.y + 15;
		this._activityTimerText.text  = this.acVo.getAcLocalTime(true);
		this.addChildToContainer(this._activityTimerText);

		//倒计时文本 
		let acCDTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		acCDTxt.text = LanguageManager.getlocal("acFanliReviewReward_acCD", [""]);
        acCDTxt.x = GameConfig.stageWidth - acCDTxt.width - 15;
		acCDTxt.y = this._activityTimerText.y
		this.addChildToContainer(acCDTxt);
		this._acCDTxt = acCDTxt;

		//规则
		this._ruleText = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.x = this._activityTimerText.x
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 4;
        this._ruleText.width = GameConfig.stageWidth - this._ruleText.x*2;
		this._ruleText.y = this._acCDTxt.y + this._acCDTxt.height + 10;
		this._ruleText.text = LanguageManager.getlocal("acGemLotteryDesc-"+this.code,[""+this.cfg.cost]);
		this.addChildToContainer(this._ruleText);



        //bottomBg
        let bottomBg = BaseBitmap.create("gemlottery_bottombg");
        bottomBg.y = GameConfig.stageHeigth - this.container.y - bottomBg.height;
        this.addChildToContainer(bottomBg);

        //转盘父节点
        this._circleGroup = new BaseDisplayObjectContainer();
        this._circleGroup.width = GameConfig.stageWidth;
        this._circleGroup.height = 550;
        this._circleGroup.x = 0;
        this._circleGroup.y = 250;
        // this._progress.y + 15 + (numBg.y - this._progress.y + 15)/2 - this._circleGroup.height/2;
        this.addChildToContainer(this._circleGroup);


        //bottom里面的组件

        //抽奖次数
        this._havenumTxt = ComponentManager.getTextField(LanguageManager.getlocal('acMayDayRechargeCurnNum',[this.vo.havenum+'']),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._havenumTxt.setPosition(bottomBg.x + bottomBg.width/2 - this._havenumTxt.width/2,bottomBg.y + 35);
        this.addChildToContainer(this._havenumTxt);

        //转动一次按钮
        let onceBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE,"acMayDayRecharge_lottery1",this.buyBtnHandler,this,[1]);
        onceBtn.x = bottomBg.x + 60;
        onceBtn.y = bottomBg.y + bottomBg.height/2 - 10 ;
        this.addChildToContainer(onceBtn);

        //转动十次按钮
        let tenBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acMayDayRecharge_lottery10",this.buyBtnHandler,this,[10]);
        tenBtn.x = bottomBg.x + bottomBg.width - tenBtn.width - 60;
        tenBtn.y = onceBtn.y;
        this.addChildToContainer(tenBtn);

        //转盘
        let circleBg = BaseBitmap.create("gemlottery_circle2");
        circleBg.x = this._circleGroup.width/2 - circleBg.width/2;
        circleBg.y = this._circleGroup.height/2 - circleBg.height/2;
        this._circleGroup.addChild(circleBg);

        //转盘
        this._turnTable = BaseBitmap.create("gemlottery_circle1");
        this._turnTable.anchorOffsetX = this._turnTable.width/2;
        this._turnTable.anchorOffsetY = this._turnTable.height/2;

        this._turnGroup = new BaseDisplayObjectContainer();
        this._turnGroup.width = this._turnTable.width;
        this._turnGroup.height = this._turnTable.height;
        this._turnGroup.anchorOffsetX = this._turnGroup.width/2;
        this._turnGroup.anchorOffsetY = this._turnGroup.height/2;

        this._turnTable.x = this._turnGroup.width/2;
        this._turnTable.y = this._turnGroup.height/2;
        this._turnGroup.x = this._circleGroup.width/2;
        this._turnGroup.y = this._circleGroup.height/2;
        this._turnGroup.addChild(this._turnTable);
        this._circleGroup.addChild(this._turnGroup);

        let sel_mask = BaseBitmap.create("gemlottery_selectmask");
        sel_mask.anchorOffsetX = sel_mask.width/2;
        sel_mask.x = this._circleGroup.width/2;
        sel_mask.y = circleBg.y +30 ;
        sel_mask.visible = false;
        this._circleGroup.addChild(sel_mask);
        this._selMask = sel_mask;
        
        this._turnGroup2 = new BaseDisplayObjectContainer();
        this._turnGroup2.width = this._turnGroup.width;
        this._turnGroup2.height = this._turnGroup.height;
        this._turnGroup2.anchorOffsetX = this._turnGroup.anchorOffsetX;
        this._turnGroup2.anchorOffsetY = this._turnGroup.anchorOffsetY;

        this._turnGroup2.x = this._turnGroup.x;
        this._turnGroup2.y = this._turnGroup.y;
        this._circleGroup.addChild(this._turnGroup2);

        let arrowHead = BaseBitmap.create("gemlottery_arrowhead");
        arrowHead.anchorOffsetX = arrowHead.width/2;
        arrowHead.x = this._circleGroup.width/2;
        arrowHead.y = circleBg.y - 30;
        this._circleGroup.addChild(arrowHead);

        this._upArrow = BaseBitmap.create("gemlottery_arrow");
        this._upArrow.anchorOffsetX = this._upArrow.width/2;
        this._upArrow.anchorOffsetY = 20;
        this._upArrow.x = this._circleGroup.width/2;
        this._upArrow.y = arrowHead.y + arrowHead.height + 12;
        this._circleGroup.addChild(this._upArrow);
        this._upArrow.visible = false;

        let midCircle = BaseBitmap.create("gemlottery_circlecenter");
        midCircle.x = this._circleGroup.width/2 - midCircle.width/2;
        midCircle.y = this._circleGroup.height/2 - midCircle.height/2;
        this._circleGroup.addChild(midCircle);

        let flower1 = BaseBitmap.create("gemlottery_flower1");
        flower1.x = circleBg.x+15;
        flower1.y = circleBg.y + circleBg.height - flower1.height-10;
        this._circleGroup.addChild(flower1);

        let flower2 = BaseBitmap.create("gemlottery_flower2");
        flower2.x = circleBg.x + circleBg.width - flower2.width+15;
        flower2.y = flower1.y - flower2.height;
        this._circleGroup.addChild(flower2);

        

        let cfg = this.cfg;
        let total = this.cfg.lotteryPoolLength;
        let rad = Math.PI / 180;
        let radius = this._turnGroup.height / 2;
        let rewardTab = [];

        for (let index = 1; index <= total; index++) {
            let key = ""+index;
            rewardTab.push(cfg.lotteryBasePool[key].reward);
        }
        let centerX = this._turnGroup.width / 2;
        let centerY = this._turnGroup.height/2;
        let rIcons = GameData.formatRewardItem(rewardTab.join("|"));
        for(let i = 0; i < total; ++ i){
            //计算角度
            let angle = 360 / total * rad * i;

            //加物品icon
            let tmpItemvo = rIcons[i];
            let itemicon = BaseBitmap.create("gemlottery_gem" +cfg.lotteryBasePool[String(i+1)].icon);
            itemicon.anchorOffsetX = itemicon.width / 2;
            itemicon.anchorOffsetY = itemicon.height / 2;
            let itemX = (radius ) * Math.sin(angle ) / 2;
            let itemY = (radius ) * Math.cos(angle ) / 2;
            itemicon.x = centerX + itemX;
            itemicon.y = centerY - itemY;
            itemicon.name = `item${i}`;
            if(i == 0){
                itemicon.setScale(0.9);
            }
            this._turnGroup2.addChild(itemicon);

            // itemicon.addTouchTap((event:egret.TouchEvent,item:string|number|RewardItemVo)=>{
			// 	ViewController.getInstance().openView(ViewConst.POPUP.ITEMINFOPOPUPVIEW,item);
			// },this,[ tmpItemvo ]);

            let tmpcon = new BaseDisplayObjectContainer();
            let luckicon = BaseBitmap.create("gemlottery_gemsmall");
            tmpcon.addChild(luckicon);

            let lucktxt2 =  ComponentManager.getBitmapText("+"+tmpItemvo.num,"oneyearpack_fnt"); //ComponentManager.getTextField("+100", 16, TextFieldConst.COLOR_WHITE);
            lucktxt2.x = luckicon.x + luckicon.width +2; 
            lucktxt2.y = luckicon.y + 3 ; 
            tmpcon.addChild(lucktxt2);
            tmpcon.anchorOffsetX = tmpcon.width / 2;
            tmpcon.anchorOffsetY = tmpcon.height / 2;
            tmpcon.rotation =  360 / total *i;
            tmpcon.x = centerX + itemX*1.44;
            tmpcon.y = centerY - itemY*1.44;
            this._turnGroup2.addChild(tmpcon);
        }

        if(App.CommonUtil.check_dragon()){
            this._lotteryDro = App.DragonBonesUtil.getLoadDragonBones('luckywheel',1,'',()=>{
                this._lotteryDro.stop();
                this._lotteryDro.visible = false;
            });
            this._lotteryDro.setDragonBoneEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.hideAni, this);
            this.addChild(this._lotteryDro);
            this._lotteryDro.setPosition(GameConfig.stageWidth/2,550);
        }


        this.refreshUIInfo();
        this.tick();
    }

    protected getRuleParam():string[]{
        return [this.cfg.backPayNum+''];
    }

    private refreshUIInfo()
    {
        this._havenumTxt.text = LanguageManager.getlocal('acMayDayRechargeCurnNum',[this.vo.havenum+'']);
    }
    

    //购买按钮点击
    private buyBtnHandler(num : number):void
    {
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if(this._isCircleRun){
            return;
        }
        let havenum = this.vo.havenum;
        if(havenum < num){
            let msg = LanguageManager.getlocal("acGemLottery_item_notenough-" + this.code);
            let title = "itemUseConstPopupViewTitle";
            if( PlatformManager.checkHideIconByIP()){
                msg = LanguageManager.getlocal("acGemLottery_TipMsg_hideByIp-" + this.code);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "sysConfirm", handler: this, callback:null,
                });
            }else{
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                    msg: msg, title: title, needCancel: true, confirmTxt: "acArcadeGameViewGoCharge-" + this.code, handler: this, callback: () => {
                        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW, { code: this.code, aid: this.aid });
                    }
                });
            }
            return;
        }
        this._upArrow.visible = true;
        this._selMask.visible = false;
        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GEMLOTTERYDRAW,{activeId : this.acVo.aidAndCode, stype : num });
    }



    //转盘动画
    private buyBtnHandlerCaller(event):void{
        let data = event.data.data.data;
       
        if(!data){
            App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
            return;
        }
        if(event.data.data.ret == -3){
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
            return;
        }
        
        // this.refreshUIInfo();
        let rewards : string = data.rewards || '';
        if(data.poolk){

            this._isCircleRun = true;
            this._rewardItem = (Number(data.poolk)||1) -1;
            let total = this.cfg.lotteryPoolLength;
            let turnRotation =  360*8 - 360 / total  * this._rewardItem ;
            let turnTime = 5000 + Math.floor(Math.random() * 2000);
            let view = this;

            let type = this.cfg.lotteryBasePool[String(data.poolk)].icon;

            egret.Tween.get(this._turnGroup,{onChange:()=>{
                view._upArrow.rotation = Math.sin(view._turnGroup.rotation);
                for(let i = 0; i < total; ++ i){
                    let item = view._turnGroup2.getChildByName(`item${i}`);
                    if(item){
                        item.rotation = 0 - view._turnGroup.rotation;
                    }
                }
                view._turnGroup2.rotation =  view._turnGroup.rotation;
            }})
            .to({rotation: turnRotation},turnTime,egret.Ease.quartInOut)
            .call(this.showEffect,this)
            .call(this.refreshUIInfo,this)
            //.wait(1800)
            .call(this.playAni,this,[type])
            .wait(1800)
            .call(()=>{
                view._upArrow.rotation = 0 ;
                this._isCircleRun = false;
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{rewards:rewards,isPlayAni:true,callback:this.hideAni,target:this});
            })
            // .wait(3000)
            
            ;
        }
        else{
            this.refreshUIInfo();
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{rewards:rewards,isPlayAni:true});
        }
    }
    private hideAni(){
        if(this._lotteryDro){
            this._lotteryDro.stop();
            this._lotteryDro.visible = false;
        }
    }

    private playAni(type:number){
        if(this._lotteryDro){
            type = Number(type);
            this._lotteryDro.visible = true;
            this._lotteryDro.stop();
            if(type < 3){
                this._lotteryDro.playDragonMovie('idle_shao',1);
            }else{
                this._lotteryDro.playDragonMovie('idle_duo',1);
            }
        }
    }

    private showEffect()
    {
        let skinClip = ComponentManager.getCustomMovieClip("zpzj_",17,100);
		let deltaS2 = 1;
		skinClip.width = 277*deltaS2;
		skinClip.height = 289*deltaS2;
		skinClip.anchorOffsetY = skinClip.height/2 ;
		skinClip.anchorOffsetX = skinClip.width/2 ;
		skinClip.blendMode = egret.BlendMode.ADD;
		skinClip.x = this._circleGroup.width/2 +3;// this._selMask.x ;//+ this._selMask.width/2;
		skinClip.y = this._selMask.y + this._selMask.height/2+13;
        let _circleGroup= this._circleGroup;
        skinClip.playWithTime(1);
        egret.Tween.get(skinClip,{loop:false}).wait(1700).call(()=>{
			_circleGroup.removeChild(skinClip);
			skinClip = null;
		},this);
        let idx = this._circleGroup.getChildIndex(this._upArrow);
		this._circleGroup.addChildAt(skinClip,idx);
    }

    public tick() {
        if (this.vo.isInActivity()) {
            let deltaT = this.acVo.et - GameData.serverTime;
            this._acCDTxt.text = LanguageManager.getlocal("acFanliReviewReward_acCD", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
            this._acCDTxt.x = GameConfig.stageWidth - this._acCDTxt.width - 15;
        } else {
            this._acCDTxt.text = LanguageManager.getlocal("acFanliReviewReward_acCD", [LanguageManager.getlocal('acPunishEnd')]);
            this._acCDTxt.x = GameConfig.stageWidth - this._acCDTxt.width - 15;

        }
	}



    private get cfg() : Config.AcCfg.GemLotteryCfg{
        return this.acVo.config;
    }

    private get vo() : AcGemLotteryVo{
        return <AcGemLotteryVo>this.acVo;
    }

    private get acTivityId() : string{
        return this.acVo.aidAndCode;
    }

    // protected getRuleInfo(): string {
    //     return "acArcadeRuleInfo-" + this.code;
    // }
    // protected getRuleParam():string[]
	// {
    //     let cfg = this.acVo.config;
	// 	return [""+cfg.cost,""+cfg.addPrize,""+cfg.totalNum];
	// }
    protected getBgName(): string {
        return "gemlottery_bg";
    }

    protected getTitleBgName(): string {
        return "gemlottery_titlebg";
    }
    protected getTitleStr(): string {
        return null;
    }

    // protected  getUiCode():string
	// {
    //     return Number(this.code ) > 1 ? this.code : "";
	// }
    protected getResourceList():string[]
	{
        const code = this.code;
		return super.getResourceList().concat([
            `gemlottery_title-${code}`,

            "gemlottery_arrow","gemlottery_arrowhead","gemlottery_bg", "gemlottery_bottombg",
            "gemlottery_circlecenter","gemlottery_circle1","gemlottery_circle2","gemlottery_flower1",
            "gemlottery_flower2","gemlottery_gemsmall","gemlottery_selectmask",
            "gemlottery_titlebg","gemlottery_descbg","oneyearpack_fnt","punish_reward_icon",
            "gemlottery_gem1","gemlottery_gem2","gemlottery_gem3","gemlottery_gem4"
         ]);
	} 

	public dispose():void
	{	 
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GEMLOTTERYDRAW,this.buyBtnHandlerCaller,this);
        App.MessageHelper.removeEventListener(MessageConst.MESAAGE_GEMLOTTERY_FRESH_ITEM,this.refreshUIInfo,this);
        this._isCircleRun = false;
        this._turnTable = null;
        this._upArrow = null;
        this._activityTimerText = null;
        this._acCDTxt = null;
        this._ruleText = null;
        this._circleGroup  = null;
        this._turnGroup = null;
        this._selMask  = undefined;
        this._turnGroup2  = null;
        this._havenumTxt = null;
        this._lotteryDro = null;
        super.dispose();
	}
}