/**
 * 付费礼包
 * author ycg
 * date 2019.12.24
 * @class AcRechargeGiftView
 */
class AcRechargeGiftView extends AcCommonView{
    private _timeBg:BaseBitmap = null;
    private _acTimeTf:BaseTextField = null;
    private _chargeBtn:BaseButton = null;
    private _receiveFlag:BaseBitmap = null;
    private _type:number = null;

    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.receivePushData,this);
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        //bg
        let bg = BaseBitmap.create("rechargegift_bg-"+this.getTypeCode());
        bg.setPosition(GameConfig.stageWidth/2 - bg.width/2, GameConfig.stageHeigth/2 - bg.height/2);
        this.addChildToContainer(bg);
        this.closeBtn.setPosition(bg.x + bg.width - this.closeBtn.width - 45, bg.y + 40);

        let rewardBg = BaseBitmap.create("rechargegift_rewardbg-"+this.getTypeCode());
        rewardBg.setPosition(bg.x + bg.width/2 - rewardBg.width/2, bg.y + bg.height - rewardBg.height);

        //role
        let offY = 0;
        let offX = 0;
        if (this.getTypeCode() == "1"){
            offX = -20;
            offY = 35;
        }
        else if (this.getTypeCode() == "2"){
            offY = 0;
        }
        let role = this.getShowSkin(this.cfg.show, null, offX, offY);
        role.setPosition(rewardBg.x + 210, rewardBg.y + 30);
        this.addChildToContainer(role);

        //活动标头
        let title = BaseBitmap.create("rechargegift_title-"+this.getTypeCode());
        title.setPosition(bg.x + bg.width/2 - title.width/2, bg.y - 25);
        this.addChildToContainer(title);

        this.addChildToContainer(rewardBg);

        //描述
        let info = BaseBitmap.create("rechargegift_info-"+this.getTypeCode());
        info.setPosition(bg.x + bg.width/2 - 30, bg.y + 80);
        this.addChildToContainer(info);

        //价格
        let chargeCfg = this.vo.getRechargeCfg();
        let price = ComponentManager.getBitmapText(""+chargeCfg.gemCost, "recharge_fnt", TextFieldConst.COLOR_WARN_YELLOW2, TextFieldConst.FONTSIZE_TITLE_BIG);
        price.anchorOffsetX = price.width;
        price.setPosition(info.x + 120, info.y + 72);
        this.addChildToContainer(price);
        if (!Api.switchVoApi.checkOpenBMFont()){
            let priceTxt = <BaseTextField>price;
			priceTxt.bold = true;
        }
        if (PlatformManager.checkIsRuSp() && this.code == "4" || this.code == "5" || this.code == "6" || this.code == "7" || this.code == "8" ||this.code == "9" )
        {
            price.visible = false;
        }

        if (PlatformManager.checkIsTWBSp() && (this.code == "1" || this.code == "2") )
        {
            price.setPosition(info.x + 120+119, info.y + 72+190);
        }

        //奖励标头
        let rewardTitle = BaseBitmap.create("rechargegift_rewardtitle");
        rewardTitle.setPosition(rewardBg.x + 50, rewardBg.y + 25);
        this.addChildToContainer(rewardTitle);

        //奖励物品
        let scrollNode = new BaseDisplayObjectContainer();
        scrollNode.height = 108;
        let scrollRect = new egret.Rectangle(0, 0, 420, 108);
        let rewardScroll = ComponentManager.getScrollView(scrollNode, scrollRect);
        rewardScroll.setPosition(rewardTitle.x + rewardTitle.width, rewardBg.y);
        this.addChildToContainer(rewardScroll);
        rewardScroll.horizontalScrollPolicy = "on";
        rewardScroll.verticalScrollPolicy = "off";
        let rewardsArr:Array<RewardItemVo> = GameData.formatRewardItem(chargeCfg.getReward);
        App.LogUtil.log("rewardsarr: "+rewardsArr.length);
		for(let i:number = 0;i < rewardsArr.length; i++)
		{
            let rewardItemIcon:BaseDisplayObjectContainer = GameData.getItemIcon(rewardsArr[i], true, true);
            rewardItemIcon.setScale(0.8);
            rewardItemIcon.setPosition(7 +(rewardItemIcon.width * rewardItemIcon.scaleX + 13)*i, scrollNode.y + scrollNode.height / 2 - rewardItemIcon.height * rewardItemIcon.scaleY / 2);
            scrollNode.addChild(rewardItemIcon);
		}

        //充值
        let rechargeBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "", this.rechargeBtnClick, this);
        rechargeBtn.setPosition(bg.x + bg.width/2 - rechargeBtn.width/2, bg.y + bg.height - rechargeBtn.height - 40);
        this.addChildToContainer(rechargeBtn);
        this._chargeBtn = rechargeBtn;
        rechargeBtn.setText(LanguageManager.getlocal("AcRechargeGiftBtnText", [""+chargeCfg.cost]), false);
        if(PlatformManager.checkisLocalPrice()&&chargeCfg.platFullPrice)
        {
            rechargeBtn.setText(chargeCfg.platFullPrice,false); 
        }

        //已领取
        let receiveFlag = BaseBitmap.create("collectflag");
        receiveFlag.setScale(0.8);
        receiveFlag.setPosition(bg.x + bg.width/2 - receiveFlag.width * receiveFlag.scaleX /2, bg.y + bg.height - receiveFlag.height * receiveFlag.scaleY - 20);
        this.addChildToContainer(receiveFlag);
        receiveFlag.visible = false;
        this._receiveFlag = receiveFlag;

        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = bg.y + bg.height + 5;
		this.addChildToContainer(this._timeBg);
		this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("AcRechargeGiftTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeBg.width = 60 + this._acTimeTf.width;
        this._timeBg.anchorOffsetX = this._timeBg.width/2;
        this._timeBg.x = bg.x + bg.width/2;
        this._acTimeTf.anchorOffsetX = this._acTimeTf.width/2;
		this._acTimeTf.setPosition(this._timeBg.x, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);

        //tip
        let tip = ComponentManager.getTextField(LanguageManager.getlocal("AcRechargeGiftTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        tip.textAlign = TextFieldConst.ALIGH_CENTER;
        tip.anchorOffsetX = tip.width/2;
        tip.lineSpacing = 8;
        tip.setPosition(bg.x + bg.width/2, this._timeBg.y + this._timeBg.height + 25);
        this.addChildToContainer(tip);

        //衣装预览
        let skinContainer = this.getSkinBtnContainer();
        skinContainer.setPosition(rewardBg.x + 90, rewardBg.y - 110);
        this.addChildToContainer(skinContainer);
    }

    private rechargeBtnClick():void{
        if (!this.vo.isInActivity()){
            this.vo.showAcEndTip();
            return;
        }
        if (this.getTypeCode() == "1" || this.getTypeCode() == "4"){
            if (this.vo.checkIsHasWifeSkin(this.cfg.show)){
                let skinData = Config.WifeskinCfg.getWifeCfgById(this.cfg.show);
                // let exchange = skinData.claim;
                // let itemvo = GameData.formatRewardItem(exchange)[0];
                let msgStr = LanguageManager.getlocal("AcRechargeGiftGetSkinMsg-1", [""+skinData.name]);
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    title:"AcRechargeGiftTipTitle",
                    msg:msgStr,
                    callback:() =>{
                        PlatformManager.checkPay(this.cfg.needGem);
                    },
                    handler:this,
                    needCancel:true,
                });
                return;
            }
        }
        PlatformManager.checkPay(this.cfg.needGem);
    }

    private receivePushData(evt:egret.Event){
        if (evt.data.ret){
            if (evt.data.data.cmd == NetPushConst.PUSH_PAY){
                let rData = evt.data.data.data;
                let cfg = Config.RechargeCfg.getRechargeItemCfgByKey(this.cfg.needGem);
                let rewards = "1_1_" + cfg.gemCost + "|" + rData.rewards;
                let rewObj = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rewObj);
                if (rData.replacerewards && rData.replacerewards[0]) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
                }
                this.refreshView();
            }
        }
    }

    private refreshView():void{
        this._chargeBtn.visible = false;
        this._receiveFlag.visible = true;
    }

    public tick():void{
        if (this._acTimeTf)
        {
            this._acTimeTf.text = LanguageManager.getlocal("AcRechargeGiftTimeCountDown", [this.vo.getCountDown()]);
            this._acTimeTf.anchorOffsetX = this._acTimeTf.width/2;

            this._timeBg.width = 60 + this._acTimeTf.width;
		    this._timeBg.anchorOffsetX = this._timeBg.width/2;
        }
    }

    //衣装显示 
    public getShowSkin(skinId:number|string, scale?:number, offX?:number, offY?:number):BaseDisplayObjectContainer
    {
        let container = new BaseDisplayObjectContainer();
        // 
        let showtype = 0;
        if(this.cfg.switch)
        {
            let oneswitch:string = this.cfg.switch[0];
            let array = oneswitch.split("_");
            let onestr:string = array[0];
            if (onestr == "wifeSkin")
            {
                showtype = 1;
            }
            else if (onestr == "servantSkin")
            {
                showtype = 2;
            }
            else if (onestr == "wifeName")
            {
                showtype = 3;
            }
            else if (onestr == "servant")
            {
                showtype = 4;
            }
            this._type = showtype;
        }

        if(showtype == 1){
            let skinCfg:any = Config.WifeskinCfg.getWifeCfgById(skinId);
			let boneName = undefined;
			let wife = null;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                if (scale){
                    wife.setScale(scale);
                }
                else{
                    wife.setScale(0.7);
                }
				wife.anchorOffsetY = wife.height;
				// wife.anchorOffsetX = wife.width / 2;
                if (offY){
                    wife.y += offY;
                }
                if (offX){
                    wife.x += offX;
                }
			}
			else {
				wife = BaseLoadBitmap.create(skinCfg.body);
				wife.width = 640;
				wife.height = 840;
                wife.setScale(0.45);
				wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                if (offX){
                    wife.x += offX;
                }
            }
            container.addChild(wife);
        }
        else if(showtype == 2)
        {
            let skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
            let boneName = undefined;
            let servant = null;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                if (scale){
                    servant.setScale(scale);
                }
                else{
                    servant.setScale(0.9);  //0.8
                }
				servant.anchorOffsetY = servant.height;
				servant.anchorOffsetX = servant.width / 2;
                if (offY){
                    servant.y += offY;
                }
			}
			else {
				servant = BaseLoadBitmap.create(skinCfg.body);
				servant.width = 405;
				servant.height = 467;
				servant.anchorOffsetY = servant.height;
				servant.anchorOffsetX = servant.width / 2;
				servant.setScale(0.85);
            }
            container.addChild(servant);
        }
        else if(showtype == 3)
        {
            let skinCfg:Config.WifeItemCfg = Config.WifeCfg.getWifeCfgById(skinId);
			let boneName = undefined;
			let wife = null;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				wife = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                if (scale){
                    wife.setScale(scale);
                }
                else{
                    wife.setScale(0.7);
                }
				wife.anchorOffsetY = wife.height;
				// wife.anchorOffsetX = wife.width / 2;
                if (offY){
                    wife.y += offY;
                }
                if (offX){
                    wife.x += offX;
                }
			}
			else {
				wife = BaseLoadBitmap.create(skinCfg.body);
				wife.width = 640;
				wife.height = 840;
                wife.setScale(0.45);
				wife.anchorOffsetY = wife.height;
                wife.anchorOffsetX = wife.width / 2;
                if (offX){
                    wife.x += offX;
                }
            }
            container.addChild(wife);
        }
        else if(showtype == 4)
        {
            let skinCfg:Config.ServantItemCfg = Config.ServantCfg.getServantItemById(skinId);
            let boneName = undefined;
            let servant = null;
			// if (skinCfg && skinCfg.bone) {
			// 	boneName = skinCfg.bone + "_ske";
			// }
			// if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
			// 	servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            //     if (scale){
            //         servant.setScale(scale);
            //     }
            //     else{
            //         servant.setScale(0.9);  //0.8
            //     }
			// 	servant.anchorOffsetY = servant.height;
			// 	servant.anchorOffsetX = servant.width / 2;
            //     if (offY){
            //         servant.y += offY;
            //     }
			// }
			// else {
				servant = BaseLoadBitmap.create(skinCfg.fullIcon);
				servant.width = 405;
				servant.height = 467;
				servant.anchorOffsetY = servant.height;
				servant.anchorOffsetX = servant.width / 2;
				servant.setScale(0.85);
            // }
            container.addChild(servant);
        }
        return container;
    }

    //衣装预览按钮
    private getSkinBtnContainer(isOther?:boolean):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		skinTxtEffect.width = 208;
		skinTxtEffect.height = 154;
		skinTxtEffect.setPosition(0, 0);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		container.addChild(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);
        
        let skinTxtStr = "acwealthcarpview_servantskintxt";
        if (isOther){
            skinTxtStr = "acgiftreturnview_common_skintxt"
        }
		let skinTxt = BaseBitmap.create(skinTxtStr);
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxt, skinTxtEffect);
		container.addChild(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create(skinTxtStr);
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinTxteffect, skinTxtEffect);
		container.addChild(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		//透明点击区域
        let touchPos = BaseBitmap.create("public_alphabg");
        touchPos.width = 160;
		touchPos.height = 40;
		touchPos.setPosition(25, 57);
        container.addChild(touchPos);

        let data = null;
        let skinId = null;
        let topMsg = null;
        let rechargeCfg = Config.RechargeCfg.getRechargeItemCfgByKey(this.cfg.needGem);
        if (this.getTypeCode() == "1" || this.getTypeCode() == "3" || this.getTypeCode() == "4" || this._type==1){
            skinId = Config.WifeskinCfg.formatRewardItemVoStr(this.cfg.show);
            topMsg = LanguageManager.getlocal("AcRechargeGiftSkinMsg-"+this.getTypeCode(), [""+rechargeCfg.gemCost]);
            data = {
                data:[{idType: skinId, topMsg:topMsg, scale: 0.65, bgName:""}]
            };
        }
        else if (this.getTypeCode() == "2"|| this._type==2){
            skinId = Config.ServantskinCfg.formatRewardItemVoStr(this.cfg.show);
            topMsg = LanguageManager.getlocal("AcRechargeGiftSkinMsg-"+this.getTypeCode(), [""+rechargeCfg.gemCost]);
            data = {
                data:[{idType: skinId, topMsg:topMsg, scale: 0.8, bgName:""}]
            };
        }
        else if ( this._type==3)
        {
            skinId = Config.WifeCfg.formatRewardItemVoStr(this.cfg.show);
            topMsg = LanguageManager.getlocal("AcRechargeGiftSkinMsg-"+this.getTypeCode(), [""+rechargeCfg.gemCost]);
            data = {
                data:[{idType: skinId, topMsg:topMsg, scale: 0.65, bgName:""}]
            };
        }
        else if ( this._type==4)
        {
            skinId = Config.ServantCfg.formatRewardItemVoStr(this.cfg.show);
            topMsg = LanguageManager.getlocal("AcRechargeGiftSkinMsg-"+this.getTypeCode(), [""+rechargeCfg.gemCost]);
            data = {
                data:[{idType: skinId, topMsg:topMsg, scale: 0.8, bgName:""}]
            };
        }
        
		touchPos.addTouchTap(() => {
            ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONREWARDPOPUPVEW, data);
		}, this);
        return container;
    }

    public get vo():AcRechargeGiftVo{
        return <AcRechargeGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public get cfg():any{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public getTypeCode():string{
        return this.code;
    }

    protected getCloseBtnName():string
	{
		return "sharepopupview_closebtn";
	}

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return null;
    }

    protected getBgName():string{
        // return "rechargegift_bg-"+this.getTypeCode();
        return null;
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    public getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat([
            "rechargegift_rewardtitle", "recharge_fnt", "acwealthcarpview_servantskintxt",
            "rechargegift_bg-"+this.getTypeCode(),
            "rechargegift_info-"+this.getTypeCode(),
            "rechargegift_rewardbg-"+this.getTypeCode(),
            "rechargegift_title-"+this.getTypeCode(),
        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.receivePushData,this);
        // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._timeBg = null;
        this._acTimeTf = null;
        this._chargeBtn = null;
        this._receiveFlag = null;
        this._type = 0;

        super.dispose();
    }
}