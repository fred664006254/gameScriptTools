
class AcCrossServerWipeBossAttackedPopupView extends PopupView
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
				// "dailybosslastattacktitle",
				// "allianceboss_fight_text"
		]);
	}

	private get api() : CrossServerWipeBossVoApi{
        return Api.crossServerWipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerWipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerWipeBossVo{
        return <AcCrossServerWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
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

		if (dataInfo.type == 1) { 
			this.viewBg.height = 300;
		}
		else {
			this.viewBg.height = 200;
		}


		if (dataInfo.type == 3) { 
			let descTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("accrossserverwipeBossHasKill",[bossCfg.npcName]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
			descTxt.setPosition((this.viewBg.width-descTxt.width)/2,38);
			this.addChildToContainer(descTxt);
			return;
		}

		let bossName:string = bossCfg.npcName;
		let titlePic:string;
		let descStr:string;
		if (dataInfo.type == 1) { 
			titlePic = "accrossserverwipeBoss_killTitle";
			descStr = LanguageManager.getlocal("accrossserverwipeBossResult1",[bossName,bossName,String(dataInfo.damage)]);
		}
		else {
			titlePic = "accrossserverwipeBoss_fightTitle";
			descStr = LanguageManager.getlocal("accrossserverwipeBossResult2",[bossName,String(dataInfo.damage)]);
		}

		let title:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal(titlePic),40,0xffd447)//.create(titlePic);
		title.setPosition((this.viewBg.width-title.width)/2,10);
		this.addChildToContainer(title);

		let descTxt:BaseTextField=ComponentManager.getTextField(descStr,20,TextFieldConst.COLOR_WHITE);
		descTxt.textAlign=egret.HorizontalAlign.CENTER;
		descTxt.width = 480
		descTxt.lineSpacing=3;
		
		this.addChildToContainer(descTxt);


		// let rightScoreTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossBattleScore',[dataInfo.exp]),20,TextFieldConst.COLOR_WARN_GREEN2);
		// this.addChildToContainer(rightScoreTxt);
		let rightScoreTxt1:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossBattleScore1',[dataInfo.attackexp]),20,TextFieldConst.COLOR_WARN_GREEN2);
		let rightScoreTxt2:BaseTextField = null;
		if(dataInfo.killexp != 0){
			rightScoreTxt2 =ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossBattleScore2',[dataInfo.killexp]),20,TextFieldConst.COLOR_WARN_GREEN2);
			this.addChildToContainer(rightScoreTxt2);
		}
		


		this.addChildToContainer(rightScoreTxt1);
		

	
		if (dataInfo.type == 1) {
			descTxt.setPosition((this.viewBg.width-descTxt.width)/2,title.y+title.height+10);
			rightScoreTxt1.setPosition((this.viewBg.width-rightScoreTxt1.width)/2,descTxt.y+descTxt.height + 10 );
			let overY = rightScoreTxt1.y + rightScoreTxt1.height;
			if(rightScoreTxt2){
				rightScoreTxt2.setPosition((this.viewBg.width-rightScoreTxt2.width)/2,rightScoreTxt1.y+rightScoreTxt1.height + 10 );
				overY = rightScoreTxt2.y + rightScoreTxt2.height;
			}

			let rewardVo:RewardItemVo=GameData.formatRewardItem(dataInfo.rewards)[0];
			let rewardIcon = GameData.getItemIcon(rewardVo);
			rewardIcon.setScale(0.85);
			rewardIcon.setPosition((this.viewBg.width-rewardIcon.width * rewardIcon.scaleX)/2,overY +15);
			this.addChildToContainer(rewardIcon);
			
		} else {
			descTxt.setPosition((this.viewBg.width-descTxt.width)/2,title.y+title.height+30);
			rightScoreTxt1.setPosition((this.viewBg.width-rightScoreTxt1.width)/2,descTxt.y+descTxt.height + 30 );

			if(rightScoreTxt2){
				rightScoreTxt2.setPosition((this.viewBg.width-rightScoreTxt2.width)/2,rightScoreTxt1.y+rightScoreTxt1.height + 10 );
				
			}
		}


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