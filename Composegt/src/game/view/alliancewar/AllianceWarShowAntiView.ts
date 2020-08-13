/**
 * 帮会战斗演示界面
 * author qianjun
 */
class AllianceWarShowAntiView extends CommonView
{
	private _servantRoleleft : BaseLoadBitmap = null;
	private _servantRoleright : BaseLoadBitmap = null;
	
	private _midGroupleft : BaseDisplayObjectContainer = null;
	private _midGroupright : BaseDisplayObjectContainer = null;
	private _playerNameTxtleft : BaseTextField = null;
	private _playerNameTxtright : BaseTextField = null;
	private _playerProgressleft : ProgressBar = null;
	private _playerProgressright : ProgressBar = null;
	private _winBitMapTxtleft : BaseBitmapText = null;
	private _winBitMapTxtright : BaseBitmapText = null;
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
	private _serverWin = '';
	
	public constructor(){
		super();
	}

	private get api():AllianceWarVoApi{
		return Api.allianceWarVoApi;
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
			return {requestType:NetRequestConst.REQUEST_ALLIANCEWAR_GETDETAIL,requestData:{
				id : view.param.data.id,
			}};
		}
		// NetManager.request(NetRequestConst.REQUEST_ALLIANCEWAR_GETDETAIL,{
		// 	id:view._data.id
		// });
	}
	
	private _self = false;
	protected receiveData(rdata:any):void{
		let view = this;
		let test = view.param.data.test;
		let arr = ['left', 'right'];
		// if(!rdata.data.data.wardetail.length){
		// 	return;
		// }r
		let data = test ? rdata.data : rdata.data.data.wardetail[0];// rdata.data;
		view._self = false;
		view._lunkong = false;
		if(Object.keys(data.tinfo).length == 0){
			view._lunkong = true;
		}
		
		for(let i in arr){
			let info = null;
			let sourceObj = null;
			if(Number(data.tinfo.id) == Number(Api.allianceVoApi.getAllianceVo().id)){
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
			for(let j in info){
				let unit = info[j];
				total += unit.dps;
				// let extra = view.api.getAlliancePosAdd(sourceObj.level, unit.po);
				log.push({
					servantId : unit.servant,
					plan : unit.stra,
					attr : unit.dps,
					name : unit.name,
					uid : j,
					curHp : unit.dps,
					allipos : unit.po,
					alliname : sourceObj.name,
					zid : sourceObj.zid,
					time : unit.st,
					type : arr[i],
					skin : unit.servantskin,
				});

				if(unit.stra == 1 && unit.servant2){
					log.push({
						servantId : unit.servant2,
						plan : 0,
						attr : unit.dps2,
						name : unit.name,
						uid : j,
						curHp : unit.dps2,
						allipos : unit.po,
						alliname : sourceObj.name,
						zid : sourceObj.zid,
						time : unit.st + 1,
						type : arr[i],
						skin : unit.servantskin2,
					});
				}
			}
			log.sort((a,b)=>{
				if(a.allipos == b.allipos){
					if(a.time == b.time){
						return a.uid - b.uid;
					}
					else{
						return a.time - b.time;
					}
				}
				else{
					return a.allipos - b.allipos;
				}
			});
			view[`_${arr[i]}Log`] = log;
			
			obj['server'] = sourceObj.zid;
			obj['allianceName'] = sourceObj.name ? sourceObj.name : LanguageManager.getlocal('nothing');
			obj['attendLog'] = log;
			obj['totalattr'] = total;
			obj['allilevel'] = sourceObj.level;
			obj['score'] = sourceObj.score;
			obj['type'] = arr[i];
			obj['id'] = sourceObj.id;
			view[`_${arr[i]}vsInfo`] = obj;
		}

		if(view._self || data.win == 0){
			view._serverWin = 'right';
		}
		else{
			view._serverWin = 'left';
		}
	}

	protected getBgName():string{
		return 'alliancewarbg2';
	}

	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseLoadBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            this.height = GameConfig.stageHeigth;

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
					id : Api.allianceVoApi.getAllianceVo().id,
					zid : Api.mergeServerVoApi.getTrueZid(),
					name : Api.allianceVoApi.getAllianceVo().name,
					info: {"69005648":{"po":4,"name":"交大薛之謙","servant":"2005","dps":143282238,"st":1542816745},"69000181":{"po":3,"name":"米奇","servant":"1006","dps":115944131,"st":1542817095},"69000103":{"po":1,"name":"軒轅","servant":"1002","dps":74465716,"st":1542857363},"69000368":{"po":2,"name":"小棒頭","servant":"1010","dps":136050916,"st":1542829681},"69003142":{"po":4,"name":"王總","servant":"1050","dps":53086169,"st":1542862552},"69005945":{"po":4,"name":"軒之武","servant":"1050","dps":27181611,"st":1542858182},"69006005":{"po":4,"name":"李清露","servant":"1014","dps":51308553,"st":1542885005},"69001741":{"po":3,"name":"邪小楓","servant":"2004","dps":77192547,"st":1542853412},"69005949":{"po":4,"name":"宮秀潔","servant":"2008","dps":41094724,"st":1542822747},"69000858":{"po":4,"name":"Nish","servant":"1014","dps":33971089,"st":1542843921},"69003169":{"po":4,"name":"楓林玉","servant":"1035","dps":53016093,"st":1542828992},"69000143":{"po":4,"name":"齊園","servant":"1033","dps":36749323,"st":1542839697},"69005114":{"po":4,"name":"嵐痕","servant":"2004","dps":12062864,"st":1542842976},"69001281":{"po":4,"name":"沈天工","servant":"1001","dps":49935810,"st":1542821343},"69005607":{"po":4,"name":"楊爺爺","servant":"1006","dps":49764831,"st":1542823743},"69004802":{"po":4,"name":"竹慶生","servant":"1010","dps":54174310,"st":1542818172},"69001008":{"po":4,"name":"帥帥羅","servant":"1030","dps":30147545,"st":1542840517},"69003461":{"po":3,"name":"蘭鴻夢","servant":"1014","dps":86030968,"st":1542882103}},
     				tinfo: {"info":{"81002045":{"po":3,"name":"瑯琊ft鷡翞","servant":"1024","st":1542845419,"dps":54338888},"81001059":{"po":2,"name":"西陵玨","servant":"1033","st":1542817359,"dps":111206215},"81002404":{"po":4,"name":"艾唯雪","servant":"1024","st":1542847475,"dps":18887037},"81002587":{"po":4,"name":"瘋子","servant":"2002","st":1542820795,"dps":101287365},"81006810":{"po":4,"name":"官瀅瀅","servant":"1014","st":1542819826,"dps":2658274},"81006968":{"po":4,"name":"王八八王","servant":"1004","st":1542845756,"dps":110046},"81003598":{"po":4,"name":"口袋沒有錢","servant":"1014","st":1542819242,"dps":67871279},"81002480":{"po":1,"name":"閭靖","servant":"1033","st":1542819913,"stra":2,"dps":267707643},"81006581":{"po":4,"name":"周神","servant":"1002","st":1542817537,"dps":15081817},"81001650":{"po":4,"name":"神經","servant":"2004","st":1542848831,"dps":51497701},"81004158":{"po":3,"name":"浪子不回頭","servant":"1034","st":1542820452,"dps":42434769},"81001127":{"po":4,"name":"玄同","servant":"1050","st":1542818105,"dps":76986542},"81001848":{"po":4,"name":"焱染","servant":"1006","st":1542819915,"dps":130946554},"81006902":{"po":4,"name":"八王王八","servant":"1006","st":1542845756,"dps":735392},"81006495":{"po":3,"name":"開靈車耍大刀","servant":"1010","st":1542819373,"dps":73475352},"81004416":{"po":3,"name":"路玥","servant":"1035","st":1542819457,"dps":51507676}},"score":"-6","name":"瑯琊","id":"8100021","level":"6","zid":"81","oinfo":{"score":"-6","ldtitle":3801,"lastinfo":{"81004158":{"po":3,"name":"浪子不回頭","servant":"1052","st":1542649902,"dps":180101211},"81001059":{"po":2,"name":"西陵玨","servant":"1035","st":1542692302,"dps":203889673},"81006968":{"po":4,"name":"王八八王","servant":"1011","st":1542675107,"dps":10020},"81001127":{"po":4,"name":"玄同","servant":"1030","st":1542645287,"dps":83032207},"81002404":{"po":4,"name":"艾唯雪","servant":"1029","st":1542689521,"dps":59130869},"81003598":{"po":4,"name":"口袋沒有錢","servant":"2004","st":1542648224,"dps":104471457},"81002480":{"po":1,"name":"閭靖","servant":"1035","st":1542682594,"dps":158594079},"81006581":{"po":4,"name":"周神","servant":"1050","st":1542644050,"dps":22631300},"81002587":{"po":4,"name":"瘋子","servant":"2004","st":1542656726,"dps":140599411},"81002045":{"po":3,"name":"瑯琊ft鷡翞","servant":"1006","st":1542673318,"dps":124325922},"81007015":{"po":4,"name":"晏名殊","servant":"1002","st":1542701078,"dps":39786083},"81001848":{"po":4,"name":"焱染","servant":"1018","st":1542691608,"dps":150986606},"81006902":{"po":4,"name":"八王王八","servant":"1013","st":1542675106,"dps":20040},"81006495":{"po":3,"name":"開靈車耍大刀","servant":"1050","st":1542657068,"dps":98171955},"81004416":{"po":3,"name":"路玥","servant":"1050","st":1542710781,"dps":54329370}},"ldlevel":13,"pic":4,"lastscore":"0","getrewardsname":"西陵玨"}},
					score : 100,
					level : Api.allianceVoApi.getAllianceVo().level,
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

		let logo = BaseBitmap.create('awlogo');
		logo.setScale(0.45);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, logo, view);
		view.addChild(logo);

		let crossservantrulevs = BaseBitmap.create('awbattlevs');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, crossservantrulevs, bottomgroup, [0,-crossservantrulevs.height*2-30]);
		view.addChild(crossservantrulevs);

		view.setChildIndex(view.closeBtn, 9999);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view.closeBtn, view, [-25,-20]);

		view.beginWarLog();
	}

	private createWarInfo(type : string):void{
		let view = this;
		let blue = type == LayoutConst.left;
		let wardata = view[`_${type}vsInfo`];
		let empty = view._lunkong && !blue

		let topgroup = new BaseDisplayObjectContainer();
		topgroup.width = GameConfig.stageWidth / 2;
		topgroup.height = 140;
		App.DisplayUtil.setLayoutPosition( blue ? LayoutConst.lefttop : LayoutConst.righttop, topgroup, view);
		view.addChild(topgroup);
		//职员信息
		let infobg = BaseBitmap.create(blue ? 'awpositionbgblue' : 'awpositionbgred');
		infobg.height = 172;
		infobg.anchorOffsetY = infobg.height / 2;
		infobg.scaleY = -1;

		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, infobg, topgroup, [0,0], true);
		topgroup.addChild(infobg);
		//帮会信息
		let servernamebg = BaseBitmap.create(blue ? 'awserverbg2' : 'awserverbg1');
		App.DisplayUtil.setLayoutPosition(blue ? LayoutConst.lefttop : LayoutConst.righttop, servernamebg, infobg, [81,30]);
		topgroup.addChild(servernamebg);

		let servernameTxt = ComponentManager.getTextField(Api.mergeServerVoApi.getAfterMergeSeverName(null,true,empty ? 0 : wardata.server), TextFieldConst.FONTSIZE_TITLE_SMALL);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servernameTxt, servernamebg, [0, 3]);
		topgroup.addChild(servernameTxt);
		servernameTxt.visible = !empty;

		let allinamebg = BaseBitmap.create(blue ? 'awservernamebg2' : 'awservernamebg1');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, allinamebg, servernamebg, [0,servernamebg.height + 10]);
		topgroup.addChild(allinamebg);

		let allinameTxt = ComponentManager.getTextField(empty ? '' : wardata.allianceName, 24);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, allinameTxt, allinamebg);
		topgroup.addChild(allinameTxt);

		let memberNumTxt = ComponentManager.getTextField(LanguageManager.getlocal('allianceWarAttendNum',[empty ? 0 : wardata.attendLog.length.toString()]), 20);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, memberNumTxt, allinamebg, [0,allinamebg.height + 10]);
		topgroup.addChild(memberNumTxt);
		
		//人物形象
		let midgroup = new BaseDisplayObjectContainer();
		midgroup.width = 260;
		midgroup.height = 460;
		App.DisplayUtil.setLayoutPosition( blue ? LayoutConst.leftbottom : LayoutConst.rightbottom, midgroup, view, [30,200]);
		view.addChild(midgroup);
		view[`_midGroup${type}`] = midgroup;
		
		// let servantCfg = Config.ServantCfg.getServantItemById('1001');
		let roleContainer = BaseLoadBitmap.create('');
		roleContainer.width = 248*640/460;
		roleContainer.height = 287;
		roleContainer.anchorOffsetX = roleContainer.width / 2;
		roleContainer.anchorOffsetY = roleContainer.height / 2;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, roleContainer, midgroup, [0,0], true);
		view._rolePosX = roleContainer.x;
		view._rolePosY = roleContainer.y;

		midgroup.addChild(roleContainer);
		view[`_servantRole${type}`] = roleContainer;
		//计策
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
		if (blue) {
			descBg.scaleX = -1;
		}
		
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
		
		let planNameTxt =ComponentManager.getTextField(LanguageManager.getlocal(``), 18, TextFieldConst.COLOR_WARN_GREEN);
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
		App.DisplayUtil.setLayoutPosition( blue ? LayoutConst.lefttop : LayoutConst.righttop, wingroup, midgroup, [10,0], true);
		midgroup.addChild(wingroup);
		view[`_winGroup${type}`] = wingroup;
		wingroup.visible = false;

		let winbg = BaseBitmap.create(`awcombbg`);
		winbg.anchorOffsetX = winbg.width / 2;
		winbg.scaleX = blue ? 1 : -1;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winbg, wingroup, (blue ? [-25.5,-25] : [-75.5,-25]), true);
		wingroup.addChild(winbg);

		let winBitMapTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarCombNum", ["2"]),TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		winBitMapTxt.rotation = blue ? -20 : 20;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, winBitMapTxt, wingroup, (blue ? [10,33] : [-20,5]),true);
		view[`_winBitMapTxt${type}`] = winBitMapTxt;
		wingroup.addChild(winBitMapTxt);

		let playernamebg = BaseBitmap.create(blue ? 'awnamebg2' : 'awnamebg1');
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, playernamebg, roleContainer, [0,roleContainer.height * roleContainer.scaleX]);
		midgroup.addChild(playernamebg);

		let playernameTxt = ComponentManager.getTextField('', 22);
		playernameTxt.height = 22;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playernameTxt, playernamebg);
		midgroup.addChild(playernameTxt);
		view[`_playerNameTxt${type}`] = playernameTxt;

		let progress = ComponentManager.getProgressBar("progress_type1_red","progress_type1_bg2",293);
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

		let awpositionbg = BaseBitmap.create(blue ? 'public_9_blue' : 'public_9_red');

		awpositionbg.width = 256;
		awpositionbg.height = 100;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, awpositionbg, progress, [0,progress.height + 7]);
		midgroup.addChild(awpositionbg);

		let tmpRect =  new egret.Rectangle(0,0,awpositionbg.width - 10, awpositionbg.height - 25);
		let arr = Api.chatVoApi.arr_clone(wardata.attendLog);
		for(let i = 0; i < 3; ++ i){
			arr.push({empty : true});
		}

		let snamebg =  BaseBitmap.create("public_servantskin_namebg2");
		snamebg.setScale(0.9);
		snamebg.name = "snamebg";
		snamebg.x = playernamebg.x + playernamebg.width/2 - snamebg.width/2 *0.9 ;
		snamebg.y = playernamebg.y - snamebg.height ;
		midgroup.addChild(snamebg);
		view[`snamebg${type}`] = snamebg;
		
		let snametxt = ComponentManager.getTextField( "", 18,TextFieldConst.COLOR_LIGHT_YELLOW);
		snametxt.name = "snametxt";
		snametxt.x = snamebg.x + snamebg.width/2* snamebg.scaleX;
		snametxt.y = snamebg.y + snamebg.height/2 - 9 ;
		midgroup.addChild(snametxt);
		view[`snametxt${type}`] = snametxt;

		let scrollList = ComponentManager.getScrollList(AllianceWarShowPlayerInfoItem, arr, tmpRect);
		scrollList.setEmptyTip(LanguageManager.getlocal(`acPunishNoData`));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, awpositionbg);
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
					skin : leftlog[0].skin
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
					skin : leftlog[0].skin
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
					skin : rightlog[0].skin
				},
			}
			let winflag = false;			
			while(!winflag){
				let view = this;
				let leftData = view._log[LayoutConst.left][leftidx];
				let rightData = view._log[LayoutConst.right][rightidx];

				let leftExtra = 0;
				let leftplan = 0;
				if(!leftData[`planEffect`]){
					leftData[`winMax`] = Config.AlliancewarCfg.servantMaxWin;
					leftExtra = view.calExtraDamage(leftData.plan, rightData.curHp);
					view.calPlanEffect(leftData, rightData);
					leftData[`planEffect`] = true;
					leftplan = leftData.plan;
				}
				
				let rightExtra = 0;
				let rightplan = 0;
				if(!rightData[`planEffect`]){
					rightData[`winMax`] = Config.AlliancewarCfg.servantMaxWin;
					rightExtra = view.calExtraDamage(rightData.plan, leftData.curHp);
					view.calPlanEffect(rightData, leftData);
					rightData[`planEffect`] = true;
					rightplan = rightData.plan;
				}

				let leftHp = leftData.curHp;
				let rightHp = rightData.curHp;
				let sub = leftHp - rightHp;

				if(!view._damageLog['left'][leftData.uid]){
					view._damageLog['left'][leftData.uid] = {};
					view._damageLog['left'][leftData.uid]['damage'] = 0;
					view._damageLog['left'][leftData.uid]['win'] = {};
					view._damageLog['left'][leftData.uid]['win'][leftData.servantId] = 0;
					view._damageLog['left'][leftData.uid]['name'] = leftData.name;
				}
				if (view._damageLog['left'][leftData.uid]['win'][leftData.servantId] === undefined) {
					view._damageLog['left'][leftData.uid]['win'][leftData.servantId] = 0;
				}
				view._damageLog['left'][leftData.uid]['damage'] += ((sub > 0 ? rightHp : leftHp) + leftExtra);

				if(!view._damageLog['right'][rightData.uid]){
					view._damageLog['right'][rightData.uid] = {};
					view._damageLog['right'][rightData.uid]['damage'] = 0;
					view._damageLog['right'][rightData.uid]['win'] = {};
					view._damageLog['right'][rightData.uid]['win'][rightData.servantId] = 0;
					view._damageLog['right'][rightData.uid]['name'] = rightData.name;
				}
				if (view._damageLog['right'][rightData.uid]['win'][rightData.servantId] === undefined) {
					view._damageLog['right'][rightData.uid]['win'][rightData.servantId] = 0;
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
					leftresult = 'win';
					view._damageLog['left'][leftData.uid]['win'][leftData.servantId] += 1;
					if(view._damageLog['left'][leftData.uid]['win'][leftData.servantId] >= leftData[`winMax`] || leftData.plan == 5){
						++ leftidx;
						++ calLeftIdx
						leftchange = true;
					}
				}
				else if(sub < 0){
					++ leftidx;
					++ calLeftIdx;
					leftchange = true;
					rightresult = 'win';
					view._damageLog['right'][rightData.uid]['win'][rightData.servantId] += 1;
					if(view._damageLog['right'][rightData.uid]['win'][rightData.servantId] >= rightData[`winMax`] || rightData.plan == 5){
						++ rightidx;
						++ calRightIdx;
						rightchange = true;
					}
				}
				else{
					++ leftidx;
					++ calLeftIdx;
					leftchange = true;
					
					++ rightidx;
					++ calRightIdx
					rightchange = true;
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
						win : view._damageLog['left'][leftData.uid]['win'][leftData.servantId],
						change : leftchange,
						result : leftresult,
						leftIdx : lefttmpx,
						plan : leftplan,
						allipos : leftData.allipos,
						alliname :leftData.alliname,
						skin : leftData.skin
					},
					right : {
						servantId : rightData.servantId,
						name : rightData.name,
						prevHp : rightHp,
						curHp : rightData.curHp,
						attr : rightData.attr,
						dps : sub > 0 ? rightHp : leftHp,
						win : view._damageLog['right'][rightData.uid]['win'][rightData.servantId],
						change : rightchange,
						result : rightresult,
						rightIdx : righttmpx,
						plan : rightplan,
						allipos : rightData.allipos,
						alliname : rightData.alliname,
						skin : rightData.skin
					},
				}

				let newleftdata = view._log[LayoutConst.left][calLeftIdx];
				let newrightData = view._log[LayoutConst.right][calRightIdx];

				winflag = true;
				if(!newleftdata && !newrightData){
					view._winFlag = 'draw';
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
					unit.winMax = Config.AlliancewarCfg.servantMaxWin;
				}
			}
			view.leftWin = view.rightWin = 0;
			view._round = 1;
			view._together = true;
			view.flag = false;
			view.buff = false;
			view.showRoundAnti(LayoutConst.left);
			view.showRoundAnti(LayoutConst.right);
		}
	}

	private calPlanEffect(sourceData : any, TargetData : any):void{
		let view = this;
		let cfg = Config.AlliancewarCfg.getItemList();
		let info = cfg[sourceData.plan - 1];
		switch(sourceData.plan){
			case 2:
			case 3:
			case 5:
				sourceData.curHp *= (1 + info.powerup);
				break;
			case 4:
				TargetData.curHp *= (1 - info.powerdown);
				break;
			case 6:
				sourceData.winMax += info.wins;
				break;
		}
	}

	private calExtraDamage(plan : number, curhp : number):number{
		let view = this;
		let cfg = Config.AlliancewarCfg.getItemList();
		let extra = 0;
		if(plan){
			let unit = cfg[plan - 1];
			if(unit.powerdown > 0){
				extra = unit.powerdown * curhp;
			}
		}
		return extra;
	}

	private flag = false;
	private buff = false;
	private showRoundAnti(type : string, func?:Function, obj?:any):void{
		let view = this;
		let role : BaseLoadBitmap = view[`_servantRole${type}`];
		let isOnleft = type == LayoutConst.left;
		let playerNameTxt = view[`_playerNameTxt${type}`];
		let progress : ProgressBar = view[`_playerProgress${type}`];
		let list : ScrollList = view[`_memberList${type}`];
		let plangroup = view[`_planGroup${type}`];
		let roundData = view._roundLog[view._round];
		let snamebg = view[`snamebg${type}`];
		let snametxt = view[`snametxt${type}`];

		if(roundData){
			let data = view._roundLog[view._round][type];
			let curIdx = data[`${type}Idx`];
			//上阵效果
			let servantInfo = Config.ServantCfg.getServantItemById(data.servantId);
			
			role.y = view._rolePosY;

			let leftdata = view._roundLog[view._round]['left'];
			let rightdata = view._roundLog[view._round]['right'];
			let skip = false;
			if(view._together && ((leftdata.plan == 4 && rightdata.plan > 1 && rightdata.plan < 6) || (rightdata.plan == 4 && leftdata.plan > 1 && leftdata.plan < 6))){
				if(!view.buff){
					view.buff = true;
					skip = true;
				}
			}
			if(data.skin){
				snametxt.text = LanguageManager.getlocal("servantSkinName"+ data.skin);
				snametxt.anchorOffsetX = snametxt.width/2;
				snamebg.visible = true;
			}else{
				snametxt.text = "";
				snamebg.visible = false;
			}
			egret.Tween.get(role).to({x : isOnleft ? -124 : 384, y : view._rolePosY}, 500).call(()=>{
				role.setScale(1);
				let img = servantInfo.fullIcon;
				if(data.skin){
					img = Config.ServantskinCfg.getServantSkinItemById(data.skin).body;
				}
				role.setload(img);
				view[`_arrow${type}`].visible = view[`_buffTxt${type}`].visible = false;
				view[`_winGroup${type}`].visible = false;
				role.alpha = 1;
			},view).to({x : view._rolePosX, y : view._rolePosY}, 500).call(()=>{
				let item : any = list.getItemByIndex(curIdx);
				if(item){
					item.refreshTextColor();
				}
				playerNameTxt.text = data.name;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, playerNameTxt, role);
				list.setScrollTop(curIdx * 25, 300);

				progress.setText(App.StringUtil.changeIntToText(data.attr));
				progress.setPercentage(data.attr / data.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(data.attr), 0)));

				view.freshText('2', [data.alliname, LanguageManager.getlocal(`allianceMemberPo${item._data.allipos}`), data.name, servantInfo.name, view.api.getAlliancePosAdd(view[`_${type}vsInfo`].allilevel, item._data.allipos) * 100, App.StringUtil.changeIntToText(Math.floor(data.attr))], type == 'left');
				//计策使用
				if(data.plan && !skip){
					if(view.buff){
						view.buff = false;
						let first = type;
						if(data.plan == 4){
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
			},view);
		}
		else{
			if(func){
				func.apply(obj);
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

		let planImg = BaseLoadBitmap.create(`itemicon220${data.plan}`);
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
			if(data.plan == 4){
				buff = 'debuffeffect';
				newType = type == LayoutConst.left ? LayoutConst.right : LayoutConst.left;
				let buffeffect : CustomMovieClip = view[`_midGroup${newType}`].getChildByName('buffeffect');
				if(buffeffect){
					buffeffect.stop();
					view[`_midGroup${newType}`].removeChild(buffeffect);
					buffeffect = null;
				}
			}

			let customClip = ComponentManager.getCustomMovieClip(buff,8,100);
			customClip.width = 283;
			customClip.height = 272;
			customClip.playWithTime(-1);
			customClip.name = 'buffeffect';
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, customClip, view[`_playerNameTxt${newType}`], [0,view[`_playerNameTxt${newType}`].height - 20]);
			view[`_midGroup${newType}`].addChild(customClip);
			
	
			let posY = view[`_arrow${newType}`].y;
			let param = 0;
			let cfg = Config.AlliancewarCfg.getItemList();
			let tmp = cfg[data.plan - 1];
			switch(data.plan){
				case 2:
				case 3:
				case 5:
					param = tmp.powerup;
					break;
				case 4:
					param = tmp.powerdown;
					break;
			}
			if(data.plan == 4){
				let newdata = view._roundLog[view._round][newType];
				let hp = newdata.attr * (1 - param);
				view[`_playerProgress${newType}`].setText(App.StringUtil.changeIntToText(hp));
				view[`_playerProgress${newType}`].setPercentage(hp / newdata.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(hp), 0)));
				newdata.attr = hp;
			}
			else if(data.plan >= 2 && data.plan <= 5){
				let hp = data.attr * (1 + param);
				view[`_playerProgress${newType}`].setText(App.StringUtil.changeIntToText(hp));
				view[`_playerProgress${newType}`].setPercentage(hp / data.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(hp), 0)));
				data.attr = hp;
			}
			
			view[`_playerProgress${newType}`].TweenTxt(200);
			egret.Tween.get(view[`_arrow${newType}`]).wait(100).call(()=>{
				view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = true;
			},view).to({y : posY - 10}, 600).to({y : posY}, 600).call(()=>{
				//view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = false;
			},view).wait(300).call(()=>{
				view.buff = false;
				//view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = false;
				view.showBuff(type == 'left' ? 'right' : 'left', func, obj);
			},view);
		},view);
	}

	private showBuff(type : string, func?:Function, obj?:any):void{
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

		let planImg = BaseLoadBitmap.create(`itemicon220${data.plan}`);
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

			if(data.plan == 1 || data.plan == 6){
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
				if(data.plan == 4){
					newType = type == LayoutConst.left ? LayoutConst.right : LayoutConst.left;
				}
	
				let posY = view[`_arrow${newType}`].y;
				view[`_playerProgress${newType}`].TweenTxt(100);

				let buff = '';
				if(data.plan == 4){
					buff = 'debuffeffect';
					let newdata = view._roundLog[view._round][newType];
					if (newdata) {
						view[`_playerProgress${newType}`].setText(App.StringUtil.changeIntToText(newdata.prevHp));
						view[`_playerProgress${newType}`].setPercentage(newdata.prevHp / newdata.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(newdata.prevHp), 0)));
					}
				}
				else if(data.plan >= 2 && data.plan <= 5){
					buff = 'buffeffect';
					view[`_playerProgress${newType}`].setText(App.StringUtil.changeIntToText(data.prevHp));
					view[`_playerProgress${newType}`].setPercentage(data.prevHp / data.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(data.prevHp), 0)));
				}

				let buffeffect : CustomMovieClip = view[`_midGroup${newType}`].getChildByName('buffeffect');
				if(buffeffect){
					buffeffect.stop();
					view[`_midGroup${newType}`].removeChild(buffeffect);
					buffeffect = null;
				}

				let customClip = ComponentManager.getCustomMovieClip(buff,8,100);
				customClip.width = 283;
				customClip.height = 272;
				customClip.playWithTime(-1);
				customClip.name = 'buffeffect';
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, customClip, view[`_playerNameTxt${newType}`], [0,view[`_playerNameTxt${newType}`].height - 20]);
				view[`_midGroup${newType}`].addChild(customClip);
				
				//view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = true;
				egret.Tween.get(view[`_arrow${newType}`]).wait(100).call(()=>{
					view[`_arrow${newType}`].visible = view[`_buffTxt${newType}`].visible = true;
				},view).to({y : posY - 10}, 600).to({y : posY}, 600).call(()=>{
					
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
		},view);
	}

	private freshPlanTxt(plan : number, type : string):void{
		let view = this;
		let plangroup = view[`_planGroup${type}`];
		let param;
		let cfg = Config.AlliancewarCfg.getItemList();
		let obj = cfg[plan - 1];
		for(let i in obj){
			if(obj[i]){
				param = obj[i];
				break;
			}
		}

		let arrow = '';
		switch(plan){
			case 1:
				param = obj.moreguest;
				break;
			case 2:
			case 3:
			case 5:
				param = obj.powerup * 100;
				arrow = 'awuparrow';
				break;
			case 4:
				param = obj.powerdown * 100;
				arrow = 'awdownarrow';
				break;
			case 6:
				param = obj.wins;
				break;
		}
		let rid = App.MathUtil.getRandom(1,4);
		view[`_planDescTxt${type}`].text = LanguageManager.getlocal(`allianceWarPlanDesc${plan}-${rid}`, [param]);
		view[`_planNameTxt${type}`].text = LanguageManager.getlocal(`allianceWarPlanName${plan}`);

		view[`_planDescBg${type}`].height = view[`_planDescTxt${type}`].textHeight + 70;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view[`_planDescBg${type}`], plangroup, [0,0], true);
		if (view[`_planDescBg${type}`].scaleX > 0) {
			view[`_planDescBg${type}`].x = -150;
		} else {
			view[`_planDescBg${type}`].x = plangroup.x + view[`_planDescBg${type}`].width + 100;
		}
		view[`_planDescBg${type}`].y = view[`_servantRole${type}`].y - 150;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, view[`_planDescArrow${type}`], view[`_planDescBg${type}`], [25,view[`_planDescBg${type}`].height-3]);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, view[`_planDescTxt${type}`], view[`_planDescBg${type}`], [0,15]);
		view[`_planDescTxt${type}`].x = view[`_planDescBg${type}`].x + view[`_planDescBg${type}`].scaleX * view[`_planDescBg${type}`].width/2 - view[`_planDescTxt${type}`].width/2;
		view[`_planDescTxt${type}`].y = view[`_planDescBg${type}`].y + 15;
		// App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, view[`_planNameTxt${type}`], view[`_planDescBg${type}`], [20,10]);
		view[`_planNameTxt${type}`].x = (view[`_planDescBg${type}`].scaleX > 0 ? (view[`_planDescBg${type}`].x + view[`_planDescBg${type}`].width) : view[`_planDescBg${type}`].x) - 20 - view[`_planNameTxt${type}`].width;
		view[`_planNameTxt${type}`].y = view[`_planDescBg${type}`].y + view[`_planDescBg${type}`].height - 50;
		App.DisplayUtil.setLayoutPosition( LayoutConst.horizontalCentertop, plangroup, view[`_midGroup${type}`], [0,-plangroup.height]);
		//buff箭头
		if(arrow !== ''){
			let newType = type;
			if(plan == 4){
				newType = type == LayoutConst.left ? LayoutConst.right : LayoutConst.left;
			}
			view[`_arrow${newType}`].setRes(arrow);
			view[`_buffTxt${newType}`].text = `${(plan == 4 ? '-' : '+')}${param}%`;
			view[`_buffTxt${newType}`].textColor = plan == 4 ? TextFieldConst.COLOR_WARN_RED3 : TextFieldConst.COLOR_WARN_GREEN2;
			
			let progress : ProgressBar = view[`_playerProgress${newType}`];
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, view[`_buffTxt${newType}`], progress, [10,0]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, view[`_arrow${newType}`], progress, [view[`_buffTxt${newType}`].width + 15,0]);
		}
	}

	private skipFight():void{
		let view = this;
		let score = 0;		
		view._winFlag = view._serverWin; 

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
			type  : view._winFlag == LayoutConst.left ? 'win' : 'fail',
			alliname : view._lunkong ? '' : view._rightvsInfo.allianceName,
			score : score,
			damageLog : view._damageLog,
			winanme : view._winFlag == LayoutConst.left ? view._leftvsInfo.allianceName : view._rightvsInfo.allianceName,
			lunkong : view._lunkong,
			id : view._leftvsInfo.id,
			draw : view._winFlag == 'draw',
			test : view.param.data.test
		});
		view.hide();
		
	}

	//文本消息 type 1入场 2出战 3击败 4退败
	private _scrollIdx = 0;
	private _messageIdx = 0;
	private freshText(type : string, param : any[], isLeft : boolean):void{
		let view = this;
		let infoGroup = view._damageTxtGroup;
		let desc = `allianceWarDesc${type}`;
		// if(sub >= 0){
		// 	desc = sub == 0 ? 'allianceWarTip4' : 'allianceWarTip2';
		// 	param = [leftData.name, Config.ServantCfg.getServantItemById(leftData.servantId).name, damageLeft];
		// }
		// else{
		// 	desc = 'allianceWarTip3';
		// 	param = [rightData.name, Config.ServantCfg.getServantItemById(rightData.servantId).name, damageright];
		// }
		let damageTxt =  ComponentManager.getTextField(LanguageManager.getlocal(desc, param),18, isLeft ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW);
		damageTxt.lineSpacing = 5;
		damageTxt.width = GameConfig.stageWidth - 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, damageTxt, view._damageTxtGroup, [20, view._scrollY + 10], true);
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
			egret.Tween.get(view._planGroupleft).wait(1000).call(()=>{
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
			// let damageNum = sub > 0 ? damageright : damageLeft;
			view[`_winGroup${LayoutConst.left}`].visible = 	view[`_winGroup${LayoutConst.right}`].visible = false;
			
			let isleftWin = leftData.result == 'win';
			let isrightWin = rightData.result == 'win';
			let buffeffect : CustomMovieClip = view[`_midGroup${LayoutConst.left}`].getChildByName('buffeffect');
			let buffeffect2 : CustomMovieClip = view[`_midGroup${LayoutConst.right}`].getChildByName('buffeffect');

			egret.Tween.get(leftrole).to({scaleX : 1.3, scaleY : 1.3}, 500).call(()=>{
				if(buffeffect){
					buffeffect.visible = false;
				}
			},view).to({x : view._rolePosX + 130, y : view._rolePosY - 200, scaleX : 0.6, scaleY : 0.6}, 200).call(()=>{	
				leftprogress.setText(App.StringUtil.changeIntToText(leftData.curHp));
				leftprogress.setPercentage(leftData.curHp / leftData.attr, App.StringUtil.changeIntToText(Math.max(Math.floor(leftData.curHp), 0)));
			},view).call(()=>{
				// let desc = '';
				// let param = [];
				// if(sub >= 0){
				// 	desc = sub == 0 ? 'allianceWarTip4' : 'allianceWarTip2';
				// 	param = [leftData.name, Config.ServantCfg.getServantItemById(leftData.servantId).name, damageLeft];
				// }
				// else{
				// 	desc = 'allianceWarTip3';
				// 	param = [rightData.name, Config.ServantCfg.getServantItemById(rightData.servantId).name, damageright];
				// }
				// let damageTxt =  ComponentManager.getTextField(LanguageManager.getlocal(desc, param),18,sub >= 0 ? TextFieldConst.COLOR_QUALITY_BLUE : TextFieldConst.COLOR_QUALITY_YELLOW);
				// App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, damageTxt, view._damageTxtGroup, [20, 15 + (view._round - 1) * (18 + 10)], true);
				// view._damageTxtGroup.addChild(damageTxt);
				// view._damageScrollView.scrollTop = 15 + (view._round - 1) * (18 + 10);
			},view).to({x : isleftWin ? view._rolePosX : -124, y : isleftWin ? view._rolePosY : -200, scaleX : isleftWin ? 1 : 0, scaleY : isleftWin ? 1 : 0, alpha :isleftWin ? 1 : 0, rotation : isleftWin ? 0 : 720}, 600).call(()=>{
				if(isleftWin){
					if(buffeffect){
						buffeffect.visible = true;
					}
					view.rightWin = 0;
					++ view.leftWin;
					if(leftData.plan){
						view.freshText('5', [leftData.name, LanguageManager.getlocal(`allianceWarPlanName${leftData.plan}`), rightData.name, App.StringUtil.changeIntToText(Math.floor(leftData.curHp)), view.leftWin], true);
					}
					else{
						view.freshText('3', [leftData.name, rightData.name, App.StringUtil.changeIntToText(Math.floor(leftData.curHp)), view.leftWin], true);
					}
					
					view.freshText('4', [rightData.alliname, LanguageManager.getlocal(`allianceMemberPo${rightData.allipos}`), rightData.name], false);
					view[`_winGroup${LayoutConst.right}`].visible = false;
				}else if(isrightWin){
					view.leftWin = 0;
					++ view.rightWin;
					if(rightData.plan){
						view.freshText('5', [rightData.name, LanguageManager.getlocal(`allianceWarPlanName${rightData.plan}`), leftData.name, App.StringUtil.changeIntToText(Math.floor(rightData.curHp)), view.rightWin], false);
					}
					else{
						view.freshText('3', [rightData.name, leftData.name, App.StringUtil.changeIntToText(Math.floor(rightData.curHp)), view.rightWin], false);
					}
					view.freshText('4', [leftData.alliname, LanguageManager.getlocal(`allianceMemberPo${leftData.allipos}`), leftData.name], true);
					leftrole.setScale(1);
					leftrole.alpha = 1;
					leftrole.x = -224;
					leftrole.y = view._rolePosY;
					view[`_winGroup${LayoutConst.left}`].visible = false;
				}
				else{
					view.rightWin = 0;
					view.freshText('4', [rightData.alliname, LanguageManager.getlocal(`allianceMemberPo${rightData.allipos}`), rightData.name], false);
					view[`_winGroup${LayoutConst.right}`].visible = false;

					view.leftWin = 0;
					view.freshText('4', [leftData.alliname, LanguageManager.getlocal(`allianceMemberPo${leftData.allipos}`), leftData.name], true);
					leftrole.setScale(1);
					leftrole.alpha = 1;
					leftrole.x = -224;
					leftrole.y = view._rolePosY;
					view[`_winGroup${LayoutConst.left}`].visible = false;
				}

				if(view.leftWin){
					view[`_winBitMapTxt${LayoutConst.left}`].text = LanguageManager.getlocal("allianceWarCombNum", [view.leftWin.toString()]);
					view[`_winGroup${LayoutConst.left}`].visible = true;
				}

				if(view.rightWin){
					view[`_winBitMapTxt${LayoutConst.right}`].text = LanguageManager.getlocal("allianceWarCombNum", [view.rightWin.toString()]);
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

			egret.Tween.get(rightrole).to({scaleX : 1.2, scaleY : 1.2}, 500).call(()=>{
				if(buffeffect2){
					buffeffect2.visible = false;
				}
			},view).to({x : view._rolePosX - 130, y : view._rolePosY - 200, scaleX : 0.6, scaleY : 0.6},200).call(()=>{
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
					rightrole.setScale(1);
					rightrole.alpha = 1;
					rightrole.x = 384;
					rightrole.y = view._rolePosY;
				}
			},view).wait(800).call(()=>{
				++ view._round;
				view._together = false;
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
					view.showRoundAnti(LayoutConst.left, view.startMove, view);
					view.showRoundAnti(LayoutConst.right, view.startMove, view);
				}
				else if(leftData.change){
					view.leftWin = 0;
					let buffeffect2 : CustomMovieClip = view[`_midGroup${LayoutConst.left}`].getChildByName('buffeffect');
					if(buffeffect2){
						buffeffect2.stop();
						view[`_midGroup${LayoutConst.left}`].removeChild(buffeffect2);
						buffeffect2 = null;
					}
					view.showRoundAnti(LayoutConst.left, view.startMove, view);
				}
				else{
					view.rightWin = 0;
					let buffeffect : CustomMovieClip = view[`_midGroup${LayoutConst.right}`].getChildByName('buffeffect');
					if(buffeffect){
						buffeffect.stop();
						view[`_midGroup${LayoutConst.right}`].removeChild(buffeffect);
						buffeffect = null;
					}

					view.showRoundAnti(LayoutConst.right, view.startMove, view);
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
			'awlogo','awbattletimebg','awpositionbgblue','awpositionbgred','awnamebg1','awnamebg2',
			'awservernamebg1','awservernamebg2','awserverbg1','awserverbg2','awuparrow','awdownarrow',
			,'progress_type1_bg2','progress_type1_red','awbattlevs','damage_fnt','awcombbg',
			'buffeffect','debuffeffect','awplaneffect',"public_9_blue","public_9_red"
        ]);
	}

	protected getRuleInfo():string{
		return null;
	}

	protected getTitleBgName():string{
		return null;
	}

	protected getTitleStr():string{
		return null;
	}

	protected getCloseBtnName():string{
		return ButtonConst.COMMON_CLOSE_1;
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
		super.dispose();
	}
}