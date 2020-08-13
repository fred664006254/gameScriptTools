/**
  * 任务item
  * author weixiaozhe
  * date 2020.5.12
  * @class AcAggregationTaskItem
  */
 class AcAggregationTaskItem extends ScrollListItem {
	private _itemData:any= null;
    private _aid:string = null;
    private _code:string = null;
	public constructor() {
		super();
    }
    
    private get vo():AcAggregationVo{
        return <AcAggregationVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.AggregationCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return this._aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParam: any): void 
	{
		this._itemData = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;

		let itemBg = BaseBitmap.create("acaggregation_bot");
		this.width = itemBg.width;
		this.addChild(itemBg);

		let titleBg1:BaseBitmap = BaseBitmap.create("acaggregation_itemtxt1");
		this.addChild(titleBg1);
		this.setLayoutPosition(LayoutConst.lefttop,titleBg1,itemBg,[95,2]);
		let titleBg2:BaseBitmap = BaseBitmap.create("acaggregation_itemtxt2");
		this.addChild(titleBg2);
		this.setLayoutPosition(LayoutConst.righttop,titleBg2,itemBg,[95,2]);

		// let title1 = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationItemTxt1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		// this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,title1,titleBg1,[0,0]);
		// this.addChild(title1);
		// let title2 = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationItemTxt2"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		// this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,title2,titleBg2,[0,0]);
		// this.addChild(title2);

		let cicle = BaseBitmap.create("acaggregation_cicle");
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom,cicle,itemBg,[0,15]);
		this.addChild(cicle);

		let cicleTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationItemTxt3"), 16, TextFieldConst.COLOR_BROWN);
		cicleTxt.lineSpacing = 3;
		this.setLayoutPosition(LayoutConst.horizontalCentertop,cicleTxt,cicle,[0,35]);
		this.addChild(cicleTxt);
		let ptoKey = "acAggregationItemPro1";
		let curNum = this.vo.getAllianceNum();
		let needNum = data.taskValue;
		curNum = curNum > needNum ? needNum : curNum;
		if(curNum >= needNum)
		{
			ptoKey = "acAggregationItemPro2";
		}
		let cicleProTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationItemPro2",[String(curNum),String(needNum)]), 18, TextFieldConst.COLOR_BROWN);
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom,cicleProTxt,cicle,[0,45]);
		this.addChild(cicleProTxt);

		let scale = 0.6;
		let space = 5;
		let rewards1 = this._itemData.getReward1;
		let rewardIconList1 = GameData.getRewardItemIcons(rewards1, true, false);
		let container1:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		for(let i = 0; i < rewardIconList1.length; i++)
		{
			rewardIconList1[i].setScale(scale);
			rewardIconList1[i].x = i*rewardIconList1[i].width*scale + i*space;
			let childBg = rewardIconList1[i].getChildByName("numbg");
			if(childBg)
			{
				childBg.anchorOffsetX = childBg.width;
				childBg.anchorOffsetY = childBg.height;
				childBg.x += childBg.width;
				childBg.y += childBg.height;
				(childBg as BaseBitmap).setScale(1.5);
			}
			let childTxt = rewardIconList1[i].getChildByName("numLb");
			if(childTxt)
			{
				childTxt.anchorOffsetX = childTxt.width;
				childTxt.anchorOffsetY = childTxt.height;
				childTxt.x += childTxt.width;
				childTxt.y += childTxt.height;
				(childTxt as BaseTextField).setScale(1.5);
			}			
			container1.addChild(rewardIconList1[i]);
		}
		container1.x = titleBg1.x + titleBg1.width/2 - container1.width/2;
		container1.y = titleBg1.y + titleBg1.height + 15;
		this.addChild(container1);

		let rewards2 = this._itemData.getReward2;
		let rewardIconList2 = GameData.getRewardItemIcons(rewards2, true, false);
		let container2:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		for(let i = 0; i < rewardIconList2.length; i++)
		{
			rewardIconList2[i].setScale(scale);
			rewardIconList2[i].x = i*rewardIconList2[i].width*scale + i*space;
			container2.addChild(rewardIconList2[i]);
			let childBg = rewardIconList2[i].getChildByName("numbg");
			if(childBg)
			{
				childBg.anchorOffsetX = childBg.width;
				childBg.anchorOffsetY = childBg.height;
				childBg.x += childBg.width;
				childBg.y += childBg.height;
				(childBg as BaseBitmap).setScale(1.5);
			}
			let childTxt = rewardIconList2[i].getChildByName("numLb");
			if(childTxt)
			{
				childTxt.anchorOffsetX = childTxt.width;
				childTxt.anchorOffsetY = childTxt.height;
				childTxt.x += childTxt.width;
				childTxt.y += childTxt.height;
				(childTxt as BaseTextField).setScale(1.5);
			}				
		}
		container2.x = titleBg2.x + titleBg2.width/2 - container2.width/2;
		container2.y = titleBg2.y + titleBg2.height + 15;
		this.addChild(container2);	

		let getImg1 = BaseBitmap.create("collectflag");	
		getImg1.setScale(0.7);
		getImg1.x = container1.x + container1.width/2 - getImg1.width*getImg1.scaleX/2;
		getImg1.y = container1.y + container1.height/2 - getImg1.height*getImg1.scaleY/2;
		this.addChild(getImg1);
		let getImg2 = BaseBitmap.create("collectflag");
		getImg2.setScale(0.7);
		getImg2.x = container2.x + container2.width/2 - getImg2.width*getImg2.scaleX/2;
		getImg2.y = container2.y + container2.height/2 - getImg2.height*getImg2.scaleY/2;
		this.addChild(getImg2);
		getImg1.visible = getImg2.visible = false;

		let getBtn1 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => 
		{
			if ((!this.vo.isStart)) 
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			if(Api.playerVoApi.getPlayerAllianceId() == 0)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acAggregationGetFailTips2"));
				return;
			}
			NetManager.request(NetRequestConst.REQUEST_AGGREGATION_GETRWD, { activeId: this.vo.aidAndCode, rkey: Number(data.id) });
		}, this);
		getBtn1.x = container1.x + container1.width/2 - getBtn1.width/2;
		getBtn1.y = container1.y + container1.height + 10;
		this.addChild(getBtn1);

		let getBtn2 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => 
		{
			if ((!this.vo.isStart))
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			if(Api.playerVoApi.getPlayerAllianceId() == 0)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acAggregationGetFailTips2"));
				return;
			}			
			NetManager.request(NetRequestConst.REQUEST_AGGREGATION_GETRWD, { activeId: this.vo.aidAndCode, rkey: Number(data.id) });
		}, this);
		getBtn2.x = container2.x + container2.width/2 - getBtn2.width/2;
		getBtn2.y = container2.y + container2.height + 10;
		this.addChild(getBtn2);
		getBtn1.visible = getBtn2.visible = false;

		let max = this.vo.getAllianceMaxNum() + this.cfg.maxGet;
		let left = max - this.vo.getNumById(data.id);
		let cur = this.vo.getNumById(data.id);
		let cangetTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationItemTxt4",[String(cur),String(max)]), 18, TextFieldConst.COLOR_WHITE);
		if(left <= 0)
		{
			cangetTxt.text = LanguageManager.getlocal("acAggregationItemTxt5");
		}
		cangetTxt.x = getBtn2.x + getBtn2.width/2 - cangetTxt.width/2;
		cangetTxt.y = itemBg.height - cangetTxt.height - 21;
		this.addChild(cangetTxt);

		let rewardPos = this.vo.isRewardTaskById(data.id);
		cangetTxt.visible = rewardPos > 0 || left <= 0;
		if(Api.playerVoApi.getPlayerAllianceId() == 0)
		{
			cangetTxt.visible = false;
		}
		if(rewardPos == 1 || data.isCreatorRwd != 0)
		{
			getImg1.visible = true;
		}
		if(rewardPos == 2)
		{
			getImg2.visible = true;
		}

		if(this.vo.isCanGetRewardById(data.id))
		{
			if(Api.allianceVoApi.getMyAllianceVo().po == 1 && data.isCreatorRwd == 0)
			{
				getBtn1.visible = true;
			}else
			{
				getBtn2.visible = true;
			}
			cicle.setRes("acaggregation_cicle2");
		}
	}
	
	public getSpaceY():number {
		return 5;
	}

	public dispose():void {
		this._itemData = null;
		this._aid = null;
		this._code = null;
		super.dispose();
	}
}