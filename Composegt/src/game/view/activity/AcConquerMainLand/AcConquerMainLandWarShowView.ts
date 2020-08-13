/**
 * 门客战斗演示界面
 * author qianjun
 */
class AcConquerMainLandWarShowView extends CommonView {
	private _servantRoleleft: BaseLoadBitmap = null;
	private _servantRoleright: BaseLoadBitmap = null;
	private _servantClipleft: CustomMovieClip = null;
	private _servantClipright: CustomMovieClip = null;
	private _roleGroupleft: BaseDisplayObjectContainer = null;
	private _roleGroupright: BaseDisplayObjectContainer = null;


	private _topGroup: BaseDisplayObjectContainer = null;

	private _midGroupleft: BaseDisplayObjectContainer = null;
	private _midGroupright: BaseDisplayObjectContainer = null;
	private _playerNameTxtleft: BaseTextField = null;
	private _playerNameTxtright: BaseTextField = null;
	private _playerProgressleft: ProgressBar = null;
	private _playerProgressright: ProgressBar = null;
	private _winBitMapTxtleft: BaseBitmapText = null;
	private _winBitMapTxtright: BaseBitmapText = null;
	private _winBitMapleft: BaseBitmap = null;
	private _winBitMapright: BaseBitmap = null;
	private _winGroupleft: BaseDisplayObjectContainer = null;
	private _winGroupright: BaseDisplayObjectContainer = null;

	private _memberListleft: ScrollList = null;
	private _memberListright: ScrollList = null;

	private _leftIdx: number = 0;
	private _rightIdx: number = 0;
	private _winFlag: string = '';
	private _leftrolePosX = 0;
	private _rightrolePosX = 0;
	private _rolePosY = 0;
	private _scrollY = 0;
	private _round = 0;

	private _log: any = {};
	private _damageLog: any = {};
	private _roundLog: any = {};
	private _leftLog: any[] = [];
	private _rightLog: any[] = []
	private _leftvsInfo: any = {};
	private _rightvsInfo: any = {};
	private _lunkong: boolean = false;
	private _flag = false;
	private _together = false;
	private _vsImg: BaseBitmap = null;

	private _planDescBgleft: BaseBitmap = null;
	private _planDescBgright: BaseBitmap = null;
	private _planDescArrowleft: BaseBitmap = null;
	private _planDescArrowright: BaseBitmap = null;
	private _planDescTxtleft: BaseTextField = null;
	private _planDescTxtright: BaseTextField = null;
	private _planGroupleft: BaseDisplayObjectContainer = null;
	private _planGroupright: BaseDisplayObjectContainer = null;

	private _skinEquip = [];

	private _winGroup: BaseDisplayObjectContainer = null;
	private _showSkin = 0;

	public constructor() {
		super();
	}

	private get cfg(): Config.AcCfg.ConquerMainLandCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	private get vo(): AcConquerMainLandVo {
		return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
	}

	private get code(): string {
		return this.param.data.code;
	}

	private get aid(): string {
		return this.param.data.aid;
	}

	private get acTivityId(): string {
		return `${this.param.data.aid}-${this.code}`;
	}

	private get uiCode(): string {
		let code = '';
		switch (Number(this.code)) {
			case 1:
			case 2:
				code = `1`;
				break;
			default:
				code = this.code;
				break;
		}
		return code;
	}

	protected getSoundBgName(): string {
		return 'music_atkrace';
	}

	// protected getRequestData():{requestType:string,requestData:any}{	
	// 	let view = this;
	// 	if(view.param.data.test){
	// 		return null;
	// 	}
	// 	else{
	//         return {requestType:NetRequestConst.REQUEST_COUNTRYWAY_WARDETAIL,requestData:{
	// 			city : view.api.getCityIndex(view.param.data.cityId),
	// 		}};
	// 	}
	// }

	private _self = false;
	protected initdata(rdata: any): void {
		let view = this;
		let arr = ['left', 'right'];

		let data = view.param.data.test ? rdata.data : rdata;
		//fightteam = {mteam={},fteam={}}
		view._self = false;
		for (let i in arr) {
			let info = Number(i) == 0 ? data.info : data.tinfo;
			let obj: any = {};
			let log = [];
			let total = 0;

			view[`_${arr[i]}Log`] = [];
			view[`_${arr[i]}vsInfo`] = {};
			//对阵门客
			for (let j in info.team) {
				let unit = info.team[j];
				total += unit.dps;
				log.push({
					servantId: unit.sid,
					attr: unit.dps,
					name: Config.ServantCfg.getServantItemById(unit.sid).name,
					curHp: unit.dps,
					type: arr[i],
					skin: unit.servantskin,
					clv: unit.clv,
					weaponDps: unit.weaponDps,
				});
			}

			view[`_${arr[i]}Log`] = log;
			obj['attendLog'] = log;
			obj['totalattr'] = total;
			obj['type'] = arr[i];
			obj['zid'] = info.zid;
			obj[`titleId`] = info.titleId;
			obj[`name`] = info.name;
			obj[`level`] = info.level;
			view[`_${arr[i]}vsInfo`] = obj;
		}
	}

	protected getBgName(): string {
		return `mainland_warshow_bg-${this.uiCode}`;
	}

	protected initBg(): void {
		let bgName: string = this.getBgName();
		if (bgName) {
			this.viewBg = BaseBitmap.create(bgName);
			if (this.isTouchMaskClose()) {
				this.viewBg.touchEnabled = true;
			}
			this.addChild(this.viewBg);

			this.viewBg.width = GameConfig.stageWidth;
			this.height = GameConfig.stageHeigth;
			this.viewBg.anchorOffsetX = this.viewBg.width / 2;
			this.viewBg.x = GameConfig.stageWidth / 2;
			//this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
			// 
			// this.viewBg.height = GameConfig.stageHeigth;
			// let mask = BaseLoadBitmap.create('empvsmask');
			// this.addChild(mask);
			// mask.width = GameConfig.stageWidth;
			// mask.height = GameConfig.stageHeigth;
			this.viewBg.y = GameConfig.stageHeigth - 1136;//(GameConfig.stageHeigth - 1136)/2;
		}
	}

