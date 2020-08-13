/**
 * 爆竹奖励item
 * author qianjun
 */
class AcNewYearCrackerRewardItem  extends ScrollListItem
{
	private _data : any = null;
	private _code : string;
	private _id : number;
	private _btn : BaseButton = null;
	private _Index : number = 0;
	public constructor(){
		super();
	}
	private get cfg() : Config.AcCfg.NewYearCrackerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcNewYearCrackerVo{
        return <AcNewYearCrackerVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return AcConst.AID_NEWYEARCRACKER;
	}

	private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

	protected initItem(index:number,data:any,itemParam?:any){
		let view = this;
		view._data = data;
		view.width = 528;
		view._code = itemParam;
		view._id = data.id;
		view._Index = index;

		let reward = data.getReward;
		let rIcons = GameData.getRewardItemIcons(reward, true);
		let row = Math.ceil(rIcons.length / 5);//行数
		view.height = 100 + row * 108 * 0.85 + (row - 1) * 5 + 70 + view.getSpaceY();

		let bg = BaseBitmap.create("public_9_bg14");
		bg.width = view.width;
		bg.height = view.height - view.getSpaceY();
		view.addChild(bg);

		let charge_redBg = BaseBitmap.create("acmidautumnview_titlebg");
		charge_redBg.width = 485;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, charge_redBg, bg, [0,10]);
		view.addChild(charge_redBg);

		let line = BaseBitmap.create(`public_line3`);
		view.addChild(line);

		let roundTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerName${data.id}-${view._code}`), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		line.width = roundTxt.textWidth + 280;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, charge_redBg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, roundTxt, line);
		view.addChild(roundTxt);

		let tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerRewardTip1-${view._code}`, [data.needItem]), 20, TextFieldConst.COLOR_BROWN);
		let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`acNewYearCrackerRewardTip2-${view._code}`, [LanguageManager.getlocal(`acNewYearCrackerName${data.id}-${view._code}`)]), 20, TextFieldConst.COLOR_BROWN);
		let itemicon = BaseBitmap.create(`crackericon1-${view._code}`);
		itemicon.setScale(0.35);
		view.addChild(tipTxt1);
		view.addChild(itemicon);
		view.addChild(tipTxt2);
		
		let posX = (view.width - tipTxt1.textWidth - tipTxt2.textWidth - itemicon.width * itemicon.scaleX) / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt1, bg, [posX, 55]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, itemicon, tipTxt1, [tipTxt1.textWidth, 0]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tipTxt2, itemicon, [itemicon.width * itemicon.scaleX, 0]);

		let tmpY = 5;
		let tmpX = (bg.width - (Math.min(rIcons.length, 5) *  (108 * 0.86) + (Math.min(rIcons.length, 5) - 1) * 8))/2
 		for(let i in rIcons){
			let icon = rIcons[i];
			let idx = Number(i);
			icon.setScale(0.86);
			icon.x = tmpX + (idx % 5) * (108 * icon.scaleX + 8);
			icon.y = 90 + Math.floor(idx / 5) * (108 * icon.scaleY + 5);
			view.addChild(icon);
		}

		let progress = ComponentManager.getProgressBar("progress5","progress3_bg",357);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, titelTxt, [0,titelTxt.height+5]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, progress, bg, [10,20]);
		view.addChild(progress);
		progress.setPercentage(view.vo.getCrackerNum()/data.needItem,`${view.vo.getCrackerNum()}/${data.needItem}`,TextFieldConst.COLOR_QUALITY_WHITE);

		if(view.vo.getJinduReward(data.id)){
			let flag = BaseBitmap.create(`collectflag`);
			flag.setScale(0.6);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, flag, bg, [10,10]);
			view.addChild(flag);
		}
		else{
			let btn = ComponentManager.getButton(view.vo.getCrackerNum() < data.needItem ? ButtonConst.BTN_SMALL_RED : ButtonConst.BTN_SMALL_YELLOW, view.vo.getCrackerNum() < data.needItem ? `acNewYearCrackerRewardBtn1-${view._code}` : `acNewYearCrackerRewardBtn2-${view._code}`, view.buyHandler, view);
			view.addChild(btn);
			// btn.setGray(!view.vo.isInActy());
			if (!view.vo.isInActy()){
				if (view.vo.getCrackerNum() < data.needItem){
					btn.setGray(true);
				}
				else{
					btn.setGray(false);
					btn.setText("taskCollect");
				}	
			}
			else{
				btn.setGray(false);
				if (view.vo.getCrackerNum() >= data.needItem){
					btn.setText("taskCollect");
				}
			}
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, btn, bg, [10,10]);
			view._btn = btn;
			// if(view.vo.isActyEnd()){

			// }
			// else{
			// 	if(view.vo.getCurRoundGetState(data.id) == 1){
			// 		App.CommonUtil.addIconToBDOC(btn);
			// 	}
			// }
			
		}
	}
	
	private buyHandler(param:any):void{
		let view = this;
		// if(!view.vo.isInActy()){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
		// 	return;
		// }
		// if(view.vo.getCrackerNum() < view._data.needItem){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("PlayerReturnTip2"));
		// 	return;
		// }
		//前往充值
		if(view.vo.getCrackerNum() < view._data.needItem){
			if(!view.vo.isInActy()){
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		}
		else{
			if (view.vo.isStart && view.vo.checkIsInEndShowTime()){
				NetManager.request(NetRequestConst.REQUST_ACTIVITY_GETCRACKERREWARD,{
                    activeId : view.acTivityId,
                    rkey : Number(view._id),
				});
				return;
			}
			let detailview = ViewController.getInstance().getView(ViewConst.POPUP.ACNEWYEARCRACKERDETAILPOPUPVIEW);
			if(detailview){
				detailview.hide();
			}
			ViewController.getInstance().getView(ViewConst.POPUP.ACNEWYEARCRACKERREWARDPOPUPVIEW).hide();
		}
		// view.vo.selIdx = view._Index;
		// NetManager.request(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD,{
		// 	activeId : view.acTivityId,
		// 	circleId : view._data.num,
		// });
		
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH);
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