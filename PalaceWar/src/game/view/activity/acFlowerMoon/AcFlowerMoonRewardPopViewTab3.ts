/**
 * 门客
 * author wxz
 * date 2020.8.4
 * @class AcFlowerMoonRewardPopViewTab3
 */
class AcFlowerMoonRewardPopViewTab3 extends CommonViewTab
{
	private _progress: ProgressBar = null;
    public constructor(data?:any)
    {
        super();
        this.param = data;
        this.initView();
    }

    public initView():void
    {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshProcess, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACFLOWERMOON_EXCHANGE1, this.changeHandle, this);

        let container = new BaseDisplayObjectContainer();
        container.width = GameConfig.stageWidth-60;

        let skinitemCfg = Config.ItemCfg.getItemCfgById(this.cfg.change[0].getReward.split("_")[1]);
        let skinId = skinitemCfg.getRewards.split("_")[1];
        let skinCfg:any = Config.ServantskinCfg.getServantSkinItemById(skinId);

        let bbg = BaseBitmap.create("public_9_bg4");
        bbg.width = 530;
        bbg.height = 705;
        bbg.setPosition(container.width / 2 - bbg.width / 2, 55);
        container.addChild(bbg);

        let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        let bg = BaseLoadBitmap.create(`previewbg_servantskin`);
        bg.width = 525;
        bg.height = 400;
        bg.setPosition(container.width / 2 - bg.width / 2, 57);
        container.addChild(bg);

        let rect = new egret.Rectangle(0, 0, 544, 364);
        let maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 530;
        maskContan.height = 364;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
        container.addChild(maskContan);

        let boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            droWifeIcon.scaleY = 0.67;
            droWifeIcon.scaleX = 0.67;
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            droWifeIcon.x = maskContan.width / 2 - 20;
            droWifeIcon.y = maskContan.y + maskContan.height - 35;
            maskContan.addChild(droWifeIcon);
        }
        else {
            let skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 405;
            skinImg.height = 467;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(0.8);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height - 20;
            maskContan.addChild(skinImg);
        }
        let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 525;
        topbg.height = 36;
        topbg.setPosition(container.width / 2 - topbg.width / 2, 57);
        container.addChild(topbg);

        let skinTitle = App.CommonUtil.getServantSkinFlagById(skinId);
        if (skinTitle){
            skinTitle.setPosition(bg.x + bg.width/2 - skinTitle.width/2, bg.y + bg.height - skinTitle.height - 65);
            container.addChild(skinTitle);
        }			

        let str:string = this.cfg.change[0].needItem;
        let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);        
        let showstr = LanguageManager.getlocal(`acFlowerMoonExchangeTopMsg1`, [str.split("_")[2],itemCfg.name]);  

        let topDesc = ComponentManager.getTextField(showstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        container.addChild(topDesc);

        let skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x, bg.y + 25);
        container.addChild(skinnamebg);

        let skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        container.addChild(skinNameTxt);

        let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        container.addChild(servantNameTxt);

        let buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.width = 520;
        buttomBg.height = 275+20;
        buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
        container.addChild(buttomBg);

        let buttomBg2 = BaseBitmap.create("public_9_managebg");
        buttomBg2.width = 515;
        buttomBg2.height = 269+20;
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        container.addChild(buttomBg2);
        buttomBg2.visible = false;

        let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
        container.addChild(skinTipTxt);

        let addAbility = skinCfg.addAbility;
        for (let index = 0; index < addAbility.length; index++) {
            let bnode = new ServantChangeSkinBookItem();
            bnode.initItem(index,addAbility[index], [skinCfg.id]);
            bnode.setPosition(skinTipTxt.x -5 + index%2*245, skinTipTxt.y + skinTipTxt.height + 15+ Math.floor(index/2)*92);
            container.addChild(bnode);
        }

        let descBg = BaseBitmap.create(`public_scrolllistbg`);
        descBg.width = bg.width;
        descBg.height = 70;
        descBg.alpha = 0.5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, descBg, bg, [0,0]);
        container.addChild(descBg);			

        let itemicon = BaseLoadBitmap.create("itemicon" + itemCfg.id);
        itemicon.width = 60;
        itemicon.height = 60;
        itemicon.setPosition(buttomBg.x+5, descBg.y + descBg.height/2 - itemicon.height/2);
        container.addChild(itemicon);

        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 315);
        this._progress.setPosition(itemicon.x + itemicon.width-15, itemicon.y + 15);
        container.addChild(this._progress);

        let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acFlowerMoonExchangeBtnTxt", () => {
            let vo = this.vo;
            if (!vo.isStart) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (this._progress.getPercent() < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acFlowerMoonExchangeCanNot"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACFLOWERMOON_EXCHANGE1, { activeId: vo.aidAndCode });
        }, this);
        btn.setPosition(this._progress.x + this._progress.width +5, this._progress.y-10);
        container.addChild(btn);	

        this.addChild(container);

        this.freshProcess();
    }

	private freshProcess():void
	{
        let str:string = this.cfg.change[0].needItem;
        let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
		let have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
		let need = parseInt(str.split("_")[2]);

		this._progress.setPercentage(have / need, String(have) + "/" + String(need));
	}    

	private changeHandle(event:egret.Event):void
	{
		let data = event.data.data.data;
		let replacerewards = data.replacerewards;
		if (replacerewards) 
		{
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
		} 			
		if(data.rewards)
		{
			let rewardVoList = GameData.formatRewardItem(data.rewards);
			App.CommonUtil.playRewardFlyAction(rewardVoList);      
		}
		this.freshProcess();
	}    

    private get cfg():Config.AcCfg.FlowerMoonCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    
    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get code():string{
        return this.param.data.code;
    }
	
    private get vo():AcFlowerMoonVo{
        return <AcFlowerMoonVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    public dispose(){
        this._progress = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshProcess, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACFLOWERMOON_EXCHANGE1, this.changeHandle, this);
        super.dispose();
    }
}