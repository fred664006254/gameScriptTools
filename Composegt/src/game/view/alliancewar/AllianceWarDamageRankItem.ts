/**
 * 伤害item
 * author qianjun
 */
class AllianceWarDamageRankItem  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    public constructor(){
        super();
    }

    protected initItem(index:number,data:any)
    {
        this.height = 40;
		this.width = 520;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        let startY = 10;

		//文本线
		if (index % 2 == 1) {
			let lineBg = BaseBitmap.create("public_tc_bg05");
			lineBg.width = this.width;
			lineBg.height = 40;
			this._nodeContainer.addChild(lineBg);
		}

        if (index > 2)
        {
            let titleTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN)
            titleTxt1.text = String(index+1);
            titleTxt1.x = (48 - titleTxt1.width)/2 + 35;
            titleTxt1.y = startY;
            this._nodeContainer.addChild(titleTxt1);
            if(data.uid == Api.playerVoApi.getPlayerID()){
                titleTxt1.textColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }else
        {
            let rankImg = BaseLoadBitmap.create("rank_"+String(index+1));
            rankImg.width = 49;
            rankImg.height = 39;
            rankImg.x = (48 - rankImg.width)/2 + 35;
            rankImg.y = 3 ;
            this.addChild(rankImg);
        }
    
        let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        titleTxt2.text = data.name;
        titleTxt2.x = (96 - titleTxt2.width)/2 + 130;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField("",titleTxt2.size,TextFieldConst.COLOR_BROWN)
        let winCount = 0;
        for (var key in data.win) {
            if (data.win.hasOwnProperty(key)) {
                var element = data.win[key];
                if (element) {
                    winCount += element;
                }
            }
        }
        titleTxt3.text = String(winCount);
        titleTxt3.x = (48 - titleTxt3.width)/2 + 275;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);

        let titleTxt4 = ComponentManager.getTextField("",titleTxt2.size,TextFieldConst.COLOR_BROWN)
        titleTxt4.text = String(Math.floor(data.damage));
        titleTxt4.x = (48 - titleTxt4.width)/2 + 395;
        titleTxt4.y = startY;
        this._nodeContainer.addChild(titleTxt4);

        if(data.uid == Api.playerVoApi.getPlayerID()){
            titleTxt2.textColor = titleTxt3.textColor = titleTxt4.textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
    }

    public getSpaceX():number
	{
		return 0;
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
        this._nodeContainer = null;
        super.dispose();
    }
}