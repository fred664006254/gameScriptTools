/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 帮会敌情itemrender
 */
class AcCrossServerWipeBossAllianceInfoScrollItem extends ScrollListItem
{
 
	private _data = null; 

	private _curIdx:number=0;

	public constructor() 
	{
		super();
	}

	private get api() : CrossServerWipeBossVoApi{
        return Api.crossServerWipeBossVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerWipeBossCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, this._code);
    }

    private get vo() : AcCrossServerWipeBossVo{
        return <AcCrossServerWipeBossVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, this._code);
    }
	
	private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 505;
		view.height = 120 + 25;
		view._data = data;
		view._curIdx = index;

		let wordsBg:BaseBitmap = BaseBitmap.create("public_listbg");  
		wordsBg.width = view.width;
		wordsBg.height = view.height - 5; 
		view.addChild(wordsBg); 

		let bb = BaseBitmap.create("public_left");
		bb.width = 125;
		bb.height = 122;
		bb.x = 5;
		bb.y = 5;
		this.addChild(bb);
		//npc怪物
		let cfg = view.cfg.getBossNpcItemCfgById(data.bosstype);
		let npcBg = BaseBitmap.create(cfg.itemBg);
		// npcBg.setScale(106/194);
		npcBg.width = 106;
		npcBg.height = 106;
		npcBg.setScale(1);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, npcBg, wordsBg, [15,0]);
		view.addChild(npcBg);
		
		let pic = cfg.npcIcon;
		if(data.type == 2 && cfg.type == 2){
			pic = `${cfg.npcPic}_2`;
		}
		let npc = BaseBitmap.create(pic);
		// npc.setScale(cfg.type == 2 ? 0.5 : 1);
		npc.setScale(0.9);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, npc, npcBg,[0,3]);
		view.addChild(npc);
		//怪物名称
		let bpsshp = view.vo.getWipeBossMaxHp(cfg.id);
		let name = data.type == 1 ? LanguageManager.getlocal('accrossserverwipeBossAllNpcInfo', [cfg.npcName, (data.curBlood/bpsshp*100).toFixed(2)]) : cfg.npcName;
		if(data.type == 1 && cfg.type == 2){
			name = cfg.npcName;
		}
		let NameTxt:BaseTextField = ComponentManager.getTextField(name, 20,TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, NameTxt, npcBg, [106+15,data.type == 1 ? 20 : -5]);
		view.addChild(NameTxt);
		//发现者
		let findTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossAllFindPlayer', [data.findname]),18,TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, findTxt, NameTxt, [0,NameTxt.textHeight + (data.type == 1 ? 20 : 5)]);
		view.addChild(findTxt);

		if(data.type == 1){
			let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,cfg.type == 1 ? "accrossserverwipeBossAllFight" : "accrossserverwipeBossOpenBox",view.fightHandler,view)
			
			if(PlatformManager.checkIsViSp()){
				App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, wordsBg, [10,23]);
			} else {
				App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, wordsBg, [10,0]);
			}
			
			view.addChild(btn);
			if(!view.vo.isInTansuoTime()){
				btn.setEnable(false);
			}
		}
		else{
			let killTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(cfg.type == 1 ? 'accrossserverwipeBossAllKillPlayer' : 'accrossserverwipeBossAllOpenPlayer', [data.killername]),18,TextFieldConst.COLOR_BROWN);
			// if(PlatformManager.checkIsViSp()){
			// 	App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killTxt, findTxt, [0,findTxt.textHeight + 5 + 23]);
			// } else {
			// 	App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killTxt, findTxt, [0,findTxt.textHeight + 5]);
			// }
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killTxt, findTxt, [0,findTxt.textHeight + 5]);
			view.addChild(killTxt);

			let idx = data.rewardsidx;
			let reward = cfg.killPool[idx - 1][0];
			let reward_str = '';
			if(idx > 0 && reward){
				let icon = GameData.formatRewardItem(reward);
				for(let i in icon){
					if(PlatformManager.checkIsViSp()){
						reward_str += (`,${icon[i].name}+${icon[i].num}`)
					} else {
						reward_str += (`、${icon[i].name}+${icon[i].num}`)
					}
					
				}
			}

			//击杀者
			if(cfg.type == 1){
				//击杀奖励
				let killRewardTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossAllKillReward', [cfg.killScore.toString(),reward_str]),18, TextFieldConst.COLOR_WARN_GREEN);
				killRewardTxt.width = 350;
				killRewardTxt.lineSpacing = 2;
				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, killRewardTxt, killTxt, [0,killTxt.textHeight + 5]);
				view.addChild(killRewardTxt);
			}
			else{
				reward_str = reward_str.substring(1,reward_str.length);
				let openRewardTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossAllOpenReward', [reward_str]),18, TextFieldConst.COLOR_WARN_GREEN);
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
		if(!view.vo.isInTansuoTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossEnd"));
			return;
		}
		if(!view.vo.isInFightTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("accrossserverwipeBossMidDesc6"));
			return;
		}
		//前往战斗
		let cfg = view.cfg.getBossNpcItemCfgById(view._data.bosstype);
		if(cfg.type == 1){
			ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIPEBOSSBATTLEVIEW,{
				aid : AcConst.AID_CROSSSERVERWIPEBOSS,
				code : view._code,
				foeId : view._data.bosstype,
				bosskey : view._data.bosskey
			});
		}
		else{
			ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIPEBOSSSEARCHRESULTVIEW,{
				aid : AcConst.AID_CROSSSERVERWIPEBOSS,
				code : view._code,
				foeId : view._data.bosstype,
				bosskey : view._data.bosskey
			});
		}
		let infoview = ViewController.getInstance().getView('AcCrossServerWipeBossAllianceInfoView');
		infoview.hide();
	}

	//弹出消费提示框显示确认
	private confirmCallbackHandler(): void
	{
		let view = this;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_DBSHOPBUY, {
            // activeId : view.acTivityId,
            shopId : view._data.sortId + 1
        });	
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