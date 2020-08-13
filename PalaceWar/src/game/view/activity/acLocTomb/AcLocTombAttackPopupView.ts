
class AcLocTombAttackPopupView extends PopupView
{
	private _callbackF:Function = null;
	private _obj:any = null;

	public constructor()
	{
		super();
	}
	
	protected getResourceList():string[]
	{
		let code = this.code;
		return super.getResourceList().concat([
				//"dailybosslastattackpopupview",
				"dailybosslastattacktitle",
				"allianceboss_fight_text",
				`tombfighttitle-${code}`,
				`tombfighttitlebg-${code}`,
				`tombkill-${code}`,
				`tombreward-${code}`
		]);
	}

	private get cfg() : Config.AcCfg.LocTombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLocTombVo{
        return <AcLocTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
	private get aid() : string{
        return this.param.data.aid;
	}
	
	private get code() : string{
        return this.param.data.code;
    }

	protected initView():void
	{	
		
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
		//type 1 最后一击   2 战斗  3 被别人击杀 4查看模式 击杀奖励仅自己可见
		let dataInfo:any = this.param.data;
		let bossCfg = this.cfg.getBossNpcItemCfgById(dataInfo.index);
		if (dataInfo.type == 3) { 
			let descTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossHasKill",[bossCfg.getnpcName(this.code)]),20,TextFieldConst.COLOR_WHITE);
			descTxt.setPosition((this.viewBg.width-descTxt.width)/2,38);
			this.addChildToContainer(descTxt);
			return;
		}
		let height = 0;
		let bosskey = dataInfo.bosskey;
		let isSelfKill = dataInfo.type == 4 && Api.playerVoApi.getPlayerID() == this.vo.getTombKillUid(bossCfg.id, bosskey);
		if(dataInfo.type == 1){
			height = 255;
		}
		else if(dataInfo.type == 2){
			height = 170;
		}
		else{
			height = isSelfKill ? 290 : 190;
		}
		this.viewBg.height = height;
		this.viewBg.y = (GameConfig.stageHeigth - height) / 2;
		let bossName:string = bossCfg.getnpcName(this.code);
		let titlePic:string;
		let descStr:string;
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.intoBossBattle,this);
		// if (this.param.data && this.param.data.f && this.param.data.o)
		// {
		// 	this._obj = this.param.data.o;
		// 	this._callbackF = this.param.data.f;
		// }
		let maxbossValue = this.vo.getTombMaxHp(bossCfg.id);
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
		let titelbg = BaseBitmap.create(`tombfighttitlebg-${this.code}`);
		titelbg.setPosition((this.viewBg.width-titelbg.width)/2,(-titelbg.height)/2);
		this.addChildToContainer(titelbg);
		
		if (dataInfo.type == 1) { 
			titlePic = `tombreward-${this.code}`;
			descStr = LanguageManager.getlocal("alliancebossattacked3",[bossName,bossName,String(dataInfo.damage),percent]);
		}
		else if(dataInfo.type == 2){
			titlePic = `tombfighttitle-${this.code}`;
			descStr = LanguageManager.getlocal("alliancebossattacked4",[bossName,String(dataInfo.damage),percent]);
		}
		else if(dataInfo.type == 4){
			titlePic = `tombkill-${this.code}`;
			let peoplenum = this.vo.getTombKillNum(bossCfg.id, bosskey);
			let zid = this.vo.getTombKillZid(bossCfg.id, bosskey);
			let killname = this.vo.getTombKiller(bossCfg.id, bosskey);
			descStr = LanguageManager.getlocal(`loctombattacktip1-${this.code}`,[bossName,String(peoplenum),killname,Api.mergeServerVoApi.getAfterMergeSeverName(null,true,zid)]);
		}

		let title:BaseBitmap=BaseBitmap.create(titlePic);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title, titelbg);
		this.addChildToContainer(title);

		let descTxt:BaseTextField=ComponentManager.getTextField(descStr,20,TextFieldConst.COLOR_WHITE);
		descTxt.textAlign=egret.HorizontalAlign.CENTER;
		descTxt.width = 640;
		descTxt.lineSpacing=6;
		descTxt.setPosition((this.viewBg.width-descTxt.width)/2,titelbg.y+titelbg.height - 5);
		this.addChildToContainer(descTxt);

		let offY:number = 0;
		if (dataInfo.type == 1 || isSelfKill){
			let rewardVo:RewardItemVo=GameData.formatRewardItem(dataInfo.rewards)[0];
			let rewardIcon = GameData.getItemIcon(rewardVo, true);
			rewardIcon.setPosition((this.viewBg.width-rewardIcon.width)/2,descTxt.y+descTxt.height+16+(dataInfo.type == 4 ? 35 : 0));
			this.addChildToContainer(rewardIcon);
			offY = 105;
		}
		if(isSelfKill){
			let awardTXT = ComponentManager.getTextField(LanguageManager.getlocal(`loctombattacktip2-${this.code}`),20);
			awardTXT.setPosition((this.viewBg.width-awardTXT.width)/2,descTxt.y+descTxt.height + 10);
			this.addChildToContainer(awardTXT);
		}
		if(dataInfo.type < 4){
			let rightScoreTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossBattleScore',[dataInfo.exp]),20,TextFieldConst.COLOR_WARN_GREEN);
			rightScoreTxt.setPosition((this.viewBg.width-rightScoreTxt.width)/2,descTxt.y+descTxt.height +offY+30 );
			this.addChildToContainer(rightScoreTxt);
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