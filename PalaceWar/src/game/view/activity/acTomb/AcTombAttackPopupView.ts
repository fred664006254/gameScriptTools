
class AcTombAttackPopupView extends PopupView
{
	private _callbackF:Function = null;
	private _obj:any = null;
	private _cancelback:boolean = false;

	public constructor()
	{
		super();
	}
	
	protected getResourceList():string[]
	{
		let code = this.getUicode();
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

	private get cfg() : Config.AcCfg.TombCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcTombVo{
        return <AcTombVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
	
	private getUicode():string{
		let baseview : any = ViewController.getInstance().getView('AcTombView');
		return baseview.getUiCode();
	}

	protected initView():void
	{	
		let code = this.getUicode();
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
		if(this.param.data.cancelCallback){
			this._cancelback = this.param.data.cancelCallback;
		}
		//type 1 最后一击   2 战斗  3 被别人击杀 4查看模式 击杀奖励仅自己可见
		let dataInfo:any = this.param.data;
		let bossCfg = this.cfg.getBossNpcItemCfgById(dataInfo.index);
		if (dataInfo.type == 3) { 
			let descTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossHasKill",[bossCfg.getnpcName(code)]),20,TextFieldConst.COLOR_WHITE);
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
			if(this.vo.gettotalShopScore() >= this.cfg.maxScore){
				height = 255;
			}
		}
		else{
			height = isSelfKill ? 290 : 190;
		}
		this.viewBg.height = height;
		this.viewBg.y = (GameConfig.stageHeigth - height) / 2;
		let bossName:string = bossCfg.getnpcName(code);
		let titlePic:string;
		let descStr:string;
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ALLIANCE_ATTACK),this.intoBossBattle,this);
		// if (this.param.data && this.param.data.f && this.param.data.o)
		// {
		// 	this._obj = this.param.data.o;
		// 	this._callbackF = this.param.data.f;
		// }
		let maxbossValue = 0;
		if(bossCfg.id != 12){
			maxbossValue = this.vo.getTombMaxHp(bossCfg.id);
		}
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
		let titelbg = BaseBitmap.create(`tombfighttitlebg-${code}`);
		titelbg.setPosition((this.viewBg.width-titelbg.width)/2,(-titelbg.height)/2);
		this.addChildToContainer(titelbg);
		
		if (dataInfo.type == 1) { 
			titlePic = `tombreward-${code}`;
			descStr = LanguageManager.getlocal("alliancebossattacked3",[bossName,bossName,String(dataInfo.damage),percent]);
		}
		else if(dataInfo.type == 2){
			titlePic = `tombfighttitle-${code}`;
			if(dataInfo.index == 12){
				descStr = LanguageManager.getlocal("alliancebossattacked2",[bossName,String(dataInfo.damage)]);
			}
			else{
				descStr = LanguageManager.getlocal("alliancebossattacked4",[bossName,String(dataInfo.damage),percent]);
			}
		}
		else if(dataInfo.type == 4){
			titlePic = `tombkill-${code}`;
			let peoplenum = this.vo.getTombKillNum(bossCfg.id, bosskey);
			let zid = this.vo.getTombKillZid(bossCfg.id, bosskey);
			let killname = this.vo.getTombKiller(bossCfg.id, bosskey);
			descStr = LanguageManager.getlocal(`tombattacktip1-${code}`,[bossName,String(peoplenum),killname,Api.mergeServerVoApi.getAfterMergeSeverName(null,true,zid)]);
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
			let awardTXT = ComponentManager.getTextField(LanguageManager.getlocal(`tombattacktip2-${code}`),20);
			awardTXT.setPosition((this.viewBg.width-awardTXT.width)/2,descTxt.y+descTxt.height + 10);
			this.addChildToContainer(awardTXT);
		}
		if(dataInfo.type < 4){
			let str = "";
			if(this.vo.gettotalShopScore() >= this.cfg.maxScore){
				str = LanguageManager.getlocal('acwipeBossBattleScore2',[String(dataInfo.shopscore == 0 ? 0xff3c3c : 0x21eb39), dataInfo.shopscore, dataInfo.exp]);
			}
			else{
				str = LanguageManager.getlocal('acwipeBossBattleScore',[dataInfo.exp]);
			}
			let rightScoreTxt:BaseTextField=ComponentManager.getTextField(str,20,TextFieldConst.COLOR_WARN_GREEN);
			rightScoreTxt.setPosition((this.viewBg.width-rightScoreTxt.width)/2,descTxt.y+descTxt.height +offY+30 );
			this.addChildToContainer(rightScoreTxt);

			if(this.vo.gettotalShopScore() >= this.cfg.maxScore){
				let tipTxt:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal(`alliancebossattacked5`),20);
				tipTxt.lineSpacing = 5;
				tipTxt.textAlign = egret.HorizontalAlign.CENTER;
				tipTxt.setPosition((this.viewBg.width-tipTxt.width)/2,rightScoreTxt.y+rightScoreTxt.height+25 );
				this.addChildToContainer(tipTxt);
			}
		}
	}

	protected resetBgSize():void{
		super.resetBgSize();
		let dataInfo:any = this.param.data;
		let bossCfg = this.cfg.getBossNpcItemCfgById(dataInfo.index);
		if(dataInfo.type == 4 && this.vo.getOpenEndlessBoss() && bossCfg.id == 7){	
			//
			let group = new BaseDisplayObjectContainer();
			group.width = 444;
			group.height = this.viewBg.y;
			group.mask = new egret.Rectangle(0,0,444,this.viewBg.y);
			this.addChildAt(group, 2);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, group, this, [0,0]);

			let npc = BaseLoadBitmap.create(`tombboss12-1`);
			npc.width = 444;
			npc.height = 456;
			group.addChild(npc);

			let tombbosseff = ComponentManager.getCustomMovieClip(`finalbosseff`, 12, 80);
			tombbosseff.width = 320;
			tombbosseff.height = 461;
			tombbosseff.anchorOffsetX = tombbosseff.width / 2;
			tombbosseff.anchorOffsetY = tombbosseff.height / 2;
			tombbosseff.playWithTime(-1);
			tombbosseff.setScale(1.5);
			tombbosseff.x = 205;
			tombbosseff.y = 155;
			group.addChild(tombbosseff);
			//增加提示
			let tipTxt = ComponentManager.getTextField( LanguageManager.getlocal("tombfloorbosstip5"), 20);
			let gobtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `tombgoattack`, ()=>{
				this._cancelback = true;
				this.hide();
			}, this);
			this.addChild(tipTxt);
			this.addChild(gobtn);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, this.viewBg, [0,this.viewBg.height + 20]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, gobtn, tipTxt, [0,tipTxt.height + 20]);
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
		if(this._obj && this._callbackF) {
			this._callbackF.apply(this._obj, [this._cancelback]);
		}
		super.hide();
	}

	public dispose():void
	{	
		this._callbackF = null;
		this._obj = null;
		this._cancelback = false;
		super.dispose();
	}
}