	public initView(): void {
		let view = this;
		// result : data.conquerStat == 8 ? `fail` : `win`,
		// 	isNpc :  data.conquerStat == 7
		if (view.param.data.test) {
			view.initdata({
				ret: true,
				data: {
					id: 1,
					zid: Api.mergeServerVoApi.getTrueZid(),
					name: '打算武器',
					info: {
						team: {
							123455: {
								sid: 1001,
								po: 1,
								name: Api.playerVoApi.getPlayerName(),
								stra: 2,
								dps: 5000,
								st: 2,
								servantskin: 10011,
								level: App.MathUtil.getRandom(1, 7),
								title: `3301`,
								weaponDps: 123,
							},
							123456: {
								sid: 1002,
								po: 1,
								name: Api.playerVoApi.getPlayerName() + '43',
								stra: 2,
								dps: 400000,
								st: 2,
								servantskin: 10021,
								level: App.MathUtil.getRandom(1, 7),
								title: `3302`,
							},
							123457: {
								sid: 1003,
								po: 1,
								name: Api.playerVoApi.getPlayerName() + '44',
								stra: 2,
								dps: 5000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3303`,
								servantskin: 10011,
							},
							123458: {
								sid: 1004,
								po: 1,
								name: Api.playerVoApi.getPlayerName() + '44',
								stra: 2,
								dps: 5000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3303`,
							},
							123459: {
								sid: 1005,
								po: 1,
								name: Api.playerVoApi.getPlayerName() + '44',
								stra: 2,
								dps: 5000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3303`,
							},
							123460: {
								sid: 1006,
								po: 1,
								name: Api.playerVoApi.getPlayerName() + '44',
								stra: 2,
								dps: 5000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3303`,
							},
							123461: {
								sid: 1007,
								po: 1,
								name: Api.playerVoApi.getPlayerName() + '44',
								stra: 2,
								dps: 5000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3303`,
								servantskin: 10011,
							},
							123462: {
								sid: 1008,
								po: 1,
								name: Api.playerVoApi.getPlayerName() + '44',
								stra: 2,
								dps: 5000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3303`,
								servantskin: 10011,
							},
							123463: {
								sid: 1009,
								po: 1,
								name: Api.playerVoApi.getPlayerName() + '44',
								stra: 2,
								dps: 5000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3303`,
								servantskin: 10011,
							},
							123464: {
								sid: 1010,
								po: 1,
								name: Api.playerVoApi.getPlayerName() + '44',
								stra: 2,
								dps: 5000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3303`,
								servantskin: 10011,
							},
							123465: {
								sid: 1011,
								po: 1,
								name: Api.playerVoApi.getPlayerName() + '44',
								stra: 2,
								dps: 5000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3303`,
								servantskin: 10011,
							},
							123466: {
								sid: 1014,
								po: 1,
								name: Api.playerVoApi.getPlayerName() + '44',
								stra: 2,
								dps: 5000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3303`,
								servantskin: 10141,
							},
						},
						id: 1,
						zid: Api.mergeServerVoApi.getTrueZid(),
						name: '打算武器',
						level: 1,
					},
					tinfo: {
						team: {
							223455: {
								sid: 1001,
								po: 1,
								name: '天啊',
								dps: 5000,
								st: 1,
								level: App.MathUtil.getRandom(1, 7),
								title: `3304`,
								servantskin: 10011,
								weaponDps: 123,
							},
							223456: {
								sid: 1020,
								po: 2,
								name: '天我',
								stra: 4,
								dps: 1000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3305`,
								servantskin: 10011,
							},
							223457: {
								sid: 1008,
								po: 2,
								name: '天我',
								stra: 1,
								dps: 3000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3306`,
							},
							223458: {
								sid: 1018,
								po: 2,
								name: '天我',
								stra: 4,
								dps: 1000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3305`,
								servantskin: 10011,
							},
							223459: {
								sid: 1009,
								po: 2,
								name: '天我',
								stra: 4,
								dps: 1000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3305`,
								servantskin: 10011,
							},
							223460: {
								sid: 1011,
								po: 2,
								name: '天我',
								stra: 4,
								dps: 1000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3305`,
								servantskin: 10011,
							},
							223461: {
								sid: 1013,
								po: 2,
								name: '天我',
								stra: 4,
								dps: 1000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3305`,
							},
							223462: {
								sid: 1014,
								po: 2,
								name: '天我',
								stra: 4,
								dps: 1000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3305`,
								servantskin: 10141,
							},
							2234563: {
								sid: 1001,
								po: 2,
								name: '天我',
								stra: 4,
								dps: 1000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3305`,
								servantskin: 10011,
								weaponDps: 123,
							},
							2234564: {
								sid: 1002,
								po: 2,
								name: '天我',
								stra: 4,
								dps: 1000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3305`,
								servantskin: 10011,
							},
							223465: {
								sid: 1003,
								po: 2,
								name: '天我',
								stra: 4,
								dps: 1000,
								st: 2,
								level: App.MathUtil.getRandom(1, 7),
								title: `3305`,
								servantskin: 10011,
							},
						},
						level: 4,
						id: 2,
						zid: 2,
						name: '撒啊',
					},
					score: 100,
					level: 1,
				}
			});
		}
		else {
			view.initdata(view.param.data.wardata);
		}

		let titleImg = BaseBitmap.create("mainland_warshow_title-" + this.code);
		titleImg.setPosition(this.titleBg.x + this.titleBg.width / 2 - titleImg.width / 2, this.titleBg.y + 5);
		this.addChild(titleImg)

		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;

		let topgroup = new BaseDisplayObjectContainer();
		topgroup.width = GameConfig.stageWidth;
		topgroup.height = 130;
		view.addChild(topgroup);
		view._topGroup = topgroup;
		view._topGroup.y = -view._topGroup.height;

		view.createWarInfo(LayoutConst.left);
		view.createWarInfo(LayoutConst.right);

		let crossservantrulevs = BaseBitmap.create(`mainland_warshow_fight-${this.uiCode}`);
		crossservantrulevs.anchorOffsetX = crossservantrulevs.width / 2;
		crossservantrulevs.anchorOffsetY = crossservantrulevs.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, crossservantrulevs, view);
		view.addChild(crossservantrulevs);
		crossservantrulevs.setScale(10);
		crossservantrulevs.alpha = 0;
		view._vsImg = crossservantrulevs;


		let cityTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainWarShowBattleName-${this.code}`, [view.param.data.cityName]), 24, TextFieldConst.COLOR_WARN_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cityTxt, this.titleBg, [0, 90]);
		view._topGroup.addChild(cityTxt);

		view.setChildIndex(view.closeBtn, 9999);
		App.DisplayUtil.setLayoutPosition(PlatformManager.hasSpcialCloseBtn() ? LayoutConst.lefttop : LayoutConst.righttop, view.closeBtn, view, [0, 0]);
		view.beginWarLog();

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `acConquerMainLandTip32-${view.uiCode}`, view.skipFight, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, btn, view, [0, 15]);
		view.addChild(btn);
	}

	private createWarInfo(type: string): void {
		let view = this;
		let isleft = type == LayoutConst.left;
		let wardata = view[`_${type}vsInfo`];
		let empty = view._lunkong && !isleft

		let nameStr = Api.mergeServerVoApi.getAfterMergeSeverName(null, true, wardata.zid) + `   `+wardata.name;
		let teamNameTxt = ComponentManager.getTextField(nameStr, 20);
		view._topGroup.addChild(teamNameTxt);

		App.DisplayUtil.setLayoutPosition(isleft?LayoutConst.lefttop:LayoutConst.righttop, teamNameTxt, view , [(240-teamNameTxt.width)/2,65]);

		let titleImg = null;
		let titleId = wardata.titleid;
		if(titleId){
			let titleStr = Config.TitleCfg.getTitleIcon3WithLv(titleId,wardata.titlelv);
			titleImg = BaseLoadBitmap.create(titleStr);
			titleImg.width = 186;
			titleImg.height = 42;
			titleImg.setScale(0.7);
			this.addChild(titleImg);
		}
		if (titleImg) {
			view.setLayoutPosition(LayoutConst.horizontalCentertop, titleImg, teamNameTxt, [0, teamNameTxt.height + 5]);
		}else{
			App.DisplayUtil.setLayoutPosition(isleft?LayoutConst.lefttop:LayoutConst.righttop, teamNameTxt, view , [(240-teamNameTxt.width)/2,80]);

		}
		//人物形象
		let midgroup = new BaseDisplayObjectContainer();
		midgroup.width = 260;
		midgroup.height = 330;
		App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.leftbottom : LayoutConst.rightbottom, midgroup, view, [0, 120]);
		view.addChild(midgroup);
		view[`_midGroup${type}`] = midgroup;

		// let servantCfg = Config.ServantCfg.getServantItemById('1001');
		let roleContainer = new BaseDisplayObjectContainer();
		roleContainer.width = 248;
		roleContainer.height = 287;
		roleContainer.anchorOffsetX = roleContainer.width / 2;
		roleContainer.anchorOffsetY = roleContainer.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, roleContainer, midgroup, [0, 0], true);
		view[`_${type}rolePosX`] = roleContainer.x;
		midgroup.addChild(roleContainer);
		view[`_roleGroup${type}`] = roleContainer;

		let aureoleClip = ComponentManager.getCustomMovieClip("mainlandlighteffect", 10, 70);
		let aureoleBM = BaseBitmap.create("mainlandlighteffect1");
		aureoleClip.blendMode = egret.BlendMode.ADD;
		aureoleClip.width = aureoleBM.width;
		aureoleClip.height = aureoleBM.height;
		aureoleClip.anchorOffsetX = aureoleBM.width / 2;
		aureoleClip.anchorOffsetY = aureoleBM.height / 2;
		aureoleClip.setScale(2.5 * 0.62);
		aureoleClip.x = roleContainer.width / 2;
		aureoleClip.y = roleContainer.height / 2 + 50;
		roleContainer.addChild(aureoleClip);
		aureoleClip.playWithTime(-1);
		aureoleClip.alpha = 0;
		view[`_servantClip${type}`] = aureoleClip;

		// let servantCfg = Config.ServantCfg.getServantItemById('1001');
		let role = BaseLoadBitmap.create('');
		role.width = 381;
		role.height = 287;
		role.x = -60;
		roleContainer.addChild(role);
		view._rolePosY = roleContainer.y;
		view[`_servantRole${type}`] = role;

		//挑衅
		let plangroup = new BaseDisplayObjectContainer();
		plangroup.width = 250;
		plangroup.height = 110;
		view.addChild(plangroup);
		view[`_planGroup${type}`] = plangroup;
		plangroup.alpha = 0;

		//语言文本
		let descBg = BaseBitmap.create('public_9v_bg11');
		descBg.width = 250;
		plangroup.addChild(descBg);
		view[`_planDescBg${type}`] = descBg;
		descBg.scaleX = isleft ? -1 : 1;

		// let arrowBM = BaseBitmap.create("public_9_bg13_tail");
		// arrowBM.anchorOffsetX = arrowBM.width / 2;
		// arrowBM.scaleX = -1;
		// plangroup.addChild(arrowBM);
		// view[`_planDescArrow${type}`] = arrowBM;

		let str = LanguageManager.getlocal(`acConquerMainLandTip37-${view.uiCode}`);
		let descTxt = ComponentManager.getTextField(str, 20, TextFieldConst.COLOR_BROWN_NEW);
		descTxt.width = 200;
		descTxt.lineSpacing = 5;
		plangroup.addChild(descTxt);
		view[`_planDescTxt${type}`] = descTxt;

		descBg.height = descTxt.textHeight + 45;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, plangroup, [isleft ? (descBg.width+50) :-50, 0], true);
		//App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [25,descBg.height-3]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, descBg, [isleft ?(-descBg.width) :0, 15]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, plangroup, midgroup, [0, -plangroup.height + 30]);

		let wingroup = new BaseDisplayObjectContainer();
		wingroup.width = 90;
		wingroup.height = 90;
		wingroup.anchorOffsetX = wingroup.width / 2;
		App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.lefttop : LayoutConst.righttop, wingroup, midgroup, [10, 0], true);
		midgroup.addChild(wingroup);
		view[`_winGroup${type}`] = wingroup;
		wingroup.visible = false;
		wingroup.rotation = isleft ? -25 : 25;

		let winbg = BaseBitmap.create(`acmazeview_textbg`);
		winbg.anchorOffsetX = winbg.width / 2;
		winbg.scaleX = isleft ? 1 : -1;
		winbg.rotation = 25 * winbg.scaleX;
		winbg.x = isleft ? 105.5 : -5.5;
		winbg.y = -25;
		//App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winbg, wingroup, [0,-25])
		//App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winbg, wingroup, (isleft ? [-25.5,-25] : [-75.5,-25]), true);
		wingroup.addChild(winbg);

		let winBg = BaseBitmap.create(`awlsheng`);
		winBg.anchorOffsetX = winBg.width / 2;
		winBg.rotation = 25;
		winBg.x = isleft ? 80 : 64;
		winBg.y = -7;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winBg, wingroup, (isleft ? [30,0] : [34,18]), true);
		wingroup.addChild(winBg);
		view[`_winBitMap${type}`] = winBg;

