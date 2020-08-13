/**
 * author wxz
 * date 2020.6.15
 * @class AcSkySoundRewardPopViewTab4
 */
class AcSkySoundRewardPopViewTab4 extends CommonViewTab
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
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACSKYSOUND_EXCHANGEREWARDS, this.changeHandle, this);

        let container = new BaseDisplayObjectContainer();
        container.width = GameConfig.stageWidth-60;
					
        let skinId = this.cfg.show;
        let skinCfg:any = Config.WifeCfg.getWifeCfgById(skinId);

        let bbg = BaseBitmap.create("public_9_bg4");
        bbg.width = 530;
        bbg.height = 705;
        bbg.setPosition(container.width / 2 - bbg.width / 2, 55);
        container.addChild(bbg);

        let bg = BaseLoadBitmap.create(`acthrowarrowview_wifeskinbg`);
        bg.width = 525;
        bg.height = 400;
        bg.setPosition(container.width / 2 - bg.width / 2, 57);
        container.addChild(bg);

        let rect = new egret.Rectangle(0, 0, 530, 362);
        let maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 530;
        maskContan.height = 364;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2+5, bg.y + 30);
        container.addChild(maskContan);

        let boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon())
        {
            let droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            droWifeIcon.scaleY = 0.7;
            droWifeIcon.scaleX = 0.7;
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            droWifeIcon.x = maskContan.width / 2 + 10;
            droWifeIcon.y = maskContan.y + maskContan.height - 20;
            maskContan.addChild(droWifeIcon);
        }
        else {
            if(RES.hasRes(skinCfg.body))
            {
                let skinImg = BaseLoadBitmap.create(skinCfg.body);
                skinImg.width = 405;
                skinImg.height = 467;
                skinImg.anchorOffsetY = skinImg.height;
                skinImg.anchorOffsetX = skinImg.width / 2;
                skinImg.setScale(0.9);
                skinImg.x = maskContan.width / 2;
                skinImg.y = maskContan.y + maskContan.height - 20;
                maskContan.addChild(skinImg);
            }
        }
        let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 525;
        topbg.height = 36;
        topbg.setPosition(container.width / 2 - topbg.width / 2, 57);
        container.addChild(topbg);		

        let change:string = this.cfg.change[0];
        let changearr:string[] = change.split("_");
        let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(changearr[1]);
        
        let str = LanguageManager.getlocal(`acskysoundwifeTopMsg`, [changearr[2],itemCfg.name]);
        let topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        container.addChild(topDesc);

        let skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x, bg.y + 25);
        container.addChild(skinnamebg);

        let skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 48);
        container.addChild(skinNameTxt);

        let buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.width = 520;
        buttomBg.height = 275+20;
        buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height+5);
        container.addChild(buttomBg);

        let buttomBg2 = BaseBitmap.create("public_scrolllistbg");
        buttomBg2.width = 515;
        buttomBg2.height = 269+20;
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        container.addChild(buttomBg2);
        buttomBg2.visible = false;

        //初始魅力
        let initialCharmStr = LanguageManager.getlocal('acCommonWifePopupViewcCharm', [skinCfg.glamour + '']);
        let initialCharmTxt = ComponentManager.getTextField(initialCharmStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        initialCharmTxt.setPosition(buttomBg2.x + 15, buttomBg2.y + 20);
        container.addChild(initialCharmTxt);
        //加成门客
        let servantCfg: Config.ServantItemCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
        let servantAddStr = LanguageManager.getlocal('acCommonWifePopupViewcServant', [servantCfg.name]);
        let servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        servantAddTxt.setPosition(buttomBg2.x + 15, buttomBg2.y + 45);
        container.addChild(servantAddTxt); 

        let buttomBg3 = BaseBitmap.create("public_9_managebg");
        buttomBg3.width = buttomBg.width-14;
        buttomBg3.height = 195;
        buttomBg3.x = buttomBg.x + buttomBg.width/2 - buttomBg3.width/2;
        buttomBg3.y = buttomBg.y + 80;
        container.addChild(buttomBg3);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeDesc_" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        tipTxt.width = 480;
        tipTxt.lineSpacing = 3;
        tipTxt.setPosition(buttomBg2.x + 15, buttomBg2.y + 95);
        container.addChild(tipTxt);

        let itemicon = BaseLoadBitmap.create("itemicon" + itemCfg.id);
        itemicon.width = 60;
        itemicon.height = 60;
        itemicon.setPosition(buttomBg.x+5, buttomBg.y - itemicon.height-10);
        container.addChild(itemicon);

        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 315);
        this._progress.setPosition(itemicon.x + itemicon.width-5, itemicon.y + 15);
        container.addChild(this._progress);

        let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acSkySoundExchangeBtnTxt", () => {
            if (!this.vo.isStart) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (this._progress.getPercent() < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acSkySoundExchangeNoTxt"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACSKYSOUND_EXCHANGEREWARDS, { activeId: this.vo.aidAndCode });
        }, this);
        btn.setPosition(this._progress.x + this._progress.width +5, this._progress.y-10);
        container.addChild(btn);	

        this.freshProcess();        

        this.addChild(container);
    }

	private freshProcess():void
	{
        let change:string = this.cfg.change[0];
        let changearr:string[] = change.split("_");

        let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(changearr[1]);
		let have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
		let need = parseInt(changearr[2]);

		this._progress.setPercentage(have / need, String(have) + "/" + String(need));
	}
	private changeHandle(event:egret.Event):void
	{
        if(!event.data.ret)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }        
		let rdata = event.data.data.data;
		let replacerewards = rdata.replacerewards;
		if (replacerewards) 
		{
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
		} 			
		if(rdata.rewards)
		{
			let rewardVoList = GameData.formatRewardItem(rdata.rewards);
			App.CommonUtil.playRewardFlyAction(rewardVoList);      
		}
		this.freshProcess();
	}
    private get cfg():Config.AcCfg.SkySoundCfg{
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
	
    private get vo():AcSkySoundVo{
        return <AcSkySoundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    public dispose(){
        super.dispose();
        this._progress = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshProcess, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACSKYSOUND_EXCHANGEREWARDS, this.changeHandle, this);
    }
}