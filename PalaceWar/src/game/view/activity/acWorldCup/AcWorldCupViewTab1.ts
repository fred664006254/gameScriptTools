/*
author : qinajun
date : 2018.4.14
desc : 世界杯竞猜活动
*/
class AcWorldCupViewTab1 extends AcCommonViewTab
{
	private _daypoint1 : BaseLoadBitmap = null;
	private _daypoint2 : BaseLoadBitmap = null;
	private _daypoint3 : BaseLoadBitmap = null;
	private _dateDescText1 : BaseTextField = null;
	private _dateDescText2 : BaseTextField = null;
	private _dateDescText3 : BaseTextField = null;
	private _list : ScrollList = null;

	public constructor() 
	{
		super();
		this.initView();
	}
	
	private get cfg() : Config.AcCfg.WorldCupCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcWorldCupVo{
        return <AcWorldCupVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

	protected initView():void
	{	
		let view = this;
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPVOTE), view.voteCallbackHandle, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO), view.fresh_day, view);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO, {
			activeId : view.acTivityId
		});

		let mainview : any = ViewController.getInstance().getView('AcWorldCupView');
		view.height = mainview.tabHeight;
		view.width = mainview.tabWidth;
		
		let line = BaseBitmap.create('worldcupline');
		view.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0,20]);
		view.addChild(line);

		//进度点
		let pos = {
			1 : {Layout : LayoutConst.leftverticalCenter, desc : [120,0]},
			2 : {Layout : LayoutConst.horizontalCenterverticalCenter, desc : [0,0]},
			3 : {Layout : LayoutConst.rightverticalCenter, desc : [120,0]}
		};

		for(let i in pos){
			let point = BaseLoadBitmap.create('worldcupin_3');
			point.width = 21;
			point.height = 21;
			let unit = pos[i];
			view.setLayoutPosition(unit.Layout, point, line, unit.desc);
			view[`_daypoint${i}`] = point;
			view.addChild(point);
			let dateText = ComponentManager.getTextField(LanguageManager.getlocal(`AcWorldCupDate${i}`), 22, TextFieldConst.COLOR_BLACK);//
			view.setLayoutPosition(LayoutConst.horizontalCentertop, dateText, point, [0,8 + point.height]);
			view.addChild(dateText);

			let dateDescText = ComponentManager.getTextField(LanguageManager.getlocal(`AcWorldCupDateDesc${i}`), 22, 0xa28d6a);//
			view.setLayoutPosition(LayoutConst.horizontalCentertop, dateDescText, dateText, [0,6 + dateText.textHeight]);
			view[`_dateDescText${i}`] = dateDescText;
			view.addChild(dateDescText);
		}
		// let countryArr = [
		// 	{
		// 		'country' : 'DEU',
		// 	},
		// 	{
		// 		'country' : 'PRT',
		// 	},
		// 	{
		// 		'country' : 'BRA',
		// 	},
		// 	{
		// 		'country' : 'ESP',
		// 	}
		// ];
		let tmpRect =  new egret.Rectangle(0,0,570, view.height - 160 - (view._dateDescText1.y + view._dateDescText1.textHeight));
		let scrollList = ComponentManager.getScrollList(AcWorldCupTab1Item, [], tmpRect, view.code);
		//scrollList.addTouchTap(this.clickItemHandler, this);
		view._list = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, view, [0, view._dateDescText1.y + view._dateDescText1.textHeight + 20]);
		view.addChild(scrollList); 
	}

	private fresh_day(evt : egret.Event):void{
		let view = this;
		let curPeriod = view.vo.getCurPeriod();
		for(let i = 1; i < 4; ++i){
			let point = view[`_daypoint${i}`];
			if(point){
				let pointPeriod = i;
				let stauts = '3';
				if(curPeriod > pointPeriod){
					stauts = '2';
				}
				else if(curPeriod == pointPeriod){
					stauts = '1';
				}
				view[`_dateDescText${i}`].textColor = Number(stauts) < 3 ? TextFieldConst.COLOR_WARN_YELLOW2 : 0xa28d6a;
				point.setload(`worldcupin_${stauts}`);
			}
		}
		let data = evt.data.data.data;
		let arr = [];
		if(data.win){
			view.vo.setChamp(data.win);
		}
		
		for(let i in data.fightFour){
			let unit = data.fightFour[i];
			for(let key in unit){
				arr.push({
					'country' : key,
					'points' : unit[key],
					'champ' : data.win ? data.win : '0'
				});
			}
		}
		view._list.refreshData(arr,view.code);
	}

	private fresh_jindu():void{
		let view = this;
	}

	private voteCallbackHandle(evt):void{
		if(evt.data.data.ret < 0){
			return;
		}
		App.CommonUtil.showTip(LanguageManager.getlocal("AcWorldCupVoteSuc"));
		let voteview = ViewController.getInstance().getView('AcWorldCupVoteView');
		if(voteview){
			voteview.hide();
		}
		let view = this;
		let data = evt.data.data.data;
		let arr = []; 
		for(let i in data.fightFour){
			let unit = data.fightFour[i];
			for(let key in unit){
				arr.push({
					'country' : key,
					'points' : unit[key],
					'champ' : data.win ? data.win : '0'
				});
			}
		}
		if(arr.length){
			view._list.refreshData(arr);
		}
		// let data = evt.data.data.data;
	}

	public refreshWhenSwitchBack():void{
		let view = this;
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO, {
			activeId : view.acTivityId
		});
	}

	private update() :void{
		let view = this;
		if(!this.vo){
			return;
		}
	}
	
	public dispose():void
	{	
		let view = this;
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPVOTE), view.voteCallbackHandle, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_WORLDCUPINFO), view.fresh_day, view);
		super.dispose();
	}
}