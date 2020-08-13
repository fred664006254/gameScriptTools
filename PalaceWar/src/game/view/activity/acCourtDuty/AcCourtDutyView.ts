/**
 * 依生依世
 * author ycg
 * date 2019.10.28
 * @class AcCourtDutyView
 */
class AcCourtDutyView extends AcCommonView{
    private _timeBg:BaseBitmap = null;
    private _acTimeTf:BaseTextField = null;
    private _listHeight:number = 0;
    private _dialogPanel:BaseDisplayObjectContainer = null;
    private _infoBg:BaseBitmap = null;
    private _tabBg:BaseBitmap = null;
    private _flagBg:BaseBitmap = null;
    private _selectDialogBtnIndex:number = 0;

    public constructor(){
        super();
    }

    public initView(){
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_GETTASK, this.getTaskCallback, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);

        let infoBgStr = ResourceManager.hasRes("accourtduty_infobg-"+this.getTypeCode()) ? "accourtduty_infobg-"+this.getTypeCode() : "accourtduty_infobg-1";
        let infoBg = BaseBitmap.create(infoBgStr);
        infoBg.setPosition(this.titleBg.x + this.titleBg.width/2 - infoBg.width/2, this.titleBg.y + this.titleBg.height - 2);
        this.addChildToContainer(infoBg);
        this._infoBg = infoBg;

        let nameStr = "";
        if (this.code == "1"){
            nameStr = "itemName_3904";
        }
        let name = ComponentManager.getTextField(LanguageManager.getlocal(nameStr), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.anchorOffsetX = name.width/2;
        name.setPosition(infoBg.x + 80, infoBg.y + infoBg.height - 40);
        this.addChildToContainer(name);

        //活动时间
        let acTime = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyTime", [this.vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        acTime.setPosition(infoBg.x + 150, infoBg.y + 20);
        this.addChildToContainer(acTime);
        //活动介绍
        let acDesc = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyInfo-"+this.getTypeCode()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        acDesc.width = 480;
        acDesc.lineSpacing = 5;
        acDesc.setPosition(acTime.x, acTime.y + acTime.height + 3);
        this.addChildToContainer(acDesc);

        //倒计时
        this._timeBg = BaseBitmap.create("public_9_bg61");
		this._timeBg.y = infoBg.y + infoBg.height - this._timeBg.height - 2;
        this.addChildToContainer(this._timeBg);
		this._acTimeTf = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyTimeCountDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
        this.addChildToContainer(this._acTimeTf);

        let tabBgStr = ResourceManager.hasRes("accourtduty_tabbg-"+this.getTypeCode()) ? "accourtduty_tabbg-"+this.getTypeCode() : "accourtduty_tabbg-1";
        let tabBg = BaseBitmap.create(tabBgStr);
        tabBg.setPosition(infoBg.x + infoBg.width/2 - tabBg.width/2, infoBg.y + infoBg.height);
        this.addChildToContainer(tabBg);
        this._tabBg = tabBg;

        let flagBgStr = ResourceManager.hasRes("accourtduty_flag-"+this.getTypeCode()) ? "accourtduty_flag-"+this.getTypeCode() : "accourtduty_flag-1";
        let flagBg = BaseBitmap.create(flagBgStr);
        flagBg.setPosition(infoBg.x + infoBg.width/2 - flagBg.width/2, infoBg.y + infoBg.height - 30);
        this._flagBg = flagBg;
        
        this._listHeight = GameConfig.stageHeigth - tabBg.y - tabBg.height;
    
        let tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarNames(), ["1", "2"], this.clickTabbarHandler, this, null, null, null, true);
        tabbarGroup.setSpace(200);
        tabbarGroup.setPosition(this.titleBg.x + this.titleBg.width/2 - tabbarGroup.width/2, tabBg.y + 0);
        this.addChild(tabbarGroup);
        this.tabbarGroup = tabbarGroup;
        this.tabbarGroup.selectedIndex = this._selectedTabIndex;
        let tabIndex = this.getChildIndex(this.tabbarGroup);
        this.addChildAt(flagBg, tabIndex + 2);
        this.changeTab();
        this.initDialogPanel();

