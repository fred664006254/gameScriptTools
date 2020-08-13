/**
 * 竞猜选择item
 */
class AcGroupWifeBattleGuessSelectItem  extends ScrollListItem
{
    public constructor()
    {
        super();
     
    }
    
    private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_GROUPWIFEBATTLE;
    }

    private get code() : string{
        return this._code;
    }

    protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
    
    private _code : string = '';

    protected initItem(index:number,data:any,itemrapam:any)
    {
        this.width = 545-33.5;
        this.height = 65;  //rankbg_1
        this._code = itemrapam;

        let  nameStr = "battlelistbg1"; 
		if(index%2==0)
		{
			nameStr ='battlelistbg2';
		}

		if(data.mid == Api.playerVoApi.getPlayerAllianceId())
		{
            nameStr ='battlelisttouch';	
		}

		let bit:BaseBitmap =BaseBitmap.create(nameStr);
        bit.scaleX = (bit.width-33.5-40)/bit.width;
        bit.x=0;
        bit.height = this.height;
		this.addChild(bit);

        let tarColor = TextFieldConst.COLOR_BROWN;
        let orderid = index + 1;
        let pos = data.pos[0];
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        nameTxt.text =  data.alliName;
        nameTxt.x = pos.x + (pos.width - nameTxt.width) / 2 - 33;
        nameTxt.y =  this.height/2 - nameTxt.height/2;
        this.addChild(nameTxt);  
        
        pos = data.pos[1];
        let serverTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        serverTxt.text = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.server);
        serverTxt.x = pos.x + (pos.width - serverTxt.width) / 2 - 33;
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);

        pos = data.pos[2];
        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        powerTxt.text = App.StringUtil.changeIntToText(Number(data.total));
        powerTxt.x = pos.x + (pos.width - powerTxt.width) / 2 - 33;
        powerTxt.y = nameTxt.y;
        this.addChild(powerTxt);

        pos = data.pos[3];
        let powerAddTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        powerAddTxt.text = App.StringUtil.changeIntToText(Number(data.affect));
        powerAddTxt.x = pos.x + (pos.width - powerAddTxt.width) / 2 - 33;
        powerAddTxt.y = nameTxt.y;
        this.addChild(powerAddTxt);

        let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `acPunishBtn6`, ()=>{
            if(this.vo.getCurRound() == 1){
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    msg : LanguageManager.getlocal(`acGroupWifeBattlecheertip18-${this.getUiCode()}`, [`${data.alliName}`]),
                    title : `acGroupWifeBattlecheertip17-${this.getUiCode()}`,
                    touchMaskClose : true,
                    callback : ()=>{
                        NetManager.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_CHEER,{
                            activeId : this.acTivityId, 
                            allianceId : data.mid
                        });
                    },
                    handle : this,
                    needClose : 1,
                    needCancel : true
                });
            }
            else{
                let str = LanguageManager.getlocal(`acGroupWifeBattlecheertip3-${this.getUiCode()}`);
                App.CommonUtil.showTip(str);
            }
        }, this);
        btn.setScale(0.9);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn , this,[-30,0]);
        this.addChild(btn);
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
		return 0;
	}
    public dispose():void
    {
        super.dispose();
    }
}
