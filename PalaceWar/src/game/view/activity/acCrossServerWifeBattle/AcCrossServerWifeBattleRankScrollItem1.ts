/**
 * 榜
 * author dky
 * date 2017/11/23
 * @class AcCrossServerWifeBattleRankScrollItem1
 */
class AcCrossServerWifeBattleRankScrollItem1  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private aid:string;
    private code:string;
    public constructor()
    {
        super();
     
    }
    private get vo() : AcCrossServerWifeBattleVo{
        return <AcCrossServerWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
    }
    protected initItem(index:number,data:any,itemParam:any)
    {
        this.aid = itemParam.aid;
        this.code = itemParam.code;
        this.height = 40;
        this.width = 610;

        let rankbg:BaseBitmap;
        if (index < 3)
        {   
            let bgpic = ""
            if (index == 0)
            {
                bgpic = "public_9_bg66";
            }
            else if (index == 1)
            {
                bgpic = "public_9_bg69";
            }
            else
            {
                bgpic = "public_9_bg68";
            }

            this.height =  88; 
            rankbg = BaseBitmap.create(bgpic);
            rankbg.width = 610;
            rankbg.scaleY = 88/rankbg.height;
            rankbg.x =0;
            rankbg.y = 0;
            this.addChild(rankbg);

            let rankImg = BaseBitmap.create("rankinglist_rankn"+String(index+1));
            rankImg.x = 68-rankImg.width/2;
            rankImg.y = 44 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {   
            this.height =  70; 
            rankbg = BaseBitmap.create("public_9_bg70");
            rankbg.width = 610;
            rankbg.scaleY = 70/rankbg.height;
            rankbg.x =0;
            rankbg.y = 0;
            this.addChild(rankbg);

            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
            rankTxt.text = String(index+1);
            rankTxt.x = 68 - rankTxt.width/2;
            rankTxt.y = 25;
            this.addChild(rankTxt);
        }

    
        let server = "";
        if(this.vo.getQuByZid(data.zid)> 0){
            // server = LanguageManager.getlocal("mergeServer",[String(data[1]),String(data[0])]);
            server = LanguageManager.getlocal("mergeServerOnlyqu",[String(this.vo.getQuByZid(data.zid))]);
        } else {
            // "ranserver2":"{1}服",
            server = LanguageManager.getlocal("ranserver2",[String(data.zid)]);
        }

        let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN)
        titleTxt2.text = server;
        titleTxt2.x = 290- titleTxt2.width/2 - 30;
        titleTxt2.y = rankbg.y + (rankbg.height * rankbg.scaleY - titleTxt2.textHeight) / 2;
        this.addChild(titleTxt2);




        let titleTxt3 = ComponentManager.getTextField("",titleTxt2.size,TextFieldConst.COLOR_BROWN)
        titleTxt3.text = String(data.point);
        titleTxt3.x = 480- titleTxt3.width/2 - 20;
        titleTxt3.y = titleTxt2.y;
        this.addChild(titleTxt3);
        // Api.mergeServerVoApi.getTrueZid()
        let zid = Api.mergeServerVoApi.getTrueZid();
        let qu = Api.mergeServerVoApi.getQuByZid(zid);

        if(data.zid == zid){
            titleTxt2.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
            titleTxt3.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
        }
        // if(data.uid == Api.playerVoApi.getPlayerID() || data.id == Api.playerVoApi.getPlayerAllianceId()){
        //     titleTxt2.textColor = TextFieldConst.COLOR_WARN_GREEN;
        //     titleTxt3.textColor = TextFieldConst.COLOR_WARN_GREEN;
        //  }



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