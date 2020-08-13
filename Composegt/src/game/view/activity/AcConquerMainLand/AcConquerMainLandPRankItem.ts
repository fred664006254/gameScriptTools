/**
 * 排行列表节点
 */
class AcConquerMainLandPRankItem  extends ScrollListItem
{
    private _code : string = '';
	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_CONQUERMAINLAND;
    }

    private get code() : string{
        return this._code;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
			case 2:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    protected initItem(index:number,data:any,item:any)
    {
        this._code = item;
        this.width = 520;
        this.height = 50;  //rankbg_1

        let tarColor = TextFieldConst.COLOR_BROWN_NEW;
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_QUALITY_GREEN_NEW;
        }
        let orderid = index + 1;
        let pos = data.pos[0];
        if (index < 3)
        {    
            let rankImg = BaseBitmap.create("rank_"+orderid)
            rankImg.x = pos.x + (pos.width - rankImg.width) / 2 - 25;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            rankTxt.text = String(index+1);
            rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2 - 25;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       
        pos = data.pos[1];
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        nameTxt.text =  data.name;
        nameTxt.x = pos.x + (pos.width - nameTxt.width) / 2 - 25;
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);  
        
        pos = data.pos[2];
        let serverTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        serverTxt.text = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid);
        serverTxt.x = pos.x + (pos.width - serverTxt.width) / 2 - 25;
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);

        pos = data.pos[3];
        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        powerTxt.text = App.StringUtil.changeIntToText(Number(data.score));
        powerTxt.x = pos.x + (pos.width - powerTxt.width) / 2 - 25;
        powerTxt.y = nameTxt.y;
        this.addChild(powerTxt);

        pos = data.pos[4];
        let powerAddTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        powerAddTxt.text = App.StringUtil.changeIntToText(Number(data.add) * this.vo.getTimeBuff());
        powerAddTxt.x = pos.x + (pos.width - powerAddTxt.width) / 2 - 25;
        powerAddTxt.y = nameTxt.y;
        this.addChild(powerAddTxt);
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
