/**
 * 情缘 奖励item
 * author ycg
 * date 2020.4.7
 * @class QingyuanNewItemRewardTab1
 */
class QingyuanNewItemRewardTab1 extends CommonViewTab{

    public constructor(data?:any){
        super();
        this.param = data;
        this.initView();
    }

    public initView():void{
        this.width = 620;
        let offH = 0;
        let offY = 0
        let data = this.param.data.collect;
        let isOpen = this.param.data.collectOpen;
        App.LogUtil.log("tab1 "+isOpen);
        let len = 1;
        if (isOpen){
            len = data.length;
        }
        let sortData = Api.encounterVoApi.getSortProcessData(this.param.data.type, data);
        for (let i=0; i < len; i++){
            let container = this.getItemContainer(sortData[i]);
            container.setPosition(this.width/2 - container.width/2, offY);
            offY = container.height + offY;
            this.addChild(container);
        }

        let openBtnImg = isOpen ? "qingyuannew_itemoffbtn" : "qingyuannew_itemopenbtn";
        let openBtn = ComponentManager.getButton(openBtnImg, "", ()=>{
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ENCOUNTER_FRESHUI, {type: this.param.data.type, tabType: 1, isFreshData: true});
        }, this);
        this.addChild(openBtn);
        openBtn.setPosition(this.width - openBtn.width - 20, -openBtn.height + 40);