		let winBitMapTxt = ComponentManager.getBitmapText('2', TextFieldConst.FONTNAME_ITEMTIP);
		winBitMapTxt.x = winBg.x - 15 - winBitMapTxt.textWidth - winBg.anchorOffsetX;
		winBitMapTxt.y = 0;
		//App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winBitMapTxt, wingroup, (isleft ? [10,33] : [10,0]),true);
		view[`_winBitMapTxt${type}`] = winBitMapTxt;
		wingroup.addChild(winBitMapTxt);

		let playernamebg = BaseBitmap.create(`mainland_warshow_sernamebg-${this.uiCode}`);
		playernamebg.scaleX = isleft ? 1 : -1;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, playernamebg, roleContainer, [isleft ? 0 : playernamebg.width, roleContainer.height * roleContainer.scaleX]);
		midgroup.addChild(playernamebg);

		let playernameTxt = ComponentManager.getTextField('', 22);
		playernameTxt.height = 22;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playernameTxt, playernamebg);
		midgroup.addChild(playernameTxt);
		view[`_playerNameTxt${type}`] = playernameTxt;

		let alvImg = BaseLoadBitmap.create(``);
		alvImg.setPosition(isleft ? playernamebg.x : playernamebg.x - playernamebg.width - 35, playernamebg.y + playernamebg.height / 2 - 40);
		alvImg.setScale(0.8);
		midgroup.addChild(alvImg);
		view[`_servantAlvImg${type}`] = alvImg;


		let progress = ComponentManager.getProgressBar("progress_blood", "progress_bloodbg", 260);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, playernamebg, [isleft ? 0 : -playernamebg.width, playernamebg.height + 5]);
		midgroup.addChild(progress);
		view[`_playerProgress${type}`] = progress;


		let arr: any[] = Api.chatVoApi.arr_clone(wardata.attendLog);
		arr.splice(0, 1);
		let maxH = midgroup.y - view._topGroup.height - 30;
		let height = Math.min(arr.length * 91, Math.floor(maxH / 91) * 91);
		let tmpRect = new egret.Rectangle(0, 0, 86, height);
		arr.reverse();
		let scrollList = ComponentManager.getScrollList(AcConquerMainLandServantVsItem, arr, tmpRect);
		scrollList.setEmptyTip(LanguageManager.getlocal(`acPunishNoData`));
		App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.lefttop : LayoutConst.righttop, scrollList, midgroup, [25, -scrollList.height]);
		view.addChild(scrollList);
		scrollList.verticalScrollPolicy = 'off';
		scrollList.bounces = false;
		view[`_memberList${type}`] = scrollList;
		scrollList.alpha = 0;
		if (height < arr.length * 91) {
			scrollList.scrollTop = 91 * arr.length - height;
		}
	}

	private beginWarLog(): void {
		let view = this;
		view._skinEquip = [];
		let leftlog = view._leftLog;
		let rightlog = view._rightLog;
		view._log = {};
		view._log['left'] = leftlog;
		view._log['right'] = rightlog;
		view._roundLog = {};


		view._damageLog = {};
		view._damageLog[LayoutConst.left] = {};
		view._damageLog[LayoutConst.right] = {}
		view._leftIdx = view._rightIdx = 0;

		for (let i in view._log) {
			for (let j in view._log[i]) {
				let unit = view._log[i][j];
				unit.curHp = unit.attr;
			}
		}
		view._scrollY = 0;
		//预先演算一遍
		let leftidx = 0;
		let rightidx = 0;

		view._roundLog = {};
		view._round = 0;
		view._roundLog[view._round] = {
			left: {
				servantId: leftlog[0].servantId,
				name: leftlog[0].name,
				curHp: leftlog[0].curHp,
				prevHp: leftlog[0].curHp,
				attr: leftlog[0].attr,
				dps: 0,
				win: 0,
				change: false,
				leftIdx: 0,
				skin: leftlog[0].skin,
				level: view._leftvsInfo.level,
				titleid: view._leftvsInfo.titleid,
				clv: leftlog[0].clv,
				winMax: this.cfg ? this.cfg.teamInfo.successive : 5,
			},
			right: {
				servantId: rightlog[0].servantId,
				name: rightlog[0].name,
				curHp: rightlog[0].curHp,
				prevHp: rightlog[0].curHp,
				attr: rightlog[0].attr,
				dps: 0,
				win: 0,
				change: false,
				rightIdx: 0,
				skin: rightlog[0].skin,
				level: view._rightvsInfo.level,
				titleid: view._rightvsInfo.titleid,
				clv: rightlog[0].clv,
				winMax: this.cfg ? this.cfg.teamInfo.successive : 5,
			},
		}
		let winflag = false;
		while (!winflag) {
			let view = this;
			let leftData = view._log[LayoutConst.left][leftidx];
			let rightData = view._log[LayoutConst.right][rightidx];
			let leftHp = leftData.curHp;
			let rightHp = rightData.curHp;
			let sub = leftHp - rightHp;

			leftData[`winMax`] = this.cfg ? this.cfg.teamInfo.successive : 5;
			rightData[`winMax`] = this.cfg ? this.cfg.teamInfo.successive : 5;

			if (!view._damageLog['left'][leftData.servantId]) {
				view._damageLog['left'][leftData.servantId] = {};
				view._damageLog['left'][leftData.servantId]['damage'] = 0;
				view._damageLog['left'][leftData.servantId]['win'] = 0;
				view._damageLog['left'][leftData.servantId]['name'] = leftData.name;
			}
			view._damageLog['left'][leftData.servantId]['damage'] += ((sub > 0 ? rightHp : leftHp));

			if (!view._damageLog['right'][rightData.servantId]) {
				view._damageLog['right'][rightData.servantId] = {};
				view._damageLog['right'][rightData.servantId]['damage'] = 0;
				view._damageLog['right'][rightData.servantId]['win'] = 0;
				view._damageLog['right'][rightData.servantId]['name'] = rightData.name;
			}
			view._damageLog['right'][rightData.servantId]['damage'] += ((sub < 0 ? leftHp : rightHp));

			leftData.curHp = Math.max(sub, 0);
			rightData.curHp = Math.max(0, -sub);

			let leftchange = false;
			let rightchange = false;
			let leftresult = '';
			let rightresult = '';

			let lefttmpx = leftidx;
			let righttmpx = rightidx;
			let isWinMaxLeft = false;
			let isWinMaxRight = false;

			let calLeftIdx = leftidx;
			let calRightIdx = rightidx;
			if (sub > 0) {
				++rightidx;
				++calRightIdx
				rightchange = true;
				leftresult = 'win';
				view._damageLog['left'][leftData.servantId]['win'] += 1;
				if (view._damageLog['left'][leftData.servantId]['win'] >= leftData[`winMax`]) {
					++leftidx;
					++calLeftIdx
					leftchange = true;
					isWinMaxLeft = true;
				}
			}
			else if (sub < 0) {
				++leftidx;
				++calLeftIdx;
				leftchange = true;
				rightresult = 'win';
				view._damageLog['right'][rightData.servantId]['win'] += 1;
				if (view._damageLog['right'][rightData.servantId]['win'] >= rightData[`winMax`]) {
					++rightidx;
					++calRightIdx;
					rightchange = true;
					isWinMaxRight = true;
				}
			}
			else {
				++leftidx;
				++calLeftIdx;
				leftchange = true;
				if (view._damageLog['left'][leftData.servantId]['win'] >= leftData[`winMax`]) {
					isWinMaxLeft = true;
				}


				++rightidx;
				++calRightIdx
				rightchange = true;
				if (view._damageLog['right'][rightData.servantId]['win'] >= rightData[`winMax`]) {
					isWinMaxRight = true;
				}
				leftresult = rightresult = 'draw';
			}

			++view._round;
			view._roundLog[view._round] = {
				left: {
					servantId: leftData.servantId,
					name: leftData.name,
					prevHp: leftHp,
					curHp: leftData.curHp,
					attr: leftData.attr,
					dps: sub > 0 ? rightHp : leftHp,
					win: view._damageLog['left'][leftData.servantId]['win'],
					change: leftchange,
					result: leftresult,
					leftIdx: lefttmpx,
					skin: leftData.skin,
					level: leftData.level,
					titleid: leftData.titleid,
					clv: leftData.clv,
					isWinMax: isWinMaxLeft,
					weaponDps: leftData.weaponDps
				},
				right: {
					servantId: rightData.servantId,
					name: rightData.name,
					prevHp: rightHp,
					curHp: rightData.curHp,
					attr: rightData.attr,
					dps: sub > 0 ? rightHp : leftHp,
					win: view._damageLog['right'][rightData.servantId]['win'],
					change: rightchange,
					result: rightresult,
					rightIdx: righttmpx,
					skin: rightData.skin,
					level: rightData.level,
					titleid: rightData.titleid,
					clv: rightData.clv,
					isWinMax: isWinMaxRight,
					weaponDps: rightData.weaponDps
				},
			}

			let newleftdata = view._log[LayoutConst.left][calLeftIdx];
			let newrightData = view._log[LayoutConst.right][calRightIdx];
			winflag = true;
			if (!newleftdata && !newrightData) {
				if (leftresult == 'draw' && rightresult == 'draw') {
					view._winFlag = 'draw';
				}
				else if (leftresult == 'win') {
					view._winFlag = LayoutConst.left;
				}
				else if (rightresult == 'win') {
					view._winFlag = LayoutConst.right;
				}
			}
			else if (newleftdata && !newrightData) {
				view._winFlag = LayoutConst.left;
			} else if (newrightData && !newleftdata) {
				view._winFlag = LayoutConst.right;
			} else {
				winflag = false;
			}

			if (winflag) {
				break;
			}
		}
		for (let i in view._log) {
			for (let j in view._log[i]) {
				let unit = view._log[i][j];
				unit.curHp = unit.attr;
				unit.winMax = this.cfg ? this.cfg.teamInfo.successive : 5;
			}
		}
		view.leftWin = view.rightWin = 0;
		view._round = 1;
		view._flag = false;

		let leftdata = view._roundLog[view._round][LayoutConst.left];
		let rightdata = view._roundLog[view._round][LayoutConst.right];
		if (leftdata && leftdata.weaponDps) {
			this._skinEquip.push([leftdata.weaponDps, 1, leftdata.servantId]);
		}
		if (rightdata && rightdata.weaponDps) {
			this._skinEquip.push([rightdata.weaponDps, 2, rightdata.servantId]);
		}


		view._together = true;
		view._showSkin = 0;
		if (this._skinEquip.length) {
			view._showSkin = this._skinEquip.length;
			if (this._skinEquip.length == 2) {
				view.showRoundAnti(LayoutConst.left, null, null, true);
			}
			else {
				if (leftdata && leftdata.skin) {
					view.showRoundAnti(LayoutConst.left, null, null, true);
				}
				else {
					view.showRoundAnti(LayoutConst.right, null, null, true);
				}
			}
		}

		else {
			view.showRoundAnti(LayoutConst.left);
			view.showRoundAnti(LayoutConst.right);
		}
	}

	private showSkin(func: Function): void {
		let view = this;
		if (this._skinEquip.length) {
			// ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESHOWSKINVIEW, {
			// 	callback : ()=>{
			// 		this._skinEquip.splice(0,1);
			// 		func.apply(this);
			// 	},
			// 	callbackThisObj : this,
			// 	skinId : this._skinEquip[0]
			// });

			let serId, serId2, value1, value2;

			if (this._skinEquip[0][1] == 1) {
				serId = this._skinEquip[0][2];
				value1 = this._skinEquip[0][0];
			}
			else {
				serId2 = this._skinEquip[0][2];
				value2 = this._skinEquip[0][0];
			}
			let view = this;
			//有问题 神器
			// ViewController.getInstance().openView(ViewConst.BASE.WEAPONCOMEONVIEW,{
			// 	sid:serId,
			// 	type:3,
			// 	atype:8,
			// 	value:value1,
			// 	sid2:serId2,
			// 	type2:1,
			// 	atype2:8,
			// 	value2:value2,
			// 	endhide:true,
			// 	f:()=>{
			// 		view._skinEquip.splice(0,1);
			// 		func.apply(view);
			// 	},
			// 	o:this,
			// 	auto: false,
			// });
		}
		else {

		}
	}

	private showRoundAnti(type: string, func?: Function, obj?: any, showskin?, showskinfunc?): void {
		let view = this;
		let role: BaseLoadBitmap = view[`_servantRole${type}`];
		let isOnleft = type == LayoutConst.left;
		let playerNameTxt = view[`_playerNameTxt${type}`];
		let progress: ProgressBar = view[`_playerProgress${type}`];
		let list: any = view[`_memberList${type}`];
		let plangroup = view[`_planGroup${type}`];
		let roundData = view._roundLog[view._round];
		let rolex = view[`_${type}rolePosX`];
		let aureoleClip = view[`_servantClip${type}`];
		let rolegroup = view[`_roleGroup${type}`];
		let alvImg: BaseLoadBitmap = view[`_servantAlvImg${type}`];

		if (roundData) {
			let leftData = view._roundLog[view._round][LayoutConst.left];
			let rightData = view._roundLog[view._round][LayoutConst.right];
			let data = view._roundLog[view._round][type];
			let curIdx = data[`${type}Idx`];
			//上阵效果
			let servantInfo = Config.ServantCfg.getServantItemById(data.servantId);
			let servantVo = Api.servantVoApi.getServantObj(data.servantId);
			rolegroup.y = view._rolePosY;
			let leftdata = view._roundLog[view._round]['left'];
			let rightdata = view._roundLog[view._round]['right'];
			let skip = false;
			if (view._round == 1) {
				view[`_${type}Idx`] = list._scrollListItemArr.length - 1;
				egret.Tween.get(rolegroup).to({ x: isOnleft ? -248 : 508, y: view._rolePosY }, 250).call(() => {
					rolegroup.setScale(1);
					let img = servantInfo.fullIcon;
					if (data.skin) {
						img = Config.ServantskinCfg.getServantSkinItemById(data.skin).body;
					}
					role.setload(img);
					if (data.clv > 0) {
						alvImg.setload("servant_alv_" + data.clv);
						alvImg.visible = true;
					} else {
						alvImg.visible = false;
					}
					view[`_winGroup${type}`].visible = false;
					rolegroup.alpha = 1;
					aureoleClip.alpha = 0;
				}, view).to({ x: rolex, y: view._rolePosY }, 500).call(() => {
					playerNameTxt.text = data.name;

					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, playerNameTxt, rolegroup);
					progress.setText(App.StringUtil.changeIntToText(data.attr));
					progress.setPercentage(data.attr / data.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(data.attr), 0)));
					//等级头衔
					let str = LanguageManager.getlocal(`PromotePlayersPopViewList1`);
					let titleId = data.titleid;
					//有问题
					// let titleinfo = App.CommonUtil.getTitleData(titleId);
					// if(titleinfo.title !== ''){
					// 	let title = Config.TitleCfg.getTitleCfgById(titleinfo.title);
					// 	if(title && title.isTitle == 1 && title.titleType){
					// 		str = title.titleName;
					// 	}
					// }


					if (showskin) {
						view.showSkin(() => {
							if (view._skinEquip.length == 1) {
								if (view._round > 1) {
									view.changeTween('right', rightData.isWinMax, true, () => {
										view.showNext(func, obj);
									});
								}
								else {
									view.showRoundAnti(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, func, obj, true, () => {
										view.showNext(func, obj);
									});
								}
							}
							else {
								if (view._showSkin == 1) {
									if (view._round > 1) {
										view.changeTween(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, type == LayoutConst.left ? rightData.isWinMax : leftData.isWinMax, false, () => {
											view.showNext(func, obj);
										});
									}
									else {
										view.showRoundAnti(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, func, obj, false, () => {
											view.showNext(func, obj);
										});
									}
								}
								else {
									if (showskinfunc) {
										showskinfunc.apply(view);
									}
									view.showNext(func, obj);
								}
							}
						});
					}
					else {
						if (showskinfunc) {
							showskinfunc.apply(view);
						}
						view.showNext(func, obj);
					}

				}, view);
			}
			else {
				rolegroup.setScale(0);
				egret.Tween.get(rolegroup).to({ x: rolex, y: view._rolePosY }, 250).call(() => {
					let img = servantInfo.fullIcon;
					if (data.skin) {
						img = Config.ServantskinCfg.getServantSkinItemById(data.skin).body;
					}
					role.setload(img);
					if (data.clv > 0) {
						alvImg.setload("servant_alv_" + data.clv);
						alvImg.visible = true;
					} else {
						alvImg.visible = false;
					}
					view[`_winGroup${type}`].visible = false;
					rolegroup.alpha = 1;
					aureoleClip.alpha = 0;
				}, view).to({ scaleX: 1, scaleY: 1 }, 500).wait(250).call(() => {
					playerNameTxt.text = data.name;
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, playerNameTxt, rolegroup);
					progress.setText(App.StringUtil.changeIntToText(data.attr));
					progress.setPercentage(data.attr / data.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(data.attr), 0)));

					if (showskin) {
						view.showSkin(() => {
							if (view._skinEquip.length == 1) {
								if (view._round > 1) {
									view.changeTween('right', rightData.isWinMax, true, () => {
										view.showNext(func, obj);
									});
								}
								else {
									view.showRoundAnti(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, func, obj, true, () => {
										view.showNext(func, obj);
									});
								}
							}
							else {
								if (view._showSkin == 1) {
									if (view._round > 1) {
										if (view._together) {
											view.changeTween(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, type == LayoutConst.left ? rightData.isWinMax : leftData.isWinMax, false, () => {
												view.showNext(func, obj);
											});
										}
										else {
											view.showNext(func, obj);
										}
									}
									else {
										view.showRoundAnti(type == LayoutConst.left ? LayoutConst.right : LayoutConst.left, func, obj, false, () => {
											view.showNext(func, obj);
										});
									}
								}
								else {
									if (showskinfunc) {
										showskinfunc.apply(view);
									}
									view.showNext(func, obj);
								}
							}
						});
					}
					else {
						if (showskinfunc) {
							showskinfunc.apply(view);
						}
						view.showNext(func, obj);
					}
				}, view);
			}
		}
		else {
			if (func) {
				func.apply(obj);
			}
		}
	}

	private showNext(func, obj): void {
		let view = this;
		if (view._round == 1) {
			if (view._flag) {
				let leftplangroup = view._planGroupleft;
				let rightplangroup = view._planGroupright;

				let leftxt = view._planDescTxtleft;
				let righttxt = view._planDescTxtright;

				let rid = App.MathUtil.getRandom(1, 6);
				leftxt.text = LanguageManager.getlocal(`acConquerMainLandTip37_${rid * 2 - 1}-${view.uiCode}`);
				righttxt.text = LanguageManager.getlocal(`acConquerMainLandTip37_${rid * 2}-${view.uiCode}`);
				//挑衅文本
				egret.Tween.get(leftplangroup).to({ alpha: 1 }, 500).wait(500).to({ alpha: 0 }, 500).call(() => {
					egret.Tween.get(rightplangroup).to({ alpha: 1 }, 500).wait(500).to({ alpha: 0 }, 500).call(() => {
						let leftlist: any = view._memberListleft;
						let rightlist: any = view._memberListright;
						//门客列表
						let idx = leftlist._dataList.length - 1;
						let num = leftlist.height / 91
						for (let i = idx; i >= 0; --i) {
							let unit = <AcConquerMainLandServantVsItem>leftlist._scrollListItemArr[i];
							if (unit) {
								let posy = unit.y;
								unit.y = posy - leftlist.height;
								let speed = 0.8;
								egret.Tween.get(unit).wait(400).to({ y: posy }, (posy - unit.y) / speed).call(() => {
									egret.Tween.removeTweens(unit);
									if (i == 0) {

									}
								}, view);
							}
						}
						leftlist.alpha = 1;

						let idx2 = rightlist._dataList.length - 1;
						let num2 = rightlist.height / 91
						for (let i = idx2; i >= 0; --i) {
							let unit = <AcConquerMainLandServantVsItem>rightlist._scrollListItemArr[i];
							if (unit) {
								let posy = unit.y;
								unit.y = posy - rightlist.height;
								let speed = 0.8;
								egret.Tween.get(unit).wait(400).to({ y: posy }, (posy - unit.y) / speed).call(() => {
									egret.Tween.removeTweens(unit);
									if (i == 0) {

									}
								}, view);
							}
						}
						rightlist.alpha = 1;
					}, view);
				}, view);

				egret.Tween.get(view._topGroup).to({ y: 0 }, 300).wait(3600).call(() => {
					view._vsImg.x = GameConfig.stageWidth / 2;

					let upgradeClip = ComponentManager.getCustomMovieClip("mainlandpkduizhan", 17, 100);
					upgradeClip.width = 444;
					upgradeClip.height = 478;
					upgradeClip.anchorOffsetX = upgradeClip.width / 2;
					upgradeClip.anchorOffsetY = upgradeClip.height / 2;
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, upgradeClip, view, [-7, 0]);
					view.addChild(upgradeClip);
					//upgradeClip.setEndCallBack(view.showPengzhuang,view);
					upgradeClip.setEndCallBack(() => {
						upgradeClip.dispose();
						upgradeClip = null;
						view._vsImg.alpha = 1;
						let wingroup = new BaseDisplayObjectContainer();
						wingroup.width = GameConfig.stageWidth;
						view.addChild(wingroup);
						let descbg = BaseBitmap.create(`public_9v_bg11`);
						let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandTip38-${view.uiCode}`, [view.cfg ? view.cfg.teamInfo.successive : 5]), 22);

						descbg.height = tipTxt.textHeight + 70;
						descbg.width = tipTxt.textWidth + 230;
						wingroup.addChild(descbg);
						wingroup.addChild(tipTxt);
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, wingroup, [0, 0], true);
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
						view._winGroup = wingroup;
						wingroup.alpha = 0;
						App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wingroup, view);

						// view.showPengzhuang();
						view.startMove();
					}, view);

					egret.Tween.get(view._vsImg).wait(170).call(() => {
						upgradeClip.playWithTime(1);
					}, view);

					egret.Tween.get(view._vsImg).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200).call(() => {
						egret.Tween.removeTweens(view._vsImg);
					}, view);
				}, view).call(() => {
					egret.Tween.removeTweens(view._topGroup);
				}, view);
			}
			else {
				view._flag = true;
			}
		}
		else {
			if (view._flag) {
				if (func) {
					func.apply(obj);
				}
			}
			else {
				view._flag = true;
			}
		}

	}

	private skipFight(): void {
		let view = this;
		let score = 0;
		ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDWARRESULTVIEW, {
			type: view.param.data.result,
			damageLog: view._damageLog,
			aid: this.aid,
			code: this.code,
			wardata: view.param.data.wardata,
			cityName: view.param.data.cityName,
			attackwin: view.param.data.attackwin
		});
		if (this.param.data.callback) {
			this.param.data.callback.apply(this.param.data.callobj);
		}
		view.hide();
	}

	private leftWin = 0;
	private rightWin = 0;
	private startMove(): void {
		let view = this;
		//移动碰撞
		if (view.checkWin()) {
			egret.Tween.get(view).wait(500).call(() => {
				view.skipFight();
			}, view);
		}
		else {
			let leftData = view._roundLog[view._round][LayoutConst.left];
			let rightData = view._roundLog[view._round][LayoutConst.right];
			let leftrole: BaseLoadBitmap = view[`_servantRole${LayoutConst.left}`];
			let rightrole: BaseLoadBitmap = view[`_servantRole${LayoutConst.right}`];
			let leftprogress: ProgressBar = view[`_playerProgress${LayoutConst.left}`];
			let rightprogress: ProgressBar = view[`_playerProgress${LayoutConst.right}`];
			let leftrolex = view[`_${LayoutConst.left}rolePosX`];
			let rightrolex = view[`_${LayoutConst.right}rolePosX`];
			let leftrolegroup = view[`_roleGroup${LayoutConst.left}`];
			let rightrolegroup = view[`_roleGroup${LayoutConst.right}`];
			// let damageNum = sub > 0 ? damageright : damageLeft;
			view[`_winGroup${LayoutConst.left}`].visible = view[`_winGroup${LayoutConst.right}`].visible = false;

			let isleftWin = leftData.result == 'win';
			let isrightWin = rightData.result == 'win';

			egret.Tween.get(leftrolegroup).to({ scaleX: 1.3, scaleY: 1.3 }, 250).call(() => {
			}, view).to({ x: leftrolex + 200, y: view._rolePosY - 200, scaleX: 0.6, scaleY: 0.6 }, 100).call(() => {
				leftprogress.setText(App.StringUtil.changeIntToText(leftData.curHp));
				leftprogress.setPercentage(leftData.curHp / leftData.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(leftData.curHp), 0)));
			}, view).to({ x: isleftWin ? leftrolex : leftrolex - 124, y: isleftWin ? view._rolePosY : view._rolePosY - 400, scaleX: isleftWin ? 1 : 0, scaleY: isleftWin ? 1 : 0, alpha: isleftWin ? 1 : 0, rotation: isleftWin ? 0 : 720 }, 600);

			let customClip = ComponentManager.getCustomMovieClip('atk_anim_', 7, 70);
			customClip.width = 185;
			customClip.height = 186;
			customClip.anchorOffsetX = customClip.width / 2;
			customClip.anchorOffsetY = customClip.height / 2;
			customClip.setScale(2);
			customClip.setEndCallBack(() => {
				view.removeChild(customClip);
				customClip = null;
			}, view);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, customClip, view, [320, view._rolePosY + view._midGroupleft.y - 200]);
			customClip.visible = false;
			customClip.x = 320;
			view.addChild(customClip);

			egret.Tween.get(rightrolegroup).to({ scaleX: 1.2, scaleY: 1.2 }, 250).call(() => {
			}, view).to({ x: rightrolex - 200, y: view._rolePosY - 200, scaleX: 0.6, scaleY: 0.6 }, 100).call(() => {
				//伤害	
				customClip.visible = true;
				customClip.playWithTime(1);
				customClip.goToAndPlay(0);

				rightprogress.setText(App.StringUtil.changeIntToText(rightData.curHp));
				rightprogress.setPercentage(rightData.curHp / rightData.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(rightData.curHp), 0)));
			}, view).to({ x: isrightWin ? rightrolex : rightrolex + 124, y: isrightWin ? view._rolePosY : view._rolePosY - 400, scaleX: isrightWin ? 1 : 0, scaleY: isrightWin ? 1 : 0, alpha: isrightWin ? 1 : 0, rotation: isrightWin ? 0 : 720 }, 600).wait(800).call(() => {
				++view._round;
				view._together = false;
				if (leftData.change && rightData.change) {
					view.rightWin = view.leftWin = 0;
					view._together = true;
					view._flag = false;
					if (view._roundLog[view._round]) {
						let leftdata = view._roundLog[view._round][LayoutConst.left];
						if (leftdata && leftdata.weaponDps) {
							this._skinEquip.push([leftdata.weaponDps, 1, leftdata.servantId]);
						}

						let rightdata = view._roundLog[view._round][LayoutConst.right];
						if (rightdata && rightdata.weaponDps) {
							this._skinEquip.push([rightdata.weaponDps, 2, rightdata.servantId]);
						}
					}
					view._showSkin = this._skinEquip.length;

					if (this._skinEquip.length) {
						if (this._skinEquip.length == 2) {
							view.changeTween(`left`, leftData.isWinMax, true);
						}
						else {
							let leftdata = view._roundLog[view._round][LayoutConst.left];
							if (leftdata && leftdata.skin) {
								view.changeTween(`left`, leftData.isWinMax, true);
							}
							else {
								view.changeTween(`right`, rightData.isWinMax, true);
							}
						}
					}
					else {
						view.changeTween(`left`, leftData.isWinMax);
						view.changeTween(`right`, rightData.isWinMax);
					}


				}
				else if (leftData.change) {
					view.leftWin = 0;
					if (view._roundLog[view._round]) {
						let leftdata = view._roundLog[view._round][LayoutConst.left];
						if (leftdata && leftdata.weaponDps) {
							this._skinEquip.push([leftdata.weaponDps, 1, leftdata.servantId]);
						}
					}
					view._showSkin = this._skinEquip.length;
					if (this._skinEquip.length) {
						view.changeTween(`left`, leftData.isWinMax, true);
					}
					else {
						view.changeTween(`left`, leftData.isWinMax);
					}

				}
				else {
					view.rightWin = 0;
					if (view._roundLog[view._round]) {
						let rightdata = view._roundLog[view._round][LayoutConst.right];
						if (rightdata && rightdata.weaponDps) {
							this._skinEquip.push([rightdata.weaponDps, 2, rightdata.servantId]);
						}
					}
					view._showSkin = this._skinEquip.length;
					if (this._skinEquip.length) {
						view.changeTween(`right`, rightData.isWinMax, true);
					}
					else {
						view.changeTween(`right`, rightData.isWinMax);
					}
				}
			}, view);
		}
	}

	//转场特效
	private changeTween(type: string, winChange: boolean, showskin?, showskinfunc?): void {
		let view = this;
		let role: BaseLoadBitmap = view[`_servantRole${type}`];
		let isOnleft = type == LayoutConst.left;
		let list: any = view[`_memberList${type}`];
		let roundData = view._roundLog[view._round];
		let rolex = view[`_${type}rolePosX`];
		let rolegroup = view[`_roleGroup${type}`];
		let aureoleClip = view[`_servantClip${type}`];

		if (winChange) {
			egret.Tween.get(view._winGroup).to({ alpha: 1 }, 500).wait(400).to({ alpha: 0 }, 500).call(() => {
				egret.Tween.removeTweens(view._winGroup);
				aureoleClip.alpha = 0;
				egret.Tween.get(rolegroup).to({ x: isOnleft ? rolex - 248 : rolex + 248, y: view._rolePosY }, 250).call(() => {
					if (showskin) {
						view.moveList(type, showskin, showskinfunc);
					}
					else {
						view.moveList(type, showskin, showskinfunc);
					}
				}, view);
			}, view);
		}
		else {
			egret.Tween.get(rolegroup).wait(250).call(() => {
				view.moveList(type, showskin, showskinfunc);
			}, view);
		}
	}

	private moveList(type: string, showskin?, showskinfunc?): void {
		let view = this;
		let isOnleft = type == LayoutConst.left;
		let list: any = view[`_memberList${type}`];
		let roundData = view._roundLog[view._round];
		let rolex = view[`_${type}rolePosX`];
		let idx = view[`_${type}Idx`];
		let item = <AcConquerMainLandServantVsItem>list.getItemByIndex(idx);
		if (item) {
			item.refresh(() => {
				let speed = 0.8;
				egret.Tween.get(item).to({ y: item.y + 91 }, 91 / speed).call(() => {
					egret.Tween.removeTweens(item);
					list.hideItem(idx);
					--view[`_${type}Idx`];
					if (view[`_${type}Idx`] < 0) {
						view.showRoundAnti(type, view.startMove, view, showskin, showskinfunc);
					}
					else {
						//门客列表
						for (let i = view[`_${type}Idx`]; i >= 0; --i) {
							let unit = <AcConquerMainLandServantVsItem>list._scrollListItemArr[i];
							if (unit) {
								list.showItem(i);
								let posy = unit.y;
								egret.Tween.get(unit).to({ y: posy + 91 }, 91 / speed).call(() => {
									egret.Tween.removeTweens(unit);
									if (i == 0) {
										view.showRoundAnti(type, view.startMove, view, showskin, showskinfunc);
									}
								}, view);
							}
							else {
								view.showRoundAnti(type, view.startMove, view, showskin, showskinfunc);
							}
						}
					}
				}, view);
			}, view);
		}
		else {
			view.showRoundAnti(type, view.startMove, view, showskin, showskinfunc);
		}
	}

	private checkWin(): boolean {
		let view = this;
		let endFlag = true;
		let roundData = view._roundLog[view._round];
		if (roundData) {
			endFlag = false;
		}
		return endFlag;
	}


	protected getResourceList(): string[] {
		let code = this.uiCode;
		return super.getResourceList().concat([
			 'awnamebg1', 'awnamebg2',
			 `mainland_warshow_bg-${code}`,
			'progress_bloodbg', 'progress_blood', 'damage_fnt',
			`mlfightmask-${code}`, "mainlandpkduizhan",
			`mainland_warshow_sernamebg-${code}`, `mainland_warshow_titlebg-${code}`,
			"xingcun_closebtn", `mainland_warshow_title-${code}`, `mainland_warshow_fight-${code}`,
		]);
	}

	protected getRuleInfo(): string {
		return null;
	}

	protected getTitleStr(): string {
		return '';
	}
	protected getTitleBgName(): string {
		return "mainland_warshow_titlebg-" + this.uiCode;
	}


	protected getCloseBtnName(): string {
		return "xingcun_closebtn";
	}


	protected closeHandler(): void {
		let view = this;
		view.skipFight();
	}

	public dispose(): void {
		let view = this;
		let arr = [LayoutConst.left, LayoutConst.right];
		for (let type of arr) {
			egret.Tween.removeTweens(view[`_servantRole${type}`]);
			BaseLoadBitmap.release(view[`_servantRole${type}`]);
			view[`_servantRole${type}`] = null;
			view[`_servantClip${type}`].dispose();
			view[`_servantClip${type}`] = null;
			view[`_roleGroup${type}`] = null;
			view[`_midGroup${type}`] = null;
			view[`_playerNameTxt${type}`] = null;
			view[`_playerProgress${type}`] = null;
			view[`_winBitMapTxt${type}`] = null;
			view[`_winGroup${type}`] = null;
			view[`_memberList${type}`] = null;
			view[`_winBitMap${type}`] = null;
			view[`_winBitMap${type}`] = null;
			view[`_servantAlvImg${type}`] = null;
		}
		view._leftIdx = view._rightIdx = 0;
		view._winFlag = '';
		view._leftrolePosX = 0;
		view._rightrolePosX = 0;
		view._rolePosY = 0;
		view._scrollY = 0;
		view._round = 0;
		view._log = {};
		view._damageLog = {};
		view._roundLog = {};
		view._leftLog = [];
		view._rightLog = [];
		view._leftvsInfo = {};
		view._rightvsInfo = {};
		view._lunkong = false;
		view._flag = false;
		view._vsImg = null;
		view._skinEquip = [];
		view._showSkin = 0;
		view._together = false;
		super.dispose();
	}
}