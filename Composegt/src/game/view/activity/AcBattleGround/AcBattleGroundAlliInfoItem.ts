/**
 * author:qianjun
 * desc: 帮会信息item
*/
class AcBattleGroundAlliInfoItem extends ScrollListItem
{
    public constructor() {
		super();
    }

    private code;
    
    private _data : any = null;

    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEGROUND, this.code);
    }
    private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEGROUND,this.code);
	}

	protected initItem(index:number,data:any,itemparam)
    {	
        let view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        this._data = data;
        this.width = 530;
        this.height = 45;
        this.code = itemparam;
        
          if(index % 2 == 1){
            let bg = BaseBitmap.create("public_tc_bg05");
            bg.width = 510;
            bg.height = 40;
            bg.x =  this.width /2 - bg.width/2;;
            bg.y = this.height / 2 - bg.height/2;
            this.addChild(bg);

        }

        let serverTxt = ComponentManager.getTextField(data.rank, 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, serverTxt, view, [70, 0]);
        view.addChild(serverTxt);

        let nameTxt = ComponentManager.getTextField(data.name, 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, view,[-5,0]);
        view.addChild(nameTxt);

  
        let scoreTxt = ComponentManager.getTextField(data.score ? data.score : LanguageManager.getlocal(this.getDefaultCn("acBattleRoundOut")), 20);
        if(view.vo.isWaiting()){
            scoreTxt.text = LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip11"));
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, scoreTxt, view, [70, 0]);
        view.addChild(scoreTxt);

        // let lineImg = BaseBitmap.create("public_line1");
		// lineImg.width = view.width;
        // this.setLayoutPosition(LayoutConst.horizontalCenterbottom, lineImg, view);
        // this.addChild(lineImg);
        //个人是否淘汰
        let need = view.vo.getCurperiod() == 2 ? view.cfg.weedOut[view.vo.getCurRound() - 1].btmLine : 99999;
        let color = null;
        if(view.vo.isWaiting()){
            color = TextFieldConst.COLOR_QUALITY_WHITE;
        }
        else{
            if(data.alive){
                color = Number(data.rank) <= need ? TextFieldConst.COLOR_WARN_GREEN : TextFieldConst.COLOR_WARN_RED3; 
            }
            else{
                color = TextFieldConst.COLOR_QUALITY_GRAY;
            }
        }
        serverTxt.textColor = nameTxt.textColor = scoreTxt.textColor = color;
    }

    private getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }
	public dispose():void
    {
        let view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}