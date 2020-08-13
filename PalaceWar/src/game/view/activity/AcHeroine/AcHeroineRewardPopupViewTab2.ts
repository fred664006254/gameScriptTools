/**
 * 巾帼英雄衣装奖励
 * date 2019.11.11
 */
class AcHeroineRewardPopupViewTab2 extends AcCommonViewTab{
    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 532;
		bg.height = 700;
		bg.setPosition(34, 50);
        this.addChild(bg);

        let topMsg = LanguageManager.getlocal("acHeroineClothesTopMsg-"+this.code);
        let container = this.getSkinView(""+this.cfg.show2, null, topMsg, null, -5);   
        container.setPosition(bg.x + 5, bg.y + 5);
        this.addChild(container);
    }

    public getSkinView(skinId:string, bgName:string, topMsg:string, scale?:number, offY?:number):BaseDisplayObjectContainer{
        let view = this;
        let container = new BaseDisplayObjectContainer();
        container.width = 544;
        
        let skinCfg:any = Config.WifeskinCfg.getWifeCfgById(skinId);
        let isWifeskin = false;
        let bgStr = "acthrowarrowview_wifeskinbg";
        if(skinCfg){
            isWifeskin = true;
            bgStr = "acthrowarrowview_wifeskinbg";
        }
        else{
            // bgStr = "luckdrawshowbg-1";
            bgStr = "acthrowarrowview_wifeskinbg";
            skinCfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
        }
        if (bgName){
            bgStr = bgName;
        }
        let bg = BaseLoadBitmap.create(bgStr);
        bg.width = 532;
        bg.height = 400;
        container.addChild(bg);

        let rect = new egret.Rectangle(0,0, bg.width, bg.height - 5);
        let maskContan = new BaseDisplayObjectContainer();
        maskContan.width = bg.width;
        maskContan.height = bg.height;
        maskContan.mask = rect;
        maskContan.setPosition(bg.x, bg.y - 2);
        container.addChild(maskContan);

		if(isWifeskin){
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
                    wife.setScale(0.53);  //0.53
                }
				wife.anchorOffsetY = wife.height;
				wife.anchorOffsetX = wife.width / 2;
				wife.x = maskContan.width / 2;
                wife.y = maskContan.y + maskContan.height - 12;
                if (offY){
                    wife.y += offY;
                }
				wife.mask = new egret.Rectangle(-354,-665,914,685);
				maskContan.addChild(wife);
			}
			else {
				wife = BaseLoadBitmap.create(skinCfg.body);
				wife.width = 640;
				wife.height = 840;
                wife.setScale(0.45);
				wife.anchorOffsetY = wife.height;
				wife.anchorOffsetX = wife.width / 2;
				wife.x = maskContan.width / 2;
				wife.y = maskContan.y + maskContan.height;
				maskContan.addChild(wife);
			}
			
			let skinnamebg = BaseBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 30);
			container.addChild(skinnamebg);

			let skinNameTxt = ComponentManager.getTextField(skinCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
			container.addChild(skinNameTxt);

            let wifecfg = Config.WifeCfg.getWifeCfgById(skinCfg.wifeId);
			let wifeNameTxt = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
			wifeNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - wifeNameTxt.width / 2, skinNameTxt.y + 28);
			container.addChild(wifeNameTxt);

			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 530;
            buttomBg.height = 276;
			buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height - 3);
			container.addChild(buttomBg);

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 525;
			buttomBg2.height = 274;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
			container.addChild(buttomBg2);

            //佳人皮肤描述
			let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			skinTipTxt.width = 480;
			skinTipTxt.lineSpacing = 3;
			skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2, buttomBg2.y + 20);
			container.addChild(skinTipTxt);

			let descBg = BaseBitmap.create(`public_9_managebg`);
			descBg.width = 505;
			descBg.height = 120;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, skinTipTxt, [0,skinTipTxt.textHeight + 10]);
			container.addChild(descBg);

            //皮肤属性
			let addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinId, true);
			//getWifeSkinProAdd
			let txt = [
				{
					txtKey:"skinLvuptxt2",
					value: addValues[0] ,
				},
				{
					txtKey:"skinLvuptxt3",
					value: addValues[1] ,
				},
				{
					txtKey:"skinLvuptxt4",
					value: addValues[2] ,
				},
				{
					txtKey:"skinLvuptxt5",
					value: addValues[3] ,
				},
				{
					txtKey:"skinLvuptxt6",
					value: addValues[4] ,
				},
				{
					txtKey:"skinLvuptxt7",
					value: addValues[5] ,
				}
            ];

            let txt1 = [
				{
					txtKey:"wifeSkinAddServantAttr1",
					value: addValues[0] ,
				},
				{
					txtKey:"wifeSkinAddServantAttr2",
					value: addValues[1] ,
				},
				{
					txtKey:"wifeSkinAddServantAttr3",
					value: addValues[2] ,
				},
				{
					txtKey:"wifeSkinAddServantAttr4",
					value: addValues[3] ,
				},
				{
					txtKey:"skinLvuptxt6",
					value: addValues[4] ,
				},
				{
					txtKey:"skinLvuptxt7",
					value: addValues[5] ,
				}
            ];
            let txtArr = txt;
            let servantName = "";
            if (wifecfg.servantId){
                servantName = LanguageManager.getlocal("servant_name"+wifecfg.servantId);
                txtArr = txt1;
            }

			for(let i in txtArr){
				let tmp = txtArr[i];
				let str = String(tmp.value);
				if(Number(i) < 4 && tmp.value == 0){
					str = addValues[Number(i) + 6] * 100 + "%";
                }
                let tipStr = "";
                if (servantName && Number(i) < 4){
                    tipStr = LanguageManager.getlocal(tmp.txtKey, [servantName, str]);
                }
                else{
                    tipStr = LanguageManager.getlocal(`${tmp.txtKey}`)+`：<font color=0x3e9b00>+${str}</font>`;
                }
				let tipTxt = ComponentManager.getTextField(tipStr, 20, TextFieldConst.COLOR_BLACK);
				tipTxt.x = descBg.x + (Number(i) % 2 == 0 ? 15 : 285);
				tipTxt.y = descBg.y + Math.floor(Number(i) / 2) * 20 + (Math.floor(Number(i) / 2) + 1) * 15;
				container.addChild(tipTxt);
			}

			let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("skin_servantInTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 28);
			container.addChild(buttomTipTxt);
		}
		else{
			let boneName = undefined;
			if (skinCfg && skinCfg.bone) {
				boneName = skinCfg.bone + "_ske";
			}
			if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
				let servantIcon = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                if (scale){
                    servantIcon.setScale(scale);
                }
                else{
                    servantIcon.setScale(0.7);  //0.8
                }
				servantIcon.anchorOffsetY = servantIcon.height;
				servantIcon.anchorOffsetX = servantIcon.width / 2;
				servantIcon.x = maskContan.width / 2;
                servantIcon.y = maskContan.y + maskContan.height - 5;//-5
                if (offY){
                    servantIcon.y += offY;
                }
				maskContan.addChild(servantIcon);
			}
			else {
				let skinImg = BaseLoadBitmap.create(skinCfg.body);
				skinImg.width = 405;
				skinImg.height = 467;
				skinImg.anchorOffsetY = skinImg.height;
				skinImg.anchorOffsetX = skinImg.width / 2;
				skinImg.setScale(0.75);
				skinImg.x = maskContan.width / 2;
				skinImg.y = maskContan.y + maskContan.height - 2;
				maskContan.addChild(skinImg);
            }
	
			let skinnamebg = BaseBitmap.create("skin_detail_namebg");
			skinnamebg.setPosition(bg.x, bg.y + 30);
			container.addChild(skinnamebg);
	
			let skinNameTxt = ComponentManager.getTextField(skinCfg.getSkinName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
			skinNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - skinNameTxt.width / 2, skinnamebg.y + 33);
			container.addChild(skinNameTxt);
            
            let servantCfg = Config.ServantCfg.getServantItemById(skinCfg.servantId);
			let servantNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_BUTTON_COMMON);
			servantNameTxt.setPosition(skinnamebg.x + skinnamebg.width / 2 - servantNameTxt.width / 2, skinNameTxt.y + 28);
			container.addChild(servantNameTxt);
	
			let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
			buttomBg.width = 536;
			buttomBg.height = 295;
			buttomBg.setPosition(container.width / 2 - buttomBg.width / 2, bg.y + bg.height - 3);
            container.addChild(buttomBg);
            buttomBg.visible = false;

			let buttomBg2 = BaseBitmap.create("public_9_bg14");
			buttomBg2.width = 540; // 525
			buttomBg2.height = 289;
			buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2-5, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2 - 4);
			container.addChild(buttomBg2);
	
			let skinTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("servantSkinEffect" + skinCfg.id), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
			skinTipTxt.width = 480;
			skinTipTxt.lineSpacing = 3;
			skinTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - skinTipTxt.width / 2-5, buttomBg2.y + 20);
			container.addChild(skinTipTxt);
	
			let addAbility = skinCfg.addAbility;
			for (let index = 0; index < addAbility.length; index++) {
				let bnode = new ServantChangeSkinBookItem();
				bnode.initItem(index,addAbility[index], [skinCfg.id]);
				bnode.setPosition(skinTipTxt.x -10 + index%2*245, skinTipTxt.y + skinTipTxt.height + 15+ Math.floor(index/2)*92);
				container.addChild(bnode);
            }

			let titleEff = App.CommonUtil.getServantSkinFlagById(skinCfg.id);
            if (titleEff){
                titleEff.setPosition(bg.x + bg.width/2 - titleEff.width/2-5, bg.y + bg.height - titleEff.height - 10);
                container.addChild(titleEff);
            }
        }
        if (topMsg){
            let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
            topbg.width = 530;
            topbg.height = 36;
            topbg.setPosition(container.width / 2 - topbg.width / 2-5, 0);
            container.addChild(topbg);

            let topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
            container.addChild(topDesc);
        }
        return container;
    }

    private get cfg():Config.AcCfg.HeroineCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcHeroineVo{
        return <AcHeroineVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
		}
		else if (this.code == "4"){
            return "3";
        }
        else if (this.code == "6"){
            return "5";
        }
        else if (this.code == "8"){
            return "7";
        }
        else if (this.code == "10"){
            return "9";
        }
        return this.code;
    }

    public dispose():void{

        super.dispose();
    }
}