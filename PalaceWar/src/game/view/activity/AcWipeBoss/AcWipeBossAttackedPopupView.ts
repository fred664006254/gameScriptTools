
class AcWipeBossAttackedPopupView extends PopupView
{
	private _callbackF:Function = null;
	private _obj:any = null;

	public constructor()
	{
		super();
	}
	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
				//"dailybosslastattackpopupview",
				"dailybosslastattacktitle",
				"allianceboss_fight_text"
		]);
	}

	private get api() : WipeBossVoApi{
        return Api.wipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.WipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcWipeBossVo{
        return <AcWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	protected initView():void
	{	
		
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
		this.addTouchTap(this.hide,this);
		
		//type 1 最后一击   2 战斗  3 被别人击杀
		let dataInfo:any = this.param.data;
		let bossCfg = this.cfg.getBossNpcItemCfgById(dataInfo.index);
		if (dataInfo.type == 3) { 
			let descTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossHasKill",[bossCfg.npcName]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
			descTxt.setPosition((this.viewBg.width-descTxt.width)/2,38);
			this.addChildToContainer(descTxt);
			return;
		}

		let bossName:string = bossCfg.npcName;
		let titlePic:string;
		let descStr:string;
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.intoBossBattle,this);
		// if (this.param.data && this.param.data.f && this.param.data.o)
		// {
		// 	this._obj = this.param.data.o;
		// 	this._callbackF = this.param.data.f;
		// }
		let maxbossValue = this.vo.getWipeBossMaxHp(bossCfg.id);
		let percent = ``;
		let per = 0.001;
		if((maxbossValue * per / 100) > dataInfo.damage){
			percent = LanguageManager.getlocal(`alliancebossdamage1`, [per.toString()]);
		}
		else{
			let value = dataInfo.damage / maxbossValue * 100;
			let str = parseFloat(App.MathUtil.toFixed(value, 4).slice(0,-1));
			percent = LanguageManager.getlocal(`alliancebossdamage2`, [`${str}%`]);
		}
		
		
		if (dataInfo.type == 1) { 
			titlePic = "wipebosskilltitle";
			descStr = LanguageManager.getlocal("alliancebossattacked3",[bossName,bossName,String(dataInfo.damage),percent]);
		}
		else {
			titlePic = "allianceboss_fight_text";
			descStr = LanguageManager.getlocal("alliancebossattacked4",[bossName,String(dataInfo.damage),percent]);
		}

		let title:BaseBitmap=BaseBitmap.create(titlePic);
		title.setPosition((this.viewBg.width-title.width)/2,10);
		this.addChildToContainer(title);

		let descTxt:BaseTextField=ComponentManager.getTextField(descStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		descTxt.textAlign=egret.HorizontalAlign.CENTER;
		descTxt.width = 640;
		descTxt.lineSpacing=6;
		descTxt.setPosition((this.viewBg.width-descTxt.width)/2,title.y+title.height+18);
		this.addChildToContainer(descTxt);

		let offY:number = 0;
		if (dataInfo.type == 1) {

			let rewardVo:RewardItemVo=GameData.formatRewardItem(dataInfo.rewards)[0];
			let rewardIcon = GameData.getItemIcon(rewardVo);
			rewardIcon.setPosition((this.viewBg.width-rewardIcon.width)/2,descTxt.y+descTxt.height+16);
			this.addChildToContainer(rewardIcon);
			offY = 105;
		}

		let rightScoreTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossBattleScore',[dataInfo.exp]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN);
		rightScoreTxt.setPosition((this.viewBg.width-rightScoreTxt.width)/2,descTxt.y+descTxt.height +offY+30 );
		this.addChildToContainer(rightScoreTxt);
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getCloseBtnName():string
	{
		return null;
	}

	protected isTouchMaskClose():boolean
	{
		return true;
	}

	protected getBgExtraHeight():number
	{
		return 10;
	}

	protected getBgName():string
	{
		return "public_9_wordbg";
	}

	public hide()
	{
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		super.hide();
	}

	public dispose():void
	{	
		this._callbackF = null;
		this._obj = null;

		super.dispose();
	}
}