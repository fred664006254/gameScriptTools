/**
 * 帮会助威选择item
 */
class AcBattleGroundCheerSelectItem  extends ScrollListItem
{
    public constructor()
    {
        super();
     
    }
    
    private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_BATTLEGROUND;
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
		let bit:BaseBitmap =BaseBitmap.create(nameStr);
        bit.scaleX = (bit.width-33.5-40)/bit.width;
        bit.x=0;
        bit.height = this.height;
		this.addChild(bit);

        let tarColor = TextFieldConst.COLOR_BROWN
        // return {
        //     num : num,
        //     alliName : info.name,
        //     alliId : id,
        //     total : total,
		// 	period : status,
		// 	server : info.zid,
		// 	mid : info.id,
        // };
        let orderid = index + 1;
        let pos = data.pos[0];
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        nameTxt.text =  data.alliName;
        nameTxt.x = pos.x + (pos.width - nameTxt.width) / 2 - 25;
        nameTxt.y =  this.height/2 - nameTxt.height/2;;
        this.addChild(nameTxt);  
        
        pos = data.pos[1];
        let serverTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        serverTxt.text = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, data.server);
        serverTxt.x = pos.x + (pos.width - serverTxt.width) / 2 - 25;
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);

        pos = data.pos[2];
        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        powerTxt.text = App.StringUtil.changeIntToText(Number(data.total));
        powerTxt.x = pos.x + (pos.width - powerTxt.width) / 2 - 25;
        powerTxt.y = nameTxt.y;
        this.addChild(powerTxt);

        pos = data.pos[3];
        let powerAddTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,tarColor)
        powerAddTxt.text = App.StringUtil.changeIntToText(Number(data.affect));
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
        let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `acPunishBtn6`, ()=>{
            if(this.vo.getCurRound() == 1){
                ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                    msg : LanguageManager.getlocal(`battlegroundcheertip18-${this.getUiCode()}`, [`${data.alliName}`]),
                    title : `battlegroundcheertip17-${this.getUiCode()}`,
                    touchMaskClose : true,
                    callback : ()=>{
                        NetManager.request(NetRequestConst.REQUEST_BATTLEGROUND_CHEER,{
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
                let str = LanguageManager.getlocal(`battlegroundcheertip3-${this.getUiCode()}`);
                App.CommonUtil.showTip(str);
            }
        }, this);
        btn.setScale(0.9);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn , this,[-20,0]);
        this.addChild(btn);


        // let lineImg = BaseBitmap.create("public_line1");
        // lineImg.width = this.width;
        // lineImg.x = 0;
        // lineImg.y = this.height - lineImg.height;
        // this.addChild(lineImg);
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
