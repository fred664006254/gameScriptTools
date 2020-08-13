/**
 * 神器分解弹板
 * author wxz
 * date 2020/5.25
 * @class WeaponResolvePopView
 */
class WeaponResolvePopView  extends PopupView
{
	private _scrollList:ScrollList = null;
	private _nullTxt:BaseTextField=null;
	public constructor() 
	{
		super();
	}

	protected get uiType():string
	{
		return "2";
	}
	protected getTitleStr():string
	{
		return "weaponResolveTitle1";
	}
	protected initView():void
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPON_RESOLVE, this.requestCallback, this);

		let bg:BaseBitmap = BaseBitmap.create("weaponresolvebg");
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 0;
		this.addChildToContainer(bg);

        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 520;
        rewardBg.setPosition(this.viewBg.x + this.viewBg.width/2 - rewardBg.width/2, bg.y+bg.height+5);
        this.addChildToContainer(rewardBg);

		let descTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`weaponResolveDesc1`), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
		descTxt.textAlign = egret.HorizontalAlign.CENTER;
		descTxt.lineSpacing = 3;
		descTxt.x = this.viewBg.x + this.viewBg.width/2 - descTxt.width/2;
		descTxt.y = 30;
		this.addChildToContainer(descTxt);

		let dataList:WeaponInfoVo[] = this.getDatas();
		
        let rect =  new egret.Rectangle(0, 0, 530, rewardBg.height-10);
        let scrollList = ComponentManager.getScrollList(WeaponResolveItem, dataList, rect, null);
        scrollList.setPosition(45, rewardBg.y + 5);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;

		let nullTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`weaponResolveNullDesc`),24,TextFieldConst.COLOR_LIGHT_YELLOW);
		nullTxt.x = this.viewBg.x + this.viewBg.width/2 - nullTxt.width/2;
		nullTxt.y = scrollList.y + scrollList.height/2 - nullTxt.height/2;
		this.addChildToContainer(nullTxt);
		this._nullTxt = nullTxt;
		this._nullTxt.visible = dataList.length==0;
	}
    private requestCallback(event:egret.Event)
	{
        if(!event.data.ret)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }		
        let rData = event.data.data.data;
        if(!rData)
		{
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }     
		if(rData.rewards)
		{
			// let rewardVoList = GameData.formatRewardItem(rData.rewards);
			// App.CommonUtil.playRewardFlyAction(rewardVoList);
			ViewController.getInstance().openView(ViewConst.POPUP.COMMONREWARDPOPUPVIEW,{"rewards":rData.rewards,"isPlayAni":true, "callback":null, "handler":null});
		}

		let dataList:WeaponInfoVo[] = this.getDatas();
        this._scrollList.refreshData(dataList);
		this._nullTxt.visible = dataList.length==0;
    }
	private getDatas():any[]
	{
		let dataList:WeaponInfoVo[] = [];
		let weaponInfoVoObj = Api.weaponVoApi.getWeaponVo().getWeaponInfoVo();
		let maxSoul;
		for(let item in weaponInfoVoObj)
		{
			maxSoul = Config.ServantweaponCfg.getWeaponItemById(weaponInfoVoObj[item].id).maxSoul;
			if(weaponInfoVoObj[item].skill2 >= maxSoul)
			{
				let cfg:Config.ServantWeaponItemCfg = (weaponInfoVoObj[item] as WeaponInfoVo).cfg;
				if(Api.itemVoApi.getItemNumInfoVoById(cfg.itemID) > 0)
				{
					dataList.push(weaponInfoVoObj[item]);
				}
			}
		}
		return dataList;
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				"weaponresolvebg","public_popupscrollitembg"
		]);
	}

	protected getBgExtraHeight():number
	{
		return 10;
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WEAPON_RESOLVE, this.requestCallback, this);
		super.dispose();
	}
}

class WeaponResolveItemUsePopView  extends ItemUsePopupView
{
	private _paraData:any;
	private _num:number;
	public constructor() 
	{
		super();
	}
	protected initView():void
	{
		super.initView();
		this.freshCost();
		this._effect.visible = false;
		this._desc.y = 250;
		this._desc.textAlign = egret.HorizontalAlign.CENTER;
		this.titleTF.text = LanguageManager.getlocal("weaponResolveTitle1");
		this._useBtn.setText("weaponResolveBtnTxt");
	}
	protected dragCallback(curNum:number):void
	{
		super.dragCallback(curNum);
		this.freshCost();
	}	
	protected useHandler(param:any):void
	{
		this._paraData = this.param;
		this._num = this._useNum;
		let itemId:number = this._paraData.data.itemId
		let iteminfo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
		let cost = this._paraData.data.cost;

		let message: string = LanguageManager.getlocal("weaponResolveSureTxt",[String(this._useNum),iteminfo.name,String(cost*this._useNum)]);
		ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,
		{
			msg : message,
			title : "itemUseConstPopupViewTitle",
			touchMaskClose : true,
			callback : ()=>
			{
				this.hide();
				NetManager.request(NetRequestConst.REQUEST_WEAPON_RESOLVE,{weaponId:this._paraData.data.wid,num:this._num});
			},
			handler : this,
			needClose : 1,
			needCancel : true
		});	
	}	
	private freshCost():void
	{
		let itemId:number = this.param.data.itemId;
		let iteminfo:ItemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);		
		let cost = this.param.data.cost;		
		this._desc.text = LanguageManager.getlocal("weaponResolveDesc2",[String(this._useNum),iteminfo.name,String(this._useNum*cost)]);		
		this._desc.x = this.viewBg.x + this.viewBg.width/2 - this._desc.width/2;
	}
}

