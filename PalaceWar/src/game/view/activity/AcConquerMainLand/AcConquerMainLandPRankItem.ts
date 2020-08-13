/**
 * 排行列表节点
 */
class AcConquerMainLandPRankItem  extends ScrollListItem
{
    private _code : string = '';
    private _data
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
            default:
                code = `1`;
                break;
        }
        return code;
    }

    protected initItem(index:number,data:any,item:any)
    {
        this._code = item;
        this.width = 545;
        this.height = 80;  //rankbg_1

        let tarColor = TextFieldConst.COLOR_BROWN
        if(data.uid == Api.playerVoApi.getPlayerID())
        {
            tarColor = TextFieldConst.COLOR_WARN_YELLOW;
        }
        let orderid = index + 1;
        let pos = data.pos[0];
        if (index < 3)
        {    
            let rankbg = BaseBitmap.create("rankbg_"+String(index+1));
            rankbg.width = this.width;
            rankbg.height = this.height;
            rankbg.x = this.width/2 - rankbg.width/2;
            rankbg.y = this.height/2 - rankbg.height/2;
            this.addChild(rankbg);

            let rankImg = BaseBitmap.create("rankinglist_rankn"+String(index+1))
            rankImg.x = pos.x + (pos.width - rankImg.width) / 2 - 32;
            rankImg.y = this.height/2 - rankImg.height/2;
            this.addChild(rankImg);
        }else
        {
            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            rankTxt.text = String(index+1);
            rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2 - 32;
            rankTxt.y = this.height/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        }
       
        pos = data.pos[1];
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        nameTxt.text =  data.name;
        nameTxt.x = pos.x + (pos.width - nameTxt.width) / 2 - 32;
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);  
        
        if (PlatformManager.checkIsRuSp())
		{
			nameTxt.x +=20;
		}

        pos = data.pos[2];
        let serverTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        serverTxt.text = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.zid);
        serverTxt.x = pos.x + (pos.width - serverTxt.width) / 2 - 32;
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);

        pos = data.pos[3];
        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
        powerTxt.text = App.StringUtil.changeIntToText(Number(data.score), 4);
        powerTxt.x = pos.x + (pos.width - powerTxt.width) / 2 - 32;
        powerTxt.y = nameTxt.y;
        this.addChild(powerTxt);

        if(!this.vo.checkIsJJL)
        {
            pos = data.pos[4];
            let powerAddTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,tarColor)
            powerAddTxt.text = App.StringUtil.changeIntToText(Number(data.add) * this.vo.getTimeBuff());
            powerAddTxt.x = pos.x + (pos.width - powerAddTxt.width) / 2 - 32;
            powerAddTxt.y = nameTxt.y;
            this.addChild(powerAddTxt);
        }
        
        // if ( this._uiData.vip != "0")
        // {
        //     let vipFlag = BaseLoadBitmap.create(Api.vipVoApi.getVipCfgByLevel(this._uiData.vip).icon);
        //     vipFlag.setScale(0.65);
        //     vipFlag.x =   nameTxt.x + nameTxt.width  ;
        //     vipFlag.y = nameTxt.y ;
        //     this.addChild(vipFlag);
        // }
        let lineImg = BaseBitmap.create("public_line1");
        lineImg.width = this.width;
        lineImg.x = 0;
        lineImg.y = this.height - lineImg.height;
        this.addChild(lineImg);

        this.addTouchTap(()=>{
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{
				ruid:data.uid,
				rzid:Api.mergeServerVoApi.getTrueZid(data.uid)
			});
        },this);
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
        super.dispose();
    }
}
