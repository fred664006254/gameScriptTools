/**
 * 门客战斗演示界面
 * author qianjun
 */
class CountryWarShowView extends CommonView
{
	private _servantRoleleft : BaseLoadBitmap = null;
	private _servantRoleright : BaseLoadBitmap = null;
	private _servantClipleft : CustomMovieClip = null;
	private _servantClipright : CustomMovieClip = null;
	private _roleGroupleft : BaseDisplayObjectContainer = null;
	private _roleGroupright : BaseDisplayObjectContainer = null;
	
	private _midGroupleft : BaseDisplayObjectContainer = null;
	private _midGroupright : BaseDisplayObjectContainer = null;
	private _playerNameTxtleft : BaseTextField = null;
	private _playerNameTxtright : BaseTextField = null;
	private _playerProgressleft : ProgressBar = null;
	private _playerProgressright : ProgressBar = null;
	private _winBitMapTxtleft : BaseBitmapText = null;
	private _winBitMapTxtright : BaseBitmapText = null;
	private _winBitMapleft : BaseBitmap = null;
	private _winBitMapright : BaseBitmap = null;
	private _winGroupleft : BaseDisplayObjectContainer = null;
	private _winGroupright : BaseDisplayObjectContainer = null;

	private _planDescBgleft : BaseBitmap = null;
	private _planDescBgright : BaseBitmap = null;
	private _planDescArrowleft : BaseBitmap = null;
	private _planDescArrowright : BaseBitmap = null;
	private _planDescTxtleft : BaseTextField = null;
	private _planDescTxtright : BaseTextField = null;
	private _planNameTxtleft : BaseTextField = null;
	private _planNameTxtright : BaseTextField = null;
	private _planGroupleft : BaseDisplayObjectContainer = null;
	private _planGroupright : BaseDisplayObjectContainer = null;
	private _memberListleft : ScrollList = null;
	private _memberListright : ScrollList = null;
	private _damageTxtGroup : BaseDisplayObjectContainer = null;
	private _damageScrollView : ScrollView = null;
	private _arrowleft : BaseBitmap = null;
	private _arrowright : BaseBitmap = null;
	private _buffTxtleft : BaseTextField = null;
	private _buffTxtright : BaseTextField = null; 

	private _leftIdx : number = 0;
	private _rightIdx : number = 0;
	private _winFlag : string = '';
	private _rolePosX = 0;
	private _rolePosY = 0;
	private _scrollY = 0;
	private _round = 0;

	private _log : any = {};
	private _damageLog : any = {};
	private _roundLog : any = {};
	private _leftLog : any[] = [];
	private _rightLog : any[] = []
	private _leftvsInfo : any = {};
	private _rightvsInfo : any = {};
	private _lunkong : boolean = false;

	private _skinnamebgleft : BaseBitmap = null;
	private _skinnamebgright : BaseBitmap = null;
	private _skinnameTxtleft : BaseTextField = null;
	private _skinnameTxtright : BaseTextField = null;
	private _skinEquip = [];
	private _showSkin = 0;
	
	public constructor(){
		super();
	}

	private get api():CountryWarVoApi{
		return Api.countryWarVoApi;
	}
	
	protected getSoundBgName():string
	{
		return 'music_atkrace';
	}

	protected getRequestData():{requestType:string,requestData:any}{	
		let view = this;
		if(view.param.data.test){
			return null;
		}
		else{
            return {requestType:NetRequestConst.REQUEST_COUNTRYWAY_WARDETAIL,requestData:{
				city : view.api.getCityIndex(view.param.data.cityId),
			}};
		}
    }
	
	private _self = false;
	protected receiveData(rdata:any):void{
		let view = this;
		if(!rdata.ret){
			return;
		}
		let arr = ['left', 'right'];

		let data = view.param.data.test ? rdata.data : rdata.data.data.countrywarresult;
		view._self = false;
		view._lunkong = false;
		if(Object.keys(data.tinfo).length == 0){
			view._lunkong = true;
		}
		
		for(let i in arr){
			let info = null;
            let sourceObj = null;
            //
			if(Number(data.tinfo.zid) == Api.mergeServerVoApi.getTrueZid()){
				view._self = true;
				sourceObj =  Number(i) == 0 ? data.tinfo : data;
				info = Number(i) == 0 ? data.tinfo.info : data.info;
				
			}
			else{
				sourceObj = Number(i) == 0 ? data : data.tinfo;
				info = Number(i) == 0 ? data.info : data.tinfo.info;
			}
			
			let obj : any = {};
			let log = [];
			let total = 0;

			view[`_${arr[i]}Log`] = [];
			view[`_${arr[i]}vsInfo`] = {};
            //对阵门客
            let zid = Number(i) == 0 ? Api.mergeServerVoApi.getTrueZid() : this.api.getEnermyZid();
			for(let j in info){
				let unit = info[j];
				total += unit.dps;
				log.push({
					servantId : unit.servant,
					plan : unit.stra,
					attr : unit.dps,
					name : unit.name,
					uid : j,
					curHp : unit.dps,
					alliname : zid ? Api.mergeServerVoApi.getAfterMergeSeverName(null, true, zid) : '',
					zid : zid,
					time : unit.st,
					type : arr[i],
                    skin : unit.servantskin,
                    anti : 0,
                    showAnti : false,
                    level :  unit.level,
				    titleid : unit.title,
					weaponDps : unit.weaponDps,
				});
			}
			log.sort((a,b)=>{
				return a.time - b.time;
            });
            
			view[`_${arr[i]}Log`] = log;
			obj['server'] = zid;
			obj['allianceName'] = zid ? Api.mergeServerVoApi.getAfterMergeSeverName(null, true, zid) : '',
			obj['attendLog'] = log;
			obj['totalattr'] = total;
			obj['type'] = arr[i];
			view[`_${arr[i]}vsInfo`] = obj;
		}
	}

