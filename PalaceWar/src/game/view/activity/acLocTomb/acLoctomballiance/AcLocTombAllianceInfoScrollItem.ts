/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 帮会敌情itemrender
 */
class AcLocTombAllianceInfoScrollItem extends ScrollListItem
{
 
	private _data = null; 

	private _curIdx:number=0;

	public constructor() 
	{
		super();
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
        return AcConst.AID_LOCTOMB;
	}
	
	private get code() : string{
        return this._code;
    }
	private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 508;
		view.height = 118 + 10;
		view._data = data;
		view._curIdx = index;
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.addEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this);  
		// let item : RewardItemVo;
		// if(data.effect){
		// 	item = GameData.formatRewardItem('6_1004_1')[0];
		// }
		// else{
		// 	item = GameData.formatRewardItem(data.goods)[0];
		// }
		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg1");  
		wordsBg.width = view.width;
		wordsBg.height = view.height - 10; 
		view.addChild(wordsBg); 
		//npc怪物
		let cfg = view.cfg.getBossNpcItemCfgById(data.bosstype);
		// let npcBg = BaseBitmap.create(cfg.itemBg);
		// // npcBg.setScale(106/194);
		// npcBg.width = 106;
		// npcBg.height = 106;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, npcBg, wordsBg, [10,0]);
		// view.addChild(npcBg);
		
		let pic = cfg.getnpcIcon(this.code);
		let npc = BaseLoadBitmap.create(pic);
		npc.width = 100;
		npc.height = 100;
		// npc.setScale(cfg.type == 2 ? 0.5 : 1);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, npc, wordsBg, [10,0]);
		view.addChild(npc);
		//怪物名称
		let bpsshp = view.vo.getTombMaxHp(cfg.id);
		let value = (data.curBlood / bpsshp) * 100;
		let str = parseFloat(App.MathUtil.toFixed(value, 4).slice(0,-1));
		let name = data.type == 1 ? LanguageManager.getlocal('acwipeBossAllNpcInfo', [cfg.getnpcName(this.code), str.toString()]) : cfg.getnpcName(this.code);
		if(data.type == 1 && cfg.type == 2){
			name = cfg.getnpcName(this.code);
		}
		let NameTxt:BaseTextField = ComponentManager.getTextField(name, 22,TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, NameTxt, npc, [106+15,(data.type == 1 ? 5 : 1)]);
		view.addChild(NameTxt);
		//发现者
		let findTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossAllFindPlayer', [data.findname]),18);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, findTxt, NameTxt, [0,NameTxt.textHeight + (data.type == 1 ? 10 : 5)]);
		view.addChild(findTxt);

		if(data.type == 1){
			let posTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombpos-${this.code}`, [data.x,data.y]), 18);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, posTxt, findTxt, [0,findTxt.textHeight + (data.type == 1 ? 10 : 5)]);
			view.addChild(posTxt);

			let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,cfg.type == 1 ? "acwipeBossAllFight" : "acwipeBossOpenBox",view.fightHandler,view)
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, wordsBg, [10,0]);
			view.addChild(btn);
			if(!view.vo.isInFightTime()){
				btn.setEnable(false);
			}
		}
		else{
			let killTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(cfg.type == 1 ? 'acwipeBossAllKillPlayer' : 'acwipeBossAllOpenPlayer', [data.killername]),18);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killTxt, findTxt, [0,findTxt.textHeight + 5]);
			view.addChild(killTxt);

			let reward = data.rewardsidx;
			let reward_str = '';
			if(reward && reward != ``){
				let icon = GameData.formatRewardItem(reward);
				for(let i in icon){
					reward_str += (`、${icon[i].name}+${icon[i].num}`)
				}
			}

			//击杀者
			if(cfg.type == 1){
				//击杀奖励
				let killRewardTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossAllKillReward', [cfg.killScore.toString(),reward_str]),18, TextFieldConst.COLOR_WARN_GREEN);
				killRewardTxt.width = 350;
				killRewardTxt.lineSpacing = 2;
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killRewardTxt, killTxt, [0,killTxt.textHeight + 5]);
				view.addChild(killRewardTxt);
			}
			else{
				reward_str = reward_str.substring(1,reward_str.length);
				let openRewardTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossAllOpenReward', [reward_str]),18, TextFieldConst.COLOR_WARN_GREEN);
				openRewardTxt.width = 350;
				openRewardTxt.lineSpacing = 2;
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, openRewardTxt, killTxt, [0,killTxt.textHeight + 5]);
				view.addChild(openRewardTxt);
			}
		
		}

		//this.update();
	} 

	private fightHandler(evt:egret.TouchEvent):void
	{
		let view = this;
		if(!view.vo.isInFightTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
			return;
		}
		if(!view.vo.isInFightTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc6"));
			return;
		}
		//前往战斗

		//判断有没有数据
		let boxdata = view.vo.getBoxDataById(view._data.id);
		if(boxdata){
			let cfg = view.cfg.getBossNpcItemCfgById(view._data.bosstype);
			if(cfg.type == 1){
				ViewController.getInstance().openView(ViewConst.COMMON.ACLOCTOMBBATTLEVIEW,{
					aid : view.aid,
					code : view.code,
					foeId : cfg.id,
					bosskey :view._data.bosskey,
					id : view._data.id
				});
			}
			else{
				ViewController.getInstance().openView(ViewConst.COMMON.ACLOCTOMBSEARCHRESULTVIEW,{
					aid : view.aid,
					code : view.code,
					foeId : cfg.id,
					bosskey :view._data.bosskey,
					id : view._data.id
				});
			}
			let infoview = ViewController.getInstance().getView('AcLocTombAllianceInfoView');
			infoview.hide();
		}
		else{
			let arr = [];
			let floor = Math.ceil(Number(view._data.id) / 6);
			let num = Math.max(Math.floor(floor / 10) - 1, 0);
			let max = Math.floor(view.vo.getFloorNum() / 10);
			for(let i = 0; i < 3; ++ i){
				if(num + i < max){
					arr.push(num + i);
				}
			}
			view.vo.clickIdx = view._index;
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBMAP, {
				activeId : view.vo.aidAndCode,
				indexs : arr
			});
		}
	}

	//弹出消费提示框显示确认
	public confirmCallbackHandler(): void
	{
		let view = this;
		let cfg = view.cfg.getBossNpcItemCfgById(view._data.bosstype);
		if(cfg.type == 1){
			ViewController.getInstance().openView(ViewConst.COMMON.ACLOCTOMBBATTLEVIEW,{
				aid : view.aid,
				code : view.code,
				foeId : cfg.id,
				bosskey :view._data.bosskey,
				id : view._data.id
			});
		}
		else{
			ViewController.getInstance().openView(ViewConst.COMMON.ACLOCTOMBSEARCHRESULTVIEW,{
				aid : view.aid,
				code : view.code,
				foeId : cfg.id,
				bosskey :view._data.bosskey,
				id : view._data.id
			});
		}
		let infoview = ViewController.getInstance().getView('AcLocTombAllianceInfoView');
		infoview.hide();
	}
   
	public getSpaceY():number
	{
		return 10;
	}
	
	public dispose():void
    {
		let view = this;
		view._data =null; 
		//App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY),this.eventCollectHandlerCallBack,this);
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM,this.update,this); 		
		super.dispose();
	}
}