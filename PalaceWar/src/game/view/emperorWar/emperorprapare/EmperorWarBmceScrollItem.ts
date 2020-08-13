/**
 * 报名册item
 * author qianjun
 */
class EmperorWarBmceScrollItem  extends ScrollListItem
{
    private _rowIdx = 0;
    private _uiData = undefined;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        let view = this;
        view._rowIdx = index
        view._uiData = data;

        view.width = data.width;
        view.height = 52;
        let tarColor = TextFieldConst.COLOR_BROWN
        if(view._uiData.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }

        let pos_arr = data.pos_arr;
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        nameTxt.text =  data.name;
        view.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, view, [pos_arr[0] + (48 - nameTxt.textWidth) / 2,0]);
        view.addChild(nameTxt);

        let titleinfo = App.CommonUtil.getTitleData(view._uiData.title);
        if (titleinfo.title != "")
        {
            let officerImg = App.CommonUtil.getTitlePic(view._uiData.title);
            let deltaV = 0.8;
            officerImg.setScale(deltaV);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, officerImg, view, [pos_arr[1] + (48 - officerImg.width*officerImg.scaleX) / 2,0]);
            view.addChild(officerImg);
        }
        else
        {
            let officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            officerTxt.text = LanguageManager.getlocal("officialTitle"+ this._uiData.level);
            view.setLayoutPosition(LayoutConst.leftverticalCenter, officerTxt, view, [pos_arr[1] + (48 - officerTxt.textWidth) / 2,0]);
            view.addChild(officerTxt);
        }

        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        powerTxt.text = App.StringUtil.changeIntToText(Number(this._uiData.power));
        view.setLayoutPosition(LayoutConst.leftverticalCenter, powerTxt, view, [pos_arr[2] + (48 - powerTxt.textWidth) / 2,0]);
        view.addChild(powerTxt);
        
        if(data.end){
            let rwbTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            rwbTxt.text = App.StringUtil.changeIntToText(Number(this._uiData.pem));
            view.setLayoutPosition(LayoutConst.leftverticalCenter, rwbTxt, view, [pos_arr[3] + (72 - rwbTxt.textWidth) / 2,0]);
            view.addChild(rwbTxt);
        }

        let line = BaseBitmap.create("emprankinglist_line");
        line.width = view.width;
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, line, view);
        view.addChild(line);
    }

    public getSpaceX():number
	{
		return 10;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
	}
    public dispose():void
    {
        this._rowIdx = null;
        this._uiData = null;
        this.cacheAsBitmap=false;
        super.dispose();
    }
}