	protected getBgName():string{
		return 'countrywarvsbg2';
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
			this.addChild(this.viewBg);
			
            this.viewBg.width = GameConfig.stageWidth;
			this.height = GameConfig.stageHeigth;
			this.viewBg.anchorOffsetX = this.viewBg.width / 2;
			this.viewBg.x = GameConfig.stageWidth / 2;
			this.viewBg.scaleX = (this.api.isRedTeam('left') ? 1 : -1);
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

	public initView():void{
        let view = this;
        if(view.param.data.test){
            view.receiveData({
                ret : true,
                data : {
                    id : 1,
                    zid : Api.mergeServerVoApi.getTrueZid(),
                    name : '打算武器',
                    info : {
                        123455 : {
                            servant : 1003,
							servantskin : 10031,
                            po : 1,
                            name : Api.playerVoApi.getPlayerName() + '44',
                            stra : 2,
                            dps : 50000,
                            st : 2,
                            level :  App.MathUtil.getRandom(1,7),
							title : `3303`,
							weaponDps:321,
                        },
                        123456 : {
                            servant : 1002,
                            po : 1,
                            name : Api.playerVoApi.getPlayerName() + '43',
                            stra : 2,
                            dps : 4000,
                            st : 2,
                            servantskin : 10021,
                            level :  App.MathUtil.getRandom(1,7),
							title : `3302`,
							weaponDps:321,
                        },
                        123457 : {
							servant : 1003,
							servantskin : 10031,
                            po : 1,
                            name : Api.playerVoApi.getPlayerName() + '44',
                            stra : 2,
                            dps : 50000,
                            st : 2,
                            level :  App.MathUtil.getRandom(1,7),
							title : `3303`,
							weaponDps:321,
						},
						123458 : {
                            servant : 1002,
                            po : 1,
                            name : Api.playerVoApi.getPlayerName() + '43',
                            stra : 2,
                            dps : 4000,
                            st : 2,
                            servantskin : 10021,
                            level :  App.MathUtil.getRandom(1,7),
							title : `3302`,
						},
						123459 : {
                            servant : 1002,
                            po : 1,
                            name : Api.playerVoApi.getPlayerName() + '43',
                            stra : 2,
                            dps : 4000,
                            st : 2,
                            servantskin : 10021,
                            level :  App.MathUtil.getRandom(1,7),
							title : `3302`,
							weaponDps:321,
						},
						123460 : {
                            servant : 1002,
                            po : 1,
                            name : Api.playerVoApi.getPlayerName() + '43',
                            stra : 2,
                            dps : 4000,
                            st : 2,
                            servantskin : 10021,
                            level :  App.MathUtil.getRandom(1,7),
							title : `3302`,
							weaponDps:321,
                        },
                    },
                    tinfo: {
                        info : {
                            223455 : {
                                servant : 1001,
								po : 1,
								stra : 2,
                                name : '天啊',
                                dps : 5000,
								st : 2,
								servantskin : 10011,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3304`,
								weaponDps:321,
                            },
                            223456 : {
                                servant : 1007,
                                po : 2,
                                name : '天我',
                                stra : 4,
                                dps : 1000,
								st : 2,
								servantskin : 10011,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3305`,
								weaponDps:321,
                            },
                            223457 : {
                                servant : 1008,
                                po : 2,
                                name : '天我',
                                stra : 1,
                                dps : 3000,
                                st : 2,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3306`,
							},
							223458 : {
                                servant : 1007,
                                po : 2,
                                name : '天我',
                                stra : 4,
                                dps : 1000,
								st : 2,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3305`,
							},
							223459 : {
                                servant : 1014,
                                po : 2,
                                name : '天我',
                                dps : 1000,
								st : 2,
								servantskin : 10141,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3305`,
							},
							223460 : {
                                servant : 1007,
                                po : 2,
                                name : '天我',
                                dps : 1000,
								st : 2,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3305`,
							},
							223461 : {
                                servant : 1007,
                                po : 2,
                                name : '天我',
                                dps : 1000,
								st : 2,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3305`,
							},
							223462 : {
                                servant : 1007,
                                po : 2,
                                name : '天我',
                                dps : 1000,
								st : 2,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3305`,
							},
							223463 : {
                                servant : 1003,
                                po : 2,
                                name : '天我',
                                dps : 1000,
								st : 2,
								servantskin : 10031,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3305`,
								weaponDps:321,
							},
							223464 : {
                                servant : 1007,
                                po : 2,
                                name : '天我',
                                dps : 1000,
								st : 2,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3305`,
							},
							223465 : {
                                servant : 1002,
                                po : 2,
                                name : '天我',
                                dps : 1000,
								st : 2,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3305`,
								servantskin : 10021,
							},
							223466 : {
                                servant : 1007,
                                po : 2,
                                name : '天我',
                                dps : 1000,
								st : 2,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3305`,
							},    
							223467 : {
                                servant : 1007,
                                po : 2,
                                name : '天我',
                                dps : 1000,
								st : 2,
                                level :  App.MathUtil.getRandom(1,7),
								title : `3305`,
							},                       },
                        level : 4,
                        id : 2,
                        zid : 2,
                        name : '撒啊',
                    },
                    score : 100,
                    level : 1,
                }
            });
        }

		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;

		let bottomgroup = new BaseDisplayObjectContainer();
		bottomgroup.width = GameConfig.stageWidth;
		bottomgroup.height = 190;
		App.DisplayUtil.setLayoutPosition( LayoutConst.horizontalCenterbottom, bottomgroup, view);
		view.addChild(bottomgroup);

		let bottombg = BaseBitmap.create('public_9_downbg');
		bottombg.width = bottomgroup.width;
		bottombg.height = bottomgroup.height;
		App.DisplayUtil.setLayoutPosition( LayoutConst.horizontalCenterverticalCenter, bottombg, bottomgroup, [0,0], true);
		bottomgroup.addChild(bottombg);

		let infoGroup = new BaseDisplayObjectContainer();
		infoGroup.width = 640;
		//App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infoGroup, bottomBg, [0,45]);
		view.addChild(infoGroup);
		view._damageTxtGroup = infoGroup;

		let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,bottombg.height - 20);
		infoGroup.y = 0;
		let scrollView = ComponentManager.getScrollView(infoGroup,rect);
		scrollView.y = bottomgroup.y + 10;
		scrollView.verticalScrollPolicy = "off";
		scrollView.bounces = false;
		view.addChild(scrollView);
		view._damageScrollView = scrollView;

		view.createWarInfo(LayoutConst.left);
        view.createWarInfo(LayoutConst.right);
        let vsbg = BaseBitmap.create(`crossservantrulevs`);
        vsbg.setScale(0.6);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, vsbg, view, [0,75]);
        view.addChild(vsbg);

