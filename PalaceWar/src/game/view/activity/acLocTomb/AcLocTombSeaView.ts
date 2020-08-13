/**
 * author:qianjun
 * desc:东海皇陵海底寻宝界面
*/
class AcLocTombSeaView extends CommonView
{
	private _coinTxt : BaseTextField;
	private _chatTxt : BaseTextField = null;
	private _countDownText : BaseTextField = null;
	private _list : ScrollList = null;
	private _rankindex = 0;
	private _coinbg : BaseBitmap = null;
	private _buySearchBtn : BaseButton = null;

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
        return this.param.data.aid;
	}
	
	private get code() : string{
        return this.param.data.code;
	}
	
	protected getSoundBgName():string
	{
		return SoundConst.MUSIC_TOMBSEA;
	}

	protected getResourceList():string[]
	{
        let code = this.code;
		return super.getResourceList().concat([
			`tombbg1-${code}`,`tombbg5-${code}`,`battlegroundbottomchatbg-1`,`bhdqing`,`bhdqing_down`,
			`tombtop-${code}`,`tombbg2-${code}`,`tombbg4-${code}`,`tombbg7-${code}`,`tombbossitem-${code}`,`tombloopbg-${code}`,
			`tombsea${code}-`,`shuizhu0${code}`,`doorlight-${code}`,`tombboxef${code}-`,`tombbubble${code}-`,`tombdoor${code}-`,
			`tombboxcircle8-${code}`,`tombboxcircle9-${code}`,`tombboxcircle10-${code}`,
			`tombboss8-${code}`,`tombboss9-${code}`,`tombboss10-${code}`,`tombboatscan${code}-`
		]);
	}

	protected getTitleStr():string
	{
		return `loctombtitle-${this.code}`;
	}

	public initView():void
	{	
		let view = this;
		let code = view.code;
		view.vo.moviePlay = false;
		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LOCTOMB_REFRESH,view.freshView,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBMAP),view.mapCallBack,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBDIG),view.digCallBack,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBBOSSINFO),view.bossCallBack,view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBATTACK),view.attackCallBack,view);
		//总boss
		if(view.vo.getAttendQUality()){
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBBOSSINFO, {
				activeId : view.vo.aidAndCode,
				index : 0,
				x : 0,
				y : 0
			});
		}
		let top1 = BaseBitmap.create(`tombbg1-${code}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, top1, view);
		view.addChild(top1);
		view.setChildIndex(top1, 2);

		let infoBtn = ComponentManager.getButton('bhdqing', '', ()=>{
			ViewController.getInstance().openView(ViewConst.POPUP.ACLOCTOMBALLIANCEINFOVIEW,{
				aid : view.param.data.aid,
				code : view.param.data.code
			});
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, infoBtn, top1);
		view.addChild(infoBtn);

		let boattop = BaseBitmap.create(`tombtop-${code}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, boattop, top1, [120,0]);
		view.addChild(boattop);

		let boat = ComponentManager.getButton(`tombbg3-${code}`, '', ()=>{
			//排行榜
			if(view.vo.moviePlay){
                return;
			}
			if(view.vo.isEnd){
				App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
				return;
			}
			ViewController.getInstance().openView(ViewConst.POPUP.ACLOCTOMBRANKIEW,{
				aid : view.param.data.aid,
				code : view.param.data.code,
			});
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, boat, top1, [70,0]);
		view.addChild(boat);
		let tmpx = boat.x;
		let tmpy = boat.y;
		egret.Tween.get(boat, {loop : true}).to({x : tmpx - 3, y : tmpy + 1.5}, 1340).to({x : tmpx - 3.5, y : tmpy - 1.4}, 1320).to({x : tmpx, y : tmpy},1340);
		egret.Tween.get(boat, {loop : true}).to({rotation : -2}, 2000).to({rotation : 0}, 2000);

		//榜单
		let rankbtn = ComponentManager.getButton(`tombrank-${code}`, '', ()=>{
			//排行榜
			if(view.vo.moviePlay){
                return;
			}
			if(view.vo.isEnd){
				App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
				return;
			}
			ViewController.getInstance().openView(ViewConst.POPUP.ACLOCTOMBRANKIEW,{
				aid : view.param.data.aid,
				code : view.param.data.code,
			});
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, rankbtn, view.titleBg, [35,view.titleBg.height + 20]);
		view.addChild(rankbtn);

		let boatscan = ComponentManager.getCustomMovieClip(`tombboatscan${view.code}-`, 13, 70);
		boatscan.blendMode = egret.BlendMode.ADD;
		boatscan.width = 163;
		boatscan.height = 35;
		boatscan.anchorOffsetX = boatscan.width / 2;
		boatscan.anchorOffsetY = boatscan.height / 2;
		egret.Tween.get(boatscan, {loop : true}).call(()=>{
			boatscan.playWithTime(1);
		}, view).wait(1000);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boatscan, rankbtn);
		view.addChild(boatscan);

		// egret.Tween.get(boatscan).wait();

		let boatalpha = BaseBitmap.create(`tombrankalpha-${view.code}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, boatalpha, rankbtn);
		view.addChild(boatalpha);
		boatalpha.alpha = 0;
		egret.Tween.get(boatalpha, {loop : true}).to({alpha : 1}, 1000).to({alpha : 0}, 1000);
		/****顶部****/
		let qulaity = view.vo.getAttendQUality();
		if(qulaity){
			//铲子数目
			let coinbg = BaseBitmap.create(`public_9_resbg`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, coinbg, view.titleBg, [10,view.titleBg.height + 15]);
			view.addChild(coinbg);
			view._coinbg = coinbg;

			let coinicon = ComponentManager.getButton(`tombcoin_coin-${code}`, ``, null, null);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, coinicon, coinbg, [0,0]);
			view.addChild(coinicon);

			let coinTxt = ComponentManager.getTextField(``, 20);
			coinTxt.textAlign = egret.HorizontalAlign.CENTER;
			coinTxt.lineSpacing = 6;
			// coinTxt.width = 240;
			view.addChild(coinTxt);
			view._coinTxt = coinTxt;


			let rechargeBtn = ComponentManager.getButton(`mainui_btn1`, ``, view.enterInHandler, view);
			rechargeBtn.setScale(0.8);
			rechargeBtn.alpha = 0;
			view._buySearchBtn = rechargeBtn;
			view.addChild(rechargeBtn);

			view.freshCoinText();
		}
		let middletop = BaseBitmap.create(`tombbg2-${code}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, middletop, top1, [0,top1.height]);
		
		//海平面特效
		let sealine = ComponentManager.getCustomMovieClip(`tombsea${view.code}-`, 12, 130);
		sealine.width = 639;
		sealine.height = 37;
		sealine.anchorOffsetX = sealine.width / 2;
		sealine.anchorOffsetY = sealine.height / 2;
		sealine.playWithTime(-1);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, sealine, top1, [0,-17]);
		/****中部滑动列表****/
		if(qulaity){
			let arr = view.vo.getFloorData(0);
			let rect = egret.Rectangle.create();
			rect.setTo(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 65 - middletop.y);
			let scrollList = ComponentManager.getScrollList(AcLocTombSeaFloorItem, arr, rect, code, 30);
			//scrollList.setContentPosY(middletop.height);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, middletop);
			view.addChild(scrollList);
			scrollList.bounces = false;
			view._list = scrollList;
			scrollList.bindMoveCompleteCallback(()=>{
				//发消息请求数据
				let curFloor = view.getCurFloor();
				let empty = false;
				let startIdx = (curFloor - 1) * 6 + 1;
				let endIdx = (curFloor + 6) * 6 + 1;
				for(let i = startIdx; i <= endIdx; ++ i){
					let data = view.vo.getBoxDataById(i);
					if(!data){
						empty = true;
						break;
					}
				}
				if(empty){
					let index = Math.max(Math.floor(curFloor / 10), 1);
					let startFloor = index;
					//发请求
					NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBMAP, {
						activeId : view.vo.aidAndCode,
						indexs : view.getIndexs(startFloor)
					});
				}
			},view);
		}
		else{
			view.addChild(middletop);

			let boattop1 = BaseBitmap.create(`tombbg7-${code}`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boattop1, middletop, [0,middletop.height]);
			view.addChild(boattop1);

			let num = Math.ceil((GameConfig.stageHeigth - boattop1.y - boattop1.height) / 161);
			for(let i = 0; i < num; ++ i){
				let boatbg = BaseBitmap.create(`tombloopbg-${code}`);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boatbg, boattop1, [0,boattop1.height + (i * boatbg.height)]);
				view.addChild(boatbg);
			}
			//无参赛资格提示
			let wordsBg = BaseBitmap.create("public_tipbg");
			view.addChild(wordsBg);

			let period = view.vo.getCurPeriod();
			let str = LanguageManager.getlocal(`loctombtimetip${period}-${view.code}`, [App.DateUtil.getFormatBySecond(view.vo.getCountDownTime())]);
			let wordsText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`loctombnoattend-${view.code}`, [Api.playerVoApi.getPlayerOfficeByLevel(this.cfg.lvNeed), str]), TextFieldConst.FONTSIZE_CONTENT_COMMON);
			wordsText.lineSpacing = 6;
			wordsText.textAlign = egret.HorizontalAlign.CENTER;
			view._countDownText = wordsText;
			wordsBg.height = wordsText.textHeight + 50;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wordsBg, boattop1, [0,100]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wordsText, wordsBg);
			view.addChild(wordsText);
		}
		let top2 = BaseBitmap.create(`tombbg5-${view.code}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, top2, middletop);
		view.addChild(top2);
		view.addChild(sealine);

		/****底部****/
		let bottomBg = BaseBitmap.create(`tombbottombg-${code}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
		view.addChild(bottomBg);
		if(qulaity){
			//跳转层数
			let jumpBtn = ComponentManager.getButton(`tombjumpbtn-${code}`, `tombjump-${code}`, view.jumpClick, view);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, jumpBtn, bottomBg);
			view.addChild(jumpBtn);
		}
		//跨服有泡泡特效
		if(Number(code) == 1){
			view.showBublle();
		}
	}

	//吐泡泡动画
	private showBublle():void{
		let view = this;
		//粒子效果
		/** 
		 *  走到水面的时长区间：12s-40s
			大小区间：15%-35%
			同屏数量12个左右，最大粒子数量20个
		*/
		let num = 15;
		for(let i = 0; i < num; ++ i){
			let bubble = BaseBitmap.create(`shuizhu0${view.code}`);
			bubble.name = `bubble${i}`
			view.addChild(bubble);
			let time = App.MathUtil.getRandom(12,41);
			let speed = (GameConfig.stageHeigth - 65 - 244 ) / (time * 1000);

			
			let scale = App.MathUtil.getRandom(15,36);
			bubble.setScale(scale / 100);
			bubble.x = App.MathUtil.getRandom(0, GameConfig.stageWidth - 64);
			bubble.y = GameConfig.stageHeigth - 65;
			bubble.alpha = 0;
			egret.Tween.get(bubble, {loop : true}).wait(4000 * i).to({y : GameConfig.stageHeigth - 65 - 64, alpha : 1}, 64 / speed).to({y : 308}, (GameConfig.stageHeigth - 438) / speed).to({y : 244, alpha : 0}, 64 / speed).call(()=>{
				time = App.MathUtil.getRandom(12,41);
				speed = (GameConfig.stageHeigth - 65 - 244 ) / (time * 1000);
				let newscale = App.MathUtil.getRandom(15,36);
				bubble.setScale(newscale / 100);
				bubble.x = App.MathUtil.getRandom(0, GameConfig.stageWidth - 64);
				bubble.y = GameConfig.stageHeigth - 65;
			});
			view.addChild(bubble);
		}
	}

	private removeBubble():void{
		let view = this;
		let num = 15;
		for(let i = 0; i < num; ++ i){
			let bubble = view.getChildByName(`bubble${i}`);
			if(bubble){
				egret.Tween.removeTweens(bubble);
				view.removeChild(bubble);
				bubble = null;
			}
		}
	}

	private judgeFloorById(id : number):number{
		let view = this;
		let floor = 1;
		return floor;
	}

	private getCurFloor():number{
		let view = this;
		let list = view._list;
		let top = list.scrollTop;
		let num = Math.ceil((top - 337) / 172) + 1;
		return Math.max(num, 1);
	}

	private getIndexs(num : number):number[]{
		let view = this;
		let arr = [];
		let max = Math.floor(view.vo.getFloorNum() / 10);
		for(let i = 0; i < 3; ++ i){
			if(num + i < max){
				arr.push(num + i);
			}
		}
		return arr;
	}

	private jumpToFloor(floor : number):void{
		let view = this;
		let list = view._list;
		let index = Math.max(Math.floor(floor / 10) - 1, 1);
		
		let startFloor = index;
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBMAP, {
			activeId : view.vo.aidAndCode,
			indexs : view.getIndexs(startFloor)
		});
		//337 172
		list.setScrollTopByIndex(floor + 1, 300);
	}

	private jumpClick():void{
		let view = this;
		if(view.vo.moviePlay){
			return;
		}
		let code = view.code;
		let curfloor = view.getCurFloor();
		ViewController.getInstance().openView(ViewConst.POPUP.ACLOCTOMBJUMPVIEW,{
			aid : view.aid,
			code : view.code,
			callback : (data)=>{
				view.jumpToFloor(data);
			},
			callobj : view,
			curFloor : curfloor
		});
	}

	private freshCoinText():void{
		let view = this;
		if(view._coinTxt){
			let coininfo = view.vo.getTanSuoNum();
			let str = '';
			view._buySearchBtn.alpha = 0;
			if(coininfo.num){
				view._coinTxt.text = coininfo.num.toString();
				view._coinTxt.textColor = TextFieldConst.COLOR_WHITE;
				
			}
			else if(coininfo.time){
				view._coinTxt.textColor = TextFieldConst.COLOR_WARN_RED3;
				view._coinTxt.text = LanguageManager.getlocal(`loctombcointip-${view.code}`, [App.DateUtil.getFormatBySecond(coininfo.time)]);
				view._buySearchBtn.alpha = 1;
			}
			view._coinbg.width = view._coinTxt.textWidth + 70;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view._coinTxt, view._coinbg, [10,14]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._buySearchBtn, view._coinTxt, [view._coinTxt.textWidth + 10,0]);

		}
	}

	private infoClick():void{
		let view = this;
		ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSALLIANCEINFOVIEW,{
			aid : view.param.data.aid,
			code : view.param.data.code
		});
	}

	protected getRuleInfo():string{
		return `loctombrule-${this.code}`;
	}

	protected getRuleInfoParam():string[]
	{
		let time = App.DateUtil.formatSvrHourByLocalTimeZone(24).hour; 
		return [this.cfg.initialExplore.toString(), time.toString(), this.cfg.needKillNum.toString()];
	}

	private moreClick():void{
		let view = this;
		ViewController.getInstance().openView(ViewConst.POPUP.ACWIPEBOSSKILLINFOIEW,{
			aid : view.param.data.aid,
			code : view.param.data.code
		});
	}

	private freshView():void{
		let view = this;
		view.freshCoinText();
	}

	private _count = 0;
	public tick():void
	{	
		let view = this;
		if(!view.vo.isInActTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
			view.hide();
			return;
		}

		if(!view.vo.isInFightTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal(`loctombtime9-${view.code}`));
			view.hide();
			return;
		}

		let unit = view.vo.getTanSuoNum();
		if(!unit.killAll){
			view.freshCoinText();

			// view.freshMid();
			++ view._count;
			if(view._count == 300){
				view._count = 0;
				NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBBOSSINFO, {
					activeId : view.vo.aidAndCode,
					index : 0,
					x : 0,
					y : 0
				});
			}
		}
		if(view._countDownText){
			let period = view.vo.getCurPeriod();
			let str = LanguageManager.getlocal(`loctombtimetip${period}-${view.code}`, [App.DateUtil.getFormatBySecond(view.vo.getCountDownTime())]);
			view._countDownText.text = LanguageManager.getlocal(`loctombnoattend-${view.code}`, [Api.playerVoApi.getPlayerOfficeByLevel(this.cfg.lvNeed), str]);
		}
	}

	private enterInHandler() : void{
		let view = this;
		if(view.vo.moviePlay){
			return;
		}
		if(!view.vo.isInActTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
			view.hide();
			return;
		}
		let unit = view.vo.getTanSuoNum();
		if(unit.killAll){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc3"));
			return;
		}
		if(unit.num){
			// NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSSEARCH, {
			// 	activeId : view.vo.aidAndCode,
			// });	
		}
		else{
			let searchBuyNum = view.vo.getBuySearchNum();
			let needNum = view.cfg.buyNumCost[Math.min(searchBuyNum,9)];

			let message = LanguageManager.getlocal(`loctombbuysearchtip-${view.code}`,[String(needNum)]);
			let mesObj = {
				confirmCallback:()=>{
					let searchBuyNum = view.vo.getBuySearchNum();
					let needNum = view.cfg.buyNumCost[Math.min(searchBuyNum,9)];
					if(Api.playerVoApi.getPlayerGem() >= needNum){
						NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBBUYSEARCH, {
							activeId : view.vo.aidAndCode,
						});	
					}
					else{
						App.CommonUtil.showTip(LanguageManager.getlocal('practice_batchBuyNotenoughdes'));
					}
				}, 
				handler: this, 
				icon:  "itemicon1",
				iconBg: "itembg_1", 
				num: Api.playerVoApi.getPlayerGem(), 
				useNum:needNum,
				msg: message ,
				id : 1,
			};
			ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );
		}
	}
	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_LOCTOMBMAP,requestData:{
			activeId : view.vo.aidAndCode,
			indexs : [0,1,2]
		}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view.vo.setMapInfo(data.data.data.map);
		// view.vo.setBossNumInfo(data.data.data);
	}

	private mapCallBack(evt : egret.Event):void{
		let view = this;
		let data = evt.data.data.data;
		if(data && data.map){		
			view.vo.setMapInfo(data.map);
			//刷新数据
			view.freshMapData(view.getCurFloor());
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LOCTOMB_FRESH); 
		}
	}

	private bossCallBack(evt : egret.Event):void{
		let view = this;
		let data = evt.data.data.data;
		if(data){	
			//特殊数据
			if((data.index + data.x + data.y) == 0){
				view.vo.setBossInfo({
					bosstype : 7,
					bosskey : 1,
					bosshp : Number(data.bosshp),
					damagelog : data.damagelog,
					killnum : data.killnum,
					killer : data.killer,
					joinnum : data.joinnum,
					bossMaxHp : data.bossMaxHp,
					bossNum : data.bossNum
				});
			}
			let bossitem : any = view._list.getItemByIndex(0);
			bossitem.freshBossInfo();
		}
	}

	//默认刷新30层数据
	private freshMapData(floor : number, floorNum : number = 30):void{
		let view = this;
		let index = Math.max(Math.floor(floor / 10) * 10, 1);
		let startFloor = index;
		let endFloor = Math.min((index + floorNum), view.vo.getFloorNum())
		for(let i = startFloor; i <= endFloor; ++ i){
			let item : any = view._list.getItemByIndex(i);
			if(item){
				item.freshData();
			}
		}
	}

	private digCallBack(evt : egret.Event):void{
		let view = this;
		let data = evt.data.data.data;
		if(data && data.map){
			view.vo.setMapInfo(data.map);
			view.freshMapData(view.getCurFloor(), 10);
			if(data.score){				
				let strList = [];
				let scrore = data.score;
				let flyStr1 = LanguageManager.getlocal("acPunishGetScoreTxt1",[String(scrore)]);
				strList.push({tipMessage:flyStr1});

				let flyStr2 = LanguageManager.getlocal("acPunishGetScoreTxt3",[String(scrore)]);
				strList.push({tipMessage:flyStr2} );
				
				egret.setTimeout( ()=>{
					App.CommonUtil.playRewardFlyAction(strList);
				},this,800);
				//App.CommonUtil.showTip(LanguageManager.getlocal(`acwipeBossBattleScore`, [data.score]));
			}
			if(data.hasDig){
				App.CommonUtil.showTip(LanguageManager.getlocal(`loctombattacktip4-${view.code}`));
			}
			else{
				let digid = view.vo.getClickIdx();
				let floor = Math.ceil(digid / 6);
				let param = view.vo.getParamMap(digid);
				let item : any = view._list.getItemByIndex(floor);
				if(item){
					item.freshAfterDig(param.y - 1);
				}
			}
			// view.freshMapData(floor, 0);
		}
	}

	private attackCallBack(evt : egret.Event):void{
		let view = this;
		let data = evt.data.data.data;
		if(data && data.map){
			let index = data.index;
			let x = data.x;
			let y = data.y;
			let id = 0;
			if((index + x + y) > 0){
				id = index * 10 * 6 + (x - 1) * 6 + y;
			}

			view.vo.setMapInfo(data.map);

			view.freshMapData(view.getCurFloor(), 10);

			let boxdata = view.vo.getBoxDataById(id);
			if(boxdata){
				let cfg = view.cfg.getBossNpcItemCfgById(boxdata.foe);
				if(cfg){
					if(cfg.type == 3){
						let hasKill = data.hasKill;
						if (hasKill == 1) {
							App.CommonUtil.showTip(LanguageManager.getlocal(`loctombattacktip3-${view.code}`));
							return ;
						}
						ViewController.getInstance().openView(ViewConst.POPUP.ACLOCTOMBGETREWARDVIEW,{
							aid : view.param.data.aid,
							code : view.param.data.code,
							reward : boxdata.rewards
						});
					}
					else if(view.vo.getFinalbossStatusById() == 1){
						NetManager.request(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBBOSSINFO, {
							activeId : view.vo.aidAndCode,
							index : 0,
							x : 0,
							y : 0
						});
					}
				}
			}
		}
	}

	private searchCallback(evt : egret.Event):void{
		let view = this;
		if(!view.vo.isInActTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
			view.hide();
			return;
		}
		if(!view.vo.isInFightTime()){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossMidDesc6"));
			view.hide();
			return;
		}
		if(evt.data.data.ret >= 0){
			ViewController.getInstance().openView(ViewConst.COMMON.ACWIPEBOSSSEARCHRESULTVIEW,{
				aid : view.param.data.aid,
				code : view.param.data.code,
				foeId : evt.data.data.data.bosstype,
				bosskey : evt.data.data.data.bosskey
			});
		}
		else if(evt.data.data.ret == -3){
			App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossSearchTip5"));
			this.request(NetRequestConst.REQUEST_ACTIVITY_WIPEBOSSGETBOSSNUM, {
				activeId : this.vo.aidAndCode,
			});
		}
	}


	public dispose():void
	{
		let view = this;
		view.vo.clearMapInfo();
		view.removeBubble();
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_TOMB_REFRESH,view.freshView,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBMAP),view.mapCallBack,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBDIG),view.digCallBack,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBBOSSINFO),view.bossCallBack,view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_LOCTOMBATTACK),view.attackCallBack,view);
		if(view._coinTxt){
			view._coinTxt = null;
		}	
		if(view._countDownText){
			view._countDownText = null;
		}
		if(view._list){
			view._list = null;
		}
		view._count = 0;
		view._chatTxt = null;
		view._rankindex = 0;
		view.vo.moviePlay = false;
		view._coinbg = null;
		view._buySearchBtn = null;
		super.dispose();
	}
}