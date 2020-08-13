/**
  * item
  * author weixiaozhe
  * date 2020.7.27
  * @class AcCrossPowerSjItem
  */
 class AcCrossPowerSjItem extends ScrollListItem {
	private _itemData:any= null;
    private _aid:string = null;
    private _code:string = null;
	public constructor() {
		super();
    }
    
	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
    }

    private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
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

		let itemBg = BaseBitmap.create("crosspower_sjitembg");
		itemBg.y = 3;
		this.width = itemBg.width;
		this.addChild(itemBg);

		let line = BaseBitmap.create("crosspower_sjline");
		line.x = this.width/2 - line.width/2;
		this.height = line.height;
		this.addChild(line);

		if(data["isfirst"])
		{
			line.y = 6;
		}
		if(data["islast"])
		{
			line.y = -10;
		}	

		let middlebg = BaseBitmap.create("crosspower_sjtxtbg");
		middlebg.x = this.width/2 - middlebg.width/2;
		middlebg.y = this.height/2 - middlebg.height/2;
		this.addChild(middlebg);

		let cicleTxt = ComponentManager.getTextField(String(data.needPower), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.setLayoutPosition(LayoutConst.horizontalCentertop,cicleTxt,middlebg,[0,32]);
		this.addChild(cicleTxt);

		let getBtn1 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => 
		{
			if ((!this.vo.isStart))
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			let process = this.vo.getSjProcess();
			if(process < data.needPower)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerPowerSjNoTips",[""+data.needPower]));
				return;
			}
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETGOLDREWARD, { activeId: this.vo.aidAndCode, rkey: Number(data.id),issenior:0 });
		}, this);
		getBtn1.x = itemBg.x + 90;
		getBtn1.y = itemBg.y + itemBg.height - getBtn1.height - 35;
		this.addChild(getBtn1);

		let getBtn2 = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", () => 
		{
			if ((!this.vo.isStart))
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			let process = this.vo.getSjProcess();
			if(process < data.needPower)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerPowerSjNoTips",[""+data.needPower]));
				return;
			}		
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETGOLDREWARD, { activeId: this.vo.aidAndCode, rkey: Number(data.id),issenior:1 });
		}, this);
		getBtn2.x = itemBg.x + itemBg.width - getBtn2.width - 90;
		getBtn2.y = getBtn1.y;
		this.addChild(getBtn2);

		let process = this.vo.getSjProcess();
		if(process < data.needPower)
		{
			getBtn1.setGray(true);
			getBtn2.setGray(true);
		}else
		{
			getBtn1.setGray(false);
			getBtn2.setGray(false);
		}

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerPowerSjPowerTip"), 20, TextFieldConst.COLOR_BROWN);
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,tipTxt,getBtn2,[0,0]);
		this.addChild(tipTxt);		

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
		container1.x = getBtn1.x + getBtn1.width/2 - container1.width/2;
		container1.y = itemBg.y + 30;
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
		container2.x = getBtn2.x + getBtn2.width/2 - container2.width/2;
		container2.y = container1.y;
		this.addChild(container2);	

		let getImg1 = BaseBitmap.create("collectflag");	
		getImg1.setScale(0.7);
		getImg1.x = getBtn1.x + getBtn1.width/2 - getImg1.width*getImg1.scaleX/2;
		getImg1.y = getBtn1.y + getBtn1.height/2 - getImg1.height*getImg1.scaleY/2;
		this.addChild(getImg1);
		let getImg2 = BaseBitmap.create("collectflag");
		getImg2.setScale(0.7);
		getImg2.x = getBtn2.x + getBtn2.width/2 - getImg2.width*getImg2.scaleX/2;
		getImg2.y = getBtn2.y + getBtn2.height/2 - getImg2.height*getImg2.scaleY/2;
		this.addChild(getImg2);

		getImg1.visible = getImg2.visible = false;

		if(this.vo.isGetRewardSj(data.id))
		{
			getBtn1.visible = false;
			getImg1.visible = true;
		}
		if(this.vo.isBuySj())
		{
			getBtn2.visible = true;
			tipTxt.visible = false;
		}else
		{
			getBtn2.visible = false;
			tipTxt.visible = true;
		}	
		if(this.vo.isGetRewardUpSj(data.id))
		{
			getBtn2.visible = false;
			getImg2.visible = true;
		}
	}
	
	public getSpaceY():number {
		return 0;
	}

	public dispose():void {
		this._itemData = null;
		this._aid = null;
		this._code = null;
		super.dispose();
	}
}