        this.freshView();
    }

    private initDialogPanel():void{
        let localKey = this.vo.aidAndCode+Api.playerVoApi.getPlayerID();
        let lastTime = LocalStorageManager.get(localKey);
        // LocalStorageManager.set(localKey, String(0));
        if (lastTime && App.DateUtil.checkIsToday(Number(lastTime)))
		{	
            return;
        }
        this._flagBg.visible = false;
        let dialogPanel = new BaseDisplayObjectContainer();
        dialogPanel.width = GameConfig.stageWidth;
        dialogPanel.height = GameConfig.stageHeigth - this._infoBg.y - this._infoBg.height;
        dialogPanel.setPosition(0, this._infoBg.y + this._infoBg.height);
        let tmpIndex = this.getChildIndex(this.tabbarGroup);
        this.addChildAt(dialogPanel, tmpIndex+2);
        dialogPanel.touchEnabled = true;
        this._dialogPanel = dialogPanel;

        //bg
        let bgStr = ResourceManager.hasRes("accourtduty_bg-"+this.getTypeCode()) ? "accourtduty_bg-"+this.getTypeCode() : "accourtduty_bg-1";
        let bg = BaseBitmap.create(bgStr);
        bg.width = GameConfig.stageWidth;
        bg.height = dialogPanel.height;
        bg.setPosition(0, 0);
        dialogPanel.addChild(bg);
        bg.name = "bg";

        //bottom
        let bottomBgStr = ResourceManager.hasRes("accourtduty_bottombg-"+this.getTypeCode()) ? "accourtduty_bottombg-"+this.getTypeCode() : "accourtduty_bottombg-1";
        let bottomBg = BaseBitmap.create(bottomBgStr);
        bottomBg.setPosition(dialogPanel.width/2 - bottomBg.width/2, dialogPanel.height - bottomBg.height);
        bottomBg.name = "bottomBg";

        

        // //对话
        // let tipContainer = new BaseDisplayObjectContainer();
        // tipContainer.setPosition(200, 100);
        // dialogPanel.addChild(tipContainer);
        // tipContainer.name = "tipContainer";
        // let tipBg = BaseBitmap.create("public_9_bg21");
        // tipBg.width = 400;
        // tipBg.setPosition(0, 0);
        // tipContainer.addChild(tipBg);
        // let tip = ComponentManager.getTextField("aaaaaaaaa", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        // tip.width = tipBg.width - 20;
        // tipBg.height = tip.height + 40;
        // tipContainer.height = tipBg.height;
        // tip.setPosition(tipBg.x + tipBg.width/2 - tip.width/2, tipBg.y + tipBg.height/2 - tip.height/2);
        // tipContainer.addChild(tip);

        //按钮
        let btnContainer = new BaseDisplayObjectContainer();
        btnContainer.setPosition(360, 180);
        dialogPanel.addChild(btnContainer);
        btnContainer.name = "btnContainer";
        let btn1BgStr = ResourceManager.hasRes("accourtduty_circlebtn_1-"+this.getTypeCode()) ? "accourtduty_circlebtn_1-"+this.getTypeCode() : "accourtduty_circlebtn_1-1";
        let btn1 = ComponentManager.getButton(btn1BgStr, "", this.clickDialogBtnCallback, this, [0]);
        btn1.setPosition(0, 0);
        btnContainer.addChild(btn1);

        let btn2BgStr = ResourceManager.hasRes("accourtduty_circlebtn_2-"+this.getTypeCode()) ? "accourtduty_circlebtn_2-"+this.getTypeCode() : "accourtduty_circlebtn_2-1";
        let btn2 = ComponentManager.getButton(btn2BgStr, "", this.clickDialogBtnCallback, this, [1]);
        btn2.setPosition(btn1.x + btn1.width/2 - 30, btn1.y + btn1.height + 50);
        btnContainer.addChild(btn2);

        let btn2Effect = ComponentManager.getCustomMovieClip("accourtduty_effect_circlelight", 10, 70);
        btn2Effect.blendMode = egret.BlendMode.ADD;
        btn2Effect.setPosition(btn2.x - 27, btn2.y - 17);
        btnContainer.addChild(btn2Effect);
        btn2Effect.playWithTime(0);

        //role
        let roleContainer = new BaseDisplayObjectContainer();
        dialogPanel.addChild(roleContainer);
        roleContainer.name = "roleContainer";
        roleContainer.setPosition(0, bottomBg.y + 55);
        let wifeSkinCfg = Config.WifeCfg.getWifeCfgById("234")
        let boneName = wifeSkinCfg.bone + "_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let role = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
            role.setScale(1);
            role.anchorOffsetY = role.height;
            role.anchorOffsetX = 0;
            role.x = 210;
            role.y = 0;//
            roleContainer.addChild(role);
        }
        else {
            let role = BaseLoadBitmap.create(wifeSkinCfg.body);
            role.width = 640;
            role.height = 840;
            role.anchorOffsetY = role.height;
            role.anchorOffsetX = 0;
            role.setScale(0.7);
            role.x = 10;
            role.y = 30;
            roleContainer.addChild(role);
        }

        //骨骼
        let snowBone = "accourtdutyview_snow";
        let snowBoneName = snowBone + "_ske";
        if ((!Api.switchVoApi.checkCloseBone()) && snowBoneName && RES.hasRes(snowBoneName) && App.CommonUtil.check_dragon()) {
            let snow = App.DragonBonesUtil.getLoadDragonBones(snowBone);
            snow.setScale(1);
            // snow.anchorOffsetY = 0;
            // snow.anchorOffsetX = 0;
            snow.x = 0;
            snow.y = 880;//880
            dialogPanel.addChild(snow);
        }

        dialogPanel.addChild(bottomBg);
        this.playDialogAni(true);
    }

    //点击对话按钮
    private clickDialogBtnCallback(index:number){
        App.LogUtil.log("clickdialog: "+index);
        this._selectDialogBtnIndex = index;
        this.playDialogAni(false);
    }

    //播放动画
    private playDialogAni(isAniIn:boolean):void{
        let bg = <BaseBitmap>this._dialogPanel.getChildByName("bg");
        let bottomBg = <BaseBitmap>this._dialogPanel.getChildByName("bottomBg");
        // let tipContainer = <BaseDisplayObjectContainer>this._dialogPanel.getChildByName("tipContainer");
        let btnContainer = <BaseDisplayObjectContainer>this._dialogPanel.getChildByName("btnContainer");
        let roleContainer = <BaseDisplayObjectContainer>this._dialogPanel.getChildByName("roleContainer");
        if (isAniIn){
            this._flagBg.visible = false;
            bg.alpha = 1;
            bottomBg.alpha = 0;
            // tipContainer.alpha = 0;
            btnContainer.alpha = 0;
            roleContainer.alpha = 0;
            bottomBg.y = this._dialogPanel.height;
            // tipContainer.x = GameConfig.stageWidth;
            btnContainer.x = GameConfig.stageWidth;
            roleContainer.x = - GameConfig.stageWidth/2;
            egret.Tween.get(bottomBg).wait(180).to({y: this._dialogPanel.height - bottomBg.height, alpha: 1}, 100); //180
            // egret.Tween.get(tipContainer).wait(100).to({x: 200, alpha: 1}, 300); //400
            egret.Tween.get(btnContainer).wait(120).to({x: 360, alpha: 1}, 280); //280
            egret.Tween.get(roleContainer).wait(100).to({x: 0, alpha: 1}, 300);  //320
        }
        else{
            
            egret.Tween.get(bottomBg).wait(180).to({y: this._dialogPanel.height, alpha: 0}, 100); //180
            // egret.Tween.get(tipContainer).wait(100).to({x: GameConfig.stageWidth, alpha: 0}, 300); //400
            egret.Tween.get(btnContainer).wait(120).to({x: GameConfig.stageWidth, alpha: 0}, 280); //280
            egret.Tween.get(roleContainer).wait(100).to({x: -GameConfig.stageWidth/2, alpha: 0}, 300);  //320
            let view = this;
            egret.Tween.get(bg).wait(300).to({alpha: 0}, 100).call(()=>{
                let localKey = view.vo.aidAndCode+Api.playerVoApi.getPlayerID();
                LocalStorageManager.set(localKey, String(GameData.serverTime));
                if (this.selectedTabIndex != this._selectDialogBtnIndex){
                    this.tabbarGroup.selectedIndex = this._selectDialogBtnIndex;
                    view.clickTabbarHandler({index:this._selectDialogBtnIndex});
                }
                view._dialogPanel.visible = false;
                this._flagBg.visible = true;
            })
        }
    }

    protected changeTab():void
	{
		let tabveiwClass:any = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex+1));
		if(tabveiwClass)
		{
			let commViewTab:ViewTab=<ViewTab>this.tabViewData[this.selectedTabIndex];
			if(commViewTab)
			{
                // this.addChild(commViewTab);
                let tmpIndex = this.getChildIndex(this.tabbarGroup);
                this.addChildAt(commViewTab, tmpIndex + 3);
				commViewTab.refreshWhenSwitchBack();
			}
			else
			{
				let tabView:ViewTab = new tabveiwClass(this.param);
				tabView.setPosition(this.container.x, this._tabBg.y + this._tabBg.height);
				this.tabViewData[this.selectedTabIndex] = tabView;
				tabView["param"]=this.param;
				// this.addChild(tabView);
				let tmpIndex = this.getChildIndex(this.tabbarGroup);
                this.addChildAt(tabView, tmpIndex + 1);
			}
			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex])
			{
				this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}
		
    }
    
    public getTaskCallback(evt:egret.Event){
        if (evt && evt.data && evt.data.ret){
            let rData = evt.data.data.data;
            if (rData){
                let rewObj = GameData.formatRewardItem(rData.rewards);
                App.CommonUtil.playRewardFlyAction(rewObj);
                if (rData.replacerewards) {
                    ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
                }
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            }
        }
    }

    public freshView():void{
        if (this.vo.isShowYaMenTaskRedDot() || this.vo.isShowUnlockYaMenRedDot()){
            this.tabbarGroup.addRedPoint(0);
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }

        if (this.vo.isShowHuangBangTaskRedDot() || this.vo.isShowUnlockHuangBangRedDot()){
            this.tabbarGroup.addRedPoint(1);
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }
    }

    public getListHeight():number{
        return this._listHeight;
    }

    public tick():void{
        this._acTimeTf.text = LanguageManager.getlocal("acCourtDutyTimeCountDown", [this.vo.getCountDown()]);
		this._timeBg.width = 60 + this._acTimeTf.width;
		this._timeBg.x = GameConfig.stageWidth - this._timeBg.width - 5;
		this._acTimeTf.setPosition(this._timeBg.x + this._timeBg.width / 2 - this._acTimeTf.width / 2, this._timeBg.y + this._timeBg.height / 2 - this._acTimeTf.height / 2);
    }

    private get cfg():Config.AcCfg.CourtDutyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcCourtDutyVo{
        return <AcCourtDutyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    public getTypeCode():string{
        return this.code;
    }

    private getTabbarNames():string|string[]
	{
        // let btnName1 = ResourceManager.hasRes("accourtduty_tabbtn_1-"+this.getTypeCode()) ? "accourtduty_tabbtn_1-"+this.getTypeCode() : "accourtduty_tabbtn_1-1";
        // let btnName2 = ResourceManager.hasRes("accourtduty_tabbtn_2-"+this.getTypeCode()) ? "accourtduty_tabbtn_2-"+this.getTypeCode() : "accourtduty_tabbtn_2-1";
        return ["accourtduty_tabbtn_1-1", "accourtduty_tabbtn_2-1"];
        // return "";
	}

    protected getTitleBgName():string{
        return "accourtduty_titlebg-"+this.getTypeCode();
    }

    protected getTitleStr():string{
        return null;
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return "acCourtDutyRuleInfo-"+this.getTypeCode();
    }

    public getResourceList():string[]{
        let list:string[] = [];
        if (this.getTypeCode() == "1"){
            list = [
                "accourtduty_bg-1", "accourtduty_infobg-1", "accourtduty_bottombg-1", "accourtduty_chargetipbg-1", "accourtduty_flag-1",
                "accourtduty_tabbg-1", "accourtduty_unlock-1", "accourtduty_circlebtn_1-1", "accourtduty_circlebtn_1-1_down", "accourtduty_circlebtn_2-1", "accourtduty_circlebtn_2-1_down", "accourtduty_tabbtn_1-1", "accourtduty_tabbtn_1-1_down",
                "accourtduty_tabbtn_2-1", "accourtduty_tabbtn_2-1_down"
            ];
        }
        return super.getResourceList().concat([
            "activity_charge_red", "progress7_bg", "progress7", "accourtduty_txtbg", "guide_hand",
            "accourtduty_bg-"+this.getTypeCode(),"accourtduty_infobg-"+this.getTypeCode(),  "accourtduty_bottombg-"+this.getTypeCode(), "accourtduty_chargetipbg-"+this.getTypeCode(), "accourtduty_flag-"+this.getTypeCode(),
            "accourtduty_tabbg-"+this.getTypeCode(), "accourtduty_unlock-"+this.getTypeCode(),
            "accourtduty_circlebtn_1-"+this.getTypeCode(), "accourtduty_circlebtn_1-"+this.getTypeCode()+"_down", "accourtduty_circlebtn_2-"+this.getTypeCode(), "accourtduty_circlebtn_2-"+this.getTypeCode()+"_down", "accourtduty_tabbtn_1-"+this.getTypeCode(), "accourtduty_tabbtn_1-"+this.getTypeCode()+"_down",
                "accourtduty_tabbtn_2-"+this.getTypeCode(), "accourtduty_tabbtn_2-"+this.getTypeCode()+"_down",
        ]).concat(list);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_GETTASK, this.getTaskCallback, this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshView, this);

        this._timeBg = null;
        this._acTimeTf = null;
        this._dialogPanel = null;
        this._listHeight = 0;
        this._selectDialogBtnIndex = 0;
        this._infoBg = null;
        this._tabBg = null;
        this._flagBg = null;
        super.dispose();
    }
}