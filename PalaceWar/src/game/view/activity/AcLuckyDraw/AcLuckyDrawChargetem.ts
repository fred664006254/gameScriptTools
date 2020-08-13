/**
 * 充值奖励item
 * author qianjun
 */
class AcLuckyDrawChargetem  extends ScrollListItem
{
	private _data : any = null;
	private _code : string;
	private _id : number;
	private _btn : BaseButton = null;
	private _Index : number = 0;
	public constructor(){
		super();
	}

	private get cfg() : Config.AcCfg.LuckyDrawCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this._code);
    }

    private get vo() : AcLuckyDrawVo{
        return <AcLuckyDrawVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this._code);
    }

    private get aid():string{
        return AcConst.AID_LUCKYDRAW;
	}

	private get code():string{
        return this._code;
	}

	private get acTivityId() : string{
        return `${this.aid}-${this._code}`;
    }

	protected initItem(index:number,data:any,itemParam?:any){
		let view = this;
		view._data = data;
		view.width = 530;
		view._code = itemParam;
		view._id = data.id;
		view._Index = index;
		/**
		 * 	needGem : unit.needGem,
			getReward : unit.getReward,
			id : Number(i),
			specialGift : unit.specialGift,
			isGet : view.vo.isGetRecharge(Number(i))
		 *  */
		let reward = data.getReward;
		reward = `1004_0_${data.specialGift}_${view.getUiCode()}|` + reward;
		let rIcons = GameData.getRewardItemIcons(reward, true, true);
		let row = Math.ceil(rIcons.length / 5);//行数
		view.height = 5 + 30 + 5 + row * 108 + (row - 1) * 5 + 10 + 80 + view.getSpaceY();

		let bg = BaseBitmap.create("public_9_bg14");
		bg.width = 524;
		bg.height = view.height - view.getSpaceY();
		view.addChild(bg);

		let charge_redBg = BaseBitmap.create("acmidautumnview_titlebg");
		charge_redBg.width = 508;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, charge_redBg, bg, [0,10]);
		view.addChild(charge_redBg);

		let line = BaseBitmap.create(`public_line3`);
		view.addChild(line);

		let roundTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawRechargeNum-${view.code}`, [data.needGem]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		line.width = roundTxt.textWidth + 280;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, charge_redBg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundTxt, line);
		view.addChild(roundTxt);

		let rewardBg = BaseBitmap.create("public_9_managebg");
		rewardBg.width = 502;
		view.addChild(rewardBg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardBg, charge_redBg, [0,charge_redBg.height+5]);

		let tmpY = 5;
		let scale = 0.85;
		let itemHeight = 0;
		for(let i in rIcons){
			let icon = rIcons[i];
			let idx = Number(i);
			icon.setScale(scale);
			icon.x = rewardBg.x + 4 + (idx % 5) * (icon.width - 8);
			icon.y = rewardBg.y + 5 + Math.floor(idx / 5) * (icon.height - 8);
			view.addChild(icon);
			itemHeight = icon.height;
		}
		rewardBg.height = (rIcons.length % 5 == 0 ? rIcons.length / 5 : Math.floor(rIcons.length / 5) + 1) * itemHeight;


		let progress = ComponentManager.getProgressBar("progress3","progress3_bg",375);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, titelTxt, [0,titelTxt.height+5]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, rewardBg, [2,rewardBg.height+32]);
		view.addChild(progress);
		progress.setPercentage(view.vo.getChargeNum()/data.needGem,`${view.vo.getChargeNum()}/${data.needGem}`,TextFieldConst.COLOR_QUALITY_WHITE);
		progress.scaleX =0.95;

		let titelTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acLuckyDrawRechargeTotalNum-${view.code}`), 20, TextFieldConst.COLOR_BROWN);
		view.addChild(titelTxt);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titelTxt, rewardBg, [147,rewardBg.height+7]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titelTxt, progress, [0,-25]);

		if(view.vo.isGetRecharge(data.id)){
			let flag = BaseBitmap.create(`collectflag`);
			flag.setScale(0.6);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, flag, bg, [10,10]);
			view.addChild(flag);
		}
		else{
			let str = ``;
			let res = ``;
			if(view.vo.getChargeNum() < data.needGem){
				res = ButtonConst.BTN_SMALL_RED;
				str = `acRechargeBoxPopupViewGoRecharge`;
			}
			else{
				res = ButtonConst.BTN_SMALL_YELLOW;
				str = `taskCollect`;
			}
			let btn = ComponentManager.getButton(res, str, view.buyHandler, view);
			view.addChild(btn);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn, bg, [10,10]);
			view._btn = btn;
			if(view.vo.getChargeNum() >= data.needGem){
				App.CommonUtil.addIconToBDOC(btn);
				btn.setGray(view.vo.isActyEnd());
				if (this.vo.isActyEnd())
				{
					App.CommonUtil.removeIconFromBDOC(btn);
				}
			}
			else{
				btn.setGray(!view.vo.isInActivity());
			}
		}
	}
	
	private buyHandler(param:any):void{
		let view = this;
		if(view.vo.isActyEnd()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
		}

		if(view.vo.getChargeNum() < view._data.needGem){
			if(!view.vo.isInActivity()){
				App.CommonUtil.showTip(LanguageManager.getlocal('acBattlePassTimeEnd'));
				return;
			}
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		}
		else{
			view.vo.selIdx = view._id;
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LUCKYDRAWGETRECHARERWD,{
				activeId : view.acTivityId,
				idx : view._id + 1,
			});
		}
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LUCKYDRAW_FRESH_ITEM);
	}
	protected getUiCode(): string {
		if (this._code == "3") {
			return "1";
		}
        else if(this._code == "4")
        {
            return "2";
		}
		else if(this._code == "6")
        {
            return "5";
        }
		return this.code;
	}
	public getSpaceY():number{
		return 0;
	}
	
	public dispose():void{
		let view = this;
		view._btn = null;
		view._id = 0;
		view._Index = 0;
		super.dispose();
	}
}