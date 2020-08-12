/**
 * 骰子能量升级按钮
 * author 陈可
 * date 2020/4/23
 * @class UpDice
 */
class UpDice extends BaseDisplayObjectContainer
{
    private _info:dice.sc_battle_init.IUpInfo;
    private _lvTxt:BaseTextField;
    private _numTxt:BaseTextField;
    private _upmask:BaseBitmap=null;
    private _bg:BaseBitmap=null;
    public constructor(upinfo:dice.sc_battle_init.IUpInfo)
    {
        super();
        this._info=upinfo;
        this.init();
        this.initEventListener();
    }
    private init():void
    {
        this.width = 112;
        this.height = 112;
        let diceCfg=Config.DiceCfg.getCfgById(this._info.id)
        let icon=BaseLoadBitmap.create(Config.DiceCfg.getIconById(this._info.id));
        icon.setScale(DiceScaleEnum.scale_fight_team);
        let view = this;
        // diceCfg.getBtShawdow()
        let bg=BaseLoadBitmap.create(`bird_team_item_${diceCfg.quality}`,null,{callback:(icon:BaseLoadBitmap)=>{
            // bg.setPosition((icon.width*icon.scaleX-bg.width)*0.5,(icon.height*icon.scaleY-bg.height)*0.5+3);
        },callbackThisObj:this,callbackParams:[icon]});
        bg.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg, [0,0]);
        this.addChild(bg);
        this._bg=bg;

        this.addChild(icon);
        
        /*this.addTouchTap((e:egret.Event)=>{
            NetManager.request(NetConst.BATTLE_OPT,{opt:1,upId:this._info.id});
        },this);*/
        // this.addTouch(this.eventHandler, this);
        icon.addTouch(this.eventHandler, this);

        let lvTxt=ComponentMgr.getTextField("LV."+this._info.pwlv,TextFieldConst.SIZE_20,ColorEnums.white);
        this._lvTxt=lvTxt;
        lvTxt.stroke = 1.5;
        lvTxt.width=80;
        lvTxt.textAlign=egret.HorizontalAlign.LEFT;
        lvTxt.setPosition(0,0);
        this.addChild(lvTxt);
        this.name="up"+this._info.id;

        let spIco=BaseBitmap.create("battle_sp");
        spIco.setPosition(0,60-2);
        this.addChild(spIco);
        let numTxt=ComponentMgr.getTextField(Api.BattleVoApi.getPowerUpCostByLv(this._info.pwlv)+"",TextFieldConst.SIZE_CONTENT_NORMAL_POPUP);
        this._numTxt=numTxt;
        numTxt.width=100;
        numTxt.setPosition(spIco.x+spIco.width,spIco.y+(spIco.height-numTxt.height)*0.5+2);
        this.addChild(numTxt);

        let info = BaseBitmap.create("dicecardext");
        // info.setScale(0.8);
        info.width = info.width * 0.8;
        info.height = info.height * 0.8;
        this.addChild(info);
        info.y = -8;
        info.x = bg.x + 89 - info.width-5;

        App.CommonUtil.addTouchScaleEffect(info, ()=>{
            //新手引导不响应
            if(Api.GameinfoVoApi.getIsGuiding()){
                return;
            }
            let info = null;
           
            info = {
                lv: Api.BattleVoApi.getUpinfoLvByDiceId(true, this._info.id),
            }
            ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW,{
                dice : this._info.id,
                // check : true,
                inbattle:true,
                info: info,
                isPowerUp: true
            });
        }, this);

        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    }

    public showMask():void
    {
        if(!this._upmask)
        {
            let mask=BaseBitmap.create("btupdicemask");
            mask.setScale(0.95);
            mask.setPosition(this._bg.x+(this._bg.width*this._bg.scaleX-mask.width*mask.scaleX)*0.5,this._bg.y+(this._bg.height*this._bg.scaleY-mask.height*mask.scaleY)*0.5);
            this.addChild(mask);
            this._upmask=mask;
        }
        else
        {
            if(!this.contains(this._upmask))
            {
                this.addChild(this._upmask);
            }
        }
    }

    public hideaMask():void
    {
        if(this._upmask&&this.contains(this._upmask))
        {
            this.removeChild(this._upmask);
        }
    }

    public refresh(isMe:boolean):void
    {
        this._lvTxt&&this._lvTxt.setString("LV."+this._info.pwlv);
        this._numTxt&&this._numTxt.setString(Api.BattleVoApi.getPowerUpCostByLv(this._info.pwlv)+"");

        //满级后增幅置灰
        if(isMe && this._info.pwlv >= 5)
        {
             this._lvTxt&&this._lvTxt.setString("Max");
            //  App.DisplayUtil.changeToGray(this);
            this.showMask();
        }
    }

    private eventHandler(event:egret.TouchEvent):void{
        if(BattleStatus.startBattleTime < 5000 || Api.BattleVoApi.getHasOwnDiceNum(true) <= 0){
            return;
        }
		let view = this;
		switch(event.type){
			case egret.TouchEvent.TOUCH_BEGIN:
                this.setScale(0.9);
				break;
			case egret.TouchEvent.TOUCH_END:
                NetManager.request(NetConst.BATTLE_OPT,{opt:1,upId:this._info.id});
                this.setScale(1);
				break;
			case egret.TouchEvent.TOUCH_CANCEL:
                this.setScale(1);
				break;
		}
	}

    public dispose():void
    {
        this._info=null;
        this._lvTxt=null;
        this._numTxt=null;
        this._upmask=null;
        this._bg=null;
        super.dispose();
    }
}