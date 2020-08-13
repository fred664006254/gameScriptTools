/**
 * 选择门客弹板
 * author 钱竣
 * date 2017/9/28
 * @class ZhenqifangSelectServantView
 */
class ZhenqifangSelectServantView extends PopupView
{
	// 道具id	
	private _itemId:number = 0;
	private _scrollList:ScrollList = null;
	private _callback:Function = null;
	private _handler:any = null;
	private _selectedServantId:number = 0;
	private _index:number;

	public constructor() 
	{
		super();
	}

    protected getTitleStr():string{
        return `servantSelectedPopupViewTitle`;
    }

	protected isShowOpenAni():boolean
	{	
		if (Api.rookieVoApi.isGuiding)
		{
			return false;
		}
		return true;
	}

	protected getResourceList():string[]
	{
		let resArr:string[]=[`mlservantselected-1`,`acchristmasview_smalldescbg`,`countrywarrewardview_itembg`];
		return super.getResourceList().concat(resArr);
	}
	/**
	 * 需要传的参数{callback：回调函数，handler:回调函数所属对下，type：面板类型（1，2，3），itemId：使用道具时传}
	 */
	protected initView():void
	{
		this.height = GameConfig.stageHeigth;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SELECTED_SERVANT,this.clickItemHandler,this);
		
		this._callback = this.param.data.callback;
		this._handler = this.param.data.handler;

        if(this.param.data.needtext){
			let bg:BaseBitmap = BaseBitmap.create("countrywarrewardview_itembg");
			bg.width = 520;
			bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
			bg.y = 10;
			this.addChildToContainer(bg);
		 
            let descTF = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangcdtip20`, [this.param.data.needtext]), 20);
            descTF.textAlign = TextFieldConst.ALIGH_LEFT;
            descTF.x = (this.viewBg.width -  descTF.width) / 2;
            descTF.y = bg.y + (bg.height - descTF.textHeight) / 2 + 1;
            this.addChildToContainer(descTF);

            let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangcdtip4`, [((this.param.data.friend ? Config.ZhenqifangCfg.friend.deduction : Config.ZhenqifangCfg.individual.deduction) * 100).toFixed(0)]),20, TextFieldConst.COLOR_BROWN);
            tipTxt.textAlign = TextFieldConst.ALIGH_CENTER;
            tipTxt.width = 480;
            tipTxt.lineSpacing = 5;
            tipTxt.x = (this.viewBg.width -  tipTxt.width) / 2;
            tipTxt.y = descTF.y + descTF.textHeight + 10;
            tipTxt.setColor(TextFieldConst.COLOR_BLACK);
            this.addChildToContainer(tipTxt);
        }
        
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = this.param.data.needtext ? 650 : 730;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = this.param.data.needtext ? 95 : 15;
 		this.addChildToContainer(bg);

		let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(2);
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,bg.width - 10,bg.height - 20);
		let list : ScrollList = null;
		list = ComponentManager.getScrollList(ZhenqifangSelectServantItem,this.param.data.info,rect);
		list.setPosition(bg.x + 10,bg.y + 10);
		this.addChildToContainer(list);
		this._scrollList = list;
	}

	protected resetBgSize():void{
		super.resetBgSize();
		if(Api.rookieVoApi.getIsGuiding()){
			if(Api.rookieVoApi.getIsGuiding()){
				this._scrollList.verticalScrollPolicy = `off`;
			}
			RookieCfg.rookieCfg["zhenqifang_8"].clickRect.x = 393;
            RookieCfg.rookieCfg["zhenqifang_8"].clickRect.y = this.viewBg.y + 113;
			  if(this.param.data.needtext)
			  {
				   RookieCfg.rookieCfg["zhenqifang_8"].clickRect.y +=80;
			  }
    
            RookieCfg.rookieCfg["zhenqifang_8"].handPos.x = RookieCfg.rookieCfg["zhenqifang_8"].clickRect.x + 80;
			RookieCfg.rookieCfg["zhenqifang_8"].handPos.y = RookieCfg.rookieCfg["zhenqifang_8"].clickRect.y + 31;
			
			Api.rookieVoApi.checkNextStep();
        }
	}

	protected getShowHeight():number{
		return 839;
	}

	
	/**点击具体门客按钮事件 */
	private clickItemHandler(event:egret.Event):void
	{
		let data = event.data;
		this._index = Number(data.index);
		this._selectedServantId = Number(data.id);
		this._callback.apply(this._handler,[{
			id : data.id, 
			uid : this.param.data.uid, 
			clv:data.clv, 
			equip:data.equip, 
			value:data.value
		}]);
		this.hide();
	}

	protected getBgExtraHeight():number
	{
		return 40;
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SELECTED_SERVANT,this.clickItemHandler,this);
		this._itemId = 0;
		this._scrollList = null;
		this._callback =null;
		this._handler =null;
		this._selectedServantId = 0;	
		this._index = 0;
		super.dispose();
	}
}