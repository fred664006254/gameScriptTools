/**
 * 榜
 * author dky
 * date 2017/11/23
 * @class AcBattleGroundDetailsAlliScrollItem
 */
class AcBattleGroundDetailsTimeScrollItem  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _aid:string;
    private _code:string;
    private _indexText:BaseTextField;
    public constructor()
    {
        super();
     
    }
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
    }
    protected initItem(index:number,data:any,itemParam?:any)
    {
        if(itemParam){
            this._aid = itemParam.aid;
            this._code = itemParam.code;
        }
        this.height = 40;
        this.width = 620;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        let startY = 16;


			// "battleground_curtime",   acBattleGroundDetailsViewCurT  
			// "battleground_timeover"   acRank_acCDEnd2
        let curRound = itemParam.curRound;
        if(curRound == index+1){
            //进行中
            let mark = BaseBitmap.create("battleground_curtime");
            mark.x = 10;
            mark.y = startY + 10 - mark.height/2;
            this._nodeContainer.addChild(mark);

            let markText = ComponentManager.getTextField(LanguageManager.getlocal("acBattleGroundDetailsViewCurT"),14,TextFieldConst.COLOR_LIGHT_YELLOW);
            markText.x = mark.x + 5;
            markText.y = mark.y + mark.height/2 - markText.height/2;
            this._nodeContainer.addChild(markText);
        } else if(curRound > index){
            //已结束
            let mark = BaseBitmap.create("battleground_timeover");
            mark.x = 10;
            mark.y = startY + 10 - mark.height/2;
            this._nodeContainer.addChild(mark);

            let markText = ComponentManager.getTextField(LanguageManager.getlocal("acRank_acCDEnd2"),14,TextFieldConst.COLOR_LIGHT_YELLOW);
            markText.x = mark.x + 5;
            markText.y = mark.y + mark.height/2 - markText.height/2;
            this._nodeContainer.addChild(markText);
        }

        if(index % 2 == 1){
            let bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x = 0;
            bg.y = 5;
            this._nodeContainer.addChild(bg);

        }

        let titleTxt1 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN)
        titleTxt1.text = String(index+1);
        titleTxt1.x = 130 - titleTxt1.width/2 -10;
        titleTxt1.y = startY;
        this._indexText = titleTxt1;
        this._nodeContainer.addChild(titleTxt1);
 

        let outTime = data.time + this.vo.versionst;
        let outTimeTxt = App.DateUtil.getFormatBySecond(outTime,10);

        let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        titleTxt2.text = outTimeTxt;
        titleTxt2.x = 320 - titleTxt2.width/2-10;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField("",titleTxt2.size,TextFieldConst.COLOR_BROWN)
        titleTxt3.text = LanguageManager.getlocal("acBattleGroundDetailsViewOutText",[data.btmLine]);
        titleTxt3.x = 510 - titleTxt3.width/2-10;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);



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
        this._aid = null;
        this._code = null;
        this._indexText = null;
        super.dispose();
    }
}