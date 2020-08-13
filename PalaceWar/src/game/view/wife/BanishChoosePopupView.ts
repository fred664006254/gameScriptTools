
class BanishChoosePopupView extends PopupView 
{
	private _callbackF:Function = null;
	private _obj:any = null;

    public constructor() {
    	super();
	}
	public initView():void 
    {
		this._callbackF=this.param.data.f;
        this._obj=this.param.data.o;

		let desc1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("banish_desc"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
        desc1.width = 520;
		desc1.setPosition(this.viewBg.width/2-desc1.width/2,20);
        this.addChildToContainer(desc1);

		let bg:BaseBitmap = BaseBitmap.create("public_9_bg32");
		bg.width = this.viewBg.width - 50-GameData.popupviewOffsetX*2;
		bg.height = 875-desc1.height - 100;
		bg.setPosition(25+GameData.popupviewOffsetX,desc1.y+desc1.height+14);
		this.addChildToContainer(bg);

		let allWife:WifeInfoVo[] = Api.wifeVoApi.getWifeInfoVoList();
		let wifeInfoTab:any[] = [];
		for (let i:number = 0; i < allWife.length; i++)
		{	
			let vo:WifeInfoVo = allWife[i];
			wifeInfoTab.push({wifeId:String(vo.id),intimacy:vo.intimacy,charm:vo.glamour,isBanishing:Api.wifebanishVoApi.getIsWifeBanishing(String(vo.id)),f:this.clickHandle,o:this});
		}
		wifeInfoTab.sort((a:any,b:any)=>{
			
			if (a.isBanishing == b.isBanishing)
			{
				return a.intimacy - b.intimacy;
			}
			else
			{
				return a.isBanishing - b.isBanishing;
			}

		});

		
		let rect = new egret.Rectangle(0,0,this.viewBg.width - 56,bg.height-6);
		let scrollList:ScrollList = ComponentManager.getScrollList(BanishChooseItem,wifeInfoTab ,rect);
		scrollList.setPosition(bg.x+3,bg.y+3);
		this.addChildToContainer(scrollList);
    }

	private clickHandle(wifeId:string):void
	{
		this._callbackF.apply(this._obj,[wifeId]);
		this.hide();
	}

    protected getTitleStr():string
	{
		return "banish_choose";
	}

	protected getBgExtraHeight():number
	{
		return 10;
	}

    public dispose():void 
    {
		this._callbackF=null;
		this._obj=null;

		super.dispose();
	}

}