		let crossservantrulevs = BaseBitmap.create('crossservantrulevs');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, crossservantrulevs, bottomgroup, [15,-crossservantrulevs.height]);
		view.addChild(crossservantrulevs);

		view.setChildIndex(view.closeBtn, 9999);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [0,0]);
		view.beginWarLog();
	}

	private createWarInfo(type : string):void{
		let view = this;
		let isleft = type == LayoutConst.left;
		let wardata = view[`_${type}vsInfo`];
		let empty = view._lunkong && !isleft

		let topgroup = new BaseDisplayObjectContainer();
		topgroup.width = GameConfig.stageWidth / 2;
		topgroup.height = 130;
        App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.lefttop : LayoutConst.righttop, topgroup, view.titleBg, [0,view.titleBg.height]);
		view.addChild(topgroup);
        //职员信息
		let infobg = BaseBitmap.create(view.api.isRedTeam(type) ? `countrywarleft` : `countrywarright`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infobg, topgroup, [0,0], true);
		topgroup.addChild(infobg);
        //帮会信息
        let zid = isleft ? Api.mergeServerVoApi.getTrueZid() : this.api.getEnermyZid();
        let teamNameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`CountryWar${type}Team`, [LanguageManager.getlocal(`Countrywarvsname${view.api.isRedTeam(type) ? 'left' : 'right'}`), Api.mergeServerVoApi.getAfterMergeSeverName(null, true, zid)]), 22, view.api.isRedTeam(type) ? TextFieldConst.COLOR_QUALITY_RED : TextFieldConst.COLOR_QUALITY_BLUE);
        App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.righttop : LayoutConst.lefttop, teamNameTxt, infobg, [40,7]);
        topgroup.addChild(teamNameTxt);

        let memberNumBg = BaseBitmap.create(`public_itemtipbg`);
		topgroup.addChild(memberNumBg);
        
        let memberNumTxt = ComponentManager.getTextField(LanguageManager.getlocal('CountryWarAttendNum',[empty ? 0 : wardata.attendLog.length.toString()]), 20);
        memberNumBg.width = memberNumTxt.textWidth + 40;
        App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.leftbottom : LayoutConst.rightbottom, memberNumBg, topgroup, [0,5], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, memberNumTxt, memberNumBg);
		topgroup.addChild(memberNumTxt);
		
		//人物形象
		let midgroup = new BaseDisplayObjectContainer();
		midgroup.width = 260;
		midgroup.height = 460;
		App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.leftbottom : LayoutConst.rightbottom, midgroup, view, [0,200]);
		view.addChild(midgroup);
		view[`_midGroup${type}`] = midgroup;
		
		// let servantCfg = Config.ServantCfg.getServantItemById('1001');
		let roleContainer = new BaseDisplayObjectContainer();
		roleContainer.width = 248;
		roleContainer.height = 287;
		roleContainer.anchorOffsetX = roleContainer.width / 2;
		roleContainer.anchorOffsetY = roleContainer.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, roleContainer, midgroup, [0,0], true);
		midgroup.addChild(roleContainer);
		view[`_roleGroup${type}`] = roleContainer;

		let aureoleClip = ComponentManager.getCustomMovieClip("acwealthcarpeffect", 10, 70);
		let aureoleBM = BaseBitmap.create("acwealthcarpeffect1");
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
		role.width = 248;
		role.height = 287;
		roleContainer.addChild(role);

		view._rolePosX = roleContainer.x;
		view._rolePosY = roleContainer.y;
		view[`_servantRole${type}`] = role;
		//计策
		let plangroup = new BaseDisplayObjectContainer();
		plangroup.width = 250;
		plangroup.height = 110;
		view.addChild(plangroup);
		view[`_planGroup${type}`] = plangroup;
		plangroup.alpha = 0;

		//语言文本
		let descBg = BaseBitmap.create('public_9_bg42');
		descBg.width = 250;
		plangroup.addChild(descBg);
		view[`_planDescBg${type}`] = descBg;
		
		let arrowBM = BaseBitmap.create("public_9_bg13_tail");
		arrowBM.anchorOffsetX = arrowBM.width / 2;
		arrowBM.scaleX = -1;
		plangroup.addChild(arrowBM);
		view[`_planDescArrow${type}`] = arrowBM;

		let descTxt =ComponentManager.getTextField(LanguageManager.getlocal(``), 20, TextFieldConst.COLOR_BLACK);
		descTxt.width = 200;
		descTxt.lineSpacing = 5;
		plangroup.addChild(descTxt);
		view[`_planDescTxt${type}`] = descTxt;
		
		let planNameTxt =ComponentManager.getTextField(LanguageManager.getlocal(``), 18, TextFieldConst.COLOR_WARN_GREEN2);
		plangroup.addChild(planNameTxt);
		view[`_planNameTxt${type}`] = planNameTxt;

		descBg.height = descTxt.textHeight + 45;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, plangroup, [0,0], true);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrowBM, descBg, [25,descBg.height-3]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, descBg, [0,15]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, planNameTxt, descBg, [20,10]);

		App.DisplayUtil.setLayoutPosition( LayoutConst.horizontalCentertop, plangroup, midgroup, [0,-plangroup.height]);
		//连胜场数
		let wingroup = new BaseDisplayObjectContainer();
		wingroup.width = 90;
		wingroup.height = 90;
		wingroup.anchorOffsetX = wingroup.width / 2;
		App.DisplayUtil.setLayoutPosition(isleft ? LayoutConst.lefttop : LayoutConst.righttop, wingroup, midgroup, [10,0], true);
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

		let winBitMapTxt = ComponentManager.getBitmapText('2',TextFieldConst.FONTNAME_ITEMTIP);
		winBitMapTxt.x = winBg.x - 15 - winBitMapTxt.textWidth - winBg.anchorOffsetX;
		winBitMapTxt.y = 0;
		//App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winBitMapTxt, wingroup, (isleft ? [10,33] : [10,0]),true);
		view[`_winBitMapTxt${type}`] = winBitMapTxt;
		wingroup.addChild(winBitMapTxt);

		let playernamebg = BaseBitmap.create(view.api.isRedTeam(type) ? 'awnamebg1' : 'awnamebg2');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, playernamebg, roleContainer, [0,roleContainer.height * roleContainer.scaleX]);
		midgroup.addChild(playernamebg);

		let playernameTxt = ComponentManager.getTextField('', 22);
		playernameTxt.height = 22;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playernameTxt, playernamebg);
		midgroup.addChild(playernameTxt);
		view[`_playerNameTxt${type}`] = playernameTxt;

		let skinnamebg = BaseBitmap.create(`skinshowkuang3`);
		skinnamebg.visible = false;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinnamebg, playernamebg, [0,-skinnamebg.height-5]);
		midgroup.addChild(skinnamebg);
		view[`_skinnamebg${type}`] = skinnamebg;

		let skinnameTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_BLACK);
		skinnameTxt.height = 22;
		skinnameTxt.visible = false;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinnameTxt, skinnamebg);
		midgroup.addChild(skinnameTxt);
		view[`_skinnameTxt${type}`] = skinnameTxt;

		let progress = ComponentManager.getProgressBar("progress8","progress3_bg",260);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progress, playernamebg, [0,playernamebg.height + 5]);
		midgroup.addChild(progress);
		view[`_playerProgress${type}`] = progress;

		let arrowImg = BaseBitmap.create('');
		let buffTxt = ComponentManager.getTextField('',18);
		view[`_arrow${type}`] = arrowImg;
		view[`_buffTxt${type}`] = buffTxt;
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, buffTxt, progress);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, arrowImg, buffTxt);
		arrowImg.visible = buffTxt.visible = false;
		midgroup.addChild(arrowImg);
		midgroup.addChild(buffTxt);

		let awpositionbg = BaseBitmap.create(view.api.isRedTeam(type) ? 'awpositionbgred' : 'awpositionbgblue');

		awpositionbg.width = 260;
		awpositionbg.height = 105;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, awpositionbg, progress, [0,progress.height + 7]);
		midgroup.addChild(awpositionbg);

		let tmpRect =  new egret.Rectangle(0,0,awpositionbg.width - 10, awpositionbg.height - 25);
		let arr = Api.chatVoApi.arr_clone(wardata.attendLog);
		for(let i = 0; i < 3; ++ i){
			arr.push({empty : true});
		}
		let scrollList = ComponentManager.getScrollList(CountryWarShowPlayerInfoItem, arr, tmpRect);
		scrollList.setEmptyTip(LanguageManager.getlocal(`acPunishNoData`));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, awpositionbg, [0,-10]);
		midgroup.addChild(scrollList);
		scrollList.verticalScrollPolicy = 'off';
		scrollList.bounces = false;
		view[`_memberList${type}`] = scrollList;
	}

	private beginWarLog():void{
		let view = this;
		let leftlog = view._leftLog;
		let rightlog = view._rightLog;
		view._log = {};
		view._log['left'] = leftlog;
		view._log['right'] = rightlog;
		view._roundLog = {};
		view._skinEquip = [];

		if(view._lunkong){
			view._winFlag = 'left';
			view._roundLog[view._round] = {
				left : {
					servantId : leftlog[0].servantId,
					name : leftlog[0].name,
					curHp : leftlog[0].curHp,
					prevHp : leftlog[0].curHp,
					attr : leftlog[0].attr,
					dps : 0,
					win : 0,
					change : false,
					leftIdx : 0,
					plan : leftlog[0].plan,
					allipos : leftlog[0].allipos,
					alliname : leftlog[0].alliname,
                    skin : leftlog[0].skin,
                    anti : 0,
                    showAnti : false,
                    level :  leftlog[0].level,
					titleid : leftlog[0].titleid,
					weaponDps:leftlog[0].weaponDps
				}
			}
			view.showRoundAnti(LayoutConst.left, view.startMove, view);
		}
		else{
			view._damageLog = {};
			view._damageLog[LayoutConst.left] = {};
			view._damageLog[LayoutConst.right] = {}
			view._leftIdx = view._rightIdx = 0;

			for(let i in view._log){
				for(let j in view._log[i]){
					let unit = view._log[i][j];
					unit.curHp = unit.attr;
				}
			}
			view._scrollY = 0;
			view.freshText('1', [view._leftvsInfo.allianceName, App.StringUtil.changeIntToText(Math.floor(view._leftvsInfo.totalattr))], true);
			view.freshText('1', [view._rightvsInfo.allianceName, App.StringUtil.changeIntToText(Math.floor(view._rightvsInfo.totalattr))], false);
			//预先演算一遍
			let leftidx = 0;
			let rightidx = 0;

			view._roundLog = {};
			view._round = 0;
			view._roundLog[view._round] = {
				left : {
					servantId : leftlog[0].servantId,
					name : leftlog[0].name,
					curHp : leftlog[0].curHp,
					prevHp : leftlog[0].curHp,
					attr : leftlog[0].attr,
					dps : 0,
					win : 0,
					change : false,
					leftIdx : 0,
					plan : 0,
					allipos : leftlog[0].allipos,
					alliname : leftlog[0].alliname,
                    skin : leftlog[0].skin,
                    anti : 0,
                    showAnti : false,
                    level :  leftlog[0].level,
					titleid : leftlog[0].titleid,
					weaponDps:leftlog[0].weaponDps
				},
				right : {
					servantId : rightlog[0].servantId,
					name : rightlog[0].name,
					curHp : rightlog[0].curHp,
					prevHp : rightlog[0].curHp,
					attr : rightlog[0].attr,
					dps : 0,
					win : 0,
					change : false,
					rightIdx : 0,
					plan : 0,
					allipos : rightlog[0].allipos,
					alliname : rightlog[0].alliname,
                    skin : rightlog[0].skin,
                    anti : 0,
                    showAnti : false,
                    level :  rightlog[0].level,
					titleid : rightlog[0].titleid,
					weaponDps:rightlog[0].weaponDps
				},
			}
			let winflag = false;			
			while(!winflag){
				let view = this;
				let leftData = view._log[LayoutConst.left][leftidx];
				let rightData = view._log[LayoutConst.right][rightidx];

				let leftExtra = 0;
                let leftplan = 0;
                let rightExtra = 0;
                let rightplan = 0;
                if(!leftData[`planEffect`] && !rightData[`planEffect`] && ((leftData.plan == 3 && rightData.plan == 2) || ((rightData.plan == 3 && leftData.plan == 2)))){
                    if(leftData.plan == 3){
                        leftplan = leftData.plan;
                        leftData[`winMax`] = Config.CountrywarCfg.servantMaxWin;
                        view.calPlanEffect(leftData, rightData);
                        leftExtra = view.calExtraDamage(leftData, rightData);
                        leftData[`planEffect`] = true;

                        rightplan = rightData.plan;
                        rightData[`winMax`] = Config.CountrywarCfg.servantMaxWin;
                        view.calPlanEffect(rightData, leftData);
                        rightExtra = view.calExtraDamage(rightData, leftData);
                        rightData[`planEffect`] = true;
                    }
                    else if(rightData.plan == 3){
                        rightplan = rightData.plan;
                        rightData[`winMax`] = Config.CountrywarCfg.servantMaxWin;
                        view.calPlanEffect(rightData, leftData);
                        rightExtra = view.calExtraDamage(rightData, leftData);
                        rightData[`planEffect`] = true;

                        leftplan = leftData.plan;
                        leftData[`winMax`] = Config.CountrywarCfg.servantMaxWin;
                        view.calPlanEffect(leftData, rightData);
                        leftExtra = view.calExtraDamage(leftData, rightData);
                        leftData[`planEffect`] = true;
                    }
                }
                else{
                    if(!leftData[`planEffect`]){
                        leftplan = leftData.plan;
                        leftData[`winMax`] = Config.CountrywarCfg.servantMaxWin;
                        view.calPlanEffect(leftData, rightData);
                        leftExtra = view.calExtraDamage(leftData, rightData);
                        leftData[`planEffect`] = true;
                    
                    }
                    
                    if(!rightData[`planEffect`]){
                        rightplan = rightData.plan;
                        rightData[`winMax`] = Config.CountrywarCfg.servantMaxWin;
                        view.calPlanEffect(rightData, leftData);
                        rightExtra = view.calExtraDamage(rightData, leftData);
                        rightData[`planEffect`] = true;
                    }
                }

				let leftHp = leftData.curHp;
				let rightHp = rightData.curHp;
				let sub = leftHp - rightHp;

				if(!view._damageLog['left'][leftData.uid]){
					view._damageLog['left'][leftData.uid] = {};
					view._damageLog['left'][leftData.uid]['damage'] = 0;
					view._damageLog['left'][leftData.uid]['win'] = 0;
					view._damageLog['left'][leftData.uid]['name'] = leftData.name;
				}
				view._damageLog['left'][leftData.uid]['damage'] += ((sub > 0 ? rightHp : leftHp) + leftExtra);

				if(!view._damageLog['right'][rightData.uid]){
					view._damageLog['right'][rightData.uid] = {};
					view._damageLog['right'][rightData.uid]['damage'] = 0;
					view._damageLog['right'][rightData.uid]['win'] = 0;
					view._damageLog['right'][rightData.uid]['name'] = rightData.name;
				}
				view._damageLog['right'][rightData.uid]['damage'] += ((sub < 0 ? leftHp : rightHp) + rightExtra);

				leftData.curHp = Math.max(sub, 0);
				rightData.curHp = Math.max(0,-sub);

				let leftchange = false;
				let rightchange = false;
				let leftresult = '';
				let rightresult = '';

				let lefttmpx = leftidx;
				let righttmpx = rightidx;

				let calLeftIdx = leftidx;
				let calRightIdx = rightidx;
				if(sub > 0){
					++ rightidx;
					++ calRightIdx
					rightchange = true;
					// view._damageLog['right'][rightData.uid]['win'] = 0;
					leftresult = 'win';
					view._damageLog['left'][leftData.uid]['win'] += 1;
					if(view._damageLog['left'][leftData.uid]['win'] >= leftData[`winMax`] || leftData.plan == 5){
						++ leftidx;
						++ calLeftIdx
						leftchange = true;
						// view._damageLog['left'][leftData.uid]['win'] = 0;
					}
				}
				else if(sub < 0){
					++ leftidx;
					++ calLeftIdx;
					leftchange = true;
					// view._damageLog['left'][leftData.uid]['win'] = 0;
					rightresult = 'win';
					view._damageLog['right'][rightData.uid]['win'] += 1;
					if(view._damageLog['right'][rightData.uid]['win'] >= rightData[`winMax`] || rightData.plan == 5){
						++ rightidx;
						++ calRightIdx;
						rightchange = true;
						// view._damageLog['right'][rightData.uid]['win'] = 0;
					}
				}
				else{
					++ leftidx;
					++ calLeftIdx;
					leftchange = true;
					// view._damageLog['left'][leftData.uid]['win'] = 0;
					
					++ rightidx;
					++ calRightIdx
					rightchange = true;
					// view._damageLog['right'][rightData.uid]['win'] = 0;
					leftresult = rightresult = 'draw';
				}

				++ view._round;
				view._roundLog[view._round] = {
					left : {
						servantId : leftData.servantId,
						name : leftData.name,
						prevHp : leftHp,
						curHp : leftData.curHp,
						attr : leftData.attr,
						dps : sub > 0 ? rightHp : leftHp,
						win : view._damageLog['left'][leftData.uid]['win'],
						change : leftchange,
						result : leftresult,
						leftIdx : lefttmpx,
						plan : leftplan,
						allipos : leftData.allipos,
						alliname :leftData.alliname,
                        skin : leftData.skin,
                        anti : leftData.anti,
                        showAnti : leftData.showAnti,
                        level :  leftData.level,
                        titleid : leftData.titleid,
						weaponDps:leftData.weaponDps
					},
					right : {
						servantId : rightData.servantId,
						name : rightData.name,
						prevHp : rightHp,
						curHp : rightData.curHp,
						attr : rightData.attr,
						dps : sub > 0 ? rightHp : leftHp,
						win : view._damageLog['right'][rightData.uid]['win'],
						change : rightchange,
						result : rightresult,
						rightIdx : righttmpx,
						plan : rightplan,
						allipos : rightData.allipos,
						alliname : rightData.alliname,
                        skin : rightData.skin,
                        anti : rightData.anti,
                        showAnti : rightData.showAnti,
                        level :  rightData.level,
                        titleid : rightData.titleid,
						weaponDps:rightData.weaponDps
					},
				}

				let newleftdata = view._log[LayoutConst.left][calLeftIdx];
				let newrightData = view._log[LayoutConst.right][calRightIdx];
				winflag = true;
				if(!newleftdata && !newrightData){
					if(leftresult == 'draw' && rightresult == 'draw'){
						view._winFlag = 'draw';
					}
					else if(leftresult == 'win'){
						view._winFlag = LayoutConst.left;
					}
					else if(rightresult == 'win'){
						view._winFlag = LayoutConst.right;
					}
				}
				else if(newleftdata && !newrightData){
					view._winFlag = LayoutConst.left;
				}else if(newrightData && !newleftdata){
					view._winFlag = LayoutConst.right;
				}else{
					winflag = false;
				}

				if(winflag){
					break;
				}
			}		

			for(let i in view._log){
				for(let j in view._log[i]){
					let unit = view._log[i][j];
					unit.curHp = unit.attr;
					unit.planEffect = false;
					unit.winMax = Config.CountrywarCfg.servantMaxWin;
				}
			}
			view.leftWin = view.rightWin = 0;
			view._round = 1;
			view._together = true;
			view.flag = false;
			view.buff = false;

			let leftdata = view._roundLog[view._round][LayoutConst.left];
			if(leftdata && leftdata.weaponDps){
				this._skinEquip.push([leftdata.weaponDps,1,leftdata.servantId]);
			}

			let rightdata = view._roundLog[view._round][LayoutConst.right];
			if(rightdata && rightdata.weaponDps){
				this._skinEquip.push([rightdata.weaponDps,2,rightdata.servantId]);
			}
			
			view._showSkin = 0;
			if(this._skinEquip.length){
				view._showSkin = this._skinEquip.length;
				if(this._skinEquip.length == 2){
					view.showRoundAnti(LayoutConst.left,null,null,true);
				}
				else{
					if(leftdata && leftdata.skin){
						view.showRoundAnti(LayoutConst.left,null,null,true);
					}
					else{
						view.showRoundAnti(LayoutConst.right,null,null,true);
					}
				}
			}
			else{
				view.showRoundAnti(LayoutConst.left);
				view.showRoundAnti(LayoutConst.right);
			}
		}
	}

	private showSkin(func : Function):void{
		let view = this;
		if(this._skinEquip.length){
			// ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESHOWSKINVIEW, {
			// 	callback : ()=>{
			// 		this._skinEquip.splice(0,1);
			// 		func.apply(this);
			// 	},
			// 	callbackThisObj : this,
			// 	skinId : this._skinEquip[0]
			// });

			let serId,serId2,value1,value2;

			if (this._skinEquip[0][1] == 1)
			{	
				serId = this._skinEquip[0][2];
				value1 = this._skinEquip[0][0];
			}
			else
			{	
				serId2 = this._skinEquip[0][2];
				value2 = this._skinEquip[0][0];
			}
			let view = this;
			ViewController.getInstance().openView(ViewConst.BASE.WEAPONCOMEONVIEW,{
				sid:serId,
				type:3,
				atype:5,
				value:value1,
				sid2:serId2,
				type2:1,
				atype2:5,
				value2:value2,
				endhide:true,
				f:()=>{
					view._skinEquip.splice(0,1);
					func.apply(view);
				},
				o:this,
				auto: false,
			});
		}
		else{
			
		}
	}

	private calPlanEffect(sourceData : any, TargetData : any):void{
		let view = this;
		let cfg = Config.CountrywarCfg.secretList;;
		let info = cfg[sourceData.plan];
		switch(sourceData.plan){
            case 1:
            case 5:
                sourceData.curHp *= (1 + info.powerup);
                break;
            case 2:
                if(TargetData.anti > 0){
                    -- TargetData.anti;
                    TargetData.showAnti = true;
                }
                else{
                    TargetData.curHp *= (1 - info.powerdown);
                    TargetData.showAnti = false;
                }
                break;
            case 3:
                sourceData.anti += info.times;
				break;
			case 4:
                sourceData.winMax += info.wins;
				break;
		}
	}

	private calExtraDamage(sourceData : any, targetData : any):number{
		let view = this;
		let cfg = Config.CountrywarCfg.secretList;
        let extra = 0;
        let plan = sourceData.plan;
        let curhp = targetData.curHp;
		if(plan){
			let unit = cfg[plan];
			if(unit.powerdown > 0 && !targetData.showAnti){
				extra = unit.powerdown * curhp;
			}
		}
		return extra;
	}

	private flag = false;
	private buff = false;
	private showRoundAnti(type : string, func?:Function, obj?:any,showskin?,showskinfunc?):void{
		let view = this;
		let role : BaseLoadBitmap = view[`_servantRole${type}`];
		let isOnleft = type == LayoutConst.left;
		let playerNameTxt = view[`_playerNameTxt${type}`];
		let progress : ProgressBar = view[`_playerProgress${type}`];
		let list : ScrollList = view[`_memberList${type}`];
		let plangroup = view[`_planGroup${type}`];
		let roundData = view._roundLog[view._round];
		let skinNameTxt = view[`_skinnameTxt${type}`];
		let skinNameBg = view[`_skinnamebg${type}`];
		let aureoleClip = view[`_servantClip${type}`];
		let rolegroup = view[`_roleGroup${type}`];

		if(roundData){
			let data = view._roundLog[view._round][type];
			let curIdx = data[`${type}Idx`];
			//上阵效果
			let servantInfo = Config.ServantCfg.getServantItemById(data.servantId);
			rolegroup.y = view._rolePosY;
			let leftdata = view._roundLog[view._round]['left'];
			let rightdata = view._roundLog[view._round]['right'];
            let skip = false;
 
			if(view._together && leftdata.plan && rightdata.plan){
				if((leftdata.plan == 2 && rightdata.plan !== 4) || (rightdata.plan == 2 && leftdata.plan !== 4)){
					if(!view.buff){
						view.buff = true;
						skip = true;
					}
				}
			}
			egret.Tween.get(rolegroup).to({x : isOnleft ? -124 : 384, y : view._rolePosY}, 250).call(()=>{
				rolegroup.setScale(1);
				aureoleClip.alpha = 0;
				let img = servantInfo.fullIcon;
				if(data.skin){
					img = Config.ServantskinCfg.getServantSkinItemById(data.skin).body;
				}
				role.setload(img);
				skinNameBg.visible = skinNameTxt.visible = false;
				view[`_arrow${type}`].visible = view[`_buffTxt${type}`].visible = false;
				view[`_winGroup${type}`].visible = false;
				rolegroup.alpha = 1;
			},view).to({x : view._rolePosX, y : view._rolePosY}, 500).call(()=>{
				let item : any = list.getItemByIndex(curIdx);
				if(item){
					item.refreshTextColor();
				}
				playerNameTxt.text = data.name;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, playerNameTxt, rolegroup);
				
				let skincfg = Config.ServantskinCfg.getServantSkinItemById(data.skin);
				if(data.skin && skincfg){	
					aureoleClip.alpha = 1;
					skinNameTxt.text = skincfg.name;
					App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, skinNameTxt, rolegroup);
					skinNameBg.visible = skinNameTxt.visible = true;
				}
				else{
					skinNameTxt.text = ``;
					skinNameBg.visible = skinNameTxt.visible = false;
				}

				list.setScrollTop(curIdx * 43, 300);

				progress.setText(App.StringUtil.changeIntToText(data.attr));
				progress.setPercentage(data.attr / data.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(data.attr), 0)));
				
				//等级头衔
				let str = LanguageManager.getlocal(`PromotePlayersPopViewList1`);
				let titleId = data.titleid;
				if(titleId){
					let titleinfo = App.CommonUtil.getTitleData(titleId);
					if(titleinfo.title != ``){
						let title = Config.TitleCfg.getTitleCfgById(titleinfo.title);
						if(title && title.isTitle == 1 && title.titleType){
							str = title.titleName;
						}   
					}
				}
				view.freshText('2', [data.alliname, str, data.name, servantInfo.name, App.StringUtil.changeIntToText(Math.floor(data.attr))], type == 'left');
				
						if(showskin){
					view.showSkin(()=>{
						if(view._skinEquip.length == 1){
							view.showRoundAnti(type == LayoutConst.left?LayoutConst.right:LayoutConst.left,func,obj,true,()=>{
								view.showNext(type,skip,func,obj);
							});
						}
						else{
							if(view._showSkin == 1){
								if(view._together){
									view.showRoundAnti(type == LayoutConst.left?LayoutConst.right:LayoutConst.left,func,obj,false,()=>{
										view.showNext(type,skip,func,obj);
									});
								}
								else{
									view.showNext(type,skip,func,obj);
								}
							}
							else{
								if(showskinfunc){
									showskinfunc.apply(view);
								}
								view.showNext(type,skip,func,obj);
							}
						}
					});
				}
				else{	
					if(showskinfunc){
						showskinfunc.apply(view);
					}
					view.showNext(type,skip,func,obj);
				}
			},view);
		}
		else{
			if(func){
				func.apply(obj);
			}
		}
	}

	private showNext(type : string, skip?, func?, obj?):void{
		let view = this;
		let role : BaseLoadBitmap = view[`_servantRole${type}`];
		let isOnleft = type == LayoutConst.left;
		let playerNameTxt = view[`_playerNameTxt${type}`];
		let skinNameTxt = view[`_skinnameTxt${type}`];
		let skinNameBg = view[`_skinnamebg${type}`];
		let progress : ProgressBar = view[`_playerProgress${type}`];
		let list : ScrollList = view[`_memberList${type}`];
		let plangroup = view[`_planGroup${type}`];
		let roundData = view._roundLog[view._round];
		let data = view._roundLog[view._round][type];
		let curIdx = data[`${type}Idx`];
		let servantInfo = Config.ServantCfg.getServantItemById(data.servantId);
		//计策使用
		if(data.plan && !skip){
			if(view.buff){
				view.buff = false;
				let first = type;
				if(data.plan == 2){
					first = type == 'left' ? 'right' : 'left'
				}
				view.showBuff2(first, func, obj);
			}
			else{
				view.showBuff(type, func, obj);
			}
		}
		else{
			if(view._together){
				if(view.flag){
					view._together = false;
					if(view._round == 1){
						view.startMove();
					}
					if(func){
						func.apply(obj);
					}
				}
				else{
					view.flag = true;
				}
			}
			else{
				if(func){
					func.apply(obj);
				}
			}
		}
	}

	private showBuff2(type : string, func?:Function, obj?:any):void{
		let view = this;
		let data = view._roundLog[view._round][type];
		let role : BaseLoadBitmap = view[`_servantRole${type}`];
		let isOnleft = type == LayoutConst.left;
		let playerNameTxt = view[`_playerNameTxt${type}`];
		let progress : ProgressBar = view[`_playerProgress${type}`];
		let list : ScrollList = view[`_memberList${type}`];
		let plangroup = view[`_planGroup${type}`];
		let roundData = view._roundLog[view._round];

        view.freshPlanTxt(data.plan,type);

        let cfg = Config.CountrywarCfg.secretList[data.plan];
        let itemcfg = Config.ItemCfg.getItemCfgById(cfg.item);
		let planImg = BaseLoadBitmap.create(itemcfg.icon);
		planImg.width = planImg.height = 100;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, planImg, view[`_midGroup${type}`], [0,0], true);

		let tmpY = planImg.y;

		let plangbg = BaseBitmap.create('awplaneffect');
		plangbg.anchorOffsetX = plangbg.width / 2;
		plangbg.anchorOffsetY = plangbg.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, plangbg, planImg);
		egret.Tween.get(plangbg,{loop : true}).to({rotation : 360}, 10000);
		egret.Tween.get(planImg,{loop : true}).to({y : tmpY + 10},1000).to({y : tmpY},1000);
		// egret.Tween.get(planImg,{loop : true}).to({y : tmpY + 10},1000).to({y : tmpY},1000);
		view[`_midGroup${type}`].addChild(plangbg);
		view[`_midGroup${type}`].addChild(planImg);

		
		egret.Tween.get(plangroup).to({alpha : 1}, 1000).to({alpha : 0}, 1000).call(()=>{
			planImg.visible = plangbg.visible = false;
			egret.Tween.removeTweens(plangbg);
			egret.Tween.removeTweens(planImg);
			view[`_midGroup${type}`].removeChild(plangbg);
			view[`_midGroup${type}`].removeChild(planImg);
			plangbg = null;
			planImg = null;

            let newType = type;
			let buff = 'buffeffect';
			if(data.plan == 2){
                newType = type == LayoutConst.left ? LayoutConst.right : LayoutConst.left;
                let targetData = view._roundLog[view._round][newType];
                if(targetData.showAnti){
                    buff = null;
                }
                else{
                    buff = 'debuffeffect';
                    let buffeffect : CustomMovieClip = view[`_midGroup${newType}`].getChildByName('buffeffect');
                    if(buffeffect){
                        buffeffect.stop();
                        view[`_midGroup${newType}`].removeChild(buffeffect);
                        buffeffect = null;
                    }
                }
            }
            
            if(buff){
                let customClip = ComponentManager.getCustomMovieClip(buff,8,100);
                customClip.width = 283;
                customClip.height = 272;
                customClip.playWithTime(-1);
                customClip.name = 'buffeffect';
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, customClip, view[`_playerNameTxt${newType}`], [0,view[`_playerNameTxt${newType}`].height - 20]);
                view[`_midGroup${newType}`].addChild(customClip);
            }
			
			let posY = view[`_arrow${newType}`].y;
			let param = 0;
			let cfg = Config.CountrywarCfg.secretList;
			let tmp = cfg[data.plan];
			switch(data.plan){
				case 1:
				case 5:
					param = tmp.powerup;
					break;
				case 2:
					param = tmp.powerdown;
					break;
			}
			if(data.plan == 2){
                let newdata = view._roundLog[view._round][newType];
                if(newdata.showAnti){

                }
                else{
                    let hp = newdata.attr * (1 - param);
                    view[`_playerProgress${newType}`].setText(App.StringUtil.changeIntToText(hp));
                    view[`_playerProgress${newType}`].setPercentage(hp / newdata.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(hp), 0)));
                    newdata.attr = hp;
                    view[`_playerProgress${newType}`].TweenTxt(200);
                }
			}
			else if(data.plan == 1 || data.plan == 5){
				let hp = data.attr * (1 + param);
				view[`_playerProgress${newType}`].setText(App.StringUtil.changeIntToText(hp));
				view[`_playerProgress${newType}`].setPercentage(hp / data.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(hp), 0)));
                data.attr = hp;
                view[`_playerProgress${newType}`].TweenTxt(200);
			}
            
            if(buff && data.plan != 3){
                egret.Tween.get(view[`_arrow${newType}`]).wait(100).call(()=>{
                    view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = true;
                },view).to({y : posY - 10}, 300).to({y : posY}, 300).call(()=>{
                    //view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = false;
                },view).wait(300).call(()=>{
                    view.buff = false;
                    //view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = false;
                    view.showBuff(type == 'left' ? 'right' : 'left', func, obj);
                },view);
            }
            else{
                egret.Tween.get(view[`_arrow${newType}`]).wait(250).call(()=>{
                    view.buff = false;
                    //view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = false;
                    view.showBuff(type == 'left' ? 'right' : 'left', func, obj);
                },view);
            }
		},view);
	}

	private showBuff(type : string, func?:Function, obj?:any):void{
		let view = this;
        let data = view._roundLog[view._round][type];
        let cfg = Config.CountrywarCfg.secretList[data.plan];
        let itemcfg = Config.ItemCfg.getItemCfgById(cfg.item);

		let role : BaseLoadBitmap = view[`_servantRole${type}`];
		let isOnleft = type == LayoutConst.left;
		let playerNameTxt = view[`_playerNameTxt${type}`];
		let progress : ProgressBar = view[`_playerProgress${type}`];
		let list : ScrollList = view[`_memberList${type}`];
		let plangroup = view[`_planGroup${type}`];
		let roundData = view._roundLog[view._round];
		
		view.freshPlanTxt(data.plan,type);

        let planImg = BaseLoadBitmap.create(itemcfg.icon);
		planImg.width = planImg.height = 100;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, planImg, view[`_midGroup${type}`], [0,0], true);

		let tmpY = planImg.y;
		
		let plangbg = BaseBitmap.create('awplaneffect');
		plangbg.anchorOffsetX = plangbg.width / 2;
		plangbg.anchorOffsetY = plangbg.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, plangbg, planImg);
		egret.Tween.get(plangbg,{loop : true}).to({rotation : 360}, 10000);

		egret.Tween.get(planImg,{loop : true}).to({y : tmpY + 10},1000).to({y : tmpY},1000);
		view[`_midGroup${type}`].addChild(plangbg);
		view[`_midGroup${type}`].addChild(planImg);

		egret.Tween.get(plangroup).to({alpha : 1}, 1000).to({alpha : 0}, 1000).call(()=>{
			planImg.visible = plangbg.visible = false;
			egret.Tween.removeTweens(plangbg);
			egret.Tween.removeTweens(planImg);
			view[`_midGroup${type}`].removeChild(plangbg);
			view[`_midGroup${type}`].removeChild(planImg);
			plangbg = null;
			planImg = null;

			if(data.plan == 4){
				if(view._together){
					if(view.flag){
						view._together = false;
						if(view._round == 1){
							view.startMove();
						}
						if(func){
							func.apply(obj);
						}
					}
					else{
						view.flag = true;
					}
				}
				else{
					if(func){
						func.apply(obj);
					}
				}
			}
			else{
				let newType = type;
				if(data.plan == 2){
					newType = type == LayoutConst.left ? LayoutConst.right : LayoutConst.left;
				}
	
				let posY = view[`_arrow${newType}`].y;

				let buff = 'buffeffect';
				if(data.plan == 2){
					buff = 'debuffeffect';
                    let newdata = view._roundLog[view._round][newType];
                    if(newdata.showAnti){
                        buff = null;
                    }
                    else{
                        view[`_playerProgress${newType}`].setText(App.StringUtil.changeIntToText(newdata.prevHp));
                        view[`_playerProgress${newType}`].setPercentage(newdata.prevHp / newdata.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(newdata.prevHp), 0)));
                        view[`_playerProgress${newType}`].TweenTxt(200);
                    }
				}
				else if(data.plan == 1 || data.plan == 5){
					buff = 'buffeffect';
					view[`_playerProgress${newType}`].setText(App.StringUtil.changeIntToText(data.prevHp));
                    view[`_playerProgress${newType}`].setPercentage(data.prevHp / data.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(data.prevHp), 0)));
                    view[`_playerProgress${newType}`].TweenTxt(200);
                }

				let buffeffect : CustomMovieClip = view[`_midGroup${newType}`].getChildByName('buffeffect');
				if(buffeffect){
					buffeffect.stop();
					view[`_midGroup${newType}`].removeChild(buffeffect);
					buffeffect = null;
                }
                
                if(buff){
                    let customClip = ComponentManager.getCustomMovieClip(buff,8,100);
                    customClip.width = 283;
                    customClip.height = 272;
                    customClip.playWithTime(-1);
                    customClip.name = 'buffeffect';
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, customClip, view[`_playerNameTxt${newType}`], [0,view[`_playerNameTxt${newType}`].height - 20]);
                    view[`_midGroup${newType}`].addChild(customClip);
                }
				
				//view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = true;
                if(buff && data.plan != 3){
                    egret.Tween.get(view[`_arrow${newType}`]).wait(100).call(()=>{
                        view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = true;
                    },view).to({y : posY - 10}, 300).to({y : posY}, 300).call(()=>{
                        
                    },view).wait(300).call(()=>{
                        //view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = false;
                        if(view._together){
                            if(view.flag){
                                view._together = false;
                                if(view._round == 1){
                                    view.startMove();
                                }
                                if(func){
                                    func.apply(obj);
                                }
                            }
                            else{
                                view.flag = true;
                            }
                        }
                        else{
                            if(func){
                                func.apply(obj);
                            }
                        }
                    },view);
                }
                else{
                    egret.Tween.get(view[`_arrow${newType}`]).wait(250).call(()=>{
                        //view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = false;
                        if(view._together){
                            if(view.flag){
                                view._together = false;
                                if(view._round == 1){
                                    view.startMove();
                                }
                                if(func){
                                    func.apply(obj);
                                }
                            }
                            else{
                                view.flag = true;
                            }
                        }
                        else{
                            if(func){
                                func.apply(obj);
                            }
                        }
                    },view);
                }
			}
		},view);
	}

	private freshPlanTxt(plan : number, type : string):void{
		let view = this;
		let plangroup = view[`_planGroup${type}`];
		let param;
		let cfg = Config.CountrywarCfg.secretList;
        let obj = cfg[plan];
        let arrow = '';
		switch(plan){
			case 1:
			case 5:
				param = obj.powerup * 100;
				arrow = 'awuparrow';
				break;
			case 2:
				param = obj.powerdown * 100;
				arrow = 'awdownarrow';
				break;
			case 4:
				param = obj.wins;
                break;
            case 3:
                param = obj.times;
                break;
		}
        
        let targetData = view._roundLog[view._round][type == 'left' ? 'right' : 'left'];
        if(plan == 2 && targetData.showAnti){
            //技能被抵挡
            view[`_planDescTxt${type}`].text = LanguageManager.getlocal(`CountryWarPlanAnti`);
        }
        else{
            let rid = App.MathUtil.getRandom(1,4);
            view[`_planDescTxt${type}`].text = LanguageManager.getlocal(`CountryWarPlanDesc${plan}-${rid}`, [param]);
        }
        let itemcfg = Config.ItemCfg.getItemCfgById(obj.item);
        view[`_planNameTxt${type}`].text = itemcfg.name

		view[`_planDescBg${type}`].height = view[`_planDescTxt${type}`].textHeight + 45;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view[`_planDescBg${type}`], plangroup, [0,0], true);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view[`_planDescArrow${type}`], view[`_planDescBg${type}`], [25,view[`_planDescBg${type}`].height-3]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view[`_planDescTxt${type}`], view[`_planDescBg${type}`], [0,15]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, view[`_planNameTxt${type}`], view[`_planDescBg${type}`], [20,10]);
		App.DisplayUtil.setLayoutPosition( LayoutConst.horizontalCentertop, plangroup, view[`_midGroup${type}`], [0,-plangroup.height]);
        
        if(plan == 2 && targetData.showAnti){

        }
        else{
            //buff箭头
            if(arrow !== ''){
                let newType = type;
                if(plan == 2){
                    newType = type == LayoutConst.left ? LayoutConst.right : LayoutConst.left;
                }
                view[`_arrow${newType}`].setRes(arrow);
                view[`_buffTxt${newType}`].text = `${(plan == 2 ? '-' : '+')}${param}%`;
                view[`_buffTxt${newType}`].textColor = plan == 2 ? TextFieldConst.COLOR_WARN_RED : TextFieldConst.COLOR_WARN_GREEN;
                
                let progress : ProgressBar = view[`_playerProgress${newType}`];
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, view[`_buffTxt${newType}`], progress, [10,0]);
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, view[`_arrow${newType}`], progress, [view[`_buffTxt${newType}`].width + 15,0]);
            }   
        }
	}

	private skipFight():void{
		let view = this;
		let score = 0;
		if(view._self){
			score = view._rightvsInfo.allilevel;
		}
		else{
			score = view._winFlag == LayoutConst.left ? view._rightvsInfo.allilevel : view._leftvsInfo.allilevel;
		}
		if(!score){
			score = view._leftvsInfo.allilevel;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEWARRESULTVIEW, {
			type  : view.api.getCityIsWin(view.param.data.cityId) ? 'win' : 'fail',
			alliname : view._lunkong ? '' : view._rightvsInfo.allianceName,
			score : score,
			damageLog : view._damageLog,
			winanme : view.api.getCityIsWin(view.param.data.cityId) ? view._leftvsInfo.allianceName : view._rightvsInfo.allianceName,
			lunkong : view._lunkong,
			id : view._leftvsInfo.id,
            draw : view._winFlag == 'draw',
            wartype : 'countrywar',
            test : view.param.data.test,
            cityId : view.param.data.cityId
		});
		view.hide();
		
	}

	//文本消息 type 1入场 2出战 3击败 4退败
	private _scrollIdx = 0;
	private _messageIdx = 0;
	private freshText(type : string, param : any[], isLeft : boolean):void{
		let view = this;
		let infoGroup = view._damageTxtGroup;
		let desc = `CountryWarDesc${type}`;
		let damageTxt =  ComponentManager.getTextField(LanguageManager.getlocal(desc, param),18, isLeft ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW);
		damageTxt.lineSpacing = 5;
		damageTxt.width = GameConfig.stageWidth - 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, damageTxt, view._damageTxtGroup, [20, view._scrollY], true);
		damageTxt.name = `message${view._messageIdx}`;
		
		let height = 0;
		if(view._scrollY > 140){
			let item = view._damageTxtGroup.getChildByName(`message${view._scrollIdx}`);
			if(item){
				height = view._damageScrollView.scrollTop + item.height + 17 + (damageTxt.textHeight - item.height);
				++ view._scrollIdx;
			}
		}
		view._damageScrollView.scrollTop = height;
		view._scrollY += (damageTxt.textHeight + 10);
		view._damageTxtGroup.addChild(damageTxt);
		++ view._messageIdx;
	}

	private leftWin = 0;
	private rightWin = 0;
	private _together = false;
	private startMove():void{
		let view = this;
		//移动碰撞
		if(view.checkWin()){
			egret.Tween.get(view._planGroupleft).wait(500).call(()=>{
				view.skipFight();
			},view);
			
		}
		else{
			let leftData = view._roundLog[view._round][LayoutConst.left];
			let rightData = view._roundLog[view._round][LayoutConst.right];
			let leftrole : BaseLoadBitmap = view[`_servantRole${LayoutConst.left}`];
			let rightrole : BaseLoadBitmap = view[`_servantRole${LayoutConst.right}`];
			let leftprogress : ProgressBar = view[`_playerProgress${LayoutConst.left}`];
			let rightprogress : ProgressBar = view[`_playerProgress${LayoutConst.right}`];
			let leftaureoleClip = view[`_servantClip${LayoutConst.left}`];
			let rightaureoleClip = view[`_servantClip${LayoutConst.right}`];
			let leftrolegroup = view[`_roleGroup${LayoutConst.left}`];
			let rightrolegroup = view[`_roleGroup${LayoutConst.right}`];
			// let damageNum = sub > 0 ? damageright : damageLeft;
			view[`_winGroup${LayoutConst.left}`].visible = 	view[`_winGroup${LayoutConst.right}`].visible = false;
			
			let isleftWin = leftData.result == 'win';
			let isrightWin = rightData.result == 'win';
			let buffeffect : CustomMovieClip = view[`_midGroup${LayoutConst.left}`].getChildByName('buffeffect');
			let buffeffect2 : CustomMovieClip = view[`_midGroup${LayoutConst.right}`].getChildByName('buffeffect');

			egret.Tween.get(leftrolegroup).to({scaleX : 1.3, scaleY : 1.3}, 250).call(()=>{
				if(buffeffect){
					buffeffect.visible = false;
				}
			},view).to({x : view._rolePosX + 130, y : view._rolePosY - 200, scaleX : 0.6, scaleY : 0.6}, 100).call(()=>{	
				leftprogress.setText(App.StringUtil.changeIntToText(leftData.curHp));
				leftprogress.setPercentage(leftData.curHp / leftData.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(leftData.curHp), 0)));
			},view).to({x : isleftWin ? view._rolePosX : -124, y : isleftWin ? view._rolePosY : -200, scaleX : isleftWin ? 1 : 0, scaleY : isleftWin ? 1 : 0, alpha :isleftWin ? 1 : 0, rotation : isleftWin ? 0 : 720}, 600).call(()=>{
				if(isleftWin){
					if(buffeffect){
						buffeffect.visible = true;
					}
					view.rightWin = 0;
					++ view.leftWin;
					if(leftData.plan){
                        let tmpcfg = Config.CountrywarCfg.secretList[leftData.plan];
                        let itemtmpcfg = Config.ItemCfg.getItemCfgById(tmpcfg.item);
						view.freshText('5', [leftData.name, itemtmpcfg.name, rightData.name, App.StringUtil.changeIntToText(Math.floor(leftData.curHp)), view.leftWin], true);
					}
					else{
						view.freshText('3', [leftData.name, rightData.name, App.StringUtil.changeIntToText(Math.floor(leftData.curHp)), view.leftWin], true);
					}
                    let str = LanguageManager.getlocal(`PromotePlayersPopViewList1`);
					let titleId = rightData.titleid;
					if(titleId){
						let titleinfo = App.CommonUtil.getTitleData(titleId);
						if(titleinfo.title != ``){
							let title = Config.TitleCfg.getTitleCfgById(titleinfo.title);
							if(title && title.isTitle == 1 && title.titleType){
								str = title.titleName;
							}   
						}
					}
					view.freshText('4', [rightData.alliname, str, rightData.name], false);
					view[`_winGroup${LayoutConst.right}`].visible = false;
				}else if(isrightWin){
					view.leftWin = 0;
					++ view.rightWin;
					if(rightData.plan){
                        let tmpcfg = Config.CountrywarCfg.secretList[rightData.plan];
                        let itemtmpcfg = Config.ItemCfg.getItemCfgById(tmpcfg.item);
						view.freshText('5', [rightData.name, itemtmpcfg.name, leftData.name, App.StringUtil.changeIntToText(Math.floor(rightData.curHp)), view.rightWin], false);
					}
					else{
						view.freshText('3', [rightData.name, leftData.name, App.StringUtil.changeIntToText(Math.floor(rightData.curHp)), view.rightWin], false);
                    }
                    let str = LanguageManager.getlocal(`PromotePlayersPopViewList1`);
					let titleId = leftData.titleid;
					if(titleId){
						let titleinfo = App.CommonUtil.getTitleData(titleId);
						if(titleinfo.title != ``){
							let title = Config.TitleCfg.getTitleCfgById(titleinfo.title);
							if(title && title.isTitle == 1 && title.titleType){
								str = title.titleName;
							}   
						}
					}
					view.freshText('4', [leftData.alliname, str, leftData.name], true);
					leftrolegroup.setScale(1);
					leftrolegroup.alpha = 1;
					leftrolegroup.x = -124;
					leftrolegroup.y = view._rolePosY;
					view[`_winGroup${LayoutConst.left}`].visible = false;
				}
				else{
                    view.rightWin = 0;
                    let str = LanguageManager.getlocal(`PromotePlayersPopViewList1`);
					let titleId = rightData.titleid;
					if(titleId){
						let titleinfo = App.CommonUtil.getTitleData(titleId);
						if(titleinfo.title != ``){
							let title = Config.TitleCfg.getTitleCfgById(titleinfo.title);
							if(title && title.isTitle == 1 && title.titleType){
								str = title.titleName;
							}   
						}
					}
					view.freshText('4', [rightData.alliname, str, rightData.name], false);
                    view[`_winGroup${LayoutConst.right}`].visible = false;
                    
                    view.leftWin = 0;
                    let str2 = LanguageManager.getlocal(`PromotePlayersPopViewList1`);
                    let titleId2 = leftData.titleid;
					if(titleId2){
						let titleinfo = App.CommonUtil.getTitleData(titleId2);
						if(titleinfo.title != ``){
							let title = Config.TitleCfg.getTitleCfgById(titleinfo.title);
							if(title && title.isTitle == 1 && title.titleType){
								str = title.titleName;
							}   
						}
					}
					view.freshText('4', [leftData.alliname, str2, leftData.name], true);
					leftrolegroup.setScale(1);
					leftrolegroup.alpha = 1;
					leftrolegroup.x = -124;
					leftrolegroup.y = view._rolePosY;
					view[`_winGroup${LayoutConst.left}`].visible = false;
				}

				if(view.leftWin){
					view[`_winBitMapTxt${LayoutConst.left}`].text = view.leftWin.toString();
					view[`_winBitMapTxt${LayoutConst.left}`].x = view._winBitMapleft.x - 15 - view[`_winBitMapTxt${LayoutConst.left}`].textWidth - view._winBitMapleft.anchorOffsetX;
					view[`_winGroup${LayoutConst.left}`].visible = true;
				}

				if(view.rightWin){
					view[`_winBitMapTxt${LayoutConst.right}`].text = view.rightWin.toString();
					view[`_winBitMapTxt${LayoutConst.right}`].x = view._winBitMapright.x - 15 - view[`_winBitMapTxt${LayoutConst.right}`].textWidth- view._winBitMapright.anchorOffsetX;
					view[`_winGroup${LayoutConst.right}`].visible = true;
				}

			},view);

			let customClip = ComponentManager.getCustomMovieClip('atk_anim_',7,70);
			customClip.width = 185;
			customClip.height = 186;
			customClip.setEndCallBack(()=>{
				view.removeChild(customClip);
				customClip = null;
			},view);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, customClip, view, [0,-150]);
			customClip.visible = false;
			view.addChild(customClip);

			egret.Tween.get(rightrolegroup).to({scaleX : 1.2, scaleY : 1.2}, 250).call(()=>{
				if(buffeffect2){
					buffeffect2.visible = false;
				}
			},view).to({x : view._rolePosX - 130, y : view._rolePosY - 200, scaleX : 0.6, scaleY : 0.6},100).call(()=>{
				//伤害	
				// let damageText = ComponentManager.getBitmapText("-"+Math.floor(damageNum).toString(),"damage_fnt",undefined,undefined,true);
				// damageText.setPosition(rightrole.x + rightrole.width/2 - damageText.width/2 , rightrole.y + rightrole.height/2  - 50);
				// view[`_midGroupright`].addChild(damageText);
				// egret.Tween.get(damageText).to({y:damageText.y+30*3},300).to({y:damageText.y+30*6,alpha:0.1},600).call(()=>{
				// 	view[`_midGroupright`].removeChild(damageText);
				// 	damageText = null;
				// },view);

				customClip.visible = true;
				customClip.playWithTime(1);
				customClip.goToAndPlay(0);

				rightprogress.setText(App.StringUtil.changeIntToText(rightData.curHp));
				rightprogress.setPercentage(rightData.curHp / rightData.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(rightData.curHp), 0)));
			},view).to({x : isrightWin ? view._rolePosX : 384, y : isrightWin ? view._rolePosY : -200, scaleX : isrightWin ? 1 : 0, scaleY :isrightWin ?1 : 0, alpha : isrightWin ? 1 : 0, rotation : isrightWin ? 0 : 720}, 600).call(()=>{
				if(isrightWin){
					if(buffeffect2){
						buffeffect2.visible = true;
					}
				}
				else{
					rightrolegroup.setScale(1);
					rightrolegroup.alpha = 1;
					rightrolegroup.x = 384;
					rightrolegroup.y = view._rolePosY;
				}
			},view).wait(800).call(()=>{
				++ view._round;
				view._together = false;
				view._showSkin = 0;
				if(leftData.change && rightData.change){
					view.rightWin = view.leftWin = 0;
					view._together = true;
					view.flag = false;
					view.buff = false;
					let buffeffect : CustomMovieClip = view[`_midGroup${LayoutConst.right}`].getChildByName('buffeffect');
					if(buffeffect){
						buffeffect.stop();
						view[`_midGroup${LayoutConst.right}`].removeChild(buffeffect);
						buffeffect = null;
					}

					let buffeffect2 : CustomMovieClip = view[`_midGroup${LayoutConst.left}`].getChildByName('buffeffect');
					if(buffeffect2){
						buffeffect2.stop();
						view[`_midGroup${LayoutConst.left}`].removeChild(buffeffect2);
						buffeffect2 = null;
					}
					if(view._roundLog[view._round]){
						let leftdata = view._roundLog[view._round][LayoutConst.left];
						if(leftdata && leftdata.weaponDps){
							this._skinEquip.push([leftdata.weaponDps,1,leftdata.servantId]);
						}

						let rightdata = view._roundLog[view._round][LayoutConst.right];
						if(rightdata && rightdata.weaponDps){
							this._skinEquip.push([rightdata.weaponDps,2,rightdata.servantId]);
						}
					}
					
					view._showSkin = this._skinEquip.length;
					if(this._skinEquip.length){
						if(this._skinEquip.length == 2){
							view.showRoundAnti(LayoutConst.left,view.startMove,view,true);
						}
						else{
							let leftdata = view._roundLog[view._round][LayoutConst.left];
							if(leftdata && leftdata.skin){
								view.showRoundAnti(LayoutConst.left,view.startMove,view,true);
							}
							else{
								view.showRoundAnti(LayoutConst.right,view.startMove,view,true);
							}
						}
					}
					else{
						view.showRoundAnti(LayoutConst.left, view.startMove, view);
						view.showRoundAnti(LayoutConst.right, view.startMove, view);
					}
				}
				else if(leftData.change){
					view.leftWin = 0;
					let buffeffect2 : CustomMovieClip = view[`_midGroup${LayoutConst.left}`].getChildByName('buffeffect');
					if(buffeffect2){
						buffeffect2.stop();
						view[`_midGroup${LayoutConst.left}`].removeChild(buffeffect2);
						buffeffect2 = null;
					}
					if(view._roundLog[view._round]){
						let leftdata = view._roundLog[view._round][LayoutConst.left];
						if(leftdata && leftdata.weaponDps){
							this._skinEquip.push([leftdata.weaponDps,1,leftdata.servantId]);
						}
					}

					view._showSkin = this._skinEquip.length;
					if(this._skinEquip.length){
						view.showRoundAnti(LayoutConst.left,view.startMove,view,true);
					}
					else{
						view.showRoundAnti(LayoutConst.left, view.startMove, view);
					}
				}
				else{
					view.rightWin = 0;
					let buffeffect : CustomMovieClip = view[`_midGroup${LayoutConst.right}`].getChildByName('buffeffect');
					if(buffeffect){
						buffeffect.stop();
						view[`_midGroup${LayoutConst.right}`].removeChild(buffeffect);
						buffeffect = null;
					}

					if(view._roundLog[view._round]){
						let rightdata = view._roundLog[view._round][LayoutConst.right];
						if(rightdata && rightdata.weaponDps){
							this._skinEquip.push([rightdata.weaponDps,2,rightdata.servantId]);
						}
					}

					view._showSkin = this._skinEquip.length;
					if(this._skinEquip.length){
						view.showRoundAnti(LayoutConst.right, view.startMove, view, true);
					}
					else{
						view.showRoundAnti(LayoutConst.right, view.startMove, view);
					}
				}
			},view);
		}
	}

	private checkWin():boolean{
		let view = this;
		let endFlag = true;
		let roundData = view._roundLog[view._round];
		if(roundData){
			endFlag = false;
		}
		if(view._lunkong){
			endFlag = true;
		}
		return endFlag;
	}

	protected tick(){
		let view = this;
	}
	
	protected getResourceList():string[]{
		return super.getResourceList().concat([
			'countrywarvsbg2','awpositionbgblue','awpositionbgred','awlsheng','awnamebg1','awnamebg2',
			'crossservantvsmask1','crossservantvsmask2','awservernamebg1','awservernamebg2','awserverbg1','awserverbg2','awuparrow','awdownarrow',
			,'progress3_bg','progress8','crossservantrulevs','damage_fnt','acmazeview_textbg',
			'buffeffect','debuffeffect','awplaneffect',`skinshowkuang3`,`acwealthcarpeffect`,
        ]);
	}

	protected getRuleInfo():string{
		return null;
    }
    
    protected getTitleStr():string{
		return `CountryWarVsTitle`;
	}

	protected getTitleParams():string[]{
		return [LanguageManager.getlocal(`CountryWarCityName${this.param.data.cityId}`)];
	}


	protected getCloseBtnName():string{
		return ButtonConst.POPUP_CLOSE_BTN_1;
	}

	protected closeHandler():void{
		let view = this;
		view.skipFight();
	}

	public dispose():void{
		let view = this;
		let arr = [LayoutConst.left, LayoutConst.right];
		for(let type of arr){
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
			view[`_planDescBg${type}`] = null;
			view[`_planDescArrow${type}`] = null;
			view[`_planDescTxt${type}`] = null;
			view[`_planNameTxt${type}`] = null;
			egret.Tween.removeTweens(view[`_planGroup${type}`]);
			view[`_planGroup${type}`] = null;
			view[`_memberList${type}`] = null;
			egret.Tween.removeTweens(view[`_arrow${type}`]);
			view[`_arrow${type}`] = null;
			view[`_buffTxt${type}`] = null;
			view[`_winBitMap${type}`] = null;
			view[`skinnamebg${type}`]=null;
			view[`_skinnameTxt${type}`]=null;
		}
		view._damageTxtGroup = null;
		view._damageScrollView = null;
		view._leftIdx = view._rightIdx = 0;
		view._winFlag = '';
		view._rolePosX = 0;
		view._rolePosY = 0;
		view._scrollY = 0;
		view._round = 0;
		view._log = {};
		view._damageLog = {};
		view. _roundLog = {};
		view._leftLog = [];
		view._rightLog = [];
		view._leftvsInfo = {};
		view._rightvsInfo = {};
		view._lunkong = false;
		view._scrollIdx = 0;
		view._messageIdx = 0;
		view._together = false;
		view.flag = false;
		view.buff = false;
		view._skinEquip = [];
		view._showSkin = 0;
		super.dispose();
	}
}