/**
 * 冲榜列表节点
 * author yanyuling
 * date 2017/11/06
 * @class AcCrossServerHegemonyRankListScrollItem
 */
class AcCrossServerHegemonyRankListScrollItem  extends ScrollListItem
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _aid :string = "";
    private _code:string = "";
    public constructor()
    {
        super();
    }
    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
    }
    private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
    }
    protected initItem(index:number,data:any,itemParam: any)
    {
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this.width = 520;
        // if(index != 0)
        // {
        //     let bg = BaseBitmap.create("public_line1");
        //     bg.width = 500;
        //     // bg.height = 40;
        //     bg.x = this.width/2 - bg.width/2;  
        //     bg.y = -bg.height/2;
        //     this.addChild(bg); 
        //  }

        this.height = 62; 
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        this._nodeContainer.x=0; 
  
        let tarColor = TextFieldConst.COLOR_BROWN;
        if(data.uid){
            if( data.uid == Api.playerVoApi.getPlayerID())
            {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }else{
            if( data.aid == Api.playerVoApi.getPlayerAllianceId())
            {
                tarColor = TextFieldConst.COLOR_WARN_YELLOW;
            }
        }
        // if(index >0 && String(data.endflag) == "1"){
        //     tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        // }

        let startY = 16;
        if (index > 2)
        {
            let guang = BaseBitmap.create("rankbgs_4");
            guang.width = 516;
            guang.height = 62;
            guang.x = this.width/2 - guang.width/2;
            this._nodeContainer.addChild(guang);

            let titleTxt1 = ComponentManager.getTextField("",20,tarColor)
            titleTxt1.text = String(index+1);
            titleTxt1.x = 40 - titleTxt1.width/2;
            titleTxt1.y = startY + 4;
            this._nodeContainer.addChild(titleTxt1);
        }else
        {
            let guang = BaseBitmap.create("rankbgs_"+(index+1));
            guang.width = 516;
            guang.height = 62;
            guang.x = this.width/2 - guang.width/2;
            this._nodeContainer.addChild(guang);

            let rankImg = BaseLoadBitmap.create("rankinglist_rankn"+String(index+1));
            // rankImg.width = 51;
            // rankImg.height = 47;
            rankImg.x = rankImg.width/2 + 5;
            rankImg.y = 7;
            this._nodeContainer.addChild(rankImg);
        }

        
    
        let titleTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        titleTxt2.text = data.name;
        titleTxt2.x = 145 - titleTxt2.width/2;
        titleTxt2.y = startY;
        this._nodeContainer.addChild(titleTxt2);


        let titleTxt3 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        titleTxt3.text = Api.mergeServerVoApi.getAfterMergeSeverName(null,false,Number(data.zid));
        titleTxt3.x = 250 - titleTxt3.width/2 + 15;
        titleTxt3.y = startY;
        this._nodeContainer.addChild(titleTxt3);

        let titleTxt4 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        titleTxt4.text = String(Number(data.score) * this.cfg.flagScoreNum);
        titleTxt4.x = 360 - titleTxt4.width/2;
        titleTxt4.y = startY;
        this._nodeContainer.addChild(titleTxt4);

        let titleTxt5 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        titleTxt5.text = data.win;
        titleTxt5.x = 470 - titleTxt5.width/2;
        titleTxt5.y = startY;
        this._nodeContainer.addChild(titleTxt5);
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
        this._nodeContainer =null;
        super.dispose();
    }
}