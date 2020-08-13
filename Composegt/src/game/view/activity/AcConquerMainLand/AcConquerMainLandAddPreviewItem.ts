/**
 * 排行列表节点
 */
class AcConquerMainLandAddPreviewItem  extends ScrollListItem
{
    public constructor()
    {
        super();
     
    }

    protected initItem(index:number,data:any,itemParam:any)
    {
        let aid = itemParam.aid;
        let code = itemParam.code;
        let vo = <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(aid,code);
        let cfg = <Config.AcCfg.ConquerMainLandCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
        
        this.width = 520;
        this.height = 50;

        let tarColor = TextFieldConst.COLOR_BROWN_NEW
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_QUALITY_GREEN_NEW;
        }
        let orderid = index + 1;
        let pos = data.pos[0];
        let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        rankTxt.text = String(index+1);
        rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2 - 25;
        rankTxt.y = this.height/2 - rankTxt.height/2;
        this.addChild(rankTxt);
        
       
        pos = data.pos[1];
        let serverTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor);
        serverTxt.text = App.StringUtil.changeIntToText3(data.attIncrease[1]);
        serverTxt.x = pos.x + (pos.width - serverTxt.width) / 2 - 25;
        serverTxt.y =  this.height/2 - serverTxt.height/2;;
        this.addChild(serverTxt);  

        pos = data.pos[2];
        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        powerTxt.text = vo.getPowerAddBuff(index+1) + '';
        powerTxt.x = pos.x + (pos.width - powerTxt.width) / 2 - 25;
        powerTxt.y = serverTxt.y;
        this.addChild(powerTxt);
        // if ( this._uiData.vip != "0")
        // {
        //     let vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._uiData.vip).icon);
        //     vipFlag.setScale(0.65);
        //     vipFlag.x =   nameTxt.x + nameTxt.width  ;
        //     vipFlag.y = nameTxt.y ;
        //     this.addChild(vipFlag);
        // }
        let line = BaseBitmap.create("public_line4");
        this.addChild(line);
        line.width = this.width - 10;
        line.x = 8;
        line.y  = this.height - line.height;
    }

	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 0;
	}
    public dispose():void
    {
        super.dispose();
    }
}
