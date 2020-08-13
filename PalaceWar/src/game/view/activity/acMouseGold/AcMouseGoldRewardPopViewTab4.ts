/**
 * author wxz
 * 预览
 * date 2020.6.29
 * @class AcMouseGoldRewardPopViewTab4
 */
class AcMouseGoldRewardPopViewTab4 extends CommonViewTab
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
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_EXCHANGE, this.changeHandle, this);

        let container = new BaseDisplayObjectContainer();
        container.width = GameConfig.stageWidth-60;
					
        let skinId = this.cfg.show;
        let skinCfg:Config.WifeSkinItemCfg = Config.WifeskinCfg.getWifeCfgById(skinId);

        let bbg = BaseBitmap.create("public_9_bg4");
        bbg.width = 530;
        bbg.height = 705;
        bbg.setPosition(container.width / 2 - bbg.width / 2, 55);
        container.addChild(bbg);

        let bgstr = "acthrowarrowview_wifeskinbg";
        let bg = BaseLoadBitmap.create(bgstr);
        bg.width = 525;
        bg.height = 400;
        bg.setPosition(container.width / 2 - bg.width / 2, 57);
        container.addChild(bg);

        let rect = new egret.Rectangle(0, 0, 525, 362);
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
            droWifeIcon.scaleY = 0.75;
            droWifeIcon.scaleX = 0.75;
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            droWifeIcon.x = maskContan.width / 2;
            droWifeIcon.y = maskContan.y + maskContan.height - 35;
            maskContan.addChild(droWifeIcon);
        }
        else {
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
        let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
        topbg.width = 525;
        topbg.height = 36;
        topbg.setPosition(container.width / 2 - topbg.width / 2, 57);
        container.addChild(topbg);

        let skinTitle = App.CommonUtil.getWifeSkinFlagById(skinId);
        if (skinTitle)
        {
            skinTitle.setPosition(bg.x + bg.width/2 - skinTitle.width/2, bg.y + bg.height - skinTitle.height - 65);
            container.addChild(skinTitle);
        }			

        let str:string = this.cfg.exchange.needItem;
        let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
        let showstr = LanguageManager.getlocal(`acMouseGoldExchangeTopMsg`, [str.split("_")[2],itemCfg.name]);        

        let topDesc = ComponentManager.getTextField(showstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
        container.addChild(topDesc);

        let skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x, bg.y + 25);
        container.addChild(skinnamebg);

        let skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        container.addChild(skinNameTxt);

        let wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
        let servantNameTxt = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
        servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
        container.addChild(servantNameTxt);

        let buttomBg = BaseBitmap.create("public_popupscrollitembg");
        buttomBg.width = 520;
        buttomBg.height = 275+20;
        buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height+5);
        container.addChild(buttomBg);

        let buttomBg2 = BaseBitmap.create("public_9_managebg");
        buttomBg2.width = 515;
        buttomBg2.height = 269+20;
        buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
        container.addChild(buttomBg2);
        buttomBg2.visible = false;

        let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
        container.addChild(skinTipTxt);

        let descBg = BaseBitmap.create(`public_scrolllistbg`);
        descBg.width = 505;
        descBg.height = 170;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0,skinTipTxt.textHeight + 10]);
        container.addChild(descBg);

        let group = new BaseDisplayObjectContainer();
        group.width = descBg.width;
        container.addChild(group);
        let attrSize = TextFieldConst.FONTSIZE_CONTENT_SMALL;
        let attrInfo = this.dealAttrChangeInfo(""+skinId);
        for (let i = 0; i < attrInfo.length; i++) {
            let tipTxt = ComponentManager.getTextField(attrInfo[i], attrSize, TextFieldConst.COLOR_BROWN);
            if (PlatformManager.checkIsThSp() && String(skinId) == "2241"){
                tipTxt.x = (Number(i) % 2 == 0 ? 10 : 280);
            }
            else{
                tipTxt.x = (Number(i) % 2 == 0 ? 15 : 285);
            }
            
            tipTxt.y = Math.floor(Number(i) / 2) * 20 + (Math.floor(Number(i) / 2) + 1) * 11;
            group.addChild(tipTxt);
        }

        let mask = BaseBitmap.create(`public_alphabg`);
        mask.alpha = 0;
        mask.width = group.width;
        mask.height = group.height;
        group.addChild(mask);

        let scrollView = ComponentManager.getScrollView(group, new egret.Rectangle(0,0, descBg.width, descBg.height - 2));
        scrollView.setPosition(descBg.x, descBg.y);
        container.addChild(scrollView);

        let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, descBg.y+descBg.height + 5);
        container.addChild(buttomTipTxt);

        this.addChild(container);	

        let exchangeBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousegold_skinprocessbg", this.getTypeCode()));
        exchangeBg.width += 4;
        container.addChild(exchangeBg);
        exchangeBg.setPosition(container.width/2 - exchangeBg.width/2, bg.y + bg.height - exchangeBg.height);        

        let itemicon = BaseLoadBitmap.create("itemicon" + itemCfg.id);
        itemicon.width = 70;
        itemicon.height = 70;
        itemicon.setPosition(buttomBg.x+7, buttomBg.y - itemicon.height-10);

        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 315);
        this._progress.setPosition(itemicon.x + itemicon.width-15, itemicon.y + 20);
        container.addChild(this._progress);
        container.addChild(itemicon);

        let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acMouseGoldExchangeBtnTxt", () => {
            if (!this.vo.isStart) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (this._progress.getPercent() < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acMouseGoldExchangeNoTxt"));
                return;
            }
            NetManager.request(NetRequestConst.REQUEST_ACMOUSEGOLD_EXCHANGE, { activeId: this.vo.aidAndCode });
        }, this);
        btn.setPosition(this._progress.x + this._progress.width +5, this._progress.y-10);
        container.addChild(btn);	

        this.freshProcess();         
    }
	private freshProcess():void
	{
        let change:string = this.cfg.exchange.needItem;
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
    protected dealAttrChangeInfo(skinId: string) {
		let skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
		// let skinCfg = GameConfig.config.wifeskinCfg[this._curSkinId];
		let resultStr: string[] = [];
		let atkAdd = skinCfg.atkAdd;
		let inteAdd = skinCfg.inteAdd;
		let politicsAdd = skinCfg.politicsAdd;
		let charmAdd = skinCfg.charmAdd;
		let wifeIntimacy = skinCfg.wifeIntimacy;
		let wifeGlamour = skinCfg.wifeGlamour;
		let childReduce = skinCfg.childReduce;
		let searchReduce = skinCfg.searchReduce;
		let wifeReduce = skinCfg.wifeReduce;
		let atkAdd2 = skinCfg.atkAdd2;
		let inteAdd2 = skinCfg.inteAdd2;
		let politicsAdd2 = skinCfg.politicsAdd2;
		let charmAdd2 = skinCfg.charmAdd2;


		if (atkAdd){
			if (atkAdd[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1]]));
			} else if (atkAdd[0] == 2){
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [atkAdd[1] * 100 + "%"]));
			}else if (atkAdd[0] == 3){
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd14", [atkAdd[1]]));
			}else if (atkAdd[0] == 4){
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd14", [atkAdd[1] * 100 + "%"]));
			}
		}

		if (inteAdd){
			if (inteAdd[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1]]));
			} else if (inteAdd[0] == 2){
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [inteAdd[1] * 100 + "%"]));
			}else if (inteAdd[0] == 3){
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd15", [inteAdd[1]]));
			}else if (inteAdd[0] == 4){
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd15", [inteAdd[1] * 100 + "%"]));
			}
		}

		if (politicsAdd){
			if (politicsAdd[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1]]));
			} else if (politicsAdd[0] == 2){
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [politicsAdd[1] * 100 + "%"]));
			}else if (politicsAdd[0] == 3){
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd16", [politicsAdd[1]]));
			}else if (politicsAdd[0] == 4){
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd16", [politicsAdd[1] * 100 + "%"]));
			}
		}

		if (charmAdd){
			if (charmAdd[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1]]));
			} else if (charmAdd[0] == 2){
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [charmAdd[1] * 100 + "%"]));
			}else if (charmAdd[0] == 3){
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd17", [charmAdd[1]]));
			}else if (charmAdd[0] == 4){
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd17", [charmAdd[1] * 100 + "%"]));
			}
		}

		let wifeCfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
		let servantName = LanguageManager.getlocal("servant_name"+wifeCfg.servantId);
		if (atkAdd2)
		{
			if (atkAdd2[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd10", [servantName,atkAdd2[1]]));
			} else {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd10", [servantName,atkAdd2[1] * 100 + "%"]));
			}
		}
		
		if (inteAdd2)
		{
			if (inteAdd2[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd11", [servantName,inteAdd2[1]]));
			} else {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd11", [servantName,inteAdd2[1] * 100 + "%"]));
			}
		}

		if (politicsAdd2)
		{
			if (politicsAdd2[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd12", [servantName,politicsAdd2[1]]));
			} else {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd12", [servantName,politicsAdd2[1] * 100 + "%"]));
			}
		}
		
		if (charmAdd2)
		{ 
			if (charmAdd2[0] == 1) {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd13", [servantName,charmAdd2[1]]));
			} else {
				resultStr.push(LanguageManager.getlocal("acTailAttrAdd13", [servantName,charmAdd2[1] * 100 + "%"]));
			}
		}	

		if (wifeIntimacy && wifeIntimacy > 0) {
			resultStr.push(LanguageManager.getlocal("acTailAttrAdd5", [wifeIntimacy.toString()]));
		}
		if (wifeGlamour && wifeGlamour > 0) {
			resultStr.push(LanguageManager.getlocal("acTailAttrAdd6", [wifeGlamour.toString()]));
		}
		if (childReduce && childReduce > 0) {
			resultStr.push(LanguageManager.getlocal("acTailAttrAdd7", [childReduce.toString()]));
		}
		if (searchReduce && searchReduce > 0) {
			resultStr.push(LanguageManager.getlocal("acTailAttrAdd8", [searchReduce.toString()]));
		}
		if (wifeReduce && wifeReduce > 0) {
			resultStr.push(LanguageManager.getlocal("acTailAttrAdd9", [wifeReduce.toString()]));
		}

		return resultStr;
    }
    private get cfg():Config.AcCfg.MouseGoldCfg{
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
	
    private get vo():AcMouseGoldVo{
        return <AcMouseGoldVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    public dispose(){
        super.dispose();
        this._progress = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.freshProcess, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACMOUSEGOLD_EXCHANGE, this.changeHandle, this);         
    }
}