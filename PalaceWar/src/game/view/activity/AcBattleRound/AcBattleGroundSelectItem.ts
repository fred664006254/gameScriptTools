/**
 选择对战信息列表
 * author qianjun
 */
class AcBattleGroundSelectItem extends ScrollListItem
{
	private _data:any = null;
	private _itemIndex:number;
	private _nameTf:BaseTextField;
	private _code : string = '';
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

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return AcConst.AID_BATTLEGROUND;
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
	

	public initItem(index:number,bData:any,itemparam?):void
	{
		this.width = 520;
		this.height = 120  + this.getSpaceY();
		// childInfo.total
		this._data = bData;
		this._code = itemparam;
		this._itemIndex = index;
		
		let bg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		bg.width = this.width;
		bg.height = this.height - this.getSpaceY();
		this.addChild(bg);

		let iconContainer = new BaseDisplayObjectContainer();
		this.addChild(iconContainer);

		let headContainer = Api.playerVoApi.getPlayerCircleHead(Number(bData.pic),bData.ptitle);
		iconContainer.addChild(headContainer);
		iconContainer.width = 103;
		iconContainer.height = 100;

		let nameStr = bData.name;
		this._nameTf = ComponentManager.getTextField(nameStr,20, TextFieldConst.COLOR_WARN_YELLOW2);
		this.setLayoutPosition(LayoutConst.lefttop, this._nameTf, bg, [iconContainer.x + iconContainer.width + 15, 15]);
		this.addChild(this._nameTf);

		this.setLayoutPosition(LayoutConst.leftverticalCenter, iconContainer, bg, [15,-1]);
		
		let rankTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acBattleGroundSelectRank-${this.getUiCode()}`, [bData.rank]), 20, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankTxt, this._nameTf, [0,this._nameTf.textHeight + 17]);
		this.addChild(rankTxt);
		
		let scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acBattleGroundSelectScore-${this.getUiCode()}`, [bData.score]), 20, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreTxt, rankTxt, [0,rankTxt.textHeight + 8]);
		this.addChild(scoreTxt);
		
		let tmp:any =[];
		tmp.uid=bData.uid;
		tmp.battleground = true;
		tmp.code = this._code;
		let killBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `atkraceVisitTab3`, ()=>{
			if(!this.vo.getAttendQuality()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNoAttend-${this.getUiCode()}`));
				return;
			}
			if(this.vo.isActyEnd()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
				return;
			}
			if(this.vo.getCurperiod() == 3){
				App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
				return;
			}
			//追杀
			tmp.type=3;//追杀
			AtkraceChallengeItem.data = tmp;
			ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
		}, this);
		killBtn.setScale(0.8);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, killBtn, bg, [11,15]);
		this.addChild(killBtn);


		let challBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `atkraceChallengeViewTitle`, ()=>{
			if(!this.vo.getAttendQuality()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNoAttend-${this.getUiCode()}`));
				return;
			}
			if(this.vo.isActyEnd()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
				return;
			}
			if(this.vo.getCurperiod() == 3){
				App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
				return;
			}
			//挑战
			tmp.type=1;//挑战
			AtkraceChallengeItem.data = tmp;
			ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDCHALLENGEVIEW);
		}, this);
		challBtn.setScale(0.8);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, challBtn, killBtn, [killBtn.width * killBtn.scaleX + 7,0]);
		this.addChild(challBtn);	
	}

	private clickItemHandler(event: egret.TouchEvent): void {
		
		this.showUserInfo();
	}

	private showUserInfo()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:this._data.uid});
    }

	protected userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
	}
	
	public getSpaceY():number
	{
		return 0;
	}

	public dispose():void
	{

		this._data = null;
		this._itemIndex = null;
		this._nameTf = null;
		super.dispose();
	}
}