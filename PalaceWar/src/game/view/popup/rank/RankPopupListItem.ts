class RankPopupListItem extends ScrollListItem
{
	private _nodeContainer:BaseDisplayObjectContainer;
    private _data:any;
	public constructor() 
	{
		super();
	}

    protected getValueStr():string
	{
        let valueStr:string="";
        if(this._data)
        {
            if(this._data.value!=null)
            {
                valueStr=this._data.value;
            }
            if(this._data.time!=null)
            {
                valueStr=App.DateUtil.getFormatBySecond(this._data.time,6);
            }
        }
        return valueStr;
	}

	protected initItem(index:number,data:any):void
	{
        this._data=data;
		this.height = 52;
        // this.width = 508;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        let startY = 16;
        let titleTxt1:BaseTextField;
        if (index > 2)
        {
            titleTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN)
            titleTxt1.text = String(index+1);
            titleTxt1.x = 60 - titleTxt1.width/2;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
        }
        else
        {
            let rankImg = BaseLoadBitmap.create("rank_"+String(index+1));
            rankImg.width = 51;
            rankImg.height = 47;
            rankImg.x = 60-rankImg.width/2;
            rankImg.y = 3 ;
            this.addChild(rankImg);
        }
    
        let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        titleTxt2.text = data?data.name:"";
        titleTxt2.x = 220- titleTxt2.width/2;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField(this.getValueStr(),titleTxt2.size,TextFieldConst.COLOR_BROWN)
        titleTxt3.textAlign=egret.HorizontalAlign.CENTER;
        titleTxt3.width=200;
        titleTxt3.x = 510-titleTxt3.width;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);


        if (data.uid == Api.playerVoApi.getPlayerID()) {
            if (titleTxt1) {
                titleTxt1.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
            titleTxt2.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            titleTxt3.textColor = TextFieldConst.COLOR_WARN_YELLOW;
        }

        let lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = 5;
        lineImg.y = 50;
        this._nodeContainer.addChild(lineImg);
	}
}