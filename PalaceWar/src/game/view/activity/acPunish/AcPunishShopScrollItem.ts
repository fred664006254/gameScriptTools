/**
 * 拳霸天下 shopItem
 * author ycg
 * date 2019.9.25
 * @class AcPunishShopScrollItem
 */
class AcPunishShopScrollItem extends ScrollListItem{
    private _code:string = null;
    private _aid:string = null;
    private _dragProgressBar:DragProgressBar = null;
    private _numBg:BaseBitmap = null;
    private _selectedNumTF:BaseTextField = null;
    private _dragMaxNum:number = 0;
    private _useNum:number = 1;
    private _data:any = null;
    private _vo:any = null;

    private _itemIndex:number;
    private _buyButton:BaseButton = null;

    public constructor(){
        super();
    }

    public initItem(index:number, data:any, param:any):void{
        this._itemIndex = index;
        this._aid = param.aid;
        this._code = param.code;
        this._data = data;
        let type = param.type;
        let vo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        this._vo = vo;

        let itemData = data.data;
        let itemBg = BaseBitmap.create("public_9_bg14");
        itemBg.width = 530;
        this.addChild(itemBg);
        let itemCfg:any = null;
        let itemIcon:BaseDisplayObjectContainer = null;
        let itemName:BaseTextField = null;
        if (type == 2){
            itemCfg = GameData.formatRewardItem(itemData.sell)[0];
            itemIcon = GameData.getItemIcon(itemCfg, true);
            itemIcon.getChildByName("numLb").visible = false;
            if (itemIcon.getChildByName("numbg"))
            {
                itemIcon.getChildByName("numbg").visible = false;
            }
            itemName = ComponentManager.getTextField(itemCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, itemCfg.nameColor);
        }
        else{
            // App.LogUtil.log("itemdata.ite: "+itemData.item+"  type: "+type);
            itemCfg = Config.ItemCfg.getItemCfgById(itemData.item);
            itemIcon = itemCfg.getIconContainer(true);
            itemName = itemCfg.nameTxt;
        }
        itemBg.height = 148;
		itemIcon.setPosition(20, 20);
		itemIcon.name = "icon";
        this.addChild(itemIcon);
        
        let itemNameBg = BaseBitmap.create("public_9_bg15");
        itemNameBg.setPosition(itemIcon.x + itemIcon.width - 3, itemIcon.y);
        this.addChild(itemNameBg);

        // let itemName:BaseTextField = itemCfg.nameTxt;
        itemNameBg.width = 160;
		itemName.setPosition(itemNameBg.x + itemNameBg.width/2 - itemName.width/2, itemNameBg.y + itemNameBg.height/2 - itemName.height/2);
        this.addChild(itemName);
        
        if (type == 0){
            //itemCfg.desc
            let itemDesc = ComponentManager.getTextField(itemCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            itemDesc.setPosition(itemNameBg.x + 8, itemNameBg.y + itemNameBg.height + 4);
            itemDesc.width = 240;
            itemDesc.lineSpacing = 2;
            this.addChild(itemDesc);

            //购买消耗
            let moneyIconStr = "";
            let moneyNum = 0;
            if (itemData.costGold){
                moneyIconStr = "public_icon2";
                moneyNum = itemData.costGold;
            }
            else if (itemData.costGem){
                moneyIconStr = "public_icon1";
                moneyNum = itemData.costGem;
            }

            let btnName = ButtonConst.BTN_SMALL_YELLOW;
            let btnText = "";
            if (!moneyIconStr){
                btnName = ButtonConst.BTN_SMALL_RED;
                btnText = "acPunishBuyItemGoNow";
            }

            let buyBtn = ComponentManager.getButton(btnName, btnText, this.shopBuyBtnClick, this, [index]);
            buyBtn.setPosition(itemBg.width - 15 - buyBtn.width, itemBg.height/2 - 10);
            this.addChild(buyBtn);
            this._buyButton = buyBtn;
            this.checkBtnRed();
            // let state = this._vo.inDayOpenState();
            if (!this._vo.isInActivity()){
                buyBtn.setGray(true);
            }
            else{
                buyBtn.setGray(false);
            }

            if (moneyIconStr){
                let moneyIcon = BaseBitmap.create(moneyIconStr);
                moneyIcon.y = buyBtn.y + buyBtn.height/2 - moneyIcon.height/2;
                this.addChild(moneyIcon);
                let moneyNumInfo = ComponentManager.getTextField(""+moneyNum, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                moneyIcon.x = buyBtn.x + buyBtn.width/2 - moneyIcon.width/2 - moneyNumInfo.width/2;
                moneyNumInfo.setPosition(moneyIcon.x + moneyIcon.width, buyBtn.y + buyBtn.height/2 - moneyNumInfo.height/2);
                this.addChild(moneyNumInfo);
                if (!this._vo.isInActivity()){
                    App.DisplayUtil.changeToGray(moneyIcon);
                    App.DisplayUtil.changeToGray(moneyNumInfo);
                }
                else{
                    App.DisplayUtil.changeToNormal(moneyIcon);
                    App.DisplayUtil.changeToNormal(moneyNumInfo);
                }
            }
            else{
                buyBtn.setColor(TextFieldConst.COLOR_BLACK);
            }

            //购买限制
            if (itemData.buyLimit){
                let maxNum = 0;
                let isNeedVipIcon = false;
                if(typeof(itemData.buyLimit) == "number"){
                    maxNum = itemData.buyLimit;
                }
                else{
                    if(Api.switchVoApi.checkPunishVip()){
                        maxNum = itemData.buyLimit[Math.min(Api.playerVoApi.getPlayerVipLevel(), itemData.buyLimit.length - 1)];
                        isNeedVipIcon = true;
                    }else{
                        maxNum = itemData.buyLimit[0];
                    }
                }

                let usenum = 0;
                if(vo.item[String(index + 1)]){
                    usenum = vo.item[String(index + 1)];
                }
                let num = maxNum - usenum;
                let buyNum = ComponentManager.getTextField(LanguageManager.getlocal("acPunishBuyItemLimit3", [""+num]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                buyNum.x = buyBtn.x + buyBtn.width/2 - buyNum.width/2;
                buyNum.y = buyBtn.y - buyNum.height - 5;
                this.addChild(buyNum);

                if (Api.playerVoApi.getPlayerVipLevel() > 0 && isNeedVipIcon){
                    let vipIcon = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel()).icon);
                    this.addChild(vipIcon);
                    vipIcon.setScale(0.8);
                    vipIcon.setPosition(buyNum.x - 5, buyNum.y - buyNum.height - 7);
                }
            }
            else{
                buyBtn.y = itemBg.y + itemBg.height/2 - buyBtn.height/2 + 5;
            }
        }
        else if (type == 1){
            let itemDesc = ComponentManager.getTextField(itemCfg.desc, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            itemDesc.setPosition(itemNameBg.x + 8, itemNameBg.y + itemNameBg.height + 4);
            itemDesc.width = 240;
            itemDesc.lineSpacing = 2;
            this.addChild(itemDesc);

            let useBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishStoreUse-"+this.getTypeCode(), this.storeUseBtnClick, this, [index]);
            useBtn.setPosition(itemBg.width - 20 - useBtn.width, itemBg.y + 75);
            this.addChild(useBtn);
            //存储上限
            let useLimit = null;
            if (itemData.canUseNum){
                let itemUseNum = vo.getToolUseNum(data.id);
                let currUseNum = itemData.canUseNum - itemUseNum;
                if (currUseNum < 0 ){
                    currUseNum = 0;
                }
                useLimit = ComponentManager.getTextField(LanguageManager.getlocal("acPunishHaveLimit-"+this.getTypeCode(), [""+itemUseNum, ""+itemData.canUseNum]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                useLimit.x = useBtn.x + useBtn.width + 12 - useLimit.width;
                useLimit.y = 20;
                this.addChild(useLimit);
            }
            //增加体力
            if (itemData.getEnergy){
                let addEnergy = ComponentManager.getTextField(LanguageManager.getlocal("acPunishAddEnergy-"+this.getTypeCode(), [""+itemData.getEnergy]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
                addEnergy.x = useBtn.x + useBtn.width/2 - addEnergy.width/2;
                addEnergy.y = useBtn.y - addEnergy.height - 5;
                this.addChild(addEnergy);
                if (useLimit){
                    addEnergy.x = useLimit.x;
                }
            }

            let hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(itemData.item));
            this._dragMaxNum = hasNum;
            let currUseNum = 1;
            if (itemData.canUseNum){
                let itemUseNum = vo.getToolUseNum(data.id);
                currUseNum = itemData.canUseNum - itemUseNum;
                this._dragMaxNum = currUseNum;
                if (hasNum < currUseNum){
                    this._dragMaxNum = hasNum;
                }
            }
            let state = this._vo.inDayOpenState();
            if (hasNum == 0 || currUseNum == 0 || state!= 3){
                useBtn.setGray(true);
            }
            else{
                useBtn.setGray(false);
            }

            let maxNum = this._dragMaxNum;
            let selectNum = 1;
            if (maxNum == 0){
                maxNum = 100000;
                selectNum = 0;
            }
            else{
                selectNum = maxNum;
            }
            //进度条
            this._dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", maxNum, this.dragCallback, this);
            this._dragProgressBar.setPosition(itemIcon.x + 50, itemIcon.y + itemIcon.height + 25);
            this.addChild(this._dragProgressBar);
            itemBg.height += (this._dragProgressBar.height + 20);
            
            this._numBg = BaseBitmap.create("public_9_bg5");
            this._numBg.width = 90;
            this._numBg.setPosition(itemBg.width - 20 - this._numBg.width, this._dragProgressBar.y + this._dragProgressBar.height / 2 - this._numBg.height / 2 - 5);
            this.addChild(this._numBg);

            this._selectedNumTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishStoreUseNum-"+this.getTypeCode(), [""+selectNum, ""+this._dragMaxNum]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
            this._selectedNumTF.setPosition(this._numBg.x + this._numBg.width / 2 - this._selectedNumTF.width / 2,this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2 + 3);
            this.addChild(this._selectedNumTF);
            if (selectNum > 0 ){
                this._dragProgressBar.setDragPercent(selectNum, maxNum);
            }
        }
        else if (type == 2){
            let needScore = ComponentManager.getTextField(LanguageManager.getlocal("acPunishNeedScore-"+this.getTypeCode(), [""+itemData.cost]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            needScore.x = itemNameBg.x + 8;
            needScore.y = itemNameBg.y + itemNameBg.height + 10;
            this.addChild(needScore);
		
            let maxNum = itemData.limit;
            let useNum = 0;
            if(vo.shop[String(index+1)]){
                useNum = vo.shop[String(index+1)];
            }
            let num = maxNum - useNum;
            let iconModel:RewardItemVo = GameData.formatRewardItem(itemData.sell)[0];
            if(index == 0 && Api.servantVoApi.getServantObj(""+iconModel.id))
            {
                num = 0;
            }
            let exchangeNum = ComponentManager.getTextField(LanguageManager.getlocal("acPunishCanChangeNum-"+this.getTypeCode(), [""+num]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            exchangeNum.x = needScore.x;
            exchangeNum.y = needScore.y + needScore.height + 15;
            this.addChild(exchangeNum);

            let exchangeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acPunishChangeBtnName-"+this.getTypeCode(), this.exchangeBtnClick, this, [index]);
            exchangeBtn.setPosition(itemBg.width - 15 - exchangeBtn.width, itemBg.height/2 - exchangeBtn.height/2);
            this.addChild(exchangeBtn);
            if (num > 0 && vo.score >= itemData.cost){
                exchangeBtn.setGray(false);
            }
            else{
                exchangeBtn.setGray(true);
            }
        }
    }

    private checkBtnRed():void
	{
		if(this._itemIndex == 0)
		{	
			let acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
			if (acVo.checkHasGoldenTimes())
			{
				App.CommonUtil.addIconToBDOC(this._buyButton);
			}
			else
			{
				App.CommonUtil.removeIconFromBDOC(this._buyButton);
			}
		}
	}

    /**
	 * 滑动条的监听事件
	 */
	private dragCallback(curNum:number):void
	{
        App.LogUtil.log("dragcall: ** "+curNum);
        this._useNum = curNum;
        if (this._dragMaxNum == 0){
            this._dragProgressBar.setDragPercent(0, 1);
        }
		
		this._selectedNumTF.text = LanguageManager.getlocal("acPunishStoreUseNum-"+this.getTypeCode(), [""+this._useNum, ""+this._dragMaxNum]);
        this._selectedNumTF.x = this._numBg.x + this._numBg.width / 2 - this._selectedNumTF.width / 2;
    }

    //商店购买按钮
    public shopBuyBtnClick(index:number):void{
        // let acVo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        // let state = this._vo.inDayOpenState();
        // if (state == 1){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acPunishNotOpen"));
        //     return;
        // }
        // else if (state == 2 || state == 4){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
        //     return;
        // }
        if (!this._vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        let itemData = this._data.data;
        if(index != 2 && index != 3){
			
			let maxNum = 0;
			if (itemData.buyLimit){
                if(typeof(itemData.buyLimit) == "number"){
                    maxNum = itemData.buyLimit;
                }
                else{
                    if(Api.switchVoApi.checkPunishVip()){
                        maxNum = itemData.buyLimit[Math.min(Api.playerVoApi.getPlayerVipLevel(), itemData.buyLimit.length - 1)];
                    }else{
                        maxNum = itemData.buyLimit[0];
                    }
                }
            }
			
			let num = 0;
			if(this._vo.item[String(index + 1)]){
				num = this._vo.item[String(index + 1)];
			}
			let leftNum = maxNum -num;
			if(!num){
				leftNum = maxNum;
			}
			if(leftNum <= 0)
			{
				if(Api.switchVoApi.checkPunishVip() && index == 1){
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyItemBuyTip2"));
                }
                else{
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishBuyItemBuyTip"));
				}
				return ;
			}

			if(itemData.costGold){
				if(Api.playerVoApi.getPlayerGold() < itemData.costGold)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
					return ;
				}
				
			}else if(itemData.costGem)
			{
				if(Api.playerVoApi.getPlayerGem() < itemData.costGem)
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"));
					return ;
				}
			}
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHITEM, { activeId:this._vo.aidAndCode, itemKey: this._data.id});
		}
		if(index == 2){
			ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB2,{});	
		}
		else if(index == 3)
		{
			if(Api.acVoApi.checkActivityStartByAid("dailyCharge")){
				ViewController.getInstance().openView(ViewConst.COMMON.ACRECHARGEVIEW,{code:"1"});
			}else{
				ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1,{});
			}
		}
    }

    //仓库使用按钮
    public storeUseBtnClick(index:number):void{
        let state = this._vo.inDayOpenState();
        if (state == 1){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishNotOpen"));
            return;
        }
        else if (state == 2 || state == 4){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        App.LogUtil.log("index: "+index);
        let itemData = this._data.data;
        // let vo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (itemData.canUseNum){
            let itemUseNum = this._vo.getToolUseNum(this._data.id);
            if (itemData.canUseNum <= itemUseNum){
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishCanNotUseTool-"+this.getTypeCode()));
                return;
            } 
        }
        let hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(itemData.item));
        if (hasNum <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishNotHaveTool-"+this.getTypeCode()));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_PUNISHADDENERGY,{ activeId: this._vo.aidAndCode, itemKey: this._data.id, useNum: this._useNum});
    }

    //积分兑换按钮
    public exchangeBtnClick(index:number):void{
        if (!this._vo.isStart){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        // let vo = <AcPunishVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        let itemData = this._data.data;
		let maxNum = itemData.limit;
        let useNum = 0;
        if(this._vo.shop[String(index+1)]){
            useNum = this._vo.shop[String(index+1)];
        }
        let num = maxNum - useNum;
        let iconModel:RewardItemVo = GameData.formatRewardItem(itemData.sell)[0];
        if(index == 0 && Api.servantVoApi.getServantObj(""+iconModel.id))
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishServantGet-"+this.getTypeCode()));
            return;
        }

		if(num <= 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
			return ;
		}

		if(itemData.cost > this._vo.score){
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip2"));
			return ;
		}
		
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_BUYPUNISHSHOP, { activeId: this._vo.aidAndCode, itemKey: this._data.id});
    }

    public getTypeCode():string{
        if (this._code == "13"){
            return "12";
        }
        return this._code;
    }

    public getSpaceY():number {
		return 5;
	}

    public dispose():void{
        this._dragProgressBar = null;
        this._aid = null;
        this._code = null;
        this._numBg = null;
        this._selectedNumTF = null;
        this._data = null;
        this._dragMaxNum = 0;
        this._useNum = 0;
        this._vo = null;
        this._itemIndex = null;
		this._buyButton = null;

        super.dispose();
    }
}