        this.height = offY;
    }

    public getItemContainer(itemData:any):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        container.width = 620;
        let titleBg = BaseBitmap.create("qingyuannew_gearitemtitlebg");
        titleBg.setPosition(container.width/2 - titleBg.width/2, 0);
        container.addChild(titleBg);

        let have = Api.encounterVoApi.getActiveBuffNum(this.param.data.type);
        let currNum = Api.encounterVoApi.getCurrHaveNum(this.param.data.type);
        let showNum = currNum;
        if (currNum > itemData.task_Value){
            showNum = itemData.task_Value;
        }
        let numTitleStr = LanguageManager.getlocal("qingyuantasktitlenum"+itemData.index);
        let currHaveNumKey = "qingyuantaskprocess1";
        if (currNum >= itemData.task_Value){
            currHaveNumKey = "qingyuantaskprocess2";
        }
        let currNumStr = LanguageManager.getlocal(currHaveNumKey, [""+currNum, ""+itemData.task_Value]);
        let titleTxt = ComponentManager.getTextField(numTitleStr + LanguageManager.getlocal(`qingyuantasktype`+itemData.type + "_"+this.param.data.kind, [""+itemData.task_Value]) + currNumStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.setPosition(titleBg.x + 35, titleBg.y + titleBg.height/2 - titleTxt.height/2);
        container.addChild(titleTxt);

        let isOpen = this.param.data.collectOpen;
        if (!isOpen){
            container.height = titleBg.y + titleBg.height + 15;
            return container;
        }
        
        let txtcolor = have >= itemData.id ? TextFieldConst.COLOR_BROWN : TextFieldConst.COLOR_BROWN;
        let strarr = this.getAddStr(itemData.data);
        // console.log(itemData.data);
        // console.log(strarr);
        if (strarr.length > 0){
            let rewardTitle = ComponentManager.getTextField(LanguageManager.getlocal("qingyuantaskreward"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
            rewardTitle.setPosition(titleBg.x + 35, titleBg.y + titleBg.height + 15);
            container.addChild(rewardTitle);
        }

        let attrSize = TextFieldConst.FONTSIZE_ACTIVITY_COMMON;
        if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsRuLang() || PlatformManager.checkIsThSp()){
            attrSize = 16;
        }
        let offY = 0;
		for(let i in strarr){
			let isdouble = Number(i) % 2 == 0;
			let addtxt = ComponentManager.getTextField(strarr[i], attrSize, txtcolor);
			// addtxt.x = isdouble ? 30 : (container.width - addtxt.width - 30);
            // addtxt.y = titleBg.y + titleBg.height + 10 + Math.floor(Number(i) / 2) * 30 + 5;
            // addtxt.x = titleBg.x + 35;
            // addtxt.y = titleBg.y + titleBg.height + 15  + 25 + Number(i) * 30 + 5;
            addtxt.x = isdouble ? titleBg.x + 35 : titleBg.x + titleBg.width/2 + 50 - 15;
            addtxt.y = titleBg.y + titleBg.height + 15  + 25 + Math.floor(Number(i) / 2) * 30 + 5;
			addtxt.name = `str${i}`;
            container.addChild(addtxt);
            offY = addtxt.y + addtxt.height;
        }
        if (itemData.reward){
            if (offY == 0){
                offY = titleBg.y + titleBg.height - 5;
            }
            let rewardIcons = GameData.getRewardItemIcons(itemData.reward, true, true);
            let rowCount = 5;
            let count = Math.ceil(rewardIcons.length / rowCount) * rowCount;
            let scale = 0.9;
            let spaceX = 12;
            let spaceY = 10;
            let itemHeight = 108;
            let itemWidth = 108;
            for(let i=0; i < count; i++){
                let rewardDB:any = null;
                if (rewardIcons[i]){
                    rewardDB = rewardIcons[i];
                }
                else{
                    rewardDB = BaseBitmap.create("itembg_0");
                }
                rewardDB.setScale(scale);
                rewardDB.setPosition(titleBg.x + 34 + ((rewardDB.width * scale + spaceX) * (i % rowCount)), offY + 20 + ((rewardDB.height * scale + spaceY) * Math.floor(i / rowCount)));
                container.addChild(rewardDB);
            }
            offY = offY + 30 + (rewardIcons.length % rowCount == 0 ? rewardIcons.length / rowCount : Math.ceil(rewardIcons.length / rowCount)) * (itemHeight * scale + spaceY) - spaceY;
        }
        else{
            offY = offY + 10;
        }
        container.height = offY + 20 + 60;

        let collectBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", ()=>{
            let getIndex = Api.encounterVoApi.getCurrCanGetIndex(this.param.data.type);
            App.LogUtil.log("getIndex "+getIndex);
            if (getIndex){
                NetManager.request(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE,{
                    encounterId: this.param.data.type,
                    eIndex : getIndex
                });
            }
        }, this);
        container.addChild(collectBtn);
        
        // collectBtn.setPosition(container.width - collectBtn.width - 30, titleBg.y + titleBg.height + (container.height - titleBg.y - titleBg.height)/2 - collectBtn.height/2);
        collectBtn.setPosition(container.width/2 - collectBtn.width/2, container.height - 15 - collectBtn.height);

        let collectFlag = BaseBitmap.create("collectflag");
        collectFlag.setScale(0.65);
        collectFlag.setPosition(container.width/2 - collectFlag.width * collectFlag.scaleX/2, container.height - 0 - collectFlag.height * collectFlag.scaleY);
        // collectFlag.setPosition(container.width - collectFlag.width * collectFlag.scaleX - 25, collectBtn.y + collectBtn.height/2 - collectFlag.height * collectFlag.scaleY/2);
        container.addChild(collectFlag);

        if (Number(itemData.id) <= have){
            //已领取
            collectBtn.visible = false;
            collectFlag.visible = true;
        }
        else{
            collectFlag.visible = false;
            if (currNum > have && Number(itemData.id) <= currNum){
                if ((have + 1) == Number(itemData.id)){
                    //可领取
                    collectBtn.setEnable(true); 
                }
                else{
                    collectBtn.setEnable(false);
                }
            }
            else{
                //不可领取
                collectBtn.setEnable(false);
            }
        }
        return container;
    }

    private getAddStr(data:any):string[]{
        let dataList = data;
        let attrstring = [`strength`, `intelligence`,`politics`,`charm`,`all`,`strength_Constant`,`intelligence_Constant`,
            `politics_Constant`,`charm_Constant`,`all_Constant`,`wife_Intimacy`,`wife_Charm`,`wife_exp`,`wife_Child`];
        let strarr = [];
        for (let i=0; i < dataList.length; i++){
            let name = ``;
            let sid = dataList[i].id;
			if(Config.ServantCfg.getServantItemById(sid)){
				name = Config.ServantCfg.getServantItemById(sid).name;
			}
			else if(Config.WifeCfg.getWifeCfgById(sid)){
				name = Config.WifeCfg.getWifeCfgById(sid).name;
            }
            else if (Config.ServantskinCfg.getServantSkinItemById(sid)){
                name = Config.ServantskinCfg.getServantSkinItemById(sid).name;
            }
            else if (Config.WifeskinCfg.getWifeCfgById(sid)){
                name = Config.WifeskinCfg.getWifeCfgById(sid).name;
            }
			let unit : Config.EncounterCfg.EncounterAddCfg = dataList[i];
			for(let k in attrstring){
				let attrstr = attrstring[k];
				let num = unit[attrstr];
				if(num > 0){
					//处理
					if(num < 1){
						num *= 100;
					}
					strarr.push(
						`${name}${LanguageManager.getlocal(`qingyuanadd${attrstr}`, [num.toString()])}`
					);
				}
            }
            
            if (unit.specialType){
                let num = App.StringUtil.changeIntToText2(unit.specialValue);
                strarr.push(`${name}${LanguageManager.getlocal(`qingyuanspecailadd${unit.specialType}`, [num.toString()])}`);
            }
        }
        let childall = this.data.all_Child;
		if(childall){
			if(childall < 1){
				childall *= 100;
			}
			strarr.push(
				`${LanguageManager.getlocal(`qingyuanaddall_Child`, [childall.toString()])}`
			);
		}

		// if(this.data.reward){
		// 	let rewardvo = GameData.formatRewardItem(this.data.reward)[0];

		// 	strarr.push(
		// 		`${LanguageManager.getlocal(`qingyuanaddgetrewards`, [rewardvo.itemType, rewardvo.name, rewardvo.num.toString()])}`
		// 	);
			
        // }
        return strarr;
    }

    private activateCallback(evt : egret.Event) : void{
        let view = this;
        if(evt.data.ret){
            // let rData = evt.data.data.data;
            // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ENCOUNTER_MODEL);
            // if(rData.rewards){
            //     let rewardList =  GameData.formatRewardItem(rData.rewards);
            //     App.CommonUtil.playRewardFlyAction(rewardList);
            // }
            // if (rData.replacerewards) {
            //     ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
            // }
        }
    }

    private get data():any{
        return this.param.data;
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ENCOUNTER_ACTIVATE, this.activateCallback, this);
        super.dispose();
    }
}