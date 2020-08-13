class SearchBiographyPopupView extends PopupView
{   
    private _biographylist:Object[] = [];
	public constructor()
	{
		super();    
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
           "biographyview","biographyview_attic_bg","biographyview_attic","biographyview_atticbg2",
        ]);
	}

 	protected getBgName():string
    {
         return "biographyview_attic_bg";   
    }

    protected getTitleStr():string
	{
        return null;
    } 

    protected getBgExtraHeight():number
	{
		return 0;
	}

    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_SEARCH_GETBIOGRAPHY,requestData:{}};
	}

    protected receiveData(data:{ret:boolean,data:any}):void
	{
		if (data.ret)
        {   
            if (data.data.data.biographylist && data.data.data.biographylist.length>0)
            {
                this._biographylist = data.data.data.biographylist;
            }
        }
	}

    protected initView():void
    {
        let title = BaseBitmap.create("biographyview_attic");
        title.setPosition(this.viewBg.width/2 - title.width/2, 0);
        this.addChildToContainer(title);

        this.closeBtn.y -= 10;

        let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 524, 758);

        this._biographylist.sort(function(a: any,b: any):number
        {	
            let cfga = Config.BiographyCfg.getCfgBgId(a.id);
            let cfgb = Config.BiographyCfg.getCfgBgId(b.id);

            if (cfga.type != cfgb.type)
            {
                return cfgb.type-cfga.type;
            }

            if(a.sortID > b.sortID) 
            {
                return 1;
            }
            else if(a.sortID == b.sortID) 
            {
                if (App.DateUtil.isSameDay(b.st,a.st))
                {
                    return b.power-a.power;
                }
                else
                {
                    return b.st-a.st;
                }
            }
            return -1;
        });

        let scrollList = ComponentManager.getScrollList(SearchBiographyScrollItem,this._biographylist,rect,null,null,null,true);
        scrollList.setPosition(this.viewBg.width/2-rect.width/2,77);
        this.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

    }

    public dispose():void
    {
        this._biographylist.length = 0;

        super.dispose();
    }
}