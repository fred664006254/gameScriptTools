/**
 * 衣装预览
 * date 2020.7.8
 * @class AcSeaWomanPopViewTab3
 */
class AcSeaWomanPopViewTab3 extends CommonViewTab{
    private _exchangeContainer:BaseDisplayObjectContainer = null;

    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_AC_SEAWOMANEXCHANGE, this.exchangeCallback, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_AC_SEAWOMANGETCHESSNUM , this.getRewardCallback, this);
        let view = this;

        let rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 695;
        rewardBg.setPosition(26, 53);
        this.addChild(rewardBg);

        let container = new BaseDisplayObjectContainer();
        container.width = 530;
        this.addChild(container);
        container.x = rewardBg.x;
        container.y = 57;
        
        let rewardstr:string = this.cfg.change["getItem"];
        let rewardvo = GameData.formatRewardItem(rewardstr)[0];
        let skinId = String(rewardvo.id);
        let skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        let bg = BaseBitmap.create("acthrowarrowview_wifeskinbg"); //544 400  522 393
        container.addChild(bg);
        let bgMask = new egret.Rectangle(18, 4, 522, 393);
        bg.mask = bgMask;
        bg.x = container.width/2 - bg.width/2 - 7;
        bg.y = -4;

        let rect = new egret.Rectangle(0,0,522,364);
        let maskContan = new BaseDisplayObjectContainer();
        maskContan.width = 522; // 544
        maskContan.height = 364;
        maskContan.mask =rect;
        maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 29);
        container.addChild(maskContan);

        let boneName = undefined;
        if (skinCfg && skinCfg.bone) {
            boneName = skinCfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            let servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
            servantIcon.setScale(0.6);
            servantIcon.anchorOffsetY = servantIcon.height;
            servantIcon.anchorOffsetX = servantIcon.width / 2;
            servantIcon.x = maskContan.width / 2;
            servantIcon.y = maskContan.y + maskContan.height - 6;//-5
            maskContan.addChild(servantIcon);
        }
        else {
            let skinImg = BaseLoadBitmap.create(skinCfg.body);
            skinImg.width = 640;
            skinImg.height = 840;
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.setScale(0.45);
            skinImg.x = maskContan.width / 2;
            skinImg.y = maskContan.y + maskContan.height - 5;
            maskContan.addChild(skinImg);
        }
	
        let skinnamebg = BaseBitmap.create("skin_detail_namebg");
        skinnamebg.setPosition(bg.x + 14, bg.y + 35);
        container.addChild(skinnamebg);

        let skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
        skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
        container.addChild(skinNameTxt);
        
        let skinTitle = App.CommonUtil.getWifeSkinFlagById(skinId);
        if (skinTitle){
            skinTitle.setPosition(bg.x + bg.width/2 - skinTitle.width/2, bg.y + bg.height - skinTitle.height - 60);
            container.addChild(skinTitle);
        }

        let wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
        let wifeNameTxt = ComponentManager.getTextField(wifecfg.getName(false), TextFieldConst.FONTSIZE_BUTTON_COMMON);
        wifeNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - wifeNameTxt.width / 2, skinNameTxt.y + 28);
        container.addChild(wifeNameTxt);

        let buttomBg2 = BaseBitmap.create("public_popupscrollitembg");
        buttomBg2.width = 522; //525
        buttomBg2.height = 286; //274
        buttomBg2.setPosition(container.width / 2 - buttomBg2.width / 2, bg.y + bg.height + 3);
        container.addChild(buttomBg2);

        //佳人皮肤描述
        let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        skinTipTxt.width = 480;
        skinTipTxt.lineSpacing = 3;
        skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
        container.addChild(skinTipTxt);

        // let descBg = BaseBitmap.create(`public_9_managebg`);
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
        buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 10);
        container.addChild(buttomTipTxt);
	
        let topbg = BaseBitmap.create("ackite_skintopbg");
        topbg.setPosition(container.width / 2 - topbg.width / 2, 1);
        container.addChild(topbg);

        let toolItemVo = this.vo.getShowSkinData();
        let topStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acSeaWomanSkinTopMsg", this.getTypeCode()), [""+toolItemVo.num, toolItemVo.name]);
        let topDesc = ComponentManager.getTextField(topStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 +2);
        container.addChild(topDesc);

        let topbgLine = BaseBitmap.create("ackite_skintopline");
        topbgLine.setPosition(container.width / 2 - topbgLine.width / 2, topbg.y + topbg.height);
        container.addChild(topbgLine);


        let exchangeContainer = new BaseDisplayObjectContainer();
        container.addChild(exchangeContainer);
        this._exchangeContainer = exchangeContainer;

        let exchangeBg = BaseBitmap.create(App.CommonUtil.getResByCode("acmousecome_skinprocessbg", this.getTypeCode()));
        exchangeContainer.addChild(exchangeBg);
        exchangeContainer.width = exchangeBg.width;
        exchangeContainer.height = exchangeBg.height;
        exchangeContainer.setPosition(container.width/2 - exchangeBg.width/2, bg.y + bg.height - exchangeBg.height);

        let toolIcon = BaseLoadBitmap.create(toolItemVo.icon);
        toolIcon.width = 100;
        toolIcon.height = 100;
        toolIcon.setScale(0.7);
        toolIcon.setPosition(10, exchangeContainer.height/2 - toolIcon.height * toolIcon.scaleY /2 - 5);

        let progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 300);
        progress.setPosition(toolIcon.x + toolIcon.width * toolIcon.scaleX - 15, exchangeContainer.height/2 - progress.height/2);
        exchangeContainer.addChild(progress);
        exchangeContainer.addChild(toolIcon);
        progress.name = "progress";

        let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "exchange", this.exchangeBtnClick, this);
        exchangeBtn.setPosition(exchangeContainer.width - exchangeBtn.width - 5, exchangeContainer.height/2 - exchangeBtn.height/2);
        exchangeContainer.addChild(exchangeBtn); 
        exchangeBtn.name = "exchangeBtn";
        let toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        let currNum = 0;
        if (toolData){
            currNum = toolData.num;
        }
        if (currNum < toolItemVo.num){
            exchangeBtn.setEnable(false);
        }

        progress.setPercentage(currNum / toolItemVo.num);
        progress.setText(""+currNum + "/"+toolItemVo.num);
    
    }

    private exchangeBtnClick():void{

        if(this.vo.isEnd){
            App.CommonUtil.showTip(LanguageManager.getlocal(`acPunishEnd`));
            return;
        }

        let toolItemVo = this.vo.getShowSkinData();
        let toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        let currNum = 0;
        if (toolData){
            currNum = toolData.num;
        }
        if (currNum >= toolItemVo.num){
            //兑换
            NetManager.request(NetRequestConst.REQUEST_AC_SEAWOMANEXCHANGE, {activeId: this.vo.aidAndCode});
        }
    }

    private exchangeCallback(evt: egret.Event){
        if (!evt.data.ret){
            return ;
        }
        let rData = evt.data.data.data;
        let rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }

        this.getRewardCallback();
    }

    private getRewardCallback():void{
        let toolItemVo = this.vo.getShowSkinData();
        let toolData = Api.itemVoApi.getItemInfoVoById(toolItemVo.id);
        let currNum = 0;
        if (toolData){
            currNum = toolData.num;
        }
        let progress = <ProgressBar>this._exchangeContainer.getChildByName("progress");
        progress.setPercentage(currNum / toolItemVo.num);
        progress.setText(""+currNum+"/"+toolItemVo.num);
        let exchangeBtn = <BaseButton>this._exchangeContainer.getChildByName("exchangeBtn");
        if (currNum < toolItemVo.num){
            exchangeBtn.setEnable(false);
        }
        else{
            exchangeBtn.setEnable(true);
        }
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

    private get cfg() : Config.AcCfg.SeaWomanCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcSeaWomanVo{
        return <AcSeaWomanVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private getTypeCode():string{
        return this.param.data.uicode;
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_AC_SEAWOMANEXCHANGE, this.exchangeCallback, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_AC_SEAWOMANGETCHESSNUM , this.getRewardCallback, this);
        this._exchangeContainer = null;
        super.dispose();
    }
}